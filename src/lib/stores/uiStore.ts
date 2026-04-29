import { create } from 'zustand';

interface UIState {
  isMobileMenuOpen: boolean;
  isFeedbackModalOpen: boolean;
  currentFeedbackMealId: string | null;
  theme: 'light' | 'dark';

  toggleMobileMenu: () => void;
  openFeedbackModal: (mealId: string) => void;
  closeFeedbackModal: () => void;
  setTheme: (theme: 'light' | 'dark') => void;
}

export const useUIStore = create<UIState>((set) => ({
  isMobileMenuOpen: false,
  isFeedbackModalOpen: false,
  currentFeedbackMealId: null,
  theme: 'light',

  toggleMobileMenu: () => set((state) => ({ isMobileMenuOpen: !state.isMobileMenuOpen })),

  openFeedbackModal: (mealId) => set({
    isFeedbackModalOpen: true,
    currentFeedbackMealId: mealId,
  }),

  closeFeedbackModal: () => set({
    isFeedbackModalOpen: false,
    currentFeedbackMealId: null,
  }),

  setTheme: (theme) => set({ theme }),
}));
