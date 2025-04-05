'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import AntwortTemplatesPopup from './AntwortTemplatesPopup';
import { Bewertung } from '../types/bewertung';

// Beispieldaten für kritische Bewertungen
const mockKritischeBewertungen: Bewertung[] = [
  {
    id: 1,
    plattform: 'Google' as const,
    sterne: 1,
    text: 'Sehr enttäuscht von der Qualität. Das Produkt entspricht nicht den Beschreibungen und der Kundenservice war nicht hilfreich.',
    autor: 'Michael Wagner',
    datum: new Date('2024-04-01'),
    kategorie: 'Produktqualität',
    kiAnalyse: 'Hauptprobleme: Produktqualität entspricht nicht der Beschreibung, unzureichender Kundenservice',
    bewertungsUrl: 'https://www.google.com/maps/place/...',
  },
  {
    id: 2,
    plattform: 'Google' as const,
    sterne: 2,
    text: 'Die Lieferung hat über 2 Wochen gedauert und auf Nachfragen wurde nicht reagiert. Produkt selbst ist okay.',
    autor: 'Sarah Meyer',
    datum: new Date('2024-03-29'),
    kategorie: 'Lieferung & Logistik',
    kiAnalyse: 'Hauptprobleme: Lange Lieferzeit, mangelnde Kommunikation bei Nachfragen',
    bewertungsUrl: 'https://www.google.com/maps/place/...',
  },
  {
    id: 3,
    plattform: 'Google' as const,
    sterne: 2,
    text: 'Komplizierter Bestellprozess und die Website stürzt ständig ab. Nach der Bestellung lief alles gut.',
    autor: 'Felix Schmidt',
    datum: new Date('2024-03-28'),
    kategorie: 'Website & Bestellung',
    kiAnalyse: 'Hauptprobleme: Technische Probleme auf der Website, komplexer Bestellvorgang',
    bewertungsUrl: 'https://www.google.com/maps/place/...',
  },
];

const KritischeBewertungen = () => {
  const [selectedBewertung, setSelectedBewertung] = useState<Bewertung | null>(null);
  const [isTemplatePopupOpen, setIsTemplatePopupOpen] = useState(false);

  const handleTemplateClick = (bewertung: Bewertung) => {
    setSelectedBewertung(bewertung);
    setIsTemplatePopupOpen(true);
  };

  const handleAntwortVerwenden = (antwort: string) => {
    // Hier können Sie die Antwort an den Backend-Service senden
    console.log('Antwort verwenden:', antwort);
  };

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
          <div key={bewertung.id} className="border-2 border-red-200 rounded-lg p-4">
            <div className="flex items-center justify-between mb-4">
              <div className="flex items-center space-x-2">
                <span className="px-2 py-1 rounded text-sm flex items-center">
                  <img src="/images/Google_Logo.png" alt="Google Logo" className="w-4 h-4" />
                </span>
                <div className="flex">
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
              <div className="flex items-center space-x-2">
                <button
                  onClick={() => handleTemplateClick(bewertung)}
                  className="px-3 py-1 text-sm bg-gray-100 hover:bg-gray-200 rounded flex items-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                  </svg>
                  <span>Antwortvorlage</span>
                </button>
                <a
                  href="https://business.google.com/"
                  target="_blank"
                  rel="noopener noreferrer"
                  className="px-3 py-1 text-sm bg-primary text-white hover:bg-primary/90 rounded flex items-center space-x-1"
                >
                  <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                    <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                  </svg>
                  <span>Auf Google antworten</span>
                </a>
              </div>
            </div>
            
            <p className="text-gray-600 mb-4">{bewertung.text}</p>

            <div className="bg-orange-50 p-3 rounded-md mb-4">
              <p className="text-sm text-orange-800">
                <span className="font-medium">KI-Analyse:</span> {bewertung.kiAnalyse}
              </p>
            </div>

            <div className="flex items-center justify-between text-sm text-gray-500">
              <span>{bewertung.autor}</span>
              <span>{format(bewertung.datum, 'dd. MMMM yyyy', { locale: de })}</span>
            </div>
          </div>
        ))}
      </div>

      {selectedBewertung && (
        <AntwortTemplatesPopup
          isOpen={isTemplatePopupOpen}
          onClose={() => setIsTemplatePopupOpen(false)}
          bewertung={{
            text: selectedBewertung.text,
            sterne: selectedBewertung.sterne,
          }}
          onAntwortVerwenden={handleAntwortVerwenden}
        />
      )}
    </div>
  );
};

export default KritischeBewertungen; 