import React from 'react';
import { motion } from 'framer-motion';
import { Sparkles, Heart } from 'lucide-react';
import { soundService } from '../../services/soundService';

export type CharacterType = 'aghanya' | 'aghanya_real' | 'vijai' | 'swetha' | 'parents_duo' | 'companion';
export type CharacterEmotion = 'happy' | 'encouraging' | 'celebrating' | 'thinking' | 'proud';
export type CharacterPose = 'wave' | 'boba' | 'celebrate' | 'default';
export type CharacterAnimation = 'bounce' | 'wiggle' | 'float' | 'none';

interface CharacterProps {
  type?: CharacterType;
  pose?: CharacterPose;
  emotion?: CharacterEmotion;
  animation?: CharacterAnimation;
  speech?: string;
  size?: 'sm' | 'md' | 'lg' | 'xl';
  showShadow?: boolean;
  className?: string;
  onClick?: () => void;
}

export const Character: React.FC<CharacterProps> = ({
  type = 'aghanya',
  pose = 'default',
  speech,
  size = 'md',
  showShadow = true,
  className = '',
  onClick,
}) => {
  const getCharacterSrc = (): string => {
    switch (type) {
      case 'aghanya':
        return '/assets/characters/aghanya_animated.png';
      case 'aghanya_real':
        return '/assets/characters/aghanya_real_photo.png';
      case 'vijai':
        if (pose === 'boba') return '/assets/characters/vijai_boba.png';
        return '/assets/characters/vijai_wave.png';
      case 'swetha':
        if (pose === 'boba') return '/assets/characters/swetha_boba.png';
        return '/assets/characters/swetha_wave.png';
      case 'parents_duo':
        return '/assets/characters/parents_pair.png';
      case 'companion':
      default:
        return '/assets/characters/aghanya_animated.png';
    }
  };

  const getCharacterName = (): string => {
    switch (type) {
      case 'aghanya':
      case 'aghanya_real':
        return 'Aghanya Shree';
      case 'vijai':
        return 'Dad Vijai';
      case 'swetha':
        return 'Mom Swetha';
      case 'parents_duo':
        return 'Vijai & Swetha';
      default:
        return 'Aghanya';
    }
  };

  const sizeStyles = {
    sm: 'w-16 h-16',
    md: 'w-24 h-24 sm:w-28 sm:h-28',
    lg: 'w-36 h-36 sm:w-44 sm:h-44',
    xl: 'w-48 h-48 sm:w-56 sm:h-56',
  };

  const ringStyles = {
    aghanya: 'border-amber-400 ring-4 ring-amber-300/60 shadow-[0_8px_20px_rgba(245,158,11,0.3)]',
    aghanya_real: 'border-rose-400 ring-4 ring-rose-300/60 shadow-[0_8px_20px_rgba(244,63,94,0.3)]',
    vijai: 'border-sky-400 ring-4 ring-sky-300/60 shadow-[0_8px_20px_rgba(14,165,233,0.3)]',
    swetha: 'border-pink-400 ring-4 ring-pink-300/60 shadow-[0_8px_20px_rgba(236,72,153,0.3)]',
    parents_duo: 'border-purple-400 ring-4 ring-purple-300/60 shadow-[0_8px_20px_rgba(168,85,247,0.3)]',
    companion: 'border-amber-400 ring-4 ring-amber-300/60 shadow-[0_8px_20px_rgba(245,158,11,0.3)]',
  };

  const handleTap = () => {
    soundService.playStar(2);
    if (onClick) onClick();
  };

  return (
    <div className={`relative inline-flex flex-col items-center select-none ${className}`}>
      {/* Dynamic Animated Speech Bubble */}
      {speech && (
        <motion.div
          initial={{ opacity: 0, y: 10, scale: 0.9 }}
          animate={{ opacity: 1, y: 0, scale: 1 }}
          transition={{ type: 'spring', stiffness: 350, damping: 20 }}
          className="mb-3 max-w-xs sm:max-w-sm px-4 py-2.5 bg-white/95 backdrop-blur-md rounded-2xl border-3 border-amber-300 shadow-[0_6px_20px_rgba(0,0,0,0.08)] text-amber-950 font-bubble text-sm sm:text-base text-center relative z-20"
        >
          <div className="flex items-center justify-center gap-1.5 font-bold text-amber-800 text-xs mb-0.5">
            <Sparkles className="w-3.5 h-3.5 text-amber-500" />
            <span>{getCharacterName()} says:</span>
          </div>
          <p className="leading-snug text-slate-800">{speech}</p>

          {/* Triangular pointer */}
          <div className="absolute -bottom-2.5 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[9px] border-l-transparent border-r-[9px] border-r-transparent border-t-[10px] border-t-amber-300" />
          <div className="absolute -bottom-2 left-1/2 -translate-x-1/2 w-0 h-0 border-l-[8px] border-l-transparent border-r-[8px] border-r-transparent border-t-[8px] border-t-white" />
        </motion.div>
      )}

      {/* Floating Character Avatar with Spring Physics */}
      <motion.div
        animate={{ y: [0, -6, 0] }}
        transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
        whileHover={{ scale: 1.05 }}
        whileTap={{ scale: 0.95 }}
        onClick={handleTap}
        className={`relative ${sizeStyles[size]} cursor-pointer z-10`}
      >
        <div
          className={`w-full h-full rounded-3xl overflow-hidden border-4 bg-gradient-to-b from-white via-amber-50/50 to-white ${
            ringStyles[type]
          } flex items-center justify-center p-1 relative`}
        >
          {/* Specular sheen */}
          <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/30 to-white/60 pointer-events-none rounded-3xl z-10" />

          <img
            src={getCharacterSrc()}
            alt={getCharacterName()}
            className="w-full h-full object-contain filter drop-shadow-md select-none pointer-events-none transition-transform duration-300"
            loading="lazy"
          />

          {/* Heart / Sparkle badge in corner */}
          <div className="absolute bottom-1 right-1 w-6 h-6 rounded-full bg-amber-400 border-2 border-white flex items-center justify-center shadow-md z-20">
            <Heart className="w-3.5 h-3.5 text-white fill-white" />
          </div>
        </div>
      </motion.div>

      {/* Soft floating contact shadow on floor */}
      {showShadow && (
        <motion.div
          animate={{ scale: [1, 0.85, 1], opacity: [0.35, 0.2, 0.35] }}
          transition={{ duration: 2.8, repeat: Infinity, ease: 'easeInOut' }}
          className="w-16 sm:w-20 h-3 bg-slate-800/40 rounded-full filter blur-[2px] mt-1.5 -z-0"
        />
      )}
    </div>
  );
};
