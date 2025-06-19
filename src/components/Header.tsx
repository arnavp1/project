import React from 'react';
import { Search, Filter, Star } from 'lucide-react';

interface HeaderProps {
  searchTerm: string;
  onSearchChange: (term: string) => void;
  onFilterToggle: () => void;
  onFavoritesToggle: () => void;
  showFilters: boolean;
  showFavorites: boolean;
}

export function Header({ 
  searchTerm, 
  onSearchChange, 
  onFilterToggle, 
  onFavoritesToggle,
  showFilters,
  showFavorites
}: HeaderProps) {
  return (
    <header className="bg-white shadow-sm border-b border-gray-200">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16">
          <div className="flex items-center space-x-4">
            <div className="flex items-center space-x-2">
              <div className="w-8 h-8 bg-gradient-to-r from-blue-600 to-purple-600 rounded-lg flex items-center justify-center">
                <span className="text-white font-bold text-sm">R</span>
              </div>
              <h1 className="text-xl font-bold text-gray-900">Rewards Analyzer</h1>
            </div>
          </div>
          
          <div className="flex items-center space-x-4">
            <div className="relative">
              <Search className="absolute left-3 top-1/2 transform -translate-y-1/2 text-gray-400 w-4 h-4" />
              <input
                type="text"
                placeholder="Search items..."
                value={searchTerm}
                onChange={(e) => onSearchChange(e.target.value)}
                className="pl-10 pr-4 py-2 border border-gray-300 rounded-lg focus:ring-2 focus:ring-blue-500 focus:border-transparent outline-none transition-all duration-200 w-64"
              />
            </div>
            
            <button
              onClick={onFilterToggle}
              className={`p-2 rounded-lg transition-all duration-200 ${
                showFilters 
                  ? 'bg-blue-100 text-blue-700 hover:bg-blue-200' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Filter className="w-5 h-5" />
            </button>
            
            <button
              onClick={onFavoritesToggle}
              className={`p-2 rounded-lg transition-all duration-200 ${
                showFavorites 
                  ? 'bg-yellow-100 text-yellow-700 hover:bg-yellow-200' 
                  : 'text-gray-600 hover:bg-gray-100'
              }`}
            >
              <Star className="w-5 h-5" />
            </button>
          </div>
        </div>
      </div>
    </header>
  );
}