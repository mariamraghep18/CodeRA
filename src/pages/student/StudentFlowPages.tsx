import React, { useState, useEffect, useMemo, useRef, useCallback } from 'react';
import { useRouter } from '../../router/Router';
import { useMockData } from '../../context/MockDataContext';
import { UniversalBackButton } from '../../components/UniversalBackButton';
import { LiveGestureTracker } from '../../components/learning/LiveGestureTracker';
import { ProfileAvatarButton } from '../../components/profile/ProfileAvatarButton';
import confetti from 'canvas-confetti';
import {
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Timer,
  CheckCircle2,
  Volume2,
  VolumeX,
  Video,
  VideoOff,
  Camera,
  CameraOff,
  Mic,
  MicOff,
  Square,
  Lock,
  Unlock,
  CreditCard,
  BookOpen,
  Play,
  RotateCcw,
  Award,
  Download,
  Share2,
  Brain,
  Cpu,
  Layers,
  Check,
  Clock,
  AlertCircle,
  ShieldAlert,
  Code2,
  Sun,
  Moon,
  HelpCircle,
  User,
  Eye,
  Sliders,
  Bell,
  X,
  Send,
  RefreshCw,
  Maximize2,
  Terminal,
  Trophy,
  ExternalLink,
  Hand,
} from 'lucide-react';

/* ========================================================================= */
/* SHARED STUDENT HEADER NAVIGATION                                          */
/* ========================================================================= */
interface StudentHeaderProps {
  activeNav?: 'learning' | 'assessment' | 'help';
  studentName?: string;
}

const StudentHeader: React.FC<StudentHeaderProps> = ({ activeNav = 'learning', studentName = 'Ahmed' }) => {
  const { lang, setLang, theme, toggleTheme } = useMockData();
  const { navigate } = useRouter();

  return (
    <header
      className="sticky top-0 z-30 border-b backdrop-blur-md transition-colors"
      style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Logo & Navigation */}
          <div className="flex items-center gap-6 overflow-x-auto py-2">
            <div
              onClick={() => navigate('/student-dashboard')}
              className="flex items-center gap-2 cursor-pointer shrink-0"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shadow-md">
                <Code2 className="w-5 h-5" />
              </div>
              <span className="font-black font-serif text-lg tracking-tight hidden sm:inline" style={{ color: 'var(--color-text)' }}>
                CodeRa <span className="text-xs font-sans font-bold text-blue-600 uppercase">Student</span>
              </span>
            </div>

            <nav className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => navigate('/student-dashboard')}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeNav === 'learning'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                My Learning
              </button>
              <button
                type="button"
                onClick={() => navigate('/assessment-intro')}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeNav === 'assessment'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Assessment
              </button>
              <button
                type="button"
                onClick={() => alert('CodeRa Learner Help Desk: If you need assistance with reading or audio prompts, click the accessibility drawer on the right!')}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeNav === 'help'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Help
              </button>
            </nav>
          </div>

          {/* Right Controls: Language, Theme, Profile Badge */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            <button
              type="button"
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="px-2.5 py-1.5 rounded-xl border text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>

            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl border text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Interactive Student Profile Avatar & Customization Trigger */}
            <ProfileAvatarButton roleOverride="student" size="sm" showLabel={true} />
          </div>
        </div>
      </div>
    </header>
  );
};

