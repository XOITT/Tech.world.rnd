import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Question, VisualItem } from '../../models/types';
import { Button } from '../../components/common/Button';
import { Sparkles, X } from 'lucide-react';

interface Props {
  question: Question;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
}

export const SameDifferentWidget: React.FC<Props> = ({ question, onAnswer, disabled }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (choice: string) => {
    if (disabled) return;
    setSelected(choice);
    onAnswer(choice);
  };

  const items: VisualItem[] = question.items || [
    { id: 'item1', label: 'Object A', emoji: '🚗', visualScale: 'big' },
    { id: 'item2', label: 'Object B', emoji: '🚗', visualScale: 'big' },
  ];

  // Helper to get visual sizing based on visualScale
  const getVisualItemStyles = (item: VisualItem) => {
    switch (item.visualScale) {
      case 'giant':
        return {
          container: 'w-40 h-40 sm:w-48 sm:h-48 bg-gradient-to-b from-amber-100 to-amber-200 border-amber-500 shadow-xl',
          fontSize: 'text-8xl sm:text-9xl',
          scale: 1.5,
          badge: 'GIANT',
          badgeColor: 'bg-amber-500 text-white',
        };
      case 'big':
        return {
          container: 'w-34 h-34 sm:w-40 sm:h-40 bg-gradient-to-b from-sky-100 to-sky-200 border-sky-400 shadow-lg',
          fontSize: 'text-7xl sm:text-8xl',
          scale: 1.25,
          badge: 'BIG',
          badgeColor: 'bg-sky-500 text-white',
        };
      case 'small':
        return {
          container: 'w-20 h-20 sm:w-24 sm:h-24 bg-gradient-to-b from-rose-50 to-rose-100 border-rose-300 shadow-md',
          fontSize: 'text-3xl sm:text-4xl',
          scale: 0.7,
          badge: 'SMALL',
          badgeColor: 'bg-rose-400 text-white',
        };
      case 'tiny':
        return {
          container: 'w-16 h-16 sm:w-18 sm:h-18 bg-gradient-to-b from-slate-100 to-slate-200 border-slate-400 shadow-sm',
          fontSize: 'text-2xl sm:text-3xl',
          scale: 0.5,
          badge: 'TINY',
          badgeColor: 'bg-slate-500 text-white',
        };
      case 'medium':
      default:
        return {
          container: 'w-28 h-28 sm:w-34 sm:h-34 bg-gradient-to-b from-purple-50 to-purple-100 border-purple-400 shadow-md',
          fontSize: 'text-5xl sm:text-6xl',
          scale: 1.0,
          badge: 'NORMAL',
          badgeColor: 'bg-purple-400 text-white',
        };
    }
  };

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Visual Comparison Stage directly modeled after Coursebook Part 1 Page 1 */}
      <div className="flex items-end justify-around gap-4 sm:gap-10 p-6 sm:p-8 bg-gradient-to-b from-sky-100/90 via-sky-50 to-amber-50 rounded-3xl border-3 border-amber-300 shadow-[inset_0_4px_16px_rgba(0,0,0,0.06)] w-full max-w-lg min-h-[250px] relative overflow-hidden">
        {/* Coursebook reference watermark style */}
        <div className="absolute top-2.5 left-3 px-3 py-1 bg-white/95 rounded-full text-[11px] font-bubble font-bold text-sky-900 border border-sky-200 shadow-xs flex items-center gap-1.5">
          <span>📖</span> Coursebook Visual Pair
        </div>

        {items.map((item, idx) => {
          const style = getVisualItemStyles(item);
          return (
            <div key={item.id || idx} className="flex flex-col items-center relative z-10">
              {/* Size Tag Badge */}
              <div className={`mb-2 px-2.5 py-0.5 rounded-full text-[10px] font-bubble font-extrabold shadow-xs ${style.badgeColor}`}>
                {style.badge}
              </div>

              {/* Dynamic Sized 3D Pedestal Stage */}
              <motion.div
                whileHover={{ scale: 1.05 }}
                className={`${style.container} rounded-3xl border-4 flex items-center justify-center relative overflow-hidden transition-all duration-300`}
              >
                <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/60 to-transparent pointer-events-none" />
                <span className={`${style.fontSize} filter drop-shadow-md select-none transform transition-transform duration-300`}>
                  {item.emoji || '🚗'}
                </span>
              </motion.div>

              {/* Pedestal shadow scaled to object */}
              <div
                className="bg-slate-900/20 rounded-full filter blur-[2px] mt-2 transition-all"
                style={{
                  width: `${Math.max(40, Math.round(90 * style.scale))}px`,
                  height: '10px',
                }}
              />

              <span className="text-xs sm:text-sm font-bubble font-bold text-slate-900 mt-2 text-center max-w-[140px]">
                {item.label}
              </span>
            </div>
          );
        })}
      </div>

      {/* Choice Buttons - Super Clear Duolingo Tactile 3D Buttons */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        <Button
          variant={selected === 'Same' ? 'primary' : 'ghost'}
          size="lg"
          onClick={() => handleSelect('Same')}
          disabled={disabled}
          className={`text-lg py-5 shadow-playful rounded-2xl flex items-center justify-center gap-2 ${
            selected === 'Same' ? 'ring-4 ring-emerald-300 scale-102' : ''
          }`}
        >
          <Sparkles className="w-5 h-5 text-amber-300" />
          <span>✨ SAME</span>
        </Button>
        <Button
          variant={selected === 'Different' ? 'secondary' : 'ghost'}
          size="lg"
          onClick={() => handleSelect('Different')}
          disabled={disabled}
          className={`text-lg py-5 shadow-playful rounded-2xl flex items-center justify-center gap-2 ${
            selected === 'Different' ? 'ring-4 ring-rose-300 scale-102' : ''
          }`}
        >
          <X className="w-5 h-5 text-rose-400" />
          <span>🔍 DIFFERENT</span>
        </Button>
      </div>
    </div>
  );
};
