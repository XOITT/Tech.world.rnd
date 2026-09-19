import React, { useState } from 'react';
import { useParams, useNavigate } from 'react-router-dom';
import { useAppDispatch, useAppSelector } from '../../store';
import { addXp, updateMissionProgress, addLearningTime } from '../../store/userSlice';
import { completeLevel, recordTopicAttempt } from '../../store/learningSlice';
import { checkRewardsUnlock } from '../../store/rewardsSlice';
import { worldsData } from '../../data/curriculumData';
import { Level } from '../../models/types';
import { QuestionRenderer } from '../questions/QuestionRenderer';
import { LevelCompleteModal } from '../../components/celebration/LevelCompleteModal';
import { Character } from '../../components/character/Character';
import { Button } from '../../components/common/Button';
import { Card } from '../../components/common/Card';
import { ProgressBar } from '../../components/common/ProgressBar';
import { ArrowLeft, BookOpen, Sparkles, Play } from 'lucide-react';
import { soundService } from '../../services/soundService';

export const LevelPlayerView: React.FC = () => {
  const { worldId, levelId } = useParams<{ worldId: string; levelId: string }>();
  const navigate = useNavigate();
  const dispatch = useAppDispatch();
  const { totalXp } = useAppSelector((state) => state.user);
  const { levelProgress } = useAppSelector((state) => state.learning);

  const world = worldsData.find((w) => w.id === worldId) || worldsData[0];
  const level: Level =
    world.levels.find((l) => l.id === levelId) || world.levels[0];

  const currentLevelIndex = world.levels.findIndex((l) => l.id === level.id);
  const nextLevel = world.levels[currentLevelIndex + 1];

  const [phase, setPhase] = useState<'intro' | 'questions' | 'complete'>('intro');
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState<number>(0);
  const [mistakesCount, setMistakesCount] = useState<number>(0);
  const [earnedXpTotal, setEarnedXpTotal] = useState<number>(0);

  const questions = level.questions || [];
  const currentQuestion = questions[currentQuestionIndex];

  const handleStartPractice = () => {
    soundService.playClick();
    setPhase('questions');
  };

  const handleQuestionCorrect = (xpEarned: number) => {
    dispatch(addXp(xpEarned));
    dispatch(
      recordTopicAttempt({
        topicId: level.id,
        topicName: level.title,
        isCorrect: true,
      })
    );
    setEarnedXpTotal((prev) => prev + xpEarned);

    if (currentQuestionIndex + 1 < questions.length) {
      setCurrentQuestionIndex((prev) => prev + 1);
    } else {
      // Level complete!
      handleFinishLevel();
    }
  };

  const handleQuestionIncorrect = () => {
    setMistakesCount((prev) => prev + 1);
    dispatch(
      recordTopicAttempt({
        topicId: level.id,
        topicName: level.title,
        isCorrect: false,
      })
    );
  };

  const handleFinishLevel = () => {
    let stars = 3;
    if (mistakesCount === 1) stars = 2;
    else if (mistakesCount > 1) stars = 1;

    const completionBonus = level.xpCompletionReward || 50;
    dispatch(addXp(completionBonus));
    dispatch(updateMissionProgress(1));
    dispatch(addLearningTime(5));

    const totalLevelXp = earnedXpTotal + completionBonus;

    dispatch(
      completeLevel({
        levelId: level.id,
        nextLevelId: nextLevel ? nextLevel.id : undefined,
        starsEarned: stars,
        score: totalLevelXp,
      })
    );

    // Calculate completed levels
    const completedCount =
      Object.values(levelProgress).filter((p) => p.isCompleted).length + 1;

    // Check reward unlocks
    dispatch(
      checkRewardsUnlock({
        totalXp: totalXp + totalLevelXp,
        completedLevelsCount: completedCount,
      })
    );

    setPhase('complete');
  };

  const handleNextLevel = () => {
    if (nextLevel) {
      navigate(`/learn/${world.id}/${nextLevel.id}`);
      setPhase('intro');
      setCurrentQuestionIndex(0);
      setMistakesCount(0);
      setEarnedXpTotal(0);
    } else {
      navigate('/adventure');
    }
  };

  const handleReplay = () => {
    setPhase('intro');
    setCurrentQuestionIndex(0);
    setMistakesCount(0);
    setEarnedXpTotal(0);
  };

  return (
    <div className="flex flex-col gap-4 pb-24 max-w-xl mx-auto px-4 pt-2">
      {/* Top Level Bar */}
      <div className="flex items-center justify-between">
        <button
          onClick={() => navigate('/adventure')}
          className="p-2 rounded-2xl bg-white border border-slate-200 hover:bg-slate-100 transition-colors flex items-center gap-1 font-bubble text-xs text-slate-700 cursor-pointer shadow-sm"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Map</span>
        </button>

        <div className="text-center">
          <div className="text-xs font-bubble font-semibold text-slate-500">
            {world.name} • Level {level.levelNumber}
          </div>
          <div className="text-sm font-bubble font-bold text-slate-900">
            {level.title}
          </div>
        </div>

        <div className="text-2xl">{level.icon}</div>
      </div>

      {/* PHASE 1: INTRODUCTION & STORY */}
      {phase === 'intro' && (
        <div className="flex flex-col gap-5 items-center mt-2 animate-fade-in">
          {/* Guide Character */}
          <Character
            type="swetha"
            size="lg"
            animation="bounce"
            speech="Hi Aghanya! Let's understand today's adventure before we play!"
          />

          <Card variant="gold" className="w-full border-3 border-amber-300 p-6">
            <div className="flex items-center gap-2 text-amber-900 font-bubble font-bold text-lg mb-1">
              <BookOpen className="w-5 h-5 text-amber-700" />
              <span>Story Time with Mom & Dad</span>
            </div>

            {level.bookReference && (
              <div className="inline-flex items-center gap-1.5 text-xs font-bubble font-semibold text-amber-800 bg-amber-100/90 px-3 py-1 rounded-full border border-amber-300 mb-3">
                <span>📖 Curriculum:</span>
                <span>{level.bookReference}</span>
              </div>
            )}

            <p className="text-base font-body text-slate-800 leading-relaxed mb-4">
              {level.learningStory}
            </p>

            <div className="bg-amber-100/90 rounded-2xl p-4 border border-amber-300 mb-5">
              <div className="text-xs font-bubble font-bold text-amber-900 uppercase tracking-wider mb-1 flex items-center gap-1">
                <Sparkles className="w-3.5 h-3.5 text-amber-600" /> The Secret Rule
              </div>
              <p className="text-sm font-body text-amber-950 font-medium">
                {level.conceptSummary}
              </p>
            </div>

            <Button
              variant="primary"
              size="lg"
              onClick={handleStartPractice}
              className="w-full text-lg py-4 shadow-playful"
            >
              <span>I Understand! Let's Play</span>
              <Play className="w-5 h-5 fill-amber-950" />
            </Button>
          </Card>
        </div>
      )}

      {/* PHASE 2: QUESTIONS ENGINE */}
      {phase === 'questions' && currentQuestion && (
        <div className="flex flex-col gap-4 mt-1 animate-fade-in">
          {/* Progress Header */}
          <div className="w-full">
            <div className="flex justify-between text-xs font-bubble font-bold text-slate-600 mb-1">
              <span>
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <span>
                {Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%
              </span>
            </div>
            <ProgressBar
              value={currentQuestionIndex + 1}
              max={questions.length}
              color="gold"
              height="sm"
            />
          </div>

          {/* Current Question */}
          <QuestionRenderer
            key={currentQuestion.id}
            question={currentQuestion}
            onCorrectAnswer={handleQuestionCorrect}
            onIncorrectAnswer={handleQuestionIncorrect}
          />
        </div>
      )}

      {/* PHASE 3: LEVEL COMPLETE MODAL */}
      <LevelCompleteModal
        isOpen={phase === 'complete'}
        levelTitle={level.title}
        starsEarned={mistakesCount === 0 ? 3 : mistakesCount === 1 ? 2 : 1}
        xpEarned={earnedXpTotal + (level.xpCompletionReward || 50)}
        onNextLevel={handleNextLevel}
        onReplay={handleReplay}
        onClose={() => navigate('/adventure')}
      />
    </div>
  );
};
