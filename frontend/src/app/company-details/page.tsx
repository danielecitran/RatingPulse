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

  useEffect(() => {
    // Prüfen ob der Benutzer eingeloggt ist
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');

    try {
      const token = document.cookie.split('; ').find(row => row.startsWith('token='))?.split('=')[1];
      
      const response = await fetch('http://localhost:8080/api/users/company-details', {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          'Authorization': `Bearer ${token}`,
        },
        body: JSON.stringify(formData),
      });

      if (!response.ok) {
        throw new Error('Speichern der Unternehmensinformationen fehlgeschlagen');
      }

      router.push('/dashboard');
    } catch (err) {
      setError('Fehler beim Speichern der Unternehmensinformationen. Bitte versuchen Sie es erneut.');
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
              Straße und Hausnummer
            </label>
            <input
              id="street"
              type="text"
              required
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
              required
              pattern="[0-9]{5}"
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
              required
              className="w-full px-3 py-2 border rounded-lg focus:outline-none focus:ring-2 focus:ring-primary"
              value={formData.city}
              onChange={(e) => setFormData({ ...formData, city: e.target.value })}
            />
          </div>

          <div>
            <label htmlFor="website" className="block text-sm font-medium mb-1">
              Website (optional)
            </label>
            <input
              id="website"
              type="url"
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