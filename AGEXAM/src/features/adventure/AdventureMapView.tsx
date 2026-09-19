import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { motion } from 'framer-motion';
import { useAppSelector } from '../../store';
import { worldsData } from '../../data/curriculumData';
import { World, Level } from '../../models/types';
import { Star, Lock, Crown, CheckCircle2, Sparkles, Compass } from 'lucide-react';
import { soundService } from '../../services/soundService';

export const AdventureMapView: React.FC = () => {
  const navigate = useNavigate();
  const [selectedWorldId, setSelectedWorldId] = useState<string>('world-math-mountain');
  const { levelProgress } = useAppSelector((state) => state.learning);

  const selectedWorld: World =
    worldsData.find((w) => w.id === selectedWorldId) || worldsData[0];

  const handleLevelClick = (level: Level, isUnlocked: boolean) => {
    if (!isUnlocked) {
      soundService.playEncouragement();
      alert(`🔒 Level ${level.levelNumber} is locked! Complete the earlier adventures to unlock this path! ⭐`);
      return;
    }
    soundService.playClick();
    navigate(`/learn/${selectedWorld.id}/${level.id}`);
  };

  return (
    <div className="flex flex-col gap-5 pb-32 max-w-xl mx-auto px-4 pt-3 relative">
      {/* Background Floating Atmosphere */}
      <div className="fixed inset-0 pointer-events-none overflow-hidden -z-10">
        <div className="absolute top-20 -left-12 w-48 h-20 bg-white/40 rounded-full filter blur-md cloud-anim-1" />
        <div className="absolute top-64 -right-16 w-56 h-24 bg-white/30 rounded-full filter blur-md cloud-anim-2" />
      </div>

      {/* World Switcher Tabs */}
      <div className="flex gap-2.5 overflow-x-auto pb-2 no-scrollbar px-1">
        {worldsData.map((world) => {
          const isSelected = world.id === selectedWorldId;
          return (
            <motion.button
              key={world.id}
              whileHover={{ scale: 1.03 }}
              whileTap={{ scale: 0.96 }}
              onClick={() => {
                soundService.playClick();
                setSelectedWorldId(world.id);
              }}
              className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl font-bubble text-xs sm:text-sm font-bold whitespace-nowrap transition-all select-none cursor-pointer border-2 ${
                isSelected
                  ? 'btn-3d-amber shadow-playful scale-102 border-amber-600'
                  : 'bg-white/90 text-slate-700 border-slate-200 hover:bg-amber-50 shadow-sm'
              }`}
            >
              <span className="text-xl">{world.icon}</span>
              <span>{world.name}</span>
            </motion.button>
          );
        })}
      </div>

      {/* World Hero Scenery Card */}
      <div
        className={`w-full rounded-3xl p-6 bg-gradient-to-r ${selectedWorld.gradient} text-white shadow-playful-lg border-4 border-white relative overflow-hidden`}
      >
        {/* Decorative background sun & clouds */}
        <div className="absolute -right-6 -bottom-6 w-36 h-36 rounded-full bg-white/10 filter blur-xl pointer-events-none" />
        <div className="absolute top-3 right-6 text-white/20 text-7xl font-bubble font-black select-none pointer-events-none">
          {selectedWorld.icon}
        </div>

        <div className="relative z-10">
          <div className="inline-flex items-center gap-1.5 bg-white/25 backdrop-blur-md px-3 py-1 rounded-full text-xs font-bubble font-bold mb-2">
            <Compass className="w-3.5 h-3.5" />
            <span>ADVENTURE REALM</span>
          </div>
          <h1 className="text-2xl sm:text-3xl font-bubble font-extrabold tracking-wide drop-shadow-sm">
            {selectedWorld.name}
          </h1>
          <p className="text-xs sm:text-sm font-body text-white/95 mt-1 max-w-sm leading-relaxed">
            {selectedWorld.description}
          </p>

          <div className="flex items-center gap-3 mt-4 pt-3 border-t border-white/20 text-xs font-bubble">
            <span className="bg-black/20 px-3 py-1 rounded-full">
              {selectedWorld.levels.length} Quests to Master
            </span>
            <span className="flex items-center gap-1">
              <Sparkles className="w-3.5 h-3.5 text-amber-300" />
              Syllabus Aligned
            </span>
          </div>
        </div>
      </div>

      {/* Winding 2.5D Adventure Map Trail */}
      <div className="relative flex flex-col items-center py-8">
        {/* Animated Dashed SVG Trail */}
        <svg
          className="absolute top-10 bottom-10 w-48 h-full pointer-events-none -z-0 stroke-amber-400/70"
          style={{ height: 'calc(100% - 80px)' }}
          viewBox="0 0 100 800"
          preserveAspectRatio="none"
          fill="none"
        >
          <path
            d="M 50 0 Q 85 100, 50 200 T 50 400 T 50 600 T 50 800"
            strokeWidth="8"
            strokeDasharray="12 12"
            strokeLinecap="round"
          />
        </svg>

        {/* Level Stepping Stones */}
        <div className="flex flex-col items-center gap-12 w-full z-10">
          {selectedWorld.levels.map((level, idx) => {
            const progress = levelProgress[level.id];
            const isUnlocked = progress ? progress.isUnlocked : idx === 0;
            const isCompleted = progress ? progress.isCompleted : false;
            const stars = progress ? progress.starsEarned : 0;
            const isBoss = level.isBossLevel;

            // Curved stepping pattern: left, center, right, center...
            const xOffsets = ['translate-x-0', '-translate-x-12 sm:-translate-x-16', 'translate-x-12 sm:translate-x-16', 'translate-x-0'];
            const offsetClass = xOffsets[idx % 4];

            return (
              <div
                key={level.id}
                className={`flex flex-col items-center transition-all duration-300 ${offsetClass}`}
              >
                {/* 3D Stepping Stone Button */}
                <motion.button
                  whileHover={isUnlocked ? { scale: 1.08, y: -4 } : {}}
                  whileTap={isUnlocked ? { scale: 0.94 } : {}}
                  onClick={() => handleLevelClick(level, isUnlocked)}
                  className={`relative w-22 h-22 sm:w-26 sm:h-26 rounded-3xl flex flex-col items-center justify-center transition-all select-none cursor-pointer ${
                    isCompleted
                      ? 'btn-3d-emerald shadow-[0_8px_0_#15803d] text-white'
                      : isUnlocked
                      ? 'btn-3d-amber shadow-[0_8px_0_#b45309] text-amber-950 ring-4 ring-yellow-300/80'
                      : 'bg-slate-200 border-2 border-slate-300 border-b-6 border-b-slate-400 text-slate-400 opacity-75 cursor-not-allowed'
                  }`}
                >
                  {/* Top Specular Sheen for 3D depth */}
                  <div className="absolute top-0 left-0 right-0 h-1/3 bg-white/35 rounded-t-3xl pointer-events-none" />

                  {/* Character Walking Pin on Current Mission */}
                  {isUnlocked && !isCompleted && (
                    <div className="absolute -top-10 -right-2 w-12 h-12 rounded-full overflow-hidden border-3 border-white shadow-xl bg-amber-100 animate-bounce-gentle z-20">
                      <img
                        src="/assets/characters/aghanya_animated.png"
                        alt="Aghanya"
                        className="w-full h-full object-cover"
                      />
                    </div>
                  )}

                  {/* Node Icon */}
                  {isCompleted ? (
                    <CheckCircle2 className="w-9 h-9 text-white filter drop-shadow-sm mb-0.5" />
                  ) : isBoss ? (
                    <div className="relative">
                      <Crown className="w-10 h-10 text-amber-900 fill-amber-300 animate-wiggle filter drop-shadow-md" />
                    </div>
                  ) : isUnlocked ? (
                    <span className="text-4xl filter drop-shadow-sm">{level.icon}</span>
                  ) : (
                    <Lock className="w-7 h-7 text-slate-500" />
                  )}

                  <span className="text-xs font-bubble font-black tracking-wide leading-none mt-1">
                    {isBoss ? 'SUMMIT' : `LEVEL ${level.levelNumber}`}
                  </span>
                </motion.button>

                {/* Golden Stars Banner */}
                {isCompleted && (
                  <div className="flex gap-1 mt-2.5 bg-white/95 backdrop-blur-md px-3 py-1 rounded-full border-2 border-amber-300 shadow-playful-sm">
                    {[1, 2, 3].map((starIdx) => (
                      <Star
                        key={starIdx}
                        className={`w-4 h-4 ${
                          starIdx <= stars
                            ? 'text-amber-500 fill-amber-400 filter drop-shadow-xs'
                            : 'text-slate-200'
                        }`}
                      />
                    ))}
                  </div>
                )}

                {/* Level Title Plaque */}
                <div className="mt-2.5 text-center max-w-[190px] bg-white/95 backdrop-blur-md px-3.5 py-1.5 rounded-2xl border-2 border-amber-200/80 shadow-sm">
                  <div className="text-xs sm:text-sm font-bubble font-bold text-slate-800 truncate">
                    {level.title}
                  </div>
                  <div className="text-[10px] text-slate-500 font-body truncate">
                    {level.subtitle}
                  </div>
                </div>
              </div>
            );
          })}
        </div>
      </div>
    </div>
  );
};
