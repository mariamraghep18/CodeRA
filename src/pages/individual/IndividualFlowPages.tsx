import React, { useState, useEffect } from 'react';
import { useRouter } from '../../router/Router';
import { useMockData } from '../../context/MockDataContext';
import { UniversalBackButton } from '../../components/UniversalBackButton';
import { ProfileAvatarButton } from '../../components/profile/ProfileAvatarButton';
import {
  Code2,
  Hand,
  CheckCircle2,
  Lock,
  Unlock,
  CreditCard,
  Award,
  Sparkles,
  ArrowRight,
  ArrowLeft,
  Laptop,
  Check,
  Play,
  RotateCcw,
  Download,
  Share2,
  Printer,
  FileCode,
  Terminal,
  Activity,
  Layers,
  Volume2,
  VolumeX,
  Eye,
  EyeOff,
  Clock,
  Flame,
  ShieldCheck,
  CheckCircle,
  HelpCircle,
  AlertCircle,
  Trophy,
  ExternalLink,
} from 'lucide-react';

/* ========================================================================= */
/* 1. VIEW 1: CREATE INDIVIDUAL ACCOUNT (/register-individual)               */
/* Matching Screenshot 32: ADAPTIVE LEARNING PORTAL, Track Cards, TOS        */
/* ========================================================================= */
export const RegisterIndividualPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, registerIndividual, setActiveIndividualId } = useMockData();

  // Dynamic user inputs
  const [fullName, setFullName] = useState('Nadia Al-Mutairi');
  const [email, setEmail] = useState('nadia.mutairi@example.com');
  const [phone, setPhone] = useState('+966 50 123 4567');
  const [dob, setDob] = useState('1998-05-14');
  const [password, setPassword] = useState('CodeRaSecure2026!');
  const [confirmPassword, setConfirmPassword] = useState('CodeRaSecure2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);

  // Dynamic track selection in registration
  const [selectedTrack, setSelectedTrack] = useState<'programming' | 'sign_language'>('programming');

  // Accessibility checkboxes
  const [accessibilityPrefs, setAccessibilityPrefs] = useState({
    screenReader: false,
    textToSpeech: true,
    highContrast: false,
    keyboardNav: true,
  });

  const [agreedToTerms, setAgreedToTerms] = useState(true);
  const [errorMessage, setErrorMessage] = useState('');

  const togglePref = (key: keyof typeof accessibilityPrefs) => {
    setAccessibilityPrefs((prev) => ({ ...prev, [key]: !prev[key] }));
  };

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!fullName.trim() || !email.trim() || !password.trim()) {
      setErrorMessage(lang === 'ar' ? 'يرجى ملء جميع الحقول المطلوبة' : 'Please fill in all required fields');
      return;
    }
    if (password !== confirmPassword) {
      setErrorMessage(lang === 'ar' ? 'كلمات المرور غير متطابقة' : 'Passwords do not match');
      return;
    }
    if (!agreedToTerms) {
      setErrorMessage(lang === 'ar' ? 'يرجى الموافقة على شروط الخدمة' : 'Please accept the Terms of Service');
      return;
    }

    const ind = registerIndividual({
      fullName: fullName.trim(),
      email: email.trim(),
      phone: phone.trim(),
      dateOfBirth: dob,
      track: selectedTrack,
    });
    setActiveIndividualId(ind.id);
    navigate('/track-selection');
  };

  return (
    <div
      className="min-h-[calc(100vh-4.5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-10 transition-colors"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div
        className="w-full max-w-5xl rounded-3xl border shadow-2xl overflow-hidden grid grid-cols-1 lg:grid-cols-12 animate-in fade-in"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        {/* Left Form Area (7 cols) */}
        <div className="lg:col-span-7 p-6 sm:p-10 flex flex-col justify-between space-y-6">
          <div className="flex items-center justify-start mb-1">
            <UniversalBackButton to="/" label="Back to Home" />
          </div>

          <div className="space-y-2">
            <span
              className="inline-block text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full"
              style={{
                backgroundColor: 'rgba(29, 78, 216, 0.1)',
                color: '#1d4ed8',
              }}
            >
              ADAPTIVE LEARNING PORTAL
            </span>
            <h1 className="text-3xl font-black font-serif tracking-tight" style={{ color: 'var(--color-text)' }}>
              {lang === 'ar' ? 'إنشاء حساب فردي' : 'Create Individual Account'}
            </h1>
            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {lang === 'ar'
                ? 'ابدأ رحلتك التعليمية الشخصية وتعرف على مساراتنا المصممة لتلائم وتتكيف مع قدراتك.'
                : 'Start your personal learning journey.'}
            </p>
          </div>

          {errorMessage && (
            <div className="p-3 rounded-2xl bg-rose-500/10 border border-rose-500/20 text-rose-600 dark:text-rose-400 text-xs flex items-center gap-2">
              <AlertCircle className="w-4 h-4 shrink-0" />
              <span>{errorMessage}</span>
            </div>
          )}

          <form onSubmit={handleSubmit} className="space-y-4">
            {/* Full Name */}
            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                {lang === 'ar' ? 'الاسم الكامل' : 'Full Name'} *
              </label>
              <input
                type="text"
                required
                value={fullName}
                onChange={(e) => setFullName(e.target.value)}
                placeholder="e.g. Nadia Al-Mutairi"
                className="w-full px-4 py-3 rounded-2xl border text-xs outline-none transition-all focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)',
                }}
              />
            </div>

            {/* Email & Phone Grid */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                  {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'} *
                </label>
                <input
                  type="email"
                  required
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="learner@codera.org"
                  className="w-full px-4 py-3 rounded-2xl border text-xs outline-none transition-all focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)',
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                  {lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'}
                </label>
                <input
                  type="tel"
                  value={phone}
                  onChange={(e) => setPhone(e.target.value)}
                  placeholder="+966 50 000 0000"
                  className="w-full px-4 py-3 rounded-2xl border text-xs outline-none transition-all focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)',
                  }}
                />
              </div>
            </div>

            {/* Date of Birth */}
            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                {lang === 'ar' ? 'تاريخ الميلاد' : 'Date of Birth'}
              </label>
              <input
                type="date"
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border text-xs outline-none transition-all focus:ring-2 focus:ring-blue-500"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)',
                }}
              />
            </div>

            {/* Passwords with Show/Hide Toggles */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                  {lang === 'ar' ? 'كلمة المرور' : 'Password'} *
                </label>
                <div className="relative">
                  <input
                    type={showPassword ? 'text' : 'password'}
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border text-xs outline-none pr-10 rtl:pr-4 rtl:pl-10 transition-all focus:ring-2 focus:ring-blue-500"
                    style={{
                      backgroundColor: 'var(--color-bg)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text)',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    {showPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                  {lang === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'} *
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border text-xs outline-none pr-10 rtl:pr-4 rtl:pl-10 transition-all focus:ring-2 focus:ring-blue-500"
                    style={{
                      backgroundColor: 'var(--color-bg)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text)',
                    }}
                  />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute right-3 rtl:right-auto rtl:left-3 top-1/2 -translate-y-1/2 text-xs font-bold text-blue-600 hover:text-blue-800 cursor-pointer"
                  >
                    {showConfirmPassword ? <EyeOff className="w-4 h-4" /> : <Eye className="w-4 h-4" />}
                  </button>
                </div>
              </div>
            </div>

            {/* Interactive Track Selection Cards */}
            <div>
              <label className="block text-xs font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                {lang === 'ar' ? 'اختر مسارك التعليمي المفضل' : 'Choose Your Learning Track'}
              </label>
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Programming Option */}
                <div
                  onClick={() => setSelectedTrack('programming')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3.5 ${
                    selectedTrack === 'programming'
                      ? 'border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 shadow-md ring-2 ring-blue-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                  style={{ backgroundColor: selectedTrack === 'programming' ? undefined : 'var(--color-bg)' }}
                >
                  <div className={`p-2.5 rounded-xl ${selectedTrack === 'programming' ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                    <Code2 className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-black block" style={{ color: 'var(--color-text)' }}>
                      Programming Track
                    </span>
                    <span className="text-[10px] block opacity-75" style={{ color: 'var(--color-text-muted)' }}>
                      Tactile blocks, Python & algorithms
                    </span>
                  </div>
                </div>

                {/* Sign Language Option */}
                <div
                  onClick={() => setSelectedTrack('sign_language')}
                  className={`p-4 rounded-2xl border-2 transition-all cursor-pointer flex items-center gap-3.5 ${
                    selectedTrack === 'sign_language'
                      ? 'border-emerald-600 bg-emerald-50/50 dark:bg-emerald-950/30 shadow-md ring-2 ring-emerald-500/20'
                      : 'border-slate-200 dark:border-slate-800 hover:border-slate-300'
                  }`}
                  style={{ backgroundColor: selectedTrack === 'sign_language' ? undefined : 'var(--color-bg)' }}
                >
                  <div className={`p-2.5 rounded-xl ${selectedTrack === 'sign_language' ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-300'}`}>
                    <Hand className="w-5 h-5" />
                  </div>
                  <div>
                    <span className="text-xs font-black block" style={{ color: 'var(--color-text)' }}>
                      Sign Language Track
                    </span>
                    <span className="text-[10px] block opacity-75" style={{ color: 'var(--color-text-muted)' }}>
                      Interactive 3D sign tech dictionary
                    </span>
                  </div>
                </div>
              </div>
            </div>

            {/* Accessibility Preferences Checkboxes */}
            <div className="pt-2">
              <span className="block text-xs font-bold mb-2" style={{ color: 'var(--color-text)' }}>
                {lang === 'ar' ? 'تفضيلات إمكانية الوصول' : 'Accessibility Preferences'}
              </span>
              <div className="grid grid-cols-2 gap-2 text-[11px]">
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={accessibilityPrefs.screenReader}
                    onChange={() => togglePref('screenReader')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span style={{ color: 'var(--color-text)' }}>Screen Reader Support</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={accessibilityPrefs.textToSpeech}
                    onChange={() => togglePref('textToSpeech')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span style={{ color: 'var(--color-text)' }}>Text-to-Speech</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={accessibilityPrefs.highContrast}
                    onChange={() => togglePref('highContrast')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span style={{ color: 'var(--color-text)' }}>High Contrast Mode</span>
                </label>
                <label className="flex items-center gap-2 cursor-pointer select-none">
                  <input
                    type="checkbox"
                    checked={accessibilityPrefs.keyboardNav}
                    onChange={() => togglePref('keyboardNav')}
                    className="rounded text-blue-600 focus:ring-blue-500"
                  />
                  <span style={{ color: 'var(--color-text)' }}>Keyboard Navigation</span>
                </label>
              </div>
            </div>

            {/* Terms of Service Checkbox */}
            <div className="pt-1">
              <label className="flex items-start gap-2.5 cursor-pointer text-xs select-none">
                <input
                  type="checkbox"
                  required
                  checked={agreedToTerms}
                  onChange={(e) => setAgreedToTerms(e.target.checked)}
                  className="mt-0.5 rounded text-blue-600 focus:ring-blue-500"
                />
                <span style={{ color: 'var(--color-text-muted)' }}>
                  {lang === 'ar'
                    ? 'أوافق على شروط الخدمة وسياسة الخصوصية الخاصة بمنصة كوديرا.'
                    : 'I agree to the Terms of Service and Privacy Policy for CodeRa Adaptive Ecosystem.'}
                </span>
              </label>
            </div>

            {/* Submit Button */}
            <button
              type="submit"
              className="w-full py-4 rounded-2xl text-white font-black text-xs sm:text-sm shadow-lg transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-4"
              style={{
                backgroundColor: '#1d4ed8',
                boxShadow: '0 4px 14px rgba(29, 78, 216, 0.35)',
              }}
            >
              <span>{lang === 'ar' ? 'إنشاء الحساب والمتابعة' : 'Create Account'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>
          </form>

          <div className="text-center text-xs pt-2" style={{ color: 'var(--color-text-muted)' }}>
            <span>{lang === 'ar' ? 'لديك حساب بالفعل؟' : 'Already have an account?'} </span>
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="font-bold text-blue-600 hover:underline cursor-pointer"
            >
              {lang === 'ar' ? 'تسجيل الدخول' : 'Sign In'}
            </button>
          </div>
        </div>

        {/* Right Illustration Column (5 cols) */}
        <div
          className="lg:col-span-5 relative hidden lg:flex flex-col justify-between p-10 text-white overflow-hidden"
          style={{
            background: 'linear-gradient(135deg, #1e3bb3 0%, #1d4ed8 50%, #0D8068 100%)',
          }}
        >
          <div className="relative z-10 space-y-4">
            <span className="inline-block text-[11px] font-bold uppercase tracking-wider px-3 py-1 rounded-full bg-white/20 backdrop-blur-md">
              Self-Directed Mastery
            </span>
            <h2 className="text-3xl font-black font-serif leading-tight">
              Adaptive Computer Science Without Barriers
            </h2>
            <p className="text-xs text-blue-100 leading-relaxed">
              Experience dynamic tactile loops, accessible Python compilers, and verifiable on-chain certificates tailored to diverse learning styles.
            </p>
          </div>

          {/* Interactive Feature Card Mockup */}
          <div className="relative z-10 my-6 rounded-2xl bg-white/10 backdrop-blur-md border border-white/20 p-5 shadow-2xl space-y-3">
            <div className="flex items-center justify-between">
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-xl bg-white/20 text-white">
                  <Laptop className="w-5 h-5" />
                </span>
                <div>
                  <span className="text-xs font-bold block">Python & Tactile Sandbox</span>
                  <span className="text-[10px] text-blue-100">Live Code Execution & Sensory Feedback</span>
                </div>
              </div>
              <span className="px-2 py-0.5 rounded text-[10px] font-bold bg-emerald-400/30 text-emerald-200">
                Active
              </span>
            </div>
            <div className="w-full h-2 rounded-full bg-white/20 overflow-hidden">
              <div className="w-4/5 h-full bg-emerald-400 rounded-full" />
            </div>
            <div className="flex justify-between text-[10px] text-blue-200">
              <span>Tactile Loops Mastered</span>
              <span>Level 1 Ready</span>
            </div>
          </div>

          <div className="relative z-10 flex items-center justify-between text-[11px] text-blue-200">
            <span>Adaptive Workspace</span>
            <span>Accredited Credentials</span>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 2. VIEW 2: CHOOSE YOUR LEARNING TRACK (/track-selection)                  */
/* Matching Screenshot 33: ADAPTIVE PATHWAYS, Programming vs Sign Language   */
/* ========================================================================= */
export const TrackSelectionPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, individuals, activeIndividualId } = useMockData();
  const activeUser = individuals.find((i) => i.id === activeIndividualId) || individuals[0];

  return (
    <div
      className="min-h-[calc(100vh-4.5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-10 transition-colors"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="w-full max-w-5xl space-y-8 animate-in fade-in">
        <div className="flex items-center justify-start">
          <UniversalBackButton to="/register-individual" label="Back to Registration" />
        </div>

        <div className="text-center space-y-3 max-w-xl mx-auto">
          <span
            className="inline-block text-[11px] font-extrabold uppercase tracking-wider px-3 py-1 rounded-full"
            style={{
              backgroundColor: 'rgba(29, 78, 216, 0.1)',
              color: '#1d4ed8',
            }}
          >
            ADAPTIVE PATHWAYS
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-serif tracking-tight" style={{ color: 'var(--color-text)' }}>
            {lang === 'ar' ? 'اختر مسارك التعليمي' : 'Choose Your Learning Track'}
          </h1>
          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            {lang === 'ar'
              ? 'اختر المسار المناسب لأهدافك. يمكنك استعراض محتوى المنهاج كاملاً قبل التأكيد والاشتراك.'
              : 'Select the path that matches your goals. You can preview course content before committing.'}
          </p>
        </div>

        <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
          {/* Card 1: Programming Track */}
          <div
            className="rounded-3xl border p-8 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-14 h-14 rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center shadow-sm">
                  <Code2 className="w-7 h-7" />
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-blue-50 dark:bg-blue-950/60 text-blue-600 dark:text-blue-400 border border-blue-200 dark:border-blue-800">
                  Levels 1 – 3
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black font-serif" style={{ color: 'var(--color-text)' }}>
                  Programming
                </h3>
                <p className="text-xs leading-relaxed mt-2" style={{ color: 'var(--color-text-muted)' }}>
                  Master computational logic, tactile blocks, Python syntax, and accessible robotics through sensory-augmented coding environments.
                </p>
              </div>

              <div className="space-y-2.5 text-xs font-medium pt-2" style={{ color: 'var(--color-text)' }}>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Tactile Loop Structures & Visual Blocks</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Text-Based Python Compiler & Debugger</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Adaptive Sensory Controls & Pacing Aids</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-blue-600 shrink-0" />
                  <span>Official Blockchain Certificate of Completion</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <button
                type="button"
                onClick={() => navigate('/track-preview-programming')}
                className="w-full py-4 rounded-2xl text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                style={{ backgroundColor: '#1d4ed8' }}
              >
                <span>Explore Track</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>

          {/* Card 2: Sign Language Track */}
          <div
            className="rounded-3xl border p-8 shadow-xl transition-all duration-300 hover:-translate-y-1.5 hover:shadow-2xl flex flex-col justify-between space-y-6 relative overflow-hidden"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="space-y-4">
              <div className="flex items-center justify-between">
                <span className="w-14 h-14 rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center shadow-sm">
                  <Hand className="w-7 h-7" />
                </span>
                <span className="px-3 py-1 rounded-full text-xs font-black bg-emerald-50 dark:bg-emerald-950/60 text-emerald-600 dark:text-emerald-400 border border-emerald-200 dark:border-emerald-800">
                  Tech Fluency
                </span>
              </div>

              <div>
                <h3 className="text-2xl font-black font-serif" style={{ color: 'var(--color-text)' }}>
                  Sign Language
                </h3>
                <p className="text-xs leading-relaxed mt-2" style={{ color: 'var(--color-text-muted)' }}>
                  Learn standardized technical sign language, programming terminology, and interactive communication with specialized 3D avatars.
                </p>
              </div>

              <div className="space-y-2.5 text-xs font-medium pt-2" style={{ color: 'var(--color-text)' }}>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>3D Interactive Avatar Sign Dictionary</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Deaf Tech Terminology & Algorithmic Signs</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Visual Multi-Modal Assessment Modules</span>
                </div>
                <div className="flex items-center gap-2.5">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Accredited Inclusivity & Tech Literacy Badge</span>
                </div>
              </div>
            </div>

            <div className="pt-4 border-t" style={{ borderColor: 'var(--color-border)' }}>
              <button
                type="button"
                onClick={() => navigate('/individual-payment')}
                className="w-full py-4 rounded-2xl text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-[1.02] active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                style={{ backgroundColor: '#107c41' }}
              >
                <span>Explore Track</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 3. VIEW 3: PROGRAMMING TRACK OVERVIEW & ENROLLMENT (/track-preview-programming) */
/* Matching Screenshot 34: Title, Subtitle, Curriculum Levels, Enroll $180/yr*/
/* ========================================================================= */
export const TrackPreviewProgrammingPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang } = useMockData();

  const curriculumLevels = [
    {
      level: 'Level 1',
      title: 'Block-Based & Tactile Loops',
      lessons: '40 Lessons • Included in Preview',
      status: 'unlocked',
      description: 'Master computational logic, sequence execution, sensory feedback loops, and conditional reasoning.',
      topics: ['Computational Thinking Foundations', 'Tactile Loop Structures Lab', 'Sensory Coordinate Mapping', 'Interactive Algorithms'],
    },
    {
      level: 'Level 2',
      title: 'Structured Python & Functions',
      lessons: '45 Lessons • Requires Enrollment',
      status: 'locked',
      description: 'Transition smoothly into text-based Python syntax, reusable functional programming, and data collections.',
      topics: ['Python Syntax Foundations', 'Custom Functions & Parameters', 'Conditional Logic & Exception Handling', 'Data Lists & Dictionaries'],
    },
    {
      level: 'Level 3',
      title: 'Full-Stack & Assistive Projects',
      lessons: '50 Lessons • Capstone Project',
      status: 'locked',
      description: 'Build real-world accessible applications, integrate speech/motor APIs, and deploy certified portfolio projects.',
      topics: ['API Integrations & Web Requests', 'Assistive Interface Development', 'Accessible Robotics Controller', 'Capstone Showcase'],
    },
  ];

  return (
    <div
      className="min-h-[calc(100vh-4.5rem)] p-4 sm:p-6 lg:p-10 transition-colors space-y-8"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        <UniversalBackButton
          to="/track-selection"
          label={lang === 'ar' ? 'الرجوع لاختيار المسار' : 'Back to Track Selection'}
        />

        <div
          className="rounded-3xl border p-6 sm:p-10 shadow-2xl space-y-8"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          {/* Header Banner */}
          <div className="flex flex-col md:flex-row items-start md:items-center justify-between gap-6 border-b pb-8" style={{ borderColor: 'var(--color-border)' }}>
            <div className="space-y-2">
              <span className="inline-block text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                ADAPTIVE SYLLABUS
              </span>
              <h1 className="text-3xl sm:text-4xl font-black font-serif" style={{ color: 'var(--color-text)' }}>
                Programming Track
              </h1>
              <p className="text-xs sm:text-sm max-w-xl leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                Adaptive computer science from tactile blocks to structured text-based scripts.
              </p>
            </div>

            <div className="flex flex-col sm:flex-row items-stretch sm:items-center gap-3 shrink-0">
              <div className="text-right sm:text-left">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Annual Pass</span>
                <span className="text-2xl font-black" style={{ color: '#1d4ed8' }}>$180.00 / year</span>
              </div>
              <button
                type="button"
                onClick={() => navigate('/individual-payment')}
                className="px-6 py-4 rounded-2xl text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
                style={{ backgroundColor: '#107c41' }}
              >
                <CreditCard className="w-4 h-4" />
                <span>Enroll & Pay Now ($180/year)</span>
              </button>
            </div>
          </div>

          {/* Adaptive Controls Feature Callout */}
          <div className="p-5 rounded-2xl border bg-blue-50/50 dark:bg-blue-950/20 border-blue-200 dark:border-blue-900 flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
            <div className="flex items-center gap-3">
              <div className="p-2.5 rounded-xl bg-blue-600 text-white">
                <Sparkles className="w-5 h-5" />
              </div>
              <div>
                <h4 className="text-xs font-black" style={{ color: 'var(--color-text)' }}>
                  Built-in Adaptive Assistive Engine
                </h4>
                <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
                  Includes tactile sensory feedback, speech pacing, high contrast, and keyboard navigation.
                </p>
              </div>
            </div>
            <span className="text-xs font-bold text-blue-600 dark:text-blue-400">Included With All Passes</span>
          </div>

          {/* Curriculum Structure: Level 1, Level 2, Level 3 */}
          <div className="space-y-4">
            <h3 className="text-lg font-black font-serif" style={{ color: 'var(--color-text)' }}>
              Curriculum Roadmap (Levels 1 – 3)
            </h3>

            <div className="space-y-4">
              {curriculumLevels.map((lvl, idx) => (
                <div
                  key={idx}
                  className="p-6 rounded-2xl border transition-all"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3 border-b pb-4 mb-4" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex items-center gap-3">
                      <span className="px-2.5 py-1 rounded-lg text-xs font-black bg-blue-600 text-white">
                        {lvl.level}
                      </span>
                      <h4 className="text-base font-black" style={{ color: 'var(--color-text)' }}>
                        {lvl.title}
                      </h4>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs opacity-75" style={{ color: 'var(--color-text-muted)' }}>{lvl.lessons}</span>
                      {lvl.status === 'unlocked' ? (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                          <Unlock className="w-3 h-3" />
                          <span>Preview Available</span>
                        </span>
                      ) : (
                        <span className="inline-flex items-center gap-1 px-2.5 py-0.5 rounded-full text-xs font-bold bg-slate-200 dark:bg-slate-800 text-slate-600 dark:text-slate-400">
                          <Lock className="w-3 h-3" />
                          <span>Requires Pass</span>
                        </span>
                      )}
                    </div>
                  </div>

                  <p className="text-xs leading-relaxed mb-3" style={{ color: 'var(--color-text-muted)' }}>
                    {lvl.description}
                  </p>

                  <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
                    {lvl.topics.map((t, tidx) => (
                      <div key={tidx} className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-text)' }}>
                        <CheckCircle2 className="w-3.5 h-3.5 text-blue-600 shrink-0" />
                        <span>{t}</span>
                      </div>
                    ))}
                  </div>
                </div>
              ))}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 4. VIEW 4: START YOUR LEARNING JOURNEY (CHECKOUT) (/individual-payment)   */
/* Matching Screenshot 35: Order Summary, Auto-filled Cardholder, Pay $180   */
/* ========================================================================= */
export const IndividualPaymentPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, payIndividualTrack, individuals, activeIndividualId } = useMockData();
  const activeUser = individuals.find((i) => i.id === activeIndividualId) || individuals[0];

  // Auto-filled Cardholder Name from user's dynamic registered name
  const [cardholderName, setCardholderName] = useState(activeUser?.fullName || 'Nadia Al-Mutairi');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('11/29');
  const [cvc, setCvc] = useState('990');
  const [isProcessing, setIsProcessing] = useState(false);

  useEffect(() => {
    if (activeUser?.fullName) {
      setCardholderName(activeUser.fullName);
    }
  }, [activeUser]);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      if (activeUser) {
        payIndividualTrack(activeUser.id, 180);
      }
      setIsProcessing(false);
      navigate('/individual-dashboard');
    }, 1000);
  };

  return (
    <div
      className="min-h-[calc(100vh-4.5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-10 transition-colors"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div
        className="w-full max-w-4xl rounded-3xl p-6 sm:p-10 border shadow-2xl space-y-8 animate-in fade-in"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="space-y-4 border-b pb-6" style={{ borderColor: 'var(--color-border)' }}>
          <UniversalBackButton to="/track-selection" label="Back to Track Selection" />

          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
            <Sparkles className="w-3.5 h-3.5" />
            <span>SECURE CHECKOUT</span>
          </div>
          <h1 className="text-3xl font-black font-serif tracking-tight" style={{ color: 'var(--color-text)' }}>
            Start Your Learning Journey
          </h1>
          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            Secure your annual individual track pass. Secure, adaptive billing for families.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Order Summary (5 cols) */}
          <div
            className="lg:col-span-5 p-6 rounded-2xl border space-y-4"
            style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
          >
            <h3 className="text-sm font-black uppercase tracking-wider" style={{ color: 'var(--color-text)' }}>
              Order Summary
            </h3>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between items-center">
                <span style={{ color: 'var(--color-text-muted)' }}>Enrolled Learner:</span>
                <span className="font-bold text-blue-600">{activeUser?.fullName || 'Nadia Al-Mutairi'}</span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: 'var(--color-text-muted)' }}>Selected Track:</span>
                <span className="font-bold" style={{ color: 'var(--color-text)' }}>
                  {activeUser?.track === 'sign_language' ? 'Sign Language Track' : 'Programming Track'}
                </span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: 'var(--color-text-muted)' }}>Access Term:</span>
                <span className="font-bold text-emerald-600">Annual Pass (12 Months)</span>
              </div>
              <div className="flex justify-between items-center">
                <span style={{ color: 'var(--color-text-muted)' }}>Assistive Engine:</span>
                <span className="font-bold">Included</span>
              </div>
            </div>

            <div className="border-t pt-4 space-y-2" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex justify-between items-center text-xs">
                <span style={{ color: 'var(--color-text-muted)' }}>Subtotal:</span>
                <span className="font-bold" style={{ color: 'var(--color-text)' }}>$180.00</span>
              </div>
              <div className="flex justify-between items-center text-xs">
                <span style={{ color: 'var(--color-text-muted)' }}>Adaptive Tax & Surcharge:</span>
                <span className="font-bold text-emerald-600">$0.00 (Waived)</span>
              </div>
              <div className="border-t pt-3 flex justify-between items-center text-base font-black" style={{ borderColor: 'var(--color-border)' }}>
                <span style={{ color: 'var(--color-text)' }}>Total Due Today:</span>
                <span className="text-2xl font-black text-blue-600">$180.00</span>
              </div>
            </div>

            <div className="p-3 rounded-xl bg-emerald-50 dark:bg-emerald-950/30 border border-emerald-200 dark:border-emerald-800 text-[11px] text-emerald-800 dark:text-emerald-300 flex items-center gap-2">
              <ShieldCheck className="w-4 h-4 shrink-0 text-emerald-600" />
              <span>30-Day Adaptive Satisfaction Guarantee</span>
            </div>
          </div>

          {/* Right Column: Payment Information Form (7 cols) */}
          <form onSubmit={handlePay} className="lg:col-span-7 space-y-4">
            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                Cardholder Name
              </label>
              <input
                type="text"
                required
                value={cardholderName}
                onChange={(e) => setCardholderName(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border text-xs outline-none transition-all focus:ring-2 focus:ring-blue-500 font-medium"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)',
                }}
              />
              <span className="text-[10px] mt-1 block" style={{ color: 'var(--color-text-muted)' }}>
                Auto-filled from registered account: {activeUser?.fullName}
              </span>
            </div>

            <div>
              <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                Card Number
              </label>
              <div className="relative">
                <input
                  type="text"
                  required
                  value={cardNumber}
                  onChange={(e) => setCardNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border text-xs font-mono outline-none transition-all focus:ring-2 focus:ring-blue-500 pl-10"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)',
                  }}
                />
                <CreditCard className="w-4 h-4 text-slate-400 absolute left-3 top-1/2 -translate-y-1/2" />
              </div>
            </div>

            <div className="grid grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                  Expiration Date
                </label>
                <input
                  type="text"
                  required
                  value={expiry}
                  onChange={(e) => setExpiry(e.target.value)}
                  placeholder="MM/YY"
                  className="w-full px-4 py-3 rounded-2xl border text-xs font-mono outline-none transition-all focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)',
                  }}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                  CVC / CVV
                </label>
                <input
                  type="text"
                  required
                  value={cvc}
                  onChange={(e) => setCvc(e.target.value)}
                  placeholder="123"
                  className="w-full px-4 py-3 rounded-2xl border text-xs font-mono outline-none transition-all focus:ring-2 focus:ring-blue-500"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)',
                  }}
                />
              </div>
            </div>

            <button
              type="submit"
              disabled={isProcessing}
              className="w-full py-4 rounded-2xl text-white font-black text-xs sm:text-sm shadow-xl transition-all hover:scale-[1.01] active:scale-95 flex items-center justify-center gap-2 cursor-pointer mt-4"
              style={{
                backgroundColor: '#1d4ed8',
                boxShadow: '0 4px 14px rgba(29, 78, 216, 0.35)',
              }}
            >
              {isProcessing ? (
                <span>Confirming $180.00 Transaction...</span>
              ) : (
                <>
                  <Lock className="w-4 h-4" />
                  <span>Pay $180</span>
                </>
              )}
            </button>

            <div className="flex items-center justify-center gap-2 text-[11px] text-slate-400 pt-2">
              <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
              <span>256-Bit SSL Encrypted & Verified PCI-DSS Checkout</span>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 5. VIEW 5: INDIVIDUAL DASHBOARD (/individual-dashboard)                   */
