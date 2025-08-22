import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { AuthService, User } from '@/lib/auth';

interface AuthContextType {
  user: User | null;
  loading: boolean;
  login: (email: string, password: string) => Promise<boolean>;
  logout: () => Promise<void>;
  checkAuth: () => Promise<void>;
}

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export const useAuth = () => {
  const context = useContext(AuthContext);
  if (context === undefined) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
};

interface AuthProviderProps {
  children: ReactNode;
}

export const AuthProvider: React.FC<AuthProviderProps> = ({ children }) => {
  const [user, setUser] = useState<User | null>(null);
  const [loading, setLoading] = useState(true);

  const checkAuth = async () => {
    try {
      // Check localStorage for existing token
      const token = localStorage.getItem('auth-token');
      if (token) {
        const user = await AuthService.getCurrentUser(token);
        if (user) {
          setUser(user);
        } else {
          // Token is invalid, remove it
          localStorage.removeItem('auth-token');
        }
      }
    } catch (error) {
      console.error('Auth check failed:', error);
      localStorage.removeItem('auth-token');
    } finally {
      setLoading(false);
    }
  };

  const login = async (email: string, password: string): Promise<boolean> => {
    try {
      const loginResponse = await AuthService.validateUser(email, password);
      if (loginResponse) {
        // Store token and set user
        localStorage.setItem('auth-token', loginResponse.token);
        setUser(loginResponse.user);
        return true;
      }
      return false;
    } catch (error) {
      // Remove redundant logging - let the UI handle it
      return false;
    }
  };

  const logout = async () => {
    try {
      const token = localStorage.getItem('auth-token');
      if (token) {
        await AuthService.logout(token);
      }
      localStorage.removeItem('auth-token');
      setUser(null);
    } catch (error) {
      console.error('Logout failed:', error);
      // Still clear local state even if API call fails
      localStorage.removeItem('auth-token');
      setUser(null);
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  const value: AuthContextType = {
    user,
    loading,
    login,
    logout,
    checkAuth,
  };

  return (
    <AuthContext.Provider value={value}>
      {children}
    </AuthContext.Provider>
  );
};
