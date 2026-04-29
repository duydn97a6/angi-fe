export interface ApiResponse<T> {
  success: boolean;
  data: T;
  error?: {
    code: string;
    message: string;
    details?: Record<string, unknown>;
  } | null;
  meta?: {
    timestamp?: string;
  };
}

export function unwrapApiResponse<T>(response: ApiResponse<T>): T {
  return response.data;
}
