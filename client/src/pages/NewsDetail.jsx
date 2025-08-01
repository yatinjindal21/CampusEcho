import React, { useEffect, useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import api from '../services/api';

export default function NewsDetail() {
  const { id } = useParams();
  const navigate = useNavigate();
  const [news, setNews] = useState(null);

  useEffect(() => {
    api.get(`/news/${id}`)
      .then(res => setNews(res.data))
      .catch(err => {
        console.error(err);
        alert('Failed to load news.');
        navigate('/dashboard');
      });
  }, [id, navigate]);

  if (!news) return <div className="p-8">Loading...</div>;

  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-100 px-2 py-8">
      <div className="flex flex-col items-center mb-10">
        {/* News/Announcement themed icon */}
        <div className="bg-gradient-to-tr from-teal-500 to-indigo-500 rounded-full p-4 shadow-lg mb-4">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="1" viewBox="0 0 24 24">
            {/* Newspaper icon */}
            <rect x="6" y="8" width="7" height="2" rx="1" fill="#fff"/>
            <rect x="6" y="12" width="10" height="2" rx="1" fill="#c7d2fe"/>
            <rect x="6" y="16" width="5" height="2" rx="1" fill="#c7d2fe"/>
            <rect x="15" y="8" width="3" height="10" rx="1" fill="#a5b4fc"/>
          </svg>
        </div>
        <h1 className="text-4xl font-bold text-gray-800 mb-2">{news.title}</h1>
        <div className="text-gray-500 text-base text-center max-w-lg mb-2">
          Posted by: <span className="font-semibold">{news.author?.name}</span>
        </div>
        <div className="text-sm text-indigo-400 mb-2">
          {new Date(news.createdAt).toLocaleDateString()}
        </div>
        {news.deadline && (
          <div className="bg-yellow-100 border-l-4 border-yellow-500 text-yellow-800 p-3 rounded mb-2">
            <strong>Deadline:</strong> {new Date(news.deadline).toLocaleDateString()}
          </div>
        )}
      </div>
      <div className="w-full max-w-4xl bg-white rounded-2xl shadow-lg border border-indigo-100 p-8 flex flex-col space-y-6">
        <div className="whitespace-pre-wrap text-gray-800 text-lg leading-relaxed mb-2">
          {news.content}
        </div>
        {news.tags?.length > 0 && (
          <div className="flex flex-wrap gap-2 mb-2">
            {news.tags.map((tag, i) => (
              <span key={i} className="inline-block bg-gray-200 text-sm text-gray-700 px-2 py-1 rounded">
                #{tag}
              </span>
            ))}
          </div>
        )}
        {news.fileUrls?.length > 0 && (
          <div>
            <h3 className="text-lg font-semibold mb-2">Attachments:</h3>
            <ul className="list-disc pl-5 space-y-1 text-blue-600 text-sm">
              {news.fileUrls.map((file, i) => (
                <li key={i}>
                  <a href={`http://localhost:5000${file}`} target="_blank" rel="noreferrer" className="underline">
                    View File {i + 1}
                  </a>
                </li>
              ))}
            </ul>
          </div>
        )}
        <button
          onClick={() => navigate(-1)}
          className="mt-6 self-start px-4 py-2 bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-semibold rounded-lg shadow-md hover:from-teal-600 hover:to-indigo-600 transition"
        >
          ← Back
        </button>
      </div>
    </div>
  );
}
