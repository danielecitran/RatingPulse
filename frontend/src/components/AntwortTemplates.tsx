'use client';

import React, { useState } from 'react';

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

// Beispiel KI-Vorschläge basierend auf der Bewertung
const mockKIVorschlaege = [
  'Danke für Ihre ausführliche Bewertung. Wir freuen uns, dass Sie die Qualität unseres Produkts schätzen. Ihre Anmerkungen zur Lieferzeit nehmen wir ernst und arbeiten an Verbesserungen.',
  'Wir verstehen Ihre Kritikpunkte und nehmen diese sehr ernst. Unser Team wird sich umgehend mit den angesprochenen Punkten befassen.',
  'Ihre Zufriedenheit ist uns wichtig. Wir würden uns freuen, wenn Sie uns unter [Kontakt] kontaktieren, um die Situation persönlich zu besprechen.',
];

const AntwortTemplates = () => {
  const [templates, setTemplates] = useState(initialTemplates);
  const [selectedTemplate, setSelectedTemplate] = useState('');
  const [customizedText, setCustomizedText] = useState('');
  const [showForm, setShowForm] = useState(false);
  const [newTemplate, setNewTemplate] = useState({
    name: '',
    text: '',
    kategorie: 'Positiv',
  });

  // Beispiel-Bewertung für KI-Vorschläge
  const beispielBewertung = {
    text: 'Das Produkt ist von guter Qualität, aber die Lieferung hat sehr lange gedauert.',
    sterne: 3,
  };

  const handleTemplateSelect = (text: string) => {
    setSelectedTemplate(text);
    setCustomizedText(text);
  };

  const handleSaveTemplate = () => {
    if (newTemplate.name && newTemplate.text) {
      setTemplates([
        ...templates,
        {
          id: templates.length + 1,
          ...newTemplate,
        },
      ]);
      setNewTemplate({ name: '', text: '', kategorie: 'Positiv' });
      setShowForm(false);
    }
  };

  return (
    <div className="bg-white p-6 rounded-lg shadow">
      <h2 className="text-2xl font-bold mb-6">Antwortvorlagen</h2>

      {/* Template-Auswahl */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div>
          <h3 className="text-lg font-semibold mb-4">Gespeicherte Vorlagen</h3>
          <div className="space-y-4">
            {templates.map((template) => (
              <div
                key={template.id}
                className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors"
                onClick={() => handleTemplateSelect(template.text)}
              >
                <div className="flex items-center justify-between mb-2">
                  <span className="font-medium">{template.name}</span>
                  <span className={`px-2 py-1 rounded text-sm ${
                    template.kategorie === 'Positiv' 
                      ? 'bg-green-100 text-green-800' 
                      : 'bg-red-100 text-red-800'
                  }`}>
                    {template.kategorie}
                  </span>
                </div>
                <p className="text-sm text-gray-600 line-clamp-2">{template.text}</p>
              </div>
            ))}
          </div>

          {/* Neues Template hinzufügen */}
          {!showForm ? (
            <button
              className="mt-4 text-primary hover:text-primary/90"
              onClick={() => setShowForm(true)}
            >
              + Neues Template erstellen
            </button>
          ) : (
            <div className="mt-4 border rounded-lg p-4">
              <h4 className="font-medium mb-3">Neues Template</h4>
              <input
                type="text"
                placeholder="Template Name"
                className="w-full p-2 border rounded mb-2"
                value={newTemplate.name}
                onChange={(e) => setNewTemplate({ ...newTemplate, name: e.target.value })}
              />
              <textarea
                placeholder="Template Text"
                className="w-full p-2 border rounded mb-2"
                rows={3}
                value={newTemplate.text}
                onChange={(e) => setNewTemplate({ ...newTemplate, text: e.target.value })}
              />
              <select
                className="w-full p-2 border rounded mb-3"
                value={newTemplate.kategorie}
                onChange={(e) => setNewTemplate({ ...newTemplate, kategorie: e.target.value })}
              >
                <option value="Positiv">Positiv</option>
                <option value="Negativ">Negativ</option>
              </select>
              <div className="flex space-x-2">
                <button
                  className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                  onClick={handleSaveTemplate}
                >
                  Speichern
                </button>
                <button
                  className="px-4 py-2 border rounded hover:bg-gray-50"
                  onClick={() => setShowForm(false)}
                >
                  Abbrechen
                </button>
              </div>
            </div>
          )}
        </div>

        <div>
          <div className="mb-6">
            <h3 className="text-lg font-semibold mb-2">Beispiel-Bewertung</h3>
            <div className="border rounded-lg p-4 bg-gray-50">
              <div className="flex items-center mb-2">
                {[...Array(5)].map((_, index) => (
                  <svg
                    key={index}
                    className={`w-5 h-5 ${
                      index < beispielBewertung.sterne ? 'text-yellow-400' : 'text-gray-300'
                    }`}
                    fill="currentColor"
                    viewBox="0 0 20 20"
                  >
                    <path d="M9.049 2.927c.3-.921 1.603-.921 1.902 0l1.07 3.292a1 1 0 00.95.69h3.462c.969 0 1.371 1.24.588 1.81l-2.8 2.034a1 1 0 00-.364 1.118l1.07 3.292c.3.921-.755 1.688-1.54 1.118l-2.8-2.034a1 1 0 00-1.175 0l-2.8 2.034c-.784.57-1.838-.197-1.539-1.118l1.07-3.292a1 1 0 00-.364-1.118L2.98 8.72c-.783-.57-.38-1.81.588-1.81h3.461a1 1 0 00.951-.69l1.07-3.292z" />
                  </svg>
                ))}
              </div>
              <p className="text-gray-600">{beispielBewertung.text}</p>
            </div>
          </div>

          <h3 className="text-lg font-semibold mb-4">KI-Vorschläge</h3>
          <div className="space-y-3">
            {mockKIVorschlaege.map((vorschlag, index) => (
              <div
                key={index}
                className="border rounded-lg p-4 cursor-pointer hover:border-primary transition-colors"
                onClick={() => handleTemplateSelect(vorschlag)}
              >
                <div className="flex items-center gap-2 mb-2">
                  <svg
                    className="w-5 h-5 text-blue-500"
                    fill="none"
                    stroke="currentColor"
                    viewBox="0 0 24 24"
                  >
                    <path
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth={2}
                      d="M13 10V3L4 14h7v7l9-11h-7z"
                    />
                  </svg>
                  <span className="font-medium">KI-Vorschlag {index + 1}</span>
                </div>
                <p className="text-sm text-gray-600">{vorschlag}</p>
              </div>
            ))}
          </div>

          <div className="mt-6">
            <h3 className="text-lg font-semibold mb-4">Antwort personalisieren</h3>
            <textarea
              className="w-full p-4 border rounded-lg"
              rows={6}
              value={customizedText}
              onChange={(e) => setCustomizedText(e.target.value)}
              placeholder="Wählen Sie ein Template oder KI-Vorschlag aus und passen Sie es hier an..."
            />
            <div className="flex justify-end mt-2">
              <button
                className="px-4 py-2 bg-primary text-white rounded hover:bg-primary/90"
                onClick={() => {
                  // Hier würde die Antwort verwendet werden
                  console.log('Antwort verwenden:', customizedText);
                }}
              >
                Antwort verwenden
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default AntwortTemplates; 