import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

function Settings() {
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
        Loading settings…
      </div>
    );
  }

  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex justify-center">
      <div className="w-full max-w-2xl px-6 py-10 space-y-8">

        <h1 className="text-3xl font-bold">Settings</h1>

        {/* Account info */}
        <div className="bg-slate-800 rounded-xl p-6 space-y-4">
          <h2 className="text-xl font-semibold">Account</h2>

          <div>
            <p className="text-sm text-slate-400">Username</p>
            <p className="font-medium">{profile.username}</p>
          </div>

          <div>
            <p className="text-sm text-slate-400">Email</p>
            <p className="font-medium">{profile.email}</p>
          </div>

          <div>
            <p className="text-sm text-slate-400">Account created</p>
            <p className="font-medium">
              {new Date(profile.createdAt).toLocaleDateString()}
            </p>
          </div>
        </div>

        {/* Security placeholder */}
        <div className="bg-slate-800 rounded-xl p-6 space-y-2 opacity-70">
          <h2 className="text-xl font-semibold">Security</h2>
          <p className="text-slate-400 text-sm">
            Password update coming soon.
          </p>
        </div>

        {/* Danger zone placeholder */}
        <div className="bg-slate-800 rounded-xl p-6 space-y-2 opacity-70">
          <h2 className="text-xl font-semibold text-red-400">Danger zone</h2>
          <p className="text-slate-400 text-sm">
            Account deletion coming soon.
          </p>
        </div>

        {/* Logout */}
        <button
          onClick={logout}
          className="text-red-400 hover:underline"
        >
          Logout
        </button>

      </div>
    </div>
  );
}

export default Settings;
