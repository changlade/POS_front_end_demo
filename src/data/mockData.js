// Mock data for the Danone Menu Tracker app

export const parisBusinesses = [
  // Danone customer businesses (confirmed)
  {
    id: 1,
    name: "Café de Flore",
    type: "cafe",
    address: "172 Boulevard Saint-Germain, 75006 Paris",
    coordinates: [48.8542, 2.3320],
    isDanoneCustomer: true,
    lastPhotoDate: new Date('2024-01-10'),
    menuItems: ["Evian 1.5L", "Evian 500ml", "Badoit Sparkling"]
  },
  {
    id: 2,
    name: "Les Deux Abeilles",
    type: "cafe",
    address: "189 Rue de l'Université, 75007 Paris",
    coordinates: [48.8606, 2.3080],
    isDanoneCustomer: true,
    lastPhotoDate: new Date('2024-01-05'),
    menuItems: ["Evian Natural", "Volvic 500ml"]
  },
  {
    id: 3,
    name: "Breizh Café",
    type: "restaurant",
    address: "109 Rue Vieille du Temple, 75003 Paris",
    coordinates: [48.8606, 2.3622],
    isDanoneCustomer: true,
    lastPhotoDate: new Date('2024-01-15'),
    menuItems: ["Evian Glass", "Badoit 330ml"]
  },
  {
    id: 4,
    name: "L'As du Fallafel",
    type: "restaurant",
    address: "34 Rue des Rosiers, 75004 Paris",
    coordinates: [48.8577, 2.3590],
    isDanoneCustomer: true,
    lastPhotoDate: new Date('2023-12-20'),
    menuItems: ["Evian 500ml"]
  },
  {
    id: 5,
    name: "Du Pain et des Idées",
    type: "bakery",
    address: "4 Rue Yves Toudic, 75010 Paris",
    coordinates: [48.8708, 2.3628],
    isDanoneCustomer: true,
    lastPhotoDate: new Date('2024-01-12'),
    menuItems: ["Volvic 1.5L", "Font Vella"]
  },
  
  // Unknown status businesses (question marks)
  {
    id: 6,
    name: "Le Comptoir Relais",
    type: "restaurant",
    address: "9 Carrefour de l'Odéon, 75006 Paris",
    coordinates: [48.8515, 2.3387],
    isDanoneCustomer: null,
    lastPhotoDate: null,
    menuItems: []
  },
  {
    id: 7,
    name: "Pink Mamma",
    type: "restaurant",
    address: "20bis Rue de Douai, 75009 Paris",
    coordinates: [48.8826, 2.3292],
    isDanoneCustomer: null,
    lastPhotoDate: null,
    menuItems: []
  },
  {
    id: 8,
    name: "Boulangerie Julien",
    type: "bakery",
    address: "75 Rue Saint-Honoré, 75001 Paris",
    coordinates: [48.8606, 2.3376],
    isDanoneCustomer: null,
    lastPhotoDate: null,
    menuItems: []
  },
  {
    id: 9,
    name: "Le Mary Celeste",
    type: "bar",
    address: "1 Rue Commines, 75003 Paris",
    coordinates: [48.8610, 2.3654],
    isDanoneCustomer: null,
    lastPhotoDate: null,
    menuItems: []
  },
  {
    id: 10,
    name: "Ten Belles",
    type: "cafe",
    address: "10 Rue de la Grange aux Belles, 75010 Paris",
    coordinates: [48.8705, 2.3702],
    isDanoneCustomer: null,
    lastPhotoDate: null,
    menuItems: []
  },
  {
    id: 11,
    name: "Loulou",
    type: "restaurant",
    address: "107 Rue de Rivoli, 75001 Paris",
    coordinates: [48.8606, 2.3376],
    isDanoneCustomer: null,
    lastPhotoDate: new Date('2023-11-15'),
    menuItems: []
  },
  {
    id: 12,
    name: "Bistrot Paul Bert",
    type: "restaurant",
    address: "18 Rue Paul Bert, 75011 Paris",
    coordinates: [48.8532, 2.3795],
    isDanoneCustomer: null,
    lastPhotoDate: new Date('2023-10-20'),
    menuItems: []
  }
]