/* Matching Screenshot 36: "Welcome back, {userName}!", Widgets, Module Card */
/* ========================================================================= */
export const IndividualDashboardPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, individuals, activeIndividualId } = useMockData();
  const activeUser = individuals.find((i) => i.id === activeIndividualId) || individuals[0] || {
    fullName: 'Nadia Al-Mutairi',
    track: 'programming',
    progress: 80,
  };

  return (
    <div
      className="min-h-[calc(100vh-4.5rem)] p-4 sm:p-6 lg:p-10 transition-colors space-y-8"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="max-w-5xl mx-auto space-y-6">
        <div className="flex items-center justify-start">
          <UniversalBackButton to="/" label="Back to Home" />
        </div>

        {/* Dynamic Header Greeting */}
        <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-4">
          <div>
            <span className="text-xs font-black text-blue-600 uppercase tracking-wider block mb-1">
              INDIVIDUAL LEARNER PORTAL
            </span>
            <h1 className="text-3xl sm:text-4xl font-black font-serif tracking-tight" style={{ color: 'var(--color-text)' }}>
              Welcome back, {activeUser.fullName}!
            </h1>
            <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
              Continue your coding journey without physical or cognitive barriers.
            </p>
          </div>

          <div className="flex items-center gap-2.5">
            {/* Interactive Profile Avatar & Customization Trigger */}
            <ProfileAvatarButton roleOverride="individual" size="md" showLabel={true} />

            <button
              type="button"
              onClick={() => navigate('/individual-certificate')}
              className="px-4 py-2.5 rounded-xl border text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              <Award className="w-4 h-4 text-amber-500" />
              <span>View Certificate</span>
            </button>
          </div>
        </div>

        {/* 3 Progress Widgets */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Widget 1: Lessons Done */}
          <div
            className="p-6 rounded-3xl border shadow-md flex items-center justify-between gap-4"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Lessons Done
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black" style={{ color: 'var(--color-text)' }}>
                  32 / 40
                </span>
                <span className="text-xs font-bold text-emerald-600">80% Done</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center">
              <CheckCircle className="w-6 h-6" />
            </div>
          </div>

          {/* Widget 2: Total Hours Spent */}
          <div
            className="p-6 rounded-3xl border shadow-md flex items-center justify-between gap-4"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Total Hours Spent
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black" style={{ color: 'var(--color-text)' }}>
                  14.5
                </span>
                <span className="text-xs font-bold" style={{ color: 'var(--color-text-muted)' }}>Hours</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-300 flex items-center justify-center">
              <Clock className="w-6 h-6" />
            </div>
          </div>

          {/* Widget 3: Current Streak */}
          <div
            className="p-6 rounded-3xl border shadow-md flex items-center justify-between gap-4"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <div>
              <span className="text-[11px] font-bold uppercase tracking-wider text-slate-400 block mb-1">
                Current Streak
              </span>
              <div className="flex items-baseline gap-2">
                <span className="text-3xl font-black text-amber-500">
                  5 Days
                </span>
                <span className="text-xs font-bold text-emerald-600">🔥 On Fire</span>
              </div>
            </div>
            <div className="w-12 h-12 rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300 flex items-center justify-center">
              <Flame className="w-6 h-6" />
            </div>
          </div>
        </div>

        {/* Current Module Card */}
        <div
          className="rounded-3xl border p-6 sm:p-8 shadow-xl space-y-6"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-6" style={{ borderColor: 'var(--color-border)' }}>
            <div className="flex items-center gap-4">
              <span className="w-14 h-14 rounded-2xl bg-blue-600 text-white flex items-center justify-center shadow-lg">
                <Code2 className="w-7 h-7" />
              </span>
              <div>
                <span className="text-[11px] font-black uppercase tracking-wider text-blue-600 block">
                  Active Course
                </span>
                <h2 className="text-2xl font-black" style={{ color: 'var(--color-text)' }}>
                  Level 1: Block-Based Programming
                </h2>
                <span className="text-xs font-medium" style={{ color: 'var(--color-text-muted)' }}>
                  Current Topic: Unit 3 - Tactile Loop Structures
                </span>
              </div>
            </div>

            <button
              type="button"
              onClick={() => navigate('/individual-learning')}
              className="px-6 py-3.5 rounded-2xl text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
              style={{ backgroundColor: '#107c41' }}
            >
              <Play className="w-4 h-4 fill-white" />
              <span>Continue Learning</span>
            </button>
          </div>

          {/* Progress Bar */}
          <div className="space-y-2">
            <div className="flex justify-between items-center text-xs font-bold">
              <span style={{ color: 'var(--color-text)' }}>Level 1 Overall Completion</span>
              <span className="text-emerald-600">80% Mastered</span>
            </div>
            <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
              <div className="h-full bg-emerald-500 rounded-full transition-all duration-500" style={{ width: '80%' }} />
            </div>
          </div>

          {/* Module Breakdown Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-2">
            <div className="p-4 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
              <span className="text-[11px] opacity-75 block text-slate-400">Next Lesson</span>
              <span className="text-sm font-bold block mt-1" style={{ color: 'var(--color-text)' }}>
                3.3: Interactive Loop Lab
              </span>
            </div>
            <div className="p-4 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
              <span className="text-[11px] opacity-75 block text-slate-400">Exercises Completed</span>
              <span className="text-sm font-bold text-blue-600 block mt-1">28 of 32 Passed</span>
            </div>
            <div className="p-4 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
              <span className="text-[11px] opacity-75 block text-slate-400">Credential Status</span>
              <span className="text-sm font-bold text-emerald-600 block mt-1">Eligible at 40 Lessons</span>
            </div>
          </div>

          {/* Fast Navigation to Next Steps */}
          <div className="pt-4 flex flex-wrap justify-end gap-3 border-t" style={{ borderColor: 'var(--color-border)' }}>
            <button
              type="button"
              onClick={() => navigate('/individual-course-complete')}
              className="px-4 py-2 rounded-xl border text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer flex items-center gap-1.5"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              <Trophy className="w-3.5 h-3.5 text-amber-500" />
              <span>Simulate Level 1 Complete</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/individual-learning')}
              className="px-4 py-2 rounded-xl text-white text-xs font-bold transition-all hover:scale-105 cursor-pointer"
              style={{ backgroundColor: '#1d4ed8' }}
            >
              Open Lesson Workspace →
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 6. VIEW 6: LESSON VIEW ("Tactile Loop Structures") (/individual-learning)  */
/* Matching Screenshot 39: Sidebar, Toolbar, python_tactile_loops.py, Next   */
/* ========================================================================= */
export const IndividualLearningPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang } = useMockData();

  // Adaptive Controls state
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [speechPacing, setSpeechPacing] = useState<'normal' | 'slow' | 'fast'>('normal');
  const [textSize, setTextSize] = useState<'normal' | 'large'>('normal');

  // Challenge completion & Sensory pulse info states
  const [challengePassed, setChallengePassed] = useState(false);
  const [showSensoryModal, setShowSensoryModal] = useState(false);

  // Code editor state
  const [code, setCode] = useState(
`# CodeRa Tactile Loop Structures Lab
# Repeats motor pulses to draw an accessible tactile square

def draw_tactile_boundary():
    for side in range(4):
        move_forward(units=50)
        turn_clockwise(degrees=90)
        emit_sensory_pulse(freq=440)
        print(f"Edge {side + 1}/4 rendered with tactile feedback.")

draw_tactile_boundary()`
  );

  const [output, setOutput] = useState<string[]>([
    'System ready. Sensory motors connected.',
    'Press "Run Code" to execute tactile loop instructions.',
  ]);
  const [isRunning, setIsRunning] = useState(false);

  // Synthesized speech handler
  const handleToggleSpeech = () => {
    if ('speechSynthesis' in window) {
      if (isSpeaking) {
        window.speechSynthesis.cancel();
        setIsSpeaking(false);
      } else {
        const text = 'Tactile Loop Structures. Review the tactile loop logic, test the code in the Python editor, and run the simulation to complete the unit.';
        const utterance = new SpeechSynthesisUtterance(text);
        utterance.rate = speechPacing === 'slow' ? 0.8 : speechPacing === 'fast' ? 1.2 : 1.0;
        utterance.onend = () => setIsSpeaking(false);
        setIsSpeaking(true);
        window.speechSynthesis.speak(utterance);
      }
    } else {
      setIsSpeaking(!isSpeaking);
    }
  };

  const handleRunCode = () => {
    setIsRunning(true);
    setOutput(['Initiating execution of tactile loop instructions...']);
    setTimeout(() => {
      setOutput([
        'Executing tactile loop routine...',
        'Edge 1/4 rendered with tactile feedback. (Motor pulse: 440Hz)',
        'Edge 2/4 rendered with tactile feedback. (Motor pulse: 440Hz)',
        'Edge 3/4 rendered with tactile feedback. (Motor pulse: 440Hz)',
        'Edge 4/4 rendered with tactile feedback. (Motor pulse: 440Hz)',
        '✅ Loop execution successful: Challenge Passed (+50 XP)',
      ]);
      setIsRunning(false);
      setChallengePassed(true);
    }, 700);
  };

  return (
    <div
      className="min-h-[calc(100vh-4.5rem)] p-4 sm:p-6 transition-colors space-y-6"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-start">
          <UniversalBackButton to="/individual-dashboard" label="Back to Dashboard" />
        </div>

        {/* Top Header & Adaptive Controls Toolbar */}
        <div className="flex flex-col md:flex-row md:items-center justify-between gap-4 border-b pb-4" style={{ borderColor: 'var(--color-border)' }}>
          <div>
            <div className="flex items-center gap-2 text-xs font-bold text-slate-400 mb-1">
              <span>Programming Track</span>
              <span>›</span>
              <span>Level 1: Block-Based Programming</span>
              <span>›</span>
              <span className="text-blue-600">Unit 3: Tactile Loop Structures</span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif" style={{ color: 'var(--color-text)' }}>
              Tactile Loop Structures
            </h1>
          </div>

          {/* Adaptive Controls Toolbar */}
          <div className="flex flex-wrap items-center gap-2">
            {/* Text-to-Speech */}
            <button
              type="button"
              onClick={handleToggleSpeech}
              className={`px-3 py-2 rounded-xl border text-xs font-bold flex items-center gap-1.5 transition-all cursor-pointer ${
                isSpeaking
                  ? 'bg-blue-600 text-white border-blue-600 animate-pulse'
                  : 'hover:bg-slate-100 dark:hover:bg-slate-800'
              }`}
              style={{ borderColor: isSpeaking ? undefined : 'var(--color-border)', color: isSpeaking ? '#ffffff' : 'var(--color-text)' }}
              title="Read lesson text aloud"
            >
              {isSpeaking ? <VolumeX className="w-4 h-4" /> : <Volume2 className="w-4 h-4" />}
              <span>{isSpeaking ? 'Stop Audio' : 'Listen'}</span>
            </button>

            {/* Pacing Speed */}
            <button
              type="button"
              onClick={() => setSpeechPacing(speechPacing === 'normal' ? 'slow' : speechPacing === 'slow' ? 'fast' : 'normal')}
              className="px-3 py-2 rounded-xl border text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              <span>Speed: {speechPacing}</span>
            </button>

            {/* Font Size */}
            <button
              type="button"
              onClick={() => setTextSize(textSize === 'normal' ? 'large' : 'normal')}
              className="px-3 py-2 rounded-xl border text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              <span>{textSize === 'normal' ? 'Text: Normal' : 'Text: Large'}</span>
            </button>

            {/* Next Lesson / Complete Level Button */}
            <button
              type="button"
              onClick={() => navigate('/individual-course-complete')}
              className={`px-5 py-2.5 rounded-xl text-white font-black text-xs shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer ml-2 ${
                challengePassed ? 'animate-pulse ring-2 ring-emerald-400' : ''
              }`}
              style={{ backgroundColor: challengePassed ? '#107c41' : '#1d4ed8' }}
            >
              <span>{challengePassed ? 'Complete Level & View Certificate' : 'Next Lesson'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>

            {/* Profile Avatar & Customization Trigger */}
            <ProfileAvatarButton roleOverride="individual" size="sm" showLabel={false} />
          </div>
        </div>

        {/* Clear User Instructional Guidance Callout */}
        <div
          className="p-4 sm:p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 shadow-sm"
          style={{
            backgroundColor: 'rgba(29, 78, 216, 0.05)',
            borderColor: 'rgba(29, 78, 216, 0.25)',
          }}
        >
          <div className="flex items-start sm:items-center gap-3.5">
            <div className="p-2.5 rounded-xl bg-blue-600 text-white shrink-0 mt-0.5 sm:mt-0 shadow-sm">
              <Sparkles className="w-5 h-5" />
            </div>
            <div className="space-y-0.5">
              <h3 className="text-xs sm:text-sm font-black text-blue-700 dark:text-blue-300">
                Interactive Lab Objective & Student Instructions
              </h3>
              <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed font-medium">
                Review the tactile loop logic, test the code in the Python editor, and run the simulation to complete the unit.
              </p>
            </div>
          </div>

          <div className="flex items-center gap-2 shrink-0 text-xs">
            <span className="px-3 py-1 rounded-full font-bold bg-blue-100 dark:bg-blue-950 text-blue-700 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              Unit 3.3 Lab
            </span>
          </div>
        </div>

        {/* Two-Column Grid: Course Outline Sidebar + Learning Workspace */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-6 items-start">
          {/* Left Column: Course Outline (4 cols) */}
          <div
            className="lg:col-span-4 rounded-3xl border p-5 space-y-4"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--color-border)' }}>
              <h3 className="text-xs font-black uppercase tracking-wider" style={{ color: 'var(--color-text)' }}>
                Course Outline
              </h3>
              <span className="text-[11px] font-bold text-emerald-600">80% Done</span>
            </div>

            <div className="space-y-3">
              {/* Unit 1 */}
              <div className="p-3 rounded-xl border opacity-80" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
                <div className="flex items-center gap-2 text-xs font-bold" style={{ color: 'var(--color-text)' }}>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Unit 1: Computational Logic</span>
                </div>
                <span className="text-[10px] text-emerald-600 block ml-6 rtl:ml-0 rtl:mr-6">Completed ✓</span>
              </div>

              {/* Unit 2 */}
              <div className="p-3 rounded-xl border opacity-80" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
                <div className="flex items-center gap-2 text-xs font-bold" style={{ color: 'var(--color-text)' }}>
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0" />
                  <span>Unit 2: Decision Trees & Conditions</span>
                </div>
                <span className="text-[10px] text-emerald-600 block ml-6 rtl:ml-0 rtl:mr-6">Completed ✓</span>
              </div>

              {/* Unit 3 (Active) */}
              <div className="p-3.5 rounded-2xl border-2 border-blue-600 bg-blue-50/50 dark:bg-blue-950/30 space-y-2">
                <div className="flex items-center gap-2 text-xs font-black text-blue-600">
                  <Activity className="w-4 h-4 shrink-0" />
                  <span>Unit 3: Tactile Loop Structures</span>
                </div>
                <div className="space-y-1.5 ml-6 rtl:ml-0 rtl:mr-6 text-[11px]">
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>3.1 Loop Foundations</span>
                  </div>
                  <div className="flex items-center gap-1.5 text-slate-500">
                    <Check className="w-3 h-3 text-emerald-600" />
                    <span>3.2 Iteration Counts</span>
                  </div>
                  <div className="flex items-center gap-1.5 font-bold text-blue-600">
                    <Play className="w-3 h-3 fill-blue-600" />
                    <span>3.3 Interactive Loop Lab (Current)</span>
                  </div>
                </div>
              </div>

              {/* Unit 4 (Locked) */}
              <div className="p-3 rounded-xl border opacity-60" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>Unit 4: Functions & Modular Design</span>
                </div>
                <span className="text-[10px] text-slate-400 block ml-6 rtl:ml-0 rtl:mr-6">Locked</span>
              </div>

              {/* Unit 5 (Locked) */}
              <div className="p-3 rounded-xl border opacity-60" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
                <div className="flex items-center gap-2 text-xs font-bold text-slate-400">
                  <Lock className="w-4 h-4 shrink-0" />
                  <span>Unit 5: Capstone Robotics Maze</span>
                </div>
                <span className="text-[10px] text-slate-400 block ml-6 rtl:ml-0 rtl:mr-6">Capstone Project</span>
              </div>
            </div>
          </div>

          {/* Right Column: Interactive Video / Sandbox & Code Lab (8 cols) */}
          <div className="lg:col-span-8 space-y-6">
            {/* Interactive Preview Canvas */}
            <div
              className="rounded-3xl border shadow-xl p-5 space-y-4"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex items-center gap-2 text-xs font-black" style={{ color: 'var(--color-text)' }}>
                  <Laptop className="w-4 h-4 text-blue-600" />
                  <span>Interactive Canvas & Sensory Feedback</span>
                </div>

                {/* Interactive Sensory Pulse Indicator Button */}
                <button
                  type="button"
                  onClick={() => setShowSensoryModal(!showSensoryModal)}
                  className="px-3 py-1.5 rounded-full text-xs font-bold bg-emerald-100 hover:bg-emerald-200 text-emerald-800 dark:bg-emerald-950/80 dark:hover:bg-emerald-900 dark:text-emerald-300 border border-emerald-300 dark:border-emerald-700 transition-all flex items-center gap-2 cursor-pointer shadow-xs group"
                  title="Click to learn about the sensory pulse and haptic connection"
                >
                  <span className="relative flex h-2 w-2">
                    <span className="animate-ping absolute inline-flex h-full w-full rounded-full bg-emerald-400 opacity-75"></span>
                    <span className="relative inline-flex rounded-full h-2 w-2 bg-emerald-500"></span>
                  </span>
                  <span>Sensory Pulse Active</span>
                  <HelpCircle className="w-3.5 h-3.5 opacity-70 group-hover:opacity-100" />
                </button>
              </div>

              {/* Interactive Sensory Pulse Explanatory Card */}
              {showSensoryModal && (
                <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-2 animate-in fade-in">
                  <div className="flex items-center justify-between">
                    <div className="flex items-center gap-2 text-xs font-bold text-emerald-800 dark:text-emerald-300">
                      <Activity className="w-4 h-4 text-emerald-600" />
                      <span>About Sensory Pulse & Haptic Feedback Connection</span>
                    </div>
                    <button
                      type="button"
                      onClick={() => setShowSensoryModal(false)}
                      className="text-xs text-emerald-700 hover:text-emerald-900 font-bold cursor-pointer"
                    >
                      ✕
                    </button>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-300 leading-relaxed">
                    The <strong>Sensory Pulse</strong> indicator confirms that physical haptic vibrations (calibrated at 440Hz motor frequency) and spatial audio tones are synchronized with each step of your code. This empowers learners with visual impairments or neurodiverse processing needs to feel and hear algorithms execute physically in real-time.
                  </p>
                </div>
              )}

              {/* Visual Simulation Display */}
              <div className="w-full h-44 rounded-2xl bg-slate-900 border border-slate-800 relative flex items-center justify-center overflow-hidden">
                {/* Grid Overlay */}
                <div
                  className="absolute inset-0 opacity-20"
                  style={{
                    backgroundImage: 'radial-gradient(#38bdf8 1px, transparent 1px)',
                    backgroundSize: '20px 20px',
                  }}
                />

                {/* Tactile Square Animation */}
                <div className="relative w-28 h-28 border-2 border-dashed border-emerald-400/80 rounded-lg flex items-center justify-center animate-pulse">
                  <div className="w-4 h-4 rounded-full bg-blue-500 shadow-lg shadow-blue-500/50" />
                  <span className="absolute -top-3 left-1/2 -translate-x-1/2 text-[9px] font-mono text-emerald-400 bg-slate-900 px-1">
                    50px
                  </span>
                </div>

                <div className="absolute bottom-3 left-4 text-[10px] font-mono text-slate-400">
                  <span>Coord: (X: 120, Y: 120) • Motor Frequency: 440Hz</span>
                </div>
              </div>

              {/* Descriptive Text */}
              <div className={`space-y-1.5 ${textSize === 'large' ? 'text-sm' : 'text-xs'}`} style={{ color: 'var(--color-text-muted)' }}>
                <p>
                  <strong>How Tactile Loops Work:</strong> In computational thinking, iteration enables a program to execute a block of commands repeatedly until a goal is met. Instead of writing four separate forward commands, we use a single loop with four iterations.
                </p>
              </div>
            </div>

            {/* Code Snippet Box (python_tactile_loops.py) */}
            <div
              className="rounded-3xl border shadow-xl p-5 space-y-4"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <div className="flex items-center justify-between border-b pb-3" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex items-center gap-2 text-xs font-bold" style={{ color: 'var(--color-text)' }}>
                  <FileCode className="w-4 h-4 text-blue-600" />
                  <span className="font-mono">python_tactile_loops.py</span>
                </div>

                <div className="flex items-center gap-2">
                  <button
                    type="button"
                    onClick={() => setCode('# CodeRa Tactile Loop Structures Lab\nfor step in range(4):\n    move_forward(units=50)\n    turn_clockwise(degrees=90)')}
                    className="text-xs text-slate-400 hover:text-slate-600 flex items-center gap-1 cursor-pointer"
                  >
                    <RotateCcw className="w-3.5 h-3.5" />
                    <span>Reset Code</span>
                  </button>
                  <button
                    type="button"
                    onClick={handleRunCode}
                    disabled={isRunning}
                    className="px-5 py-2 rounded-xl text-white font-black text-xs shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
                    style={{ backgroundColor: '#107c41' }}
                  >
                    <Play className="w-3.5 h-3.5 fill-white" />
                    <span>{isRunning ? 'Executing...' : 'Run Code'}</span>
                  </button>
                </div>
              </div>

              <textarea
                rows={8}
                value={code}
                onChange={(e) => setCode(e.target.value)}
                className="w-full p-4 rounded-2xl font-mono text-xs outline-none resize-none leading-relaxed"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  borderColor: 'var(--color-border)',
                  color: 'var(--color-text)',
                }}
              />

              {/* Interactive Terminal Output */}
              <div className="space-y-2">
                <div className="flex items-center gap-2 text-xs font-bold" style={{ color: 'var(--color-text)' }}>
                  <Terminal className="w-4 h-4 text-emerald-600" />
                  <span>Console & Sensory Execution Stream</span>
                </div>

                <div
                  className="p-4 rounded-2xl font-mono text-xs space-y-1 overflow-y-auto min-h-[120px] max-h-[160px]"
                  style={{ backgroundColor: '#0f172a', color: '#38bdf8' }}
                >
                  {output.map((line, idx) => (
                    <div key={idx} className={line.includes('✅') ? 'text-emerald-400 font-bold' : ''}>
                      {line}
                    </div>
                  ))}
                </div>
              </div>

              {/* Dynamic Progression Callout to Level 1 Complete & Certificate */}
              {challengePassed && (
                <div
                  className="p-6 rounded-3xl border-2 border-emerald-500 shadow-xl flex flex-col sm:flex-row items-center justify-between gap-4 animate-in zoom-in-95 mt-4"
                  style={{
                    background: 'linear-gradient(135deg, rgba(16, 124, 65, 0.08) 0%, rgba(29, 78, 216, 0.08) 100%)',
                  }}
                >
                  <div className="flex items-center gap-4 text-center sm:text-left">
                    <div className="w-12 h-12 rounded-2xl bg-emerald-600 text-white flex items-center justify-center shrink-0 shadow-md">
                      <Trophy className="w-6 h-6 animate-bounce" />
                    </div>
                    <div>
                      <span className="text-[11px] font-black uppercase tracking-wider text-emerald-600 block">
                        CHALLENGE PASSED (+50 XP)
                      </span>
                      <h4 className="text-lg font-black" style={{ color: 'var(--color-text)' }}>
                        Level 1 Mastery Unlocked!
                      </h4>
                      <p className="text-xs text-slate-500 dark:text-slate-400">
                        You have passed all unit requirements for block-based programming.
                      </p>
                    </div>
                  </div>

                  <button
                    type="button"
                    onClick={() => navigate('/individual-course-complete')}
                    className="w-full sm:w-auto px-6 py-3.5 rounded-2xl text-white font-black text-xs sm:text-sm shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer shrink-0"
                    style={{
                      backgroundColor: '#107c41',
                      boxShadow: '0 4px 14px rgba(16, 124, 65, 0.35)',
                    }}
                  >
                    <Award className="w-4 h-4" />
                    <span>Complete Level & View Certificate →</span>
                  </button>
                </div>
              )}
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};


