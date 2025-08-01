import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function MyReferralStatus() {
  const [sent, setSent] = useState([]);

  useEffect(() => {
    api.get('/referral-requests/sent')
      .then(res => setSent(res.data))
      .catch(err => console.error(err));
  }, []);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-100 px-2 py-8">
      <div className="flex flex-col items-center mb-10">
        <div className="bg-gradient-to-tr from-teal-500 to-indigo-500 rounded-full p-4 shadow-lg mb-4">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Your Sent Referral Requests</h2>
        <p className="text-gray-500 text-base text-center max-w-lg">
          Track the status of your referral requests to alumni.
        </p>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8 mb-6 w-full max-w-6xl">
        {sent.map(req => (
          <div
            key={req._id}
            className="relative bg-white rounded-2xl shadow-lg border border-indigo-100 hover:shadow-2xl transition-shadow duration-300 p-7 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-indigo-100 text-indigo-600 rounded-full w-10 h-10 flex items-center justify-center text-xl font-bold shadow">
                {req.alumni?.name?.charAt(0)?.toUpperCase()}
              </div>
              <div>
                <h3 className="font-semibold text-lg text-indigo-900">{req.alumni?.name}</h3>
                <p className="text-xs text-slate-500">{req.alumni?.email}</p>
              </div>
            </div>
            <div className="flex-1 space-y-2 mb-4">
              <div>
                <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm mr-2">
                  {req.company}
                </span>
                <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                  {req.position}
                </span>
              </div>
              <div className="flex items-center gap-2 mt-2">
                <span
                  className={`inline-block px-2 py-0.5 rounded text-xs font-semibold ${
                    req.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-800'
                      : req.status === 'approved'
                      ? 'bg-teal-100 text-teal-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {req.status.charAt(0).toUpperCase() + req.status.slice(1)}
                </span>
              </div>
              <div className="mt-2">
                <span className="font-medium text-indigo-700">Feedback:</span>
                <span className="ml-2 text-indigo-900 bg-white border border-indigo-50 rounded p-1 text-sm min-h-[24px]">
                  {req.feedback ? req.feedback : <span className="italic text-indigo-400">No feedback provided.</span>}
                </span>
              </div>
              {req.resumeUrl && (
                <div className="mt-2">
                  <a
                    href={`http://localhost:5000${req.resumeUrl}`}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-800 underline text-sm font-medium"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    View Resume
                  </a>
                </div>
              )}
            </div>
            <div className="absolute top-2 right-2">
              {req.status === 'approved' && (
                <span title="Approved" className="inline-block bg-teal-100 text-teal-700 px-2 py-0.5 rounded text-xs font-bold shadow">
                  ✓
                </span>
              )}
              {req.status === 'rejected' && (
                <span title="Rejected" className="inline-block bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-bold shadow">
                  ✗
                </span>
              )}
              {req.status === 'pending' && (
                <span title="Pending" className="inline-block bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs font-bold shadow animate-pulse">
                  ...
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      {sent.length === 0 && (
        <div className="text-center text-indigo-400 mt-20 text-lg">
          No referrals sent yet.
        </div>
      )}
    </div>
  );
}