/* ========================================================================= */
/* VIEW 1: WELCOME TO CODERA! (Student Welcome Screen)                       */
/* ========================================================================= */
export const StudentWelcomePage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, learners, activeLearnerId } = useMockData();
  const currentLearner = learners.find((l) => l.id === activeLearnerId) || learners[0];
  const firstName = currentLearner?.name?.split(' ')[0] || 'Ahmed';

  return (
    <div className="min-h-[calc(100vh-4.5rem)] transition-colors" style={{ backgroundColor: 'var(--color-bg)' }}>
      <StudentHeader activeNav="assessment" studentName={firstName} />

      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-10 space-y-6 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-start">
          <UniversalBackButton to="/" label="Back to Home" />
        </div>

        <div
          className="w-full rounded-3xl p-8 sm:p-12 border shadow-2xl space-y-8 text-center animate-in zoom-in-95"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          {/* Mascot / Avatar Illustration */}
          <div
            className="relative mx-auto w-24 h-24 sm:w-28 sm:h-28 rounded-3xl flex items-center justify-center shadow-xl text-5xl sm:text-6xl animate-bounce"
            style={{ background: 'linear-gradient(135deg, #3157E8 0%, #0D8068 100%)' }}
          >
            🚀
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
              <Sparkles className="w-3.5 h-3.5" />
              <span>Welcome to CodeRa!</span>
            </div>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight" style={{ color: 'var(--color-text)' }}>
              Welcome to CodeRa, {firstName}!
            </h1>
            <p className="text-xs sm:text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              We are excited to start your coding journey. Let's find out where you are so we can create the perfect learning path for you.
            </p>
          </div>

          {/* "What happens next?" checklist */}
          <div className="max-w-xl mx-auto text-start p-6 rounded-3xl border space-y-4" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
            <h3 className="text-xs sm:text-sm font-bold uppercase tracking-wider text-blue-600 block">
              What happens next?
            </h3>
            <div className="space-y-3.5 text-xs sm:text-sm">
              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-bold flex items-center justify-center shrink-0 text-xs">
                  1
                </div>
                <div>
                  <strong className="block font-bold" style={{ color: 'var(--color-text)' }}>Take a short assessment</strong>
                  <span style={{ color: 'var(--color-text-muted)' }}>Simple parts to check your visual & logic programming skills.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-bold flex items-center justify-center shrink-0 text-xs">
                  2
                </div>
                <div>
                  <strong className="block font-bold" style={{ color: 'var(--color-text)' }}>Record a quick video</strong>
                  <span style={{ color: 'var(--color-text-muted)' }}>A 30-second hello to verify your learner profile.</span>
                </div>
              </div>

              <div className="flex items-start gap-3">
                <div className="w-6 h-6 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-bold flex items-center justify-center shrink-0 text-xs">
                  3
                </div>
                <div>
                  <strong className="block font-bold" style={{ color: 'var(--color-text)' }}>Start learning!</strong>
                  <span style={{ color: 'var(--color-text-muted)' }}>Jump into interactive puzzles, drag-and-drop, and projects.</span>
                </div>
              </div>
            </div>
          </div>

          {/* Action Button */}
          <div className="max-w-md mx-auto pt-2">
            <button
              type="button"
              onClick={() => navigate('/assessment-intro')}
              className="w-full py-4 rounded-2xl text-white font-bold text-sm shadow-xl transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              style={{ backgroundColor: 'var(--color-primary-green)' }}
            >
              <span>Start My Assessment</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

/* ========================================================================= */
/* VIEW 2: PLACEMENT ASSESSMENT (INTRO)                                      */
/* ========================================================================= */
export const AssessmentIntroPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, learners, activeLearnerId } = useMockData();
  const currentLearner = learners.find((l) => l.id === activeLearnerId) || learners[0];
  const firstName = currentLearner?.name?.split(' ')[0] || 'Ahmed';

  return (
    <div className="min-h-[calc(100vh-4.5rem)] transition-colors" style={{ backgroundColor: 'var(--color-bg)' }}>
      <StudentHeader activeNav="assessment" studentName={firstName} />

      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-10 space-y-6">
        <div className="flex items-center justify-start">
          <UniversalBackButton to="/student-welcome" label="Back to Welcome" />
        </div>

        <div
          className="rounded-3xl p-8 sm:p-12 border shadow-2xl space-y-8"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          {/* Title & Subtitle */}
          <div className="text-center max-w-2xl mx-auto space-y-3">
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
              <Brain className="w-3.5 h-3.5" />
              <span>Smart Placement Evaluation</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-serif tracking-tight" style={{ color: 'var(--color-text)' }}>
              Placement Assessment
            </h1>
            <p className="text-xs sm:text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              Let's find the best starting point for you! Read the details below to prepare.
            </p>
          </div>

          {/* Overview Cards (3 Cards) */}
          <div className="grid grid-cols-1 md:grid-cols-3 gap-5">
            <div
              className="p-6 rounded-3xl border shadow-md space-y-2 text-center"
              style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
            >
              <div className="w-12 h-12 rounded-2xl mx-auto bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center">
                <Layers className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base" style={{ color: 'var(--color-text)' }}>5 Parts</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                Visual Logic, Math, and Core algorithms to test logical pathways.
              </p>
            </div>

            <div
              className="p-6 rounded-3xl border shadow-md space-y-2 text-center"
              style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
            >
              <div className="w-12 h-12 rounded-2xl mx-auto bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center">
                <Clock className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base" style={{ color: 'var(--color-text)' }}>20 Minutes</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                A generous countdown for low pressure learning. Take your time!
              </p>
            </div>

            <div
              className="p-6 rounded-3xl border shadow-md space-y-2 text-center"
              style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
            >
              <div className="w-12 h-12 rounded-2xl mx-auto bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-300 flex items-center justify-center">
                <Cpu className="w-6 h-6" />
              </div>
              <h3 className="font-bold text-base" style={{ color: 'var(--color-text)' }}>Adaptive Tracks</h3>
              <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                Dynamic questions that match your answers for a customized level.
              </p>
            </div>
          </div>

          {/* "Important things to keep in mind" info box with accessibility toolbar preview */}
          <div
            className="p-6 rounded-3xl border space-y-4"
            style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-blue-600">
              <HelpCircle className="w-4 h-4" />
              <span>Important things to keep in mind:</span>
            </div>

            <ul className="text-xs sm:text-sm space-y-2.5 list-disc list-inside leading-relaxed" style={{ color: 'var(--color-text)' }}>
              <li>There are no penalties for mistakes; this simply helps us find your comfort zone.</li>
              <li>You can pause or resume anytime if you need a break.</li>
              <li>Built-in accessibility tools are accessible directly inside every question:</li>
            </ul>

            {/* Accessibility Toolbar Preview */}
            <div className="p-4 rounded-2xl bg-slate-100 dark:bg-slate-900 border flex flex-wrap items-center justify-between gap-3 text-xs" style={{ borderColor: 'var(--color-border)' }}>
              <span className="font-bold text-slate-700 dark:text-slate-300">Accessibility Tools:</span>
              <div className="flex items-center gap-2">
                <span className="px-3 py-1 rounded-xl bg-white dark:bg-slate-800 border font-bold flex items-center gap-1.5 shadow-sm">
                  <Volume2 className="w-3.5 h-3.5 text-blue-600" />
                  <span>Read Aloud</span>
                </span>
                <span className="px-3 py-1 rounded-xl bg-white dark:bg-slate-800 border font-bold flex items-center gap-1.5 shadow-sm">
                  <span>Font Size (A- / A+)</span>
                </span>
                <span className="px-3 py-1 rounded-xl bg-white dark:bg-slate-800 border font-bold flex items-center gap-1.5 shadow-sm">
                  <Eye className="w-3.5 h-3.5 text-emerald-600" />
                  <span>High Contrast</span>
                </span>
              </div>
            </div>
          </div>

          {/* Button: Begin Assessment */}
          <div className="text-center pt-2">
            <button
              type="button"
              onClick={() => navigate('/assessment-in-progress')}
              className="w-full py-4 rounded-2xl text-white font-bold text-sm shadow-xl transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
              style={{ backgroundColor: 'var(--color-primary-green)' }}
            >
              <span>Begin Assessment</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

/* ========================================================================= */
/* VIEW 3: ASSESSMENT IN PROGRESS (Timed Quiz) (Screenshot 58)               */
/* ========================================================================= */
export const AssessmentInProgressPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, saveAssessmentResult, activeLearnerId, learners, toggleHighContrast } = useMockData();
  const currentLearner = learners.find((l) => l.id === activeLearnerId) || learners[0];
  const firstName = currentLearner?.name?.split(' ')[0] || 'Ahmed';

  const [fontScale, setFontScale] = useState(1);
  const [isHighContrast, setIsHighContrast] = useState(false);
  const [secondsRemaining, setSecondsRemaining] = useState(15 * 60 + 42); // 15:42
  const [currentQuestionIndex, setCurrentQuestionIndex] = useState(3); // Start at Question 4 of 8 (Screenshot 58)
  const [selectedOption, setSelectedOption] = useState<string | null>('B');

  // Timer countdown
  useEffect(() => {
    const timer = setInterval(() => {
      setSecondsRemaining((prev) => (prev > 0 ? prev - 1 : 0));
    }, 1000);
    return () => clearInterval(timer);
  }, []);

  const formatTimer = (secs: number) => {
    const mins = Math.floor(secs / 60);
    const s = secs % 60;
    return `${mins}:${s < 10 ? '0' : ''}${s}`;
  };

  const categories = [
    { id: 1, name: 'Visual Basics', done: true },
    { id: 2, name: 'Loops & Logic', active: true },
    { id: 3, name: 'Variables', upcoming: true },
    { id: 4, name: 'Algorithms', upcoming: true },
  ];

  const questions = [
    {
      id: 1,
      prompt: 'Which arrow moves the turtle 100 steps north?',
      code: 'turtle.setheading(90)\nturtle.forward(100)',
      options: [
        { key: 'A', text: 'Downwards arrow (South)' },
        { key: 'B', text: 'Upwards arrow (North)' },
        { key: 'C', text: 'Left arrow (West)' },
        { key: 'D', text: 'Right arrow (East)' },
      ],
      correctKey: 'B',
    },
    {
      id: 2,
      prompt: 'How many times will this loop repeat?',
      code: 'for i in range(4):\n    print("CodeRa")',
      options: [
        { key: 'A', text: '2 times' },
        { key: 'B', text: '4 times' },
        { key: 'C', text: '5 times' },
        { key: 'D', text: 'Infinite times' },
      ],
      correctKey: 'B',
    },
    {
      id: 3,
      prompt: 'What is the initial value of variable `x`?',
      code: 'x = 10\ny = x + 5\nprint(y)',
      options: [
        { key: 'A', text: '5' },
        { key: 'B', text: '10' },
        { key: 'C', text: '15' },
        { key: 'D', text: '0' },
      ],
      correctKey: 'B',
    },
    {
      id: 4, // Matches Screenshot 58!
      prompt: 'What will this Python code print to the console?',
      code: `count = 0\nfor i in range(3):\n    count += 2\nprint(count)`,
      options: [
        { key: 'A', text: '3' },
        { key: 'B', text: '6' },
        { key: 'C', text: '5' },
        { key: 'D', text: '2' },
      ],
      correctKey: 'B',
    },
    {
      id: 5,
      prompt: 'What does the `range(5)` function produce in Python?',
      code: 'numbers = list(range(5))\nprint(numbers)',
      options: [
        { key: 'A', text: '[1, 2, 3, 4, 5]' },
        { key: 'B', text: '[0, 1, 2, 3, 4]' },
        { key: 'C', text: '[5, 4, 3, 2, 1]' },
        { key: 'D', text: '[0, 5]' },
      ],
      correctKey: 'B',
    },
    {
      id: 6,
      prompt: 'Which condition will evaluate to True when `score = 85`?',
      code: 'score = 85\nif score >= 80:\n    print("Level Passed")',
      options: [
        { key: 'A', text: 'score < 50' },
        { key: 'B', text: 'score >= 80' },
        { key: 'C', text: 'score == 100' },
        { key: 'D', text: 'score <= 70' },
      ],
      correctKey: 'B',
    },
    {
      id: 7,
      prompt: 'What will be stored inside the `total` variable after execution?',
      code: 'numbers = [2, 4, 6]\ntotal = sum(numbers)',
      options: [
        { key: 'A', text: '6' },
        { key: 'B', text: '12' },
        { key: 'C', text: '10' },
        { key: 'D', text: '8' },
      ],
      correctKey: 'B',
    },
    {
      id: 8,
      prompt: 'Which block correctly stops a robot when an obstacle distance is under 10cm?',
      code: 'while distance > 10:\n    robot.move()\nrobot.stop()',
      options: [
        { key: 'A', text: 'robot.speed_up()' },
        { key: 'B', text: 'robot.stop()' },
        { key: 'C', text: 'robot.spin_forever()' },
        { key: 'D', text: 'robot.reverse()' },
      ],
      correctKey: 'B',
    },
  ];

  const currentQ = questions[currentQuestionIndex];

  // Speech synthesis for Read Aloud
  const handleReadAloud = () => {
    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      const textToRead = `${currentQ.prompt}. Code: ${currentQ.code.replace(/\n/g, ' ')}. Options: A: ${currentQ.options[0].text}, B: ${currentQ.options[1].text}, C: ${currentQ.options[2].text}, D: ${currentQ.options[3].text}.`;
      const utterance = new SpeechSynthesisUtterance(textToRead);
      utterance.rate = 0.95;
      window.speechSynthesis.speak(utterance);
    }
  };

  const handleNext = () => {
    if (currentQuestionIndex < questions.length - 1) {
      setCurrentQuestionIndex((prev) => prev + 1);
      setSelectedOption(null);
    } else {
      // Save result to mock data context
      if (currentLearner) {
        saveAssessmentResult(currentLearner.id, {
          completed: true,
          score: 78,
          level: 'L2',
          levelName: 'Level 2 — Beginner Plus',
          domainScores: { logic: 19, pattern: 18, math: 16, comprehension: 17, coding: 17 },
          timestamp: new Date().toISOString(),
        });
      }
      navigate('/assessment-complete');
    }
  };

  const handlePrev = () => {
    if (currentQuestionIndex > 0) {
      setCurrentQuestionIndex((prev) => prev - 1);
    }
  };

  return (
    <div
      className={`min-h-[calc(100vh-4.5rem)] transition-colors ${
        isHighContrast ? 'bg-black text-yellow-300' : ''
      }`}
      style={{ backgroundColor: isHighContrast ? '#000000' : 'var(--color-bg)' }}
    >
      <StudentHeader activeNav="assessment" studentName={firstName} />

      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-start">
          <UniversalBackButton to="/assessment-intro" label="Exit Assessment" />
        </div>

        {/* Top Bar: Part indicator, category tabs, live countdown timer */}
        <div
          className="rounded-3xl p-5 sm:p-6 border shadow-lg space-y-4"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div className="flex items-center gap-2">
              <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 uppercase tracking-wider">
                Part 2 of 5: Loops & Logic
              </span>
            </div>

            <div className="flex items-center gap-2 text-sm font-mono font-bold text-amber-600 bg-amber-50 dark:bg-amber-950/60 px-3 py-1.5 rounded-xl border border-amber-200 dark:border-amber-900 w-fit">
              <Timer className="w-4 h-4 animate-spin" />
              <span>{formatTimer(secondsRemaining)} remaining</span>
            </div>
          </div>

          {/* Category Tabs */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-2 pt-1 border-t" style={{ borderColor: 'var(--color-border)' }}>
            {categories.map((cat) => (
              <div
                key={cat.id}
                className={`py-2 px-3 rounded-xl text-xs font-bold text-center transition-all ${
                  cat.active
                    ? 'bg-blue-600 text-white shadow-sm'
                    : cat.done
                    ? 'bg-emerald-50 dark:bg-emerald-950/40 text-emerald-600 border border-emerald-200 dark:border-emerald-800'
                    : 'bg-slate-100 dark:bg-slate-900 text-slate-400'
                }`}
              >
                {cat.name}
              </div>
            ))}
          </div>
        </div>

        {/* Main Quiz Box */}
        <div
          className="rounded-3xl p-6 sm:p-10 border shadow-2xl space-y-6 animate-in fade-in"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            fontSize: `${fontScale}rem`,
          }}
        >
          {/* Question Header & Accessibility Toolbar */}
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3 border-b pb-4" style={{ borderColor: 'var(--color-border)' }}>
            <div>
              <span className="text-xs font-bold text-slate-400 uppercase tracking-wider block">
                Question {currentQuestionIndex + 1} of {questions.length}
              </span>
              <h2 className="text-lg sm:text-xl font-bold font-serif" style={{ color: 'var(--color-text)' }}>
                {currentQ.prompt}
              </h2>
            </div>

            {/* Accessibility Controls Toolbar */}
            <div className="flex items-center gap-2 shrink-0">
              <button
                type="button"
                onClick={handleReadAloud}
                className="p-2.5 rounded-xl border text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 flex items-center gap-1.5 cursor-pointer shadow-sm"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                title="Read question aloud"
              >
                <Volume2 className="w-4 h-4 text-blue-600" />
                <span className="text-[11px] hidden sm:inline">Read Aloud</span>
              </button>

              <button
                type="button"
                onClick={() => setFontScale((prev) => Math.max(0.85, prev - 0.1))}
                className="px-2.5 py-2 rounded-xl border text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                title="Decrease font size"
              >
                A-
              </button>
              <button
                type="button"
                onClick={() => setFontScale((prev) => Math.min(1.3, prev + 0.1))}
                className="px-2.5 py-2 rounded-xl border text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                title="Increase font size"
              >
                A+
              </button>

              <button
                type="button"
                onClick={() => setIsHighContrast(!isHighContrast)}
                className={`p-2 rounded-xl border text-xs cursor-pointer ${
                  isHighContrast ? 'bg-yellow-400 text-black font-bold' : ''
                }`}
                style={{ borderColor: 'var(--color-border)' }}
                title="Toggle High Contrast"
              >
                <Eye className="w-4 h-4" />
              </button>
            </div>
          </div>

          {/* Python Code Snippet Box */}
          <div className="p-4 sm:p-5 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm border border-slate-800 shadow-inner relative overflow-x-auto">
            <div className="flex items-center justify-between pb-2 mb-2 border-b border-slate-800 text-[10px] text-slate-400 uppercase tracking-widest">
              <span>Python Script</span>
              <span>UTF-8</span>
            </div>
            <pre className="leading-relaxed">
              <code>{currentQ.code}</code>
            </pre>
          </div>

          {/* Multiple Choice Options (A, B, C, D) */}
          <div className="space-y-3 pt-2">
            {currentQ.options.map((opt) => {
              const isSelected = selectedOption === opt.key;
              return (
                <button
                  key={opt.key}
                  type="button"
                  onClick={() => setSelectedOption(opt.key)}
                  className={`w-full p-4 rounded-2xl border text-start text-xs sm:text-sm font-semibold transition-all flex items-center justify-between cursor-pointer ${
                    isSelected
                      ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/50 shadow-md ring-2 ring-blue-500/30'
                      : 'hover:bg-slate-50 dark:hover:bg-slate-900'
                  }`}
                  style={{
                    backgroundColor: isSelected ? undefined : 'var(--color-bg)',
                    borderColor: isSelected ? 'var(--color-primary-blue)' : 'var(--color-border)',
                    color: 'var(--color-text)',
                  }}
                >
                  <div className="flex items-center gap-3">
                    <span
                      className={`w-8 h-8 rounded-xl font-bold flex items-center justify-center text-xs ${
                        isSelected
                          ? 'bg-blue-600 text-white'
                          : 'bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300'
                      }`}
                    >
                      {opt.key}
                    </span>
                    <span>{opt.text}</span>
                  </div>
                  {isSelected && <Check className="w-5 h-5 text-blue-600" />}
                </button>
              );
            })}
          </div>

          {/* Bottom Progress Bar */}
          <div className="space-y-2 pt-2">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Overall Progress</span>
              <span>{Math.round(((currentQuestionIndex + 1) / questions.length) * 100)}%</span>
            </div>
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div
                className="h-full bg-blue-600 rounded-full transition-all duration-300"
                style={{ width: `${((currentQuestionIndex + 1) / questions.length) * 100}%` }}
              />
            </div>
          </div>

          {/* Previous / Next Navigation Buttons */}
          <div className="flex items-center justify-between gap-4 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <button
              type="button"
              onClick={handlePrev}
              disabled={currentQuestionIndex === 0}
              className={`py-3 px-5 rounded-2xl border font-bold text-xs flex items-center gap-2 ${
                currentQuestionIndex > 0 ? 'hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer' : 'opacity-40 cursor-not-allowed'
              }`}
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>Previous Question</span>
            </button>

            <button
              type="button"
              onClick={handleNext}
              disabled={selectedOption === null}
              className={`py-3 px-6 rounded-2xl text-white font-bold text-xs sm:text-sm shadow-md transition-all flex items-center gap-2 ${
                selectedOption !== null ? 'hover:scale-102 active:scale-98 cursor-pointer opacity-100' : 'opacity-50 cursor-not-allowed'
              }`}
              style={{ backgroundColor: 'var(--color-primary-green)' }}
            >
              <span>{currentQuestionIndex === questions.length - 1 ? 'Finish Assessment' : 'Next Question'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

/* ========================================================================= */
/* VIEW 4: ASSESSMENT COMPLETE! (Screenshot 59)                              */
/* ========================================================================= */
export const AssessmentCompletePage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, learners, activeLearnerId } = useMockData();
  const currentLearner = learners.find((l) => l.id === activeLearnerId) || learners[0];
  const firstName = currentLearner?.name?.split(' ')[0] || 'Ahmed';

  const partsScores = [
    { part: '1. Visual Basics', score: 85, status: 'Mastered' },
    { part: '2. Loops & Logic', score: 78, status: 'Proficient' },
    { part: '3. Variables & Scope', score: 72, status: 'Proficient' },
    { part: '4. Algorithmic Thinking', score: 80, status: 'Mastered' },
    { part: '5. Spatial Coordinates', score: 76, status: 'Proficient' },
  ];

  return (
    <div className="min-h-[calc(100vh-4.5rem)] transition-colors" style={{ backgroundColor: 'var(--color-bg)' }}>
      <StudentHeader activeNav="assessment" studentName={firstName} />

      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-10 space-y-6 animate-in zoom-in-95">
        <div className="flex items-center justify-start">
          <UniversalBackButton to="/student-welcome" label="Back to Welcome" />
        </div>

        <div
          className="rounded-3xl p-8 sm:p-12 border shadow-2xl space-y-8"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          {/* Header tag & Title */}
          <div className="text-center space-y-2 max-w-xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              WOOHOO! FANTASTIC JOB!
            </span>
            <h1 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight" style={{ color: 'var(--color-text)' }}>
              Assessment Complete!
            </h1>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              You completed all 5 parts! Your responses helped us pinpoint your optimal learning level. Let's see your results!
            </p>
          </div>

          {/* Results Cards (Grid) */}
          <div className="grid grid-cols-1 md:grid-cols-2 gap-6 items-stretch">
            {/* Score Card with Circular Progress */}
            <div
              className="p-6 rounded-3xl border shadow-md flex flex-col items-center justify-center text-center space-y-4"
              style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
            >
              <div className="relative w-32 h-32 flex items-center justify-center">
                <svg className="w-full h-full transform -rotate-90" viewBox="0 0 100 100">
                  <circle cx="50" cy="50" r="40" stroke="currentColor" strokeWidth="8" fill="transparent" className="text-slate-200 dark:text-slate-800" />
                  <circle
                    cx="50"
                    cy="50"
                    r="40"
                    stroke="#00A86B"
                    strokeWidth="8"
                    strokeDasharray={251.2}
                    strokeDashoffset={251.2 * (1 - 0.78)}
                    strokeLinecap="round"
                    fill="transparent"
                  />
                </svg>
                <div className="absolute flex flex-col items-center">
                  <span className="text-3xl font-black" style={{ color: 'var(--color-text)' }}>78%</span>
                  <span className="text-[10px] font-bold uppercase tracking-wider text-emerald-600">Complete</span>
                </div>
              </div>
              <div>
                <h3 className="font-bold text-base" style={{ color: 'var(--color-text)' }}>Your Overall Score</h3>
                <p className="text-xs max-w-xs text-slate-500 mt-1">
                  Great performance in visual logic, pattern sequencing, and iterative loops.
                </p>
              </div>
            </div>

            {/* Assigned Level Card */}
            <div
              className="p-6 rounded-3xl border shadow-md flex flex-col justify-between space-y-4"
              style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
            >
              <div className="space-y-2">
                <span className="text-xs font-bold text-blue-600 uppercase tracking-wider block">Assigned Pathway</span>
                <div className="flex items-center gap-3">
                  <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center text-xl font-black">
                    L2
                  </div>
                  <div>
                    <h2 className="text-xl font-black font-serif" style={{ color: 'var(--color-text)' }}>
                      Level 2 — Beginner Plus
                    </h2>
                    <span className="text-xs text-emerald-600 font-bold block">Python Fundamentals</span>
                  </div>
                </div>
                <p className="text-xs leading-relaxed text-slate-500 pt-2">
                  "You have a solid foundation! Let's build on it with interactive turtle graphics, coordinate logic, and sensor-based decision making."
                </p>
              </div>

              <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900 border text-xs font-mono" style={{ borderColor: 'var(--color-border)' }}>
                <span>68 Interactive Lessons • 12 Robotics Projects</span>
              </div>
            </div>
          </div>

          {/* Parts Summary Table */}
          <div
            className="rounded-3xl border shadow-md overflow-hidden"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <div className="p-4 border-b text-xs font-bold uppercase tracking-wider text-slate-500" style={{ borderColor: 'var(--color-border)' }}>
              Diagnostic Breakdown by Evaluation Part
            </div>
            <div className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
              {partsScores.map((p, idx) => (
                <div key={idx} className="p-4 flex items-center justify-between text-xs sm:text-sm">
                  <span className="font-bold" style={{ color: 'var(--color-text)' }}>{p.part}</span>
                  <div className="flex items-center gap-4">
                    <span className="font-mono font-bold text-blue-600">{p.score}%</span>
                    <span className="px-2.5 py-0.5 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {p.status}
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>

          {/* Action Card: Next Step: Verification */}
          <div
            className="p-6 sm:p-8 rounded-3xl bg-blue-50 dark:bg-blue-950/40 border-2 border-blue-300 dark:border-blue-800 flex flex-col sm:flex-row sm:items-center justify-between gap-6"
          >
            <div className="space-y-1.5">
              <span className="text-xs font-black uppercase tracking-wider text-blue-700 dark:text-blue-300 block">
                Next Step: Verification
              </span>
              <h3 className="text-xl font-bold font-serif text-blue-950 dark:text-white">
                Record a quick 30-second hello video
              </h3>
              <p className="text-xs text-blue-800 dark:text-blue-300 max-w-md">
                Confirm your identity and accessibility preferences to unlock your full course access.
              </p>
            </div>

            <button
              type="button"
              onClick={() => navigate('/video-verification')}
              className="py-4 px-6 rounded-2xl text-white font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shrink-0"
              style={{ backgroundColor: 'var(--color-primary-blue)' }}
            >
              <span>Continue to Verification</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

/* ========================================================================= */
/* VIEW 5: VERIFICATION VIDEO (Screenshot 51)                                */
/* ========================================================================= */
export const VideoVerificationPromptPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, learners, activeLearnerId, submitVideoVerification } = useMockData();
  const currentLearner = learners.find((l) => l.id === activeLearnerId) || learners[0];
  const firstName = currentLearner?.name?.split(' ')[0] || 'Ahmed';

  const liveVideoRef = useRef<HTMLVideoElement>(null);
  const recordedVideoRef = useRef<HTMLVideoElement>(null);
  const mediaStreamRef = useRef<MediaStream | null>(null);
  const mediaRecorderRef = useRef<MediaRecorder | null>(null);
  const recordedChunksRef = useRef<Blob[]>([]);
  const audioContextRef = useRef<AudioContext | null>(null);
  const audioAnalyserRef = useRef<AnalyserNode | null>(null);
  const audioAnimRef = useRef<number | null>(null);

  const [hasCamera, setHasCamera] = useState<boolean | null>(null);
  const [cameraError, setCameraError] = useState<string | null>(null);
  const [isSimulation, setIsSimulation] = useState<boolean>(false);
  const [isRecording, setIsRecording] = useState<boolean>(false);
  const [recordedBlobUrl, setRecordedBlobUrl] = useState<string | null>(null);
  const [timerCount, setTimerCount] = useState<number>(0);
  const [audioLevel, setAudioLevel] = useState<number>(0);

  // Initialize real camera & microphone access
  const startCamera = useCallback(async () => {
    try {
      setCameraError(null);
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((track) => track.stop());
      }

      const stream = await navigator.mediaDevices.getUserMedia({
        video: {
          width: { ideal: 1280 },
          height: { ideal: 720 },
          facingMode: 'user',
        },
        audio: true,
      });

      mediaStreamRef.current = stream;
      if (liveVideoRef.current) {
        liveVideoRef.current.srcObject = stream;
        await liveVideoRef.current.play();
      }

      try {
        const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
        if (AudioCtx) {
          const audioCtx = new AudioCtx();
          audioContextRef.current = audioCtx;
          const source = audioCtx.createMediaStreamSource(stream);
          const analyser = audioCtx.createAnalyser();
          analyser.fftSize = 64;
          source.connect(analyser);
          audioAnalyserRef.current = analyser;

          const dataArray = new Uint8Array(analyser.frequencyBinCount);
          const updateAudioMeter = () => {
            if (audioAnalyserRef.current) {
              audioAnalyserRef.current.getByteFrequencyData(dataArray);
              let sum = 0;
              for (let i = 0; i < dataArray.length; i++) {
                sum += dataArray[i];
              }
              const avg = sum / dataArray.length;
              setAudioLevel(Math.min(100, Math.round((avg / 128) * 100)));
            }
            audioAnimRef.current = requestAnimationFrame(updateAudioMeter);
          };
          updateAudioMeter();
        }
      } catch (audioErr) {
        console.warn('Audio meter initialization skipped:', audioErr);
      }

      setHasCamera(true);
      setIsSimulation(false);
    } catch (err: unknown) {
      console.warn('Camera/mic error:', err);
      const error = err as Error;
      setHasCamera(false);
      setCameraError(
        error?.name === 'NotAllowedError'
          ? 'Camera/Microphone access was denied. Please allow camera permissions in your browser bar, or use the Demo Feed below.'
          : 'No webcam was detected on this device. You can test and submit using the simulated verification camera mode.'
      );
      setIsSimulation(true);
    }
  }, []);

  useEffect(() => {
    startCamera();
    return () => {
      if (mediaStreamRef.current) {
        mediaStreamRef.current.getTracks().forEach((t) => t.stop());
      }
      if (audioContextRef.current) {
        audioContextRef.current.close().catch(() => {});
      }
      if (audioAnimRef.current) {
        cancelAnimationFrame(audioAnimRef.current);
      }
    };
  }, [startCamera]);

  // Video recording timer (auto-stops at 30 seconds)
  useEffect(() => {
    let interval: ReturnType<typeof setInterval> | undefined;
    if (isRecording) {
      interval = setInterval(() => {
        setTimerCount((prev) => {
          if (prev >= 30) {
            handleStopRecord();
            return 30;
          }
          return prev + 1;
        });
      }, 1000);
    }
    return () => clearInterval(interval);
  }, [isRecording]);

  const handleStartRecord = () => {
    setRecordedBlobUrl(null);
    setTimerCount(0);
    recordedChunksRef.current = [];

    if (mediaStreamRef.current && !isSimulation) {
      try {
        const mimeType = MediaRecorder.isTypeSupported('video/webm;codecs=vp9,opus')
          ? 'video/webm;codecs=vp9,opus'
          : MediaRecorder.isTypeSupported('video/webm')
          ? 'video/webm'
          : '';

        const recorder = mimeType
          ? new MediaRecorder(mediaStreamRef.current, { mimeType })
          : new MediaRecorder(mediaStreamRef.current);

        recorder.ondataavailable = (e) => {
          if (e.data && e.data.size > 0) {
            recordedChunksRef.current.push(e.data);
          }
        };

        recorder.onstop = () => {
          const blob = new Blob(recordedChunksRef.current, { type: 'video/webm' });
          const url = URL.createObjectURL(blob);
          setRecordedBlobUrl(url);
        };

        recorder.start(500);
        mediaRecorderRef.current = recorder;
      } catch (recErr) {
        console.warn('MediaRecorder error, falling back to simulation:', recErr);
      }
    }

    setIsRecording(true);
  };

  const handleStopRecord = () => {
    setIsRecording(false);
    if (mediaRecorderRef.current && mediaRecorderRef.current.state === 'recording') {
      mediaRecorderRef.current.stop();
    } else if (isSimulation) {
      setRecordedBlobUrl('simulated:verified_stream_30s.webm');
    }
  };

  const handleSubmitVideo = () => {
    if (currentLearner) {
      submitVideoVerification(
        currentLearner.id,
        `Hi! My name is ${currentLearner.name}. I'm excited to start coding Python on CodeRa!`,
        recordedBlobUrl || 'blob:simulated_recording.webm'
      );
    }
    navigate('/pending-review');
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] transition-colors" style={{ backgroundColor: 'var(--color-bg)' }}>
      <StudentHeader activeNav="assessment" studentName={firstName} />

      <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-start">
          <UniversalBackButton to="/assessment-complete" label="Back to Assessment Results" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Video Recording Box (8 Columns) */}
          <div
            className="lg:col-span-8 rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-6"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <div className="space-y-1.5 border-b pb-4" style={{ borderColor: 'var(--color-border)' }}>
              <span className="text-xs font-black uppercase tracking-wider text-purple-600 block">
                STEP 2 OF 3: IDENTITY VERIFICATION
              </span>
              <h1 className="text-2xl sm:text-3xl font-black font-serif" style={{ color: 'var(--color-text)' }}>
                Verification Video
              </h1>
              <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>
                To verify {firstName}'s profile and activate full learning dashboard features, please take a quick 30-second hello video using your webcam.
              </p>
            </div>

            {/* Video Recording Area with Real getUserMedia Feed */}
            <div
              className="relative h-72 sm:h-96 rounded-3xl overflow-hidden flex flex-col items-center justify-center border-2 border-slate-700 shadow-2xl bg-black"
            >
              {/* Live Video Element */}
              {!recordedBlobUrl ? (
                hasCamera && !isSimulation ? (
                  <video
                    ref={liveVideoRef}
                    playsInline
                    autoPlay
                    muted
                    className="absolute inset-0 w-full h-full object-cover transform -scale-x-100"
                  />
                ) : (
                  // Virtual Simulated Camera Backdrop
                  <div className="absolute inset-0 flex flex-col items-center justify-center p-6 text-center space-y-3 bg-gradient-to-b from-slate-900 to-slate-950">
                    <div className="w-20 h-20 rounded-3xl bg-slate-800/80 border border-slate-700 flex items-center justify-center text-slate-300 shadow-inner">
                      <Camera className="w-10 h-10 text-blue-400" />
                    </div>
                    <span className="text-xs font-bold text-slate-300">
                      Virtual Test Webcam Feed Active
                    </span>
                    <p className="text-[11px] text-slate-400 max-w-xs">
                      Position your face within the frame and click <strong>Start Recording</strong> to simulate video verification.
                    </p>
                  </div>
                )
              ) : (
                // Recorded Playback View
                <div className="absolute inset-0 bg-black flex items-center justify-center">
                  {!isSimulation && recordedBlobUrl.startsWith('blob:') ? (
                    <video
                      ref={recordedVideoRef}
                      src={recordedBlobUrl}
                      controls
                      autoPlay
                      className="w-full h-full object-cover"
                    />
                  ) : (
                    <div className="text-center space-y-3 p-4">
                      <div className="w-16 h-16 rounded-full bg-emerald-500 text-white mx-auto flex items-center justify-center shadow-lg animate-bounce">
                        <Check className="w-8 h-8" />
                      </div>
                      <span className="text-sm font-bold text-emerald-400 block">30s Video Captured & Verified</span>
                      <p className="text-xs text-slate-400">Ready to submit for admissions compliance.</p>
                    </div>
                  )}
                </div>
              )}

              {/* Live Status Overlay Header */}
              <div className="absolute top-4 left-4 right-4 flex items-center justify-between text-xs font-mono z-10 pointer-events-none">
                <span className="flex items-center gap-2 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/10">
                  <span className={`w-2.5 h-2.5 rounded-full ${isRecording ? 'bg-rose-500 animate-ping' : recordedBlobUrl ? 'bg-emerald-400' : 'bg-emerald-500'}`} />
                  <span>{isRecording ? 'REC LIVE' : recordedBlobUrl ? 'RECORDED' : 'CAMERA READY'}</span>
                </span>

                <div className="flex items-center gap-2">
                  {/* Live Audio Level VU Meter */}
                  {hasCamera && !isSimulation && (
                    <div className="flex items-center gap-1.5 px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white border border-white/10">
                      <Mic className="w-3.5 h-3.5 text-emerald-400" />
                      <div className="w-12 h-2 rounded-full bg-slate-700 overflow-hidden">
                        <div
                          className="h-full bg-gradient-to-r from-emerald-400 to-cyan-400 transition-all duration-75"
                          style={{ width: `${Math.max(10, audioLevel)}%` }}
                        />
                      </div>
                    </div>
                  )}

                  <span className="px-3 py-1 rounded-full bg-black/70 backdrop-blur-md text-white font-bold border border-white/10">
                    00:{timerCount < 10 ? `0${timerCount}` : timerCount} / 00:30
                  </span>
                </div>
              </div>

              {/* Prompt Script Cue Overlay when recording */}
              {isRecording && (
                <div className="absolute bottom-16 inset-x-6 text-center z-10 pointer-events-none">
                  <div className="px-4 py-2 rounded-2xl bg-black/80 backdrop-blur-md border border-white/15 text-xs text-slate-200 inline-block shadow-lg">
                    "Hi! My name is <strong>{firstName}</strong> and I am ready to learn with CodeRa."
                  </div>
                </div>
              )}

              {/* Bottom Recording Control Buttons */}
              <div className="absolute bottom-4 flex items-center gap-3 z-10">
                {!isRecording ? (
                  <button
                    type="button"
                    onClick={handleStartRecord}
                    className="px-6 py-2.5 rounded-full bg-rose-600 hover:bg-rose-500 text-white font-bold text-xs shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2"
                  >
                    <span className="w-2.5 h-2.5 rounded-full bg-white animate-pulse" />
                    <span>{recordedBlobUrl ? 'Re-Record Video' : 'Start Recording (30s)'}</span>
                  </button>
                ) : (
                  <button
                    type="button"
                    onClick={handleStopRecord}
                    className="px-6 py-2.5 rounded-full bg-slate-800 hover:bg-slate-700 text-white font-bold text-xs shadow-lg transition-transform hover:scale-105 active:scale-95 cursor-pointer flex items-center gap-2 border border-slate-600"
                  >
                    <Square className="w-3.5 h-3.5 fill-rose-500 text-rose-500" />
                    <span>Finish Recording</span>
                  </button>
                )}
              </div>
            </div>

            {/* Error / Permission Fallback Banner */}
            {cameraError && (
              <div className="p-3.5 rounded-2xl bg-amber-950/40 border border-amber-800/60 text-xs text-amber-200 flex items-start justify-between gap-3">
                <div className="flex items-start gap-2.5">
                  <ShieldAlert className="w-4 h-4 text-amber-400 shrink-0 mt-0.5" />
                  <div className="space-y-1">
                    <p>{cameraError}</p>
                    <p className="text-[11px] text-amber-300/80">
                      You can continue seamlessly using our simulated camera mode.
                    </p>
                  </div>
                </div>

                <button
                  type="button"
                  onClick={startCamera}
                  className="px-3 py-1.5 rounded-xl bg-amber-500/20 text-amber-300 font-bold hover:bg-amber-500/30 text-xs shrink-0 cursor-pointer"
                >
                  Retry Camera
                </button>
              </div>
            )}

            {/* Action Submit Button */}
            <div className="pt-2">
              <button
                type="button"
                disabled={!recordedBlobUrl}
                onClick={handleSubmitVideo}
                className={`w-full py-4 rounded-2xl text-white font-bold text-sm shadow-xl transition-all flex items-center justify-center gap-2 ${
                  recordedBlobUrl
                    ? 'hover:scale-102 active:scale-98 cursor-pointer opacity-100'
                    : 'opacity-50 cursor-not-allowed'
                }`}
                style={{ backgroundColor: 'var(--color-primary-blue)' }}
              >
                <span>Submit Video</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>

          {/* Right Sidebar Guidance (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            {/* "What to say" script prompt */}
            <div
              className="rounded-3xl p-6 border shadow-xl space-y-3"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <h3 className="font-bold text-sm uppercase tracking-wider text-blue-600 flex items-center gap-2">
                <Mic className="w-4 h-4" />
                <span>What to say:</span>
              </h3>
              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs italic leading-relaxed text-blue-900 dark:text-blue-300">
                "Hi! My name is <strong>{firstName}</strong>. I just finished the placement test. I am excited to explore Python loops and tactile robot coding on CodeRa!"
              </div>
            </div>

            {/* "Tips for a great video" checklist */}
            <div
              className="rounded-3xl p-6 border shadow-xl space-y-3"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <h3 className="font-bold text-sm uppercase tracking-wider text-emerald-600 flex items-center gap-2">
                <CheckCircle2 className="w-4 h-4" />
                <span>Tips for a great video</span>
              </h3>
              <ul className="text-xs space-y-2" style={{ color: 'var(--color-text-muted)' }}>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Sit in a quiet, well-lit room.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Look directly into the camera.</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600" />
                  <span>Speak at your comfortable pace.</span>
                </li>
              </ul>
            </div>

            {/* Accessibility Support Note */}
            <div
              className="rounded-3xl p-5 border text-xs space-y-1.5"
              style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
            >
              <strong className="block font-bold" style={{ color: 'var(--color-text)' }}>
                Accessibility Support Note:
              </strong>
              <p className="text-[11px] leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                Non-verbal communicators can use tech sign language gestures or have their parent/guardian introduce them.
              </p>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

/* ========================================================================= */
/* VIEW 6: VIDEO SUBMITTED! (PENDING REVIEW) (Screenshot 52)                 */
/* ========================================================================= */
export const PendingReviewPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, learners, activeLearnerId } = useMockData();
  const currentLearner = learners.find((l) => l.id === activeLearnerId) || learners[0];
  const firstName = currentLearner?.name?.split(' ')[0] || 'Ahmed';

  return (
    <div className="min-h-[calc(100vh-4.5rem)] transition-colors" style={{ backgroundColor: 'var(--color-bg)' }}>
      <StudentHeader activeNav="assessment" studentName={firstName} />

      <main className="max-w-2xl mx-auto p-4 sm:p-6 lg:p-10 space-y-6 flex flex-col items-center justify-center">
        <div className="w-full flex items-center justify-start">
          <UniversalBackButton to="/video-verification" label="Back to Video Verification" />
        </div>

        <div
          className="w-full rounded-3xl p-8 sm:p-12 border shadow-2xl text-center space-y-6 animate-in zoom-in-95"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          {/* Status Badge */}
          <div className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
            <Clock className="w-3.5 h-3.5 animate-spin" />
            <span>PENDING REVIEW</span>
          </div>

          <div className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-amber-600 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-900 shadow-inner">
            <Clock className="w-10 h-10 animate-pulse" />
          </div>

          <div className="space-y-2">
            <h1 className="text-3xl font-black font-serif tracking-tight" style={{ color: 'var(--color-text)' }}>
              Video Submitted!
            </h1>
            <p className="text-xs sm:text-sm leading-relaxed max-w-md mx-auto" style={{ color: 'var(--color-text-muted)' }}>
              Our admissions and accessibility team is currently reviewing your verification video to confirm your profile matches the curriculum track. This usually takes <strong>1-2 business days</strong>.
            </p>
          </div>

          {/* Journey Progress Timeline */}
          <div className="p-5 rounded-2xl border text-start space-y-3" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
            <span className="text-[11px] font-bold uppercase tracking-wider text-slate-500 block">
              Onboarding Journey
            </span>
            <div className="space-y-2.5 text-xs">
              <div className="flex items-center gap-3 text-emerald-600 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Assessment Completed (Level 2 Placed)</span>
              </div>
              <div className="flex items-center gap-3 text-emerald-600 font-bold">
                <CheckCircle2 className="w-4 h-4 shrink-0" />
                <span>Verification Video Submitted</span>
              </div>
              <div className="flex items-center gap-3 text-amber-600 font-bold">
                <Clock className="w-4 h-4 shrink-0 animate-spin" />
                <span>Admin Review (Current)</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Lock className="w-4 h-4 shrink-0" />
                <span>Payment & Enrollment</span>
              </div>
              <div className="flex items-center gap-3 text-slate-400">
                <Lock className="w-4 h-4 shrink-0" />
                <span>Start Learning & Projects</span>
              </div>
            </div>
          </div>

          {/* Buttons: Go to Home & Payment */}
          <div className="flex flex-col sm:flex-row gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/')}
              className="flex-1 py-3.5 rounded-2xl border font-bold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              Go to Home
            </button>
            <button
              type="button"
              onClick={() => navigate('/payment-required')}
              className="flex-1 py-3.5 rounded-2xl text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-102 flex items-center justify-center gap-2 cursor-pointer"
              style={{ backgroundColor: 'var(--color-primary-green)' }}
            >
              <span>Payment</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </div>
        </div>
      </main>
    </div>
  );
};

