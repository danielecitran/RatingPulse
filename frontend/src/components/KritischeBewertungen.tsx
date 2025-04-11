'use client';

import React, { useState } from 'react';
import { format } from 'date-fns';
import { de } from 'date-fns/locale';
import AntwortTemplatesPopup from './AntwortTemplatesPopup';
import { Bewertung } from '../types/bewertung';

// Erweiterte Beispieldaten für kritische Bewertungen
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
  {
    id: 4,
    plattform: 'Google' as const,
    sterne: 1,
    text: 'Schlechte Erfahrung mit dem Kundenservice. Keine Rückmeldung auf meine E-Mails.',
    autor: 'Lisa Müller',
    datum: new Date('2024-03-27'),
    kategorie: 'Kundenservice',
    kiAnalyse: 'Hauptprobleme: Mangelnde Kommunikation, unzureichender Kundenservice',
    bewertungsUrl: 'https://www.google.com/maps/place/...',
  },
  {
    id: 5,
    plattform: 'Google' as const,
    sterne: 2,
    text: 'Produkt kam beschädigt an und der Umtausch war sehr umständlich.',
    autor: 'Thomas Weber',
    datum: new Date('2024-03-26'),
    kategorie: 'Produktqualität',
    kiAnalyse: 'Hauptprobleme: Beschädigte Lieferung, komplizierter Umtauschprozess',
    bewertungsUrl: 'https://www.google.com/maps/place/...',
  },
  {
    id: 6,
    plattform: 'Google' as const,
    sterne: 1,
    text: 'Preis-Leistungs-Verhältnis stimmt nicht. Viel zu teuer für die gebotene Qualität.',
    autor: 'Julia Schmidt',
    datum: new Date('2024-03-25'),
    kategorie: 'Preis',
    kiAnalyse: 'Hauptprobleme: Unverhältnismäßig hoher Preis, mangelnde Qualität',
    bewertungsUrl: 'https://www.google.com/maps/place/...',
  },
  {
    id: 7,
    plattform: 'Google' as const,
    sterne: 2,
    text: 'Website ist sehr langsam und unübersichtlich. Bestellprozess nervig.',
    autor: 'Markus Fischer',
    datum: new Date('2024-03-24'),
    kategorie: 'Website & Bestellung',
    kiAnalyse: 'Hauptprobleme: Langsame Ladezeiten, schlechte Benutzerführung',
    bewertungsUrl: 'https://www.google.com/maps/place/...',
  },
  {
    id: 8,
    plattform: 'Google' as const,
    sterne: 1,
    text: 'Falsche Produktbeschreibung. Was ich erhalten habe, entspricht nicht den Bildern.',
    autor: 'Anna Becker',
    datum: new Date('2024-03-23'),
    kategorie: 'Produktqualität',
    kiAnalyse: 'Hauptprobleme: Irreführende Produktbeschreibung, falsche Darstellung',
    bewertungsUrl: 'https://www.google.com/maps/place/...',
  },
  {
    id: 9,
    plattform: 'Google' as const,
    sterne: 2,
    text: 'Zahlungsabwicklung war problematisch. Mehrfach abgebucht und keine Rückerstattung.',
    autor: 'David Klein',
    datum: new Date('2024-03-22'),
    kategorie: 'Zahlung & Abrechnung',
    kiAnalyse: 'Hauptprobleme: Fehlerhafte Abrechnung, mangelnde Rückerstattung',
    bewertungsUrl: 'https://www.google.com/maps/place/...',
  },
  {
    id: 10,
    plattform: 'Google' as const,
    sterne: 1,
    text: 'Produkt war defekt und der Support hat nicht geholfen. Sehr frustrierend.',
    autor: 'Sophie Weber',
    datum: new Date('2024-03-21'),
    kategorie: 'Produktqualität',
    kiAnalyse: 'Hauptprobleme: Defektes Produkt, unzureichender Support',
    bewertungsUrl: 'https://www.google.com/maps/place/...',
  },
  {
    id: 11,
    plattform: 'Google' as const,
    sterne: 2,
    text: 'Lieferung kam zur falschen Adresse und der Umtausch war kompliziert.',
    autor: 'Maximilian Bauer',
    datum: new Date('2024-03-20'),
    kategorie: 'Lieferung & Logistik',
    kiAnalyse: 'Hauptprobleme: Falsche Lieferadresse, komplizierter Umtauschprozess',
    bewertungsUrl: 'https://www.google.com/maps/place/...',
  },
  {
    id: 12,
    plattform: 'Google' as const,
    sterne: 1,
    text: 'Kundenservice war unfreundlich und nicht hilfsbereit. Nie wieder!',
    autor: 'Laura Schmidt',
    datum: new Date('2024-03-19'),
    kategorie: 'Kundenservice',
    kiAnalyse: 'Hauptprobleme: Unfreundlicher Service, mangelnde Hilfsbereitschaft',
    bewertungsUrl: 'https://www.google.com/maps/place/...',
  }
];

const KritischeBewertungen = () => {
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
    setVisibleBewertungen(prev => Math.min(prev + 5, mockKritischeBewertungen.length));
  };

  return (
    <div className="bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.05)]">
      <div className="p-6">
        <div className="flex items-center justify-between mb-8">
          <div>
            <h2 className="text-2xl font-bold text-gray-800 mb-1">Kritische Bewertungen</h2>
            <p className="text-sm text-gray-500">Zeigt alle 1-2 Sterne Bewertungen</p>
          </div>
        </div>

        <div className="space-y-4">
          {mockKritischeBewertungen.slice(0, visibleBewertungen).map((bewertung) => (
            <div key={bewertung.id} className="border border-gray-200 rounded-xl p-5 hover:shadow-xl hover:scale-[1.02] hover:border-gray-200 transition-all duration-300 bg-gradient-to-br from-white via-gray-50 to-gray-100 backdrop-blur-xl shadow-lg">
              <div className="flex items-center justify-between mb-4">
                <div className="flex items-center space-x-3">
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
                  <span className="px-3 py-1.5 bg-gradient-to-r from-red-50 to-red-100/80 text-red-600/90 rounded-lg text-sm font-medium border border-red-100/20 shadow-sm">
                    {bewertung.kategorie}
                  </span>
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
              
              <p className="text-gray-600 mb-4 leading-relaxed">{bewertung.text}</p>

              <div className="bg-gradient-to-br from-red-500/5 to-red-500/10 backdrop-blur-xl p-4 rounded-lg mb-4 border border-red-100/20 shadow-sm">
                <div>
                  <div className="flex items-center gap-2 mb-1">
                    <img 
                      src="/images/sparkle-transparent.png" 
                      alt="KI Icon" 
                      className="w-5 h-5 object-contain" 
                    />
                    <h3 className="text-sm font-medium bg-gradient-to-r from-blue-600 to-violet-600 bg-clip-text text-transparent">
                      Analyse mit KI
                    </h3>
                  </div>
                  <p className="text-sm text-gray-600">
                    <span className="font-medium">Hauptprobleme: </span>
                    {bewertung.kiAnalyse?.replace('Hauptprobleme:', '') || 'Keine KI-Analyse verfügbar'}
                  </p>
                </div>
              </div>

              <div className="flex items-center justify-between text-sm text-gray-500">
                <span className="font-medium text-gray-600">{bewertung.autor}</span>
                <span>{format(bewertung.datum, 'dd. MMMM yyyy', { locale: de })}</span>
              </div>
            </div>
          ))}
        </div>

        {visibleBewertungen < mockKritischeBewertungen.length && (
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

export default KritischeBewertungen;