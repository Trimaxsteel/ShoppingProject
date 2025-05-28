"use client";
import React, { useState } from "react";
import { supabase } from "../../../lib/supabase/products";

const SignInPage = () => {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [mode, setMode] = useState<"sign-in" | "sign-up" | "forgot">("sign-in");

  const handleSignIn = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    console.log("SIGNIN ATTEMPT:", { email, password });
    const { data, error } = await supabase.auth.signInWithPassword({ email, password });
    console.log("SIGNIN RESULT:", { data, error });
    if (error) setError(error.message);
    else {
      setSuccess("Signed in! Redirecting...");
      setTimeout(() => {
        window.location.href = "/";
      }, 1200);
    }
    setLoading(false);
  };

  const handleSignUp = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const { error } = await supabase.auth.signUp({ email, password });
    if (error) setError(error.message);
    else setSuccess("Check your email to confirm your account.");
    setLoading(false);
  };

  const handleForgot = async (e: React.FormEvent) => {
    e.preventDefault();
    setLoading(true);
    setError("");
    setSuccess("");
    const { error } = await supabase.auth.resetPasswordForEmail(email);
    if (error) setError(error.message);
    else setSuccess("Password reset email sent.");
    setLoading(false);
  };

  return (
    <div className="absolute inset-0 z-10 flex items-center justify-center bg-gradient-to-br from-yellow-100 to-blue-100">
      <div className="w-full max-w-md px-8 py-10 bg-white rounded-xl shadow-lg text-gray-900">
        <h2 className="text-2xl font-bold mb-6 text-center">{mode === "sign-in" ? "Sign In" : mode === "sign-up" ? "Create Account" : "Forgot Password"}</h2>
        <form onSubmit={mode === "sign-in" ? handleSignIn : mode === "sign-up" ? handleSignUp : handleForgot} className="space-y-5">
          <div>
            <label className="block mb-1 font-medium">Email</label>
            <input
              type="email"
              className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
              value={email}
              onChange={e => setEmail(e.target.value)}
              required
              autoComplete="email"
            />
          </div>
          {mode !== "forgot" && (
            <div>
              <label className="block mb-1 font-medium">Password</label>
              <input
                type="password"
                className="w-full px-4 py-2 border rounded focus:outline-none focus:ring-2 focus:ring-blue-400"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                autoComplete={mode === "sign-up" ? "new-password" : "current-password"}
              />
            </div>
          )}
          {error && <div className="text-red-600 text-sm">{error}</div>}
          {success && <div className="text-green-600 text-sm">{success}</div>}
          <button
            type="submit"
            className="w-full py-2 px-4 bg-yellow-500 hover:bg-yellow-600 text-white font-semibold rounded transition"
            disabled={loading}
          >
            {loading ? "Please wait..." : mode === "sign-in" ? "Sign In" : mode === "sign-up" ? "Sign Up" : "Send Reset Email"}
          </button>
        </form>
        <div className="flex justify-between mt-6 text-sm">
          {mode !== "forgot" && (
            <button className="text-blue-600 hover:underline" onClick={() => setMode("forgot")}>Forgot password?</button>
          )}
          {mode === "sign-in" ? (
            <button className="text-blue-600 hover:underline ml-auto" onClick={() => setMode("sign-up")}>Create account</button>
          ) : (
            <button className="text-blue-600 hover:underline ml-auto" onClick={() => setMode("sign-in")}>Back to sign in</button>
          )}
        </div>
      </div>
    </div>
  );
};

export default SignInPage;
