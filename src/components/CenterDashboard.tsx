import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  Clock, 
  Bell, 
  GraduationCap,
  Plus,
  ShieldCheck,
  ChevronRight,
  ChevronDown,
  ArrowUpRight,
  Wallet,
  X,
  BookOpen,
  Calendar,
  CreditCard,
  MinusCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, KpiCard, LevelBadge, PaymentStatusBadge, SectionHeader, formatCurrency } from './UIComponents';
import { 
  AreaChart, 
  Area, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  PieChart,
  Pie,
  Cell,
  BarChart,
  Bar,
  ComposedChart
} from 'recharts';
import { 
  mockDashboardStats, 
  enrollmentEvolution, 
  mockStudents,
  mockCenters,
  caByCenter 
} from '../mockData';

export function CenterDashboard() {
  const [isEnrollModalOpen, setIsEnrollModalOpen] = useState(false);
  
  const centerId = 'c1'; // Mers Jouvence
  const centerStudents = mockStudents.filter(s => s.centerId === centerId);
  const center = mockCenters.find(c => c.id === centerId) || mockCenters[0];
  const centerData = caByCenter.find(c => c.name.toLowerCase().includes('jouvence')) || caByCenter[0];
  
  const stats = {
    students: centerStudents.length,
    revenue: centerStudents.reduce((acc, s) => acc + s.totalPaid, 0),
    due: centerStudents.reduce((acc, s) => acc + (s.totalDue - s.totalPaid), 0),
    alerts: centerStudents.filter(s => s.paymentStatus === 'En retard').length
  };

  const levelColors: Record<string, string> = {
    A1: '#1A56DB', A2: '#3730A3', B1: '#92400E', B2: '#78350F', C1: '#9D174D'
  };

  const levelRepartition = [
    { name: 'A1', value: 5 },
    { name: 'A2', value: 8 },
    { name: 'B1', value: 12 },
    { name: 'B2', value: 7 },
    { name: 'C1', value: 3 },
  ];

  const paymentByLevel = [
    { level: 'A1', paid: 600000, due: 200000 },
    { level: 'A2', paid: 840000, due: 150000 },
    { level: 'B1', paid: 1200000, due: 300000 },
    { level: 'B2', paid: 1500000, due: 400000 },
    { level: 'C1', paid: 450000, due: 100000 },
  ];

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-black text-text-primary tracking-tighter uppercase italic">Cockpit : Mers Jouvence</h1>
          <p className="text-[14px] text-text-secondary mt-1 font-medium italic">Rapport global d'activité et suivi des performances</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex items-center gap-2 bg-action text-white px-6 py-4 rounded-2xl text-[11px] font-black uppercase tracking-widest shadow-xl shadow-action/20 hover:scale-[1.02] transition-all active:scale-95">
            <Plus className="w-5 h-5" />
            Inscrire étudiant
          </button>
        </div>
      </div>

      <div className="space-y-8">
        {/* LIGNE 1: 4 KPI CARDS */}
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <KpiCard label="Mes étudiants" value={stats.students} icon={Users} colorClass="border-l-action" />
          <KpiCard label="Montant Encaissé" value={formatCurrency(stats.revenue)} icon={TrendingUp} colorClass="border-l-success" />
          <KpiCard label="Encours Clients" value={formatCurrency(stats.due)} icon={Clock} colorClass="border-l-warning" />
          <KpiCard label="Alertes/Retards" value={stats.alerts} icon={Bell} colorClass="border-l-danger" />
        </div>

        {/* CHARTS SECTION */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
          <div className="lg:col-span-12 xl:col-span-5 card-premium p-8 h-[450px] flex flex-col items-center justify-center">
            <SectionHeader title="Répartition par niveau" />
            <div className="flex-1 flex flex-col sm:flex-row items-center gap-8 justify-center">
              <div className="w-56 h-56 relative shrink-0">
                <ResponsiveContainer width="100%" height="100%">
                  <PieChart>
                    <Pie 
                      data={levelRepartition} 
                      innerRadius={65} 
                      outerRadius={95} 
                      paddingAngle={5} 
                      dataKey="value"
                    >
                      {levelRepartition.map((e, i) => <Cell key={i} fill={levelColors[e.name]} stroke="transparent" />)}
                    </Pie>
                    <Tooltip contentStyle={{ backgroundColor: 'var(--bg-secondary)', border: '1px solid var(--border-main)', borderRadius: '12px', fontWeight: '700' }} />
                  </PieChart>
                </ResponsiveContainer>
                <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-8 text-center">
                  <span className="text-[32px] font-black text-text-primary leading-none">{centerStudents.length}</span>
                  <span className="text-[9px] text-text-muted font-black uppercase tracking-[0.2em] mt-1">Élèves</span>
                </div>
              </div>
              <div className="space-y-2">
                {levelRepartition.map(e => (
                  <div key={e.name} className="flex items-center gap-3">
                    <span className={cn("badge h-8 w-12 flex items-center justify-center font-black", LevelBadge({ level: e.name }).props.className)}>{e.name}</span>
                    <span className="text-[14px] font-black text-text-primary">{e.value}</span>
                  </div>
                ))}
              </div>
            </div>
          </div>

          <div className="lg:col-span-12 xl:col-span-7 card-premium p-8">
            <SectionHeader title="État de recouvrement" subtitle="Payé vs Reste à payer par niveau" />
            <div className="h-[320px] mt-6">
               <ResponsiveContainer width="100%" height="100%">
                  <BarChart layout="vertical" data={paymentByLevel} margin={{ left: 20 }}>
                    <CartesianGrid strokeDasharray="3 3" horizontal={false} stroke="var(--border-main)" opacity={0.5} />
                    <XAxis type="number" hide />
                    <YAxis dataKey="level" type="category" axisLine={false} tickLine={false} tick={{ fontSize: 13, fontWeight: 800, fill: 'var(--text-primary)' }} />
                    <Tooltip formatter={(val: number) => formatCurrency(val)} contentStyle={{ backgroundColor: 'var(--bg-secondary)', borderRadius: '12px', border: '1px solid var(--border-main)' }} />
                    <Bar dataKey="paid" stackId="a" fill="#0E9F6E" radius={[0, 0, 0, 0]} name="Recouvré" />
                    <Bar dataKey="due" stackId="a" fill="var(--border-main)" radius={[0, 6, 6, 0]} name="À recouvrer" />
                  </BarChart>
               </ResponsiveContainer>
            </div>
          </div>
        </div>

        {/* RECENT STUDENTS */}
        <div className="card-premium overflow-hidden">
          <div className="px-8 py-6 border-b border-border-main flex items-center justify-between">
            <SectionHeader title="Dernières Inscriptions" subtitle="Apprenants inscrits au centre Jouvence" />
            <button className="text-[11px] font-black text-action uppercase tracking-widest hover:underline transition-all">Tous mes étudiants</button>
          </div>
          <div className="overflow-x-auto">
            <table className="w-full text-left">
              <thead className="bg-bg-tertiary">
                <tr>
                  <th className="px-8 py-4 text-[10px] font-black uppercase text-text-muted tracking-widest">Apprenant</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase text-text-muted tracking-widest text-right">Réglé</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase text-text-muted tracking-widest">Statut</th>
                  <th className="px-8 py-4 text-[10px] font-black uppercase text-text-muted tracking-widest">Date Insc.</th>
                </tr>
              </thead>
              <tbody className="divide-y divide-border-main">
                {centerStudents.slice(0, 5).map((s) => (
                  <tr key={s.id} className="hover:bg-bg-tertiary transition-colors group">
                    <td className="px-8 py-4">
                       <div className="flex items-center gap-3">
                          <div className="w-9 h-9 rounded-xl bg-action/10 flex items-center justify-center text-action font-black text-[11px] border border-action/20 uppercase italic">
                             {s.name.substring(0, 2)}
                          </div>
                          <span className="text-[13px] font-black text-text-primary uppercase tracking-tight">{s.name}</span>
                       </div>
                    </td>
                    <td className="px-8 py-4 text-[14px] font-black text-emerald-500 text-right">{formatCurrency(s.totalPaid)}</td>
                    <td className="px-8 py-4"><PaymentStatusBadge status={s.paymentStatus} /></td>
                    <td className="px-8 py-4 text-[12px] font-bold text-text-muted">{s.registrationDate}</td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>
        </div>
      </div>
    </div>
  );
}
