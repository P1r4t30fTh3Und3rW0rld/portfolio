export interface User {
  id: string;
  email: string;
  role: 'ADMIN' | 'READER';
}

export interface LoginResponse {
  user: User;
  token: string;
  message: string;
}

export interface ApiError {
  error: string;
}

const API_BASE_URL = import.meta.env.VITE_API_URL || 'http://localhost:5000/api';

export class AuthService {
  static async validateUser(email: string, password: string): Promise<LoginResponse | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
        },
        body: JSON.stringify({ email, password }),
      });

      if (!response.ok) {
        const error: ApiError = await response.json();
        throw new Error(error.error || 'Login failed');
      }

      const data: LoginResponse = await response.json();
      return data;
    } catch (error) {
      // Remove redundant logging - let the caller handle it
      throw error;
    }
  }

  static async getCurrentUser(token: string): Promise<User | null> {
    try {
      const response = await fetch(`${API_BASE_URL}/auth/me`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        return null;
      }

      const data = await response.json();
      return data.user;
    } catch (error) {
      console.error('Get current user error:', error);
      return null;
    }
  }

  static async logout(token: string): Promise<void> {
    try {
      await fetch(`${API_BASE_URL}/auth/logout`, {
        method: 'POST',
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });
    } catch (error) {
      console.error('Logout error:', error);
    }
  }

  static async getAdminPosts(token: string): Promise<any[]> {
    try {
      const response = await fetch(`${API_BASE_URL}/admin/posts`, {
        headers: {
          'Authorization': `Bearer ${token}`,
        },
      });

      if (!response.ok) {
        throw new Error('Failed to fetch admin posts');
      }

      const data = await response.json();
      return data.posts;
    } catch (error) {
      console.error('Get admin posts error:', error);
      throw error;
    }
  }
}
