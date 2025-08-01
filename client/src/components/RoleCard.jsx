import React from 'react';
export default function RoleCard({ title, icon, onClick }) {
  return (
    <div onClick={onClick} className="cursor-pointer bg-white rounded-lg shadow-lg p-6 text-center hover:shadow-xl transition">
      <div className="text-4xl mb-4">{icon}</div>
      <div className="text-lg font-semibold">{title}</div>
    </div>
  );
}