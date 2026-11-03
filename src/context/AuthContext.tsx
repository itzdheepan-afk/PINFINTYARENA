"use client";

import React, { createContext, useContext, useState, useEffect } from "react";
import { UserProfile } from "@/types";

interface AuthContextType {
  user: UserProfile | null;
  isAdmin: boolean;
  loginAsDemoUser: () => void;
  loginAsAdmin: () => void;
  toggleAdminMode: () => void;
  logout: () => void;
}

const DEFAULT_USER: UserProfile = {
  id: "usr-7701",
  name: "Dheepan Raj",
  email: "dheepan.raj@example.com",
  phone: "+91 98450 12345",
  membershipTier: "gold",
  memberSince: "Nov 2025",
  activeHoursRemaining: 18,
  isAdmin: false,
};

const AuthContext = createContext<AuthContextType | undefined>(undefined);

export function AuthProvider({ children }: { children: React.ReactNode }) {
  const [user, setUser] = useState<UserProfile | null>(DEFAULT_USER);
  const [isAdmin, setIsAdmin] = useState<boolean>(false);

  useEffect(() => {
    try {
      const savedUser = localStorage.getItem("pia_user");
      const savedAdmin = localStorage.getItem("pia_isAdmin");
      if (savedUser) {
        setUser(JSON.parse(savedUser));
      }
      if (savedAdmin) {
        setIsAdmin(JSON.parse(savedAdmin));
      }
    } catch {
      // Fallback
    }
  }, []);

  const loginAsDemoUser = () => {
    setUser(DEFAULT_USER);
    setIsAdmin(false);
    localStorage.setItem("pia_user", JSON.stringify(DEFAULT_USER));
    localStorage.setItem("pia_isAdmin", JSON.stringify(false));
  };

  const loginAsAdmin = () => {
    const adminUser: UserProfile = {
      ...DEFAULT_USER,
      name: "Arena Admin (Dheepan)",
      isAdmin: true,
    };
    setUser(adminUser);
    setIsAdmin(true);
    localStorage.setItem("pia_user", JSON.stringify(adminUser));
    localStorage.setItem("pia_isAdmin", JSON.stringify(true));
  };

  const toggleAdminMode = () => {
    const nextVal = !isAdmin;
    setIsAdmin(nextVal);
    if (user) {
      const updated = { ...user, isAdmin: nextVal };
      setUser(updated);
      localStorage.setItem("pia_user", JSON.stringify(updated));
    }
    localStorage.setItem("pia_isAdmin", JSON.stringify(nextVal));
  };

  const logout = () => {
    setUser(null);
    setIsAdmin(false);
    localStorage.removeItem("pia_user");
    localStorage.removeItem("pia_isAdmin");
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAdmin,
        loginAsDemoUser,
        loginAsAdmin,
        toggleAdminMode,
        logout,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
}

export function useAuth() {
  const context = useContext(AuthContext);
  if (!context) {
    throw new Error("useAuth must be used within an AuthProvider");
  }
  return context;
}
