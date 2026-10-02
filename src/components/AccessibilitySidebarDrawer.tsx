import React, { useState, useEffect, useRef } from 'react';
import { useMockData } from '../context/MockDataContext';
import { translations } from '../context/translations';
import {
  Eye,
  Type,
  Volume2,
  Hand,
  RotateCcw,
  X,
  Sparkles,
  Sliders,
  Check,
  VolumeX,
  Maximize2,
  BookOpen,
  MousePointer,
  Crosshair,
  ListTree,
  Contrast,
  ImageOff,
  PauseCircle,
  PlayCircle,
  StopCircle,
  Settings,
  Users,
  Layers,
  AlignLeft,
  AlignCenter,
  AlignRight,
  AlignJustify,
  MoveHorizontal,
  ChevronDown,
  ChevronUp,
  Compass,
  FileText,
  Speech,
  HelpCircle,
  CheckCircle2,
} from 'lucide-react';

export const AccessibilitySidebarDrawer: React.FC = () => {
  const {
    lang,
    setLang,
    highContrast,
    toggleHighContrast,
    fontSize,
    setFontSize,
    screenReaderHints,
    toggleScreenReaderHints,
    signLanguageAssistance,
    toggleSignLanguageAssistance,
  } = useMockData();

  const [isOpen, setIsOpen] = useState(false);

  // Accordion section open states
  const [openSections, setOpenSections] = useState<{ [key: string]: boolean }>({
    profiles: true,
    navAudio: true,
    reading: false,
    textForm: true,
    visuals: true,
    settings: false,
  });

  const toggleSection = (key: string) => {
    setOpenSections((prev) => ({
      ...prev,
      [key]: !prev[key],
    }));
  };

  // 1. Accessibility Profiles
  const [activeProfile, setActiveProfile] = useState<string>('Normal');

  // 2. Navigation & Audio Tools
  const [screenReaderSpeed, setScreenReaderSpeed] = useState<number>(1.0); // 0.5 to 2.0
  const [cursorStyle, setCursorStyle] = useState<'default' | 'large-black' | 'large-white'>('default');
  const [focusRing, setFocusRing] = useState(false);
  const [showStructureInspector, setShowStructureInspector] = useState(false);

  // TTS State
  const [isSpeaking, setIsSpeaking] = useState(false);
  const [isPaused, setIsPaused] = useState(false);
  const [currentSpokenText, setCurrentSpokenText] = useState<string>('');
  const [ttsHoverMode, setTtsHoverMode] = useState(false);

  // 3. Reading Tools
  const [tooltipSize, setTooltipSize] = useState<'standard' | 'large' | 'xlarge'>('standard');
  const [readingGuide, setReadingGuide] = useState(false);
  const [lineGuideY, setLineGuideY] = useState(300);
  const [readingMask, setReadingMask] = useState(false);
  const [maskY, setMaskY] = useState(300);

  // 4. Text & Form (Typography Scaling up to 200%)
  const [fontScalePercent, setFontScalePercent] = useState<number>(100); // 100% to 200%
  const [fontFamily, setFontFamily] = useState<'default' | 'cairo' | 'inter' | 'dyslexic'>('default');
  const [lineHeightStep, setLineHeightStep] = useState(0); // 0 to 3
  const [letterSpacingStep, setLetterSpacingStep] = useState(0); // 0 to 3
  const [textAlign, setTextAlign] = useState<'left' | 'center' | 'right' | 'justify'>('left');

  // 5. Visuals & Colorblind Profiles
  const [colorblindFilter, setColorblindFilter] = useState<'none' | 'protanopia' | 'deuteranopia' | 'tritanopia' | 'achromatopsia'>('none');
  const [contrastMode, setContrastMode] = useState<'normal' | 'hc-dark' | 'hc-light' | 'invert'>('normal');
  const [saturation, setSaturation] = useState<'none' | 'low' | 'normal' | 'high'>('normal');
  const [hideImages, setHideImages] = useState(false);
  const [stopAnimations, setStopAnimations] = useState(false);

  // 6. Sidebar Settings
  const [sidebarSize, setSidebarSize] = useState<number>(3); // 1 to 5
  const [sidebarPosition, setSidebarPosition] = useState<'right' | 'left'>('right');
  const [isSidebarHidden, setIsSidebarHidden] = useState(false);

  const t = translations[lang];

  // Open drawer via keyboard shortcut Alt+A or global window event
  useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'a' || e.key === 'A')) {
        e.preventDefault();
        setIsOpen((prev) => !prev);
      }
    };
    const handleOpen = () => setIsOpen(true);

    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-accessibility-drawer', handleOpen);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-accessibility-drawer', handleOpen);
    };
  }, []);

  // Apply Real-time Typography Scaling (up to 200%) to Document Root
  useEffect(() => {
    const scale = fontScalePercent / 100;
    document.documentElement.style.setProperty('--app-font-scale', `${scale}`);
    document.documentElement.style.fontSize = `${scale * 100}%`;
  }, [fontScalePercent]);

  // Apply Real-time Styles to Document Root / Body
  useEffect(() => {
    const root = document.documentElement;
    const body = document.body;

    // Stop Animations (Reduced Motion)
    if (stopAnimations) {
      root.classList.add('stop-animations');
      body.classList.add('stop-animations');
    } else {
      root.classList.remove('stop-animations');
      body.classList.remove('stop-animations');
    }

    // Hide Images
    if (hideImages) {
      root.classList.add('hide-images-mode');
      body.classList.add('hide-images-mode');
    } else {
      root.classList.remove('hide-images-mode');
      body.classList.remove('hide-images-mode');
    }

    // Keyboard Focus Ring
    if (focusRing) {
      root.classList.add('accessibility-focus-ring');
      body.classList.add('accessibility-focus-ring');
    } else {
      root.classList.remove('accessibility-focus-ring');
      body.classList.remove('accessibility-focus-ring');
    }

    // Large Cursor
    body.classList.remove('cursor-large-black', 'cursor-large-white');
    if (cursorStyle === 'large-black') body.classList.add('cursor-large-black');
    if (cursorStyle === 'large-white') body.classList.add('cursor-large-white');

    // Colorblind Filters
    root.classList.remove('cb-protanopia', 'cb-deuteranopia', 'cb-tritanopia', 'cb-achromatopsia');
    if (colorblindFilter === 'protanopia') root.classList.add('cb-protanopia');
    if (colorblindFilter === 'deuteranopia') root.classList.add('cb-deuteranopia');
    if (colorblindFilter === 'tritanopia') root.classList.add('cb-tritanopia');
    if (colorblindFilter === 'achromatopsia') root.classList.add('cb-achromatopsia');

    // High Contrast Dark / Light Modes
    root.classList.remove('hc-dark', 'hc-light');
    if (contrastMode === 'hc-dark') root.classList.add('hc-dark');
    if (contrastMode === 'hc-light') root.classList.add('hc-light');

    // Saturation & Inversion Filters
    let filterStr = '';
    if (saturation === 'none') filterStr += ' grayscale(100%)';
    if (saturation === 'low') filterStr += ' saturate(50%)';
    if (saturation === 'high') filterStr += ' saturate(200%)';
    if (contrastMode === 'invert') filterStr += ' invert(100%) hue-rotate(180deg)';

    body.style.filter = filterStr.trim();

    // Font Family
    if (fontFamily === 'dyslexic') {
      body.style.fontFamily = 'Comic Sans MS, Trebuchet MS, sans-serif';
    } else if (fontFamily === 'cairo') {
      body.style.fontFamily = 'Cairo, sans-serif';
    } else if (fontFamily === 'inter') {
      body.style.fontFamily = 'Inter, sans-serif';
    } else {
      body.style.fontFamily = '';
    }

    // Text Alignment
    body.style.textAlign = textAlign === 'left' ? '' : textAlign;

    // Letter Spacing & Line Height
    body.style.letterSpacing = letterSpacingStep > 0 ? `${letterSpacingStep * 1.5}px` : '';
    body.style.lineHeight = lineHeightStep > 0 ? `${1.5 + lineHeightStep * 0.25}` : '';
  }, [
    stopAnimations,
    hideImages,
    focusRing,
    cursorStyle,
    colorblindFilter,
    contrastMode,
    saturation,
    fontFamily,
    textAlign,
    letterSpacingStep,
    lineHeightStep,
  ]);

  // Screen Reader Speech Synthesis (TTS Voice Narration Engine)
  const speakText = (text: string) => {
    if (!('speechSynthesis' in window)) return;
    window.speechSynthesis.cancel();
    if (!text.trim()) return;

    const utterance = new SpeechSynthesisUtterance(text);
    utterance.lang = lang === 'ar' ? 'ar-SA' : 'en-US';
    utterance.rate = screenReaderSpeed;

    utterance.onstart = () => {
      setIsSpeaking(true);
      setIsPaused(false);
      setCurrentSpokenText(text.length > 80 ? text.slice(0, 80) + '...' : text);
    };

    utterance.onend = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentSpokenText('');
    };

    utterance.onerror = () => {
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentSpokenText('');
    };

    window.speechSynthesis.speak(utterance);
  };

  const pauseSpeech = () => {
    if ('speechSynthesis' in window && isSpeaking) {
      window.speechSynthesis.pause();
      setIsPaused(true);
    }
  };

  const resumeSpeech = () => {
    if ('speechSynthesis' in window && isPaused) {
      window.speechSynthesis.resume();
      setIsPaused(false);
    }
  };

  const stopSpeech = () => {
    if ('speechSynthesis' in window) {
      window.speechSynthesis.cancel();
      setIsSpeaking(false);
      setIsPaused(false);
      setCurrentSpokenText('');
    }
  };

  // Read Current Page Aloud
  const readPageAloud = () => {
    const mainEl = document.querySelector('main') || document.body;
    const readableElements = mainEl.querySelectorAll('h1, h2, h3, p, [role="heading"]');
    const texts: string[] = [];
    readableElements.forEach((el) => {
      const txt = (el as HTMLElement).innerText?.trim();
      if (txt && txt.length > 2 && !txt.includes('CodeRa Student') && !txt.includes('← Back')) {
        texts.push(txt);
      }
    });

    const fullText = texts.slice(0, 8).join('. ');
    if (fullText) {
      speakText(fullText);
    } else {
      speakText(
        lang === 'ar'
          ? 'أهلاً بك في منصة كوديرا للتعلم التكيفي. المنصة مهيأة بنظام الإتاحة الشامل لجميع الطلاب.'
          : 'Welcome to CodeRa Adaptive Learning. All modules and portals are fully accessible.'
      );
    }
  };

  // Click & Hover-to-Speak Listener
  useEffect(() => {
    if (!ttsHoverMode) return;

    const handleMouseOver = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (
        !target ||
        target.closest('#accessibility-sidebar') ||
        target.closest('#accessibility-fab') ||
        target.closest('#tts-live-bar')
      ) {
        return;
      }

      const textToRead = target.getAttribute('aria-label') || target.innerText?.trim() || target.getAttribute('title');
      if (textToRead && textToRead.length > 0 && textToRead.length < 250) {
        target.classList.add('tts-hover-speaking');
        speakText(textToRead);
      }
    };

    const handleMouseOut = (e: MouseEvent) => {
      const target = e.target as HTMLElement;
      if (target) target.classList.remove('tts-hover-speaking');
    };

    document.addEventListener('mouseover', handleMouseOver);
    document.addEventListener('mouseout', handleMouseOut);
    return () => {
      document.removeEventListener('mouseover', handleMouseOver);
      document.removeEventListener('mouseout', handleMouseOut);
    };
  }, [ttsHoverMode, screenReaderSpeed, lang]);

  // Handle Preset Profiles
  const applyProfile = (profileName: string) => {
    setActiveProfile(profileName);
    switch (profileName) {
      case 'Motor Impairment':
        setCursorStyle('large-white');
        setFocusRing(true);
        setStopAnimations(true);
        break;
      case 'Blindness':
        if (!screenReaderHints) toggleScreenReaderHints();
        setScreenReaderSpeed(1.0);
        setFocusRing(true);
        setTtsHoverMode(true);
        speakText(lang === 'ar' ? 'تم تفعيل ملف المكفوفين وقارئ الشاشة' : 'Blindness accessibility profile active');
        break;
      case 'Colorblindness (Protanopia)':
        setColorblindFilter('protanopia');
        break;
      case 'Colorblindness (Deuteranopia)':
        setColorblindFilter('deuteranopia');
        break;
      case 'Colorblindness (Tritanopia)':
        setColorblindFilter('tritanopia');
        break;
      case 'Achromatopsia (Monochrome)':
        setColorblindFilter('achromatopsia');
        break;
      case 'High Contrast (Dark)':
        setContrastMode('hc-dark');
        break;
      case 'High Contrast (Light)':
        setContrastMode('hc-light');
        break;
      case 'Visual Impairment':
        setFontScalePercent(150);
        setCursorStyle('large-black');
        setFocusRing(true);
        break;
      case 'Cognitive Disability':
        setReadingGuide(true);
        setStopAnimations(true);
        setHideImages(false);
        break;
      case 'Seizures & Epilepsy':
        setStopAnimations(true);
        setSaturation('low');
        break;
      case 'Dyslexia':
        setFontFamily('dyslexic');
        setReadingGuide(true);
        setLetterSpacingStep(2);
        setLineHeightStep(1);
        break;
      case 'ADHD':
        setReadingMask(true);
        setStopAnimations(true);
        break;
      case 'Normal':
      default:
        resetAll();
        break;
    }
  };

  const resetAll = () => {
    setActiveProfile('Normal');
    if (highContrast) toggleHighContrast();
    setFontSize('normal');
    setFontScalePercent(100);
    if (screenReaderHints) toggleScreenReaderHints();
    if (signLanguageAssistance) toggleSignLanguageAssistance();
    setReadingGuide(false);
    setReadingMask(false);
    setCursorStyle('default');
    setFocusRing(false);
    setShowStructureInspector(false);
    setFontFamily('default');
    setLineHeightStep(0);
    setLetterSpacingStep(0);
    setTextAlign('left');
    setSaturation('normal');
    setContrastMode('normal');
    setColorblindFilter('none');
    setHideImages(false);
    setStopAnimations(false);
    setTtsHoverMode(false);
    stopSpeech();

    document.documentElement.style.setProperty('--app-font-scale', '1');
    document.documentElement.style.fontSize = '';
    document.body.style.filter = '';
    document.body.style.letterSpacing = '';
    document.body.style.lineHeight = '';
    document.body.style.fontFamily = '';
    document.body.style.textAlign = '';
  };

  if (isSidebarHidden) {
    return (
      <button
        type="button"
        id="accessibility-restore-btn"
        onClick={() => setIsSidebarHidden(false)}
        className="fixed bottom-2 end-2 z-[9999] text-[10px] font-mono px-3 py-1.5 rounded-full bg-black/80 backdrop-blur-md text-white border border-white/20 shadow-lg cursor-pointer"
        aria-label="Restore Accessibility Menu"
      >
        Universal A11y (Alt+A)
      </button>
    );
  }

  const widthClasses = [
    'w-72 sm:w-80',
    'w-80 sm:w-88',
    'w-84 sm:w-96',
    'w-96 sm:w-[28rem]',
    'w-full sm:w-[32rem]',
  ][sidebarSize - 1] || 'w-84 sm:w-96';

  const positionClass = sidebarPosition === 'left' ? 'start-0 border-e' : 'end-0 border-s';

  const isA11yActive =
    activeProfile !== 'Normal' ||
    highContrast ||
    fontScalePercent > 100 ||
    screenReaderHints ||
    signLanguageAssistance ||
    readingGuide ||
    readingMask ||
    focusRing ||
    colorblindFilter !== 'none' ||
    contrastMode !== 'normal' ||
    cursorStyle !== 'default' ||
    stopAnimations ||
    hideImages ||
    ttsHoverMode;

  return (
    <>
      {/* ========================================================================= */}
      {/* COLORBLIND MATRIX SVG FILTERS DEFINITION                                   */}
      {/* ========================================================================= */}
      <svg style={{ position: 'absolute', width: 0, height: 0, overflow: 'hidden' }} aria-hidden="true">
        <defs>
          <filter id="protanopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.567, 0.433, 0, 0, 0   0.558, 0.442, 0, 0, 0   0, 0.242, 0.758, 0, 0   0, 0, 0, 1, 0"
            />
          </filter>
          <filter id="deuteranopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.625, 0.375, 0, 0, 0   0.7, 0.3, 0, 0, 0   0, 0.3, 0.7, 0, 0   0, 0, 0, 1, 0"
            />
          </filter>
          <filter id="tritanopia-filter">
            <feColorMatrix
              type="matrix"
              values="0.95, 0.05, 0, 0, 0   0, 0.433, 0.567, 0, 0   0, 0.475, 0.525, 0, 0   0, 0, 0, 1, 0"
            />
          </filter>
        </defs>
      </svg>

      {/* ========================================================================= */}
      {/* FLOATING ACTION BUTTON (FAB) — Accessible on All Pages                     */}
      {/* ========================================================================= */}
      <div id="accessibility-fab" className={`fixed bottom-6 ${sidebarPosition === 'left' ? 'start-6' : 'end-6'} z-[9999]`}>
        <button
          type="button"
          onClick={() => setIsOpen(!isOpen)}
          className="group relative w-14 h-14 rounded-full flex items-center justify-center text-white shadow-2xl transition-all duration-300 hover:scale-110 active:scale-95 cursor-pointer"
          style={{
            backgroundColor: 'var(--color-primary-green, #0D8068)',
            boxShadow: '0 10px 30px rgba(13, 128, 104, 0.55)',
          }}
          aria-label={lang === 'ar' ? 'خيارات الإتاحة وسهولة النفاذ (Alt+A)' : 'Universal Accessibility Menu (Alt+A)'}
          title={lang === 'ar' ? 'خيارات الإتاحة وسهولة النفاذ (Alt+A)' : 'Universal Accessibility Menu (Alt+A)'}
        >
          {/* Universal Accessibility Figure */}
          <svg className="w-7 h-7 shrink-0 transition-transform duration-200 group-hover:scale-105" viewBox="0 0 24 24" fill="none">
            <circle cx="12" cy="4" r="2.2" fill="currentColor" />
            <path d="M3.5 10C5.5 8.2 8 7.5 12 7.5C16 7.5 18.5 8.2 20.5 10" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
            <path d="M9.5 8.5C9 11 8.8 13.5 9 16.5H15C15.2 13.5 15 11 14.5 8.5" fill="currentColor" opacity="0.9" />
            <path d="M10 16.5V21M14 16.5V21" stroke="currentColor" strokeWidth="2.2" strokeLinecap="round" />
          </svg>

          {/* Active Preset Indicator */}
          {isA11yActive && (
            <span className="w-3.5 h-3.5 rounded-full bg-amber-400 ring-2 ring-white absolute top-0 end-0 animate-pulse" />
          )}
        </button>
      </div>

      {/* ========================================================================= */}
      {/* FLOATING TTS ACTIVE SPEECH BAR                                             */}
      {/* ========================================================================= */}
      {isSpeaking && (
        <div
          id="tts-live-bar"
          className="fixed bottom-24 start-1/2 -translate-x-1/2 z-[9999] px-4 py-2.5 rounded-full bg-slate-900/95 backdrop-blur-md border border-cyan-500/50 shadow-2xl text-white flex items-center gap-3 text-xs animate-in slide-in-from-bottom-4"
        >
          <div className="flex items-center gap-1.5 text-cyan-400 font-bold">
            <Speech className="w-4 h-4 animate-bounce" />
            <span>Reading Aloud ({screenReaderSpeed}x):</span>
          </div>
          <span className="font-mono text-slate-300 max-w-xs truncate">{currentSpokenText}</span>

          <div className="flex items-center gap-1 ms-2 border-s border-slate-700 ps-2">
            {!isPaused ? (
              <button
                type="button"
                onClick={pauseSpeech}
                className="p-1 rounded-lg hover:bg-slate-800 text-slate-300 hover:text-white"
                title="Pause"
              >
                <PauseCircle className="w-4 h-4" />
              </button>
            ) : (
              <button
                type="button"
                onClick={resumeSpeech}
                className="p-1 rounded-lg hover:bg-slate-800 text-emerald-400"
                title="Resume"
              >
                <PlayCircle className="w-4 h-4" />
              </button>
            )}
            <button
              type="button"
              onClick={stopSpeech}
              className="p-1 rounded-lg hover:bg-slate-800 text-rose-400"
              title="Stop"
            >
              <StopCircle className="w-4 h-4" />
            </button>
          </div>
        </div>
      )}

      {/* Backdrop overlay */}
      {isOpen && (
        <div
          onClick={() => setIsOpen(false)}
          className="fixed inset-0 bg-black/40 backdrop-blur-xs z-[9998] transition-opacity duration-300"
        />
      )}

      {/* ========================================================================= */}
      {/* ACCESSIBILITY SIDEBAR DRAWER PANEL                                        */}
      {/* ========================================================================= */}
      <aside
        id="accessibility-sidebar"
        aria-label="Universal Accessibility Panel"
        className={`fixed top-0 bottom-0 ${positionClass} ${widthClasses} z-[9999] shadow-2xl flex flex-col transition-all duration-300 overflow-hidden ${
          isOpen ? 'translate-x-0' : sidebarPosition === 'left' ? '-translate-x-full' : 'translate-x-full'
        }`}
        style={{
          backgroundColor: 'var(--color-surface, #ffffff)',
          borderColor: 'var(--color-border, #e2e8f0)',
          color: 'var(--color-text, #0f172a)',
        }}
      >
        {/* Header */}
        <div
          className="p-4 border-b flex items-center justify-between shrink-0"
          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}
        >
          <div className="flex items-center gap-2.5">
            <div className="w-8 h-8 rounded-xl bg-emerald-600 text-white flex items-center justify-center shadow-sm">
              <Sparkles className="w-4 h-4" />
            </div>
            <div>
              <h2 className="font-bold text-sm leading-tight">
                {lang === 'ar' ? 'إعدادات الإتاحة وسهولة النفاذ' : 'Universal Accessibility'}
              </h2>
              <span className="text-[10px] text-slate-500 font-mono">CodeRa Inclusive Engine (Alt+A)</span>
            </div>
          </div>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="p-1.5 rounded-xl hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer transition-colors"
            aria-label="Close"
          >
            <X className="w-5 h-5" />
          </button>
        </div>

        {/* Drawer Content */}
        <div className="flex-1 overflow-y-auto divide-y text-start scrollbar-thin" style={{ borderColor: 'var(--color-border)' }}>
          {/* ========================================================================= */}
          {/* ACCORDION 1: PROFILES                                                     */}
          {/* ========================================================================= */}
          <div className="p-4 space-y-3">
            <button
              type="button"
              onClick={() => toggleSection('profiles')}
              className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider py-1 cursor-pointer"
              style={{ color: 'var(--color-text)' }}
            >
              <div className="flex items-center gap-2">
                <Sliders className="w-4 h-4 text-emerald-600" />
                <span>1. {lang === 'ar' ? 'ملفات الإتاحة والتباين الجاهزة' : 'Accessibility Profiles'}</span>
              </div>
              {openSections.profiles ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {openSections.profiles && (
              <div className="grid grid-cols-2 gap-2 pt-2 animate-in fade-in">
                {[
                  { name: 'Normal', labelAr: 'الوضع الطبيعي', icon: Sparkles },
                  { name: 'Blindness', labelAr: 'كفيف (قارئ الشاشة)', icon: Eye },
                  { name: 'Motor Impairment', labelAr: 'إعاقة حركية', icon: Hand },
                  { name: 'Colorblindness (Protanopia)', labelAr: 'عمى الأحمر (Protanopia)', icon: Contrast },
                  { name: 'Colorblindness (Deuteranopia)', labelAr: 'عمى الأخضر (Deuteranopia)', icon: Contrast },
                  { name: 'Colorblindness (Tritanopia)', labelAr: 'عمى الأزرق (Tritanopia)', icon: Contrast },
                  { name: 'Achromatopsia (Monochrome)', labelAr: 'أحادي اللون (Achromatopsia)', icon: Contrast },
                  { name: 'High Contrast (Dark)', labelAr: 'تباين عالي (داكن)', icon: Contrast },
                  { name: 'High Contrast (Light)', labelAr: 'تباين عالي (فاتح)', icon: Contrast },
                  { name: 'Visual Impairment', labelAr: 'ضعف بصر (خط 150%)', icon: Maximize2 },
                  { name: 'Dyslexia', labelAr: 'عسر القراءة (Dyslexia)', icon: Type },
                  { name: 'Cognitive Disability', labelAr: 'إعاقة إدراكية', icon: BookOpen },
                  { name: 'Seizures & Epilepsy', labelAr: 'صرع وحساسية وميض', icon: PauseCircle },
                  { name: 'ADHD', labelAr: 'تشتت انتباه وتركيز', icon: Crosshair },
                ].map((p) => {
                  const Icon = p.icon;
                  const isSelected = activeProfile === p.name;
                  return (
                    <button
                      key={p.name}
                      type="button"
                      onClick={() => applyProfile(p.name)}
                      className={`p-2.5 rounded-2xl border text-start flex flex-col justify-between gap-1.5 transition-all cursor-pointer ${
                        isSelected
                          ? 'border-blue-600 bg-blue-50/80 dark:bg-blue-950/60 shadow-xs ring-1 ring-blue-500'
                          : 'hover:bg-slate-100 dark:hover:bg-slate-800/60'
                      }`}
                      style={{
                        borderColor: isSelected ? 'var(--color-primary-blue)' : 'var(--color-border)',
                      }}
                    >
                      <div className="flex items-center justify-between w-full">
                        <Icon className={`w-3.5 h-3.5 ${isSelected ? 'text-blue-600' : 'opacity-60'}`} />
                        {isSelected && <Check className="w-3.5 h-3.5 text-blue-600" />}
                      </div>
                      <span className="text-[10px] font-bold block leading-tight">
                        {lang === 'ar' ? p.labelAr : p.name}
                      </span>
                    </button>
                  );
                })}
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* ACCORDION 2: NAVIGATION & AUDIO (TTS Narration Engine)                    */}
          {/* ========================================================================= */}
          <div className="p-4 space-y-3">
            <button
              type="button"
              onClick={() => toggleSection('navAudio')}
              className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider py-1 cursor-pointer"
              style={{ color: 'var(--color-text)' }}
            >
              <div className="flex items-center gap-2">
                <Volume2 className="w-4 h-4 text-blue-600" />
                <span>2. {lang === 'ar' ? 'محرك النطق وقارئ الشاشة' : 'TTS Narration & Audio'}</span>
              </div>
              {openSections.navAudio ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {openSections.navAudio && (
              <div className="space-y-3.5 pt-2 animate-in fade-in">
                {/* Read Entire Page Aloud Button */}
                <button
                  type="button"
                  onClick={readPageAloud}
                  className="w-full py-2.5 px-4 rounded-2xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-md transition-all flex items-center justify-center gap-2 cursor-pointer"
                >
                  <Speech className="w-4 h-4" />
                  <span>{lang === 'ar' ? 'قراءة الصفحة كاملة بصوت عالٍ' : 'Read Current Page Aloud'}</span>
                </button>

                {/* Hover / Click to Speak Mode */}
                <div
                  className="p-3.5 rounded-2xl border flex items-center justify-between"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                >
                  <div className="flex items-center gap-2.5">
                    <MousePointer className="w-4 h-4 text-cyan-600" />
                    <div>
                      <span className="text-xs font-bold block">
                        {lang === 'ar' ? 'النطق عند التمرير / النقر' : 'Hover & Click to Speak'}
                      </span>
                      <span className="text-[10px] opacity-75">
                        {lang === 'ar' ? 'قراءة أي عنصر يتم الإشارة إليه' : 'Narrates any hovered element'}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setTtsHoverMode(!ttsHoverMode);
                      if (!ttsHoverMode) {
                        speakText(lang === 'ar' ? 'تم تفعيل وضع القراءة بالتمرير' : 'Hover to speak mode enabled');
                      }
                    }}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      ttsHoverMode ? 'bg-cyan-600' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                        ttsHoverMode ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* TTS Speed Controls (0.5x, 0.75x, 1x, 1.25x, 1.5x, 2x) */}
                <div className="space-y-1.5">
                  <div className="flex items-center justify-between text-[11px] font-bold opacity-75">
                    <span>{lang === 'ar' ? 'سرعة النطق الصوتي:' : 'Voice Narration Speed:'}</span>
                    <span className="text-blue-600 font-mono">{screenReaderSpeed}x</span>
                  </div>
                  <div className="grid grid-cols-6 gap-1">
                    {[0.5, 0.75, 1.0, 1.25, 1.5, 2.0].map((rate) => (
                      <button
                        key={rate}
                        type="button"
                        onClick={() => {
                          setScreenReaderSpeed(rate);
                          speakText(lang === 'ar' ? `سرعة النطق: ${rate} ضعف` : `Speed: ${rate}x`);
                        }}
                        className={`py-1.5 rounded-xl border text-[10px] font-bold cursor-pointer ${
                          screenReaderSpeed === rate
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        style={{ borderColor: screenReaderSpeed === rate ? 'transparent' : 'var(--color-border)' }}
                      >
                        {rate}x
                      </button>
                    ))}
                  </div>
                </div>

                {/* Keyboard Navigation Focus Frame */}
                <div
                  className="p-3.5 rounded-2xl border flex items-center justify-between"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                >
                  <div className="flex items-center gap-2.5">
                    <Crosshair className="w-4 h-4 text-amber-500" />
                    <div>
                      <span className="text-xs font-bold block">
                        {lang === 'ar' ? 'إطار تركيز لوحة المفاتيح' : 'Keyboard Focus Frame'}
                      </span>
                      <span className="text-[10px] opacity-75">
                        {lang === 'ar' ? 'تحديد ثنائي اللون للعناصر النشطة' : 'Dual-tone outline on Tab focus'}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setFocusRing(!focusRing)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      focusRing ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                        focusRing ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Large Cursor Controls */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold block opacity-75">
                    {lang === 'ar' ? 'حجم وشكل المؤشر:' : 'Cursor Size:'}
                  </label>
                  <div className="grid grid-cols-3 gap-2">
                    {[
                      { id: 'default', label: 'Default' },
                      { id: 'large-black', label: 'Black (32px)' },
                      { id: 'large-white', label: 'White (32px)' },
                    ].map((cur) => (
                      <button
                        key={cur.id}
                        type="button"
                        onClick={() => setCursorStyle(cur.id as any)}
                        className={`py-1.5 rounded-xl border text-[11px] font-bold cursor-pointer ${
                          cursorStyle === cur.id
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        style={{ borderColor: cursorStyle === cur.id ? 'transparent' : 'var(--color-border)' }}
                      >
                        {cur.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Screen Reader Hints Toggle */}
                <div
                  className="p-3.5 rounded-2xl border flex items-center justify-between"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                >
                  <div className="flex items-center gap-2.5">
                    <HelpCircle className="w-4 h-4 text-purple-600" />
                    <div>
                      <span className="text-xs font-bold block">
                        {lang === 'ar' ? 'تلميحات قارئ الشاشة' : 'Screen Reader Hints'}
                      </span>
                      <span className="text-[10px] opacity-75">
                        {lang === 'ar' ? 'إبراز حدود ومعلومات النفاذ' : 'Highlight accessible landmarks'}
                      </span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={toggleScreenReaderHints}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      screenReaderHints ? 'bg-purple-600' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                        screenReaderHints ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* ACCORDION 3: TYPOGRAPHY SCALING UP TO 200%                                */}
          {/* ========================================================================= */}
          <div className="p-4 space-y-3">
            <button
              type="button"
              onClick={() => toggleSection('textForm')}
              className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider py-1 cursor-pointer"
              style={{ color: 'var(--color-text)' }}
            >
              <div className="flex items-center gap-2">
                <Type className="w-4 h-4 text-purple-600" />
                <span>3. {lang === 'ar' ? 'تكبير النصوص والخطوط (حتى 200%)' : 'Typography Scaling (up to 200%)'}</span>
              </div>
              {openSections.textForm ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {openSections.textForm && (
              <div className="space-y-4 pt-2 animate-in fade-in">
                {/* Scale Stepper & Quick Percentage Buttons */}
                <div
                  className="p-3.5 rounded-2xl border space-y-2.5"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                >
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold">{lang === 'ar' ? 'مقياس حجم الخط:' : 'Font Sizing Scale:'}</span>
                    <span className="text-sm font-black text-purple-600 font-mono">{fontScalePercent}%</span>
                  </div>

                  <div className="grid grid-cols-5 gap-1.5">
                    {[100, 125, 150, 175, 200].map((pct) => (
                      <button
                        key={pct}
                        type="button"
                        onClick={() => setFontScalePercent(pct)}
                        className={`py-1.5 rounded-xl border text-[11px] font-bold font-mono cursor-pointer ${
                          fontScalePercent === pct
                            ? 'bg-purple-600 text-white border-purple-600'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        style={{ borderColor: fontScalePercent === pct ? 'transparent' : 'var(--color-border)' }}
                      >
                        {pct}%
                      </button>
                    ))}
                  </div>

                  <div className="flex items-center justify-between pt-1">
                    <button
                      type="button"
                      onClick={() => setFontScalePercent((p) => Math.max(100, p - 10))}
                      className="px-4 py-1.5 rounded-xl border text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      - 10%
                    </button>
                    <button
                      type="button"
                      onClick={() => setFontScalePercent(100)}
                      className="text-[11px] text-slate-500 underline hover:text-slate-800"
                    >
                      Reset 100%
                    </button>
                    <button
                      type="button"
                      onClick={() => setFontScalePercent((p) => Math.min(200, p + 10))}
                      className="px-4 py-1.5 rounded-xl border text-xs font-bold hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
                    >
                      + 10%
                    </button>
                  </div>
                </div>

                {/* Font Selector */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold block opacity-75">
                    {lang === 'ar' ? 'نوع الخط المفضل:' : 'Font Family Selector:'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'default', label: 'Standard Sans' },
                      { id: 'dyslexic', label: 'Dyslexia Friendly' },
                      { id: 'cairo', label: 'Cairo (Arabic)' },
                      { id: 'inter', label: 'Inter (Clean)' },
                    ].map((f) => (
                      <button
                        key={f.id}
                        type="button"
                        onClick={() => setFontFamily(f.id as any)}
                        className={`p-2.5 rounded-xl border text-[11px] font-bold text-start cursor-pointer ${
                          fontFamily === f.id
                            ? 'bg-blue-600 text-white border-blue-600'
                            : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        style={{ borderColor: fontFamily === f.id ? 'transparent' : 'var(--color-border)' }}
                      >
                        {f.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Line Height & Letter Spacing Steppers */}
                <div className="grid grid-cols-2 gap-3">
                  <div className="p-3 rounded-2xl border space-y-1.5" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
                    <span className="text-[11px] font-bold block">{lang === 'ar' ? 'تباعد الأسطر' : 'Line Height'}</span>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setLineHeightStep((p) => Math.max(0, p - 1))}
                        className="w-7 h-7 rounded-lg border font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold">+{lineHeightStep}</span>
                      <button
                        type="button"
                        onClick={() => setLineHeightStep((p) => Math.min(3, p + 1))}
                        className="w-7 h-7 rounded-lg border font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>

                  <div className="p-3 rounded-2xl border space-y-1.5" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
                    <span className="text-[11px] font-bold block">{lang === 'ar' ? 'تباعد الحروف' : 'Letter Spacing'}</span>
                    <div className="flex items-center justify-between">
                      <button
                        type="button"
                        onClick={() => setLetterSpacingStep((p) => Math.max(0, p - 1))}
                        className="w-7 h-7 rounded-lg border font-bold text-xs"
                      >
                        -
                      </button>
                      <span className="text-xs font-bold">+{letterSpacingStep}</span>
                      <button
                        type="button"
                        onClick={() => setLetterSpacingStep((p) => Math.min(3, p + 1))}
                        className="w-7 h-7 rounded-lg border font-bold text-xs"
                      >
                        +
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            )}
          </div>

          {/* ========================================================================= */}
          {/* ACCORDION 4: VISUALS (Colorblind, Contrast & Reduced Motion)               */}
          {/* ========================================================================= */}
          <div className="p-4 space-y-3">
            <button
              type="button"
              onClick={() => toggleSection('visuals')}
              className="w-full flex items-center justify-between font-bold text-xs uppercase tracking-wider py-1 cursor-pointer"
              style={{ color: 'var(--color-text)' }}
            >
              <div className="flex items-center gap-2">
                <Contrast className="w-4 h-4 text-emerald-600" />
                <span>4. {lang === 'ar' ? 'الألوان والتباين والحركة' : 'Visuals & Colorblind Modes'}</span>
              </div>
              {openSections.visuals ? <ChevronUp className="w-4 h-4" /> : <ChevronDown className="w-4 h-4" />}
            </button>

            {openSections.visuals && (
              <div className="space-y-4 pt-2 animate-in fade-in">
                {/* Contrast Modes */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold block opacity-75">
                    {lang === 'ar' ? 'أوضاع التباين:' : 'Contrast Modes:'}
                  </label>
                  <div className="grid grid-cols-4 gap-2">
                    {[
                      { id: 'normal', label: 'Default' },
                      { id: 'hc-dark', label: 'HC Dark' },
                      { id: 'hc-light', label: 'HC Light' },
                      { id: 'invert', label: 'Invert' },
                    ].map((c) => (
                      <button
                        key={c.id}
                        type="button"
                        onClick={() => setContrastMode(c.id as any)}
                        className={`py-2 rounded-xl border text-[11px] font-bold cursor-pointer ${
                          contrastMode === c.id ? 'bg-blue-600 text-white border-blue-600' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        style={{ borderColor: contrastMode === c.id ? 'transparent' : 'var(--color-border)' }}
                      >
                        {c.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Colorblind Specific Modes */}
                <div className="space-y-1.5">
                  <label className="text-[11px] font-bold block opacity-75">
                    {lang === 'ar' ? 'تصحيح عمى الألوان:' : 'Colorblind Simulation Filter:'}
                  </label>
                  <div className="grid grid-cols-2 gap-2">
                    {[
                      { id: 'none', label: 'None' },
                      { id: 'protanopia', label: 'Protanopia (Red)' },
                      { id: 'deuteranopia', label: 'Deuteranopia (Green)' },
                      { id: 'tritanopia', label: 'Tritanopia (Blue)' },
                      { id: 'achromatopsia', label: 'Achromatopsia (Mono)' },
                    ].map((cb) => (
                      <button
                        key={cb.id}
                        type="button"
                        onClick={() => setColorblindFilter(cb.id as any)}
                        className={`p-2 rounded-xl border text-[11px] font-bold cursor-pointer ${
                          colorblindFilter === cb.id ? 'bg-emerald-600 text-white border-emerald-600' : 'hover:bg-slate-100 dark:hover:bg-slate-800'
                        }`}
                        style={{ borderColor: colorblindFilter === cb.id ? 'transparent' : 'var(--color-border)' }}
                      >
                        {cb.label}
                      </button>
                    ))}
                  </div>
                </div>

                {/* Stop Animations Toggle (Reduced Motion) */}
                <div
                  className="p-3.5 rounded-2xl border flex items-center justify-between"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                >
                  <div className="flex items-center gap-2.5">
                    <PauseCircle className="w-4 h-4 text-amber-500" />
                    <div>
                      <span className="text-xs font-bold block">{lang === 'ar' ? 'إيقاف الحركات والوميض' : 'Reduced Motion'}</span>
                      <span className="text-[10px] opacity-75">{lang === 'ar' ? 'إيقاف تأثيرات الانتقال والتحريك' : 'Stops transitions & CSS animations'}</span>
                    </div>
                  </div>
                  <button
                    type="button"
                    onClick={() => setStopAnimations(!stopAnimations)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      stopAnimations ? 'bg-amber-500' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                        stopAnimations ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'
                      }`}
                    />
                  </button>
                </div>

                {/* Hide Images Toggle */}
                <div
                  className="p-3.5 rounded-2xl border flex items-center justify-between"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                >
                  <div className="flex items-center gap-2.5">
                    <ImageOff className="w-4 h-4 text-rose-500" />
                    <span className="text-xs font-bold">{lang === 'ar' ? 'إخفاء الصور والخلفيات' : 'Hide Images'}</span>
                  </div>
                  <button
                    type="button"
                    onClick={() => setHideImages(!hideImages)}
                    className={`w-11 h-6 rounded-full transition-colors relative cursor-pointer ${
                      hideImages ? 'bg-rose-500' : 'bg-slate-300 dark:bg-slate-700'
                    }`}
                  >
                    <span
                      className={`block w-4 h-4 rounded-full bg-white transition-transform ${
                        hideImages ? 'translate-x-6 rtl:-translate-x-6' : 'translate-x-1 rtl:-translate-x-1'
                      }`}
                    />
                  </button>
                </div>
              </div>
            )}
          </div>
        </div>

        {/* Bottom Actions */}
        <div
          className="p-4 border-t flex items-center justify-between shrink-0"
          style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}
        >
          <button
            type="button"
            onClick={resetAll}
            className="flex items-center gap-2 py-2 px-4 rounded-xl border text-xs font-bold transition-all hover:bg-slate-200 dark:hover:bg-slate-800 cursor-pointer"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
          >
            <RotateCcw className="w-3.5 h-3.5" />
            <span>{t.resetA11y}</span>
          </button>

          <button
            type="button"
            onClick={() => setIsOpen(false)}
            className="py-2 px-6 rounded-xl text-white text-xs font-bold shadow-md cursor-pointer hover:opacity-90"
            style={{ backgroundColor: 'var(--color-primary-green, #0D8068)' }}
          >
            {lang === 'ar' ? 'تم' : 'Done'}
          </button>
        </div>
      </aside>

      {/* Reading Guide Ruler if active */}
      {readingGuide && (
        <div
          onMouseMove={(e) => setLineGuideY(e.clientY)}
          className="fixed inset-x-0 z-[9997] pointer-events-none transition-all duration-75"
          style={{
            top: `${lineGuideY - 24}px`,
            height: '48px',
            backgroundColor: 'rgba(255, 230, 0, 0.15)',
            borderTop: '2px solid rgba(255, 215, 0, 0.85)',
            borderBottom: '2px solid rgba(255, 215, 0, 0.85)',
          }}
        />
      )}

      {/* Reading Mask if active */}
      {readingMask && (
        <div
          onMouseMove={(e) => setMaskY(e.clientY)}
          className="fixed inset-0 z-[9997] pointer-events-none"
        >
          <div className="absolute top-0 inset-x-0 bg-black/60 transition-all duration-75" style={{ height: `${Math.max(0, maskY - 45)}px` }} />
          <div className="absolute inset-x-0 border-y-2 border-emerald-400 bg-transparent transition-all duration-75" style={{ top: `${Math.max(0, maskY - 45)}px`, height: '90px' }} />
          <div className="absolute bottom-0 inset-x-0 bg-black/60 transition-all duration-75" style={{ top: `${maskY + 45}px` }} />
        </div>
      )}
    </>
  );
};
