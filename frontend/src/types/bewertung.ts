export interface Bewertung {
  id: number;
  plattform: 'Google' | 'Trustpilot';
  sterne: number;
  text: string;
  autor: string;
  datum: Date;
  antwort?: string;
  bewertungsUrl: string;
  kategorie?: string;
  kiAnalyse?: string;
} 