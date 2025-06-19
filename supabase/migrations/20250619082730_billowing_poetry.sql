/*
  # Seed Initial Restaurant Data

  1. Insert major fast food chains
  2. Create their reward programs
  3. Add menu categories
  4. Insert sample menu items and reward redemptions
  5. Add data sources for tracking
*/

-- Insert Restaurant Chains
INSERT INTO restaurant_chains (name, slug, logo_url, primary_color, website_url, app_store_url, google_play_url, headquarters_location, founded_year, total_locations, countries_operating) VALUES
('McDonald''s', 'mcdonalds', 'https://images.pexels.com/photos/4393021/pexels-photo-4393021.jpeg', '#FFC72C', 'https://www.mcdonalds.com', 'https://apps.apple.com/us/app/mcdonalds/id922103212', 'https://play.google.com/store/apps/details?id=com.mcdonalds.app', 'Chicago, IL, USA', 1940, 40000, ARRAY['USA', 'Canada', 'UK', 'Australia', 'Germany', 'France', 'Japan']),
('Chipotle', 'chipotle', 'https://images.pexels.com/photos/4958792/pexels-photo-4958792.jpeg', '#A81612', 'https://www.chipotle.com', 'https://apps.apple.com/us/app/chipotle/id327228455', 'https://play.google.com/store/apps/details?id=com.chipotle.ordering', 'Newport Beach, CA, USA', 1993, 3200, ARRAY['USA', 'Canada', 'UK', 'Germany', 'France']),
('Starbucks', 'starbucks', 'https://images.pexels.com/photos/302899/pexels-photo-302899.jpeg', '#00704A', 'https://www.starbucks.com', 'https://apps.apple.com/us/app/starbucks/id331177714', 'https://play.google.com/store/apps/details?id=com.starbucks.mobilecard', 'Seattle, WA, USA', 1971, 35000, ARRAY['USA', 'Canada', 'UK', 'China', 'Japan', 'South Korea', 'Mexico']),
('Subway', 'subway', 'https://images.pexels.com/photos/7595072/pexels-photo-7595072.jpeg', '#00543D', 'https://www.subway.com', 'https://apps.apple.com/us/app/subway/id1068924829', 'https://play.google.com/store/apps/details?id=com.subway.mobile.subwayapp', 'Milford, CT, USA', 1965, 37000, ARRAY['USA', 'Canada', 'UK', 'Australia', 'Brazil', 'India', 'Mexico']),
('Taco Bell', 'tacobell', 'https://images.pexels.com/photos/4958641/pexels-photo-4958641.jpeg', '#702F8A', 'https://www.tacobell.com', 'https://apps.apple.com/us/app/taco-bell/id497387361', 'https://play.google.com/store/apps/details?id=com.tacobell.ordering', 'Irvine, CA, USA', 1962, 8000, ARRAY['USA', 'Canada', 'UK', 'Spain', 'India', 'Guatemala']),
('KFC', 'kfc', 'https://images.pexels.com/photos/60616/fried-chicken-chicken-fried-crunchy-60616.jpeg', '#E4002B', 'https://www.kfc.com', 'https://apps.apple.com/us/app/kfc/id397467934', 'https://play.google.com/store/apps/details?id=com.yum.kfc', 'Louisville, KY, USA', 1930, 27000, ARRAY['USA', 'Canada', 'UK', 'Australia', 'China', 'Japan', 'India']),
('Burger King', 'burgerking', 'https://images.pexels.com/photos/1639557/pexels-photo-1639557.jpeg', '#EC1C24', 'https://www.bk.com', 'https://apps.apple.com/us/app/burger-king/id638323895', 'https://play.google.com/store/apps/details?id=com.emn.bk', 'Miami, FL, USA', 1954, 18000, ARRAY['USA', 'Canada', 'UK', 'Germany', 'Brazil', 'Turkey', 'Russia']),
('Wendy''s', 'wendys', 'https://images.pexels.com/photos/1633525/pexels-photo-1633525.jpeg', '#E31837', 'https://www.wendys.com', 'https://apps.apple.com/us/app/wendys/id540518599', 'https://play.google.com/store/apps/details?id=com.wendys.nutritiontool', 'Dublin, OH, USA', 1969, 7000, ARRAY['USA', 'Canada', 'UK', 'Philippines', 'Argentina', 'New Zealand']);

