'use client';

import React from 'react';
import { LineChart, Line, XAxis, YAxis, CartesianGrid, Tooltip, ResponsiveContainer, ReferenceLine } from 'recharts';

const data = [
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
    <div className="bg-white p-8 rounded-xl shadow-lg max-w-4xl mx-auto">
      <div className="text-center mb-12">
        <h2 className="text-3xl font-bold text-gray-800 mb-3">Bewertungsverlauf</h2>
        <p className="text-gray-600 text-lg">Durchschnittliche Bewertungen der letzten 6 Monate</p>
      </div>
      {filteredData.length > 0 ? (
        <div className="w-full h-[450px] flex items-center justify-center -mt-4">
          <ResponsiveContainer width="100%" height="100%">
            <LineChart data={filteredData} margin={{ top: 20, right: 40, left: 0, bottom: 40 }}>
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
                domain={[1, 6]} 
                ticks={[1, 2, 3, 4, 5, 6]} 
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
                stroke="#4a90e2" 
                strokeWidth={3} 
                dot={{ r: 6, fill: '#4a90e2', strokeWidth: 2, stroke: '#fff' }} 
                activeDot={{ r: 8, strokeWidth: 2, stroke: '#fff' }}
              />
            </LineChart>
          </ResponsiveContainer>
        </div>
      ) : (
        <div className="flex flex-col items-center justify-center h-[400px] bg-gray-50 rounded-xl border border-gray-100">
          <svg className="w-16 h-16 text-gray-400 mb-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
            <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 16h-1v-4h-1m1-4h.01M21 12a9 9 0 11-18 0 9 9 0 0118 0z" />
          </svg>
          <p className="text-gray-600 text-xl mb-2 font-medium">Keine Daten verfügbar</p>
          <p className="text-gray-400 text-base">Für diesen Zeitraum liegen keine Bewertungen vor.</p>
        </div>
      )}
    </div>
  );
};

export default Bewertungsverlauf; 