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
import { rewardsAPI, RewardItem as SupabaseRewardItem, MenuItem, RewardProgram, RestaurantChain } from './lib/supabase';
import { mockRewardItems } from './data/mockData';

type ViewMode = 'rewards' | 'database' | 'api';

// Interface for the joined data structure returned by Supabase
interface SupabaseJoinedRewardItem extends SupabaseRewardItem {
  reward_programs?: RewardProgram & {
    restaurant_chains?: RestaurantChain;
  };
  menu_items?: MenuItem & {
    menu_categories?: {
      name: string;
      slug: string;
    };
  };
}

// Mapping function to transform Supabase data to frontend format
const mapSupabaseRewardItemToFrontendRewardItem = (item: SupabaseJoinedRewardItem): RewardItem => {
  const restaurant = item.reward_programs?.restaurant_chains;
  const menuItem = item.menu_items;
  const category = menuItem?.menu_categories?.name || 'Other';

  return {
    id: item.id,
    restaurant: restaurant?.slug || 'unknown',
    name: menuItem?.name || 'Unknown Item',
    category: category,
    points: item.points_required,
    retailPrice: menuItem?.base_price || 0,
    valueScore: item.value_score || 0,
    savingsPercentage: item.savings_percentage || 0,
    isPromotion: item.is_promotion,
    promotionEnd: item.promotion_end_date || undefined,
    lastUpdated: new Date(item.updated_at).toISOString().split('T')[0]
  };
};

function App() {
  const [currentView, setCurrentView] = useState<ViewMode>('rewards');
  const [searchTerm, setSearchTerm] = useState('');
  const [showFilters, setShowFilters] = useState(false);
  const [showFavorites, setShowFavorites] = useState(false);
  const [favorites, setFavorites] = useLocalStorage<string[]>('reward-favorites', []);
  
  // New state for real data
  const [rewardItems, setRewardItems] = useState<RewardItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [useMockData, setUseMockData] = useState(false);
  
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

  // Fetch real data from Supabase
  useEffect(() => {
    const fetchRewardItems = async () => {
      try {
        setLoading(true);
        setError(null);
        
        console.log('Starting data fetch...');
        const data = await rewardsAPI.getRewardItems();
        console.log('Raw data received:', data);
        
        if (data && Array.isArray(data) && data.length > 0) {
          // Check if we have the expected structure
          const firstItem = data[0];
          console.log('First item structure:', firstItem);
          
          if (firstItem.reward_programs && firstItem.menu_items) {
            // We have the full joined data
            const mappedItems = data.map(mapSupabaseRewardItemToFrontendRewardItem);
            console.log('Mapped items:', mappedItems.length);
            setRewardItems(mappedItems);
            setUseMockData(false);
          } else {
            // We have simple data, fall back to mock data for now
            console.log('Simple data structure detected, using mock data');
            setRewardItems(mockRewardItems);
            setUseMockData(true);
          }
        } else {
          // No data or empty array, use mock data
          console.log('No data received, using mock data');
          setRewardItems(mockRewardItems);
          setUseMockData(true);
        }
      } catch (err) {
        console.error('Error fetching reward items:', err);
        setError(`Failed to load reward items: ${err instanceof Error ? err.message : 'Unknown error'}`);
        // Fall back to mock data on error
        console.log('Error occurred, falling back to mock data');
        setRewardItems(mockRewardItems);
        setUseMockData(true);
      } finally {
        setLoading(false);
      }
    };

    fetchRewardItems();
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

  const handleRetry = () => {
    window.location.reload();
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
                  <p className="text-gray-600">Loading reward items...</p>
                  <p className="text-sm text-gray-500 mt-2">Connecting to database...</p>
                </div>
              </div>
            </main>
          );
        }

        return (
          <>
            {/* Data Source Indicator */}
            {useMockData && (
              <div className="bg-yellow-50 border border-yellow-200 px-4 py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-yellow-600">⚠️</span>
                    <span className="text-sm text-yellow-800">
                      Currently displaying sample data. Database connection in progress.
                    </span>
                  </div>
                  <button
                    onClick={handleRetry}
                    className="text-sm text-yellow-800 hover:text-yellow-900 underline"
                  >
                    Retry Connection
                  </button>
                </div>
              </div>
            )}

            {error && !useMockData && (
              <div className="bg-red-50 border border-red-200 px-4 py-3">
                <div className="max-w-7xl mx-auto flex items-center justify-between">
                  <div className="flex items-center space-x-2">
                    <span className="text-red-600">❌</span>
                    <span className="text-sm text-red-800">{error}</span>
                  </div>
                  <button
                    onClick={handleRetry}
                    className="text-sm text-red-800 hover:text-red-900 underline"
                  >
                    Try Again
                  </button>
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
                  {showFavorites ? 'Your Favorite Rewards' : 'Restaurant Rewards Analysis'}
                </h2>
                <p className="text-gray-600">
                  {showFavorites 
                    ? 'Track your saved reward options and never miss a great deal'
                    : 'Find the best value redemption options across major restaurant chains'
                  }
                </p>
                {useMockData && (
                  <p className="text-sm text-yellow-600 mt-1">
                    Showing comprehensive sample data including updated McDonald's Big Mac (6,000 points)
                  </p>
                )}
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
                        ? "No reward items are currently available."
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