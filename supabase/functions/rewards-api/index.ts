import { serve } from "https://deno.land/std@0.168.0/http/server.ts"
import { createClient } from 'npm:@supabase/supabase-js@2'

const corsHeaders = {
  'Access-Control-Allow-Origin': '*',
  'Access-Control-Allow-Headers': 'authorization, x-client-info, apikey, content-type',
  'Access-Control-Allow-Methods': 'GET, POST, PUT, DELETE, OPTIONS',
}

interface RewardsQuery {
  restaurant?: string;
  category?: string;
  minPoints?: number;
  maxPoints?: number;
  minValueScore?: number;
  sortBy?: string;
  sortOrder?: 'asc' | 'desc';
  limit?: number;
  offset?: number;
}

serve(async (req) => {
  if (req.method === 'OPTIONS') {
    return new Response('ok', { headers: corsHeaders })
  }

  try {
    const supabaseClient = createClient(
      Deno.env.get('SUPABASE_URL') ?? '',
      Deno.env.get('SUPABASE_ANON_KEY') ?? '',
    )

    const url = new URL(req.url)
    const path = url.pathname.replace('/functions/v1/rewards-api', '')

    // GET /restaurants - Get all restaurant chains
    if (req.method === 'GET' && path === '/restaurants') {
      const { data, error } = await supabaseClient
        .from('restaurant_chains')
        .select('*')
        .eq('is_active', true)
        .order('name')

      if (error) throw error

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // GET /rewards - Get reward items with filtering and sorting
    if (req.method === 'GET' && path === '/rewards') {
      const params = Object.fromEntries(url.searchParams.entries()) as RewardsQuery
      
      let query = supabaseClient
        .from('reward_items')
        .select(`
          *,
          reward_programs (
            *,
            restaurant_chains (*)
          ),
          menu_items (
            *,
            menu_categories (*)
          )
        `)
        .eq('is_active', true)

      // Apply filters
      if (params.restaurant) {
        query = query.eq('reward_programs.restaurant_chains.slug', params.restaurant)
      }

      if (params.minPoints) {
        query = query.gte('points_required', parseInt(params.minPoints.toString()))
      }

      if (params.maxPoints) {
        query = query.lte('points_required', parseInt(params.maxPoints.toString()))
      }

      if (params.minValueScore) {
        query = query.gte('value_score', parseFloat(params.minValueScore.toString()))
      }

      // Apply sorting
      const sortBy = params.sortBy || 'value_score'
      const sortOrder = params.sortOrder === 'asc' ? true : false
      query = query.order(sortBy, { ascending: sortOrder })

      // Apply pagination
      const limit = Math.min(parseInt(params.limit?.toString() || '50'), 100)
      const offset = parseInt(params.offset?.toString() || '0')
      query = query.range(offset, offset + limit - 1)

      const { data, error } = await query

      if (error) throw error

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // GET /promotions - Get active promotions
    if (req.method === 'GET' && path === '/promotions') {
      const restaurant = url.searchParams.get('restaurant')
      
      let query = supabaseClient
        .from('promotions')
        .select(`
          *,
          restaurant_chains (*),
          reward_programs (*)
        `)
        .eq('is_active', true)
        .lte('start_date', new Date().toISOString().split('T')[0])
        .gte('end_date', new Date().toISOString().split('T')[0])

      if (restaurant) {
        query = query.eq('restaurant_chains.slug', restaurant)
      }

      const { data, error } = await query.order('start_date', { ascending: false })

      if (error) throw error

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // GET /analytics - Get rewards analytics
    if (req.method === 'GET' && path === '/analytics') {
      const { data: rewardItems, error: rewardError } = await supabaseClient
        .from('reward_items')
        .select(`
          *,
          reward_programs (
            restaurant_chains (name, slug)
          )
        `)
        .eq('is_active', true)

      if (rewardError) throw rewardError

      // Calculate analytics
      const analytics = {
        totalRewards: rewardItems.length,
        averageValueScore: rewardItems.reduce((sum, item) => sum + (item.value_score || 0), 0) / rewardItems.length,
        averageSavings: rewardItems.reduce((sum, item) => sum + (item.savings_percentage || 0), 0) / rewardItems.length,
        restaurantBreakdown: {},
        valueScoreDistribution: {
          excellent: rewardItems.filter(item => (item.value_score || 0) >= 70).length,
          good: rewardItems.filter(item => (item.value_score || 0) >= 60 && (item.value_score || 0) < 70).length,
          fair: rewardItems.filter(item => (item.value_score || 0) < 60).length
        }
      }

      // Restaurant breakdown
      rewardItems.forEach(item => {
        const restaurantName = item.reward_programs?.restaurant_chains?.name
        if (restaurantName) {
          if (!analytics.restaurantBreakdown[restaurantName]) {
            analytics.restaurantBreakdown[restaurantName] = {
              count: 0,
              averageValueScore: 0,
              averageSavings: 0
            }
          }
          analytics.restaurantBreakdown[restaurantName].count++
        }
      })

      // Calculate averages for each restaurant
      Object.keys(analytics.restaurantBreakdown).forEach(restaurant => {
        const restaurantItems = rewardItems.filter(
          item => item.reward_programs?.restaurant_chains?.name === restaurant
        )
        analytics.restaurantBreakdown[restaurant].averageValueScore = 
          restaurantItems.reduce((sum, item) => sum + (item.value_score || 0), 0) / restaurantItems.length
        analytics.restaurantBreakdown[restaurant].averageSavings = 
          restaurantItems.reduce((sum, item) => sum + (item.savings_percentage || 0), 0) / restaurantItems.length
      })

      return new Response(JSON.stringify(analytics), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    // GET /search - Search reward items
    if (req.method === 'GET' && path === '/search') {
      const query = url.searchParams.get('q')
      
      if (!query) {
        return new Response(JSON.stringify({ error: 'Search query required' }), {
          status: 400,
          headers: { ...corsHeaders, 'Content-Type': 'application/json' },
        })
      }

      const { data, error } = await supabaseClient
        .from('reward_items')
        .select(`
          *,
          reward_programs (
            *,
            restaurant_chains (*)
          ),
          menu_items (
            *,
            menu_categories (*)
          )
        `)
        .eq('is_active', true)
        .or(`menu_items.name.ilike.%${query}%,menu_items.description.ilike.%${query}%`)
        .order('value_score', { ascending: false })
        .limit(20)

      if (error) throw error

      return new Response(JSON.stringify(data), {
        headers: { ...corsHeaders, 'Content-Type': 'application/json' },
      })
    }

    return new Response(JSON.stringify({ error: 'Not found' }), {
      status: 404,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })

  } catch (error) {
    return new Response(JSON.stringify({ error: error.message }), {
      status: 500,
      headers: { ...corsHeaders, 'Content-Type': 'application/json' },
    })
  }
})