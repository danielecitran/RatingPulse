'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Bewertungsverlauf from '@/components/Bewertungsverlauf';
import Bewertungsverteilung from '../../components/Bewertungsverteilung';
import KIErkenntnisse from '../../components/KIErkenntnisse';
import BewertungsTimeline from '@/components/BewertungsTimeline';
import KritischeBewertungen from '@/components/KritischeBewertungen';

export default function Dashboard() {
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [companyName, setCompanyName] = useState('');
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

  // Funktion zum Dekodieren des JWT Tokens
  const decodeToken = (token: string) => {
    try {
      const base64Url = token.split('.')[1];
      const base64 = base64Url.replace(/-/g, '+').replace(/_/g, '/');
      const jsonPayload = decodeURIComponent(atob(base64).split('').map(function(c) {
        return '%' + ('00' + c.charCodeAt(0).toString(16)).slice(-2);
      }).join(''));
      return JSON.parse(jsonPayload);
    } catch (error) {
      console.error('Fehler beim Dekodieren des Tokens:', error);
      return null;
    }
  };

  // Funktion zum Abrufen des Firmennamens
  const fetchCompanyName = async () => {
    const token = getToken();
    if (!token) return;

    // Versuche den Firmennamen direkt aus dem Token zu lesen
    const decodedToken = decodeToken(token);
    if (decodedToken && decodedToken.companyName) {
      setCompanyName(decodedToken.companyName);
      return;
    }

    // Fallback: Versuche den Firmennamen vom Backend zu holen
    try {
      const response = await fetch('http://localhost:8080/api/users/me', {
        method: 'GET',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token.trim()}`
        }
      });

      if (response.ok) {
        const data = await response.json();
        setCompanyName(data.company_name);
      } else {
        console.error('Fehler beim Abrufen der Daten:', response.status, response.statusText);
      }
    } catch (error) {
      console.error('Fehler beim Abrufen des Firmennamens:', error);
    }
  };

  // Überprüfe Token und hole Firmennamen beim Laden der Seite
  useEffect(() => {
    const token = getToken();
    if (!token) {
      // Wenn kein Token vorhanden, zur Login-Seite weiterleiten
      window.location.replace('/login');
    } else {
      fetchCompanyName();
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
      {/* Moderner Header mit Account-Sektion */}
      <div className="bg-white shadow-sm border-b border-gray-100">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="flex justify-between items-center h-16">
            <div className="flex items-center space-x-4">
              <h1 className="text-2xl font-bold bg-gradient-to-r from-primary to-primary/80 bg-clip-text text-transparent">
                Dashboard
              </h1>
              <div className="hidden md:block h-6 w-px bg-gray-200"></div>
              <div className="hidden md:flex items-center space-x-2 text-sm text-gray-500">
                <span className="font-medium">{companyName}</span>
              </div>
            </div>
            
            {/* Modernes Account Dropdown */}
            <div className="relative">
              <button
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="flex items-center space-x-3 px-3 py-2 rounded-lg hover:bg-gray-50 transition-all duration-200"
              >
                <div className="w-9 h-9 bg-gradient-to-br from-primary to-primary/80 text-white rounded-full flex items-center justify-center shadow-sm">
                  <span className="text-sm font-medium">{companyName ? companyName[0].toUpperCase() : 'A'}</span>
                </div>
                <div className="hidden sm:flex flex-col items-start">
                  <span className="text-sm font-medium text-gray-900">{companyName || 'Account'}</span>
                  <span className="text-xs text-gray-500">Verwaltung</span>
                </div>
                <svg
                  className={`w-5 h-5 text-gray-400 transition-transform duration-200 ${isDropdownOpen ? 'rotate-180' : ''}`}
                  fill="none"
                  stroke="currentColor"
                  viewBox="0 0 24 24"
                >
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M19 9l-7 7-7-7" />
                </svg>
              </button>

              {isDropdownOpen && (
                <div className="absolute right-0 mt-2 w-56 bg-white rounded-lg shadow-lg py-1 z-10 border border-gray-100">
                  <div className="px-4 py-2 border-b border-gray-100">
                    <p className="text-sm font-medium text-gray-900">{companyName}</p>
                    <p className="text-xs text-gray-500">Verwaltung</p>
                  </div>
                  <button
                    onClick={() => setIsDropdownOpen(false)}
                    className="flex items-center w-full px-4 py-2 text-sm text-gray-700 hover:bg-gray-50 transition-colors duration-150"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M10.325 4.317c.426-1.756 2.924-1.756 3.35 0a1.724 1.724 0 002.573 1.066c1.543-.94 3.31.826 2.37 2.37a1.724 1.724 0 001.065 2.572c1.756.426 1.756 2.924 0 3.35a1.724 1.724 0 00-1.066 2.573c.94 1.543-.826 3.31-2.37 2.37a1.724 1.724 0 00-2.572 1.065c-.426 1.756-2.924 1.756-3.35 0a1.724 1.724 0 00-2.573-1.066c-1.543.94-3.31-.826-2.37-2.37a1.724 1.724 0 00-1.065-2.572c-1.756-.426-1.756-2.924 0-3.35a1.724 1.724 0 001.066-2.573c-.94-1.543.826-3.31 2.37-2.37.996.608 2.296.07 2.572-1.065z" />
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M15 12a3 3 0 11-6 0 3 3 0 016 0z" />
                    </svg>
                    Einstellungen
                  </button>
                  <button
                    onClick={handleSignOut}
                    className="flex items-center w-full px-4 py-2 text-sm text-red-600 hover:bg-red-50 transition-colors duration-150"
                  >
                    <svg className="w-4 h-4 mr-2" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                      <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M17 16l4-4m0 0l-4-4m4 4H7m6 4v1a3 3 0 01-3 3H6a3 3 0 01-3-3V7a3 3 0 013-3h4a3 3 0 013 3v1" />
                    </svg>
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