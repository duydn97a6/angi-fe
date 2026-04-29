import { create } from 'zustand';
import { persist } from 'zustand/middleware';

interface OnboardingData {
  region?: 'north' | 'central' | 'south';
  office?: {
    lat: number;
    lng: number;
    address: string;
    radius: number;
  };
  excludedFoods?: string[];
  budgetMin?: number;
  budgetMax?: number;
  dietType?: 'normal' | 'vegetarian' | 'vegan' | 'healthy';
  favoriteCuisines?: string[];
}

interface OnboardingState extends OnboardingData {
  currentStep: number;

  setRegion: (region: 'north' | 'central' | 'south') => void;
  setLocation: (office: OnboardingData['office']) => void;
  setExcludedFoods: (foods: string[]) => void;
  setBudget: (min: number, max: number) => void;
  setDietType: (diet: OnboardingData['dietType']) => void;
  setFavoriteCuisines: (cuisines: string[]) => void;
  getPayload: () => {
    region?: OnboardingData['region'];
    officeLat?: number;
    officeLng?: number;
    officeAddress?: string;
    searchRadiusMeters?: number;
    dietType?: OnboardingData['dietType'];
    excludedFoods?: string[];
    favoriteCuisines?: string[];
    budgetMin?: number;
    budgetMax?: number;
  };
  reset: () => void;
}

export const useOnboardingStore = create<OnboardingState>()(
  persist(
    (set, get) => ({
      currentStep: 1,

      setRegion: (region) => set({ region, currentStep: 2 }),
      setLocation: (office) => set({ office, currentStep: 3 }),
      setExcludedFoods: (foods) => set({ excludedFoods: foods, currentStep: 4 }),
      setBudget: (min, max) => set({ budgetMin: min, budgetMax: max, currentStep: 5 }),
      setDietType: (diet) => set({ dietType: diet }),
      setFavoriteCuisines: (cuisines) => set({ favoriteCuisines: cuisines }),
      getPayload: () => {
        const {
          region,
          office,
          excludedFoods,
          budgetMin,
          budgetMax,
          dietType,
          favoriteCuisines,
        } = get();

        return {
          region,
          officeLat: office?.lat,
          officeLng: office?.lng,
          officeAddress: office?.address,
          searchRadiusMeters: office?.radius,
          excludedFoods,
          budgetMin,
          budgetMax,
          dietType,
          favoriteCuisines,
        };
      },
      reset: () => set({
        region: undefined,
        office: undefined,
        excludedFoods: undefined,
        budgetMin: undefined,
        budgetMax: undefined,
        dietType: undefined,
        favoriteCuisines: undefined,
        currentStep: 1,
      }),
    }),
    {
      name: 'angi-onboarding',
    }
  )
);
