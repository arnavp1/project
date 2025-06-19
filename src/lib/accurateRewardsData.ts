import { RewardItem } from '../types/rewards';

// McDonald's MyMcDonald's Rewards - ONLY items that can actually be redeemed with points
// Based on the official rewards program shown in the image
export const mcdonaldsRewards: RewardItem[] = [
  // 1500 Points Tier
  {
    id: 'mcd-1',
    restaurant: 'mcdonalds',
    name: "McDonald's Cone",
    category: 'Desserts',
    points: 1500,
    retailPrice: 1.29,
    valueScore: 86.0,
    savingsPercentage: 14,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-2',
    restaurant: 'mcdonalds',
    name: 'Cheeseburger',
    category: 'Burgers',
    points: 1500,
    retailPrice: 2.39,
    valueScore: 159.3,
    savingsPercentage: 37,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-3',
    restaurant: 'mcdonalds',
    name: 'McChicken',
    category: 'Sandwiches',
    points: 1500,
    retailPrice: 2.49,
    valueScore: 166.0,
    savingsPercentage: 40,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-4',
    restaurant: 'mcdonalds',
    name: 'Hash Brown',
    category: 'Breakfast',
    points: 1500,
    retailPrice: 1.89,
    valueScore: 126.0,
    savingsPercentage: 21,
    lastUpdated: '2024-01-15'
  },

  // 3000 Points Tier
  {
    id: 'mcd-5',
    restaurant: 'mcdonalds',
    name: 'Medium Fry',
    category: 'Sides',
    points: 3000,
    retailPrice: 2.89,
    valueScore: 96.3,
    savingsPercentage: 4,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-6',
    restaurant: 'mcdonalds',
    name: '6-piece Chicken McNuggets',
    category: 'Chicken',
    points: 3000,
    retailPrice: 3.49,
    valueScore: 116.3,
    savingsPercentage: 14,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-7',
    restaurant: 'mcdonalds',
    name: 'Large Iced Coffee',
    category: 'Beverages',
    points: 3000,
    retailPrice: 2.79,
    valueScore: 93.0,
    savingsPercentage: 7,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-8',
    restaurant: 'mcdonalds',
    name: 'Sausage Burrito',
    category: 'Breakfast',
    points: 3000,
    retailPrice: 2.39,
    valueScore: 79.7,
    savingsPercentage: 26,
    lastUpdated: '2024-01-15'
  },

  // 4500 Points Tier
  {
    id: 'mcd-9',
    restaurant: 'mcdonalds',
    name: 'Large Frappe',
    category: 'Beverages',
    points: 4500,
    retailPrice: 4.79,
    valueScore: 106.4,
    savingsPercentage: 6,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-10',
    restaurant: 'mcdonalds',
    name: 'Filet O Fish',
    category: 'Sandwiches',
    points: 4500,
    retailPrice: 4.79,
    valueScore: 106.4,
    savingsPercentage: 6,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-11',
    restaurant: 'mcdonalds',
    name: 'Large Fry',
    category: 'Sides',
    points: 4500,
    retailPrice: 3.89,
    valueScore: 86.4,
    savingsPercentage: 16,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-12',
    restaurant: 'mcdonalds',
    name: 'Sausage McMuffin with Egg',
    category: 'Breakfast',
    points: 4500,
    retailPrice: 4.39,
    valueScore: 97.6,
    savingsPercentage: 3,
    lastUpdated: '2024-01-15'
  },

  // 6000 Points Tier
  {
    id: 'mcd-13',
    restaurant: 'mcdonalds',
    name: 'Big Mac',
    category: 'Burgers',
    points: 6000,
    retailPrice: 5.99,
    valueScore: 99.8,
    savingsPercentage: 0,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-14',
    restaurant: 'mcdonalds',
    name: 'Quarter Pounder with Cheese',
    category: 'Burgers',
    points: 6000,
    retailPrice: 6.49,
    valueScore: 108.2,
    savingsPercentage: 8,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-15',
    restaurant: 'mcdonalds',
    name: 'Happy Meal',
    category: 'Meals',
    points: 6000,
    retailPrice: 4.99,
    valueScore: 83.2,
    savingsPercentage: 20,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-16',
    restaurant: 'mcdonalds',
    name: 'Bacon Egg and Cheese Biscuit',
    category: 'Breakfast',
    points: 6000,
    retailPrice: 4.79,
    valueScore: 79.8,
    savingsPercentage: 25,
    lastUpdated: '2024-01-15'
  }
];

