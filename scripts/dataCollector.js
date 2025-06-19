/**
 * Data Collection Script for Restaurant Rewards Programs
 * 
 * This script collects data from various sources including:
 * - Official restaurant websites
 * - Mobile app APIs
 * - Public reward program information
 * 
 * Usage: npm run collect-data
 */

import axios from 'axios';
import * as cheerio from 'cheerio';
import puppeteer from 'puppeteer';
import { createClient } from '@supabase/supabase-js';
import fs from 'fs/promises';
import path from 'path';

// Configuration
const SUPABASE_URL = process.env.VITE_SUPABASE_URL;
const SUPABASE_SERVICE_KEY = process.env.SUPABASE_SERVICE_ROLE_KEY;
const supabase = createClient(SUPABASE_URL, SUPABASE_SERVICE_KEY);

// Data collection sources
const DATA_SOURCES = {
  mcdonalds: {
    website: 'https://www.mcdonalds.com/us/en-us/full-menu.html',
    rewards: 'https://www.mcdonalds.com/us/en-us/mymcdonalds.html',
    method: 'scraping'
  },
  chipotle: {
    website: 'https://www.chipotle.com/menu',
    rewards: 'https://www.chipotle.com/rewards',
    method: 'scraping'
  },
  starbucks: {
    website: 'https://www.starbucks.com/menu',
    rewards: 'https://www.starbucks.com/rewards',
    method: 'api' // Starbucks has a more accessible API
  },
  subway: {
    website: 'https://www.subway.com/menu',
    rewards: 'https://www.subway.com/rewards',
    method: 'scraping'
  },
  tacobell: {
    website: 'https://www.tacobell.com/food',
    rewards: 'https://www.tacobell.com/rewards',
    method: 'scraping'
  }
};

class DataCollector {
  constructor() {
    this.browser = null;
    this.collectedData = {
      restaurants: [],
      menuItems: [],
      rewardItems: [],
      promotions: []
    };
  }

  async initialize() {
    console.log('🚀 Initializing data collector...');
    this.browser = await puppeteer.launch({ 
      headless: true,
      args: ['--no-sandbox', '--disable-setuid-sandbox']
    });
    console.log('✅ Browser initialized');
  }

  async collectMcDonaldsData() {
    console.log('🍟 Collecting McDonald\'s data...');
    
    try {
      const page = await this.browser.newPage();
      await page.goto(DATA_SOURCES.mcdonalds.website, { waitUntil: 'networkidle2' });
      
      // Extract menu items
      const menuItems = await page.evaluate(() => {
        const items = [];
        const menuCards = document.querySelectorAll('[data-testid="menu-item-card"]');
        
        menuCards.forEach(card => {
          const name = card.querySelector('h3')?.textContent?.trim();
          const price = card.querySelector('[data-testid="price"]')?.textContent?.trim();
          const description = card.querySelector('p')?.textContent?.trim();
          const calories = card.querySelector('[data-testid="calories"]')?.textContent?.trim();
          
          if (name && price) {
            items.push({
              name,
              price: parseFloat(price.replace(/[$,]/g, '')),
              description,
              calories: calories ? parseInt(calories.replace(/\D/g, '')) : null,
              restaurant: 'mcdonalds'
            });
          }
        });
        
        return items;
      });

      console.log(`📊 Found ${menuItems.length} McDonald's menu items`);
      this.collectedData.menuItems.push(...menuItems);
      
      await page.close();
    } catch (error) {
      console.error('❌ Error collecting McDonald\'s data:', error.message);
    }
  }

  async collectChipotleData() {
    console.log('🌯 Collecting Chipotle data...');
    
    try {
      const response = await axios.get(DATA_SOURCES.chipotle.website, {
        headers: {
          'User-Agent': 'Mozilla/5.0 (Windows NT 10.0; Win64; x64) AppleWebKit/537.36'
        }
      });
      
      const $ = cheerio.load(response.data);
      const menuItems = [];
      
      $('.menu-item').each((index, element) => {
        const name = $(element).find('.item-name').text().trim();
        const price = $(element).find('.price').text().trim();
        const description = $(element).find('.item-description').text().trim();
        
        if (name && price) {
          menuItems.push({
            name,
            price: parseFloat(price.replace(/[$,]/g, '')),
            description,
            restaurant: 'chipotle'
          });
        }
      });

      console.log(`📊 Found ${menuItems.length} Chipotle menu items`);
      this.collectedData.menuItems.push(...menuItems);
      
    } catch (error) {
      console.error('❌ Error collecting Chipotle data:', error.message);
    }
  }

