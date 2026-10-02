import React, { useState, useEffect, useRef } from 'react';
import { useMockData, UserRole } from '../../context/MockDataContext';
import {
  X,
  Upload,
  Camera,
  Check,
  Sparkles,
  Palette,
  User,
  Mail,
  Phone,
  Building2,
  GraduationCap,
  Users,
  Award,
  Shield,
  Layers,
  CheckCircle2,
  AlertCircle,
  Save,
  Trash2,
  ExternalLink,
  ChevronRight,
  Sun,
  Moon,
  Laptop
} from 'lucide-react';

// Preset Avatars with distinct SVG characters and color palettes
export const AVATAR_PRESETS = [
  {
    id: 'coder_bear',
    name: 'Coder Bear',
    emoji: '🐻',
    bgColor: 'bg-amber-100 dark:bg-amber-950/80',
    borderColor: 'border-amber-400',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="#fde68a" />
        <circle cx="28" cy="25" r="14" fill="#b45309" />
        <circle cx="28" cy="25" r="8" fill="#fde68a" />
        <circle cx="72" cy="25" r="14" fill="#b45309" />
        <circle cx="72" cy="25" r="8" fill="#fde68a" />
        <circle cx="50" cy="54" r="32" fill="#d97706" />
        <ellipse cx="50" cy="62" rx="16" ry="12" fill="#fef3c7" />
        <ellipse cx="50" cy="56" rx="6" ry="4" fill="#78350f" />
        <circle cx="38" cy="46" r="4" fill="#1e293b" />
        <circle cx="62" cy="46" r="4" fill="#1e293b" />
        <rect x="30" y="42" width="16" height="8" rx="2" fill="none" stroke="#0284c7" strokeWidth="2.5" />
        <rect x="54" y="42" width="16" height="8" rx="2" fill="none" stroke="#0284c7" strokeWidth="2.5" />
        <line x1="46" y1="46" x2="54" y2="46" stroke="#0284c7" strokeWidth="2.5" />
      </svg>
    ),
  },
  {
    id: 'ai_robot',
    name: 'Robo Buddy',
    emoji: '🤖',
    bgColor: 'bg-cyan-100 dark:bg-cyan-950/80',
    borderColor: 'border-cyan-400',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="#e0f2fe" />
        <rect x="26" y="28" width="48" height="42" rx="10" fill="#0284c7" />
        <rect x="32" y="36" width="36" height="22" rx="6" fill="#0f172a" />
        <circle cx="42" cy="47" r="4" fill="#38bdf8" />
        <circle cx="58" cy="47" r="4" fill="#38bdf8" />
        <line x1="50" y1="16" x2="50" y2="28" stroke="#0284c7" strokeWidth="3" />
        <circle cx="50" cy="14" r="5" fill="#f59e0b" />
        <rect x="40" y="62" width="20" height="3" rx="1.5" fill="#e2e8f0" />
      </svg>
    ),
  },
  {
    id: 'girl_coder',
    name: 'Mia Dev',
    emoji: '👧',
    bgColor: 'bg-emerald-100 dark:bg-emerald-950/80',
    borderColor: 'border-emerald-400',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="#d1fae5" />
        <circle cx="50" cy="52" r="28" fill="#fed7aa" />
        <path d="M26 46 C26 24 74 24 74 46 C74 40 70 32 50 32 C30 32 26 40 26 46 Z" fill="#047857" />
        <circle cx="40" cy="52" r="3.5" fill="#1e293b" />
        <circle cx="60" cy="52" r="3.5" fill="#1e293b" />
        <path d="M44 64 Q50 70 56 64" stroke="#e11d48" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <rect x="36" y="48" width="11" height="7" rx="2" fill="none" stroke="#065f46" strokeWidth="2" />
        <rect x="53" y="48" width="11" height="7" rx="2" fill="none" stroke="#065f46" strokeWidth="2" />
        <line x1="47" y1="51" x2="53" y2="51" stroke="#065f46" strokeWidth="2" />
      </svg>
    ),
  },
  {
    id: 'boy_explorer',
    name: 'Leo Tech',
    emoji: '👦',
    bgColor: 'bg-blue-100 dark:bg-blue-950/80',
    borderColor: 'border-blue-400',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="#dbeafe" />
        <circle cx="50" cy="52" r="28" fill="#fde68a" />
        <path d="M24 40 C30 20 70 20 76 40 L70 36 C64 30 56 30 50 32 C44 30 36 30 30 36 Z" fill="#1d4ed8" />
        <circle cx="41" cy="52" r="3.5" fill="#0f172a" />
        <circle cx="59" cy="52" r="3.5" fill="#0f172a" />
        <path d="M43 65 Q50 70 57 65" stroke="#b45309" strokeWidth="2.5" fill="none" strokeLinecap="round" />
        <path d="M20 54 Q24 40 28 54" stroke="#1d4ed8" strokeWidth="3" fill="none" strokeLinecap="round" />
        <path d="M80 54 Q76 40 72 54" stroke="#1d4ed8" strokeWidth="3" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'curious_fox',
    name: 'Curious Fox',
    emoji: '🦊',
    bgColor: 'bg-orange-100 dark:bg-orange-950/80',
    borderColor: 'border-orange-400',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="#ffedd5" />
        <polygon points="24,18 42,42 22,46" fill="#ea580c" />
        <polygon points="76,18 58,42 78,46" fill="#ea580c" />
        <polygon points="27,24 38,40 26,42" fill="#fff7ed" />
        <polygon points="73,24 62,40 74,42" fill="#fff7ed" />
        <polygon points="50,78 20,44 80,44" fill="#f97316" />
        <polygon points="50,78 30,52 70,52" fill="#ffffff" />
        <circle cx="36" cy="46" r="3.5" fill="#0f172a" />
        <circle cx="64" cy="46" r="3.5" fill="#0f172a" />
        <circle cx="50" cy="74" r="4" fill="#0f172a" />
      </svg>
    ),
  },
  {
    id: 'hero_champion',
    name: 'Tech Hero',
    emoji: '🦸',
    bgColor: 'bg-purple-100 dark:bg-purple-950/80',
    borderColor: 'border-purple-400',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="#f3e8ff" />
        <circle cx="50" cy="50" r="28" fill="#fed7aa" />
        <path d="M26 44 Q50 20 74 44" fill="#7e22ce" />
        <rect x="30" y="44" width="40" height="10" rx="3" fill="#6b21a8" />
        <circle cx="42" cy="49" r="2.5" fill="#ffffff" />
        <circle cx="58" cy="49" r="2.5" fill="#ffffff" />
        <path d="M44 65 Q50 70 56 65" stroke="#9333ea" strokeWidth="2.5" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'creative_spark',
    name: 'Creative Spark',
    emoji: '✨',
    bgColor: 'bg-rose-100 dark:bg-rose-950/80',
    borderColor: 'border-rose-400',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="#ffe4e6" />
        <circle cx="50" cy="50" r="28" fill="#fecdd3" />
        <path d="M50 18 L55 38 L75 43 L55 48 L50 68 L45 48 L25 43 L45 38 Z" fill="#e11d48" />
        <circle cx="42" cy="54" r="3.5" fill="#881337" />
        <circle cx="58" cy="54" r="3.5" fill="#881337" />
        <path d="M45 64 Q50 69 55 64" stroke="#e11d48" strokeWidth="2" fill="none" strokeLinecap="round" />
      </svg>
    ),
  },
  {
    id: 'logic_kitty',
    name: 'Logic Cat',
    emoji: '🐱',
    bgColor: 'bg-teal-100 dark:bg-teal-950/80',
    borderColor: 'border-teal-400',
    svg: (
      <svg viewBox="0 0 100 100" className="w-full h-full">
        <circle cx="50" cy="50" r="45" fill="#ccfbf1" />
        <polygon points="26,20 40,40 22,42" fill="#0f766e" />
        <polygon points="74,20 60,40 78,42" fill="#0f766e" />
        <circle cx="50" cy="54" r="28" fill="#14b8a6" />
        <circle cx="38" cy="50" r="3.5" fill="#042f2e" />
        <circle cx="62" cy="50" r="3.5" fill="#042f2e" />
        <polygon points="50,60 46,56 54,56" fill="#042f2e" />
        <line x1="26" y1="56" x2="38" y2="56" stroke="#042f2e" strokeWidth="2" />
        <line x1="26" y1="62" x2="38" y2="60" stroke="#042f2e" strokeWidth="2" />
        <line x1="74" y1="56" x2="62" y2="56" stroke="#042f2e" strokeWidth="2" />
        <line x1="74" y1="62" x2="62" y2="60" stroke="#042f2e" strokeWidth="2" />
      </svg>
    ),
  },
];

