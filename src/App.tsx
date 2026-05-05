import React, { useState, useEffect } from 'react';
import { 
  LayoutDashboard, 
  Users, 
  Wallet, 
  GraduationCap, 
  Bell, 
  Settings, 
  Search,
  Plus,
  ArrowUpRight,
  ShieldCheck,
  ChevronRight,
  Menu,
  X,
  School,
  LogOut,
  FileText,
  User,
  Mail,
  Lock,
  CheckCircle2,
  TrendingUp,
  Moon,
  Sun,
  Globe,
  Monitor,
  Eye,
  EyeOff
} from 'lucide-react';
import { motion, AnimatePresence } from 'motion/react';

import { AdminDashboard } from './components/AdminDashboard';
import { CenterDashboard } from './components/CenterDashboard';
import { CentersView } from './components/CentersView';
import { CentersManagementView } from './components/CentersManagementView';
import { GlobalStudentsView } from './components/GlobalStudentsView';
import { GlobalPaymentsView } from './components/GlobalPaymentsView';
import { NotificationsView } from './components/NotificationsView';
import { LogisticsView } from './components/LogisticsView';
import { VorbereitungView } from './components/VorbereitungView';
import { SortiesView } from './components/SortiesView';
import { cn } from './components/UIComponents';

type View = 'dashboard' | 'students' | 'centers' | 'centers-mgmt' | 'payments' | 'sorties' | 'vorbereitung' | 'notifications' | 'settings' | 'reports' | 'logistics';
type Role = 'admin' | 'center';

interface LoginPageProps {
  onLogin: (role: Role) => void;
  onBack: () => void;
}

