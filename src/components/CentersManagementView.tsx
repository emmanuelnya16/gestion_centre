import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  Building2, 
  MapPin, 
  User, 
  Mail, 
  Lock, 
  Eye, 
  EyeOff, 
  X, 
  Edit2, 
  Trash2, 
  Power, 
  MoreVertical,
  ShieldCheck,
  School,
  Building
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, SectionHeader } from './UIComponents';
import { mockCenters } from '../mockData';

export function CentersManagementView() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedStatus, setSelectedStatus] = useState('all');
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [isEditModalOpen, setIsEditModalOpen] = useState(false);
  const [selectedCenter, setSelectedCenter] = useState<any>(null);
  const [showPassword, setShowPassword] = useState(false);

  const filteredCenters = mockCenters.filter(c => {
    const matchesSearch = c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         c.managerName.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesStatus = selectedStatus === 'all' || 
                         (selectedStatus === 'Actifs' && c.studentCount > 0) || 
                         (selectedStatus === 'Désactivés' && c.studentCount === 0);
    return matchesSearch && matchesStatus;
  });

  const openEditModal = (center: any) => {
    setSelectedCenter(center);
    setIsEditModalOpen(true);
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1600px] mx-auto">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-[28px] md:text-[32px] font-black text-text-primary tracking-tighter uppercase mb-2">Gestion des Centres</h1>
          <p className="text-text-secondary font-medium text-[14px]">Administration technique, credentials et cycle de vie des entités</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-8 py-4 bg-navy text-white font-black rounded-2xl shadow-xl shadow-navy/20 flex items-center justify-center gap-3 uppercase tracking-widest text-[11px] hover:scale-[1.02] transition-all active:scale-95"
        >
           Créer un nouveau centre <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* FILTER & SEARCH */}
      <div className="card-premium p-6 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-action transition-colors" />
          <input 
            type="text" 
            placeholder="Rechercher par nom, localisation ou responsable..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-bg-tertiary border border-border-main rounded-2xl outline-none focus:border-action transition-all text-sm font-bold text-text-primary placeholder:text-text-muted"
          />
        </div>
        <div className="flex items-center gap-3 w-full md:w-auto">
           <select 
             value={selectedStatus}
             onChange={(e) => setSelectedStatus(e.target.value)}
             className="flex-1 md:w-48 px-4 py-3 bg-bg-tertiary border border-border-main rounded-2xl text-xs font-bold text-text-primary outline-none focus:border-action transition-all appearance-none cursor-pointer"
           >
              <option value="all">Tous les statuts</option>
              <option value="Actifs">Actifs</option>
              <option value="Désactivés">Désactivés</option>
           </select>
           <button className="p-3 bg-bg-tertiary border border-border-main rounded-2xl text-text-muted hover:text-action transition-all">
             <MoreVertical className="w-5 h-5" />
           </button>
        </div>
      </div>

      {/* CENTERS GRID */}
      <div className="grid grid-cols-1 md:grid-cols-2 xl:grid-cols-3 gap-8">
        <AnimatePresence mode="popLayout">
          {filteredCenters.map((center, index) => (
            <motion.div 
              layout
              key={center.id}
              initial={{ opacity: 0, scale: 0.9 }}
              animate={{ opacity: 1, scale: 1 }}
              exit={{ opacity: 0, scale: 0.9 }}
              transition={{ delay: index * 0.05 }}
              className="group card-premium p-8 hover:border-action/30 transition-all flex flex-col justify-between"
            >
              <div>
                <div className="flex items-start justify-between mb-8">
                  <div className="w-16 h-16 bg-bg-tertiary rounded-3xl flex items-center justify-center text-text-muted group-hover:bg-action group-hover:text-white transition-all shadow-inner">
                    <Building className="w-8 h-8" />
                  </div>
                  <div className="flex items-center gap-2">
                    <button 
                      onClick={() => openEditModal(center)}
                      className="p-3 bg-bg-tertiary hover:bg-action/10 hover:text-action rounded-xl text-text-muted transition-all"
                    >
                      <Edit2 className="w-4 h-4" />
                    </button>
                    <button className="p-3 bg-bg-tertiary hover:bg-red-500/10 hover:text-red-500 rounded-xl text-text-muted transition-all">
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </div>
                </div>

                <div className="space-y-4 mb-8">
                  <h3 className="text-2xl font-black text-text-primary tracking-tighter uppercase leading-none">{center.name}</h3>
                  <div className="flex items-center gap-2 text-text-secondary text-sm font-medium">
                    <MapPin className="w-4 h-4" />
                    {center.location}
                  </div>
                </div>

                <div className="space-y-3 pt-6 border-t border-border-main/50">
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Responsable</span>
                    <span className="text-[13px] font-bold text-text-primary">{center.managerName}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Identifiant</span>
                    <span className="text-[13px] font-bold text-text-primary">mers_{center.id.toLowerCase()}</span>
                  </div>
                  <div className="flex items-center justify-between">
                    <span className="text-[10px] font-black text-text-muted uppercase tracking-widest">Status Accès</span>
                    <span className="px-2 py-0.5 bg-emerald-500/10 text-emerald-500 rounded-md text-[9px] font-black uppercase tracking-widest border border-emerald-500/20">
                      Connecté
                    </span>
                  </div>
                </div>
              </div>

              <div className="mt-8 flex items-center gap-3 pt-6">
                 <button 
                   onClick={() => openEditModal(center)}
                   className="flex-1 py-3.5 bg-bg-tertiary text-text-primary font-black rounded-xl border border-border-main hover:border-action transition-all text-[11px] uppercase tracking-widest"
                 >
                   Modifier accès
                 </button>
                 <button className="p-3.5 bg-emerald-500 text-white rounded-xl shadow-lg shadow-emerald-500/20 hover:scale-105 transition-all">
                   <Power className="w-5 h-5" />
                 </button>
              </div>
            </motion.div>
          ))}
        </AnimatePresence>
      </div>

      {/* ADD/EDIT MODAL */}
      <AnimatePresence>
        {(isAddModalOpen || isEditModalOpen) && (
          <div className="fixed inset-0 z-[100] flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
              className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-2xl bg-bg-secondary rounded-[40px] shadow-2xl border border-border-main/50 overflow-hidden"
            >
              <div className="bg-navy p-8 text-white relative">
                <div className="flex items-center justify-between relative z-10">
                  <div>
                    <h2 className="text-2xl font-black uppercase tracking-tighter italic text-white">
                      {isEditModalOpen ? "Modifier Centre" : "Ajouter un Centre"}
                    </h2>
                    <p className="text-white/60 text-[11px] font-bold uppercase tracking-widest mt-1">
                      {isEditModalOpen ? `Configuration pour ${selectedCenter?.name}` : "Enregistrement d'une nouvelle entité MERS"}
                    </p>
                  </div>
                  <button 
                    onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
                    className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center hover:bg-white/20 transition-colors"
                  >
                    <X className="w-5 h-5 text-white" />
                  </button>
                </div>
              </div>

              <form 
                onSubmit={(e) => {
                  e.preventDefault();
                  // Ici on simulerait l'appel API
                  setIsAddModalOpen(false);
                  setIsEditModalOpen(false);
                }}
                className="p-8 space-y-8"
              >
                <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Informations Générales</label>
                    <div className="relative">
                      <School className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input 
                        type="text" 
                        defaultValue={isEditModalOpen ? selectedCenter?.name : ''}
                        placeholder="Nom du centre (ex: Mers Dakar)" 
                        className="w-full pl-12 pr-4 py-4 bg-bg-tertiary border border-border-main rounded-2xl outline-none focus:border-action font-bold text-sm text-text-primary"
                      />
                    </div>
                    <div className="relative">
                      <MapPin className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input 
                        type="text" 
                        defaultValue={isEditModalOpen ? selectedCenter?.location : ''}
                        placeholder="Localisation" 
                        className="w-full pl-12 pr-4 py-4 bg-bg-tertiary border border-border-main rounded-2xl outline-none focus:border-action font-bold text-sm text-text-primary"
                      />
                    </div>
                  </div>

                  <div className="space-y-4">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Sécurité & Accès</label>
                    <div className="relative">
                      <Mail className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input 
                        type="email" 
                        placeholder="Email du responsable" 
                        className="w-full pl-12 pr-4 py-4 bg-bg-tertiary border border-border-main rounded-2xl outline-none focus:border-action font-bold text-sm text-text-primary"
                      />
                    </div>
                    <div className="relative">
                      <Lock className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted" />
                      <input 
                        type={showPassword ? "text" : "password"} 
                        placeholder={isEditModalOpen ? "Nouveau mot de passe (optionnel)" : "Mot de passe"} 
                        className="w-full pl-12 pr-12 py-4 bg-bg-tertiary border border-border-main rounded-2xl outline-none focus:border-action font-bold text-sm text-text-primary"
                      />
                      <button 
                        type="button" 
                        onClick={() => setShowPassword(!showPassword)}
                        className="absolute right-4 top-1/2 -translate-y-1/2 text-text-muted hover:text-action"
                      >
                        {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                      </button>
                    </div>
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                   <div className="flex items-center gap-3 px-4 py-2 bg-emerald-500/10 border border-emerald-500/20 rounded-2xl">
                      <ShieldCheck className="w-5 h-5 text-emerald-500" />
                      <span className="text-[10px] font-black text-emerald-600 uppercase tracking-widest">Compte vérifié Mers v2</span>
                   </div>
                </div>

                <div className="flex items-center gap-4">
                  <button 
                    type="submit"
                    className="flex-1 py-5 bg-navy text-white font-black rounded-2xl uppercase tracking-widest text-[12px] hover:bg-slate-900 transition-all shadow-xl shadow-navy/20"
                  >
                    {isEditModalOpen ? "Enregistrer les modifications" : "Créer le compte centre"}
                  </button>
                  <button 
                    type="button"
                    onClick={() => { setIsAddModalOpen(false); setIsEditModalOpen(false); }}
                    className="px-10 py-5 bg-bg-tertiary border border-border-main text-text-muted font-black rounded-2xl uppercase tracking-widest text-[12px] hover:bg-red-500/10 hover:text-red-500 transition-all"
                  >
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
