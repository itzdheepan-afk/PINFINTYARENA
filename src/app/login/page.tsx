"use client";

import React, { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useAuth } from "@/context/AuthContext";
import { Shield, User, ArrowRight, Check } from "lucide-react";

export default function LoginPage() {
  const router = useRouter();
  const { loginAsDemoUser, loginAsAdmin } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleUserLogin = (e: React.FormEvent) => {
    e.preventDefault();
    loginAsDemoUser();
    router.push("/dashboard");
  };

  const handleAdminQuickLogin = () => {
    loginAsAdmin();
    router.push("/admin");
  };

  return (
    <div className="py-14 sm:py-20 px-4 sm:px-6 lg:px-8 max-w-md mx-auto">
      <div className="bg-white rounded-[28px] p-8 sm:p-10 shadow-xl border border-gray-100 text-center">
        {/* Logo */}
        <div className="w-12 h-12 rounded-full bg-gradient-to-tr from-[#B71C1C] via-[#E03A2F] to-[#FF6B6B] flex items-center justify-center p-0.5 mx-auto mb-4 shadow-lg shadow-red-500/20">
          <div className="w-full h-full bg-white rounded-full flex items-center justify-center">
            <span className="text-[#E03A2F] text-xl font-black">∞</span>
          </div>
        </div>

        <h1 className="font-display text-3xl font-bold uppercase text-gray-900 mb-1">
          Welcome to <span className="text-[#E03A2F]">P Infinity</span>
        </h1>
        <p className="text-gray-500 text-xs sm:text-sm mb-8">
          Sign in to access your table reservations, practice hours, and membership benefits.
        </p>

        {/* Form */}
        <form onSubmit={handleUserLogin} className="space-y-4 text-left mb-6">
          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1">
              Email Address
            </label>
            <input
              type="email"
              placeholder="dheepan.raj@example.com"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#E03A2F]"
            />
          </div>

          <div>
            <label className="text-xs font-bold uppercase tracking-wider text-gray-700 block mb-1">
              Password
            </label>
            <input
              type="password"
              placeholder="••••••••"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full px-4 py-2.5 rounded-xl border border-gray-300 bg-white text-gray-900 placeholder:text-gray-400 font-medium text-sm focus:outline-none focus:ring-2 focus:ring-[#E03A2F]"
            />
          </div>

          <button
            type="submit"
            className="w-full btn-red-pill py-3 text-sm font-bold flex items-center justify-center gap-2 shadow-md"
          >
            <span>Sign In to Member Portal</span>
            <ArrowRight className="w-4 h-4" />
          </button>
        </form>

        {/* Quick Demo Acccount Buttons */}
        <div className="pt-6 border-t border-gray-100 space-y-2.5">
          <span className="text-[11px] font-bold uppercase tracking-wider text-gray-400 block mb-2">
            Instant One-Click Demo Access
          </span>

          <button
            onClick={() => {
              loginAsDemoUser();
              router.push("/dashboard");
            }}
            className="w-full py-2.5 px-4 rounded-xl border border-gray-200 hover:bg-gray-50 text-xs font-semibold text-gray-800 flex items-center justify-center gap-2 transition-colors"
          >
            <User className="w-4 h-4 text-[#E03A2F]" />
            <span>Login as Gold Member (Dheepan Raj)</span>
          </button>

          <button
            onClick={handleAdminQuickLogin}
            className="w-full py-2.5 px-4 rounded-xl bg-gray-900 hover:bg-black text-xs font-semibold text-white flex items-center justify-center gap-2 transition-colors shadow-sm"
          >
            <Shield className="w-4 h-4 text-[#E03A2F]" />
            <span>Login as Arena Administrator</span>
          </button>
        </div>
      </div>
    </div>
  );
}
