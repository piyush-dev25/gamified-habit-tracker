import { useAuth } from "../context/AuthContext";
import { useEffect, useState } from "react";

function Settings() {
    const { token, logout } = useAuth();
    const [profile, setProfile] = useState(null);
    const [oldPassword, setOldPassword] = useState("");
    const [newPassword, setNewPassword] = useState("");
    const [confirmPassword, setConfirmPassword] = useState("");
    const [message, setMessage] = useState("");
    const [error, setError] = useState("");
    const [showOld, setShowOld] = useState(false);
    const [showNew, setShowNew] = useState(false);
    const [showConfirm, setShowConfirm] = useState(false);
    const [deleteConfirm, setDeleteConfirm] = useState("");

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
                <div className="bg-slate-800 rounded-xl p-6 space-y-4">
                    <h2 className="text-xl font-semibold">Update password</h2>

                    {error && <p className="text-red-400 text-sm">{error}</p>}
                    {message && <p className="text-green-400 text-sm">{message}</p>}

                    <div className="relative">
                        <input
                            type={showOld ? "text" : "password"}
                            placeholder="Old password"
                            value={oldPassword}
                            onChange={(e) => setOldPassword(e.target.value)}
                            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowOld((v) => !v)}
                            className="absolute right-3 top-2 text-sm text-slate-400 hover:text-slate-200"
                        >
                            {showOld ? "Hide" : "Show"}
                        </button>
                    </div>


                    <div className="relative">
                        <input
                            type={showNew ? "text" : "password"}
                            placeholder="New password"
                            value={newPassword}
                            onChange={(e) => setNewPassword(e.target.value)}
                            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowNew((v) => !v)}
                            className="absolute right-3 top-2 text-sm text-slate-400 hover:text-slate-200"
                        >
                            {showNew ? "Hide" : "Show"}
                        </button>
                    </div>


                    <div className="relative">
                        <input
                            type={showConfirm ? "text" : "password"}
                            placeholder="Confirm new password"
                            value={confirmPassword}
                            onChange={(e) => setConfirmPassword(e.target.value)}
                            className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2 pr-10"
                        />
                        <button
                            type="button"
                            onClick={() => setShowConfirm((v) => !v)}
                            className="absolute right-3 top-2 text-sm text-slate-400 hover:text-slate-200"
                        >
                            {showConfirm ? "Hide" : "Show"}
                        </button>
                    </div>


                    <button
                        onClick={async () => {
                            setError("");
                            setMessage("");

                            if (oldPassword === newPassword) {
                                setError("New password must be different from old password");
                                return;
                            }

                            if (newPassword !== confirmPassword) {
                                setError("Passwords do not match");
                                return;
                            }

                            const res = await fetch("http://localhost:5000/api/users/password", {
                                method: "PATCH",
                                headers: {
                                    "Content-Type": "application/json",
                                    Authorization: `Bearer ${token}`,
                                },
                                body: JSON.stringify({
                                    oldPassword,
                                    newPassword,
                                }),
                            });

                            const data = await res.json();

                            if (!res.ok) {
                                setError(data.message || "Failed to update password");
                                return;
                            }

                            setMessage("Password updated successfully");
                            setOldPassword("");
                            setNewPassword("");
                            setConfirmPassword("");
                        }}
                        className="bg-indigo-600 hover:bg-indigo-700 px-4 py-2.5 rounded-lg font-medium text-sm"
                    >
                        Update password
                    </button>
                </div>


                {/* Danger zone placeholder */}
                <div className="bg-slate-800 rounded-xl p-6 space-y-4 border border-red-500/30">
                    <h2 className="text-xl font-semibold text-red-400">Danger zone</h2>

                    <p className="text-sm text-slate-400">
                        Deleting your account is permanent. All your habits and progress will be lost.
                    </p>

                    <input
                        type="text"
                        placeholder='Type "DELETE" to confirm'
                        value={deleteConfirm}
                        onChange={(e) => setDeleteConfirm(e.target.value)}
                        className="w-full rounded-lg bg-slate-900 border border-slate-700 px-3 py-2"
                    />

                    <button
                        disabled={deleteConfirm !== "DELETE"}
                        onClick={async () => {
                            const res = await fetch("http://localhost:5000/api/users", {
                                method: "DELETE",
                                headers: {
                                    Authorization: `Bearer ${token}`,
                                },
                            });

                            if (!res.ok) return;
                            setDeleteConfirm("");
                            logout();
                        }}
                        className="bg-red-600 hover:bg-red-700 px-4 py-2.5 rounded-lg font-medium text-sm"
                    >
                        Delete account
                    </button>
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
