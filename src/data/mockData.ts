import { RewardItem } from '../types/rewards';

export const mockRewardItems: RewardItem[] = [
  // McDonald's - Updated with accurate point values
  {
    id: 'mcd-1',
    restaurant: 'mcdonalds',
    name: 'Big Mac',
    category: 'Burgers',
    points: 6000,
    retailPrice: 5.99,
    valueScore: 59.9,
    savingsPercentage: 40,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-2',
    restaurant: 'mcdonalds',
    name: 'Quarter Pounder with Cheese',
    category: 'Burgers',
    points: 6500,
    retailPrice: 6.49,
    valueScore: 59.9,
    savingsPercentage: 40,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-3',
    restaurant: 'mcdonalds',
    name: 'McDouble',
    category: 'Burgers',
    points: 4000,
    retailPrice: 2.79,
    valueScore: 69.8,
    savingsPercentage: 30,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-4',
    restaurant: 'mcdonalds',
    name: 'McChicken',
    category: 'Sandwiches',
    points: 2000,
    retailPrice: 1.39,
    valueScore: 69.5,
    savingsPercentage: 30,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-5',
    restaurant: 'mcdonalds',
    name: 'Filet-O-Fish',
    category: 'Sandwiches',
    points: 5500,
    retailPrice: 4.39,
    valueScore: 79.9,
    savingsPercentage: 20,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-6',
    restaurant: 'mcdonalds',
    name: '10 Piece Chicken McNuggets',
    category: 'Chicken',
    points: 6000,
    retailPrice: 4.99,
    valueScore: 83.2,
    savingsPercentage: 17,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-7',
    restaurant: 'mcdonalds',
    name: '20 Piece Chicken McNuggets',
    category: 'Chicken',
    points: 11000,
    retailPrice: 7.99,
    valueScore: 72.7,
    savingsPercentage: 27,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-8',
    restaurant: 'mcdonalds',
    name: 'Medium French Fries',
    category: 'Sides',
    points: 2500,
    retailPrice: 2.89,
    valueScore: 86.7,
    savingsPercentage: 13,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-9',
    restaurant: 'mcdonalds',
    name: 'Large French Fries',
    category: 'Sides',
    points: 4500,
    retailPrice: 3.89,
    valueScore: 86.4,
    savingsPercentage: 14,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-10',
    restaurant: 'mcdonalds',
    name: 'McFlurry with M&Ms',
    category: 'Desserts',
    points: 6000,
    retailPrice: 4.49,
    valueScore: 74.8,
    savingsPercentage: 25,
    isPromotion: true,
    promotionEnd: '2024-02-29',
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-11',
    restaurant: 'mcdonalds',
    name: 'Egg McMuffin',
    category: 'Breakfast',
    points: 5500,
    retailPrice: 4.39,
    valueScore: 79.9,
    savingsPercentage: 20,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-12',
    restaurant: 'mcdonalds',
    name: 'Hotcakes',
    category: 'Breakfast',
    points: 6500,
    retailPrice: 4.99,
    valueScore: 76.8,
    savingsPercentage: 23,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-13',
    restaurant: 'mcdonalds',
    name: 'Hash Browns',
    category: 'Breakfast',
    points: 2500,
    retailPrice: 1.89,
    valueScore: 75.6,
    savingsPercentage: 24,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-14',
    restaurant: 'mcdonalds',
    name: 'Large Soft Drink',
    category: 'Beverages',
    points: 3000,
    retailPrice: 2.19,
    valueScore: 73.0,
    savingsPercentage: 27,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-15',
    restaurant: 'mcdonalds',
    name: 'McCafé Premium Roast Coffee',
    category: 'Beverages',
    points: 1500,
    retailPrice: 1.00,
    valueScore: 66.7,
    savingsPercentage: 33,
    lastUpdated: '2024-01-15'
  },
  
  // Starbucks - Stars system (different point structure)
  {
    id: 'sbx-1',
    restaurant: 'starbucks',
    name: 'Grande Caffè Latte',
    category: 'Coffee',
    points: 150,
    retailPrice: 5.45,
    valueScore: 72.7,
    savingsPercentage: 27,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'sbx-2',
    restaurant: 'starbucks',
    name: 'Pike Place Roast',
    category: 'Coffee',
    points: 50,
    retailPrice: 2.45,
    valueScore: 98.0,
    savingsPercentage: 2,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'sbx-3',
    restaurant: 'starbucks',
    name: 'Grande Americano',
    category: 'Coffee',
    points: 150,
    retailPrice: 3.65,
    valueScore: 48.7,
    savingsPercentage: 51,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'sbx-4',
    restaurant: 'starbucks',
    name: 'Grande Caramel Frappuccino',
    category: 'Coffee',
    points: 300,
    retailPrice: 6.95,
    valueScore: 69.3,
    savingsPercentage: 31,
    isPromotion: true,
    promotionEnd: '2024-01-31',
    lastUpdated: '2024-01-15'
  },
  {
    id: 'sbx-5',
    restaurant: 'starbucks',
    name: 'Blueberry Muffin',
    category: 'Food',
    points: 200,
    retailPrice: 3.25,
    valueScore: 65.0,
    savingsPercentage: 35,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'sbx-6',
    restaurant: 'starbucks',
    name: 'Everything Bagel',
    category: 'Food',
    points: 200,
    retailPrice: 2.25,
    valueScore: 22.5,
    savingsPercentage: 78,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'sbx-7',
    restaurant: 'starbucks',
    name: 'Spinach, Feta & Egg White Wrap',
    category: 'Food',
    points: 300,
    retailPrice: 4.95,
    valueScore: 33.0,
    savingsPercentage: 67,
    lastUpdated: '2024-01-15'
  },
  
  // Chipotle
  {
    id: 'chp-1',
    restaurant: 'chipotle',
    name: 'Chicken Bowl',
    category: 'Bowls',
    points: 1400,
    retailPrice: 9.25,
    valueScore: 66.1,
    savingsPercentage: 34,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'chp-2',
    restaurant: 'chipotle',
    name: 'Double Steak Bowl',
    category: 'Bowls',
    points: 700,
    retailPrice: 4.95,
    valueScore: 70.7,
    savingsPercentage: 29,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'chp-3',
    restaurant: 'chipotle',
    name: 'Steak Burrito',
    category: 'Burritos',
    points: 1650,
    retailPrice: 10.55,
    valueScore: 63.9,
    savingsPercentage: 36,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'chp-4',
    restaurant: 'chipotle',
    name: 'Barbacoa Bowl',
    category: 'Bowls',
    points: 1400,
    retailPrice: 10.55,
    valueScore: 75.4,
    savingsPercentage: 25,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'chp-5',
    restaurant: 'chipotle',
    name: 'Fountain Drink',
    category: 'Beverages',
    points: 400,
    retailPrice: 2.70,
    valueScore: 67.5,
    savingsPercentage: 33,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'chp-6',
    restaurant: 'chipotle',
    name: 'Chips and Guacamole',
    category: 'Sides',
    points: 625,
    retailPrice: 4.15,
    valueScore: 66.4,
    savingsPercentage: 34,
    lastUpdated: '2024-01-15'
  },
  
  // Subway - Limited redemption options
  {
    id: 'sub-1',
    restaurant: 'subway',
    name: 'Footlong Italian B.M.T.',
    category: 'Sandwiches',
    points: 4000,
    retailPrice: 9.99,
    valueScore: 62.4,
    savingsPercentage: 38,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'sub-2',
    restaurant: 'subway',
    name: '6-inch Turkey Breast',
    category: 'Sandwiches',
    points: 2000,
    retailPrice: 6.49,
    valueScore: 64.9,
    savingsPercentage: 35,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'sub-3',
    restaurant: 'subway',
    name: 'Chocolate Chip Cookie',
    category: 'Desserts',
    points: 1200,
    retailPrice: 1.50,
    valueScore: 50.0,
    savingsPercentage: 50,
    lastUpdated: '2024-01-15'
  }
];