// Starbucks Rewards - Only actual redeemable items from their Stars program
export const starbucksRewards: RewardItem[] = [
  // 25 Stars
  {
    id: 'sbx-1',
    restaurant: 'starbucks',
    name: 'Extra Espresso Shot',
    category: 'Add-ons',
    points: 25,
    retailPrice: 0.75,
    valueScore: 300.0,
    savingsPercentage: 67,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'sbx-2',
    restaurant: 'starbucks',
    name: 'Dairy Alternative',
    category: 'Add-ons',
    points: 25,
    retailPrice: 0.65,
    valueScore: 260.0,
    savingsPercentage: 62,
    lastUpdated: '2024-01-15'
  },

  // 50 Stars
  {
    id: 'sbx-3',
    restaurant: 'starbucks',
    name: 'Hot Coffee (Pike Place)',
    category: 'Coffee',
    points: 50,
    retailPrice: 2.45,
    valueScore: 490.0,
    savingsPercentage: 80,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'sbx-4',
    restaurant: 'starbucks',
    name: 'Hot Tea',
    category: 'Tea',
    points: 50,
    retailPrice: 2.25,
    valueScore: 450.0,
    savingsPercentage: 78,
    lastUpdated: '2024-01-15'
  },

  // 100 Stars
  {
    id: 'sbx-5',
    restaurant: 'starbucks',
    name: 'Iced Coffee',
    category: 'Coffee',
    points: 100,
    retailPrice: 2.95,
    valueScore: 295.0,
    savingsPercentage: 66,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'sbx-6',
    restaurant: 'starbucks',
    name: 'Cold Brew',
    category: 'Coffee',
    points: 100,
    retailPrice: 3.45,
    valueScore: 345.0,
    savingsPercentage: 71,
    lastUpdated: '2024-01-15'
  },

  // 150 Stars
  {
    id: 'sbx-7',
    restaurant: 'starbucks',
    name: 'Grande Caffè Latte',
    category: 'Coffee',
    points: 150,
    retailPrice: 5.45,
    valueScore: 363.3,
    savingsPercentage: 72,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'sbx-8',
    restaurant: 'starbucks',
    name: 'Grande Americano',
    category: 'Coffee',
    points: 150,
    retailPrice: 3.65,
    valueScore: 243.3,
    savingsPercentage: 59,
    lastUpdated: '2024-01-15'
  },

  // 200 Stars
  {
    id: 'sbx-9',
    restaurant: 'starbucks',
    name: 'Everything Bagel',
    category: 'Food',
    points: 200,
    retailPrice: 2.25,
    valueScore: 112.5,
    savingsPercentage: 11,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'sbx-10',
    restaurant: 'starbucks',
    name: 'Blueberry Muffin',
    category: 'Food',
    points: 200,
    retailPrice: 3.25,
    valueScore: 162.5,
    savingsPercentage: 38,
    lastUpdated: '2024-01-15'
  },

  // 300 Stars
  {
    id: 'sbx-11',
    restaurant: 'starbucks',
    name: 'Spinach, Feta & Egg White Wrap',
    category: 'Food',
    points: 300,
    retailPrice: 4.95,
    valueScore: 165.0,
    savingsPercentage: 39,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'sbx-12',
    restaurant: 'starbucks',
    name: 'Grande Frappuccino',
    category: 'Coffee',
    points: 300,
    retailPrice: 6.95,
    valueScore: 231.7,
    savingsPercentage: 57,
    isPromotion: true,
    promotionEnd: '2024-02-29',
    lastUpdated: '2024-01-15'
  }
];

