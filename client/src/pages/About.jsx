function About() {
  return (
    <div className="min-h-screen bg-slate-900 text-slate-100 flex justify-center">
      <div className="max-w-3xl px-6 py-12 space-y-8">
        <h1 className="text-3xl font-bold">
          About Habit<span className="text-indigo-400">Forge</span>
        </h1>

        <p className="text-slate-400 leading-relaxed">
          HabitForge is a simple, gamified habit tracker built to help you
          stay consistent without feeling overwhelmed. The goal isn’t
          perfection — it’s showing up, one small win at a time.
        </p>

        <p className="text-slate-400 leading-relaxed">
          Habits are tracked daily, streaks reward consistency, and points
          help visualize progress over time. Miss a day? No guilt — just
          reset and keep going.
        </p>

        <div>
          <h2 className="text-xl font-semibold mb-3">Tech Stack</h2>
          <ul className="list-disc list-inside text-slate-400 space-y-1">
            <li>React + React Router</li>
            <li>Tailwind CSS</li>
            <li>Node.js + Express</li>
            <li>MongoDB + Mongoose</li>
            <li>JWT-based authentication</li>
          </ul>
        </div>

        <p className="text-slate-500 text-sm">
          Built as a full-stack learning project with a focus on clean
          architecture and real-world workflows.
        </p>
      </div>
    </div>
  );
}

export default About;
