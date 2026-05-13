import { describe, it, expect } from 'vitest';
import { unwrapApiResponse, type ApiResponse } from '../response';

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

  it('extracts array data from response', () => {
    const response: ApiResponse<number[]> = {
      success: true,
      data: [1, 2, 3],
    };
    expect(unwrapApiResponse(response)).toEqual([1, 2, 3]);
  });

  it('extracts null data from response', () => {
    const response: ApiResponse<null> = {
      success: true,
      data: null,
    };
    expect(unwrapApiResponse(response)).toBeNull();
  });
});