import React, { useState } from 'react';
import { 
  GraduationCap, 
  Calendar, 
  Users, 
  CheckCircle, 
  Clock, 
  FileCheck,
  Search,
  Plus,
  BookOpen,
  Trophy,
  ArrowRight
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, SectionHeader, LevelBadge } from './UIComponents';

interface Session {
  id: string;
  level: string;
  examDate: string;
  studentsCount: number;
  successRate: number;
  status: 'En cours' | 'Clôturé' | 'Planifié';
  type: 'B1 Zertifikat' | 'B2 TestDaF' | 'C1 Goethe';
}

const mockSessions: Session[] = [
  { id: 'v1', level: 'B1', examDate: '15 Mai 2025', studentsCount: 12, successRate: 92, status: 'En cours', type: 'B1 Zertifikat' },
  { id: 'v2', level: 'B2', examDate: '20 Juin 2025', studentsCount: 8, successRate: 0, status: 'Planifié', type: 'B2 TestDaF' },
  { id: 'v3', level: 'C1', examDate: '05 Avril 2025', studentsCount: 5, successRate: 100, status: 'Clôturé', type: 'C1 Goethe' },
];

export function VorbereitungView() {
  const [searchTerm, setSearchTerm] = useState('');

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1600px] mx-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-[28px] md:text-[32px] font-black text-text-primary tracking-tighter uppercase mb-2">Vorbereitung & Examens</h1>
          <p className="text-text-secondary font-medium text-[14px]">Préparation intensive et suivi des sessions de certification</p>
        </div>
        <button 
          className="px-8 py-4 bg-orange text-white font-black rounded-2xl shadow-xl shadow-orange/20 flex items-center justify-center gap-3 uppercase tracking-widest text-[11px] hover:scale-[1.02] transition-all active:scale-95"
        >
           Ouvrir une session <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* STATS RAPIDES */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-premium p-6 flex items-center gap-6">
          <div className="w-14 h-14 bg-orange/10 text-orange rounded-2xl flex items-center justify-center">
             <Trophy className="w-8 h-8" />
          </div>
          <div>
            <p className="text-2xl font-black text-text-primary">94%</p>
            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Taux de réussite global</p>
          </div>
        </div>
        <div className="card-premium p-6 flex items-center gap-6">
          <div className="w-14 h-14 bg-action/10 text-action rounded-2xl flex items-center justify-center">
             <Users className="w-8 h-8" />
          </div>
          <div>
            <p className="text-2xl font-black text-text-primary">25</p>
            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Apprenants en préparation</p>
          </div>
        </div>
        <div className="card-premium p-6 flex items-center gap-6">
          <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center">
             <FileCheck className="w-8 h-8" />
          </div>
          <div>
            <p className="text-2xl font-black text-text-primary">12</p>
            <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Inscriptions confirmées</p>
          </div>
        </div>
      </div>

      {/* SESSIONS LIST */}
      <div className="card-premium p-8">
        <div className="flex items-center justify-between mb-8">
           <SectionHeader title="Sessions de préparation actives" subtitle="Suivi des groupes par niveau de certification" />
           <div className="relative group overflow-hidden rounded-2xl border border-border-main">
              <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
              <input 
                type="text" 
                placeholder="Filtrer les sessions..." 
                className="pl-12 pr-4 py-2.5 bg-bg-tertiary outline-none text-xs font-bold w-64"
              />
           </div>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-8">
          {mockSessions.map((session) => (
            <div key={session.id} className="group relative bg-bg-tertiary border border-border-main rounded-[32px] p-8 hover:border-orange transition-all overflow-hidden flex flex-col justify-between">
              <div className="absolute top-0 right-0 w-24 h-24 bg-orange/5 blur-2xl group-hover:bg-orange/20 transition-all"></div>
              
              <div>
                <div className="flex items-center justify-between mb-6">
                  <LevelBadge level={session.level} />
                  <span className={cn(
                    "text-[9px] px-2 py-0.5 rounded-full font-black uppercase tracking-widest border",
                    session.status === 'En cours' ? "bg-orange/10 text-orange border-orange/20" : 
                    session.status === 'Clôturé' ? "bg-emerald-500/10 text-emerald-500 border-emerald-500/20" : "bg-bg-secondary text-text-muted border-border-main"
                  )}>
                    {session.status}
                  </span>
                </div>

                <h3 className="text-xl font-black text-text-primary uppercase tracking-tighter mb-2">{session.type}</h3>
                <div className="flex items-center gap-2 text-text-muted text-[11px] font-bold mb-8">
                   <Calendar className="w-3.5 h-3.5" />
                   Examen le {session.examDate}
                </div>

                <div className="space-y-4 mb-8">
                   <div className="flex justify-between items-center">
                      <div className="flex items-center gap-2">
                         <div className="w-2 h-2 rounded-full bg-orange"></div>
                         <span className="text-[11px] font-black uppercase tracking-widest text-text-muted">Progression</span>
                      </div>
                      <span className="text-[12px] font-black text-text-primary">85%</span>
                   </div>
                   <div className="h-1.5 w-full bg-bg-secondary rounded-full overflow-hidden">
                      <div className="h-full bg-orange rounded-full" style={{ width: '85%' }}></div>
                   </div>
                </div>
              </div>

              <div className="pt-6 border-t border-border-main/50 flex items-center justify-between">
                 <div>
                    <p className="text-[14px] font-black text-text-primary">{session.studentsCount}</p>
                    <p className="text-[9px] text-text-muted font-bold uppercase tracking-widest">Inscrits</p>
                 </div>
                 <button className="w-10 h-10 bg-bg-secondary border border-border-main rounded-xl flex items-center justify-center text-text-muted group-hover:bg-orange group-hover:text-white transition-all shadow-sm">
                   <ArrowRight className="w-5 h-5" />
                 </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </div>
  );
}
