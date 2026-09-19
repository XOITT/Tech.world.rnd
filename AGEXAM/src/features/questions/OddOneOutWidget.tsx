import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Question } from '../../models/types';
import { X } from 'lucide-react';

interface Props {
  question: Question;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
}

export const OddOneOutWidget: React.FC<Props> = ({ question, onAnswer, disabled }) => {
  const [selectedOption, setSelectedOption] = useState<string | null>(null);

  const handleSelect = (opt: string) => {
    if (disabled) return;
    setSelectedOption(opt);
    onAnswer(opt);
  };

  const options = question.options || [];

  return (
    <div className="flex flex-col items-center gap-5 w-full">
      {/* Activity Prompt Banner */}
      <div className="w-full text-center text-xs font-bubble font-bold text-rose-900 bg-rose-100/90 py-1.5 px-4 rounded-full border border-rose-300 shadow-xs">
        ❌ Cross (X) the odd one out that does not belong!
      </div>

      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3.5 w-full max-w-lg">
        {options.map((opt, idx) => {
          const isSelected = selectedOption === opt;
          const emoji = opt.split(' ').pop() || '❓';
          const label = opt.replace(/[^\w\s-]/g, '').trim();

          return (
            <motion.button
              key={opt || idx}
              whileHover={disabled ? {} : { scale: 1.05, y: -4 }}
              whileTap={disabled ? {} : { scale: 0.95 }}
              onClick={() => handleSelect(opt)}
              disabled={disabled}
              className={`flex flex-col items-center justify-between p-4 rounded-3xl border-3 transition-all select-none cursor-pointer relative overflow-hidden min-h-[140px] ${
                isSelected
                  ? 'bg-gradient-to-b from-rose-100 to-rose-200 border-rose-500 shadow-[0_8px_0_#be123c] ring-4 ring-rose-300 scale-102'
                  : 'bg-white border-slate-200 border-b-6 border-b-slate-300 shadow-playful-sm hover:border-amber-400 hover:bg-amber-50/50'
              } ${disabled ? 'cursor-not-allowed opacity-85' : ''}`}
            >
              {/* Specular gloss */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

              <span className="text-5xl sm:text-6xl my-auto filter drop-shadow-md relative z-10 select-none">
                {emoji}
              </span>

              <span className="text-xs sm:text-sm font-bubble font-bold text-slate-900 text-center relative z-10 leading-tight truncate w-full px-1">
                {label}
              </span>

              {/* Red Cross Stamp when selected */}
              {isSelected && (
                <div className="absolute inset-0 bg-rose-500/15 flex items-center justify-center pointer-events-none">
                  <div className="w-12 h-12 rounded-full bg-rose-600 text-white flex items-center justify-center border-2 border-white shadow-xl animate-bounce">
                    <X className="w-8 h-8 stroke-[3]" />
                  </div>
                </div>
              )}
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
