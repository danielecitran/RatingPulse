'use client';

import { useState, useEffect } from 'react';
import { useRouter } from 'next/navigation';

export default function CompanyDetailsPage() {
  const router = useRouter();
  const [formData, setFormData] = useState({
    street: '',
    postalCode: '',
    city: '',
    website: '',
  });
  const [error, setError] = useState('');

  // Funktion womit die URL formatiert wird
  const validateAndFormatUrl = (url: string) => {
    if (!url) return '';
    
    // Entferne Leerzeichen am Anfang und Ende
    url = url.trim();
    
    // Wenn die URL nicht mit http:// oder https:// beginnt, wird https:// am Anfang hinzugefügt
    if (!url.startsWith('http://') && !url.startsWith('https://')) {
      url = 'https://' + url;
    }
    
    return url;
  };

  useEffect(() => {
    // Prüfen ob schon ein Cookie beim Benutzer existiert
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    // Client-seitige Validierung
    if (!formData.street.trim()) {
      setError('Bitte geben Sie eine Strasse und Hausnummer ein');
      return;
    }

    if (!formData.postalCode.trim()) {
      setError('Bitte geben Sie eine Postleitzahl ein');
      return;
    }

    // Überprüfe, ob die Postleitzahl nur aus 4 oder 5 Ziffern besteht (-> CH/AT/DE)
    if (!/^\d{4,5}$/.test(formData.postalCode.trim())) {
      setError('Bitte geben Sie eine gültige Postleitzahl ein (4-5 Ziffern)');
      return;
    }

    if (!formData.city.trim()) {
      setError('Bitte geben Sie eine Stadt ein');
      return;
    }

    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      
      // Funktion womit die URL formatiert wird wird aufgerufen
      const formattedWebsite = validateAndFormatUrl(formData.website);
      
      const response = await fetch('http://localhost:8080/api/users/company-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify({
          ...formData,
          website: formattedWebsite,
        }),
      });

      if (!response.ok) {
        throw new Error('Beim Speichern der Unternehmensinformationen ist ein Fehler aufgetreten');
      }

      router.push('/dashboard');
    } catch (err) {
      setError('Beim Speichern der Unternehmensinformationen ist ein Fehler aufgetreten. Bitte versuchen Sie es erneut');
    }
  };

  return (
    <div className="min-h-screen flex items-center justify-center bg-background">
      <div className="w-full max-w-md p-8 space-y-6 bg-card rounded-lg border shadow-sm">
        <div className="text-center">
          <h1 className="text-2xl font-bold">Unternehmensinformationen</h1>
          <p className="text-muted-foreground mt-2">
            Bitte vervollständigen Sie Ihre Unternehmensinformationen
          </p>
        </div>

        <form onSubmit={handleSubmit} className="space-y-4">
          <div>
            <label htmlFor="street" className="block text-sm font-medium mb-1">
              Strasse und Hausnummer
            </label>
            <input
              id="street"
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.street}
              onChange={(e) => setFormData({ ...formData, street: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="postalCode" className="block text-sm font-medium mb-1">
              Postleitzahl
            </label>
            <input
              id="postalCode"
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.postalCode}
              onChange={(e) => setFormData({ ...formData, postalCode: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="city" className="block text-sm font-medium mb-1">
              Stadt
            </label>
            <input
              id="city"
              type="text"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium mb-1">
              Webseite (optional)
            </label>
            <input
              id="website"
              type="text"
              placeholder="example.com"
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.website}
              onChange={(e) => setFormData({ ...formData, website: e.target.value })}
            />
          </div>

          {error && (
            <div className="text-sm text-destructive">
              {error}
            </div>
          )}

          <button
            type="submit"
            className="w-full bg-primary text-primary-foreground py-2 rounded-lg font-medium hover:bg-primary/90 transition-colors"
          >
            Speichern
          </button>
        </form>
      </div>
    </div>
  );
}