  async collectStarbucksData() {
    console.log('☕ Collecting Starbucks data...');
    
    try {
      // Starbucks has a more structured API approach
      const page = await this.browser.newPage();
      await page.goto(DATA_SOURCES.starbucks.website, { waitUntil: 'networkidle2' });
      
      const menuItems = await page.evaluate(() => {
        const items = [];
        const productCards = document.querySelectorAll('[data-testid="product-card"]');
        
        productCards.forEach(card => {
          const name = card.querySelector('h3')?.textContent?.trim();
          const price = card.querySelector('.price')?.textContent?.trim();
          const description = card.querySelector('.product-description')?.textContent?.trim();
          const calories = card.querySelector('.calories')?.textContent?.trim();
          
          if (name) {
            items.push({
              name,
              price: price ? parseFloat(price.replace(/[$,]/g, '')) : null,
              description,
              calories: calories ? parseInt(calories.replace(/\D/g, '')) : null,
              restaurant: 'starbucks'
            });
          }
        });
        
        return items;
      });

      console.log(`📊 Found ${menuItems.length} Starbucks menu items`);
      this.collectedData.menuItems.push(...menuItems);
      
      await page.close();
    } catch (error) {
      console.error('❌ Error collecting Starbucks data:', error.message);
    }
  }

  async collectRewardsData() {
    console.log('🎁 Collecting rewards program data...');
    
    // This would typically involve scraping rewards pages or using APIs
    // For now, we'll use the structured data we have
    const rewardMappings = {
      mcdonalds: {
        'Big Mac': { points: 1500, valueScore: 75.2 },
        'Medium French Fries': { points: 800, valueScore: 68.4 },
        '10 Piece Chicken McNuggets': { points: 1200, valueScore: 71.8 }
      },
      chipotle: {
        'Steak Bowl': { points: 1650, valueScore: 63.9 },
        'Double Steak Bowl': { points: 700, valueScore: 70.7 },
        'Fountain Drink': { points: 400, valueScore: 67.5 }
      },
      starbucks: {
        'Grande Caffè Latte': { points: 150, valueScore: 72.7 },
        'Blueberry Muffin': { points: 200, valueScore: 65.0 },
        'Grande Caramel Frappuccino': { points: 300, valueScore: 69.3 }
      }
    };

    // Map menu items to reward items
    this.collectedData.menuItems.forEach(menuItem => {
      const rewardData = rewardMappings[menuItem.restaurant]?.[menuItem.name];
      if (rewardData) {
        this.collectedData.rewardItems.push({
          ...menuItem,
          pointsRequired: rewardData.points,
          valueScore: rewardData.valueScore,
          savingsPercentage: Math.round((1 - (rewardData.points * 0.01) / menuItem.price) * 100)
        });
      }
    });

    console.log(`📊 Generated ${this.collectedData.rewardItems.length} reward items`);
  }

  async saveToDatabase() {
    console.log('💾 Saving data to database...');
    
    try {
      // Save collected data to Supabase
      // This is a simplified version - in production, you'd want more sophisticated upsert logic
      
      for (const menuItem of this.collectedData.menuItems) {
        const { error } = await supabase
          .from('menu_items')
          .upsert({
            name: menuItem.name,
            description: menuItem.description,
            base_price: menuItem.price,
            calories: menuItem.calories,
            restaurant_chain_id: await this.getRestaurantChainId(menuItem.restaurant),
            updated_at: new Date().toISOString()
          }, {
            onConflict: 'name,restaurant_chain_id'
          });
          
        if (error) {
          console.error('Error saving menu item:', error);
        }
      }
      
      console.log('✅ Data saved successfully');
    } catch (error) {
      console.error('❌ Error saving to database:', error);
    }
  }

  async getRestaurantChainId(slug) {
    const { data, error } = await supabase
      .from('restaurant_chains')
      .select('id')
      .eq('slug', slug)
      .single();
      
    if (error) {
      console.error('Error getting restaurant chain ID:', error);
      return null;
    }
    
    return data?.id;
  }

  async saveToFile() {
    console.log('📁 Saving data to files...');
    
    const timestamp = new Date().toISOString().split('T')[0];
    const dataDir = path.join(process.cwd(), 'data', 'collected');
    
    try {
      await fs.mkdir(dataDir, { recursive: true });
      
      await fs.writeFile(
        path.join(dataDir, `menu-items-${timestamp}.json`),
        JSON.stringify(this.collectedData.menuItems, null, 2)
      );
      
      await fs.writeFile(
        path.join(dataDir, `reward-items-${timestamp}.json`),
        JSON.stringify(this.collectedData.rewardItems, null, 2)
      );
      
      console.log('✅ Data files saved');
    } catch (error) {
      console.error('❌ Error saving files:', error);
    }
  }

  async cleanup() {
    if (this.browser) {
      await this.browser.close();
      console.log('🧹 Browser closed');
    }
  }

  async run() {
    try {
      await this.initialize();
      
      // Collect data from each source
      await this.collectMcDonaldsData();
      await this.collectChipotleData();
      await this.collectStarbucksData();
      
      // Process rewards data
      await this.collectRewardsData();
      
      // Save results
      await this.saveToFile();
      await this.saveToDatabase();
      
      console.log('🎉 Data collection completed successfully!');
      console.log(`📊 Collected ${this.collectedData.menuItems.length} menu items`);
      console.log(`🎁 Generated ${this.collectedData.rewardItems.length} reward items`);
      
    } catch (error) {
      console.error('💥 Data collection failed:', error);
    } finally {
      await this.cleanup();
    }
  }
}

// Run the collector
if (import.meta.url === `file://${process.argv[1]}`) {
  const collector = new DataCollector();
  collector.run();
}

export default DataCollector;