'use client';

import React from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';

// Beispieldaten für kritische Bewertungen
const mockKritischeBewertungen = [
  {
    id: 1,
    plattform: 'Trustpilot',
    sterne: 1,
    text: 'Sehr enttäuscht von der Qualität. Das Produkt entspricht nicht den Beschreibungen und der Kundenservice war nicht hilfreich.',
    autor: 'Michael Wagner',
    datum: new Date('2024-04-01'),
    kategorie: 'Produktqualität',
    aiAnalyse: 'Hauptprobleme: Produktqualität entspricht nicht der Beschreibung, unzureichender Kundenservice',
    bewertungsUrl: 'https://www.trustpilot.com/review/...',
  },
  {
    id: 2,
    plattform: 'Google',
    sterne: 2,
    text: 'Die Lieferung hat über 2 Wochen gedauert und auf Nachfragen wurde nicht reagiert. Produkt selbst ist okay.',
    autor: 'Sarah Meyer',
    datum: new Date('2024-03-29'),
    kategorie: 'Lieferung & Logistik',
    aiAnalyse: 'Hauptprobleme: Lange Lieferzeit, mangelnde Kommunikation bei Nachfragen',
    bewertungsUrl: 'https://www.google.com/maps/place/...',
  },
  {
    id: 3,
    plattform: 'Trustpilot',
    sterne: 2,
    text: 'Komplizierter Bestellprozess und die Website stürzt ständig ab. Nach der Bestellung lief alles gut.',
    autor: 'Felix Schmidt',
    datum: new Date('2024-03-28'),
    kategorie: 'Website & Bestellung',
    aiAnalyse: 'Hauptprobleme: Technische Probleme auf der Website, komplexer Bestellvorgang',
    bewertungsUrl: 'https://www.trustpilot.com/review/...',
  },
];

const KritischeBewertungen = () => {
  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <div className="flex items-center justify-between mb-6">
        <h2 className="text-2xl font-bold">Kritische Bewertungen</h2>
        <div className="text-sm text-gray-500">
          Zeigt alle 1-2 Sterne Bewertungen
        </div>
      </div>

      <div className="space-y-6">
        {mockKritischeBewertungen.map((bewertung) => (
          <div key={bewertung.id} className="border border-red-100 rounded-lg p-4 space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center space-x-2">
                <span className={`text-sm font-medium px-2 py-1 rounded ${
                  bewertung.plattform === 'Google' ? 'bg-blue-100 text-blue-800' : 'bg-green-100 text-green-800'
                }`}>
                  {bewertung.plattform}
                </span>
                <div className="flex items-center">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-5 h-5 ${
                        index < bewertung.sterne ? 'text-yellow-400' : 'text-gray-300'
                      }`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                </div>
                <span className="px-2 py-1 bg-red-50 text-red-700 rounded text-sm font-medium">
                  {bewertung.kategorie}
                </span>
              </div>
              <span className="text-sm text-gray-500">
                {format(bewertung.datum, 'dd. MMMM yyyy', { locale: de })}
              </span>
            </div>
            
            <div>
              <p className="font-medium">{bewertung.autor}</p>
              <p className="text-gray-600 mt-1">{bewertung.text}</p>
            </div>

            <div className="bg-orange-50 p-3 rounded-md">
              <p className="text-sm text-orange-800">
                <span className="font-medium">KI-Analyse:</span> {bewertung.aiAnalyse}
              </p>
            </div>

            <div className="mt-3">
              <a
                href={bewertung.bewertungsUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="inline-flex items-center text-primary hover:text-primary/90 space-x-1"
              >
                <span>Auf {bewertung.plattform} antworten</span>
                <svg 
                  className="w-4 h-4" 
                  fill="none" 
                  stroke="currentColor" 
                  viewBox="0 0 24 24"
                >
                  <path 
                    strokeLinecap="round" 
                    strokeLinejoin="round" 
                    strokeWidth={2} 
                    d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" 
                  />
                </svg>
              </a>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};

export default KritischeBewertungen; 