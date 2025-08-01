import React, { useEffect, useState } from 'react';
import { useParams } from 'react-router-dom';
import api from '../services/api';
import NewsCard from '../components/NewsCard';

export default function NewsSection() {
  const { category } = useParams();
  const [list, setList] = useState([]);
  const [sortBy, setSortBy] = useState('newest');
  const [filterTag, setFilterTag] = useState('');

  const [searchTitle, setSearchTitle] = useState('');


  useEffect(() => {
    api.get(`/news?category=${category}`).then(res => setList(res.data));
  }, [category]);



  const sortedFilteredList = list
    .filter(news =>
      (!filterTag || news.tags?.includes(filterTag)) &&
      (!searchTitle || news.title.toLowerCase().includes(searchTitle.toLowerCase()))
    )
    .sort((a, b) => {
      if (sortBy === 'newest') return new Date(b.createdAt) - new Date(a.createdAt);
      if (sortBy === 'deadline') return new Date(a.deadline || Infinity) - new Date(b.deadline || Infinity);
      if (sortBy === 'title') return a.title.localeCompare(b.title);
      return 0;
    });


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
        <h2 className="text-4xl font-bold text-gray-800 mb-2 capitalize text-center">
          {category} News
        </h2>
        <p className="text-gray-500 text-base text-center max-w-lg mb-2">
          Browse, filter, and search for news and announcements in this category.
        </p>
      </div>

      {/* Filter & Sort Controls */}
      <div className="w-full max-w-4xl bg-gradient-to-br from-white via-indigo-50 to-purple-50 rounded-2xl shadow-lg border border-indigo-100 px-6 py-6 flex flex-col sm:flex-row flex-wrap items-stretch sm:items-center gap-4 sm:gap-6 mb-10">
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1 sm:gap-2 flex-1 min-w-[160px]">
          <label className="text-sm font-medium text-slate-700" htmlFor="sortBy">
            Sort
          </label>
          <select
            id="sortBy"
            value={sortBy}
            onChange={e => setSortBy(e.target.value)}
            className="p-2 border border-indigo-200 rounded-md focus:ring-2 focus:ring-indigo-100 bg-white text-slate-800 w-full sm:w-auto"
          >
            <option value="newest">Newest</option>
            <option value="deadline">Closest Deadline</option>
            <option value="title">A-Z</option>
          </select>
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1 sm:gap-2 flex-1 min-w-[160px]">
          <label className="text-sm font-medium text-slate-700" htmlFor="filterTag">
            Tag
          </label>
          <input
            id="filterTag"
            type="text"
            placeholder="e.g. event"
            value={filterTag}
            onChange={e => setFilterTag(e.target.value.trim())}
            className="p-2 border border-indigo-200 rounded-md focus:ring-2 focus:ring-indigo-100 bg-white text-slate-800 w-full sm:w-auto"
          />
        </div>
        <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-1 sm:gap-2 flex-1 min-w-[160px]">
          <label className="text-sm font-medium text-slate-700" htmlFor="searchTitle">
            Title
          </label>
          <input
            id="searchTitle"
            type="text"
            placeholder="Search title..."
            value={searchTitle}
            onChange={e => setSearchTitle(e.target.value)}
            className="p-2 border border-indigo-200 rounded-md focus:ring-2 focus:ring-indigo-100 bg-white text-slate-800 w-full sm:w-auto"
          />
        </div>
      </div>

      <div className="w-full max-w-6xl">
        {sortedFilteredList.length === 0 ? (
          <div className="flex flex-col items-center justify-center py-24">
            <svg className="w-16 h-16 text-slate-300 mb-4" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 48 48">
              <circle cx="24" cy="24" r="20" stroke="currentColor" strokeWidth="2" />
              <path d="M16 24h16M24 16v16" stroke="currentColor" strokeWidth="2" strokeLinecap="round" />
            </svg>
            <p className="text-lg text-slate-500 font-medium">No news matches the filter.</p>
          </div>
        ) : (
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-3 gap-8">
            {sortedFilteredList.map(n => (
              <NewsCard key={n._id} news={n} />
            ))}
          </div>
        )}
      </div>
    </div>
  );
}
