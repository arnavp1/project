import { RewardItem } from '../types/rewards';

export const mockRewardItems: RewardItem[] = [
  // McDonald's
  {
    id: 'mcd-1',
    restaurant: 'mcdonalds',
    name: 'Big Mac',
    category: 'Burgers',
    points: 1500,
    retailPrice: 5.99,
    valueScore: 75.2,
    savingsPercentage: 25,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-2',
    restaurant: 'mcdonalds',
    name: 'Medium Fries',
    category: 'Sides',
    points: 800,
    retailPrice: 2.89,
    valueScore: 68.4,
    savingsPercentage: 32,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-3',
    restaurant: 'mcdonalds',
    name: 'McFlurry',
    category: 'Desserts',
    points: 1200,
    retailPrice: 4.49,
    valueScore: 71.8,
    savingsPercentage: 28,
    isPromotion: true,
    promotionEnd: '2024-02-29',
    lastUpdated: '2024-01-15'
  },
  
  // Chipotle
  {
    id: 'chp-1',
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
    id: 'chp-2',
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
  
  // Starbucks
  {
    id: 'sbx-1',
    restaurant: 'starbucks',
    name: 'Grande Latte',
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
    name: 'Blueberry Muffin',
    category: 'Food',
    points: 200,
    retailPrice: 3.25,
    valueScore: 65.0,
    savingsPercentage: 35,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'sbx-3',
    restaurant: 'starbucks',
    name: 'Frappuccino',
    category: 'Coffee',
    points: 300,
    retailPrice: 6.95,
    valueScore: 69.3,
    savingsPercentage: 31,
    isPromotion: true,
    promotionEnd: '2024-01-31',
    lastUpdated: '2024-01-15'
  },
  
  // Subway
  {
    id: 'sub-1',
    restaurant: 'subway',
    name: 'Footlong Turkey',
    category: 'Sandwiches',
    points: 4500,
    retailPrice: 12.99,
    valueScore: 57.7,
    savingsPercentage: 42,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'sub-2',
    restaurant: 'subway',
    name: 'Chocolate Chip Cookie',
    category: 'Desserts',
    points: 1200,
    retailPrice: 1.50,
    valueScore: 50.0,
    savingsPercentage: 50,
    lastUpdated: '2024-01-15'
  },
  
  // Taco Bell
  {
    id: 'tb-1',
    restaurant: 'tacobell',
    name: 'Crunchy Taco Supreme',
    category: 'Tacos',
    points: 1000,
    retailPrice: 2.49,
    valueScore: 62.2,
    savingsPercentage: 38,
    lastUpdated: '2024-01-15'
  },
  {
    id: 'tb-2',
    restaurant: 'tacobell',
    name: 'Beefy 5-Layer Burrito',
    category: 'Burritos',
    points: 2000,
    retailPrice: 4.99,
    valueScore: 59.9,
    savingsPercentage: 40,
    lastUpdated: '2024-01-15'
  }
];