import { describe, it, expect, beforeEach } from 'vitest';
import { useUIStore } from '../uiStore';

describe('uiStore', () => {
  beforeEach(() => {
    useUIStore.setState({
      isMobileMenuOpen: false,
      isFeedbackModalOpen: false,
      currentFeedbackMealId: null,
      theme: 'light',
    });
  });

  it('toggles mobile menu', () => {
    expect(useUIStore.getState().isMobileMenuOpen).toBe(false);
    useUIStore.getState().toggleMobileMenu();
    expect(useUIStore.getState().isMobileMenuOpen).toBe(true);
    useUIStore.getState().toggleMobileMenu();
    expect(useUIStore.getState().isMobileMenuOpen).toBe(false);
  });

  it('opens feedback modal with meal id', () => {
    useUIStore.getState().openFeedbackModal('meal-123');
    expect(useUIStore.getState().isFeedbackModalOpen).toBe(true);
    expect(useUIStore.getState().currentFeedbackMealId).toBe('meal-123');
  });

  it('closes feedback modal', () => {
    useUIStore.getState().openFeedbackModal('meal-123');
    useUIStore.getState().closeFeedbackModal();
    expect(useUIStore.getState().isFeedbackModalOpen).toBe(false);
    expect(useUIStore.getState().currentFeedbackMealId).toBeNull();
  });

  it('sets theme', () => {
    useUIStore.getState().setTheme('dark');
    expect(useUIStore.getState().theme).toBe('dark');
  });
});