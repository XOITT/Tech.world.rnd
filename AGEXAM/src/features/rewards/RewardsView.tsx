import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppSelector } from '../../store';
import { Reward } from '../../models/types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Gift, Heart, ShieldCheck, Sparkles } from 'lucide-react';
import { soundService } from '../../services/soundService';

export const RewardsView: React.FC = () => {
  const navigate = useNavigate();
  const { rewards } = useAppSelector((state) => state.rewards);
  const { totalXp } = useAppSelector((state) => state.user);
  const { levelProgress } = useAppSelector((state) => state.learning);

  const [activeTab, setActiveTab] = useState<'all' | 'unlocked' | 'locked' | 'claimed'>('all');

  const completedLevelsCount = Object.values(levelProgress).filter((p) => p.isCompleted).length;

  const filteredRewards = rewards.filter((r) => {
    if (activeTab === 'unlocked') return r.status === 'unlocked';
    if (activeTab === 'locked') return r.status === 'locked';
    if (activeTab === 'claimed') return r.status === 'claimed';
    return true;
  });

  const getGiverAvatar = (avatar: Reward['giverAvatar']) => {
    if (avatar === 'swetha') return '/assets/characters/swetha_wave.png';
    if (avatar === 'both') return '/assets/characters/parents_pair.png';
    return '/assets/characters/vijai_wave.png';
  };

  return (
    <div className="flex flex-col gap-5 pb-28 max-w-xl mx-auto px-4 pt-3">
      {/* Header Banner */}
      <Card variant="rose" className="border-3 border-rose-300 p-5 text-center relative overflow-hidden">
        <div className="inline-flex items-center gap-1.5 bg-rose-200 text-rose-950 px-4 py-1 rounded-full text-xs font-bubble font-bold mb-2">
          <Gift className="w-4 h-4 text-rose-700" />
          <span>REAL FAMILY REWARDS</span>
        </div>
        <h1 className="text-2xl sm:text-3xl font-bubble font-bold text-rose-950">
          Aghanya's Reward Shelf 🎁
        </h1>
        <p className="text-xs sm:text-sm font-body text-rose-900 mt-1 max-w-sm mx-auto">
          Dad Vijai & Mom Swetha have prepared real-world prizes for every milestone you conquer!
        </p>

        {/* Quick summary numbers */}
        <div className="flex justify-center gap-4 mt-4 pt-3 border-t border-rose-200">
          <div className="bg-white/80 rounded-2xl px-4 py-1.5 shadow-sm">
            <span className="text-xs font-bubble text-slate-500">Unlocked: </span>
            <span className="font-bubble font-bold text-emerald-600">
              {rewards.filter((r) => r.status === 'unlocked').length}
            </span>
          </div>
          <div className="bg-white/80 rounded-2xl px-4 py-1.5 shadow-sm">
            <span className="text-xs font-bubble text-slate-500">Claimed: </span>
            <span className="font-bubble font-bold text-rose-600">
              {rewards.filter((r) => r.status === 'claimed').length}
            </span>
          </div>
        </div>
      </Card>

      {/* Tabs */}
      <div className="flex gap-2 overflow-x-auto pb-1 no-scrollbar">
        {[
          { id: 'all', label: 'All Rewards' },
          { id: 'unlocked', label: 'Ready to Claim 🎁' },
          { id: 'locked', label: 'In Progress ⏳' },
          { id: 'claimed', label: 'Claimed 🎉' },
        ].map((tab) => (
          <button
            key={tab.id}
            onClick={() => {
              soundService.playClick();
              setActiveTab(tab.id as 'all' | 'unlocked' | 'locked' | 'claimed');
            }}
            className={`px-3.5 py-2 rounded-2xl font-bubble text-xs sm:text-sm font-bold whitespace-nowrap transition-all select-none cursor-pointer border-2 ${
              activeTab === tab.id
                ? 'bg-rose-400 text-white border-rose-600 shadow-playful-sm'
                : 'bg-white text-slate-600 border-slate-200 hover:bg-rose-50'
            }`}
          >
            {tab.label}
          </button>
        ))}
      </div>

      {/* Empty State */}
      {filteredRewards.length === 0 && (
        <Card variant="white" className="p-8 text-center border-2 border-dashed border-slate-300">
          <div className="text-4xl mb-2">🎁</div>
          <h3 className="font-bubble font-bold text-slate-700 text-lg">
            No rewards in this shelf yet!
          </h3>
          <p className="text-sm font-body text-slate-500 mt-1">
            Complete learning levels to fill up your reward shelf!
          </p>
        </Card>
      )}

      {/* Rewards List */}
      <div className="flex flex-col gap-4">
        {filteredRewards.map((reward) => {
          const isUnlocked = reward.status === 'unlocked';
          const isClaimed = reward.status === 'claimed';
          const isXpReq = reward.requirementType === 'xp';
          const currentProgress = isXpReq ? totalXp : completedLevelsCount;
          const target = reward.requiredCount;

          return (
            <Card
              key={reward.id}
              variant={isClaimed ? 'green' : isUnlocked ? 'gold' : 'white'}
              className={`p-5 border-3 transition-all ${
                isUnlocked
                  ? 'border-amber-400 shadow-playful ring-4 ring-amber-100'
                  : isClaimed
                  ? 'border-emerald-400 opacity-90'
                  : 'border-slate-200'
              }`}
            >
              <div className="flex items-start gap-3.5">
                {/* Reward Giver & Icon Avatar */}
                <div className="relative flex-shrink-0">
                  <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-rose-300 bg-white p-1 shadow-sm">
                    <img
                      src={getGiverAvatar(reward.giverAvatar)}
                      alt={reward.giver}
                      className="w-full h-full object-contain"
                    />
                  </div>
                  <span className="absolute -bottom-2 -right-2 text-2xl filter drop-shadow">
                    {reward.icon}
                  </span>
                </div>

                {/* Reward Info */}
                <div className="flex-1">
                  <div className="flex items-center justify-between gap-1 mb-1">
                    <h3 className="font-bubble font-bold text-slate-900 text-base sm:text-lg">
                      {reward.title}
                    </h3>
                    {isClaimed ? (
                      <Badge variant="green" size="sm">
                        Enjoyed! ❤️
                      </Badge>
                    ) : isUnlocked ? (
                      <Badge variant="gold" size="sm" className="animate-pulse">
                        Unlocked! 🎉
                      </Badge>
                    ) : (
                      <Badge variant="slate" size="sm">
                        Locked 🔒
                      </Badge>
                    )}
                  </div>

                  <p className="text-xs sm:text-sm font-body text-slate-600 mb-2">
                    {reward.description}
                  </p>

                  <div className="flex items-center gap-1.5 text-xs font-bubble font-semibold text-rose-800 mb-3">
                    <Heart className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>From: {reward.giver}</span>
                  </div>

                  {/* Progress towards unlock */}
                  {!isClaimed && !isUnlocked && (
                    <div>
                      <div className="flex justify-between text-xs font-bubble font-bold text-slate-600 mb-1">
                        <span>
                          {currentProgress} / {target} {isXpReq ? 'XP' : 'Levels'}
                        </span>
                        <span>{Math.round((currentProgress / target) * 100)}%</span>
                      </div>
                      <ProgressBar
                        value={currentProgress}
                        max={target}
                        color="gold"
                        height="sm"
                      />
                    </div>
                  )}

                  {/* Unlocked Message & Parent Approval Button */}
                  {isUnlocked && (
                    <div className="mt-3 p-3 bg-amber-50 rounded-2xl border border-amber-300">
                      <div className="flex items-center gap-1.5 text-xs font-bubble font-bold text-amber-900 mb-2">
                        <Sparkles className="w-4 h-4 text-amber-600" />
                        <span>Unlocked! Dad or Mom can approve this in Parent Mode.</span>
                      </div>
                      <Button
                        variant="secondary"
                        size="sm"
                        onClick={() => navigate('/parent')}
                        className="w-full text-xs"
                      >
                        <ShieldCheck className="w-4 h-4" />
                        <span>Go to Parent Approval 🔐</span>
                      </Button>
                    </div>
                  )}

                  {isClaimed && (
                    <div className="text-xs font-bubble font-semibold text-emerald-800 bg-emerald-50 px-3 py-1.5 rounded-xl border border-emerald-200 mt-2">
                      ✓ Confirmed with love! Enjoy your real-world treat!
                    </div>
                  )}
                </div>
              </div>
            </Card>
          );
        })}
      </div>
    </div>
  );
};
