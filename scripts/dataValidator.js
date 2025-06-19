/**
 * Data Validation Script
 * 
 * Validates collected data for accuracy and completeness
 * Checks for data quality issues and inconsistencies
 * 
 * Usage: npm run validate-data
 */

import Joi from 'joi';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';

const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Validation schemas
const menuItemSchema = Joi.object({
  name: Joi.string().required().min(1).max(100),
  description: Joi.string().allow('').max(500),
  base_price: Joi.number().positive().precision(2).required(),
  calories: Joi.number().integer().min(0).max(5000).allow(null),
  ingredients: Joi.array().items(Joi.string()).allow(null),
  allergens: Joi.array().items(Joi.string()).allow(null),
  restaurant_chain_id: Joi.string().uuid().required(),
  category_id: Joi.string().uuid().allow(null),
  is_active: Joi.boolean().default(true)
});

const rewardItemSchema = Joi.object({
  points_required: Joi.number().integer().positive().required(),
  cash_equivalent: Joi.number().positive().precision(2).allow(null),
  value_score: Joi.number().min(0).max(100).precision(2).allow(null),
  savings_percentage: Joi.number().min(0).max(100).precision(2).allow(null),
  menu_item_id: Joi.string().uuid().required(),
  reward_program_id: Joi.string().uuid().required(),
  is_promotion: Joi.boolean().default(false),
  is_active: Joi.boolean().default(true)
});

const promotionSchema = Joi.object({
  title: Joi.string().required().min(1).max(200),
  description: Joi.string().allow('').max(1000),
  promotion_type: Joi.string().valid('bonus_points', 'discount', 'free_item', 'double_points').required(),
  start_date: Joi.date().required(),
  end_date: Joi.date().greater(Joi.ref('start_date')).required(),
  restaurant_chain_id: Joi.string().uuid().required(),
  reward_program_id: Joi.string().uuid().required(),
  is_active: Joi.boolean().default(true)
});

class DataValidator {
  constructor() {
    this.validationResults = {
      menuItems: { valid: 0, invalid: 0, errors: [] },
      rewardItems: { valid: 0, invalid: 0, errors: [] },
      promotions: { valid: 0, invalid: 0, errors: [] },
      dataQuality: { issues: [], score: 100 }
    };
  }

  async validateMenuItems() {
    console.log('🔍 Validating menu items...');
    
    const { data: menuItems, error } = await supabase
      .from('menu_items')
      .select('*');
      
    if (error) {
      console.error('Error fetching menu items:', error);
      return;
    }

    for (const item of menuItems) {
      const { error: validationError } = menuItemSchema.validate(item);
      
      if (validationError) {
        this.validationResults.menuItems.invalid++;
        this.validationResults.menuItems.errors.push({
          id: item.id,
          name: item.name,
          error: validationError.details[0].message
        });
      } else {
        this.validationResults.menuItems.valid++;
      }
    }

    console.log(`✅ Menu items validation complete: ${this.validationResults.menuItems.valid} valid, ${this.validationResults.menuItems.invalid} invalid`);
  }

  async validateRewardItems() {
    console.log('🔍 Validating reward items...');
    
    const { data: rewardItems, error } = await supabase
      .from('reward_items')
      .select(`
        *,
        menu_items (name),
        reward_programs (program_name)
      `);
      
    if (error) {
      console.error('Error fetching reward items:', error);
      return;
    }

    for (const item of rewardItems) {
      const { error: validationError } = rewardItemSchema.validate(item);
      
      if (validationError) {
        this.validationResults.rewardItems.invalid++;
        this.validationResults.rewardItems.errors.push({
          id: item.id,
          menuItem: item.menu_items?.name,
          error: validationError.details[0].message
        });
      } else {
        this.validationResults.rewardItems.valid++;
        
        // Additional business logic validation
        if (item.cash_equivalent && item.points_required) {
          const valuePerPoint = item.cash_equivalent / item.points_required;
          if (valuePerPoint < 0.001 || valuePerPoint > 0.1) {
            this.validationResults.dataQuality.issues.push({
              type: 'suspicious_value_ratio',
              item: item.menu_items?.name,
              valuePerPoint,
              message: 'Value per point seems unusual'
            });
          }
        }
      }
    }

    console.log(`✅ Reward items validation complete: ${this.validationResults.rewardItems.valid} valid, ${this.validationResults.rewardItems.invalid} invalid`);
  }

