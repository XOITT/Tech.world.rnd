import React, { useState } from 'react';
import { motion } from 'framer-motion';
import { Question, VisualItem } from '../../models/types';
import { Check, Scale } from 'lucide-react';

interface Props {
  question: Question;
  onAnswer: (answer: string) => void;
  disabled?: boolean;
}

export const SizeCompareWidget: React.FC<Props> = ({ question, onAnswer, disabled }) => {
  const [selectedId, setSelectedId] = useState<string | null>(null);

  const handleSelect = (item: VisualItem, optName: string) => {
    if (disabled) return;
    setSelectedId(item.id || optName);
    onAnswer(optName);
  };

  const items: VisualItem[] = question.items || [];
  const options = question.options || [];

  // SPECIALIZED RENDERING FOR HEAVY VS LIGHT (SEESAW BALANCE SCALE)
  if (question.type === 'weight_thickness' && items.some(i => i.attribute === 'heavy' || i.attribute === 'light')) {

    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-lg">
        {/* Seesaw Balance Stage */}
        <div className="w-full bg-gradient-to-b from-sky-100 via-blue-50 to-emerald-100 rounded-3xl border-3 border-sky-300 p-6 shadow-playful flex flex-col items-center relative overflow-hidden min-h-[300px]">
          <div className="absolute top-2.5 left-3 px-3 py-1 bg-white/95 rounded-full text-[11px] font-bubble font-bold text-sky-900 border border-sky-200 shadow-xs flex items-center gap-1.5">
            <Scale className="w-3.5 h-3.5 text-sky-600" />
            <span>Seesaw Balance Scale</span>
          </div>

          <div className="text-xs font-bubble font-bold text-slate-700 mt-5 mb-2 bg-white/80 px-3 py-1 rounded-full">
            👇 Tap the item that answers the question!
          </div>

          {/* Interactive Seesaw Plank */}
          <div className="w-full max-w-sm mt-4 relative flex flex-col items-center">
            {/* Tilted Plank: Light side up (-12deg), Heavy side down */}
            <div className="w-full h-4 bg-amber-600 rounded-full shadow-md relative transform -rotate-6 transition-transform duration-500 origin-center flex justify-between items-center px-2">
              {/* Left Item Seat */}
              <div className="absolute -top-24 left-2 flex flex-col items-center">
                <motion.button
                  whileHover={disabled ? {} : { scale: 1.08 }}
                  whileTap={disabled ? {} : { scale: 0.95 }}
                  onClick={() => handleSelect(items[0], options[0] || items[0].label)}
                  disabled={disabled}
                  className={`p-3 rounded-2xl border-3 transition-all cursor-pointer flex flex-col items-center shadow-lg ${
                    items[0].attribute === 'heavy'
                      ? 'bg-amber-100 border-amber-500 text-amber-900'
                      : 'bg-sky-100 border-sky-400 text-sky-900'
                  } ${selectedId === items[0].id ? 'ring-4 ring-emerald-400 !border-emerald-600' : ''}`}
                >
                  <span className={items[0].attribute === 'heavy' ? 'text-7xl drop-shadow-md' : 'text-5xl drop-shadow-sm'}>
                    {items[0].emoji || '🪶'}
                  </span>
                  <span className="text-xs font-bubble font-extrabold mt-1 bg-white/90 px-2 py-0.5 rounded-md">
                    {items[0].label}
                  </span>
                  {selectedId === items[0].id && (
                    <span className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full p-1 shadow">
                      <Check className="w-4 h-4 font-bold" />
                    </span>
                  )}
                </motion.button>
              </div>

              {/* Right Item Seat */}
              <div className="absolute -top-24 right-2 flex flex-col items-center">
                <motion.button
                  whileHover={disabled ? {} : { scale: 1.08 }}
                  whileTap={disabled ? {} : { scale: 0.95 }}
                  onClick={() => handleSelect(items[1], options[1] || items[1].label)}
                  disabled={disabled}
                  className={`p-3 rounded-2xl border-3 transition-all cursor-pointer flex flex-col items-center shadow-lg ${
                    items[1].attribute === 'heavy'
                      ? 'bg-amber-100 border-amber-500 text-amber-900'
                      : 'bg-sky-100 border-sky-400 text-sky-900'
                  } ${selectedId === items[1].id ? 'ring-4 ring-emerald-400 !border-emerald-600' : ''}`}
                >
                  <span className={items[1].attribute === 'heavy' ? 'text-7xl drop-shadow-md' : 'text-5xl drop-shadow-sm'}>
                    {items[1].emoji || '⚓'}
                  </span>
                  <span className="text-xs font-bubble font-extrabold mt-1 bg-white/90 px-2 py-0.5 rounded-md">
                    {items[1].label}
                  </span>
                  {selectedId === items[1].id && (
                    <span className="absolute -top-2 -right-2 bg-emerald-500 text-white rounded-full p-1 shadow">
                      <Check className="w-4 h-4 font-bold" />
                    </span>
                  )}
                </motion.button>
              </div>
            </div>

            {/* Fulcrum Triangle Base */}
            <div className="w-0 h-0 border-l-[22px] border-l-transparent border-r-[22px] border-r-transparent border-b-[38px] border-b-slate-700 -mt-1 shadow-md" />
            <div className="w-24 h-3 bg-slate-800 rounded-full mt-1" />
          </div>
        </div>

        {/* Action Selection Buttons */}
        <div className="grid grid-cols-2 gap-4 w-full">
          {items.map((item, idx) => {
            const matchingOption = options[idx] || item.label;
            const isSelected = selectedId === item.id || selectedId === matchingOption;
            return (
              <button
                key={item.id || idx}
                onClick={() => handleSelect(item, matchingOption)}
                disabled={disabled}
                className={`p-4 rounded-2xl border-3 font-bubble font-bold text-sm sm:text-base flex items-center justify-center gap-2 transition-all cursor-pointer shadow-playful-sm ${
                  isSelected
                    ? 'bg-emerald-100 border-emerald-500 ring-4 ring-emerald-200 text-emerald-900 scale-102'
                    : 'bg-white border-slate-200 hover:border-amber-300 text-slate-800'
                }`}
              >
                <span>{item.emoji}</span>
                <span>{item.label}</span>
              </button>
            );
          })}
        </div>
      </div>
    );
  }

  // STANDARD HIGH-CONTRAST SIZE COMPARISON (Big vs Small, Tall vs Short, Long vs Short, Thick vs Thin, More vs Less)
  if (items.length >= 2) {
    return (
      <div className="flex flex-col items-center gap-6 w-full max-w-lg">
        {/* Instruction Badge */}
        <div className="w-full text-center text-xs font-bubble font-bold text-sky-900 bg-sky-100/90 py-1.5 px-4 rounded-full border border-sky-300 shadow-xs">
          👉 Tap the card that matches the question!
        </div>

        {/* Side-by-side Visual Comparison Stage directly from Coursebook */}
        <div className="flex items-end justify-center gap-4 sm:gap-8 w-full p-6 bg-gradient-to-b from-sky-50 via-white to-amber-50 rounded-3xl border-3 border-amber-300 shadow-playful min-h-[280px]">
          {items.map((item, idx) => {
            const isSelected = selectedId === item.id || selectedId === item.label;
            const matchingOption = options[idx] || item.label;

            // Visual dimensions matching real physical differences from coursebook
            const isGiant = item.visualScale === 'giant';
            const isBig = item.visualScale === 'big';
            const isSmall = item.visualScale === 'small';
            const isTiny = item.visualScale === 'tiny';
            const isTall = item.visualScale === 'tall';
            const isShort = item.visualScale === 'short';
            const isLong = item.visualScale === 'long';

            let cardHeight = 'h-44 sm:h-52 w-36 sm:w-44 bg-sky-50 border-sky-400';
            let emojiSize = 'text-6xl sm:text-7xl';
            let sizePlaque = 'OBJECT';
            let plaqueColor = 'bg-sky-500 text-white';

            if (isGiant) {
              cardHeight = 'h-60 sm:h-68 w-44 sm:w-56 bg-gradient-to-b from-amber-100 via-amber-50 to-amber-200 border-amber-500 shadow-xl';
              emojiSize = 'text-8xl sm:text-9xl';
              sizePlaque = '⭐ GIANT / BIG';
              plaqueColor = 'bg-amber-500 text-white';
            } else if (isBig) {
              cardHeight = 'h-52 sm:h-60 w-40 sm:w-48 bg-gradient-to-b from-sky-100 via-sky-50 to-blue-200 border-sky-500 shadow-lg';
              emojiSize = 'text-7xl sm:text-8xl';
              sizePlaque = '⭐ BIG';
              plaqueColor = 'bg-sky-500 text-white';
            } else if (isTiny) {
              cardHeight = 'h-24 sm:h-28 w-24 sm:w-28 bg-gradient-to-b from-rose-50 to-rose-100 border-rose-400 shadow-sm';
              emojiSize = 'text-3xl sm:text-4xl';
              sizePlaque = '🐭 TINY';
              plaqueColor = 'bg-rose-400 text-white';
            } else if (isSmall) {
              cardHeight = 'h-28 sm:h-34 w-28 sm:w-34 bg-gradient-to-b from-slate-50 to-slate-100 border-slate-400 shadow-sm';
              emojiSize = 'text-4xl sm:text-5xl';
              sizePlaque = 'SMALL';
              plaqueColor = 'bg-slate-400 text-white';
            } else if (isTall) {
              cardHeight = 'h-64 sm:h-76 w-32 sm:w-38 bg-gradient-to-b from-emerald-100 to-emerald-200 border-emerald-500 shadow-xl';
              emojiSize = 'text-8xl sm:text-9xl';
              sizePlaque = '🦒 TALL';
              plaqueColor = 'bg-emerald-600 text-white';
            } else if (isShort) {
              cardHeight = 'h-28 sm:h-32 w-32 sm:w-38 bg-gradient-to-b from-blue-50 to-blue-100 border-blue-400 shadow-sm';
              emojiSize = 'text-4xl sm:text-5xl';
              sizePlaque = '🐧 SHORT';
              plaqueColor = 'bg-blue-400 text-white';
            } else if (isLong) {
              cardHeight = 'h-36 sm:h-44 w-52 sm:w-64 bg-gradient-to-b from-purple-100 to-purple-200 border-purple-500 shadow-lg';
              emojiSize = 'text-7xl sm:text-8xl';
              sizePlaque = '🐛 LONG';
              plaqueColor = 'bg-purple-600 text-white';
            }

            return (
              <motion.button
                key={item.id || idx}
                whileHover={disabled ? {} : { scale: 1.05, y: -4 }}
                whileTap={disabled ? {} : { scale: 0.95 }}
                onClick={() => handleSelect(item, matchingOption)}
                disabled={disabled}
                className={`flex flex-col items-center justify-between p-4 rounded-3xl border-4 transition-all duration-300 select-none cursor-pointer relative shadow-playful ${cardHeight} ${
                  isSelected
                    ? 'ring-4 ring-amber-400 scale-105 !border-amber-600 shadow-2xl'
                    : 'hover:border-amber-400'
                } ${disabled ? 'cursor-not-allowed opacity-90' : ''}`}
              >
                {/* Size badge */}
                <div className={`px-3 py-1 rounded-full text-[11px] font-bubble font-extrabold shadow-xs ${plaqueColor}`}>
                  {sizePlaque}
                </div>

                {/* Scaled Emoji */}
                <span className={`${emojiSize} filter drop-shadow-lg my-auto select-none`}>
                  {item.emoji || '⭐'}
                </span>

                {/* Label */}
                <div className="w-full bg-white/95 py-1 px-2 rounded-xl text-center font-bubble font-bold text-xs sm:text-sm text-slate-900 border border-slate-200 truncate shadow-xs">
                  {item.label}
                </div>

                {isSelected && (
                  <div className="absolute -top-3 -right-3 w-8 h-8 rounded-full bg-emerald-500 text-white flex items-center justify-center border-2 border-white shadow-lg">
                    <Check className="w-5 h-5 font-bold" />
                  </div>
                )}
              </motion.button>
            );
          })}
        </div>
      </div>
    );
  }

  // Fallback if no visual items array provided
  return (
    <div className="flex flex-col items-center gap-6 w-full max-w-md">
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4 w-full">
        {options.map((opt) => {
          const isSelected = selectedId === opt;
          return (
            <button
              key={opt}
              onClick={() => {
                if (disabled) return;
                setSelectedId(opt);
                onAnswer(opt);
              }}
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
