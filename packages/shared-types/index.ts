// Common interfaces/types used across applications
export interface User {
  id: string;
  email: string;
  name: string;
  createdAt: Date;
}

export interface AuthResponse {
  user: User;
  token: string;
}

// API response types
export interface ApiResponse<T> {
  data: T;
  status: number;
  message?: string;
}

// ... other shared types