  async validatePromotions() {
    console.log('🔍 Validating promotions...');
    
    const { data: promotions, error } = await supabase
      .from('promotions')
      .select('*');
      
    if (error) {
      console.error('Error fetching promotions:', error);
      return;
    }

    for (const promotion of promotions) {
      const { error: validationError } = promotionSchema.validate(promotion);
      
      if (validationError) {
        this.validationResults.promotions.invalid++;
        this.validationResults.promotions.errors.push({
          id: promotion.id,
          title: promotion.title,
          error: validationError.details[0].message
        });
      } else {
        this.validationResults.promotions.valid++;
        
        // Check for expired promotions that are still active
        if (promotion.is_active && new Date(promotion.end_date) < new Date()) {
          this.validationResults.dataQuality.issues.push({
            type: 'expired_promotion',
            promotion: promotion.title,
            endDate: promotion.end_date,
            message: 'Promotion is expired but still marked as active'
          });
        }
      }
    }

    console.log(`✅ Promotions validation complete: ${this.validationResults.promotions.valid} valid, ${this.validationResults.promotions.invalid} invalid`);
  }

  async checkDataConsistency() {
    console.log('🔍 Checking data consistency...');
    
    // Check for orphaned records
    const { data: orphanedRewardItems } = await supabase
      .from('reward_items')
      .select('id, menu_items!left(id)')
      .is('menu_items.id', null);
      
    if (orphanedRewardItems && orphanedRewardItems.length > 0) {
      this.validationResults.dataQuality.issues.push({
        type: 'orphaned_records',
        count: orphanedRewardItems.length,
        message: 'Reward items without corresponding menu items'
      });
    }

    // Check for duplicate menu items
    const { data: duplicateItems } = await supabase
      .from('menu_items')
      .select('name, restaurant_chain_id, count(*)')
      .group('name, restaurant_chain_id')
      .having('count(*) > 1');
      
    if (duplicateItems && duplicateItems.length > 0) {
      this.validationResults.dataQuality.issues.push({
        type: 'duplicate_items',
        count: duplicateItems.length,
        message: 'Duplicate menu items found'
      });
    }

    // Check price consistency
    const { data: priceInconsistencies } = await supabase
      .from('reward_items')
      .select(`
        *,
        menu_items (base_price, name)
      `)
      .not('cash_equivalent', 'is', null);
      
    if (priceInconsistencies) {
      priceInconsistencies.forEach(item => {
        const priceDifference = Math.abs(item.cash_equivalent - item.menu_items.base_price);
        if (priceDifference > 1.00) {
          this.validationResults.dataQuality.issues.push({
            type: 'price_inconsistency',
            item: item.menu_items.name,
            menuPrice: item.menu_items.base_price,
            rewardPrice: item.cash_equivalent,
            difference: priceDifference,
            message: 'Significant price difference between menu and reward'
          });
        }
      });
    }

    console.log(`✅ Data consistency check complete: ${this.validationResults.dataQuality.issues.length} issues found`);
  }

  calculateDataQualityScore() {
    const totalRecords = this.validationResults.menuItems.valid + 
                        this.validationResults.menuItems.invalid +
                        this.validationResults.rewardItems.valid + 
                        this.validationResults.rewardItems.invalid +
                        this.validationResults.promotions.valid + 
                        this.validationResults.promotions.invalid;
                        
    const validRecords = this.validationResults.menuItems.valid + 
                        this.validationResults.rewardItems.valid + 
                        this.validationResults.promotions.valid;
                        
    const baseScore = totalRecords > 0 ? (validRecords / totalRecords) * 100 : 100;
    
    // Deduct points for data quality issues
    const issueDeduction = Math.min(this.validationResults.dataQuality.issues.length * 2, 20);
    
    this.validationResults.dataQuality.score = Math.max(baseScore - issueDeduction, 0);
  }

