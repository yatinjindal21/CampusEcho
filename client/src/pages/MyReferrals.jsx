import React, { useEffect, useState } from 'react';
import api from '../services/api';

export default function MyReferrals() {
  const [requests, setRequests] = useState([]);
  const [loading, setLoading] = useState(true);

  const fetchRequests = async () => {
    const res = await api.get('/referral-requests/my-requests');
    setRequests(res.data);
    setLoading(false);
  };

  const respond = async (id, status, feedback) => {
    try {
      await api.post(`/referral-requests/respond/${id}`, { status, feedback });
      alert('Response submitted');
      fetchRequests();
    } catch (err) {
      console.error(err);
      alert('Failed to respond');
    }
  };

  useEffect(() => { fetchRequests(); }, []);

  if (loading) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-100 px-2 py-8">
      <div className="flex flex-col items-center mb-10">
        <div className="bg-gradient-to-tr from-teal-500 to-indigo-500 rounded-full p-4 shadow-lg mb-4">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div>
        <h2 className="text-4xl font-bold text-gray-800 mb-2">Referral Requests</h2>
        <p className="text-gray-500 text-base text-center max-w-lg">
          Review and respond to referral requests from students.
        </p>
      </div>
      <div className="w-full max-w-4xl space-y-6">
        {requests.map(r => (
          <div
            key={r._id}
            className="relative bg-gradient-to-br from-white via-indigo-50 to-purple-50 rounded-2xl shadow-lg border border-indigo-100 hover:shadow-2xl transition-shadow duration-300 p-7 flex flex-col"
          >
            <div className="flex items-center gap-3 mb-4">
              <div className="bg-gradient-to-tr from-teal-400 to-indigo-400 rounded-full w-12 h-12 flex items-center justify-center text-white text-xl font-bold shadow">
                {r.student.name[0]}
              </div>
              <div>
                <h3 className="font-semibold text-lg text-indigo-900">{r.student.name}</h3>
                <p className="text-xs text-slate-500">{r.student.email}</p>
              </div>
            </div>
            <div className="flex flex-wrap gap-4 mb-4">
              <div>
                <span className="inline-block bg-purple-100 text-purple-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                  {r.company}
                </span>
              </div>
              <div>
                <span className="inline-block bg-indigo-100 text-indigo-700 px-3 py-1 rounded-full text-xs font-semibold shadow-sm">
                  {r.position}
                </span>
              </div>
              <div>
                <span
                  className={`inline-block px-3 py-1 rounded-full text-xs font-bold shadow-sm ${
                    r.status === 'pending'
                      ? 'bg-yellow-100 text-yellow-700'
                      : r.status === 'approved'
                      ? 'bg-teal-100 text-teal-700'
                      : 'bg-red-100 text-red-700'
                  }`}
                >
                  {r.status.charAt(0).toUpperCase() + r.status.slice(1)}
                </span>
              </div>
              {r.resumeUrl && (
                <div>
                  <a
                    href={`http://localhost:5000${r.resumeUrl}`}
                    className="inline-flex items-center gap-1 text-teal-600 hover:text-teal-800 underline text-xs font-medium"
                    target="_blank"
                    rel="noopener noreferrer"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" d="M12 4v16m8-8H4" />
                    </svg>
                    View Resume
                  </a>
                </div>
              )}
            </div>
            {r.status === 'pending' && (
              <form
                onSubmit={e => {
                  e.preventDefault();
                  const formData = new FormData(e.target);
                  respond(r._id, formData.get('status'), formData.get('feedback'));
                }}
                className="mt-2 space-y-3"
              >
                <select
                  name="status"
                  required
                  className="border border-teal-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 rounded-lg w-full px-3 py-2 text-indigo-900 bg-white transition"
                >
                  <option value="">Select action</option>
                  <option value="approved">Approve</option>
                  <option value="rejected">Reject</option>
                </select>
                <textarea
                  name="feedback"
                  placeholder="Feedback (optional)"
                  className="border border-teal-200 focus:border-teal-400 focus:ring-2 focus:ring-teal-100 rounded-lg w-full px-3 py-2 text-indigo-900 bg-white resize-none transition"
                  rows={3}
                />
                <button
                  type="submit"
                  className="w-full bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md py-2 hover:from-teal-600 hover:to-indigo-600 transition"
                >
                  Submit Response
                </button>
              </form>
            )}
            {r.status !== 'pending' && (
              <div className="mt-4">
                <div className="text-xs text-indigo-400">Feedback:</div>
                <div className="text-indigo-900 bg-white border border-indigo-50 rounded p-2 mt-1 text-sm min-h-[32px]">
                  {r.feedback ? r.feedback : <span className="italic text-indigo-300">No feedback provided.</span>}
                </div>
              </div>
            )}
            <div className="absolute top-2 right-2">
              {r.status === 'approved' && (
                <span title="Approved" className="inline-block bg-teal-100 text-teal-700 px-2 py-0.5 rounded text-xs font-bold shadow">
                  ✓
                </span>
              )}
              {r.status === 'rejected' && (
                <span title="Rejected" className="inline-block bg-red-100 text-red-700 px-2 py-0.5 rounded text-xs font-bold shadow">
                  ✗
                </span>
              )}
              {r.status === 'pending' && (
                <span title="Pending" className="inline-block bg-yellow-100 text-yellow-700 px-2 py-0.5 rounded text-xs font-bold shadow animate-pulse">
                  ...
                </span>
              )}
            </div>
          </div>
        ))}
      </div>
      {requests.length === 0 && (
        <div className="text-center text-indigo-400 mt-20 text-lg">
          No referral requests found.
        </div>
      )}
    </div>
  );
}
