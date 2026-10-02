const fs = require('fs');

let content = fs.readFileSync('src/pages/LandingPage.tsx', 'utf8');

// 1. Ensure useEffect is imported
content = content.replace(
  "import React, { useState } from 'react';",
  "import React, { useState, useEffect } from 'react';"
);

// 2. Destructure setTheme, toggleHighContrast from useMockData
content = content.replace(
  "const { lang, theme } = useMockData();",
  "const { lang, theme, setTheme, toggleHighContrast } = useMockData();"
);

// 3. Add focusSeconds and interactive handlers to LandingPage component
const oldStateBlock = `  const [mockBrightness, setMockBrightness] = useState(45);
  const [mockAudioBalance, setMockAudioBalance] = useState(50);
  const [mockThemeMode, setMockThemeMode] = useState<'light' | 'dim' | 'dark'>('light');
  const [mockScreenReader, setMockScreenReader] = useState(true);
  const [mockHighContrast, setMockHighContrast] = useState(true);
  const [mockSimplifiedMode, setMockSimplifiedMode] = useState(false);
  const [mockTextResizing, setMockTextResizing] = useState(115);
  const [mockHapticFeedback, setMockHapticFeedback] = useState(true);
  const [mockFocusActive, setMockFocusActive] = useState(false);
  const [mockNoiseLevel, setMockNoiseLevel] = useState(38);`;

const newStateBlock = `  const [mockBrightness, setMockBrightness] = useState(50);
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
    return \`\${String(mins).padStart(2, '0')}:\${String(secs).padStart(2, '0')}\`;
  };

  // Web Audio Spatial Panning Feedback
  const playAudioFeedback = (balance: number) => {
    try {
      const AudioCtx = window.AudioContext || (window as any).webkitAudioContext;
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
      osc.start();
      osc.stop(ctx.currentTime + 0.22);
    } catch (e) {
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
      document.documentElement.style.fontSize = \`\${val}%\`;
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
  };`;

content = content.replace(oldStateBlock, newStateBlock);

// 4. Update Hero "Explore Tracks" button to scroll to learning-tracks
content = content.replace(
  `                {/* Secondary Glassmorphic Outlined Button */}
                <button
                  type="button"
                  onClick={() => {
                    const elem = document.getElementById('tracks');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}`,
  `                {/* Secondary Glassmorphic Outlined Button */}
                <button
                  type="button"
                  onClick={() => {
                    const elem = document.getElementById('learning-tracks') || document.getElementById('tracks');
                    if (elem) elem.scrollIntoView({ behavior: 'smooth' });
                  }}`
);

// 5. Place #tracks anchor right above Our Learning Tracks
content = content.replace(
  `      {/* ========================================================================= */}
      {/* 3. OUR LEARNING TRACKS SECTION                                            */}
      {/* ========================================================================= */}
      <div id="career-journey" className="scroll-mt-20" />
      <section
        id="learning-tracks"`,
  `      {/* ========================================================================= */}
      {/* 3. OUR LEARNING TRACKS SECTION                                            */}
      {/* ========================================================================= */}
      <div id="tracks" className="scroll-mt-20" />
      <div id="career-journey" className="scroll-mt-20" />
      <section
        id="learning-tracks"`
);

// 6. Remove misplaced #tracks anchor above Learning Without Limits
content = content.replace(
  `      {/* ========================================================================= */}
      {/* 5. LEARNING WITHOUT LIMITS / ASSISTIVE DASHBOARD SECTION                  */}
      {/* ========================================================================= */}
      <div id="tracks" className="scroll-mt-20" />
      <section
        id="learning-without-limits"`,
  `      {/* ========================================================================= */}
      {/* 5. LEARNING WITHOUT LIMITS / ASSISTIVE DASHBOARD SECTION                  */}
      {/* ========================================================================= */}
      <div id="learning-without-limits" className="scroll-mt-20" />
      <section
        id="learning-without-limits"`
);

