import { RewardItem } from '../types/rewards';
import { restaurants } from './restaurants';

// Helper function to calculate value score for a restaurant
function calculateValueScore(restaurant: string, points: number, retailPrice: number): number {
  const restaurantData = restaurants.find(r => r.id === restaurant);
  if (!restaurantData) return 0;
  
  const pointsValue = points * restaurantData.pointValue;
  const valueScore = (pointsValue / retailPrice) * 100;
  return Math.round(valueScore * 10) / 10;
}

// Helper function to calculate savings percentage
function calculateSavingsPercentage(restaurant: string, points: number, retailPrice: number): number {
  const restaurantData = restaurants.find(r => r.id === restaurant);
  if (!restaurantData) return 0;
  
  const pointsValue = points * restaurantData.pointValue;
  const savings = ((retailPrice - pointsValue) / retailPrice) * 100;
  return Math.max(0, Math.round(savings * 10) / 10);
}

// McDonald's Rewards - Based on your image
export const rewardItems: RewardItem[] = [
  // 1,500 Points Tier
  {
    id: 'mcd-mcchicken',
    restaurant: 'mcdonalds',
    name: 'McChicken (Plain or Hot \'N Spicy)',
    category: 'Sandwiches',
    points: 1500,
    retailPrice: 1.39, // Approximate retail price
    valueScore: calculateValueScore('mcdonalds', 1500, 1.39),
    savingsPercentage: calculateSavingsPercentage('mcdonalds', 1500, 1.39),
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-hashbrowns',
    restaurant: 'mcdonalds',
    name: 'Hash Browns',
    category: 'Breakfast',
    points: 1500,
    retailPrice: 1.89,
    valueScore: calculateValueScore('mcdonalds', 1500, 1.89),
    savingsPercentage: calculateSavingsPercentage('mcdonalds', 1500, 1.89),
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-vanillacone',
    restaurant: 'mcdonalds',
    name: 'Vanilla Cone',
    category: 'Desserts',
    points: 1500,
    retailPrice: 1.29,
    valueScore: calculateValueScore('mcdonalds', 1500, 1.29),
    savingsPercentage: calculateSavingsPercentage('mcdonalds', 1500, 1.29),
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-cheeseburger',
    restaurant: 'mcdonalds',
    name: 'Cheeseburger',
    category: 'Burgers',
    points: 1500,
    retailPrice: 1.69,
    valueScore: calculateValueScore('mcdonalds', 1500, 1.69),
    savingsPercentage: calculateSavingsPercentage('mcdonalds', 1500, 1.69),
    lastUpdated: '2024-01-15'
  },

  // 3,000 Points Tier
  {
    id: 'mcd-mediumfries',
    restaurant: 'mcdonalds',
    name: 'Medium Fries',
    category: 'Sides',
    points: 3000,
    retailPrice: 2.89,
    valueScore: calculateValueScore('mcdonalds', 3000, 2.89),
    savingsPercentage: calculateSavingsPercentage('mcdonalds', 3000, 2.89),
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-sausageburrito',
    restaurant: 'mcdonalds',
    name: 'Sausage Burrito',
    category: 'Breakfast',
    points: 3000,
    retailPrice: 2.39,
    valueScore: calculateValueScore('mcdonalds', 3000, 2.39),
    savingsPercentage: calculateSavingsPercentage('mcdonalds', 3000, 2.39),
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-6pcnuggets',
    restaurant: 'mcdonalds',
    name: '6-pc Chicken McNuggets',
    category: 'Chicken',
    points: 3000,
    retailPrice: 3.49,
    valueScore: calculateValueScore('mcdonalds', 3000, 3.49),
    savingsPercentage: calculateSavingsPercentage('mcdonalds', 3000, 3.49),
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-largeicedcoffee',
    restaurant: 'mcdonalds',
    name: 'Large Iced Coffee',
    category: 'Beverages',
    points: 3000,
    retailPrice: 2.49,
    valueScore: calculateValueScore('mcdonalds', 3000, 2.49),
    savingsPercentage: calculateSavingsPercentage('mcdonalds', 3000, 2.49),
    lastUpdated: '2024-01-15'
  },

  // 4,500 Points Tier
  {
    id: 'mcd-largefries',
    restaurant: 'mcdonalds',
    name: 'Large Fries',
    category: 'Sides',
    points: 4500,
    retailPrice: 3.89,
    valueScore: calculateValueScore('mcdonalds', 4500, 3.89),
    savingsPercentage: calculateSavingsPercentage('mcdonalds', 4500, 3.89),
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-largefrappé',
    restaurant: 'mcdonalds',
    name: 'Large Frappé',
    category: 'Beverages',
    points: 4500,
    retailPrice: 4.79,
    valueScore: calculateValueScore('mcdonalds', 4500, 4.79),
    savingsPercentage: calculateSavingsPercentage('mcdonalds', 4500, 4.79),
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-filetofish',
    restaurant: 'mcdonalds',
    name: 'Filet-O-Fish',
    category: 'Sandwiches',
    points: 4500,
    retailPrice: 4.39,
    valueScore: calculateValueScore('mcdonalds', 4500, 4.39),
    savingsPercentage: calculateSavingsPercentage('mcdonalds', 4500, 4.39),
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-sausagemcmuffin',
    restaurant: 'mcdonalds',
    name: 'Sausage McMuffin® with Egg',
    category: 'Breakfast',
    points: 4500,
    retailPrice: 4.19,
    valueScore: calculateValueScore('mcdonalds', 4500, 4.19),
    savingsPercentage: calculateSavingsPercentage('mcdonalds', 4500, 4.19),
    lastUpdated: '2024-01-15'
  },

  // 6,000 Points Tier
  {
    id: 'mcd-bigmac',
    restaurant: 'mcdonalds',
    name: 'Big Mac',
    category: 'Burgers',
    points: 6000,
    retailPrice: 5.99,
    valueScore: calculateValueScore('mcdonalds', 6000, 5.99),
    savingsPercentage: calculateSavingsPercentage('mcdonalds', 6000, 5.99),
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-quarterpounder',
    restaurant: 'mcdonalds',
    name: 'Quarter Pounder® with Cheese',
    category: 'Burgers',
    points: 6000,
    retailPrice: 6.49,
    valueScore: calculateValueScore('mcdonalds', 6000, 6.49),
    savingsPercentage: calculateSavingsPercentage('mcdonalds', 6000, 6.49),
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-happymeal',
    restaurant: 'mcdonalds',
    name: 'Happy Meal®',
    category: 'Meals',
    points: 6000,
    retailPrice: 4.99,
    valueScore: calculateValueScore('mcdonalds', 6000, 4.99),
    savingsPercentage: calculateSavingsPercentage('mcdonalds', 6000, 4.99),
    lastUpdated: '2024-01-15'
  },
  {
    id: 'mcd-baconeggcheesebiscuit',
    restaurant: 'mcdonalds',
    name: 'Bacon, Egg & Cheese Biscuit',
    category: 'Breakfast',
    points: 6000,
    retailPrice: 4.79,
    valueScore: calculateValueScore('mcdonalds', 6000, 4.79),
    savingsPercentage: calculateSavingsPercentage('mcdonalds', 6000, 4.79),
    lastUpdated: '2024-01-15'
  }
];