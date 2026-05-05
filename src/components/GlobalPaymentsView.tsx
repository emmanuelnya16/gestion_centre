import React, { useState } from 'react';
import { 
  TrendingUp, 
  Wallet, 
  Clock, 
  AlertCircle,
  Download,
  Plus,
  ArrowUpRight,
  ChevronRight,
  TrendingDown,
  PieChart as PieIcon,
  Filter,
  Search,
  Calendar,
  CheckCircle2
} from 'lucide-react';
import { 
  BarChart, 
  Bar, 
  XAxis, 
  YAxis, 
  CartesianGrid, 
  Tooltip as RechartsTooltip, 
  ResponsiveContainer,
  Cell,
  AreaChart,
  Area,
  Legend
} from 'recharts';
import { 
  mockDashboardStats, 
  mockCenters, 
  mockStudents,
  caByCenter 
} from '../mockData';
import { 
  SectionHeader, 
  formatCurrency, 
  cn,
  PaymentStatusBadge 
} from './UIComponents';
import { motion, AnimatePresence } from 'motion/react';

export function GlobalPaymentsView({ role }: { role: 'admin' | 'center' }) {
  const currentCenterId = role === 'center' ? 'c1' : 'all';
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCenter, setSelectedCenter] = useState(currentCenterId);
  
  const center = mockCenters.find(c => c.id === currentCenterId) || mockCenters[0];
  
  // Prepare data for the global performance chart
  const performanceData = caByCenter
    .filter(c => role === 'admin' || c.id === currentCenterId)
    .map(c => ({
      name: c.name,
      encaissé: c.encaissé,
      créances: c.créances,
      total: c.encaissé + c.créances
    }));

  // Calculate late payments data
  const lateStudents = mockStudents
    .filter(s => s.paymentStatus === 'En retard')
    .filter(s => selectedCenter === 'all' || s.centerId === selectedCenter);
    
  const totalLateAmount = lateStudents.reduce((acc, curr) => acc + (curr.totalDue - curr.totalPaid), 0);

  // Recent transactions mockup
  const initialTransactions = [
    { id: 'tx1', student: 'JOSEPH ABENA', center: 'Jouvence', centerId: 'c1', amount: 60000, date: '10/01/2025', method: 'Orange Money', status: 'confirmé' },
    { id: 'tx2', student: 'CLAIRE NGO MBOCK', center: 'Jouvence', centerId: 'c1', amount: 120000, date: '01/02/2025', method: 'Espèces', status: 'confirmé' },
    { id: 'tx3', student: 'PAULIN FOTSO', center: 'Damas', centerId: 'c2', amount: 60000, date: '15/01/2025', method: 'Virement', status: 'confirmé' },
    { id: 'tx4', student: 'EMMANUEL KAMDEM', center: 'Bafoussam', centerId: 'c3', amount: 40000, date: '01/03/2025', method: 'Mtn Momo', status: 'confirmé' },
  ];

  const filteredTransactions = initialTransactions.filter(tx => {
    const matchesSearch = tx.student.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.center.toLowerCase().includes(searchTerm.toLowerCase()) ||
                         tx.method.toLowerCase().includes(searchTerm.toLowerCase());
    const matchesCenter = selectedCenter === 'all' || tx.centerId === selectedCenter;
    return matchesSearch && matchesCenter;
  });

  return (
    <div className="space-y-10 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-[28px] md:text-[32px] font-black text-text-primary tracking-tighter uppercase mb-2">
            {role === 'admin' ? 'Finance & Paiements Globaux' : 'Opérations & Encaissements'}
          </h1>
          <p className="text-text-secondary font-medium text-[14px]">
            {role === 'admin' ? 'Cockpit de surveillance financière du réseau MERS' : `Suivi financier et encaissements du centre ${center.name}`}
          </p>
        </div>
        <div className="flex items-center gap-3">
          <button className="flex-1 md:flex-none px-6 py-4 bg-bg-secondary border border-border-main text-text-primary font-black rounded-2xl shadow-sm flex items-center justify-center gap-3 uppercase tracking-widest text-[11px] hover:bg-bg-tertiary transition-all">
            <Download className="w-4 h-4" /> Rapport financier
          </button>
          {role === 'center' && (
            <button className="flex-1 md:flex-none px-6 py-4 bg-emerald-500 text-white font-black rounded-2xl shadow-xl shadow-emerald-500/20 flex items-center justify-center gap-3 uppercase tracking-widest text-[11px] hover:scale-[1.02] transition-all active:scale-95">
              Encaisser un paiement <Plus className="w-4 h-4" />
            </button>
          )}
        </div>
      </div>

      <div className="space-y-10 animate-in fade-in duration-500">
          {/* KPI GRID */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            <KpiFinancialCard 
              label={role === 'admin' ? "CA Total Encaissé" : "CA Encaissé Centre"}
              value={formatCurrency(role === 'admin' ? mockDashboardStats.totalRevenue : center.totalRevenue)}
              icon={TrendingUp} 
              trend="+12.5%" 
              trendUp={true}
              color="success"
            />
            <KpiFinancialCard 
              label="Créances en cours" 
              value={formatCurrency(role === 'admin' ? mockDashboardStats.totalDue : (mockStudents.filter(s => s.centerId === currentCenterId).reduce((acc, s) => acc + (s.totalDue - s.totalPaid), 0)))} 
              icon={Clock} 
              trend="-4.2%" 
              trendUp={true}
              color="warning"
            />
            <KpiFinancialCard 
              label="Taux de Recouvrement" 
              value="85.2%" 
              icon={CheckCircle2} 
              trend="+1.8%" 
              trendUp={true}
              color="action"
            />
            <KpiFinancialCard 
              label={role === 'admin' ? "Impayés Critiques" : "Alertes Retard"}
              value={role === 'admin' ? formatCurrency(totalLateAmount) : lateStudents.length} 
              icon={AlertCircle} 
              trend={role === 'admin' ? "+3% vs mois" : "-5%"} 
              trendUp={role === 'admin' ? false : true}
              color={role === 'admin' || lateStudents.length > 5 ? "danger" : "warning"}
            />
          </div>
          
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
            {/* REVENUE DISTRIBUTION CHART */}
            <div className="lg:col-span-8 card-premium p-8 h-fit">
              <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 mb-10">
                <SectionHeader 
                  title={role === 'admin' ? "Performance Financière par Centre" : "Performance Mensuelle"} 
                  subtitle={role === 'admin' ? "Comparaison encaissé vs créances" : "Evolution des encaissements"} 
                />
                <div className="flex items-center gap-2 text-wrap">
                   <div className="flex items-center gap-2 mr-4">
                      <div className="w-3 h-3 rounded-full bg-action"></div>
                      <span className="text-[10px] font-black text-text-muted uppercase tracking-widest whitespace-nowrap">Encaissé</span>
                   </div>
                   <div className="flex items-center gap-2">
                      <div className="w-3 h-3 rounded-full bg-border-main"></div>
                      <span className="text-[10px] font-black text-text-muted uppercase tracking-widest whitespace-nowrap">Créances</span>
                   </div>
                </div>
              </div>
              <div className="h-[400px] w-full">
                <ResponsiveContainer width="100%" height="100%">
                  <BarChart data={performanceData} margin={{ top: 20, right: 30, left: 20, bottom: 5 }}>
                    <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-main)" opacity={0.5} />
                    <XAxis 
                      dataKey="name" 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 11, fill: 'var(--text-muted)', fontWeight: 700 }} 
                      dy={10} 
                    />
                    <YAxis 
                      axisLine={false} 
                      tickLine={false} 
                      tick={{ fontSize: 11, fill: 'var(--text-muted)', fontWeight: 700 }}
                      tickFormatter={(val) => `${val / 1000}K`}
                    />
                    <RechartsTooltip 
                      cursor={{ fill: 'var(--bg-tertiary)', radius: 8 }}
                      contentStyle={{ 
                        backgroundColor: 'var(--bg-secondary)', 
                        borderColor: 'var(--border-main)',
                        borderRadius: '16px',
                        boxShadow: '0 10px 30px -5px rgb(0 0 0 / 0.1)',
                        padding: '12px 16px'
                      }}
                      itemStyle={{ fontWeight: '700', fontSize: '13px' }}
                      formatter={(value: number) => [formatCurrency(value), '']}
                    />
                    <Bar dataKey="encaissé" name="Encaissé" fill="var(--color-action)" radius={[8, 8, 0, 0]} barSize={40} />
                    <Bar dataKey="créances" name="Créances" fill="var(--border-main)" radius={[8, 8, 0, 0]} barSize={40} />
                  </BarChart>
                </ResponsiveContainer>
              </div>
            </div>

            {/* COLLECTION RATE RADIAL PROGRESS */}
            <div className="lg:col-span-4 space-y-8">
               <div className="card-premium p-8 h-full flex flex-col items-center justify-center text-center">
                  <SectionHeader title="Taux de Recouvrement" />
                  <div className="relative w-48 h-48 my-8">
                    <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                       <circle className="text-bg-tertiary stroke-current" strokeWidth="8" fill="transparent" r="42" cx="50" cy="50" />
                       <circle 
                        className="text-action stroke-current transition-all duration-1000 ease-out" 
                        strokeWidth="8" 
                        strokeDasharray={`${88 * 2.64} 264`}
                        strokeLinecap="round" 
                        fill="transparent" 
                        r="42" 
                        cx="50" 
                        cy="50" 
                      />
                    </svg>
                    <div className="absolute inset-0 flex flex-col items-center justify-center">
                       <span className="text-[42px] font-black tracking-tighter text-text-primary leading-none">88<span className="text-2xl">.4%</span></span>
                       <span className="text-[10px] text-text-muted font-black uppercase tracking-[0.2em] mt-2">Cible : 95%</span>
                    </div>
                  </div>
                  <p className="text-[13px] font-medium text-text-secondary leading-relaxed px-4">
                    La performance est en hausse de <span className="text-emerald-500 font-bold">+2.4%</span> grâce à la réduction des créances.
                  </p>
                  <div className="w-full mt-10 pt-8 border-t border-border-main space-y-4">
                     <div className="flex justify-between items-center text-[12px] font-bold">
                        <span className="text-text-muted uppercase tracking-widest">Encaissé Réel</span>
                        <span className="text-text-primary">{formatCurrency(role === 'admin' ? mockDashboardStats.totalRevenue : center.totalRevenue)}</span>
                     </div>
                     <div className="flex justify-between items-center text-[12px] font-bold">
                        <span className="text-text-muted uppercase tracking-widest">Global Dû</span>
                        <span className="text-text-primary font-black">{formatCurrency((role === 'admin' ? mockDashboardStats.totalRevenue + mockDashboardStats.totalDue : center.totalRevenue + (mockStudents.filter(s => s.centerId === currentCenterId).reduce((acc, s) => acc + (s.totalDue - s.totalPaid), 0))))}</span>
                     </div>
                  </div>
               </div>
            </div>
          </div>

          <div className="grid grid-cols-1 xl:grid-cols-12 gap-8">
            <div className="xl:col-span-8 card-premium overflow-hidden">
               <div className="px-8 py-6 border-b border-border-main flex items-center justify-between bg-bg-secondary">
                  <SectionHeader title="Dernières Recettes" subtitle="Historique des encaissements" />
                  <div className="flex items-center gap-2">
                     {role === 'admin' && (
                        <select 
                          value={selectedCenter}
                          onChange={(e) => setSelectedCenter(e.target.value)}
                          className="bg-bg-tertiary border border-border-main rounded-xl px-4 py-2 text-[12px] font-bold outline-none focus:border-action transition-all text-text-primary mr-2"
                        >
                          <option value="all">Tous les centres</option>
                          {mockCenters.map(c => <option key={c.id} value={c.id}>{c.name}</option>)}
                        </select>
                     )}
                      <div className="relative group">
                        <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-action transition-colors" />
                        <input 
                          type="text" 
                          placeholder="Filtrer..." 
                          value={searchTerm}
                          onChange={(e) => setSearchTerm(e.target.value)}
                          className="bg-bg-tertiary border border-border-main rounded-xl pl-10 pr-4 py-2 text-[12px] font-bold outline-none focus:border-action w-40 md:w-64 transition-all text-text-primary placeholder:text-text-muted"
                        />
                     </div>
                  </div>
               </div>
               <div className="overflow-x-auto">
                  <table className="w-full text-left">
                     <thead className="bg-bg-tertiary/50">
                        <tr>
                           <th className="px-8 py-5 text-[10px] font-black uppercase text-text-muted tracking-widest">Détails Étudiant</th>
                           {role === 'admin' && <th className="px-8 py-5 text-[10px] font-black uppercase text-text-muted tracking-widest">Centre</th>}
                           <th className="px-8 py-5 text-[10px] font-black uppercase text-text-muted tracking-widest">Montant</th>
                           <th className="px-8 py-5 text-[10px] font-black uppercase text-text-muted tracking-widest">Méthode</th>
                           <th className="px-8 py-5 text-[10px] font-black uppercase text-text-muted tracking-widest">Date</th>
                           <th className="px-8 py-5 text-[10px] font-black uppercase text-text-muted tracking-widest border-l border-border-main/20">État</th>
                        </tr>
                     </thead>
                     <tbody className="divide-y divide-border-main">
                        {filteredTransactions.length > 0 ? filteredTransactions.map((tx) => (
                          <tr key={tx.id} className="hover:bg-bg-tertiary transition-colors group">
                            <td className="px-8 py-5">
                               <div className="flex items-center gap-3">
                                  <div className="w-10 h-10 rounded-xl bg-orange/10 flex items-center justify-center text-orange group-hover:bg-action group-hover:text-white transition-all duration-300">
                                     <Wallet className="w-5 h-5" />
                                  </div>
                                  <div className="flex flex-col">
                                     <span className="text-[14px] font-black text-text-primary uppercase tracking-tight">{tx.student}</span>
                                     <span className="text-[10px] text-text-muted font-black tracking-widest">REF: {tx.id.toUpperCase()}</span>
                                  </div>
                               </div>
                            </td>
                            {role === 'admin' && <td className="px-8 py-5 text-[13px] font-bold text-text-primary capitalize">{tx.center}</td>}
                            <td className="px-8 py-5">
                               <span className="text-[15px] font-black text-emerald-500">{formatCurrency(tx.amount)}</span>
                            </td>
                            <td className="px-8 py-5">
                               <span className="px-3 py-1 bg-bg-tertiary border border-border-main rounded-lg text-[11px] font-bold text-text-primary uppercase tracking-widest">{tx.method}</span>
                            </td>
                            <td className="px-8 py-5 text-[13px] font-medium text-text-secondary">{tx.date}</td>
                            <td className="px-8 py-5 border-l border-border-main/10">
                               <div className="flex items-center gap-2 text-emerald-500 font-bold text-[10px] uppercase tracking-widest">
                                  <CheckCircle2 className="w-3 h-3" /> Validé
                               </div>
                            </td>
                          </tr>
                        )) : (
                          <tr>
                            <td colSpan={role === 'admin' ? 6 : 5} className="px-8 py-10 text-center text-text-muted font-bold text-sm italic">
                              Aucune transaction enregistrée
                            </td>
                          </tr>
                        )}
                     </tbody>
                  </table>
               </div>
            </div>

            <div className="xl:col-span-4 card-premium p-8 h-fit">
               <SectionHeader title="Alertes Retards" subtitle="Suivi des impayés du centre" />
               <div className="space-y-6 mt-8">
                  {lateStudents.slice(0, 5).map((s) => (
                    <div key={s.id} className="p-5 bg-bg-tertiary rounded-2xl border border-border-main/50 group hover:border-danger hover:bg-red-500/5 transition-all">
                       <div className="flex items-center justify-between mb-3">
                          <p className="text-[13px] font-black text-text-primary uppercase tracking-tight">{s.name}</p>
                          <span className="px-2 py-0.5 bg-red-500/10 text-red-500 text-[10px] font-black rounded-md uppercase tracking-widest flex items-center gap-1">
                             <TrendingDown className="w-3 h-3" /> Retard
                          </span>
                       </div>
                       <div className="flex items-center justify-between text-[14px]">
                          <span className="text-text-muted font-bold uppercase tracking-widest text-[10px]">Reliquat :</span>
                          <span className="text-danger font-black">{formatCurrency(s.totalDue - s.totalPaid)}</span>
                       </div>
                    </div>
                  ))}
              </div>
            </div>
          </div>
        </div>
      </div>
    );
}

