import React, { useState } from 'react';
import api from '../services/api';

export default function PostAcademicNews() {
  const [form, setForm] = useState({ title: '', content: '', tags: '', deadline: '' });
  const [files, setFiles] = useState([]);

  const handleChange = e => {
    const { name, value } = e.target;
    setForm(prev => ({ ...prev, [name]: value }));
  };

  const handleFile = (e) => {
    const selectedFiles = Array.from(e.target.files);
    setFiles(prev => {
      const all = [...prev, ...selectedFiles];
      const uniqueByName = Array.from(new Map(all.map(f => [f.name, f])).values());
      return uniqueByName;
    });
  };

  const removeFile = (index) => {
    setFiles(prev => prev.filter((_, i) => i !== index));
  };

  const submit = async e => {
    e.preventDefault();
    const data = new FormData();
    data.append('title', form.title);
    data.append('content', form.content);
    data.append('category', 'academic');
    data.append('tags', form.tags);
    if (form.deadline) data.append('deadline', form.deadline);

    files.forEach(f => data.append('files', f));

    try {
      await api.post('/news', data, {
        headers: { 'Content-Type': 'multipart/form-data' }
      });
      alert('News submitted!');
      setForm({ title: '', content: '', tags: '', deadline: '' });
      setFiles([]);
    } catch (err) {
      alert('Error submitting news');
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
          <h1 className="text-4xl font-bold text-gray-800 mb-2">Post Academic News</h1>
          <p className="text-gray-500 text-base text-center max-w-lg">Share important academic updates with the community.</p>
        </div>
        <form onSubmit={submit} className="space-y-8">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div>
              <label htmlFor="title" className="block text-sm font-medium text-gray-700 mb-1">
                Title
              </label>
              <input
                id="title"
                name="title"
                value={form.title}
                onChange={handleChange}
                placeholder="Enter a concise title"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition bg-white text-gray-800"
                required
              />
            </div>
            <div>
              <label htmlFor="tags" className="block text-sm font-medium text-gray-700 mb-1">
                Tags
              </label>
              <input
                id="tags"
                name="tags"
                value={form.tags}
                onChange={handleChange}
                placeholder="e.g. exam, notice, event"
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition bg-white text-gray-800"
              />
            </div>
            <div>
              <label htmlFor="deadline" className="block text-sm font-medium text-gray-700 mb-1">
                Deadline
              </label>
              <input
                id="deadline"
                name="deadline"
                type="date"
                value={form.deadline}
                onChange={handleChange}
                className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition bg-white text-gray-800"
              />
            </div>
            <div>
              <label htmlFor="file" className="block text-sm font-medium text-gray-700 mb-1">
                Attachments
              </label>
              <label className="inline-block bg-teal-600 text-white text-xs px-4 py-2 rounded-lg cursor-pointer hover:bg-teal-700 transition mb-2">
                <span>Select Files</span>
                <input
                  type="file"
                  multiple
                  accept=".pdf,.docx,.png,.jpg"
                  onChange={handleFile}
                  className="hidden"
                />
              </label>
              {files.length > 0 && (
                <ul className="text-xs text-gray-700 space-y-1 mt-1 max-h-24 overflow-y-auto">
                  {files.map((file, idx) => (
                    <li key={idx} className="flex justify-between items-center bg-gray-50 border border-gray-200 p-2 rounded-md">
                      <span className="truncate max-w-xs">{file.name}</span>
                      <button
                        type="button"
                        onClick={() => removeFile(idx)}
                        className="text-red-500 hover:text-red-700 ml-3"
                        title="Remove file"
                      >
                        <span className="text-base">🗑</span>
                      </button>
                    </li>
                  ))}
                </ul>
              )}
            </div>
          </div>
          <div>
            <label htmlFor="content" className="block text-sm font-medium text-gray-700 mb-1">
              Content
            </label>
            <textarea
              id="content"
              name="content"
              value={form.content}
              onChange={handleChange}
              placeholder="Write the news content here..."
              className="w-full px-4 py-2 border border-gray-200 rounded-lg focus:outline-none focus:ring-2 focus:ring-teal-500 transition bg-white text-gray-800 h-40 resize-none"
              required
            />
          </div>
          <button
            type="submit"
            className="w-full py-3 bg-gradient-to-r from-teal-500 to-indigo-500 text-white text-lg font-semibold rounded-lg shadow-md hover:from-teal-600 hover:to-indigo-600 transition"
          >
            Submit
          </button>
        </form>
      </div>
    </div>
  );
}
