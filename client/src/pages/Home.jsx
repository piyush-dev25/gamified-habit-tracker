import { Link } from "react-router-dom";

function Home() {
  return (
    <div className="min-h-screen flex items-center justify-center bg-slate-900 text-slate-100">
      <div className="max-w-xl text-center px-6">
        <h1 className="text-4xl font-bold mb-4">
          Habi<span className="text-indigo-400">tual</span>
        </h1>

        <p className="text-slate-400 mb-8">
          Build consistency. One small win, every day.
        </p>

        <div className="flex justify-center gap-4 flex-wrap">
          <Link
            to="/login"
            className="px-6 py-3 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-semibold"
          >
            Login
          </Link>

          <Link
            to="/signup"
            className="px-6 py-3 rounded-xl border border-slate-700 hover:bg-slate-800"
          >
            Sign up
          </Link>

        </div>
      </div>
    </div>
  );
}

export default Home;