/* ========================================================================= */
/* 7. VIEW 7: LEVEL 1 COMPLETE! (/individual-course-complete)                */
/* Matching Screenshot 37: Confetti style, summary metrics, Continue L2      */
/* ========================================================================= */
export const IndividualCourseCompletePage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, individuals, activeIndividualId, completeIndividualLevel } = useMockData();
  const activeUser = individuals.find((i) => i.id === activeIndividualId) || individuals[0];

  useEffect(() => {
    if (activeUser && completeIndividualLevel) {
      completeIndividualLevel(activeUser.id);
    }
  }, [activeUser, completeIndividualLevel]);

  return (
    <div
      className="min-h-[calc(100vh-4.5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-10 transition-colors"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div
        className="w-full max-w-xl rounded-3xl p-8 sm:p-12 border shadow-2xl text-center space-y-8 animate-in zoom-in-95 relative overflow-hidden"
        style={{
          backgroundColor: 'var(--color-surface)',
          borderColor: 'var(--color-border)',
        }}
      >
        <div className="flex justify-start">
          <UniversalBackButton to="/individual-learning" label="Back to Learning Unit" />
        </div>

        {/* Celebratory Badge with Glow */}
        <div className="relative mx-auto w-24 h-24">
          <div className="absolute inset-0 rounded-3xl bg-emerald-500/20 blur-xl animate-pulse" />
          <div
            className="w-24 h-24 rounded-3xl mx-auto flex items-center justify-center text-white shadow-xl relative z-10"
            style={{ backgroundColor: '#107c41' }}
          >
            <Trophy className="w-12 h-12" />
          </div>
        </div>

        <div className="space-y-2">
          <span className="inline-block text-xs font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            MILESTONE ACHIEVED
          </span>
          <h1 className="text-3xl sm:text-4xl font-black font-serif" style={{ color: 'var(--color-text)' }}>
            Level 1 Complete!
          </h1>
          <p className="text-xs sm:text-sm leading-relaxed max-w-md mx-auto" style={{ color: 'var(--color-text-muted)' }}>
            Congratulations, <strong>{activeUser?.fullName || 'Nadia Al-Mutairi'}</strong>! You have mastered the fundamentals of block-based programming, tactile loop logic, and algorithmic sequencing.
          </p>
        </div>

        {/* 3 Summary Metrics */}
        <div className="grid grid-cols-3 gap-3 p-5 rounded-2xl border" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Lessons Completed</span>
            <span className="text-xl font-black text-emerald-600 block mt-1">40 / 40</span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Practice Time</span>
            <span className="text-xl font-black text-blue-600 block mt-1">18.5 hrs</span>
          </div>
          <div>
            <span className="text-[10px] font-bold uppercase text-slate-400 block">Assessment Score</span>
            <span className="text-xl font-black text-amber-500 block mt-1">94%</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/individual-certificate')}
            className="w-full py-4 rounded-2xl text-white font-black text-xs sm:text-sm shadow-xl transition-all hover:scale-105 active:scale-95 flex items-center justify-center gap-2 cursor-pointer"
            style={{ backgroundColor: '#1d4ed8' }}
          >
            <Award className="w-4 h-4" />
            <span>Download Certificate</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/individual-dashboard')}
            className="w-full py-3.5 rounded-2xl border font-black text-xs sm:text-sm transition-all hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
          >
            Continue to Level 2
          </button>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 8. VIEW 8: OFFICIAL CERTIFICATE OF COMPLETION (/individual-certificate)   */
/* Matching Screenshot 38: Certificate Document Card, Dynamic Name, Toolbar  */
/* ========================================================================= */
export const IndividualCertificatePage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, individuals, activeIndividualId } = useMockData();
  const activeUser = individuals.find((i) => i.id === activeIndividualId) || individuals[0] || {
    fullName: 'Nadia Al-Mutairi',
  };

  const [copied, setCopied] = useState(false);
  const [downloadSuccess, setDownloadSuccess] = useState(false);

  const handleDownload = () => {
    setDownloadSuccess(true);
    setTimeout(() => setDownloadSuccess(false), 3000);
  };

  const handleShare = () => {
    if (navigator.clipboard) {
      navigator.clipboard.writeText(window.location.href);
      setCopied(true);
      setTimeout(() => setCopied(false), 2500);
    }
  };

  const handlePrint = () => {
    window.print();
  };

  return (
    <div
      className="min-h-[calc(100vh-4.5rem)] p-4 sm:p-6 lg:p-10 transition-colors space-y-8"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="max-w-4xl mx-auto space-y-6">
        <UniversalBackButton to="/individual-dashboard" label="Back to Level / Dashboard" />

        {downloadSuccess && (
          <div className="p-4 rounded-2xl bg-emerald-500/10 border border-emerald-500/20 text-emerald-600 dark:text-emerald-400 text-xs flex items-center justify-between animate-in fade-in">
            <div className="flex items-center gap-2">
              <CheckCircle className="w-4 h-4" />
              <span>Official Certificate PDF generated and downloaded successfully.</span>
            </div>
            <span className="font-bold">2.4 MB</span>
          </div>
        )}

        <div
          className="rounded-3xl border p-6 sm:p-10 shadow-2xl space-y-8"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          {/* Header & Action Toolbar */}
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b pb-6" style={{ borderColor: 'var(--color-border)' }}>
            <div>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-black bg-amber-100 text-amber-800 dark:bg-amber-950 dark:text-amber-300 mb-2">
                <Award className="w-3.5 h-3.5" />
                <span>ACCREDITED CREDENTIAL</span>
              </div>
              <h1 className="text-3xl font-black font-serif" style={{ color: 'var(--color-text)' }}>
                Official Certificate of Completion
              </h1>
              <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Verifiable, tamper-evident credential issued by CodeRa Inclusive Tech Ecosystem.
              </p>
            </div>

            {/* Action Toolbar */}
            <div className="flex flex-wrap items-center gap-2">
              <button
                type="button"
                onClick={handleDownload}
                className="px-4 py-2.5 rounded-2xl text-white font-black text-xs shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-1.5 cursor-pointer"
                style={{ backgroundColor: '#1d4ed8' }}
              >
                <Download className="w-4 h-4" />
                <span>Download PDF</span>
              </button>

              <button
                type="button"
                onClick={handleShare}
                className="px-4 py-2.5 rounded-2xl border font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              >
                <Share2 className="w-4 h-4" />
                <span>{copied ? 'Copied Link!' : 'Share'}</span>
              </button>

              <button
                type="button"
                onClick={handlePrint}
                className="px-4 py-2.5 rounded-2xl border font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-1.5 cursor-pointer"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              >
                <Printer className="w-4 h-4" />
                <span>Print</span>
              </button>
            </div>
          </div>

          {/* Certificate Document Card (Matching Screenshot 38) */}
          <div
            className="p-8 sm:p-14 rounded-3xl border-4 border-double shadow-2xl text-center space-y-8 relative overflow-hidden"
            style={{
              backgroundColor: '#fffdfa',
              borderColor: '#1d4ed8',
              color: '#0f172a',
            }}
          >
            {/* Top Seal / Badge */}
            <div className="space-y-3">
              <div
                className="w-20 h-20 rounded-2xl mx-auto flex items-center justify-center text-white shadow-xl"
                style={{ backgroundColor: '#1d4ed8' }}
              >
                <Award className="w-10 h-10" />
              </div>
              <div>
                <span className="text-xs font-black uppercase tracking-widest text-blue-700 block">
                  CODERA INCLUSIVE TECH ECOSYSTEM
                </span>
                <span className="text-[10px] text-slate-500 font-bold uppercase tracking-wider">
                  Accredited Digital Credential Authority
                </span>
              </div>
            </div>

            <div className="space-y-1">
              <h2 className="text-2xl sm:text-3xl font-black font-serif text-slate-900 tracking-tight">
                Certificate of Technical Proficiency
              </h2>
              <span className="text-xs text-slate-500 italic block">
                This accredited credential is proudly awarded to
              </span>
            </div>

            {/* DYNAMIC REGISTERED USER FULL NAME */}
            <div className="py-2 max-w-md mx-auto border-b-2 border-blue-600/40">
              <span className="text-3xl sm:text-4xl font-black font-serif text-blue-700 tracking-wide block">
                {activeUser.fullName}
              </span>
            </div>

            {/* Citation Text */}
            <p className="text-xs sm:text-sm leading-relaxed max-w-xl mx-auto text-slate-600 font-medium">
              For demonstrating exceptional technical proficiency in <strong>Level 1: Block-Based Programming</strong> under the <strong>Adaptive Programming Track</strong>, completing 40 comprehensive modules in algorithmic thinking, tactile loop structures, and accessible computer science.
            </p>

            {/* Credential Metadata Footer */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 pt-8 border-t border-slate-200 text-xs">
              <div className="text-left rtl:text-right">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Credential ID</span>
                <span className="font-mono font-bold text-slate-700">CR-CERT-2026-94812</span>
                <span className="text-[10px] text-emerald-600 font-bold block mt-0.5">● Blockchain Verified</span>
              </div>

              <div>
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Proficiency Standard</span>
                <span className="font-bold text-slate-700">94% Mastery Standard</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Adaptive Track Level 1</span>
              </div>

              <div className="text-right rtl:text-left">
                <span className="text-[10px] uppercase font-bold text-slate-400 block">Issued Authority</span>
                <span className="font-bold text-slate-700">Academic Board of CodeRa</span>
                <span className="text-[10px] text-slate-500 block mt-0.5">Date: October 2026</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
