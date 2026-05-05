import React, { useState } from 'react';
import { 
  Users, 
  TrendingUp, 
  Clock, 
  Bell, 
  School,
  ArrowUpRight,
  ChevronRight,
  Download,
  Search
} from 'lucide-react';
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
  Legend
} from 'recharts';
import { KpiCard, LevelBadge, PaymentStatusBadge, SectionHeader, formatCurrency } from './UIComponents';
import { 
  mockDashboardStats, 
  enrollmentEvolution, 
  caByCenter, 
  mockStudents,
  mockCenters 
} from '../mockData';
import { motion } from 'motion/react';

export function AdminDashboard() {
  const [searchTerm, setSearchTerm] = useState('');
  const [timeRange, setTimeRange] = useState('Ce trimestre');
  
  // Simulation of data adjustment based on time range
  const getMultiplier = () => {
    if (timeRange === 'Ce mois') return 0.4;
    if (timeRange === 'Cette année') return 3.2;
    return 1; // Ce trimestre
  };

  const multiplier = getMultiplier();
  const adjustedStats = {
    totalStudents: Math.floor(mockDashboardStats.totalStudents * (timeRange === 'Cette année' ? 1.5 : timeRange === 'Ce mois' ? 0.8 : 1)),
    totalRevenue: mockDashboardStats.totalRevenue * multiplier,
    totalDue: mockDashboardStats.totalDue * multiplier,
    activeAlerts: Math.floor(mockDashboardStats.activeAlerts * (timeRange === 'Ce mois' ? 0.5 : 1))
  };

  const levelsData = Object.entries(mockDashboardStats.studentsByLevel).map(([k, v]) => ({ name: k, value: v }));
  
  const levelColors: Record<string, string> = {
    A1: '#1A56DB', A2: '#3730A3', B1: '#92400E', B2: '#78350F', C1: '#9D174D'
  };

  const filteredAlerts = mockStudents
    .filter(s => s.paymentStatus === 'En retard')
    .filter(s => 
      s.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      mockCenters.find(c => c.id === s.centerId)?.name.toLowerCase().includes(searchTerm.toLowerCase())
    );

  const filteredCenters = mockCenters.filter(c => 
    c.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.location.toLowerCase().includes(searchTerm.toLowerCase()) ||
    c.managerName.toLowerCase().includes(searchTerm.toLowerCase())
  );

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-4">
        <div>
          <h1 className="text-[28px] font-bold text-text-primary tracking-tight">Tableau de bord</h1>
          <p className="text-[14px] text-text-secondary mt-1">Yaoundé, Mercredi 29 Avril 2026</p>
        </div>
        <div className="flex flex-col sm:flex-row items-center gap-3">
          <div className="relative group w-full sm:w-64">
            <Search className="absolute left-3 top-1/2 -translate-y-1/2 w-4 h-4 text-text-muted group-focus-within:text-action transition-colors" />
            <input 
              type="text" 
              placeholder="Rechercher alertes, centres..." 
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full pl-10 pr-4 py-2 bg-bg-tertiary border border-border-main rounded-xl outline-none focus:border-action transition-all text-[13px] font-bold text-text-primary placeholder:text-text-muted"
            />
          </div>
          <div className="flex items-center gap-3 w-full sm:w-auto">
            <select 
              value={timeRange}
              onChange={(e) => setTimeRange(e.target.value)}
              className="bg-bg-secondary border border-border-main rounded-lg text-[13px] font-medium px-3 py-2 outline-none focus:ring-2 focus:ring-action/20 text-text-primary flex-1 sm:flex-none cursor-pointer"
            >
              <option>Ce trimestre</option>
              <option>Ce mois</option>
              <option>Cette année</option>
            </select>
            <button className="flex items-center gap-2 bg-bg-secondary border border-border-main text-text-primary px-4 py-2 rounded-lg text-[13px] font-semibold hover:bg-bg-tertiary transition-colors transition-all duration-300 flex-1 sm:flex-none whitespace-nowrap">
              <Download className="w-4 h-4" />
              Exporter
            </button>
          </div>
        </div>
      </div>

      {/* LIGNE 1: 5 KPI CARDS with better layout and animation */}
      <motion.div 
        initial="hidden"
        animate="visible"
        variants={{
          visible: { transition: { staggerChildren: 0.1 } }
        }}
        className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6"
      >
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <KpiCard 
            label="Total étudiants" 
            value={adjustedStats.totalStudents} 
            icon={Users} 
            trend={timeRange === 'Ce mois' ? "↑ +12" : timeRange === 'Cette année' ? "↑ +142" : "↑ +45"} 
            trendUp={true}
            colorClass="border-l-action"
          />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <KpiCard 
            label="CA Encaissé" 
            value={formatCurrency(adjustedStats.totalRevenue)} 
            icon={TrendingUp} 
            trend={timeRange === 'Ce mois' ? "↑ +2.1%" : "↑ +8.3%"} 
            trendUp={true}
            colorClass="border-l-success"
          />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <KpiCard 
            label="Créances en cours" 
            value={formatCurrency(adjustedStats.totalDue)} 
            icon={Clock} 
            trend="↓ -5.1%" 
            trendUp={true}
            colorClass="border-l-warning"
          />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <KpiCard 
            label="Alertes paiement" 
            value={adjustedStats.activeAlerts} 
            icon={Bell} 
            trend={adjustedStats.activeAlerts > 10 ? "↑ Urgent" : "↑ Stable"} 
            trendUp={false}
            colorClass="border-l-danger"
          />
        </motion.div>
        <motion.div variants={{ hidden: { opacity: 0, y: 20 }, visible: { opacity: 1, y: 0 } }}>
          <KpiCard 
            label="Centres actifs" 
            value={mockDashboardStats.totalCenters} 
            icon={School} 
            trend="= stable"
            colorClass="border-l-text-primary"
          />
        </motion.div>
      </motion.div>

      {/* LIGNE 2: EVOLUTION & REPARTITION */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 card-premium p-6">
          <SectionHeader title="Évolution des inscriptions" subtitle="Comparaison vs Année Précédente" />
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <AreaChart data={enrollmentEvolution}>
                <defs>
                  <linearGradient id="colorCurrent" x1="0" y1="0" x2="0" y2="1">
                    <stop offset="5%" stopColor="var(--color-action)" stopOpacity={0.1}/>
                    <stop offset="95%" stopColor="var(--color-action)" stopOpacity={0}/>
                  </linearGradient>
                </defs>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-main)" opacity={0.5} />
                <XAxis dataKey="month" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-muted)', fontWeight: 700 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-muted)', fontWeight: 700 }} />
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    border: '1px solid var(--border-main)', 
                    borderRadius: '16px',
                    boxShadow: '0 10px 15px -3px rgb(0 0 0 / 0.1)',
                    color: 'var(--text-primary)'
                  }} 
                  itemStyle={{ color: 'var(--text-primary)', fontWeight: '700' }}
                />
                <Area type="monotone" dataKey="current" stroke="var(--color-action)" strokeWidth={4} fillOpacity={1} fill="url(#colorCurrent)" name="Année en cours" />
                <Area type="monotone" dataKey="previous" stroke="var(--text-muted)" strokeWidth={2} strokeDasharray="5 5" fill="none" name="Année précédente" iconType="circle" />
              </AreaChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-4 card-premium p-6 flex flex-col">
          <SectionHeader title="Répartition par niveau" />
          <div className="flex-1 flex flex-col justify-center items-center relative min-h-[260px]">
            <ResponsiveContainer width="100%" height={240}>
              <PieChart>
                <Pie 
                  data={levelsData} 
                  innerRadius={65} 
                  outerRadius={95} 
                  paddingAngle={5} 
                  dataKey="value"
                  animationBegin={0}
                  animationDuration={1500}
                >
                  {levelsData.map((entry, index) => (
                    <Cell key={`cell-${index}`} fill={levelColors[entry.name as keyof typeof levelColors] || '#eee'} stroke="transparent" />
                  ))}
                </Pie>
                <Tooltip 
                  contentStyle={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    border: '1px solid var(--border-main)', 
                    borderRadius: '12px',
                    color: 'var(--text-primary)',
                    fontWeight: '700'
                  }} 
                />
              </PieChart>
            </ResponsiveContainer>
            <div className="absolute inset-0 flex flex-col items-center justify-center pointer-events-none mt-8">
              <span className="text-[32px] font-black text-text-primary tracking-tighter">{mockDashboardStats.totalStudents}</span>
              <span className="text-[10px] text-text-muted uppercase font-black tracking-[0.2em] opacity-60">Étudiants</span>
            </div>
          </div>
          <div className="mt-6 grid grid-cols-2 gap-x-4 gap-y-2 px-2">
            {levelsData.map((entry) => (
              <div key={entry.name} className="flex items-center justify-between">
                <div className="flex items-center gap-2">
                  <div className="w-2.5 h-2.5 rounded-full shrink-0" style={{ backgroundColor: levelColors[entry.name] }}></div>
                  <span className="text-[11px] font-black text-text-muted uppercase tracking-wider">{entry.name}</span>
                </div>
                <span className="text-[13px] font-bold text-text-primary">{entry.value}</span>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* LIGNE 3: CA PAR CENTRE & RECOUVREMENT */}
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-12 xl:col-span-7 card-premium p-8">
          <SectionHeader title="Encaissements par centre" />
          <div className="h-[300px] w-full mt-4">
            <ResponsiveContainer width="100%" height="100%">
              <BarChart data={caByCenter}>
                <CartesianGrid strokeDasharray="3 3" vertical={false} stroke="var(--border-main)" opacity={0.5} />
                <XAxis dataKey="name" axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-muted)', fontWeight: 700 }} dy={10} />
                <YAxis axisLine={false} tickLine={false} tick={{ fontSize: 11, fill: 'var(--text-muted)', fontWeight: 700 }} />
                <Tooltip 
                  formatter={(value: number) => formatCurrency(value)}
                  contentStyle={{ 
                    backgroundColor: 'var(--bg-secondary)', 
                    borderColor: 'var(--border-main)',
                    borderRadius: '16px',
                    color: 'var(--text-primary)',
                    fontWeight: '700'
                  }} 
                  itemStyle={{ color: 'var(--text-primary)' }}
                />
                <Legend iconType="circle" wrapperStyle={{ paddingTop: '20px', fontSize: '11px', fontWeight: '700', textTransform: 'uppercase', letterSpacing: '0.05em' }} />
                <Bar dataKey="encaissé" fill="var(--color-action)" radius={[6, 6, 0, 0]} name="Encaissé" />
                <Bar dataKey="créances" fill="var(--text-muted)" opacity={0.3} radius={[6, 6, 0, 0]} name="Créances" />
              </BarChart>
            </ResponsiveContainer>
          </div>
        </div>

        <div className="lg:col-span-12 xl:col-span-5 card-premium p-8 flex flex-col">
          <SectionHeader title="Recouvrement global" />
          <div className="flex-1 flex flex-col items-center justify-center">
             <div className="relative w-56 h-56">
                <svg className="w-full h-full" viewBox="0 0 100 100">
                   <circle 
                    className="stroke-bg-tertiary stroke-current" 
                    strokeWidth="12" 
                    fill="transparent" 
                    r="40" 
                    cx="50" 
                    cy="50" 
                  />
                  <circle 
                    className="text-action stroke-current" 
                    strokeWidth="12" 
                    strokeLinecap="round" 
                    fill="transparent" 
                    r="40" 
                    cx="50" 
                    cy="50" 
                    strokeDasharray={`${85 * 2.51} 251`}
                    transform="rotate(-90 50 50)"
                  />
                </svg>
                <div className="absolute inset-0 flex flex-col items-center justify-center">
                  <span className="text-[36px] font-black text-text-primary">85.2%</span>
                  <span className="text-[10px] text-text-muted font-black uppercase tracking-widest">Global</span>
                </div>
             </div>
              <div className="mt-10 grid grid-cols-2 gap-8 w-full border-t border-border-main pt-8">
                <div>
                  <p className="text-[11px] text-text-muted uppercase font-black tracking-wider">Encaissé</p>
                  <p className="text-[20px] font-black text-emerald-500">{formatCurrency(mockDashboardStats.totalRevenue)}</p>
                </div>
                <div>
                  <p className="text-[11px] text-text-muted uppercase font-black tracking-wider">Théorique</p>
                  <p className="text-[20px] font-black text-text-primary">{formatCurrency(mockDashboardStats.totalRevenue + mockDashboardStats.totalDue)}</p>
                </div>
              </div>
          </div>
        </div>
      </div>

      {/* LIGNE 4: ALERTES ACTIVES */}
      <div className="card-premium overflow-hidden">
        <div className="px-8 py-6 border-b border-border-main flex items-center justify-between">
          <SectionHeader title="Alertes actives" subtitle="10 dernières alertes de paiement" />
          <button className="text-[13px] font-black text-action hover:text-action-hover uppercase tracking-widest transition-colors">Tout voir</button>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-bg-tertiary transition-colors">
              <tr>
                <th className="px-8 py-5 text-[11px] font-black uppercase text-text-muted tracking-widest">Étudiant</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase text-text-muted tracking-widest">Centre</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase text-text-muted tracking-widest">Niveau</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase text-text-muted tracking-widest">Dû</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase text-text-muted tracking-widest">Échéance</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase text-text-muted tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-main transition-colors">
              {filteredAlerts.length > 0 ? filteredAlerts.map((s) => (
                <tr key={s.id} className="group hover:bg-bg-tertiary transition-colors">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-3">
                      <div className="w-10 h-10 rounded-full bg-bg-tertiary flex items-center justify-center text-text-primary font-black border border-border-main">
                        {s.name.substring(0, 2)}
                      </div>
                      <p className="text-[14px] font-bold text-text-primary capitalize">{s.name.toLowerCase()}</p>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-[14px] font-semibold text-text-primary">
                      {mockCenters.find(c => c.id === s.centerId)?.name.split(' ')[1]}
                    </p>
                  </td>
                  <td className="px-8 py-5">
                    <LevelBadge level={s.currentLevel} />
                  </td>
                  <td className="px-8 py-5">
                    <p className="text-[14px] font-black text-danger">{formatCurrency(s.totalDue - s.totalPaid)}</p>
                  </td>
                  <td className="px-8 py-5 text-[13px] font-medium text-text-secondary">
                    15 Mai 2025
                  </td>
                  <td className="px-8 py-5">
                     <button className="flex items-center gap-1.5 text-action font-black text-[12px] uppercase tracking-widest">
                      Relancer <ArrowUpRight className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={6} className="px-8 py-10 text-center text-text-muted font-bold text-sm italic">
                    Aucune alerte correspondant à votre recherche
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>

      {/* LIGNE 5: PERFORMANCE DES CENTRES */}
      <div className="card-premium overflow-hidden">
        <div className="px-8 py-6 border-b border-border-main flex items-center justify-between">
          <SectionHeader title="Performance des centres" subtitle="Analyses comparatives par centre" />
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-left">
            <thead className="bg-bg-tertiary transition-colors">
              <tr>
                <th className="px-8 py-5 text-[11px] font-black uppercase text-text-muted tracking-widest">Centre</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase text-text-muted tracking-widest">Étudiants</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase text-text-muted tracking-widest text-center">A1</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase text-text-muted tracking-widest text-center">B1</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase text-text-muted tracking-widest">Encaissé</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase text-text-muted tracking-widest">Taux</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase text-text-muted tracking-widest">Alertes</th>
                <th className="px-8 py-5 text-[11px] font-black uppercase text-text-muted tracking-widest">Action</th>
              </tr>
            </thead>
            <tbody className="divide-y divide-border-main transition-colors">
              {filteredCenters.length > 0 ? filteredCenters.map((c) => (
                <tr key={c.id} className="hover:bg-bg-tertiary transition-colors group">
                  <td className="px-8 py-5">
                    <div className="flex items-center gap-4">
                      <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 shadow-[0_0_8px_rgba(16,185,129,0.4)]"></div>
                      <span className="text-[14px] font-black text-text-primary uppercase group-hover:text-action transition-colors">{c.name}</span>
                    </div>
                  </td>
                  <td className="px-8 py-5 text-[14px] font-bold text-text-primary px-10">{c.studentCount}</td>
                  <td className="px-8 py-5 text-[14px] text-center font-bold text-text-muted">{Math.floor(c.studentCount * 0.3)}</td>
                  <td className="px-8 py-5 text-[14px] text-center font-bold text-text-muted">{Math.floor(c.studentCount * 0.2)}</td>
                  <td className="px-8 py-5 text-[14px] font-black text-emerald-500">
                    {formatCurrency(c.totalRevenue)}
                  </td>
                  <td className="px-8 py-5 w-40">
                    <div className="flex items-center gap-3">
                      <div className="flex-1 h-2 bg-bg-tertiary rounded-full overflow-hidden border border-border-main/50">
                        <div className="h-full bg-emerald-500" style={{ width: '85%' }}></div>
                      </div>
                      <span className="text-[12px] font-black text-text-primary">85%</span>
                    </div>
                  </td>
                  <td className="px-8 py-5">
                    <span className="px-2.5 py-1 rounded-lg bg-red-500/10 text-red-500 text-[12px] font-black border border-red-500/20">{Math.floor(Math.random() * 3)}</span>
                  </td>
                  <td className="px-8 py-5">
                    <button className="w-9 h-9 flex items-center justify-center bg-bg-tertiary rounded-xl group-hover:bg-action group-hover:text-white transition-all text-text-muted">
                      <ChevronRight className="w-5 h-5" />
                    </button>
                  </td>
                </tr>
              )) : (
                <tr>
                  <td colSpan={8} className="px-8 py-10 text-center text-text-muted font-bold text-sm italic">
                    Aucun centre correspondant à votre recherche
                  </td>
                </tr>
              )}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
}
