import { createClient } from '@supabase/supabase-js';

const supabaseUrl = import.meta.env.VITE_SUPABASE_URL;
const supabaseAnonKey = import.meta.env.VITE_SUPABASE_ANON_KEY;

if (!supabaseUrl || !supabaseAnonKey) {
  throw new Error('Missing Supabase environment variables');
}

export const supabase = createClient(supabaseUrl, supabaseAnonKey);

// Database types
export interface RestaurantChain {
  id: string;
  name: string;
  slug: string;
  logo_url?: string;
  primary_color: string;
  website_url?: string;
  app_store_url?: string;
  google_play_url?: string;
  headquarters_location?: string;
  founded_year?: number;
  total_locations?: number;
  countries_operating?: string[];
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RewardProgram {
  id: string;
  restaurant_chain_id: string;
  program_name: string;
  points_currency_name: string;
  points_currency_symbol: string;
  signup_bonus_points: number;
  minimum_age_requirement: number;
  points_expiration_months?: number;
  tier_system_enabled: boolean;
  mobile_app_required: boolean;
  email_verification_required: boolean;
  phone_verification_required: boolean;
  birthday_bonus_enabled: boolean;
  referral_bonus_points: number;
  spending_multiplier: number;
  is_active: boolean;
  program_launch_date?: string;
  last_major_update?: string;
  created_at: string;
  updated_at: string;
}

export interface MenuItem {
  id: string;
  restaurant_chain_id: string;
  category_id?: string;
  name: string;
  description?: string;
  base_price: number;
  calories?: number;
  ingredients?: string[];
  allergens?: string[];
  nutritional_info?: any;
  size_variants?: any;
  customization_options?: any;
  availability_regions?: string[];
  is_limited_time: boolean;
  limited_time_end?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface RewardItem {
  id: string;
  reward_program_id: string;
  menu_item_id: string;
  points_required: number;
  cash_equivalent?: number;
  value_score?: number;
  savings_percentage?: number;
  minimum_purchase_required: number;
  maximum_redemptions_per_day?: number;
  maximum_redemptions_per_month?: number;
  member_tier_required?: string;
  special_conditions?: string;
  is_promotion: boolean;
  promotion_start_date?: string;
  promotion_end_date?: string;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

export interface Promotion {
  id: string;
  restaurant_chain_id: string;
  reward_program_id: string;
  title: string;
  description?: string;
  promotion_type: string;
  bonus_points: number;
  discount_percentage: number;
  discount_amount: number;
  minimum_spend: number;
  maximum_uses_per_customer?: number;
  total_redemption_limit?: number;
  applicable_items?: string[];
  excluded_items?: string[];
  promo_code?: string;
  start_date: string;
  end_date: string;
  terms_and_conditions?: string;
  target_regions?: string[];
  is_app_exclusive: boolean;
  is_new_member_only: boolean;
  is_active: boolean;
  created_at: string;
  updated_at: string;
}

// API Functions
export const rewardsAPI = {
  // Restaurant Chains
  async getRestaurantChains() {
    try {
      const { data, error } = await supabase
        .from('restaurant_chains')
        .select('*')
        .eq('is_active', true)
        .order('name');
      
      if (error) {
        console.error('Error fetching restaurant chains:', error);
        throw error;
      }
      return data as RestaurantChain[];
    } catch (error) {
      console.error('Restaurant chains API error:', error);
      throw error;
    }
  },

  // Reward Programs
  async getRewardPrograms(restaurantChainId?: string) {
    try {
      let query = supabase
        .from('reward_programs')
        .select(`
          *,
          restaurant_chains (*)
        `)
        .eq('is_active', true);

      if (restaurantChainId) {
        query = query.eq('restaurant_chain_id', restaurantChainId);
      }

      const { data, error } = await query.order('program_name');
      if (error) {
        console.error('Error fetching reward programs:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Reward programs API error:', error);
      throw error;
    }
  },

  // Menu Items
  async getMenuItems(restaurantChainId?: string, categoryId?: string) {
    try {
      let query = supabase
        .from('menu_items')
        .select(`
          *,
          menu_categories (*)
        `)
        .eq('is_active', true);

      if (restaurantChainId) {
        query = query.eq('restaurant_chain_id', restaurantChainId);
      }

      if (categoryId) {
        query = query.eq('category_id', categoryId);
      }

      const { data, error } = await query.order('name');
      if (error) {
        console.error('Error fetching menu items:', error);
        throw error;
      }
      return data;
    } catch (error) {
      console.error('Menu items API error:', error);
      throw error;
    }
  },

  // Reward Items with detailed information - Simplified version
  async getRewardItems(filters?: {
    restaurantChainId?: string;
    minPoints?: number;
    maxPoints?: number;
    minValueScore?: number;
    showPromotionsOnly?: boolean;
  }) {
    try {
      console.log('Fetching reward items...');
      
      // First, try a simple query to see if the tables exist and have data
      const { data: simpleData, error: simpleError } = await supabase
        .from('reward_items')
        .select('*')
        .eq('is_active', true)
        .limit(5);

      if (simpleError) {
        console.error('Simple reward items query failed:', simpleError);
        throw simpleError;
      }

      console.log('Simple reward items query successful:', simpleData?.length || 0, 'items');

      // If simple query works, try the complex join
      const { data, error } = await supabase
        .from('reward_items')
        .select(`
          *,
          reward_programs!inner (
            *,
            restaurant_chains!inner (*)
          ),
          menu_items!inner (
            *,
            menu_categories (*)
          )
        `)
        .eq('is_active', true)
        .limit(50);

      if (error) {
        console.error('Complex reward items query failed:', error);
        // Fall back to simple query if complex join fails
        console.log('Falling back to simple query...');
        return simpleData || [];
      }

      console.log('Complex reward items query successful:', data?.length || 0, 'items');
      return data || [];
    } catch (error) {
      console.error('Reward items API error:', error);
      throw error;
    }
  },

  // Promotions
  async getActivePromotions(restaurantChainId?: string) {
    try {
      let query = supabase
        .from('promotions')
        .select(`
          *,
          restaurant_chains (*),
          reward_programs (*)
        `)
        .eq('is_active', true)
        .lte('start_date', new Date().toISOString().split('T')[0])
        .gte('end_date', new Date().toISOString().split('T')[0]);

      if (restaurantChainId) {
        query = query.eq('restaurant_chain_id', restaurantChainId);
      }

      const { data, error } = await query.order('start_date', { ascending: false });
      if (error) {
        console.error('Error fetching promotions:', error);
        throw error;
      }
      return data as Promotion[];
    } catch (error) {
      console.error('Promotions API error:', error);
      throw error;
    }
  },

  // Analytics
  async getRewardsAnalytics() {
    try {
      // Simple analytics calculation
      const { data: rewardItems, error } = await supabase
        .from('reward_items')
        .select('*')
        .eq('is_active', true);

      if (error) {
        console.error('Error fetching analytics:', error);
        throw error;
      }

      return {
        totalRewards: rewardItems?.length || 0,
        totalMenuItems: 0, // Will be calculated separately if needed
        averageValueScore: 0 // Will be calculated separately if needed
      };
    } catch (error) {
      console.error('Analytics API error:', error);
      throw error;
    }
  },

  // Search functionality
  async searchRewardItems(searchTerm: string) {
    try {
      const { data, error } = await supabase
        .from('reward_items')
        .select(`
          *,
          reward_programs (
            *,
            restaurant_chains (*)
          ),
          menu_items (
            *,
            menu_categories (*)
          )
        `)
        .eq('is_active', true)
        .limit(20);

      if (error) {
        console.error('Error searching reward items:', error);
        throw error;
      }
      return data || [];
    } catch (error) {
      console.error('Search API error:', error);
      throw error;
    }
  }
};