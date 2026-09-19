import React, { useState } from 'react';
import { Question } from '../../models/types';
import { SameDifferentWidget } from './SameDifferentWidget';
import { OddOneOutWidget } from './OddOneOutWidget';
import { SizeCompareWidget } from './SizeCompareWidget';
import { EqualSetsWidget } from './EqualSetsWidget';
import { MultiplicationBoxesWidget } from './MultiplicationBoxesWidget';
import { MultipleChoiceWidget } from './MultipleChoiceWidget';
import { Character } from '../../components/character/Character';
import { Button } from '../../components/common/Button';
import { soundService } from '../../services/soundService';
import { Sparkles, HelpCircle, ArrowRight, RotateCcw } from 'lucide-react';

interface QuestionRendererProps {
  question: Question;
  onCorrectAnswer: (xpEarned: number) => void;
  onIncorrectAnswer?: () => void;
}

export const QuestionRenderer: React.FC<QuestionRendererProps> = ({
  question,
  onCorrectAnswer,
  onIncorrectAnswer,
}) => {
  const [answeredState, setAnsweredState] = useState<'unanswered' | 'correct' | 'incorrect'>('unanswered');

  const handleAnswerSubmit = (userAnswer: string) => {
    const isCorrect =
      typeof question.correctAnswer === 'string'
        ? userAnswer.trim().toLowerCase() === question.correctAnswer.trim().toLowerCase()
        : String(userAnswer) === String(question.correctAnswer);

    if (isCorrect) {
      soundService.playCorrect();
      setAnsweredState('correct');
    } else {
      soundService.playEncouragement();
      setAnsweredState('incorrect');
      if (onIncorrectAnswer) onIncorrectAnswer();
    }
  };

  const handleContinue = () => {
    onCorrectAnswer(question.xpReward);
    // Reset state for next question
    setAnsweredState('unanswered');
  };

  const handleTryAgain = () => {
    soundService.playClick();
    setAnsweredState('unanswered');
  };

  const renderWidget = () => {
    const isLocked = answeredState !== 'unanswered';
    switch (question.type) {
      case 'same_different':
        return <SameDifferentWidget question={question} onAnswer={handleAnswerSubmit} disabled={isLocked} />;
      case 'odd_one_out':
        return <OddOneOutWidget question={question} onAnswer={handleAnswerSubmit} disabled={isLocked} />;
      case 'size_compare':
      case 'weight_thickness':
      case 'quantity_compare':
        return <SizeCompareWidget question={question} onAnswer={handleAnswerSubmit} disabled={isLocked} />;
      case 'equal_sets':
        return <EqualSetsWidget question={question} onAnswer={handleAnswerSubmit} disabled={isLocked} />;
      case 'multiplication_boxes':
        return <MultiplicationBoxesWidget question={question} onAnswer={handleAnswerSubmit} disabled={isLocked} />;
      case 'multiple_choice':
      default:
        return <MultipleChoiceWidget question={question} onAnswer={handleAnswerSubmit} disabled={isLocked} />;
    }
  };

  // Determine character guide reaction
  const getCharacterReaction = () => {
    if (answeredState === 'correct') {
      return {
        type: 'vijai' as const,
        pose: 'celebrate' as const,
        speech: question.encouragement || '🎉 Amazing work, Aghanya! You nailed it!',
        animation: 'bounce' as const,
      };
    }
    if (answeredState === 'incorrect') {
      return {
        type: 'swetha' as const,
        pose: 'wave' as const,
        speech: '😊 Almost there! Let\'s look at why together.',
        animation: 'wiggle' as const,
      };
    }
    return {
      type: 'aghanya' as const,
      pose: 'default' as const,
      speech: question.conceptExplanation,
      animation: 'none' as const,
    };
  };

  const reaction = getCharacterReaction();

  return (
    <div className="flex flex-col items-center w-full max-w-xl mx-auto">
      {/* Character with speech bubble hint */}
      <div className="mb-4">
        <Character
          type={reaction.type}
          size="md"
          speech={reaction.speech}
          animation={reaction.animation}
        />
      </div>

      {/* Question Card */}
      <div className="w-full bg-white rounded-3xl border-3 border-amber-300 shadow-playful p-5 sm:p-6 mb-5">
        {/* Question Header */}
        <div className="flex items-center justify-between gap-2 mb-3 pb-2 border-b border-amber-100">
          <span className="text-xs sm:text-sm font-bubble font-bold text-amber-800 bg-amber-100 px-3 py-1 rounded-full border border-amber-300">
            {question.title}
          </span>
          <span className="text-xs sm:text-sm font-bubble font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 flex items-center gap-1">
            <Sparkles className="w-3.5 h-3.5 text-emerald-600" />
            +{question.xpReward} XP
          </span>
        </div>

        {/* Question Instruction */}
        <h3 className="text-lg sm:text-xl font-bubble font-bold text-slate-900 mb-5 leading-snug">
          {question.instruction}
        </h3>

        {/* Interactive Widget */}
        <div className="w-full mb-2">{renderWidget()}</div>

        {/* Incorrect / Feedback Helper Box */}
        {answeredState === 'incorrect' && (
          <div className="mt-5 p-4 bg-amber-50 rounded-2xl border-2 border-amber-300 animate-fade-in">
            <div className="flex items-center gap-2 text-amber-900 font-bubble font-bold text-sm mb-1">
              <HelpCircle className="w-4 h-4 text-amber-600" />
              <span>Why? Here is the secret:</span>
            </div>
            <p className="text-sm font-body text-slate-700 mb-3">{question.whyExplanation}</p>
            <Button
              variant="secondary"
              size="md"
              onClick={handleTryAgain}
              className="w-full"
            >
              <RotateCcw className="w-4 h-4" />
              <span>Try Again! 🌟</span>
            </Button>
          </div>
        )}

        {/* Correct Answer Success Box */}
        {answeredState === 'correct' && (
          <div className="mt-5 p-4 bg-emerald-50 rounded-2xl border-2 border-emerald-300 animate-fade-in text-center">
            <div className="text-base sm:text-lg font-bubble font-bold text-emerald-900 mb-1">
              ⭐ Wonderful understanding! (+{question.xpReward} XP)
            </div>
            <p className="text-xs sm:text-sm text-emerald-700 mb-3">
              {question.whyExplanation}
            </p>
            <Button
              variant="success"
              size="lg"
              onClick={handleContinue}
              className="w-full text-lg py-3.5"
            >
              <span>Continue Adventure</span>
              <ArrowRight className="w-5 h-5" />
            </Button>
          </div>
        )}
      </div>
    </div>
  );
};
