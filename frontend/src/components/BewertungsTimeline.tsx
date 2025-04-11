'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import AntwortTemplatesPopup from './AntwortTemplatesPopup';
import { Bewertung } from '../types/bewertung';

// Beispieldaten für Bewertungen
const mockBewertungen: Bewertung[] = [
  {
    id: 1,
    plattform: 'Google' as const,
    sterne: 5,
    text: 'Sehr zufrieden mit dem Service. Das Team war äußerst professionell und hat alle meine Erwartungen übertroffen.',
    autor: 'Max Mustermann',
    datum: new Date('2024-04-01'),
    antwort: '',
    bewertungsUrl: 'https://www.google.com/maps/place/...',
  },
  {
    id: 2,
    plattform: 'Google' as const,
    sterne: 2,
    text: 'Leider war die Lieferzeit länger als angegeben. Die Qualität des Produkts ist aber gut.',
    autor: 'Anna Schmidt',
    datum: new Date('2024-03-30'),
    antwort: 'Vielen Dank für Ihr Feedback. Wir entschuldigen uns für die längere Lieferzeit und arbeiten daran, unseren Service zu verbessern.',
    bewertungsUrl: 'https://www.google.com/maps/place/...',
  },
  {
    id: 3,
    plattform: 'Google' as const,
    sterne: 4,
    text: 'Gutes Produkt, schnelle Lieferung. Ein Stern Abzug wegen der etwas komplizierten Bedienung.',
    autor: 'Thomas Weber',
    datum: new Date('2024-03-29'),
    antwort: '',
    bewertungsUrl: 'https://www.google.com/maps/place/...',
  },
  {
    id: 4,
    plattform: 'Google' as const,
    sterne: 5,
    text: 'Hervorragender Kundenservice! Schnelle und kompetente Hilfe bei allen Fragen.',
    autor: 'Lisa Müller',
    datum: new Date('2024-03-28'),
    antwort: '',
    bewertungsUrl: 'https://www.google.com/maps/place/...',
  },
  {
    id: 5,
    plattform: 'Google' as const,
    sterne: 3,
    text: 'Durchschnittliche Erfahrung. Produkt ist okay, aber der Preis könnte besser sein.',
    autor: 'Michael Wagner',
    datum: new Date('2024-03-27'),
    antwort: '',
    bewertungsUrl: 'https://www.google.com/maps/place/...',
  },
  {
    id: 6,
    plattform: 'Google' as const,
    sterne: 5,
    text: 'Absolut empfehlenswert! Tolle Qualität und schnelle Lieferung.',
    autor: 'Sarah Koch',
    datum: new Date('2024-03-26'),
    antwort: '',
    bewertungsUrl: 'https://www.google.com/maps/place/...',
  },
  {
    id: 7,
    plattform: 'Google' as const,
    sterne: 4,
    text: 'Sehr gute Erfahrung gemacht. Nur kleine Verbesserungsvorschläge.',
    autor: 'Felix Bauer',
    datum: new Date('2024-03-25'),
    antwort: '',
    bewertungsUrl: 'https://www.google.com/maps/place/...',
  },
  {
    id: 8,
    plattform: 'Google' as const,
    sterne: 5,
    text: 'Perfekter Service von Anfang bis Ende. Gerne wieder!',
    autor: 'Julia Schmidt',
    datum: new Date('2024-03-24'),
    antwort: '',
    bewertungsUrl: 'https://www.google.com/maps/place/...',
  }
];

const BewertungsTimeline = () => {
  const [selectedBewertung, setSelectedBewertung] = useState<Bewertung | null>(null);
  const [isTemplatePopupOpen, setIsTemplatePopupOpen] = useState(false);
  const [visibleBewertungen, setVisibleBewertungen] = useState(3);

  const handleTemplateClick = (bewertung: Bewertung) => {
    setSelectedBewertung(bewertung);
    setIsTemplatePopupOpen(true);
  };

  const handleAntwortVerwenden = (antwort: string) => {
    console.log('Antwort verwenden:', antwort);
  };

  const handleMehrLaden = () => {
    setVisibleBewertungen(prev => Math.min(prev + 5, mockBewertungen.length));
  };

  return (
    <div className="bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.05)]">
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Alle Bewertungen</h2>
            <p className="text-sm text-gray-500">Zeigt alle Bewertungen chronologisch</p>
          </div>
        </div>

        <div className="space-y-4">
          {mockBewertungen.slice(0, visibleBewertungen).map((bewertung) => (
            <div key={bewertung.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-lg transition-all duration-200 bg-gradient-to-br from-white via-gray-50 to-gray-100 backdrop-blur-xl shadow-lg">
              <div className="flex items-center justify-between mb-2">
                <div className="flex items-center space-x-2">
                  <div className="flex items-center">
                    <img src="/images/Google_Logo.png" alt="Google Logo" className="w-5 h-5" />
                  </div>
                  <div className="flex">
                    {[...Array(5)].map((_, index) => (
                      <svg
                        key={index}
                        className={`w-5 h-5 ${
                          index < bewertung.sterne ? 'text-yellow-400' : 'text-gray-200'
                        }`}
                        fill="currentColor"
                        viewBox="0 0 20 20"
                      >
                        <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                      </svg>
                    ))}
                  </div>
                </div>
                <div className="flex items-center space-x-2">
                  <button
                    onClick={() => handleTemplateClick(bewertung)}
                    className="px-4 py-2 text-sm bg-white hover:bg-gray-50 rounded-lg flex items-center space-x-2 transition-all duration-200 border border-gray-200 shadow-sm hover:shadow"
                  >
                    <svg className="w-4 h-4 text-gray-700" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M4 6h16M4 10h16M4 14h16M4 18h16" />
                    </svg>
                    <span className="text-gray-700">Antwortvorlage</span>
                  </button>
                  <a
                    href={bewertung.bewertungsUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="px-4 py-2 text-sm bg-primary hover:bg-primary/90 text-white rounded-lg flex items-center space-x-2 transition-all duration-200 shadow-sm hover:shadow"
                  >
                    <svg className="w-4 h-4" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10 6H6a2 2 0 00-2 2v10a2 2 0 002 2h10a2 2 0 002-2v-4M14 4h6m0 0v6m0-6L10 14" />
                    </svg>
                    <span>Auf Google antworten</span>
                  </a>
                </div>
              </div>
              
              <p className="text-gray-600 mb-2 leading-relaxed">{bewertung.text}</p>

              {bewertung.antwort && (
                <div className="bg-gray-50 p-4 rounded-lg mb-4 border border-gray-100">
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Ihre Antwort: </span>
                    {bewertung.antwort}
                  </p>
                </div>
              )}

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="font-medium text-gray-600">{bewertung.autor}</span>
                <span>{format(bewertung.datum, 'dd. MMMM yyyy', { locale: de })}</span>
              </div>
            </div>
          ))}
        </div>

        {visibleBewertungen < mockBewertungen.length && (
          <div className="mt-8 text-center">
            <button
              onClick={handleMehrLaden}
              className="px-6 py-2.5 bg-white hover:bg-gray-50 text-gray-700 rounded-lg transition-all duration-200 flex items-center space-x-2 mx-auto border border-gray-200 shadow-sm hover:shadow group"
            >
              <span className="font-medium">Weitere Bewertungen laden</span>
              <svg 
                className="w-4 h-4 group-hover:translate-y-0.5 transition-transform duration-200" 
                fill="none" 
                stroke="currentColor" 
                viewBox="0 0 24 24"
              >
                <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
              </svg>
            </button>
          </div>
        )}

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
    </div>
  );
};

export default BewertungsTimeline;