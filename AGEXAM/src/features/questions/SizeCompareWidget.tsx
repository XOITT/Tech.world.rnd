import React, { useState } from 'react';
import { Question } from '../../models/types';

interface Props {
  question: Question;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
}

export const SizeCompareWidget: React.FC<Props> = ({ question, onAnswer, disabled }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (choice: string) => {
    if (disabled) return;
    setSelected(choice);
    onAnswer(choice);
  };

  const options = question.options || [];

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {options.map((opt) => {
          const isSelected = selected === opt;
          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={disabled}
              className={`p-5 rounded-3xl border-3 flex flex-col items-center justify-center transition-all duration-200 transform active:translate-y-1 select-none cursor-pointer ${
                isSelected
                  ? 'bg-sky-100 border-sky-500 shadow-playful scale-102 ring-4 ring-sky-200'
                  : 'bg-white border-slate-200 shadow-playful-sm hover:border-sky-300 hover:bg-sky-50/50'
              } ${disabled ? 'cursor-not-allowed opacity-80' : ''}`}
            >
              <div className="w-20 h-20 bg-sky-50 rounded-2xl flex items-center justify-center text-5xl mb-3 border border-sky-200 shadow-inner">
                {opt.split(' ').pop()}
              </div>
              <span className="text-base font-bubble font-bold text-slate-800 text-center">
                {opt}
              </span>
            </button>
          );
        })}
      </div>
    </div>
  );
};
