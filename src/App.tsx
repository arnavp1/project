import React, { useState, useMemo, useEffect } from 'react';
import { Header } from './components/Header';
import { FilterPanel } from './components/FilterPanel';
import { SortControls } from './components/SortControls';
import { StatsOverview } from './components/StatsOverview';
import { RewardCard } from './components/RewardCard';
import { DatabaseDashboard } from './components/DatabaseDashboard';
import { APIDocumentation } from './components/APIDocumentation';
import { FilterOptions, SortOption, RewardItem } from './types/rewards';
import { useLocalStorage } from './hooks/useLocalStorage';
import { RewardsScraper } from './lib/rewardsScraper';

type ViewMode = 'rewards' | 'database' | 'api';

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('rewards');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useLocalStorage<string[]>('reward-favorites', []);
  
  // Real data state
  const [rewardItems, setRewardItems] = useState<RewardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [lastUpdated, setLastUpdated] = useState<string>('');
  
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

  // Initialize real-time data scraping
  useEffect(() => {
    const loadRealData = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('🚀 Starting real-time restaurant rewards data collection...');
        
        const scraper = new RewardsScraper();
        const realRewards = await scraper.scrapeAllRestaurants();
        
        if (realRewards && realRewards.length > 0) {
          console.log(`✅ Successfully loaded ${realRewards.length} real reward items`);
          setRewardItems(realRewards);
          setLastUpdated(new Date().toLocaleString());
        } else {
          throw new Error('No reward data could be collected from restaurant sources');
        }
        
      } catch (err) {
        console.error('💥 Error loading real reward data:', err);
        setError(`Failed to load real-time data: ${err instanceof Error ? err.message : 'Unknown error'}`);
      } finally {
        setLoading(false);
      }
    };

    loadRealData();
    
    // Set up auto-refresh every 30 minutes
    const refreshInterval = setInterval(loadRealData, 30 * 60 * 1000);
    
    return () => clearInterval(refreshInterval);
  }, []);

  const filteredAndSortedItems = useMemo(() => {
    let items = [...rewardItems];

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
  }, [searchTerm, filters, showFavorites, favorites, currentSort, rewardItems]);

  const toggleFavorite = (itemId: string) => {
    setFavorites(prev => 
      prev.includes(itemId)
        ? prev.filter(id => id !== itemId)
        : [...prev, itemId]
    );
  };

  const handleRefresh = async () => {
    setLoading(true);
    try {
      const scraper = new RewardsScraper();
      const freshData = await scraper.scrapeAllRestaurants();
      setRewardItems(freshData);
      setLastUpdated(new Date().toLocaleString());
      setError(null);
    } catch (err) {
      setError(`Refresh failed: ${err instanceof Error ? err.message : 'Unknown error'}`);
    } finally {
      setLoading(false);
    }
  };

  const renderContent = () => {
    switch (currentView) {
      case 'database':
        return <DatabaseDashboard />;
      case 'api':
        return <APIDocumentation />;
      default:
        // Handle loading and error states
        if (loading) {
          return (
            <main className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
              <div className="flex items-center justify-center h-64">
                <div className="text-center">
                  <div className="animate-spin rounded-full h-12 w-12 border-b-2 border-blue-600 mx-auto mb-4"></div>
                  <p className="text-gray-600">Collecting real-time reward data...</p>
                  <p className="text-sm text-gray-500 mt-2">
                    Scraping McDonald's, Starbucks, Chipotle, and other restaurant rewards...
                  </p>
                </div>
              </div>
            </main>
          );
        }

        return (
          <>
            {/* Real-time Data Status */}
            <div className="bg-green-50 border-b border-green-200 px-4 py-3">
              <div className="max-w-7xl mx-auto flex items-center justify-between">
                <div className="flex items-center space-x-2">
                  <span className="text-sm text-green-600">
                    ✅ Live data from {rewardItems.length} restaurant reward programs
                  </span>
                  <span className="text-xs text-green-500 bg-green-100 px-2 py-1 rounded">
                    Real-time scraping active
                  </span>
                </div>
                <div className="flex items-center space-x-4">
                  {lastUpdated && (
                    <span className="text-xs text-green-600">
                      Last updated: {lastUpdated}
                    </span>
                  )}
                  <button
                    onClick={handleRefresh}
                    disabled={loading}
                    className="text-sm text-green-800 hover:text-green-900 underline disabled:opacity-50"
                  >
                    Refresh Data
                  </button>
                </div>
              </div>
            </div>

            {error && (
              <div className="bg-red-50 border-b border-red-200 px-4 py-3">
                <div className="max-w-7xl mx-auto">
                  <div className="flex items-start space-x-2">
                    <span className="text-red-600 mt-0.5">❌</span>
                    <div className="flex-1">
                      <p className="text-sm text-red-800 font-medium">Data Collection Error</p>
                      <p className="text-xs text-red-700 mt-1">{error}</p>
                    </div>
                  </div>
                </div>
              </div>
            )}

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
                  {showFavorites ? 'Your Favorite Rewards' : 'Live Restaurant Rewards Analysis'}
                </h2>
                <p className="text-gray-600">
                  {showFavorites 
                    ? 'Track your saved reward options and never miss a great deal'
                    : 'Real-time data from restaurant apps and websites - find the best value redemption options'
                  }
                </p>
                <div className="mt-2 flex items-center space-x-4 text-sm text-gray-500">
                  <span>Data source: Live restaurant APIs & web scraping</span>
                  <span>Auto-refresh: Every 30 minutes</span>
                  <span>Coverage: 10+ major restaurant chains</span>
                </div>
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
                      : rewardItems.length === 0 
                        ? "No reward items are currently available from restaurant sources."
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