// 7. Wire up Tablet Glass Screen Display filter with mockBrightness & mockThemeMode
content = content.replace(
  `<div className="rounded-[1.6rem] overflow-hidden bg-[#faf8f5] dark:bg-[#181d28] text-slate-800 dark:text-slate-100 text-xs shadow-inner flex flex-col border border-stone-200 dark:border-slate-800 select-none">`,
  `<div
                      className="rounded-[1.6rem] overflow-hidden bg-[#faf8f5] dark:bg-[#181d28] text-slate-800 dark:text-slate-100 text-xs shadow-inner flex flex-col border border-stone-200 dark:border-slate-800 select-none transition-all duration-300"
                      style={{
                        filter: \`brightness(\${0.75 + (mockBrightness / 100) * 0.5})\`,
                      }}
                    >`
);

// 8. Wire up Audio Balance input
content = content.replace(
  `                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={mockAudioBalance}
                              onChange={(e) => setMockAudioBalance(Number(e.target.value))}
                              className="w-full accent-[#0d9488] h-1.5 bg-[#bde8dc] dark:bg-teal-900/40 rounded-lg cursor-pointer"
                            />`,
  `                            <input
                              type="range"
                              min="0"
                              max="100"
                              value={mockAudioBalance}
                              onChange={(e) => handleAudioBalanceChange(Number(e.target.value))}
                              className="w-full accent-[#0d9488] h-1.5 bg-[#bde8dc] dark:bg-teal-900/40 rounded-lg cursor-pointer"
                            />`
);

// 9. Wire up Interface Theme buttons
content = content.replace(
  `                            <button
                              type="button"
                              onClick={() => setMockThemeMode('light')}`,
  `                            <button
                              type="button"
                              onClick={() => handleThemeModeChange('light')}`
);

content = content.replace(
  `                            <button
                              type="button"
                              onClick={() => setMockThemeMode('dim')}`,
  `                            <button
                              type="button"
                              onClick={() => handleThemeModeChange('dim')}`
);

content = content.replace(
  `                            <button
                              type="button"
                              onClick={() => setMockThemeMode('dark')}`,
  `                            <button
                              type="button"
                              onClick={() => handleThemeModeChange('dark')}`
);

// 10. Wire up Screen Reader Toggle
content = content.replace(
  `                            <button
                              type="button"
                              role="switch"
                              aria-checked={mockScreenReader}
                              onClick={() => setMockScreenReader(!mockScreenReader)}`,
  `                            <button
                              type="button"
                              role="switch"
                              aria-checked={mockScreenReader}
                              onClick={handleToggleScreenReader}`
);

// 11. Wire up High Contrast Toggle
content = content.replace(
  `                            <button
                              type="button"
                              role="switch"
                              aria-checked={mockHighContrast}
                              onClick={() => setMockHighContrast(!mockHighContrast)}`,
  `                            <button
                              type="button"
                              role="switch"
                              aria-checked={mockHighContrast}
                              onClick={handleToggleHighContrast}`
);

// 12. Wire up Simplified Mode Toggle
content = content.replace(
  `                            <button
                              type="button"
                              role="switch"
                              aria-checked={mockSimplifiedMode}
                              onClick={() => setMockSimplifiedMode(!mockSimplifiedMode)}`,
  `                            <button
                              type="button"
                              role="switch"
                              aria-checked={mockSimplifiedMode}
                              onClick={handleToggleSimplifiedMode}`
);

// 13. Wire up Text Resizing Slider
content = content.replace(
  `                              <input
                                type="range"
                                min="100"
                                max="150"
                                value={mockTextResizing}
                                onChange={(e) => setMockTextResizing(Number(e.target.value))}
                                className="w-full accent-[#0d9488] h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                              />`,
  `                              <input
                                type="range"
                                min="100"
                                max="150"
                                value={mockTextResizing}
                                onChange={(e) => handleTextResizingChange(Number(e.target.value))}
                                className="w-full accent-[#0d9488] h-1.5 bg-slate-200 dark:bg-slate-700 rounded-lg cursor-pointer"
                              />`
);

