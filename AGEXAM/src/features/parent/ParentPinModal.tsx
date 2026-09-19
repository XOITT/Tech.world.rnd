import React, { useState } from 'react';
import { useAppSelector } from '../../store';
import { Shield, Delete, X } from 'lucide-react';
import { soundService } from '../../services/soundService';

interface ParentPinModalProps {
  isOpen: boolean;
  onSuccess: () => void;
  onClose: () => void;
}

export const ParentPinModal: React.FC<ParentPinModalProps> = ({ isOpen, onSuccess, onClose }) => {
  const { pin } = useAppSelector((state) => state.parent);
  const [enteredPin, setEnteredPin] = useState<string>('');
  const [hasError, setHasError] = useState<boolean>(false);

  if (!isOpen) return null;

  const handleDigit = (digit: string) => {
    soundService.playClick();
    if (enteredPin.length < 4) {
      const next = enteredPin + digit;
      setEnteredPin(next);
      setHasError(false);

      if (next.length === 4) {
        if (next === pin) {
          soundService.playCorrect();
          onSuccess();
          setEnteredPin('');
        } else {
          soundService.playEncouragement();
          setHasError(true);
          setTimeout(() => setEnteredPin(''), 600);
        }
      }
    }
  };

  const handleDelete = () => {
    soundService.playClick();
    setEnteredPin((prev) => prev.slice(0, -1));
    setHasError(false);
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-sm animate-fade-in">
      <div className="w-full max-w-sm bg-white rounded-bubble border-4 border-purple-400 shadow-2xl p-6 text-center relative overflow-hidden">
        {/* Close Button */}
        <button
          onClick={onClose}
          className="absolute top-4 right-4 p-2 text-slate-400 hover:text-slate-700 rounded-full cursor-pointer"
        >
          <X className="w-5 h-5" />
        </button>

        {/* Lock Icon */}
        <div className="w-14 h-14 bg-purple-100 rounded-2xl flex items-center justify-center mx-auto mb-3 border-2 border-purple-300 text-purple-700">
          <Shield className="w-7 h-7" />
        </div>

        <h2 className="text-xl sm:text-2xl font-bubble font-bold text-slate-900 mb-1">
          Parent Mode 🔐
        </h2>
        <p className="text-xs sm:text-sm font-body text-slate-500 mb-5">
          Enter your 4-digit PIN to manage rewards & view learning insights.
        </p>

        {/* PIN Circles */}
        <div className="flex justify-center gap-3 mb-6">
          {[0, 1, 2, 3].map((idx) => {
            const isFilled = idx < enteredPin.length;
            return (
              <div
                key={idx}
                className={`w-4 h-4 rounded-full border-2 transition-all duration-200 ${
                  hasError
                    ? 'bg-rose-500 border-rose-600 scale-110'
                    : isFilled
                    ? 'bg-purple-600 border-purple-700 scale-110'
                    : 'bg-slate-200 border-slate-300'
                }`}
              />
            );
          })}
        </div>

        {hasError && (
          <p className="text-xs font-bubble font-bold text-rose-600 mb-3 animate-wiggle">
            Incorrect PIN. Please try again!
          </p>
        )}

        {/* Numeric Keypad */}
        <div className="grid grid-cols-3 gap-2.5 max-w-xs mx-auto mb-4">
          {['1', '2', '3', '4', '5', '6', '7', '8', '9'].map((digit) => (
            <button
              key={digit}
              onClick={() => handleDigit(digit)}
              className="w-16 h-14 mx-auto rounded-2xl bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 text-purple-950 font-bubble text-xl font-bold flex items-center justify-center active:scale-95 transition-all shadow-playful-sm cursor-pointer"
            >
              {digit}
            </button>
          ))}
          <div />
          <button
            onClick={() => handleDigit('0')}
            className="w-16 h-14 mx-auto rounded-2xl bg-purple-50 hover:bg-purple-100 border-2 border-purple-200 text-purple-950 font-bubble text-xl font-bold flex items-center justify-center active:scale-95 transition-all shadow-playful-sm cursor-pointer"
          >
            0
          </button>
          <button
            onClick={handleDelete}
            className="w-16 h-14 mx-auto rounded-2xl bg-slate-100 hover:bg-slate-200 border-2 border-slate-300 text-slate-700 flex items-center justify-center active:scale-95 transition-all cursor-pointer"
          >
            <Delete className="w-5 h-5" />
          </button>
        </div>

        <div className="text-[11px] font-body text-slate-400">
          Default Parent PIN is <span className="font-bold text-purple-700">1234</span>
        </div>
      </div>
    </div>
  );
};
