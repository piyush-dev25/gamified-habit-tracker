import { Link } from "react-router-dom";

function Home() {
    return (
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

            <Link
                to="/about"
                className="px-6 py-3 rounded-xl text-slate-300 hover:underline"
            >
                About
            </Link>
        </div>

    );
}

export default Home;
