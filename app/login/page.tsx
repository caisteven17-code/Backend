import { LoginForm } from "@/app/login/login-form";

export default async function LoginPage() {
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

          <LoginForm />
        </div>
      </div>
    </div>
  );
}
