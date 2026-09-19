import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Question } from '../../models/types';
import { Button } from '../../components/common/Button';

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

  const items = question.items || [];

  return (
    <div className="flex flex-col items-center gap-6 w-full">
      {/* Visual Comparison Stage with 3D Pedestals */}
      <div className="flex items-center justify-center gap-6 sm:gap-10 p-6 bg-gradient-to-b from-sky-100/90 via-sky-50 to-blue-100/80 rounded-3xl border-3 border-sky-300 shadow-[inset_0_4px_12px_rgba(0,0,0,0.06)] w-full max-w-md relative overflow-hidden">
        {/* Subtle background light beam */}
        <div className="absolute inset-0 bg-gradient-to-tr from-white/0 via-white/40 to-white/0 pointer-events-none" />

        {items.map((item, idx) => (
          <div key={item.id || idx} className="flex flex-col items-center relative z-10">
            {/* 3D Pedestal Stage */}
            <motion.div
              whileHover={{ scale: 1.06, rotate: [-1, 1, 0] }}
              className="w-26 h-26 sm:w-32 sm:h-32 bg-white rounded-3xl border-4 border-sky-400 shadow-playful flex items-center justify-center text-6xl sm:text-7xl relative overflow-hidden cursor-pointer"
            >
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-sky-100/50 to-transparent pointer-events-none" />
              <span className="filter drop-shadow-md select-none">{item.emoji || '🏎️'}</span>
            </motion.div>

            {/* Pedestal shadow */}
            <div className="w-20 h-2.5 bg-sky-900/20 rounded-full filter blur-[2px] mt-2" />

            <span className="text-xs sm:text-sm font-bubble font-bold text-sky-950 mt-1 text-center">
              {item.label}
            </span>
          </div>
        ))}
      </div>

      {/* Choice Buttons */}
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        <Button
          variant={selected === 'Same' ? 'primary' : 'ghost'}
          size="lg"
          onClick={() => handleSelect('Same')}
          disabled={disabled}
          className="text-lg py-4 shadow-playful"
        >
          <span>✨ SAME</span>
        </Button>
        <Button
          variant={selected === 'Different' ? 'secondary' : 'ghost'}
          size="lg"
          onClick={() => handleSelect('Different')}
          disabled={disabled}
          className="text-lg py-4 shadow-playful"
        >
          <span>🔍 DIFFERENT</span>
        </Button>
      </div>
    </div>
  );
};
