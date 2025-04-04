'use client';

import React from 'react';

// Beispieldaten für Keywords
const mockKeywords = [
  { text: 'Qualität', size: 48, sentiment: 'positive', count: 25 },
  { text: 'Lieferung', size: 42, sentiment: 'negative', count: 20 },
  { text: 'Service', size: 36, sentiment: 'positive', count: 18 },
  { text: 'Kundenservice', size: 32, sentiment: 'neutral', count: 15 },
  { text: 'Preis', size: 30, sentiment: 'positive', count: 14 },
  { text: 'Wartezeit', size: 28, sentiment: 'negative', count: 12 },
  { text: 'Bestellung', size: 26, sentiment: 'neutral', count: 10 },
  { text: 'Produkt', size: 24, sentiment: 'positive', count: 8 },
  { text: 'Versand', size: 22, sentiment: 'negative', count: 7 },
  { text: 'Support', size: 20, sentiment: 'positive', count: 6 },
  { text: 'Website', size: 18, sentiment: 'neutral', count: 5 },
  { text: 'Kommunikation', size: 16, sentiment: 'negative', count: 4 },
];

const KeywordCloud = () => {
  // Funktion zum Mischen des Arrays (Fisher-Yates Shuffle)
  const shuffleArray = (array: typeof mockKeywords) => {
    for (let i = array.length - 1; i > 0; i--) {
      const j = Math.floor(Math.random() * (i + 1));
      [array[i], array[j]] = [array[j], array[i]];
    }
    return array;
  };

  // Farbe basierend auf Sentiment
  const getColor = (sentiment: string) => {
    switch (sentiment) {
      case 'positive':
        return 'text-green-600';
      case 'negative':
        return 'text-red-600';
      default:
        return 'text-gray-600';
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Häufige Keywords</h2>
        <div className="flex items-center space-x-4">
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-green-600"></div>
            <span className="text-sm text-gray-600">Positiv</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-gray-600"></div>
            <span className="text-sm text-gray-600">Neutral</span>
          </div>
          <div className="flex items-center space-x-2">
            <div className="w-3 h-3 rounded-full bg-red-600"></div>
            <span className="text-sm text-gray-600">Negativ</span>
          </div>
        </div>
      </div>

      <div className="flex flex-wrap justify-center items-center gap-4 p-4 min-h-[200px]">
        {shuffleArray([...mockKeywords]).map((keyword, index) => (
          <div
            key={index}
            className={`${getColor(keyword.sentiment)} font-medium cursor-default 
              transition-transform hover:scale-110`}
            style={{
              fontSize: `${keyword.size / 16}rem`,
            }}
            title={`${keyword.count} Erwähnungen`}
          >
            {keyword.text}
          </div>
        ))}
      </div>
    </div>
  );
};

export default KeywordCloud; 