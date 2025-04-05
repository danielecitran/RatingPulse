'use client';

import { useSearchParams } from 'next/navigation';
import Link from 'next/link';

export default function AuthError() {
  const searchParams = useSearchParams();
  const error = searchParams.get('error');

  return (
    <div className="min-h-screen flex items-center justify-center bg-gray-50">
      <div className="max-w-md w-full space-y-8 p-8 bg-white rounded-lg shadow-md">
        <div className="text-center">
          <h2 className="text-3xl font-bold text-gray-900 mb-2">
            Authentifizierungsfehler
          </h2>
          <p className="text-gray-600 mb-4">
            {error === 'Configuration' 
              ? 'Es gibt ein Problem mit der Server-Konfiguration. Bitte versuchen Sie es später erneut.'
              : 'Bei der Anmeldung ist ein Fehler aufgetreten.'}
          </p>
          <Link
            href="/login"
            className="inline-flex items-center justify-center px-4 py-2 border border-transparent text-sm font-medium rounded-md text-white bg-primary hover:bg-primary/90 focus:outline-none focus:ring-2 focus:ring-offset-2 focus:ring-primary"
          >
            Zurück zum Login
          </Link>
        </div>
      </div>
    </div>
  );
} 