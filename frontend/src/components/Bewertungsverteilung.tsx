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
                fill="#4a90e2"
                radius={[4, 4, 4, 4]}
              />
            </BarChart>
          </ResponsiveContainer>
        </div>

        {/* Statistik-Karten */}
        <div className="grid grid-cols-2 gap-4 pt-2">
          <div className="bg-blue-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-500">Durchschnitt</div>
            <div className="text-2xl font-semibold text-blue-600 mt-1 flex items-center">
              {(data.reduce((sum, item) => sum + (parseInt(item.sterne) * item.anzahl), 0) / 
                data.reduce((sum, item) => sum + item.anzahl, 0)).toFixed(1)} ⭐
            </div>
          </div>
          <div className="bg-green-50 rounded-lg p-4">
            <div className="text-sm font-medium text-gray-500">5-Sterne Quote</div>
            <div className="text-2xl font-semibold text-green-600 mt-1 flex items-center">
              {Math.round((data[0].anzahl / data.reduce((sum, item) => sum + item.anzahl, 0)) * 100)}%
            </div>
          </div>
        </div>
      </div>
    </div>
  );
} 