/* ========================================================================= */
/* VIEW 7: ALMOST THERE! (PAYMENT REQUIRED) (Screenshot 53)                   */
/* ========================================================================= */
export const PaymentRequiredPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, learners, activeLearnerId, payLearnerCourse } = useMockData();
  const currentLearner = learners.find((l) => l.id === activeLearnerId) || learners[0];
  const firstName = currentLearner?.name?.split(' ')[0] || 'Ahmed';

  const [parentNotified, setParentNotified] = useState(false);
  const [isProcessing, setIsProcessing] = useState(false);

  const modules = [
    { title: 'Module 1: Intro to Turtle Canvas & Coordinates', lessons: '12 Lessons' },
    { title: 'Module 2: Sensory Drawing with Turtles', lessons: '16 Lessons' },
    { title: 'Module 3: Conditional Logic & Sensor Loops', lessons: '20 Lessons' },
    { title: 'Module 4: Interactive Project Capstone', lessons: '20 Lessons' },
  ];

  const handleNotifyParent = () => {
    setParentNotified(true);
    setTimeout(() => setParentNotified(false), 3000);
  };

  const handleActivatePayment = () => {
    setIsProcessing(true);
    setTimeout(() => {
      if (currentLearner) {
        payLearnerCourse(currentLearner.id, 180);
      }
      setIsProcessing(false);
      navigate('/student-dashboard');
    }, 1000);
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] transition-colors" style={{ backgroundColor: 'var(--color-bg)' }}>
      <StudentHeader activeNav="learning" studentName={firstName} />

      <main className="max-w-5xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex items-center justify-start">
          <UniversalBackButton to="/pending-review" label="Back to Review Status" />
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Recommended Pathway Card (7 Columns) */}
          <div
            className="lg:col-span-7 rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-6"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <div className="space-y-2 border-b pb-4" style={{ borderColor: 'var(--color-border)' }}>
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                <CheckCircle2 className="w-3.5 h-3.5" />
                <span>VERIFICATION ACCEPTED!</span>
              </span>
              <h1 className="text-3xl font-black font-serif tracking-tight" style={{ color: 'var(--color-text)' }}>
                Almost There!
              </h1>
              <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                Your profile is verified. {firstName}'s sensory assessment placed him perfectly on our foundational programming track.
              </p>
            </div>

            {/* Pathway Card */}
            <div className="p-5 rounded-3xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 space-y-2">
              <div className="flex items-center justify-between">
                <span className="text-xs font-bold uppercase tracking-wider text-blue-700 dark:text-blue-300">Recommended Track</span>
                <span className="text-xs font-bold text-blue-600">68 Lessons</span>
              </div>
              <h2 className="text-2xl font-black font-serif text-blue-950 dark:text-white">
                Level 2 — Python Fundamentals
              </h2>
              <p className="text-xs leading-relaxed text-blue-900 dark:text-blue-200">
                Interactive sensory-adapted curriculum with turtle graphics, loops, and logic building.
              </p>
            </div>

            {/* Locked Curriculum Modules List */}
            <div className="space-y-2.5">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">
                Curriculum Modules Included:
              </span>
              {modules.map((m, idx) => (
                <div
                  key={idx}
                  className="p-3.5 rounded-2xl border flex items-center justify-between text-xs"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                >
                  <div className="flex items-center gap-2.5">
                    <Lock className="w-4 h-4 text-slate-400" />
                    <span className="font-semibold" style={{ color: 'var(--color-text)' }}>{m.title}</span>
                  </div>
                  <span className="text-slate-400">{m.lessons}</span>
                </div>
              ))}
            </div>
          </div>

          {/* Right Column: Activate Learning Pathway (5 Columns) */}
          <div
            className="lg:col-span-5 rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-6"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <div className="space-y-1 border-b pb-4" style={{ borderColor: 'var(--color-border)' }}>
              <h2 className="text-lg font-bold font-serif" style={{ color: 'var(--color-text)' }}>
                Activate Learning Pathway
              </h2>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                One annual fee unlocks the entire track with unlimited mentor support.
              </p>
            </div>

            {/* Annual Fee Card */}
            <div className="p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
              <span className="text-xs font-bold text-emerald-800 dark:text-emerald-200 block">Annual Enrollment:</span>
              <div className="text-3xl font-black text-emerald-600 dark:text-emerald-400">
                $180 <span className="text-xs font-semibold text-slate-500">/ year (recurring)</span>
              </div>
              <p className="text-[11px] text-emerald-700 dark:text-emerald-300">
                Includes all 68 lessons, project sandbox, and certified verification.
              </p>
            </div>

            <div className="p-4 rounded-2xl border space-y-1.5 text-xs" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
              <span className="font-bold text-blue-600 block">Parent Payment Instructions:</span>
              <p className="text-[11px] leading-relaxed text-slate-500">
                This payment can be completed by your parent/guardian via their CodeRa portal or credit card.
              </p>
            </div>

            {parentNotified && (
              <div className="p-3 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-800 dark:text-blue-300 text-xs font-bold flex items-center gap-2 animate-in fade-in">
                <Check className="w-4 h-4" />
                <span>Notification sent to parent email & SMS!</span>
              </div>
            )}

            {/* Action Buttons */}
            <div className="space-y-3 pt-2">
              <button
                type="button"
                onClick={handleNotifyParent}
                className="w-full py-3.5 rounded-2xl border font-bold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              >
                <Send className="w-4 h-4 text-blue-600" />
                <span>Notify My Parent</span>
              </button>

              <button
                type="button"
                onClick={handleActivatePayment}
                disabled={isProcessing}
                className="w-full py-4 rounded-2xl text-white font-bold text-xs sm:text-sm shadow-xl transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                style={{ backgroundColor: 'var(--color-primary-green)' }}
              >
                <CreditCard className="w-4 h-4" />
                <span>{isProcessing ? 'Activating Access...' : 'Check Payment Status & Activate'}</span>
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