function KpiFinancialCard({ label, value, icon: Icon, trend, trendUp, color }: any) {
  const colorMap = {
    success: 'text-emerald-500 bg-emerald-500/10 border-l-emerald-500',
    warning: 'text-orange bg-orange/10 border-l-orange',
    danger: 'text-red bg-red/10 border-l-red',
    action: 'text-action bg-action/10 border-l-action'
  };

  return (
    <div className={cn(
      "card-premium p-6 border-l-4 group transition-all cursor-default",
      colorMap[color as keyof typeof colorMap]
    )}>
       <div className="flex justify-between items-start mb-4">
          <div className={cn("w-12 h-12 rounded-xl flex items-center justify-center group-hover:scale-110 transition-transform", colorMap[color as keyof typeof colorMap].split(' ').slice(0, 2).join(' '))}>
             <Icon className="w-6 h-6" />
          </div>
          <div className={cn(
            "flex items-center gap-1.5 px-2 py-1 rounded-lg text-[10px] font-black uppercase tracking-wider",
            trendUp ? "bg-emerald-500/10 text-emerald-500" : "bg-red-500/10 text-red-500"
          )}>
            {trendUp ? <TrendingUp className="w-3 h-3" /> : <TrendingDown className="w-3 h-3" />}
            {trend}
          </div>
       </div>
       <p className="text-[10px] font-black text-text-muted uppercase tracking-[.3em] mb-1 leading-none">{label}</p>
       <p className="text-[26px] font-black text-text-primary tracking-tighter leading-none">{value}</p>
    </div>
  );
}
