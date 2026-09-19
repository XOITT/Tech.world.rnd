import React from 'react';
import { useNavigate } from 'react-router-dom';
import { Volume2, VolumeX, Shield, Flame } from 'lucide-react';
import { useAppDispatch, useAppSelector } from '../../store';
import { toggleSound } from '../../store/soundSlice';
import { XPBar } from '../common/XPBar';
import { soundService } from '../../services/soundService';

export const TopHeader: React.FC = () => {
  const dispatch = useAppDispatch();
  const navigate = useNavigate();
  const { totalXp, currentStreak, name, avatarUrl } = useAppSelector(state => state.user);
  const { isMuted } = useAppSelector(state => state.sound);

  const handleSoundToggle = () => {
    dispatch(toggleSound());
  };

  const handleParentClick = () => {
    soundService.playClick();
    navigate('/parent');
  };

  return (
    <header className="sticky top-0 z-40 w-full bg-white/90 backdrop-blur-md border-b-2 border-amber-200/80 px-3 sm:px-6 py-2.5 shadow-sm">
      <div className="max-w-4xl mx-auto flex items-center justify-between gap-2">
        {/* Profile and Greeting */}
        <div className="flex items-center gap-2.5">
          <div className="w-10 h-10 sm:w-11 sm:h-11 rounded-2xl overflow-hidden border-2 border-amber-400 shadow-sm bg-amber-100 flex-shrink-0">
            <img src={avatarUrl} alt={name} className="w-full h-full object-cover" />
          </div>
          <div>
            <div className="text-xs sm:text-sm font-bubble font-semibold text-slate-500">Welcome,</div>
            <div className="text-sm sm:text-base font-bubble font-bold text-amber-950 leading-tight">
              {name} ⭐
            </div>
          </div>
        </div>

        {/* Stats & Controls */}
        <div className="flex items-center gap-1.5 sm:gap-3">
          {/* Streak */}
          <div className="flex items-center gap-1 bg-orange-100 text-orange-800 font-bubble font-bold text-xs sm:text-sm px-2.5 py-1.5 rounded-full border border-orange-300 shadow-sm">
            <Flame className="w-4 h-4 text-orange-500 fill-orange-500 animate-pulse" />
            <span>{currentStreak}d</span>
          </div>

          {/* XP Bar */}
          <XPBar xp={totalXp} size="sm" />

          {/* Sound Toggle */}
          <button
            onClick={handleSoundToggle}
            className={`p-2 rounded-2xl border transition-all cursor-pointer ${
              isMuted
                ? 'bg-slate-100 text-slate-400 border-slate-200'
                : 'bg-amber-100 text-amber-800 border-amber-300 hover:bg-amber-200'
            }`}
            title={isMuted ? 'Turn Sound On' : 'Mute Sound'}
            aria-label="Toggle Sound"
          >
            {isMuted ? <VolumeX className="w-4 h-4 sm:w-5 sm:h-5" /> : <Volume2 className="w-4 h-4 sm:w-5 sm:h-5" />}
          </button>

          {/* Parent Mode Lock */}
          <button
            onClick={handleParentClick}
            className="p-2 rounded-2xl bg-purple-100 text-purple-800 border border-purple-300 hover:bg-purple-200 transition-all cursor-pointer"
            title="Parent Mode"
            aria-label="Parent Mode"
          >
            <Shield className="w-4 h-4 sm:w-5 sm:h-5" />
          </button>
        </div>
      </div>
    </header>
  );
};
