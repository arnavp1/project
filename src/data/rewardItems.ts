import { RewardItem } from '../types/rewards';

// This is where you'll add all the reward items you collect
// I'll start with a few examples to show the format
export const rewardItems: RewardItem[] = [
  // McDonald's Examples
  {
    id: 'mcd-1',
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
    id: 'mcd-2',
    restaurant: 'mcdonalds',
    name: 'Medium French Fries',
    category: 'Sides',
    points: 3000,
    retailPrice: 2.89,
    valueScore: 96.3,
    savingsPercentage: 4,
    lastUpdated: '2024-01-15'
  },
  
  // Starbucks Examples
  {
    id: 'sbx-1',
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
    id: 'sbx-2',
    restaurant: 'starbucks',
    name: 'Pike Place Roast',
    category: 'Coffee',
    points: 50,
    retailPrice: 2.45,
    valueScore: 490.0,
    savingsPercentage: 80,
    lastUpdated: '2024-01-15'
  },
  
  // Chipotle Examples
  {
    id: 'chp-1',
    restaurant: 'chipotle',
    name: 'Chicken Bowl',
    category: 'Bowls',
    points: 1400,
    retailPrice: 9.25,
    valueScore: 660.7,
    savingsPercentage: 85,
    lastUpdated: '2024-01-15'
  }
];