function LandingPage({ onStart, onLogin }: { onStart: () => void, onLogin: () => void }) {
  return (
    <div className="min-h-screen bg-bg-primary transition-colors duration-500 overflow-x-hidden selection:bg-orange selection:text-white">
      {/* NAVBAR */}
      <nav className="h-24 px-6 md:px-12 flex items-center justify-between sticky top-0 bg-transparent backdrop-blur-xl z-50 transition-all border-b border-border-main/50">
        <div className="flex items-center gap-3 group cursor-pointer">
          <div className="w-12 h-12 bg-navy rounded-[18px] flex items-center justify-center shadow-2xl shadow-navy/20 group-hover:rotate-6 transition-all duration-500">
            <GraduationCap className="w-7 h-7 text-white" />
          </div>
          <div className="flex flex-col">
            <span className="text-[22px] font-black text-text-primary tracking-tighter uppercase leading-none">MersGestion</span>
            <span className="text-[10px] font-black text-orange uppercase tracking-[0.3em] leading-none mt-1">Management Cockpit</span>
          </div>
        </div>
        
        <div className="hidden lg:flex items-center gap-8">
          {['Plateforme', 'Solution', 'Avis', 'Contact'].map((item, idx) => (
            <a key={item} href={`#${item.toLowerCase()}`} className="group flex flex-col items-center">
              <span className="text-[11px] font-black uppercase tracking-widest text-text-secondary group-hover:text-action transition-colors px-4 py-2">
                {item}
              </span>
              <div className="w-0 h-0.5 bg-orange group-hover:w-full transition-all duration-300"></div>
            </a>
          ))}
        </div>

        <div className="flex items-center gap-4">
          <button 
            onClick={onLogin}
            className="hidden sm:block px-6 py-3 text-text-primary font-black uppercase tracking-widest text-[11px] hover:text-action transition-colors"
          >
            Se Connecter
          </button>
          <button 
            onClick={onStart}
            className="px-8 py-3.5 bg-navy text-white font-black rounded-2xl hover:bg-navy/90 transition-all shadow-xl shadow-navy/20 flex items-center gap-2 uppercase tracking-widest text-[11px] active:scale-95"
          >
            Démarrer <ArrowUpRight className="w-4 h-4" />
          </button>
        </div>
      </nav>

      {/* HERO SECTION - REVOLUTIONARY LOOK */}
      <section className="relative px-6 pt-16 pb-32 overflow-hidden">
        {/* Abstract Background Shapes */}
        <div className="absolute top-20 -left-20 w-96 h-96 bg-action/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute bottom-20 -right-20 w-96 h-96 bg-orange/10 blur-[120px] rounded-full pointer-events-none"></div>
        <div className="absolute top-1/2 left-1/2 -translate-x-1/2 -translate-y-1/2 w-[800px] h-[800px] border border-border-main/20 rounded-full pointer-events-none border-dashed opacity-30"></div>

        <div className="max-w-7xl mx-auto relative z-10">
          <div className="flex flex-col items-center text-center max-w-4xl mx-auto mb-20">
            <motion.div 
              initial={{ opacity: 0, y: 20 }}
              animate={{ opacity: 1, y: 0 }}
              className="inline-flex items-center gap-2 px-4 py-2 bg-orange/10 border border-orange/20 rounded-full mb-8"
            >
              <div className="w-2 h-2 bg-orange rounded-full animate-pulse"></div>
              <span className="text-[10px] font-black text-orange uppercase tracking-widest">Nouveau : Module Vorbereitung 2.0</span>
            </motion.div>

            <motion.h1 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.1 }}
              className="text-6xl md:text-[92px] font-black text-text-primary leading-[0.9] tracking-tighter mb-10 selection:bg-navy selection:text-white"
            >
              Gérer vos centres avec une <br className="hidden md:block" />
              <span className="text-transparent bg-clip-text bg-gradient-to-r from-navy via-action to-orange">Précision Absolute.</span>
            </motion.h1>

            <motion.p 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.2 }}
              className="text-xl text-text-secondary font-medium max-w-2xl leading-relaxed mb-12"
            >
              La première solution de cockpit intelligente dédiée aux centres de formation. 
              Réduisez vos créances de <span className="text-red font-bold">40%</span> et gagnez <span className="text-orange font-bold">15h</span> par semaine sur votre administration.
            </motion.p>

            <motion.div 
              initial={{ opacity: 0, y: 30 }}
              animate={{ opacity: 1, y: 0 }}
              transition={{ delay: 0.3 }}
              className="flex flex-col sm:flex-row gap-5"
            >
              <button 
                onClick={onStart}
                className="px-12 py-6 bg-navy text-white rounded-[24px] font-black shadow-2xl shadow-navy/30 hover:scale-105 transition-all flex items-center justify-center gap-4 uppercase tracking-[0.2em] text-xs group"
              >
                Ouvrir le Cockpit
                <div className="w-8 h-8 bg-white/10 rounded-xl flex items-center justify-center group-hover:bg-orange transition-colors">
                  <ChevronRight className="w-4 h-4" />
                </div>
              </button>
              <button className="px-12 py-6 bg-white dark:bg-bg-secondary border border-border-main text-text-primary font-black rounded-[24px] hover:bg-bg-tertiary transition-all flex items-center justify-center gap-4 uppercase tracking-[0.2em] text-xs shadow-xl shadow-black/5">
                Voir la Démo
                <Monitor className="w-5 h-5 text-text-muted" />
              </button>
            </motion.div>
          </div>

          {/* MOCKUP SECTION - BENTO STYLE DASHBOARD PREVIEW */}
          <motion.div 
            initial={{ opacity: 0, y: 60 }}
            animate={{ opacity: 1, y: 0 }}
            transition={{ delay: 0.5, duration: 1 }}
            className="mt-10 relative"
          >
            <div className="relative bg-bg-secondary border-[12px] border-border-main/50 rounded-[60px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.3)] overflow-hidden scale-95 hover:scale-100 transition-transform duration-700 aspect-video md:aspect-[21/9]">
              <div className="absolute inset-0 bg-bg-primary p-8 md:p-12">
                <div className="grid grid-cols-12 gap-6 h-full">
                  {/* Mock Sidebar */}
                  <div className="col-span-2 space-y-6 hidden md:block">
                    <div className="w-12 h-12 bg-navy rounded-2xl mb-12"></div>
                    {[1,2,3,4,5].map(i => (
                      <div key={i} className={`h-8 w-full rounded-lg ${i===1 ? 'bg-navy' : 'bg-border-main'}`}></div>
                    ))}
                  </div>
                  {/* Mock Main Content */}
                  <div className="col-span-12 md:col-span-10 space-y-8">
                    <div className="flex justify-between items-center">
                      <div className="h-10 w-48 bg-border-main rounded-xl"></div>
                      <div className="h-10 w-10 bg-border-main rounded-xl"></div>
                    </div>
                    <div className="grid grid-cols-3 gap-6">
                      <div className="h-32 bg-white border border-border-main rounded-3xl p-4 flex flex-col justify-between">
                        <div className="w-8 h-8 bg-action/10 rounded-lg"></div>
                        <div className="h-4 w-12 bg-action/20 rounded"></div>
                      </div>
                      <div className="h-32 bg-white border border-border-main rounded-3xl p-4 flex flex-col justify-between">
                        <div className="w-8 h-8 bg-orange/10 rounded-lg"></div>
                        <div className="h-4 w-12 bg-orange/20 rounded"></div>
                      </div>
                      <div className="h-32 bg-white border border-border-main rounded-3xl p-4 flex flex-col justify-between">
                        <div className="w-8 h-8 bg-red/10 rounded-lg"></div>
                        <div className="h-4 w-12 bg-red/20 rounded"></div>
                      </div>
                    </div>
                    <div className="h-48 bg-white border border-border-main rounded-3xl flex items-center justify-center">
                      <TrendingUp className="w-20 h-20 text-border-main opacity-50" />
                    </div>
                  </div>
                </div>
              </div>
              
              {/* Overlay Floating Badges */}
              <motion.div 
                animate={{ y: [0, -10, 0] }}
                transition={{ duration: 4, repeat: Infinity, ease: "easeInOut" }}
                className="absolute top-20 right-20 bg-white border border-border-main p-4 rounded-2xl shadow-2xl flex items-center gap-4 z-20 hidden md:flex"
              >
                <div className="w-10 h-10 bg-success rounded-full flex items-center justify-center text-white">
                  <CheckCircle2 className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-text-muted uppercase tracking-widest">Paiement reçu</p>
                  <p className="font-black text-text-primary">+125,000 F</p>
                </div>
              </motion.div>

              <motion.div 
                animate={{ y: [0, 10, 0] }}
                transition={{ duration: 5, repeat: Infinity, ease: "easeInOut", delay: 1 }}
                className="absolute bottom-20 left-40 bg-navy p-5 rounded-2xl shadow-2xl flex items-center gap-4 z-20 hidden md:flex border border-white/10"
              >
                <div className="w-12 h-12 bg-orange rounded-xl flex items-center justify-center text-white shadow-lg shadow-orange/30">
                  <Users className="w-6 h-6" />
                </div>
                <div>
                  <p className="text-[10px] font-black text-white/60 uppercase tracking-widest">Nouvel Étudiant</p>
                  <p className="font-black text-white">Abdoulaye Ndiaye</p>
                </div>
              </motion.div>
            </div>
          </motion.div>
        </div>
      </section>

      {/* VALUE PROPOSITION - THE BENTO GRID */}
      <section className="py-32 px-6 bg-white dark:bg-bg-secondary transition-colors duration-500">
        <div className="max-w-7xl mx-auto">
          <div className="flex flex-col md:flex-row md:items-end justify-between gap-10 mb-20">
            <div className="max-w-2xl">
              <span className="text-[11px] font-black text-orange uppercase tracking-[.4em] mb-4 block">Efficacité Redéfinie</span>
              <h2 className="text-4xl md:text-5xl font-black text-text-primary tracking-tighter leading-tight">
                Concentrez-vous sur l'apprentissage, <br className="hidden md:block" />
                <span className="text-action">MersGestion</span> s'occupe du reste.
              </h2>
            </div>
            <p className="text-text-secondary font-medium max-w-xs mb-2">
              Une architecture pensée pour la productivité et le suivi en temps réel de vos KPIs.
            </p>
          </div>

          <div className="grid grid-cols-1 md:grid-cols-4 grid-rows-2 gap-6 min-h-[600px]">
             {/* Feature 1: Large Bento */}
             <div className="md:col-span-2 md:row-span-2 bg-bg-primary rounded-[40px] p-10 border border-border-main group hover:border-action transition-all overflow-hidden relative">
                <div className="absolute -right-20 -bottom-20 w-64 h-64 bg-action/5 rounded-full group-hover:scale-150 transition-transform duration-700"></div>
                <div className="relative z-10 space-y-6">
                  <div className="w-16 h-16 bg-navy text-white rounded-2xl flex items-center justify-center shadow-2xl">
                    <Wallet className="w-8 h-8" />
                  </div>
                  <h3 className="text-3xl font-black text-text-primary tracking-tight">Recouvrement intelligent</h3>
                  <p className="text-text-secondary text-lg leading-relaxed">
                    Identifiez instantanément les retards de paiement et générez des rappels automatiques. 
                    Ne perdez plus aucune trace de vos tranches financières.
                  </p>
                  <div className="pt-10 grid grid-cols-2 gap-6">
                     <div className="bg-white p-6 rounded-3xl shadow-sm border border-border-main">
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Impact</p>
                        <p className="text-2xl font-black text-emerald-500">-32%</p>
                        <p className="text-[10px] font-bold text-text-secondary">D'impayés</p>
                     </div>
                     <div className="bg-white p-6 rounded-3xl shadow-sm border border-border-main">
                        <p className="text-[10px] font-black text-text-muted uppercase tracking-widest mb-1">Vitesse</p>
                        <p className="text-2xl font-black text-orange">2.4x</p>
                        <p className="text-[10px] font-bold text-text-secondary">Plus rapide</p>
                     </div>
                  </div>
                </div>
             </div>

             {/* Feature 2: Small Bento (Orange) */}
             <div className="md:col-span-2 bg-orange rounded-[40px] p-10 flex flex-col justify-between group cursor-pointer hover:shadow-2xl hover:shadow-orange/20 transition-all overflow-hidden relative">
                <div className="absolute top-0 right-0 p-8 text-white/20 group-hover:rotate-12 transition-transform">
                  <Globe className="w-32 h-32" />
                </div>
                <div className="relative z-10">
                  <div className="flex items-center gap-3 mb-6">
                    <div className="w-10 h-10 bg-white/20 backdrop-blur-md rounded-xl flex items-center justify-center text-white">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <span className="text-[11px] font-black text-white uppercase tracking-widest">Multi-Centres</span>
                  </div>
                  <h3 className="text-3xl font-black text-white tracking-tight mb-4">Pilotage centralisé</h3>
                  <p className="text-white/80 max-w-sm">Supervisez tous vos centres depuis une seule interface. Comparez les performances et harmonisez vos méthodes.</p>
                </div>
                <div className="relative z-10 flex items-center gap-2 text-white font-black uppercase text-[10px] tracking-widest pt-8">
                  Explorer la vue Admin <ArrowUpRight className="w-4 h-4" />
                </div>
             </div>

             {/* Feature 3: Small Bento (Black/Navy) */}
             <div className="bg-navy rounded-[40px] p-8 flex flex-col justify-center items-center text-center group cursor-pointer border border-white/5">
                <div className="w-16 h-16 bg-white/5 rounded-full flex items-center justify-center text-orange group-hover:scale-110 transition-transform mb-6">
                  <ShieldCheck className="w-8 h-8" />
                </div>
                <h4 className="text-white font-black uppercase tracking-widest text-xs mb-2">Sécurité Cloud</h4>
                <p className="text-white/50 text-[11px]">Données encryptées & Sauvegardes quotidiennes</p>
             </div>

             {/* Feature 4: Small Bento (Red) */}
             <div className="bg-red rounded-[40px] p-8 flex flex-col justify-center items-center text-center group cursor-pointer transition-all hover:bg-red/90">
                <div className="w-16 h-16 bg-white/10 rounded-full flex items-center justify-center text-white mb-6">
                  <Bell className="w-8 h-8" />
                </div>
                <h4 className="text-white font-black uppercase tracking-widest text-xs mb-2">Alertes Temps Réel</h4>
                <p className="text-white/70 text-[11px]">Notifications instantanées sur mobiles & web</p>
             </div>
          </div>
        </div>
      </section>

      {/* FINAL CTA SECTION - BOLD & ICONIC */}
      <section className="py-40 px-6 relative overflow-hidden bg-bg-primary">
         <div className="max-w-5xl mx-auto rounded-[60px] bg-navy p-12 md:p-32 text-center relative overflow-hidden shadow-[0_50px_100px_rgba(10,27,94,0.4)]">
            <div className="absolute -top-40 -left-40 w-96 h-96 bg-orange/20 blur-[140px] rounded-full pointer-events-none"></div>
            <div className="absolute -bottom-40 -right-40 w-96 h-96 bg-action/20 blur-[140px] rounded-full pointer-events-none"></div>
            
            <div className="relative z-10 space-y-12">
               <div className="flex justify-center">
                  <AvatarGroup />
               </div>
               <h2 className="text-4xl md:text-7xl font-black text-white leading-none tracking-tighter">
                  Prêt à passer au <br />
                  <span className="text-orange italic">niveau supérieur?</span>
               </h2>
               <div className="flex flex-col sm:flex-row items-center justify-center gap-6">
                  <button 
                    onClick={onLogin}
                    className="w-full sm:w-auto px-12 py-6 bg-orange text-white font-black rounded-3xl hover:bg-orange/90 hover:scale-105 transition-all shadow-2xl shadow-orange/40 uppercase tracking-[0.2em] text-xs active:scale-95"
                  >
                    Demander mon accès
                  </button>
                  <button className="w-full sm:w-auto px-12 py-6 bg-white/10 backdrop-blur-md text-white border border-white/20 font-black rounded-3xl hover:bg-white transition-all hover:text-navy uppercase tracking-[0.2em] text-xs active:scale-95">
                    Parler à un expert
                  </button>
               </div>
               <p className="text-white/40 text-[10px] font-bold uppercase tracking-[0.3em]">Version 2.0 · Performance & Stabilité</p>
            </div>
         </div>
      </section>

      {/* FOOTER */}
      <footer className="py-20 px-6 border-t border-border-main bg-bg-secondary transition-colors duration-500">
        <div className="max-w-7xl mx-auto flex flex-col md:flex-row justify-between items-center gap-10">
          <div className="flex items-center gap-3">
             <div className="w-10 h-10 bg-navy rounded-xl flex items-center justify-center">
                <GraduationCap className="w-6 h-6 text-white" />
             </div>
             <span className="text-xl font-black text-text-primary tracking-tighter uppercase">MersGestion</span>
          </div>
          
          <div className="flex items-center gap-10">
             {['Privacy', 'Terms', 'Support'].map(link => (
               <a key={link} href="#" className="text-[11px] font-bold text-text-muted hover:text-action uppercase tracking-widest transition-colors">{link}</a>
             ))}
          </div>

          <p className="text-[10px] text-text-muted font-bold tracking-widest uppercase">&copy; 2025 Mers-Linguistics Sarl · Dakar, Sénégal</p>
        </div>
      </footer>
    </div>
  );
}

