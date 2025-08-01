import React, { useState, useEffect } from 'react';
import api from '../services/api';

export default function SearchAlumni() {
  const [company, setCompany] = useState('');
  const [alumniList, setAlumniList] = useState([]);
  const [selected, setSelected] = useState(null);
  const [position, setPosition] = useState('');
  const [resume, setResume] = useState(null);

  const search = async () => {
    const res = await api.get('/auth/all-users'); // assumes route exists to get alumni
    const filtered = res.data.filter(u => u.role === 'alumni' && u.company?.toLowerCase().includes(company.toLowerCase()));
    setAlumniList(filtered);
  };

  const sendRequest = async () => {
    const form = new FormData();
    form.append('position', position);
    form.append('company', selected.company);
    form.append('alumniId', selected._id);
    if (resume) form.append('resume', resume);

    try {
      await api.post('/referral-requests/request', form);
      alert('Referral request sent!');
      setSelected(null); setCompany(''); setResume(null); setPosition('');
    } catch (err) {
      console.error(err);
      alert('Failed to send request.');
    }
  };

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-100 px-2 py-8">
      <div className="flex flex-col items-center mb-10">
        <div className="bg-gradient-to-tr from-teal-500 to-indigo-500 rounded-full p-4 shadow-lg mb-4">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Search Alumni by Company</h2>
        <p className="text-gray-500 text-base text-center max-w-lg">
          Find alumni at your target company and request a referral.
        </p>
      </div>
      <div className="flex flex-col md:flex-row gap-4 mb-8 items-center justify-center w-full max-w-2xl">
        <input
          value={company}
          onChange={e => setCompany(e.target.value)}
          placeholder="Company name"
          className="p-3 border border-indigo-200 focus:border-indigo-400 focus:ring-2 focus:ring-indigo-100 rounded-lg w-full md:w-80 text-indigo-900 bg-white transition"
        />
        <button
          onClick={search}
          className="bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md px-6 py-2 hover:from-teal-600 hover:to-indigo-600 transition"
        >
          Search
        </button>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6 w-full max-w-6xl">
        {alumniList.map(a => (
          <div
            key={a._id}
            className="relative bg-white rounded-2xl shadow-lg border border-indigo-100 hover:shadow-2xl transition-shadow duration-300 p-7 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-indigo-100 text-indigo-600 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold shadow">
                {a.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-lg text-indigo-900">{a.name}</h3>
                <p className="text-xs text-slate-500">{a.email}</p>
              </div>
            </div>
            <div className="flex-1 space-y-2 mb-4">
              <div>
                <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm mr-2">
                  {a.company}
                </span>
              </div>
            </div>
            <button
              onClick={() => setSelected(a)}
              className="mt-auto w-full bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md py-2 hover:from-teal-600 hover:to-indigo-600 transition"
            >
              Request Referral
            </button>
          </div>
        ))}
      </div>
      {alumniList.length === 0 && (
        <div className="text-center text-indigo-400 mt-20 text-lg">
          No alumni found for this company.
        </div>
      )}
      {selected && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/30">
          <div className="bg-white/90 backdrop-blur-md rounded-2xl shadow-2xl border border-gray-100 p-8 w-full max-w-md relative">
            <button
              className="absolute top-3 right-3 text-indigo-400 hover:text-indigo-700 text-2xl font-bold"
              onClick={() => setSelected(null)}
              title="Close"
            >
              &times;
            </button>
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-tr from-teal-400 to-indigo-400 rounded-full w-12 h-12 flex items-center justify-center text-white text-xl font-bold shadow">
                {selected.name.charAt(0).toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-lg text-indigo-900">{selected.name}</h3>
                <p className="text-xs text-slate-500">{selected.email}</p>
              </div>
            </div>
            <form
              onSubmit={e => {
                e.preventDefault();
                sendRequest();
              }}
              className="space-y-4"
            >
              <div>
                <label className="block text-indigo-700 font-medium mb-1">Position you're applying for</label>
                <input
                  value={position}
                  onChange={e => setPosition(e.target.value)}
                  placeholder="e.g. Software Engineer"
                  className="border border-teal-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 rounded-lg w-full px-3 py-2 text-indigo-900 bg-white transition"
                  required
                />
              </div>
              <div>
                <label className="block text-indigo-700 font-medium mb-1">Upload Resume (PDF)</label>
                <input
                  type="file"
                  accept=".pdf"
                  className="block w-full text-indigo-900"
                  onChange={e => setResume(e.target.files[0])}
                />
              </div>
              <button
                type="submit"
                className="w-full bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md py-2 hover:from-teal-600 hover:to-indigo-600 transition"
              >
                Send Request
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
}
