import React from 'react';
import { useNavigate } from 'react-router-dom';
import { FaBook, FaBriefcase, FaUsers, FaUserGraduate } from 'react-icons/fa';
import { useContext } from 'react';
import { AuthContext } from '../context/AuthContext';


export default function Dashboard() {
  const nav = useNavigate();
  const items = [
    { title: 'Academics', icon: <FaBook />, to: '/news/academic' },
    { title: 'Placements', icon: <FaBriefcase />, to: '/news/placement' },
    { title: 'Societies', icon: <FaUsers />, to: '/news/society' },
    { title: 'Alumni', icon: <FaUserGraduate />, to: '/news/alumni' },
  ];
  const { user } = useContext(AuthContext);
  return (
    <div className="min-h-screen flex flex-col items-center justify-center bg-gradient-to-br from-indigo-50 via-white to-purple-100 px-2 py-8 overflow-x-hidden">
      {/* Animated Icon Row */}
      <div className="flex flex-col items-center mb-10">
        <div className="flex flex-row gap-10 mt-2 items-center justify-center">
          {/* Academics */}
          <div className="relative group">
            <div className="animate-bounce">
              <FaBook className="w-14 h-14 text-indigo-400 drop-shadow-xl group-hover:scale-110 transition-transform duration-300" />
            </div>
            {/* <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-indigo-400 font-semibold opacity-80">Academics</span> */}
          </div>
          {/* Placements */}
          <div className="relative group">
            <div className="animate-pulse">
              <FaBriefcase className="w-14 h-14 text-green-400 drop-shadow-xl group-hover:scale-110 transition-transform duration-300" />
            </div>
            {/* <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-green-500 font-semibold opacity-80">Placements</span> */}
          </div>
          {/* Societies */}
          <div className="relative group">
            <div className="animate-spin-slow">
              <FaUsers className="w-14 h-14 text-purple-400 drop-shadow-xl group-hover:scale-110 transition-transform duration-300" />
            </div>
            {/* <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-purple-500 font-semibold opacity-80">Societies</span> */}
          </div>
          {/* Alumni */}
          <div className="relative group">
            <div className="animate-bounce">
              <FaUserGraduate className="w-14 h-14 text-pink-400 drop-shadow-xl group-hover:scale-110 transition-transform duration-300" />
            </div>
            {/* <span className="absolute -bottom-6 left-1/2 -translate-x-1/2 text-xs text-pink-500 font-semibold opacity-80">Alumni</span> */}
          </div>
        </div>
        {/* Dashboard Title & Welcome */}
        {/* <div className="bg-gradient-to-tr from-teal-500 to-indigo-500 rounded-full p-4 shadow-lg mb-4 mt-12 animate-fade-in">
          <svg className="w-10 h-10 text-white" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" d="M12 6v6m0 0v6m0-6h6m-6 0H6" />
          </svg>
        </div> */}
        <h1 className="text-4xl md:text-5xl font-bold text-gray-800 mb-2 text-center animate-fade-in mt-7">
          Dashboard
        </h1>
        <p className="text-gray-600 text-base md:text-lg text-center max-w-lg mb-2 animate-fade-in">
          Welcome to your dashboard. Access news, post updates, and manage your activities.
        </p>
        {user?.role === 'society_head' && (
          <div className="mt-3 text-indigo-600 text-lg font-medium animate-fade-in">
            Society: <span className="font-semibold">{user.society}</span>
          </div>
        )}
        {user?.role === 'alumni' && user?.company && (
          <div className="mt-3 text-indigo-600 text-lg font-medium animate-fade-in">
            Company: <span className="font-semibold">{user.company}</span>
          </div>
        )}
      </div>

      {/* Main Dashboard Cards */}
      <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-8 mb-8 w-full max-w-5xl animate-fade-in-up">
        {items.map((i, idx) => (
          <div
            key={i.title}
            onClick={() => nav(i.to)}
            className="relative bg-white rounded-2xl shadow-lg border border-indigo-100 hover:shadow-2xl transition-shadow duration-300 p-7 flex flex-col items-center cursor-pointer group transform hover:-translate-y-2 hover:scale-105 transition-transform duration-300"
            style={{ animation: `fadeInUp 0.5s ease ${(idx + 1) * 0.08}s both` }}
          >
            <div className="bg-gradient-to-tr from-indigo-400 to-purple-400 rounded-full w-14 h-14 flex items-center justify-center text-white text-3xl mb-4 shadow group-hover:from-purple-500 group-hover:to-indigo-500 transition-all duration-300 animate-wiggle">
              {i.icon}
            </div>
            <div className="text-xl font-semibold text-indigo-900 mb-1">{i.title}</div>
            {/* Optionally, you can add a short description here */}
          </div>
        ))}
      </div>

      {/* Admin Actions */}
      {user?.role === 'admin' && (
        <div className="w-full max-w-4xl space-y-4 mb-8 animate-fade-in-up">
          <div
            onClick={() => nav('/admin-panel')}
            className="relative bg-yellow-100 text-yellow-800 rounded-2xl shadow-lg border border-yellow-200 hover:shadow-2xl transition-shadow duration-300 p-7 flex flex-col cursor-pointer mb-2 transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-6 h-6 text-yellow-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="6" y="8" width="7" height="2" rx="1" fill="#fde68a"/>
                <rect x="6" y="12" width="10" height="2" rx="1" fill="#fde68a"/>
                <rect x="6" y="16" width="5" height="2" rx="1" fill="#fde68a"/>
                <rect x="15" y="8" width="3" height="10" rx="1" fill="#fbbf24"/>
              </svg>
              <span className="text-xl font-bold">Admin Panel</span>
            </div>
            <div className="text-sm">Create Society Heads & Alumni</div>
          </div>
          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            <div
              onClick={() => nav('/post-news-academic')}
              className="relative bg-blue-100 text-blue-800 rounded-2xl shadow-lg border border-blue-200 hover:shadow-2xl transition-shadow duration-300 p-7 flex flex-col cursor-pointer transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center gap-2 mb-1">
                <FaBook className="w-6 h-6 text-blue-400" />
                <span className="text-xl font-bold">Post Academic News</span>
              </div>
              <div className="text-sm">Only Admin can post</div>
            </div>
            <div
              onClick={() => nav('/post-news-placement')}
              className="relative bg-green-100 text-green-800 rounded-2xl shadow-lg border border-green-200 hover:shadow-2xl transition-shadow duration-300 p-7 flex flex-col cursor-pointer transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300"
            >
              <div className="flex items-center gap-2 mb-1">
                <FaBriefcase className="w-6 h-6 text-green-400" />
                <span className="text-xl font-bold">Post Placement News</span>
              </div>
              <div className="text-sm">Only Admin can post</div>
            </div>
          </div>
        </div>
      )}

      {/* Society Head Actions */}
      {user?.role === 'society_head' && (
        <div className="w-full max-w-4xl mb-8 animate-fade-in-up">
          <div
            onClick={() => nav('/post-society-news')}
            className="relative bg-yellow-100 text-yellow-800 rounded-2xl shadow-lg border border-yellow-200 hover:shadow-2xl transition-shadow duration-300 p-7 flex flex-col cursor-pointer transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center gap-2 mb-1">
              <FaUsers className="w-6 h-6 text-yellow-400" />
              <span className="text-xl font-bold">Post Society News</span>
            </div>
            <div className="text-sm">Only for your society</div>
          </div>
        </div>
      )}

      {/* Alumni Actions */}
      {user?.role === 'alumni' && (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 animate-fade-in-up">
          <div
            onClick={() => nav('/post-alumni-news')}
            className="relative bg-pink-100 text-pink-800 rounded-2xl shadow-lg border border-pink-200 hover:shadow-2xl transition-shadow duration-300 p-7 flex flex-col cursor-pointer transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center gap-2 mb-1">
              <FaUserGraduate className="w-6 h-6 text-pink-400" />
              <span className="text-xl font-bold">Post Alumni News</span>
            </div>
            <div className="text-sm">Reach your community</div>
          </div>
          <div
            onClick={() => nav('/my-referrals')}
            className="relative bg-emerald-100 text-emerald-800 rounded-2xl shadow-lg border border-emerald-200 hover:shadow-2xl transition-shadow duration-300 p-7 flex flex-col cursor-pointer transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-6 h-6 text-emerald-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="6" y="8" width="7" height="2" rx="1" fill="#6ee7b7"/>
                <rect x="6" y="12" width="10" height="2" rx="1" fill="#6ee7b7"/>
                <rect x="6" y="16" width="5" height="2" rx="1" fill="#6ee7b7"/>
                <rect x="15" y="8" width="3" height="10" rx="1" fill="#34d399"/>
              </svg>
              <span className="text-xl font-bold">My Referral Requests</span>
            </div>
            <div className="text-sm">Respond to students</div>
          </div>
        </div>
      )}

      {/* Student Actions */}
      {user?.role === 'student' && (
        <div className="w-full max-w-4xl grid grid-cols-1 md:grid-cols-2 gap-4 mb-8 animate-fade-in-up">
          <div
            onClick={() => nav('/search-alumni')}
            className="relative bg-blue-100 text-blue-800 rounded-2xl shadow-lg border border-blue-200 hover:shadow-2xl transition-shadow duration-300 p-7 flex flex-col cursor-pointer transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center gap-2 mb-1">
              <FaUserGraduate className="w-6 h-6 text-blue-400" />
              <span className="text-xl font-bold">Search for Referral</span>
            </div>
            <div className="text-sm">Connect with alumni</div>
          </div>
          <div
            onClick={() => nav('/referral-status')}
            className="relative bg-indigo-100 text-indigo-800 rounded-2xl shadow-lg border border-indigo-200 hover:shadow-2xl transition-shadow duration-300 p-7 flex flex-col cursor-pointer transform hover:-translate-y-1 hover:scale-105 transition-transform duration-300"
          >
            <div className="flex items-center gap-2 mb-1">
              <svg className="w-6 h-6 text-indigo-400" fill="none" stroke="currentColor" strokeWidth="2" viewBox="0 0 24 24">
                <rect x="6" y="8" width="7" height="2" rx="1" fill="#818cf8"/>
                <rect x="6" y="12" width="10" height="2" rx="1" fill="#818cf8"/>
                <rect x="6" y="16" width="5" height="2" rx="1" fill="#818cf8"/>
                <rect x="15" y="8" width="3" height="10" rx="1" fill="#6366f1"/>
              </svg>
              <span className="text-xl font-bold">My Referral Status</span>
            </div>
            <div className="text-sm">Track your referral requests</div>
          </div>
        </div>
      )}

      {/* Animations keyframes (for fade-in, fade-in-up, wiggle, spin-slow) */}
      <style>
        {`
          @keyframes fadeInUp {
            from { opacity: 0; transform: translateY(30px);}
            to { opacity: 1; transform: translateY(0);}
          }
          .animate-fade-in-up {
            animation: fadeInUp 0.7s cubic-bezier(.4,0,.2,1) both;
          }
          @keyframes fadeIn {
            from { opacity: 0;}
            to { opacity: 1;}
          }
          .animate-fade-in {
            animation: fadeIn 1s cubic-bezier(.4,0,.2,1) both;
          }
          @keyframes wiggle {
            0%, 100% { transform: rotate(-3deg);}
            50% { transform: rotate(3deg);}
          }
          .animate-wiggle {
            animation: wiggle 1.5s ease-in-out infinite;
          }
          @keyframes spin-slow {
            0% { transform: rotate(0deg);}
            100% { transform: rotate(360deg);}
          }
          .animate-spin-slow {
            animation: spin-slow 8s linear infinite;
          }
        `}
      </style>
    </div>
  );
}