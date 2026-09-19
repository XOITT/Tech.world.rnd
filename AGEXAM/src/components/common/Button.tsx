import React from 'react';
import { motion } from 'framer-motion';
import { soundService } from '../../services/soundService';

interface ButtonProps extends React.ButtonHTMLAttributes<HTMLButtonElement> {
  variant?: 'primary' | 'secondary' | 'accent' | 'success' | 'danger' | 'ghost';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  pill?: boolean;
  playAudio?: boolean;
}

export const Button: React.FC<ButtonProps> = ({
  children,
  variant = 'primary',
  size = 'md',
  pill = false,
  playAudio = true,
  className = '',
  onClick,
  disabled,
  ...props
}) => {
  const handleClick = (e: React.MouseEvent<HTMLButtonElement>) => {
    if (disabled) return;
    if (playAudio) {
      soundService.playClick();
    }
    if (onClick) {
      onClick(e);
    }
  };

  const baseStyles =
    'btn-3d font-bubble font-bold inline-flex items-center justify-center gap-2.5 select-none cursor-pointer focus:outline-none relative overflow-hidden';

  const sizeStyles = {
    sm: 'px-3.5 py-1.5 text-xs sm:text-sm rounded-xl min-h-[40px]',
    md: 'px-5 py-2.5 text-sm sm:text-base rounded-2xl min-h-[48px]',
    lg: 'px-7 py-3.5 text-base sm:text-lg rounded-3xl min-h-[56px]',
    xl: 'px-9 py-4 text-lg sm:text-xl rounded-bubble min-h-[64px]',
  };

  const variantMap = {
    primary: 'btn-3d-amber',
    secondary: 'btn-3d-sky',
    accent: 'btn-3d-purple',
    success: 'btn-3d-emerald',
    danger: 'btn-3d-rose',
    ghost: 'btn-3d-white',
  };

  const roundedStyle = pill ? '!rounded-full' : '';
  const disabledStyles = disabled
    ? 'opacity-40 cursor-not-allowed transform-none pointer-events-none filter grayscale'
    : '';

  return (
    <motion.button
      whileHover={disabled ? {} : { scale: 1.02 }}
      whileTap={disabled ? {} : { scale: 0.97 }}
      className={`${baseStyles} ${sizeStyles[size]} ${variantMap[variant]} ${roundedStyle} ${disabledStyles} ${className}`}
      onClick={handleClick}
      disabled={disabled}
      {...(props as any)}
    >
      {/* Specular light highlight on top of button for 3D depth */}
      <div className="absolute top-0 left-0 right-0 h-1/3 bg-white/30 rounded-t-xl pointer-events-none" />
      <span className="relative z-10 flex items-center justify-center gap-2">
        {children}
      </span>
    </motion.button>
  );
};