// Curated Accent Palette
export const ACCENT_PALETTE = [
  { id: 'emerald', name: 'CodeRa Emerald', hex: '#00A86B', text: 'text-[#00A86B]', bg: 'bg-[#00A86B]' },
  { id: 'blue', name: 'Royal Blue', hex: '#2563eb', text: 'text-[#2563eb]', bg: 'bg-[#2563eb]' },
  { id: 'indigo', name: 'Electric Indigo', hex: '#6366f1', text: 'text-[#6366f1]', bg: 'bg-[#6366f1]' },
  { id: 'purple', name: 'Vibrant Violet', hex: '#9333ea', text: 'text-[#9333ea]', bg: 'bg-[#9333ea]' },
  { id: 'amber', name: 'Warm Amber', hex: '#d97706', text: 'text-[#d97706]', bg: 'bg-[#d97706]' },
  { id: 'rose', name: 'Crimson Rose', hex: '#e11d48', text: 'text-[#e11d48]', bg: 'bg-[#e11d48]' },
];

// Curated Background Tones
export const BACKGROUND_TONES = [
  { id: 'cream', name: 'Signature Cream', hex: '#fcfbf7', description: 'Warm & calming sensory finish', darkHex: '#0b1329' },
  { id: 'white', name: 'Crisp White', hex: '#ffffff', description: 'Clean modern high clarity', darkHex: '#080d1a' },
  { id: 'slate', name: 'Soft Slate', hex: '#f8fafc', description: 'Cool neutral focus canvas', darkHex: '#0f172a' },
  { id: 'mint', name: 'Mint Glow', hex: '#f0fdf4', description: 'Gentle nature-inspired tint', darkHex: '#05231c' },
  { id: 'night', name: 'Midnight Dark', hex: '#070e1b', description: 'Deep contrast dark aesthetic', darkHex: '#070e1b' },
];

