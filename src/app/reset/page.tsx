"use client";
import { useState, useEffect } from "react";
import { useRouter, useSearchParams } from "next/navigation";
import { supabase } from "../../../lib/supabase/products";

export default function ResetPasswordPage() {
  const [password, setPassword] = useState("");
  const [confirm, setConfirm] = useState("");
  const [error, setError] = useState("");
  const [success, setSuccess] = useState("");
  const [loading, setLoading] = useState(false);
  const router = useRouter();
  const searchParams = useSearchParams();

  // Check for access_token in URL
  const accessToken = searchParams.get("access_token");

  useEffect(() => {
    if (!accessToken) {
      setError("Invalid or expired reset link. Please request a new one.");
    }
  }, [accessToken]);

  const handleReset = async (e: any) => {
    e.preventDefault();
    setError("");
    setSuccess("");
    if (password.length < 6) {
      setError("Password must be at least 6 characters.");
      return;
    }
    if (password !== confirm) {
      setError("Passwords do not match.");
      return;
    }
    setLoading(true);
    // Supabase automatically sets the session from the access_token in the URL
    const { error } = await supabase.auth.updateUser({ password });
    setLoading(false);
    if (error) {
      setError(error.message);
    } else {
      setSuccess("Password updated! You can now sign in.");
      setTimeout(() => router.push("/signin"), 2000);
    }
  };

  return (
    <div className="flex min-h-screen items-center justify-center bg-gray-100">
      <div className="w-full max-w-md rounded bg-white p-8 shadow">
        <h1 className="mb-6 text-2xl font-bold">Reset Password</h1>
        {error && <div className="mb-4 text-red-600">{error}</div>}
        {success && <div className="mb-4 text-green-600">{success}</div>}
        {accessToken && !success && (
          <form onSubmit={handleReset} className="space-y-4">
            <div>
              <label className="block font-medium">New Password</label>
              <input
                type="password"
                className="w-full rounded border p-2"
                value={password}
                onChange={e => setPassword(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <div>
              <label className="block font-medium">Confirm Password</label>
              <input
                type="password"
                className="w-full rounded border p-2"
                value={confirm}
                onChange={e => setConfirm(e.target.value)}
                required
                minLength={6}
              />
            </div>
            <button
              type="submit"
              className="w-full rounded bg-yellow-500 py-2 font-semibold text-white hover:bg-yellow-600"
              disabled={loading}
            >
              {loading ? "Resetting..." : "Reset Password"}
            </button>
          </form>
        )}
      </div>
    </div>
  );
}
