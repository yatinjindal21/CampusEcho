import { Link } from 'react-router-dom';

export default function NewsCard({ news }) {
  const soon = new Date(news.deadline) - new Date() < 2 * 24 * 60 * 60 * 1000;

  return (
    <Link to={`/news-detail/${news._id}`} className="block group">
      <div className="relative p-7 space-y-4 bg-white/100 rounded-2xl shadow-lg border border-indigo-100 hover:shadow-2xl transition-shadow duration-300 cursor-pointer h-full flex flex-col">
        {/* Icon */}
        <div className="absolute top-5 right-5">
          <svg className="w-8 h-8 text-indigo-200 group-hover:text-indigo-300 transition" fill="none" stroke="currentColor" strokeWidth="1.5" viewBox="0 0 24 24">
            <rect x="6" y="8" width="7" height="2" rx="1" fill="#c7d2fe"/>
            <rect x="6" y="12" width="10" height="2" rx="1" fill="#a5b4fc"/>
            <rect x="6" y="16" width="5" height="2" rx="1" fill="#a5b4fc"/>
            <rect x="15" y="8" width="3" height="10" rx="1" fill="#818cf8"/>
          </svg>
        </div>
        {/* Title */}
        <h2 className="text-2xl font-bold text-indigo-900 group-hover:text-indigo-700 transition line-clamp-2">{news.title}</h2>
        {/* Author & Date */}
        <div className="flex items-center gap-2 text-sm text-indigo-400">
          <span>By <span className="font-semibold text-indigo-600">{news.author?.name}</span></span>
          <span>•</span>
          <span>{new Date(news.createdAt).toLocaleDateString()}</span>
        </div>
        {/* Content Preview */}
        <p className="text-gray-700 text-base whitespace-pre-line line-clamp-3">
          {news.content.length > 120 ? news.content.slice(0, 120) + '...' : news.content}
        </p>
        {/* Tags */}
        {news.tags && news.tags.length > 0 && (
          <div className="flex flex-wrap gap-2 mt-1">
            {news.tags.map((tag, idx) => (
              <span
                key={idx}
                className="inline-block bg-gray-200 text-gray-700 text-xs font-medium px-2 py-0.5 rounded"
              >
                #{tag}
              </span>
            ))}
          </div>
        )}
        {/* Deadline */}
        {news.deadline && (
          <div className="mt-1">
            <span className={`inline-block px-3 py-1 rounded-full text-xs font-semibold ${
              soon
                ? 'bg-yellow-100 text-yellow-800 border border-yellow-200'
                : 'bg-emerald-100 text-emerald-800 border border-emerald-200'
            }`}>
              Deadline: {new Date(news.deadline).toLocaleDateString()}
            </span>
          </div>
        )}
        {/* View Details Button */}
        <div className="mt-5 flex justify-end">
          <span className="inline-block px-5 py-1.5 bg-gradient-to-r from-teal-500 to-indigo-500 text-white font-semibold rounded-lg shadow hover:from-teal-600 hover:to-indigo-600 transition text-sm">
            View Details →
          </span>
        </div>
      </div>
    </Link>
  );
}
