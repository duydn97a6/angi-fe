export interface User {
  id: string;
  email: string;
  name: string;
  avatarUrl?: string;
  phone?: string;
  isOnboarded?: boolean;
  preferences?: UserPreferences;
}

export interface UserPreferences {
  region?: 'north' | 'central' | 'south';
  officeLat?: number;
  officeLng?: number;
  officeAddress?: string;
  searchRadiusMeters?: number;
  dietType?: 'normal' | 'vegetarian' | 'vegan' | 'healthy';
  excludedFoods?: string[];
  favoriteCuisines?: string[];
  budgetMin?: number;
  budgetMax?: number;
  prefersDelivery?: boolean;
  maxDeliveryTimeMin?: number;
}

export interface Restaurant {
  id: string;
  name: string;
  cuisine?: string;
  cuisineType?: string;
  avgPrice?: number;
  distance?: number;
  rating?: number;
  deliveryLinks?: {
    grabfood?: string;
    shopeefood?: string;
  };
}

export interface Dish {
  id: string;
  name: string;
  price?: number;
  imageUrl?: string;
}

export interface RecommendationItem {
  category: 'safe' | 'familiar' | 'discovery';
  restaurant: Restaurant;
  dish?: Dish;
  explanation?: string;
  estimatedDeliveryMinutes?: number;
  isTopPick?: boolean;
}

export interface ContextSnapshot {
  weather?: WeatherData;
  time?: string;
  mealType?: string;
  location?: { lat: number; lng: number };
}

export interface RecommendationResponse {
  recommendationId: string;
  context?: ContextSnapshot;
  recommendations: RecommendationItem[];
  generationMethod?: string;
  generationTimeMs?: number;
}

export interface WeatherData {
  temp: number;
  condition: string;
  description: string;
}

export interface MealHistoryEntry {
  id: string;
  restaurant: Restaurant;
  dish?: Dish;
  mealAt: string;
  pricePaid?: number;
  feedback?: {
    emoji: string;
    regretLevel?: string;
    tags?: string[];
    notes?: string;
  };
}

export interface MealStats {
  totalMeals: number;
  totalSpent: number;
  avgRating: number;
  topCuisines: { cuisine: string; count: number }[];
  topDishes: { name: string; count: number }[];
  healthPattern?: {
    oilyFoodPercentage: number;
    warning?: string;
  };
}