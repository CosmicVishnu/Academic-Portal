import apiClient from './client';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface RegisterData {
  name: string;
  email: string;
  password: string;
  role: 'student' | 'teacher' | 'admin';
  department?: string;
}

export interface AuthUser {
  _id: string;
  name: string;
  email: string;
  role: 'student' | 'teacher' | 'admin';
  department: string;
  isActive: boolean;
}

export interface AuthResponse {
  success: boolean;
  token: string;
  user: AuthUser;
}

export const authApi = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/auth/login', credentials);
    return data;
  },

  register: async (userData: RegisterData): Promise<AuthResponse> => {
    const { data } = await apiClient.post<AuthResponse>('/auth/register', userData);
    return data;
  },

  getMe: async (): Promise<{ success: boolean; user: AuthUser }> => {
    const { data } = await apiClient.get('/auth/me');
    return data;
  },
};
