// Restaurant configurations for scraping
export const restaurantConfigs = {
  mcdonalds: {
    name: "McDonald's",
    logo: '🍟',
    primaryColor: '#FFC72C',
    pointsName: 'Points',
    apiEndpoints: [
      'https://www.mcdonalds.com/dnaapp/itemDetails',
      'https://www.mcdonalds.com/us/en-us/mymcdonalds/rewards.html'
    ],
    selectors: {
      menuItems: '.menu-item',
      prices: '.price',
      points: '.points-required'
    }
  },
  starbucks: {
    name: 'Starbucks',
    logo: '☕',
    primaryColor: '#00704A',
    pointsName: 'Stars',
    apiEndpoints: [
      'https://www.starbucks.com/rewards',
      'https://app.starbucks.com/api/rewards'
    ],
    selectors: {
      menuItems: '.product-card',
      prices: '.price',
      stars: '.stars-required'
    }
  },
  chipotle: {
    name: 'Chipotle',
    logo: '🌯',
    primaryColor: '#A81612',
    pointsName: 'Points',
    apiEndpoints: [
      'https://www.chipotle.com/rewards',
      'https://services.chipotle.com/rewards'
    ]
  },
  subway: {
    name: 'Subway',
    logo: '🥪',
    primaryColor: '#00543D',
    pointsName: 'Tokens',
    apiEndpoints: [
      'https://www.subway.com/rewards'
    ]
  },
  tacobell: {
    name: 'Taco Bell',
    logo: '🌮',
    primaryColor: '#702F8A',
    pointsName: 'Points',
    apiEndpoints: [
      'https://www.tacobell.com/rewards'
    ]
  },
  burgerking: {
    name: 'Burger King',
    logo: '👑',
    primaryColor: '#EC1C24',
    pointsName: 'Crowns'
  },
  kfc: {
    name: 'KFC',
    logo: '🍗',
    primaryColor: '#F40027',
    pointsName: 'Points'
  },
  wendys: {
    name: "Wendy's",
    logo: '🍔',
    primaryColor: '#E31837',
    pointsName: 'Points'
  },
  dunkin: {
    name: "Dunkin'",
    logo: '🍩',
    primaryColor: '#FF6600',
    pointsName: 'Points'
  },
  pizzahut: {
    name: 'Pizza Hut',
    logo: '🍕',
    primaryColor: '#EE3124',
    pointsName: 'Points'
  }
};