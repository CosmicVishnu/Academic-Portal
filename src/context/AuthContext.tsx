import React, { createContext, useContext, useState, useEffect, useCallback } from 'react';
import { authApi, AuthUser, LoginCredentials, RegisterData } from '../api/auth';

// ─── Types ────────────────────────────────────────────────────────────────────
interface AuthContextType {
  currentUser: AuthUser | null;
  isLoading: boolean;
  login: (credentials: LoginCredentials) => Promise<void>;
  logout: () => void;
  signup: (userData: RegisterData) => Promise<void>;
}

// ─── Context ──────────────────────────────────────────────────────────────────
const AuthContext = createContext<AuthContextType | undefined>(undefined);

// ─── Provider ─────────────────────────────────────────────────────────────────
export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [currentUser, setCurrentUser] = useState<AuthUser | null>(null);
  const [isLoading, setIsLoading] = useState(true); // true until session restore is done

  // ── Logout helper ──────────────────────────────────────────────────────────
  const logout = useCallback(() => {
    localStorage.removeItem('token');
    localStorage.removeItem('user');
    setCurrentUser(null);
  }, []);

  // ── Listen for 401 events from axios interceptor ──────────────────────────
  useEffect(() => {
    const handleAuthLogout = () => logout();
    window.addEventListener('auth:logout', handleAuthLogout);
    return () => window.removeEventListener('auth:logout', handleAuthLogout);
  }, [logout]);

  // ── Restore session on mount ───────────────────────────────────────────────
  useEffect(() => {
    const restoreSession = async () => {
      const token = localStorage.getItem('token');
      if (!token) {
        setIsLoading(false);
        return;
      }

      try {
        const { user } = await authApi.getMe();
        setCurrentUser(user);
      } catch {
        // Token invalid/expired — clear storage
        localStorage.removeItem('token');
        localStorage.removeItem('user');
      } finally {
        setIsLoading(false);
      }
    };

    restoreSession();
  }, []);

  // ── Login ──────────────────────────────────────────────────────────────────
  const login = async (credentials: LoginCredentials): Promise<void> => {
    const response = await authApi.login(credentials);
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    setCurrentUser(response.user);
  };

  // ── Signup ─────────────────────────────────────────────────────────────────
  const signup = async (userData: RegisterData): Promise<void> => {
    const response = await authApi.register(userData);
    localStorage.setItem('token', response.token);
    localStorage.setItem('user', JSON.stringify(response.user));
    setCurrentUser(response.user);
  };

  return (
    <AuthContext.Provider value={{ currentUser, isLoading, login, logout, signup }}>
      {children}
    </AuthContext.Provider>
  );
}

// ─── Hook ─────────────────────────────────────────────────────────────────────
export function useAuth(): AuthContextType {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error('useAuth must be used within an AuthProvider');
  }
  return context;
}
