import React, { useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { approveReward, addCustomReward } from '../../store/rewardsSlice';
import { resetAllProgress } from '../../store/learningSlice';
import { updatePin } from '../../store/parentSlice';
import { ParentPinModal } from './ParentPinModal';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import {
  ShieldCheck,
  CheckCircle2,
  AlertCircle,
  PlusCircle,
  Clock,
  Zap,
  Flame,
  Star,
  LogOut,
  RefreshCw,
  KeyRound,
  BookOpen,
} from 'lucide-react';
import { soundService } from '../../services/soundService';

export const ParentDashboardView: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  const [isAuthenticated, setIsAuthenticated] = useState<boolean>(false);
  const [showPinModal, setShowPinModal] = useState<boolean>(true);

  // Redux state
  const { totalXp, currentStreak, totalLearningTimeMinutes, dailyLearningTimeMinutes } = useAppSelector(
    (state) => state.user
  );
  const { topicMasteries, levelProgress } = useAppSelector((state) => state.learning);
  const { rewards } = useAppSelector((state) => state.rewards);

  // Custom reward form state
  const [customTitle, setCustomTitle] = useState('');
  const [customDescription, setCustomDescription] = useState('');
  const [customXp, setCustomXp] = useState(300);
  const [customGiver, setCustomGiver] = useState<'Dad - Vijai' | 'Mom - Swetha'>('Dad - Vijai');

  // Change PIN state
  const [newPin, setNewPin] = useState('');
  const [pinChangeSuccess, setPinChangeSuccess] = useState(false);

  const unlockedPendingRewards = rewards.filter((r) => r.status === 'unlocked');
  const totalStars = Object.values(levelProgress).reduce(
    (acc, p) => acc + (p.starsEarned || 0),
    0
  );

  const handleApproveReward = (rewardId: string) => {
    soundService.playLevelComplete();
    dispatch(approveReward(rewardId));
    alert('🎉 Reward successfully approved! Aghanya can now enjoy her real-world prize!');
  };

  const handleAddReward = (e: React.FormEvent) => {
    e.preventDefault();
    if (!customTitle.trim()) return;

    soundService.playClick();
    dispatch(
      addCustomReward({
        title: customTitle.trim(),
        description: customDescription.trim() || 'A special family treat!',
        icon: '🎁',
        giver: customGiver,
        giverAvatar: customGiver === 'Dad - Vijai' ? 'vijai' : 'swetha',
        requirementType: 'xp',
        requiredCount: Number(customXp),
        category: 'activity',
      })
    );

    setCustomTitle('');
    setCustomDescription('');
    alert(`Added custom reward: "${customTitle}"!`);
  };

  const handleChangePin = (e: React.FormEvent) => {
    e.preventDefault();
    if (newPin.length === 4 && /^\d+$/.test(newPin)) {
      dispatch(updatePin(newPin));
      setPinChangeSuccess(true);
      setNewPin('');
      setTimeout(() => setPinChangeSuccess(false), 3000);
    } else {
      alert('PIN must be exactly 4 digits.');
    }
  };

  const handleReset = () => {
    if (window.confirm('Are you sure you want to reset all progress for a fresh learning session?')) {
      dispatch(resetAllProgress());
      alert('Progress has been reset.');
    }
  };

  if (!isAuthenticated) {
    return (
      <ParentPinModal
        isOpen={showPinModal}
        onSuccess={() => {
          setIsAuthenticated(true);
          setShowPinModal(false);
        }}
        onClose={() => navigate('/')}
      />
    );
  }

  // Calculate overall accuracy
  const masteryValues = Object.values(topicMasteries);
  const averageAccuracy =
    masteryValues.length > 0
      ? Math.round(masteryValues.reduce((acc, t) => acc + t.accuracy, 0) / masteryValues.length)
      : 100;

  return (
    <div className="flex flex-col gap-6 pb-32 max-w-2xl mx-auto px-4 pt-3 animate-fade-in">
      {/* Executive Parent Header */}
      <div className="rounded-3xl p-6 bg-gradient-to-r from-purple-900 via-indigo-900 to-purple-950 text-white shadow-playful-lg border-4 border-purple-400 relative overflow-hidden">
        <div className="flex items-center justify-between gap-4 relative z-10">
          <div className="flex items-center gap-4">
            <div className="w-16 h-16 sm:w-20 sm:h-20 rounded-2xl overflow-hidden border-2 border-purple-300 bg-white p-1 shadow-md">
              <img
                src="/assets/characters/parents_portrait.png"
                alt="Vijai & Swetha"
                className="w-full h-full object-cover"
              />
            </div>
            <div>
              <div className="inline-flex items-center gap-1.5 bg-purple-800/80 px-3 py-0.5 rounded-full text-xs font-bubble font-semibold text-purple-200 uppercase tracking-wider mb-1">
                <ShieldCheck className="w-3.5 h-3.5 text-emerald-400" />
                <span>Parental Command Center</span>
              </div>
              <h1 className="text-xl sm:text-2xl font-bubble font-bold text-white">
                Vijai & Swetha's Portal
              </h1>
              <p className="text-xs text-purple-200">
                Personalized Learning & Real-World Rewards for Aghanya Shree • {averageAccuracy}% Overall Accuracy
              </p>
            </div>
          </div>

          <Button
            variant="ghost"
            size="sm"
            onClick={() => navigate('/')}
            className="text-xs bg-white/15 text-white border-white/30 hover:bg-white/25"
          >
            <LogOut className="w-4 h-4" />
            <span>Exit</span>
          </Button>
        </div>
      </div>

      {/* Activity Analytics Grid */}
      <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
        <div className="p-4 bg-white rounded-3xl border-2 border-amber-300 shadow-playful-sm text-center">
          <div className="flex justify-center text-amber-500 mb-1">
            <Zap className="w-5 h-5 fill-amber-400" />
          </div>
          <div className="text-[11px] font-bubble font-semibold text-slate-500 uppercase">Total XP</div>
          <div className="text-xl sm:text-2xl font-bubble font-extrabold text-amber-950">
            {totalXp.toLocaleString()}
          </div>
        </div>

        <div className="p-4 bg-white rounded-3xl border-2 border-orange-300 shadow-playful-sm text-center">
          <div className="flex justify-center text-orange-500 mb-1">
            <Flame className="w-5 h-5 fill-orange-400" />
          </div>
          <div className="text-[11px] font-bubble font-semibold text-slate-500 uppercase">Streak</div>
          <div className="text-xl sm:text-2xl font-bubble font-extrabold text-orange-950">
            {currentStreak} Days
          </div>
        </div>

        <div className="p-4 bg-white rounded-3xl border-2 border-purple-300 shadow-playful-sm text-center">
          <div className="flex justify-center text-purple-500 mb-1">
            <Star className="w-5 h-5 fill-purple-400" />
          </div>
          <div className="text-[11px] font-bubble font-semibold text-slate-500 uppercase">Stars Earned</div>
          <div className="text-xl sm:text-2xl font-bubble font-extrabold text-purple-950">
            {totalStars} ⭐
          </div>
        </div>

        <div className="p-4 bg-white rounded-3xl border-2 border-sky-300 shadow-playful-sm text-center">
          <div className="flex justify-center text-sky-500 mb-1">
            <Clock className="w-5 h-5" />
          </div>
          <div className="text-[11px] font-bubble font-semibold text-slate-500 uppercase">Learning Time</div>
          <div className="text-lg sm:text-xl font-bubble font-extrabold text-sky-950">
            {dailyLearningTimeMinutes}m <span className="text-xs text-sky-600 font-normal">({totalLearningTimeMinutes}m total)</span>
          </div>
        </div>
      </div>

      {/* REWARD APPROVAL CENTER */}
      <Card variant="white" className="p-6 border-3 border-rose-300 shadow-playful">
        <div className="flex items-center justify-between mb-4 pb-2 border-b border-rose-100">
          <div className="flex items-center gap-2.5">
            <div className="w-10 h-10 bg-rose-100 rounded-2xl flex items-center justify-center text-rose-700 border border-rose-300">
              <ShieldCheck className="w-5 h-5" />
            </div>
            <div>
              <h2 className="text-lg sm:text-xl font-bubble font-bold text-slate-900">
                Reward Approval Center
              </h2>
              <p className="text-xs text-slate-500">Real-world family treats unlocked by Aghanya</p>
            </div>
          </div>
          <Badge variant="rose" size="sm">
            {unlockedPendingRewards.length} Pending Approval
          </Badge>
        </div>

        {unlockedPendingRewards.length === 0 ? (
          <div className="p-5 bg-slate-50 rounded-2xl text-center text-sm font-body text-slate-500 border border-slate-200">
            No rewards are currently awaiting approval. When Aghanya earns enough XP, you will be able to confirm them with a single click right here!
          </div>
        ) : (
          <div className="flex flex-col gap-3">
            {unlockedPendingRewards.map((reward) => (
              <div
                key={reward.id}
                className="p-4 bg-rose-50/80 rounded-2xl border-2 border-rose-300 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 shadow-xs"
              >
                <div>
                  <div className="flex items-center gap-2.5">
                    <span className="text-3xl">{reward.icon}</span>
                    <div>
                      <h3 className="font-bubble font-bold text-rose-950 text-base">
                        {reward.title}
                      </h3>
                      <p className="text-xs text-slate-600">{reward.description}</p>
                    </div>
                  </div>
                  <div className="text-xs font-bubble font-semibold text-rose-800 mt-1">
                    Giver: <span className="underline">{reward.giver}</span>
                  </div>
                </div>

                <Button
                  variant="success"
                  size="md"
                  onClick={() => handleApproveReward(reward.id)}
                  className="w-full sm:w-auto text-sm py-2.5"
                >
                  <CheckCircle2 className="w-4 h-4" />
                  <span>Approve Reward 🎉</span>
                </Button>
              </div>
            ))}
          </div>
        )}
      </Card>

      {/* SYLLABUS & COURSEBOOK REFERENCE AUDIT */}
      <Card variant="white" className="p-6 border-3 border-amber-300 shadow-playful">
        <div className="flex items-center gap-2.5 mb-3">
          <div className="w-10 h-10 bg-amber-100 rounded-2xl flex items-center justify-center text-amber-700 border border-amber-300">
            <BookOpen className="w-5 h-5" />
          </div>
          <div>
            <h2 className="text-lg sm:text-xl font-bubble font-bold text-slate-900">
              Coursebook & Workbook Mapping
            </h2>
            <p className="text-xs text-slate-500">
              Direct mapping to Aghanya's 7 school coursebooks & workbooks in D:\Aghanya Exam\Source
            </p>
          </div>
        </div>

        <div className="space-y-2.5 text-xs font-body">
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
            <span className="font-bubble font-bold text-amber-950">Level 1 — Same & Different: </span>
            <span className="text-slate-700">Math Coursebook Part 1 (p. 1-2) & Workbook Part 1 (p. 1)</span>
          </div>
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
            <span className="font-bubble font-bold text-amber-950">Level 2 — Odd One Out: </span>
            <span className="text-slate-700">Math Coursebook Part 1 (p. 3: I Am Different!) & Workbook Part 2 (p. 2)</span>
          </div>
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
            <span className="font-bubble font-bold text-amber-950">Level 3 — Big/Small & Tall/Short: </span>
            <span className="text-slate-700">Math Coursebook Part 1 (p. 4), Part 2 (p. 2, 4) & Workbook Part 1 (p. 2)</span>
          </div>
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
            <span className="font-bubble font-bold text-amber-950">Level 4 — Heavy/Light & Thick/Thin: </span>
            <span className="text-slate-700">Math Coursebook Part 2 (p. 1, 3) & Workbook Part 3 (p. 4)</span>
          </div>
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
            <span className="font-bubble font-bold text-amber-950">Level 5 — More/Less & Few/Many: </span>
            <span className="text-slate-700">Math Coursebook Part 3 (p. 1, 2) & Workbook Part 2 (p. 4)</span>
          </div>
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
            <span className="font-bubble font-bold text-amber-950">Level 6 — Equal Sets & 1-to-1 Match: </span>
            <span className="text-slate-700">Math Coursebook Part 4 (p. 1, 3) & Workbook Part 3 (p. 1, 3)</span>
          </div>
          <div className="p-3 bg-amber-50 rounded-2xl border border-amber-200">
            <span className="font-bubble font-bold text-amber-950">Level 7 — Grouping & Sorting: </span>
            <span className="text-slate-700">Math Coursebook Part 3 (p. 3, 4) & Workbook Part 1 (p. 3, 4)</span>
          </div>
        </div>
      </Card>

      {/* TOPIC MASTERY INSIGHTS */}
      <Card variant="white" className="p-6 border-3 border-sky-300 shadow-playful">
        <h2 className="text-lg sm:text-xl font-bubble font-bold text-slate-900 mb-3 flex items-center gap-2">
          <span>🧠</span>
          <span>Aghanya's Mastery Analytics</span>
        </h2>

        <div className="space-y-3">
          {Object.values(topicMasteries).map((topic) => (
            <div
              key={topic.topicId}
              className="p-3.5 bg-slate-50 rounded-2xl border border-slate-200 flex items-center justify-between gap-3"
            >
              <div>
                <div className="font-bubble font-bold text-slate-800 text-sm">
                  {topic.topicName}
                </div>
                <div className="text-xs font-body text-slate-500">
                  {topic.correctCount} correct / {topic.attemptsCount} attempts ({topic.accuracy}%)
                </div>
              </div>

              <div>
                {topic.status === 'mastered' ? (
                  <Badge variant="green" size="sm">
                    Mastered ⭐
                  </Badge>
                ) : topic.status === 'needs_practice' ? (
                  <Badge variant="rose" size="sm">
                    Needs Practice 💡
                  </Badge>
                ) : (
                  <Badge variant="blue" size="sm">
                    Practicing ⏳
                  </Badge>
                )}
              </div>
            </div>
          ))}
        </div>

        <div className="mt-4 p-3.5 bg-sky-50 rounded-2xl border border-sky-300 text-xs font-body text-sky-950 flex items-start gap-2">
          <AlertCircle className="w-4 h-4 text-sky-700 flex-shrink-0 mt-0.5" />
          <span>
            <strong>Parent Tip:</strong> Learning through understanding creates lifelong intuition. When Aghanya asks questions, praise her curiosity!
          </span>
        </div>
      </Card>

      {/* CONFIGURE NEW REWARD */}
      <Card variant="white" className="p-6 border-3 border-purple-300 shadow-playful">
        <h2 className="text-lg sm:text-xl font-bubble font-bold text-slate-900 mb-3 flex items-center gap-2">
          <PlusCircle className="w-5 h-5 text-purple-600" />
          <span>Add Custom Family Reward</span>
        </h2>

        <form onSubmit={handleAddReward} className="flex flex-col gap-3.5">
          <div>
            <label className="block text-xs font-bubble font-bold text-slate-700 mb-1">
              Reward Name
            </label>
            <input
              type="text"
              value={customTitle}
              onChange={(e) => setCustomTitle(e.target.value)}
              placeholder="e.g. Weekend Zoo Trip 🦁 or Ice Skating ⛸️"
              className="w-full px-4 py-2.5 rounded-2xl border-2 border-slate-200 font-body text-sm focus:border-purple-500 focus:outline-none"
              required
            />
          </div>

          <div className="grid grid-cols-2 gap-3">
            <div>
              <label className="block text-xs font-bubble font-bold text-slate-700 mb-1">
                Giver
              </label>
              <select
                value={customGiver}
                onChange={(e) => setCustomGiver(e.target.value as 'Dad - Vijai' | 'Mom - Swetha')}
                className="w-full px-3 py-2.5 rounded-2xl border-2 border-slate-200 font-body text-sm focus:border-purple-500 focus:outline-none"
              >
                <option value="Dad - Vijai">Dad - Vijai</option>
                <option value="Mom - Swetha">Mom - Swetha</option>
              </select>
            </div>

            <div>
              <label className="block text-xs font-bubble font-bold text-slate-700 mb-1">
                XP Target
              </label>
              <input
                type="number"
                value={customXp}
                onChange={(e) => setCustomXp(Number(e.target.value))}
                min={50}
                step={50}
                className="w-full px-3 py-2.5 rounded-2xl border-2 border-slate-200 font-body text-sm focus:border-purple-500 focus:outline-none"
                required
              />
            </div>
          </div>

          <Button variant="accent" size="md" type="submit" className="w-full mt-2">
            <span>Add Reward to Aghanya's Quest</span>
          </Button>
        </form>
      </Card>

      {/* PARENT SECURITY & MAINTENANCE */}
      <Card variant="white" className="p-6 border-3 border-slate-300 shadow-playful">
        <h2 className="text-lg font-bubble font-bold text-slate-900 mb-3 flex items-center gap-2">
          <KeyRound className="w-5 h-5 text-slate-700" />
          <span>Parent Security & Maintenance</span>
        </h2>

        <form onSubmit={handleChangePin} className="flex gap-2.5 mb-4">
          <input
            type="password"
            maxLength={4}
            value={newPin}
            onChange={(e) => setNewPin(e.target.value)}
            placeholder="New 4-digit PIN"
            className="w-44 px-3 py-2.5 rounded-xl border border-slate-300 text-sm font-body focus:outline-none"
          />
          <Button variant="ghost" size="sm" type="submit">
            Update PIN
          </Button>
        </form>
        {pinChangeSuccess && (
          <p className="text-xs font-bubble text-emerald-600 mb-3">
            PIN updated successfully!
          </p>
        )}

        <div className="pt-3 border-t border-slate-200 flex items-center justify-between">
          <div>
            <div className="text-xs font-bubble font-bold text-slate-700">
              Reset Progress
            </div>
            <div className="text-[11px] text-slate-400">
              Clear learning progress to restart from Level 1
            </div>
          </div>
          <Button variant="danger" size="sm" onClick={handleReset} className="text-xs">
            <RefreshCw className="w-3.5 h-3.5" />
            <span>Reset</span>
          </Button>
        </div>
      </Card>
    </div>
  );
};
