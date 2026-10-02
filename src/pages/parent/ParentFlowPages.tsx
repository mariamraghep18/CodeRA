import React, { useState } from 'react';
import { useRouter } from '../../router/Router';
import { useMockData, LearnerProfile } from '../../context/MockDataContext';
import { UniversalBackButton } from '../../components/UniversalBackButton';
import { ProfileAvatarButton } from '../../components/profile/ProfileAvatarButton';
import {
  Users,
  User,
  GraduationCap,
  Sparkles,
  Copy,
  Check,
  ArrowRight,
  ArrowLeft,
  ShieldCheck,
  Shield,
  CreditCard,
  Lock,
  Unlock,
  CheckCircle2,
  Clock,
  BookOpen,
  Award,
  Video,
  Download,
  Share2,
  Bell,
  AlertCircle,
  Eye,
  EyeOff,
  Sliders,
  ChevronRight,
  TrendingUp,
  FileCheck,
  Activity,
  Calendar,
  Layers,
  Heart,
  Plus,
  Flame,
  CheckCircle,
} from 'lucide-react';

/* ========================================================================= */
/* 1. VIEW 1: CREATE PARENT ACCOUNT (/register-parent)                       */
/* ========================================================================= */
export const RegisterParentPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, setCurrentRole } = useMockData();

  const [parentName, setParentName] = useState('Mariam Al-Mansoor');
  const [parentEmail, setParentEmail] = useState('mariam.mansoor@example.com');
  const [parentPhone, setParentPhone] = useState('+971 50 123 4567');
  const [password, setPassword] = useState('CodeRaSecure2026!');
  const [confirmPassword, setConfirmPassword] = useState('CodeRaSecure2026!');
  const [showPassword, setShowPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [agreeTerms, setAgreeTerms] = useState(true);
  const [errorMsg, setErrorMsg] = useState('');

  const handleCreateParent = (e: React.FormEvent) => {
    e.preventDefault();
    if (!agreeTerms) {
      setErrorMsg(
        lang === 'ar'
          ? 'يرجى الموافقة على شروط الخدمة وسياسة الخصوصية للمتابعة.'
          : 'Please agree to the Terms of Service and Privacy Policy.'
      );
      return;
    }
    if (password !== confirmPassword) {
      setErrorMsg(
        lang === 'ar' ? 'كلمات المرور غير متطابقة.' : 'Passwords do not match.'
      );
      return;
    }

    // Save parent info in session and authorize parent role
    sessionStorage.setItem(
      'codera_temp_parent',
      JSON.stringify({
        fullName: parentName,
        email: parentEmail,
        phone: parentPhone,
        relation: 'Mother',
      })
    );
    setCurrentRole('parent');
    navigate('/add-first-learner');
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#fcfbf7] dark:bg-[#070e1b] transition-colors">
      <div className="w-full max-w-xl rounded-3xl p-8 sm:p-10 border border-stone-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-2xl space-y-6 animate-in fade-in">
        <div className="flex items-center justify-start mb-2">
          <UniversalBackButton to="/" label="Back to Home" />
        </div>

        {/* Header Tag Badge */}
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-950/80 dark:text-blue-300 dark:border-blue-900 shadow-xs">
            <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400" />
            <span>
              {lang === 'ar' ? 'بوابة التعلم التكيفي' : 'ADAPTIVE LEARNING PORTAL'}
            </span>
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1.5">
          <h1 className="text-3xl font-black font-serif text-[#0f2347] dark:text-white tracking-tight">
            {lang === 'ar' ? 'إنشاء حساب ولي أمر' : 'Create Parent Account'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            {lang === 'ar'
              ? 'سجل لإدارة رحلة طفلك التعليمية على منصة كوديرا.'
              : "Register to manage your child's learning journey on CodeRa."}
          </p>
        </div>

        {errorMsg && (
          <div className="p-3 rounded-2xl bg-rose-50 dark:bg-rose-950/50 border border-rose-200 dark:border-rose-900 text-xs text-rose-700 dark:text-rose-300 font-semibold flex items-center gap-2">
            <AlertCircle className="w-4 h-4 shrink-0" />
            <span>{errorMsg}</span>
          </div>
        )}

        <form onSubmit={handleCreateParent} className="space-y-4 text-start">
          {/* Full Name */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
              {lang === 'ar' ? 'الاسم الكامل لولي الأمر' : 'Full Name'} *
            </label>
            <input
              type="text"
              required
              value={parentName}
              onChange={(e) => setParentName(e.target.value)}
              placeholder="e.g. Mariam Al-Mansoor"
              className="w-full px-4 py-3 rounded-2xl border border-stone-300 dark:border-slate-700 bg-stone-50/50 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
            />
          </div>

          {/* Email Address & Phone Number */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'} *
              </label>
              <input
                type="email"
                required
                value={parentEmail}
                onChange={(e) => setParentEmail(e.target.value)}
                placeholder="mariam@example.com"
                className="w-full px-4 py-3 rounded-2xl border border-stone-300 dark:border-slate-700 bg-stone-50/50 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                {lang === 'ar' ? 'رقم الهاتف' : 'Phone Number'} *
              </label>
              <input
                type="tel"
                required
                value={parentPhone}
                onChange={(e) => setParentPhone(e.target.value)}
                placeholder="+971 50 123 4567"
                className="w-full px-4 py-3 rounded-2xl border border-stone-300 dark:border-slate-700 bg-stone-50/50 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
              />
            </div>
          </div>

          {/* Password with Show toggle */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
              {lang === 'ar' ? 'كلمة المرور' : 'Password'} *
            </label>
            <div className="relative">
              <input
                type={showPassword ? 'text' : 'password'}
                required
                value={password}
                onChange={(e) => setPassword(e.target.value)}
                className="w-full ps-4 pe-16 py-3 rounded-2xl border border-stone-300 dark:border-slate-700 bg-stone-50/50 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowPassword(!showPassword)}
                className="absolute end-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs font-bold text-slate-500 hover:text-blue-600 cursor-pointer flex items-center gap-1 select-none"
              >
                {showPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showPassword ? (lang === 'ar' ? 'إخفاء' : 'Hide') : (lang === 'ar' ? 'إظهار' : 'Show')}</span>
              </button>
            </div>
          </div>

          {/* Confirm Password with Show toggle */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
              {lang === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm Password'} *
            </label>
            <div className="relative">
              <input
                type={showConfirmPassword ? 'text' : 'password'}
                required
                value={confirmPassword}
                onChange={(e) => setConfirmPassword(e.target.value)}
                className="w-full ps-4 pe-16 py-3 rounded-2xl border border-stone-300 dark:border-slate-700 bg-stone-50/50 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
              />
              <button
                type="button"
                onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                className="absolute end-3 top-1/2 -translate-y-1/2 px-2 py-1 text-xs font-bold text-slate-500 hover:text-blue-600 cursor-pointer flex items-center gap-1 select-none"
              >
                {showConfirmPassword ? <EyeOff className="w-3.5 h-3.5" /> : <Eye className="w-3.5 h-3.5" />}
                <span>{showConfirmPassword ? (lang === 'ar' ? 'إخفاء' : 'Hide') : (lang === 'ar' ? 'إظهار' : 'Show')}</span>
              </button>
            </div>
          </div>

          {/* Terms & Privacy Policy Checkbox */}
          <div className="pt-1">
            <label className="flex items-start gap-2.5 cursor-pointer select-none">
              <input
                type="checkbox"
                checked={agreeTerms}
                onChange={(e) => setAgreeTerms(e.target.checked)}
                className="w-4 h-4 mt-0.5 rounded border-stone-300 text-blue-600 focus:ring-blue-500 cursor-pointer"
              />
              <span className="text-xs text-slate-600 dark:text-slate-300 leading-snug">
                {lang === 'ar'
                  ? 'أوافق على شروط الخدمة وسياسة الخصوصية التكيفية وحماية بيانات الأطفال.'
                  : 'I agree to the Terms of Service and Neurodiverse Child Data Privacy Policy.'}
              </span>
            </label>
          </div>

          {/* Primary Button: Create Account */}
          <button
            type="submit"
            className="w-full py-4 rounded-full text-white font-bold text-sm bg-[#1d4ed8] hover:bg-[#1e40af] shadow-lg shadow-blue-600/25 hover:shadow-xl hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
          >
            <span>{lang === 'ar' ? 'إنشاء الحساب' : 'Create Account'}</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </form>

        <div className="text-center text-xs text-slate-500 dark:text-slate-400 border-t border-stone-100 dark:border-slate-800 pt-3">
          <span>{lang === 'ar' ? 'لديك حساب بالفعل؟' : 'Already have an account?'} </span>
          <button
            type="button"
            onClick={() => window.dispatchEvent(new CustomEvent('open-auth-modal', { detail: { step: 'login' } }))}
            className="font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
          >
            {lang === 'ar' ? 'تسجيل الدخول' : 'Login'}
          </button>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 2. VIEW 2: ADD YOUR FIRST LEARNER (/add-first-learner)                     */
/* ========================================================================= */
export const AddFirstLearnerPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, registerParentWithLearner } = useMockData();

  const [learnerName, setLearnerName] = useState('Omar Al-Mansoor');
  const [dob, setDob] = useState('2015-05-18');
  const [gender, setGender] = useState('Male');
  const [preferredLanguage, setPreferredLanguage] = useState('English');
  const [selectedPrefs, setSelectedPrefs] = useState<string[]>([
    'Text-to-Speech',
    'High Contrast Mode',
    'Keyboard Navigation',
  ]);

  const accessibilityOptions = [
    'Screen Reader Support',
    'Text-to-Speech',
    'High Contrast Mode',
    'Keyboard Navigation',
    'Reduced Motion',
    'Adjustable Text Size',
  ];

  const togglePref = (opt: string) => {
    setSelectedPrefs((prev) =>
      prev.includes(opt) ? prev.filter((p) => p !== opt) : [...prev, opt]
    );
  };

  const handleContinue = (e: React.FormEvent) => {
    e.preventDefault();
    const tempParent = JSON.parse(
      sessionStorage.getItem('codera_temp_parent') ||
        '{"fullName":"Mariam Al-Mansoor","email":"mariam.mansoor@example.com","phone":"+971 50 123 4567","relation":"Mother"}'
    );

    // Dynamically register the learner with the provided name
    registerParentWithLearner(tempParent, {
      name: learnerName.trim() || 'Omar Al-Mansoor',
      age: 11,
      grade: 'Grade 5',
      accommodations: selectedPrefs,
      diagnosis: `${gender} • ${preferredLanguage} • DOB: ${dob}`,
    });

    navigate('/parent-dashboard');
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#fcfbf7] dark:bg-[#070e1b] transition-colors">
      <div className="w-full max-w-xl rounded-3xl p-8 sm:p-10 border border-stone-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-2xl space-y-6 animate-in fade-in">
        <div className="flex items-center justify-start mb-2">
          <UniversalBackButton to="/register-parent" label="Back to Parent Registration" />
        </div>

        {/* Header Tag Badge */}
        <div>
          <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-emerald-100 text-emerald-800 border border-emerald-200 dark:bg-emerald-950/80 dark:text-emerald-300 dark:border-emerald-900 shadow-xs">
            <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600 dark:text-emerald-400" />
            <span>
              {lang === 'ar' ? 'تم إنشاء الحساب بنجاح!' : 'Account Created Successfully!'}
            </span>
          </span>
        </div>

        {/* Title & Subtitle */}
        <div className="space-y-1.5">
          <h1 className="text-3xl font-black font-serif text-[#0f2347] dark:text-white tracking-tight">
            {lang === 'ar' ? 'إضافة المتعلم الأول' : 'Add Your First Learner'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
            {lang === 'ar'
              ? 'أخبرنا عن طفلك لنتمكن من تخصيص تجربته التعليمية بما يناسب قدراته.'
              : 'Tell us about your child so we can personalize their learning experience.'}
          </p>
        </div>

        <form onSubmit={handleContinue} className="space-y-4 text-start">
          {/* Learner's Full Name (Dynamic Input) */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
              {lang === 'ar' ? 'اسم المتعلم الكامل' : "Learner's Full Name"} *
            </label>
            <input
              type="text"
              required
              value={learnerName}
              onChange={(e) => setLearnerName(e.target.value)}
              placeholder="e.g. Omar Al-Mansoor"
              className="w-full px-4 py-3 rounded-2xl border border-stone-300 dark:border-slate-700 bg-stone-50/50 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
            />
          </div>

          {/* Date of Birth & Gender */}
          <div className="grid grid-cols-1 sm:grid-cols-2 gap-3.5">
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                {lang === 'ar' ? 'تاريخ الميلاد' : 'Date of Birth'} *
              </label>
              <input
                type="date"
                required
                value={dob}
                onChange={(e) => setDob(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-stone-300 dark:border-slate-700 bg-stone-50/50 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors"
              />
            </div>
            <div className="space-y-1">
              <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                {lang === 'ar' ? 'الجنس' : 'Gender'}
              </label>
              <select
                value={gender}
                onChange={(e) => setGender(e.target.value)}
                className="w-full px-4 py-3 rounded-2xl border border-stone-300 dark:border-slate-700 bg-stone-50/50 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors cursor-pointer"
              >
                <option value="Male">{lang === 'ar' ? 'ذكر (Male)' : 'Male'}</option>
                <option value="Female">{lang === 'ar' ? 'أنثى (Female)' : 'Female'}</option>
                <option value="Prefer not to say">{lang === 'ar' ? 'أفضل عدم التحديد' : 'Prefer not to say'}</option>
              </select>
            </div>
          </div>

          {/* Preferred Language */}
          <div className="space-y-1">
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
              {lang === 'ar' ? 'اللغة المفضلة للتعلم' : 'Preferred Language'}
            </label>
            <select
              value={preferredLanguage}
              onChange={(e) => setPreferredLanguage(e.target.value)}
              className="w-full px-4 py-3 rounded-2xl border border-stone-300 dark:border-slate-700 bg-stone-50/50 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors cursor-pointer"
            >
              <option value="English">English</option>
              <option value="Arabic">العربية (Arabic)</option>
              <option value="Bilingual">Bilingual (English &amp; Arabic)</option>
            </select>
          </div>

          {/* Accessibility Preferences Checkboxes */}
          <div className="space-y-2 pt-1">
            <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
              {lang === 'ar' ? 'تفضيلات إمكانية الوصول والتيسير' : 'Accessibility Preferences'}
            </label>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-2">
              {accessibilityOptions.map((opt) => {
                const isChecked = selectedPrefs.includes(opt);
                return (
                  <label
                    key={opt}
                    onClick={() => togglePref(opt)}
                    className={`p-3 rounded-xl border text-xs font-semibold flex items-center justify-between transition-all cursor-pointer ${
                      isChecked
                        ? 'border-blue-500 bg-blue-50/60 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300 shadow-xs'
                        : 'border-stone-200 dark:border-slate-800 bg-stone-50/50 dark:bg-slate-900 text-slate-600 dark:text-slate-400'
                    }`}
                  >
                    <span>{opt}</span>
                    <input
                      type="checkbox"
                      checked={isChecked}
                      onChange={() => {}}
                      className="rounded border-stone-300 text-blue-600 focus:ring-blue-500 pointer-events-none"
                    />
                  </label>
                );
              })}
            </div>
          </div>

          {/* Action Buttons: Continue & Skip for Now */}
          <div className="space-y-2.5 pt-4">
            <button
              type="submit"
              className="w-full py-4 rounded-full text-white font-bold text-sm bg-[#1d4ed8] hover:bg-[#1e40af] shadow-lg shadow-blue-600/25 hover:shadow-xl hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
            >
              <span>{lang === 'ar' ? 'المتابعة للوحة التحكم' : 'Continue'}</span>
              <ArrowRight className="w-4 h-4 rtl:rotate-180" />
            </button>

            <button
              type="button"
              onClick={() => navigate('/parent-dashboard')}
              className="w-full py-2.5 text-center text-xs font-bold text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              {lang === 'ar' ? 'تخطي الآن' : 'Skip for Now'}
            </button>
          </div>
        </form>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 3. VIEW 3: MY LEARNERS DASHBOARD (/parent-dashboard)                      */
/* ========================================================================= */
export const ParentDashboardScreen: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, learners, activeLearnerId, setActiveLearnerId, addLearnerToParent, activeParentId } = useMockData();

  const [isAddModalOpen, setIsAddModalOpen] = useState(false);
  const [newChildName, setNewChildName] = useState('');
  const [newChildAge, setNewChildAge] = useState(10);
  const [newChildGrade, setNewChildGrade] = useState('Grade 4');

  // Metrics
  const totalLearners = learners.length;
  const activeSubscriptions = learners.filter((l) => l.courseUnlocked).length;
  const pendingActions = learners.filter((l) => !l.courseUnlocked).length;

  const handleAddNewLearner = (e: React.FormEvent) => {
    e.preventDefault();
    if (!newChildName.trim()) return;

    addLearnerToParent(activeParentId || 'parent_1', {
      name: newChildName.trim(),
      age: Number(newChildAge),
      grade: newChildGrade,
      accommodations: ['Text-to-Speech', 'Adjustable Text Size'],
      diagnosis: 'Adaptive Learner',
    });

    setNewChildName('');
    setIsAddModalOpen(false);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] p-4 sm:p-6 lg:p-10 bg-[#fcfbf7] dark:bg-[#070e1b] transition-colors space-y-8">
      <div className="max-w-6xl mx-auto space-y-6">
        <div className="flex items-center justify-start">
          <UniversalBackButton to="/" label="Back to Home" />
        </div>

        {/* Top Header & Actions */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <div>
            <div className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 mb-2">
              <Users className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'بوابة أولياء الأمور' : 'Parent Portal'}</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-black font-serif text-[#0f2347] dark:text-white tracking-tight">
              {lang === 'ar' ? 'أبنائي المتعلمين' : 'My Learners'}
            </h1>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 mt-1">
              {lang === 'ar'
                ? 'إدارة حسابات أبنائك، متابعة الاشتراكات، والاطلاع على مسارات التعلم التكيفية.'
                : 'Manage your enrolled learners, subscriptions, and learning tracks.'}
            </p>
          </div>

          <div className="flex items-center gap-3">
            {/* Interactive Parent Profile Trigger */}
            <ProfileAvatarButton roleOverride="parent" size="md" showLabel={true} />

            <button
              type="button"
              onClick={() => navigate('/parent-notifications')}
              className="p-3 rounded-2xl border border-stone-200 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-xs hover:bg-stone-50 dark:hover:bg-slate-800 transition-colors relative cursor-pointer"
              title={lang === 'ar' ? 'الإشعارات' : 'Notifications'}
            >
              <Bell className="w-5 h-5 text-blue-600" />
              {pendingActions > 0 && (
                <span className="absolute top-2 end-2 w-2.5 h-2.5 rounded-full bg-rose-500 animate-pulse" />
              )}
            </button>

            <button
              type="button"
              onClick={() => setIsAddModalOpen(true)}
              className="px-6 py-3.5 rounded-full text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer bg-[#107c41] hover:bg-[#0e6b37]"
            >
              <Plus className="w-4 h-4 stroke-[3]" />
              <span>{lang === 'ar' ? 'إضافة متعلم' : 'Add Learner'}</span>
            </button>
          </div>
        </div>

        {/* Top Summary Cards (3 Metric Tiles matching Screenshot 25) */}
        <div className="grid grid-cols-1 sm:grid-cols-3 gap-5">
          {/* Card 1: Total Learners */}
          <div className="p-6 rounded-3xl border border-stone-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {lang === 'ar' ? 'إجمالي المتعلمين' : 'Total Learners'}
            </span>
            <div className="flex items-center justify-between pt-1">
              <span className="text-3xl font-black font-serif text-[#0f2347] dark:text-white">
                {totalLearners}
              </span>
              <div className="w-10 h-10 rounded-2xl bg-blue-50 dark:bg-blue-950/80 text-blue-600 flex items-center justify-center">
                <Users className="w-5 h-5" />
              </div>
            </div>
            <span className="text-[11px] text-slate-500 font-medium block">
              {lang === 'ar' ? 'أطفال مسجلون في الحساب' : 'Enrolled sibling profiles'}
            </span>
          </div>

          {/* Card 2: Active Subscriptions */}
          <div className="p-6 rounded-3xl border border-stone-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {lang === 'ar' ? 'الاشتراكات النشطة' : 'Active Subscriptions'}
            </span>
            <div className="flex items-center justify-between pt-1">
              <span className="text-3xl font-black font-serif text-emerald-600">
                {activeSubscriptions}
              </span>
              <div className="w-10 h-10 rounded-2xl bg-emerald-50 dark:bg-emerald-950/80 text-emerald-600 flex items-center justify-center">
                <CheckCircle2 className="w-5 h-5" />
              </div>
            </div>
            <span className="text-[11px] text-emerald-600 font-bold block">
              {lang === 'ar' ? 'وصول مفتوح للمنهاج بالكامل' : 'Full curriculum unlocked'}
            </span>
          </div>

          {/* Card 3: Pending Actions */}
          <div className="p-6 rounded-3xl border border-stone-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-sm space-y-1">
            <span className="text-xs font-bold text-slate-500 uppercase tracking-wider block">
              {lang === 'ar' ? 'الإجراءات المعلقة' : 'Pending Actions'}
            </span>
            <div className="flex items-center justify-between pt-1">
              <span className="text-3xl font-black font-serif text-amber-600">
                {pendingActions}
              </span>
              <div className="w-10 h-10 rounded-2xl bg-amber-50 dark:bg-amber-950/80 text-amber-600 flex items-center justify-center">
                <AlertCircle className="w-5 h-5" />
              </div>
            </div>
            <span className="text-[11px] text-amber-600 font-bold block">
              {pendingActions > 0
                ? lang === 'ar'
                  ? 'سداد رسوم الاشتراك مطلوب'
                  : 'Payment required for activation'
                : lang === 'ar'
                ? 'جميع الحسابات مكتملة'
                : 'All accounts up to date'}
            </span>
          </div>
        </div>

        {/* Dynamic Registered Learners Grid */}
        <div className="space-y-4">
          <h2 className="text-xl font-bold font-serif text-[#0f2347] dark:text-white">
            {lang === 'ar' ? 'قائمة المتعلمين المسجلين' : 'Registered Learners'}
          </h2>

          <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-6">
            {learners.map((learner) => {
              const isPaid = learner.courseUnlocked;
              return (
                <div
                  key={learner.id}
                  className="rounded-3xl border border-stone-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 shadow-md hover:shadow-xl transition-all duration-300 flex flex-col justify-between space-y-5"
                >
                  <div className="space-y-4">
                    {/* Top row: Avatar & Status Badge */}
                    <div className="flex items-start justify-between gap-3">
                      <div className="flex items-center gap-3">
                        <div className="w-12 h-12 rounded-2xl bg-gradient-to-tr from-blue-600 via-teal-600 to-emerald-600 text-white font-black text-lg flex items-center justify-center shadow-md">
                          {learner.name.charAt(0)}
                        </div>
                        <div>
                          <h3 className="font-bold text-base text-slate-900 dark:text-white leading-tight">
                            {learner.name}
                          </h3>
                          <span className="text-xs text-slate-500 dark:text-slate-400">
                            {learner.age} {lang === 'ar' ? 'سنوات' : 'yrs'} • {learner.grade || 'Grade 5'}
                          </span>
                        </div>
                      </div>

                      <span
                        className={`text-[10px] font-black uppercase tracking-wider px-2.5 py-1 rounded-full border ${
                          isPaid
                            ? 'bg-emerald-50 text-emerald-700 border-emerald-200 dark:bg-emerald-950/60 dark:text-emerald-300 dark:border-emerald-800'
                            : 'bg-amber-50 text-amber-700 border-amber-200 dark:bg-amber-950/60 dark:text-amber-300 dark:border-amber-800'
                        }`}
                      >
                        {isPaid
                          ? lang === 'ar'
                            ? 'اشتراك نشط'
                            : 'Active Subscription'
                          : lang === 'ar'
                          ? 'بانتظار الدفع'
                          : 'Payment Pending'}
                      </span>
                    </div>

                    {/* Assigned Level */}
                    <div className="p-3 rounded-2xl bg-stone-50 dark:bg-slate-900 border border-stone-100 dark:border-slate-800 space-y-1">
                      <span className="text-[10px] font-bold text-slate-400 uppercase tracking-wider block">
                        {lang === 'ar' ? 'المسار التعليمي المعين' : 'Assigned Track'}
                      </span>
                      <div className="flex items-center justify-between text-xs font-bold text-slate-800 dark:text-slate-200">
                        <span>{learner.assessment?.levelName || 'Level 1: Block-Based Coding'}</span>
                        <span className="text-blue-600 font-mono font-bold">
                          {learner.assessment?.level || 'L1'}
                        </span>
                      </div>
                    </div>

                    {/* Progress Bar */}
                    <div className="space-y-1.5">
                      <div className="flex justify-between items-center text-xs font-bold">
                        <span className="text-slate-500">{lang === 'ar' ? 'التقدم' : 'Progress'}</span>
                        <span className="text-slate-900 dark:text-white font-mono">
                          {isPaid ? '64%' : '0%'}
                        </span>
                      </div>
                      <div className="w-full h-2 rounded-full bg-stone-100 dark:bg-slate-800 overflow-hidden">
                        <div
                          className={`h-full rounded-full transition-all duration-700 ${
                            isPaid ? 'bg-[#107c41]' : 'bg-slate-300 dark:bg-slate-700'
                          }`}
                          style={{ width: isPaid ? '64%' : '0%' }}
                        />
                      </div>
                    </div>
                  </div>

                  {/* Actions on Card */}
                  <div className="flex items-center gap-2 pt-2 border-t border-stone-100 dark:border-slate-800">
                    {!isPaid ? (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveLearnerId(learner.id);
                          navigate('/parent/payment-flow');
                        }}
                        className="flex-1 py-2.5 rounded-full text-white font-bold text-xs bg-[#1d4ed8] hover:bg-[#1e40af] shadow-md hover:scale-105 active:scale-95 transition-all flex items-center justify-center gap-1.5 cursor-pointer"
                      >
                        <CreditCard className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'الدفع الآن ($180)' : 'Pay Now ($180)'}</span>
                      </button>
                    ) : (
                      <button
                        type="button"
                        onClick={() => {
                          setActiveLearnerId(learner.id);
                          navigate('/parent/learner-progress');
                        }}
                        className="flex-1 py-2.5 rounded-full border border-stone-200 dark:border-slate-700 hover:bg-stone-50 dark:hover:bg-slate-800 text-xs font-bold text-slate-700 dark:text-slate-300 transition-colors cursor-pointer"
                      >
                        {lang === 'ar' ? 'سجل التقدم' : 'Track Progress'}
                      </button>
                    )}

                    <button
                      type="button"
                      onClick={() => {
                        setActiveLearnerId(learner.id);
                        navigate('/parent/learner-detail');
                      }}
                      className="px-4 py-2.5 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors flex items-center gap-1 cursor-pointer"
                    >
                      <span>{lang === 'ar' ? 'التفاصيل' : 'View Details'}</span>
                      <ChevronRight className="w-3.5 h-3.5 rtl:rotate-180" />
                    </button>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* Inline Modal to Add Learner Dynamically */}
      {isAddModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div className="w-full max-w-md rounded-3xl p-6 sm:p-8 bg-white dark:bg-[#101726] border border-stone-200 dark:border-slate-800 shadow-2xl space-y-5 animate-in zoom-in-95 text-start">
            <div className="flex items-center justify-between border-b pb-3 border-stone-200 dark:border-slate-800">
              <h3 className="font-bold text-lg font-serif text-[#0f2347] dark:text-white">
                {lang === 'ar' ? 'إضافة متعلم جديد' : 'Add Another Learner'}
              </h3>
              <button
                type="button"
                onClick={() => setIsAddModalOpen(false)}
                className="p-1.5 rounded-xl hover:bg-slate-100 dark:hover:bg-slate-800 text-slate-500 cursor-pointer"
              >
                ✕
              </button>
            </div>

            <form onSubmit={handleAddNewLearner} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  {lang === 'ar' ? 'اسم المتعلم الكامل' : "Learner's Full Name"} *
                </label>
                <input
                  type="text"
                  required
                  value={newChildName}
                  onChange={(e) => setNewChildName(e.target.value)}
                  placeholder="e.g. Zaid Al-Mansoor"
                  className="w-full px-4 py-3 rounded-2xl border border-stone-300 dark:border-slate-700 bg-stone-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                    {lang === 'ar' ? 'العمر' : 'Age'}
                  </label>
                  <input
                    type="number"
                    min={4}
                    max={25}
                    value={newChildAge}
                    onChange={(e) => setNewChildAge(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-2xl border border-stone-300 dark:border-slate-700 bg-stone-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                    {lang === 'ar' ? 'الصف الدراسي' : 'Grade'}
                  </label>
                  <input
                    type="text"
                    value={newChildGrade}
                    onChange={(e) => setNewChildGrade(e.target.value)}
                    placeholder="Grade 4"
                    className="w-full px-4 py-3 rounded-2xl border border-stone-300 dark:border-slate-700 bg-stone-50 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                className="w-full py-3.5 rounded-full text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer bg-[#107c41] hover:bg-[#0e6b37] mt-2"
              >
                {lang === 'ar' ? 'حفظ وإضافة المتعلم' : 'Save & Add Learner'}
              </button>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ========================================================================= */
/* 4. VIEW 4: COMPLETE PAYMENT FOR [LEARNER NAME] (/parent/payment-flow)     */
/* ========================================================================= */
export const ParentPaymentFlowPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, payLearnerCourse, activeLearnerId, learners } = useMockData();
  const currentLearner = learners.find((l) => l.id === activeLearnerId) || learners[2] || learners[0];

  const learnerDisplayName = currentLearner?.name || 'Omar';

  const [cardholderName, setCardholderName] = useState('Mariam Al-Mansoor');
  const [cardNumber, setCardNumber] = useState('4242 •••• •••• 4242');
  const [expiry, setExpiry] = useState('12/28');
  const [cvv, setCvv] = useState('789');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      if (currentLearner) {
        payLearnerCourse(currentLearner.id, 180);
      }
      setIsProcessing(false);
      navigate('/parent/payment-success');
    }, 700);
  };

  return (
    <div className="min-h-[calc(100vh-5rem)] p-4 sm:p-6 lg:p-10 bg-[#fcfbf7] dark:bg-[#070e1b] transition-colors flex items-center justify-center">
      <div className="w-full max-w-4xl rounded-3xl border border-stone-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-2xl p-6 sm:p-10 space-y-8 animate-in fade-in">
        {/* Dynamic Heading & Subtitle matching Screenshot 26 */}
        <div className="space-y-4 border-b border-stone-100 dark:border-slate-800 pb-6 text-start">
          <div>
            <UniversalBackButton
              to="/parent-dashboard"
              label={lang === 'ar' ? 'الرجوع للمتعلمين' : 'Back to My Learners'}
            />
          </div>

          <h1 className="text-2xl sm:text-3xl font-black font-serif text-[#0f2347] dark:text-white tracking-tight">
            {lang === 'ar'
              ? `إتمام الدفع للمتعلم: ${learnerDisplayName}`
              : `Complete Payment for ${learnerDisplayName}`}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-400 font-sans leading-relaxed">
            {lang === 'ar'
              ? 'تُحدد خطط كوديرا لكل متعلم لتوفير المساعدة التكيفية المخصصة والإعدادات الحسية المريحة.'
              : 'CodeRa plans are priced per learner to provide personalized adaptive assistance and sensory setups.'}
          </p>
        </div>

        {/* Two-Column Asymmetric Layout */}
        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 text-start">
          {/* Left Column: Subscription Summary */}
          <div className="lg:col-span-6 p-6 rounded-3xl bg-[#faf8f5] dark:bg-[#151c2e] border border-stone-200 dark:border-slate-800 space-y-5">
            <div>
              <span className="text-[10px] font-black uppercase tracking-wider text-blue-700 dark:text-blue-400 block mb-1">
                {lang === 'ar' ? 'ملخص الخطة السنوية' : 'SUBSCRIPTION SUMMARY'}
              </span>
              <h3 className="text-xl font-bold font-serif text-[#0f2347] dark:text-white">
                {lang === 'ar' ? 'مسار التعلم التكيفي السنوي' : 'Annual Adaptive Learning Track'}
              </h3>
            </div>

            <div className="space-y-2 text-xs border-y border-stone-200 dark:border-slate-800 py-4">
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'ar' ? 'المتعلم:' : 'Enrolled Learner:'}</span>
                <span className="font-bold text-slate-900 dark:text-white">{learnerDisplayName}</span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'ar' ? 'المستوى التعليمي:' : 'Assigned Level:'}</span>
                <span className="font-bold text-blue-600">
                  {currentLearner?.assessment?.levelName || 'Level 1: Block-Based Adaptive Curriculum'}
                </span>
              </div>
              <div className="flex justify-between">
                <span className="text-slate-500">{lang === 'ar' ? 'فترة الاشتراك:' : 'Subscription Period:'}</span>
                <span className="font-bold text-slate-900 dark:text-white">
                  {lang === 'ar' ? 'وصول سنوي (١٢ شهراً)' : 'Annual Access (12 Months)'}
                </span>
              </div>
            </div>

            <div className="space-y-2 text-xs">
              <span className="font-bold text-slate-700 dark:text-slate-300 block">
                {lang === 'ar' ? 'الميزات التكيفية المشمولة:' : 'Adaptive Features Included:'}
              </span>
              <ul className="space-y-1.5 text-slate-600 dark:text-slate-400 text-xs">
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>AI-guided sensory assessment &amp; diagnostic report</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Isolated learner sandbox with personalized PIN</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Full accessibility suite (TTS, High Contrast, Screen Reader)</span>
                </li>
                <li className="flex items-center gap-2">
                  <Check className="w-3.5 h-3.5 text-emerald-600 shrink-0" />
                  <span>Blockchain-verified completion certificates</span>
                </li>
              </ul>
            </div>

            <div className="pt-2 border-t border-stone-200 dark:border-slate-800 flex justify-between items-center">
              <div>
                <span className="text-xs text-slate-500 block">{lang === 'ar' ? 'الإجمالي السنوي:' : 'Total Plan Price:'}</span>
                <span className="text-xs text-emerald-600 font-bold">{lang === 'ar' ? 'شامل كافة الضرائب' : 'All taxes included'}</span>
              </div>
              <span className="text-3xl font-black font-serif text-[#107c41]">
                $180.00
                <span className="text-xs font-sans text-slate-500">/yr</span>
              </span>
            </div>
          </div>

          {/* Right Column: Payment Details Form */}
          <div className="lg:col-span-6 space-y-4">
            <h3 className="text-base font-bold text-[#0f2347] dark:text-white">
              {lang === 'ar' ? 'بيانات بطاقة الدفع' : 'Payment Details'}
            </h3>

            <form onSubmit={handlePay} className="space-y-4">
              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  {lang === 'ar' ? 'اسم صاحب البطاقة' : 'Cardholder Name'}
                </label>
                <input
                  type="text"
                  required
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border border-stone-300 dark:border-slate-700 bg-stone-50/50 dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                />
              </div>

              <div className="space-y-1">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  {lang === 'ar' ? 'رقم البطاقة' : 'Card Number'}
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border border-stone-300 dark:border-slate-700 bg-stone-50/50 dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                  <CreditCard className="w-4 h-4 text-slate-400 absolute end-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              <div className="grid grid-cols-2 gap-3">
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                    {lang === 'ar' ? 'تاريخ الانتهاء' : 'Expiry Date'}
                  </label>
                  <input
                    type="text"
                    required
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 rounded-2xl border border-stone-300 dark:border-slate-700 bg-stone-50/50 dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
                <div className="space-y-1">
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                    CVV
                  </label>
                  <input
                    type="text"
                    required
                    value={cvv}
                    onChange={(e) => setCvv(e.target.value)}
                    placeholder="123"
                    className="w-full px-4 py-3 rounded-2xl border border-stone-300 dark:border-slate-700 bg-stone-50/50 dark:bg-slate-900 text-xs font-mono text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600"
                  />
                </div>
              </div>

              <button
                type="submit"
                disabled={isProcessing}
                className="w-full py-4 rounded-full text-white font-bold text-sm bg-[#1d4ed8] hover:bg-[#1e40af] shadow-lg shadow-blue-600/25 hover:shadow-xl hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-4"
              >
                {isProcessing ? (
                  <span>{lang === 'ar' ? 'جارٍ معالجة الدفع الآمن...' : 'Processing Secure Payment...'}</span>
                ) : (
                  <>
                    <Lock className="w-4 h-4" />
                    <span>{lang === 'ar' ? 'دفع $180.00 بأمان' : 'Pay $180.00 Securely'}</span>
                  </>
                )}
              </button>

              <div className="flex items-center justify-center gap-4 text-[10px] text-slate-400 pt-2 font-medium">
                <span className="flex items-center gap-1">
                  <ShieldCheck className="w-3.5 h-3.5 text-emerald-600" />
                  256-Bit SSL Encrypted
                </span>
                <span>•</span>
                <span>PCI-DSS Compliant</span>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 5. VIEW 5: PAYMENT SUCCESSFUL! (/parent/payment-success)                   */
/* ========================================================================= */
export const ParentPaymentSuccessPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, learners, activeLearnerId } = useMockData();
  const currentLearner = learners.find((l) => l.id === activeLearnerId) || learners[2] || learners[0];
  const learnerDisplayName = currentLearner?.name || 'Omar Al-Mansoor';

  return (
    <div className="min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 bg-[#fcfbf7] dark:bg-[#070e1b] transition-colors">
      <div className="w-full max-w-lg rounded-3xl p-8 sm:p-10 border border-stone-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] shadow-2xl text-center space-y-6 animate-in zoom-in-95">
        <div className="flex justify-start">
          <UniversalBackButton to="/parent-dashboard" label="Back to Dashboard" />
        </div>

        {/* Success checkmark icon */}
        <div className="w-16 h-16 rounded-full bg-emerald-100 text-[#107c41] dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center mx-auto shadow-md animate-bounce">
          <CheckCircle2 className="w-10 h-10 stroke-[2.5]" />
        </div>

        {/* Header & Subtitle matching Screenshot 27 */}
        <div className="space-y-2">
          <h1 className="text-3xl font-black font-serif text-[#0f2347] dark:text-white tracking-tight">
            {lang === 'ar' ? 'تم الدفع بنجاح!' : 'Payment Successful!'}
          </h1>
          <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-md mx-auto leading-relaxed">
            {lang === 'ar'
              ? `أصبح لدى ${learnerDisplayName} الآن وصول كامل وغير مقيد إلى منهاج المستوى الأول التكيفي القائم على الكتل.`
              : `${learnerDisplayName} now has full, unrestricted access to the Level 1 Block-Based Adaptive Curriculum.`}
          </p>
        </div>

        {/* Transaction Details Box */}
        <div className="p-5 rounded-2xl border border-stone-200 dark:border-slate-800 bg-[#faf8f5] dark:bg-[#151c2e] text-start space-y-2.5 text-xs font-sans">
          <div className="flex justify-between items-center">
            <span className="text-slate-500">{lang === 'ar' ? 'اسم المتعلم:' : 'Learner Name:'}</span>
            <span className="font-bold text-slate-900 dark:text-white">{learnerDisplayName}</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">{lang === 'ar' ? 'المستوى المفعل:' : 'Unlocked Level:'}</span>
            <span className="font-bold text-blue-600">Level 1: Block-Based Adaptive Curriculum</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">{lang === 'ar' ? 'المبلغ المسدد:' : 'Paid Amount:'}</span>
            <span className="font-bold text-[#107c41]">$180.00 USD</span>
          </div>
          <div className="flex justify-between items-center">
            <span className="text-slate-500">{lang === 'ar' ? 'رقم المعاملة:' : 'Transaction ID:'}</span>
            <span className="font-mono font-bold text-slate-700 dark:text-slate-300">
              {currentLearner?.payment?.transactionId || 'TXN-CR-882941'}
            </span>
          </div>
          <div className="flex justify-between items-center border-t border-stone-200 dark:border-slate-800 pt-2 text-[11px] text-slate-400">
            <span>{new Date().toLocaleDateString()}</span>
            <span>Credit Card (•••• 4242)</span>
          </div>
        </div>

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => alert(lang === 'ar' ? 'جاري تحميل إيصال الدفع بصيغة PDF...' : 'Downloading receipt PDF...')}
            className="w-full py-3.5 rounded-full border border-stone-300 dark:border-slate-700 hover:bg-stone-50 dark:hover:bg-slate-800 text-xs sm:text-sm font-bold text-slate-800 dark:text-slate-200 transition-colors flex items-center justify-center gap-2 cursor-pointer"
          >
            <Download className="w-4 h-4" />
            <span>{lang === 'ar' ? 'تحميل إيصال الدفع (PDF)' : 'Download PDF Receipt'}</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/parent/learner-detail')}
            className="w-full py-4 rounded-full text-white font-bold text-sm bg-[#107c41] hover:bg-[#0e6b37] shadow-lg shadow-emerald-600/25 hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
          >
            <span>
              {lang === 'ar'
                ? `الانتقال إلى لوحة تحكم ${learnerDisplayName}`
                : `Go to ${learnerDisplayName}'s Dashboard`}
            </span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 6. VIEW 6: LEARNER OVERVIEW / DASHBOARD (/parent/learner-detail)          */
/* ========================================================================= */
export const LearnerDetailPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, learners, activeLearnerId, setActiveLearnerId } = useMockData();
  const currentLearner = learners.find((l) => l.id === activeLearnerId) || learners[0];
  const learnerDisplayName = currentLearner?.name || 'Ahmed Hassan';

  const [activeTab, setActiveTab] = useState<'overview' | 'progress' | 'certificates' | 'settings'>('overview');

  return (
    <div className="min-h-[calc(100vh-5rem)] p-4 sm:p-6 lg:p-10 bg-[#fcfbf7] dark:bg-[#070e1b] transition-colors space-y-8">
      <div className="max-w-6xl mx-auto space-y-6">
        {/* Back Link & Child Switcher Tabs */}
        <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
          <UniversalBackButton
            to="/parent-dashboard"
            label={lang === 'ar' ? 'الرجوع للوحة المتعلمين' : 'Back to My Learners'}
          />

          {/* Child Switcher Pills & Profile Trigger */}
          <div className="flex items-center gap-2">
            <div className="flex items-center gap-2 overflow-x-auto p-1.5 rounded-2xl bg-white dark:bg-[#0f172a] border border-stone-200 dark:border-slate-800 shadow-xs">
              <span className="text-[11px] font-bold px-2 text-slate-400">
                {lang === 'ar' ? 'المتعلم:' : 'Child:'}
              </span>
              {learners.map((lrn) => {
                const isSelected = lrn.id === currentLearner.id;
                return (
                  <button
                    key={lrn.id}
                    type="button"
                    onClick={() => setActiveLearnerId(lrn.id)}
                    className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                      isSelected
                        ? 'bg-blue-600 text-white shadow-xs'
                        : 'text-slate-600 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800'
                    }`}
                  >
                    {lrn.name}
                  </button>
                );
              })}
            </div>

            <ProfileAvatarButton roleOverride="parent" size="sm" showLabel={false} />
          </div>
        </div>

        {/* Dynamic Learner Header Card matching Screenshot 28 */}
        <div className="rounded-3xl border border-stone-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 sm:p-8 shadow-xl space-y-6 text-start">
          <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-100 dark:border-slate-800 pb-6">
            <div className="flex items-center gap-4">
              <div className="w-16 h-16 rounded-2xl bg-gradient-to-tr from-blue-600 to-teal-500 text-white font-black text-2xl flex items-center justify-center shadow-md">
                {learnerDisplayName.charAt(0)}
              </div>
              <div>
                <div className="flex items-center gap-2.5">
                  <h1 className="text-2xl sm:text-3xl font-black font-serif text-[#0f2347] dark:text-white">
                    {learnerDisplayName}
                  </h1>
                  <span className="inline-flex items-center gap-1 text-[11px] font-bold px-2.5 py-0.5 rounded-full bg-emerald-50 text-emerald-700 border border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300">
                    <CheckCircle className="w-3 h-3 text-emerald-600" />
                    <span>Verified Learner</span>
                  </span>
                </div>
                <div className="flex items-center gap-3 text-xs text-slate-500 dark:text-slate-400 mt-1">
                  <span>{currentLearner.age} years old</span>
                  <span>•</span>
                  <span>{currentLearner.grade || 'Grade 6'}</span>
                  <span>•</span>
                  <span className="text-blue-600 font-bold">
                    {currentLearner.assessment?.levelName || 'Level 2: Programmer'}
                  </span>
                </div>
              </div>
            </div>

            {/* Quick Action Navigation Buttons */}
            <div className="flex flex-wrap items-center gap-2.5">
              <button
                type="button"
                onClick={() => navigate('/parent/learner-progress')}
                className="px-5 py-2.5 rounded-full border border-stone-200 dark:border-slate-700 bg-stone-50 hover:bg-stone-100 dark:bg-slate-800 dark:hover:bg-slate-700 text-xs font-bold text-slate-800 dark:text-slate-200 transition-colors cursor-pointer"
              >
                {lang === 'ar' ? 'عرض تفاصيل التقدم' : 'View Progress Detail'}
              </button>
              <button
                type="button"
                onClick={() => navigate('/parent/learner-certificates')}
                className="px-5 py-2.5 rounded-full text-white font-bold text-xs bg-[#1d4ed8] hover:bg-[#1e40af] shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer"
              >
                {lang === 'ar' ? 'عرض الشهادة المعتمدة' : 'View Placement Certificate'}
              </button>
            </div>
          </div>

          {/* Navigation Tabs: Overview, Progress, Certificates, Settings */}
          <div className="flex items-center gap-4 border-b border-stone-200 dark:border-slate-800 text-xs font-bold">
            <button
              type="button"
              onClick={() => setActiveTab('overview')}
              className={`pb-3 border-b-2 transition-colors cursor-pointer ${
                activeTab === 'overview'
                  ? 'border-blue-600 text-blue-600'
                  : 'border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200'
              }`}
            >
              {lang === 'ar' ? 'نظرة عامة' : 'Overview'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/parent/learner-progress')}
              className="pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              {lang === 'ar' ? 'التقدم' : 'Progress'}
            </button>
            <button
              type="button"
              onClick={() => navigate('/parent/learner-certificates')}
              className="pb-3 border-b-2 border-transparent text-slate-500 hover:text-slate-800 dark:hover:text-slate-200 transition-colors cursor-pointer"
            >
              {lang === 'ar' ? 'الشهادات' : 'Certificates'}
            </button>
          </div>

          {/* Overview Tab Content */}
          <div className="space-y-6 pt-2">
            {/* Row 1: Level Progress & Next Lesson */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Current Level Progress Card */}
              <div className="p-6 rounded-3xl bg-[#faf8f5] dark:bg-[#151c2e] border border-stone-200 dark:border-slate-800 space-y-4">
                <div className="flex justify-between items-center">
                  <span className="text-xs font-bold uppercase tracking-wider text-slate-500">
                    {lang === 'ar' ? 'التقدم في المستوى الحالي' : 'Current Level Progress'}
                  </span>
                  <span className="text-xs font-black text-emerald-600 font-mono">68% Completed</span>
                </div>
                <div className="w-full h-3 rounded-full bg-stone-200 dark:bg-slate-700 overflow-hidden">
                  <div className="h-full rounded-full bg-[#107c41]" style={{ width: '68%' }} />
                </div>
                <div className="flex justify-between text-xs text-slate-600 dark:text-slate-400">
                  <span>32 of 48 lessons mastered</span>
                  <span>16 tasks remaining</span>
                </div>
              </div>

              {/* Next Lesson Details */}
              <div className="p-6 rounded-3xl bg-[#faf8f5] dark:bg-[#151c2e] border border-stone-200 dark:border-slate-800 space-y-3 flex flex-col justify-between">
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 dark:text-blue-400 block mb-1">
                    {lang === 'ar' ? 'الدرس القادم' : 'NEXT LESSON'}
                  </span>
                  <h4 className="text-base font-bold text-slate-900 dark:text-white">
                    Lesson 7: Dynamic Loop Structures with Tactile Feedback
                  </h4>
                  <p className="text-xs text-slate-500 dark:text-slate-400 mt-1">
                    Introduction to repeat-until blocks with audio prompts.
                  </p>
                </div>
                <div className="pt-2">
                  <button
                    type="button"
                    onClick={() => navigate('/learning-content')}
                    className="px-5 py-2.5 rounded-full text-white font-bold text-xs bg-[#1d4ed8] hover:bg-[#1e40af] transition-all cursor-pointer inline-flex items-center gap-1.5"
                  >
                    <span>{lang === 'ar' ? 'متابعة التعلم' : 'Resume Learning'}</span>
                    <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                  </button>
                </div>
              </div>
            </div>

            {/* Row 2: Sensory Placement Assessment Results & Supervision */}
            <div className="grid grid-cols-1 lg:grid-cols-2 gap-5">
              {/* Sensory Placement Assessment Results Card */}
              <div className="p-6 rounded-3xl bg-[#faf8f5] dark:bg-[#151c2e] border border-stone-200 dark:border-slate-800 space-y-4">
                <div className="flex items-center justify-between">
                  <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                    {lang === 'ar' ? 'نتائج التقييم التكيفي الحسي' : 'Sensory Placement Assessment Results'}
                  </h3>
                  <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2 py-0.5 rounded-md">
                    {currentLearner.assessment?.score || 88}% Score
                  </span>
                </div>
                <div className="space-y-2.5 text-xs">
                  {[
                    { name: 'Logic & Sequencing', score: 92 },
                    { name: 'Pattern Recognition', score: 86 },
                    { name: 'Problem Solving', score: 88 },
                    { name: 'Coding Basics', score: 80 },
                  ].map((skill, i) => (
                    <div key={i} className="space-y-1">
                      <div className="flex justify-between font-semibold">
                        <span className="text-slate-600 dark:text-slate-300">{skill.name}</span>
                        <span className="font-mono text-slate-900 dark:text-white">{skill.score}%</span>
                      </div>
                      <div className="w-full h-1.5 rounded-full bg-stone-200 dark:bg-slate-700 overflow-hidden">
                        <div className="h-full rounded-full bg-blue-600" style={{ width: `${skill.score}%` }} />
                      </div>
                    </div>
                  ))}
                </div>
              </div>

              {/* Supervision & Subscription Details Card */}
              <div className="p-6 rounded-3xl bg-[#faf8f5] dark:bg-[#151c2e] border border-stone-200 dark:border-slate-800 space-y-4 text-xs">
                <h3 className="text-sm font-bold text-slate-900 dark:text-white">
                  {lang === 'ar' ? 'حالة الرقابة والاشتراك' : 'Supervision & Subscription Details'}
                </h3>
                <div className="space-y-3">
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800">
                    <span className="text-slate-500">{lang === 'ar' ? 'الرقابة الأبوية:' : 'Parental Oversight:'}</span>
                    <span className="font-bold text-emerald-600 flex items-center gap-1">
                      <CheckCircle2 className="w-3.5 h-3.5" />
                      Active (Sensory Pacing: Moderate)
                    </span>
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800">
                    <span className="text-slate-500">{lang === 'ar' ? 'حالة الاشتراك:' : 'Subscription Plan:'}</span>
                    {currentLearner.courseUnlocked ? (
                      <span className="font-bold text-[#107c41]">Annual Plan Active ($180/yr)</span>
                    ) : (
                      <button
                        type="button"
                        onClick={() => navigate('/parent/payment-flow')}
                        className="font-bold text-amber-600 hover:underline cursor-pointer"
                      >
                        Payment Due ($180) - Pay Now
                      </button>
                    )}
                  </div>
                  <div className="flex items-center justify-between p-3 rounded-2xl bg-white dark:bg-slate-900 border border-stone-200 dark:border-slate-800">
                    <span className="text-slate-500">{lang === 'ar' ? 'التيسيرات المفعلة:' : 'Active Accommodations:'}</span>
                    <span className="font-bold text-slate-800 dark:text-slate-200">
                      {(currentLearner.accommodations || ['TTS', 'High Contrast']).slice(0, 2).join(', ')}
                    </span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 7. VIEW 7: LEARNING PROGRESS (/parent/learner-progress)                   */
/* ========================================================================= */
export const LearnerProgressPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, learners, activeLearnerId } = useMockData();
  const currentLearner = learners.find((l) => l.id === activeLearnerId) || learners[0];
  const learnerDisplayName = currentLearner?.name || 'Ahmed Hassan';

  const modules = [
    { title: 'Module 1: Sequential Commands & Drag-and-Drop Blocks', progress: 100, status: 'Completed' },
    { title: 'Module 2: Conditional Statements (If-Else Logic)', progress: 100, status: 'Completed' },
    { title: 'Module 3: Loop Patterns & Iterations', progress: 65, status: 'In Progress' },
    { title: 'Module 4: Variables & Sensory Input', progress: 0, status: 'Upcoming' },
    { title: 'Module 5: Capstone Robotics & Interactive Showcase', progress: 0, status: 'Locked' },
  ];

  return (
    <div className="min-h-[calc(100vh-5rem)] p-4 sm:p-6 lg:p-10 bg-[#fcfbf7] dark:bg-[#070e1b] transition-colors space-y-8 text-start">
      <div className="max-w-5xl mx-auto space-y-6">
        <UniversalBackButton
          to="/parent/learner-detail"
          label={lang === 'ar' ? 'الرجوع للمتعلم' : 'Back to Learner Overview'}
        />

        <div className="rounded-3xl border border-stone-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif text-[#0f2347] dark:text-white tracking-tight">
              {lang === 'ar'
                ? `تقدم التعلم للمتعلم: ${learnerDisplayName}`
                : `${learnerDisplayName}'s Learning Progress`}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {lang === 'ar'
                ? 'تفاصيل إنجاز الوحدات الدراسية، المهام التفاعلية، والتقييمات التشخيصية.'
                : 'Detailed curriculum milestone breakdown and interactive practice analytics.'}
            </p>
          </div>

          {/* Progress Metrics Tiles matching Screenshot 29 */}
          <div className="grid grid-cols-2 sm:grid-cols-4 gap-4">
            <div className="p-4 rounded-2xl bg-[#faf8f5] dark:bg-[#151c2e] border border-stone-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Course Progress</span>
              <span className="text-2xl font-black text-emerald-600 font-mono">68%</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#faf8f5] dark:bg-[#151c2e] border border-stone-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Lessons Completed</span>
              <span className="text-2xl font-black text-slate-900 dark:text-white font-mono">32/48</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#faf8f5] dark:bg-[#151c2e] border border-stone-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Time Spent</span>
              <span className="text-2xl font-black text-blue-600 font-mono">12.5 hrs</span>
            </div>
            <div className="p-4 rounded-2xl bg-[#faf8f5] dark:bg-[#151c2e] border border-stone-200 dark:border-slate-800 space-y-1">
              <span className="text-[10px] font-bold text-slate-500 uppercase block">Current Streak</span>
              <span className="text-2xl font-black text-amber-600 font-mono flex items-center gap-1">
                <Flame className="w-5 h-5 text-amber-500" />
                5 Days
              </span>
            </div>
          </div>

          {/* Curriculum Modules List */}
          <div className="space-y-3 pt-2">
            <h3 className="text-sm font-bold uppercase tracking-wider text-slate-700 dark:text-slate-300">
              Curriculum Modules Breakdown
            </h3>
            <div className="space-y-3">
              {modules.map((m, idx) => (
                <div
                  key={idx}
                  className="p-4 rounded-2xl border border-stone-200 dark:border-slate-800 bg-[#faf8f5] dark:bg-[#151c2e] flex flex-col sm:flex-row sm:items-center justify-between gap-3"
                >
                  <div className="space-y-1.5 flex-1">
                    <div className="flex items-center gap-2">
                      <span
                        className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md ${
                          m.status === 'Completed'
                            ? 'bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300'
                            : m.status === 'In Progress'
                            ? 'bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300'
                            : 'bg-stone-200 text-slate-700 dark:bg-slate-800 dark:text-slate-300'
                        }`}
                      >
                        {m.status}
                      </span>
                      <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                        {m.title}
                      </h4>
                    </div>
                    <div className="w-full max-w-md h-2 rounded-full bg-stone-200 dark:bg-slate-700 overflow-hidden">
                      <div
                        className="h-full rounded-full bg-blue-600 transition-all duration-500"
                        style={{ width: `${m.progress}%` }}
                      />
                    </div>
                  </div>
                  <span className="text-xs font-mono font-bold text-slate-800 dark:text-slate-200">
                    {m.progress}%
                  </span>
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
/* 8. VIEW 8: CERTIFICATES (/parent/learner-certificates)                    */
/* ========================================================================= */
export const LearnerCertificatesPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, learners, activeLearnerId } = useMockData();
  const currentLearner = learners.find((l) => l.id === activeLearnerId) || learners[0];
  const learnerDisplayName = currentLearner?.name || 'Ahmed Hassan';

  const [copied, setCopied] = useState(false);

  return (
    <div className="min-h-[calc(100vh-5rem)] p-4 sm:p-6 lg:p-10 bg-[#fcfbf7] dark:bg-[#070e1b] transition-colors space-y-8 text-start">
      <div className="max-w-5xl mx-auto space-y-6">
        <UniversalBackButton
          to="/parent-dashboard"
          label={lang === 'ar' ? 'الرجوع للوحة المتابعة' : 'Back to Level / Dashboard'}
        />

        <div className="rounded-3xl border border-stone-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 sm:p-8 shadow-xl space-y-6">
          <div>
            <h1 className="text-2xl sm:text-3xl font-black font-serif text-[#0f2347] dark:text-white tracking-tight">
              {lang === 'ar'
                ? `شهادات المتعلم: ${learnerDisplayName}`
                : `${learnerDisplayName}'s Certificates`}
            </h1>
            <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 mt-1">
              {lang === 'ar'
                ? `شهادات إتمام المستويات المعتمدة والموثقة بتقنية البلوك تشين باسم ${learnerDisplayName}.`
                : `Official, blockchain-verifiable completion certificates earned by ${learnerDisplayName}.`}
            </p>
          </div>

          {/* Verified Credential Card matching Screenshot 30 */}
          <div className="p-8 rounded-3xl border-2 border-blue-500 bg-[#faf8f5] dark:bg-[#151c2e] shadow-xl space-y-6 relative overflow-hidden">
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4 border-b border-stone-200 dark:border-slate-800 pb-4">
              <div className="flex items-center gap-3">
                <span className="p-3.5 rounded-2xl bg-blue-600 text-white shadow-md">
                  <Award className="w-7 h-7" />
                </span>
                <div>
                  <span className="text-[10px] font-black uppercase tracking-wider text-blue-600 block">
                    CodeRa Verified Credential
                  </span>
                  <h3 className="text-lg sm:text-xl font-bold font-serif text-slate-900 dark:text-white">
                    Certificate of Competence: Level 1 (Junior Coder)
                  </h3>
                </div>
              </div>

              <div className="text-end">
                <span className="text-xs font-mono font-bold block text-slate-600 dark:text-slate-300">
                  ID: CR-CERT-2026-9042
                </span>
                <span className="text-[10px] text-emerald-600 font-bold block">
                  Status: Blockchain Verified
                </span>
              </div>
            </div>

            <div className="space-y-2">
              <p className="text-xs sm:text-sm leading-relaxed text-slate-700 dark:text-slate-300">
                {lang === 'ar'
                  ? `يشهد هذا أن المتعلم "${learnerDisplayName}" قد أتم بنجاح متطلبات المستوى الأول في التفكير البرمجي التكيفي وهياكل الأوامر المتسلسلة بنسبة إتقان 94%.`
                  : `This certifies that ${learnerDisplayName} has demonstrated mastery in Algorithmic Logic and Adaptive Block Programming with 94% proficiency.`}
              </p>
            </div>

            <div className="flex flex-wrap items-center justify-between gap-4 pt-4 border-t border-stone-200 dark:border-slate-800">
              <span className="text-[11px] text-slate-400">
                Issued by CodeRa Inclusive Education Board • Verified Accreditation
              </span>

              <div className="flex items-center gap-3">
                <button
                  type="button"
                  onClick={() => alert(lang === 'ar' ? 'جاري تحميل الشهادة...' : 'Downloading certificate PDF...')}
                  className="px-5 py-2.5 rounded-full text-white font-bold text-xs bg-[#1d4ed8] hover:bg-[#1e40af] shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer"
                >
                  <Download className="w-3.5 h-3.5" />
                  <span>Download PDF</span>
                </button>

                <button
                  type="button"
                  onClick={() => {
                    navigator.clipboard.writeText(window.location.href);
                    setCopied(true);
                    setTimeout(() => setCopied(false), 2000);
                  }}
                  className="px-4 py-2.5 rounded-full border border-stone-300 dark:border-slate-700 text-xs font-bold text-slate-700 dark:text-slate-300 hover:bg-stone-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
                >
                  <Share2 className="w-3.5 h-3.5" />
                  <span>{copied ? 'Link Copied!' : 'Share'}</span>
                </button>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* 9. VIEW 9: NOTIFICATIONS PANEL (/parent-notifications)                    */
/* ========================================================================= */
export const ParentNotificationsPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, learners } = useMockData();

  const [activeFilter, setActiveFilter] = useState<'all' | 'payments' | 'progress' | 'system'>('all');

  const rawNotifications = [
    {
      id: '1',
      title: `Payment Due for ${learners[2]?.name || 'Omar Al-Mansoor'}`,
      desc: 'Complete annual subscription to unlock Level 1 interactive coding units and robot challenges.',
      time: '15 mins ago',
      category: 'payments',
      status: 'Needs Payment',
      statusColor: 'bg-amber-100 text-amber-800 border-amber-200 dark:bg-amber-950 dark:text-amber-300',
      action: '/parent/payment-flow',
      actionText: 'Pay Now ($180)',
    },
    {
      id: '2',
      title: `Diagnostic Assessment Completed for ${learners[0]?.name || 'Ahmed Hassan'}`,
      desc: 'Placement test complete: achieved Level 2 Programmer accreditation with 88% overall score.',
      time: '2 hours ago',
      category: 'progress',
      status: 'Completed',
      statusColor: 'bg-emerald-100 text-emerald-800 border-emerald-200 dark:bg-emerald-950 dark:text-emerald-300',
      action: '/parent/learner-detail',
      actionText: 'View Report',
    },
    {
      id: '3',
      title: `Video Verification Under Review for ${learners[0]?.name || 'Ahmed Hassan'}`,
      desc: 'Assistive accommodations intake review is in progress by specialized educational staff.',
      time: '1 day ago',
      category: 'system',
      status: 'Under Review',
      statusColor: 'bg-blue-100 text-blue-800 border-blue-200 dark:bg-blue-950 dark:text-blue-300',
      action: '/parent/learner-detail',
      actionText: 'Check Status',
    },
    {
      id: '4',
      title: `Level 1 Certificate Issued for ${learners[1]?.name || 'Sara Al-Mansoor'}`,
      desc: 'Junior Coder completion certificate has been minted on the verified credential registry.',
      time: '3 days ago',
      category: 'progress',
      status: 'Completed',
      statusColor: 'bg-purple-100 text-purple-800 border-purple-200 dark:bg-purple-950 dark:text-purple-300',
      action: '/parent/learner-certificates',
      actionText: 'View Certificate',
    },
  ];

  const filtered = rawNotifications.filter((n) => {
    if (activeFilter === 'all') return true;
    return n.category === activeFilter;
  });

  return (
    <div className="min-h-[calc(100vh-5rem)] p-4 sm:p-6 lg:p-10 bg-[#fcfbf7] dark:bg-[#070e1b] transition-colors space-y-8 text-start">
      <div className="max-w-4xl mx-auto space-y-6">
        <UniversalBackButton
          to="/parent-dashboard"
          label={lang === 'ar' ? 'الرجوع للوحة التحكم' : 'Back to Parent Dashboard'}
        />

        <div className="rounded-3xl border border-stone-200/90 dark:border-slate-800 bg-white dark:bg-[#0f172a] p-6 sm:p-8 shadow-xl space-y-6">
          <div className="flex items-center gap-3">
            <span className="p-3 rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300">
              <Bell className="w-6 h-6" />
            </span>
            <div>
              <h1 className="text-2xl font-black font-serif text-[#0f2347] dark:text-white">
                {lang === 'ar' ? 'تنبيهات وإشعارات النظام' : 'System Notifications & Alerts'}
              </h1>
              <p className="text-xs text-slate-500 dark:text-slate-400">
                {lang === 'ar'
                  ? 'متابعة كافة مستجدات التقييمات، تنبيهات الدفع، وإصدار الشهادات.'
                  : 'Track payment reminders, milestone reviews, and issued credentials across all learners.'}
              </p>
            </div>
          </div>

          {/* Filter Tabs matching Screenshot 31 */}
          <div className="flex items-center gap-2 border-b border-stone-200 dark:border-slate-800 pb-3 text-xs font-bold overflow-x-auto">
            {(['all', 'payments', 'progress', 'system'] as const).map((tab) => (
              <button
                key={tab}
                type="button"
                onClick={() => setActiveFilter(tab)}
                className={`px-4 py-2 rounded-full capitalize transition-colors cursor-pointer ${
                  activeFilter === tab
                    ? 'bg-[#1d4ed8] text-white shadow-xs'
                    : 'bg-stone-100 text-slate-600 hover:bg-stone-200 dark:bg-slate-800 dark:text-slate-300'
                }`}
              >
                {tab}
              </button>
            ))}
          </div>

          {/* Interactive Notification List */}
          <div className="space-y-3">
            {filtered.map((item) => (
              <div
                key={item.id}
                className="p-5 rounded-2xl border border-stone-200 dark:border-slate-800 bg-[#faf8f5] dark:bg-[#151c2e] flex flex-col sm:flex-row sm:items-center justify-between gap-4 transition-all hover:shadow-md"
              >
                <div className="space-y-1.5">
                  <div className="flex items-center gap-2.5">
                    <span className={`text-[10px] font-black uppercase px-2 py-0.5 rounded-md border ${item.statusColor}`}>
                      {item.status}
                    </span>
                    <h4 className="text-xs sm:text-sm font-bold text-slate-900 dark:text-white">
                      {item.title}
                    </h4>
                  </div>
                  <p className="text-xs text-slate-600 dark:text-slate-400">
                    {item.desc}
                  </p>
                  <span className="text-[10px] text-slate-400 font-mono block">
                    {item.time}
                  </span>
                </div>

                <button
                  type="button"
                  onClick={() => navigate(item.action)}
                  className="px-5 py-2.5 rounded-full text-white font-bold text-xs bg-[#1d4ed8] hover:bg-[#1e40af] shadow-sm hover:scale-105 transition-transform shrink-0 cursor-pointer text-center"
                >
                  {item.actionText}
                </button>
              </div>
            ))}
          </div>
        </div>
      </div>
    </div>
  );
};
