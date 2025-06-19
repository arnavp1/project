import React from 'react';
import { Star, Clock, TrendingUp } from 'lucide-react';
import { RewardItem } from '../types/rewards';
import { restaurants } from '../data/restaurants';

interface RewardCardProps {
  item: RewardItem;
  isFavorite: boolean;
  onToggleFavorite: (itemId: string) => void;
}

export function RewardCard({ item, isFavorite, onToggleFavorite }: RewardCardProps) {
  const restaurant = restaurants.find(r => r.id === item.restaurant);
  
  const getValueScoreColor = (score: number) => {
    if (score >= 70) return 'text-green-600 bg-green-100';
    if (score >= 60) return 'text-yellow-600 bg-yellow-100';
    return 'text-red-600 bg-red-100';
  };

  const getValueScoreLabel = (score: number) => {
    if (score >= 70) return 'Excellent';
    if (score >= 60) return 'Good';
    return 'Fair';
  };

  return (
    <div className="bg-white rounded-xl shadow-sm border border-gray-200 hover:shadow-md transition-all duration-300 overflow-hidden group">
      {item.isPromotion && (
        <div className="bg-gradient-to-r from-orange-500 to-red-500 text-white text-xs font-medium px-3 py-1 flex items-center space-x-1">
          <Clock className="w-3 h-3" />
          <span>Limited Time Offer</span>
          {item.promotionEnd && (
            <span>• Ends {new Date(item.promotionEnd).toLocaleDateString()}</span>
          )}
        </div>
      )}
      
      <div className="p-6">
        <div className="flex items-start justify-between mb-4">
          <div className="flex items-center space-x-3">
            <div className="text-2xl">{restaurant?.logo}</div>
            <div>
              <h3 className="font-semibold text-gray-900 group-hover:text-blue-600 transition-colors duration-200">
                {item.name}
              </h3>
              <p className="text-sm text-gray-600">{restaurant?.name} • {item.category}</p>
            </div>
          </div>
          
          <button
            onClick={() => onToggleFavorite(item.id)}
            className={`p-2 rounded-lg transition-all duration-200 ${
              isFavorite 
                ? 'text-yellow-500 bg-yellow-50 hover:bg-yellow-100' 
                : 'text-gray-400 hover:text-yellow-500 hover:bg-gray-50'
            }`}
          >
            <Star className={`w-5 h-5 ${isFavorite ? 'fill-current' : ''}`} />
          </button>
        </div>

        <div className="grid grid-cols-2 gap-4 mb-4">
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">Points Required</div>
            <div className="text-lg font-semibold text-gray-900">
              {item.points.toLocaleString()} {restaurant?.pointsName}
            </div>
          </div>
          
          <div className="bg-gray-50 rounded-lg p-3">
            <div className="text-xs text-gray-600 mb-1">Retail Price</div>
            <div className="text-lg font-semibold text-gray-900">
              ${item.retailPrice.toFixed(2)}
            </div>
          </div>
        </div>

        <div className="flex items-center justify-between">
          <div className="flex items-center space-x-2">
            <div className={`px-3 py-1 rounded-full text-sm font-medium ${getValueScoreColor(item.valueScore)}`}>
              {item.valueScore.toFixed(1)} • {getValueScoreLabel(item.valueScore)}
            </div>
          </div>
          
          <div className="flex items-center space-x-2 text-green-600">
            <TrendingUp className="w-4 h-4" />
            <span className="text-sm font-medium">{item.savingsPercentage}% savings</span>
          </div>
        </div>

        <div className="mt-4 pt-4 border-t border-gray-100">
          <div className="flex items-center justify-between text-xs text-gray-500">
            <span>Last updated: {new Date(item.lastUpdated).toLocaleDateString()}</span>
            <span>Value per point: ${(item.retailPrice / item.points).toFixed(4)}</span>
          </div>
        </div>
      </div>
    </div>
  );
}