-- Insert Reward Programs
INSERT INTO reward_programs (restaurant_chain_id, program_name, points_currency_name, points_currency_symbol, signup_bonus_points, minimum_age_requirement, points_expiration_months, tier_system_enabled, mobile_app_required, email_verification_required, birthday_bonus_enabled, referral_bonus_points, spending_multiplier, program_launch_date, last_major_update) VALUES
((SELECT id FROM restaurant_chains WHERE slug = 'mcdonalds'), 'MyMcDonald''s Rewards', 'Points', 'pts', 1500, 13, 18, false, true, true, true, 1500, 100.00, '2021-07-08', '2024-01-15'),
((SELECT id FROM restaurant_chains WHERE slug = 'chipotle'), 'Chipotle Rewards', 'Points', 'pts', 0, 13, NULL, false, false, true, true, 0, 10.00, '2019-03-01', '2024-02-01'),
((SELECT id FROM restaurant_chains WHERE slug = 'starbucks'), 'Starbucks Rewards', 'Stars', '⭐', 0, 13, 6, true, false, true, true, 0, 2.00, '2009-01-01', '2023-09-15'),
((SELECT id FROM restaurant_chains WHERE slug = 'subway'), 'MyWay Rewards', 'Tokens', 'tokens', 250, 16, 12, false, true, true, false, 0, 4.00, '2018-11-01', '2023-08-20'),
((SELECT id FROM restaurant_chains WHERE slug = 'tacobell'), 'Taco Bell Rewards', 'Points', 'pts', 0, 13, 12, false, true, true, true, 0, 10.00, '2020-07-01', '2024-01-10'),
((SELECT id FROM restaurant_chains WHERE slug = 'kfc'), 'KFC Colonel''s Club', 'Points', 'pts', 1000, 13, 12, false, true, true, true, 500, 10.00, '2020-03-01', '2023-11-05'),
((SELECT id FROM restaurant_chains WHERE slug = 'burgerking'), 'Royal Perks', 'Crowns', 'crowns', 500, 13, 6, false, true, true, true, 500, 10.00, '2021-09-01', '2024-01-01'),
((SELECT id FROM restaurant_chains WHERE slug = 'wendys'), 'Wendy''s Rewards', 'Points', 'pts', 0, 13, 12, false, true, true, true, 0, 10.00, '2020-09-01', '2023-10-15');

-- Insert Menu Categories for McDonald's
INSERT INTO menu_categories (restaurant_chain_id, name, slug, description, display_order) VALUES
((SELECT id FROM restaurant_chains WHERE slug = 'mcdonalds'), 'Burgers & Sandwiches', 'burgers-sandwiches', 'Classic burgers and chicken sandwiches', 1),
((SELECT id FROM restaurant_chains WHERE slug = 'mcdonalds'), 'Chicken & Fish', 'chicken-fish', 'Chicken nuggets, tenders, and fish options', 2),
((SELECT id FROM restaurant_chains WHERE slug = 'mcdonalds'), 'Fries & Sides', 'fries-sides', 'French fries and side items', 3),
((SELECT id FROM restaurant_chains WHERE slug = 'mcdonalds'), 'Beverages', 'beverages', 'Soft drinks, coffee, and other beverages', 4),
((SELECT id FROM restaurant_chains WHERE slug = 'mcdonalds'), 'Desserts', 'desserts', 'Ice cream, cookies, and sweet treats', 5),
((SELECT id FROM restaurant_chains WHERE slug = 'mcdonalds'), 'Breakfast', 'breakfast', 'Morning menu items', 6);

