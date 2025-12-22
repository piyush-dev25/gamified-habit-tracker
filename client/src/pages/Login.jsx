import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Login() {
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const { login } = useAuth();


  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    try {
      const res = await fetch("http://localhost:5000/api/auth/login", {
        method: "POST",
        headers: { "Content-Type": "application/json" },
        body: JSON.stringify({ email, password }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Login failed");
      } else {
        login(data.token);

        // token handling comes next
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
          Habit<span className="text-indigo-400">Forge</span>
        </h1>

        {/* Quote */}
        <p className="text-slate-400 text-center mt-3 text-base">
          One small win, every day.
        </p>

        {/* Error */}
        {error && (
          <p className="mt-5 text-sm text-red-400 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-8 space-y-5">

          {/* Email */}
          <div>
            <label className="block text-base font-medium text-slate-200 mb-2.5 tracking-wide">
              Email
            </label>
            <input
              type="email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
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
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••"
                className="w-full rounded-lg bg-slate-900 border border-slate-700 
                         px-4 py-3 pr-12 text-base
                         focus:outline-none focus:ring-2 focus:ring-indigo-500"
              />

              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-4 top-1/2 -translate-y-1/2 
                         text-slate-400 hover:text-slate-200 text-lg"
              >
                {showPassword ? "🙈" : "👁️"}
              </button>
            </div>
          </div>

          {/* Login button */}
          <button
            type="submit"
            disabled={loading}
            className="w-full mt-3 py-3 rounded-lg font-semibold text-lg text-white 
                     bg-linear-to-r from-indigo-500 to-violet-500
                     hover:opacity-90 transition disabled:opacity-50"
          >
            {loading ? "Logging in..." : "Login"}
          </button>
        </form>

        {/* Signup link */}
        <p className="text-2sm text-slate-400 text-center mt-7">
          Don’t have an account?{" "}
          <a
            href="/signup"
            className="text-indigo-400 hover:underline"
          >
            Sign up
          </a>
        </p>
      </div>
    </div>
  );
}

export default Login;
