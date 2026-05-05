import React, { useState } from 'react';
import { 
  Bell, 
  CheckCircle2, 
  Clock, 
  AlertCircle, 
  Info, 
  Filter, 
  Trash2, 
  MoreHorizontal,
  Mail,
  UserPlus,
  Wallet,
  Settings
} from 'lucide-react';
import { SectionHeader, cn } from './UIComponents';
import { motion, AnimatePresence } from 'motion/react';

type NotificationType = 'payment' | 'registration' | 'system' | 'alert';

interface Notification {
  id: string;
  type: NotificationType;
  title: string;
  message: string;
  time: string;
  read: boolean;
}

const mockNotifications: Notification[] = [
  {
    id: '1',
    type: 'payment',
    title: 'Nouveau Paiement Reçu',
    message: 'Joseph Abena a réglé sa deuxième tranche de 60,000 F CFA pour le niveau B1.',
    time: 'Il y a 10 minutes',
    read: false,
  },
  {
    id: '2',
    type: 'registration',
    title: 'Nouvelle Inscription',
    message: 'Une nouvelle inscription a été enregistrée au centre de Jouvence.',
    time: 'Il y a 1 heure',
    read: false,
  },
  {
    id: '3',
    type: 'alert',
    title: 'Alerte Retard de Paiement',
    message: '5 étudiants du centre de Damas sont en retard de paiement de plus de 15 jours.',
    time: 'Il y a 3 heures',
    read: true,
  },
  {
    id: '4',
    type: 'system',
    title: 'Mise à jour Système',
    message: 'MERSGestion est maintenant en version 2.0. Découvrez les nouvelles fonctionnalités.',
    time: 'Hier',
    read: true,
  },
  {
    id: '5',
    type: 'payment',
    title: 'Versement Confirmé',
    message: 'Le versement de 500,000 F CFA du centre de Bafoussam a été validé.',
    time: 'Hier',
    read: true,
  },
];

