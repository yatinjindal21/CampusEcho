import React from 'react';
import { FaNewspaper } from 'react-icons/fa';

export default function Home() {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-100 px-2 py-8">
      <div className="flex flex-col items-center mb-10">
        {/* News/Announcement themed icon */}
        <div className="bg-gradient-to-tr from-teal-500 to-indigo-500 rounded-full p-4 shadow-lg mb-4">
          <FaNewspaper className="w-10 h-10 text-white" />
        </div>
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 text-center">
          Campus News Portal
        </h1>
        <p className="text-gray-500 text-base md:text-lg text-center max-w-lg mb-4">
          Your one-stop hub for <span className="font-semibold text-gray-800">academic news</span>, <span className="font-semibold text-gray-800">placement updates</span>, <span className="font-semibold text-gray-800">society events</span>, and <span className="font-semibold text-gray-800">alumni referrals</span>.
        </p>
        {/* Visual Animated SVGs Section */}
        {/* Animated SVG Row - More beautiful, animated, and with subtle effects */}
        <div className="flex flex-row gap-10 mt-6 items-center justify-center">
          {/* Student SVG */}
          <div className="relative group">
            <svg className="w-20 h-20 animate-bounce drop-shadow-xl transition-transform duration-300 group-hover:scale-110" viewBox="0 0 64 64" fill="none">
              {/* Glow effect */}
              <ellipse cx="32" cy="60" rx="14" ry="4" fill="#38bdf8" fillOpacity="0.15" />
              {/* Head */}
              <circle cx="32" cy="22" r="12" fill="url(#studentHead)" />
              {/* Body */}
              <rect x="18" y="34" width="28" height="18" rx="9" fill="url(#studentBody)" />
              {/* Graduation Cap */}
              <polygon points="32,10 44,16 32,22 20,16" fill="#0ea5e9" className="animate-[wiggle_1.5s_ease-in-out_infinite]" />
              <rect x="30" y="22" width="4" height="8" rx="2" fill="#0ea5e9" />
              <defs>
                <radialGradient id="studentHead" cx="0.5" cy="0.5" r="0.7">
                  <stop offset="0%" stopColor="#bae6fd" />
                  <stop offset="100%" stopColor="#38bdf8" />
                </radialGradient>
                <linearGradient id="studentBody" x1="18" y1="34" x2="46" y2="52" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#818cf8" />
                  <stop offset="1" stopColor="#6366f1" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-indigo-400 font-semibold opacity-80">Student</span>
          </div>
          {/* Book SVG */}
          <div className="relative group">
            <svg className="w-20 h-20 animate-pulse drop-shadow-xl transition-transform duration-300 group-hover:scale-110" viewBox="0 0 64 64" fill="none">
              {/* Glow */}
              <ellipse cx="32" cy="60" rx="14" ry="4" fill="#fbbf24" fillOpacity="0.12" />
              {/* Book cover */}
              <rect x="10" y="18" width="44" height="30" rx="6" fill="url(#bookCover)" />
              {/* Book pages */}
              <rect x="18" y="28" width="28" height="4" rx="2" fill="#fef3c7" className="animate-[flash_2s_ease-in-out_infinite]" />
              <rect x="18" y="36" width="20" height="4" rx="2" fill="#fef3c7" />
              {/* Bookmark */}
              <rect x="38" y="18" width="4" height="14" rx="2" fill="#fbbf24" className="animate-bounce" />
              <defs>
                <linearGradient id="bookCover" x1="10" y1="18" x2="54" y2="48" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#fbbf24" />
                  <stop offset="1" stopColor="#fde68a" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-yellow-500 font-semibold opacity-80">Book</span>
          </div>
          {/* News SVG */}
          <div className="relative group">
            <svg className="w-20 h-20 animate-spin-slow drop-shadow-xl transition-transform duration-300 group-hover:scale-110" viewBox="0 0 64 64" fill="none">
              {/* Glow */}
              <ellipse cx="32" cy="60" rx="14" ry="4" fill="#6366f1" fillOpacity="0.12" />
              {/* Newspaper */}
              <rect x="12" y="16" width="40" height="32" rx="6" fill="url(#newsPaper)" />
              {/* Headline */}
              <rect x="20" y="24" width="24" height="5" rx="2.5" fill="#a5b4fc" className="animate-[flash_2s_ease-in-out_infinite]" />
              {/* Subheadline */}
              <rect x="20" y="32" width="16" height="4" rx="2" fill="#c7d2fe" />
              {/* Body lines */}
              <rect x="20" y="40" width="20" height="3" rx="1.5" fill="#e0e7ff" />
              <defs>
                <linearGradient id="newsPaper" x1="12" y1="16" x2="52" y2="48" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#6366f1" />
                  <stop offset="1" stopColor="#a5b4fc" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-indigo-500 font-semibold opacity-80">News</span>
          </div>
          {/* Celebration SVG */}
          <div className="relative group">
            <svg className="w-20 h-20 animate-[wiggle_2s_ease-in-out_infinite] drop-shadow-xl transition-transform duration-300 group-hover:scale-110" viewBox="0 0 64 64" fill="none">
              {/* Glow */}
              <ellipse cx="32" cy="60" rx="14" ry="4" fill="#f472b6" fillOpacity="0.13" />
              {/* Main circle */}
              <circle cx="32" cy="32" r="16" fill="url(#celebrationMain)" />
              {/* Star burst */}
              <g className="animate-[spin_6s_linear_infinite] origin-center">
                <circle cx="32" cy="10" r="3" fill="#fbbf24" />
                <circle cx="54" cy="32" r="3" fill="#fbbf24" />
                <circle cx="32" cy="54" r="3" fill="#fbbf24" />
                <circle cx="10" cy="32" r="3" fill="#fbbf24" />
              </g>
              {/* Ribbon */}
              <path d="M32 16 L38 32 L32 48 L26 32 Z" fill="url(#celebrationRibbon)" className="animate-bounce" />
              <defs>
                <radialGradient id="celebrationMain" cx="0.5" cy="0.5" r="0.7">
                  <stop offset="0%" stopColor="#f9a8d4" />
                  <stop offset="100%" stopColor="#f472b6" />
                </radialGradient>
                <linearGradient id="celebrationRibbon" x1="26" y1="32" x2="38" y2="48" gradientUnits="userSpaceOnUse">
                  <stop stopColor="#f9a8d4" />
                  <stop offset="1" stopColor="#f472b6" />
                </linearGradient>
              </defs>
            </svg>
            <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-pink-400 font-semibold opacity-80">Celebrate</span>
          </div>
        </div>
      </div>

      {/* Features Section */}
      <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-3 gap-6 mb-12">
        <div className="bg-gradient-to-br from-white via-indigo-50 to-purple-50 rounded-2xl shadow-lg border border-indigo-100 p-6 flex flex-col items-center hover:shadow-2xl transition">
          <svg className="w-10 h-10 text-indigo-300 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <rect x="6" y="8" width="7" height="2" rx="1" fill="#c7d2fe"/>
            <rect x="6" y="12" width="10" height="2" rx="1" fill="#a5b4fc"/>
            <rect x="6" y="16" width="5" height="2" rx="1" fill="#a5b4fc"/>
            <rect x="15" y="8" width="3" height="10" rx="1" fill="#818cf8"/>
          </svg>
          <h3 className="text-lg font-bold text-indigo-900 mb-2 text-center">Academic & Placement News</h3>
          <p className="text-gray-600 text-sm text-center">Get the latest updates on academics, exams, and placement opportunities, all curated for you.</p>
        </div>
        <div className="bg-gradient-to-br from-white via-indigo-50 to-purple-50 rounded-2xl shadow-lg border border-indigo-100 p-6 flex flex-col items-center hover:shadow-2xl transition">
          <svg className="w-10 h-10 text-indigo-300 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <circle cx="12" cy="12" r="10" stroke="#c7d2fe" strokeWidth="2"/>
            <path d="M8 15l4-4 4 4" stroke="#a5b4fc" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
          </svg>
          <h3 className="text-lg font-bold text-indigo-900 mb-2 text-center">Society Events</h3>
          <p className="text-gray-600 text-sm text-center">Never miss out on society activities, workshops, and campus events. Stay involved and engaged!</p>
        </div>
        <div className="bg-gradient-to-br from-white via-indigo-50 to-purple-50 rounded-2xl shadow-lg border border-indigo-100 p-6 flex flex-col items-center hover:shadow-2xl transition">
          <svg className="w-10 h-10 text-indigo-300 mb-3" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <path d="M12 12c2.21 0 4-1.79 4-4s-1.79-4-4-4-4 1.79-4 4 1.79 4 4 4zm0 2c-2.67 0-8 1.34-8 4v2h16v-2c0-2.66-5.33-4-8-4z" fill="#6ee7b7"/>
          </svg>
          <h3 className="text-lg font-bold text-indigo-900 mb-2 text-center">Alumni Referrals</h3>
          <p className="text-gray-600 text-sm text-center">Connect with alumni for guidance and referrals. Build your network and unlock new opportunities.</p>
        </div>
      </div>

      {/* Call to Action */}
      <div className="w-full max-w-2xl bg-gradient-to-br from-white via-indigo-50 to-purple-50 rounded-2xl shadow-lg border border-indigo-100 p-8 flex flex-col items-center">
        <p className="text-lg font-medium mb-2 text-indigo-800 text-center">
          <span className="font-bold">Join</span> our community of students, faculty, and alumni.
        </p>
        <p className="text-gray-700 text-center">
          Our platform is built for students, faculty, and alumni to stay connected and never miss important updates. Join us and experience a smarter way to stay in sync with your campus.
        </p>
      </div>
    </div>
  );
}
