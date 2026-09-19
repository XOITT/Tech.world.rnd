import React from 'react';
import { HashRouter as Router, Routes, Route, useLocation } from 'react-router-dom';
import { TopHeader } from '../components/navigation/TopHeader';
import { BottomNavigation } from '../components/navigation/BottomNavigation';
import { HomeView } from '../features/home/HomeView';
import { AdventureMapView } from '../features/adventure/AdventureMapView';
import { LevelPlayerView } from '../features/learning/LevelPlayerView';
import { ExamView } from '../features/exam/ExamView';
import { RewardsView } from '../features/rewards/RewardsView';
import { AchievementsView } from '../features/achievements/AchievementsView';
import { ParentDashboardView } from '../features/parent/ParentDashboardView';
import { RewardUnlockedModal } from '../components/celebration/RewardUnlockedModal';
import { useAppDispatch, useAppSelector } from '../store';
import { clearNewlyUnlockedReward } from '../store/rewardsSlice';

const AppContent: React.FC = () => {
  const location = useLocation();
  const dispatch = useAppDispatch();
  const { newlyUnlockedReward } = useAppSelector((state) => state.rewards);

  // Hide bottom nav while inside active learning gameplay
  const isPlayingLevel = location.pathname.startsWith('/learn/');

  return (
    <div className="min-h-screen flex flex-col justify-between">
      {/* Top Header */}
      <TopHeader />

      {/* Main Content Area */}
      <main className="flex-1 w-full max-w-4xl mx-auto">
        <Routes>
          <Route path="/" element={<HomeView />} />
          <Route path="/adventure" element={<AdventureMapView />} />
          <Route path="/learn/:worldId/:levelId" element={<LevelPlayerView />} />
          <Route path="/exam" element={<ExamView />} />
          <Route path="/rewards" element={<RewardsView />} />
          <Route path="/achievements" element={<AchievementsView />} />
          <Route path="/parent" element={<ParentDashboardView />} />
        </Routes>
      </main>

      {/* Mobile Bottom Navigation */}
      {!isPlayingLevel && <BottomNavigation />}

      {/* Global Reward Unlocked Modal */}
      <RewardUnlockedModal
        reward={newlyUnlockedReward}
        onClose={() => dispatch(clearNewlyUnlockedReward())}
      />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <Router>
      <AppContent />
    </Router>
  );
};

export default App;
