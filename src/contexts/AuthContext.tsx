import React, { createContext, useCallback, useContext, useEffect, useState } from "react";
import api, { setAccessToken } from "../api/api";
import LoadingScreen from "../components/ui/loading-screen";
import { secureStorage } from "../utils/secureStorage";

type AuthContextType = {
  token: string | null;
  isAuthenticated: boolean;
  authReady: boolean;
  startSmsLogin: (phone: string) => Promise<void>;
  verifySmsLogin: (phone: string, code: string) => Promise<void>;
  logout: () => Promise<void>;
};

export const AuthContext = createContext<AuthContextType | null>(null);

export const AuthProvider: React.FC<{ children: React.ReactNode }> = ({ children }) => {
  const [token, setToken] = useState<string | null>(null);
  const [authReady, setAuthReady] = useState(false);
  const isAuthenticated = !!token;

  const startSmsLogin = useCallback(async (phone: string) => {
    await api.post("/auth", { phone });
  }, []);

  const verifySmsLogin = useCallback(async (phone: string, code: string) => {
    const { data } = await api.post<{ access_token: string }>("/auth/code", { phone, code });
    setToken(data.access_token);
    setAccessToken(data.access_token);
    await secureStorage.setItem("access_token", data.access_token);
  }, []);

  const logout = useCallback(async () => {
    setToken(null);
    setAccessToken(null);
    await secureStorage.deleteItem("access_token");
  }, []);

  useEffect(() => {
    (async () => {
      try {
        const stored = await secureStorage.getItem("access_token");
        if (stored) {
          setAccessToken(stored);
          setToken(stored);
        }
      } catch {
        // ignore
      } finally {
        setAuthReady(true);
      }
    })();
  }, []);

  if (!authReady) {
      return (
          <LoadingScreen />
      );
  }

  return (
    <AuthContext.Provider value={{ isAuthenticated, token, logout, authReady, startSmsLogin, verifySmsLogin }}>
      {children}
    </AuthContext.Provider>
  );
};

export function useAuth() {
  const ctx = useContext(AuthContext);
  if (!ctx) throw new Error("useAuth must be used within an AuthProvider");
  return ctx;
}
