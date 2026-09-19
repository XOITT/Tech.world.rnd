import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { storageService, defaultUserProgress } from '../services/storageService';
import { TopicMastery } from '../models/types';

interface LearningState {
  levelProgress: Record<string, {
    isUnlocked: boolean;
    isCompleted: boolean;
    starsEarned: number;
    highScore: number;
    attempts: number;
  }>;
  topicMasteries: Record<string, TopicMastery>;
  activeWorldId: string;
}

const initialProgress = storageService.getProgress() || defaultUserProgress;

const initialState: LearningState = {
  levelProgress: initialProgress.levelProgress || {
    'math-lvl-1': {
      isUnlocked: true,
      isCompleted: false,
      starsEarned: 0,
      highScore: 0,
      attempts: 0,
    }
  },
  topicMasteries: initialProgress.topicMasteries || {},
  activeWorldId: 'world-math-mountain',
};

export const learningSlice = createSlice({
  name: 'learning',
  initialState,
  reducers: {
    completeLevel: (
      state,
      action: PayloadAction<{ levelId: string; nextLevelId?: string; starsEarned: number; score: number }>
    ) => {
      const { levelId, nextLevelId, starsEarned, score } = action.payload;
      const current = state.levelProgress[levelId] || {
        isUnlocked: true,
        isCompleted: false,
        starsEarned: 0,
        highScore: 0,
        attempts: 0,
      };

      state.levelProgress[levelId] = {
        isUnlocked: true,
        isCompleted: true,
        starsEarned: Math.max(current.starsEarned, starsEarned),
        highScore: Math.max(current.highScore, score),
        attempts: current.attempts + 1,
      };

      if (nextLevelId) {
        if (!state.levelProgress[nextLevelId]) {
          state.levelProgress[nextLevelId] = {
            isUnlocked: true,
            isCompleted: false,
            starsEarned: 0,
            highScore: 0,
            attempts: 0,
          };
        } else {
          state.levelProgress[nextLevelId].isUnlocked = true;
        }
      }

      // Sync to local storage
      const progress = storageService.getProgress();
      progress.levelProgress = state.levelProgress;
      storageService.saveProgress(progress);
    },
    recordTopicAttempt: (
      state,
      action: PayloadAction<{ topicId: string; topicName: string; isCorrect: boolean }>
    ) => {
      const { topicId, topicName, isCorrect } = action.payload;
      const current = state.topicMasteries[topicId] || {
        topicId,
        topicName,
        attemptsCount: 0,
        correctCount: 0,
        accuracy: 100,
        lastPracticed: new Date().toISOString(),
        status: 'practicing',
      };

      const attempts = current.attemptsCount + 1;
      const corrects = current.correctCount + (isCorrect ? 1 : 0);
      const accuracy = Math.round((corrects / attempts) * 100);

      let status: 'mastered' | 'practicing' | 'needs_practice' = 'practicing';
      if (attempts >= 3 && accuracy >= 80) status = 'mastered';
      else if (attempts >= 2 && accuracy < 65) status = 'needs_practice';

      state.topicMasteries[topicId] = {
        topicId,
        topicName,
        attemptsCount: attempts,
        correctCount: corrects,
        accuracy,
        lastPracticed: new Date().toISOString(),
        status,
      };

      const progress = storageService.getProgress();
      progress.topicMasteries = state.topicMasteries;
      storageService.saveProgress(progress);
    },
    resetAllProgress: (state) => {
      state.levelProgress = {
        'math-lvl-1': {
          isUnlocked: true,
          isCompleted: false,
          starsEarned: 0,
          highScore: 0,
          attempts: 0,
        }
      };
      state.topicMasteries = {};
      const progress = storageService.getProgress();
      progress.levelProgress = state.levelProgress;
      progress.topicMasteries = {};
      progress.totalXp = 0;
      storageService.saveProgress(progress);
    }
  },
});

export const { completeLevel, recordTopicAttempt, resetAllProgress } = learningSlice.actions;
export default learningSlice.reducer;
