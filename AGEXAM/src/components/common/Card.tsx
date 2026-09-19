import React from 'react';

interface CardProps extends React.HTMLAttributes<HTMLDivElement> {
  variant?: 'white' | 'gold' | 'sky' | 'purple' | 'green' | 'rose';
  padded?: boolean;
}

export const Card: React.FC<CardProps> = ({
  children,
  variant = 'white',
  padded = true,
  className = '',
  ...props
}) => {
  const variantStyles = {
    white: 'bg-white/95 border-2 border-amber-200/80 shadow-playful',
    gold: 'bg-gradient-to-br from-amber-50 to-amber-100/90 border-2 border-amber-300 shadow-playful',
    sky: 'bg-gradient-to-br from-sky-50 to-blue-100/90 border-2 border-sky-300 shadow-playful',
    purple: 'bg-gradient-to-br from-purple-50 to-fuchsia-100/90 border-2 border-purple-300 shadow-playful',
    green: 'bg-gradient-to-br from-emerald-50 to-teal-100/90 border-2 border-emerald-300 shadow-playful',
    rose: 'bg-gradient-to-br from-rose-50 to-pink-100/90 border-2 border-rose-300 shadow-playful',
  };

  const padStyle = padded ? 'p-4 sm:p-6' : '';

  return (
    <div
      className={`rounded-3xl backdrop-blur-sm transition-all duration-200 ${variantStyles[variant]} ${padStyle} ${className}`}
      {...props}
    >
      {children}
    </div>
  );
};
