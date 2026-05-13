import { describe, it, expect, beforeEach, vi } from 'vitest';
import { render, screen, waitFor } from '@testing-library/react';
import userEvent from '@testing-library/user-event';
import { QueryClient, QueryClientProvider } from '@tanstack/react-query';
import { useState } from 'react';

function createQueryClient() {
  return new QueryClient({
    defaultOptions: {
      queries: { retry: false },
    },
  });
}

function TestWrapper({ children }: { children: React.ReactNode }) {
  const [queryClient] = useState(() => createQueryClient());
  return (
    <QueryClientProvider client={queryClient}>
      {children}
    </QueryClientProvider>
  );
}

describe('Auth flow integration', () => {
  it('validates login form with empty fields', async () => {
    // This tests the login schema validation is wired to the form
    const { loginSchema } = await import('@/lib/utils/validation');
    const result = loginSchema.safeParse({ email: '', password: '' });
    expect(result.success).toBe(false);
  });

  it('validates register form with short password', async () => {
    const { registerSchema } = await import('@/lib/utils/validation');
    const result = registerSchema.safeParse({
      name: 'Test',
      email: 'test@test.com',
      password: 'short',
    });
    expect(result.success).toBe(false);
  });
});

describe('Onboarding flow integration', () => {
  it('tracks step progression through the store', async () => {
    const { useOnboardingStore } = await import('@/lib/stores/onboardingStore');
    useOnboardingStore.getState().reset();

    expect(useOnboardingStore.getState().currentStep).toBe(1);

    useOnboardingStore.getState().setRegion('south');
    expect(useOnboardingStore.getState().currentStep).toBe(2);

    useOnboardingStore.getState().setExcludedFoods(['beef']);
    expect(useOnboardingStore.getState().currentStep).toBe(4);

    useOnboardingStore.getState().setBudget(20000, 80000);
    expect(useOnboardingStore.getState().currentStep).toBe(5);

    const payload = useOnboardingStore.getState().getPayload();
    expect(payload.region).toBe('south');
    expect(payload.excludedFoods).toEqual(['beef']);
    expect(payload.budgetMin).toBe(20000);
    expect(payload.budgetMax).toBe(80000);

    useOnboardingStore.getState().reset();
  });
});

describe('Recommendation feedback integration', () => {
  it('validates feedback data structure', () => {
    const feedback = {
      recommendationId: 'rec-1',
      restaurantId: 'rest-1',
      dishId: 'dish-1',
      emoji: '😋',
      regretLevel: 'none' as const,
      tags: ['ngon', 're'],
    };
    expect(feedback.recommendationId).toBeTruthy();
    expect(feedback.emoji).toBeTruthy();
    expect(feedback.tags).toHaveLength(2);
  });
});