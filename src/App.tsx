import React, { useState, useMemo } from 'react';
import { Header } from './components/Header';
import { FilterPanel } from './components/FilterPanel';
import { SortControls } from './components/SortControls';
import { StatsOverview } from './components/StatsOverview';
import { RewardCard } from './components/RewardCard';
import { DatabaseDashboard } from './components/DatabaseDashboard';
import { APIDocumentation } from './components/APIDocumentation';
import { mockRewardItems } from './data/mockData';
import { FilterOptions, SortOption } from './types/rewards';
import { useLocalStorage } from './hooks/useLocalStorage';

type ViewMode = 'rewards' | 'database' | 'api';

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('rewards');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useLocalStorage<string[]>('reward-favorites', []);
  
  const [filters, setFilters] = useState<FilterOptions>({
    restaurants: [],
    categories: [],
    minPoints: 0,
    maxPoints: 10000,
    minValue: 0,
    showPromotionsOnly: false
  });

  const [currentSort, setCurrentSort] = useState<SortOption>({
    key: 'valueScore',
    direction: 'desc',
    label: 'Best Value'
  });

  const filteredAndSortedItems = useMemo(() => {
    let items = [...mockRewardItems];

    // Apply search filter
    if (searchTerm) {
      items = items.filter(item =>
        item.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        item.category.toLowerCase().includes(searchTerm.toLowerCase())
      );
    }

    // Apply restaurant filter
    if (filters.restaurants.length > 0) {
      items = items.filter(item => filters.restaurants.includes(item.restaurant));
    }

    // Apply category filter
    if (filters.categories.length > 0) {
      items = items.filter(item => filters.categories.includes(item.category));
    }

    // Apply point range filter
    items = items.filter(item => 
      item.points >= filters.minPoints && item.points <= filters.maxPoints
    );

    // Apply value score filter
    items = items.filter(item => item.valueScore >= filters.minValue);

    // Apply promotion filter
    if (filters.showPromotionsOnly) {
      items = items.filter(item => item.isPromotion);
    }

    // Apply favorites filter
    if (showFavorites) {
      items = items.filter(item => favorites.includes(item.id));
    }

    // Apply sorting
    items.sort((a, b) => {
      const aValue = a[currentSort.key];
      const bValue = b[currentSort.key];
      
      if (typeof aValue === 'string' && typeof bValue === 'string') {
        return currentSort.direction === 'asc' 
          ? aValue.localeCompare(bValue)
          : bValue.localeCompare(aValue);
      }
      
      if (typeof aValue === 'number' && typeof bValue === 'number') {
        return currentSort.direction === 'asc' 
          ? aValue - bValue
          : bValue - aValue;
      }
      
      return 0;
    });

    return items;
  }, [searchTerm, filters, showFavorites, favorites, currentSort, mockRewardItems]);

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => 
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const renderContent = () => {
    switch (currentView) {
      case 'database':
        return <DatabaseDashboard />;
      case 'api':
        return <APIDocumentation />;
      default:
        return (
          <>
            {showFilters && (
              <FilterPanel
                filters={filters}
                onFiltersChange={setFilters}
                onClose={() => setShowFilters(false)}
              />
            )}

            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="mb-8">
                <h2 className="text-3xl font-bold text-gray-900 mb-2">
                  {showFavorites ? 'Your Favorite Rewards' : 'Restaurant Rewards Analysis'}
                </h2>
                <p className="text-gray-600">
                  {showFavorites 
                    ? 'Track your saved reward options and never miss a great deal'
                    : 'Find the best value redemption options across major restaurant chains'
                  }
                </p>
              </div>

              <StatsOverview items={filteredAndSortedItems} />

              <SortControls
                currentSort={currentSort}
                onSortChange={setCurrentSort}
                totalItems={filteredAndSortedItems.length}
              />

              {filteredAndSortedItems.length === 0 ? (
                <div className="text-center py-12">
                  <div className="text-gray-400 text-6xl mb-4">🍽️</div>
                  <h3 className="text-lg font-medium text-gray-900 mb-2">No rewards found</h3>
                  <p className="text-gray-600">
                    {showFavorites 
                      ? "You haven't saved any favorites yet. Start browsing to find great deals!"
                      : "Try adjusting your search or filters to find more options."
                    }
                  </p>
                </div>
              ) : (
                <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
                  {filteredAndSortedItems.map(item => (
                    <RewardCard
                      key={item.id}
                      item={item}
                      isFavorite={favorites.includes(item.id)}
                      onToggleFavorite={toggleFavorite}
                    />
                  ))}
                </div>
              )}
            </main>
          </>
        );
    }
  };

  return (
    <div className="min-h-screen bg-gray-50">
      <Header
        searchTerm={searchTerm}
        onSearchChange={setSearchTerm}
        onFilterToggle={() => setShowFilters(!showFilters)}
        onFavoritesToggle={() => setShowFavorites(!showFavorites)}
        showFilters={showFilters}
        showFavorites={showFavorites}
        currentView={currentView}
        onViewChange={setCurrentView}
      />

      {renderContent()}
    </div>
  );
}

export default App;