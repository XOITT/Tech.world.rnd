import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAppDispatch } from '../../store';
import { addXp } from '../../store/userSlice';
import { worldsData } from '../../data/curriculumData';
import { Question } from '../../models/types';
import { Card } from '../../components/common/Card';
import { Button } from '../../components/common/Button';
import { Badge } from '../../components/common/Badge';
import { ProgressBar } from '../../components/common/ProgressBar';
import { Character } from '../../components/character/Character';
import { Timer, Bookmark, CheckCircle2, RotateCcw, ArrowRight, ArrowLeft } from 'lucide-react';
import { soundService } from '../../services/soundService';

export const ExamView: React.FC = () => {
  const navigate = useNavigate();
  const dispatch = useAppDispatch();

  // Curate 8 exam questions from the curriculum
  const [examQuestions] = useState<Question[]>(() => {
    const allQs: Question[] = [];
    worldsData.forEach((w) => {
      w.levels.forEach((lvl) => {
        if (lvl.questions.length > 0) {
          allQs.push(lvl.questions[0]);
        }
      });
    });
    return allQs.slice(0, 8);
  });

  const [currentIndex, setCurrentIndex] = useState<number>(0);
  const [answers, setAnswers] = useState<Record<number, string>>({});
  const [markedForReview, setMarkedForReview] = useState<Record<number, boolean>>({});
  const [timeRemainingSeconds, setTimeRemainingSeconds] = useState<number>(600); // 10 minutes
  const [isSubmitted, setIsSubmitted] = useState<boolean>(false);

  // Timer countdown
  useEffect(() => {
    if (isSubmitted) return;
    const interval = setInterval(() => {
      setTimeRemainingSeconds((prev) => {
        if (prev <= 1) {
          clearInterval(interval);
          handleSubmitExam();
          return 0;
        }
        return prev - 1;
      });
    }, 1000);
    return () => clearInterval(interval);
  }, [isSubmitted]);

  const currentQ = examQuestions[currentIndex];

  const handleSelectOption = (opt: string) => {
    soundService.playClick();
    setAnswers((prev) => ({ ...prev, [currentIndex]: opt }));
  };

  const handleToggleReview = () => {
    soundService.playClick();
    setMarkedForReview((prev) => ({
      ...prev,
      [currentIndex]: !prev[currentIndex],
    }));
  };

  const handleSubmitExam = () => {
    soundService.playLevelComplete();
    setIsSubmitted(true);
    dispatch(addXp(100)); // Exam completion bonus XP
  };

  const formatTime = (seconds: number) => {
    const m = Math.floor(seconds / 60);
    const s = seconds % 60;
    return `${m}:${s < 10 ? '0' : ''}${s}`;
  };

  // Calculate results
  const calculateResults = () => {
    let correctCount = 0;
    const understoodWell: string[] = [];
    const practiceNext: string[] = [];

    examQuestions.forEach((q, idx) => {
      const userAns = answers[idx];
      const isCorrect =
        userAns &&
        (typeof q.correctAnswer === 'string'
          ? userAns.trim().toLowerCase() === q.correctAnswer.trim().toLowerCase()
          : String(userAns) === String(q.correctAnswer));

      if (isCorrect) {
        correctCount++;
        understoodWell.push(q.title);
      } else {
        practiceNext.push(q.title);
      }
    });

    const scorePercentage = Math.round((correctCount / examQuestions.length) * 100);
    return { correctCount, total: examQuestions.length, scorePercentage, understoodWell, practiceNext };
  };

  if (isSubmitted) {
    const res = calculateResults();
    return (
      <div className="flex flex-col gap-5 pb-28 max-w-xl mx-auto px-4 pt-3 animate-scale-up">
        {/* Exam Result Header */}
        <Card variant="gold" className="p-6 text-center border-4 border-amber-400">
          <Character type="parents_duo" size="lg" animation="bounce" />
          <h1 className="text-2xl sm:text-3xl font-bubble font-bold text-amber-950 mt-3 mb-1">
            Exam Complete! 🎉
          </h1>
          <p className="text-sm font-body text-slate-600 mb-4">
            Aghanya’s practice score is ready! Here is your performance breakdown:
          </p>

          <div className="inline-flex items-center gap-2 bg-amber-200 text-amber-950 px-6 py-2.5 rounded-3xl font-bubble font-bold text-xl sm:text-2xl mb-4 border border-amber-400 shadow-sm">
            <span>Score: {res.correctCount} / {res.total}</span>
            <span>({res.scorePercentage}%)</span>
          </div>

          <div className="text-xs font-bubble font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full border border-emerald-300 inline-block mb-3">
            +100 Bonus Exam XP Earned! ⚡
          </div>
        </Card>

        {/* What You Understood Well */}
        <Card variant="green" className="p-5 border-3 border-emerald-300">
          <h2 className="text-base sm:text-lg font-bubble font-bold text-emerald-950 mb-2 flex items-center gap-2">
            <CheckCircle2 className="w-5 h-5 text-emerald-600" />
            <span>What You Understood Well 🌟</span>
          </h2>
          {res.understoodWell.length > 0 ? (
            <ul className="space-y-1.5 pl-2">
              {res.understoodWell.map((topic, i) => (
                <li key={i} className="text-sm font-body text-emerald-900 flex items-center gap-2">
                  <span className="text-emerald-600">✓</span> {topic}
                </li>
              ))}
            </ul>
          ) : (
            <p className="text-sm font-body text-emerald-800">Keep practicing, you will master it!</p>
          )}
        </Card>

        {/* What To Practice Next */}
        {res.practiceNext.length > 0 && (
          <Card variant="purple" className="p-5 border-3 border-purple-300">
            <h2 className="text-base sm:text-lg font-bubble font-bold text-purple-950 mb-2 flex items-center gap-2">
              <span>💡</span>
              <span>Topics for a Little More Practice:</span>
            </h2>
            <ul className="space-y-1.5 pl-2">
              {res.practiceNext.map((topic, i) => (
                <li key={i} className="text-sm font-body text-purple-900 flex items-center gap-2">
                  <span className="text-purple-600">•</span> {topic}
                </li>
              ))}
            </ul>
            <p className="text-xs font-body text-purple-800 mt-3">
              "Mistakes are just stepping stones to understanding!" — Dad Vijai & Mom Swetha
            </p>
          </Card>
        )}

        <div className="flex gap-3">
          <Button
            variant="ghost"
            size="md"
            onClick={() => {
              setIsSubmitted(false);
              setAnswers({});
              setMarkedForReview({});
              setTimeRemainingSeconds(600);
              setCurrentIndex(0);
            }}
            className="flex-1"
          >
            <RotateCcw className="w-4 h-4" />
            <span>Retake Exam</span>
          </Button>
          <Button
            variant="primary"
            size="lg"
            onClick={() => navigate('/')}
            className="flex-1 text-base"
          >
            <span>Back Home</span>
            <ArrowRight className="w-4 h-4" />
          </Button>
        </div>
      </div>
    );
  }

  return (
    <div className="flex flex-col gap-4 pb-28 max-w-xl mx-auto px-4 pt-2">
      {/* Exam Header */}
      <div className="flex items-center justify-between bg-white p-3.5 rounded-3xl border-2 border-emerald-300 shadow-sm">
        <div className="flex items-center gap-2">
          <div className="p-2 bg-emerald-100 text-emerald-800 rounded-2xl">
            <Timer className="w-5 h-5 animate-pulse" />
          </div>
          <div>
            <div className="text-[11px] font-bubble font-semibold text-slate-500">Exam Timer</div>
            <div className="text-base font-bubble font-bold text-emerald-950">
              {formatTime(timeRemainingSeconds)}
            </div>
          </div>
        </div>

        <Badge variant="green" size="md">
          Exam Practice Mode
        </Badge>

        <Button variant="danger" size="sm" onClick={handleSubmitExam} className="text-xs">
          <span>Submit</span>
        </Button>
      </div>

      {/* Question Number Pills Navigation */}
      <div className="flex gap-1.5 overflow-x-auto pb-1 no-scrollbar">
        {examQuestions.map((_, idx) => {
          const isCurrent = idx === currentIndex;
          const isAnswered = answers[idx] !== undefined;
          const isReview = markedForReview[idx];

          let btnStyle = 'bg-white border-slate-300 text-slate-600';
          if (isReview) btnStyle = 'bg-purple-100 border-purple-500 text-purple-900';
          else if (isAnswered) btnStyle = 'bg-emerald-100 border-emerald-500 text-emerald-900 font-bold';
          if (isCurrent) btnStyle += ' ring-3 ring-amber-400 scale-105';

          return (
            <button
              key={idx}
              onClick={() => {
                soundService.playClick();
                setCurrentIndex(idx);
              }}
              className={`w-9 h-9 rounded-xl border-2 flex items-center justify-center font-bubble text-xs transition-all flex-shrink-0 cursor-pointer ${btnStyle}`}
            >
              {idx + 1}
            </button>
          );
        })}
      </div>

      {/* Progress Bar */}
      <ProgressBar
        value={Object.keys(answers).length}
        max={examQuestions.length}
        color="green"
        height="sm"
      />

      {/* Current Question Card */}
      {currentQ && (
        <Card variant="white" className="p-5 border-3 border-emerald-200">
          <div className="flex items-center justify-between mb-3 pb-2 border-b border-slate-100">
            <span className="text-xs font-bubble font-bold text-emerald-800 bg-emerald-100 px-3 py-1 rounded-full">
              Question {currentIndex + 1} of {examQuestions.length}
            </span>
            <button
              onClick={handleToggleReview}
              className={`flex items-center gap-1 text-xs font-bubble font-semibold px-2.5 py-1 rounded-full border transition-colors cursor-pointer ${
                markedForReview[currentIndex]
                  ? 'bg-purple-100 text-purple-800 border-purple-300'
                  : 'bg-slate-100 text-slate-600 border-slate-200 hover:bg-purple-50'
              }`}
            >
              <Bookmark className="w-3.5 h-3.5" />
              <span>{markedForReview[currentIndex] ? 'Marked' : 'Review'}</span>
            </button>
          </div>

          <h3 className="text-base sm:text-lg font-bubble font-bold text-slate-900 mb-4">
            {currentQ.instruction}
          </h3>

          {/* Options */}
          <div className="flex flex-col gap-3">
            {(currentQ.options || ['Yes', 'No']).map((opt) => {
              const isSelected = answers[currentIndex] === opt;
              return (
                <button
                  key={opt}
                  onClick={() => handleSelectOption(opt)}
                  className={`w-full p-4 rounded-2xl border-3 flex items-center justify-between font-bubble text-base transition-all select-none cursor-pointer ${
                    isSelected
                      ? 'bg-emerald-100 border-emerald-500 shadow-playful ring-3 ring-emerald-200 text-emerald-950 font-bold'
                      : 'bg-white border-slate-200 text-slate-700 hover:bg-emerald-50/50 hover:border-emerald-300'
                  }`}
                >
                  <span>{opt}</span>
                  {isSelected && <span className="text-emerald-600 text-lg">✓</span>}
                </button>
              );
            })}
          </div>
        </Card>
      )}

      {/* Prev / Next Question Navigation */}
      <div className="flex justify-between gap-3">
        <Button
          variant="ghost"
          size="md"
          onClick={() => setCurrentIndex((prev) => Math.max(0, prev - 1))}
          disabled={currentIndex === 0}
          className="flex-1"
        >
          <ArrowLeft className="w-4 h-4" />
          <span>Previous</span>
        </Button>
        <Button
          variant="primary"
          size="md"
          onClick={() =>
            setCurrentIndex((prev) => Math.min(examQuestions.length - 1, prev + 1))
          }
          disabled={currentIndex === examQuestions.length - 1}
          className="flex-1"
        >
          <span>Next</span>
          <ArrowRight className="w-4 h-4" />
        </Button>
      </div>
    </div>
  );
};
