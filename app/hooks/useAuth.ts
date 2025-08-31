import { useCallback } from "react";
import { useAuthStore } from "../store/useAuthStore";

const api = process.env.NEXT_PUBLIC_API_URL;

export const useAuth = () => {
  const setToken = useAuthStore((state) => state.setToken);
  const clearToken = useAuthStore((state) => state.clearToken);

  const login = useCallback(
    async (credentials: { email: string; password: string }): Promise<any> => {
      const response = await fetch(`${api}auth/login`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(credentials),
      });

      if (!response.ok) {
        throw new Error("Failed to login");
      }

      const data = await response.json();

      // Save token from backend response
      if (data.token) {
        setToken(data.token);
      }

      return data;
    },
    [setToken]
  );

  const register = useCallback(
    async (userInfo: { username: string; email: string; password: string }): Promise<any> => {
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

  const sentOtp = useCallback(async (email: string): Promise<any> => {
    const response = await fetch(`${api}auth/send-otp`, {
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
  }
    , []);

  return { login, register, logout };
};
