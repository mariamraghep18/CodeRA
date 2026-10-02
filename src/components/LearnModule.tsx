import React, { useState } from 'react';
import ReactDOM from 'react-dom/client';

export interface LearnModuleProps {
  initialSubTab?: 'overview' | 'pyramid';
  onOpenTrackModal?: (trackId: 'explorer' | 'builder' | 'creator' | 'innovator' | 'future') => void;
  onBackToOverview?: () => void;
}

let learnRoot: ReactDOM.Root | null = null;

export function renderLearnView(container: HTMLElement, initialSubTab: 'overview' | 'pyramid' = 'pyramid') {
  if (!learnRoot) {
    learnRoot = ReactDOM.createRoot(container);
  }
  learnRoot.render(
    <React.StrictMode>
      <LearnModule
        initialSubTab={initialSubTab}
        onBackToOverview={() => {
          if (typeof (window as any).returnToLandingPage === 'function') {
            (window as any).returnToLandingPage();
          }
        }}
      />
    </React.StrictMode>
  );
}

export const LearnModule: React.FC<LearnModuleProps> = ({
  initialSubTab = 'pyramid',
  onOpenTrackModal,
  onBackToOverview
}) => {
  const [activeSubTab, setActiveSubTab] = useState<'overview' | 'pyramid'>(initialSubTab);

  const handleTrackClick = (trackId: 'explorer' | 'builder' | 'creator' | 'innovator' | 'future') => {
    if (onOpenTrackModal) {
      onOpenTrackModal(trackId);
    } else if (typeof (window as any).openTrackModal === 'function') {
      (window as any).openTrackModal(trackId);
    }
  };

  const handleBackToHome = () => {
    if (onBackToOverview) {
      onBackToOverview();
    } else if (typeof (window as any).returnToLandingPage === 'function') {
      (window as any).returnToLandingPage();
    }
  };

  return (
    <div className="w-full max-w-5xl mx-auto font-sans p-4 sm:p-6 min-h-screen bg-slate-50/50 dark:bg-slate-900/50">
      {/* Top Bar with "← Back to Home / Dashboard" Button */}
      <div className="flex flex-col sm:flex-row items-stretch sm:items-center justify-between border-b border-slate-200 dark:border-slate-800 pb-4 mb-6 gap-4">
        <div className="flex items-center gap-3">
          <button
            type="button"
            onClick={handleBackToHome}
            className="flex items-center gap-2 px-4 py-2 rounded-xl text-xs sm:text-sm font-bold bg-white dark:bg-slate-800 border border-slate-200 dark:border-slate-700 text-slate-800 dark:text-slate-200 hover:bg-slate-100 dark:hover:bg-slate-700 shadow-sm transition-all cursor-pointer"
          >
            <i className="fa-solid fa-arrow-left text-indigo-600"></i>
            <span>← Back to Home / Dashboard</span>
          </button>
        </div>

        <div className="flex items-center gap-2">
          <button
            type="button"
            onClick={() => setActiveSubTab('pyramid')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'pyramid'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            🔺 5 Learning Stages Pyramid
          </button>
          <button
            type="button"
            onClick={() => setActiveSubTab('overview')}
            className={`px-3.5 py-2 rounded-xl text-xs font-bold transition-all cursor-pointer ${
              activeSubTab === 'overview'
                ? 'bg-indigo-600 text-white shadow-md'
                : 'bg-white dark:bg-slate-800 text-slate-600 dark:text-slate-300 border border-slate-200 dark:border-slate-700 hover:bg-slate-100'
            }`}
          >
            📚 Learn Overview
          </button>
        </div>
      </div>

      {/* Main Learn Overview / Hub */}
      {activeSubTab === 'overview' && (
        <div className="space-y-6 animate-fadeIn">
          <div className="bg-gradient-to-r from-indigo-900 via-indigo-800 to-slate-900 text-white rounded-2xl p-6 sm:p-8 shadow-xl relative overflow-hidden">
            <div className="max-w-2xl relative z-10 space-y-3">
              <span className="inline-flex items-center gap-1.5 px-3 py-1 rounded-full bg-white/10 text-amber-300 text-xs font-bold uppercase tracking-wider backdrop-blur-md">
                🎓 CodeRa Educational Engine
              </span>
              <h2 className="text-2xl sm:text-3xl font-serif font-black tracking-tight">
                Learn: 5 Structured Stages
              </h2>
              <p className="text-slate-200 text-xs sm:text-sm font-medium leading-relaxed">
                Discover a clear, progressive roadmap designed to take every learner from foundational logic and tactile robotics to advanced AI engineering.
              </p>
              <button
                type="button"
                onClick={() => setActiveSubTab('pyramid')}
                className="mt-3 px-5 py-2.5 bg-amber-400 hover:bg-amber-300 text-slate-950 font-bold text-xs rounded-xl shadow-md transition-transform transform hover:scale-105 inline-flex items-center gap-2 cursor-pointer"
              >
                <span>View Learning Path / Tracks Pyramid</span>
                <i className="fa-solid fa-arrow-right"></i>
              </button>
            </div>
          </div>
        </div>
      )}

      {/* Dedicated Sub-View: 5-Stage Learning Tracks Pyramid */}
      {activeSubTab === 'pyramid' && (
        <div className="animate-fadeIn space-y-6">
          <div className="text-center mb-4">
            <span className="inline-flex items-center gap-1.5 px-3.5 py-1 rounded-full bg-indigo-50 dark:bg-indigo-950/60 text-indigo-700 dark:text-indigo-300 text-xs font-black uppercase tracking-wider mb-2 border border-indigo-200/60">
              <i className="fa-solid fa-layer-group text-indigo-500"></i> Learn &bull; 5 Learning Stages
            </span>
            <h2 className="text-3xl sm:text-4xl font-black text-slate-900 dark:text-white mb-1 tracking-tight">
              Our Learning Tracks
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 dark:text-slate-300 max-w-xl mx-auto font-medium">
              A structured path to mastery, designed for every stage of learning.
            </p>
          </div>

          {/* Stepped Tier Pyramid Container Wrapper (Centered & Tapered) */}
          <div className="max-w-4xl mx-auto w-full px-4 py-6 flex flex-col items-center gap-3">
            
            {/* Stage 5 (Apex / Top): w-full sm:w-[45%] */}
            <div
              onClick={() => handleTrackClick('future')}
              className="w-full sm:w-[45%] min-h-[64px] p-3 flex items-center justify-between gap-3 rounded-xl border border-indigo-200 bg-indigo-50/60 hover:bg-indigo-100/80 shadow-sm transition-all duration-300 cursor-pointer group"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-indigo-600 text-white shrink-0">
                    Stage 5
                  </span>
                  <h3 className="text-xs md:text-sm font-semibold text-slate-800 truncate">
                    Future Track
                  </h3>
                </div>
                <p className="text-xs text-slate-500 break-words line-clamp-2 leading-tight">
                  AI capstone projects &amp; career prep
                </p>
              </div>
              <button
                type="button"
                className="shrink-0 px-3 py-1 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
              >
                Details
              </button>
            </div>

            {/* Stage 4 (Tier 4): w-full sm:w-[58%] */}
            <div
              onClick={() => handleTrackClick('innovator')}
              className="w-full sm:w-[58%] min-h-[64px] p-3 flex items-center justify-between gap-3 rounded-xl border border-sky-200 bg-sky-50/60 hover:bg-sky-100/80 shadow-sm transition-all duration-300 cursor-pointer group"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-sky-600 text-white shrink-0">
                    Stage 4
                  </span>
                  <h3 className="text-xs md:text-sm font-semibold text-slate-800 truncate">
                    Innovator Track
                  </h3>
                </div>
                <p className="text-xs text-slate-500 break-words line-clamp-2 leading-tight">
                  Python, Arduino, IoT engineering
                </p>
              </div>
              <button
                type="button"
                className="shrink-0 px-3 py-1 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
              >
                Details
              </button>
            </div>

            {/* Stage 3 (Tier 3): w-full sm:w-[72%] */}
            <div
              onClick={() => handleTrackClick('creator')}
              className="w-full sm:w-[72%] min-h-[64px] p-3 flex items-center justify-between gap-3 rounded-xl border border-teal-200 bg-teal-50/60 hover:bg-teal-100/80 shadow-sm transition-all duration-300 cursor-pointer group"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-teal-600 text-white shrink-0">
                    Stage 3
                  </span>
                  <h3 className="text-xs md:text-sm font-semibold text-slate-800 truncate">
                    Creator Track
                  </h3>
                </div>
                <p className="text-xs text-slate-500 break-words line-clamp-2 leading-tight">
                  Scratch games, LEGO SPIKE &amp; micro:bit
                </p>
              </div>
              <button
                type="button"
                className="shrink-0 px-3 py-1 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
              >
                Details
              </button>
            </div>

            {/* Stage 2 (Tier 2): w-full sm:w-[86%] */}
            <div
              onClick={() => handleTrackClick('builder')}
              className="w-full sm:w-[86%] min-h-[64px] p-3 flex items-center justify-between gap-3 rounded-xl border border-emerald-200 bg-emerald-50/60 hover:bg-emerald-100/80 shadow-sm transition-all duration-300 cursor-pointer group"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-emerald-600 text-white shrink-0">
                    Stage 2
                  </span>
                  <h3 className="text-xs md:text-sm font-semibold text-slate-800 truncate">
                    Builder Track
                  </h3>
                </div>
                <p className="text-xs text-slate-500 break-words line-clamp-2 leading-tight">
                  LEGO robotics &amp; sensor programming
                </p>
              </div>
              <button
                type="button"
                className="shrink-0 px-3 py-1 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
              >
                Details
              </button>
            </div>

            {/* Stage 1 (Base / Bottom): w-full sm:w-full */}
            <div
              onClick={() => handleTrackClick('explorer')}
              className="w-full sm:w-full min-h-[64px] p-3 flex items-center justify-between gap-3 rounded-xl border border-slate-300 bg-slate-50 hover:bg-slate-100 shadow-sm transition-all duration-300 cursor-pointer group"
            >
              <div className="min-w-0 flex-1">
                <div className="flex items-center gap-2 mb-0.5">
                  <span className="text-[10px] font-bold uppercase tracking-wider px-2 py-0.5 rounded-md bg-slate-700 text-white shrink-0">
                    Stage 1
                  </span>
                  <h3 className="text-xs md:text-sm font-semibold text-slate-800 truncate">
                    Explorer Track
                  </h3>
                </div>
                <p className="text-xs text-slate-500 break-words line-clamp-2 leading-tight">
                  Tactile robotics &amp; foundational logic
                </p>
              </div>
              <button
                type="button"
                className="shrink-0 px-3 py-1 text-xs font-medium text-white bg-indigo-600 hover:bg-indigo-700 rounded-lg transition-colors cursor-pointer"
              >
                Details
              </button>
            </div>

          </div>

          <div className="mt-4 text-center">
            <span className="inline-flex items-center gap-2 px-4 py-1.5 rounded-full bg-slate-100 dark:bg-slate-800 text-slate-500 text-[11px] font-bold uppercase tracking-widest border border-slate-200">
              Foundation to Future
            </span>
          </div>
        </div>
      )}
    </div>
  );
};