export const UserProfileModal: React.FC = () => {
  const {
    lang,
    theme,
    toggleTheme,
    currentRole,
    setCurrentRole,
    isProfileModalOpen,
    closeProfileModal,
    getActiveUserContext,
    profileCustomization,
    updateProfileCustomization,
    updateActiveUserProfile,
  } = useMockData();

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Active user data from current role context
  const activeUser = getActiveUserContext();

  // Local form state
  const [activeTab, setActiveTab] = useState<'profile' | 'avatar' | 'appearance' | 'portals'>('profile');
  const [fullName, setFullName] = useState(activeUser.name);
  const [email, setEmail] = useState(activeUser.email);
  const [phone, setPhone] = useState(activeUser.phone);
  const [bio, setBio] = useState(profileCustomization.bio || '');
  const [grade, setGrade] = useState(activeUser.extraDetails?.['Grade'] || 'Grade 6');
  const [contactPerson, setContactPerson] = useState(activeUser.extraDetails?.['Contact Person'] || 'Dr. Sarah Al-Mansoor');

  // Customization preview state
  const [previewAvatarUrl, setPreviewAvatarUrl] = useState<string | undefined>(profileCustomization.avatarUrl);
  const [previewPreset, setPreviewPreset] = useState<string | undefined>(profileCustomization.avatarPreset);
  const [selectedAccent, setSelectedAccent] = useState<string>(profileCustomization.accentColor || '#00A86B');
  const [selectedBg, setSelectedBg] = useState<string>(profileCustomization.dashboardBg || '#fcfbf7');

  // Feedback states
  const [isSaving, setIsSaving] = useState(false);
  const [saveSuccess, setSaveSuccess] = useState(false);
  const [uploadError, setUploadError] = useState<string | null>(null);

  // Sync form state when activeUser or modal opens
  useEffect(() => {
    if (isProfileModalOpen) {
      setFullName(activeUser.name);
      setEmail(activeUser.email);
      setPhone(activeUser.phone);
      setBio(profileCustomization.bio || '');
      setPreviewAvatarUrl(profileCustomization.avatarUrl);
      setPreviewPreset(profileCustomization.avatarPreset);
      setSelectedAccent(profileCustomization.accentColor || '#00A86B');
      setSelectedBg(profileCustomization.dashboardBg || '#fcfbf7');
      setSaveSuccess(false);
      setUploadError(null);
    }
  }, [isProfileModalOpen, currentRole, activeUser.name, activeUser.email]);

  // Handle ESC key to close
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.key === 'Escape' && isProfileModalOpen) {
        closeProfileModal();
      }
    };
    window.addEventListener('keydown', handleKeyDown);
    return () => window.removeEventListener('keydown', handleKeyDown);
  }, [isProfileModalOpen, closeProfileModal]);

  if (!isProfileModalOpen) return null;

  // Handle local image upload
  const handleImageFileChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const file = e.target.files?.[0];
    if (!file) return;

    // Check size (< 5MB)
    if (file.size > 5 * 1024 * 1024) {
      setUploadError(lang === 'ar' ? 'حجم الصورة يجب أن يكون أقل من 5 ميجابايت' : 'Image size must be less than 5MB');
      return;
    }

    setUploadError(null);
    const reader = new FileReader();
    reader.onload = (event) => {
      const result = event.target?.result as string;
      if (result) {
        setPreviewAvatarUrl(result);
        setPreviewPreset(undefined); // clear preset when custom image uploaded
      }
    };
    reader.readAsDataURL(file);
  };

  // Select Preset
  const handleSelectPreset = (presetId: string) => {
    setPreviewPreset(presetId);
    setPreviewAvatarUrl(undefined);
  };

  // Reset to initials
  const handleResetToInitials = () => {
    setPreviewAvatarUrl(undefined);
    setPreviewPreset(undefined);
  };

  // Save all changes
  const handleSaveChanges = () => {
    setIsSaving(true);
    setSaveSuccess(false);

    setTimeout(() => {
      // 1. Update Profile Customization
      updateProfileCustomization({
        avatarUrl: previewAvatarUrl,
        avatarPreset: previewPreset,
        accentColor: selectedAccent,
        dashboardBg: selectedBg,
        bio: bio.trim(),
        customDisplayName: fullName.trim(),
        customEmail: email.trim(),
        customPhone: phone.trim(),
      });

      // 2. Update Context Active Profile (Entities)
      updateActiveUserProfile({
        fullName: fullName.trim(),
        email: email.trim(),
        phone: phone.trim(),
        bio: bio.trim(),
        grade: grade,
        contactPerson: contactPerson,
      });

      setIsSaving(false);
      setSaveSuccess(true);

      setTimeout(() => {
        setSaveSuccess(false);
      }, 3000);
    }, 400);
  };

  // Current active preset object
  const activePresetObj = AVATAR_PRESETS.find((p) => p.id === previewPreset);

  return (
    <div
      className="fixed inset-0 z-[10000] flex items-center justify-center p-3 sm:p-6 bg-slate-950/65 backdrop-blur-md animate-in fade-in duration-200"
      role="dialog"
      aria-modal="true"
      aria-labelledby="user-profile-dialog-title"
    >
      <div
        className="relative w-full max-w-2xl max-h-[92vh] flex flex-col rounded-3xl border shadow-2xl overflow-hidden transition-all duration-300 animate-in zoom-in-95"
        style={{
          backgroundColor: theme === 'dark' ? '#0b1329' : selectedBg,
          borderColor: 'var(--color-border)',
        }}
      >
        {/* Modal Top Header with Dynamic User Status */}
        <div
          className="px-6 py-5 border-b flex items-center justify-between shrink-0 relative overflow-hidden"
          style={{
            borderColor: 'var(--color-border)',
            background: `linear-gradient(135deg, ${selectedAccent}15 0%, transparent 80%)`,
          }}
        >
          <div className="flex items-center gap-3.5">
            {/* Live Mini Avatar Preview */}
            <div
              className="w-12 h-12 rounded-2xl flex items-center justify-center font-black text-lg shadow-md border-2 overflow-hidden transition-transform shrink-0"
              style={{
                borderColor: selectedAccent,
                backgroundColor: `${selectedAccent}20`,
                color: selectedAccent,
              }}
            >
              {previewAvatarUrl ? (
                <img src={previewAvatarUrl} alt="Avatar Preview" className="w-full h-full object-cover" />
              ) : activePresetObj ? (
                <div className="w-9 h-9">{activePresetObj.svg}</div>
              ) : (
                <span>{fullName?.charAt(0)?.toUpperCase() || 'U'}</span>
              )}
            </div>

            <div className="space-y-0.5">
              <div className="flex items-center gap-2">
                <span
                  id="user-profile-dialog-title"
                  className="font-black font-serif text-lg tracking-tight"
                  style={{ color: 'var(--color-text)' }}
                >
                  {fullName || 'User Profile'}
                </span>
                <span
                  className="px-2.5 py-0.5 rounded-full text-[10px] font-black uppercase tracking-wider text-white shadow-xs"
                  style={{ backgroundColor: selectedAccent }}
                >
                  {activeUser.roleLabel}
                </span>
              </div>
              <div className="flex items-center gap-2 text-xs" style={{ color: 'var(--color-text-muted)' }}>
                <span className="w-2 h-2 rounded-full bg-emerald-500 animate-pulse" />
                <span>{activeUser.statusBadge}</span>
                <span>•</span>
                <span className="truncate max-w-[180px] sm:max-w-xs">{email}</span>
              </div>
            </div>
          </div>

          {/* Close Button */}
          <button
            type="button"
            onClick={closeProfileModal}
            className="p-2.5 rounded-2xl border text-slate-500 hover:text-slate-900 dark:hover:text-white hover:bg-slate-200/50 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            style={{ borderColor: 'var(--color-border)' }}
            aria-label="Close Profile Dialog"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Tab Navigation Controls */}
        <div
          className="flex items-center gap-1.5 px-6 pt-3 border-b overflow-x-auto shrink-0 scrollbar-none"
          style={{ borderColor: 'var(--color-border)' }}
        >
          <button
            type="button"
            onClick={() => setActiveTab('profile')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'profile'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white/50 dark:bg-slate-800/40'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
            style={{
              borderColor: activeTab === 'profile' ? selectedAccent : 'transparent',
              color: activeTab === 'profile' ? selectedAccent : undefined,
            }}
          >
            <User className="w-4 h-4" />
            <span>{lang === 'ar' ? 'البيانات الشخصية' : 'Personal Details'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('avatar')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'avatar'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white/50 dark:bg-slate-800/40'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
            style={{
              borderColor: activeTab === 'avatar' ? selectedAccent : 'transparent',
              color: activeTab === 'avatar' ? selectedAccent : undefined,
            }}
          >
            <Camera className="w-4 h-4" />
            <span>{lang === 'ar' ? 'الصورة الشخصية' : 'Avatar & Photo'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('appearance')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'appearance'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white/50 dark:bg-slate-800/40'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
            style={{
              borderColor: activeTab === 'appearance' ? selectedAccent : 'transparent',
              color: activeTab === 'appearance' ? selectedAccent : undefined,
            }}
          >
            <Palette className="w-4 h-4" />
            <span>{lang === 'ar' ? 'الألوان والمظهر' : 'Themes & Colors'}</span>
          </button>

          <button
            type="button"
            onClick={() => setActiveTab('portals')}
            className={`flex items-center gap-2 px-4 py-2.5 rounded-t-xl text-xs sm:text-sm font-bold border-b-2 transition-all cursor-pointer ${
              activeTab === 'portals'
                ? 'border-emerald-500 text-emerald-600 dark:text-emerald-400 bg-white/50 dark:bg-slate-800/40'
                : 'border-transparent text-slate-500 hover:text-slate-900 dark:hover:text-slate-300'
            }`}
            style={{
              borderColor: activeTab === 'portals' ? selectedAccent : 'transparent',
              color: activeTab === 'portals' ? selectedAccent : undefined,
            }}
          >
            <Layers className="w-4 h-4" />
            <span>{lang === 'ar' ? 'تبديل البوابات' : 'Switch Portal'}</span>
          </button>
        </div>

        {/* Scrollable Modal Body */}
        <div className="p-6 overflow-y-auto space-y-6 flex-1 max-h-[60vh] scrollbar-thin">
          {/* TAB 1: EDITABLE PROFILE FIELDS */}
          {activeTab === 'profile' && (
            <div className="space-y-5 animate-in fade-in duration-200">
              {/* Dynamic User Role Overview Banner */}
              <div
                className="p-4 rounded-2xl border flex items-center justify-between gap-4"
                style={{
                  backgroundColor: 'var(--color-surface)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-10 h-10 rounded-xl flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: selectedAccent }}
                  >
                    {currentRole === 'parent' ? (
                      <Users className="w-5 h-5" />
                    ) : currentRole === 'student' ? (
                      <GraduationCap className="w-5 h-5" />
                    ) : currentRole === 'org' ? (
                      <Building2 className="w-5 h-5" />
                    ) : currentRole === 'individual' ? (
                      <Laptop className="w-5 h-5" />
                    ) : (
                      <Shield className="w-5 h-5" />
                    )}
                  </div>
                  <div>
                    <h4 className="text-sm font-black" style={{ color: 'var(--color-text)' }}>
                      {activeUser.roleLabel}
                    </h4>
                    <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                      {lang === 'ar' ? 'جلسة نشطة وموثقة' : 'Active authenticated session'}
                    </p>
                  </div>
                </div>

                <div className="flex items-center gap-1.5 px-3 py-1 rounded-full text-xs font-bold bg-emerald-500/10 text-emerald-600 dark:text-emerald-400 border border-emerald-500/20">
                  <CheckCircle2 className="w-3.5 h-3.5" />
                  <span>{activeUser.statusBadge}</span>
                </div>
              </div>

              {/* Form Grid */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                {/* Full Name */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--color-text)' }}>
                    <User className="w-3.5 h-3.5" style={{ color: selectedAccent }} />
                    <span>{lang === 'ar' ? 'الاسم الكامل / اسم الجهة' : 'Full Name / Entity Name'}</span>
                  </label>
                  <input
                    type="text"
                    value={fullName}
                    onChange={(e) => setFullName(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm font-semibold outline-none transition-all focus:ring-2"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text)',
                    }}
                    placeholder="Enter full name"
                  />
                </div>

                {/* Email Address */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--color-text)' }}>
                    <Mail className="w-3.5 h-3.5" style={{ color: selectedAccent }} />
                    <span>{lang === 'ar' ? 'البريد الإلكتروني' : 'Email Address'}</span>
                  </label>
                  <input
                    type="email"
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm font-semibold outline-none transition-all focus:ring-2"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text)',
                    }}
                    placeholder="learner@codera.org"
                  />
                </div>

                {/* Contact Phone */}
                <div className="space-y-1.5">
                  <label className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--color-text)' }}>
                    <Phone className="w-3.5 h-3.5" style={{ color: selectedAccent }} />
                    <span>{lang === 'ar' ? 'رقم الهاتف' : 'Contact Phone'}</span>
                  </label>
                  <input
                    type="tel"
                    value={phone}
                    onChange={(e) => setPhone(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border text-sm font-semibold outline-none transition-all focus:ring-2"
                    style={{
                      backgroundColor: 'var(--color-surface)',
                      borderColor: 'var(--color-border)',
                      color: 'var(--color-text)',
                    }}
                    placeholder="+966 50 123 4567"
                  />
                </div>

                {/* Portal Specific Field */}
                {currentRole === 'student' ? (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--color-text)' }}>
                      <GraduationCap className="w-3.5 h-3.5" style={{ color: selectedAccent }} />
                      <span>{lang === 'ar' ? 'الصف الدراسي' : 'Grade Level'}</span>
                    </label>
                    <select
                      value={grade}
                      onChange={(e) => setGrade(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border text-sm font-semibold outline-none transition-all cursor-pointer"
                      style={{
                        backgroundColor: 'var(--color-surface)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text)',
                      }}
                    >
                      <option value="Grade 3">Grade 3 (Ages 8-9)</option>
                      <option value="Grade 4">Grade 4 (Ages 9-10)</option>
                      <option value="Grade 5">Grade 5 (Ages 10-11)</option>
                      <option value="Grade 6">Grade 6 (Ages 11-12)</option>
                      <option value="Grade 7">Grade 7 (Ages 12-13)</option>
                      <option value="Grade 8">Grade 8 (Ages 13-14)</option>
                    </select>
                  </div>
                ) : currentRole === 'org' ? (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--color-text)' }}>
                      <Building2 className="w-3.5 h-3.5" style={{ color: selectedAccent }} />
                      <span>{lang === 'ar' ? 'الشخص المسؤول' : 'Contact Person'}</span>
                    </label>
                    <input
                      type="text"
                      value={contactPerson}
                      onChange={(e) => setContactPerson(e.target.value)}
                      className="w-full px-4 py-2.5 rounded-xl border text-sm font-semibold outline-none transition-all"
                      style={{
                        backgroundColor: 'var(--color-surface)',
                        borderColor: 'var(--color-border)',
                        color: 'var(--color-text)',
                      }}
                      placeholder="Coordinator Name"
                    />
                  </div>
                ) : (
                  <div className="space-y-1.5">
                    <label className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--color-text)' }}>
                      <Award className="w-3.5 h-3.5" style={{ color: selectedAccent }} />
                      <span>{lang === 'ar' ? 'حالة الاعتماد' : 'Verification Status'}</span>
                    </label>
                    <div
                      className="w-full px-4 py-2.5 rounded-xl border text-sm font-bold flex items-center gap-2 bg-emerald-50 dark:bg-emerald-950/20 text-emerald-700 dark:text-emerald-400"
                      style={{ borderColor: 'var(--color-border)' }}
                    >
                      <CheckCircle2 className="w-4 h-4 text-emerald-600" />
                      <span>Official Identity Verified</span>
                    </div>
                  </div>
                )}
              </div>

              {/* Bio / Learning Accommodations Notes */}
              <div className="space-y-1.5">
                <label className="text-xs font-bold flex items-center gap-1.5" style={{ color: 'var(--color-text)' }}>
                  <Sparkles className="w-3.5 h-3.5" style={{ color: selectedAccent }} />
                  <span>
                    {currentRole === 'student'
                      ? lang === 'ar'
                        ? 'ملاحظات التيسيرات والاحتياجات التعليمية'
                        : 'Accommodations & Sensory Preferences'
                      : lang === 'ar'
                      ? 'نبذة تعريفية'
                      : 'About / Mission Statement'}
                  </span>
                </label>
                <textarea
                  rows={3}
                  value={bio}
                  onChange={(e) => setBio(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-sm font-medium outline-none transition-all resize-none"
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: 'var(--color-border)',
                    color: 'var(--color-text)',
                  }}
                  placeholder={
                    currentRole === 'student'
                      ? 'e.g. Prefers high-contrast visual cues, sign language helpers, and extra response time for quiz challenges.'
                      : 'Share a brief intro or specialized tech accessibility focus...'
                  }
                />
              </div>
            </div>
          )}

          {/* TAB 2: AVATAR / PROFILE PICTURE UPLOADER */}
          {activeTab === 'avatar' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Main Avatar Preview & Local Upload Row */}
              <div
                className="p-5 rounded-2xl border flex flex-col sm:flex-row items-center gap-6"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                {/* Large Preview Circle */}
                <div className="relative group shrink-0">
                  <div
                    className="w-24 h-24 sm:w-28 sm:h-28 rounded-full border-4 shadow-xl overflow-hidden flex items-center justify-center text-3xl font-black transition-transform group-hover:scale-105"
                    style={{
                      borderColor: selectedAccent,
                      backgroundColor: `${selectedAccent}15`,
                      color: selectedAccent,
                    }}
                  >
                    {previewAvatarUrl ? (
                      <img src={previewAvatarUrl} alt="Avatar" className="w-full h-full object-cover" />
                    ) : activePresetObj ? (
                      <div className="w-20 h-20">{activePresetObj.svg}</div>
                    ) : (
                      <span>{fullName?.charAt(0)?.toUpperCase() || 'U'}</span>
                    )}
                  </div>

                  <button
                    type="button"
                    onClick={() => fileInputRef.current?.click()}
                    className="absolute bottom-0 end-0 p-2.5 rounded-full text-white shadow-lg transition-transform hover:scale-110 active:scale-95 cursor-pointer"
                    style={{ backgroundColor: selectedAccent }}
                    title="Upload local image"
                  >
                    <Camera className="w-4 h-4 stroke-[2.5]" />
                  </button>
                </div>

                {/* Upload Controls & Instructions */}
                <div className="space-y-3 flex-1 text-center sm:text-start">
                  <div>
                    <h4 className="text-base font-black font-serif" style={{ color: 'var(--color-text)' }}>
                      {lang === 'ar' ? 'تخصيص الصورة الرمزية' : 'Personalize Your Avatar'}
                    </h4>
                    <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                      {lang === 'ar'
                        ? 'ارفع صورة شخصية من جهازك أو اختر إحدى الشخصيات الكرتونية الملهمة.'
                        : 'Upload a custom photo from your device or pick a friendly mascot preset.'}
                    </p>
                  </div>

                  <div className="flex flex-wrap items-center justify-center sm:justify-start gap-2.5">
                    <input
                      ref={fileInputRef}
                      type="file"
                      accept="image/*"
                      onChange={handleImageFileChange}
                      className="hidden"
                    />
                    <button
                      type="button"
                      onClick={() => fileInputRef.current?.click()}
                      className="px-4 py-2 rounded-xl text-white font-bold text-xs shadow-md transition-all hover:opacity-90 flex items-center gap-1.5 cursor-pointer"
                      style={{ backgroundColor: selectedAccent }}
                    >
                      <Upload className="w-3.5 h-3.5" />
                      <span>{lang === 'ar' ? 'رفع صورة من الجهاز' : 'Upload Image'}</span>
                    </button>

                    {(previewAvatarUrl || previewPreset) && (
                      <button
                        type="button"
                        onClick={handleResetToInitials}
                        className="px-3.5 py-2 rounded-xl border text-xs font-bold text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/30 transition-colors flex items-center gap-1.5 cursor-pointer"
                        style={{ borderColor: 'var(--color-border)' }}
                      >
                        <Trash2 className="w-3.5 h-3.5" />
                        <span>{lang === 'ar' ? 'استعادة الأحرف الأولى' : 'Use Initials'}</span>
                      </button>
                    )}
                  </div>

                  {uploadError && (
                    <div className="flex items-center gap-1.5 text-xs text-rose-600 font-bold">
                      <AlertCircle className="w-3.5 h-3.5" />
                      <span>{uploadError}</span>
                    </div>
                  )}
                </div>
              </div>

              {/* 8 Preset Character Avatars */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                    {lang === 'ar' ? 'شخصيات كوديرا الجاهزة (اختر واحدة)' : 'CodeRa Mascots & Presets (Click to apply)'}
                  </h4>
                  {previewPreset && (
                    <span className="text-xs font-bold" style={{ color: selectedAccent }}>
                      Selected: {activePresetObj?.name}
                    </span>
                  )}
                </div>

                <div className="grid grid-cols-2 sm:grid-cols-4 gap-3">
                  {AVATAR_PRESETS.map((preset) => {
                    const isSelected = previewPreset === preset.id;
                    return (
                      <button
                        key={preset.id}
                        type="button"
                        onClick={() => handleSelectPreset(preset.id)}
                        className={`p-3 rounded-2xl border text-start flex items-center gap-3 transition-all cursor-pointer group hover:scale-102 ${
                          isSelected ? 'ring-2 shadow-md' : 'hover:border-slate-400'
                        }`}
                        style={{
                          backgroundColor: 'var(--color-surface)',
                          borderColor: isSelected ? selectedAccent : 'var(--color-border)',
                        }}
                      >
                        <div
                          className={`w-11 h-11 rounded-xl p-1 flex items-center justify-center shrink-0 border ${preset.borderColor} ${preset.bgColor}`}
                        >
                          {preset.svg}
                        </div>
                        <div className="overflow-hidden">
                          <span className="text-xs font-black block truncate" style={{ color: 'var(--color-text)' }}>
                            {preset.name}
                          </span>
                          <span className="text-[10px] text-slate-500 font-medium block">
                            {isSelected ? '✓ Active' : preset.emoji}
                          </span>
                        </div>
                      </button>
                    );
                  })}
                </div>
              </div>
            </div>
          )}

          {/* TAB 3: THEME & COLOR CUSTOMIZATION */}
          {activeTab === 'appearance' && (
            <div className="space-y-6 animate-in fade-in duration-200">
              {/* Light / Dark Mode Toggle Card */}
              <div
                className="p-5 rounded-2xl border flex items-center justify-between"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div className="space-y-0.5">
                  <h4 className="text-sm font-black font-serif" style={{ color: 'var(--color-text)' }}>
                    {lang === 'ar' ? 'الوضع اللوني العام' : 'Base Interface Mode'}
                  </h4>
                  <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>
                    {theme === 'dark'
                      ? lang === 'ar'
                        ? 'الوضع الليلي مفعّل (مريح للعين في الإضاءة المنخفضة)'
                        : 'Dark mode active (gentle for low-light environments)'
                      : lang === 'ar'
                      ? 'الوضع النهاري مفعّل (وضوح عالي وإضاءة مشرقة)'
                      : 'Light mode active (crisp daytime clarity)'}
                  </p>
                </div>

                <button
                  type="button"
                  onClick={toggleTheme}
                  className="px-4 py-2 rounded-xl border flex items-center gap-2 font-bold text-xs transition-colors hover:bg-slate-100 dark:hover:bg-slate-800 cursor-pointer"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                >
                  {theme === 'dark' ? (
                    <>
                      <Sun className="w-4 h-4 text-amber-400" />
                      <span>Switch to Light</span>
                    </>
                  ) : (
                    <>
                      <Moon className="w-4 h-4 text-slate-700" />
                      <span>Switch to Dark</span>
                    </>
                  )}
                </button>
              </div>

              {/* Accent Color Palette Picker */}
              <div className="space-y-3">
                <div className="flex items-center justify-between">
                  <h4 className="text-xs font-black uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                    {lang === 'ar' ? 'لون التمييز التفاعلي (Accent Color)' : 'Interactive Accent Color'}
                  </h4>
                  <span className="text-xs font-mono font-bold" style={{ color: selectedAccent }}>
                    {selectedAccent}
                  </span>
                </div>

                <div className="grid grid-cols-3 sm:grid-cols-6 gap-2.5">
                  {ACCENT_PALETTE.map((accent) => {
                    const isSelected = selectedAccent.toLowerCase() === accent.hex.toLowerCase();
                    return (
                      <button
                        key={accent.id}
                        type="button"
                        onClick={() => setSelectedAccent(accent.hex)}
                        className={`p-3 rounded-2xl border flex flex-col items-center gap-2 transition-all cursor-pointer hover:scale-105 ${
                          isSelected ? 'ring-2 ring-offset-2' : ''
                        }`}
                        style={{
                          backgroundColor: 'var(--color-surface)',
                          borderColor: isSelected ? accent.hex : 'var(--color-border)',
                        }}
                      >
                        <div
                          className="w-8 h-8 rounded-full flex items-center justify-center text-white shadow-sm"
                          style={{ backgroundColor: accent.hex }}
                        >
                          {isSelected && <Check className="w-4 h-4 stroke-[3]" />}
                        </div>
                        <span className="text-[11px] font-bold text-center truncate max-w-full" style={{ color: 'var(--color-text)' }}>
                          {accent.name}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Dashboard Background Tone Selector */}
              <div className="space-y-3">
                <div>
                  <h4 className="text-xs font-black uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>
                    {lang === 'ar' ? 'درجة لون خلفية لوحة التحكم (Dashboard Background Tone)' : 'Dashboard Background Tint'}
                  </h4>
                  <p className="text-xs mt-0.5" style={{ color: 'var(--color-text-muted)' }}>
                    {lang === 'ar'
                      ? 'اختر النبرة المريحة لحساسيتك البصرية (كالبيج الكريمي أو الأبيض النقي)'
                      : 'Choose a soothing sensory tone for portal dashboards and lesson modules.'}
                  </p>
                </div>

                <div className="grid grid-cols-1 sm:grid-cols-3 gap-3">
                  {BACKGROUND_TONES.slice(0, 3).map((tone) => {
                    const isSelected = selectedBg === tone.hex;
                    return (
                      <button
                        key={tone.id}
                        type="button"
                        onClick={() => setSelectedBg(tone.hex)}
                        className={`p-4 rounded-2xl border text-start transition-all cursor-pointer hover:scale-102 ${
                          isSelected ? 'ring-2 shadow-md' : ''
                        }`}
                        style={{
                          backgroundColor: tone.hex,
                          borderColor: isSelected ? selectedAccent : 'var(--color-border)',
                        }}
                      >
                        <div className="flex items-center justify-between">
                          <span className="text-xs font-black text-slate-900">{tone.name}</span>
                          {isSelected && (
                            <div
                              className="w-5 h-5 rounded-full flex items-center justify-center text-white"
                              style={{ backgroundColor: selectedAccent }}
                            >
                              <Check className="w-3 h-3 stroke-[3]" />
                            </div>
                          )}
                        </div>
                        <span className="text-[11px] text-slate-600 block mt-1 leading-snug">
                          {tone.description}
                        </span>
                      </button>
                    );
                  })}
                </div>
              </div>

              {/* Live Preview Box */}
              <div
                className="p-4 rounded-2xl border transition-colors flex items-center justify-between"
                style={{
                  backgroundColor: selectedBg,
                  borderColor: 'var(--color-border)',
                }}
              >
                <div className="flex items-center gap-3">
                  <div
                    className="w-9 h-9 rounded-xl flex items-center justify-center text-white font-bold"
                    style={{ backgroundColor: selectedAccent }}
                  >
                    CR
                  </div>
                  <div>
                    <span className="text-xs font-bold block" style={{ color: 'var(--color-text)' }}>
                      Live Theme Preview
                    </span>
                    <span className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
                      Background: {selectedBg} • Accent: {selectedAccent}
                    </span>
                  </div>
                </div>

                <button
                  type="button"
                  className="px-3.5 py-1.5 rounded-full text-xs font-bold text-white shadow-sm pointer-events-none"
                  style={{ backgroundColor: selectedAccent }}
                >
                  Interactive Button
                </button>
              </div>
            </div>
          )}

          {/* TAB 4: PORTAL SWITCHER & CONTEXT QUICK-ACCESS */}
          {activeTab === 'portals' && (
            <div className="space-y-4 animate-in fade-in duration-200">
              <div>
                <h4 className="text-sm font-black font-serif" style={{ color: 'var(--color-text)' }}>
                  {lang === 'ar' ? 'التبديل بين بوابات كوديرا' : 'Switch Portal Context'}
                </h4>
                <p className="text-xs mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  {lang === 'ar'
                    ? 'انتقل فوراً لاختبار ملف التعريف وميزات إمكانية الوصول في أي من بوابات المنصة.'
                    : 'Jump seamlessly between learner, parent, organization, and individual workspaces.'}
                </p>
              </div>

              <div className="grid grid-cols-1 sm:grid-cols-2 gap-3">
                {/* Student */}
                <button
                  type="button"
                  onClick={() => {
                    setCurrentRole('student');
                    closeProfileModal();
                    window.location.hash = '#/student-dashboard';
                  }}
                  className={`p-4 rounded-2xl border text-start flex items-center gap-3.5 transition-all cursor-pointer hover:scale-102 ${
                    currentRole === 'student' ? 'ring-2' : ''
                  }`}
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: currentRole === 'student' ? selectedAccent : 'var(--color-border)',
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-blue-600 text-white flex items-center justify-center font-bold shrink-0">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <span className="text-xs font-black block" style={{ color: 'var(--color-text)' }}>
                      Student Portal
                    </span>
                    <span className="text-[11px] text-slate-500 block truncate">
                      Ahmed • Python & Web L2
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                {/* Parent */}
                <button
                  type="button"
                  onClick={() => {
                    setCurrentRole('parent');
                    closeProfileModal();
                    window.location.hash = '#/parent-dashboard';
                  }}
                  className={`p-4 rounded-2xl border text-start flex items-center gap-3.5 transition-all cursor-pointer hover:scale-102 ${
                    currentRole === 'parent' ? 'ring-2' : ''
                  }`}
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: currentRole === 'parent' ? selectedAccent : 'var(--color-border)',
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-emerald-600 text-white flex items-center justify-center font-bold shrink-0">
                    <Users className="w-5 h-5" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <span className="text-xs font-black block" style={{ color: 'var(--color-text)' }}>
                      Parent Portal
                    </span>
                    <span className="text-[11px] text-slate-500 block truncate">
                      Mariam • 3 Registered Learners
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                {/* Organization */}
                <button
                  type="button"
                  onClick={() => {
                    setCurrentRole('org');
                    closeProfileModal();
                    window.location.hash = '#/org-dashboard';
                  }}
                  className={`p-4 rounded-2xl border text-start flex items-center gap-3.5 transition-all cursor-pointer hover:scale-102 ${
                    currentRole === 'org' ? 'ring-2' : ''
                  }`}
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: currentRole === 'org' ? selectedAccent : 'var(--color-border)',
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-purple-600 text-white flex items-center justify-center font-bold shrink-0">
                    <Building2 className="w-5 h-5" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <span className="text-xs font-black block" style={{ color: 'var(--color-text)' }}>
                      Organization Hub
                    </span>
                    <span className="text-[11px] text-slate-500 block truncate">
                      Hope Academy • Growth Tier
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>

                {/* Individual */}
                <button
                  type="button"
                  onClick={() => {
                    setCurrentRole('individual');
                    closeProfileModal();
                    window.location.hash = '#/individual-dashboard';
                  }}
                  className={`p-4 rounded-2xl border text-start flex items-center gap-3.5 transition-all cursor-pointer hover:scale-102 ${
                    currentRole === 'individual' ? 'ring-2' : ''
                  }`}
                  style={{
                    backgroundColor: 'var(--color-surface)',
                    borderColor: currentRole === 'individual' ? selectedAccent : 'var(--color-border)',
                  }}
                >
                  <div className="w-10 h-10 rounded-xl bg-indigo-600 text-white flex items-center justify-center font-bold shrink-0">
                    <Laptop className="w-5 h-5" />
                  </div>
                  <div className="flex-1 overflow-hidden">
                    <span className="text-xs font-black block" style={{ color: 'var(--color-text)' }}>
                      Individual Learner
                    </span>
                    <span className="text-[11px] text-slate-500 block truncate">
                      Nadia • Inclusive Programming
                    </span>
                  </div>
                  <ChevronRight className="w-4 h-4 text-slate-400" />
                </button>
              </div>
            </div>
          )}
        </div>

        {/* Modal Bottom Footer with "Save Changes" & Feedback */}
        <div
          className="px-6 py-4 border-t flex flex-col sm:flex-row items-center justify-between gap-3 shrink-0"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
          }}
        >
          {/* Status Feedback Toast */}
          <div className="text-xs font-bold flex items-center gap-2">
            {saveSuccess ? (
              <span className="text-emerald-600 dark:text-emerald-400 flex items-center gap-1.5 animate-in fade-in">
                <CheckCircle2 className="w-4 h-4" />
                <span>{lang === 'ar' ? 'تم حفظ التعديلات بنجاح في الجلسة!' : 'Changes saved successfully to session!'}</span>
              </span>
            ) : (
              <span style={{ color: 'var(--color-text-muted)' }}>
                {lang === 'ar' ? 'المظهر والملف الشخصي متزامنان في المتصفح' : 'Profile updates sync across all platform pages.'}
              </span>
            )}
          </div>

          {/* Action Buttons */}
          <div className="flex items-center gap-3 w-full sm:w-auto justify-end">
            <button
              type="button"
              onClick={closeProfileModal}
              className="px-4 py-2.5 rounded-xl border text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              {lang === 'ar' ? 'إغلاق' : 'Close'}
            </button>

            <button
              type="button"
              onClick={handleSaveChanges}
              disabled={isSaving}
              className="px-6 py-2.5 rounded-xl text-white font-black text-xs shadow-md transition-all hover:scale-105 active:scale-95 flex items-center gap-2 cursor-pointer disabled:opacity-50"
              style={{ backgroundColor: selectedAccent }}
            >
              {isSaving ? (
                <>
                  <div className="w-3.5 h-3.5 border-2 border-white border-t-transparent rounded-full animate-spin" />
                  <span>{lang === 'ar' ? 'جاري الحفظ...' : 'Saving...'}</span>
                </>
              ) : (
                <>
                  <Save className="w-3.5 h-3.5" />
                  <span>{lang === 'ar' ? 'حفظ التعديلات' : 'Save Changes'}</span>
                </>
              )}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
};
