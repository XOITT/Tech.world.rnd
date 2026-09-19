import React, { useEffect } from 'react';
import confetti from 'canvas-confetti';
import { Star, Sparkles, ArrowRight, RotateCcw } from 'lucide-react';
import { Button } from '../common/Button';
import { soundService } from '../../services/soundService';

interface LevelCompleteModalProps {
  isOpen: boolean;
  levelTitle: string;
  starsEarned: number; // 1, 2, or 3
  xpEarned: number;
  onNextLevel: () => void;
  onReplay: () => void;
  onClose: () => void;
}

export const LevelCompleteModal: React.FC<LevelCompleteModalProps> = ({
  isOpen,
  levelTitle,
  starsEarned,
  xpEarned,
  onNextLevel,
  onReplay,
}) => {
  useEffect(() => {
    if (isOpen) {
      soundService.playLevelComplete();

      // Confetti burst
      try {
        confetti({
          particleCount: 80,
          spread: 70,
          origin: { y: 0.6 },
          colors: ['#facc15', '#38bdf8', '#fb7185', '#4ade80', '#c084fc'],
        });
      } catch {
        // ignore if canvas not ready
      }
    }
  }, [isOpen]);

  if (!isOpen) return null;

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/65 backdrop-blur-md">
      <div className="w-full max-w-md bg-gradient-to-b from-amber-50 via-white to-amber-100/80 rounded-bubble border-4 border-amber-400 shadow-2xl p-6 sm:p-8 text-center relative overflow-hidden animate-scale-up">
        {/* Celebration Title */}
        <div className="inline-flex items-center gap-1.5 bg-amber-200 text-amber-950 px-4 py-1.5 rounded-full font-bubble font-bold text-sm mb-3 border border-amber-400 animate-bounce-gentle">
          <Sparkles className="w-4 h-4 text-amber-700" />
          <span>LEVEL COMPLETE!</span>
          <Sparkles className="w-4 h-4 text-amber-700" />
        </div>

        <h2 className="text-2xl sm:text-3xl font-bubble font-bold text-amber-950 mb-1">
          Amazing Work, Aghanya! 🎉
        </h2>
        <p className="text-sm sm:text-base font-body text-slate-600 mb-5">
          You conquered <span className="font-bold text-amber-900">{levelTitle}</span>!
        </p>

        {/* Parents Duo Jumping Celebration Image */}
        <div className="w-32 h-32 sm:w-36 sm:h-36 mx-auto mb-4 rounded-3xl overflow-hidden border-4 border-amber-400 bg-white shadow-playful p-1.5 transform hover:scale-105 transition-transform">
          <img
            src="/assets/characters/parents_pair.png"
            alt="Dad Vijai and Mom Swetha Celebrating"
            className="w-full h-full object-contain"
          />
        </div>

        {/* Stars Display */}
        <div className="flex justify-center items-center gap-3 my-4">
          {[1, 2, 3].map(index => {
            const isEarned = index <= starsEarned;
            return (
              <div
                key={index}
                className={`transform transition-all duration-500 ${
                  isEarned ? 'scale-110' : 'opacity-30 scale-90'
                }`}
              >
                <div
                  className={`w-14 h-14 sm:w-16 sm:h-16 rounded-2xl flex items-center justify-center border-2 ${
                    isEarned
                      ? 'bg-gradient-to-tr from-amber-400 to-yellow-300 border-amber-500 shadow-playful'
                      : 'bg-slate-200 border-slate-300'
                  }`}
                >
                  <Star
                    className={`w-9 h-9 ${
                      isEarned ? 'text-amber-950 fill-amber-950' : 'text-slate-400'
                    }`}
                  />
                </div>
              </div>
            );
          })}
        </div>

        {/* XP Gain Card */}
        <div className="bg-amber-100/90 border-2 border-amber-300 rounded-2xl py-3 px-4 mb-6 shadow-sm inline-block">
          <div className="text-xs font-bubble font-bold text-amber-800 uppercase tracking-wider">
            You Earned
          </div>
          <div className="text-2xl sm:text-3xl font-bubble font-bold text-amber-950 flex items-center justify-center gap-1.5">
            <span>+{xpEarned} XP</span>
            <span className="text-xl">⚡</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3 justify-center">
          <Button
            variant="ghost"
            size="md"
            onClick={onReplay}
            className="flex-1"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Play Again</span>
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={onNextLevel}
            className="flex-1 text-lg"
          >
            <span>Next Level</span>
            <ArrowRight className="w-5 h-5" />
          </Button>
        </div>
      </div>
    </div>
  );
};
