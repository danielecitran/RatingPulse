'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, Tooltip, Legend, ResponsiveContainer } from 'recharts';

const data = [
  { name: '1 Stern', anzahl: 5 },
  { name: '2 Sterne', anzahl: 10 },
  { name: '3 Sterne', anzahl: 20 },
  { name: '4 Sterne', anzahl: 30 },
  { name: '5 Sterne', anzahl: 35 },
];

const Bewertungsverteilung = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-4">Bewertungsverteilung</h2>
      <div className="w-full h-[300px]">
        <ResponsiveContainer width="100%" height="100%">
          <BarChart data={data}>
            <CartesianGrid strokeDasharray="3 3" />
            <XAxis dataKey="name" />
            <YAxis />
            <Tooltip />
            <Legend />
            <Bar dataKey="anzahl" fill="#82ca9d" />
          </BarChart>
        </ResponsiveContainer>
      </div>
    </div>
  );
};

export default Bewertungsverteilung; 