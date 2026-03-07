"use client";

import React, { useState } from 'react';
import { Mail, Lock, Eye, EyeOff } from 'lucide-react'; 
import Link from 'next/link';
import { useRouter } from 'next/navigation'; 

export default function LoginPage() {
  const [showPassword, setShowPassword] = useState(false);
  const router = useRouter(); 

  const handleLogin = (e: React.FormEvent) => {
    e.preventDefault(); 
    // Automatically send user to the dashboard
    router.push('/dashboard'); 
  };

  return (
    <div 
      className="min-h-screen relative flex items-center justify-center p-6 bg-gray-900 bg-cover bg-center"
      style={{
        backgroundImage: "url('/images/background.jpg')", 
      }}
    >
      {/* Dark overlay for better text readability */}
      <div className="absolute inset-0 bg-black/40"></div>

      <div className="relative z-10 w-full max-w-5xl flex flex-col md:flex-row items-center justify-between gap-12">
        
        {/* Left Side - Branding */}
        <div className="flex-1 text-white">
          <div className="w-48 h-48 mb-6">
            <img 
              src="/images/logo_h.png" 
              alt="Beneficiary Logo" 
              className="w-full h-full object-contain"
            />
          </div>
          <h1 className="text-5xl font-bold mb-2 tracking-tight">Beneficiary Login</h1>
          <p className="text-xl text-gray-200">Welcome back, Beneficiaries!</p>
        </div>

        {/* Right Side - Login Form */}
        <div className="w-full max-w-md bg-[#d88787] rounded-3xl p-8 shadow-2xl">
          <h2 className="text-2xl font-bold text-white text-center mb-8">Login to Continue</h2>
          
          <form className="space-y-4" onSubmit={handleLogin}>
            
            {/* Email Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Mail className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type="email"
                placeholder="Enter your email"
                className="w-full pl-10 pr-4 py-3 rounded-lg text-gray-700 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
            </div>

            {/* Password Input */}
            <div className="relative">
              <div className="absolute inset-y-0 left-0 pl-3 flex items-center pointer-events-none">
                <Lock className="h-5 w-5 text-gray-400" />
              </div>
              <input
                type={showPassword ? "text" : "password"}
                placeholder="Enter your password"
                className="w-full pl-10 pr-12 py-3 rounded-lg text-gray-700 bg-white placeholder-gray-400 focus:outline-none focus:ring-2 focus:ring-white/50"
                required
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute inset-y-0 right-0 pr-3 flex items-center text-gray-400 hover:text-gray-600"
              >
                {showPassword ? <EyeOff className="h-5 w-5" /> : <Eye className="h-5 w-5" />}
              </button>
            </div>

            {/* Sign In Button */}
            <button
              type="submit"
              className="w-full bg-[#3d3d3d] hover:bg-[#2d2d2d] text-white font-semibold py-3 rounded-lg transition duration-200 mt-2"
            >
              Sign In
            </button>

            {/* Form Footer */}
            <div className="flex items-center justify-between text-white text-sm mt-4">
              <label className="flex items-center space-x-2 cursor-pointer">
                <input type="checkbox" className="rounded text-[#3d3d3d] focus:ring-0 w-4 h-4 bg-white border-none" />
                <span>Remember me</span>
              </label>
              <Link href="#" className="hover:underline">Forgot Password?</Link>
            </div>

            <div className="text-center text-white text-sm mt-6">
              Don't have an account? <Link href="#" className="font-bold hover:underline">Sign up</Link>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
}