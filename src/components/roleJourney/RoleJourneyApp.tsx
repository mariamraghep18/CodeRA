import React, { useState, useEffect } from 'react';
import {
  ArrowRight,
  ArrowLeft,
  Code2,
  User,
  Building2,
  Heart,
  GraduationCap,
  Rocket,
  Puzzle,
  Trophy,
  Users,
  CheckCircle2,
  Home,
  X
} from 'lucide-react';

export type RoleJourneyScreen =
  | 'main'
  | 'builder'
  | 'mentor'
  | 'individual'
  | 'organization'
  | 'course-programmer'
  | 'course-teacher';

const IMAGES = {
  builderRole: '/img/bilder.jpeg',
  mentorRole: '/img/monter.jpeg',
  coider: '/img/coder.jpeg',
  coder: '/img/coder.jpeg',
  codeGuide: '/img/guide.jpeg',
  guide: '/img/guide.jpeg',
  programmer: '/img/coder.jpeg',
  teacher: '/img/guide.jpeg',
  school: '/img/school.jpeg',
  center: '/img/specialist Center.jpeg',
};

const FALLBACK_IMAGES = {
  builderRole: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
  mentorRole: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=600&q=80',
  coider: 'https://images.unsplash.com/photo-1517694712202-14dd9538aa97?auto=format&fit=crop&w=600&q=80',
  codeGuide: 'https://images.unsplash.com/photo-1573164713988-8665fc963095?auto=format&fit=crop&w=600&q=80',
  programmer: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
  specialEd: 'https://images.unsplash.com/photo-1503676260728-1c00da094a0b?auto=format&fit=crop&w=600&q=80',
  school: 'https://images.unsplash.com/photo-1580582932707-520aed937b7b?auto=format&fit=crop&w=600&q=80',
  center: 'https://images.unsplash.com/photo-1513694203232-719a280e022f?auto=format&fit=crop&w=600&q=80',
};

type FallbackKey = keyof typeof FALLBACK_IMAGES;

interface ImageWithFallbackProps {
  src: string;
  fallbackKey: FallbackKey;
  alt: string;
  className?: string;
}

const ImageWithFallback: React.FC<ImageWithFallbackProps> = ({
  src,
  fallbackKey,
  alt,
  className = '',
}) => {
  const [imgSrc, setImgSrc] = useState(src);
  const [hasError, setHasError] = useState(false);

  return (
    <img
      src={hasError ? FALLBACK_IMAGES[fallbackKey] : imgSrc}
      alt={alt}
      className={className}
      onError={(event) => {
        if (!hasError) {
          setHasError(true);
          setImgSrc(FALLBACK_IMAGES[fallbackKey]);
        } else {
          event.currentTarget.style.display = 'none';
        }
      }}
    />
  );
};

export interface RoleJourneyAppProps {
  initialScreen?: RoleJourneyScreen;
  onClose?: () => void;
}