export function NotificationsView() {
  const [notifications, setNotifications] = useState<Notification[]>(mockNotifications);
  const [filter, setFilter] = useState<'all' | 'unread'>('all');

  const filteredNotifications = notifications.filter(n => 
    filter === 'all' ? true : !n.read
  );

  const markAllAsRead = () => {
    setNotifications(notifications.map(n => ({ ...n, read: true })));
  };

  const deleteNotification = (id: string) => {
    setNotifications(notifications.filter(n => n.id !== id));
  };

  const toggleRead = (id: string) => {
    setNotifications(notifications.map(n => 
      n.id === id ? { ...n, read: !n.read } : n
    ));
  };

  const getTypeIcon = (type: NotificationType) => {
    switch (type) {
      case 'payment': return Wallet;
      case 'registration': return UserPlus;
      case 'alert': return AlertCircle;
      case 'system': return Settings;
      default: return Info;
    }
  };

  const getTypeColor = (type: NotificationType) => {
    switch (type) {
      case 'payment': return 'text-emerald-500 bg-emerald-500/10';
      case 'registration': return 'text-action bg-action/10';
      case 'alert': return 'text-red-500 bg-red-500/10';
      case 'system': return 'text-orange bg-orange/10';
      default: return 'text-text-muted bg-bg-tertiary';
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in slide-in-from-bottom-4 duration-700">
      {/* HEADER SECTION */}
      <div className="flex flex-col md:flex-row md:items-center justify-between gap-6">
        <div>
          <h1 className="text-[28px] md:text-[32px] font-black text-text-primary tracking-tighter uppercase mb-2">Centre de Notifications</h1>
          <p className="text-text-secondary font-medium text-[14px]">Suivi en temps réel de toutes les activités MERS</p>
        </div>
        <div className="flex items-center gap-3">
          <button 
            onClick={markAllAsRead}
            className="flex-1 md:flex-none px-6 py-4 bg-bg-secondary border border-border-main text-text-primary font-black rounded-2xl shadow-sm flex items-center justify-center gap-3 uppercase tracking-widest text-[11px] hover:bg-bg-tertiary transition-all"
          >
            <CheckCircle2 className="w-4 h-4" /> Marquer tout lu
          </button>
          <button className="flex-1 md:flex-none px-6 py-4 bg-navy text-white font-black rounded-2xl shadow-xl shadow-navy/20 flex items-center justify-center gap-3 uppercase tracking-widest text-[11px] hover:scale-[1.02] transition-all active:scale-95">
            Paramètres d'Alerte <Settings className="w-4 h-4" />
          </button>
        </div>
      </div>

      {/* TABS & FILTERS */}
      <div className="flex items-center justify-between border-b border-border-main pb-4">
        <div className="flex items-center gap-2">
          <button 
            onClick={() => setFilter('all')}
            className={cn(
              "px-6 py-3 rounded-xl text-[12px] font-black uppercase tracking-widest transition-all",
              filter === 'all' ? "bg-action text-white shadow-lg shadow-action/20" : "text-text-muted hover:text-text-primary"
            )}
          >
            Tout ({notifications.length})
          </button>
          <button 
            onClick={() => setFilter('unread')}
            className={cn(
              "px-6 py-3 rounded-xl text-[12px] font-black uppercase tracking-widest transition-all",
              filter === 'unread' ? "bg-action text-white shadow-lg shadow-action/20" : "text-text-muted hover:text-text-primary"
            )}
          >
            Non lus ({notifications.filter(n => !n.read).length})
          </button>
        </div>
        <div className="flex items-center gap-3">
           <div className="hidden sm:flex items-center gap-2 px-3 py-1.5 bg-bg-tertiary rounded-lg border border-border-main text-[10px] font-black uppercase tracking-widest text-text-muted">
              <Clock className="w-3 h-3" /> Mis à jour il y a 2m
           </div>
        </div>
      </div>

      {/* NOTIFICATIONS LIST */}
      <div className="space-y-4">
         <AnimatePresence mode="popLayout">
           {filteredNotifications.length > 0 ? filteredNotifications.map((notif) => {
             const Icon = getTypeIcon(notif.type);
             return (
               <motion.div
                 layout
                 key={notif.id}
                 initial={{ opacity: 0, x: -20 }}
                 animate={{ opacity: 1, x: 0 }}
                 exit={{ opacity: 0, scale: 0.95 }}
                 className={cn(
                   "card-premium p-6 flex flex-col md:flex-row md:items-center gap-6 group transition-all relative overflow-hidden",
                   !notif.read && "border-l-4 border-l-action bg-action/5 dark:bg-action/5"
                 )}
               >
                  {!notif.read && (
                    <div className="absolute top-0 right-0 w-12 h-12 overflow-hidden pointer-events-none">
                       <div className="absolute top-2 right-2 w-2.5 h-2.5 bg-action rounded-full shadow-lg shadow-action/50"></div>
                    </div>
                  )}

                  <div className={cn("w-14 h-14 rounded-2xl flex items-center justify-center shrink-0 shadow-sm", getTypeColor(notif.type))}>
                    <Icon className="w-7 h-7" />
                  </div>

                  <div className="flex-1 space-y-1">
                     <div className="flex items-center justify-between">
                        <p className={cn("text-lg font-black uppercase tracking-tight", notif.read ? "text-text-primary" : "text-action")}>{notif.title}</p>
                        <span className="text-[11px] font-bold text-text-muted uppercase tracking-widest flex items-center gap-1.5">
                           <Clock className="w-3.5 h-3.5" /> {notif.time}
                        </span>
                     </div>
                     <p className="text-text-secondary font-medium leading-relaxed max-w-4xl text-[14px]">
                       {notif.message}
                     </p>
                  </div>

                  <div className="flex items-center justify-end gap-2 pt-4 md:pt-0 border-t md:border-t-0 border-border-main">
                     <button 
                      onClick={() => toggleRead(notif.id)}
                      className={cn(
                        "p-3 rounded-xl transition-all border border-transparent",
                        notif.read ? "bg-bg-tertiary text-text-muted hover:border-border-main" : "bg-action/10 text-action hover:bg-action hover:text-white"
                      )}
                      title={notif.read ? "Marquer comme non lu" : "Marquer comme lu"}
                     >
                        <CheckCircle2 className="w-5 h-5" />
                     </button>
                     <button 
                      onClick={() => deleteNotification(notif.id)}
                      className="p-3 bg-bg-tertiary text-text-muted rounded-xl hover:bg-red-500/10 hover:text-red-500 border border-transparent hover:border-red-500/20 transition-all"
                      title="Supprimer"
                     >
                        <Trash2 className="w-5 h-5" />
                     </button>
                     <button className="p-3 bg-bg-tertiary text-text-muted rounded-xl hover:bg-bg-secondary border border-transparent hover:border-border-main transition-all">
                        <MoreHorizontal className="w-5 h-5" />
                     </button>
                  </div>
               </motion.div>
             );
           }) : (
             <motion.div 
               initial={{ opacity: 0 }}
               animate={{ opacity: 1 }}
               className="py-24 text-center space-y-6"
             >
                <div className="w-24 h-24 bg-bg-tertiary rounded-full flex items-center justify-center mx-auto mb-8">
                   <Bell className="w-12 h-12 text-text-muted opacity-20" />
                </div>
                <h3 className="text-2xl font-black text-text-primary uppercase tracking-tight">Aucune notification</h3>
                <p className="text-text-secondary font-medium max-w-sm mx-auto">
                   Vous êtes à jour ! Toutes les notifications ont été traitées ou filtrées.
                </p>
                <button 
                  onClick={() => setFilter('all')}
                  className="px-8 py-4 bg-navy text-white font-black rounded-2xl uppercase tracking-widest text-[11px] shadow-xl shadow-navy/20"
                >
                  Voir tout l'historique
                </button>
             </motion.div>
           )}
         </AnimatePresence>
      </div>

      {/* BOTTOM INFO */}
      <div className="flex flex-col sm:flex-row items-center justify-between p-8 bg-bg-secondary rounded-[32px] border border-border-main gap-4">
         <div className="flex items-center gap-4">
            <div className="w-12 h-12 bg-action/10 rounded-2xl flex items-center justify-center text-action">
               <Info className="w-6 h-6" />
            </div>
            <div>
               <p className="text-[13px] font-black text-text-primary uppercase tracking-tight">Archives Automatisées</p>
               <p className="text-[11px] text-text-muted font-bold uppercase tracking-widest">Les notifications de plus de 30 jours sont archivées.</p>
            </div>
         </div>
         <button className="px-8 py-4 bg-bg-tertiary text-text-primary border border-border-main font-black rounded-2xl uppercase tracking-widest text-[11px] hover:bg-bg-secondary transition-all">
            Configuration Push
         </button>
      </div>
    </div>
  );
}
