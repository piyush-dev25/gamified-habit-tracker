import { useState, useEffect } from "react";
import SideNav from "../components/SideNav";
import { useAuth } from "../context/AuthContext";
import { FaGithub } from "react-icons/fa";
import { MdOutlineEmail } from "react-icons/md";

function About() {
  const { token } = useAuth();               // ✅ only token
  const [profile, setProfile] = useState(null);
  const [navOpen, setNavOpen] = useState(false);

  // ✅ fetch profile (same pattern as Settings)
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

  // ✅ loading guard (prevents white screen)
  if (!profile) {
    return (
      <div className="min-h-screen bg-slate-900 flex items-center justify-center text-slate-400">
        Loading…
      </div>
    );
  }

  return (
    <div className="h-screen flex bg-slate-900 text-slate-100 overflow-hidden">

      {/* SideNav */}
      <SideNav
        username={profile.username}           // ✅ real username
        open={navOpen}
        onClose={() => setNavOpen(false)}
      />

      {/* Main content */}
      <main className="flex-1 overflow-y-auto">
        <div className="p-6 space-y-8">

          {/* Mobile menu */}
          <div className="md:hidden">
            <button
              onClick={() => setNavOpen(true)}
              className="text-slate-300 text-2xl"
            >
              ☰
            </button>
          </div>

          <div className="w-full max-w-3xl mx-auto py-6 space-y-10">

            {/* Title */}
            <h1 className="text-3xl font-bold">
              About Habi<span className="text-indigo-400">tual</span>
            </h1>

            {/* What the app is */}
            <div className="space-y-4 text-slate-400 leading-relaxed">
              <p>
                Habitual is a simple, gamified habit tracker built to help you
                stay consistent without feeling overwhelmed. The goal isn’t
                perfection — it’s showing up, one small win at a time.
              </p>

              <p>
                Habits are tracked daily, streaks reward consistency, and points
                help visualize progress over time. Miss a day? No guilt — just
                reset and keep going.
              </p>
            </div>

            {/* Personal story */}
            <div className="space-y-4 text-slate-300 leading-relaxed">
              <p>
                Hi, I’m{" "}
                <span className="font-semibold text-slate-100">
                  Piyush Sharma
                </span>
                , a B.Tech student at Delhi Technological University (DTU).
              </p>

              <p>
                I built Habitual during a phase where I felt stuck and
                unmotivated. Instead of waiting to feel disciplined, I decided
                to build something that could help me take small, consistent
                steps forward.
              </p>

              <p>
                This project is as much about self-improvement as it is about
                learning full-stack development. Every feature exists because I
                personally needed it.
              </p>
            </div>

            {/* Tech stack */}
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

            {/* Footer / connect */}
            <div className="pt-6 border-t border-slate-800 space-y-3">
              <h2 className="text-xl font-semibold">Connect</h2>

              <div className="flex gap-2 text-slate-400">
                <a
                  href="https://github.com/piyush-dev25"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {<FaGithub className="text-3xl"/>}
                </a>

                <a
                  href="https://mail.google.com/mail/?view=cm&fs=1&to=piyush.25june@gmail.com"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="hover:underline"
                >
                  {<MdOutlineEmail className="text-3xl"/>}
                </a>
              </div>
            </div>

            {/* Closing note */}
            <p className="text-slate-500 text-sm">
              Built as a full-stack learning project with a focus on clean
              architecture, real-world workflows, and long-term consistency.
            </p>

          </div>
        </div>
      </main>
    </div>
  );
}

export default About;