export const RoleJourneyApp: React.FC<RoleJourneyAppProps> = ({
  initialScreen = 'main',
  onClose,
}) => {
  const [currentScreen, setCurrentScreen] = useState<RoleJourneyScreen>(initialScreen);
  const [history, setHistory] = useState<RoleJourneyScreen[]>([]);
  const [toastMsg, setToastMsg] = useState('');

  useEffect(() => {
    setCurrentScreen(initialScreen);
    setHistory([]);
  }, [initialScreen]);

  const showToast = (msg: string) => {
    setToastMsg(msg);
    setTimeout(() => {
      setToastMsg('');
    }, 3500);
  };

  const navigate = (screen: RoleJourneyScreen) => {
    setHistory((previous) => [...previous, currentScreen]);
    setCurrentScreen(screen);
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const goBack = () => {
    if (history.length === 0) {
      if (onClose) {
        onClose();
      } else {
        returnToLanding();
      }
      return;
    }
    const newHistory = [...history];
    const previous = newHistory.pop();
    setHistory(newHistory);
    if (previous) setCurrentScreen(previous);
  };

  const returnToLanding = () => {
    if (onClose) {
      onClose();
    }
    const roleContainer = document.getElementById('role-journey-container');
    if (roleContainer) {
      roleContainer.classList.add('hidden');
      roleContainer.classList.remove('active');
    }
    document.body.classList.remove('exam-mode');
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  const handleSelectCoder = () => {
    try {
      localStorage.setItem('codera_user_role', JSON.stringify({ role: 'BUILDER', type: 'CODER' }));
    } catch (e) {}
    showToast('🚀 Launching Student Placement Assessment...');
    setTimeout(() => {
      returnToLanding();
      if (typeof (window as any).startChildTest === 'function') {
        (window as any).startChildTest(false);
      }
    }, 600);
  };

  const handleSelectCodeGuide = () => {
    try {
      localStorage.setItem('codera_user_role', JSON.stringify({ role: 'BUILDER', type: 'CODE_GUIDE' }));
    } catch (e) {}
    showToast('👨‍👩‍👧‍👦 Opening Parent Portal...');
    setTimeout(() => {
      returnToLanding();
      if (typeof (window as any).openParentDashboard === 'function') {
        (window as any).openParentDashboard();
      } else if (typeof (window as any).openParentModal === 'function') {
        (window as any).openParentModal(1);
      }
    }, 600);
  };

  return (
    <div className="min-h-screen w-full bg-slate-50 text-slate-900 selection:bg-indigo-500/20 font-sans relative">
      {/* Top Floating Quick Navigation Bar */}
      <div className="fixed top-4 right-4 z-50 flex items-center gap-2 bg-white/90 backdrop-blur-md px-3 py-1.5 rounded-full border border-slate-200 shadow-sm">
        <button
          onClick={returnToLanding}
          className="flex items-center gap-1.5 px-3 py-1 text-xs font-bold text-slate-700 hover:text-indigo-600 transition-colors rounded-full hover:bg-slate-100 cursor-pointer"
          title="Return to Main Landing Page"
        >
          <Home size={15} />
          <span>Main Page</span>
        </button>
        {onClose && (
          <button
            onClick={onClose}
            className="w-7 h-7 rounded-full bg-slate-100 hover:bg-slate-200 text-slate-700 flex items-center justify-center transition-colors cursor-pointer"
            title="Close"
          >
            <X size={15} />
          </button>
        )}
      </div>

      {/* Toast Notification */}
      <div
        className={`fixed top-6 left-1/2 -translate-x-1/2 px-6 py-3 rounded-full font-semibold shadow-md flex items-center gap-3 transition-all duration-200 ease-in-out z-50 bg-emerald-50 text-emerald-700 border border-emerald-200 ${
          toastMsg ? 'opacity-100 translate-y-0 scale-100' : 'opacity-0 -translate-y-4 scale-95 pointer-events-none'
        }`}
      >
        <CheckCircle2 size={20} className="text-emerald-600" />
        <span>{toastMsg}</span>
      </div>

      {/* Router views */}
      {currentScreen === 'main' && <MainPage onNavigate={navigate} />}
      {currentScreen === 'builder' && (
        <BuilderPopup
          onBack={goBack}
          onSelectCoder={handleSelectCoder}
          onSelectGuide={handleSelectCodeGuide}
          onReturnHome={returnToLanding}
        />
      )}
      {currentScreen === 'mentor' && (
        <MentorPopup
          onBack={goBack}
          onNavigate={navigate}
          onReturnHome={returnToLanding}
        />
      )}
      {currentScreen === 'individual' && (
        <IndividualPopup
          onBack={goBack}
          onNavigate={navigate}
          onReturnHome={returnToLanding}
        />
      )}
      {currentScreen === 'organization' && (
        <OrganizationPopup
          onBack={goBack}
          onReturnHome={returnToLanding}
        />
      )}
      {currentScreen === 'course-programmer' && (
        <CourseProgrammerPopup
          onBack={goBack}
          onReturnHome={returnToLanding}
          showToast={showToast}
        />
      )}
      {currentScreen === 'course-teacher' && (
        <CourseTeacherPopup
          onBack={goBack}
          onReturnHome={returnToLanding}
          showToast={showToast}
        />
      )}
    </div>
  );
};

// ==================== MAIN LANDING PAGE ====================
function MainPage({ onNavigate }: { onNavigate: (screen: RoleJourneyScreen) => void }) {
  return (
    <div className="min-h-screen bg-slate-50 flex flex-col font-sans">
      <div className="flex-1 w-full max-w-7xl mx-auto px-6 py-10 flex flex-col animate-in fade-in duration-300">
        
        {/* Minimal Header */}
        <header className="mb-12">
          <div className="flex items-center gap-2.5 text-slate-900 font-extrabold text-2xl tracking-tight mb-1">
            <img
              src="/logo.svg"
              alt="CodeRa Logo"
              className="h-10 w-auto object-contain"
              onError={(event) => {
                const target = event.currentTarget;
                if (target.src.endsWith('/logo.svg')) {
                  target.src = '/logo.png';
                } else {
                  target.style.display = 'none';
                  const fallback = document.getElementById('logo-fallback-1');
                  if (fallback) fallback.style.display = 'flex';
                }
              }}
            />
            <div id="logo-fallback-1" className="hidden items-center gap-2">
              <Code2 size={28} className="text-indigo-600" />
              <span>CodeRa</span>
            </div>
          </div>
          <p className="text-slate-500 text-xs font-semibold tracking-wide uppercase">
            Code Today. Create Tomorrow.
          </p>
        </header>

        {/* Hero 2-Column Layout */}
        <div className="flex flex-col lg:flex-row gap-12 lg:gap-20 items-center flex-1">
          
          {/* Left Column */}
          <div className="flex-1 w-full text-center lg:text-left">
            <h1 className="text-5xl lg:text-[76px] text-slate-900 font-serif font-bold leading-[1.1] mb-6 tracking-tight">
              What's your
              <br />
              <span className="text-indigo-600">coding role?</span>
            </h1>
            <p className="text-slate-600 text-lg lg:text-[22px] max-w-md mx-auto lg:mx-0 leading-relaxed font-normal">
              Choose your path and let's build a better future together.
            </p>

            {/* Supporting Card */}
            <div className="mt-16 hidden lg:flex bg-white rounded-3xl p-6 border border-slate-200 max-w-[420px] items-center gap-5 shadow-sm hover:shadow-md transition-all duration-200 ease-in-out">
              <div 
                className="bg-indigo-50 text-indigo-600 w-14 h-14 rounded-full flex items-center justify-center shrink-0 border border-indigo-100"
              >
                <Heart size={24} fill="currentColor" />
              </div>
              <div className="flex flex-col justify-center">
                <p className="text-slate-500 text-sm mb-0.5 font-medium">Different roles. One mission.</p>
                <p className="text-slate-900 text-[17px] font-semibold">
                  Building <span className="text-indigo-600 font-bold">brighter futures</span> through code.
                </p>
              </div>
            </div>
          </div>

          {/* Right Column: Role Cards */}
          <div className="flex-1 w-full flex flex-col gap-6 max-w-[560px]">
            
            {/* BUILDER CARD */}
            <button
              type="button"
              onClick={() => onNavigate('builder')}
              className="group text-left bg-white rounded-3xl p-3.5 pr-8 flex items-center gap-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-indigo-300 transition-all duration-200 ease-in-out transform hover:-translate-y-1 w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            >
              <div className="w-36 h-36 rounded-2xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                <ImageWithFallback
                  src={IMAGES.builderRole}
                  fallbackKey="builderRole"
                  alt="Builder"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
              </div>
              <div className="flex-1 py-2">
                <h3 className="text-indigo-600 text-2xl font-bold mb-1 tracking-tight">BUILDER</h3>
                <p className="text-slate-600 text-base leading-snug font-medium">
                  I'm here to learn, create &amp;<br />build.
                </p>
              </div>
              <div className="bg-indigo-600 hover:bg-indigo-700 text-white w-14 h-14 rounded-full flex items-center justify-center shrink-0 group-hover:scale-105 transition-all duration-200 ease-in-out shadow-sm">
                <ArrowRight size={24} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>

            {/* MENTOR CARD */}
            <button
              type="button"
              onClick={() => onNavigate('mentor')}
              className="group text-left bg-white rounded-3xl p-3.5 pr-8 flex items-center gap-6 border border-slate-200 shadow-sm hover:shadow-md hover:border-teal-300 transition-all duration-200 ease-in-out transform hover:-translate-y-1 w-full cursor-pointer focus:outline-none focus:ring-2 focus:ring-teal-500"
            >
              <div className="w-36 h-36 rounded-2xl overflow-hidden shrink-0 bg-slate-100 border border-slate-200">
                <ImageWithFallback
                  src={IMAGES.mentorRole}
                  fallbackKey="mentorRole"
                  alt="Mentor"
                  className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
                />
              </div>
              <div className="flex-1 py-2">
                <h3 className="text-teal-600 text-2xl font-bold mb-1 tracking-tight">MENTOR</h3>
                <p className="text-slate-600 text-base leading-snug font-medium">
                  I'm here to support, track &amp;<br />empower.
                </p>
              </div>
              <div className="bg-teal-600 hover:bg-teal-700 text-white w-14 h-14 rounded-full flex items-center justify-center shrink-0 group-hover:scale-105 transition-all duration-200 ease-in-out shadow-sm">
                <ArrowRight size={24} strokeWidth={2.5} className="group-hover:translate-x-0.5 transition-transform" />
              </div>
            </button>
          </div>

        </div>
      </div>

      {/* Bottom Value Proposition Bar */}
      <div className="bg-white border-t border-slate-200 py-8">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row gap-6 md:gap-4 justify-between items-start md:items-center">
          <Feature
            icon={<Rocket size={26} strokeWidth={1.5} className="text-indigo-600" />}
            title="Personalized Experience"
            description="We tailor everything to your goals."
          />
          <Feature
            icon={<Puzzle size={26} strokeWidth={1.5} className="text-indigo-600" />}
            title="Inclusive by Design"
            description="Empowering every ability."
          />
          <Feature
            icon={<Trophy size={26} strokeWidth={1.5} className="text-indigo-600" />}
            title="Real Skills, Real Impact"
            description="From learning to meaningful opportunities."
          />
          <Feature
            icon={<Users size={26} strokeWidth={1.5} className="text-indigo-600" />}
            title="Stronger Together"
            description="A community that supports you."
          />
        </div>
      </div>

      {/* Minimal Footer */}
      <footer className="bg-slate-100 py-8 border-t border-slate-200">
        <div className="max-w-7xl mx-auto px-6 flex flex-col md:flex-row justify-between items-center gap-4">
          <div className="flex items-center gap-3">
            <img
              src="/logo.svg"
              alt="CodeRa Logo"
              className="h-8 w-auto object-contain"
              onError={(event) => {
                const target = event.currentTarget;
                if (target.src.endsWith('/logo.svg')) {
                  target.src = '/logo.png';
                } else {
                  target.style.display = 'none';
                }
              }}
            />
            <span className="text-slate-500 text-sm font-medium">
              © 2026 CodeRa. All rights reserved.
            </span>
          </div>
          <div className="flex gap-6 text-slate-500 text-sm font-medium">
            <a href="#" className="hover:text-indigo-600 transition-colors duration-200">Privacy Policy</a>
            <a href="#" className="hover:text-indigo-600 transition-colors duration-200">Terms of Service</a>
            <a href="#" className="hover:text-indigo-600 transition-colors duration-200">Contact</a>
          </div>
        </div>
      </footer>
    </div>
  );
}

function Feature({
  icon,
  title,
  description,
}: {
  icon: React.ReactNode;
  title: string;
  description: string;
}) {
  return (
    <div className="flex items-center gap-4">
      <div className="text-slate-600">{icon}</div>
      <div>
        <p className="font-bold text-slate-900 text-sm mb-0.5">{title}</p>
        <p className="text-slate-500 text-xs">{description}</p>
      </div>
    </div>
  );
}

// ==================== POPUP LAYOUT WRAPPER ====================
function PopupLayout({
  children,
  onBack,
  onReturnHome,
  footerText,
  isBuilderTheme = true,
  dotsColor = '#E2E8F0',
  activeStep = 1,
  totalSteps = 2,
}: {
  children: React.ReactNode;
  onBack: () => void;
  onReturnHome?: () => void;
  footerText: string;
  isBuilderTheme?: boolean;
  dotsColor?: string;
  activeStep?: number;
  totalSteps?: number;
}) {
  const activeBgClass = isBuilderTheme ? 'bg-indigo-600' : 'bg-teal-600';
  const footerTextClass = isBuilderTheme ? 'text-indigo-600' : 'text-teal-600';

  return (
    <div className="min-h-screen bg-slate-100 flex items-center justify-center p-4 sm:p-8 font-sans">
      <div className="bg-white w-full max-w-[800px] rounded-3xl shadow-sm border border-slate-200 overflow-hidden flex flex-col animate-in zoom-in-95 duration-200 ease-in-out">
        
        {/* Header */}
        <div className="flex items-center justify-between p-8 pb-4 shrink-0 relative border-b border-slate-100">
          <button
            type="button"
            onClick={onBack}
            className="w-10 h-10 flex items-center justify-center rounded-full text-slate-700 hover:bg-slate-100 transition-colors duration-200 z-10 cursor-pointer focus:outline-none focus:ring-2 focus:ring-indigo-500"
            aria-label="Go back"
          >
            <ArrowLeft size={22} strokeWidth={2.5} />
          </button>

          <div className="absolute inset-0 flex items-center justify-center pointer-events-none">
            <div className="flex items-center gap-2 font-bold text-xl tracking-tight text-slate-900">
              <img
                src="/logo.svg"
                alt="CodeRa Logo"
                className="h-8 w-auto object-contain"
                onError={(event) => {
                  const target = event.currentTarget;
                  if (target.src.endsWith('/logo.svg')) {
                    target.src = '/logo.png';
                  } else {
                    target.style.display = 'none';
                    const fallback = document.getElementById('logo-fallback-2');
                    if (fallback) fallback.style.display = 'flex';
                  }
                }}
              />
              <div id="logo-fallback-2" className="hidden items-center gap-2">
                <Code2 size={24} className="text-indigo-600" />
                <span>CodeRa</span>
              </div>
            </div>
          </div>

          <div className="flex items-center gap-2 z-10">
            {Array.from({ length: totalSteps }).map((_, index) => (
              <div
                key={index}
                className={`h-2.5 rounded-full transition-all duration-200 ease-in-out ${
                  index + 1 === activeStep ? `${activeBgClass} w-7` : 'bg-slate-200 w-2'
                }`}
              />
            ))}
          </div>
        </div>

        {/* Content */}
        <div className="p-8 pt-6 flex-1 overflow-y-auto">{children}</div>

        {/* Footer */}
        <div className="border-t border-slate-100 p-5 text-center shrink-0 bg-slate-50">
          <p className={`text-xs font-extrabold tracking-wider uppercase ${footerTextClass}`}>
            {footerText}
          </p>
        </div>
      </div>
    </div>
  );
}

// ==================== BUILDER POPUP ====================
function BuilderPopup({
  onBack,
  onSelectCoder,
  onSelectGuide,
  onReturnHome,
}: {
  onBack: () => void;
  onSelectCoder: () => void;
  onSelectGuide: () => void;
  onReturnHome: () => void;
}) {
  return (
    <PopupLayout onBack={onBack} onReturnHome={onReturnHome} footerText="Builder Journey (Step 1)" isBuilderTheme={true}>
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-3">
          Are you a Parent or a Child?
        </h2>
        <p className="text-slate-600 text-base font-normal">
          Select your profile to start your custom CodeRa journey.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-center px-4">
        <SelectionCard
          image={IMAGES.coider}
          fallbackKey="coider"
          title="CODER"
          description="I'm here to learn, create & build."
          colorTheme="purple"
          bgTint="bg-indigo-50/50"
          delayClass=""
          onClick={onSelectCoder}
        />
        <SelectionCard
          image={IMAGES.codeGuide}
          fallbackKey="codeGuide"
          title="CODE GUIDE"
          description="I'm here to support, track & empower."
          colorTheme="teal"
          bgTint="bg-teal-50/50"
          delayClass=""
          onClick={onSelectGuide}
        />
      </div>
    </PopupLayout>
  );
}

// ==================== MENTOR POPUP ====================
function MentorPopup({
  onBack,
  onNavigate,
  onReturnHome,
}: {
  onBack: () => void;
  onNavigate: (screen: RoleJourneyScreen) => void;
  onReturnHome: () => void;
}) {
  return (
    <PopupLayout
      onBack={onBack}
      onReturnHome={onReturnHome}
      footerText="Mentor Journey (Step 1)"
      isBuilderTheme={false}
    >
      <div className="text-center mb-12">
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-3 leading-tight">
          How are you joining
          <br />
          <span className="text-teal-600">CodeRa</span>?
        </h2>
        <p className="text-slate-600 text-base font-normal mt-2">
          Choose your journey so we can serve you better.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-center max-w-[700px] mx-auto px-4">
        <IconSelectionCard
          icon={<User size={48} strokeWidth={2} />}
          title="INDIVIDUAL"
          description="My personal journey"
          colorTheme="teal"
          onClick={() => onNavigate('individual')}
          delayClass=""
        />
        <IconSelectionCard
          icon={<Building2 size={44} strokeWidth={2} />}
          title="ORGANIZATION"
          description="Our organization's journey"
          colorTheme="purple"
          onClick={() => onNavigate('organization')}
          delayClass=""
        />
      </div>
    </PopupLayout>
  );
}

// ==================== INDIVIDUAL POPUP ====================
function IndividualPopup({
  onBack,
  onNavigate,
  onReturnHome,
}: {
  onBack: () => void;
  onNavigate: (screen: RoleJourneyScreen) => void;
  onReturnHome: () => void;
}) {
  return (
    <PopupLayout
      onBack={onBack}
      onReturnHome={onReturnHome}
      footerText="Individual Journey (Step 2)"
      isBuilderTheme={false}
      activeStep={2}
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-3">
          What brings you to <span className="text-indigo-600">CodeRa</span>?
        </h2>
        <p className="text-slate-600 text-base font-normal">
          Tell us more about your background.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-center px-4">
        <SelectionCard
          image={IMAGES.programmer}
          fallbackKey="programmer"
          title="PROGRAMMER"
          description="I'm a programmer and I want to learn how to code for inclusion."
          colorTheme="purple"
          delayClass=""
          onClick={() => {
            onNavigate('course-programmer');
          }}
        />
        <SelectionCard
          image={IMAGES.teacher}
          fallbackKey="specialEd"
          title="SPECIAL EDUCATION TEACHER"
          description="I work with learners with special needs and want to learn coding."
          colorTheme="teal"
          delayClass=""
          onClick={() => {
            onNavigate('course-teacher');
          }}
        />
      </div>
    </PopupLayout>
  );
}

// ==================== COURSE PROGRAMMER POPUP ====================
function CourseProgrammerPopup({
  onBack,
  onReturnHome,
  showToast,
}: {
  onBack: () => void;
  onReturnHome: () => void;
  showToast: (message: string) => void;
}) {
  const handleBookNow = () => {
    showToast('🎉 Opening Special Education Trainer Course booking form...');
    setTimeout(() => {
      onReturnHome();
      if (typeof (window as any).openInstitutionModal === 'function') {
        (window as any).openInstitutionModal('Special Education Trainer Course');
      }
    }, 600);
  };

  return (
    <PopupLayout
      onBack={onBack}
      onReturnHome={onReturnHome}
      footerText="Course Booking (Step 3)"
      isBuilderTheme={true}
      activeStep={3}
      totalSteps={3}
    >
      <div className="text-center max-w-xl mx-auto py-4">
        <div className="w-20 h-20 rounded-3xl bg-indigo-50 text-indigo-600 border border-indigo-100 flex items-center justify-center mx-auto mb-6 text-3xl shadow-sm">
          <GraduationCap size={40} />
        </div>
        <span className="inline-block px-3.5 py-1 bg-indigo-100 text-indigo-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          Specialized Certification Course
        </span>
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4 leading-tight">
          Special Education Trainer Course
        </h2>
        <p className="text-slate-600 text-base font-normal leading-relaxed mb-8">
          Comprehensive practical training for programmers and tech specialists to master inclusive education, SEN communication, adaptive coding tools, and digital accessibility strategies.
        </p>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-left mb-8 space-y-3">
          <div className="flex items-center gap-3 text-sm font-bold text-slate-800">
            <CheckCircle2 size={18} className="text-indigo-600 shrink-0" />
            <span>Inclusive Instructional Design &amp; SEN Methodologies</span>
          </div>
          <div className="flex items-center gap-3 text-sm font-bold text-slate-800">
            <CheckCircle2 size={18} className="text-indigo-600 shrink-0" />
            <span>Hands-on Assistive Technology &amp; Visual Coding Blocks</span>
          </div>
          <div className="flex items-center gap-3 text-sm font-bold text-slate-800">
            <CheckCircle2 size={18} className="text-indigo-600 shrink-0" />
            <span>Official CodeRa SEN Trainer Accreditation Certificate</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleBookNow}
          className="w-full py-4 bg-indigo-600 hover:bg-indigo-700 text-white font-extrabold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
        >
          <span>Book Now</span>
          <ArrowRight size={22} />
        </button>
      </div>
    </PopupLayout>
  );
}

// ==================== COURSE TEACHER POPUP ====================
function CourseTeacherPopup({
  onBack,
  onReturnHome,
  showToast,
}: {
  onBack: () => void;
  onReturnHome: () => void;
  showToast: (message: string) => void;
}) {
  const handleBookNow = () => {
    showToast('🎉 Opening Special Needs Programming Course booking form...');
    setTimeout(() => {
      onReturnHome();
      if (typeof (window as any).openInstitutionModal === 'function') {
        (window as any).openInstitutionModal('Programming Training for Special Needs Students Course');
      }
    }, 600);
  };

  return (
    <PopupLayout
      onBack={onBack}
      onReturnHome={onReturnHome}
      footerText="Course Booking (Step 3)"
      isBuilderTheme={false}
      activeStep={3}
      totalSteps={3}
    >
      <div className="text-center max-w-xl mx-auto py-4">
        <div className="w-20 h-20 rounded-3xl bg-teal-50 text-teal-600 border border-teal-100 flex items-center justify-center mx-auto mb-6 text-3xl shadow-sm">
          <Code2 size={40} />
        </div>
        <span className="inline-block px-3.5 py-1 bg-teal-100 text-teal-700 rounded-full text-xs font-bold uppercase tracking-wider mb-3">
          Teacher Professional Development
        </span>
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-4 leading-tight">
          Programming/Coding Training for Special Needs Students Course
        </h2>
        <p className="text-slate-600 text-base font-normal leading-relaxed mb-8">
          Designed specifically for special education educators and therapists to easily integrate tactile robotics, block programming, visual logic games, and STEM readiness into daily learning plans.
        </p>

        <div className="bg-slate-50 rounded-2xl p-6 border border-slate-200 text-left mb-8 space-y-3">
          <div className="flex items-center gap-3 text-sm font-bold text-slate-800">
            <CheckCircle2 size={18} className="text-teal-600 shrink-0" />
            <span>Zero-Prior-Coding Beginner Classroom Toolkits</span>
          </div>
          <div className="flex items-center gap-3 text-sm font-bold text-slate-800">
            <CheckCircle2 size={18} className="text-teal-600 shrink-0" />
            <span>Tactile &amp; Sensory Robotics for Autism, ADHD &amp; SEN Learners</span>
          </div>
          <div className="flex items-center gap-3 text-sm font-bold text-slate-800">
            <CheckCircle2 size={18} className="text-teal-600 shrink-0" />
            <span>Certified Special Education STEM Educator Badge</span>
          </div>
        </div>

        <button
          type="button"
          onClick={handleBookNow}
          className="w-full py-4 bg-teal-600 hover:bg-teal-700 text-white font-extrabold text-lg rounded-2xl shadow-lg hover:shadow-xl transition-all cursor-pointer transform hover:-translate-y-0.5 flex items-center justify-center gap-3"
        >
          <span>Book Now</span>
          <ArrowRight size={22} />
        </button>
      </div>
    </PopupLayout>
  );
}

// ==================== ORGANIZATION POPUP ====================
function OrganizationPopup({
  onBack,
  onReturnHome,
}: {
  onBack: () => void;
  onReturnHome: () => void;
}) {
  return (
    <PopupLayout
      onBack={onBack}
      onReturnHome={onReturnHome}
      footerText="Organization Journey (Step 2)"
      isBuilderTheme={true}
      activeStep={2}
    >
      <div className="text-center mb-10">
        <h2 className="text-3xl font-serif font-bold text-slate-900 mb-3 leading-tight">
          What does your
          <br />
          <span className="text-teal-600">organization</span> do?
        </h2>
        <p className="text-slate-600 text-base font-normal">
          Select your institution type to submit your application.
        </p>
      </div>

      <div className="flex flex-col md:flex-row gap-6 justify-center px-4">
        <SelectionCard
          image={IMAGES.school}
          fallbackKey="school"
          title="SCHOOL"
          description="We want to bring inclusive coding to our students."
          colorTheme="teal"
          iconTopLeft={<GraduationCap size={16} strokeWidth={2.5} />}
          delayClass=""
          onClick={() => {
            onReturnHome();
            if (typeof (window as any).openInstitutionModal === 'function') {
              (window as any).openInstitutionModal('School');
            }
          }}
        />
        <SelectionCard
          image={IMAGES.center}
          fallbackKey="center"
          title="SPECIALIZED CENTER"
          description="We support learners with special educational needs."
          colorTheme="purple"
          iconTopLeft={<Heart size={16} strokeWidth={2.5} fill="currentColor" />}
          delayClass=""
          onClick={() => {
            onReturnHome();
            if (typeof (window as any).openInstitutionModal === 'function') {
              (window as any).openInstitutionModal('Specialized Center');
            }
          }}
        />
      </div>
    </PopupLayout>
  );
}

// ==================== SELECTION CARD COMPONENT ====================
interface SelectionCardProps {
  image: string;
  fallbackKey: FallbackKey;
  title: string;
  description: string;
  colorTheme: 'purple' | 'teal';
  bgTint?: string;
  iconTopLeft?: React.ReactNode;
  onClick: () => void;
  delayClass?: string;
}

function SelectionCard({
  image,
  fallbackKey,
  title,
  description,
  colorTheme,
  bgTint = 'bg-white',
  iconTopLeft,
  onClick,
  delayClass = '',
}: SelectionCardProps) {
  const isPurple = colorTheme === 'purple';
  const textClass = isPurple ? 'text-indigo-600' : 'text-teal-600';
  const btnClass = isPurple ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-teal-600 hover:bg-teal-700';
  const iconBgColor = isPurple ? 'bg-indigo-50 text-indigo-600 border border-indigo-200' : 'bg-teal-50 text-teal-600 border border-teal-200';

  return (
    <div
      onClick={onClick}
      className={`flex-1 w-full max-w-sm ${bgTint} rounded-3xl border border-slate-200 p-3.5 pb-6 text-center flex flex-col items-center group cursor-pointer transition-all duration-200 ease-in-out shadow-sm hover:shadow-md hover:-translate-y-1 ${delayClass}`}
    >
      <div className="w-full h-[180px] rounded-2xl overflow-hidden mb-6 relative bg-slate-100 shrink-0 flex items-center justify-center border border-slate-200">
        <ImageWithFallback
          src={image}
          fallbackKey={fallbackKey}
          alt={title}
          className="w-full h-full object-cover group-hover:scale-105 transition-transform duration-300 ease-in-out"
        />
        {iconTopLeft && (
          <div 
            className={`${iconBgColor} absolute top-4 left-4 w-9 h-9 rounded-full flex items-center justify-center shadow-sm`}
          >
            {iconTopLeft}
          </div>
        )}
      </div>

      <h3 className={`${textClass} text-base font-bold mb-2 tracking-wider uppercase`}>
        {title}
      </h3>
      <p className="text-slate-600 text-sm px-4 mb-6 flex-1 leading-relaxed min-h-[48px] flex items-center justify-center font-medium">
        {description}
      </p>

      <div className={`${btnClass} text-white w-12 h-12 rounded-full flex items-center justify-center group-hover:scale-105 transition-all duration-200 ease-in-out shrink-0 shadow-sm`}>
        <ArrowRight size={20} strokeWidth={2.5} />
      </div>
    </div>
  );
}

// ==================== ICON SELECTION CARD COMPONENT ====================
interface IconSelectionCardProps {
  icon: React.ReactNode;
  title: string;
  description: string;
  colorTheme: 'purple' | 'teal';
  onClick: () => void;
  delayClass?: string;
}

function IconSelectionCard({
  icon,
  title,
  description,
  colorTheme,
  onClick,
  delayClass = '',
}: IconSelectionCardProps) {
  const isPurple = colorTheme === 'purple';
  const textClass = isPurple ? 'text-indigo-600' : 'text-teal-600';
  const btnClass = isPurple ? 'bg-indigo-600 hover:bg-indigo-700' : 'bg-teal-600 hover:bg-teal-700';

  return (
    <div
      onClick={onClick}
      className={`flex-1 bg-white rounded-3xl border border-slate-200 p-8 text-center flex flex-col items-center justify-between group cursor-pointer transition-all duration-200 ease-in-out hover:shadow-md hover:-translate-y-1 min-h-[320px] shadow-sm ${delayClass}`}
    >
      <div className={`${btnClass} text-white w-24 h-24 rounded-full flex items-center justify-center mb-6 shadow-sm`}>
        {icon}
      </div>
      <div>
        <h3 className={`${textClass} text-sm font-bold mb-3 tracking-widest uppercase`}>
          {title}
        </h3>
        <p className="text-slate-600 font-medium text-base mb-8">
          {description}
        </p>
      </div>
      <div className={`${btnClass} text-white w-11 h-11 rounded-full flex items-center justify-center group-hover:scale-105 transition-all duration-200 ease-in-out shadow-sm`}>
        <ArrowRight size={20} strokeWidth={2.5} />
      </div>
    </div>
  );
}
