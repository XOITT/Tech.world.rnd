import { UserProgress, Reward, Achievement } from '../models/types';

const STORAGE_KEYS = {
  USER_PROGRESS: 'aghanya_user_progress',
  REWARDS: 'aghanya_rewards',
  ACHIEVEMENTS: 'aghanya_achievements',
  PARENT_PIN: 'aghanya_parent_pin',
  EXAM_HISTORY: 'aghanya_exam_history',
};

export const defaultRewards: Reward[] = [
  {
    id: 'reward-chocolate',
    title: 'Delicious Chocolate Treat 🍫',
    description: 'A special chocolate treat personally given by Dad Vijai!',
    icon: '🍫',
    giver: 'Dad - Vijai',
    giverAvatar: 'vijai',
    requirementType: 'xp',
    requiredCount: 200,
    status: 'locked',
    category: 'treat',
  },
  {
    id: 'reward-ice-cream',
    title: 'Yummy Ice Cream Scoop 🍦',
    description: 'Your favorite ice cream flavor reward from Mom Swetha!',
    icon: '🍦',
    giver: 'Mom - Swetha',
    giverAvatar: 'swetha',
    requirementType: 'xp',
    requiredCount: 500,
    status: 'locked',
    category: 'treat',
  },
  {
    id: 'reward-beach-day',
    title: 'Sunny Beach Outing 🏖️',
    description: 'A fun family trip to the beach with Dad and Mom!',
    icon: '🏖️',
    giver: 'Both Parents',
    giverAvatar: 'both',
    requirementType: 'levels_completed',
    requiredCount: 5,
    status: 'locked',
    category: 'outing',
  },
  {
    id: 'reward-story-book',
    title: 'Brand New Story Book 📚',
    description: 'A colorful adventure or bedtime story book chosen by Mom Swetha!',
    icon: '📚',
    giver: 'Mom - Swetha',
    giverAvatar: 'swetha',
    requirementType: 'xp',
    requiredCount: 1000,
    status: 'locked',
    category: 'gift',
  },
  {
    id: 'reward-pizza-night',
    title: 'Family Pizza Night 🍕',
    description: 'Warm, cheesy pizza party celebration with Dad and Mom!',
    icon: '🍕',
    giver: 'Both Parents',
    giverAvatar: 'both',
    requirementType: 'levels_completed',
    requiredCount: 8,
    status: 'locked',
    category: 'treat',
  },
  {
    id: 'reward-movie-night',
    title: 'Fun Movie Night with Popcorn 🎬',
    description: 'Pick your favorite animated movie to watch with Dad Vijai!',
    icon: '🎬',
    giver: 'Dad - Vijai',
    giverAvatar: 'vijai',
    requirementType: 'xp',
    requiredCount: 1800,
    status: 'locked',
    category: 'activity',
  },
];

export const defaultAchievements: Achievement[] = [
  {
    id: 'ach-first-step',
    title: 'First Step! 🌟',
    description: 'Completed your very first learning level',
    icon: '🐣',
    category: 'levels',
    isUnlocked: false,
    xpReward: 50,
  },
  {
    id: 'ach-curious-mind',
    title: 'Curious Mind 🧠',
    description: 'Answered 5 questions correctly on the first try',
    icon: '💡',
    category: 'mastery',
    isUnlocked: false,
    xpReward: 75,
  },
  {
    id: 'ach-streak-starter',
    title: 'Streak Starter 🔥',
    description: 'Maintained a 3-day learning streak',
    icon: '🔥',
    category: 'streak',
    isUnlocked: false,
    xpReward: 100,
  },
  {
    id: 'ach-math-mountain',
    title: 'Math Mountain Explorer 🏔️',
    description: 'Completed 5 levels in Math Mountain',
    icon: '🏔️',
    category: 'levels',
    isUnlocked: false,
    xpReward: 150,
  },
  {
    id: 'ach-boss-conqueror',
    title: 'Boss Conqueror 👑',
    description: 'Defeated the Math Mountain Boss Challenge',
    icon: '👑',
    category: 'mastery',
    isUnlocked: false,
    xpReward: 200,
  },
  {
    id: 'ach-reward-earner',
    title: 'First Family Reward 🎁',
    description: 'Unlocked your very first reward from Dad or Mom',
    icon: '🎁',
    category: 'special',
    isUnlocked: false,
    xpReward: 100,
  },
];

