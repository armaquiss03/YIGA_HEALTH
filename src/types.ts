export interface Clinic {
  name: string;
  address: string;
  dist: string;
  tags: string[];
  hours: string;
  time: string;
  type: string[];
}

export interface HealthCard {
  id: string;
  title: string;
  emoji: string;
  desc: string;
  colorClass: string;
  content: string;
}

export type Page = 'home' | 'chat' | 'clinics' | 'learn' | 'apply';
export type Lang = 'en' | 'rw';

 export interface Application {
  id?: string;
  name: string;
  email: string;
  innovation: string;
  category: 'ASRH' | 'HIV' | 'Menstrual' | 'Mental';
  status: 'pending' | 'reviewed';
  timestamp: any;
} 
