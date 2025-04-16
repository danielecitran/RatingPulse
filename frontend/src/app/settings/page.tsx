'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import Einstellungen from '@/components/Einstellungen';

export default function SettingsPage() {
  const router = useRouter();

  useEffect(() => {
    // Prüfen ob der Benutzer eingeloggt ist
    const token = document.cookie.split('; ').find(row => row.startsWith('token='));
    if (!token) {
      router.push('/login');
    }
  }, [router]);

  return (
    <div className="min-h-screen bg-gray-50 py-8">
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <Einstellungen />
      </div>
    </div>
  );
}