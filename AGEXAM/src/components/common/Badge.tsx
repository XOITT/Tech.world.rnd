import React from 'react';

interface BadgeProps {
  children: React.ReactNode;
  variant?: 'gold' | 'blue' | 'green' | 'purple' | 'rose' | 'slate';
  size?: 'sm' | 'md' | 'lg';
  icon?: React.ReactNode;
  className?: string;
}

export const Badge: React.FC<BadgeProps> = ({
  children,
  variant = 'gold',
  size = 'md',
  icon,
  className = '',
}) => {
  const variantStyles = {
    gold: 'bg-amber-100 text-amber-900 border border-amber-300',
    blue: 'bg-sky-100 text-sky-900 border border-sky-300',
    green: 'bg-emerald-100 text-emerald-900 border border-emerald-300',
    purple: 'bg-purple-100 text-purple-900 border border-purple-300',
    rose: 'bg-rose-100 text-rose-900 border border-rose-300',
    slate: 'bg-slate-100 text-slate-700 border border-slate-300',
  };

  const sizeStyles = {
    sm: 'px-2 py-0.5 text-xs font-semibold rounded-full',
    md: 'px-3 py-1 text-sm font-bold rounded-full',
    lg: 'px-4 py-1.5 text-base font-bold rounded-full',
  };

  return (
    <span
      className={`inline-flex items-center gap-1.5 font-bubble select-none shadow-sm ${variantStyles[variant]} ${sizeStyles[size]} ${className}`}
    >
      {icon && <span className="text-base">{icon}</span>}
      {children}
    </span>
  );
};
