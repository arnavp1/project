export interface RewardItem {
  id: string;
  restaurant: string;
  name: string;
  category: string;
  points: number;
  retailPrice: number;
  valueScore: number;
  savingsPercentage: number;
  isPromotion?: boolean;
  promotionEnd?: string;
  historicalPrices?: number[];
  lastUpdated: string;
}

export interface Restaurant {
  id: string;
  name: string;
  logo: string;
  primaryColor: string;
  pointsName: string;
  pointValue: number; // Dollar value per point for this restaurant
}

export interface FilterOptions {
  restaurants: string[];
  categories: string[];
  minPoints: number;
  maxPoints: number;
  minValue: number;
  showPromotionsOnly: boolean;
}

export interface SortOption {
  key: keyof RewardItem;
  direction: 'asc' | 'desc';
  label: string;
}