-- Insert Menu Categories for Chipotle
INSERT INTO menu_categories (restaurant_chain_id, name, slug, description, display_order) VALUES
((SELECT id FROM restaurant_chains WHERE slug = 'chipotle'), 'Bowls', 'bowls', 'Burrito bowls with your choice of ingredients', 1),
((SELECT id FROM restaurant_chains WHERE slug = 'chipotle'), 'Burritos', 'burritos', 'Wrapped burritos with fresh ingredients', 2),
((SELECT id FROM restaurant_chains WHERE slug = 'chipotle'), 'Tacos', 'tacos', 'Soft or crispy shell tacos', 3),
((SELECT id FROM restaurant_chains WHERE slug = 'chipotle'), 'Salads', 'salads', 'Fresh salads with protein and toppings', 4),
((SELECT id FROM restaurant_chains WHERE slug = 'chipotle'), 'Sides', 'sides', 'Chips, guacamole, and other sides', 5),
((SELECT id FROM restaurant_chains WHERE slug = 'chipotle'), 'Beverages', 'beverages', 'Drinks and beverages', 6);

-- Insert Menu Categories for Starbucks
INSERT INTO menu_categories (restaurant_chain_id, name, slug, description, display_order) VALUES
((SELECT id FROM restaurant_chains WHERE slug = 'starbucks'), 'Hot Coffees', 'hot-coffees', 'Espresso drinks, brewed coffee, and hot beverages', 1),
((SELECT id FROM restaurant_chains WHERE slug = 'starbucks'), 'Cold Coffees', 'cold-coffees', 'Iced coffees, cold brew, and frappuccinos', 2),
((SELECT id FROM restaurant_chains WHERE slug = 'starbucks'), 'Teas', 'teas', 'Hot and iced teas', 3),
((SELECT id FROM restaurant_chains WHERE slug = 'starbucks'), 'Food', 'food', 'Breakfast, lunch, and snack items', 4),
((SELECT id FROM restaurant_chains WHERE slug = 'starbucks'), 'Bakery', 'bakery', 'Pastries, muffins, and baked goods', 5);

-- Insert Sample Menu Items for McDonald's
INSERT INTO menu_items (restaurant_chain_id, category_id, name, description, base_price, calories, ingredients, allergens) VALUES
((SELECT id FROM restaurant_chains WHERE slug = 'mcdonalds'), (SELECT id FROM menu_categories WHERE slug = 'burgers-sandwiches' AND restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'mcdonalds')), 'Big Mac', 'Two all-beef patties, special sauce, lettuce, cheese, pickles, onions on a sesame seed bun', 5.99, 563, ARRAY['beef patty', 'special sauce', 'lettuce', 'cheese', 'pickles', 'onions', 'sesame seed bun'], ARRAY['wheat', 'soy', 'egg', 'milk']),
((SELECT id FROM restaurant_chains WHERE slug = 'mcdonalds'), (SELECT id FROM menu_categories WHERE slug = 'burgers-sandwiches' AND restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'mcdonalds')), 'Quarter Pounder with Cheese', 'Quarter pound of fresh beef with cheese, onions, pickles, ketchup, and mustard', 6.49, 520, ARRAY['beef patty', 'cheese', 'onions', 'pickles', 'ketchup', 'mustard', 'sesame seed bun'], ARRAY['wheat', 'milk']),
((SELECT id FROM restaurant_chains WHERE slug = 'mcdonalds'), (SELECT id FROM menu_categories WHERE slug = 'fries-sides' AND restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'mcdonalds')), 'Medium French Fries', 'Golden french fries cooked in vegetable oil', 2.89, 320, ARRAY['potatoes', 'vegetable oil', 'salt'], ARRAY[]),
((SELECT id FROM restaurant_chains WHERE slug = 'mcdonalds'), (SELECT id FROM menu_categories WHERE slug = 'chicken-fish' AND restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'mcdonalds')), '10 Piece Chicken McNuggets', 'Tender white meat chicken nuggets', 4.99, 420, ARRAY['chicken breast', 'breading', 'vegetable oil'], ARRAY['wheat']),
((SELECT id FROM restaurant_chains WHERE slug = 'mcdonalds'), (SELECT id FROM menu_categories WHERE slug = 'desserts' AND restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'mcdonalds')), 'McFlurry with M&Ms', 'Vanilla soft serve with M&M candies mixed in', 4.49, 630, ARRAY['vanilla soft serve', 'M&M candies'], ARRAY['milk', 'soy']);