export const mockUsers = [
  {
    id: 1,
    name: "Marie Dubois",
    email: "marie.dubois@danone.com",
    department: "Sales",
    points: 2850,
    photosSubmitted: 47,
    rank: 1,
    avatar: "👩‍💼"
  },
  {
    id: 2,
    name: "Jean Martin",
    email: "jean.martin@danone.com",
    department: "Marketing",
    points: 2650,
    photosSubmitted: 38,
    rank: 2,
    avatar: "👨‍💼"
  },
  {
    id: 3,
    name: "Sophie Laurent",
    email: "sophie.laurent@danone.com",
    department: "Sales",
    points: 2400,
    photosSubmitted: 42,
    rank: 3,
    avatar: "👩‍🦰"
  },
  {
    id: 4,
    name: "Pierre Durand",
    email: "pierre.durand@danone.com",
    department: "Operations",
    points: 2100,
    photosSubmitted: 31,
    rank: 4,
    avatar: "👨‍🔧"
  },
  {
    id: 5,
    name: "Camille Moreau",
    email: "camille.moreau@danone.com",
    department: "Marketing",
    points: 1950,
    photosSubmitted: 29,
    rank: 5,
    avatar: "👩‍🎨"
  },
  {
    id: 6,
    name: "Vous",
    email: "current.user@danone.com",
    department: "Sales",
    points: 1800,
    photosSubmitted: 25,
    rank: 6,
    avatar: "🙋‍♂️"
  }
]

export const currentUser = mockUsers[5] // "Vous" (You)

export const pointsSystem = {
  newBusinessPhoto: 100, // Taking photo of unknown business
  knownBusinessPhotoRecent: 25, // Taking photo of known business (recent data)
  knownBusinessPhotoOld: 75, // Taking photo of known business (old data > 30 days)
  bonusOldData: 50 // Bonus for businesses with very old data (> 90 days)
}

export const recentActivities = [
  {
    id: 1,
    userId: 1,
    userName: "Marie Dubois",
    businessName: "Café de Flore",
    points: 75,
    timestamp: new Date('2024-01-15T14:30:00'),
    photoUrl: "/api/photos/1"
  },
  {
    id: 2,
    userId: 3,
    userName: "Sophie Laurent",
    businessName: "Pink Mamma",
    points: 100,
    timestamp: new Date('2024-01-15T12:15:00'),
    photoUrl: "/api/photos/2"
  },
  {
    id: 3,
    userId: 2,
    userName: "Jean Martin",
    businessName: "Du Pain et des Idées",
    points: 25,
    timestamp: new Date('2024-01-15T10:45:00'),
    photoUrl: "/api/photos/3"
  }
]

// Mock product detection results from Databricks processing - Danone Waters Only
export const mockProductDetections = [
  {
    productName: "Evian Natural Mineral Water",
    detectedPrice: "€2.80",
    confidence: 0.95,
    category: "Water",
    brand: "Danone",
    size: "1.5L",
    description: "Premium natural mineral water from the French Alps"
  },
  {
    productName: "Evian Natural Mineral Water",
    detectedPrice: "€1.20",
    confidence: 0.93,
    category: "Water",
    brand: "Danone",
    size: "500ml",
    description: "Premium natural mineral water from the French Alps"
  },
  {
    productName: "Volvic Natural Volcanic Water",
    detectedPrice: "€2.20",
    confidence: 0.91,
    category: "Water",
    brand: "Danone",
    size: "1.5L",
    description: "Natural volcanic water from Auvergne, France"
  },
  {
    productName: "Volvic Natural Volcanic Water",
    detectedPrice: "€1.10",
    confidence: 0.89,
    category: "Water",
    brand: "Danone",
    size: "500ml",
    description: "Natural volcanic water from Auvergne, France"
  },
  {
    productName: "Badoit Sparkling Natural Mineral Water",
    detectedPrice: "€3.20",
    confidence: 0.87,
    category: "Water",
    brand: "Danone",
    size: "1L",
    description: "Naturally sparkling mineral water from Saint-Galmier"
  },
  {
    productName: "Badoit Sparkling Natural Mineral Water",
    detectedPrice: "€1.80",
    confidence: 0.90,
    category: "Water",
    brand: "Danone",
    size: "330ml",
    description: "Naturally sparkling mineral water from Saint-Galmier"
  },
  {
    productName: "Font Vella Natural Water",
    detectedPrice: "€1.90",
    confidence: 0.86,
    category: "Water",
    brand: "Danone",
    size: "1.5L",
    description: "Natural water from the Montseny mountains, Spain"
  },
  {
    productName: "Evian Glass Bottle",
    detectedPrice: "€4.50",
    confidence: 0.92,
    category: "Water",
    brand: "Danone",
    size: "750ml",
    description: "Premium Evian in elegant glass bottle"
  }
]

