/**
 * TYPES FOR MERSGESTION
 */

export type GermanLevel = 'A1' | 'A2' | 'B1' | 'B2' | 'C1';

export type ExamType = 'Goethe-Institut' | 'ECL' | 'OSD' | 'TELC';

export type PaymentStatus = 'Réglé' | 'En cours' | 'En retard';

export interface Sortie {
  id: string;
  amount: number;
  reason: string;
  date: string;
}

export interface Center {
  id: string;
  name: string;
  location: string;
  managerName: string;
  email: string;
  phone: string;
  studentCount: number;
  totalRevenue: number;
  sorties?: Sortie[];
}

export interface PaymentTranche {
  id: string;
  amount: number;
  dueDate: string;
  paidDate?: string;
  isPaid: boolean;
}

export interface Student {
  id: string;
  centerId: string;
  name: string;
  birthDate: string;
  email: string;
  phone: string;
  currentLevel: GermanLevel;
  registrationDate: string;
  paymentStatus: PaymentStatus;
  totalDue: number;
  totalPaid: number;
  tranches: PaymentTranche[];
  isVorbereitung: boolean;
  targetExam?: ExamType;
  levelHistory: {
    level: GermanLevel;
    startDate: string;
    endDate?: string;
  }[];
}

export interface DashboardStats {
  totalCenters: number;
  totalStudents: number;
  totalRevenue: number;
  totalDue: number;
  activeAlerts: number;
  studentsByLevel: Record<GermanLevel, number>;
}
