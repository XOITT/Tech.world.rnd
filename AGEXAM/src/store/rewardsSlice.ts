import { createSlice, PayloadAction } from '@reduxjs/toolkit';
import { Reward } from '../models/types';
import { storageService, defaultRewards } from '../services/storageService';

interface RewardsState {
  rewards: Reward[];
  newlyUnlockedReward: Reward | null;
}

const initialRewards = storageService.getRewards() || defaultRewards;

const initialState: RewardsState = {
  rewards: initialRewards,
  newlyUnlockedReward: null,
};

export const rewardsSlice = createSlice({
  name: 'rewards',
  initialState,
  reducers: {
    checkRewardsUnlock: (
      state,
      action: PayloadAction<{ totalXp: number; completedLevelsCount: number }>
    ) => {
      const { totalXp, completedLevelsCount } = action.payload;
      let justUnlocked: Reward | null = null;

      state.rewards = state.rewards.map(reward => {
        if (reward.status === 'locked') {
          let meetsRequirement = false;
          if (reward.requirementType === 'xp' && totalXp >= reward.requiredCount) {
            meetsRequirement = true;
          } else if (reward.requirementType === 'levels_completed' && completedLevelsCount >= reward.requiredCount) {
            meetsRequirement = true;
          }

          if (meetsRequirement) {
            const unlocked = {
              ...reward,
              status: 'unlocked' as const,
              unlockedAt: new Date().toISOString(),
            };
            if (!justUnlocked) justUnlocked = unlocked;
            return unlocked;
          }
        }
        return reward;
      });

      if (justUnlocked) {
        state.newlyUnlockedReward = justUnlocked;
      }
      storageService.saveRewards(state.rewards);
    },
    clearNewlyUnlockedReward: (state) => {
      state.newlyUnlockedReward = null;
    },
    approveReward: (state, action: PayloadAction<string>) => {
      const rewardId = action.payload;
      state.rewards = state.rewards.map(r => {
        if (r.id === rewardId) {
          return {
            ...r,
            status: 'claimed' as const,
            approvedAt: new Date().toISOString(),
            claimedAt: new Date().toISOString(),
          };
        }
        return r;
      });
      storageService.saveRewards(state.rewards);
    },
    addCustomReward: (state, action: PayloadAction<Omit<Reward, 'id' | 'status'>>) => {
      const newReward: Reward = {
        ...action.payload,
        id: `custom-reward-${Date.now()}`,
        status: 'locked',
      };
      state.rewards.push(newReward);
      storageService.saveRewards(state.rewards);
    },
    deleteReward: (state, action: PayloadAction<string>) => {
      state.rewards = state.rewards.filter(r => r.id !== action.payload);
      storageService.saveRewards(state.rewards);
    },
  },
});

export const { checkRewardsUnlock, clearNewlyUnlockedReward, approveReward, addCustomReward, deleteReward } = rewardsSlice.actions;
export default rewardsSlice.reducer;