/* ========================================================================= */
/* VIEW 8: STUDENT DASHBOARD (My Learning) (Screenshot 54)                   */
/* ========================================================================= */
export const StudentDashboardPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, learners, activeLearnerId } = useMockData();
  const currentLearner = learners.find((l) => l.id === activeLearnerId) || learners[0];
  const firstName = currentLearner?.name?.split(' ')[0] || 'Ahmed';

  const modules = [
    { title: 'Module 1: Intro to Turtle Canvas & Coordinates', progress: 100, lessons: '12 of 12 Lessons', status: 'Completed' },
    { title: 'Module 2: Sensory Drawing with Turtles', progress: 40, lessons: 'Lesson 3 of 8 (40% Completed)', status: 'In Progress', active: true },
    { title: 'Module 3: Conditional Logic & Sensor Loops', progress: 0, lessons: '0 of 20 Lessons', status: 'Locked' },
    { title: 'Module 4: Interactive Project Capstone', progress: 0, lessons: '0 of 20 Lessons', status: 'Locked' },
  ];

  return (
    <div className="min-h-[calc(100vh-4.5rem)] transition-colors" style={{ backgroundColor: 'var(--color-bg)' }}>
      <StudentHeader activeNav="learning" studentName={firstName} />

      <main className="max-w-6xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6 animate-in fade-in">
        <div className="flex items-center justify-start">
          <UniversalBackButton to="/" label="Back to Home" />
        </div>

        {/* Status Tag & Greeting Header */}
        <div className="space-y-2">
          <div className="flex flex-wrap items-center gap-2">
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              LEVEL 2 — FOUNDATIONAL
            </span>
            <span className="px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              YEAR ACCESS ACTIVE
            </span>
          </div>

          <h1 className="text-3xl sm:text-4xl font-black font-serif tracking-tight" style={{ color: 'var(--color-text)' }}>
            Welcome back, {firstName}!
          </h1>
          <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>
            You are making incredible progress. Let's resume your coding journey today.
          </p>
        </div>

        {/* Progress Stats Card (3 Metrics) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          <div
            className="p-6 rounded-3xl border shadow-lg space-y-2"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Completed Lessons</span>
              <BookOpen className="w-5 h-5 text-blue-600" />
            </div>
            <span className="text-3xl font-black" style={{ color: 'var(--color-text)' }}>11 of 48</span>
            <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '23%' }} />
            </div>
          </div>

          <div
            className="p-6 rounded-3xl border shadow-lg space-y-2"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Time Coding</span>
              <Clock className="w-5 h-5 text-emerald-600" />
            </div>
            <span className="text-3xl font-black" style={{ color: 'var(--color-text)' }}>4.8 Hours</span>
            <span className="text-[11px] text-emerald-600 font-bold block">+1.2 hours this week</span>
          </div>

          <div
            className="p-6 rounded-3xl border shadow-lg space-y-2"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-center justify-between">
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500">Active Projects</span>
              <Award className="w-5 h-5 text-purple-600" />
            </div>
            <span className="text-3xl font-black" style={{ color: 'var(--color-text)' }}>2 Projects</span>
            <span className="text-[11px] text-purple-600 font-bold block">Turtle Drawing & Sensor Loop</span>
          </div>
        </div>

        {/* Current Lesson Hero Card */}
        <div
          className="rounded-3xl p-6 sm:p-8 border-2 border-blue-500/40 shadow-xl space-y-6"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-primary-blue)' }}
        >
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4 border-b pb-4" style={{ borderColor: 'var(--color-border)' }}>
            <div>
              <span className="text-xs font-bold uppercase tracking-wider text-blue-600 block">Resume Active Unit</span>
              <h2 className="text-2xl font-black font-serif" style={{ color: 'var(--color-text)' }}>
                Module 2: Sensory Drawing with Turtles
              </h2>
            </div>
            <span className="px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300 w-fit">
              Lesson 3 of 8 (40% Completed)
            </span>
          </div>

          <div className="space-y-2">
            <div className="flex justify-between text-xs text-slate-500">
              <span>Unit Progress</span>
              <span>40%</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-blue-600 rounded-full" style={{ width: '40%' }} />
            </div>
          </div>

          <div className="flex flex-wrap items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/learning-content')}
              className="px-6 py-3.5 rounded-2xl text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-102 active:scale-98 flex items-center gap-2 cursor-pointer"
              style={{ backgroundColor: 'var(--color-primary-green)' }}
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Continue Learning</span>
            </button>

            <button
              type="button"
              onClick={() => navigate('/learning-content')}
              className="px-5 py-3.5 rounded-2xl border font-bold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              View Playground
            </button>
          </div>
        </div>

        {/* Level 2 Modules List */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-serif" style={{ color: 'var(--color-text)' }}>
            Level 2 Course Modules
          </h2>

          <div className="space-y-3">
            {modules.map((m, idx) => (
              <div
                key={idx}
                className="p-5 rounded-3xl border shadow-md flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div className="space-y-1">
                  <div className="flex items-center gap-2.5">
                    {m.status === 'Completed' ? (
                      <CheckCircle2 className="w-5 h-5 text-emerald-500 shrink-0" />
                    ) : m.status === 'In Progress' ? (
                      <Clock className="w-5 h-5 text-blue-500 shrink-0" />
                    ) : (
                      <Lock className="w-5 h-5 text-slate-400 shrink-0" />
                    )}
                    <h3 className="font-bold text-sm sm:text-base" style={{ color: 'var(--color-text)' }}>
                      {m.title}
                    </h3>
                  </div>
                  <span className="text-xs text-slate-500 pl-7.5 block">{m.lessons}</span>
                </div>

                <div className="flex items-center gap-4">
                  {m.progress > 0 && (
                    <div className="w-28 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${m.progress}%` }} />
                    </div>
                  )}

                  <button
                    type="button"
                    onClick={() => navigate('/learning-content')}
                    disabled={m.status === 'Locked'}
                    className={`px-4 py-2 rounded-xl text-xs font-bold transition-colors cursor-pointer ${
                      m.status === 'Locked'
                        ? 'border border-slate-300 dark:border-slate-800 text-slate-400 cursor-not-allowed'
                        : 'bg-blue-600 text-white hover:bg-blue-500 shadow-sm'
                    }`}
                  >
                    {m.status === 'Completed' ? 'Review' : m.status === 'In Progress' ? 'Resume' : 'Locked'}
                  </button>
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Quick Demo Previews */}
        <div className="flex justify-end gap-3 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <button
            type="button"
            onClick={() => navigate('/level-complete')}
            className="text-xs font-bold text-blue-600 hover:underline cursor-pointer"
          >
            Preview Level Complete →
          </button>
          <button
            type="button"
            onClick={() => navigate('/certificate')}
            className="text-xs font-bold text-emerald-600 hover:underline cursor-pointer"
          >
            Preview Certificate →
          </button>
        </div>
      </main>
    </div>
  );
};

/* ========================================================================= */
/* VIEW 9: LEARNING CONTENT (Lesson 3 - Python Fundamentals) (Screenshot 55) */
/* ========================================================================= */
export const LearningContentPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, learners, activeLearnerId } = useMockData();
  const currentLearner = learners.find((l) => l.id === activeLearnerId) || learners[0];
  const firstName = currentLearner?.name?.split(' ')[0] || 'Ahmed';

  const [code, setCode] = useState(
    `import turtle\n\n# Initialize turtle\nt = turtle.Turtle()\nt.speed(3)\nt.color("blue")\n\n# Draw sensory square\nfor side in range(4):\n    t.forward(80)\n    t.right(90)`
  );
  const [isRunning, setIsRunning] = useState(false);
  const [outputSteps, setOutputSteps] = useState(4);
  const [signLanguageActive, setSignLanguageActive] = useState(true);
  const [activeTab, setActiveTab] = useState<'canvas' | 'camera_gesture'>('camera_gesture');
  const [gestureChallengePassed, setGestureChallengePassed] = useState(false);

  const handleRunCode = () => {
    setIsRunning(true);
    setOutputSteps(0);
    let s = 0;
    const interval = setInterval(() => {
      s += 1;
      setOutputSteps(s);
      if (s >= 4) {
        clearInterval(interval);
        setIsRunning(false);
      }
    }, 400);
  };

  const handleGestureValidated = (gesture: string) => {
    setGestureChallengePassed(true);
    handleRunCode();
    confetti({
      particleCount: 100,
      spread: 80,
      origin: { y: 0.6 },
      colors: ['#3b82f6', '#10b981', '#8b5cf6', '#facc15'],
    });
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] transition-colors" style={{ backgroundColor: 'var(--color-bg)' }}>
      <StudentHeader activeNav="learning" studentName={firstName} />

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
          <UniversalBackButton to="/student-dashboard" label="Back to Dashboard" />

          {/* Breadcrumb Navigation */}
          <div className="flex items-center gap-2 text-xs font-bold text-slate-500">
            <button type="button" onClick={() => navigate('/student-dashboard')} className="hover:underline text-blue-600 cursor-pointer">
              Dashboard
            </button>
            <span>/</span>
            <span className="text-slate-700 dark:text-slate-300">Level 2</span>
            <span>/</span>
            <span className="text-emerald-600">Lesson 3</span>
          </div>
        </div>

        {/* Title & Subtitle */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <div className="flex items-center gap-2 mb-1">
              <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                AI Vision & Tactile Sign Unit
              </span>
              {gestureChallengePassed && (
                <span className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 flex items-center gap-1">
                  <CheckCircle2 className="w-3 h-3 text-emerald-600" />
                  <span>Loop Calibrated</span>
                </span>
              )}
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif" style={{ color: 'var(--color-text)' }}>
              Python Fundamentals — Lesson 3
            </h1>
            <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
              Master variable structures, tactile loop coordinates, and live sign language finger calibration.
            </p>
          </div>

          {/* Key Concepts Pills */}
          <div className="flex flex-wrap gap-2">
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
              Variables
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
              Cartesian Coordinates
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
              range(4) Loop
            </span>
            <span className="px-2.5 py-1 rounded-full text-[11px] font-bold bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
              Finger Tracking
            </span>
          </div>
        </div>

        {/* Interactive Code & Vision Sandbox */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6">
          {/* Left Column: Python Editor (6 Columns) */}
          <div
            className="lg:col-span-6 rounded-3xl border shadow-xl p-5 space-y-4 flex flex-col justify-between"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex items-center gap-2">
                <Code2 className="w-4 h-4 text-blue-600" />
                <span className="text-xs font-mono font-bold" style={{ color: 'var(--color-text)' }}>script.py</span>
              </div>
              <button
                type="button"
                onClick={handleRunCode}
                disabled={isRunning}
                className="px-4 py-2 rounded-xl text-white font-bold text-xs bg-emerald-600 hover:bg-emerald-500 shadow-md transition-all flex items-center gap-1.5 cursor-pointer disabled:opacity-50"
              >
                <Play className="w-3.5 h-3.5 fill-white" />
                <span>{isRunning ? 'Drawing...' : 'Run Simulation'}</span>
              </button>
            </div>

            <textarea
              rows={12}
              value={code}
              onChange={(e) => setCode(e.target.value)}
              className="w-full p-4 rounded-2xl bg-slate-900 text-slate-100 font-mono text-xs sm:text-sm border border-slate-800 outline-none resize-none leading-relaxed shadow-inner"
            />

            <div className="p-3.5 rounded-2xl bg-slate-100 dark:bg-slate-900 text-xs font-mono text-slate-600 dark:text-slate-400 flex items-center justify-between">
              <span>{gestureChallengePassed ? '✅ Sign loop calibrated: 4 cycles' : 'Output terminal: OK (Exit code 0)'}</span>
              <span>Python 3.12</span>
            </div>
          </div>

          {/* Right Column: Dynamic Tabs (Camera Hand Tracking / Turtle Sandbox) */}
          <div
            className="lg:col-span-6 rounded-3xl border shadow-xl p-5 space-y-4 relative flex flex-col justify-between"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            {/* View Switcher Tabs */}
            <div className="flex items-center justify-between border-b pb-3 gap-2" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex items-center gap-1.5 p-1 rounded-2xl bg-slate-100 dark:bg-slate-900 text-xs font-bold">
                <button
                  type="button"
                  onClick={() => setActiveTab('camera_gesture')}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'camera_gesture'
                      ? 'bg-purple-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Hand className="w-3.5 h-3.5" />
                  <span>Sign & Gesture Vision</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('canvas')}
                  className={`px-3 py-1.5 rounded-xl transition-all cursor-pointer flex items-center gap-1.5 ${
                    activeTab === 'canvas'
                      ? 'bg-emerald-600 text-white shadow-xs'
                      : 'text-slate-600 dark:text-slate-400 hover:text-slate-900 dark:hover:text-white'
                  }`}
                >
                  <Terminal className="w-3.5 h-3.5" />
                  <span>Turtle Canvas</span>
                </button>
              </div>

              {/* Sign Language Assistance Toggle */}
              <button
                type="button"
                onClick={() => setSignLanguageActive(!signLanguageActive)}
                className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                  signLanguageActive
                    ? 'bg-purple-600 text-white shadow-sm'
                    : 'bg-slate-100 dark:bg-slate-800 text-slate-600'
                }`}
              >
                🤟 Sign Camera {signLanguageActive ? 'ON' : 'OFF'}
              </button>
            </div>

            {/* TAB 1: Live Sign Language & Gesture Detection Panel */}
            {activeTab === 'camera_gesture' && (
              <div className="space-y-3">
                <div className="p-3 rounded-2xl bg-purple-50 dark:bg-purple-950/40 border border-purple-200 dark:border-purple-900 text-xs text-purple-900 dark:text-purple-200 space-y-1">
                  <div className="flex items-center gap-1.5 font-bold">
                    <Sparkles className="w-4 h-4 text-purple-600 dark:text-purple-400" />
                    <span>Tactile & Sign Language Calibration Challenge:</span>
                  </div>
                  <p className="leading-relaxed">
                    Show <strong>4 fingers</strong> to your webcam (or click 🖐️ 4 Fingers below) to confirm the 4 loop steps in <code className="bg-purple-200/60 dark:bg-purple-900/60 px-1 py-0.5 rounded font-mono">range(4)</code>!
                  </p>
                </div>

                <LiveGestureTracker
                  targetGesture="4_fingers"
                  onGestureValidated={handleGestureValidated}
                />
              </div>
            )}

            {/* TAB 2: Turtle Canvas Sandbox */}
            {activeTab === 'canvas' && (
              <div
                className="relative h-72 sm:h-80 rounded-2xl border flex items-center justify-center overflow-hidden"
                style={{ backgroundColor: '#0f172a' }}
              >
                {/* SVG Canvas drawing simulation */}
                <svg className="w-full h-full" viewBox="0 0 300 240">
                  {/* Grid lines */}
                  <line x1="0" y1="120" x2="300" y2="120" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />
                  <line x1="150" y1="0" x2="150" y2="240" stroke="#1e293b" strokeWidth="1" strokeDasharray="4 4" />

                  {/* Animated Square Path */}
                  {outputSteps >= 1 && <line x1="110" y1="80" x2="190" y2="80" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />}
                  {outputSteps >= 2 && <line x1="190" y1="80" x2="190" y2="160" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />}
                  {outputSteps >= 3 && <line x1="190" y1="160" x2="110" y2="160" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />}
                  {outputSteps >= 4 && <line x1="110" y1="160" x2="110" y2="80" stroke="#3b82f6" strokeWidth="4" strokeLinecap="round" />}

                  {/* Turtle icon at current position */}
                  <circle cx={outputSteps === 1 ? 190 : outputSteps === 2 ? 190 : outputSteps === 3 ? 110 : 110} cy={outputSteps === 1 ? 80 : outputSteps === 2 ? 160 : outputSteps === 3 ? 160 : 80} r="6" fill="#10b981" />
                </svg>

                {/* Picture-in-Picture Sign Language Avatar */}
                {signLanguageActive && (
                  <div
                    onClick={() => setActiveTab('camera_gesture')}
                    className="absolute top-3 right-3 w-28 h-24 rounded-2xl bg-black/80 backdrop-blur-md border border-purple-500/50 p-2 shadow-2xl flex flex-col items-center justify-center text-center cursor-pointer hover:border-purple-400 transition-all animate-in fade-in"
                    title="Click to expand Sign Language Camera"
                  >
                    <span className="text-2xl animate-bounce">🤟</span>
                    <span className="text-[9px] font-bold text-purple-300 mt-1 uppercase">AI Vision PIP</span>
                  </div>
                )}
              </div>
            )}

            {/* Description / Instructions */}
            <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border text-xs leading-relaxed" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
              <strong>Lesson Objective:</strong> Program the turtle to draw geometric boundaries using Python's <code className="font-mono text-blue-600 font-bold">range(4)</code> loop, validated via live sign language gesture calibration.
            </div>
          </div>
        </div>

        {/* Bottom Navigation */}
        <div className="flex items-center justify-between gap-4 pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
          <button
            type="button"
            onClick={() => navigate('/student-dashboard')}
            className="py-3 px-5 rounded-2xl border font-bold text-xs flex items-center gap-2 hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
          >
            <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
            <span>Previous Lesson</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/level-complete')}
            className={`py-3 px-6 rounded-2xl text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-102 active:scale-98 flex items-center gap-2 cursor-pointer ${
              gestureChallengePassed ? 'ring-2 ring-emerald-400 shadow-emerald-500/30' : ''
            }`}
            style={{ backgroundColor: 'var(--color-primary-green)' }}
          >
            <span>Mark Complete & Continue</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </main>
    </div>
  );
};

/* ========================================================================= */
/* VIEW 10: LEVEL COMPLETE! (Screenshot 56)                                  */
/* ========================================================================= */
export const LevelCompletePage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, learners, activeLearnerId } = useMockData();
  const currentLearner = learners.find((l) => l.id === activeLearnerId) || learners[0];
  const firstName = currentLearner?.name?.split(' ')[0] || 'Ahmed';

  return (
    <div className="min-h-[calc(100vh-4.5rem)] transition-colors" style={{ backgroundColor: 'var(--color-bg)' }}>
      <StudentHeader activeNav="learning" studentName={firstName} />

      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-10 space-y-6 animate-in zoom-in-95">
        <div className="flex items-center justify-start">
          <UniversalBackButton to="/student-dashboard" label="Back to Level / Dashboard" />
        </div>

        <div
          className="rounded-3xl p-8 sm:p-12 border shadow-2xl space-y-8 text-center"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          {/* Victory Banner & Trophy Illustration */}
          <div
            className="w-24 h-24 sm:w-28 sm:h-28 rounded-3xl mx-auto flex items-center justify-center text-white shadow-2xl shadow-emerald-500/30 animate-bounce"
            style={{ backgroundColor: 'var(--color-primary-green)' }}
          >
            <Trophy className="w-12 h-12" />
          </div>

          <div className="space-y-3 max-w-xl mx-auto">
            <span className="inline-block px-4 py-1.5 rounded-full text-xs font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
              TRACK COMPLETE!
            </span>
            <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight" style={{ color: 'var(--color-text)' }}>
              Level 2 Complete!
            </h1>
            <p className="text-xs sm:text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              Amazing job, {firstName}! You've mastered Python drawing and visual coordinate fundamentals. Every structural line you coded has built a solid base for advanced projects.
            </p>
          </div>

          {/* Performance Metrics Cards (3 Cards) */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
            <div className="p-6 rounded-3xl border shadow-md space-y-1" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Lessons Mastered</span>
              <span className="text-3xl font-black text-emerald-600">48 / 48</span>
              <span className="text-[11px] text-emerald-600 font-bold block">100% Curriculum</span>
            </div>

            <div className="p-6 rounded-3xl border shadow-md space-y-1" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Total Time Coding</span>
              <span className="text-3xl font-black text-blue-600">8.4 Hours</span>
              <span className="text-[11px] text-blue-600 font-bold block">Hands-on Sandbox</span>
            </div>

            <div className="p-6 rounded-3xl border shadow-md space-y-1" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
              <span className="text-xs font-bold uppercase tracking-wider text-slate-500 block">Assessment Score</span>
              <span className="text-3xl font-black text-purple-600">94%</span>
              <span className="text-[11px] text-purple-600 font-bold block">Top 5% Cohort</span>
            </div>
          </div>

          {/* Certificate Action Card */}
          <div className="p-6 sm:p-8 rounded-3xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 space-y-4 max-w-xl mx-auto">
            <h3 className="text-lg font-bold font-serif text-emerald-950 dark:text-emerald-200">
              Your official Certificate is ready to view & share!
            </h3>
            <p className="text-xs text-emerald-800 dark:text-emerald-300">
              Verified by the CodeRa Inclusive Computing Board with a unique cryptographic verification ID.
            </p>

            <div className="flex flex-col sm:flex-row gap-3 pt-2">
              <button
                type="button"
                onClick={() => navigate('/certificate')}
                className="flex-1 py-4 rounded-2xl text-white font-bold text-sm shadow-md transition-all hover:scale-105 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                style={{ backgroundColor: 'var(--color-primary-green)' }}
              >
                <Award className="w-4 h-4" />
                <span>View Certificate</span>
              </button>

              <button
                type="button"
                onClick={() => navigate('/student-dashboard')}
                className="flex-1 py-4 rounded-2xl border font-bold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              >
                Continue to Level 3
              </button>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};

/* ========================================================================= */
/* VIEW 11: OFFICIAL CERTIFICATE OF COMPLETION (Screenshot 57)               */
/* ========================================================================= */
export const StudentCertificatePage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, learners, activeLearnerId } = useMockData();
  const currentLearner = learners.find((l) => l.id === activeLearnerId) || learners[0];
  const fullName = currentLearner?.name || 'Ahmed Hassan';
  const firstName = fullName.split(' ')[0];

  const [copied, setCopied] = useState(false);
  const [downloadToast, setDownloadToast] = useState(false);

  const handleDownload = () => {
    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 3000);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2000);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] transition-colors" style={{ backgroundColor: 'var(--color-bg)' }}>
      <StudentHeader activeNav="learning" studentName={firstName} />

      <main className="max-w-4xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Action Toolbar */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <UniversalBackButton to="/student-dashboard" label="Back to Level / Dashboard" />

          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={handleDownload}
              className="px-5 py-2.5 rounded-2xl text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 flex items-center gap-2 cursor-pointer"
              style={{ backgroundColor: 'var(--color-primary-green)' }}
            >
              <Download className="w-4 h-4" />
              <span>Download PDF</span>
            </button>

            <button
              type="button"
              onClick={handleShare}
              className="px-4 py-2.5 rounded-2xl border font-bold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              <Share2 className="w-4 h-4" />
              <span>{copied ? 'Link Copied!' : 'Share Achievement'}</span>
            </button>
          </div>
        </div>

        {downloadToast && (
          <div className="p-3.5 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center justify-center gap-2 animate-in fade-in">
            <CheckCircle2 className="w-4 h-4" />
            <span>Official High-Resolution PDF certificate generated and downloaded!</span>
          </div>
        )}

        {/* Certificate Document Card (matching Screenshot 57) */}
        <div
          className="rounded-3xl border-4 p-8 sm:p-14 shadow-2xl relative overflow-hidden text-center space-y-8"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: '#00A86B',
          }}
        >
          {/* Subtle watermark / background accent */}
          <div className="absolute top-0 right-0 w-64 h-64 bg-emerald-500/5 rounded-full blur-3xl pointer-events-none" />
          <div className="absolute bottom-0 left-0 w-64 h-64 bg-blue-500/5 rounded-full blur-3xl pointer-events-none" />

          {/* Certificate Header */}
          <div className="space-y-2">
            <div className="w-16 h-16 rounded-2xl mx-auto bg-emerald-600 text-white flex items-center justify-center shadow-xl">
              <Award className="w-9 h-9" />
            </div>
            <span className="text-xs font-mono font-bold tracking-widest text-emerald-600 uppercase block">
              CodeRa Adaptive Computer Science Academy
            </span>
            <h1 className="text-2xl sm:text-4xl font-black font-serif tracking-tight" style={{ color: 'var(--color-text)' }}>
              Certificate of Completion
            </h1>
          </div>

          {/* Recipient Dynamic Content */}
          <div className="space-y-3 max-w-xl mx-auto">
            <p className="text-xs text-slate-500 italic">This is proudly presented to</p>
            <div className="text-3xl sm:text-5xl font-black font-serif text-blue-600 border-b-2 border-blue-500/30 pb-3">
              {fullName}
            </div>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              For successfully mastering all standard-aligned curricula, tactile loop mechanics, and coordinate programming in:
            </p>
            <div className="inline-block px-4 py-2 rounded-2xl bg-slate-100 dark:bg-slate-900 border text-sm sm:text-base font-bold" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}>
              Python Fundamentals — Level 2
            </div>
          </div>

          {/* Signatures & Verification ID Footer */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-6 pt-8 border-t items-end text-xs" style={{ borderColor: 'var(--color-border)' }}>
            <div className="space-y-1">
              <span className="font-serif italic text-base block text-blue-600">Dr. Sarah Al-Mansoor</span>
              <span className="text-slate-500 text-[11px] block border-t pt-1 border-slate-300 dark:border-slate-700">Lead Curriculum Specialist</span>
            </div>

            <div className="space-y-1">
              <div className="w-12 h-12 rounded-full border-2 border-emerald-500 mx-auto flex items-center justify-center text-[10px] font-black text-emerald-600">
                SEAL
              </div>
              <span className="text-[10px] font-mono text-slate-400">CR-CERT-2026-84920</span>
            </div>

            <div className="space-y-1">
              <span className="font-serif italic text-base block text-emerald-600">Eng. Tariq Al-Hashimi</span>
              <span className="text-slate-500 text-[11px] block border-t pt-1 border-slate-300 dark:border-slate-700">Director of Inclusive Tech</span>
            </div>
          </div>
        </div>
      </main>
    </div>
  );
};
