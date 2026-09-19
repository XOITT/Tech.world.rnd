import React, { useState } from 'react';
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

  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      {/* Visual Sets Demonstration */}
      <div className="w-full bg-gradient-to-r from-emerald-50 via-teal-50 to-sky-50 rounded-3xl border-2 border-emerald-300 p-5 shadow-inner flex flex-col items-center">
        <div className="flex items-center justify-between w-full px-4 mb-3 text-xs font-bubble font-bold text-emerald-800 uppercase tracking-wider">
          <span>Group 1</span>
          <span className="flex items-center gap-1 text-slate-400">
            <ArrowRightLeft className="w-3.5 h-3.5" /> 1-to-1 Match
          </span>
          <span>Group 2</span>
        </div>

        {/* 1-to-1 Pairs Diagram */}
        <div className="flex flex-col gap-2.5 w-full">
          {[1, 2, 3].map((num) => (
            <div
              key={num}
              className="flex items-center justify-between bg-white rounded-2xl px-4 py-2 border border-emerald-200 shadow-sm"
            >
              <div className="flex items-center gap-2">
                <span className="text-2xl">🐸</span>
                <span className="text-xs font-bubble font-semibold text-slate-600">Frog #{num}</span>
              </div>
              <div className="h-0.5 w-12 bg-dashed bg-emerald-300 border-t border-dashed border-emerald-400" />
              <div className="flex items-center gap-2">
                <span className="text-xs font-bubble font-semibold text-slate-600">Rock #{num}</span>
                <span className="text-2xl">🪨</span>
              </div>
            </div>
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
              className={`w-full p-4 rounded-2xl border-3 flex items-center justify-between transition-all duration-200 transform active:translate-y-0.5 select-none cursor-pointer ${
                isSelected
                  ? 'bg-emerald-100 border-emerald-500 shadow-playful ring-4 ring-emerald-200'
                  : 'bg-white border-slate-200 shadow-playful-sm hover:border-emerald-300 hover:bg-emerald-50/50'
              } ${disabled ? 'cursor-not-allowed opacity-80' : ''}`}
            >
              <span className="text-base font-bubble font-bold text-slate-800 text-left">
                {opt}
              </span>
              {isSelected && <Check className="w-5 h-5 text-emerald-600 font-bold" />}
            </button>
          );
        })}
      </div>
    </div>
  );
};