// Function to get random product detection - can return multiple products
export const getRandomProductDetection = () => {
  // Randomly decide how many products to detect (1-4 products)
  const numProducts = Math.floor(Math.random() * 4) + 1
  const selectedProducts = []
  const usedIndexes = new Set()
  
  for (let i = 0; i < numProducts; i++) {
    let randomIndex
    do {
      randomIndex = Math.floor(Math.random() * mockProductDetections.length)
    } while (usedIndexes.has(randomIndex))
    
    usedIndexes.add(randomIndex)
    selectedProducts.push({
      ...mockProductDetections[randomIndex],
      id: `product_${i + 1}` // Add unique ID for editing
    })
  }
  
  return selectedProducts
}

// Function to get single random product (for backward compatibility)
export const getSingleRandomProductDetection = () => {
  return mockProductDetections[Math.floor(Math.random() * mockProductDetections.length)]
}

// Function to calculate distance between two coordinates (Haversine formula)
export const calculateDistance = (lat1, lon1, lat2, lon2) => {
  const R = 6371 // Earth's radius in kilometers
  const dLat = toRad(lat2 - lat1)
  const dLon = toRad(lon2 - lon1)
  const a = 
    Math.sin(dLat/2) * Math.sin(dLat/2) +
    Math.cos(toRad(lat1)) * Math.cos(toRad(lat2)) *
    Math.sin(dLon/2) * Math.sin(dLon/2)
  const c = 2 * Math.atan2(Math.sqrt(a), Math.sqrt(1-a))
  return R * c * 1000 // Convert to meters
}

const toRad = (value) => {
  return value * Math.PI / 180
}

// Function to find nearest business based on user location
export const findNearestBusiness = (userLat, userLon) => {
  let nearestBusiness = null
  let shortestDistance = Infinity
  
  parisBusinesses.forEach(business => {
    const distance = calculateDistance(
      userLat, userLon, 
      business.coordinates[0], business.coordinates[1]
    )
    
    if (distance < shortestDistance) {
      shortestDistance = distance
      nearestBusiness = { ...business, distance: Math.round(distance) }
    }
  })
  
  return nearestBusiness
}

// Mock user locations in Paris (for testing when geolocation is not available)
export const mockUserLocations = [
  { lat: 48.8566, lng: 2.3522, name: "Near Louvre" },
  { lat: 48.8606, lng: 2.3376, name: "Near Place Vendôme" },
  { lat: 48.8584, lng: 2.2945, name: "Near Eiffel Tower" },
  { lat: 48.8738, lng: 2.2950, name: "Near Arc de Triomphe" },
  { lat: 48.8529, lng: 2.3499, name: "Near Notre-Dame" }
]

export const getRandomMockLocation = () => {
  return mockUserLocations[Math.floor(Math.random() * mockUserLocations.length)]
}

export const gameRules = [
  {
    title: "Photo Guidelines",
    rules: [
      "Take clear photos of complete menus",
      "Ensure all text is readable",
      "Include the business name in the photo when possible",
      "Only submit photos from inside or directly outside the establishment"
    ]
  },
  {
    title: "Points System",
    rules: [
      "New business discovery: 100 points",
      "Known business (recent data): 25 points", 
      "Known business (old data > 30 days): 75 points",
      "Bonus for very old data (> 90 days): +50 points",
      "Quality bonus for exceptional photos: +25 points"
    ]
  },
  {
    title: "Leaderboard",
    rules: [
      "Rankings update daily at midnight",
      "Monthly contests with prizes for top performers",
      "Department-based competitions",
      "Recognition for most improved players"
    ]
  },
  {
    title: "Best Practices",
    rules: [
      "Focus on areas with question mark businesses",
      "Prioritize businesses with outdated information",
      "Share tips with colleagues to help everyone succeed",
      "Report any technical issues promptly"
    ]
  }
]
