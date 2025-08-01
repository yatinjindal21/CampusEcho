import React, { useState, useContext } from 'react';
import { AuthContext } from '../context/AuthContext';

export default function Login() {
  const [form, setForm] = useState({ email: '', password: '' });
  const [error, setError] = useState(''); // ✅ new state to hold error
  const { login } = useContext(AuthContext);

  const handle = e => {
    setForm({ ...form, [e.target.name]: e.target.value });
    setError(''); // clear error on typing
  };

  const submit = async e => {
    e.preventDefault();
    try {
      await login(form.email, form.password);
    } catch (err) {
      setError(err.response?.data?.msg || 'Login failed'); // ✅ display backend message
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-100">
      <div className="w-full max-w-md bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-10 border border-gray-100">
        <div className="flex flex-col items-center mb-8">
          <div className="bg-gradient-to-tr from-teal-500 to-indigo-500 rounded-full p-3 shadow-lg mb-3">
            <svg className="w-8 h-8 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M16 12a4 4 0 11-8 0 4 4 0 018 0zm2 6a6 6 0 00-12 0" />
            </svg>
          </div>
          <h2 className="text-3xl font-bold text-gray-800 mb-1">Sign in to your account</h2>
          <p className="text-gray-500 text-sm">Welcome back! Please enter your credentials.</p>
        </div>
        {error && (
          <div className="mb-4 w-full bg-red-50 border border-red-200 text-red-700 px-4 py-2 rounded flex items-center gap-2">
            <svg className="w-5 h-5 text-red-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 9v2m0 4h.01M21 12A9 9 0 1 1 3 12a9 9 0 0 1 18 0Z" />
            </svg>
            <span className="text-sm">{error}</span>
          </div>
        )}
        <form onSubmit={submit} className="space-y-6">
          <div>
            <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
              Email address
            </label>
            <input
              id="email"
              name="email"
              type="email"
              autoComplete="email"
              placeholder="you@email.com"
              value={form.email}
              onChange={handle}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              required
            />
          </div>
          <div>
            <label htmlFor="password" className="block text-sm font-medium text-gray-700 mb-1">
              Password
            </label>
            <input
              id="password"
              name="password"
              type="password"
              autoComplete="current-password"
              placeholder="••••••••"
              value={form.password}
              onChange={handle}
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-2 bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-teal-600 hover:to-indigo-600 transition"
          >
            Sign In
          </button>
        </form>
        <div className="mt-6 text-center text-sm text-gray-500">
          Don't have an account? <a href="/register" className="text-teal-600 hover:underline font-medium">Sign up</a>
        </div>
      </div>
    </div>
  );
}