export const defaultUserProgress: UserProgress = {
  totalXp: 120, // Start with welcome XP so Aghanya immediately sees progress!
  currentStreak: 2,
  lastActiveDate: new Date().toISOString().split('T')[0],
  streakDates: [
    new Date(Date.now() - 86400000).toISOString().split('T')[0],
    new Date().toISOString().split('T')[0],
  ],
  levelProgress: {
    'math-lvl-1': {
      isUnlocked: true,
      isCompleted: false,
      starsEarned: 0,
      highScore: 0,
      attempts: 0,
    },
    'math-lvl-2': {
      isUnlocked: false,
      isCompleted: false,
      starsEarned: 0,
      highScore: 0,
      attempts: 0,
    },
    'math-lvl-3': {
      isUnlocked: false,
      isCompleted: false,
      starsEarned: 0,
      highScore: 0,
      attempts: 0,
    },
  },
  topicMasteries: {
    comparisons: {
      topicId: 'comparisons',
      topicName: 'Same & Different',
      attemptsCount: 3,
      correctCount: 3,
      accuracy: 100,
      lastPracticed: new Date().toISOString(),
      status: 'mastered',
    },
    sizes: {
      topicId: 'sizes',
      topicName: 'Big and Small',
      attemptsCount: 2,
      correctCount: 2,
      accuracy: 100,
      lastPracticed: new Date().toISOString(),
      status: 'practicing',
    },
    equal_sets: {
      topicId: 'equal_sets',
      topicName: 'Equal Sets & Matching',
      attemptsCount: 3,
      correctCount: 2,
      accuracy: 67,
      lastPracticed: new Date().toISOString(),
      status: 'needs_practice',
    },
  },
  totalLearningTimeMinutes: 45,
  dailyLearningTimeMinutes: 18,
  todayMission: {
    id: 'mission-today',
    date: new Date().toISOString().split('T')[0],
    title: 'Math Explorer Mission',
    description: 'Complete 2 learning activities & earn 50 XP',
    targetCount: 2,
    currentCount: 1,
    isCompleted: false,
    xpReward: 50,
  },
};

export const storageService = {
  getProgress(): UserProgress {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.USER_PROGRESS);
      return data ? JSON.parse(data) : defaultUserProgress;
    } catch {
      return defaultUserProgress;
    }
  },

  saveProgress(progress: UserProgress): void {
    try {
      localStorage.setItem(STORAGE_KEYS.USER_PROGRESS, JSON.stringify(progress));
    } catch (e) {
      console.error('Failed to save user progress', e);
    }
  },

  getRewards(): Reward[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.REWARDS);
      return data ? JSON.parse(data) : defaultRewards;
    } catch {
      return defaultRewards;
    }
  },

  saveRewards(rewards: Reward[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.REWARDS, JSON.stringify(rewards));
    } catch (e) {
      console.error('Failed to save rewards', e);
    }
  },

  getAchievements(): Achievement[] {
    try {
      const data = localStorage.getItem(STORAGE_KEYS.ACHIEVEMENTS);
      return data ? JSON.parse(data) : defaultAchievements;
    } catch {
      return defaultAchievements;
    }
  },

  saveAchievements(achievements: Achievement[]): void {
    try {
      localStorage.setItem(STORAGE_KEYS.ACHIEVEMENTS, JSON.stringify(achievements));
    } catch (e) {
      console.error('Failed to save achievements', e);
    }
  },

  getParentPin(): string {
    try {
      return localStorage.getItem(STORAGE_KEYS.PARENT_PIN) || '1234';
    } catch {
      return '1234';
    }
  },

  saveParentPin(pin: string): void {
    try {
      localStorage.setItem(STORAGE_KEYS.PARENT_PIN, pin);
    } catch (e) {
      console.error('Failed to save parent pin', e);
    }
  },
};
