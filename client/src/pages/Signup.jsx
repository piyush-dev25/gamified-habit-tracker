import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";
import { API_BASE } from "../api/api";
import { Link } from "react-router-dom";


function Signup() {
  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);

  const passwordTooShort = password.length > 0 && password.length < 6;
  const passwordsMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  function validateForm() {
    if (!username.trim()) {
      return "You didn’t enter a username";
    }

    if (!email.trim()) {
      return "You didn’t enter an email";
    }

    const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
    if (!emailRegex.test(email)) {
      return "Please enter a valid email address";
    }

    if (!password) {
      return "You didn’t enter a password";
    }

    if (!confirmPassword) {
      return "You didn’t confirm your password";
    }

    if (password.length < 6) {
      return "Password must be at least 6 characters";
    }

    if (password !== confirmPassword) {
      return "Passwords do not match";
    }

    return null; // ✅ all good
  }


  async function handleSubmit(e) {
    e.preventDefault();

    if (loading) return;

    const validationError = validateForm();
    if (validationError) {
      setError(validationError);
      return;
    }

    setError("");
    setLoading(true);

    try {
      const res = await fetch(`${API_BASE}/api/auth/signup`, {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ username, email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
      } else {
        window.location.href = "/";
      }
    } catch {
      setError("Something went wrong");
    } finally {
      setLoading(false);
    }
  }

  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100 px-4">
      <div className="w-full max-w-sm bg-slate-800 rounded-2xl shadow-xl p-7">

        {/* App name */}
        <h1 className="text-3xl font-bold text-center">
          Habi<span className="text-indigo-400">tual</span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-400 text-center mt-2 text-sm">
          Create your account to begin.
        </p>

        {/* Error */}
        {error && (
          <p className="mt-4 text-xs text-red-400 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">

          {/* Username */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {
                setUsername(e.target.value);
                setError("");
              }}
              placeholder="Full Name"
              className="w-full rounded-lg bg-slate-900 border border-slate-700 
                     px-3.5 py-2.5 text-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {
                setEmail(e.target.value);
                setError("");
              }}
              placeholder="you@example.com"
              className="w-full rounded-lg bg-slate-900 border border-slate-700 
                     px-3.5 py-2.5 text-sm
                     focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) => {
                  setPassword(e.target.value);
                  setError("");
                }}
                placeholder="••••••••"
                className="w-full rounded-lg bg-slate-900 border border-slate-700 
                       px-3.5 py-2.5 pr-11 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => {
                  setShowPassword(!showPassword);
                  setError("");
                }}
                className="absolute right-3 top-1/2 -translate-y-1/2 
                       text-slate-400 hover:text-slate-200"
              >
                {showPassword ? (
                  <FaEyeSlash className="text-xl" />
                ) : (
                  <FaEye className="text-xl" />
                )}
              </button>
            </div>
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-sm font-medium text-slate-200 mb-2">
              Confirm password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {
                  setConfirmPassword(e.target.value);
                  setError("");
                }}
                placeholder="••••••••"
                className="w-full rounded-lg bg-slate-900 border border-slate-700 
                       px-3.5 py-2.5 pr-11 text-sm
                       focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-3 top-1/2 -translate-y-1/2 
                       text-slate-400 hover:text-slate-200"
              >
                {showConfirmPassword ? (
                  <FaEyeSlash className="text-xl" />
                ) : (
                  <FaEye className="text-xl" />
                )}
              </button>
            </div>
          </div>

          {/* Hints */}
          <div className="text-xs space-y-1">
            {passwordTooShort && (
              <p className="text-yellow-400">
                • Password must be at least 6 characters
              </p>
            )}
            {passwordsMismatch && (
              <p className="text-red-400">
                • Passwords do not match
              </p>
            )}
          </div>

          {/* Submit */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-2 py-2.5 rounded-lg font-semibold text-base text-white
                   bg-linear-to-r from-indigo-500 to-violet-500
                   hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        {/* Login link */}
        <p className="text-xs text-slate-400 text-center mt-6">
          Already have an account?{" "}
          <Link to="/login" className="text-indigo-400 hover:underline">
            Log in
          </Link>
        </p>
      </div>
    </div>
  );

}

export default Signup;