-- Insert Sample Menu Items for Chipotle
INSERT INTO menu_items (restaurant_chain_id, category_id, name, description, base_price, calories, ingredients) VALUES
((SELECT id FROM restaurant_chains WHERE slug = 'chipotle'), (SELECT id FROM menu_categories WHERE slug = 'bowls' AND restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'chipotle')), 'Steak Bowl', 'Steak with rice, beans, and your choice of toppings', 10.55, 630, ARRAY['steak', 'cilantro-lime rice', 'black beans', 'fajita veggies']),
((SELECT id FROM restaurant_chains WHERE slug = 'chipotle'), (SELECT id FROM menu_categories WHERE slug = 'bowls' AND restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'chipotle')), 'Double Steak Bowl', 'Double portion of steak with rice, beans, and toppings', 4.95, 730, ARRAY['double steak', 'cilantro-lime rice', 'black beans']),
((SELECT id FROM restaurant_chains WHERE slug = 'chipotle'), (SELECT id FROM menu_categories WHERE slug = 'burritos' AND restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'chipotle')), 'Steak Burrito', 'Steak burrito with rice, beans, and your choice of toppings', 10.55, 1050, ARRAY['steak', 'flour tortilla', 'cilantro-lime rice', 'black beans']),
((SELECT id FROM restaurant_chains WHERE slug = 'chipotle'), (SELECT id FROM menu_categories WHERE slug = 'sides' AND restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'chipotle')), 'Chips and Guacamole', 'Freshly made tortilla chips with guacamole', 4.15, 770, ARRAY['tortilla chips', 'avocado', 'lime', 'cilantro', 'onion']),
((SELECT id FROM restaurant_chains WHERE slug = 'chipotle'), (SELECT id FROM menu_categories WHERE slug = 'beverages' AND restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'chipotle')), 'Fountain Drink', 'Soft drink beverage', 2.70, 150, ARRAY['carbonated water', 'high fructose corn syrup']);

-- Insert Sample Menu Items for Starbucks
INSERT INTO menu_items (restaurant_chain_id, category_id, name, description, base_price, calories, ingredients, allergens) VALUES
((SELECT id FROM restaurant_chains WHERE slug = 'starbucks'), (SELECT id FROM menu_categories WHERE slug = 'hot-coffees' AND restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'starbucks')), 'Grande Caffè Latte', 'Rich espresso balanced with steamed milk and a light layer of foam', 5.45, 190, ARRAY['espresso', 'steamed milk'], ARRAY['milk']),
((SELECT id FROM restaurant_chains WHERE slug = 'starbucks'), (SELECT id FROM menu_categories WHERE slug = 'cold-coffees' AND restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'starbucks')), 'Grande Caramel Frappuccino', 'Buttery caramel syrup blended with coffee, milk and ice', 6.95, 370, ARRAY['coffee', 'milk', 'caramel syrup', 'whipped cream'], ARRAY['milk']),
((SELECT id FROM restaurant_chains WHERE slug = 'starbucks'), (SELECT id FROM menu_categories WHERE slug = 'food' AND restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'starbucks')), 'Bacon, Gouda & Egg Sandwich', 'Applewood smoked bacon, aged Gouda and egg on an artisan roll', 5.95, 360, ARRAY['bacon', 'gouda cheese', 'egg', 'artisan roll'], ARRAY['wheat', 'milk', 'egg']),
((SELECT id FROM restaurant_chains WHERE slug = 'starbucks'), (SELECT id FROM menu_categories WHERE slug = 'bakery' AND restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'starbucks')), 'Blueberry Muffin', 'Moist muffin bursting with blueberries', 3.25, 350, ARRAY['flour', 'blueberries', 'sugar', 'eggs'], ARRAY['wheat', 'egg', 'milk']);

-- Insert Reward Items (Point Redemptions)
INSERT INTO reward_items (reward_program_id, menu_item_id, points_required, cash_equivalent, value_score, savings_percentage) VALUES
-- McDonald's Rewards
((SELECT id FROM reward_programs WHERE restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'mcdonalds')), (SELECT id FROM menu_items WHERE name = 'Big Mac'), 1500, 5.99, 75.2, 25),
((SELECT id FROM reward_programs WHERE restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'mcdonalds')), (SELECT id FROM menu_items WHERE name = 'Medium French Fries'), 800, 2.89, 68.4, 32),
((SELECT id FROM reward_programs WHERE restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'mcdonalds')), (SELECT id FROM menu_items WHERE name = '10 Piece Chicken McNuggets'), 1200, 4.99, 71.8, 28),
((SELECT id FROM reward_programs WHERE restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'mcdonalds')), (SELECT id FROM menu_items WHERE name = 'McFlurry with M&Ms'), 1200, 4.49, 71.8, 28),

