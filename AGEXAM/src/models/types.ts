export type Difficulty = 'easy' | 'medium' | 'hard';

export type QuestionType =
  | 'same_different'       // Visual match: Are they the same or different?
  | 'two_of_a_kind'        // Match pairs (e.g. matching shoes, socks)
  | 'odd_one_out'          // Find the one that doesn't belong
  | 'size_compare'         // Big vs Small, Tall vs Short, Long vs Short
  | 'weight_thickness'     // Heavy vs Light, Thick vs Thin
  | 'quantity_compare'     // More vs Less, Few vs Many
  | 'equal_sets'           // 1-to-1 matching (frogs to rocks, pets to children)
  | 'grouping_sorting'     // Grouping objects (fruits vs vegetables, colors)
  | 'related_pairs'        // "We are related!" (bat & ball, pencil & paper, cat & fish)
  | 'multiplication_boxes' // Visual grouping (spaceships & fuel boxes)
  | 'multiple_choice';

export interface VisualItem {
  id: string;
  label: string;
  emoji?: string;
  icon?: string;
  image?: string;
  color?: string;
  attribute?: string; // e.g. 'fruit', 'vegetable', 'red', 'blue', 'heavy', 'light', 'tall', 'short', 'big', 'small'
  visualScale?: 'giant' | 'big' | 'medium' | 'small' | 'tiny' | 'tall' | 'short' | 'long';
  heightPx?: number;
  widthPx?: number;
}

export interface Question {
  id: string;
  levelId: string;
  type: QuestionType;
  title: string;
  instruction: string;
  conceptExplanation: string; // Understanding-first explanation
  visualDemo?: {
    type: string;
    description: string;
    items: VisualItem[];
  };
  items?: VisualItem[];
  options?: string[];
  correctAnswer: string | string[] | boolean;
  whyExplanation: string;     // Friendly explanation if child needs help
  encouragement: string;      // Positive reinforcement text
  xpReward: number;
  difficulty: Difficulty;
  bookReference?: string;
}

export interface Level {
  id: string;
  worldId: string;
  levelNumber: number;
  title: string;
  subtitle: string;
  description: string;
  icon: string;
  isBossLevel?: boolean;
  difficulty: Difficulty;
  conceptSummary: string;     // Intro explanation in very simple language
  learningStory: string;      // Friendly short story or context
  questions: Question[];
  xpPerQuestion: number;
  xpCompletionReward: number;
  starsRequiredToUnlock?: number;
  bookReference?: string; // e.g. "Math Coursebook Part 1 (p. 1-4) & Workbook Part 1"
}

export interface World {
  id: string;
  name: string;
  subtitle: string;
  themeColor: string;
  gradient: string;
  icon: string;
  backgroundImage?: string;
  description: string;
  levels: Level[];
}

export interface Reward {
  id: string;
  title: string;
  description: string;
  icon: string;
  giver: 'Dad - Vijai' | 'Mom - Swetha' | 'Both Parents';
  giverAvatar: 'vijai' | 'swetha' | 'both';
  requirementType: 'xp' | 'levels_completed' | 'stars' | 'world_completed';
  requiredCount: number;
  status: 'locked' | 'unlocked' | 'claimed';
  unlockedAt?: string;
  approvedAt?: string;
  claimedAt?: string;
  category: 'treat' | 'activity' | 'outing' | 'gift';
}

export interface Achievement {
  id: string;
  title: string;
  description: string;
  icon: string;
  category: 'levels' | 'streak' | 'xp' | 'mastery' | 'special';
  isUnlocked: boolean;
  unlockedAt?: string;
  xpReward: number;
}

export interface TopicMastery {
  topicId: string;
  topicName: string;
  attemptsCount: number;
  correctCount: number;
  accuracy: number;
  lastPracticed: string;
  status: 'mastered' | 'practicing' | 'needs_practice';
}

export interface DailyMission {
  id: string;
  date: string;
  title: string;
  description: string;
  targetCount: number;
  currentCount: number;
  isCompleted: boolean;
  xpReward: number;
}

export interface UserProgress {
  totalXp: number;
  currentStreak: number;
  lastActiveDate: string;
  streakDates: string[];
  levelProgress: Record<string, {
    isUnlocked: boolean;
    isCompleted: boolean;
    starsEarned: number; // 0, 1, 2, 3
    highScore: number;
    attempts: number;
  }>;
  topicMasteries: Record<string, TopicMastery>;
  totalLearningTimeMinutes: number;
  dailyLearningTimeMinutes: number;
  todayMission: DailyMission;
}

export interface ExamQuestionResult {
  questionId: string;
  topic: string;
  userAnswer: string | boolean;
  correctAnswer: string | boolean;
  isCorrect: boolean;
  timeSpentSeconds: number;
}

export interface ExamResult {
  id: string;
  date: string;
  totalQuestions: number;
  correctCount: number;
  scorePercentage: number;
  timeTakenSeconds: number;
  resultsByTopic: Record<string, { total: number; correct: number }>;
  understoodWell: string[];
  practiceNext: string[];
  xpEarned: number;
}
