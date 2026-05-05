import { Center, Student, DashboardStats } from './types';

export const mockCenters: Center[] = [
  { id: 'c1', name: 'Mers Jouvence', location: 'Yaoundé', managerName: 'Michel Tagne', email: 'jouvence@mersgestion.com', phone: '+237 699 00 11 22', studentCount: 145, totalRevenue: 12450000, sorties: [
    { id: 'exp1', amount: 45000, reason: 'Réparation climatisation', date: '01/05/2026' },
    { id: 'exp2', amount: 12000, reason: 'Achat fournitures bureau', date: '03/05/2026' },
    { id: 'exp3', amount: 25000, reason: 'Transport documents', date: '05/05/2026' },
  ]},
  { id: 'c2', name: 'Mers Stinga', location: 'Yaoundé', managerName: 'Carine Ngono', email: 'stinga@mersgestion.com', phone: '+237 677 33 44 55', studentCount: 112, totalRevenue: 9800000, sorties: [
    { id: 'exp4', amount: 30000, reason: 'Abonnement internet', date: '02/05/2026' },
    { id: 'exp5', amount: 15000, reason: 'Produits entretien', date: '04/05/2026' },
  ]},
  { id: 'c3', name: 'Mers Damas', location: 'Yaoundé', managerName: 'Fabrice Ndoumé', email: 'damas@mersgestion.com', phone: '+237 655 66 77 88', studentCount: 85, totalRevenue: 7200000, sorties: [
    { id: 'exp6', amount: 20000, reason: 'Maintenance informatique', date: '01/05/2026' },
  ]},
  { id: 'c4', name: 'Mers Bafoussam', location: 'Bafoussam', managerName: 'Pascal Kamga', email: 'bafoussam@mersgestion.com', phone: '+237 622 99 88 77', studentCount: 60, totalRevenue: 4500000, sorties: []},
  { id: 'c5', name: 'Mers Akwa', location: 'Douala', managerName: 'Samuel Douala', email: 'akwa@mersgestion.com', phone: '+237 600 11 22 33', studentCount: 40, totalRevenue: 3200000, sorties: []},
];

export const mockStudents: Student[] = [
  {
    id: 's1',
    centerId: 'c1',
    name: 'JOSEPH ABENA',
    birthDate: '1998-05-20',
    email: 'joseph.abena@gmail.com',
    phone: '+237 699 12 34 56',
    currentLevel: 'B1',
    registrationDate: '10/01/2025',
    paymentStatus: 'En cours',
    totalDue: 150000,
    totalPaid: 90000,
    isVorbereitung: true,
    targetExam: 'Goethe-Institut',
    tranches: [
      { id: 't1', amount: 60000, dueDate: '10/01/2025', paidDate: '10/01/2025', isPaid: true },
      { id: 't2', amount: 30000, dueDate: '10/02/2025', paidDate: '12/02/2025', isPaid: true },
      { id: 't3', amount: 60000, dueDate: '10/03/2025', isPaid: false },
    ],
    levelHistory: [
      { level: 'A1', startDate: '01/09/2024', endDate: '01/11/2024' },
      { level: 'A2', startDate: '01/11/2024', endDate: '10/01/2025' },
      { level: 'B1', startDate: '10/01/2025' },
    ],
  },
  {
    id: 's2',
    centerId: 'c1',
    name: 'CLAIRE NGO MBOCK',
    birthDate: '2001-11-12',
    email: 'claire.ngombock@outlook.com',
    phone: '+237 678 99 88 77',
    currentLevel: 'A2',
    registrationDate: '01/02/2025',
    paymentStatus: 'Réglé',
    totalDue: 120000,
    totalPaid: 120000,
    isVorbereitung: false,
    tranches: [ { id: 't4', amount: 120000, dueDate: '01/02/2025', paidDate: '01/02/2025', isPaid: true } ],
    levelHistory: [ { level: 'A2', startDate: '01/02/2025' } ],
  },
  {
    id: 's3',
    centerId: 'c3',
    name: 'PAULIN FOTSO',
    birthDate: '1995-03-15',
    email: 'paulin.fotso@gmail.com',
    phone: '+237 655 55 44 33',
    currentLevel: 'B2',
    registrationDate: '15/01/2025',
    paymentStatus: 'En retard',
    totalDue: 180000,
    totalPaid: 60000,
    isVorbereitung: true,
    targetExam: 'TELC',
    tranches: [
      { id: 't5', amount: 60000, dueDate: '15/01/2025', paidDate: '15/01/2025', isPaid: true },
      { id: 't6', amount: 120000, dueDate: '15/02/2025', isPaid: false },
    ],
    levelHistory: [ { level: 'B2', startDate: '15/01/2025' } ],
  },
  {
    id: 's4',
    centerId: 'c4',
    name: 'EMMANUEL KAMDEM',
    birthDate: '1999-07-07',
    email: 'e.kamdem@gmail.com',
    phone: '+237 677 88 99 00',
    currentLevel: 'A1',
    registrationDate: '01/03/2025',
    paymentStatus: 'En cours',
    totalDue: 120000,
    totalPaid: 40000,
    isVorbereitung: false,
    tranches: [
      { id: 't7', amount: 40000, dueDate: '01/03/2025', paidDate: '01/03/2025', isPaid: true },
      { id: 't8', amount: 80000, dueDate: '01/04/2025', isPaid: false },
    ],
    levelHistory: [ { level: 'A1', startDate: '01/03/2025' } ],
  }
];

