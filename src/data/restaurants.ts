import { Restaurant } from '../types/rewards';

export const restaurants: Restaurant[] = [
  {
    id: 'mcdonalds',
    name: "McDonald's",
    logo: '🍟',
    primaryColor: '#FFC72C',
    pointsName: 'Points',
    // McDonald's specific value calculation
    // Based on their points system where 1500 points = ~$1.50 value
    pointValue: 0.001 // $0.001 per point
  }
];