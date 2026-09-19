import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { updateMissionProgress, addXp } from '../../store/userSlice';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Badge } from '../../components/common/Badge';
import { Character, CharacterType } from '../../components/character/Character';
import { Compass, Gift, Target, ClipboardCheck, ArrowRight, Sparkles, Image as ImageIcon } from 'lucide-react';
import { worldsData } from '../../data/curriculumData';
import { soundService } from '../../services/soundService';

export const HomeView: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { totalXp, currentStreak, name, todayMission } = useAppSelector((state) => state.user);
  const { levelProgress } = useAppSelector((state) => state.learning);
  const { rewards } = useAppSelector((state) => state.rewards);

  // Avatar switcher: 'aghanya' (animated) or 'aghanya_real' (real photo)
  const [avatarMode, setAvatarMode] = useState<CharacterType>('aghanya');

  const quotes = [
    "Ready for today's learning adventure, Collector Aghanya?",
    "Every star you earn makes Mom and Dad proud!",
    "Big dreams for a brighter India! 🇮🇳",
    "Learning gives us wings to fly high!",
  ];
  const [quoteIndex, setQuoteIndex] = useState(0);

  // Next reward
  const nextReward = rewards.find((r) => r.status === 'locked' || r.status === 'unlocked') || rewards[0];
  const rewardXpReq = nextReward?.requiredCount || 500;
  const rewardProgress = Math.min(totalXp, rewardXpReq);

  // Math Mountain current level
  const mathWorld = worldsData[0];
  const currentLevel =
    mathWorld.levels.find((lvl) => !levelProgress[lvl.id]?.isCompleted && levelProgress[lvl.id]?.isUnlocked) ||
    mathWorld.levels[0];

  const handleStartMission = () => {
    navigate(`/learn/${mathWorld.id}/${currentLevel.id}`);
  };

  const handleCharacterTap = () => {
    soundService.playStar(1);
    setQuoteIndex((prev) => (prev + 1) % quotes.length);
    dispatch(addXp(5));
    dispatch(updateMissionProgress(1));
  };

  const toggleAvatarMode = () => {
    soundService.playClick();
    setAvatarMode((prev) => (prev === 'aghanya' ? 'aghanya_real' : 'aghanya'));
  };

  const totalStars = Object.values(levelProgress).reduce((acc, p) => acc + (p.starsEarned || 0), 0);

  return (
    <div className="flex flex-col gap-6 pb-32 max-w-xl mx-auto px-4 pt-3">
      {/* Hero Welcome Card with 3D Pedestal */}
      <div className="relative rounded-3xl bg-gradient-to-b from-amber-200 via-amber-100 to-white p-6 border-4 border-amber-300 shadow-playful-lg overflow-hidden">
        {/* Decorative background sun rays & sparkles */}
        <div className="absolute top-0 right-0 w-44 h-44 bg-yellow-300/30 rounded-full filter blur-2xl pointer-events-none" />

        <div className="flex flex-col sm:flex-row items-center justify-between gap-5 relative z-10">
          <div className="flex-1 text-center sm:text-left">
            <div className="inline-flex items-center gap-1.5 bg-white/90 backdrop-blur-sm text-amber-900 px-3.5 py-1 rounded-full text-xs font-bubble font-bold mb-2.5 border border-amber-300 shadow-xs">
              <Sparkles className="w-3.5 h-3.5 text-amber-600" />
              <span>Aghanya's Quest Dashboard</span>
            </div>

            <h1 className="text-2xl sm:text-3xl font-bubble font-extrabold text-amber-950 leading-tight">
              Hello, {name}! 🌟
            </h1>

            <p className="text-xs sm:text-sm font-body text-amber-900/90 mt-1 max-w-xs mx-auto sm:mx-0 leading-relaxed">
              Explore your coursebook adventures, earn shiny stars, and unlock treats from Dad Vijai & Mom Swetha!
            </p>

            {/* Avatar Switcher Button */}
            <button
              onClick={toggleAvatarMode}
              className="mt-3 inline-flex items-center gap-1.5 px-3.5 py-1 bg-white/95 hover:bg-white rounded-full border-2 border-amber-300 text-[11px] font-bubble font-bold text-amber-950 shadow-xs transition-transform active:scale-95 cursor-pointer"
            >
              <ImageIcon className="w-3.5 h-3.5 text-amber-600" />
              <span>Avatar: {avatarMode === 'aghanya' ? '🇮🇳 Future IAS Officer' : '📸 Real Photo'}</span>
            </button>
          </div>

          {/* Interactive Hero Character on Podium */}
          <div className="flex-shrink-0 flex flex-col items-center">
            <Character
              type={avatarMode}
              size="lg"
              speech={quotes[quoteIndex]}
              onClick={handleCharacterTap}
            />
            <span className="text-[10px] font-bubble font-semibold text-amber-800/80 mt-1">
              Tap Aghanya for bonus XP! ⭐
            </span>
          </div>
        </div>

        {/* Activity Badges Bar */}
        <div className="grid grid-cols-3 gap-2.5 mt-5 pt-4 border-t border-amber-200/80 text-center">
          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2.5 border border-amber-200 shadow-xs">
            <div className="text-[10px] font-bubble font-semibold text-slate-500 uppercase">Streak</div>
            <div className="text-base sm:text-lg font-bubble font-bold text-orange-600 flex items-center justify-center gap-1">
              <span>🔥 {currentStreak}</span>
              <span className="text-xs font-normal">Days</span>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2.5 border border-amber-200 shadow-xs">
            <div className="text-[10px] font-bubble font-semibold text-slate-500 uppercase">Mastery Stars</div>
            <div className="text-base sm:text-lg font-bubble font-bold text-amber-600 flex items-center justify-center gap-1">
              <span>⭐ {totalStars}</span>
              <span className="text-xs font-normal">Stars</span>
            </div>
          </div>

          <div className="bg-white/90 backdrop-blur-sm rounded-2xl p-2.5 border border-amber-200 shadow-xs">
            <div className="text-[10px] font-bubble font-semibold text-slate-500 uppercase">Realm</div>
            <div className="text-base sm:text-lg font-bubble font-bold text-sky-600 truncate">
              🏔️ Mountain
            </div>
          </div>
        </div>
      </div>

      {/* Today's Mission 3D Card */}
      <Card variant="purple" className="border-3 border-purple-300 p-5 shadow-playful relative overflow-hidden">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-purple-200 rounded-2xl flex items-center justify-center text-purple-900 border border-purple-300 shadow-xs">
              <Target className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bubble font-bold text-purple-950">
                Today's Mission 🎯
              </h2>
              <p className="text-xs font-body text-purple-800">{todayMission.title}</p>
            </div>
          </div>
          <Badge variant="purple" size="sm">
            +{todayMission.xpReward} XP
          </Badge>
        </div>

        <p className="text-xs sm:text-sm font-body text-purple-900 mb-3 leading-relaxed">
          {todayMission.description}
        </p>

        <div className="mb-4">
          <div className="flex justify-between text-xs font-bubble font-bold text-purple-900 mb-1">
            <span>Progress</span>
            <span>
              {todayMission.currentCount} / {todayMission.targetCount}
            </span>
          </div>
          <ProgressBar
            value={todayMission.currentCount}
            max={todayMission.targetCount}
            color="purple"
            height="md"
          />
        </div>

        <Button
          variant="accent"
          size="md"
          onClick={handleStartMission}
          className="w-full text-base py-3"
        >
          <span>Start Mission Quest</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </Card>

      {/* Continue Adventure Card */}
      <Card variant="sky" className="border-3 border-sky-300 p-5 shadow-playful">
        <div className="flex items-center justify-between mb-3">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-sky-200 rounded-2xl flex items-center justify-center text-sky-900 border border-sky-300 shadow-xs">
              <Compass className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bubble font-bold text-sky-950">
                Continue Adventure 🗺️
              </h2>
              <p className="text-xs font-body text-sky-800">
                {mathWorld.name} • Quest Level {currentLevel.levelNumber}
              </p>
            </div>
          </div>
          <span className="text-3xl filter drop-shadow-sm">{currentLevel.icon}</span>
        </div>

        <div className="bg-white/95 rounded-2xl p-3.5 mb-4 border border-sky-200 shadow-xs">
          <div className="font-bubble font-bold text-slate-800 text-sm sm:text-base">
            {currentLevel.title}
          </div>
          <div className="text-xs text-slate-600 font-body mt-0.5">{currentLevel.subtitle}</div>
          {currentLevel.bookReference && (
            <div className="mt-2 text-[10px] font-bubble font-semibold text-sky-800 bg-sky-50 px-2.5 py-0.5 rounded-full inline-block border border-sky-200">
              📖 Ref: {currentLevel.bookReference}
            </div>
          )}
        </div>

        <div className="flex gap-2.5">
          <Button
            variant="ghost"
            size="md"
            onClick={() => navigate('/adventure')}
            className="flex-1"
          >
            <span>View Map</span>
          </Button>
          <Button
            variant="secondary"
            size="md"
            onClick={handleStartMission}
            className="flex-1 text-base"
          >
            <span>Play Quest</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </Card>

      {/* Next Family Reward Card */}
      {nextReward && (
        <Card variant="rose" className="border-3 border-rose-300 p-5 shadow-playful">
          <div className="flex items-center justify-between mb-2">
            <div className="flex items-center gap-2.5">
              <div className="w-10 h-10 bg-rose-200 rounded-2xl flex items-center justify-center text-rose-900 border border-rose-300 shadow-xs">
                <Gift className="w-5 h-5" />
              </div>
              <div>
                <h2 className="text-lg sm:text-xl font-bubble font-bold text-rose-950">
                  Next Family Reward 🎁
                </h2>
                <p className="text-xs font-body text-rose-800">Given with love by {nextReward.giver}</p>
              </div>
            </div>
            <span className="text-4xl animate-bounce-gentle filter drop-shadow-sm">
              {nextReward.icon}
            </span>
          </div>

          <div className="font-bubble font-bold text-rose-950 text-base mb-1">
            {nextReward.title}
          </div>

          <div className="mb-4">
            <div className="flex justify-between text-xs font-bubble font-bold text-rose-900 mb-1">
              <span>{rewardProgress} XP</span>
              <span>{rewardXpReq} XP Target</span>
            </div>
            <ProgressBar value={rewardProgress} max={rewardXpReq} color="rose" height="md" />
          </div>

          <Button
            variant="danger"
            size="md"
            onClick={() => navigate('/rewards')}
            className="w-full text-sm py-3"
          >
            <span>Open Reward Wallet</span>
          </Button>
        </Card>
      )}

      {/* Exam Practice Mode Banner */}
      <Card variant="green" className="border-3 border-emerald-300 p-4 shadow-playful">
        <div className="flex items-center justify-between gap-3">
          <div className="flex items-center gap-3">
            <div className="p-3 bg-emerald-200 rounded-2xl text-emerald-950 border border-emerald-300 shadow-xs">
              <ClipboardCheck className="w-6 h-6" />
            </div>
            <div>
              <h3 className="font-bubble font-bold text-emerald-950 text-base">
                Exam Practice Mode 📝
              </h3>
              <p className="text-xs font-body text-emerald-800">
                10-minute friendly exam simulation with topic recommendations!
              </p>
            </div>
          </div>
          <Button
            variant="success"
            size="sm"
            onClick={() => navigate('/exam')}
            className="flex-shrink-0"
          >
            <span>Take Test</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};
