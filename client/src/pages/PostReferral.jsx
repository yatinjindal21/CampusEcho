import React, { useState } from 'react';
import api from '../services/api';

export default function PostReferral() {
  const [form, setForm] = useState({
    company: '',
    position: '',
    description: '',
    link: '',
    deadline: ''
  });

  const handle = e => setForm({ ...form, [e.target.name]: e.target.value });

  const submit = async e => {
    e.preventDefault();
    try {
      await api.post('/referral', form);
      alert('Referral Posted!');
      setForm({ company: '', position: '', description: '', link: '', deadline: '' });
    } catch (err) {
      console.error(err);
      alert('Error posting referral');
    }
  };

  return (
    <div className="max-w-lg mx-auto p-8 bg-white rounded shadow">
      <h2 className="text-2xl mb-4 font-semibold">Post Referral</h2>
      <form onSubmit={submit} className="space-y-4">
        <input
          name="company"
          placeholder="Company Name"
          value={form.company}
          onChange={handle}
          className="w-full p-2 border rounded"
          required
        />
        <input
          name="position"
          placeholder="Position Title"
          value={form.position}
          onChange={handle}
          className="w-full p-2 border rounded"
          required
        />
        <textarea
          name="description"
          placeholder="Job Description"
          value={form.description}
          onChange={handle}
          className="w-full p-2 border rounded h-24"
          required
        />
        <input
          name="link"
          type="url"
          placeholder="Application Link"
          value={form.link}
          onChange={handle}
          className="w-full p-2 border rounded"
        />
        <input
          name="deadline"
          type="date"
          value={form.deadline}
          onChange={handle}
          className="w-full p-2 border rounded"
        />
        <button
          type="submit"
          className="w-full bg-green-600 text-white py-2 rounded hover:bg-green-700 transition"
        >
          Submit Referral
        </button>
      </form>
    </div>
  );
}