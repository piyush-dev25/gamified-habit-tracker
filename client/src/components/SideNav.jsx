import { Link } from "react-router-dom";
import { useAuth } from "../context/AuthContext";
import Avatar from "./Avatar";

function SideNav({ username, open, onClose }) {
  const { logout } = useAuth();

  return (
    <>
      {/* 🔴 CHANGE 1: Mobile overlay (click to close) */}
      {open && (
        <div
          className="fixed inset-0 bg-black/50 z-40 md:hidden"
          onClick={onClose}
        />
      )}

      {/* 🔴 CHANGE 2: Replace outer div with <aside> + sliding logic */}
      <aside
        className={`
          fixed md:static z-50
          w-64 h-screen
          bg-slate-900 border-r border-slate-800
          flex flex-col
          transform transition-transform duration-200
          ${open ? "translate-x-0" : "-translate-x-full"}
          md:translate-x-0
        `}
      >
        {/* 🔴 CHANGE 3: Make header flex + add close button */}
        <div className="px-6 py-5 border-b border-slate-800 flex justify-between items-center">
          <Link to="/dashboard" className="text-2xl font-bold">
            Habi<span className="text-indigo-400">tual</span>
          </Link>

          {/* 🔴 CHANGE 4: Close button (mobile only) */}
          <button
            onClick={onClose}
            className="md:hidden text-slate-400 text-2xl"
          >
            ✕
          </button>
        </div>

        {/* Navigation */}
        <nav className="flex-1 px-4 py-6 space-y-2 text-lg">
          <Link
            to="/dashboard"
            className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800"
          >
            Home
          </Link>

          <Link
            to="/about"
            className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800"
          >
            About
          </Link>

          <Link
            to="/settings"
            className="block px-3 py-2 rounded-lg text-slate-300 hover:bg-slate-800"
          >
            Settings
          </Link>
        </nav>

        {/* User / actions */}
        <div className="px-4 py-4 border-t border-slate-800 space-y-3">
          <Link
            to="/settings"
            className="flex items-center gap-3 px-3 py-2 rounded-lg hover:bg-slate-800"
          >
            <Avatar name={username} size={40} />
            <span className="text-lg text-slate-300">{username}</span>
          </Link>

          <button
            onClick={logout}
            className="w-full text-left px-3 py-2 text-lg text-red-400 rounded-lg hover:bg-slate-800"
          >
            Logout
          </button>
        </div>
      </aside>
    </>
  );
}

export default SideNav;
