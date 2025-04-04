'use client';

import React from 'react';
import Bewertungsverlauf from '../../components/Bewertungsverlauf';
import Bewertungsverteilung from '../../components/Bewertungsverteilung';
import KIErkenntnisse from '../../components/KIErkenntnisse';
import BewertungsTimeline from '../../components/BewertungsTimeline';
import KritischeBewertungen from '../../components/KritischeBewertungen';
import KeywordCloud from '../../components/KeywordCloud';
import AntwortTemplates from '../../components/AntwortTemplates';

const Dashboard = () => {
  return (
    <div className="container mx-auto px-4 py-8">
      <h1 className="text-3xl font-bold mb-8">Dashboard</h1>
      
      {/* Statistik-Karten */}
      <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
        <Bewertungsverlauf />
        <Bewertungsverteilung />
        <KIErkenntnisse />
      </div>

      {/* Keyword Cloud */}
      <div className="mb-8">
        <KeywordCloud />
      </div>

      {/* Kritische Bewertungen */}
      <div className="mb-8">
        <KritischeBewertungen />
      </div>

      {/* Antwort Templates */}
      <div className="mb-8">
        <AntwortTemplates />
      </div>

      {/* Bewertungs-Timeline */}
      <div className="mt-8">
        <BewertungsTimeline />
      </div>
    </div>
  );
};

export default Dashboard; 