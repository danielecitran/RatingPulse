'use client';

import React, { useState, useEffect } from 'react';

// Beispiel-Templates
const initialTemplates = [
  {
    id: 1,
    name: 'Positive Bewertung - Dank',
    text: 'Vielen Dank für Ihre positive Bewertung! Wir freuen uns sehr, dass Sie mit unserem [Produkt/Service] zufrieden sind. Ihr Feedback motiviert uns, weiterhin unser Bestes zu geben.',
    kategorie: 'Positiv',
  },
  {
    id: 2,
    name: 'Entschuldigung - Lieferzeit',
    text: 'Vielen Dank für Ihr Feedback. Wir entschuldigen uns aufrichtig für die verlängerte Lieferzeit. Dies entspricht nicht unserem üblichen Service-Standard. Wir arbeiten bereits daran, unsere Lieferprozesse zu optimieren.',
    kategorie: 'Negativ',
  },
  {
    id: 3,
    name: 'Produktqualität - Verbesserung',
    text: 'Vielen Dank für Ihre ehrliche Rückmeldung zur Produktqualität. Wir nehmen Ihr Feedback sehr ernst und werden es an unser Qualitätsmanagement weiterleiten. Bitte kontaktieren Sie uns direkt unter [Kontakt], damit wir eine Lösung finden können.',
    kategorie: 'Negativ',
  },
];

interface AntwortTemplatesPopupProps {
  isOpen: boolean;
  onClose: () => void;
  bewertung: {
    text: string;
    sterne: number;
  };
  onAntwortVerwenden: (antwort: string) => void;
}

