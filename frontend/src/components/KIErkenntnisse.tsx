'use client';

import React from 'react';
import Image from 'next/image';

const KIErkenntnisse = () => {
  return (
    <div className="bg-white rounded-xl shadow-sm p-8">
      <div className="space-y-6">
        {/* Header */}
        <div className="flex flex-col space-y-2">
          <div className="flex items-center gap-3">
            <span className="flex items-center justify-center">
              <Image
                src="/images/sparkle-transparent.png"
                alt="Sparkle Icon"
                width={40}
                height={40}
                priority
              />
            </span>
            <span className="px-3 py-1.5 rounded text-sm bg-blue-100 text-blue-800">
              Analyse mit KI
            </span>
          </div>
          <h2 className="text-2xl font-bold text-gray-900">KI-Erkenntnisse</h2>
          <div className="text-base text-gray-600">
            Wichtige Erkenntnisse aus den Bewertungen
          </div>
        </div>

        {/* Content */}
        <ul className="space-y-4">
          <li className="flex items-start">
            <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2"></div>
            <p className="ml-4 text-gray-600">Die meisten Kunden sind mit dem Kundenservice zufrieden.</p>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2"></div>
            <p className="ml-4 text-gray-600">Es gibt einige Beschwerden über die Lieferzeit.</p>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2"></div>
            <p className="ml-4 text-gray-600">Die Produktqualität wird allgemein positiv bewertet.</p>
          </li>
          <li className="flex items-start">
            <div className="flex-shrink-0 w-1.5 h-1.5 rounded-full bg-blue-600 mt-2"></div>
            <p className="ml-4 text-gray-600">Einige Kunden wünschen sich mehr Produktvielfalt.</p>
          </li>
        </ul>
      </div>
    </div>
  );
};

export default KIErkenntnisse; 