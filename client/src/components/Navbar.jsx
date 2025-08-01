import React, { useContext } from 'react';
import { Link } from 'react-router-dom';
import { AuthContext } from '../context/AuthContext';

export default function Navbar() {
  const { user, logout } = useContext(AuthContext);

  return (
    <nav className="fixed top-0 left-0 right-0 z-50 bg-gradient-to-r from-teal-50 via-white to-indigo-100 shadow-md border-b border-indigo-100 py-3 px-6 flex items-center justify-between">
      <Link
        to="/"
        className="flex items-center gap-2 text-2xl font-extrabold text-indigo-700 tracking-tight hover:text-indigo-900 transition"
      >
        <svg className="w-8 h-8 text-teal-500" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
          <rect x="6" y="8" width="7" height="2" rx="1" fill="#38bdf8"/>
          <rect x="6" y="12" width="10" height="2" rx="1" fill="#818cf8"/>
          <rect x="6" y="16" width="5" height="2" rx="1" fill="#818cf8"/>
          <rect x="15" y="8" width="3" height="10" rx="1" fill="#6366f1"/>
        </svg>
        Campus News
      </Link>
      <div className="flex items-center gap-4">
        {user ? (
          <>
            <span className="text-base text-indigo-600 font-medium bg-indigo-50 px-3 py-1 rounded-full shadow-sm">
              Hi, {user.name}
            </span>
            <button
              onClick={logout}
              className="px-4 py-1.5 bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-semibold rounded-lg shadow hover:from-teal-600 hover:to-indigo-600 transition text-sm"
            >
              Logout
            </button>
          </>
        ) : (
          <>
            <Link
              to="/login"
              className="px-4 py-1.5 bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-semibold rounded-lg shadow hover:from-teal-600 hover:to-indigo-600 transition text-sm"
            >
              Login
            </Link>
            <Link
              to="/register"
              className="px-4 py-1.5 bg-white border border-indigo-200 text-indigo-700 font-semibold rounded-lg shadow hover:bg-indigo-50 transition text-sm"
            >
              Register
            </Link>
          </>
        )}
      </div>
    </nav>
  );
}
