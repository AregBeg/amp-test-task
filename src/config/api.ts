import xior from 'xior';
import { API_BASE_URL } from './api-endpoints-config';

class ApiError extends Error {
  constructor(
    message: string,
    public status: number,
    public statusText: string
  ) {
    super(message);
    this.name = 'ApiError';
  }
}

export const api = xior.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
});

// Request interceptor
api.interceptors.request.use(config => {
  // Add auth token if available
  // const token = localStorage.getItem('token')
  // if (token) {
  //   config.headers.Authorization = `Bearer ${token}`
  // }
  return config;
});

// Response interceptor
api.interceptors.response.use(
  response => response,
  error => {
    if (error.response) {
      throw new ApiError(
        `HTTP error! status: ${error.response.status}`,
        error.response.status,
        error.response.statusText
      );
    }
    throw error;
  }
);

export { ApiError };