-- Chipotle Rewards
((SELECT id FROM reward_programs WHERE restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'chipotle')), (SELECT id FROM menu_items WHERE name = 'Double Steak Bowl'), 700, 4.95, 70.7, 29),
((SELECT id FROM reward_programs WHERE restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'chipotle')), (SELECT id FROM menu_items WHERE name = 'Fountain Drink'), 400, 2.70, 67.5, 33),
((SELECT id FROM reward_programs WHERE restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'chipotle')), (SELECT id FROM menu_items WHERE name = 'Steak Burrito'), 1650, 10.55, 63.9, 36),

-- Starbucks Rewards
((SELECT id FROM reward_programs WHERE restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'starbucks')), (SELECT id FROM menu_items WHERE name = 'Grande Caffè Latte'), 150, 5.45, 72.7, 27),
((SELECT id FROM reward_programs WHERE restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'starbucks')), (SELECT id FROM menu_items WHERE name = 'Blueberry Muffin'), 200, 3.25, 65.0, 35),
((SELECT id FROM reward_programs WHERE restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'starbucks')), (SELECT id FROM menu_items WHERE name = 'Grande Caramel Frappuccino'), 300, 6.95, 69.3, 31);

-- Insert Sample Promotions
INSERT INTO promotions (restaurant_chain_id, reward_program_id, title, description, promotion_type, bonus_points, start_date, end_date, terms_and_conditions, is_app_exclusive) VALUES
((SELECT id FROM restaurant_chains WHERE slug = 'mcdonalds'), (SELECT id FROM reward_programs WHERE restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'mcdonalds')), 'Double Points Weekend', 'Earn double points on all purchases during weekend', 'double_points', 0, '2024-02-01', '2024-02-29', 'Valid on app orders only. Cannot be combined with other offers.', true),
((SELECT id FROM restaurant_chains WHERE slug = 'starbucks'), (SELECT id FROM reward_programs WHERE restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'starbucks')), 'Happy Hour Frappuccino', 'Buy one Frappuccino, get one 50% off', 'discount', 0, '2024-01-15', '2024-01-31', 'Valid 3-6 PM daily. App exclusive offer.', true),
((SELECT id FROM restaurant_chains WHERE slug = 'chipotle'), (SELECT id FROM reward_programs WHERE restaurant_chain_id = (SELECT id FROM restaurant_chains WHERE slug = 'chipotle')), 'Free Delivery February', 'Free delivery on orders over $10', 'discount', 0, '2024-02-01', '2024-02-29', 'Minimum order $10. Delivery areas only.', false);

-- Insert Data Sources
INSERT INTO data_sources (restaurant_chain_id, source_type, source_url, collection_method, collection_frequency, last_successful_collection, collection_status, data_quality_score) VALUES
((SELECT id FROM restaurant_chains WHERE slug = 'mcdonalds'), 'mobile_app', 'https://www.mcdonalds.com/us/en-us/full-menu.html', 'api_call', 'daily', now() - interval '2 hours', 'active', 95.5),
((SELECT id FROM restaurant_chains WHERE slug = 'chipotle'), 'website', 'https://www.chipotle.com/menu', 'scraping', 'daily', now() - interval '4 hours', 'active', 92.3),
((SELECT id FROM restaurant_chains WHERE slug = 'starbucks'), 'api', 'https://www.starbucks.com/menu', 'api_call', 'daily', now() - interval '1 hour', 'active', 98.7),
((SELECT id FROM restaurant_chains WHERE slug = 'subway'), 'website', 'https://www.subway.com/menu', 'scraping', 'weekly', now() - interval '2 days', 'active', 87.2),
((SELECT id FROM restaurant_chains WHERE slug = 'tacobell'), 'mobile_app', 'https://www.tacobell.com/food', 'api_call', 'daily', now() - interval '3 hours', 'active', 94.1);