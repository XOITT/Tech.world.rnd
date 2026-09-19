import React from 'react';
import { useAppSelector } from '../../store';
import { Card } from '../../components/common/Card';
import { Badge } from '../../components/common/Badge';
import { Trophy, Award, Lock, Sparkles } from 'lucide-react';
import { soundService } from '../../services/soundService';

export const AchievementsView: React.FC = () => {
  const { levelProgress } = useAppSelector((state) => state.learning);
  const { totalXp, currentStreak } = useAppSelector((state) => state.user);
  const { rewards } = useAppSelector((state) => state.rewards);

  const completedLevels = Object.values(levelProgress).filter((p) => p.isCompleted).length;
  const claimedRewards = rewards.filter((r) => r.status === 'claimed').length;

  const achievementsList = [
    {
      id: 'ach-1',
      title: 'First Adventure! 🌟',
      description: 'Complete your first learning level on Math Mountain',
      icon: '🐣',
      unlocked: completedLevels >= 1,
      xpBonus: 50,
    },
    {
      id: 'ach-2',
      title: 'Streak Spark 🔥',
      description: 'Keep a 2-day daily learning streak',
      icon: '🔥',
      unlocked: currentStreak >= 2,
      xpBonus: 75,
    },
    {
      id: 'ach-3',
      title: 'Math Explorer 🏔️',
      description: 'Complete 3 levels in Math Mountain',
      icon: '🏔️',
      unlocked: completedLevels >= 3,
      xpBonus: 100,
    },
    {
      id: 'ach-4',
      title: 'XP High Flyer ⚡',
      description: 'Accumulate over 200 total learning XP',
      icon: '⚡',
      unlocked: totalXp >= 200,
      xpBonus: 100,
    },
    {
      id: 'ach-5',
      title: 'Summit Boss Conqueror 👑',
      description: 'Conquer the Math Mountain Boss Challenge',
      icon: '👑',
      unlocked: levelProgress['math-lvl-9']?.isCompleted || false,
      xpBonus: 200,
    },
    {
      id: 'ach-6',
      title: 'Family Treat Winner 🎁',
      description: 'Claim your first real-world reward from Dad or Mom',
      icon: '🎁',
      unlocked: claimedRewards >= 1,
      xpBonus: 100,
    },
  ];

  const unlockedCount = achievementsList.filter((a) => a.unlocked).length;

  const handleBadgeClick = (unlocked: boolean) => {
    if (unlocked) {
      soundService.playStar(1);
    } else {
      soundService.playClick();
    }
  };

  return (
    <div className="flex flex-col gap-5 pb-28 max-w-xl mx-auto px-4 pt-3">
      {/* Header Banner */}
      <Card variant="purple" className="border-3 border-purple-300 p-6 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 bg-purple-200 text-purple-950 px-4 py-1 rounded-full text-xs font-bubble font-bold mb-2">
          <Trophy className="w-4 h-4 text-purple-700" />
          <span>TROPHY CABINET</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bubble font-bold text-purple-950">
          Aghanya's Trophies 🏆
        </h1>
        <p className="text-xs sm:text-sm font-body text-purple-900 mt-1 max-w-sm mx-auto">
          Every shiny medal represents your growing curiosity, patience, and brilliance!
        </p>

        <div className="inline-block bg-white/90 rounded-2xl px-5 py-2 mt-4 shadow-sm border border-purple-200">
          <span className="font-bubble text-slate-600 text-sm">Collected: </span>
          <span className="font-bubble font-bold text-purple-950 text-base sm:text-lg">
            {unlockedCount} / {achievementsList.length} Trophies
          </span>
        </div>
      </Card>

      {/* Badges Grid */}
      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        {achievementsList.map((ach) => (
          <div
            key={ach.id}
            onClick={() => handleBadgeClick(ach.unlocked)}
            className={`p-4 rounded-3xl border-3 transition-all cursor-pointer select-none flex items-center gap-3.5 ${
              ach.unlocked
                ? 'bg-gradient-to-br from-amber-50 to-yellow-100/90 border-amber-400 shadow-playful hover:scale-102 ring-2 ring-yellow-200'
                : 'bg-white/80 border-slate-200 opacity-70 hover:opacity-90 shadow-sm'
            }`}
          >
            {/* Badge Icon */}
            <div
              className={`w-16 h-16 rounded-2xl flex items-center justify-center text-3xl border-2 flex-shrink-0 ${
                ach.unlocked
                  ? 'bg-amber-300/80 border-amber-500 shadow-sm'
                  : 'bg-slate-100 border-slate-300 text-slate-400'
              }`}
            >
              {ach.unlocked ? ach.icon : <Lock className="w-6 h-6 text-slate-400" />}
            </div>

            {/* Content */}
            <div className="flex-1">
              <div className="flex items-center justify-between gap-1 mb-0.5">
                <h3 className="font-bubble font-bold text-slate-900 text-sm sm:text-base leading-tight">
                  {ach.title}
                </h3>
              </div>
              <p className="text-xs font-body text-slate-600 leading-snug mb-1.5">
                {ach.description}
              </p>
              <div className="flex items-center gap-1.5">
                {ach.unlocked ? (
                  <Badge variant="green" size="sm">
                    <Sparkles className="w-3 h-3" /> Unlocked!
                  </Badge>
                ) : (
                  <Badge variant="slate" size="sm">
                    <Award className="w-3 h-3" /> +{ach.xpBonus} XP
                  </Badge>
                )}
              </div>
            </div>
          </div>
        ))}
      </div>
    </div>
  );
};
