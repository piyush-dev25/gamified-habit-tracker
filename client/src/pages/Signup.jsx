import { useState } from "react";
import { FaEye } from "react-icons/fa";
import { FaEyeSlash } from "react-icons/fa";

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
      const res = await fetch("http://localhost:5000/api/auth/signup", {
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
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100">
      <div className="w-full max-w-lg bg-slate-800 rounded-2xl shadow-xl p-10">

        {/* App name */}
        <h1 className="text-4xl font-bold text-center">
          Habi<span className="text-indigo-400">tual</span>
        </h1>

        {/* Subtitle */}
        <p className="text-slate-400 text-center mt-3 text-base">
          Create your account to begin.
        </p>

        {/* Error */}
        {error && (
          <p className="mt-5 text-sm text-red-400 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* Username */}
          <div>
            <label className="block text-base font-medium text-slate-200 mb-2.5">
              Username
            </label>
            <input
              type="text"
              value={username}
              onChange={(e) => {setUsername(e.target.value);
                 setError("");}
              }
              placeholder="Full Name"
              className="w-full rounded-lg bg-slate-900 border border-slate-700 
                         px-4 py-3 text-base
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Email */}
          <div>
            <label className="block text-base font-medium text-slate-200 mb-2.5">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => {setEmail(e.target.value);
                 setError("");}
              }
              placeholder="you@example.com"
              className="w-full rounded-lg bg-slate-900 border border-slate-700 
                         px-4 py-3 text-base
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
            />
          </div>

          {/* Password */}
          <div>
            <label className="block text-base font-medium text-slate-200 mb-2.5">
              Password
            </label>

            <div className="relative">
              <input
                type={showPassword ? "text" : "password"}
                value={password}
                onChange={(e) =>{ setPassword(e.target.value);
                   setError("");}
                }
                placeholder="••••••••"
                className="w-full rounded-lg bg-slate-900 border border-slate-700 
                         px-4 py-3 pr-12 text-base
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => {setShowPassword(!showPassword);
                   setError("");}
                }
                className="absolute right-4 top-1/2 -translate-y-1/2 
                         text-slate-400 hover:text-slate-200 text-lg"
              >
                {showPassword ? <FaEyeSlash className="text-2xl"/> : <FaEye className="text-2xl"/>}
              </button>
            </div>
          </div>

          {/* Confirm password */}
          <div>
            <label className="block text-base font-medium text-slate-200 mb-2.5">
              Confirm password
            </label>

            <div className="relative">
              <input
                type={showConfirmPassword ? "text" : "password"}
                value={confirmPassword}
                onChange={(e) => {setConfirmPassword(e.target.value);
                   setError("");}
                }
                placeholder="••••••••"
                className="w-full rounded-lg bg-slate-900 border border-slate-700 
                         px-4 py-3 pr-12 text-base
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 
                         text-slate-400 hover:text-slate-200 text-lg"
              >
                {showConfirmPassword ? <FaEyeSlash className="text-2xl"/> : <FaEye className="text-2xl"/>}
              </button>
            </div>
          </div>

          {/* Hints */}
          <div className="text-sm space-y-1">
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
            className="w-full mt-3 py-3 rounded-lg font-semibold text-lg text-white
                     bg-linear-to-r from-indigo-500 to-violet-500
                     hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Creating account..." : "Sign up"}
          </button>
        </form>

        {/* Login link */}
        <p className="text-sm text-slate-400 text-center mt-7">
          Already have an account?{" "}
          <a href="/login" className="text-indigo-400 hover:underline">
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
