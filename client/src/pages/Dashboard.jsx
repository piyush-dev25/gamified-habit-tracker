import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
  const { token, logout } = useAuth();
  const [profile, setProfile] = useState(null);

  useEffect(() => {
    async function fetchProfile() {
      const res = await fetch("http://localhost:5000/api/users/me", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });
      const data = await res.json();
      setProfile(data);
    }

    fetchProfile();
  }, [token]);

  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">
        Loading dashboard…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100">
      {/* Top bar */}
      <div className="flex items-center justify-between px-6 py-4 border-b border-slate-800">
        <h1 className="text-xl font-bold">
          Habit<span className="text-indigo-400">Forge</span>
        </h1>

        <button
          onClick={logout}
          className="text-sm text-red-400 hover:underline"
        >
          Logout
        </button>
      </div>

      {/* Main content */}
      <div className="p-6 space-y-8">

        {/* Greeting */}
        <div>
          <h2 className="text-2xl font-semibold">
            Welcome back, {profile.username}
          </h2>
          <p className="text-slate-400 mt-1">
            One small win, every day.
          </p>
        </div>

        {/* Stats */}
        <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
          <StatCard label="Level" value={profile.level} />
          <StatCard label="Points" value={profile.points} />
          <StatCard label="Streak" value="—" />
        </div>

        {/* Habits placeholder */}
        <div>
          <h3 className="text-lg font-semibold mb-3">
            Today’s Habits
          </h3>

          <div className="space-y-3">
            <PlaceholderHabit />
            <PlaceholderHabit />
            <PlaceholderHabit />
          </div>
        </div>

        {/* Add habit placeholder */}
        <button
          disabled
          className="w-full py-3 rounded-xl border border-dashed border-slate-700 text-slate-400 cursor-not-allowed"
        >
          + Add new habit (coming soon)
        </button>
      </div>
    </div>
  );
}

function StatCard({ label, value }) {
  return (
    <div className="bg-slate-800 rounded-xl p-4">
      <p className="text-sm text-slate-400">{label}</p>
      <p className="text-2xl font-bold mt-1">{value}</p>
    </div>
  );
}

function PlaceholderHabit() {
  return (
    <div className="bg-slate-800 rounded-xl p-4 flex items-center justify-between opacity-70">
      <div>
        <p className="font-medium">Habit name</p>
        <p className="text-sm text-slate-400">
          Streak: —
        </p>
      </div>

      <button
        disabled
        className="px-4 py-2 rounded-lg bg-slate-700 text-slate-400 cursor-not-allowed"
      >
        Done
      </button>
    </div>
  );
}

export default Dashboard;
