import React, { useState } from 'react';
import { 
  Users, 
  Search, 
  Filter, 
  Download, 
  Plus, 
  MoreHorizontal, 
  Mail, 
  Phone, 
  MapPin, 
  GraduationCap,
  Calendar,
  ChevronDown,
  ExternalLink,
  UserCheck,
  UserPlus
} from 'lucide-react';
import { 
  mockStudents, 
  mockCenters 
} from '../mockData';
import { 
  SectionHeader, 
  LevelBadge, 
  PaymentStatusBadge, 
  formatCurrency, 
  cn 
} from './UIComponents';
import { motion, AnimatePresence } from 'motion/react';

export function GlobalStudentsView({ role }: { role: 'admin' | 'center' }) {
  const currentCenterId = role === 'center' ? 'c1' : 'all'; // Simulation du centre connecté
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCenter, setSelectedCenter] = useState(currentCenterId);
  const [selectedLevel, setSelectedLevel] = useState('all');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isFilterOpen, setIsFilterOpen] = useState(false);

  const studentsToFilter = role === 'center' 
    ? mockStudents.filter(s => s.centerId === currentCenterId)
    : mockStudents;

  const filteredStudents = studentsToFilter.filter(student => {
    const center = mockCenters.find(c => c.id === student.centerId);
    const matchesSearch = student.name.toLowerCase().includes(searchTerm.toLowerCase()) || 
                         student.email.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         center?.name.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCenter = selectedCenter === 'all' || student.centerId === selectedCenter;
    const matchesLevel = selectedLevel === 'all' || student.currentLevel === selectedLevel;
    const matchesStatus = selectedStatus === 'all' || student.paymentStatus === selectedStatus;
    
    return matchesSearch && matchesCenter && matchesLevel && matchesStatus;
  });

  const stats = {
    total: studentsToFilter.length,
    active: studentsToFilter.length,
    vorbereitung: studentsToFilter.filter(s => s.isVorbereitung).length,
    newThisMonth: role === 'center' ? 3 : 12 
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-[28px] md:text-[32px] font-black text-text-primary tracking-tighter uppercase mb-2">Vue Globale Étudiants</h1>
          <p className="text-text-secondary font-medium">Gestion centralisée de tous les apprenants MERS</p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex-1 md:flex-none px-6 py-4 bg-bg-secondary border border-border-main text-text-primary font-black rounded-2xl shadow-sm flex items-center justify-center gap-3 uppercase tracking-widest text-[11px] hover:bg-bg-tertiary transition-all">
            <Download className="w-4 h-4" /> Exporter list
          </button>
          {role === 'center' && (
            <button className="flex-1 md:flex-none px-6 py-4 bg-navy text-white font-black rounded-2xl shadow-xl shadow-navy/20 flex items-center justify-center gap-3 uppercase tracking-widest text-[11px] hover:scale-[1.02] transition-all active:scale-95">
              Nouvel Étudiant <Plus className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      {/* QUICK STATS */}
      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
         {[
           { label: 'Total Apprenants', value: stats.total, icon: Users, color: 'text-action', bg: 'bg-action/10' },
           { label: 'En Formation', value: stats.active, icon: UserCheck, color: 'text-emerald-500', bg: 'bg-emerald-500/10' },
           { label: 'Vorbereitung', value: stats.vorbereitung, icon: GraduationCap, color: 'text-orange', bg: 'bg-orange/10' },
           { label: 'Inscriptions / Mois', value: stats.newThisMonth, icon: UserPlus, color: 'text-indigo-500', bg: 'bg-indigo-500/10' },
         ].map((stat, idx) => (
           <div key={idx} className="card-premium p-6 flex items-center gap-6 group hover:border-action transition-all cursor-default">
              <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 transition-transform group-hover:rotate-6", stat.bg, stat.color)}>
                <stat.icon className="w-7 h-7" />
              </div>
              <div className="space-y-0.5">
                <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.2em] leading-none mb-1">{stat.label}</p>
                <p className="text-2xl font-black text-text-primary tracking-tighter leading-none">{stat.value}</p>
              </div>
           </div>
         ))}
      </div>

      {/* SEARCH & FILTERS BAR */}
      <div className="card-premium p-4 md:p-6 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 group w-full">
          <Search className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-action transition-colors" />
          <input 
            type="text" 
            placeholder="Rechercher par nom, email ou centre..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-14 pr-6 py-4 bg-bg-tertiary border border-border-main rounded-2xl outline-none focus:ring-4 focus:ring-action/5 focus:border-action transition-all font-bold text-text-primary placeholder:text-text-muted/40"
          />
        </div>
        
        <div className="flex items-center gap-3 w-full md:w-auto">
          <button 
            onClick={() => setIsFilterOpen(!isFilterOpen)}
            className={cn(
              "flex-1 md:flex-none px-6 py-4 rounded-2xl font-black uppercase tracking-widest text-[11px] flex items-center justify-center gap-3 transition-all",
              isFilterOpen ? "bg-action text-white shadow-lg shadow-action/20" : "bg-bg-tertiary text-text-primary border border-border-main hover:bg-bg-secondary"
            )}
          >
            <Filter className="w-4 h-4" /> Filtres
          </button>
          
          <div className="hidden lg:flex items-center gap-2">
            {role === 'admin' && (
              <select 
                value={selectedCenter}
                onChange={(e) => setSelectedCenter(e.target.value)}
                className="px-4 py-4 bg-bg-tertiary border border-border-main rounded-2xl text-[12px] font-black uppercase tracking-widest text-text-primary outline-none focus:border-action transition-all"
              >
                <option value="all">Tous les Centres</option>
                {mockCenters.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
              </select>
            )}
            <select 
              value={selectedLevel}
              onChange={(e) => setSelectedLevel(e.target.value)}
              className="px-4 py-4 bg-bg-tertiary border border-border-main rounded-2xl text-[12px] font-black uppercase tracking-widest text-text-primary outline-none focus:border-action transition-all"
            >
              <option value="all">Niveaux</option>
              {['A1', 'A2', 'B1', 'B2', 'C1'].map(l => <option key={l} value={l}>{l}</option>)}
            </select>
          </div>
        </div>
      </div>

      {/* FILTER PANEL ANIMATION */}
      <AnimatePresence>
        {isFilterOpen && (
          <motion.div 
            initial={{ height: 0, opacity: 0 }}
            animate={{ height: 'auto', opacity: 1 }}
            exit={{ height: 0, opacity: 0 }}
            className="overflow-hidden"
          >
            <div className="card-premium p-8 grid grid-cols-1 md:grid-cols-3 gap-8 border-t-4 border-t-action">
               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Status de Paiement</label>
                  <div className="flex flex-wrap gap-2">
                    {['all', 'Réglé', 'En cours', 'En retard'].map(status => (
                      <button
                        key={status}
                        onClick={() => setSelectedStatus(status)}
                        className={cn(
                          "px-4 py-2 rounded-xl text-[11px] font-black uppercase tracking-tighter transition-all",
                          selectedStatus === status 
                            ? "bg-action text-white shadow-md shadow-action/20" 
                            : "bg-bg-tertiary text-text-muted border border-border-main hover:bg-bg-secondary"
                        )}
                      >
                        {status === 'all' ? 'Tous' : status}
                      </button>
                    ))}
                  </div>
               </div>
               
               {role === 'admin' && (
                 <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Centre</label>
                     <select 
                      value={selectedCenter}
                      onChange={(e) => setSelectedCenter(e.target.value)}
                      className="w-full px-4 py-3 bg-bg-tertiary border border-border-main rounded-xl text-[12px] font-bold text-text-primary outline-none focus:border-action transition-all"
                    >
                      <option value="all">Tous les Centres</option>
                      {mockCenters.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                    </select>
                 </div>
               )}

               <div className="space-y-4">
                  <label className="text-[10px] font-black uppercase tracking-widest text-text-muted">Niveau</label>
                   <select 
                    value={selectedLevel}
                    onChange={(e) => setSelectedLevel(e.target.value)}
                    className="w-full px-4 py-3 bg-bg-tertiary border border-border-main rounded-xl text-[12px] font-bold text-text-primary outline-none focus:border-action transition-all"
                  >
                    <option value="all">Tous les Niveaux</option>
                    {['A1', 'A2', 'B1', 'B2', 'C1'].map(l => <option key={l} value={l}>{l}</option>)}
                  </select>
               </div>
            </div>
          </motion.div>
        )}
      </AnimatePresence>

      {/* STUDENTS TABLE */}
      <div className="card-premium overflow-hidden">
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-bg-tertiary transition-colors border-b border-border-main">
              <tr>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-text-muted tracking-[0.2em]">Étudiant</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-text-muted tracking-[0.2em]">Centre / Lieu</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-text-muted tracking-[0.2em]">Formation</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-text-muted tracking-[0.2em]">Paiement</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-text-muted tracking-[0.2em]">Solde Dû</th>
                <th className="px-8 py-6 text-[10px] font-black uppercase text-text-muted tracking-[0.2em] text-right">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-main transition-colors">
              {filteredStudents.length > 0 ? filteredStudents.map((student) => {
                const center = mockCenters.find(c => c.id === student.centerId);
                return (
                  <motion.tr 
                    layout
                    key={student.id} 
                    className="group hover:bg-bg-tertiary transition-all duration-300"
                  >
                    <td className="px-8 py-6">
                      <div className="flex items-center gap-4">
                        <div className="w-12 h-12 rounded-2xl bg-bg-secondary flex items-center justify-center text-text-primary text-[15px] font-black border border-border-main group-hover:bg-action group-hover:text-white group-hover:border-action transition-all duration-300 shadow-sm uppercase">
                          {student.name.substring(0, 2)}
                        </div>
                        <div className="flex flex-col">
                          <span className="text-[15px] font-black text-text-primary uppercase tracking-tight group-hover:text-action transition-colors">{student.name}</span>
                          <span className="text-[12px] text-text-muted font-medium flex items-center gap-1">
                            <Mail className="w-3 h-3" /> {student.email}
                          </span>
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className="text-[13px] font-bold text-text-primary">{center?.name}</span>
                        <span className="text-[11px] text-text-muted font-semibold uppercase tracking-widest flex items-center gap-1">
                          <MapPin className="w-3 h-3" /> {center?.location}
                        </span>
                      </div>
                    </td>
                    <td className="px-8 py-6">
                       <div className="flex items-center gap-3">
                          <LevelBadge level={student.currentLevel} />
                          {student.isVorbereitung && (
                            <div className="p-1 px-2.5 bg-orange/10 border border-orange/20 rounded-lg flex items-center gap-1.5" title="Module Vorbereitung">
                               <GraduationCap className="w-3.5 h-3.5 text-orange" />
                               <span className="text-[10px] font-black text-orange uppercase tracking-widest">VOR</span>
                            </div>
                          )}
                       </div>
                    </td>
                    <td className="px-8 py-6">
                      <PaymentStatusBadge status={student.paymentStatus} />
                    </td>
                    <td className="px-8 py-6">
                      <div className="flex flex-col">
                        <span className={cn(
                          "text-[15px] font-black tracking-tight",
                          student.totalDue - student.totalPaid > 0 ? "text-danger" : "text-emerald-500"
                        )}>
                          {formatCurrency(student.totalDue - student.totalPaid)}
                        </span>
                        <div className="w-24 h-1.5 bg-bg-tertiary rounded-full mt-2 overflow-hidden border border-border-main/50">
                           <div 
                            className="h-full bg-emerald-500 transition-all duration-1000" 
                            style={{ width: `${(student.totalPaid / student.totalDue) * 100}%` }}
                           />
                        </div>
                      </div>
                    </td>
                    <td className="px-8 py-6 text-right">
                       <div className="flex items-center justify-end gap-2">
                          <button className="w-10 h-10 flex items-center justify-center bg-bg-secondary border border-border-main rounded-xl hover:bg-action hover:text-white hover:border-action transition-all group/btn">
                             <ExternalLink className="w-5 h-5 text-text-muted group-hover/btn:text-white" />
                          </button>
                          <button className="w-10 h-10 flex items-center justify-center bg-bg-secondary border border-border-main rounded-xl hover:bg-navy hover:text-white hover:border-navy transition-all group/btn">
                             <MoreHorizontal className="w-5 h-5 text-text-muted group-hover/btn:text-white" />
                          </button>
                       </div>
                    </td>
                  </motion.tr>
                );
              }) : (
                <tr>
                  <td colSpan={6} className="px-8 py-20 text-center">
                     <div className="flex flex-col items-center gap-4 opacity-40">
                        <Users className="w-16 h-16 text-text-muted" />
                        <p className="text-xl font-bold text-text-muted uppercase tracking-widest">Aucun étudiant trouvé</p>
                        <p className="text-sm text-text-muted max-w-xs mx-auto font-medium">Modifiez vos critères de recherche pour voir d'autres résultats</p>
                     </div>
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
        
        {/* PAGINATION MOCKUP */}
        <div className="px-8 py-6 border-t border-border-main bg-bg-tertiary flex flex-col sm:flex-row items-center justify-between gap-4">
           <p className="text-[12px] font-black text-text-muted uppercase tracking-widest">
             Affichage de <span className="text-text-primary">{filteredStudents.length}</span> sur <span className="text-text-primary">{mockStudents.length}</span> apprenants
           </p>
           <div className="flex items-center gap-2">
              {[1, 2, 3].map(p => (
                <button 
                  key={p}
                  className={cn(
                    "w-10 h-10 rounded-xl font-black text-[12px] transition-all",
                    p === 1 ? "bg-action text-white shadow-lg shadow-action/20" : "bg-bg-secondary text-text-primary border border-border-main hover:bg-bg-tertiary"
                  )}
                >
                  {p}
                </button>
              ))}
              <button className="px-4 h-10 bg-bg-secondary text-text-primary border border-border-main rounded-xl font-black text-[11px] uppercase tracking-widest hover:bg-bg-tertiary transition-all">Suivant</button>
           </div>
        </div>
      </div>
    </div>
  );
}
