"use client";

import { useState } from "react";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { Eye, EyeOff, Lock, Mail } from "lucide-react";

import { createClient } from "@/utils/supabase/client";

export function LoginForm() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState<string | null>(null);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const router = useRouter();

  const handleLogin = async (event: React.FormEvent<HTMLFormElement>) => {
    event.preventDefault();
    setError(null);
    setIsSubmitting(true);

    const supabase = createClient();
    const { error: signInError } = await supabase.auth.signInWithPassword({
      email,
      password,
    });

    if (signInError) {
      setError(signInError.message);
      setIsSubmitting(false);
      return;
    }

    router.replace("/dashboard");
    router.refresh();
  };

  return (
    <form className="space-y-4" onSubmit={handleLogin}>
      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Mail className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type="email"
          placeholder="Enter your email"
          value={email}
          onChange={(event) => setEmail(event.target.value)}
          className="w-full rounded-lg bg-white py-3 pr-4 pl-10 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:outline-none"
          autoComplete="email"
          required
        />
      </div>

      <div className="relative">
        <div className="pointer-events-none absolute inset-y-0 left-0 flex items-center pl-3">
          <Lock className="h-5 w-5 text-gray-400" />
        </div>
        <input
          type={showPassword ? "text" : "password"}
          placeholder="Enter your password"
          value={password}
          onChange={(event) => setPassword(event.target.value)}
          className="w-full rounded-lg bg-white py-3 pr-12 pl-10 text-gray-700 placeholder-gray-400 focus:ring-2 focus:ring-white/50 focus:outline-none"
          autoComplete="current-password"
          required
        />
        <button
          type="button"
          onClick={() => setShowPassword((current) => !current)}
          className="absolute inset-y-0 right-0 flex items-center pr-3 text-gray-400 hover:text-gray-600"
          aria-label={showPassword ? "Hide password" : "Show password"}
        >
          {showPassword ? (
            <EyeOff className="h-5 w-5" />
          ) : (
            <Eye className="h-5 w-5" />
          )}
        </button>
      </div>

      {error ? (
        <p className="rounded-lg bg-red-950/20 px-4 py-3 text-sm text-white">
          {error}
        </p>
      ) : null}

      <button
        type="submit"
        disabled={isSubmitting}
        className="mt-2 w-full rounded-lg bg-[#3d3d3d] py-3 font-semibold text-white transition duration-200 hover:bg-[#2d2d2d] disabled:cursor-not-allowed disabled:opacity-70"
      >
        {isSubmitting ? "Signing in..." : "Sign In"}
      </button>

      <div className="mt-4 flex items-center justify-between text-sm text-white">
        <label className="flex cursor-pointer items-center space-x-2">
          <input
            type="checkbox"
            className="h-4 w-4 rounded border-none bg-white text-[#3d3d3d] focus:ring-0"
          />
          <span>Remember me</span>
        </label>
        <Link href="#" className="hover:underline">
          Forgot Password?
        </Link>
      </div>

      <div className="mt-6 text-center text-sm text-white">
        Don&apos;t have an account?{" "}
        <Link href="#" className="font-bold hover:underline">
          Sign up
        </Link>
      </div>
    </form>
  );
}
