import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Question } from '../../models/types';
import { Check, ArrowRightLeft } from 'lucide-react';

interface Props {
  question: Question;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
}

export const EqualSetsWidget: React.FC<Props> = ({ question, onAnswer, disabled }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (choice: string) => {
    if (disabled) return;
    setSelected(choice);
    onAnswer(choice);
  };

  const options = question.options || [];
  const items = question.items || [];

  // Default pairs if items not explicitly given
  const leftEmoji = items[0]?.emoji || '🐸';
  const leftLabel = items[0]?.label || 'Frog';
  const rightEmoji = items[1]?.emoji || '🪨';
  const rightLabel = items[1]?.label || 'Rock';

  const pairCount = 3;

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      {/* Activity Prompt Banner */}
      <div className="w-full text-center text-xs font-bubble font-bold text-teal-900 bg-teal-100/90 py-1.5 px-4 rounded-full border border-teal-300 shadow-xs">
        🤝 1-to-1 Matching Pairs from Coursebook
      </div>

      {/* Visual Sets Demonstration */}
      <div className="w-full bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 rounded-3xl border-3 border-teal-300 p-5 shadow-playful flex flex-col items-center">
        <div className="flex items-center justify-between w-full px-4 mb-3 text-xs font-bubble font-bold text-teal-800 uppercase tracking-wider">
          <span>{leftLabel}s</span>
          <span className="flex items-center gap-1 text-teal-600 bg-white/80 px-2 py-0.5 rounded-full border border-teal-200">
            <ArrowRightLeft className="w-3.5 h-3.5" /> 1-to-1 Match
          </span>
          <span>{rightLabel}s</span>
        </div>

        {/* 1-to-1 Pairs Diagram */}
        <div className="flex flex-col gap-2.5 w-full">
          {Array.from({ length: pairCount }).map((_, idx) => (
            <motion.div
              key={idx}
              initial={{ opacity: 0, x: -10 }}
              animate={{ opacity: 1, x: 0 }}
              transition={{ delay: idx * 0.1 }}
              className="flex items-center justify-between bg-white rounded-2xl px-4 py-2.5 border-2 border-teal-200 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="text-3xl filter drop-shadow-sm">{leftEmoji}</span>
                <span className="text-xs font-bubble font-bold text-slate-700">#{idx + 1}</span>
              </div>
              
              {/* Connector line with cute dot */}
              <div className="flex items-center gap-1 flex-1 mx-3">
                <div className="h-0.5 w-full border-t-2 border-dashed border-teal-400" />
                <div className="w-2.5 h-2.5 rounded-full bg-teal-500 animate-pulse shrink-0" />
                <div className="h-0.5 w-full border-t-2 border-dashed border-teal-400" />
              </div>

              <div className="flex items-center gap-2">
                <span className="text-xs font-bubble font-bold text-slate-700">#{idx + 1}</span>
                <span className="text-3xl filter drop-shadow-sm">{rightEmoji}</span>
              </div>
            </motion.div>
          ))}
        </div>
      </div>

      {/* Options */}
      <div className="flex flex-col gap-3 w-full">
        {options.map((opt) => {
          const isSelected = selected === opt;
          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={disabled}
              className={`w-full p-4 rounded-2xl border-3 flex items-center justify-between transition-all duration-200 transform active:translate-y-0.5 select-none cursor-pointer shadow-playful-sm ${
                isSelected
                  ? 'bg-teal-100 border-teal-500 shadow-playful ring-4 ring-teal-200 text-teal-950 scale-102 font-extrabold'
                  : 'bg-white border-slate-200 hover:border-teal-300 hover:bg-teal-50/50 text-slate-800 font-bold'
              } ${disabled ? 'cursor-not-allowed opacity-80' : ''}`}
            >
              <span className="text-sm sm:text-base font-bubble text-left">
                {opt}
              </span>
              {isSelected && <Check className="w-5 h-5 text-teal-600 font-bold shrink-0" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
