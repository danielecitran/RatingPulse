'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Bewertungsverlauf from '@/components/Bewertungsverlauf';
import Bewertungsverteilung from '../../components/Bewertungsverteilung';
import KIErkenntnisse from '../../components/KIErkenntnisse';
import BewertungsTimeline from '@/components/BewertungsTimeline';
import KritischeBewertungen from '@/components/KritischeBewertungen';
import KeywordCloud from '../../components/KeywordCloud';

export default function Dashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const router = useRouter();

  // Funktion zum Abrufen des Tokens aus den Cookies
  const getToken = () => {
    const cookies = document.cookie.split(';');
    for (let cookie of cookies) {
      const [name, value] = cookie.trim().split('=');
      if (name === 'token') {
        return value;
      }
    }
    return null;
  };

  // Überprüfe Token beim Laden der Seite
  useEffect(() => {
    const token = getToken();
    if (!token) {
      // Wenn kein Token vorhanden, zur Login-Seite weiterleiten
      window.location.replace('/login');
    }
  }, []);

  const handleSignOut = () => {
    // Token-Cookie löschen
    document.cookie = 'token=; expires=Thu, 01 Jan 1970 00:00:00 UTC; path=/;';
    // Zur Landing Page weiterleiten
    window.location.replace('/');
  };

  return (
    <div className="min-h-screen bg-gray-50">
      {/* Header mit Account-Sektion */}
      <div className="bg-white shadow">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-4">
          <div className="flex justify-between items-center">
            <h1 className="text-2xl font-bold text-gray-900">Dashboard</h1>
            
            {/* Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-2 text-gray-700 hover:text-gray-900"
              >
                <div className="w-8 h-8 bg-primary text-white rounded-full flex items-center justify-center">
                  <span className="text-sm font-medium">A</span>
                </div>
                <span className="hidden sm:block">Account</span>
                <svg
                  className={`w-5 h-5 transition-transform ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-48 bg-white rounded-md shadow-lg py-1 z-10">
                  <button
                    onClick={() => setIsDropdownOpen(false)}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Einstellungen
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="block w-full text-left px-4 py-2 text-sm text-gray-700 hover:bg-gray-100"
                  >
                    Abmelden
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>

      {/* Dashboard Content */}
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 py-8">
        <div className="space-y-8">
          <Bewertungsverlauf />
          <div className="grid grid-cols-1 lg:grid-cols-3 gap-8 mb-8">
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

          {/* Bewertungs-Timeline */}
          <div className="mt-8">
            <BewertungsTimeline />
          </div>
        </div>
      </div>
    </div>
  );
} 