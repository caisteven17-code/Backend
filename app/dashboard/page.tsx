import React from 'react';
// 1. Removed HelpCircle from the imports
import { User, Settings } from 'lucide-react'; 

export default function DashboardPage() {
  return (
    <div className="min-h-screen flex flex-col bg-gray-100">
      
      {/* Top Navigation Bar */}
      <header className="bg-[#e09f9f] text-white px-6 py-4 flex items-center justify-between shadow-sm z-20 relative">
        <div className="flex items-center space-x-3">
          
          {/* Small Logo Icon */}
          <div className="w-8 h-8 opacity-80">
            <img 
              src="/images/logo_h.png" 
              alt="Mini Logo" 
              className="w-full h-full object-contain"
            />
          </div>

          <h1 className="text-xl font-bold tracking-wide">Beneficiary Dashboard</h1>
        </div>
        
        <div className="flex items-center space-x-4">
          <button className="flex items-center space-x-2 bg-white/20 hover:bg-white/30 px-4 py-2 rounded-full transition text-sm font-medium">
            <User className="h-4 w-4" />
            <span>Maria Santos</span>
          </button>
          <button className="hover:rotate-90 transition duration-300">
            <Settings className="h-6 w-6" />
          </button>
        </div>
      </header>

      {/* Main Content Area */}
      <main className="flex-1 relative flex flex-col items-center justify-center p-6">
        
        {/* Blurred Background */}
        <div 
          className="absolute inset-0 z-0 bg-cover bg-center"
          style={{
            backgroundImage: "url('/images/background.jpg')", 
            filter: "blur(8px)",
            transform: "scale(1.05)"
          }}
        ></div>
        {/* Dark overlay for contrast */}
        <div className="absolute inset-0 bg-gray-900/60 z-0"></div>

        {/* Content Wrapper */}
        <div className="relative z-10 flex flex-col items-center text-center w-full max-w-2xl">
          
          <h2 className="text-4xl md:text-5xl font-bold text-white mb-2">
            Welcome back, Maria!
          </h2>
          <p className="text-lg text-gray-200 mb-10">
            Here's your disaster relief assistance summary
          </p>

          {/* Amount Card */}
          <div className="bg-white rounded-2xl shadow-xl w-full max-w-md p-10 flex flex-col items-center">
            <h3 className="text-gray-600 font-semibold mb-6">Total Amount Received</h3>
            
            <div className="text-5xl md:text-6xl font-bold text-[#1f2937] tracking-tight mb-6">
              ₱0.00
            </div>
            
            <p className="text-sm text-gray-500 max-w-xs leading-relaxed">
              Total donations received for disaster relief assistance
            </p>
          </div>
        </div>
      </main>

      {/* 2. THE FIXED HELP BUTTON HAS BEEN REMOVED FROM HERE */}
    </div>
  );
}