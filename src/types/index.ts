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
  officeLocation?: {
    lat: number;
    lng: number;
    address: string;
  };
  region?: 'north' | 'central' | 'south';
  excludedFoods?: string[];
  budgetMin?: number;
  budgetMax?: number;
  dietType?: 'normal' | 'vegetarian' | 'vegan' | 'healthy';
}

export interface Restaurant {
  id: string;
  name: string;
  cuisineType?: string;
  avgPrice: number;
  distance: number;
  rating?: number;
  deliveryLinks?: {
    grabfood?: string;
    shopeefood?: string;
  };
}

export interface Dish {
  id: string;
  name: string;
  price: number;
  imageUrl?: string;
}

export interface RecommendationItem {
  restaurant: Restaurant;
  dish?: Dish;
  category: 'safe' | 'familiar' | 'discovery';
  explanation?: string;
  estimatedDeliveryMinutes?: number;
}

export interface RecommendationResponse {
  recommendationId: string;
  recommendations: RecommendationItem[];
  method?: string;
  generatedAt?: string;
}
