import Link from 'next/link';

export default function Home() {
  return (
    <div className="min-h-screen">
      {/* Titel Sektion */}
      <section className="bg-gradient-to-b from-primary/5 to-background py-20">
        <div className="container mx-auto px-4">
          <div className="max-w-3xl mx-auto text-center">
            <h1 className="text-4xl md:text-6xl font-bold mb-6">
              Verstehen Sie Ihre Kundenbewertungen mit Künstlicher Intelligenz
            </h1>
            <p className="text-xl text-muted-foreground mb-8">
              RatingPulse analysiert automatisch Ihre Kundenbewertungen von Google und Trustpilot. 
              Erhalten Sie wertvolle Einblicke und verbessern Sie Ihre Kundenbeziehungen.
            </p>
            <div className="flex gap-4 justify-center">
              <Link 
                href="/register" 
                className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors"
              >
                Jetzt kostenlos testen
              </Link>
              <Link 
                href="/login" 
                className="border border-input bg-background px-8 py-3 rounded-lg font-medium hover:bg-accent transition-colors"
              >
                Anmelden
              </Link>
            </div>
          </div>
        </div>
      </section>

      {/* Features Sektion */}
      <section className="py-20">
        <div className="container mx-auto px-4">
          <h2 className="text-3xl font-bold text-center mb-12">Warum RatingPulse?</h2>
          <div className="grid md:grid-cols-3 gap-8">
            <div className="p-6 bg-card rounded-lg border shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M9 19v-6a2 2 0 00-2-2H5a2 2 0 00-2 2v6a2 2 0 002 2h2a2 2 0 002-2zm0 0V9a2 2 0 012-2h2a2 2 0 012 2v10m-6 0a2 2 0 002 2h2a2 2 0 002-2m0 0V5a2 2 0 012-2h2a2 2 0 012 2v14a2 2 0 01-2 2h-2a2 2 0 01-2-2z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">KI-gestützte Analyse</h3>
              <p className="text-muted-foreground">
                Automatische Sentiment-Analyse und Zusammenfassungen Ihrer Kundenbewertungen mit Künstlicher Intelligenz.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M13 10V3L4 14h7v7l9-11h-7z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">Echtzeit-Updates</h3>
              <p className="text-muted-foreground">
                Automatische Synchronisation mit Google Reviews und Trustpilot für aktuelle Bewertungen.
              </p>
            </div>
            <div className="p-6 bg-card rounded-lg border shadow-sm">
              <div className="w-12 h-12 bg-primary/10 rounded-lg flex items-center justify-center mb-4">
                <svg className="w-6 h-6 text-primary" fill="none" stroke="currentColor" viewBox="0 0 24 24">
                  <path strokeLinecap="round" strokeLinejoin="round" strokeWidth={2} d="M8 10h.01M12 10h.01M16 10h.01M9 16H5a2 2 0 01-2-2V6a2 2 0 012-2h14a2 2 0 012 2v8a2 2 0 01-2 2h-5l-5 5v-5z" />
                </svg>
              </div>
              <h3 className="text-xl font-semibold mb-2">KI-Chatbot</h3>
              <p className="text-muted-foreground">
                Stellen Sie spezifische Fragen zu Ihren Bewertungen und erhalten Sie sofortige Antworten.
              </p>
            </div>
          </div>
        </div>
      </section>

      {/* CTA Sektion */}
      <section className="bg-primary/5 py-20">
        <div className="container mx-auto px-4 text-center">
          <h2 className="text-3xl font-bold mb-4">Bereit, Ihre Kundschaft besser zu verbessern?</h2>
          <p className="text-xl text-muted-foreground mb-8">
            Starten Sie noch heute mit RatingPulse und gewinnen Sie wertvolle Einblicke in Ihre Kundenbewertungen.
          </p>
          <Link 
            href="/register" 
            className="bg-primary text-primary-foreground px-8 py-3 rounded-lg font-medium hover:bg-primary/90 transition-colors inline-block"
          >
            Kostenlos registrieren
          </Link>
        </div>
      </section>
    </div>
  );
}
