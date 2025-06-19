import React from 'react';
import { X } from 'lucide-react';
import { FilterOptions } from '../types/rewards';
import { restaurants } from '../data/restaurants';

interface FilterPanelProps {
  filters: FilterOptions;
  onFiltersChange: (filters: FilterOptions) => void;
  onClose: () => void;
}

export function FilterPanel({ filters, onFiltersChange, onClose }: FilterPanelProps) {
  const categories = ['Burgers', 'Sandwiches', 'Chicken', 'Sides', 'Breakfast', 'Beverages', 'Desserts', 'Meals'];

  const handleRestaurantToggle = (restaurantId: string) => {
    const newRestaurants = filters.restaurants.includes(restaurantId)
      ? filters.restaurants.filter(id => id !== restaurantId)
      : [...filters.restaurants, restaurantId];
    
    onFiltersChange({ ...filters, restaurants: newRestaurants });
  };

  const handleCategoryToggle = (category: string) => {
    const newCategories = filters.categories.includes(category)
      ? filters.categories.filter(cat => cat !== category)
      : [...filters.categories, category];
    
    onFiltersChange({ ...filters, categories: newCategories });
  };

  const clearAllFilters = () => {
    onFiltersChange({
      restaurants: [],
      categories: [],
      minPoints: 0,
      maxPoints: 10000,
      minValue: 0,
      showPromotionsOnly: false
    });
  };

  return (
    <div className="bg-white border-b border-gray-200 p-6">
      <div className="max-w-7xl mx-auto">
        <div className="flex items-center justify-between mb-6">
          <h2 className="text-lg font-semibold text-gray-900">Filters</h2>
          <div className="flex items-center space-x-2">
            <button
              onClick={clearAllFilters}
              className="text-sm text-blue-600 hover:text-blue-800 transition-colors duration-200"
            >
              Clear All
            </button>
            <button
              onClick={onClose}
              className="p-1 hover:bg-gray-100 rounded-lg transition-colors duration-200"
            >
              <X className="w-5 h-5 text-gray-500" />
            </button>
          </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          {/* Restaurants */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Restaurants</h3>
            <div className="space-y-2">
              {restaurants.map(restaurant => (
                <label key={restaurant.id} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.restaurants.includes(restaurant.id)}
                    onChange={() => handleRestaurantToggle(restaurant.id)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-lg">{restaurant.logo}</span>
                  <span className="text-sm text-gray-700">{restaurant.name}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Categories */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Categories</h3>
            <div className="space-y-2">
              {categories.map(category => (
                <label key={category} className="flex items-center space-x-2 cursor-pointer">
                  <input
                    type="checkbox"
                    checked={filters.categories.includes(category)}
                    onChange={() => handleCategoryToggle(category)}
                    className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                  />
                  <span className="text-sm text-gray-700">{category}</span>
                </label>
              ))}
            </div>
          </div>

          {/* Point Range */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Point Range</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Min Points</label>
                <input
                  type="number"
                  value={filters.minPoints}
                  onChange={(e) => onFiltersChange({ ...filters, minPoints: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  min="0"
                />
              </div>
              <div>
                <label className="block text-xs text-gray-600 mb-1">Max Points</label>
                <input
                  type="number"
                  value={filters.maxPoints}
                  onChange={(e) => onFiltersChange({ ...filters, maxPoints: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  min="0"
                />
              </div>
            </div>
          </div>

          {/* Value & Promotions */}
          <div>
            <h3 className="text-sm font-medium text-gray-900 mb-3">Value & Promotions</h3>
            <div className="space-y-4">
              <div>
                <label className="block text-xs text-gray-600 mb-1">Min Value Score</label>
                <input
                  type="number"
                  value={filters.minValue}
                  onChange={(e) => onFiltersChange({ ...filters, minValue: Number(e.target.value) })}
                  className="w-full px-3 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none"
                  min="0"
                  max="200"
                />
              </div>
              <label className="flex items-center space-x-2 cursor-pointer">
                <input
                  type="checkbox"
                  checked={filters.showPromotionsOnly}
                  onChange={(e) => onFiltersChange({ ...filters, showPromotionsOnly: e.target.checked })}
                  className="rounded border-gray-300 text-blue-600 focus:ring-blue-500"
                />
                <span className="text-sm text-gray-700">Promotions Only</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}