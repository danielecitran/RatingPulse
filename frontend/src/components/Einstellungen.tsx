'use client';

import React, { useState } from 'react';

interface NotificationSettings {
  newReviews: boolean;
  criticalReviews: boolean;
  responseDeadline: boolean;
  emailNotifications: boolean;
  responseReminders: number; // in days
}

interface TemplateSettings {
  autoSuggestions: boolean;
  defaultResponseTime: number; // in hours
  aiAssistant: boolean;
}

interface PlatformSettings {
  googleReviews: boolean;
  googleApiKey: string;
  reviewUpdateInterval: number; // in minutes
}

interface UserSettings {
  language: 'de' | 'en';
  timezone: string;
  darkMode: boolean;
}

const Einstellungen = () => {
  const [activeTab, setActiveTab] = useState('notifications');
  const [notificationSettings, setNotificationSettings] = useState<NotificationSettings>({
    newReviews: true,
    criticalReviews: true,
    responseDeadline: true,
    emailNotifications: false,
    responseReminders: 2,
  });

  const [templateSettings, setTemplateSettings] = useState<TemplateSettings>({
    autoSuggestions: true,
    defaultResponseTime: 24,
    aiAssistant: true,
  });

  const [platformSettings, setPlatformSettings] = useState<PlatformSettings>({
    googleReviews: true,
    googleApiKey: '',
    reviewUpdateInterval: 30,
  });

  const [userSettings, setUserSettings] = useState<UserSettings>({
    language: 'de',
    timezone: 'Europe/Berlin',
    darkMode: false,
  });

  const handleNotificationChange = (key: keyof NotificationSettings, value: any) => {
    setNotificationSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleTemplateChange = (key: keyof TemplateSettings, value: any) => {
    setTemplateSettings(prev => ({ ...prev, [key]: value }));
  };

  const handlePlatformChange = (key: keyof PlatformSettings, value: any) => {
    setPlatformSettings(prev => ({ ...prev, [key]: value }));
  };

  const handleUserChange = (key: keyof UserSettings, value: any) => {
    setUserSettings(prev => ({ ...prev, [key]: value }));
  };

  return (
    <div className="bg-white rounded-xl shadow-[0_3px_10px_rgb(0,0,0,0.05)] p-6">
      <h2 className="text-2xl font-bold text-gray-800 mb-6">Einstellungen</h2>

      {/* Navigation Tabs */}
      <div className="flex space-x-1 mb-6 border-b">
        {[
          { id: 'notifications', label: 'Benachrichtigungen' },
          { id: 'templates', label: 'Antwortvorlagen' },
          { id: 'platforms', label: 'Plattformen' },
          { id: 'user', label: 'Benutzer' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => setActiveTab(tab.id)}
            className={`px-4 py-2 font-medium text-sm rounded-t-lg ${activeTab === tab.id
              ? 'text-primary border-b-2 border-primary'
              : 'text-gray-500 hover:text-gray-700'}`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Notification Settings */}
      {activeTab === 'notifications' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Benachrichtigungen</h3>
              
              <div className="flex items-center justify-between">
                <label className="text-gray-600">Neue Bewertungen</label>
                <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={notificationSettings.newReviews}
                    onChange={(e) => handleNotificationChange('newReviews', e.target.checked)}
                  />
                  <div
                    className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform transform ${notificationSettings.newReviews ? 'translate-x-6 bg-primary' : 'bg-white'}`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-gray-600">Kritische Bewertungen</label>
                <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={notificationSettings.criticalReviews}
                    onChange={(e) => handleNotificationChange('criticalReviews', e.target.checked)}
                  />
                  <div
                    className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform transform ${notificationSettings.criticalReviews ? 'translate-x-6 bg-primary' : 'bg-white'}`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-gray-600">Antwortfristen</label>
                <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={notificationSettings.responseDeadline}
                    onChange={(e) => handleNotificationChange('responseDeadline', e.target.checked)}
                  />
                  <div
                    className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform transform ${notificationSettings.responseDeadline ? 'translate-x-6 bg-primary' : 'bg-white'}`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-gray-600">E-Mail-Benachrichtigungen</label>
                <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={notificationSettings.emailNotifications}
                    onChange={(e) => handleNotificationChange('emailNotifications', e.target.checked)}
                  />
                  <div
                    className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform transform ${notificationSettings.emailNotifications ? 'translate-x-6 bg-primary' : 'bg-white'}`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-gray-600">Erinnerung nach (Tage)</label>
                <input
                  type="number"
                  min="1"
                  max="7"
                  value={notificationSettings.responseReminders}
                  onChange={(e) => handleNotificationChange('responseReminders', parseInt(e.target.value))}
                  className="w-20 px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Template Settings */}
      {activeTab === 'templates' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Antwortvorlagen</h3>

              <div className="flex items-center justify-between">
                <label className="text-gray-600">Automatische Vorschläge</label>
                <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={templateSettings.autoSuggestions}
                    onChange={(e) => handleTemplateChange('autoSuggestions', e.target.checked)}
                  />
                  <div
                    className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform transform ${templateSettings.autoSuggestions ? 'translate-x-6 bg-primary' : 'bg-white'}`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-gray-600">KI-Assistent aktivieren</label>
                <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={templateSettings.aiAssistant}
                    onChange={(e) => handleTemplateChange('aiAssistant', e.target.checked)}
                  />
                  <div
                    className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform transform ${templateSettings.aiAssistant ? 'translate-x-6 bg-primary' : 'bg-white'}`}
                  />
                </div>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-gray-600">Standard-Antwortzeit (Stunden)</label>
                <input
                  type="number"
                  min="1"
                  max="72"
                  value={templateSettings.defaultResponseTime}
                  onChange={(e) => handleTemplateChange('defaultResponseTime', parseInt(e.target.value))}
                  className="w-20 px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Platform Settings */}
      {activeTab === 'platforms' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Plattform-Integration</h3>

              <div className="flex items-center justify-between">
                <label className="text-gray-600">Google Reviews aktivieren</label>
                <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={platformSettings.googleReviews}
                    onChange={(e) => handlePlatformChange('googleReviews', e.target.checked)}
                  />
                  <div
                    className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform transform ${platformSettings.googleReviews ? 'translate-x-6 bg-primary' : 'bg-white'}`}
                  />
                </div>
              </div>

              <div className="space-y-2">
                <label className="text-gray-600 block">Google API-Schlüssel</label>
                <input
                  type="password"
                  value={platformSettings.googleApiKey}
                  onChange={(e) => handlePlatformChange('googleApiKey', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                  placeholder="API-Schlüssel eingeben"
                />
              </div>

              <div className="flex items-center justify-between">
                <label className="text-gray-600">Aktualisierungsintervall (Minuten)</label>
                <input
                  type="number"
                  min="5"
                  max="120"
                  value={platformSettings.reviewUpdateInterval}
                  onChange={(e) => handlePlatformChange('reviewUpdateInterval', parseInt(e.target.value))}
                  className="w-20 px-3 py-2 border rounded-md"
                />
              </div>
            </div>
          </div>
        </div>
      )}

      {/* User Settings */}
      {activeTab === 'user' && (
        <div className="space-y-6">
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
            <div className="space-y-4">
              <h3 className="text-lg font-semibold text-gray-700 mb-4">Benutzereinstellungen</h3>

              <div className="space-y-2">
                <label className="text-gray-600 block">Sprache</label>
                <select
                  value={userSettings.language}
                  onChange={(e) => handleUserChange('language', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="de">Deutsch</option>
                  <option value="en">English</option>
                </select>
              </div>

              <div className="space-y-2">
                <label className="text-gray-600 block">Zeitzone</label>
                <select
                  value={userSettings.timezone}
                  onChange={(e) => handleUserChange('timezone', e.target.value)}
                  className="w-full px-3 py-2 border rounded-md"
                >
                  <option value="Europe/Berlin">Europe/Berlin</option>
                  <option value="Europe/London">Europe/London</option>
                  <option value="America/New_York">America/New_York</option>
                </select>
              </div>

              <div className="flex items-center justify-between">
                <label className="text-gray-600">Dark Mode</label>
                <div className="relative inline-block w-12 h-6 rounded-full bg-gray-200 cursor-pointer">
                  <input
                    type="checkbox"
                    className="sr-only"
                    checked={userSettings.darkMode}
                    onChange={(e) => handleUserChange('darkMode', e.target.checked)}
                  />
                  <div
                    className={`absolute left-1 top-1 w-4 h-4 rounded-full transition-transform transform ${userSettings.darkMode ? 'translate-x-6 bg-primary' : 'bg-white'}`}
                  />
                </div>
              </div>
            </div>
          </div>
        </div>
      )}

      {/* Save Button */}
      <div className="mt-8 flex justify-end">
        <button
          className="px-6 py-2.5 bg-primary text-white rounded-lg hover:bg-primary/90 transition-colors"
          onClick={() => console.log('Einstellungen speichern:', {
            notificationSettings,
            templateSettings,
            platformSettings,
            userSettings
          })}
        >
          Einstellungen speichern
        </button>
      </div>
    </div>
  );
};

export default Einstellungen;