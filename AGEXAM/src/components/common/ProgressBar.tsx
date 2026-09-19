import React from 'react';

interface ProgressBarProps {
  value: number; // 0 to 100
  max?: number;
  height?: 'sm' | 'md' | 'lg';
  color?: 'gold' | 'blue' | 'purple' | 'green' | 'rose';
  showLabel?: boolean;
  className?: string;
}

export const ProgressBar: React.FC<ProgressBarProps> = ({
  value,
  max = 100,
  height = 'md',
  color = 'gold',
  showLabel = false,
  className = '',
}) => {
  const percentage = Math.min(100, Math.max(0, Math.round((value / max) * 100)));

  const heightStyles = {
    sm: 'h-2.5',
    md: 'h-4',
    lg: 'h-6',
  };

  const colorStyles = {
    gold: 'bg-gradient-to-r from-amber-400 via-yellow-400 to-amber-500',
    blue: 'bg-gradient-to-r from-sky-400 to-blue-500',
    purple: 'bg-gradient-to-r from-purple-400 to-fuchsia-500',
    green: 'bg-gradient-to-r from-emerald-400 to-teal-500',
    rose: 'bg-gradient-to-r from-rose-400 to-pink-500',
  };

  return (
    <div className={`w-full ${className}`}>
      <div
        className={`w-full bg-slate-200/80 rounded-full overflow-hidden p-0.5 border border-slate-300 shadow-inner ${heightStyles[height]}`}
      >
        <div
          className={`${heightStyles[height]} ${colorStyles[color]} rounded-full transition-all duration-500 ease-out relative overflow-hidden`}
          style={{ width: `${percentage}%` }}
        >
          {/* Subtle candy shine */}
          <div className="absolute inset-0 bg-white/25 w-full h-1/2 rounded-full" />
        </div>
      </div>
      {showLabel && (
        <div className="flex justify-between items-center text-xs font-bubble font-semibold text-slate-600 mt-1">
          <span>{value}</span>
          <span>{max}</span>
        </div>
      )}
    </div>
  );
};
