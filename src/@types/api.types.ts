// API Response types
export interface ApiResponse<T> {
  data: T;
  status: number;
  statusText: string;
}
