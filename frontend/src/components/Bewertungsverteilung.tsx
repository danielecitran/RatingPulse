'use client';

import React from 'react';
import { BarChart, Bar, XAxis, YAxis, CartesianGrid, ResponsiveContainer, Tooltip } from 'recharts';

const data = [
  { sterne: '5 ⭐', anzahl: 50 },
  { sterne: '4 ⭐', anzahl: 30 },
  { sterne: '3 ⭐', anzahl: 15 },
  { sterne: '2 ⭐', anzahl: 8 },
  { sterne: '1 ⭐', anzahl: 2 },
];

export default function Bewertungsverteilung() {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 col-span-full lg:col-span-2">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Bewertungsverteilung</h2>
          <div className="text-base text-gray-600">
            Gesamt: {data.reduce((sum, item) => sum + item.anzahl, 0)} Bewertungen
          </div>
        </div>

        {/* Chart */}
        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            <BarChart
              data={data}
              layout="vertical"
              margin={{ top: 5, right: 30, left: 40, bottom: 5 }}
              barSize={40}
            >
              <defs>
                <linearGradient id="colorGradient" x1="0" y1="0" x2="1" y2="0">
                  <stop offset="0%" stopColor="#1e40af" />
                  <stop offset="50%" stopColor="#2563eb" />
                  <stop offset="100%" stopColor="#60a5fa" />
                </linearGradient>
              </defs>
              <CartesianGrid 
                strokeDasharray="0" 
                stroke="#f0f0f0" 
                horizontal={true}
                vertical={false}
              />
              <XAxis
                type="number"
                tick={{ fontSize: 12, fill: '#666' }}
                axisLine={{ stroke: '#e0e0e0' }}
                tickLine={false}
                domain={[0, 'dataMax']}
                padding={{ left: 0, right: 20 }}
              />
              <YAxis
                dataKey="sterne"
                type="category"
                tick={{ fontSize: 14, fill: '#666' }}
                axisLine={{ stroke: '#e0e0e0' }}
                tickLine={false}
                width={60}
              />
              <Tooltip
                cursor={{ fill: '#f3f4f6' }}
                contentStyle={{
                  backgroundColor: 'white',
                  border: 'none',
                  borderRadius: '12px',
                  boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                  padding: '12px'
                }}
                formatter={(value) => [`${value} Bewertungen`]}
                labelFormatter={(label) => `${label}`}
                separator=""
              />
              <Bar
                dataKey="anzahl"
                fill="url(#colorGradient)"
                radius={[4, 4, 4, 4]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Statistik-Karten */}
        <div className="grid grid-cols-2 gap-6 pt-4">
          <div className="flex flex-col bg-gray-50/80 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)]">
            <span className="text-sm font-medium text-gray-900">Durchschnitt</span>
            <div className="mt-2 flex items-center space-x-1">
              <span className="text-4xl font-bold bg-gradient-to-r from-[#1e40af] via-[#2563eb] to-[#60a5fa] inline-block text-transparent bg-clip-text">
                {(data.reduce((sum, item) => sum + (parseInt(item.sterne) * item.anzahl), 0) / 
                  data.reduce((sum, item) => sum + item.anzahl, 0)).toFixed(1)}
              </span>
              <span className="text-2xl text-gray-400">⭐</span>
            </div>
          </div>
          <div className="flex flex-col bg-gray-50/80 backdrop-blur-md border border-gray-200/50 rounded-2xl p-6 shadow-[0_8px_32px_-8px_rgba(0,0,0,0.12)]">
            <span className="text-sm font-medium text-gray-900">5-Sterne Quote</span>
            <div className="mt-2">
              <span className="text-4xl font-bold bg-gradient-to-r from-[#1e40af] via-[#2563eb] to-[#60a5fa] inline-block text-transparent bg-clip-text">
                {Math.round((data[0].anzahl / data.reduce((sum, item) => sum + item.anzahl, 0)) * 100)}%
              </span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 