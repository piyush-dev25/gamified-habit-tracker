import { useState } from "react";
import { useAuth } from "../context/AuthContext";

function Signup() {
  const { login } = useAuth();

  const [username, setUsername] = useState("");
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [error, setError] = useState("");
  const [loading, setLoading] = useState(false);
  const [confirmPassword, setConfirmPassword] = useState("");
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const passwordTooShort = password.length > 0 && password.length < 6;
  const passwordsMismatch =
    confirmPassword.length > 0 && password !== confirmPassword;

  async function handleSubmit(e) {
    e.preventDefault();
    setError("");
    setLoading(true);

    if (password !== confirmPassword) {
      setError("Passwords do not match");
      setLoading(false);
      return;
    }

    if (password.length < 6) {
      setError("Password must be at least 6 characters");
      setLoading(false);
      return;
    }

    try {
      const res = await fetch("http://localhost:5000/api/auth/signup", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          username,
          email,
          password,
        }),
      });

      const data = await res.json();

      if (!res.ok) {
        setError(data.message || "Signup failed");
      } else {
        // auto-login after signup
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
      <div className="w-full max-w-md bg-slate-800 rounded-2xl shadow-xl p-8">
        <h1 className="text-3xl font-bold text-center">
          Create account
        </h1>

        {error && (
          <p className="mt-4 text-sm text-red-400 text-center">
            {error}
          </p>
        )}

        <form onSubmit={handleSubmit} className="mt-6 space-y-4">
          <input
            type="text"
            placeholder="Username"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          />

          <input
            type="email"
            placeholder="Email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 focus:ring-2 focus:ring-indigo-500"
          />

          <div className="relative">
            <input
              type={showPassword ? "text" : "password"}
              placeholder="Password"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 pr-10 focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              onClick={() => setShowPassword((p) => !p)}
              className="absolute right-3 top-2 text-sm text-slate-400 hover:text-slate-200"
            >
              {showPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="relative">
            <input
              type={showConfirmPassword ? "text" : "password"}
              placeholder="Confirm password"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 pr-10 focus:ring-2 focus:ring-indigo-500"
            />

            <button
              type="button"
              onClick={() => setShowConfirmPassword((p) => !p)}
              className="absolute right-3 top-2 text-sm text-slate-400 hover:text-slate-200"
            >
              {showConfirmPassword ? "Hide" : "Show"}
            </button>
          </div>

          <div className="text-sm space-y-1">
            {passwordTooShort && (
              <p className="text-yellow-400">
                • Password should be at least 6 characters
              </p>
            )}

            {passwordsMismatch && (
              <p className="text-red-400">
                • Passwords do not match
              </p>
            )}
          </div>


          <button
            type="submit"
            disabled={loading}
            className="w-full py-2 rounded-lg font-semibold text-white bg-indigo-600 hover:bg-indigo-700 disabled:opacity-50"
          >
            {loading ? "Creating..." : "Sign up"}
          </button>
        </form>
        {/* Login link */}
        <p className="text-2sm text-slate-400 text-center mt-7">
          Already have an account?{" "}
          <a
            href="/login"
            className="text-indigo-400 hover:underline"
          >
            Log in
          </a>
        </p>
      </div>
    </div>
  );
}

export default Signup;
