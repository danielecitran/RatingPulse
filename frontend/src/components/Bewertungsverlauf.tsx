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

const Bewertungsverlauf = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Bewertungsverlauf</h2>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <LineChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Line type="monotone" dataKey="bewertung" stroke="#8884d8" />
          </LineChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Bewertungsverlauf; 