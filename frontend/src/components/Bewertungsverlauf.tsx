'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: 'Jan', bewertung: 4.5 },
  { name: 'Feb', bewertung: 4.7 },
  { name: 'Mär', bewertung: 4.6 },
  { name: 'Apr', bewertung: 4.8 },
  { name: 'Mai', bewertung: 4.9 },
  { name: 'Jun', bewertung: 4.7 },
];

const currentMonth = new Date().toLocaleString('de-DE', { month: 'short' });
const filteredData = data.filter((_, index) => index < 5).map((item, index) => ({ ...item, name: index === 3 ? currentMonth : item.name }));

const Bewertungsverlauf = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow-lg">
      <h2 className="text-2xl font-bold mb-4">Bewertungsverlauf</h2>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={filteredData}>
            <CartesianGrid strokeDasharray="0" stroke="#e0e0e0" />
            <XAxis dataKey="name" tick={{ fontSize: 12, fill: '#666' }} axisLine={{ stroke: '#e0e0e0' }} tickLine={false} />
            <YAxis domain={[0, 5]} tick={{ fontSize: 12, fill: '#666' }} axisLine={{ stroke: '#e0e0e0' }} tickLine={false} />
            <Tooltip contentStyle={{ backgroundColor: '#f5f5f5', border: 'none', borderRadius: '8px' }} itemStyle={{ color: '#333' }} />
            <Legend wrapperStyle={{ fontSize: 12, color: '#666' }} />
            <Line type="monotone" dataKey="bewertung" stroke="#4a90e2" strokeWidth={3} dot={{ r: 4, fill: '#4a90e2' }} />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Bewertungsverlauf; 