// Equipment Types
export interface Equipment {
  id: string;
  equipmentNumber: string;
  description: string;
  category: number; // Used for photo requirements: <1000, 1000-1999, >=2000
  class: string; // Equipment class identifier
  type: 'pickup' | 'delivery';
  branchCode: string;
  needByTime: string;
  imageUrl: string;
  hasConditionReport: boolean;
  meter: number;
}

// Photo Upload Types
export interface PhotoUpload {
  id: string;
  filename: string;
  base64Data: string;
  uploaded: boolean;
}

// Damage Report Types
export interface DamageReport {
  structuralBodyDamage: boolean;
  componentAttachmentDamage: boolean;
  tireTrackDamage: boolean;
  overallConditionNotAcceptable: boolean;
  comment: string;
}

// Condition Report Types
export interface ConditionReport {
  id: string;
  equipmentNumber: string;
  hourMeterReading: number;
  photos: PhotoUpload[];
  damageReport?: DamageReport;
  submittedAt: Date;
}

// User Types
export interface User {
  id: string;
  username: string;
  branchCode: string;
}

// Branch Types
export interface Branch {
  code: string;
  name: string;
  location: string;
}

// Navigation Types
export interface NavigationItem {
  id: string;
  label: string;
  icon: string;
  path: string;
}

// Settings Types
export type Theme = 'light' | 'dark';
export type Language = 'en' | 'es' | 'de';

export interface AppSettings {
  theme: Theme;
  language: Language;
}

// Dialog Types
export type DialogType = 'sync' | 'helpdesk' | 'options' | 'language' | 'about';

// Home Card Types
export interface HomeCardData {
  id: string;
  icon: string;
  count: number;
  title: string;
  description: string;
  navigationPath: string;
}

// Equipment Filter Types
export type EquipmentType = 'pickup' | 'delivery' | 'all';

// Photo Layout Types
export type PhotoLayoutType = 'vertical' | 'grid' | 'list';

// Success Page Types
export interface SuccessData {
  equipmentNumber: string;
  submittedAt: Date;
  reportId: string;
}