const AntwortTemplatesPopup: React.FC<AntwortTemplatesPopupProps> = ({
  isOpen,
  onClose,
  bewertung,
  onAntwortVerwenden, // Keep this prop for potential future use or remove if definitely not needed
}) => {
  const [templates] = useState(initialTemplates);
  const [selectedSource, setSelectedSource] = useState<{ type: 'template' | 'ki'; text: string } | null>(null);
  const [customizedText, setCustomizedText] = useState('');
  const [activeTab, setActiveTab] = useState<'templates' | 'ki'>('ki'); // State for active tab
  const [isCopied, setIsCopied] = useState(false); // State for copy feedback

  // Beispiel KI-Vorschläge basierend auf der Bewertung
  const mockKIVorschlaege = [
    'Danke für Ihre ausführliche Bewertung. Wir freuen uns, dass Sie die Qualität unseres Produkts schätzen. Ihre Anmerkungen zur Lieferzeit nehmen wir ernst und arbeiten an Verbesserungen.',
    'Wir verstehen Ihre Kritikpunkte und nehmen diese sehr ernst. Unser Team wird sich umgehend mit den angesprochenen Punkten befassen.',
    'Ihre Zufriedenheit ist uns wichtig. Wir würden uns freuen, wenn Sie uns unter [Kontakt] kontaktieren, um die Situation persönlich zu besprechen.',
  ];

  const handleSelect = (type: 'template' | 'ki', text: string) => {
    setSelectedSource({ type, text });
    setCustomizedText(text);
  };

  const handleCopy = async () => {
    try {
      await navigator.clipboard.writeText(customizedText);
      setIsCopied(true);
      setTimeout(() => {
        setIsCopied(false);
        // Optionally close the popup after copying
        // onClose();
      }, 1500); // Reset after 1.5 seconds
    } catch (err) {
      console.error('Fehler beim Kopieren:', err);
      // Handle error (e.g., show an error message)
    }
  };

  // Reset customized text when popup opens or selected source changes
  useEffect(() => {
    if (isOpen && selectedSource) {
      setCustomizedText(selectedSource.text);
    } else if (!isOpen) {
      // Reset state when closing
      setSelectedSource(null);
      setCustomizedText('');
      setIsCopied(false);
      setActiveTab('ki');
    }
  }, [isOpen, selectedSource]);

  // Reset customized text if the initial source is cleared (e.g., user deletes everything)
  useEffect(() => {
    if (selectedSource && customizedText === '') {
      // If user clears the text area after selecting a source, maybe deselect?
      // Or allow them to write a fully custom message.
      // Current behavior: allows fully custom message.
    }
  }, [customizedText, selectedSource]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 bg-black/60 flex items-center justify-center z-50 p-4 backdrop-blur-sm">
      <div className="bg-white p-8 rounded-xl shadow-2xl max-w-5xl w-full max-h-[90vh] flex flex-col">
        {/* Header */}
        <div className="flex justify-between items-center mb-6 pb-4 border-b border-gray-200">
          <h2 className="text-2xl font-semibold text-gray-800">Antwort erstellen</h2>
          <button
            onClick={onClose}
            className="text-gray-400 hover:text-gray-600 transition-colors p-1 rounded-full hover:bg-gray-100"
            aria-label="Schließen"
          >
            <svg className="w-6 h-6" fill="none" stroke="currentColor" viewBox="0 0 24 24">
              <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M6 18L18 6M6 6l12 12" />
            </svg>
          </button>
        </div>

        {/* Content Area */}
        <div className="flex-grow pr-2 -mr-2 grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Left Column: Templates & AI Suggestions with Tabs */}
          <div className="flex flex-col space-y-4 max-h-[60vh] overflow-y-auto relative">
            {/* Tab Navigation */}
            <div className="flex border-b border-gray-200 sticky top-0 z-10 bg-white">
              <button
                onClick={() => setActiveTab('ki')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'ki'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
                  }`}
              >
                KI-Vorschläge
              </button>
              <button
                onClick={() => setActiveTab('templates')}
                className={`px-4 py-2 text-sm font-medium transition-colors ${activeTab === 'templates'
                    ? 'text-primary border-b-2 border-primary'
                    : 'text-gray-500 hover:text-gray-700 hover:border-gray-300 border-b-2 border-transparent'
                  }`}
              >
                Gespeicherte Vorlagen
              </button>
            </div>

            {/* Tab Content */}
            {/* Apply fixed height and scroll to this container */}
            <div className="flex-grow pr-2 space-y-4">
              {/* Saved Templates Content */}
              {activeTab === 'templates' && (
                <div className="relative flex flex-col h-full">
                  <div className="flex-1 overflow-y-auto pr-2 space-y-3">
                    {templates.map((template) => (
                      <div
                        key={template.id}
                        className={`border rounded-lg p-4 cursor-pointer transition-all duration-150 ${selectedSource?.type === 'template' && selectedSource.text === template.text ? 'bg-primary/15 border-gray-200' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                        onClick={() => handleSelect('template', template.text)}
                      >
                        <div className="flex items-center justify-between mb-1.5">
                          <span className="font-medium text-gray-800 text-sm">{template.name}</span>
                          <span className={`px-2 py-0.5 rounded-full text-xs font-medium ${template.kategorie === 'Positiv'
                              ? 'bg-green-100 text-green-700'
                              : 'bg-red-100 text-red-700'
                            }`}>
                            {template.kategorie}
                          </span>
                        </div>
                        <p className="text-sm text-gray-600 line-clamp-2">{template.text}</p>
                      </div>
                    ))}
                  </div>
                  <div className="sticky bottom-0 left-0 right-0 bg-white pt-2 pb-1 mt-2 flex items-center gap-2 text-xs text-gray-500 border-t border-gray-100 z-10">
                    <svg xmlns="http://www.w3.org/2000/svg" className="h-4 w-4 text-blue-500 flex-shrink-0" viewBox="0 0 20 20" fill="currentColor">
                      <path fillRule="evenodd" d="M18 10a8 8 0 11-16 0 8 8 0 0116 0zm-7-4a1 1 0 11-2 0 1 1 0 012 0zM9 9a1 1 0 000 2v3a1 1 0 001 1h1a1 1 0 100-2v-3a1 1 0 00-1-1H9z" clipRule="evenodd" />
                    </svg>
                    <span>Neue Vorlagen können in den Einstellungen erstellt werden.</span>
                  </div>
                </div>
              )}

              {/* AI Suggestions Content */}
              {activeTab === 'ki' && (
                <div>
                  {/* <h3 className="text-lg font-medium text-gray-700 mb-3">KI-Vorschläge</h3> */} {/* Title removed as it's in the tab */}
                  {/* Removed max-h and overflow-y from here */}
                  <div className="space-y-3 pr-2">
                    {mockKIVorschlaege.map((vorschlag, index) => (
                      <div
                        key={index}
                        className={`border rounded-lg p-4 cursor-pointer transition-all duration-150 ${selectedSource?.type === 'ki' && selectedSource.text === vorschlag ? 'bg-primary/15 border-gray-200' : 'border-gray-200 hover:border-gray-300 hover:bg-gray-50'}`}
                        onClick={() => handleSelect('ki', vorschlag)}
                      >
                        <div className="flex items-center gap-2 mb-1.5">
                          <svg
                            className="w-4 h-4 text-blue-500 flex-shrink-0"
                            fill="none"
                            stroke="currentColor"
                            viewBox="0 0 24 24"
                          >
                            <path
                              strokeLinecap="round"
                              strokeLinejoin="round"
                              strokeWidth={2}
                              d="M9.663 17h4.673M12 3v1m6.364 1.636l-.707.707M21 12h-1M4 12H3m3.343-5.657l-.707-.707m2.828 9.9a5 5 0 117.072 0l-.548.547A3.374 3.374 0 0014 18.469V19a2 2 0 11-4 0v-.531c0-.895-.356-1.754-.988-2.386l-.548-.547z"
                            />
                          </svg>
                          <span className="font-medium text-gray-800 text-sm">KI-Vorschlag {index + 1}</span>
                        </div>
                        <p className="text-sm text-gray-600">{vorschlag}</p>
                      </div>
                    ))}
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Right Column: Review & Customization */}
          <div className="flex flex-col space-y-6 max-h-[60vh] overflow-y-auto">
            {/* Current Review */}
            <div>
              <h3 className="text-lg font-medium text-gray-700 mb-2">Aktuelle Bewertung</h3>
              <div className="border border-gray-200 rounded-lg p-4 bg-gray-50/50">
                <div className="flex items-center mb-2">
                  {[...Array(5)].map((_, index) => (
                    <svg
                      key={index}
                      className={`w-5 h-5 ${index < bewertung.sterne ? 'text-yellow-400' : 'text-gray-300'}`}
                      fill="currentColor"
                      viewBox="0 0 20 20"
                    >
                      <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                    </svg>
                  ))}
                  <span className="ml-2 text-sm text-gray-600">({bewertung.sterne} / 5 Sterne)</span>
                </div>
                <p className="text-sm text-gray-700 leading-relaxed max-h-28 overflow-y-auto pr-1">{bewertung.text}</p>
              </div>
            </div>

            {/* Customize Response */}
            <div className="flex-grow flex flex-col">
              <h3 className="text-lg font-medium text-gray-700 mb-3">Antwort personalisieren</h3>
              <textarea
                className="w-full p-4 border border-gray-300 rounded-lg focus:ring-2 focus:ring-primary/50 focus:border-primary transition duration-150 text-sm resize-none min-h-[100px] max-h-[200px]"
                value={customizedText}
                onChange={(e) => setCustomizedText(e.target.value)}
                placeholder="Wählen Sie eine Vorlage oder einen KI-Vorschlag aus oder schreiben Sie Ihre eigene Antwort..."
              />
            </div>
          </div>
        </div>

        {/* Footer Actions */}
        <div className="mt-4 pt-4 pb-2 border-t border-gray-200 flex justify-end space-x-3 sticky bottom-0 bg-white z-20" style={{marginBottom:'16px'}}>
          <button
            className="px-5 py-2.5 border border-gray-300 rounded-lg text-sm font-medium text-gray-700 hover:bg-gray-50 transition-colors"
            onClick={onClose}
          >
            Abbrechen
          </button>
          <button
            className={`relative px-5 py-2.5 rounded-lg text-sm font-medium transition-all duration-200 ease-in-out overflow-hidden ${isCopied
                ? 'bg-green-500 text-white'
                : 'bg-primary text-white hover:bg-primary/90 disabled:opacity-50 disabled:cursor-not-allowed'
              }`}
            onClick={handleCopy}
            disabled={!customizedText.trim() || isCopied} // Disable if text is empty or already copied
          >
            <span className={`transition-opacity duration-200 ${isCopied ? 'opacity-0' : 'opacity-100'}`}>Antwort kopieren</span>
            <span
              className={`absolute inset-0 flex items-center justify-center transition-opacity duration-200 ${isCopied ? 'opacity-100' : 'opacity-0'}`}> 
              <svg xmlns="http://www.w3.org/2000/svg" className="h-5 w-5 mr-1.5" viewBox="0 0 20 20" fill="currentColor">
                <path fillRule="evenodd" d="M16.707 5.293a1 1 0 010 1.414l-8 8a1 1 0 01-1.414 0l-4-4a1 1 0 011.414-1.414L8 12.586l7.293-7.293a1 1 0 011.414 0z" clipRule="evenodd" />
              </svg>
              Kopiert!
            </span>
          </button>
        </div>
      </div>
    </div>
  );
};

export default AntwortTemplatesPopup;