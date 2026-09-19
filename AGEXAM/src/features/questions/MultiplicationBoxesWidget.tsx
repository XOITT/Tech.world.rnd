import React, { useState } from 'react';
import { Question } from '../../models/types';
import { Rocket, BatteryCharging } from 'lucide-react';

interface Props {
  question: Question;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
}

export const MultiplicationBoxesWidget: React.FC<Props> = ({ question, onAnswer, disabled }) => {
  const [selected, setSelected] = useState<string | null>(null);

  const handleSelect = (choice: string) => {
    if (disabled) return;
    setSelected(choice);
    onAnswer(choice);
  };

  const options = question.options || [];

  return (
    <div className="flex flex-col items-center gap-5 w-full max-w-md">
      {/* Visual Fuel Crates Simulation */}
      <div className="w-full bg-gradient-to-b from-indigo-900 to-purple-900 text-white rounded-3xl p-5 border-4 border-amber-400 shadow-xl relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2">
            <Rocket className="w-6 h-6 text-amber-300 animate-bounce-gentle" />
            <span className="font-bubble font-bold text-amber-300 text-sm">Spaceship Power Grid</span>
          </div>
          <div className="flex items-center gap-1 text-xs bg-purple-800/80 px-2.5 py-1 rounded-full border border-purple-600">
            <BatteryCharging className="w-3.5 h-3.5 text-emerald-400" />
            <span>3 Boxes × 4 Units</span>
          </div>
        </div>

        {/* 3 Fuel Boxes */}
        <div className="grid grid-cols-3 gap-2.5 mb-3">
          {[1, 2, 3].map((boxNum) => (
            <div
              key={boxNum}
              className="bg-purple-800/90 border-2 border-amber-400/80 rounded-2xl p-2.5 flex flex-col items-center shadow-md"
            >
              <span className="text-[11px] font-bubble font-semibold text-amber-200 mb-1.5">
                Crate #{boxNum}
              </span>
              <div className="grid grid-cols-2 gap-1.5">
                <span className="text-xl">🔋</span>
                <span className="text-xl">🔋</span>
                <span className="text-xl">🔋</span>
                <span className="text-xl">🔋</span>
              </div>
              <span className="text-xs font-bubble font-bold text-emerald-300 mt-1">4 Units</span>
            </div>
          ))}
        </div>

        {/* Visual Addition equation */}
        <div className="bg-purple-950/80 rounded-xl py-2 px-3 text-center font-bubble text-xs text-amber-200 border border-purple-700">
          4 + 4 + 4 = <span className="text-emerald-300 font-bold text-sm">12 Batteries</span> (3 groups of 4!)
        </div>
      </div>

      {/* Answer Options */}
      <div className="grid grid-cols-1 gap-3 w-full">
        {options.map((opt) => {
          const isSelected = selected === opt;
          return (
            <button
              key={opt}
              onClick={() => handleSelect(opt)}
              disabled={disabled}
              className={`p-4 rounded-2xl border-3 font-bubble font-bold text-base transition-all duration-200 select-none cursor-pointer flex items-center justify-between ${
                isSelected
                  ? 'bg-purple-100 border-purple-600 text-purple-950 shadow-playful ring-4 ring-purple-200'
                  : 'bg-white border-slate-200 text-slate-800 shadow-playful-sm hover:border-purple-300'
              } ${disabled ? 'cursor-not-allowed opacity-80' : ''}`}
            >
              <span>{opt}</span>
              {isSelected && <span className="text-purple-600 text-lg">✓</span>}
            </button>
          );
        })}
      </div>
    </div>
  );
};
