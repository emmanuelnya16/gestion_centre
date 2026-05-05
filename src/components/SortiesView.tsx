import React, { useState } from 'react';
import { 
  Plus, 
  Search, 
  MinusCircle, 
  Calendar, 
  Wallet, 
  TrendingDown,
  ArrowRight,
  TrendingUp,
  Filter
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';
import { cn, SectionHeader, formatCurrency } from './UIComponents';
import { mockCenters } from '../mockData';

export function SortiesView() {
  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [searchTerm, setSearchTerm] = useState('');
  
  // Simulation des données du centre Jouvence (c1)
  const centerId = 'c1';
  const center = mockCenters.find(c => c.id === centerId) || mockCenters[0];
  
  const [localSorties, setLocalSorties] = useState<any[]>([]);
  const [selectedReason, setSelectedReason] = useState('');
  const [selectedAmount, setSelectedAmount] = useState('');

  const allSorties = [...(center.sorties || []), ...localSorties];
  const totalSorties = allSorties.reduce((acc, curr) => acc + curr.amount, 0);

  const filteredSorties = allSorties.filter(s => 
    s.reason.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const handleAddSortie = (e: React.FormEvent) => {
    e.preventDefault();
    if (!selectedReason || !selectedAmount) return;

    const newSortie = {
      id: `s-${Date.now()}`,
      reason: selectedReason,
      amount: Number(selectedAmount),
      date: new Date().toLocaleDateString('fr-FR'),
    };

    setLocalSorties([newSortie, ...localSorties]);
    setIsAddModalOpen(false);
    setSelectedReason('');
    setSelectedAmount('');
  };

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-500 max-w-[1600px] mx-auto">
      {/* HEADER */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-[28px] md:text-[32px] font-black text-text-primary tracking-tighter uppercase mb-2">Journal des Sorties</h1>
          <p className="text-text-secondary font-medium text-[14px]">Gestion et traçabilité des dépenses quotidiennes du centre</p>
        </div>
        <button 
          onClick={() => setIsAddModalOpen(true)}
          className="px-8 py-4 bg-orange text-white font-black rounded-2xl shadow-xl shadow-orange/20 flex items-center justify-center gap-3 uppercase tracking-widest text-[11px] hover:scale-[1.02] transition-all active:scale-95"
        >
           Déclarer une dépense <Plus className="w-5 h-5" />
        </button>
      </div>

      {/* KPI SECTION */}
      <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
        <div className="card-premium p-8 border-l-4 border-l-orange bg-orange/5">
           <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-orange/10 rounded-xl flex items-center justify-center text-orange">
                 <TrendingDown className="w-6 h-6" />
              </div>
           </div>
           <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-1">Total Sorties (Trimestre)</p>
           <p className="text-3xl font-black text-text-primary tracking-tighter italic">{formatCurrency(totalSorties)}</p>
        </div>
        <div className="card-premium p-8 border-l-4 border-l-action">
           <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-action/10 rounded-xl flex items-center justify-center text-action">
                 <Wallet className="w-6 h-6" />
              </div>
           </div>
           <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-1">Dépense Moyenne</p>
           <p className="text-3xl font-black text-text-primary tracking-tighter italic">{formatCurrency(totalSorties / (allSorties.length || 1))}</p>
        </div>
        <div className="card-premium p-8 border-l-4 border-l-emerald-500">
           <div className="flex items-center justify-between mb-4">
              <div className="w-12 h-12 bg-emerald-500/10 rounded-xl flex items-center justify-center text-emerald-500">
                 <TrendingUp className="w-6 h-6" />
              </div>
           </div>
           <p className="text-[10px] font-black text-text-muted uppercase tracking-[0.3em] mb-1">Nombre d'opérations</p>
           <p className="text-3xl font-black text-text-primary tracking-tighter italic">{allSorties.length}</p>
        </div>
      </div>

      {/* FILTER & SEARCH */}
      <div className="card-premium p-6 flex flex-col md:flex-row items-center gap-4">
        <div className="relative flex-1 group">
          <Search className="absolute left-4 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-orange transition-colors" />
          <input 
            type="text" 
            placeholder="Rechercher par motif de dépense..." 
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="w-full pl-12 pr-4 py-3 bg-bg-tertiary border border-border-main rounded-2xl outline-none focus:border-orange transition-all text-sm font-bold text-text-primary placeholder:text-text-muted"
          />
        </div>
        <div className="flex items-center gap-3">
           <button className="p-3 bg-bg-tertiary border border-border-main rounded-2xl text-text-muted hover:text-orange transition-all">
             <Filter className="w-5 h-5" />
           </button>
        </div>
      </div>

      {/* TABLE LIST */}
      <div className="card-premium overflow-hidden">
        <div className="px-8 py-6 border-b border-border-main bg-bg-secondary">
           <SectionHeader title="Historique des Sorties de Caisse" subtitle="Registre chronologique des dépenses déclarées" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-bg-tertiary">
              <tr>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-text-muted tracking-widest">#</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-text-muted tracking-widest">Motif de la dépense</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-text-muted tracking-widest text-center">Montant</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-text-muted tracking-widest text-center">Date</th>
                <th className="px-8 py-5 text-[10px] font-black uppercase text-text-muted tracking-widest text-right">Justificatif</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-main">
              {filteredSorties.length > 0 ? filteredSorties.map((s, idx) => (
                <tr key={s.id} className="hover:bg-bg-tertiary transition-colors group">
                  <td className="px-8 py-5 text-[11px] font-black text-text-muted">{(idx + 1).toString().padStart(2, '0')}</td>
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 bg-orange/10 rounded-xl flex items-center justify-center text-orange group-hover:scale-110 transition-transform">
                         <TrendingDown className="w-5 h-5" />
                      </div>
                      <span className="text-[14px] font-black text-text-primary uppercase tracking-tight italic">{s.reason}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <span className="text-[16px] font-black text-orange italic">-{formatCurrency(s.amount)}</span>
                  </td>
                  <td className="px-8 py-5 text-center">
                    <div className="inline-flex items-center gap-2 bg-bg-secondary px-3 py-1 rounded-lg border border-border-main text-[11px] font-bold text-text-muted">
                       <Calendar className="w-3 h-3" />
                       {s.date}
                    </div>
                  </td>
                  <td className="px-8 py-5 text-right">
                    <button className="text-[10px] font-black text-action uppercase tracking-widest hover:underline">Voir PDF</button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={5} className="px-8 py-20 text-center text-text-muted font-bold italic text-sm animate-pulse">
                    Aucune sortie enregistrée correspondant à votre recherche.
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* ADD MODAL */}
      <AnimatePresence>
        {isAddModalOpen && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4">
            <motion.div 
              initial={{ opacity: 0 }}
              animate={{ opacity: 1 }}
              exit={{ opacity: 0 }}
              onClick={() => setIsAddModalOpen(false)}
              className="absolute inset-0 bg-navy/60 backdrop-blur-sm"
            />
            
            <motion.div 
              initial={{ opacity: 0, scale: 0.9, y: 20 }}
              animate={{ opacity: 1, scale: 1, y: 0 }}
              exit={{ opacity: 0, scale: 0.9, y: 20 }}
              className="relative w-full max-w-lg bg-bg-secondary rounded-[40px] shadow-2xl border border-border-main/50 overflow-hidden"
            >
              <div className="bg-orange p-8 text-white">
                <h2 className="text-2xl font-black uppercase tracking-tighter italic">Déclarer une dépense</h2>
                <p className="text-white/60 text-[11px] font-bold uppercase tracking-widest mt-1">Saisie manuelle d'une sortie de caisse</p>
              </div>

              <form onSubmit={handleAddSortie} className="p-8 space-y-6">
                <div className="space-y-4">
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Motif du décaissement</label>
                    <input 
                      type="text" 
                      required
                      value={selectedReason}
                      onChange={(e) => setSelectedReason(e.target.value)}
                      placeholder="Ex: Maintenance Groupe Électrogène" 
                      className="w-full px-5 py-4 bg-bg-tertiary border border-border-main rounded-2xl outline-none focus:border-orange font-bold text-sm text-text-primary"
                    />
                  </div>
                  <div className="space-y-2">
                    <label className="text-[10px] font-black uppercase tracking-widest text-text-muted ml-1">Montant investi (FCFA)</label>
                    <input 
                      type="number" 
                      required
                      value={selectedAmount}
                      onChange={(e) => setSelectedAmount(e.target.value)}
                      placeholder="Ex: 25000" 
                      className="w-full px-5 py-4 bg-bg-tertiary border border-border-main rounded-2xl outline-none focus:border-orange font-bold text-sm text-text-primary"
                    />
                  </div>
                </div>

                <div className="flex items-center gap-4 pt-4">
                  <button type="submit" className="flex-1 py-5 bg-orange text-white font-black rounded-2xl uppercase tracking-widest text-[12px] shadow-xl shadow-orange/20 hover:scale-[1.02] transition-all">
                    Confirmer la sortie
                  </button>
                  <button type="button" onClick={() => setIsAddModalOpen(false)} className="px-8 py-5 bg-bg-tertiary text-text-muted font-black rounded-2xl uppercase tracking-widest text-[12px]">
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
