import { useEffect, useState } from "react";
import { useAuth } from "../context/AuthContext";

function Dashboard() {
    const { token, logout } = useAuth();
    const [profile, setProfile] = useState(null);
    const [habits, setHabits] = useState([]);
    const [newHabit, setNewHabit] = useState("");
    const [adding, setAdding] = useState(false);
    const pointsInLevel = profile ? profile.points % 100 : 0;
    const pointsToNextLevel = profile ? 100 - pointsInLevel : 100;

    if (!token) {
        return (
            <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">
                Not authenticated
            </div>
        );
    }

    useEffect(() => {
        async function fetchData() {
            const profileRes = await fetch("http://localhost:5000/api/users/me", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const profileData = await profileRes.json();
            setProfile(profileData);

            const habitsRes = await fetch("http://localhost:5000/api/habits", {
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            });
            const habitsData = await habitsRes.json();
            if (Array.isArray(habitsData)) {
                setHabits(habitsData);
            } else {
                setHabits([]);
            }
        }

        fetchData();
    }, [token]);

    async function handleDone(habitId) {
        const res = await fetch(
            `http://localhost:5000/api/habits/${habitId}/done`,
            {
                method: "PATCH",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        const data = await res.json();

        if (!res.ok) return;

        // Update habit in UI
        setHabits((prev) =>
            prev.map((h) => (h._id === habitId ? data.habit : h))
        );

        // Update profile stats
        setProfile((prev) => ({
            ...prev,
            points: data.user.points,
            level: data.user.level,
        }));
    }

    async function handleAddHabit() {
        if (!newHabit.trim()) return;

        setAdding(true);

        try {
            const res = await fetch("http://localhost:5000/api/habits", {
                method: "POST",
                headers: {
                    "Content-Type": "application/json",
                    Authorization: `Bearer ${token}`,
                },
                body: JSON.stringify({ name: newHabit }),
            });

            const data = await res.json();

            if (!res.ok) return;

            // Add new habit to UI instantly (top)
            const newHabitFromServer = data.habit ?? data;

            setHabits((prev) => [
                {
                    ...newHabitFromServer,
                    lastCompletedDate: newHabitFromServer.lastCompletedDate ?? null,
                },
                ...prev,
            ]);

            setNewHabit("");

        } finally {
            setAdding(false);
        }


    }

    async function handleDeleteHabit(habitId) {
        const confirmed = window.confirm(
            "Are you sure you want to delete this habit?"
        );

        if (!confirmed) return;

        const res = await fetch(
            `http://localhost:5000/api/habits/${habitId}`,
            {
                method: "DELETE",
                headers: {
                    Authorization: `Bearer ${token}`,
                },
            }
        );

        console.log("Delete response status:", res.status);
        if (!res.ok) return;

        // Remove habit from UI instantly
        setHabits((prev) => prev.filter((h) => h._id !== habitId));
    }


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
                        You’re {pointsToNextLevel} points away from leveling up.
                    </p>
                </div>

                {/* Progress Bar */}
                <div className="bg-slate-800 rounded-xl p-4">
                    <p className="text-sm text-slate-400 mb-2">
                        Progress to next level
                    </p>

                    <div className="w-full h-2 bg-slate-700 rounded-full overflow-hidden">
                        <div
                            className="h-full bg-indigo-500 transition-all"
                            style={{ width: `${pointsInLevel}%` }}
                        />
                    </div>
                </div>


                {/* Stats */}
                <div className="grid grid-cols-2 sm:grid-cols-3 gap-4">
                    <StatCard label="Level" value={profile.level} />
                    <StatCard label="Points" value={profile.points} />
                    <StatCard label="Next level"
                        value={`${pointsToNextLevel} pts`}
                    />
                </div>

                {/* Habits placeholder */}
                <div>
                    <h3 className="text-lg font-semibold mb-3">
                        Today’s Habits
                    </h3>

                    <div className="space-y-3">
                        {habits.length === 0 ? (
                            <p className="text-slate-400 text-sm">
                                No habits yet. Add your first one to get started.
                            </p>
                        ) : (
                            habits.map((habit) => (
                                <HabitCard
                                    key={habit._id}
                                    habit={habit}
                                    onDone={handleDone}
                                    onDelete={handleDeleteHabit}
                                />
                            ))

                        )}
                    </div>

                </div>

                {/* Add habit */}
                <div className="flex gap-2">
                    <input
                        type="text"
                        value={newHabit}
                        onChange={(e) => setNewHabit(e.target.value)}
                        onKeyDown={(e) => {
                            if (e.key === "Enter") {
                                e.preventDefault();
                                handleAddHabit();
                            }
                        }}
                        placeholder="New habit (e.g. Read 10 pages)"
                        className="flex-1 rounded-xl bg-slate-800 border border-slate-700 px-4 py-3 text-slate-100 focus:outline-none focus:ring-2 focus:ring-indigo-500"
                    />

                    <button
                        onClick={handleAddHabit}
                        disabled={adding}
                        className="px-5 rounded-xl bg-indigo-600 hover:bg-indigo-700 font-semibold disabled:opacity-50"
                    >
                        {adding ? "Adding…" : "Add"}
                    </button>
                </div>

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

function HabitCard({ habit, onDone, onDelete }) {
    const completedToday =
        habit.lastCompletedDate &&
        new Date(habit.lastCompletedDate).toDateString() ===
        new Date().toDateString();

    return (
        <div className="bg-slate-800 rounded-xl p-4 flex items-center justify-between">
            <div>
                <p className="font-medium">{habit.name || "Unnamed Habit"}</p>
                <p className="text-sm text-slate-400">
                    Streak: {habit.streak}
                </p>
            </div>

            <div className="flex gap-2">
                <button
                    onClick={() => onDone(habit._id)}
                    disabled={completedToday}
                    className={`px-4 py-2 rounded-lg font-semibold transition
                        ${completedToday
                            ? "bg-slate-700 text-slate-400 cursor-not-allowed"
                            : "bg-indigo-600 hover:bg-indigo-700 text-white"
                        }`}
                >
                    {completedToday ? "Done ✓" : "Done"}
                </button>

                <button
                    onClick={() => onDelete(habit._id)}
                    className="px-3 py-2 rounded-lg bg-red-500/10 text-red-400 hover:bg-red-500/20"
                    title="Delete habit"
                >
                    ✕
                </button>
            </div>

        </div>
    );
}


export default Dashboard;
