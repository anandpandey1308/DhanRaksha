import httpClient from './http-client';
import Cookies from 'js-cookie';

export interface LoginCredentials {
  email: string;
  password: string;
}

export interface SignupData {
  email: string;
  password: string;
  name: string;
}

// Backend login only returns access_token
export interface LoginResponse {
  access_token: string;
}

// Backend signup should also only return access_token (let's keep it consistent)
export interface SignupResponse {
  access_token: string;
}

// User profile from /users/me endpoint
export interface User {
  _id: string;
  name: string;
  email: string;
  role: string;
  baseCurrency: string;
  riskProfile: string;
  isEmailVerified: boolean;
  createdAt: string;
  updatedAt: string;
}

class AuthService {
  async login(credentials: LoginCredentials): Promise<LoginResponse> {
    const response = await httpClient.post<LoginResponse>('/auth/login', credentials);
    
    // Store token in cookies
    if (response.data.access_token) {
      Cookies.set('auth-token', response.data.access_token, { expires: 7 });
    }
    
    return response.data;
  }

  async signup(data: SignupData): Promise<SignupResponse> {
    const response = await httpClient.post<SignupResponse>('/auth/signup', data);
    
    // Store token in cookies
    if (response.data.access_token) {
      Cookies.set('auth-token', response.data.access_token, { expires: 7 });
    }
    
    return response.data;
  }

  async getProfile(): Promise<User> {
    const response = await httpClient.get<User>('/users/me');
    return response.data;
  }

  logout(): void {
    Cookies.remove('auth-token');
    window.location.href = '/auth/login';
  }

  getToken(): string | undefined {
    return Cookies.get('auth-token');
  }

  isAuthenticated(): boolean {
    return !!this.getToken();
  }
}

export const authService = new AuthService();