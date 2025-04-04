'use client';

import React from 'react';

const erkenntnisse = [
  'Die meisten Kunden sind mit dem Kundenservice zufrieden.',
  'Es gibt einige Beschwerden über die Lieferzeit.',
  'Die Produktqualität wird allgemein positiv bewertet.',
  'Einige Kunden wünschen sich mehr Produktvielfalt.',
];

const KIErkenntnisse = () => {
  return (
    <div className="bg-white p-4 rounded shadow">
      <h2 className="text-xl font-semibold mb-2">KI-Erkenntnisse</h2>
      <ul className="list-disc pl-5">
        {erkenntnisse.map((erkenntnis, index) => (
          <li key={index} className="mb-2">{erkenntnis}</li>
        ))}
      </ul>
    </div>
  );
};

export default KIErkenntnisse; 