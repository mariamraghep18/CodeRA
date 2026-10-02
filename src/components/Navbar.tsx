import React, { useState, useEffect } from 'react';
import { useRouter } from '../router/Router';
import { useMockData } from '../context/MockDataContext';
import { translations } from '../context/translations';
import { AuthModal, AuthStep } from './auth/AuthModal';
import {
  Sun,
  Moon,
  Globe,
  Menu,
  X,
  Compass,
  Sparkles,
  Info,
  Layers,
  Users,
  LogIn,
  Shield,
  GraduationCap,
  Building2,
  Laptop,
  Bell,
  ArrowRight,
} from 'lucide-react';

export const Navbar: React.FC = () => {
  const { path, navigate } = useRouter();
  const { lang, setLang, theme, toggleTheme, setCurrentRole } = useMockData();

  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);
  const [authModalOpen, setAuthModalOpen] = useState(false);
  const [authModalStep, setAuthModalStep] = useState<AuthStep>('login');
  const [roleModalOpen, setRoleModalOpen] = useState(false);
  const t = translations[lang];

  useEffect(() => {
    const handleOpenAuth = (e: Event) => {
      const customEvent = e as CustomEvent<{ step?: AuthStep }>;
      if (customEvent.detail?.step) {
        setAuthModalStep(customEvent.detail.step);
      } else {
        setAuthModalStep('login');
      }
      setAuthModalOpen(true);
    };
    const handleOpenRoleModal = () => {
      setRoleModalOpen(true);
    };
    window.addEventListener('open-auth-modal', handleOpenAuth);
    window.addEventListener('open-role-modal', handleOpenRoleModal);
    return () => {
      window.removeEventListener('open-auth-modal', handleOpenAuth);
      window.removeEventListener('open-role-modal', handleOpenRoleModal);
    };
  }, []);

  // Primary Navigation Links per Spec: Home, Tracks, About, Accessibility
  const navLinks = [
    { id: 'hero', label: lang === 'ar' ? 'الرئيسية' : 'Home', icon: Compass, action: () => handleAnchorClick('hero') },
    { id: 'tracks', label: lang === 'ar' ? 'المسارات' : 'Tracks', icon: Layers, action: () => handleAnchorClick('tracks') },
    { id: 'about', label: lang === 'ar' ? 'عن كوديرا' : 'About', icon: Info, action: () => handleAnchorClick('about') },
    {
      id: 'accessibility',
      label: lang === 'ar' ? 'إمكانية الوصول' : 'Accessibility',
      icon: Sparkles,
      action: () => {
        setMobileMenuOpen(false);
        window.dispatchEvent(new CustomEvent('open-accessibility-drawer'));
      },
    },
  ];

  const handleAnchorClick = (anchorId: string) => {
    setMobileMenuOpen(false);
    const getTargetElement = () => {
      if (anchorId === 'tracks' || anchorId === 'learning-tracks') {
        return document.getElementById('learning-tracks') || document.getElementById('tracks');
      }
      if (anchorId === 'about' || anchorId === 'why-codera') {
        return document.getElementById('why-codera') || document.getElementById('about');
      }
      if (anchorId === 'who-are-you' || anchorId === 'portals' || anchorId === 'roles') {
        return document.getElementById('who-are-you') || document.getElementById('portals');
      }
      return document.getElementById(anchorId);
    };

    if (path !== '/') {
      navigate('/');
      setTimeout(() => {
        const elem = getTargetElement();
        if (elem) elem.scrollIntoView({ behavior: 'smooth' });
      }, 100);
    } else {
      const elem = getTargetElement();
      if (elem) {
        elem.scrollIntoView({ behavior: 'smooth' });
      } else {
        window.scrollTo({ top: 0, behavior: 'smooth' });
      }
    }
  };

  const handlePortalLogin = (role: 'parent' | 'individual' | 'org' | 'admin') => {
    setCurrentRole(role);
    setAuthModalOpen(false);
    if (role === 'parent') navigate('/parent-dashboard');
    else if (role === 'individual') navigate('/individual-dashboard');
    else if (role === 'org') navigate('/org-dashboard');
    else if (role === 'admin') navigate('/admin');
  };

  return (
    <>
      <header
        className="fixed top-0 inset-x-0 z-40 w-full border-b backdrop-blur-md transition-colors"
        style={{
          backgroundColor: theme === 'dark' ? 'rgba(8, 13, 26, 0.92)' : 'rgba(255, 255, 255, 0.92)',
          borderColor: 'var(--color-border)',
          boxShadow: '0 4px 20px -2px rgba(0, 0, 0, 0.05)',
        }}
      >
        <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8 h-20 flex items-center justify-between">
          {/* Brand Logo & Title */}
          <div
            onClick={() => handleAnchorClick('hero')}
            className="flex items-center gap-3.5 cursor-pointer select-none group"
            role="button"
            tabIndex={0}
            aria-label="CodeRa Home"
          >
            <div className="w-11 h-11 rounded-2xl flex items-center justify-center font-bold text-white shadow-md transition-transform group-hover:scale-105 overflow-hidden relative border border-emerald-500/30 bg-gradient-to-tr from-emerald-600 via-teal-600 to-blue-600">
              <img
                src="./logo.svg"
                alt="CodeRa Logo"
                className="w-full h-full object-contain p-1"
                onError={(e) => {
                  const current = e.currentTarget.getAttribute('data-fallback') || '0';
                  if (current === '0') {
                    e.currentTarget.setAttribute('data-fallback', '1');
                    e.currentTarget.src = '/logo.svg';
                  } else if (current === '1') {
                    e.currentTarget.setAttribute('data-fallback', '2');
                    e.currentTarget.src = '/assets/logo.svg';
                  } else if (current === '2') {
                    e.currentTarget.setAttribute('data-fallback', '3');
                    e.currentTarget.src = '/assets/logo-icon.png';
                  }
                }}
              />
              <span className="text-lg font-black font-serif absolute inset-0 flex items-center justify-center pointer-events-none -z-10">
                CR
              </span>
            </div>
            <div className="flex flex-col">
              <span className="text-2xl font-black tracking-tight font-serif flex items-center gap-1.5" style={{ color: 'var(--color-text)' }}>
                <span>CodeRa</span>
                <span className="w-2 h-2 rounded-full bg-emerald-500"></span>
              </span>
              <span className="text-[10px] font-bold tracking-wider uppercase opacity-70 -mt-1" style={{ color: 'var(--color-text-muted)' }}>
                {lang === 'ar' ? 'المنظومة التعليمية الشاملة' : 'Inclusive Tech Ecosystem'}
              </span>
            </div>
          </div>

          {/* Standard Navigation Menu Links: Home, Tracks, About, Accessibility */}
          <nav className="hidden lg:flex items-center gap-1">
            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={link.action}
                  className="flex items-center gap-2 px-3.5 py-2 rounded-xl text-xs sm:text-sm font-semibold transition-all hover:bg-emerald-500/10 hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
                  style={{ color: 'var(--color-text)' }}
                >
                  <Icon className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </nav>

          {/* Action Controls: Language Toggle, Theme, Rounded Login/Register */}
          <div className="flex items-center gap-2 sm:gap-3">
            {/* Language Switcher (EN / AR) */}
            <button
              type="button"
              onClick={() => setLang(lang === 'en' ? 'ar' : 'en')}
              className="flex items-center gap-1.5 px-3 py-2 rounded-full border text-xs font-extrabold transition-all hover:border-emerald-500 hover:bg-emerald-50 dark:hover:bg-emerald-950/30 cursor-pointer"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
              }}
              title={lang === 'en' ? 'التحويل للغة العربية' : 'Switch to English'}
              aria-label="Toggle Language"
            >
              <Globe className="w-4 h-4 text-emerald-600 dark:text-emerald-400" />
              <span>{lang === 'en' ? 'العربية' : 'English'}</span>
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2.5 rounded-full border transition-all hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
              }}
              title={theme === 'dark' ? 'Switch to Light Mode' : 'Switch to Dark Mode'}
              aria-label="Toggle Theme"
            >
              {theme === 'dark' ? (
                <Sun className="w-4 h-4 text-amber-400" />
              ) : (
                <Moon className="w-4 h-4 text-slate-700" />
              )}
            </button>


            {/* Rounded Login Button */}
            <button
              type="button"
              onClick={() => {
                setAuthModalStep('login');
                setAuthModalOpen(true);
              }}
              className="inline-flex items-center gap-1.5 px-4 sm:px-5 py-2.5 rounded-full border font-bold text-xs sm:text-sm transition-all hover:bg-blue-50 dark:hover:bg-blue-950/40 hover:border-blue-600 hover:text-blue-600 cursor-pointer shadow-xs"
              style={{
                borderColor: 'var(--color-border)',
                color: 'var(--color-text)',
                backgroundColor: 'var(--color-surface)',
              }}
            >
              <LogIn className="w-3.5 h-3.5 text-blue-600" />
              <span>{t.signIn}</span>
            </button>

            {/* Rounded Register Button (Emerald Green Primary Action) */}
            <button
              type="button"
              onClick={() => handleAnchorClick('who-are-you')}
              className="inline-flex items-center gap-1.5 px-4 sm:px-6 py-2.5 rounded-full text-white font-black text-xs sm:text-sm shadow-md transition-all hover:scale-105 active:scale-95 cursor-pointer bg-[#00A86B] hover:bg-[#0f766e]"
              style={{
                boxShadow: '0 4px 14px rgba(0, 168, 107, 0.35)',
              }}
            >
              <GraduationCap className="w-4 h-4" />
              <span>{lang === 'ar' ? 'التسجيل' : 'Register'}</span>
            </button>

            {/* Mobile Menu Toggle */}
            <button
              type="button"
              onClick={() => setMobileMenuOpen(!mobileMenuOpen)}
              className="lg:hidden p-2 rounded-xl border hover:bg-slate-100 dark:hover:bg-slate-800"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              aria-label="Toggle Mobile Menu"
            >
              {mobileMenuOpen ? <X className="w-5 h-5" /> : <Menu className="w-5 h-5" />}
            </button>
          </div>
        </div>

        {/* Mobile Drawer Menu */}
        {mobileMenuOpen && (
          <div
            className="lg:hidden border-t px-4 pt-3 pb-6 space-y-3 animate-in fade-in shadow-xl"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >

            {navLinks.map((link) => {
              const Icon = link.icon;
              return (
                <button
                  key={link.id}
                  type="button"
                  onClick={link.action}
                  className="w-full flex items-center gap-3 px-3.5 py-3 rounded-xl text-sm font-semibold transition-colors hover:bg-emerald-50 dark:hover:bg-emerald-950/30"
                  style={{ color: 'var(--color-text)' }}
                >
                  <Icon className="w-4 h-4 text-emerald-600" />
                  <span>{link.label}</span>
                </button>
              );
            })}
          </div>
        )}
      </header>

      {/* Primary Interactive Authentication & Password Recovery Modal */}
      <AuthModal
        isOpen={authModalOpen}
        initialStep={authModalStep}
        onClose={() => setAuthModalOpen(false)}
      />

      {/* Role Selection / Who Are You Modal */}
      {roleModalOpen && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-slate-900/60 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-2xl rounded-3xl border shadow-2xl p-6 sm:p-8 space-y-6 relative animate-in zoom-in-95"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
              color: 'var(--color-text)',
            }}
          >
            <button
              type="button"
              onClick={() => setRoleModalOpen(false)}
              className="absolute top-5 right-5 rtl:right-auto rtl:left-5 p-2 rounded-full hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5 text-slate-400" />
            </button>

            <div className="text-center space-y-2 max-w-lg mx-auto">
              <span className="inline-block text-[11px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                CHOOSE YOUR PATHWAY
              </span>
              <h2 className="text-2xl sm:text-3xl font-black font-serif tracking-tight">
                {lang === 'ar' ? 'من أنت؟ (اختر مسارك)' : 'Who Are You?'}
              </h2>
              <p className="text-xs sm:text-sm text-slate-500 dark:text-slate-400 leading-relaxed">
                {lang === 'ar'
                  ? 'اختر نوع الحساب الذي يناسب احتياجاتك التعليمية للبدء في منصة كوديرا.'
                  : 'Select the role that matches your goals to start your inclusive learning journey.'}
              </p>
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
              {/* Option 1: Student / Child */}
              <div
                onClick={() => {
                  setRoleModalOpen(false);
                  setCurrentRole('student');
                  navigate('/student-welcome');
                }}
                className="p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-blue-500 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
                style={{ backgroundColor: 'var(--color-bg)' }}
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center transition-transform group-hover:scale-110">
                    <GraduationCap className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-black font-serif">
                    {lang === 'ar' ? 'طالب / طفل' : 'Student / Child'}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {lang === 'ar'
                      ? 'ألعاب تفاعلية، برمجة لمسية، وتحديد مستوى ذكي وسريع.'
                      : 'Interactive games, tactile coding, and adaptive placement diagnostics.'}
                  </p>
                </div>
                <span className="text-xs font-bold text-blue-600 dark:text-blue-400 flex items-center gap-1">
                  <span>{lang === 'ar' ? 'ابدأ كطالب' : 'Start as Student'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </span>
              </div>

              {/* Option 2: Parent */}
              <div
                onClick={() => {
                  setRoleModalOpen(false);
                  navigate('/register-parent');
                }}
                className="p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-emerald-500 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
                style={{ backgroundColor: 'var(--color-bg)' }}
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center transition-transform group-hover:scale-110">
                    <Users className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-black font-serif">
                    {lang === 'ar' ? 'ولي أمر' : 'Parent / Guardian'}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {lang === 'ar'
                      ? 'إدارة مسار طفلك، التفضيلات الحسية، والتقارير الأكاديمية.'
                      : 'Manage your child’s adaptive learning, sensory setups, and progress tracking.'}
                  </p>
                </div>
                <span className="text-xs font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1">
                  <span>{lang === 'ar' ? 'تسجيل كولي أمر' : 'Register Parent'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </span>
              </div>

              {/* Option 3: Individual */}
              <div
                onClick={() => {
                  setRoleModalOpen(false);
                  navigate('/register-individual');
                }}
                className="p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-amber-500 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
                style={{ backgroundColor: 'var(--color-bg)' }}
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300 flex items-center justify-center transition-transform group-hover:scale-110">
                    <Laptop className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-black font-serif">
                    {lang === 'ar' ? 'متعلم مستقل' : 'Individual Learner'}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {lang === 'ar'
                      ? 'تعلم ذاتي في البرمجة ولغة الإشارة مع بيئات برمجية تفاعلية.'
                      : 'Self-paced coding & tech sign language tracks with verified certifications.'}
                  </p>
                </div>
                <span className="text-xs font-bold text-amber-600 dark:text-amber-400 flex items-center gap-1">
                  <span>{lang === 'ar' ? 'تسجيل كمتعلم' : 'Register Individual'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </span>
              </div>

              {/* Option 4: Organization */}
              <div
                onClick={() => {
                  setRoleModalOpen(false);
                  navigate('/org-registration-step1');
                }}
                className="p-5 rounded-2xl border-2 border-slate-200 dark:border-slate-800 hover:border-purple-500 hover:shadow-lg transition-all cursor-pointer flex flex-col justify-between space-y-4 group"
                style={{ backgroundColor: 'var(--color-bg)' }}
              >
                <div className="space-y-3">
                  <div className="w-12 h-12 rounded-xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-300 flex items-center justify-center transition-transform group-hover:scale-110">
                    <Building2 className="w-6 h-6" />
                  </div>
                  <h3 className="text-base font-black font-serif">
                    {lang === 'ar' ? 'مؤسسة / مدرسة' : 'Organization'}
                  </h3>
                  <p className="text-[11px] text-slate-500 dark:text-slate-400 leading-relaxed">
                    {lang === 'ar'
                      ? 'مدارس، مراكز التربية الخاصة، ورخص التدريب متعدد الطلاب.'
                      : 'Special ed centers, schools, and institutions with cohort licenses.'}
                  </p>
                </div>
                <span className="text-xs font-bold text-purple-600 dark:text-purple-400 flex items-center gap-1">
                  <span>{lang === 'ar' ? 'تسجيل مؤسسة' : 'Register Org'}</span>
                  <ArrowRight className="w-3.5 h-3.5 rtl:rotate-180" />
                </span>
              </div>
            </div>

            {/* Direct Section Link */}
            <div className="pt-2 border-t text-center text-xs text-slate-400 flex items-center justify-center gap-2" style={{ borderColor: 'var(--color-border)' }}>
              <span>{lang === 'ar' ? 'أو استعرض كافة التفاصيل على الصفحة الرئيسية:' : 'Prefer exploring all roles on the landing page?'}</span>
              <button
                type="button"
                onClick={() => {
                  setRoleModalOpen(false);
                  handleAnchorClick('who-are-you');
                }}
                className="font-bold text-blue-600 hover:underline cursor-pointer"
              >
                {lang === 'ar' ? 'الانتقال لقسم من أنت' : 'Browse "Who Are You?" Section'}
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
};