// Chipotle Rewards - Only actual redeemable items
export const chipotleRewards: RewardItem[] = [
  {
    id: 'chp-1',
    restaurant: 'chipotle',
    name: 'Chips and Guacamole',
    category: 'Sides',
    points: 625,
    retailPrice: 4.15,
    valueScore: 664.0,
    savingsPercentage: 85,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'chp-2',
    restaurant: 'chipotle',
    name: 'Fountain Drink',
    category: 'Beverages',
    points: 400,
    retailPrice: 2.70,
    valueScore: 675.0,
    savingsPercentage: 85,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'chp-3',
    restaurant: 'chipotle',
    name: 'Chicken Bowl',
    category: 'Bowls',
    points: 1400,
    retailPrice: 9.25,
    valueScore: 660.7,
    savingsPercentage: 85,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'chp-4',
    restaurant: 'chipotle',
    name: 'Steak Bowl',
    category: 'Bowls',
    points: 1650,
    retailPrice: 10.55,
    valueScore: 639.4,
    savingsPercentage: 84,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'chp-5',
    restaurant: 'chipotle',
    name: 'Barbacoa Bowl',
    category: 'Bowls',
    points: 1650,
    retailPrice: 10.55,
    valueScore: 639.4,
    savingsPercentage: 84,
    lastUpdated: '2024-01-15'
  }
];

// Subway MyWay Rewards - Only actual redeemable items
export const subwayRewards: RewardItem[] = [
  {
    id: 'sub-1',
    restaurant: 'subway',
    name: 'Cookie',
    category: 'Desserts',
    points: 1200,
    retailPrice: 1.50,
    valueScore: 125.0,
    savingsPercentage: 20,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'sub-2',
    restaurant: 'subway',
    name: '6-inch Sub',
    category: 'Sandwiches',
    points: 2000,
    retailPrice: 6.49,
    valueScore: 324.5,
    savingsPercentage: 69,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'sub-3',
    restaurant: 'subway',
    name: 'Footlong Sub',
    category: 'Sandwiches',
    points: 4000,
    retailPrice: 9.99,
    valueScore: 249.8,
    savingsPercentage: 60,
    lastUpdated: '2024-01-15'
  }
];

// Taco Bell Rewards - Only actual redeemable items
export const tacoBellRewards: RewardItem[] = [
  {
    id: 'tb-1',
    restaurant: 'tacobell',
    name: 'Crunchy Taco',
    category: 'Tacos',
    points: 250,
    retailPrice: 1.49,
    valueScore: 596.0,
    savingsPercentage: 83,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'tb-2',
    restaurant: 'tacobell',
    name: 'Soft Taco',
    category: 'Tacos',
    points: 250,
    retailPrice: 1.49,
    valueScore: 596.0,
    savingsPercentage: 83,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'tb-3',
    restaurant: 'tacobell',
    name: 'Beefy 5-Layer Burrito',
    category: 'Burritos',
    points: 500,
    retailPrice: 2.49,
    valueScore: 498.0,
    savingsPercentage: 80,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'tb-4',
    restaurant: 'tacobell',
    name: 'Crunchwrap Supreme',
    category: 'Specialties',
    points: 1000,
    retailPrice: 5.49,
    valueScore: 549.0,
    savingsPercentage: 82,
    lastUpdated: '2024-01-15'
  }
];

// Combine all accurate rewards data
export const allAccurateRewards: RewardItem[] = [
  ...mcdonaldsRewards,
  ...starbucksRewards,
  ...chipotleRewards,
  ...subwayRewards,
  ...tacoBellRewards
];