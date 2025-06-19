export async function testDatabaseConnection() {
  try {
    console.log('🔍 Testing database connection...');
    
    // Import the supabase client
    const { supabase } = await import('./supabase');
    
    // Test 1: Check if restaurant chains exist
    console.log('📊 Testing restaurant chains...');
    const { data: restaurants, error: restaurantError } = await supabase
      .from('restaurant_chains')
      .select('id, name, slug')
      .limit(5);
    
    if (restaurantError) {
      console.error('❌ Restaurant chains error:', restaurantError);
      return { success: false, error: restaurantError };
    }
    
    console.log('✅ Restaurant chains found:', restaurants?.length || 0);
    console.log('📋 Restaurants:', restaurants?.map(r => r.name).join(', '));
    
    // Test 2: Check if menu items exist
    console.log('🍔 Testing menu items...');
    const { data: menuItems, error: menuError } = await supabase
      .from('menu_items')
      .select('id, name, base_price')
      .limit(10);
    
    if (menuError) {
      console.error('❌ Menu items error:', menuError);
      return { success: false, error: menuError };
    }
    
    console.log('✅ Menu items found:', menuItems?.length || 0);
    console.log('📋 Sample items:', menuItems?.slice(0, 3).map(m => `${m.name} ($${m.base_price})`).join(', '));
    
    // Test 3: Check if reward items exist with joins
    console.log('🎁 Testing reward items with joins...');
    const { data: rewardItems, error: rewardError } = await supabase
      .from('reward_items')
      .select(`
        id,
        points_required,
        value_score,
        menu_items (
          name,
          base_price
        ),
        reward_programs (
          program_name,
          restaurant_chains (
            name,
            slug
          )
        )
      `)
      .limit(5);
    
    if (rewardError) {
      console.error('❌ Reward items error:', rewardError);
      return { success: false, error: rewardError };
    }
    
    console.log('✅ Reward items found:', rewardItems?.length || 0);
    if (rewardItems && rewardItems.length > 0) {
      const sample = rewardItems[0];
      console.log('📋 Sample reward:', {
        item: sample.menu_items?.name,
        points: sample.points_required,
        restaurant: sample.reward_programs?.restaurant_chains?.name
      });
    }
    
    return { 
      success: true, 
      data: {
        restaurants: restaurants?.length || 0,
        menuItems: menuItems?.length || 0,
        rewardItems: rewardItems?.length || 0
      }
    };
    
  } catch (error) {
    console.error('💥 Database connection test failed:', error);
    return { success: false, error };
  }
}

// Auto-run the test when this module is imported
if (typeof window !== 'undefined') {
  testDatabaseConnection().then(result => {
    if (result.success) {
      console.log('🎉 Database connection test passed!', result.data);
    } else {
      console.error('❌ Database connection test failed:', result.error);
    }
  });
}