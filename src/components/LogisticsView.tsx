import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  DoorOpen, 
  Users, 
  Clock, 
  MapPin, 
  Calendar, 
  MoreVertical,
  X,
  Building2,
  Trash2,
  Edit2,
  BookOpen
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, SectionHeader, LevelBadge } from './UIComponents';

interface Room {
  id: string;
  name: string;
  capacity: number;
  level: string;
  schedule: string;
  status: 'Occupée' | 'Libre';
  load: number;
}

const mockRooms: Room[] = [
  { id: '1', name: 'Salle Excellence', capacity: 25, level: 'A1', schedule: '08:00 - 12:00', status: 'Occupée', load: 85 },
  { id: '2', name: 'Salle Berlin', capacity: 15, level: 'B2', schedule: '13:00 - 17:00', status: 'Libre', load: 40 },
  { id: '3', name: 'Labo Langues', capacity: 20, level: 'B1', schedule: '09:00 - 15:00', status: 'Occupée', load: 95 },
  { id: '4', name: 'Salle Munich', capacity: 18, level: 'A2', schedule: '17:30 - 21:00', status: 'Libre', load: 10 },
];

export function LogisticsView() {
  const [isAddRoomOpen, setIsAddRoomOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');

  const filteredRooms = mockRooms.filter(r => 
    r.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    r.level.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1600px] mx-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-[28px] md:text-[32px] font-black text-text-primary tracking-tighter uppercase mb-2">Gestion Logistique</h1>
          <p className="text-text-secondary font-medium text-[14px]">Optimisation des salles, horaires et planning des promotions</p>
        </div>
        <button 
          onClick={() => setIsAddRoomOpen(true)}
          className="px-8 py-4 bg-navy text-white font-black rounded-2xl shadow-xl shadow-navy/20 flex items-center justify-center gap-3 uppercase tracking-widest text-[11px] hover:scale-[1.02] transition-all active:scale-95"
        >
           Ajouter une salle / classe <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* FILTER & SEARCH */}
      <div className="card-premium p-6 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-action transition-colors" />
          <input 
            type="text" 
            placeholder="Rechercher une salle ou un niveau..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-bg-tertiary border border-border-main rounded-2xl outline-none focus:border-action transition-all text-sm font-bold text-text-primary placeholder:text-text-muted"
          />
        </div>
        <div className="flex items-center gap-3">
           <select className="px-4 py-3 bg-bg-tertiary border border-border-main rounded-2xl text-xs font-bold text-text-primary outline-none focus:border-action transition-all appearance-none cursor-pointer">
              <option>Tous les niveaux</option>
              <option>A1</option>
              <option>A2</option>
              <option>B1</option>
              <option>B2</option>
              <option>C1</option>
           </select>
        </div>
      </div>

      {/* ROOMS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredRooms.map((room, index) => (
            <motion.div 
              layout
              key={room.id}
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="group card-premium p-8 hover:border-action transition-all"
            >
              <div className="flex items-start justify-between mb-8">
                <div className={cn(
                  "w-16 h-16 rounded-3xl flex items-center justify-center transition-all shadow-inner",
                  room.status === 'Occupée' ? "bg-red-500/10 text-red-500" : "bg-emerald-500/10 text-emerald-500"
                )}>
                  <DoorOpen className="w-8 h-8" />
                </div>
                <div className="flex items-center gap-2">
                   <span className={cn(
                     "px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-widest border",
                     room.status === 'Occupée' ? "bg-red-500/5 text-red-500 border-red-500/20" : "bg-emerald-500/5 text-emerald-500 border-emerald-500/20"
                   )}>
                     {room.status}
                   </span>
                </div>
              </div>

              <div className="space-y-2 mb-8">
                <h3 className="text-2xl font-black text-text-primary tracking-tighter uppercase">{room.name}</h3>
                <div className="flex items-center gap-4">
                  <LevelBadge level={room.level} />
                  <div className="flex items-center gap-1.5 text-text-muted text-xs font-bold">
                    <Clock className="w-3.5 h-3.5" />
                    {room.schedule}
                  </div>
                </div>
              </div>

              <div className="space-y-5">
                <div className="space-y-2">
                   <div className="flex justify-between text-[11px] font-black uppercase tracking-widest text-text-muted">
                      <span>Taux d'occupation</span>
                      <span className="text-text-primary">{room.load}%</span>
                   </div>
                   <div className="h-2 w-full bg-bg-tertiary rounded-full overflow-hidden">
                      <div 
                        className={cn(
                          "h-full transition-all duration-1000",
                          room.load > 80 ? "bg-red-500" : "bg-emerald-500"
                        )} 
                        style={{ width: `${room.load}%` }}
                      />
                   </div>
                </div>

                <div className="grid grid-cols-2 gap-4 pt-4 border-t border-border-main/50">
                  <div className="flex items-center gap-3">
                    <div className="w-10 h-10 bg-bg-tertiary rounded-xl flex items-center justify-center text-text-muted">
                      <Users className="w-5 h-5" />
                    </div>
                    <div>
                      <p className="text-[14px] font-black text-text-primary leading-none">{room.capacity}</p>
                      <p className="text-[9px] text-text-muted font-bold uppercase">Capacité</p>
                    </div>
                  </div>
                  <div className="flex items-center gap-3">
                    <button className="w-full py-3 bg-bg-tertiary hover:bg-action/10 hover:text-action rounded-xl flex items-center justify-center transition-all border border-border-main">
                       <Edit2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ADD ROOM MODAL */}
      <AnimatePresence>
        {isAddRoomOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddRoomOpen(false)}
              className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-bg-secondary rounded-[40px] shadow-2xl border border-border-main/50 overflow-hidden"
            >
              <div className="bg-navy p-8 text-white">
                <div className="flex items-center justify-between">
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tighter italic">Configuration Classe/Salle</h2>
                    <p className="text-white/60 text-[11px] font-bold uppercase tracking-widest mt-1">Planification logistique de l'entité</p>
                  </div>
                  <button onClick={() => setIsAddRoomOpen(false)} className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20">
                    <X className="w-5 h-5" />
                  </button>
                </div>
              </div>

              <form onSubmit={(e) => { e.preventDefault(); setIsAddRoomOpen(false); }} className="p-8 space-y-6">
                <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
                  <div className="space-y-4">
                    <div className="relative">
                      <Building2 className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input type="text" placeholder="Nom de la salle" className="w-full pl-12 pr-4 py-4 bg-bg-tertiary border border-border-main rounded-2xl outline-none focus:border-action font-bold text-sm text-text-primary" />
                    </div>
                    <div className="relative">
                      <Users className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input type="number" placeholder="Capacité d'accueil" className="w-full pl-12 pr-4 py-4 bg-bg-tertiary border border-border-main rounded-2xl outline-none focus:border-action font-bold text-sm text-text-primary" />
                    </div>
                  </div>
                  <div className="space-y-4">
                    <div className="relative">
                      <BookOpen className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <select className="w-full pl-12 pr-4 py-4 bg-bg-tertiary border border-border-main rounded-2xl outline-none focus:border-action font-bold text-sm text-text-primary appearance-none">
                        <option>Niveau de la promotion</option>
                        <option>A1</option>
                        <option>A2</option>
                        <option>B1</option>
                        <option>B2</option>
                        <option>C1</option>
                      </select>
                    </div>
                    <div className="relative">
                      <Clock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input type="text" placeholder="Horaires (ex: 08:00 - 12:00)" className="w-full pl-12 pr-4 py-4 bg-bg-tertiary border border-border-main rounded-2xl outline-none focus:border-action font-bold text-sm text-text-primary" />
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-6">
                  <button type="submit" className="flex-1 py-5 bg-navy text-white font-black rounded-2xl uppercase tracking-widest text-[12px] hover:bg-slate-900 transition-all shadow-xl shadow-navy/20">
                    Confirmer le planning
                  </button>
                  <button type="button" onClick={() => setIsAddRoomOpen(false)} className="px-10 py-5 bg-bg-tertiary border border-border-main text-text-muted font-black rounded-2xl uppercase tracking-widest text-[12px]">
                    Annuler
                  </button>
                </div>
              </form>
            </motion.div>
          </div>
        )}
      </AnimatePresence>
    </div>
  );
}
