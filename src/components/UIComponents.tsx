import React from 'react';
import { LucideIcon, TrendingUp } from 'lucide-react';
import { clsx, type ClassValue } from 'clsx';
import { twMerge } from 'tailwind-merge';

export function cn(...inputs: ClassValue[]) {
  return twMerge(clsx(inputs));
}

export function formatCurrency(amount: number): string {
  return new Intl.NumberFormat('fr-FR', {
    style: 'decimal',
  }).format(amount) + ' FCFA';
}

// KPI CARD
interface KpiCardProps {
  label: string;
  value: string | number;
  icon: LucideIcon;
  trend?: string;
  trendUp?: boolean;
  colorClass: string;
}

export function KpiCard({ label, value, icon: Icon, trend, trendUp, colorClass }: KpiCardProps) {
  // Extracting border color from class name if possible, or using a default
  const getIconColor = () => {
    if (colorClass.includes('action')) return 'text-action bg-action/10';
    if (colorClass.includes('success')) return 'text-emerald-500 bg-emerald-500/10';
    if (colorClass.includes('warning')) return 'text-amber-500 bg-amber-500/10';
    if (colorClass.includes('danger')) return 'text-red-500 bg-red-500/10';
    return 'text-text-secondary bg-bg-tertiary';
  };

  return (
    <div className="card-premium card-premium-hover p-0 overflow-hidden group h-full flex flex-col relative">
      {/* Decorative background glow */}
      <div className={cn(
        "absolute -right-4 -top-4 w-24 h-24 blur-3xl opacity-0 group-hover:opacity-20 transition-opacity duration-700 rounded-full",
        colorClass.includes('action') ? 'bg-action' :
        colorClass.includes('success') ? 'bg-emerald-500' :
        colorClass.includes('warning') ? 'bg-amber-500' :
        colorClass.includes('danger') ? 'bg-red-500' : 'bg-bg-tertiary'
      )}></div>

      {/* Top accent bar */}
      <div className={cn("h-1 w-full", colorClass.replace('border-l-', 'bg-'))}></div>
      
      <div className="p-6 flex-1 flex flex-col justify-between">
        <div className="flex items-start justify-between">
          <div className={cn("p-3.5 rounded-2xl transition-all duration-500 group-hover:scale-110", getIconColor())}>
            <Icon className="w-5 h-5" />
          </div>
          {trend && (
            <div className={cn(
              "flex items-center gap-1.5 text-[10px] font-black px-2.5 py-1.5 rounded-lg uppercase tracking-[0.1em] border transition-all duration-300",
              trendUp === true 
                ? "bg-emerald-500/5 text-emerald-500 border-emerald-500/20" 
                : trendUp === false 
                ? "bg-red-500/5 text-red-500 border-red-500/20" 
                : "bg-bg-tertiary text-text-muted border-border-main"
            )}>
              {trendUp === true && <TrendingUp className="w-3 h-3" />}
              {trend}
            </div>
          )}
        </div>

        <div className="mt-8">
          <p className="text-[11px] font-black text-text-muted uppercase tracking-[0.15em] opacity-70 group-hover:opacity-100 transition-opacity">
            {label}
          </p>
          <div className="flex items-baseline gap-2 mt-1.5">
            <h4 className="text-[32px] font-black text-text-primary tracking-tighter leading-none group-hover:text-action transition-colors duration-500">
              {value}
            </h4>
            {/* Subtle indicator for growth if trendUp is true but not using the full trend text here */}
          </div>
        </div>
      </div>
    </div>
  );
}

// BADGES
export function LevelBadge({ level }: { level: string }) {
  const levels: Record<string, string> = {
    'A1': 'badge-a1',
    'A2': 'badge-a2',
    'B1': 'badge-b1',
    'B2': 'badge-b2',
    'C1': 'badge-c1',
    'Vorbereitung': 'badge-vorb',
  };
  return <span className={cn("badge", levels[level] || 'bg-slate-100 text-slate-600')}>{level}</span>;
}

export function PaymentStatusBadge({ status }: { status: string }) {
  const statuses: Record<string, { class: string, icon: string }> = {
    'Réglé': { class: 'status-paid', icon: '✓' },
    'En cours': { class: 'status-ongoing', icon: '◑' },
    'En retard': { class: 'status-late', icon: '✕' },
  };
  const config = statuses[status] || { class: 'bg-slate-100 text-slate-600', icon: '' };
  return (
    <span className={cn("badge gap-1.5 font-bold", config.class)}>
      <span className="text-[10px]">{config.icon}</span>
      {status}
    </span>
  );
}

// SECTION HEADER
export function SectionHeader({ title, subtitle, action }: { title: string, subtitle?: string, action?: React.ReactNode }) {
  return (
    <div className="flex items-center justify-between mb-6">
      <div>
        <h3 className="text-[20px] font-semibold text-text-primary tracking-tight">{title}</h3>
        {subtitle && <p className="text-[14px] text-text-secondary mt-0.5">{subtitle}</p>}
      </div>
      {action}
    </div>
  );
}
