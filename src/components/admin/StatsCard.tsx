import { cn } from '@/lib/utils';
import { TrendingUp, TrendingDown } from 'lucide-react';
import type { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: string | number;
  subtitle?: string;
  icon: LucideIcon;
  trend?: { value: number; label: string };
  variant?: 'default' | 'indigo' | 'emerald' | 'amber' | 'rose';
}

const variantStyles = {
  default: {
    iconBg: 'bg-gray-800',
    iconColor: 'text-gray-400',
    glow: '',
  },
  indigo: {
    iconBg: 'bg-indigo-600/20',
    iconColor: 'text-indigo-400',
    glow: 'shadow-[0_0_30px_rgba(99,102,241,0.08)]',
  },
  emerald: {
    iconBg: 'bg-emerald-600/20',
    iconColor: 'text-emerald-400',
    glow: 'shadow-[0_0_30px_rgba(16,185,129,0.08)]',
  },
  amber: {
    iconBg: 'bg-amber-600/20',
    iconColor: 'text-amber-400',
    glow: 'shadow-[0_0_30px_rgba(245,158,11,0.08)]',
  },
  rose: {
    iconBg: 'bg-rose-600/20',
    iconColor: 'text-rose-400',
    glow: 'shadow-[0_0_30px_rgba(244,63,94,0.08)]',
  },
};

export function StatsCard({
  title,
  value,
  subtitle,
  icon: Icon,
  trend,
  variant = 'default',
}: StatsCardProps) {
  const styles = variantStyles[variant];

  return (
    <div
      className={cn(
        'relative overflow-hidden rounded-2xl bg-gray-900 border border-gray-800 p-6 flex flex-col gap-4',
        styles.glow
      )}
    >
      <div
        className={cn(
          'absolute top-0 left-0 right-0 h-px opacity-60',
          variant === 'indigo' && 'bg-linear-to-br from-transparent via-indigo-500 to-transparent',
          variant === 'emerald' &&
            'bg-linear-to-br from-transparent via-emerald-500 to-transparent',
          variant === 'amber' && 'bg-linear-to-br from-transparent via-amber-500 to-transparent',
          variant === 'rose' && 'bg-linear-to-br from-transparent via-rose-500 to-transparent',
          variant === 'default' && 'bg-linear-to-br from-transparent via-gray-600 to-transparent'
        )}
      />

      <div className="flex items-start justify-between">
        <div className={cn('p-2.5 rounded-xl', styles.iconBg)}>
          <Icon className={cn('w-5 h-5', styles.iconColor)} />
        </div>
        {trend && (
          <div
            className={cn(
              'flex items-center gap-1 text-xs font-medium px-2 py-1 rounded-full',
              trend.value >= 0
                ? 'text-emerald-400 bg-emerald-400/10'
                : 'text-rose-400 bg-rose-400/10'
            )}
          >
            {trend.value >= 0 ? (
              <TrendingUp className="w-3 h-3" />
            ) : (
              <TrendingDown className="w-3 h-3" />
            )}
            {Math.abs(trend.value)}%
          </div>
        )}
      </div>

      <div>
        <p className="text-3xl font-bold text-white tracking-tight">{value}</p>
        <p className="text-sm font-medium text-gray-400 mt-1">{title}</p>
        {subtitle && <p className="text-xs text-gray-600 mt-0.5">{subtitle}</p>}
      </div>
    </div>
  );
}
