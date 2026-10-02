import React, { useState, useEffect, useRef } from 'react';
import { useRouter } from '../../router/Router';
import { useMockData } from '../../context/MockDataContext';
import {
  Mail,
  Lock,
  Eye,
  EyeOff,
  Shield,
  Check,
  CheckCircle2,
  ArrowLeft,
  ArrowRight,
  Sparkles,
  X,
  RefreshCw,
} from 'lucide-react';

export type AuthStep = 'login' | 'forgot-password' | 'check-email' | 'create-password' | 'success';

interface AuthModalProps {
  isOpen?: boolean;
  initialStep?: AuthStep;
  onClose?: () => void;
  isFullPage?: boolean;
}

export const AuthModal: React.FC<AuthModalProps> = ({
  isOpen = true,
  initialStep = 'login',
  onClose,
  isFullPage = false,
}) => {
  const { navigate } = useRouter();
  const { lang, setCurrentRole } = useMockData();

  const [currentStep, setCurrentStep] = useState<AuthStep>(initialStep);

  // Sync step when initialStep changes
  useEffect(() => {
    setCurrentStep(initialStep);
  }, [initialStep]);

  // View 1 (Login) States
  const [loginEmail, setLoginEmail] = useState('learner@codera.org');
  const [loginPassword, setLoginPassword] = useState('••••••••');
  const [showLoginPassword, setShowLoginPassword] = useState(false);
  const [isLoggingIn, setIsLoggingIn] = useState(false);

  // View 2 (Forgot Password) States
  const [forgotEmail, setForgotEmail] = useState('parent-or-org@domain.com');
  const [isSendingCode, setIsSendingCode] = useState(false);

  // View 3 (Check Your Email / OTP) States
  const [otp, setOtp] = useState<string[]>(['5', '2', '8', '', '', '']);
  const [timerSeconds, setTimerSeconds] = useState(150); // 02:30 = 150 seconds
  const [resendNotice, setResendNotice] = useState(false);
  const otpInputRefs = useRef<(HTMLInputElement | null)[]>([]);

  // View 4 (Create New Password) States
  const [newPassword, setNewPassword] = useState('CodeRa@2026');
  const [confirmPassword, setConfirmPassword] = useState('CodeRa@2026');
  const [showNewPassword, setShowNewPassword] = useState(false);
  const [showConfirmPassword, setShowConfirmPassword] = useState(false);
  const [isResetting, setIsResetting] = useState(false);

  // Timer countdown for OTP
  useEffect(() => {
    let interval: NodeJS.Timeout | undefined;
    if (currentStep === 'check-email' && timerSeconds > 0) {
      interval = setInterval(() => {
        setTimerSeconds((prev) => Math.max(0, prev - 1));
      }, 1000);
    }
    return () => {
      if (interval) clearInterval(interval);
    };
  }, [currentStep, timerSeconds]);

  // Format timer as 02:30 remaining
  const formatTimer = (seconds: number) => {
    const mins = Math.floor(seconds / 60);
    const secs = seconds % 60;
    return `${String(mins).padStart(2, '0')}:${String(secs).padStart(2, '0')} remaining`;
  };

  // Masked email helper: pa***@domain.com
  const getMaskedEmail = (emailStr: string) => {
    const parts = emailStr.split('@');
    if (parts.length !== 2) return 'pa***@domain.com';
    const name = parts[0];
    const domain = parts[1];
    const prefix = name.slice(0, 2);
    return `${prefix}***@${domain}`;
  };

  // Password criteria check
  const hasMinLength = newPassword.length >= 8;
  const hasUpperLower = /[a-z]/.test(newPassword) && /[A-Z]/.test(newPassword);
  const hasNumber = /[0-9]/.test(newPassword);
  const canSubmitReset = hasMinLength && hasUpperLower && hasNumber && newPassword === confirmPassword;

  // Password strength score (0 to 3)
  const strengthScore = [hasMinLength, hasUpperLower, hasNumber].filter(Boolean).length;

  // OTP handlers
  const handleOtpChange = (index: number, val: string) => {
    const digit = val.replace(/\D/g, '').slice(-1);
    const updated = [...otp];
    updated[index] = digit;
    setOtp(updated);

    if (digit && index < 5) {
      otpInputRefs.current[index + 1]?.focus();
    }
  };

  const handleOtpKeyDown = (index: number, e: React.KeyboardEvent<HTMLInputElement>) => {
    if (e.key === 'Backspace' && !otp[index] && index > 0) {
      otpInputRefs.current[index - 1]?.focus();
    }
  };

  const handleOtpPaste = (e: React.ClipboardEvent<HTMLInputElement>) => {
    e.preventDefault();
    const pasted = e.clipboardData.getData('text').replace(/\D/g, '').slice(0, 6);
    if (!pasted) return;
    const updated = [...otp];
    pasted.split('').forEach((ch, idx) => {
      updated[idx] = ch;
    });
    setOtp(updated);
    otpInputRefs.current[Math.min(5, pasted.length - 1)]?.focus();
  };

  const handleResendCode = () => {
    setTimerSeconds(150);
    setResendNotice(true);
    setTimeout(() => setResendNotice(false), 3000);
  };

  // Submission handlers
  const handleLoginSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsLoggingIn(true);
    setTimeout(() => {
      setIsLoggingIn(false);
      setCurrentRole('parent');
      if (onClose) onClose();
      navigate('/parent-dashboard');
    }, 600);
  };

  const handleSendCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setIsSendingCode(true);
    setTimeout(() => {
      setIsSendingCode(false);
      setTimerSeconds(150);
      setCurrentStep('check-email');
    }, 600);
  };

  const handleVerifyCodeSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    setCurrentStep('create-password');
  };

  const handleResetPasswordSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!canSubmitReset) return;
    setIsResetting(true);
    setTimeout(() => {
      setIsResetting(false);
      setCurrentStep('success');
      setTimeout(() => {
        setCurrentStep('login');
      }, 2000);
    }, 600);
  };

  if (!isOpen) return null;

  return (
    <div
      className={
        isFullPage
          ? 'min-h-[calc(100vh-5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-10 bg-[#fcfbf7] dark:bg-[#070e1b] transition-colors'
          : 'fixed inset-0 z-50 flex items-center justify-center p-4 sm:p-6 bg-black/60 backdrop-blur-sm animate-in fade-in'
      }
    >
      <div
        className={`w-full bg-[#fcfbf7] dark:bg-[#0f172a] rounded-3xl border border-stone-200/90 dark:border-slate-800 shadow-2xl overflow-hidden transition-all duration-300 ${
          currentStep === 'login' ? 'max-w-4xl' : 'max-w-md'
        }`}
      >
        {/* ========================================================================= */}
        {/* VIEW 1: WELCOME BACK (LOGIN MODAL/PAGE)                                    */}
        {/* ========================================================================= */}
        {currentStep === 'login' && (
          <div className="grid grid-cols-1 lg:grid-cols-2 relative">
            {/* Close Button on Modal */}
            {!isFullPage && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 end-4 z-20 p-2 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 hover:text-slate-800 dark:hover:text-white transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Left Form Column */}
            <div className="p-7 sm:p-10 flex flex-col justify-between space-y-6 text-start">
              <div className="space-y-3">
                {/* Header Tag Badge */}
                <div>
                  <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full text-[10px] font-black uppercase tracking-wider bg-blue-100 text-blue-700 border border-blue-200 dark:bg-blue-950/80 dark:text-blue-300 dark:border-blue-900 shadow-xs">
                    <Sparkles className="w-3 h-3 text-blue-600 dark:text-blue-400" />
                    <span>
                      {lang === 'ar' ? '[بوابة التعلم التكيفي]' : 'ADAPTIVE LEARNING PORTAL'}
                    </span>
                  </span>
                </div>

                {/* Title */}
                <h2 className="text-3xl sm:text-4xl font-black font-serif tracking-tight text-[#0f2347] dark:text-white leading-tight">
                  {lang === 'ar' ? 'مرحباً بعودتك' : 'Welcome Back'}
                </h2>

                {/* Subtitle */}
                <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                  {lang === 'ar'
                    ? 'تابع رحلتك البرمجية دون أي حواجز جسدية أو معرفية.'
                    : 'Continue your coding journey without physical or cognitive barriers.'}
                </p>
              </div>

              {/* Form Fields */}
              <form onSubmit={handleLoginSubmit} className="space-y-4">
                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                    {lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={loginEmail}
                      onChange={(e) => setLoginEmail(e.target.value)}
                      placeholder="learner@codera.org"
                      className="w-full ps-10 pe-4 py-3 rounded-2xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors shadow-xs"
                    />
                    <Mail className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  </div>
                </div>

                {/* Password with Show/Hide toggle */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between">
                    <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                      {lang === 'ar' ? 'كلمة المرور' : 'Password'}
                    </label>
                    <button
                      type="button"
                      onClick={() => setCurrentStep('forgot-password')}
                      className="text-xs font-bold text-blue-600 hover:text-blue-800 dark:text-blue-400 dark:hover:text-blue-300 hover:underline cursor-pointer"
                    >
                      {lang === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot Password?'}
                    </button>
                  </div>
                  <div className="relative">
                    <input
                      type={showLoginPassword ? 'text' : 'password'}
                      required
                      value={loginPassword}
                      onChange={(e) => setLoginPassword(e.target.value)}
                      placeholder="••••••••"
                      className="w-full ps-10 pe-16 py-3 rounded-2xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors shadow-xs"
                    />
                    <Lock className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                    <button
                      type="button"
                      onClick={() => setShowLoginPassword(!showLoginPassword)}
                      className="absolute end-3 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs font-bold text-slate-500 hover:text-blue-600 cursor-pointer flex items-center gap-1 select-none"
                    >
                      {showLoginPassword ? (
                        <>
                          <EyeOff className="w-3.5 h-3.5" />
                          <span>{lang === 'ar' ? 'إخفاء' : 'Hide'}</span>
                        </>
                      ) : (
                        <>
                          <Eye className="w-3.5 h-3.5" />
                          <span>{lang === 'ar' ? 'إظهار' : 'Show'}</span>
                        </>
                      )}
                    </button>
                  </div>
                </div>

                {/* Primary Royal Blue Button: Login */}
                <button
                  type="submit"
                  disabled={isLoggingIn}
                  className="w-full py-3.5 rounded-full text-white font-bold text-sm bg-[#1d4ed8] hover:bg-[#1e40af] shadow-lg shadow-blue-600/25 hover:shadow-xl hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer mt-2"
                >
                  {isLoggingIn ? (
                    <>
                      <RefreshCw className="w-4 h-4 animate-spin" />
                      <span>{lang === 'ar' ? 'جارٍ تسجيل الدخول...' : 'Logging in...'}</span>
                    </>
                  ) : (
                    <>
                      <span>{lang === 'ar' ? 'تسجيل الدخول' : 'Login'}</span>
                      <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                    </>
                  )}
                </button>
              </form>

              {/* Footer link: Don't have an account? Register */}
              <div className="pt-2 text-center text-xs text-slate-600 dark:text-slate-400">
                <span>{lang === 'ar' ? 'ليس لديك حساب بعد؟' : "Don't have an account?"} </span>
                <button
                  type="button"
                  onClick={() => {
                    if (onClose) onClose();
                    navigate('/register-parent');
                  }}
                  className="font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                >
                  {lang === 'ar' ? 'إنشاء حساب جديد' : 'Register'}
                </button>
              </div>

              {/* Disclaimer text at the bottom */}
              <p className="text-[11px] text-slate-400 dark:text-slate-500 text-center leading-relaxed">
                {lang === 'ar'
                  ? 'من خلال تسجيل الدخول، فإنك توافق على شروط التعلم التكيفي وسياسات الخصوصية الشاملة لمنصة كوديرا.'
                  : 'By signing in, you agree to CodeRa’s Adaptive Learning Terms & Neurodiverse Privacy Protections.'}
              </p>
            </div>

            {/* Right Column: Children Collaboration Illustration */}
            <div className="relative hidden lg:flex flex-col justify-between p-8 text-white overflow-hidden bg-gradient-to-br from-[#0c2340] via-[#12315b] to-[#0d4538]">
              {/* Overlaid Ambient Decorative Elements */}
              <div
                aria-hidden="true"
                className="absolute -top-20 -right-20 w-64 h-64 bg-emerald-500/20 rounded-full blur-3xl pointer-events-none"
              />
              <div
                aria-hidden="true"
                className="absolute -bottom-20 -left-20 w-64 h-64 bg-blue-500/20 rounded-full blur-3xl pointer-events-none"
              />

              <div className="relative z-10 space-y-2">
                <span className="inline-block text-[10px] font-black uppercase tracking-wider px-3 py-1 rounded-full bg-white/15 backdrop-blur-md border border-white/20">
                  Universal Tech Inclusion
                </span>
                <h3 className="text-2xl font-black font-serif leading-tight">
                  {lang === 'ar'
                    ? 'تعلم يزيل الفروق الفردية'
                    : 'Where Divergent Minds Build The Future'}
                </h3>
                <p className="text-xs text-blue-100/90 leading-relaxed max-w-xs">
                  {lang === 'ar'
                    ? 'بيئة برمجية متكيفة تفتح الأبواب لكل متعلم لاكتشاف مهارات البرمجة والروبوتات.'
                    : 'Adaptive coding tools built for collaborative, barrier-free discovery and robotics mastery.'}
                </p>
              </div>

              {/* Central Illustration Card */}
              <div className="relative z-10 my-4 rounded-2xl overflow-hidden border border-white/20 shadow-2xl bg-slate-900/60 backdrop-blur-md group">
                <img
                  src="/img/inclusive_hero.jpg"
                  alt="Children collaborating on robotics and coding"
                  className="w-full h-56 object-cover object-center group-hover:scale-105 transition-transform duration-500"
                  onError={(e) => {
                    e.currentTarget.src = '/img/career_mascot.jpg';
                  }}
                />
                <div className="absolute inset-0 bg-gradient-to-t from-black/70 via-transparent to-transparent flex items-end p-4">
                  <div className="flex items-center gap-2 text-xs font-semibold text-white">
                    <span className="w-2 h-2 rounded-full bg-emerald-400 animate-pulse" />
                    <span>Sensory-balanced collaborative coding</span>
                  </div>
                </div>
              </div>

              <div className="relative z-10 flex items-center justify-between text-[11px] text-blue-200/80 font-medium">
                <span>WCAG AAA Compliant</span>
                <span>CodeRa Learning OS</span>
              </div>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 2: FORGOT YOUR PASSWORD?                                             */}
        {/* ========================================================================= */}
        {currentStep === 'forgot-password' && (
          <div className="p-8 sm:p-10 space-y-6 text-start relative">
            {!isFullPage && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 end-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Header Shield Icon & Title */}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-[#1d4ed8] dark:text-blue-400 flex items-center justify-center shadow-xs">
                <Shield className="w-6 h-6 stroke-[2.2]" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-[#0f2347] dark:text-white leading-tight">
                {lang === 'ar' ? 'نسيت كلمة المرور؟' : 'Forgot Your Password?'}
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {lang === 'ar'
                  ? 'لا تدع أي مشكلة توقفك. أدخل بريدك الإلكتروني وسنرسل لك رمزاً لإعادة تعيين بيانات اعتمادك.'
                  : "No turn left unresolved. Enter your email address and we'll send a code to reset your credentials."}
              </p>
            </div>

            {/* Form */}
            <form onSubmit={handleSendCodeSubmit} className="space-y-5">
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  {lang === 'ar' ? 'البريد الإلكتروني المسجل' : 'Registered Email'}
                </label>
                <div className="relative">
                  <input
                    type="email"
                    required
                    value={forgotEmail}
                    onChange={(e) => setForgotEmail(e.target.value)}
                    placeholder="parent-or-org@domain.com"
                    className="w-full ps-10 pe-4 py-3 rounded-2xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 placeholder-slate-400 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors shadow-xs"
                  />
                  <Mail className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                </div>
              </div>

              {/* Primary Royal Blue Button: Send Code */}
              <button
                type="submit"
                disabled={isSendingCode}
                className="w-full py-3.5 rounded-full text-white font-bold text-sm bg-[#1d4ed8] hover:bg-[#1e40af] shadow-lg shadow-blue-600/25 hover:shadow-xl hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                {isSendingCode ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{lang === 'ar' ? 'جارٍ إرسال الرمز...' : 'Sending Code...'}</span>
                  </>
                ) : (
                  <>
                    <span>{lang === 'ar' ? 'إرسال الرمز' : 'Send Code'}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </>
                )}
              </button>
            </form>

            {/* Back link: Back to Login */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setCurrentStep('login')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                <span>{lang === 'ar' ? '← العودة لتسجيل الدخول' : '← Back to Login'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 3: CHECK YOUR EMAIL (OTP VERIFICATION)                               */}
        {/* ========================================================================= */}
        {currentStep === 'check-email' && (
          <div className="p-8 sm:p-10 space-y-6 text-center relative">
            {!isFullPage && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 end-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Icon & Title */}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl mx-auto bg-blue-100 dark:bg-blue-950 text-[#1d4ed8] dark:text-blue-400 flex items-center justify-center shadow-xs">
                <Mail className="w-6 h-6 stroke-[2.2]" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-[#0f2347] dark:text-white leading-tight">
                {lang === 'ar' ? 'تحقق من بريدك الإلكتروني' : 'Check Your Email'}
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans max-w-sm mx-auto">
                {lang === 'ar'
                  ? `أرسلنا رمز تحقق مكون من ٦ أرقام إلى ${getMaskedEmail(forgotEmail)}`
                  : `We sent a 6-digit verification code to ${getMaskedEmail(forgotEmail)}`}
              </p>
            </div>

            {/* Inputs: 6 individual separated code input boxes */}
            <form onSubmit={handleVerifyCodeSubmit} className="space-y-6">
              <div className="flex items-center justify-center gap-2 sm:gap-2.5" onPaste={handleOtpPaste}>
                {otp.map((digit, idx) => (
                  <input
                    key={idx}
                    ref={(el) => {
                      otpInputRefs.current[idx] = el;
                    }}
                    type="text"
                    inputMode="numeric"
                    maxLength={1}
                    value={digit}
                    onChange={(e) => handleOtpChange(idx, e.target.value)}
                    onKeyDown={(e) => handleOtpKeyDown(idx, e)}
                    className="w-10 h-13 sm:w-12 sm:h-14 text-center text-lg sm:text-xl font-mono font-black rounded-2xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-slate-900 dark:text-white focus:outline-none focus:ring-2 focus:ring-blue-600 focus:border-blue-600 transition-all shadow-xs"
                  />
                ))}
              </div>

              {/* Timer: Countdown timer display (02:30 remaining) */}
              <div className="space-y-1">
                <div className="font-mono text-xs font-bold text-slate-600 dark:text-slate-400 flex items-center justify-center gap-1.5">
                  <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                  <span>{formatTimer(timerSeconds)}</span>
                </div>

                {/* Resend link */}
                <div className="text-xs text-slate-500">
                  <span>{lang === 'ar' ? 'لم تستلم الرمز؟' : "Didn't receive the code?"} </span>
                  <button
                    type="button"
                    onClick={handleResendCode}
                    className="font-bold text-blue-600 dark:text-blue-400 hover:underline cursor-pointer"
                  >
                    {lang === 'ar' ? 'إعادة الإرسال' : 'Resend'}
                  </button>
                </div>

                {resendNotice && (
                  <p className="text-[11px] font-bold text-emerald-600 animate-in fade-in">
                    {lang === 'ar' ? 'تم إرسال رمز جديد بنجاح!' : 'New code dispatched successfully!'}
                  </p>
                )}
              </div>

              {/* Primary Royal Blue Button: Verify Code */}
              <button
                type="submit"
                className="w-full py-3.5 rounded-full text-white font-bold text-sm bg-[#1d4ed8] hover:bg-[#1e40af] shadow-lg shadow-blue-600/25 hover:shadow-xl hover:scale-[1.01] active:scale-95 transition-all flex items-center justify-center gap-2 cursor-pointer"
              >
                <span>{lang === 'ar' ? 'التحقق من الرمز' : 'Verify Code'}</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </form>

            {/* Back link: Back to Login */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setCurrentStep('login')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                <span>{lang === 'ar' ? '← العودة لتسجيل الدخول' : '← Back to Login'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* VIEW 4: CREATE NEW PASSWORD                                               */}
        {/* ========================================================================= */}
        {currentStep === 'create-password' && (
          <div className="p-8 sm:p-10 space-y-6 text-start relative">
            {!isFullPage && onClose && (
              <button
                type="button"
                onClick={onClose}
                className="absolute top-4 end-4 p-2 rounded-full bg-stone-100 hover:bg-stone-200 dark:bg-slate-800 dark:hover:bg-slate-700 text-slate-500 transition-colors cursor-pointer"
                aria-label="Close"
              >
                <X className="w-4 h-4" />
              </button>
            )}

            {/* Shield Icon & Title */}
            <div className="space-y-3">
              <div className="w-12 h-12 rounded-2xl bg-blue-100 dark:bg-blue-950 text-[#1d4ed8] dark:text-blue-400 flex items-center justify-center shadow-xs">
                <Shield className="w-6 h-6 stroke-[2.2]" />
              </div>

              <h2 className="text-2xl sm:text-3xl font-black font-serif tracking-tight text-[#0f2347] dark:text-white leading-tight">
                {lang === 'ar' ? 'إنشاء كلمة مرور جديدة' : 'Create New Password'}
              </h2>

              {/* Description */}
              <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 leading-relaxed font-sans">
                {lang === 'ar'
                  ? 'أمان حسابك يدعم استمرارية تعلمك. عيّن كلمة مرور رئيسية قوية وسهلة التذكر.'
                  : 'Your security supports steady learning. Set a robust and memorable master password.'}
              </p>
            </div>

            {/* Form Fields */}
            <form onSubmit={handleResetPasswordSubmit} className="space-y-4">
              {/* New Password field with strength indicator bar and Show toggle */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  {lang === 'ar' ? 'كلمة المرور الجديدة' : 'New Password'}
                </label>
                <div className="relative">
                  <input
                    type={showNewPassword ? 'text' : 'password'}
                    required
                    value={newPassword}
                    onChange={(e) => setNewPassword(e.target.value)}
                    className="w-full ps-10 pe-16 py-3 rounded-2xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors shadow-xs"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowNewPassword(!showNewPassword)}
                    className="absolute end-3 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs font-bold text-slate-500 hover:text-blue-600 cursor-pointer flex items-center gap-1 select-none"
                  >
                    {showNewPassword ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'إخفاء' : 'Hide'}</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'إظهار' : 'Show'}</span>
                      </>
                    )}
                  </button>
                </div>

                {/* Password Strength Indicator Bar */}
                <div className="pt-1 space-y-1">
                  <div className="flex items-center justify-between text-[10px] font-bold">
                    <span className="text-slate-500">
                      {lang === 'ar' ? 'قوة كلمة المرور' : 'Password Strength'}
                    </span>
                    <span
                      className={
                        strengthScore === 3
                          ? 'text-emerald-600 dark:text-emerald-400'
                          : strengthScore === 2
                          ? 'text-amber-600 dark:text-amber-400'
                          : 'text-rose-600 dark:text-rose-400'
                      }
                    >
                      {strengthScore === 3
                        ? lang === 'ar'
                          ? 'قوية'
                          : 'Strong'
                        : strengthScore === 2
                        ? lang === 'ar'
                          ? 'متوسطة'
                          : 'Medium'
                        : lang === 'ar'
                        ? 'ضعيفة'
                        : 'Weak'}
                    </span>
                  </div>
                  <div className="h-1.5 w-full bg-stone-200 dark:bg-slate-700 rounded-full overflow-hidden flex gap-1">
                    <div
                      className={`h-full flex-1 rounded-full transition-all ${
                        strengthScore >= 1
                          ? strengthScore === 1
                            ? 'bg-rose-500'
                            : strengthScore === 2
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                          : 'bg-transparent'
                      }`}
                    />
                    <div
                      className={`h-full flex-1 rounded-full transition-all ${
                        strengthScore >= 2
                          ? strengthScore === 2
                            ? 'bg-amber-500'
                            : 'bg-emerald-500'
                          : 'bg-transparent'
                      }`}
                    />
                    <div
                      className={`h-full flex-1 rounded-full transition-all ${
                        strengthScore === 3 ? 'bg-emerald-500' : 'bg-transparent'
                      }`}
                    />
                  </div>
                </div>
              </div>

              {/* Confirm New Password field with Show toggle */}
              <div className="space-y-1.5">
                <label className="block text-xs font-bold text-slate-800 dark:text-slate-200">
                  {lang === 'ar' ? 'تأكيد كلمة المرور' : 'Confirm New Password'}
                </label>
                <div className="relative">
                  <input
                    type={showConfirmPassword ? 'text' : 'password'}
                    required
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    className="w-full ps-10 pe-16 py-3 rounded-2xl border border-stone-300 dark:border-slate-700 bg-white dark:bg-slate-900 text-xs text-slate-900 dark:text-slate-100 focus:outline-none focus:ring-2 focus:ring-blue-600 transition-colors shadow-xs"
                  />
                  <Lock className="w-4 h-4 text-slate-400 absolute start-3.5 top-1/2 -translate-y-1/2 pointer-events-none" />
                  <button
                    type="button"
                    onClick={() => setShowConfirmPassword(!showConfirmPassword)}
                    className="absolute end-3 top-1/2 -translate-y-1/2 px-2.5 py-1 text-xs font-bold text-slate-500 hover:text-blue-600 cursor-pointer flex items-center gap-1 select-none"
                  >
                    {showConfirmPassword ? (
                      <>
                        <EyeOff className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'إخفاء' : 'Hide'}</span>
                      </>
                    ) : (
                      <>
                        <Eye className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'إظهار' : 'Show'}</span>
                      </>
                    )}
                  </button>
                </div>
              </div>

              {/* Password Requirements Checklist */}
              <div className="p-3.5 rounded-2xl bg-stone-100/80 dark:bg-slate-900/80 border border-stone-200 dark:border-slate-800 space-y-2 text-xs">
                <span className="text-[10px] font-black uppercase tracking-wider block text-slate-500">
                  {lang === 'ar' ? 'متطلبات كلمة المرور:' : 'Password Requirements:'}
                </span>

                {/* Requirement 1: At least 8 characters long */}
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-white shrink-0 transition-colors ${
                      hasMinLength ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span
                    className={
                      hasMinLength
                        ? 'font-bold text-emerald-800 dark:text-emerald-300'
                        : 'text-slate-500 dark:text-slate-400'
                    }
                  >
                    {lang === 'ar' ? '٨ أحرف على الأقل' : 'At least 8 characters long'}
                  </span>
                </div>

                {/* Requirement 2: Includes uppercase & lowercase letters */}
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-white shrink-0 transition-colors ${
                      hasUpperLower ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span
                    className={
                      hasUpperLower
                        ? 'font-bold text-emerald-800 dark:text-emerald-300'
                        : 'text-slate-500 dark:text-slate-400'
                    }
                  >
                    {lang === 'ar'
                      ? 'تتضمن أحرفاً كبيرة وصغيرة'
                      : 'Includes uppercase & lowercase letters'}
                  </span>
                </div>

                {/* Requirement 3: Includes at least one number or digit */}
                <div className="flex items-center gap-2">
                  <div
                    className={`w-4 h-4 rounded-full flex items-center justify-center text-white shrink-0 transition-colors ${
                      hasNumber ? 'bg-emerald-600' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <Check className="w-2.5 h-2.5 stroke-[3]" />
                  </div>
                  <span
                    className={
                      hasNumber
                        ? 'font-bold text-emerald-800 dark:text-emerald-300'
                        : 'text-slate-500 dark:text-slate-400'
                    }
                  >
                    {lang === 'ar'
                      ? 'تتضمن رقماً أو خانة عددية واحدة على الأقل'
                      : 'Includes at least one number or digit'}
                  </span>
                </div>
              </div>

              {/* Primary Royal Blue Button: Reset Password */}
              <button
                type="submit"
                disabled={!canSubmitReset || isResetting}
                className={`w-full py-3.5 rounded-full text-white font-bold text-sm bg-[#1d4ed8] hover:bg-[#1e40af] shadow-lg shadow-blue-600/25 transition-all flex items-center justify-center gap-2 ${
                  canSubmitReset && !isResetting
                    ? 'hover:scale-[1.01] active:scale-95 cursor-pointer opacity-100'
                    : 'opacity-50 cursor-not-allowed'
                }`}
              >
                {isResetting ? (
                  <>
                    <RefreshCw className="w-4 h-4 animate-spin" />
                    <span>{lang === 'ar' ? 'جارٍ الحفظ والتحديث...' : 'Resetting Password...'}</span>
                  </>
                ) : (
                  <>
                    <span>{lang === 'ar' ? 'إعادة تعيين كلمة المرور' : 'Reset Password'}</span>
                    <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                  </>
                )}
              </button>
            </form>

            {/* Back link: Back to Login */}
            <div className="pt-2 text-center">
              <button
                type="button"
                onClick={() => setCurrentStep('login')}
                className="inline-flex items-center gap-1.5 text-xs font-bold text-slate-600 dark:text-slate-400 hover:text-blue-600 dark:hover:text-blue-400 cursor-pointer transition-colors"
              >
                <ArrowLeft className="w-3.5 h-3.5 rtl:rotate-180" />
                <span>{lang === 'ar' ? '← العودة لتسجيل الدخول' : '← Back to Login'}</span>
              </button>
            </div>
          </div>
        )}

        {/* ========================================================================= */}
        {/* SUCCESS CONFIRMATION STATE                                                */}
        {/* ========================================================================= */}
        {currentStep === 'success' && (
          <div className="p-10 space-y-4 text-center animate-in zoom-in-95">
            <div className="w-16 h-16 rounded-full bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-400 flex items-center justify-center mx-auto text-3xl shadow-md">
              <CheckCircle2 className="w-10 h-10" />
            </div>
            <h3 className="text-2xl font-black font-serif text-slate-900 dark:text-white">
              {lang === 'ar' ? 'تم تحديث كلمة المرور بنجاح!' : 'Password Updated Successfully!'}
            </h3>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xs mx-auto leading-relaxed">
              {lang === 'ar'
                ? 'تم حفظ كلمة مرورك الجديدة. جاري توجيهك لشاشة الدخول...'
                : 'Your new master password is now active. Returning you to the login screen...'}
            </p>
          </div>
        )}
      </div>
    </div>
  );
};
