import { describe, it, expect, beforeEach } from 'vitest';
import { useOnboardingStore } from '../onboardingStore';

describe('onboardingStore', () => {
  beforeEach(() => {
    useOnboardingStore.getState().reset();
  });

  it('starts at step 1 with empty data', () => {
    const state = useOnboardingStore.getState();
    expect(state.currentStep).toBe(1);
    expect(state.region).toBeUndefined();
    expect(state.excludedFoods).toBeUndefined();
  });

  it('advances step on setRegion', () => {
    useOnboardingStore.getState().setRegion('south');
    expect(useOnboardingStore.getState().region).toBe('south');
    expect(useOnboardingStore.getState().currentStep).toBe(2);
  });

  it('advances step on setLocation', () => {
    useOnboardingStore.getState().setLocation({
      lat: 10.762,
      lng: 106.66,
      address: '123 Le Loi',
      radius: 3000,
    });
    expect(useOnboardingStore.getState().office).toEqual({
      lat: 10.762,
      lng: 106.66,
      address: '123 Le Loi',
      radius: 3000,
    });
    expect(useOnboardingStore.getState().currentStep).toBe(3);
  });

  it('advances step on setExcludedFoods', () => {
    useOnboardingStore.getState().setExcludedFoods(['seafood', 'beef']);
    expect(useOnboardingStore.getState().excludedFoods).toEqual(['seafood', 'beef']);
    expect(useOnboardingStore.getState().currentStep).toBe(4);
  });

  it('sets budget and advances to step 5', () => {
    useOnboardingStore.getState().setBudget(20000, 80000);
    expect(useOnboardingStore.getState().budgetMin).toBe(20000);
    expect(useOnboardingStore.getState().budgetMax).toBe(80000);
    expect(useOnboardingStore.getState().currentStep).toBe(5);
  });

  it('sets diet type without advancing step', () => {
    useOnboardingStore.getState().setDietType('vegetarian');
    expect(useOnboardingStore.getState().dietType).toBe('vegetarian');
  });

  it('sets favorite cuisines', () => {
    useOnboardingStore.getState().setFavoriteCuisines(['Bún chả', 'Phở']);
    expect(useOnboardingStore.getState().favoriteCuisines).toEqual(['Bún chả', 'Phở']);
  });

  it('getPayload transforms office to flat structure', () => {
    useOnboardingStore.getState().setRegion('north');
    useOnboardingStore.getState().setLocation({
      lat: 21.02,
      lng: 105.78,
      address: 'HN Office',
      radius: 2000,
    });
    const payload = useOnboardingStore.getState().getPayload();
    expect(payload).toEqual({
      region: 'north',
      officeLat: 21.02,
      officeLng: 105.78,
      officeAddress: 'HN Office',
      searchRadiusMeters: 2000,
      excludedFoods: undefined,
      budgetMin: undefined,
      budgetMax: undefined,
      dietType: undefined,
      favoriteCuisines: undefined,
    });
  });

  it('resets all data', () => {
    useOnboardingStore.getState().setRegion('central');
    useOnboardingStore.getState().setBudget(30000, 100000);
    useOnboardingStore.getState().reset();
    const state = useOnboardingStore.getState();
    expect(state.currentStep).toBe(1);
    expect(state.region).toBeUndefined();
    expect(state.budgetMin).toBeUndefined();
  });
});