export const mockDashboardStats: DashboardStats = {
  totalCenters: 5,
  totalStudents: 342,
  totalRevenue: 18450000,
  totalDue: 3200000,
  activeAlerts: 7,
  studentsByLevel: { A1: 85, A2: 65, B1: 72, B2: 45, C1: 15 },
};

export const enrollmentEvolution = [
  { month: 'Jan', current: 145, previous: 138 },
  { month: 'Fév', current: 152, previous: 142 },
  { month: 'Mar', current: 261, previous: 250 },
  { month: 'Avr', current: 312, previous: 255 },
  { month: 'Mai', current: 330, previous: 310 },
  { month: 'Juin', current: 342, previous: 320 },
];

export const caByCenter = [
  { 
    id: 'c1',
    name: 'Jouvence', 
    encaissé: 12450000, 
    créances: 1200000, 
    rooms: [
      { name: 'Salle A', status: 'Active', classes: 5, load: 95 },
      { name: 'Salle B', status: 'Active', classes: 4, load: 82 },
      { name: 'Salle C', status: 'Optimisation', classes: 2, load: 45 }
    ],
    activeClasses: [
      { level: 'B1', name: 'B1-Intensif', students: 22 },
      { level: 'A2', name: 'A2-Matin', students: 18 }
    ]
  },
  { 
    id: 'c2',
    name: 'Stinga', 
    encaissé: 9800000, 
    créances: 850000,
    rooms: [
      { name: 'Amphi-1', status: 'Active', classes: 6, load: 98 },
      { name: 'Salle-Labo', status: 'Maintenance', classes: 0, load: 0 }
    ],
    activeClasses: [
      { level: 'A1', name: 'A1-Déjàvu', students: 25 },
      { level: 'B2', name: 'B2-Focus', students: 15 }
    ]
  },
  { 
    id: 'c3',
    name: 'Damas', 
    encaissé: 7200000, 
    créances: 500000,
    rooms: [
      { name: 'Salle-Nord', status: 'Active', classes: 3, load: 75 },
      { name: 'Salle-Sud', status: 'Active', classes: 4, load: 88 }
    ],
    activeClasses: [
      { level: 'A2', name: 'A2-Standard', students: 20 },
      { level: 'B1', name: 'B1-Soir', students: 12 }
    ]
  },
  { 
    id: 'c4',
    name: 'Bafoussam', 
    encaissé: 4500000, 
    créances: 400000,
    rooms: [
      { name: 'Salle-Kamga', status: 'Active', classes: 4, load: 90 }
    ],
    activeClasses: [
      { level: 'A1', name: 'A1-Express', students: 30 }
    ]
  },
  { 
    id: 'c5',
    name: 'Akwa', 
    encaissé: 3200000, 
    créances: 250000,
    rooms: [
      { name: 'Sawa-Room', status: 'Active', classes: 2, load: 65 }
    ],
    activeClasses: [
      { level: 'B1', name: 'B1-Akwa', students: 15 }
    ]
  },
];
