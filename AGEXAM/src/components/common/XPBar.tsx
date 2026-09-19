import React from 'react';
import { Zap } from 'lucide-react';

interface XPBarProps {
  xp: number;
  className?: string;
  size?: 'sm' | 'md';
}

export const XPBar: React.FC<XPBarProps> = ({ xp, className = '', size = 'md' }) => {
  const isSm = size === 'sm';

  return (
    <div
      className={`inline-flex items-center gap-1.5 bg-gradient-to-r from-amber-400 to-yellow-400 text-amber-950 font-bubble font-bold border-2 border-amber-500 rounded-full shadow-playful-sm select-none ${
        isSm ? 'px-2.5 py-1 text-xs' : 'px-3.5 py-1.5 text-sm sm:text-base'
      } ${className}`}
    >
      <span className="flex items-center justify-center bg-amber-200/90 rounded-full p-1 shadow-inner text-amber-800 animate-pulse">
        <Zap className={isSm ? 'w-3 h-3' : 'w-4 h-4'} fill="currentColor" />
      </span>
      <span>{xp.toLocaleString()} XP</span>
    </div>
  );
};