  async generateReport() {
    console.log('📊 Generating validation report...');
    
    this.calculateDataQualityScore();
    
    const report = {
      timestamp: new Date().toISOString(),
      summary: {
        dataQualityScore: this.validationResults.dataQuality.score,
        totalIssues: this.validationResults.dataQuality.issues.length,
        validationResults: {
          menuItems: {
            total: this.validationResults.menuItems.valid + this.validationResults.menuItems.invalid,
            valid: this.validationResults.menuItems.valid,
            invalid: this.validationResults.menuItems.invalid,
            errorRate: this.validationResults.menuItems.invalid / (this.validationResults.menuItems.valid + this.validationResults.menuItems.invalid) * 100
          },
          rewardItems: {
            total: this.validationResults.rewardItems.valid + this.validationResults.rewardItems.invalid,
            valid: this.validationResults.rewardItems.valid,
            invalid: this.validationResults.rewardItems.invalid,
            errorRate: this.validationResults.rewardItems.invalid / (this.validationResults.rewardItems.valid + this.validationResults.rewardItems.invalid) * 100
          },
          promotions: {
            total: this.validationResults.promotions.valid + this.validationResults.promotions.invalid,
            valid: this.validationResults.promotions.valid,
            invalid: this.validationResults.promotions.invalid,
            errorRate: this.validationResults.promotions.invalid / (this.validationResults.promotions.valid + this.validationResults.promotions.invalid) * 100
          }
        }
      },
      errors: this.validationResults,
      recommendations: this.generateRecommendations()
    };

    // Save report to file
    const timestamp = new Date().toISOString().split('T')[0];
    await fs.writeFile(
      `data/validation-report-${timestamp}.json`,
      JSON.stringify(report, null, 2)
    );

    console.log('📋 Validation Report Summary:');
    console.log(`   Data Quality Score: ${report.summary.dataQualityScore.toFixed(1)}%`);
    console.log(`   Total Issues: ${report.summary.totalIssues}`);
    console.log(`   Menu Items: ${report.summary.validationResults.menuItems.valid}/${report.summary.validationResults.menuItems.total} valid`);
    console.log(`   Reward Items: ${report.summary.validationResults.rewardItems.valid}/${report.summary.validationResults.rewardItems.total} valid`);
    console.log(`   Promotions: ${report.summary.validationResults.promotions.valid}/${report.summary.validationResults.promotions.total} valid`);

    return report;
  }

  generateRecommendations() {
    const recommendations = [];
    
    if (this.validationResults.menuItems.invalid > 0) {
      recommendations.push('Review and fix invalid menu items to improve data quality');
    }
    
    if (this.validationResults.dataQuality.issues.some(issue => issue.type === 'price_inconsistency')) {
      recommendations.push('Investigate price inconsistencies between menu and reward items');
    }
    
    if (this.validationResults.dataQuality.issues.some(issue => issue.type === 'expired_promotion')) {
      recommendations.push('Update or deactivate expired promotions');
    }
    
    if (this.validationResults.dataQuality.issues.some(issue => issue.type === 'orphaned_records')) {
      recommendations.push('Clean up orphaned reward items without corresponding menu items');
    }
    
    if (this.validationResults.dataQuality.score < 90) {
      recommendations.push('Consider implementing automated data quality checks');
    }
    
    return recommendations;
  }

  async run() {
    try {
      console.log('🚀 Starting data validation...');
      
      await this.validateMenuItems();
      await this.validateRewardItems();
      await this.validatePromotions();
      await this.checkDataConsistency();
      
      const report = await this.generateReport();
      
      console.log('✅ Data validation completed successfully!');
      
      return report;
    } catch (error) {
      console.error('💥 Data validation failed:', error);
      throw error;
    }
  }
}

// Run the validator
if (import.meta.url === `file://${process.argv[1]}`) {
  const validator = new DataValidator();
  validator.run();
}

export default DataValidator;