import { describe, it, expect } from 'vitest';
import { unwrapApiResponse } from '@/lib/api/response';
import type { ApiResponse } from '@/lib/api/response';

describe('unwrapApiResponse', () => {
  it('extracts data from successful response', () => {
    const response: ApiResponse<string> = {
      success: true,
      data: 'hello',
    };
    expect(unwrapApiResponse(response)).toBe('hello');
  });

  it('extracts object data from response', () => {
    const response: ApiResponse<{ id: string; name: string }> = {
      success: true,
      data: { id: '1', name: 'Test' },
    };
    const result = unwrapApiResponse(response);
    expect(result).toEqual({ id: '1', name: 'Test' });
  });
});