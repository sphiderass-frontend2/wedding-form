"use client"
import { useCallback, useState } from "react";
import { useAuthStore } from "../store/useAuthStore";

const api = process.env.NEXT_PUBLIC_API_URL;

export const useAuth = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const clearToken = useAuthStore((state) => state.clearToken);
  const [error, setError] = useState<string | null>(null);
  const [pending, setPending] = useState(false);

  const dismissError = useCallback(() => {
    setError(null);
  }, []);

  const login = useCallback(
    async (credentials: { email: string; password: string }): Promise<any> => {
      setPending(true);
      setError(null); // Clear previous errors
      
      try {
        // Ensure proper URL construction with trailing slash
        const apiUrl = api?.endsWith('/') ? api : `${api}/`;
        const response = await fetch(`${apiUrl}auth/signin`, {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(credentials),
        });

        const data = await response.json();

        if (!response.ok) {
          // Extract error message from backend response
          const errorMessage = data.message || data.error || `HTTP ${response.status}: ${response.statusText}`;
          setError(errorMessage);
          throw new Error(errorMessage);
        }

        // Save token from backend response
        if (data.token) {
          setToken(data.token);
        }

        return data;
      } catch (err) {
        if (err instanceof Error) {
          setError(err.message);
        } else {
          setError("An unexpected error occurred");
        }
        throw err;
      } finally {
        setPending(false);
      }
    },
    [setToken]
  );

  const register = useCallback(
    async (userInfo: {
      username: string;
      email: string;
      password: string;
    }): Promise<any> => {
      const response = await fetch(`${api}auth/signup`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(userInfo),
      });

      const data = await response.json();

      if (!response.ok) {
        // Throw backend error message instead of generic
        throw new Error(
          data.message ? data.message.join(", ") : "Failed to register"
        );
      }

      // Save token if backend returns one
      if (data.token) {
        setToken(data.token);
      }

      return data;
    },
    [setToken]
  );

  const logout = useCallback(() => {
    clearToken();
  }, [clearToken]);

  const sendOtp = useCallback(async (email: string): Promise<any> => {
    const response = await fetch(`${api}/auth/verify-email`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ email }),
    });

    if (!response.ok) {
      throw new Error("Failed to send OTP");
    }

    const data = await response.json();
    return data;
  }, []);

  return { login, register, logout, error, pending, dismissError, sendOtp };
};