function AvatarGroup() {
  return (
    <div className="flex -space-x-3">
      {[1, 2, 3, 4].map((i) => (
        <div key={i} className="w-12 h-12 rounded-full border-4 border-navy bg-border-main overflow-hidden shadow-xl">
          <img src={`https://i.pravatar.cc/100?u=mers${i}`} alt="User" />
        </div>
      ))}
      <div className="w-12 h-12 rounded-full border-4 border-navy bg-orange flex items-center justify-center text-white text-[10px] font-black shadow-xl">
        +50
      </div>
    </div>
  );
}

function LoginPage({ onLogin, onBack }: LoginPageProps) {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showPassword, setShowPassword] = useState(false);

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!email || !password) return;
    
    setIsSubmitting(true);
    // Authentification simulation logic
    setTimeout(() => {
      const detectedRole: Role = email.toLowerCase().includes('admin') ? 'admin' : 'center';
      onLogin(detectedRole);
      setIsSubmitting(false);
    }, 1500);
  };

  return (
    <div className="min-h-screen bg-white flex items-center justify-center p-6 relative overflow-hidden selection:bg-orange selection:text-white">
      {/* Immersive Animated Background */}
      <div className="absolute inset-0 z-0 bg-slate-50 overflow-hidden">
        {/* Soft Animated Orbs - More organic and sophisticated */}
        <motion.div 
          animate={{ 
            x: [0, 40, -20, 0], 
            y: [0, -30, 15, 0],
            scale: [1, 1.05, 0.95, 1]
          }}
          transition={{ duration: 15, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -top-24 -left-24 w-[40rem] h-[40rem] bg-orange/10 blur-[100px] rounded-full"
        />
        <motion.div 
          animate={{ 
            x: [0, -50, 25, 0], 
            y: [0, 40, -25, 0],
            scale: [1, 0.98, 1.05, 1]
          }}
          transition={{ duration: 18, repeat: Infinity, ease: "easeInOut" }}
          className="absolute -bottom-32 -right-32 w-[50rem] h-[50rem] bg-action/10 blur-[120px] rounded-full"
        />
        {/* Subtle grid pattern for texture */}
        <div className="absolute inset-0 opacity-[0.03] bg-[radial-gradient(#0A1B5E_1px,transparent_1px)] [background-size:32px_32px]"></div>
      </div>
      
      <motion.div 
        initial={{ opacity: 0, scale: 0.9, y: 30 }}
        animate={{ opacity: 1, scale: 1, y: 0 }}
        transition={{ duration: 0.8, ease: [0.16, 1, 0.3, 1] }}
        className="w-full max-w-[460px] bg-white rounded-[56px] shadow-[0_40px_100px_-20px_rgba(0,0,0,0.15)] border border-white relative z-10 overflow-hidden"
      >
        {/* Background Image on the form itself */}
        <div className="absolute inset-0 z-0 pointer-events-none">
          <img 
            src="https://images.unsplash.com/photo-1497366754035-f200968a6e72?q=80&w=2601&auto=format&fit=crop" 
            alt="Form Background" 
            className="w-full h-full object-cover opacity-10 brightness-110"
          />
          <div className="absolute inset-0 bg-white/80 backdrop-blur-[2px]"></div>
        </div>

        <div className="relative z-10">
          <div className="flex flex-col items-center text-center mb-12 mt-12 px-8 md:px-14">
            <motion.div 
              whileHover={{ scale: 1.05, rotate: 5 }}
              whileTap={{ scale: 0.95 }}
              onClick={onBack}
              className="w-20 h-20 bg-navy rounded-[28px] flex items-center justify-center shadow-xl mb-8 group cursor-pointer transition-all hover:bg-slate-900"
            >
               <GraduationCap className="w-10 h-10 text-white" />
            </motion.div>
            <h2 className="text-3xl font-black text-navy tracking-tighter mb-1 uppercase leading-none">MersGestion</h2>
            <div className="h-1.5 w-10 bg-orange rounded-full mb-4"></div>
            <p className="text-text-muted font-black uppercase text-[10px] tracking-[0.4em]">Integrated Secure Access</p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6 px-8 md:px-14 pb-14">
          <div className="space-y-2">
            <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary ml-1">Identifiant</label>
            <div className="relative group">
              <Mail className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-action transition-colors" />
              <input 
                type="email" 
                required
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                placeholder="nom@mersgestion.com" 
                className="w-full pl-14 pr-6 py-4 bg-bg-tertiary border border-border-main rounded-2xl outline-none focus:ring-4 focus:ring-action/5 focus:border-action transition-all font-bold text-text-primary placeholder:text-text-muted/40"
              />
            </div>
          </div>
          
          <div className="space-y-2">
            <div className="flex items-center justify-between ml-1">
              <label className="text-[10px] font-black uppercase tracking-[0.2em] text-text-secondary">Clé d'accès</label>
              <button type="button" className="text-[10px] font-black uppercase tracking-widest text-orange hover:underline decoration-2 underline-offset-4">Perdue ?</button>
            </div>
            <div className="relative group">
              <Lock className="absolute left-5 top-1/2 -translate-y-1/2 w-5 h-5 text-text-muted group-focus-within:text-action transition-colors" />
              <input 
                type={showPassword ? "text" : "password"} 
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                placeholder="••••••••" 
                className="w-full pl-14 pr-12 py-4 bg-bg-tertiary border border-border-main rounded-2xl outline-none focus:ring-4 focus:ring-action/5 focus:border-action transition-all font-bold text-text-primary placeholder:text-text-muted/40"
              />
              <button 
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute right-5 top-1/2 -translate-y-1/2 text-text-muted hover:text-action transition-colors"
                title={showPassword ? "Masquer le mot de passe" : "Afficher le mot de passe"}
              >
                {showPassword ? <EyeOff className="w-5 h-5" /> : <Eye className="w-5 h-5" />}
              </button>
            </div>
          </div>

          <button 
            type="submit"
            disabled={isSubmitting}
            className={cn(
              "w-full py-5 bg-navy text-white font-black rounded-2xl shadow-xl shadow-navy/20 transition-all active:scale-95 flex items-center justify-center gap-3 uppercase tracking-widest text-[13px] hover:bg-slate-900 hover:shadow-2xl",
              isSubmitting ? "opacity-90 cursor-not-allowed" : ""
            )}
          >
            {isSubmitting ? (
              <div className="w-6 h-6 border-4 border-white/20 border-t-white rounded-full animate-spin"></div>
            ) : (
              <>Ouvrir la session <ChevronRight className="w-5 h-5" /></>
            )}
          </button>
        </form>

        <div className="mt-12 pt-8 border-t border-border-main/50 flex flex-col items-center gap-6">
           <button 
            type="button"
            onClick={onBack}
            className="text-[11px] font-black uppercase tracking-widest text-text-muted hover:text-navy transition-colors flex items-center gap-2"
           >
             &larr; Portail principal
           </button>
           <div className="flex items-center gap-2 px-4 py-2 bg-emerald-50 rounded-2xl border border-emerald-100">
              <ShieldCheck className="w-4 h-4 text-emerald-500" />
              <p className="text-[10px] text-emerald-600 font-extrabold tracking-widest uppercase">Encryption 256-bit active</p>
           </div>
        </div>
        </div>
      </motion.div>
    </div>
  );
}

export default function App() {
  const [isLanding, setIsLanding] = useState(true);
  const [role, setRole] = useState<Role | null>(null);
  const [activeView, setActiveView] = useState<View>('dashboard');
  const [sidebarOpen, setSidebarOpen] = useState(true);
  const [loading, setLoading] = useState(false);
  const [showToast, setShowToast] = useState(false);
  const [isNotifDropdownOpen, setIsNotifDropdownOpen] = useState(false);
  const [globalSearch, setGlobalSearch] = useState('');
  
  // Settings state
  const [theme, setTheme] = useState<'light' | 'dark'>('light');
  const [language, setLanguage] = useState<'fr' | 'de'>('fr');

  // APPLY THEME
  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // SIMULATE LOADING ON VIEW CHANGE
  useEffect(() => {
    if (!role) return;
    setLoading(true);
    const timer = setTimeout(() => setLoading(false), 800);
    return () => clearTimeout(timer);
  }, [activeView, role]);

  // LOGIN HANDLER
  const handleLogin = (r: Role) => {
    setRole(r);
    setIsLanding(false);
    setShowToast(true);
    setTimeout(() => setShowToast(false), 4000);
  };

  if (isLanding) return <LandingPage onStart={() => setIsLanding(false)} onLogin={() => setIsLanding(false)} />;
  if (!role) return <LoginPage onLogin={handleLogin} onBack={() => setIsLanding(true)} />;

  const navItems = role === 'admin' ? [
    { id: 'dashboard', label: 'Admin Cockpit', icon: LayoutDashboard },
    { id: 'centers-mgmt', label: 'Gestion des centres', icon: School },
    { id: 'centers', label: 'Stats des centres', icon: TrendingUp },
    { id: 'students', label: 'Vue globale étudiants', icon: Users },
    { id: 'payments', label: 'Paiements globaux', icon: Wallet },
    { id: 'notifications', label: 'Notifications', icon: Bell },
    { id: 'settings', label: 'Configuration', icon: Settings },
    { id: 'reports', label: 'Rapports', icon: FileText },
  ] : [
    { id: 'dashboard', label: 'Dashboard Centre', icon: LayoutDashboard },
    { id: 'students', label: 'Mes étudiants', icon: Users },
    { id: 'payments', label: 'Opérations', icon: Wallet },
    { id: 'sorties', label: 'Sorties', icon: ArrowUpRight },
    { id: 'logistics', label: 'Logistique & Salles', icon: School },
    { id: 'vorbereitung', label: 'Vorbereitung', icon: GraduationCap },
    { id: 'notifications', label: 'Messages', icon: Bell },
  ];

  return (
    <div className="flex h-screen bg-bg-primary overflow-hidden font-sans text-text-primary">
      {/* SIDEBAR */}
      <aside 
        className={cn(
          "bg-navy text-white transition-all duration-300 flex flex-col z-50 fixed inset-y-0 lg:relative border-r border-white/5",
          sidebarOpen ? "w-[260px]" : "w-0 lg:w-[64px] overflow-hidden"
        )}
      >
        <div className="p-6 h-[80px] flex items-center gap-3 border-b border-white/5 shrink-0">
          <div className="w-10 h-10 bg-action rounded-xl flex items-center justify-center shrink-0 shadow-lg shadow-action/40">
            <GraduationCap className="w-6 h-6 text-white" />
          </div>
          <span className={cn("font-display text-xl font-bold tracking-tight transition-opacity whitespace-nowrap", !sidebarOpen && "lg:opacity-0")}>
            MersGestion
          </span>
        </div>

        <div className="px-4 py-6 border-b border-white/5 shrink-0">
           <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-full bg-white/10 flex items-center justify-center border border-white/5 shadow-inner shrink-0">
                <User className="w-5 h-5 text-action" />
              </div>
              <div className={cn("flex flex-col transition-opacity overflow-hidden", !sidebarOpen && "lg:opacity-0")}>
                <span className="text-[14px] font-bold truncate">{role === 'admin' ? 'Direction Centrale' : 'Responsable Centre'}</span>
                <span className="text-[11px] text-slate-400 font-bold uppercase tracking-widest">{role}</span>
              </div>
           </div>
        </div>

        <nav className="flex-1 px-3 py-6 space-y-1 overflow-y-auto no-scrollbar">
          {navItems.map((item) => (
            <button
              key={item.id}
              onClick={() => setActiveView(item.id as View)}
              className={cn(
                "sidebar-link w-full group",
                activeView === item.id && "sidebar-link-active"
              )}
            >
              <item.icon className={cn("w-5 h-5 shrink-0 transition-transform group-hover:scale-110", activeView === item.id ? "text-white" : "text-slate-400 group-hover:text-white")} />
              <span className={cn("transition-opacity text-[14px] font-medium whitespace-nowrap", !sidebarOpen && "lg:opacity-0")}>
                {item.label}
              </span>
            </button>
          ))}
        </nav>

        <div className="p-4 mt-auto space-y-1 border-t border-white/5">
          <button 
            onClick={() => setActiveView('settings')}
            className={cn("sidebar-link w-full group", activeView === 'settings' && "sidebar-link-active")}
          >
            <Settings className="w-5 h-5 text-slate-400 group-hover:text-white" />
            <span className={cn("text-[14px] font-medium whitespace-nowrap", !sidebarOpen && "lg:opacity-0")}>Paramètres</span>
          </button>
          <button 
            onClick={() => setRole(null)}
            className="sidebar-link w-full group hover:bg-danger/10 hover:text-danger"
          >
            <LogOut className="w-5 h-5 text-slate-400 group-hover:text-danger" />
            <span className={cn("text-[14px] font-medium whitespace-nowrap", !sidebarOpen && "lg:opacity-0")}>Déconnexion</span>
          </button>
        </div>
      </aside>

      {/* OVERLAY FOR MOBILE */}
      {sidebarOpen && (
        <div 
          className="lg:hidden fixed inset-0 bg-navy/60 backdrop-blur-sm z-40"
          onClick={() => setSidebarOpen(false)}
        />
      )}

      {/* MAIN CONTENT AREA */}
      <div className="flex-1 flex flex-col min-w-0 overflow-hidden relative">
        {/* HEADER BAR */}
        <header className="h-[80px] bg-bg-secondary border-b border-border-main flex items-center justify-between px-6 shrink-0 relative z-30 transition-colors duration-500">
          <div className="flex items-center gap-4">
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="p-2 hover:bg-bg-tertiary rounded-lg lg:hidden"
            >
              <Menu className="w-6 h-6 text-text-primary" />
            </button>
            <button 
              onClick={() => setSidebarOpen(!sidebarOpen)}
              className="hidden lg:flex p-2 hover:bg-bg-tertiary rounded-lg transition-colors"
            >
              <Menu className="w-6 h-6 text-text-primary" />
            </button>
            <div className="hidden sm:flex items-center gap-2 text-text-muted text-sm font-semibold uppercase tracking-wider">
               <span>MersGestion</span>
               <ChevronRight className="w-4 h-4 opacity-30" />
               <span className="text-action font-black">{activeView}</span>
            </div>
          </div>

          <div className="flex items-center gap-4">
             <div className="hidden md:flex items-center bg-bg-tertiary rounded-2xl px-4 py-2.5 gap-2 w-64 lg:w-80 border border-border-main focus-within:ring-4 focus-within:ring-action/5 focus-within:bg-bg-secondary transition-all group">
                <Search className="w-4 h-4 text-text-muted group-focus-within:text-action transition-colors" />
                <input 
                  type="text" 
                  placeholder="Recherche globale (étudiant, centre...)" 
                  value={globalSearch}
                  onChange={(e) => setGlobalSearch(e.target.value)}
                  className="bg-transparent border-none outline-none text-[13px] font-bold w-full text-text-primary placeholder:text-text-muted"
                />
              </div>

              <div className="flex items-center gap-2 relative">
                <button className={cn(
                  "relative p-3 hover:bg-bg-tertiary rounded-2xl transition-colors",
                  (activeView === 'notifications' || isNotifDropdownOpen) && "bg-bg-tertiary"
                  )}
                  onClick={() => setIsNotifDropdownOpen(!isNotifDropdownOpen)}
                >
                  <Bell className="w-5 h-5 text-text-primary" />
                  <span className="absolute top-3 right-3 w-2.5 h-2.5 bg-danger rounded-full border-2 border-bg-secondary shadow-[0_0_10px_rgba(239,68,68,0.5)]"></span>
                </button>
                
                <AnimatePresence>
                  {isNotifDropdownOpen && (
                    <>
                      <div className="fixed inset-0 z-40" onClick={() => setIsNotifDropdownOpen(false)}></div>
                      <motion.div 
                        initial={{ opacity: 0, scale: 0.95, y: 10 }}
                        animate={{ opacity: 1, scale: 1, y: 0 }}
                        exit={{ opacity: 0, scale: 0.95, y: 10 }}
                        className="absolute right-0 top-full mt-4 w-[380px] bg-bg-secondary border border-border-main rounded-[32px] shadow-[0_30px_70px_-15px_rgba(0,0,0,0.3)] p-6 z-50 overflow-hidden"
                      >
                         <div className="flex items-center justify-between mb-6">
                            <h3 className="text-sm font-black uppercase tracking-widest text-text-primary">Alertes Récentes</h3>
                            <button 
                              onClick={() => {
                                setActiveView('notifications');
                                setIsNotifDropdownOpen(false);
                              }}
                              className="text-[10px] font-black text-action uppercase tracking-widest hover:underline"
                            >
                              Voir tout
                            </button>
                         </div>

                         <div className="space-y-4 mb-6">
                            {[
                              { title: 'Nouveau Paiement', desc: 'Joseph A. a réglé 60k F', time: '10m', type: 'success' },
                              { title: 'Alerte Retard', desc: '5 étudiants en retard (Damas)', time: '3h', type: 'danger' },
                              { title: 'Inscription', desc: 'Nouveau dossier à Jouvence', time: '1h', type: 'action' }
                            ].map((n, i) => (
                              <div key={i} className="flex gap-4 p-3 hover:bg-bg-tertiary rounded-2xl transition-colors cursor-pointer group">
                                 <div className={cn(
                                   "w-10 h-10 rounded-xl flex items-center justify-center shrink-0 shadow-sm transition-transform group-hover:scale-110",
                                   n.type === 'success' ? "bg-emerald-500/10 text-emerald-500" : n.type === 'danger' ? "bg-red-500/10 text-red-500" : "bg-action/10 text-action"
                                 )}>
                                    <Bell className="w-5 h-5" />
                                 </div>
                                 <div className="flex-1 space-y-0.5">
                                    <div className="flex items-center justify-between">
                                       <p className="text-[13px] font-black uppercase tracking-tight text-text-primary leading-none">{n.title}</p>
                                       <span className="text-[9px] font-bold text-text-muted">{n.time}</span>
                                    </div>
                                    <p className="text-[11px] text-text-secondary font-medium line-clamp-1">{n.desc}</p>
                                 </div>
                              </div>
                            ))}
                         </div>
                         
                         <button 
                          onClick={() => {
                            setActiveView('notifications');
                            setIsNotifDropdownOpen(false);
                          }}
                          className="w-full py-4 bg-bg-tertiary border border-border-main rounded-2xl text-[11px] font-black uppercase tracking-widest text-text-primary hover:bg-bg-secondary transition-all"
                         >
                           Accéder au centre de notifications
                         </button>
                      </motion.div>
                    </>
                  )}
                </AnimatePresence>

                <div className="w-px h-6 bg-border-main mx-2 hidden sm:block"></div>
                <div className="flex items-center gap-3 pl-2 group cursor-pointer">
                   <div className="hidden lg:block text-right">
                      <p className="text-[12px] font-black text-text-primary truncate uppercase tracking-tighter">
                        {role === 'admin' ? 'Direction' : 'Centre Dakar'}
                      </p>
                      <div className="flex items-center justify-end gap-1.5 leading-none mt-0.5">
                         <div className="w-1.5 h-1.5 rounded-full bg-emerald-500 animate-pulse"></div>
                         <p className="text-[9px] text-text-muted font-black uppercase tracking-widest">Connecté</p>
                      </div>
                   </div>
                   <div className="w-11 h-11 bg-action/10 rounded-2xl border border-action/20 flex items-center justify-center text-action font-black group-hover:bg-action group-hover:text-white transition-all duration-300">
                      {role === 'admin' ? 'AD' : 'CD'}
                   </div>
                </div>
              </div>
          </div>
        </header>

        {/* VIEWPORT AREA */}
        <main className="flex-1 overflow-y-auto p-6 lg:p-8 custom-scrollbar">
          <AnimatePresence mode="wait">
             {loading ? <SkeletonDashboard /> : (
               <motion.div
                key={activeView + role}
                initial={{ opacity: 0, y: 15 }}
                animate={{ opacity: 1, y: 0 }}
                exit={{ opacity: 0, y: -15 }}
                transition={{ duration: 0.4, ease: "easeOut" }}
                className="max-w-[1600px] mx-auto pb-12"
              >
                {activeView === 'dashboard' ? (
                   role === 'admin' ? <AdminDashboard /> : <CenterDashboard />
                ) : activeView === 'centers' && role === 'admin' ? (
                   <CentersView />
                ) : activeView === 'centers-mgmt' && role === 'admin' ? (
                   <CentersManagementView />
                ) : activeView === 'students' ? (
                   <GlobalStudentsView role={role} />
                ) : activeView === 'payments' ? (
                   <GlobalPaymentsView role={role} />
                ) : activeView === 'sorties' ? (
                   <SortiesView />
                ) : activeView === 'logistics' ? (
                   <LogisticsView />
                ) : activeView === 'vorbereitung' ? (
                   <VorbereitungView />
                ) : activeView === 'notifications' ? (
                   <NotificationsView />
                ) : activeView === 'settings' ? (
                   <SettingsView 
                    theme={theme} 
                    setTheme={setTheme} 
                    language={language} 
                    setLanguage={setLanguage} 
                   />
                ) : (
                   <PlaceholderView name={activeView} role={role} />
                )}
              </motion.div>
             )}
          </AnimatePresence>
        </main>
      </div>

      {/* TOAST NOTIFICATION */}
      <AnimatePresence>
        {showToast && (
          <motion.div 
            initial={{ opacity: 0, y: 50, scale: 0.9 }}
            animate={{ opacity: 1, y: 0, scale: 1 }}
            exit={{ opacity: 0, scale: 0.95, transition: { duration: 0.2 } }}
            className="fixed bottom-8 right-8 z-[100]"
          >
            <div className="bg-bg-secondary border border-border-main rounded-[24px] p-5 shadow-[0_25px_60px_-12px_rgba(0,0,0,0.3)] flex items-center gap-5 min-w-[360px] transition-colors duration-500">
              <div className="w-14 h-14 bg-emerald-500/10 text-emerald-500 rounded-2xl flex items-center justify-center shrink-0">
                 <CheckCircle2 className="w-8 h-8" />
              </div>
              <div className="flex-1">
                 <p className="text-[15px] font-black text-text-primary uppercase tracking-tight">Authentification réussie</p>
                 <p className="text-[12px] text-text-secondary mt-0.5 font-bold">Bienvenue sur le cockpit {role === 'admin' ? 'Administrateur' : 'Centre'}</p>
              </div>
              <button onClick={() => setShowToast(false)} className="p-2 hover:bg-bg-tertiary rounded-xl transition-colors">
                 <X className="w-5 h-5 text-text-muted" />
              </button>
            </div>
          </motion.div>
        )}
      </AnimatePresence>
    </div>
  );
}

// SKELETON LOADER
function SkeletonDashboard() {
  return (
    <div className="space-y-8 animate-pulse max-w-[1600px] mx-auto">
      <div className="flex justify-between items-center mb-10">
         <div className="space-y-4">
            <div className="h-10 w-96 bg-slate-200 rounded-2xl"></div>
            <div className="h-4 w-48 bg-slate-200 rounded-xl"></div>
         </div>
         <div className="flex gap-4">
            <div className="h-12 w-32 bg-slate-200 rounded-xl"></div>
            <div className="h-12 w-48 bg-slate-200 rounded-xl"></div>
         </div>
      </div>
      <div className="grid grid-cols-1 md:grid-cols-3 lg:grid-cols-5 gap-6">
        {[1,2,3,4,5].map(i => <div key={i} className="h-40 bg-slate-200 rounded-2xl"></div>)}
      </div>
      <div className="grid grid-cols-1 lg:grid-cols-12 gap-8">
        <div className="lg:col-span-8 h-[400px] bg-slate-200 rounded-3xl"></div>
        <div className="lg:col-span-4 h-[400px] bg-slate-200 rounded-3xl"></div>
      </div>
    </div>
  );
}

// PLACEHOLDER FOR OTHER VIEWS
function PlaceholderView({ name, role }: { name: string, role: Role }) {
  return (
    <div className="flex flex-col items-center justify-center min-h-[65vh] text-center p-12 card-premium border-2 border-dashed border-border-main">
       <div className="w-24 h-24 bg-bg-tertiary rounded-3xl flex items-center justify-center mb-8 shadow-inner">
          <FileText className="w-12 h-12 text-text-muted opacity-40" />
       </div>
       <h2 className="text-[28px] font-bold text-text-primary tracking-tighter uppercase font-display">Écran : {name}</h2>
       <p className="text-text-secondary mt-3 max-w-lg mx-auto leading-relaxed font-medium">
         Cette interface est actuellement en cours de finalisation pour le profil <span className="text-action font-bold uppercase">{role}</span>. <br />
         Consultez le dashboard pour piloter vos indicateurs en attendant la mise en ligne.
       </p>
       <div className="mt-10 flex gap-4">
          <button className="px-8 py-3 bg-bg-tertiary text-text-primary text-[14px] font-bold rounded-2xl border border-border-main hover:bg-bg-secondary transition-all active:scale-95">
            Télécharger le guide
          </button>
          <button className="px-8 py-3 bg-bg-secondary border border-border-main text-text-primary text-[14px] font-bold rounded-2xl shadow-xl hover:bg-bg-tertiary transition-all active:scale-95">
            Retour au cockpit
          </button>
       </div>
    </div>
  );
}

function SettingsView({ theme, setTheme, language, setLanguage }: any) {
  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-500">
      <div>
        <h1 className="text-[28px] font-bold text-text-primary tracking-tight">Paramètres du système</h1>
        <p className="text-[14px] text-text-secondary mt-1">Gérez vos préférences d'affichage et de langue pour MersGestion</p>
      </div>

      <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
        {/* APPEARANCE */}
        <div className="card-premium p-8 space-y-6">
          <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-action/10 rounded-2xl flex items-center justify-center text-action">
              <Monitor className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight">Apparence</h3>
          </div>
          
          <p className="text-text-secondary text-sm">Choisissez le mode d'affichage qui vous convient le mieux.</p>

          <div className="grid grid-cols-2 gap-4">
            <button 
              onClick={() => setTheme('light')}
              className={cn(
                "p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all",
                theme === 'light' ? "border-action bg-action/5" : "border-border-main hover:border-text-muted"
              )}
            >
              <div className="w-12 h-12 bg-white rounded-xl shadow-sm flex items-center justify-center">
                <Sun className={cn("w-6 h-6", theme === 'light' ? "text-action" : "text-text-muted")} />
              </div>
              <span className={cn("text-xs font-black uppercase tracking-widest", theme === 'light' ? "text-action" : "text-text-secondary")}>Clair</span>
            </button>
            <button 
              onClick={() => setTheme('dark')}
              className={cn(
                "p-4 rounded-2xl border-2 flex flex-col items-center gap-3 transition-all",
                theme === 'dark' ? "border-action bg-action/5" : "border-border-main hover:border-text-muted"
              )}
            >
              <div className="w-12 h-12 bg-bg-tertiary rounded-xl shadow-sm flex items-center justify-center">
                <Moon className={cn("w-6 h-6", theme === 'dark' ? "text-action" : "text-text-muted")} />
              </div>
              <span className={cn("text-xs font-black uppercase tracking-widest", theme === 'dark' ? "text-action" : "text-text-secondary")}>Sombre</span>
            </button>
          </div>
        </div>

        {/* LANGUAGE */}
        <div className="card-premium p-8 space-y-6">
           <div className="flex items-center gap-4 mb-2">
            <div className="w-12 h-12 bg-action/10 rounded-2xl flex items-center justify-center text-action">
              <Globe className="w-6 h-6" />
            </div>
            <h3 className="text-xl font-bold text-text-primary uppercase tracking-tight">Langue</h3>
          </div>
          
          <p className="text-text-secondary text-sm">Définissez la langue par défaut de l'interface MersGestion.</p>

          <div className="space-y-3">
            <button 
              onClick={() => setLanguage('fr')}
              className={cn(
                "w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all",
                language === 'fr' ? "border-action bg-action/5" : "border-border-main hover:border-text-muted"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇫🇷</span>
                <span className={cn("text-sm font-bold", language === 'fr' ? "text-text-primary" : "text-text-secondary")}>Français (par défaut)</span>
              </div>
              {language === 'fr' && <CheckCircle2 className="w-5 h-5 text-action" />}
            </button>
            <button 
              onClick={() => setLanguage('de')}
              className={cn(
                "w-full p-4 rounded-2xl border-2 flex items-center justify-between transition-all",
                language === 'de' ? "border-action bg-action/5" : "border-border-main hover:border-text-muted"
              )}
            >
              <div className="flex items-center gap-3">
                <span className="text-2xl">🇩🇪</span>
                <span className={cn("text-sm font-bold", language === 'de' ? "text-text-primary" : "text-text-secondary")}>Allemand (Deutsch)</span>
              </div>
              {language === 'de' && <CheckCircle2 className="w-5 h-5 text-action" />}
            </button>
          </div>
        </div>
      </div>

      {/* ADDITIONAL SETTINGS PREVIEW */}
      <div className="bg-bg-tertiary border border-border-main p-10 rounded-[32px] overflow-hidden relative">
         <div className="absolute top-0 right-0 w-64 h-64 bg-action/5 blur-[80px] -mr-32 -mt-32"></div>
         <div className="relative z-10">
            <h3 className="text-2xl font-bold text-text-primary mb-4 tracking-tight uppercase">Configuration MersGestion v1.0</h3>
            <p className="text-text-secondary max-w-2xl mb-8 leading-relaxed font-medium">
              Vos réglages sont automatiquement synchronisés avec votre profil. 
              Certaines modifications structurelles (Noms des centres, Devises) nécessitent une validation de la direction centrale.
            </p>
            <button className="px-8 py-4 bg-action hover:bg-action-hover text-white font-black rounded-2xl shadow-xl shadow-action/20 transition-all active:scale-95 uppercase tracking-widest text-[12px]">
              Sauvegarder les modifications
            </button>
         </div>
      </div>
    </div>
  );
}
