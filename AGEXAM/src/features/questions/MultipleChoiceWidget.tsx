import React, { useState } from 'react';
import { Question } from '../../models/types';
import { Check } from 'lucide-react';

interface Props {
  question: Question;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
}

export const MultipleChoiceWidget: React.FC<Props> = ({ question, onAnswer, disabled }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (choice: string) => {
    if (disabled) return;
    setSelected(choice);
    onAnswer(choice);
  };

  const options = question.options || [];

  return (
    <div className="flex flex-col gap-3 w-full max-w-md">
      {options.map((opt) => {
        const isSelected = selected === opt;
        return (
          <button
            key={opt}
            onClick={() => handleSelect(opt)}
            disabled={disabled}
            className={`w-full p-4 sm:p-5 rounded-2xl border-3 flex items-center justify-between transition-all duration-200 transform active:translate-y-0.5 select-none cursor-pointer ${
              isSelected
                ? 'bg-amber-100 border-amber-500 shadow-playful ring-4 ring-amber-200'
                : 'bg-white border-slate-200 shadow-playful-sm hover:border-amber-300 hover:bg-amber-50/50'
            } ${disabled ? 'cursor-not-allowed opacity-80' : ''}`}
          >
            <span className="text-base sm:text-lg font-bubble font-bold text-slate-800 text-left">
              {opt}
            </span>
            {isSelected && <Check className="w-6 h-6 text-amber-600 font-bold" />}
          </button>
        );
      })}
    </div>
  );
};
