import React, { useState } from 'react';
import { 
  School, 
  Users, 
  TrendingUp, 
  MapPin, 
  User, 
  Search,
  ChevronDown,
  ArrowUpRight, 
  Trophy,
  PieChart as PieIcon,
  Activity,
  CreditCard,
  ChevronRight,
  BookOpen,
  X,
  Plus,
  Upload,
  Phone,
  Mail,
  Building2,
  Calendar,
  Lock,
  Eye,
  EyeOff,
  Wallet,
  MinusCircle
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip, 
  ResponsiveContainer,
  Cell,
  PieChart,
  Pie
} from 'recharts';
import { cn, SectionHeader, LevelBadge, formatCurrency } from './UIComponents';
import { mockCenters, caByCenter } from '../mockData';

const CenterStatsCard: React.FC<{ center: any, index: number }> = ({ center, index }) => {
  const extendedData = caByCenter.find(c => c.name.toLowerCase().includes(center.name.replace('Mers ', '').toLowerCase())) || caByCenter[0];
  
  const paymentRate = 75 + Math.floor(Math.random() * 20); // 75-95%
  const COLORS = ['#1A56DB', '#FF9F1C', '#0E9F6E', '#E71D36'];
  const totalSorties = center.sorties?.reduce((acc: number, curr: any) => acc + curr.amount, 0) || 0;

  return (
    <motion.div 
      initial={{ opacity: 0, y: 30 }}
      animate={{ opacity: 1, y: 0 }}
      transition={{ delay: index * 0.1 }}
      className="card-premium overflow-hidden border-t-4 border-t-action shadow-2xl bg-bg-secondary/20"
    >
      {/* HEADER: IDENTITY & PRIMARY ACTIONS - EXPLODED */}
      <div className="p-10 border-b border-border-main/50 bg-bg-secondary/30 relative overflow-hidden">
        <div className="absolute top-0 right-0 w-96 h-96 bg-action/5 blur-[120px] -mr-48 -mt-48 pointer-events-none"></div>
        <div className="flex flex-col xl:flex-row xl:items-center justify-between gap-10 relative z-10">
          <div className="flex items-center gap-8">
            <div className="w-24 h-24 rounded-[40px] bg-navy flex items-center justify-center text-white shadow-2xl shadow-navy/20 relative group">
              <Building2 className="w-12 h-12 transition-transform group-hover:scale-110" />
              <div className="absolute -bottom-2 -right-2 w-10 h-10 bg-orange rounded-2xl flex items-center justify-center border-4 border-bg-secondary text-white">
                <Activity className="w-5 h-5" />
              </div>
            </div>
            <div className="space-y-2">
              <div className="flex items-center gap-4">
                <h2 className="text-[24px] md:text-[32px] font-black text-text-primary tracking-tighter uppercase leading-none">{center.name}</h2>
                <div className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-lg text-[9px] font-black uppercase tracking-widest border border-emerald-500/20">
                  Actif
                </div>
              </div>
              <div className="flex flex-wrap items-center gap-4 md:gap-6">
                <div className="flex items-center gap-2.5 bg-bg-tertiary px-3 py-1.5 rounded-xl border border-border-main/50 shadow-sm">
                   <MapPin className="w-3.5 h-3.5 text-action" />
                   <span className="text-[12px] font-black uppercase tracking-tight">{center.location}</span>
                </div>
                <div className="flex items-center gap-2.5 bg-bg-tertiary px-3 py-1.5 rounded-xl border border-border-main/50 shadow-sm">
                   <User className="w-3.5 h-3.5 text-orange" />
                   <span className="text-[12px] font-black uppercase tracking-tight">{center.managerName}</span>
                </div>
              </div>
            </div>
          </div>
          
          <div className="flex flex-wrap items-center gap-4">
            <div className={cn(
              "p-4 md:p-6 rounded-[24px] border-2 flex flex-col items-center justify-center gap-1 min-w-[160px] transition-all",
              center.sorties?.length > 0 ? "border-orange/20 bg-orange/5 text-orange" : "border-emerald-500/10 bg-emerald-500/5 text-emerald-500"
            )}>
              <span className="text-[9px] font-black uppercase tracking-[0.2em] opacity-60">Status Sorties</span>
              <div className="flex items-center gap-3">
                <div className={cn("w-2.5 h-2.5 rounded-full", center.sorties?.length > 0 ? "bg-orange animate-pulse" : "bg-emerald-500")}></div>
                <span className="text-[15px] font-black tracking-tight leading-none text-center">
                  {center.sorties?.length > 0 ? `${center.sorties.length} Aujourd'hui` : 'Aucune Sortie'}
                </span>
              </div>
            </div>
          </div>
        </div>
      </div>

      {/* EXPLODED GRID LAYOUT */}
      <div className="p-6 md:p-10 space-y-10">
        
        {/* ROW 1: CORE FINANCIALS */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 md:gap-8">
          <div className="p-8 bg-emerald-500/[0.03] rounded-[32px] border border-emerald-500/10 relative overflow-hidden group hover:bg-emerald-500/5 transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-emerald-500 rounded-2xl flex items-center justify-center text-white shadow-xl shadow-emerald-500/30">
                <TrendingUp className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 bg-emerald-500/10 text-emerald-500 rounded-xl text-[10px] font-black uppercase tracking-widest">Recettes</span>
            </div>
            <p className="text-[32px] md:text-[40px] font-black text-text-primary leading-none mb-2 tracking-tighter">{formatCurrency(center.totalRevenue)}</p>
            <p className="text-[11px] font-bold text-text-secondary uppercase tracking-widest opacity-60">Total Global</p>
          </div>

          <div className="p-8 bg-orange/[0.03] rounded-[32px] border border-orange/10 relative overflow-hidden group hover:bg-orange/5 transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-orange rounded-2xl flex items-center justify-center text-white shadow-xl shadow-orange/30">
                <Wallet className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 bg-orange/10 text-orange rounded-xl text-[10px] font-black uppercase tracking-widest">Décaissements</span>
            </div>
            <p className="text-[32px] md:text-[40px] font-black text-orange leading-none mb-2 tracking-tighter">{formatCurrency(totalSorties)}</p>
            <p className="text-[11px] font-bold text-orange/60 uppercase tracking-widest opacity-60">Sorties du jour</p>
          </div>

          <div className="p-8 bg-navy/5 rounded-[32px] border border-navy/10 relative overflow-hidden group hover:bg-navy/10 transition-all">
            <div className="flex items-center justify-between mb-6">
              <div className="w-12 h-12 bg-navy rounded-2xl flex items-center justify-center text-white shadow-xl shadow-navy/30">
                <Users className="w-6 h-6" />
              </div>
              <span className="px-3 py-1 bg-navy/10 text-navy rounded-xl text-[10px] font-black uppercase tracking-widest">Cohorte</span>
            </div>
            <p className="text-[32px] md:text-[40px] font-black text-text-primary leading-none mb-2 tracking-tighter">{center.studentCount}</p>
            <p className="text-[11px] font-bold text-text-secondary uppercase tracking-widest opacity-60">Étudiants actifs</p>
          </div>
        </div>

        {/* ROW 2: SPLIT CONTENT */}
        <div className="grid grid-cols-1 lg:grid-cols-2 gap-10">
          
          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-border-main pb-4">
              <SectionHeader 
                title="Sorties Journalières" 
                subtitle="Dépenses enregistrées ce jour" 
              />
              <span className="text-[10px] font-black uppercase tracking-widest text-text-muted">{new Date().toLocaleDateString('fr-FR', { day: 'numeric', month: 'short' })}</span>
            </div>

            <div className="grid grid-cols-1 gap-4">
              {center.sorties && center.sorties.length > 0 ? (
                center.sorties.map((sortie: any) => (
                  <div key={sortie.id} className="p-6 bg-bg-tertiary rounded-[24px] border border-border-main/50 group/sortie relative overflow-hidden hover:bg-bg-secondary transition-all">
                     <div className="absolute left-0 top-0 w-1.5 h-full bg-orange"></div>
                     <div className="flex items-center justify-between mb-3">
                        <div className="space-y-1">
                          <p className="text-[15px] font-black text-text-primary tracking-tight leading-tight">{sortie.reason}</p>
                        </div>
                        <div className="text-right">
                          <p className="text-[20px] font-black text-orange tracking-tighter leading-none">{formatCurrency(sortie.amount)}</p>
                        </div>
                     </div>
                     <div className="flex items-center justify-between pt-3 border-t border-border-main/20">
                        <span className="text-[9px] font-black text-text-muted uppercase tracking-widest">Opération Validée</span>
                        <span className="text-[9px] font-bold text-text-muted">Réf: {sortie.id}</span>
                     </div>
                  </div>
                ))
              ) : (
                <div className="flex flex-col items-center justify-center py-12 bg-bg-tertiary/20 rounded-[32px] border-2 border-dashed border-border-main/40">
                  <p className="text-[12px] font-black uppercase tracking-widest text-text-muted">Aucune sortie aujourd'hui</p>
                </div>
              )}
            </div>
          </div>

          <div className="space-y-8">
            <div className="flex items-center justify-between border-b border-border-main pb-4">
              <SectionHeader 
                title="Vorbereitung" 
                subtitle="Progression par niveau" 
              />
              <BookOpen className="w-5 h-5 text-vorbereitung" />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {['A1', 'A2', 'B1', 'B2'].map((lvl) => {
                const percent = 45 + Math.floor(Math.random() * 45);
                return (
                  <div key={lvl} className="bg-bg-tertiary/40 p-5 rounded-[24px] border border-border-main/40">
                    <div className="flex items-center justify-between mb-3">
                      <LevelBadge level={lvl as any} />
                      <span className="text-[14px] font-black text-vorbereitung">{percent}%</span>
                    </div>
                    <div className="h-2 w-full bg-bg-secondary rounded-full overflow-hidden shadow-inner">
                      <motion.div 
                        initial={{ width: 0 }}
                        animate={{ width: `${percent}%` }}
                        transition={{ duration: 1.5, delay: 0.2 }}
                        className="h-full bg-vorbereitung rounded-full"
                      />
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        </div>

        {/* ROW 3: LOGISTICS */}
        <div className="space-y-8">
           <div className="flex items-center justify-between border-b border-border-main pb-4">
              <SectionHeader title="Salles & Occupation" subtitle="Suivi des classes" />
           </div>
           
           <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
              {extendedData.rooms?.map((room: any) => (
                <div key={room.name} className="p-6 bg-bg-tertiary rounded-[24px] border border-border-main/50 hover:bg-bg-secondary transition-all group/room">
                   <div className="flex items-center justify-between mb-6">
                      <div className="w-12 h-12 bg-bg-secondary rounded-2xl flex items-center justify-center text-text-primary group-hover/room:bg-action group-hover/room:text-white transition-all">
                         <Activity className="w-6 h-6" />
                      </div>
                      <div className={cn(
                        "text-[16px] font-black",
                        room.load > 85 ? "text-red-500" : "text-emerald-500"
                      )}>
                        {room.load}%
                      </div>
                   </div>
                   <div className="mb-6">
                      <h4 className="text-[20px] font-black text-text-primary uppercase tracking-tighter mb-1">{room.name}</h4>
                      <div className="flex items-center gap-2">
                        <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest">{room.classes} Classes</span>
                        <div className="w-1.5 h-1.5 bg-border-main rounded-full"></div>
                        <span className="text-[11px] font-black text-action uppercase">Lv: {['A1', 'A2', 'B1', 'B2', 'C1'][Math.floor(Math.random() * 5)]}</span>
                      </div>
                   </div>
                   <div className="flex items-center justify-between pt-4 border-t border-border-main/30">
                      <div className="flex items-center gap-1.5">
                        <Users className="w-3.5 h-3.5 text-text-muted" />
                        <span className="text-[12px] font-black text-text-primary">{Math.floor(room.load * 0.2)} Étudiants</span>
                      </div>
                      <div className="h-1.5 w-16 bg-bg-secondary rounded-full overflow-hidden">
                         <div className={cn("h-full", room.load > 85 ? "bg-red-500" : "bg-action")} style={{ width: `${room.load}%` }}></div>
                      </div>
                   </div>
                </div>
              ))}
           </div>
        </div>
      </div>
    </motion.div>
  );
};

export function CentersView() {
  const [centerSearchTerm, setCenterSearchTerm] = useState('');
  const [selectedCenterId, setSelectedCenterId] = useState(mockCenters[0].id);
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isDropdownOpen, setIsDropdownOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false);
  
  const filteredCenters = mockCenters.filter(c => 
    c.name.toLowerCase().includes(centerSearchTerm.toLowerCase()) ||
    c.location.toLowerCase().includes(centerSearchTerm.toLowerCase())
  );

  const selectedCenter = mockCenters.find(c => c.id === selectedCenterId) || mockCenters[0];

  return (
    <div className="p-4 md:p-10 space-y-12 max-w-[1920px] mx-auto overflow-x-hidden">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-[28px] md:text-[32px] font-black text-text-primary tracking-tighter uppercase mb-2">Statistiques des Centres</h1>
          <p className="text-text-secondary font-medium text-[14px]">Analyse de performance et indicateurs clés par centre</p>
        </div>
        <div className="flex items-center gap-3">
        </div>
      </div>

      {/* SELECTION & INDIVIDUAL CENTERS STATS FOCUS */}
      <div className="space-y-8 min-h-[600px]">
        <div className="card-premium p-6 md:p-10 py-8 flex flex-col md:flex-row md:items-center justify-between gap-8 border-l-8 border-l-action bg-bg-secondary/50 backdrop-blur-md">
          <div className="flex-1">
             <SectionHeader 
               title="Sélecteur de Centre" 
               subtitle="Analyse des performances détaillées" 
             />
             <div className="mt-4 relative group max-w-md">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-action transition-colors" />
                <input 
                  type="text" 
                  placeholder="Rechercher un centre spécifique..." 
                  value={centerSearchTerm}
                  onChange={(e) => setCenterSearchTerm(e.target.value)}
                  onFocus={() => setIsDropdownOpen(true)}
                  className="w-full pl-12 pr-4 py-3 bg-bg-tertiary border border-border-main rounded-2xl outline-none focus:border-action transition-all text-[13px] font-bold text-text-primary placeholder:text-text-muted"
                />
             </div>
          </div>
          
          {/* CUSTOM DROPDOWN SELECTOR */}
          <div className="relative w-full md:w-[320px] z-30">
             <button 
                onClick={() => setIsDropdownOpen(!isDropdownOpen)}
                className="w-full p-5 bg-bg-secondary border-2 border-border-main rounded-[24px] flex items-center justify-between gap-4 hover:border-action transition-all group"
             >
                <div className="flex items-center gap-3">
                   <div className="w-10 h-10 bg-action/10 rounded-xl flex items-center justify-center text-action">
                      <School className="w-5 h-5" />
                   </div>
                   <div className="text-left">
                      <p className="text-[9px] font-black text-text-muted uppercase tracking-widest">Centre Sélectionné</p>
                      <p className="text-[15px] font-black text-text-primary uppercase tracking-tight truncate max-w-[140px]">{selectedCenter.name}</p>
                   </div>
                </div>
                <ChevronDown className={cn("w-5 h-5 text-text-muted transition-transform duration-300", isDropdownOpen && "rotate-180")} />
             </button>

             <AnimatePresence>
               {isDropdownOpen && (
                 <>
                   <div className="fixed inset-0 z-40" onClick={() => setIsDropdownOpen(false)} />
                   <motion.div 
                     initial={{ opacity: 0, y: 10, scale: 0.95 }}
                     animate={{ opacity: 1, y: 0, scale: 1 }}
                     exit={{ opacity: 0, y: 10, scale: 0.95 }}
                     className="absolute top-full left-0 right-0 mt-3 z-50 bg-bg-secondary border border-border-main rounded-[32px] shadow-2xl p-4 space-y-1"
                   >
                      {filteredCenters.map((center) => (
                        <button
                          key={center.id}
                          onClick={() => {
                            setSelectedCenterId(center.id);
                            setIsDropdownOpen(false);
                            setCenterSearchTerm('');
                          }}
                          className={cn(
                            "w-full p-4 rounded-2xl flex items-center justify-between transition-all group",
                            selectedCenterId === center.id ? "bg-action/5 text-action" : "hover:bg-bg-tertiary text-text-primary"
                          )}
                        >
                           <div className="flex flex-col items-start">
                             <span className="font-black uppercase tracking-tight text-[13px]">{center.name}</span>
                             <span className="text-[10px] font-bold text-text-muted">{center.location}</span>
                           </div>
                           {selectedCenterId === center.id && <div className="w-2 h-2 bg-action rounded-full" />}
                        </button>
                      ))}
                      {filteredCenters.length === 0 && (
                        <div className="p-8 text-center text-text-muted font-bold text-xs italic">
                          Aucun centre trouvé
                        </div>
                      )}
                   </motion.div>
                 </>
               )}
             </AnimatePresence>
          </div>
        </div>

        <div className="grid grid-cols-1 gap-10">
          <AnimatePresence mode="wait">
             <CenterStatsCard 
               key={selectedCenter.id} 
               center={selectedCenter} 
               index={0} 
             />
          </AnimatePresence>
        </div>
      </div>


      <AnimatePresence>
      </AnimatePresence>
    </div>
  );
}
