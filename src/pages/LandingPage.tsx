import React, { useState, useEffect } from 'react';
import { useRouter } from '../router/Router';
import { useMockData } from '../context/MockDataContext';
import { translations } from '../context/translations';
import { LearnPyramid } from '../components/LearnPyramid';
import { RoleJourneyApp } from '../components/roleJourney/RoleJourneyApp';
import {
  Sparkles,
  ArrowRight,
  Shield,
  Layers,
  GraduationCap,
  Users,
  Building2,
  CheckCircle,
  BrainCircuit,
  Bot,
  Laptop,
  Code2,
  Award,
  HeartHandshake,
  Eye,
  Target,
  Compass,
  ChevronDown,
  ChevronUp,
  X,
  CheckCircle2,
  Rocket,
  Heart,
  Zap,
  ArrowLeft,
  Calendar,
  BookOpen,
  ShieldCheck,
  Star,
  Check,
  Activity,
  Lightbulb,
  Sun,
  Volume2,
  Sliders,
  Globe,
} from 'lucide-react';

export const LandingPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, theme, setTheme, toggleHighContrast, setCurrentRole } = useMockData();
  const t = translations[lang];

  // Assistive Dashboard Interactive Mockup States
  const [mockBrightness, setMockBrightness] = useState(50);
  const [mockAudioBalance, setMockAudioBalance] = useState(50);
  const [mockThemeMode, setMockThemeMode] = useState<'light' | 'dim' | 'dark'>('light');
  const [mockScreenReader, setMockScreenReader] = useState(false);
  const [mockHighContrast, setMockHighContrast] = useState(false);
  const [mockSimplifiedMode, setMockSimplifiedMode] = useState(false);
  const [mockTextResizing, setMockTextResizing] = useState(100);
  const [mockHapticFeedback, setMockHapticFeedback] = useState(true);
  const [mockFocusActive, setMockFocusActive] = useState(false);
  const [mockFocusSeconds, setMockFocusSeconds] = useState(25 * 60);
  const [mockNoiseLevel, setMockNoiseLevel] = useState(38);

  // Focus Countdown Timer Effect
  useEffect(() => {
    let interval;
    if (mockFocusActive) {
      interval = setInterval(() => {
        setMockFocusSeconds((prev) => {
          if (prev <= 1) {
            setMockFocusActive(false);
            return 25 * 60;
          }
          return prev - 1;
        });
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [mockFocusActive]);

  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')}`;
  };

  // Web Audio Spatial Panning Feedback
  const playAudioFeedback = (balance: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as unknown as { webkitAudioContext: typeof AudioContext }).webkitAudioContext;
      if (!AudioCtx) return;
      const ctx = new AudioCtx();
      const osc = ctx.createOscillator();
      const gain = ctx.createGain();

      osc.type = 'sine';
      osc.frequency.setValueAtTime(520, ctx.currentTime);
      gain.gain.setValueAtTime(0.06, ctx.currentTime);
      gain.gain.exponentialRampToValueAtTime(0.0001, ctx.currentTime + 0.22);

      if (ctx.createStereoPanner) {
        const panner = ctx.createStereoPanner();
        const panVal = Math.max(-1, Math.min(1, (balance - 50) / 50));
        panner.pan.setValueAtTime(panVal, ctx.currentTime);
        osc.connect(gain);
        gain.connect(panner);
        panner.connect(ctx.destination);
      } else {
        osc.connect(gain);
        gain.connect(ctx.destination);
      }
      osc.onended = () => {
        ctx.close().catch(() => {});
      };
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch {
      // AudioContext autoplay restriction safe catch
    }
  };

  const handleAudioBalanceChange = (newVal: number) => {
    setMockAudioBalance(newVal);
    playAudioFeedback(newVal);
  };

  // Screen Reader Speech Synthesis Voice Output
  const handleToggleScreenReader = () => {
    const nextVal = !mockScreenReader;
    setMockScreenReader(nextVal);

    if (typeof window !== 'undefined' && 'speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      if (nextVal) {
        const text =
          lang === 'ar'
            ? 'تم تفعيل قارئ الشاشة في كوديرا. واجهة سهلة الوصول مجهزة للقراءة الصوتية.'
            : 'Screen reader enabled. CodeRa accessible interface is ready for voice output.';
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
        utterance.rate = 1.0;
        window.speechSynthesis.speak(utterance);
      }
    }
  };

  // Dynamic High Contrast Toggle
  const handleToggleHighContrast = () => {
    const nextVal = !mockHighContrast;
    setMockHighContrast(nextVal);
    if (typeof toggleHighContrast === 'function') {
      toggleHighContrast();
    }
    document.documentElement.classList.toggle('high-contrast-mode', nextVal);
  };

  // Dynamic Simplified Mode
  const handleToggleSimplifiedMode = () => {
    const nextVal = !mockSimplifiedMode;
    setMockSimplifiedMode(nextVal);
    document.documentElement.classList.toggle('simplified-mode', nextVal);
  };

  // Dynamic Adaptive Text Resizing
  const handleTextResizingChange = (val: number) => {
    setMockTextResizing(val);
    if (val === 100) {
      document.documentElement.style.fontSize = '';
    } else {
      document.documentElement.style.fontSize = `${val}%`;
    }
  };

  // Dynamic Interface Theme Switcher
  const handleThemeModeChange = (mode: 'light' | 'dim' | 'dark') => {
    setMockThemeMode(mode);
    if (mode === 'dark') {
      if (typeof setTheme === 'function') setTheme('dark');
      document.documentElement.classList.add('dark');
      document.documentElement.classList.remove('theme-dim');
    } else if (mode === 'light') {
      if (typeof setTheme === 'function') setTheme('light');
      document.documentElement.classList.remove('dark');
      document.documentElement.classList.remove('theme-dim');
    } else {
      // Dim Mode
      if (typeof setTheme === 'function') setTheme('dark');
      document.documentElement.classList.add('dark');
      document.documentElement.classList.add('theme-dim');
    }
  };

  // Haptic Feedback / Vibration
  const handleToggleHaptic = () => {
    const nextVal = !mockHapticFeedback;
    setMockHapticFeedback(nextVal);
    if (nextVal && typeof navigator !== 'undefined' && 'vibrate' in navigator) {
      try {
        navigator.vibrate([60, 40, 60]);
      } catch (e) {}
    }
  };

  // Ambient Noise Level Alert Simulator
  const cycleNoiseLevel = () => {
    const levels = [34, 52, 78, 42];
    const currentIndex = levels.indexOf(mockNoiseLevel);
    const nextIndex = (currentIndex + 1) % levels.length;
    setMockNoiseLevel(levels[nextIndex]);
  };

  // Role Journey modal state
  const [isRoleJourneyOpen, setIsRoleJourneyOpen] = useState(false);
  const [roleJourneyInitialScreen, setRoleJourneyInitialScreen] = useState<'main' | 'builder'>('main');

  // Interactive Role Selection Workspace state (#who-are-you)
  const [roleFlowStep, setRoleFlowStep] = useState<
    'root' | 'builder' | 'mentor' | 'mentor-individual' | 'mentor-organization' | 'teacher-pdp'
  >('root');

  // Teacher Professional Development booking modal state
  const [isTeacherBookingOpen, setIsTeacherBookingOpen] = useState(false);
  const [teacherBookingSuccess, setTeacherBookingSuccess] = useState(false);
  const [teacherBookingRef, setTeacherBookingRef] = useState('PDP-2026-8841');
  const [teacherForm, setTeacherForm] = useState({
    name: 'Sarah Al-Mansoor',
    email: 'sarah.mansoor@inclusive-edu.org',
    school: 'Horizon Inclusive Academy',
    date: '2026-10-15',
    time: '10:00 AM - 1:00 PM',
    format: 'Virtual Interactive Cohort',
    specialization: 'Autism Spectrum & Sensory Computing',
  });

  // Career Journey Step 2 Pyramid toggle state
  const [isPyramidOpen, setIsPyramidOpen] = useState(false);

  // Ecosystem & Values active tab filter
  const [activePillarTab, setActivePillarTab] = useState<'all' | 'whoWeAre' | 'vision' | 'philosophy' | 'impact'>('all');

  const handleLaunchAssessment = () => {
    try {
      localStorage.setItem('codera_user_role', JSON.stringify({ role: 'BUILDER', type: 'CODER' }));
    } catch (e) {}
    if (typeof setCurrentRole === 'function') setCurrentRole('student');
    navigate('/student-welcome');
  };

  const isDark = theme === 'dark';

  return (
    <div className="flex flex-col min-h-screen pt-20 transition-colors duration-200 bg-[#f8fafc] dark:bg-[#080d1a] text-slate-900 dark:text-slate-100">
      {/* ========================================================================= */}
      {/* 1. HERO SECTION: DEEP MIDNIGHT NAVY TO EMERALD GRADIENT GLOW              */}
      {/* ========================================================================= */}
      <section
        id="hero"
        className="relative overflow-hidden pt-12 pb-20 sm:pt-20 sm:pb-28 text-white scroll-mt-20"
        style={{
          background: 'radial-gradient(circle at 85% 25%, rgba(0, 168, 107, 0.35) 0%, transparent 45%), radial-gradient(circle at 15% 80%, rgba(37, 99, 235, 0.3) 0%, transparent 45%), linear-gradient(135deg, #060b17 0%, #0a1329 55%, #05261e 100%)',
        }}
      >
        {/* Subtle decorative glowing mesh grid overlay */}
        <div
          className="absolute inset-0 opacity-10 pointer-events-none"
          style={{
            backgroundImage: 'radial-gradient(#00A86B 1px, transparent 1px), radial-gradient(#2563eb 1px, transparent 1px)',
            backgroundSize: '40px 40px',
            backgroundPosition: '0 0, 20px 20px',
          }}
          aria-hidden="true"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 relative z-10">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-8 items-center">
            {/* Left Content Column */}
            <div className="lg:col-span-7 space-y-6 sm:space-y-8 text-center lg:text-start">
              {/* Accessibility / Purpose Tag Badge */}
              <div className="inline-flex items-center gap-2.5 px-4 py-2 rounded-full border border-emerald-400/30 bg-emerald-950/40 backdrop-blur-md shadow-sm">
                <span className="w-2 h-2 rounded-full bg-[#00A86B] animate-pulse" />
                <span className="text-xs sm:text-sm font-bold text-emerald-300">
                  {lang === 'ar'
                    ? 'مصمم لجميع المتعلمين — نرحب بأولياء الأمور والطلاب وأصحاب الهمم'
                    : 'Designed for Every Learner — SEN Students & Families Welcome'}
                </span>
                <span className="text-xs text-amber-300">⭐️</span>
              </div>

              {/* Serif Major Headline */}
              <h1 className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight leading-[1.12] drop-shadow-md">
                {lang === 'ar' ? (
                  <>
                    برمجة وتكنولوجيا بلا حواجز —{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                      CodeRa
                    </span>
                  </>
                ) : (
                  <>
                    Coding &amp; Technology Without Barriers —{' '}
                    <span className="text-transparent bg-clip-text bg-gradient-to-r from-emerald-400 to-teal-300">
                      CodeRa
                    </span>
                  </>
                )}
              </h1>

              {/* High-Contrast Crisp Sans-Serif Subtitle */}
              <p className="text-base sm:text-lg lg:text-xl font-sans text-slate-200/90 leading-relaxed max-w-2xl mx-auto lg:mx-0">
                {lang === 'ar'
                  ? 'تعليم التكنولوجيا المصمم لجميع القدرات والهمم — تقييمات تكيفية ذكية، مسارات برمجية معزولة حسياً، ومشاريع روبوتات تفاعلية معتمدة.'
                  : 'Empowering every learner with neurodiverse-adapted coding curricula, intuitive robotics, and verified career credentials.'}
              </p>

              {/* CTAs: Primary Pill Button (#00A86B) + Glassmorphic Transparent Outlined Button */}
              <div className="flex flex-wrap items-center justify-center lg:justify-start gap-4 pt-2">
                {/* Primary Pill Button */}
                <button
                  type="button"
                  onClick={() => {
                    const elem = document.getElementById('who-are-you');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2.5 px-8 py-4 rounded-full font-black text-sm sm:text-base text-white shadow-lg transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer bg-[#00A86B] hover:bg-[#0f766e]"
                  style={{
                    boxShadow: '0 8px 24px rgba(0, 168, 107, 0.45)',
                  }}
                >
                  <Rocket className="w-5 h-5" />
                  <span>{lang === 'ar' ? 'ابدأ التعلم الآن' : 'Start Learning'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>

                {/* Secondary Glassmorphic Outlined Button */}
                <button
                  type="button"
                  onClick={() => {
                    const elem = document.getElementById('learning-tracks') || document.getElementById('tracks');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}
                  className="inline-flex items-center gap-2 px-7 py-4 rounded-full font-bold text-sm sm:text-base text-white border border-white/30 backdrop-blur-md bg-white/10 hover:bg-white/20 hover:border-white/50 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer shadow-sm"
                >
                  <Layers className="w-4 h-4 text-emerald-300" />
                  <span>{lang === 'ar' ? 'استكشف المسارات' : 'Explore Tracks'}</span>
                </button>
              </div>

              {/* Trust & Accessibility Micro-Badges */}
              <div className="pt-4 flex flex-wrap items-center justify-center lg:justify-start gap-3 sm:gap-6 text-xs text-slate-300 font-semibold border-t border-white/10">
                <div className="flex items-center gap-2">
                  <ShieldCheck className="w-4 h-4 text-emerald-400" />
                  <span>WCAG AAA Compliant</span>
                </div>
                <div className="flex items-center gap-2">
                  <BrainCircuit className="w-4 h-4 text-teal-300" />
                  <span>Adaptive Assessment Engine</span>
                </div>
                <div className="flex items-center gap-2">
                  <Heart className="w-4 h-4 text-pink-400" />
                  <span>Neurodiversity Adapted</span>
                </div>
              </div>
            </div>

            {/* Right Illustration Column: High Quality Inclusive Learning Artwork */}
            <div className="lg:col-span-5 flex justify-center">
              <div className="relative w-full max-w-lg">
                {/* Ambient glowing backdrop circle */}
                <div className="absolute -inset-1.5 rounded-[2.5rem] bg-gradient-to-r from-emerald-500/40 to-blue-500/30 blur-xl opacity-75" />

                {/* Glassmorphic Frame containing High-Quality Inclusive Illustration */}
                <div className="relative rounded-[2rem] overflow-hidden border-2 border-emerald-500/30 shadow-2xl bg-slate-900/80 backdrop-blur-xl group transition-transform duration-500 hover:scale-[1.02]">
                  <img
                    src="/img/inclusive_hero.jpg"
                    alt="Accessible, inclusive tech learning environment with robotics and interactive coding"
                    className="w-full h-auto object-cover max-h-[460px]"
                    onError={(e) => {
                      // Fallback if image fails to load
                      e.currentTarget.src = '/img/career_mascot.jpg';
                    }}
                  />

                  {/* Overlaid Micro Metric Tags */}
                  <div className="absolute top-4 start-4 px-3 py-1.5 rounded-full bg-slate-950/85 backdrop-blur-md border border-emerald-400/40 text-emerald-300 text-xs font-bold flex items-center gap-1.5 shadow-lg">
                    <Sparkles className="w-3.5 h-3.5 text-amber-300" />
                    <span>Multimodal Learning</span>
                  </div>

                  <div className="absolute bottom-4 inset-x-4 p-3.5 rounded-2xl bg-slate-950/85 backdrop-blur-md border border-white/15 text-white text-xs flex items-center justify-between shadow-xl">
                    <div className="flex items-center gap-2.5">
                      <div className="w-8 h-8 rounded-xl bg-emerald-500/20 text-emerald-400 flex items-center justify-center font-bold">
                        <Bot className="w-4 h-4" />
                      </div>
                      <div>
                        <div className="font-extrabold text-xs">Intuitive Robotics &amp; Tactile Code</div>
                        <div className="text-[11px] text-slate-300">Sensory-friendly pacing for all abilities</div>
                      </div>
                    </div>
                    <span className="px-2 py-0.5 rounded-full bg-emerald-500/20 text-emerald-300 text-[10px] font-mono font-bold">
                      Active
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 2. WHY CHOOSE CODERA SECTION                                              */}
      {/* ========================================================================= */}
      <div id="about" className="scroll-mt-20" />
      <section
        id="why-codera"
        className="py-20 sm:py-28 relative scroll-mt-20 overflow-hidden text-white"
        style={{
          background: 'linear-gradient(135deg, #091a36 0%, #0c2340 35%, #082d2a 75%, #053326 100%)',
        }}
      >
        {/* Subtle ambient lighting / radial glows */}
        <div
          aria-hidden="true"
          className="absolute -top-40 -left-40 w-96 h-96 bg-blue-500/10 rounded-full blur-3xl pointer-events-none"
        />
        <div
          aria-hidden="true"
          className="absolute -bottom-40 -right-40 w-96 h-96 bg-emerald-500/10 rounded-full blur-3xl pointer-events-none"
        />

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div>
              <span className="inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider px-3.5 py-1 rounded-full bg-[#172554] text-white border border-[#1e3a8a] shadow-sm">
                <Sparkles className="w-3.5 h-3.5 text-blue-400" />
                <span>{lang === 'ar' ? '[تميز كوديرا]' : '[CODERA DIFFERENCE]'}</span>
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-white leading-tight">
              {lang === 'ar' ? 'لماذا تختار كوديرا؟' : 'Why Choose CodeRa?'}
            </h2>

            <p className="text-base sm:text-lg text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
              {lang === 'ar'
                ? 'على عكس المنصات التعليمية التقليدية الجامدة، تتكيف كوديرا مباشرة مع التنوع الجسدي والمعرفي، لضمان عدم استبعاد أي طالب من عالم التكنولوجيا.'
                : 'Unlike classical rigid learning platforms, CodeRa adapts directly to physical and cognitive diversities, ensuring no student is locked out of tech.'}
            </p>
          </div>

          {/* Cards Grid Layout (4 Columns) */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1: Accessibility First */}
            <article className="bg-white dark:bg-[#10192e] rounded-3xl p-7 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between border border-white/20 dark:border-slate-800 text-start group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Sliders className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white leading-snug">
                  {lang === 'ar' ? 'إمكانية الوصول أولاً' : 'Accessibility First'}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {lang === 'ar'
                    ? 'مصممة من الأساس لقارئات الشاشة، التحكم عبر لوحة المفاتيح فقط، تحويل النص إلى كلام باللغة العربية فورياً، وتقليل التشتت المعرفي.'
                    : 'Designed ground-up for screen readers, keyboard-only controls, real-time Arabic text-to-speech, and low-cognitive distraction.'}
                </p>
              </div>
            </article>

            {/* Card 2: Adaptive Assessment */}
            <article className="bg-white dark:bg-[#10192e] rounded-3xl p-7 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between border border-white/20 dark:border-slate-800 text-start group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <BrainCircuit className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white leading-snug">
                  {lang === 'ar' ? 'تقييم تكيفي ذكي' : 'Adaptive Assessment'}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {lang === 'ar'
                    ? 'يدخل كل متعلم عبر مسار تقييم معياري من ٥ أجزاء يتفاعل ديناميكياً مع وتيرة التعلم والتفضيلات الحسية.'
                    : 'Every learner enters via a modular 5-part placement track that dynamically responds to pacing and sensory preferences.'}
                </p>
              </div>
            </article>

            {/* Card 3: Parent & Organization Control */}
            <article className="bg-white dark:bg-[#10192e] rounded-3xl p-7 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between border border-white/20 dark:border-slate-800 text-start group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950/80 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <ShieldCheck className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white leading-snug">
                  {lang === 'ar' ? 'تحكم أولياء الأمور والمؤسسات' : 'Parent & Organization Control'}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {lang === 'ar'
                    ? 'لوحة تحكم إشرافية كاملة تتضمن مؤشرات تقدم مرئية، وتخصيص المناهج، وتقارير تكامل سهلة.'
                    : 'Full supervisor dashboard featuring visual progress markers, curriculum customization, and simple integration reporting.'}
                </p>
              </div>
            </article>

            {/* Card 4: Bilingual Platform */}
            <article className="bg-white dark:bg-[#10192e] rounded-3xl p-7 shadow-xl hover:shadow-2xl hover:-translate-y-1.5 transition-all duration-300 flex flex-col justify-between border border-white/20 dark:border-slate-800 text-start group">
              <div className="space-y-4">
                <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950/80 text-emerald-600 dark:text-emerald-400 flex items-center justify-center shadow-xs group-hover:scale-105 transition-transform">
                  <Globe className="w-6 h-6" />
                </div>

                <h3 className="text-xl font-bold font-serif text-slate-900 dark:text-white leading-snug">
                  {lang === 'ar' ? 'منصة ثنائية اللغة' : 'Bilingual Platform'}
                </h3>

                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {lang === 'ar'
                    ? 'واجهات إنجليزية وعربية أصلية بالكامل، تراعي السياقات الثقافية مع دعم لغة الإشارة الموحدة.'
                    : 'Completely localized native English and Arabic layouts, honoring cultural contexts with native sign language support.'}
                </p>
              </div>
            </article>
          </div>
        </div>
      </section>



      {/* ========================================================================= */}
      {/* 3. OUR LEARNING TRACKS SECTION                                            */}
      {/* ========================================================================= */}
      <div id="tracks" className="scroll-mt-20" />
      <div id="career-journey" className="scroll-mt-20" />
      <section
        id="learning-tracks"
        className="py-20 sm:py-28 relative scroll-mt-20 bg-[#faf8f5] dark:bg-[#070e1b] border-y border-stone-200/80 dark:border-slate-800/80 overflow-hidden"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          {/* Section Header */}
          <div className="text-center max-w-3xl mx-auto space-y-4">
            <div>
              <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-950/80 dark:text-blue-300 dark:border-blue-800 shadow-xs">
                <Sparkles className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                <span>{lang === 'ar' ? '[المناهج الموجهة]' : '[GUIDED CURRICULUMS]'}</span>
              </span>
            </div>

            <h2 className="text-3xl sm:text-4xl lg:text-5xl font-black font-serif tracking-tight text-[#0f2347] dark:text-white leading-tight">
              {lang === 'ar' ? 'مساراتنا التعليمية' : 'Our Learning Tracks'}
            </h2>

            <p className="text-base sm:text-lg text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed font-sans">
              {lang === 'ar'
                ? 'اختر من بين مناهجنا المتوافقة مع المعايير الدولية والمصممة مع خبراء إمكانية الوصول لتوفير تعليم تكنولوجي رصين.'
                : 'Choose from our standard-aligned curricula designed with accessibility experts to provide robust technology education.'}
            </p>
          </div>

          {/* Two-Column Asymmetric Grid */}
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 lg:gap-12 items-center">
            {/* Left Column: Staggered Interactive Track Bars (Levels 4 -> 1) */}
            <div className="lg:col-span-7 space-y-4">
              {/* Level 4: Advanced Projects & AI (Green) */}
              <div
                onClick={() => navigate('/track-selection')}
                className="w-full rounded-2xl p-5 sm:p-6 bg-[#107c41] text-white shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center shrink-0 text-white group-hover:scale-110 transition-transform">
                    <BrainCircuit className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/20 text-white">
                        {lang === 'ar' ? 'المستوى ٤' : 'Level 4'}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-serif leading-snug">
                        {lang === 'ar' ? 'المشاريع المتقدمة والذكاء الاصطناعي' : 'Advanced Projects & AI'}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-100 font-sans mt-0.5">
                      {lang === 'ar' ? 'مشاريع واقعية ومفاهيم الذكاء الاصطناعي.' : 'Real-world projects and AI concepts.'}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-emerald-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform shrink-0" />
              </div>

              {/* Level 3: JavaScript & Web (Blue) */}
              <div
                onClick={() => navigate('/track-selection')}
                className="w-full sm:w-[94%] rounded-2xl p-5 sm:p-6 bg-[#2563eb] text-white shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center shrink-0 text-white group-hover:scale-110 transition-transform">
                    <Laptop className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/20 text-white">
                        {lang === 'ar' ? 'المستوى ٣' : 'Level 3'}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-serif leading-snug">
                        {lang === 'ar' ? 'جافاسكريبت وتطوير الويب' : 'JavaScript & Web'}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-blue-100 font-sans mt-0.5">
                      {lang === 'ar' ? 'بناء مشاريع ويب تفاعلية.' : 'Building interactive web projects.'}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform shrink-0" />
              </div>

              {/* Level 2: Python Fundamentals (Green) */}
              <div
                onClick={() => navigate('/track-selection')}
                className="w-full sm:w-[88%] rounded-2xl p-5 sm:p-6 bg-[#107c41] text-white shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center shrink-0 text-white group-hover:scale-110 transition-transform">
                    <Code2 className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/20 text-white">
                        {lang === 'ar' ? 'المستوى ٢' : 'Level 2'}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-serif leading-snug">
                        {lang === 'ar' ? 'أساسيات بايثون' : 'Python Fundamentals'}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-emerald-100 font-sans mt-0.5">
                      {lang === 'ar' ? 'مقدمة في البرمجة النصية.' : 'Intro to text-based coding.'}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-emerald-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform shrink-0" />
              </div>

              {/* Level 1: Scratch & Block Coding (Blue) */}
              <div
                onClick={() => navigate('/track-selection')}
                className="w-full sm:w-[82%] rounded-2xl p-5 sm:p-6 bg-[#2563eb] text-white shadow-md hover:shadow-xl hover:scale-[1.01] transition-all duration-300 cursor-pointer flex items-center justify-between gap-4 group"
              >
                <div className="flex items-center gap-4">
                  <div className="w-12 h-12 rounded-xl bg-white/15 backdrop-blur-xs flex items-center justify-center shrink-0 text-white group-hover:scale-110 transition-transform">
                    <Layers className="w-6 h-6" />
                  </div>
                  <div>
                    <div className="flex items-center gap-2">
                      <span className="text-[11px] font-black uppercase tracking-wider px-2 py-0.5 rounded-md bg-white/20 text-white">
                        {lang === 'ar' ? 'المستوى ١' : 'Level 1'}
                      </span>
                      <h3 className="text-base sm:text-lg font-bold font-serif leading-snug">
                        {lang === 'ar' ? 'سكراتش والبرمجة بالكتل' : 'Scratch & Block Coding'}
                      </h3>
                    </div>
                    <p className="text-xs sm:text-sm text-blue-100 font-sans mt-0.5">
                      {lang === 'ar' ? 'أساسيات البرمجة المرئية بالسحب والإفلات.' : 'Visual drag-and-drop programming basics.'}
                    </p>
                  </div>
                </div>
                <ArrowRight className="w-5 h-5 text-blue-200 group-hover:translate-x-1 rtl:group-hover:-translate-x-1 rtl:rotate-180 transition-transform shrink-0" />
              </div>
            </div>

            {/* Right Column: Placement Test Card */}
            <div className="lg:col-span-5">
              <div className="rounded-2xl p-8 sm:p-10 bg-white dark:bg-[#10192e] border border-stone-200/90 dark:border-slate-800 shadow-xl shadow-stone-200/50 dark:shadow-none text-center flex flex-col items-center justify-center space-y-6">
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-blue-50 text-blue-700 border border-blue-200/60 dark:bg-blue-950/60 dark:text-blue-300 dark:border-blue-900">
                    <Target className="w-3.5 h-3.5 text-blue-600 dark:text-blue-400" />
                    <span>{lang === 'ar' ? 'اختبار تحديد المستوى' : 'PLACEMENT TEST'}</span>
                  </span>
                </div>

                <div className="w-16 h-16 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 dark:text-blue-400 flex items-center justify-center shadow-inner">
                  <GraduationCap className="w-8 h-8" />
                </div>

                <div className="space-y-2">
                  <h3 className="text-2xl sm:text-3xl font-black font-serif text-[#0f2347] dark:text-white leading-tight">
                    {lang === 'ar' ? 'خُض اختبار تحديد المستوى' : 'Take the Placement Test'}
                  </h3>
                  <p className="text-sm sm:text-base text-slate-600 dark:text-slate-300 max-w-sm mx-auto leading-relaxed font-sans">
                    {lang === 'ar'
                      ? 'تقييمنا الذكي يحدد المستوى الأنسب لطفلك بدقة وسلاسة.'
                      : 'Our smart assessment places your child at the right level.'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={handleLaunchAssessment}
                  className="w-full sm:w-auto px-8 py-4 rounded-full bg-[#2563eb] hover:bg-[#1d4ed8] text-white font-bold text-base shadow-lg shadow-blue-500/25 hover:shadow-xl hover:scale-105 active:scale-95 transition-all inline-flex items-center justify-center gap-2 cursor-pointer"
                >
                  <span>{lang === 'ar' ? 'بدء التقييم' : 'Start Assessment'}</span>
                  <ArrowRight className="w-5 h-5 rtl:rotate-180" />
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>



      {/* ========================================================================= */}
      {/* 5. PERSONALIZED PORTALS / WHO ARE YOU SECTION (#who-are-you)              */}
      {/* ========================================================================= */}
      <section id="who-are-you" className="py-20 sm:py-28 relative scroll-mt-20 bg-white dark:bg-[#0b1323] overflow-hidden">
        {/* Very subtle light geometric pattern visible at the bottom right */}
        <div
          aria-hidden="true"
          className="absolute -bottom-10 -right-10 w-96 h-96 pointer-events-none opacity-25 dark:opacity-10"
        >
          <svg viewBox="0 0 400 400" className="w-full h-full fill-none stroke-emerald-600/40 dark:stroke-emerald-400/20" strokeWidth="1.2">
            <pattern id="subtle-geo" width="40" height="40" patternUnits="userSpaceOnUse">
              <path d="M 40 0 L 0 40 M 0 0 L 40 40" />
              <circle cx="20" cy="20" r="8" fill="none" strokeWidth="1" />
              <rect x="15" y="15" width="10" height="10" fill="none" strokeWidth="0.8" />
            </pattern>
            <rect width="400" height="400" fill="url(#subtle-geo)" />
          </svg>
        </div>

        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 space-y-12 relative z-10">
          {/* Header & Subtitle */}
          <div className="text-center max-w-3xl mx-auto space-y-3.5">
            {/* Small light-blue centered text badge */}
            <div className="flex justify-center">
              <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-extrabold uppercase tracking-wider bg-blue-100/80 dark:bg-blue-950/60 text-blue-700 dark:text-blue-300 border border-blue-200/80 dark:border-blue-800">
                PERSONALIZED PORTALS
              </span>
            </div>

            {/* Large dark blue centered title */}
            <h2 className="text-4xl sm:text-5xl lg:text-6xl font-black font-serif tracking-tight text-[#1e293b] dark:text-white">
              {lang === 'ar' ? 'من أنت؟ (Who Are You?)' : 'Who Are You?'}
            </h2>

            {/* Centered dark grey paragraph */}
            <p className="text-base sm:text-lg font-sans text-slate-600 dark:text-slate-300 max-w-2xl mx-auto leading-relaxed">
              {lang === 'ar'
                ? 'اختر المسار الذي يطابق رحلتك. نحن ندعم الطلاب بالتعلم الذاتي، أولياء الأمور الداعمين، التعلم المستقل والمجتمعات التعليمية.'
                : 'Select the pathway that matches your journey. We support self-paced students, supportive parent, parents, independent learning and educational communities.'}
            </p>
          </div>

          {/* Grid of four distinct, evenly spaced, rounded-corner cards arranged horizontally */}
          <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-6">
            {/* Card 1 (Left): Student / Child */}
            <div className="rounded-[2rem] p-6 border border-emerald-200/70 dark:border-emerald-900/50 bg-gradient-to-b from-[#e8f7f2] via-[#eef9f5] to-[#d8f1e7] dark:from-[#0b241e] dark:via-[#091a18] dark:to-[#08221b] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                {/* Internal, detailed, soft-shaded illustration */}
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white/70 dark:bg-slate-900/40 p-2 shadow-inner border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center">
                  <img
                    src="/img/portal_student.jpg"
                    alt="Young girl on a laptop learning coding"
                    className="w-full h-full object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = '/img/coder.jpeg';
                    }}
                  />
                </div>

                <div className="text-center pt-2">
                  <h3 className="text-xl sm:text-2xl font-black font-serif text-slate-900 dark:text-white mb-2">
                    {lang === 'ar' ? 'طالب / طفل' : 'Student / Child'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    {lang === 'ar'
                      ? 'ألعاب تفاعلية، واجهات لمسية، وبرمجة قائمة على الصوت مصممة للتكيف مباشرة مع سرعة تعلمك.'
                      : 'Interactive games, tactile interfaces, and sound-based programming designed to adapt directly to your learning speed.'}
                  </p>
                </div>
              </div>

              {/* Button (Blue): Get Started */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={handleLaunchAssessment}
                  className="w-full py-3.5 px-4 rounded-xl text-white font-black text-sm bg-[#2563eb] hover:bg-[#1d4ed8] shadow-md shadow-blue-500/20 hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{lang === 'ar' ? 'ابدأ الآن' : 'Get Started'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>

            {/* Card 2: Parent */}
            <div className="rounded-[2rem] p-6 border border-emerald-200/70 dark:border-emerald-900/50 bg-gradient-to-b from-[#e8f7f2] via-[#eef9f5] to-[#d8f1e7] dark:from-[#0b241e] dark:via-[#091a18] dark:to-[#08221b] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                {/* Internal, detailed, soft-shaded illustration */}
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white/70 dark:bg-slate-900/40 p-2 shadow-inner border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center">
                  <img
                    src="/img/portal_parent.jpg"
                    alt="Parent sitting with child on a laptop"
                    className="w-full h-full object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = '/img/guide.jpeg';
                    }}
                  />
                </div>

                <div className="text-center pt-2">
                  <h3 className="text-xl sm:text-2xl font-black font-serif text-slate-900 dark:text-white mb-2">
                    {lang === 'ar' ? 'ولي الأمر' : 'Parent'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    {lang === 'ar'
                      ? 'متابعة التقدم، الوصول لمسارات التسجيل، الدفع الآمن، والحصول على رؤية واضحة للخطط التعليمية المخصصة.'
                      : 'Monitor progress, access onboarding pathways, secure payments, and gain clear visibility into customized educational plans.'}
                  </p>
                </div>
              </div>

              {/* Button (Green): Register Your Child */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => navigate('/register-parent')}
                  className="w-full py-3.5 px-4 rounded-xl text-white font-black text-sm bg-[#00A86B] hover:bg-[#0f766e] shadow-md shadow-emerald-500/20 hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{lang === 'ar' ? 'سجل طفلك' : 'Register Your Child'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>

            {/* Card 3: Individual */}
            <div className="rounded-[2rem] p-6 border border-emerald-200/70 dark:border-emerald-900/50 bg-gradient-to-b from-[#e8f7f2] via-[#eef9f5] to-[#d8f1e7] dark:from-[#0b241e] dark:via-[#091a18] dark:to-[#08221b] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                {/* Internal, detailed, soft-shaded illustration */}
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white/70 dark:bg-slate-900/40 p-2 shadow-inner border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center">
                  <img
                    src="/img/portal_individual.jpg"
                    alt="Young adult male working on a desktop computer"
                    className="w-full h-full object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = '/img/monter.jpeg';
                    }}
                  />
                </div>

                <div className="text-center pt-2">
                  <h3 className="text-xl sm:text-2xl font-black font-serif text-slate-900 dark:text-white mb-2">
                    {lang === 'ar' ? 'متعلم مستقل' : 'Individual'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    {lang === 'ar'
                      ? 'للمتعلمين البالغين ذوي التنوع العصبي أو الباحثين عن مسارات مهنية مستقلة في تطوير الواجهات وتطبيقات الويب.'
                      : 'For neurodiverse or adaptive adult learners seeking independent career pathways in frontend and web development.'}
                  </p>
                </div>
              </div>

              {/* Button (Blue): Choose Your Track */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => navigate('/register-individual')}
                  className="w-full py-3.5 px-4 rounded-xl text-white font-black text-sm bg-[#2563eb] hover:bg-[#1d4ed8] shadow-md shadow-blue-500/20 hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{lang === 'ar' ? 'سجل كمتعلم مستقل' : 'Register as Individual'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>

            {/* Card 4 (Right): Organization */}
            <div className="rounded-[2rem] p-6 border border-emerald-200/70 dark:border-emerald-900/50 bg-gradient-to-b from-[#e8f7f2] via-[#eef9f5] to-[#d8f1e7] dark:from-[#0b241e] dark:via-[#091a18] dark:to-[#08221b] shadow-md hover:shadow-xl hover:-translate-y-1 transition-all duration-300 flex flex-col justify-between group">
              <div className="space-y-4">
                {/* Internal, detailed, soft-shaded illustration */}
                <div className="w-full aspect-square rounded-2xl overflow-hidden bg-white/70 dark:bg-slate-900/40 p-2 shadow-inner border border-emerald-100 dark:border-emerald-900/30 flex items-center justify-center">
                  <img
                    src="/img/portal_organization.jpg"
                    alt="Modern sprawling school and institution campus"
                    className="w-full h-full object-contain rounded-xl transition-transform duration-300 group-hover:scale-105"
                    onError={(e) => {
                      e.currentTarget.src = '/img/school.jpeg';
                    }}
                  />
                </div>

                <div className="text-center pt-2">
                  <h3 className="text-xl sm:text-2xl font-black font-serif text-slate-900 dark:text-white mb-2">
                    {lang === 'ar' ? 'المؤسسات التعليمية' : 'Organization'}
                  </h3>
                  <p className="text-xs sm:text-sm text-slate-700 dark:text-slate-300 leading-relaxed font-sans">
                    {lang === 'ar'
                      ? 'تزويد المدارس والمؤسسات والمراكز المجتمعية بمناهج علوم حاسب متوافقة محلياً وبوابات تحقق معتمدة.'
                      : 'Equip schools, institutions, and community centres with localized compliant CS curricula and verification portals.'}
                  </p>
                </div>
              </div>

              {/* Button (Green): Partner With Us */}
              <div className="pt-6">
                <button
                  type="button"
                  onClick={() => navigate('/org-registration-step1')}
                  className="w-full py-3.5 px-4 rounded-xl text-white font-black text-sm bg-[#00A86B] hover:bg-[#0f766e] shadow-md shadow-emerald-500/20 hover:scale-102 active:scale-98 transition-all cursor-pointer flex items-center justify-center gap-2"
                >
                  <span>{lang === 'ar' ? 'شارك معنا' : 'Partner With Us'}</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </div>
          </div>

          {/* Bottom Callout / Interactive Explorations Bar */}
          <div className="pt-6 flex flex-wrap items-center justify-between gap-4 p-5 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800 text-xs text-slate-600 dark:text-slate-300">
            <div className="flex items-center gap-3">
              <span className="p-2 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600">
                <Sparkles className="w-4 h-4" />
              </span>
              <span>
                {lang === 'ar'
                  ? 'هل أنت معلم تربية خاصة تبحث عن برنامج التطوير المهني؟'
                  : 'Are you a Special Education Educator looking for accredited Professional Development?'}
              </span>
            </div>
            <button
              type="button"
              onClick={() => {
                setTeacherBookingSuccess(false);
                setIsTeacherBookingOpen(true);
              }}
              className="px-4 py-2 rounded-full font-bold text-teal-700 dark:text-teal-300 bg-teal-100/80 dark:bg-teal-950 hover:bg-teal-200 dark:hover:bg-teal-900 transition-colors inline-flex items-center gap-1.5 cursor-pointer"
            >
              <span>{lang === 'ar' ? 'استعراض دبلوم المعلمين (PDP)' : 'Explore Teacher PDP Program'}</span>
              <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
            </button>
          </div>

          {/* SUB-FLOW A: BUILDER PATHWAYS (Coder vs CodeGuide) */}
          {roleFlowStep === 'builder' && (
            <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setRoleFlowStep('root')}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                  <span>{lang === 'ar' ? 'العودة لاختيار الدور الرئيسي' : '← Back to Main Roles'}</span>
                </button>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300">
                  Builder Sub-Flow
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 1. Coder (Student/Child) */}
                <div className="rounded-3xl p-7 border border-blue-200 dark:border-blue-900/60 bg-white dark:bg-[#10192e] shadow-md flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                      <Bot className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                      {lang === 'ar' ? 'المبرمج الصغير (Coder)' : 'Coder (Student / Child)'}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {lang === 'ar'
                        ? 'رحلة تعلم البرمجة المخصصة للأطفال والطلاب عبر التلميحات الحسية، البلوكات التفاعلية، والتقييم التشخيصي الذكي.'
                        : 'Interactive coding journey for children featuring sensory feedback, visual loops, and neurodivergent-friendly challenges.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={handleLaunchAssessment}
                    className="mt-6 w-full py-3.5 rounded-full text-white font-black text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{lang === 'ar' ? 'بدء اختبار تحديد المستوى التفاعلي' : 'Launch Assessment Runner'}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>

                {/* 2. CodeGuide (Parent/Guardian) */}
                <div className="rounded-3xl p-7 border border-emerald-200 dark:border-emerald-900/60 bg-white dark:bg-[#10192e] shadow-md flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-600 flex items-center justify-center">
                      <GraduationCap className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                      {lang === 'ar' ? 'مرشد الكود (CodeGuide)' : 'CodeGuide (Parent / Guardian)'}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {lang === 'ar'
                        ? 'إدارة متكاملة للأبناء، متابعة الإنجاز لحظياً، ضبط التفضيلات الحسية، وتلقي تقارير الأداء المعتمدة.'
                        : 'Parent and legal guardian portal managing multiple learners with isolated sibling profiles and cognitive telemetry.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate('/register-parent')}
                    className="mt-6 w-full py-3.5 rounded-full text-white font-black text-xs sm:text-sm bg-[#00A86B] hover:bg-[#0f766e] shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{lang === 'ar' ? 'تسجيل ولي الأمر وإعداد ملفات الأبناء' : 'Open Parent Registration'}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SUB-FLOW B: MENTOR SPLIT (Individual vs Organization) */}
          {roleFlowStep === 'mentor' && (
            <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setRoleFlowStep('root')}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                  <span>{lang === 'ar' ? 'العودة لاختيار الدور الرئيسي' : '← Back to Main Roles'}</span>
                </button>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-emerald-100 dark:bg-emerald-950 text-emerald-700 dark:text-emerald-300">
                  Mentor Category
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* 1. Individual */}
                <div
                  onClick={() => setRoleFlowStep('mentor-individual')}
                  className="rounded-3xl p-7 border border-purple-200 dark:border-purple-900/60 bg-white dark:bg-[#10192e] shadow-md hover:shadow-xl cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-purple-100 dark:bg-purple-950 text-purple-600 flex items-center justify-center">
                      <Users className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                      {lang === 'ar' ? 'مرشد مستقل (Individual)' : 'Individual Mentor'}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {lang === 'ar'
                        ? 'للمبرمجين المستقلين ومعلمي التربية الخاصة الساعين لتدريس مسارات التقنية الشاملة.'
                        : 'For independent coding instructors, tutors, and special education teachers looking to upskill.'}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between text-purple-600 dark:text-purple-400 font-extrabold text-xs sm:text-sm">
                    <span>{lang === 'ar' ? 'متابعة كمرشد مستقل' : 'Continue as Individual'}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </div>
                </div>

                {/* 2. Organization */}
                <div
                  onClick={() => setRoleFlowStep('mentor-organization')}
                  className="rounded-3xl p-7 border border-amber-200 dark:border-amber-900/60 bg-white dark:bg-[#10192e] shadow-md hover:shadow-xl cursor-pointer flex flex-col justify-between"
                >
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                      {lang === 'ar' ? 'مؤسسة تعليمية (Organization)' : 'Organization'}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {lang === 'ar'
                        ? 'للمدارس والمراكز المتخصصة الراغبة في اعتماد تقني وسعات استيعابية معتمدة من خطوتين.'
                        : 'For schools and specialized centers seeking institutional capacity onboarding and 2-step verification.'}
                    </p>
                  </div>

                  <div className="mt-6 flex items-center justify-between text-amber-600 dark:text-amber-400 font-extrabold text-xs sm:text-sm">
                    <span>{lang === 'ar' ? 'متابعة كمؤسسة' : 'Continue as Organization'}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </div>
                </div>
              </div>
            </div>
          )}

          {/* SUB-FLOW B.1: INDIVIDUAL BRANCHES */}
          {roleFlowStep === 'mentor-individual' && (
            <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setRoleFlowStep('mentor')}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                  <span>{lang === 'ar' ? 'العودة لاختيار فئة المرشد' : '← Back to Mentor Category'}</span>
                </button>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-purple-100 dark:bg-purple-950 text-purple-700 dark:text-purple-300">
                  Individual Branches
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Branch 1: Programmer */}
                <div className="rounded-3xl p-7 border border-blue-200 dark:border-blue-900/60 bg-white dark:bg-[#10192e] shadow-md flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-blue-600 flex items-center justify-center">
                      <Laptop className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                      {lang === 'ar' ? 'المبرمج المستقل (Programmer)' : 'Programmer'}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {lang === 'ar'
                        ? 'استكشف مسارات البرمجة المتقدمة، معاينة محتوى الدورات التفاعلية، ومشاريع لغة الإشارة والذكاء الاصطناعي.'
                        : 'Explore individual programming tracks, hands-on curriculum roadmaps, AI tools, and course preview playgrounds.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate('/track-preview-programming')}
                    className="mt-6 w-full py-3.5 rounded-full text-white font-black text-xs sm:text-sm bg-blue-600 hover:bg-blue-700 shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{lang === 'ar' ? 'استعراض مسار البرمجة' : 'Routes to Programming Track Preview'}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>

                {/* Branch 2: Special Education Teacher */}
                <div className="rounded-3xl p-7 border border-teal-200 dark:border-teal-900/60 bg-white dark:bg-[#10192e] shadow-md flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-600 flex items-center justify-center">
                      <BookOpen className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                      {lang === 'ar' ? 'معلم تربية خاصة (Special Education Teacher)' : 'Special Education Teacher PDP'}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {lang === 'ar'
                        ? 'برنامج تدريب مهني معتمد يزود المعلمين بأدوات تدريس البرمجة عبر الروبوتات الحسية ومواءمة الخطط التربوية (IEP).'
                        : 'Accredited teacher training modules covering sensory ergonomics, tactile block coding, and IEP alignment.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => setRoleFlowStep('teacher-pdp')}
                    className="mt-6 w-full py-3.5 rounded-full text-white font-black text-xs sm:text-sm bg-teal-600 hover:bg-teal-700 shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{lang === 'ar' ? 'فتح برنامج التدريب المهني للمعلمين' : 'Open Teacher Professional Development'}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* DEDICATED TEACHER PROFESSIONAL DEVELOPMENT VIEW (PDP) */}
          {roleFlowStep === 'teacher-pdp' && (
            <div className="space-y-8 max-w-5xl mx-auto animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setRoleFlowStep('mentor-individual')}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-teal-600 dark:text-teal-400 hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                  <span>{lang === 'ar' ? 'العودة لتخصصات المرشد المستقل' : '← Back to Individual Choices'}</span>
                </button>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300">
                  Accredited Program • 52 Contact Hours
                </span>
              </div>

              {/* PDP Hero Header */}
              <div className="p-8 rounded-3xl border border-teal-200 dark:border-teal-900/60 bg-[#f0fdfa]/80 dark:bg-[#0c1824]/80 shadow-md space-y-4">
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-teal-100 dark:bg-teal-950 text-teal-700 dark:text-teal-300">
                  <Award className="w-4 h-4" />
                  <span>Teacher Professional Development (PDP)</span>
                </div>
                <h3 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 dark:text-white">
                  {lang === 'ar'
                    ? 'دبلوم تدريب البرمجة للطلاب ذوي الاحتياجات التعليمية الخاصة'
                    : 'Programming Training for Special Needs Students Course'}
                </h3>
                <p className="text-xs sm:text-sm leading-relaxed text-slate-600 dark:text-slate-300 max-w-3xl">
                  {lang === 'ar'
                    ? 'برنامج تدريبي تطبيقي مصمم خصيصاً لمعلمي التربية الخاصة والأخصائيين النفسيين لدمج الروبوتات الملموسة والبرمجة بالبلوكات في الخطط التربوية الفردية اليومية.'
                    : 'Designed specifically for special education educators and therapists to easily integrate tactile robotics, block programming, sensory ergonomics, and STEM readiness into daily IEP plans.'}
                </p>

                {/* 4 Training Modules */}
                <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4 pt-4">
                  {[
                    { title: lang === 'ar' ? 'التكيف الحسي والحمل المعرفي' : 'Sensory Ergonomics', hrs: '12 Hours' },
                    { title: lang === 'ar' ? 'البرمجة اللمسية وقارئات الشاشة' : 'Tactile Block Coding', hrs: '16 Hours' },
                    { title: lang === 'ar' ? 'مواءمة المناهج بالخطة التربوية (IEP)' : 'IEP Alignment Benchmarks', hrs: '10 Hours' },
                    { title: lang === 'ar' ? 'العتاد المساند ومفاتيح التحكم' : 'Assistive Hardware & Switches', hrs: '14 Hours' },
                  ].map((mod, idx) => (
                    <div key={idx} className="p-4 rounded-2xl bg-white dark:bg-slate-900/80 border border-teal-100 dark:border-teal-900/40 text-xs">
                      <span className="font-extrabold text-teal-600 block mb-1">Module 0{idx + 1} ({mod.hrs})</span>
                      <span className="font-bold text-slate-800 dark:text-slate-200">{mod.title}</span>
                    </div>
                  ))}
                </div>

                <div className="pt-4 flex justify-end">
                  <button
                    type="button"
                    onClick={() => {
                      setTeacherBookingSuccess(false);
                      setIsTeacherBookingOpen(true);
                    }}
                    className="px-8 py-3.5 rounded-full text-white font-black text-xs sm:text-sm bg-teal-600 hover:bg-teal-700 shadow-md inline-flex items-center gap-2 cursor-pointer hover:scale-105 active:scale-95 transition-all"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'احجز مقعدك الآن' : 'Book Your Seat Now'}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          )}

          {/* SUB-FLOW B.2: ORGANIZATION (School vs Specialized Center) */}
          {roleFlowStep === 'mentor-organization' && (
            <div className="space-y-6 max-w-4xl mx-auto animate-in fade-in duration-200">
              <div className="flex items-center justify-between pb-3 border-b border-slate-200 dark:border-slate-800">
                <button
                  type="button"
                  onClick={() => setRoleFlowStep('mentor')}
                  className="inline-flex items-center gap-2 text-xs sm:text-sm font-bold text-emerald-600 dark:text-emerald-400 hover:underline cursor-pointer"
                >
                  <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
                  <span>{lang === 'ar' ? 'العودة لاختيار فئة المرشد' : '← Back to Mentor Category'}</span>
                </button>
                <span className="text-xs font-bold px-3 py-1 rounded-full bg-amber-100 dark:bg-amber-950 text-amber-700 dark:text-amber-300">
                  Institutional Types
                </span>
              </div>

              <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
                {/* Type 1: School */}
                <div className="rounded-3xl p-7 border border-amber-200 dark:border-amber-900/60 bg-white dark:bg-[#10192e] shadow-md flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-amber-100 dark:bg-amber-950 text-amber-600 flex items-center justify-center">
                      <Building2 className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                      {lang === 'ar' ? 'مدرسة (School)' : 'School'}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {lang === 'ar'
                        ? 'إدخال مناهج البرمجة الشاملة لجميع الفصول الدراسية، إدارة وتوزيع سعات المعلمين والطلاب وحوكمة التراخيص.'
                        : 'Bring inclusive coding to all classrooms with student roster management, teacher seat allocations, and compliance.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      try {
                        localStorage.setItem('codera_org_type', 'School');
                      } catch (e) {}
                      navigate('/org-registration-step1');
                    }}
                    className="mt-6 w-full py-3.5 rounded-full text-white font-black text-xs sm:text-sm bg-amber-600 hover:bg-amber-700 shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{lang === 'ar' ? 'بدء تسجيل المدرسة (Step 1)' : 'Proceed with School Onboarding (Step 1)'}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>

                {/* Type 2: Specialized Center */}
                <div className="rounded-3xl p-7 border border-teal-200 dark:border-teal-900/60 bg-white dark:bg-[#10192e] shadow-md flex flex-col justify-between">
                  <div className="space-y-4">
                    <div className="w-12 h-12 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-600 flex items-center justify-center">
                      <Heart className="w-6 h-6" />
                    </div>
                    <h4 className="text-xl font-bold font-serif text-slate-900 dark:text-white">
                      {lang === 'ar' ? 'مركز متخصص (Specialized Center)' : 'Specialized Center'}
                    </h4>
                    <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed">
                      {lang === 'ar'
                        ? 'مراكز التربية الخاصة والتأهيل الحركي والنطقي الراغبة في حزم علاجية برمجية وتقارير نمو تخصصية.'
                        : 'Equip therapy clinics, neurodevelopmental centers, and specialized rehabilitation facilities with assistive tech.'}
                    </p>
                  </div>

                  <button
                    type="button"
                    onClick={() => {
                      try {
                        localStorage.setItem('codera_org_type', 'Specialized Center');
                      } catch (e) {}
                      navigate('/org-registration-step1');
                    }}
                    className="mt-6 w-full py-3.5 rounded-full text-white font-black text-xs sm:text-sm bg-teal-600 hover:bg-teal-700 shadow-md cursor-pointer flex items-center justify-center gap-2"
                  >
                    <span>{lang === 'ar' ? 'بدء تسجيل المركز المتخصص (Step 1)' : 'Proceed with Center Onboarding (Step 1)'}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            </div>
          )}
        </div>
      </section>

      {/* ========================================================================= */}
      {/* 5. LEARNING WITHOUT LIMITS / ASSISTIVE DASHBOARD SECTION                  */}
      {/* ========================================================================= */}
      <div id="learning-without-limits" className="scroll-mt-20" />
      <section
        id="learning-without-limits"
        className="py-20 sm:py-28 relative scroll-mt-20 bg-[#f8fafc] dark:bg-[#070e1b] overflow-hidden border-t border-slate-200/80 dark:border-slate-800/80"
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
          <div className="grid grid-cols-1 lg:grid-cols-12 gap-12 lg:gap-14 items-center">
            {/* Left Column: Realistic Tablet Device Mockup */}
            <div className="lg:col-span-6 flex justify-center">
              <div className="relative w-full max-w-[540px] rounded-[2.2rem] overflow-hidden p-6 sm:p-8 shadow-2xl border border-stone-200/70 dark:border-stone-800/70 bg-gradient-to-br from-[#ebe4da] via-[#ded4c3] to-[#baa68e]">
                {/* Surface background ambient depth */}
                <div
                  className="absolute inset-0 opacity-40 pointer-events-none mix-blend-multiply"
                  style={{
                    backgroundImage:
                      'radial-gradient(ellipse at 50% 20%, rgba(255,255,255,0.7) 0%, transparent 65%), linear-gradient(135deg, rgba(165,130,95,0.3) 0%, rgba(95,70,40,0.45) 100%)',
                  }}
                  aria-hidden="true"
                />

                {/* Tablet Hardware Bezel (iPad Style) */}
                <div className="relative rounded-[2.2rem] bg-[#1a1c22] p-3 sm:p-3.5 shadow-[0_22px_55px_rgba(0,0,0,0.45),0_0_0_1px_rgba(255,255,255,0.12)] border border-slate-700/80">
                  {/* Camera Pin Hole */}
                  <div className="absolute top-2 left-1/2 -translate-x-1/2 w-2 h-2 rounded-full bg-slate-900 border border-slate-700 z-20" />

                  {/* Tablet Glass Screen Display */}
                  <div
                      className="rounded-[1.6rem] overflow-hidden bg-[#faf8f5] dark:bg-[#181d28] text-slate-800 dark:text-slate-100 text-xs shadow-inner flex flex-col border border-stone-200 dark:border-slate-800 select-none transition-all duration-300"
                      style={{
                        filter: `brightness(${0.75 + (mockBrightness / 100) * 0.5})`,
                      }}
                    >
                    {/* Top Status Bar & Header */}
                    <div className="px-4 py-2 bg-[#f4efe8] dark:bg-[#151922] border-b border-stone-200 dark:border-slate-800 flex items-center justify-between text-[11px] font-semibold text-slate-600 dark:text-slate-400">
                      <div className="flex items-center gap-1.5">
                        <span className="font-extrabold text-slate-900 dark:text-white tracking-tight text-[11px]">
                          ASSISTIVE DASHBOARD
                        </span>
                        <span className="text-[10px] text-amber-600 dark:text-amber-400 font-medium">
                          Amber 24pt
                        </span>
                      </div>
                      <div className="font-semibold text-slate-700 dark:text-slate-300 text-[10px]">
                        11:12 AM
                      </div>
                      <div className="w-5 h-5 rounded-full overflow-hidden border border-amber-300/80 shadow-xs">
                        <img
                          src="https://images.unsplash.com/photo-1534528741775-53994a69daeb?w=100&auto=format&fit=crop&q=80"
                          alt="User Avatar"
                          className="w-full h-full object-cover"
                        />
                      </div>
                    </div>

                    {/* Dashboard Interior 3-Column Grid */}
                    <div className="p-3 grid grid-cols-1 sm:grid-cols-3 gap-2.5 bg-[#faf8f5] dark:bg-[#181d28]">
                      {/* Column 1: QUICK CONTROLS */}
                      <div className="space-y-2">
                        <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block px-0.5">
                          QUICK CONTROLS
                        </span>

                        {/* Display Brightness Card (Warm Peach) */}
                        <div className="p-2.5 rounded-2xl bg-[#fde9d7] dark:bg-[#2e2318]/90 border border-[#fed6bc] dark:border-amber-900/60 shadow-xs space-y-1.5">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-md bg-[#ea580c] text-white flex items-center justify-center shrink-0 shadow-xs">
                              <Sun className="w-3 h-3" />
                            </div>
                            <div>
                              <span className="font-extrabold text-[10px] text-slate-900 dark:text-slate-100 tracking-tight block leading-tight">
                                DISPLAY BRIGHTNESS
                              </span>
                              <span className="text-[8px] font-semibold text-amber-700 dark:text-amber-400 block -mt-0.5">
                                Peach 16pt
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center gap-1.5 pt-0.5">
                            <Eye className="w-3 h-3 text-amber-800 dark:text-amber-300 shrink-0" />
                            <input
                              type="range"
                              min="10"
                              max="100"
                              value={mockBrightness}
                              onChange={(e) => setMockBrightness(Number(e.target.value))}
                              className="w-full accent-[#ea580c] h-1.5 bg-[#fcd4b8] dark:bg-amber-900/40 rounded-lg cursor-pointer"
                            />
                            <span className="text-[9px] font-mono font-bold text-amber-900 dark:text-amber-200 shrink-0">
                              {mockBrightness}%
                            </span>
                          </div>
                        </div>

                        {/* Audio Balance Card (Soft Teal/Mint) */}
                        <div className="p-2.5 rounded-2xl bg-[#ddf4ef] dark:bg-[#132d20]/90 border border-[#bfeade] dark:border-emerald-900/60 shadow-xs space-y-1.5">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-md bg-[#0d9488] text-white flex items-center justify-center shrink-0 shadow-xs">
                              <Volume2 className="w-3 h-3" />
                            </div>
                            <div>
                              <span className="font-extrabold text-[10px] text-slate-900 dark:text-slate-100 tracking-tight block leading-tight">
                                AUDIO BALANCE
                              </span>
                              <span className="text-[8px] font-semibold text-teal-700 dark:text-teal-400 block -mt-0.5">
                                Teal 16pt
                              </span>
                            </div>
                          </div>
                          <div className="flex items-center justify-between text-[8px] text-teal-800 dark:text-teal-300 font-bold px-0.5 gap-1">
                            <Volume2 className="w-2.5 h-2.5 shrink-0" />
                            <span>L</span>
                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={mockAudioBalance}
                              onChange={(e) => handleAudioBalanceChange(Number(e.target.value))}
                              className="w-full accent-[#0d9488] h-1.5 bg-[#bde8dc] dark:bg-teal-900/40 rounded-lg cursor-pointer"
                            />
                            <span>R</span>
                            <Volume2 className="w-2.5 h-2.5 shrink-0" />
                          </div>
                        </div>

                        {/* Interface Theme (Cream/Warm) */}
                        <div className="p-2.5 rounded-2xl bg-[#fef3c7] dark:bg-[#2b2713]/90 border border-[#fde68a] dark:border-yellow-900/60 shadow-xs space-y-1.5">
                          <div className="flex items-center gap-2">
                            <div className="w-5 h-5 rounded-md bg-[#d97706] text-white flex items-center justify-center shrink-0 shadow-xs">
                              <Sliders className="w-3 h-3" />
                            </div>
                            <div>
                              <span className="font-extrabold text-[10px] text-slate-900 dark:text-slate-100 tracking-tight block leading-tight">
                                INTERFACE THEME
                              </span>
                              <span className="text-[8px] font-semibold text-amber-800 dark:text-amber-400 block -mt-0.5">
                                Amber 16pt
                              </span>
                            </div>
                          </div>
                          <div className="grid grid-cols-3 gap-1 pt-0.5 text-[8px] font-bold">
                            <button
                              type="button"
                              onClick={() => handleThemeModeChange('light')}
                              className={`py-1 rounded-md flex items-center justify-center gap-1 transition-all ${
                                mockThemeMode === 'light'
                                  ? 'bg-amber-600 text-white shadow-xs'
                                  : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-white'
                              }`}
                            >
                              <Sun className="w-2.5 h-2.5" />
                              <span>Light</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleThemeModeChange('dim')}
                              className={`py-1 rounded-md flex items-center justify-center gap-1 transition-all ${
                                mockThemeMode === 'dim'
                                  ? 'bg-amber-600 text-white shadow-xs'
                                  : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-white'
                              }`}
                            >
                              <div className="w-2.5 h-2.5 rounded-full border border-current flex items-center justify-center">
                                <div className="w-1.5 h-1.5 rounded-full bg-current opacity-70" />
                              </div>
                              <span>Dim</span>
                            </button>
                            <button
                              type="button"
                              onClick={() => handleThemeModeChange('dark')}
                              className={`py-1 rounded-md flex items-center justify-center gap-1 transition-all ${
                                mockThemeMode === 'dark'
                                  ? 'bg-amber-600 text-white shadow-xs'
                                  : 'bg-white/80 dark:bg-slate-800 text-slate-700 dark:text-slate-300 hover:bg-white'
                              }`}
                            >
                              <div className="w-3 h-3 rounded-full bg-white flex items-center justify-center overflow-hidden">
                                <div className="w-2.5 h-2.5 rounded-full bg-[#1e242f] translate-x-0.5" />
                              </div>
                              <span>Dark</span>
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Column 2: ACCESSIBILITY TOGGLES */}
                      <div className="space-y-2">
                        <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block px-0.5">
                          ACCESSIBILITY TOGGLES
                        </span>

                        <div className="p-2.5 rounded-2xl bg-white dark:bg-slate-900/90 border border-stone-200 dark:border-slate-800 shadow-xs space-y-2">
                          {/* Toggle 1: Screen Reader */}
                          <div className="flex items-center justify-between">
                            <span className="font-extrabold text-[9px] text-slate-800 dark:text-slate-200">
                              SCREEN READER
                            </span>
                            <button
                              type="button"
                              role="switch"
                              aria-checked={mockScreenReader}
                              onClick={handleToggleScreenReader}
                              className={`relative inline-flex h-5 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ${
                                mockScreenReader ? 'bg-[#157a70]' : 'bg-[#e2e8f0] dark:bg-slate-700'
                              }`}
                            >
                              {mockScreenReader ? (
                                <>
                                  <span className="text-[8px] font-black text-white pl-1.5">ON</span>
                                  <span className="absolute right-0.5 inline-block h-4 w-4 rounded-full bg-white shadow-xs" />
                                </>
                              ) : (
                                <>
                                  <span className="absolute left-0.5 inline-block h-4 w-4 rounded-full bg-white shadow-xs" />
                                  <span className="text-[8px] font-bold text-slate-500 pr-1.5 ml-auto">OFF</span>
                                </>
                              )}
                            </button>
                          </div>

                          {/* Toggle 2: High Contrast */}
                          <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
                            <span className="font-extrabold text-[9px] text-slate-800 dark:text-slate-200">
                              HIGH CONTRAST
                            </span>
                            <button
                              type="button"
                              role="switch"
                              aria-checked={mockHighContrast}
                              onClick={handleToggleHighContrast}
                              className={`relative inline-flex h-5 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ${
                                mockHighContrast ? 'bg-[#157a70]' : 'bg-[#e2e8f0] dark:bg-slate-700'
                              }`}
                            >
                              {mockHighContrast ? (
                                <>
                                  <span className="text-[8px] font-black text-white pl-1.5">ON</span>
                                  <span className="absolute right-0.5 inline-block h-4 w-4 rounded-full bg-white shadow-xs" />
                                </>
                              ) : (
                                <>
                                  <span className="absolute left-0.5 inline-block h-4 w-4 rounded-full bg-white shadow-xs" />
                                  <span className="text-[8px] font-bold text-slate-500 pr-1.5 ml-auto">OFF</span>
                                </>
                              )}
                            </button>
                          </div>

                          {/* Toggle 3: Simplified Mode */}
                          <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
                            <span className="font-extrabold text-[9px] text-slate-800 dark:text-slate-200">
                              SIMPLIFIED MODE
                            </span>
                            <button
                              type="button"
                              role="switch"
                              aria-checked={mockSimplifiedMode}
                              onClick={handleToggleSimplifiedMode}
                              className={`relative inline-flex h-5 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ${
                                mockSimplifiedMode ? 'bg-[#157a70]' : 'bg-[#e2e8f0] dark:bg-slate-700'
                              }`}
                            >
                              {mockSimplifiedMode ? (
                                <>
                                  <span className="text-[8px] font-black text-white pl-1.5">ON</span>
                                  <span className="absolute right-0.5 inline-block h-4 w-4 rounded-full bg-white shadow-xs" />
                                </>
                              ) : (
                                <>
                                  <span className="absolute left-0.5 inline-block h-4 w-4 rounded-full bg-white shadow-xs" />
                                  <span className="text-[8px] font-bold text-slate-500 pr-1.5 ml-auto">OFF</span>
                                </>
                              )}
                            </button>
                          </div>

                          {/* Slider 4: Text Resizing */}
                          <div className="pt-1 border-t border-slate-100 dark:border-slate-800 space-y-0.5">
                            <span className="font-extrabold text-[9px] text-slate-800 dark:text-slate-200 block">
                              TEXT RESIZING
                            </span>
                            <div className="flex items-center gap-1.5">
                              <span className="text-[8px] font-semibold text-slate-500">Medium</span>
                              <input
                                type="range"
                                min="100"
                                max="150"
                                value={mockTextResizing}
                                onChange={(e) => handleTextResizingChange(Number(e.target.value))}
                                className="w-full accent-[#0d9488] h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                              />
                              <span className="text-[8px] font-mono font-bold text-teal-700 dark:text-teal-400 shrink-0">
                                {mockTextResizing}%
                              </span>
                            </div>
                          </div>

                          {/* Toggle 5: Haptic Feedback */}
                          <div className="flex items-center justify-between pt-1 border-t border-slate-100 dark:border-slate-800">
                            <span className="font-extrabold text-[9px] text-slate-800 dark:text-slate-200">
                              HAPTIC FEEDBACK
                            </span>
                            <button
                              type="button"
                              role="switch"
                              aria-checked={mockHapticFeedback}
                              onClick={handleToggleHaptic}
                              className={`relative inline-flex h-5 w-12 shrink-0 cursor-pointer items-center rounded-full transition-colors duration-200 ${
                                mockHapticFeedback ? 'bg-[#157a70]' : 'bg-[#e2e8f0] dark:bg-slate-700'
                              }`}
                            >
                              {mockHapticFeedback ? (
                                <>
                                  <span className="text-[8px] font-black text-white pl-1.5">ON</span>
                                  <span className="absolute right-0.5 inline-block h-4 w-4 rounded-full bg-white shadow-xs" />
                                </>
                              ) : (
                                <>
                                  <span className="absolute left-0.5 inline-block h-4 w-4 rounded-full bg-white shadow-xs" />
                                  <span className="text-[8px] font-bold text-slate-500 pr-1.5 ml-auto">OFF</span>
                                </>
                              )}
                            </button>
                          </div>
                        </div>
                      </div>

                      {/* Column 3: SENSORY MONITORING */}
                      <div className="space-y-2">
                        <span className="text-[9px] font-black uppercase tracking-wider text-slate-500 dark:text-slate-400 block px-0.5">
                          SENSORY MONITORING
                        </span>

                        {/* Daily Engagement Bar Chart */}
                        <div className="p-2.5 rounded-2xl bg-[#fee4db] dark:bg-[#2b1f15]/90 border border-[#fed0c1] dark:border-orange-900/60 shadow-xs space-y-1">
                          <div>
                            <span className="font-extrabold text-[10px] text-slate-900 dark:text-slate-100 tracking-tight block leading-tight">
                              DAILY ENGAGEMENT
                            </span>
                            <span className="text-[8px] font-semibold text-orange-700 dark:text-orange-400 block -mt-0.5">
                              DAILY 14pt
                            </span>
                          </div>
                          <div className="h-11 flex items-end justify-between gap-1 pt-1">
                            {[
                              { day: 'Mon', h: '38%' },
                              { day: 'Tue', h: '62%' },
                              { day: 'Wed', h: '45%' },
                              { day: 'Thu', h: '95%' },
                              { day: 'Fri', h: '75%' },
                              { day: 'Sat', h: '38%' },
                              { day: 'Sun', h: '68%' },
                            ].map((b, idx) => (
                              <div key={idx} className="flex-1 flex flex-col items-center gap-0.5">
                                <div
                                  className="w-full rounded-t-xs bg-[#f97316] hover:bg-[#ea580c] transition-all"
                                  style={{ height: b.h }}
                                />
                                <span className="text-[7px] text-orange-950 dark:text-orange-300 font-medium">
                                  {b.day}
                                </span>
                              </div>
                            ))}
                          </div>
                        </div>

                        {/* Noise Level Alert Semicircular Arc Gauge */}
                        <div
                          onClick={cycleNoiseLevel}
                          title="Click to test ambient noise sensor"
                          className="p-2.5 rounded-2xl bg-[#edfbf7] dark:bg-[#112a23]/90 border border-[#cbf0e6] dark:border-teal-900/60 shadow-xs space-y-0.5 cursor-pointer hover:border-teal-400 transition-colors"
                        >
                          <div>
                            <span className="font-extrabold text-[10px] text-slate-900 dark:text-slate-100 tracking-tight block leading-tight">
                              NOISE LEVEL ALERT
                            </span>
                            <span className="text-[8px] font-semibold text-teal-700 dark:text-teal-400 block -mt-0.5">
                              Teal 14pt
                            </span>
                          </div>
                          <div className="relative flex flex-col items-center justify-center pt-0.5">
                            <svg viewBox="0 0 120 62" className="w-24 h-12">
                              {/* Background Arc */}
                              <path
                                d="M 15 58 A 45 45 0 0 1 105 58"
                                fill="none"
                                stroke="#cbf0e6"
                                strokeWidth="7"
                                strokeLinecap="round"
                              />
                              {/* Active Dynamic Teal Arc */}
                              <path
                                d="M 15 58 A 45 45 0 0 1 68 15"
                                fill="none"
                                stroke={mockNoiseLevel > 70 ? '#ea580c' : '#14b8a6'}
                                strokeWidth="7"
                                strokeLinecap="round"
                              />
                            </svg>
                            <div className="absolute inset-0 flex flex-col items-center justify-end pb-0.5">
                              <span className="text-base font-black text-slate-800 dark:text-slate-100 font-sans tracking-tight">
                                {mockNoiseLevel}
                              </span>
                              <span className="text-[8px] font-bold text-slate-400 -mt-1">dB</span>
                            </div>
                            <div className="w-full flex justify-between px-1 text-[7px] font-bold text-slate-400">
                              <span>30 dB</span>
                              <span className="text-teal-600">55 dB</span>
                              <span>90 dB</span>
                            </div>
                          </div>
                        </div>

                        {/* Focus Assist Countdown */}
                        <div className="p-2.5 rounded-2xl bg-[#fef4db] dark:bg-[#2b2512]/90 border border-[#fde68a] dark:border-amber-900/60 shadow-xs space-y-1">
                          <div className="flex items-center justify-between">
                            <div>
                              <span className="font-extrabold text-[10px] text-slate-900 dark:text-slate-100 tracking-tight block leading-tight">
                                FOCUS ASSIST
                              </span>
                              <span className="text-[8px] font-semibold text-amber-700 dark:text-amber-400 block -mt-0.5">
                                Amber 14pt
                              </span>
                            </div>
                            <span className="w-1.5 h-1.5 rounded-full bg-amber-500 animate-pulse" />
                          </div>
                          <div className="text-center font-mono font-black text-base text-slate-900 dark:text-amber-200 py-0.5">
                            {formatTimer(mockFocusSeconds)}
                          </div>
                          <button
                            type="button"
                            onClick={() => setMockFocusActive(!mockFocusActive)}
                            className="w-full py-1.5 rounded-xl bg-[#2a2e37] text-white text-[9px] font-black hover:bg-black transition-colors cursor-pointer text-center"
                          >
                            {mockFocusActive ? 'Pause Session' : 'Start Session'}
                          </button>
                        </div>
                      </div>
                    </div>
                  </div>
                </div>
              </div>
            </div>

            {/* Right Column: Content & Typography */}
            <div className="lg:col-span-6 space-y-6 text-start">
              {/* Top Badge: [INCLUSIVE INNOVATION] */}
              <div>
                <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold uppercase tracking-wider bg-[#dbeafe] text-[#2563eb] border border-[#bfdbfe] dark:bg-blue-950/80 dark:text-blue-300 dark:border-blue-800">
                  <Sparkles className="w-3.5 h-3.5 text-[#2563eb] dark:text-blue-400" />
                  <span>{lang === 'ar' ? '[ابتكار شامل]' : '[INCLUSIVE INNOVATION]'}</span>
                </span>
              </div>

              {/* Main Heading: Learning Without Limits */}
              <h2 className="text-3xl sm:text-4xl lg:text-5xl font-bold font-serif tracking-tight text-[#1e2f4d] dark:text-white leading-[1.15]">
                {lang === 'ar' ? 'تعلم بلا حدود' : 'Learning Without Limits'}
              </h2>

              {/* Sub-headline/Description */}
              <p className="text-base sm:text-lg font-sans text-slate-600 dark:text-slate-300 leading-relaxed max-w-xl">
                {lang === 'ar'
                  ? 'يجب أن يتكيف تعليم التكنولوجيا مع احتياجات المتعلم. تدمج كوديرا إمكانية الوصول مباشرة في جوهر المنصة بدلاً من الاعتماد على أدوات خارجية معقدة.'
                  : 'Technology education should mold itself to the learner. CodeRa integrates accessibility directly into core features rather than utilizing complex third-party tools.'}
              </p>

              {/* Feature List: 4 items, each preceded by a solid blue circular checkmark icon */}
              <div className="space-y-4 pt-2">
                {[
                  {
                    title:
                      lang === 'ar'
                        ? 'تحويل النص إلى كلام وقارئات الشاشة متعددة الوسائط'
                        : 'Multimodal TTS & Screen Readers',
                    desc:
                      lang === 'ar'
                        ? 'نطق صوتي مدمج للهياكل البرمجية والتلميحات المرئية اللمسية.'
                        : 'Native vocalization for code structures and visual prompts.',
                  },
                  {
                    title:
                      lang === 'ar' ? 'التنقل اللمسي عبر لوحة المفاتيح' : 'Tactile Keyboard Navigation',
                    desc:
                      lang === 'ar'
                        ? 'مسارات بدون ماوس مع اختصارات مخصصة وإطارات تركيز دقيقة.'
                        : 'No-mouse pathways with custom shortcuts and focus frames.',
                  },
                  {
                    title:
                      lang === 'ar' ? 'تقليل الحركة والتباين العالي' : 'Reduced Motion & High Contrast',
                    desc:
                      lang === 'ar'
                        ? 'إعدادات افتراضية مريحة حسياً تقلل من الحمل المعرفي.'
                        : 'Sensory-friendly defaults that minimise cognitive load.',
                  },
                  {
                    title: lang === 'ar' ? 'التحجيم والتكبير التكيفي' : 'Adaptive Sizing',
                    desc:
                      lang === 'ar'
                        ? 'خطوط قابلة للتكبير حتى 200% دون كسر الهيكل المرئي أو التنسيق.'
                        : 'Scalable typography up to 200% without structural breakage.',
                  },
                ].map((item, idx) => (
                  <div key={idx} className="flex items-start gap-3.5">
                    {/* Solid blue circular checkmark icon */}
                    <div className="w-5 h-5 rounded-full bg-[#2563eb] text-white flex items-center justify-center shrink-0 mt-0.5 shadow-sm">
                      <Check className="w-3.5 h-3.5 stroke-[3]" />
                    </div>
                    <div>
                      <h3 className="text-sm sm:text-base font-bold text-slate-900 dark:text-white leading-snug">
                        {item.title}
                      </h3>
                      <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-0.5 leading-relaxed">
                        {item.desc}
                      </p>
                    </div>
                  </div>
                ))}
              </div>

              {/* Call to Action Button: Rounded Royal-Blue button */}
              <div className="pt-3">
                <button
                  type="button"
                  onClick={() => window.dispatchEvent(new CustomEvent('open-accessibility-drawer'))}
                  className="inline-flex items-center justify-center px-8 py-3.5 rounded-full font-bold text-sm sm:text-base text-white bg-[#2563eb] hover:bg-[#1d4ed8] shadow-lg shadow-blue-500/25 transition-all duration-300 hover:scale-105 active:scale-95 cursor-pointer"
                >
                  <span>{lang === 'ar' ? 'فتح لوحة إمكانية الوصول' : 'Open Accessibility Panel'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </section>





      {/* ========================================================================= */}
      {/* 7. PLATFORM FOOTER                                                        */}
      {/* ========================================================================= */}
      <footer className="py-10 border-t border-slate-200 dark:border-slate-800 bg-white dark:bg-[#080d1a] text-xs text-slate-500 dark:text-slate-400">
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 flex flex-col sm:flex-row items-center justify-between gap-6">
          <div className="flex items-center gap-3">
            <div className="w-9 h-9 rounded-xl bg-gradient-to-tr from-emerald-600 via-teal-600 to-blue-600 flex items-center justify-center text-white font-bold text-xs shadow-sm overflow-hidden p-1">
              <img src="./logo.svg" alt="CodeRa Logo" className="w-full h-full object-contain" />
            </div>
            <div>
              <span className="font-serif font-black text-slate-900 dark:text-white text-base block">CodeRa</span>
              <span className="text-[11px]">© 2026 CodeRa Technologies. All Rights Reserved.</span>
            </div>
          </div>

          <div className="flex items-center gap-6 font-semibold">
            <button
              type="button"
              onClick={() => {
                const elem = document.getElementById('hero');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
            >
              {lang === 'ar' ? 'الرئيسية' : 'Home'}
            </button>
            <button
              type="button"
              onClick={() => {
                const elem = document.getElementById('learning-tracks') || document.getElementById('tracks');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
            >
              {lang === 'ar' ? 'المسارات' : 'Tracks'}
            </button>
            <button
              type="button"
              onClick={() => {
                const elem = document.getElementById('why-codera') || document.getElementById('about');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
            >
              {lang === 'ar' ? 'عن كوديرا' : 'About'}
            </button>
            <button
              type="button"
              onClick={() => window.dispatchEvent(new CustomEvent('open-accessibility-drawer'))}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
            >
              {lang === 'ar' ? 'إمكانية الوصول' : 'Accessibility'}
            </button>
          </div>
        </div>
      </footer>

      {/* ========================================================================= */}
      {/* 8. TEACHER PDP BOOKING MODAL                                              */}
      {/* ========================================================================= */}
      {isTeacherBookingOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-xl rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726] shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in-95">
            {/* Modal Header */}
            <div className="p-6 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="p-3 rounded-2xl bg-teal-100 dark:bg-teal-950 text-teal-600">
                  <Calendar className="w-6 h-6" />
                </span>
                <div>
                  <h3 className="font-black text-lg font-serif text-slate-900 dark:text-white">
                    {lang === 'ar' ? 'حجز مقعد — دبلوم تدريب المعلمين' : 'Book Teacher Professional Development'}
                  </h3>
                  <p className="text-xs text-slate-500 dark:text-slate-400">
                    Programming Training for Special Needs Students Course
                  </p>
                </div>
              </div>
              <button
                type="button"
                onClick={() => setIsTeacherBookingOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-500 hover:text-slate-900 dark:hover:text-white"
                aria-label="Close"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Body */}
            <div className="p-6 overflow-y-auto max-h-[75vh] space-y-4 text-start">
              {teacherBookingSuccess ? (
                <div className="text-center py-6 space-y-4">
                  <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 flex items-center justify-center mx-auto text-3xl">
                    <CheckCircle2 className="w-10 h-10" />
                  </div>
                  <h4 className="text-xl font-black text-emerald-600">
                    {lang === 'ar' ? 'تم تأكيد حجز مقعدك بنجاح!' : 'Booking Confirmed Successfully!'}
                  </h4>
                  <p className="text-xs sm:text-sm max-w-md mx-auto text-slate-600 dark:text-slate-300">
                    {lang === 'ar'
                      ? `تم تسجيل طلبك وحجز مقعدك في الدفعة القادمة. رمز الحجز الخاص بك هو ${teacherBookingRef}. تم إرسال تفاصيل الجلسة وحقيبة العتاد المساند إلى بريدك الإلكتروني.`
                      : `Your cohort seat is reserved. Confirmation code: ${teacherBookingRef}. Training kit shipment & virtual access links dispatched to ${teacherForm.email}.`}
                  </p>
                  <button
                    type="button"
                    onClick={() => setIsTeacherBookingOpen(false)}
                    className="w-full py-3.5 rounded-full text-white font-bold text-sm bg-teal-600 hover:bg-teal-700 shadow-md cursor-pointer"
                  >
                    {lang === 'ar' ? 'إغلاق والعودة للمنصة' : 'Done & Return to Overview'}
                  </button>
                </div>
              ) : (
                <form
                  onSubmit={(e) => {
                    e.preventDefault();
                    const refId = `PDP-2026-${Math.floor(1000 + Math.random() * 9000)}`;
                    setTeacherBookingRef(refId);
                    try {
                      localStorage.setItem('codera_teacher_booking', JSON.stringify({ ...teacherForm, refId }));
                    } catch (err) {}
                    setTeacherBookingSuccess(true);
                  }}
                  className="space-y-4"
                >
                  <div className="space-y-1">
                    <label className="text-xs font-bold block text-slate-700 dark:text-slate-200">
                      {lang === 'ar' ? 'الاسم الكامل للمعلم / الأخصائي' : 'Full Educator / Specialist Name'}
                    </label>
                    <input
                      type="text"
                      required
                      value={teacherForm.name}
                      onChange={(e) => setTeacherForm({ ...teacherForm, name: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                      placeholder="e.g. Sarah Al-Mansoor"
                    />
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold block text-slate-700 dark:text-slate-200">
                        {lang === 'ar' ? 'البريد الإلكتروني المهني' : 'Work Email'}
                      </label>
                      <input
                        type="email"
                        required
                        value={teacherForm.email}
                        onChange={(e) => setTeacherForm({ ...teacherForm, email: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="sarah@inclusive-edu.org"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold block text-slate-700 dark:text-slate-200">
                        {lang === 'ar' ? 'المدرسة / المركز التعليمي' : 'School / Institution'}
                      </label>
                      <input
                        type="text"
                        required
                        value={teacherForm.school}
                        onChange={(e) => setTeacherForm({ ...teacherForm, school: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                        placeholder="e.g. Horizon Inclusive Academy"
                      />
                    </div>
                  </div>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                    <div className="space-y-1">
                      <label className="text-xs font-bold block text-slate-700 dark:text-slate-200">
                        {lang === 'ar' ? 'تاريخ الدفعة التدريبية' : 'Preferred Cohort Date'}
                      </label>
                      <input
                        type="date"
                        value={teacherForm.date}
                        onChange={(e) => setTeacherForm({ ...teacherForm, date: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                      />
                    </div>

                    <div className="space-y-1">
                      <label className="text-xs font-bold block text-slate-700 dark:text-slate-200">
                        {lang === 'ar' ? 'توقيت الجلسة' : 'Session Slot'}
                      </label>
                      <select
                        value={teacherForm.time}
                        onChange={(e) => setTeacherForm({ ...teacherForm, time: e.target.value })}
                        className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                      >
                        <option value="10:00 AM - 1:00 PM">Morning (10:00 AM - 1:00 PM)</option>
                        <option value="4:00 PM - 7:00 PM">Afternoon (4:00 PM - 7:00 PM)</option>
                        <option value="Weekend Intensive">Weekend Intensive (Saturday)</option>
                      </select>
                    </div>
                  </div>

                  <div className="space-y-1">
                    <label className="text-xs font-bold block text-slate-700 dark:text-slate-200">
                      {lang === 'ar' ? 'المجال التخصصي الأساسي' : 'Specialization Focus'}
                    </label>
                    <select
                      value={teacherForm.specialization}
                      onChange={(e) => setTeacherForm({ ...teacherForm, specialization: e.target.value })}
                      className="w-full px-3.5 py-2.5 rounded-xl border border-slate-300 dark:border-slate-700 bg-slate-50 dark:bg-slate-900 text-slate-900 dark:text-slate-100 text-xs sm:text-sm font-medium focus:outline-none focus:ring-2 focus:ring-teal-500"
                    >
                      <option value="Autism Spectrum & Sensory Computing">Autism Spectrum &amp; Sensory Computing</option>
                      <option value="Visual Impairment & Screen Reader Robotics">Visual Impairment &amp; Screen Reader Robotics</option>
                      <option value="Motor Impairment & Adaptive Switch Control">Motor Impairment &amp; Adaptive Switch Control</option>
                      <option value="Universal Neurodiverse Inclusive Classroom">Universal Neurodiverse Inclusive Classroom</option>
                    </select>
                  </div>

                  <button
                    type="submit"
                    className="w-full py-4 rounded-full text-white font-black text-sm bg-teal-600 hover:bg-teal-700 shadow-md hover:shadow-lg transition-all cursor-pointer flex items-center justify-center gap-2 mt-4"
                  >
                    <Calendar className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'تأكيد حجز المقعد الآن' : 'Confirm Cohort Booking Now'}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </button>
                </form>
              )}
            </div>
          </div>
        </div>
      )}

      {/* ========================================================================= */}
      {/* 9. INTERACTIVE ROLE JOURNEY MODAL                                         */}
      {/* ========================================================================= */}
      {isRoleJourneyOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-2 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-5xl h-[92vh] rounded-3xl border border-slate-200 dark:border-slate-800 bg-white dark:bg-[#101726] shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in-95">
            {/* Modal Header Bar */}
            <div className="p-4 border-b border-slate-200 dark:border-slate-800 flex items-center justify-between shrink-0 bg-slate-50 dark:bg-slate-900">
              <div className="flex items-center gap-2">
                <span className="p-2 rounded-xl bg-blue-100 dark:bg-blue-950 text-blue-600">
                  <Compass className="w-5 h-5" />
                </span>
                <div>
                  <h3 className="font-bold text-sm font-serif text-slate-900 dark:text-white">
                    {lang === 'ar' ? 'رحلة استكشاف الأدوار — كوديرا' : 'CodeRa Role Discovery Journey'}
                  </h3>
                  <p className="text-[10px] text-slate-500 dark:text-slate-400">
                    {lang === 'ar' ? 'حدد دورك لتجربة المنهج والأنشطة المناسبة' : 'Explore builder, mentor, and institutional paths'}
                  </p>
                </div>
              </div>

              <button
                type="button"
                onClick={() => setIsRoleJourneyOpen(false)}
                className="p-2 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 transition-colors cursor-pointer text-slate-500 hover:text-slate-900 dark:hover:text-white"
                aria-label="Close Role Journey"
              >
                <X className="w-5 h-5" />
              </button>
            </div>

            {/* Modal Content Frame */}
            <div className="flex-1 overflow-y-auto">
              <RoleJourneyApp
                initialScreen={roleJourneyInitialScreen}
                onClose={() => setIsRoleJourneyOpen(false)}
              />
            </div>
          </div>
        </div>
      )}
    </div>
  );
};

export default LandingPage;
