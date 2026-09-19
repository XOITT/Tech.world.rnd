import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { storageService, defaultUserProgress } from '../services/storageService';
import { DailyMission } from '../models/types';

interface UserState {
  name: string;
  avatarUrl: string;
  totalXp: number;
  currentStreak: number;
  lastActiveDate: string;
  streakDates: string[];
  todayMission: DailyMission;
  totalLearningTimeMinutes: number;
  dailyLearningTimeMinutes: number;
}

const initialProgress = storageService.getProgress() || defaultUserProgress;

const initialState: UserState = {
  name: 'Aghanya',
  avatarUrl: '/assets/characters/aghanya_animated.png',
  totalXp: initialProgress.totalXp ?? 120,
  currentStreak: initialProgress.currentStreak ?? 2,
  lastActiveDate: initialProgress.lastActiveDate || new Date().toISOString().split('T')[0],
  streakDates: initialProgress.streakDates || [],
  todayMission: initialProgress.todayMission || defaultUserProgress.todayMission,
  totalLearningTimeMinutes: initialProgress.totalLearningTimeMinutes ?? 45,
  dailyLearningTimeMinutes: initialProgress.dailyLearningTimeMinutes ?? 18,
};

export const userSlice = createSlice({
  name: 'user',
  initialState,
  reducers: {
    addXp: (state, action: PayloadAction<number>) => {
      state.totalXp += action.payload;
      // Sync to storage
      const progress = storageService.getProgress();
      progress.totalXp = state.totalXp;
      storageService.saveProgress(progress);
    },
    updateMissionProgress: (state, action: PayloadAction<number>) => {
      state.todayMission.currentCount += action.payload;
      if (state.todayMission.currentCount >= state.todayMission.targetCount && !state.todayMission.isCompleted) {
        state.todayMission.isCompleted = true;
        state.totalXp += state.todayMission.xpReward;
      }
      const progress = storageService.getProgress();
      progress.todayMission = state.todayMission;
      progress.totalXp = state.totalXp;
      storageService.saveProgress(progress);
    },
    addLearningTime: (state, action: PayloadAction<number>) => {
      state.dailyLearningTimeMinutes += action.payload;
      state.totalLearningTimeMinutes += action.payload;
      const progress = storageService.getProgress();
      progress.dailyLearningTimeMinutes = state.dailyLearningTimeMinutes;
      progress.totalLearningTimeMinutes = state.totalLearningTimeMinutes;
      storageService.saveProgress(progress);
    },
    updateStreak: (state) => {
      const today = new Date().toISOString().split('T')[0];
      if (state.lastActiveDate !== today) {
        const yesterday = new Date(Date.now() - 86400000).toISOString().split('T')[0];
        if (state.lastActiveDate === yesterday) {
          state.currentStreak += 1;
        } else {
          // Keep it encouraging, soft reset to 1
          state.currentStreak = 1;
        }
        state.lastActiveDate = today;
        if (!state.streakDates.includes(today)) {
          state.streakDates.push(today);
        }
        const progress = storageService.getProgress();
        progress.currentStreak = state.currentStreak;
        progress.lastActiveDate = state.lastActiveDate;
        progress.streakDates = state.streakDates;
        storageService.saveProgress(progress);
      }
    },
  },
});

export const { addXp, updateMissionProgress, addLearningTime, updateStreak } = userSlice.actions;
export default userSlice.reducer;
