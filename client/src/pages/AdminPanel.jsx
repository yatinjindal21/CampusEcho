import React, { useState } from 'react';
import api from '../services/api';

export default function AdminPanel() {
  const [form, setForm] = useState({ name: '', email: '', password: '', role: 'alumni', society: '', company: '' });
  const [msg, setMsg] = useState('');

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    try {
      const res = await api.post('/auth/admin/register-user', form);
      setMsg(res.data.msg);
      setForm({ name: '', email: '', password: '', role: 'alumni' });
    } catch (err) {
      console.error('Error:', err.response?.data); // ✅ log server error
      setMsg(err.response?.data?.msg || 'Error creating user');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-100 px-2">
      <div className="w-full max-w-2xl bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl p-12 border border-gray-100">
        <div className="flex flex-col items-center mb-10">
          <div className="bg-gradient-to-tr from-teal-500 to-indigo-500 rounded-full p-4 shadow-lg mb-4">
            <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
            </svg>
          </div>
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Create User</h1>
          <p className="text-gray-500 text-base text-center max-w-lg">Admin can create Alumni or Society Head accounts here.</p>
        </div>
        {msg && (
          <div className="mb-6 text-center">
            <span className="inline-block bg-blue-100 text-blue-700 px-4 py-2 rounded font-medium">{msg}</span>
          </div>
        )}
        <form onSubmit={submit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="name" className="block text-sm font-medium text-gray-700 mb-1">
                Name
              </label>
              <input
                id="name"
                name="name"
                value={form.name}
                onChange={handle}
                placeholder="Enter full name"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition bg-white text-gray-800"
                required
              />
            </div>
            <div>
              <label htmlFor="email" className="block text-sm font-medium text-gray-700 mb-1">
                Email
              </label>
              <input
                id="email"
                name="email"
                value={form.email}
                onChange={handle}
                placeholder="Enter email address"
                type="email"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition bg-white text-gray-800"
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
                value={form.password}
                onChange={handle}
                placeholder="Set a password"
                type="password"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition bg-white text-gray-800"
                required
              />
            </div>
            <div>
              <label htmlFor="role" className="block text-sm font-medium text-gray-700 mb-1">
                Role
              </label>
              <select
                id="role"
                name="role"
                value={form.role}
                onChange={handle}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition bg-white text-gray-800"
              >
                <option value="alumni">Alumni</option>
                <option value="society_head">Society Head</option>
              </select>
            </div>
            {form.role === 'society_head' && (
              <div className="md:col-span-2">
                <label htmlFor="society" className="block text-sm font-medium text-gray-700 mb-1">
                  Society
                </label>
                <input
                  id="society"
                  name="society"
                  value={form.society}
                  onChange={handle}
                  placeholder="Enter Society Name"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition bg-white text-gray-800"
                  required
                />
              </div>
            )}
            {form.role === 'alumni' && (
              <div className="md:col-span-2">
                <label htmlFor="company" className="block text-sm font-medium text-gray-700 mb-1">
                  Company
                </label>
                <input
                  id="company"
                  type="text"
                  name="company"
                  value={form.company}
                  onChange={handle}
                  placeholder="Enter Company Name"
                  className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition bg-white text-gray-800"
                  required
                />
              </div>
            )}
          </div>
          <button
            type="submit"
            className="w-full bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md py-2 hover:from-teal-600 hover:to-indigo-600 transition"
          >
            Create User
          </button>
        </form>
      </div>
    </div>
  );
}
