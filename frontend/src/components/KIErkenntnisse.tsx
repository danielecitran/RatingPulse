'use client';

import React from 'react';
import Image from 'next/image';

const KIErkenntnisse = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8 flex flex-col">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center">
              <Image
                src="/images/sparkle-transparent.png"
                alt="Sparkle Icon"
                width={34}
                height={34}
                priority
              />
            </span>
            <span className="text-sm font-medium bg-gradient-to-r from-[#1e40af] via-[#2563eb] to-[#60a5fa] inline-block text-transparent bg-clip-text">
              Analyse mit KI
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">Erkenntnisse</h2>
          <div className="text-base text-gray-600">
            Wichtige Erkenntnisse aus den Bewertungen
          </div>
        </div>

        {/* Content */}
        <ul className="space-y-4">
          <li className="flex items-start group">
            <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-50 mt-0.5">
              <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="ml-3 text-gray-600">Die meisten Kunden sind mit dem Kundenservice zufrieden.</p>
          </li>
          <li className="flex items-start group">
            <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-red-50 mt-0.5">
              <svg className="w-4 h-4 text-red-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 8V12M12 16H12.01M21 12C21 16.9706 16.9706 21 12 21C7.02944 21 3 16.9706 3 12C3 7.02944 7.02944 3 12 3C16.9706 3 21 7.02944 21 12Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="ml-3 text-gray-600">Es gibt einige Beschwerden über die Lieferzeit.</p>
          </li>
          <li className="flex items-start group">
            <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-green-50 mt-0.5">
              <svg className="w-4 h-4 text-green-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M20 6L9 17L4 12" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round"/>
              </svg>
            </div>
            <p className="ml-3 text-gray-600">Die Produktqualität wird allgemein positiv bewertet.</p>
          </li>
          <li className="flex items-start group">
            <div className="flex-shrink-0 flex items-center justify-center w-6 h-6 rounded-full bg-yellow-50 mt-0.5">
              <svg className="w-4 h-4 text-yellow-500" viewBox="0 0 24 24" fill="none" xmlns="http://www.w3.org/2000/svg">
                <path d="M12 9V11M12 15H12.01M5.07183 19H18.9282C20.4678 19 21.4301 17.3333 20.6603 16L13.7321 4C12.9623 2.66667 11.0377 2.66667 10.2679 4L3.33975 16C2.56995 17.3333 3.53223 19 5.07183 19Z" stroke="currentColor" strokeWidth="2" strokeLinecap="round"/>
              </svg>
            </div>
            <p className="ml-3 text-gray-600">Einige Kunden wünschen sich mehr Produktvielfalt.</p>
          </li>
        </ul>
      </div>

      {/* Disclaimer */}
      <div className="text-center text-xs text-gray-400 mt-auto pt-6">
        Die KI kann Fehler machen.
      </div>
    </div>
  );
};

export default KIErkenntnisse; 