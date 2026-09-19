import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Question } from '../../models/types';

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
      <div className="grid grid-cols-2 gap-4 w-full max-w-md">
        {options.map((opt) => {
          const isSelected = selectedOption === opt;
          return (
            <motion.button
              key={opt}
              whileHover={disabled ? {} : { scale: 1.05, y: -4 }}
              whileTap={disabled ? {} : { scale: 0.95 }}
              onClick={() => handleSelect(opt)}
              disabled={disabled}
              className={`flex flex-col items-center justify-center p-5 rounded-3xl border-3 transition-all select-none cursor-pointer relative overflow-hidden ${
                isSelected
                  ? 'bg-gradient-to-b from-amber-100 to-amber-200 border-amber-500 shadow-[0_8px_0_#b45309] ring-4 ring-amber-300'
                  : 'bg-white border-slate-200 border-b-6 border-b-slate-300 shadow-sm hover:border-amber-400 hover:bg-amber-50/50'
              } ${disabled ? 'cursor-not-allowed opacity-85' : ''}`}
            >
              {/* Specular gloss */}
              <div className="absolute top-0 left-0 right-0 h-1/2 bg-gradient-to-b from-white/40 to-transparent pointer-events-none" />

              <span className="text-4xl sm:text-5xl mb-2.5 filter drop-shadow-md relative z-10">
                {opt.split(' ').pop()}
              </span>

              <span className="text-sm sm:text-base font-bubble font-bold text-slate-900 text-center relative z-10 leading-tight">
                {opt.replace(/[^\w\s-]/g, '').trim()}
              </span>
            </motion.button>
          );
        })}
      </div>
    </div>
  );
};