// 14. Wire up Haptic Feedback Toggle
content = content.replace(
  `                            <button
                              type="button"
                              role="switch"
                              aria-checked={mockHapticFeedback}
                              onClick={() => setMockHapticFeedback(!mockHapticFeedback)}`,
  `                            <button
                              type="button"
                              role="switch"
                              aria-checked={mockHapticFeedback}
                              onClick={handleToggleHaptic}`
);

// 15. Wire up Noise Level Alert Semicircular Arc Gauge (clickable to cycle)
content = content.replace(
  `                        {/* Noise Level Alert Semicircular Arc Gauge */}
                        <div className="p-2.5 rounded-2xl bg-[#edfbf7] dark:bg-[#112a23]/90 border border-[#cbf0e6] dark:border-teal-900/60 shadow-xs space-y-0.5">`,
  `                        {/* Noise Level Alert Semicircular Arc Gauge */}
                        <div
                          onClick={cycleNoiseLevel}
                          title="Click to test ambient noise sensor"
                          className="p-2.5 rounded-2xl bg-[#edfbf7] dark:bg-[#112a23]/90 border border-[#cbf0e6] dark:border-teal-900/60 shadow-xs space-y-0.5 cursor-pointer hover:border-teal-400 transition-colors"
                        >`
);

content = content.replace(
  `                              {/* Active Teal Arc */}
                              <path
                                d="M 15 58 A 45 45 0 0 1 68 15"
                                fill="none"
                                stroke="#14b8a6"
                                strokeWidth="7"
                                strokeLinecap="round"
                              />`,
  {/* Active Dynamic Teal Arc */ }
  < path
                                d = "M 15 58 A 45 45 0 0 1 68 15"
                                fill = "none"
                                stroke = { mockNoiseLevel > 70 ? '#ea580c' : '#14b8a6'}
  strokeWidth = "7"
                                strokeLinecap = "round"
  />
);

// 16. Wire up Focus Assist timer display
content = content.replace(
  `                          <div className="text-center font-mono font-black text-base text-slate-900 dark:text-amber-200 py-0.5">
                            24:15
                          </div>`,
  `                          <div className="text-center font-mono font-black text-base text-slate-900 dark:text-amber-200 py-0.5">
                            {formatTimer(mockFocusSeconds)}
                          </div>`
);

// 17. Completely remove the 6th section (Final CTA section)
const ctaSectionRegex = /\{\/\* =+\s*\*\}\s*\{\/\* 6\. FINAL CALL TO ACTION \(CTA\) SECTION\s*\*\}\s*\{\/\* =+\s*\}[\s\S]*?<\/section>/;

if (ctaSectionRegex.test(content)) {
  content = content.replace(ctaSectionRegex, '');
  console.log('Successfully removed Section 6!');
} else {
  console.log('Warning: Section 6 regex did not match, checking alternate pattern...');
}

// 18. Update Footer links
content = content.replace(
  `            <button
              type="button"
              onClick={() => {
                const elem = document.getElementById('tracks');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
            >
              {lang === 'ar' ? 'المسارات' : 'Tracks'}
            </button>
            <button
              type="button"
              onClick={() => {
                const elem = document.getElementById('about');
                if (elem) elem.scrollIntoView({ behavior: 'smooth' });
              }}
              className="hover:text-emerald-600 dark:hover:text-emerald-400 cursor-pointer"
            >
              {lang === 'ar' ? 'عن كوديرا' : 'About'}
            </button>`,
  `            <button
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
            </button>`
);

fs.writeFileSync('src/pages/LandingPage.tsx', content, 'utf8');
console.log('Successfully updated LandingPage.tsx!');
