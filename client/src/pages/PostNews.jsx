import React, { useState } from 'react';
import api from '../services/api';

export default function PostNews() {
  const [form, setForm] = useState({ title: '', content: '', category: 'academic', tags: '', deadline: '' });
  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });
  const submit = async e => { e.preventDefault(); await api.post('/news', { ...form, tags: form.tags.split(',') }); alert('Posted!'); };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded shadow">
      <h2 className="text-2xl mb-4">Post News</h2>
      <form onSubmit={submit} className="space-y-4">
        <input name="title" placeholder="Title" onChange={handle} className="w-full p-2 border rounded" required />
        <textarea name="content" placeholder="Content" onChange={handle} className="w-full p-2 border rounded" required />
        <select name="category" onChange={handle} className="w-full p-2 border rounded">
          {['academic','placement','society','alumni'].map(c => <option key={c} value={c}>{c}</option>)}
        </select>
        <input name="tags" placeholder="tags,comma,separated" onChange={handle} className="w-full p-2 border rounded" />
        <input name="deadline" type="date" onChange={handle} className="w-full p-2 border rounded" />
        <button type="submit" className="w-full bg-indigo-600 text-white py-2 rounded">Submit</button>
      </form>
    </div>
  );
}