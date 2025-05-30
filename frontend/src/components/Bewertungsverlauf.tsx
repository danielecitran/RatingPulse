'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const data = [
  { name: 'Nov', Bewertung: 3.3 },
  { name: 'Jan', Bewertung: 4.5 },
  { name: 'Feb', Bewertung: 4.7 },
  { name: 'Mär', Bewertung: 4.6 },
  { name: 'Apr', Bewertung: 4.8 },
  { name: 'Mai', Bewertung: 4.9 },
  { name: 'Jun', Bewertung: 4.7 },
];

const currentMonth = new Date().toLocaleString('de-DE', { month: 'short' });
const currentMonthIndex = new Date().getMonth(); // 0-basiert, also 3 für April
const months = ['Jan', 'Feb', 'Mär', 'Apr', 'Mai', 'Jun', 'Jul', 'Aug', 'Sep', 'Okt', 'Nov', 'Dez'];

const monthsLong: { [key: string]: string } = {
  'Jan': 'Januar',
  'Feb': 'Februar',
  'Mär': 'März',
  'Apr': 'April',
  'Mai': 'Mai',
  'Jun': 'Juni',
  'Jul': 'Juli',
  'Aug': 'August',
  'Sep': 'September',
  'Okt': 'Oktober',
  'Nov': 'November',
  'Dez': 'Dezember'
};

// Berechne die letzten 6 Monate bis zum aktuellen Monat
const lastSixMonths = Array.from({ length: 6 }, (_, i) => {
  const monthIndex = (currentMonthIndex - (5 - i) + 12) % 12;
  return months[monthIndex];
});

// Prüfe ob zwei aufeinanderfolgende Monate keine Daten haben
const hasConsecutiveEmptyMonths = lastSixMonths.some((month, index, array) => {
  if (index === array.length - 1) return false;
  const currentMonthData = data.find(d => d.name === month);
  const nextMonthData = data.find(d => d.name === array[index + 1]);
  return !currentMonthData && !nextMonthData;
});

const filteredData = hasConsecutiveEmptyMonths ? [] : lastSixMonths.map((month, index, array) => {
  const existingData = data.find(d => d.name === month);
  
  if (existingData) {
    return existingData;
  }

  // Finde die nächsten verfügbaren Bewertungen vor und nach dem aktuellen Monat
  let prevMonth = index > 0 ? array[index - 1] : null;
  let nextMonth = index < array.length - 1 ? array[index + 1] : null;
  
  let prevRating = prevMonth ? data.find(d => d.name === prevMonth)?.Bewertung : null;
  let nextRating = nextMonth ? data.find(d => d.name === nextMonth)?.Bewertung : null;

  // Wenn beide Nachbarmonate Bewertungen haben, berechne den Durchschnitt
  if (prevRating && nextRating) {
    return {
      name: month,
      Bewertung: Number(((prevRating + nextRating) / 2).toFixed(1))
    };
  }
  
  // Wenn nur einer der Nachbarmonate eine Bewertung hat, verwende diese
  if (prevRating) {
    return { name: month, Bewertung: prevRating };
  }
  if (nextRating) {
    return { name: month, Bewertung: nextRating };
  }

  // Wenn keine Nachbarmonatsdaten verfügbar sind, setze auf 0
  return { name: month, Bewertung: 0 };
});

const Bewertungsverlauf = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-2">
          <h2 className="text-2xl font-bold text-gray-900">Bewertungsverlauf</h2>
          <div className="text-base text-gray-600">
            Durchschnittliche Bewertungen der letzten 6 Monate
          </div>
        </div>

        <div className="h-[300px] w-full">
          <ResponsiveContainer width="100%" height="100%">
            {filteredData.length > 0 ? (
              <LineChart data={filteredData} margin={{ top: 20, right: 40, left: 0, bottom: 40 }}>
                <defs>
                  <linearGradient id="lineGradient" x1="0" y1="0" x2="1" y2="0">
                    <stop offset="0%" stopColor="#1e40af" />
                    <stop offset="50%" stopColor="#2563eb" />
                    <stop offset="100%" stopColor="#60a5fa" />
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="0" stroke="#f0f0f0" />
                <XAxis 
                  dataKey="name" 
                  tick={{ fontSize: 14, fill: '#666' }} 
                  axisLine={{ stroke: '#e0e0e0' }} 
                  tickLine={false}
                  dy={10}
                  padding={{ left: 30, right: 30 }}
                />
                <YAxis 
                  domain={[1, 5]} 
                  ticks={[1, 2, 3, 4, 5]} 
                  tick={{ fontSize: 14, fill: '#666' }} 
                  axisLine={{ stroke: '#e0e0e0' }} 
                  tickLine={false}
                  dx={-10}
                  padding={{ top: 20, bottom: 20 }}
                />
                <ReferenceLine 
                  y={5} 
                  stroke="#fbbf24" 
                  strokeWidth={2}
                  strokeDasharray="4 4"
                />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'white', 
                    border: 'none', 
                    borderRadius: '12px',
                    boxShadow: '0 4px 6px -1px rgba(0, 0, 0, 0.1), 0 2px 4px -1px rgba(0, 0, 0, 0.06)',
                    padding: '12px'
                  }} 
                  itemStyle={{ color: '#333', fontSize: '14px' }}
                  formatter={(value) => [`${value}`, 'Durchschnittliche Bewertung']}
                  labelFormatter={(label) => monthsLong[label]}
                  separator=": "
                />
                <Line 
                  type="monotone" 
                  dataKey="Bewertung" 
                  stroke="url(#lineGradient)" 
                  strokeWidth={4} 
                  dot={{ r: 6, fill: '#2563eb', strokeWidth: 2, stroke: '#fff' }} 
                  activeDot={{ r: 8, strokeWidth: 2, stroke: '#fff' }}
                />
              </LineChart>
            ) : (
              <div className="h-full w-full flex flex-col items-center justify-center bg-gray-50 rounded-xl">
                <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
                </svg>
                <p className="text-gray-600 text-xl mb-2 font-medium">Keine Daten verfügbar</p>
                <p className="text-gray-400 text-base">Für diesen Zeitraum liegen keine Bewertungen vor.</p>
              </div>
            )}
          </ResponsiveContainer>
        </div>
      </div>
    </div>
  );
};

export default Bewertungsverlauf; 