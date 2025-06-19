/*
  # Fast Food Rewards Database Schema

  1. New Tables
    - `restaurant_chains` - Master list of restaurant chains
    - `reward_programs` - Details of each chain's reward program
    - `menu_categories` - Food categories (burgers, drinks, etc.)
    - `menu_items` - Individual menu items with pricing
    - `reward_items` - Items available for redemption
    - `point_values` - Historical point values and conversions
    - `promotions` - Special offers and limited-time deals
    - `program_terms` - Terms and conditions for each program
    - `data_sources` - Tracking of data collection sources
    - `update_logs` - Audit trail of data updates

  2. Security
    - Enable RLS on all tables
    - Add policies for authenticated users to read data
    - Admin-only policies for data modification

  3. Indexes
    - Performance indexes on frequently queried columns
    - Composite indexes for complex queries
*/

-- Restaurant Chains
CREATE TABLE IF NOT EXISTS restaurant_chains (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  name text NOT NULL,
  slug text UNIQUE NOT NULL,
  logo_url text,
  primary_color text DEFAULT '#000000',
  website_url text,
  app_store_url text,
  google_play_url text,
  headquarters_location text,
  founded_year integer,
  total_locations integer,
  countries_operating text[],
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Reward Programs
CREATE TABLE IF NOT EXISTS reward_programs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_chain_id uuid REFERENCES restaurant_chains(id) ON DELETE CASCADE,
  program_name text NOT NULL,
  points_currency_name text DEFAULT 'Points',
  points_currency_symbol text DEFAULT 'pts',
  signup_bonus_points integer DEFAULT 0,
  minimum_age_requirement integer DEFAULT 13,
  points_expiration_months integer,
  tier_system_enabled boolean DEFAULT false,
  mobile_app_required boolean DEFAULT false,
  email_verification_required boolean DEFAULT true,
  phone_verification_required boolean DEFAULT false,
  birthday_bonus_enabled boolean DEFAULT false,
  referral_bonus_points integer DEFAULT 0,
  spending_multiplier numeric(3,2) DEFAULT 1.00,
  is_active boolean DEFAULT true,
  program_launch_date date,
  last_major_update date,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Menu Categories
CREATE TABLE IF NOT EXISTS menu_categories (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_chain_id uuid REFERENCES restaurant_chains(id) ON DELETE CASCADE,
  name text NOT NULL,
  slug text NOT NULL,
  description text,
  display_order integer DEFAULT 0,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now(),
  UNIQUE(restaurant_chain_id, slug)
);

-- Menu Items
CREATE TABLE IF NOT EXISTS menu_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_chain_id uuid REFERENCES restaurant_chains(id) ON DELETE CASCADE,
  category_id uuid REFERENCES menu_categories(id) ON DELETE SET NULL,
  name text NOT NULL,
  description text,
  base_price numeric(6,2) NOT NULL,
  calories integer,
  ingredients text[],
  allergens text[],
  nutritional_info jsonb,
  size_variants jsonb,
  customization_options jsonb,
  availability_regions text[],
  is_limited_time boolean DEFAULT false,
  limited_time_end date,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Reward Items (Items available for point redemption)
CREATE TABLE IF NOT EXISTS reward_items (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reward_program_id uuid REFERENCES reward_programs(id) ON DELETE CASCADE,
  menu_item_id uuid REFERENCES menu_items(id) ON DELETE CASCADE,
  points_required integer NOT NULL,
  cash_equivalent numeric(6,2),
  value_score numeric(5,2),
  savings_percentage numeric(5,2),
  minimum_purchase_required numeric(6,2) DEFAULT 0,
  maximum_redemptions_per_day integer,
  maximum_redemptions_per_month integer,
  member_tier_required text,
  special_conditions text,
  is_promotion boolean DEFAULT false,
  promotion_start_date date,
  promotion_end_date date,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Point Values (Historical tracking)
CREATE TABLE IF NOT EXISTS point_values (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reward_item_id uuid REFERENCES reward_items(id) ON DELETE CASCADE,
  points_required integer NOT NULL,
  cash_value numeric(6,2) NOT NULL,
  value_per_point numeric(8,6) GENERATED ALWAYS AS (cash_value / NULLIF(points_required, 0)) STORED,
  effective_date date NOT NULL,
  end_date date,
  change_reason text,
  data_source text,
  created_at timestamptz DEFAULT now()
);

-- Promotions
CREATE TABLE IF NOT EXISTS promotions (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_chain_id uuid REFERENCES restaurant_chains(id) ON DELETE CASCADE,
  reward_program_id uuid REFERENCES reward_programs(id) ON DELETE CASCADE,
  title text NOT NULL,
  description text,
  promotion_type text NOT NULL, -- 'bonus_points', 'discount', 'free_item', 'double_points'
  bonus_points integer DEFAULT 0,
  discount_percentage numeric(5,2) DEFAULT 0,
  discount_amount numeric(6,2) DEFAULT 0,
  minimum_spend numeric(6,2) DEFAULT 0,
  maximum_uses_per_customer integer,
  total_redemption_limit integer,
  applicable_items uuid[],
  excluded_items uuid[],
  promo_code text,
  start_date date NOT NULL,
  end_date date NOT NULL,
  terms_and_conditions text,
  target_regions text[],
  is_app_exclusive boolean DEFAULT false,
  is_new_member_only boolean DEFAULT false,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Program Terms
CREATE TABLE IF NOT EXISTS program_terms (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  reward_program_id uuid REFERENCES reward_programs(id) ON DELETE CASCADE,
  section_title text NOT NULL,
  content text NOT NULL,
  section_order integer DEFAULT 0,
  last_updated date NOT NULL,
  version_number text,
  is_active boolean DEFAULT true,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Data Sources
CREATE TABLE IF NOT EXISTS data_sources (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  restaurant_chain_id uuid REFERENCES restaurant_chains(id) ON DELETE CASCADE,
  source_type text NOT NULL, -- 'website', 'mobile_app', 'api', 'manual'
  source_url text,
  api_endpoint text,
  collection_method text, -- 'scraping', 'api_call', 'manual_entry'
  collection_frequency text, -- 'daily', 'weekly', 'monthly'
  last_successful_collection timestamptz,
  last_collection_attempt timestamptz,
  collection_status text DEFAULT 'active', -- 'active', 'inactive', 'error'
  error_message text,
  data_quality_score numeric(3,2) DEFAULT 100.00,
  created_at timestamptz DEFAULT now(),
  updated_at timestamptz DEFAULT now()
);

-- Update Logs
CREATE TABLE IF NOT EXISTS update_logs (
  id uuid PRIMARY KEY DEFAULT gen_random_uuid(),
  table_name text NOT NULL,
  record_id uuid NOT NULL,
  operation text NOT NULL, -- 'INSERT', 'UPDATE', 'DELETE'
  old_values jsonb,
  new_values jsonb,
  changed_by uuid,
  change_reason text,
  data_source_id uuid REFERENCES data_sources(id),
  created_at timestamptz DEFAULT now()
);

-- Enable Row Level Security
ALTER TABLE restaurant_chains ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_programs ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_categories ENABLE ROW LEVEL SECURITY;
ALTER TABLE menu_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE reward_items ENABLE ROW LEVEL SECURITY;
ALTER TABLE point_values ENABLE ROW LEVEL SECURITY;
ALTER TABLE promotions ENABLE ROW LEVEL SECURITY;
ALTER TABLE program_terms ENABLE ROW LEVEL SECURITY;
ALTER TABLE data_sources ENABLE ROW LEVEL SECURITY;
ALTER TABLE update_logs ENABLE ROW LEVEL SECURITY;

-- Public read access policies
CREATE POLICY "Public read access for restaurant_chains"
  ON restaurant_chains FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Public read access for reward_programs"
  ON reward_programs FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Public read access for menu_categories"
  ON menu_categories FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Public read access for menu_items"
  ON menu_items FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Public read access for reward_items"
  ON reward_items FOR SELECT
  TO public
  USING (is_active = true);

CREATE POLICY "Public read access for point_values"
  ON point_values FOR SELECT
  TO public
  USING (true);

CREATE POLICY "Public read access for promotions"
  ON promotions FOR SELECT
  TO public
  USING (is_active = true AND start_date <= CURRENT_DATE AND end_date >= CURRENT_DATE);

CREATE POLICY "Public read access for program_terms"
  ON program_terms FOR SELECT
  TO public
  USING (is_active = true);

-- Admin policies for data modification
CREATE POLICY "Admin full access for restaurant_chains"
  ON restaurant_chains FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin full access for reward_programs"
  ON reward_programs FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin full access for menu_categories"
  ON menu_categories FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin full access for menu_items"
  ON menu_items FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin full access for reward_items"
  ON reward_items FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin full access for point_values"
  ON point_values FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin full access for promotions"
  ON promotions FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin full access for program_terms"
  ON program_terms FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin full access for data_sources"
  ON data_sources FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

CREATE POLICY "Admin full access for update_logs"
  ON update_logs FOR ALL
  TO authenticated
  USING (auth.jwt() ->> 'role' = 'admin');

-- Performance Indexes
CREATE INDEX IF NOT EXISTS idx_restaurant_chains_slug ON restaurant_chains(slug);
CREATE INDEX IF NOT EXISTS idx_restaurant_chains_active ON restaurant_chains(is_active);

CREATE INDEX IF NOT EXISTS idx_reward_programs_chain ON reward_programs(restaurant_chain_id);
CREATE INDEX IF NOT EXISTS idx_reward_programs_active ON reward_programs(is_active);

CREATE INDEX IF NOT EXISTS idx_menu_items_chain ON menu_items(restaurant_chain_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_category ON menu_items(category_id);
CREATE INDEX IF NOT EXISTS idx_menu_items_active ON menu_items(is_active);

CREATE INDEX IF NOT EXISTS idx_reward_items_program ON reward_items(reward_program_id);
CREATE INDEX IF NOT EXISTS idx_reward_items_menu_item ON reward_items(menu_item_id);
CREATE INDEX IF NOT EXISTS idx_reward_items_points ON reward_items(points_required);
CREATE INDEX IF NOT EXISTS idx_reward_items_value_score ON reward_items(value_score);
CREATE INDEX IF NOT EXISTS idx_reward_items_active ON reward_items(is_active);

CREATE INDEX IF NOT EXISTS idx_point_values_reward_item ON point_values(reward_item_id);
CREATE INDEX IF NOT EXISTS idx_point_values_date ON point_values(effective_date);

CREATE INDEX IF NOT EXISTS idx_promotions_chain ON promotions(restaurant_chain_id);
CREATE INDEX IF NOT EXISTS idx_promotions_dates ON promotions(start_date, end_date);
CREATE INDEX IF NOT EXISTS idx_promotions_active ON promotions(is_active);

CREATE INDEX IF NOT EXISTS idx_update_logs_table_record ON update_logs(table_name, record_id);
CREATE INDEX IF NOT EXISTS idx_update_logs_created_at ON update_logs(created_at);