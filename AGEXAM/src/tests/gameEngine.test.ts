import { worldsData } from '../data/curriculumData';
import { defaultRewards, defaultAchievements } from '../services/storageService';

// Verification test suite for Aghanya's Learning Quest Engine
function runTests() {
  console.log('--- Starting Game Engine Verification Tests ---');

  let passed = 0;
  let failed = 0;

  function assert(condition: boolean, message: string) {
    if (condition) {
      console.log(`✅ PASS: ${message}`);
      passed++;
    } else {
      console.error(`❌ FAIL: ${message}`);
      failed++;
    }
  }

  // Test 1: Curriculum Data Integrity
  assert(worldsData.length === 4, 'Curriculum contains all 4 adventure worlds');
  const mathWorld = worldsData.find(w => w.id === 'world-math-mountain');
  assert(!!mathWorld, 'Math Mountain exists');
  assert(mathWorld!.levels.length === 9, 'Math Mountain has all 9 syllabus levels including Boss Challenge');

  // Test 2: Questions Integrity
  let totalQuestions = 0;
  worldsData.forEach(w => {
    w.levels.forEach(lvl => {
      totalQuestions += lvl.questions.length;
      lvl.questions.forEach(q => {
        if (!q.title || !q.instruction || q.correctAnswer === undefined || !q.whyExplanation) {
          assert(false, `Question ${q.id} in level ${lvl.id} has missing required fields`);
        }
      });
    });
  });
  assert(totalQuestions >= 20, `Curriculum has ${totalQuestions} rich questions across all worlds`);

  // Test 3: Family Rewards Configuration
  assert(defaultRewards.length >= 6, 'Family rewards shelf contains at least 6 configured parent rewards');
  const vijaiRewards = defaultRewards.filter(r => r.giver.includes('Vijai'));
  const swethaRewards = defaultRewards.filter(r => r.giver.includes('Swetha'));
  assert(vijaiRewards.length >= 2, 'Dad Vijai has configured rewards (Chocolate, Movie Night)');
  assert(swethaRewards.length >= 2, 'Mom Swetha has configured rewards (Ice cream, Story book)');

  // Test 4: Achievements
  assert(defaultAchievements.length >= 6, 'Contains at least 6 milestone achievements');

  // Test 5: Boss Level Configuration
  const bossLevel = mathWorld?.levels.find(l => l.isBossLevel);
  assert(!!bossLevel, 'Boss Level is configured');
  assert(bossLevel?.questions.length === 3, 'Boss Challenge tests 3 summit problems');

  console.log(`\nResults: ${passed} passed, ${failed} failed`);
  if (failed > 0) {
    process.exit(1);
  }
}

runTests();
