import React, { useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import confetti from 'canvas-confetti';
import { Gift, Heart } from 'lucide-react';
import { Reward } from '../../models/types';
import { Button } from '../common/Button';
import { soundService } from '../../services/soundService';

interface RewardUnlockedModalProps {
  reward: Reward | null;
  onClose: () => void;
}

export const RewardUnlockedModal: React.FC<RewardUnlockedModalProps> = ({ reward, onClose }) => {
  const navigate = useNavigate();

  useEffect(() => {
    if (reward) {
      soundService.playLevelComplete();
      try {
        confetti({
          particleCount: 100,
          spread: 90,
          origin: { y: 0.5 },
          colors: ['#f43f5e', '#fbbf24', '#38bdf8', '#a855f7'],
        });
      } catch {
        // ignore
      }
    }
  }, [reward]);

  if (!reward) return null;

  const handleGoToWallet = () => {
    onClose();
    navigate('/rewards');
  };

  const getGiverImage = (): string => {
    if (reward.giverAvatar === 'swetha') return '/assets/characters/swetha_wave.png';
    if (reward.giverAvatar === 'both') return '/assets/characters/parents_pair.png';
    return '/assets/characters/vijai_wave.png';
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/70 backdrop-blur-md">
      <div className="w-full max-w-md bg-gradient-to-b from-rose-50 via-white to-amber-50 rounded-bubble border-4 border-rose-400 shadow-2xl p-6 sm:p-8 text-center relative overflow-hidden animate-scale-up">
        {/* Header Ribbon */}
        <div className="inline-flex items-center gap-2 bg-rose-100 text-rose-800 px-4 py-1.5 rounded-full font-bubble font-bold text-sm mb-3 border border-rose-300 animate-pulse-glow">
          <Gift className="w-4 h-4 text-rose-600" />
          <span>REAL FAMILY REWARD UNLOCKED!</span>
        </div>

        <h2 className="text-2xl sm:text-3xl font-bubble font-bold text-rose-950 mb-1">
          {reward.title}
        </h2>

        <p className="text-sm sm:text-base font-body text-slate-600 mb-4">
          {reward.description}
        </p>

        {/* Giver Character Avatar */}
        <div className="w-28 h-28 sm:w-32 sm:h-32 mx-auto mb-4 rounded-3xl overflow-hidden border-4 border-rose-300 bg-white shadow-playful p-1.5 transform hover:scale-105 transition-transform">
          <img
            src={getGiverImage()}
            alt={reward.giver}
            className="w-full h-full object-contain"
          />
        </div>

        <div className="inline-flex items-center gap-1.5 bg-rose-100 text-rose-900 px-3 py-1 rounded-full font-bubble text-sm font-semibold mb-4">
          <Heart className="w-4 h-4 fill-rose-500 text-rose-500" />
          <span>Given with love by: {reward.giver}</span>
        </div>

        <div className="bg-amber-100/80 border border-amber-300 rounded-2xl p-3 mb-6 text-xs sm:text-sm text-amber-900 font-medium">
          💡 Dad or Mom will confirm and celebrate this reward with you in real life!
        </div>

        {/* Action Buttons */}
        <div className="flex flex-col sm:flex-row gap-3">
          <Button variant="ghost" size="md" onClick={onClose} className="flex-1">
            Keep Playing
          </Button>
          <Button
            variant="danger"
            size="md"
            onClick={handleGoToWallet}
            className="flex-1 bg-gradient-to-b from-rose-500 to-rose-600 text-white border-rose-700"
          >
            <span>My Rewards Wallet</span>
            <Gift className="w-4 h-4" />
          </Button>
        </div>
      </div>
    </div>
  );
};
