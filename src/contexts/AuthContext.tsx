import {
  check,
  handleRefresh,
  login,
  logout,
  register,
} from "@src/services/authServices";
import {
  getLocalStorage,
  removeLocalStorage,
  setLocalStorage,
} from "@src/utils/storageUtils";
import React, { createContext, useState, useEffect } from "react";
import { useNavigate } from "react-router-dom";

export interface UserProps {
  id: string;
  image: string;
  name: string;
  email: string;
  username: string;
  role: "READER" | "CREATOR" | "ADMIN";
  createdAt: string;
}

export interface RegisterUserProps {
  name: string;
  username: string;
  email: string;
  password: string;
  confirmPassword: string;
  image: string;
}

interface AuthContextData {
  user: UserProps | null;
  setUser: React.Dispatch<React.SetStateAction<UserProps | null>>;
  isAuthenticated: boolean | null;
  loading: boolean;
  checkAuth: () => void;
  signIn: (
    credentials: { username: string; password: string },
    entranceMode: string
  ) => Promise<{ status: number; user?: UserProps; message?: string }>;
  signUp: (
    user: RegisterUserProps,
    registerMode: string
  ) => Promise<{ status: number; user?: UserProps; message?: string }>;
  signOut: (message: string) => void;
}

export const AuthContext = createContext({} as AuthContextData);

export function AuthContextProvider({
  children,
}: {
  children: React.ReactNode;
}) {
  const navigate = useNavigate();
  const [user, setUser] = useState<UserProps | null>(null);
  const [isAuthenticated, setIsAuthenticated] = useState<boolean | null>(null);
  const [loading, setLoading] = useState<boolean>(true);

  const clearUserData = () => {
    const keysToRemove = [
      "@whats-new:user",
      "@whats-new:teams",
      "@whats-new:active-team",
      "@whats-new:liked-news",
      "@whats-new:accessToken",
    ];

    keysToRemove.forEach(removeLocalStorage);
  };

  const checkAuth = async () => {
    const accessToken = getLocalStorage("@whats-new:accessToken");

    if (accessToken) {
      setIsAuthenticated(true);
      setUser(getLocalStorage("@whats-new:user"));
      setLoading(false);
      return;
    }

    try {
      const response = await handleRefresh();
      if (response.isValid) {
        setIsAuthenticated(true);
        setLocalStorage("@whats-new:user", response.user);
        setUser(response.user);
        setLocalStorage("@whats-new:accessToken", response.accessToken);
      } else {
        setIsAuthenticated(false);
        setUser(null);
        clearUserData();
      }
    } catch (error) {
      console.error("Error on check authentication:", error);
      setIsAuthenticated(false);
      setUser(null);
      clearUserData();
    } finally {
      setLoading(false);
    }
  };

  const signIn = async (
    credentials: { username: string; password: string },
    entranceMode: string
  ): Promise<{ status: number; user?: UserProps; message?: string }> => {
    setLoading(true);
    try {
      const response = await login(credentials, entranceMode);

      setLocalStorage("@whats-new:accessToken", response.accessToken);
      setLocalStorage("@whats-new:user", response.user);
      setUser(response.user);
      setIsAuthenticated(true);

      return {
        status: response.status as number,
        user: response.user,
      };
    } catch (error) {
      throw new Error("Login error");
    } finally {
      setLoading(false);
    }
  };

  const signUp = async (
    user: RegisterUserProps,
    registerMode: string
  ): Promise<{ status: number; message: string }> => {
    setLoading(true);
    try {
      const response = await register(user, registerMode);

      if (response.status === 401) {
        return { status: 401, message: response.message };
      }

      return {
        status: response.status as number,
        message: response.message as string,
      };
    } catch (error) {
      throw new Error("Login error");
    } finally {
      setLoading(false);
    }
  };

  const signOut = async (message: string) => {
    await logout();

    removeLocalStorage("@whats-new:user");
    removeLocalStorage("@whats-new:teams");
    removeLocalStorage("@whats-new:active-team");
    removeLocalStorage("@whats-new:liked-news");

    alert(message);
    await new Promise((resolve) => setTimeout(resolve, 1000));

    setUser(null);

    if (location.pathname !== "/") {
      navigate("/");
    }
  };

  useEffect(() => {
    checkAuth();
  }, []);

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated,
        loading,
        setUser,
        checkAuth,
        signIn,
        signUp,
        signOut,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}
