import React, { useState } from 'react';
import { useMockData } from '../context/MockDataContext';
import {
  Layers,
  Brain,
  Cpu,
  MessageSquare,
  Activity,
  MousePointerClick,
  Info,
  ChevronRight,
  CheckCircle2,
  X,
  Sparkles,
} from 'lucide-react';

interface LearnPyramidProps {
  onBack?: () => void;
  showBackBtn?: boolean;
}

export const LearnPyramid: React.FC<LearnPyramidProps> = ({ onBack, showBackBtn = false }) => {
  const { lang } = useMockData();
  const [activeTab, setActiveTab] = useState<'tracks' | 'domains'>('tracks');
  const [selectedDetail, setSelectedDetail] = useState<{
    title: string;
    level: string;
    description: string;
    outcomes: string[];
  } | null>(null);

  const tracks = [
    {
      stage: 5,
      width: 'sm:w-[48%]',
      titleEn: 'Stage 5: Future Engineer Track (L4)',
      titleAr: 'المرحلة ٥: مسار مهندس المستقبل (L4)',
      descEn: 'Applied AI, Microcontrollers, MicroPython & verified digital career portfolio.',
      descAr: 'الذكاء الاصطناعي التطبيقي، المتحكمات الدقيقة، وبناء معرض أعمال رقمي للمستقبل.',
      level: 'L4: Career Ready (85–100 pts)',
      color: 'border-purple-300 bg-purple-50/80 dark:bg-purple-950/40 text-purple-700 dark:text-purple-300',
      badgeColor: 'bg-purple-600',
      outcomes: [
        'Complete Capstone Engineering Project',
        'Deploy custom Machine Learning models to IoT hardware',
        'Present project at regional inclusive tech showcase',
      ],
    },
    {
      stage: 4,
      width: 'sm:w-[62%]',
      titleEn: 'Stage 4: Innovator Track (L3)',
      titleAr: 'المرحلة ٤: مسار المبتكر (L3)',
      descEn: 'Text-based Python programming, smart Arduino sensors, and IoT engineering.',
      descAr: 'البرمجة النصية بلغة بايثون، مستشعرات الأردوينو، وهندسة إنترنت الأشياء.',
      level: 'L3: Developer (70–84 pts)',
      color: 'border-blue-300 bg-blue-50/80 dark:bg-blue-950/40 text-blue-700 dark:text-blue-300',
      badgeColor: 'bg-blue-600',
      outcomes: [
        'Write pure Python scripts for algorithmic problem solving',
        'Interface physical sensors (light, ultrasonic, ultrasonic motion)',
        'Qualifies for the CodeRa Advanced Coding Bonus Challenge',
      ],
    },
    {
      stage: 3,
      width: 'sm:w-[74%]',
      titleEn: 'Stage 3: Creator Track (L2/L3)',
      titleAr: 'المرحلة ٣: مسار المبدع (L2/L3)',
      descEn: 'Interactive game mechanics, Scratch logic, LEGO SPIKE & micro:bit builds.',
      descAr: 'تصميم ألعاب تفاعلية، منطق سكراتش المتقدم، وتطبيقات LEGO SPIKE و micro:bit.',
      level: 'L2/L3: Intermediate Creator',
      color: 'border-teal-300 bg-teal-50/80 dark:bg-teal-950/40 text-teal-700 dark:text-teal-300',
      badgeColor: 'bg-teal-600',
      outcomes: [
        'Design multiplayer educational mini-games in Scratch',
        'Program wireless Bluetooth communications between micro:bits',
        'Master variables, conditional loops, and coordinate math',
      ],
    },
    {
      stage: 2,
      width: 'sm:w-[86%]',
      titleEn: 'Stage 2: Builder Track (L2)',
      titleAr: 'المرحلة ٢: مسار البناء (L2)',
      descEn: 'Block-based algorithmic logic, obstacle robots, and sensory triggers.',
      descAr: 'البرمجة بالبلوكات المرئية، روبوتات تفادي العقبات، والمشغلات الحسية.',
      level: 'L2: Programmer (50–69 pts)',
      color: 'border-emerald-300 bg-emerald-50/80 dark:bg-emerald-950/40 text-emerald-700 dark:text-emerald-300',
      badgeColor: 'bg-emerald-600',
      outcomes: [
        'Construct motorized LEGO mechanical arms & mobile rovers',
        'Learn directional sequencing, repeat loops, and input sensors',
        'Demonstrate independent debugging of logical execution flaws',
      ],
    },
    {
      stage: 1,
      width: 'sm:w-full',
      titleEn: 'Stage 1: Explorer Track (L1)',
      titleAr: 'المرحلة ١: مسار المستكشف (L1)',
      descEn: 'Tactile floor robots (Bee-Bot), visual discrimination, and foundational logic.',
      descAr: 'روبوتات ملموسة (Bee-Bot)، التمييز البصري، وتأسيس التفكير المنطقي.',
      level: 'L1: Coder (0–49 pts)',
      color: 'border-slate-300 bg-slate-100 dark:bg-slate-800 text-slate-700 dark:text-slate-300',
      badgeColor: 'bg-slate-800 dark:bg-slate-700',
      outcomes: [
        'Hands-on tactile navigation cards & directional sequences',
        'Pattern recognition and cause-and-effect digital games',
        'Sensory-friendly introduction to computational thinking',
      ],
    },
  ];

  const domains = [
    {
      id: 1,
      icon: Brain,
      titleEn: '1. Cognitive Ability (25%)',
      titleAr: '١. القدرات المعرفية والتفكير المنطقي (25%)',
      descEn: 'Visual pattern matrices, classification, sequencing, and cause-and-effect reasoning.',
      descAr: 'مصفوفات الأنماط البصرية، التصنيف، التسلسل، واستنتاج السبب والنتيجة.',
      targetLevel: 'Maps to L1–L4 Logical Readiness',
    },
    {
      id: 2,
      icon: Cpu,
      titleEn: '2. Functional Skills (20%)',
      titleAr: '٢. المهارات الوظيفية والخوارزمية (20%)',
      descEn: 'Following multi-step instructions, robot mission navigation, and spatial orientation.',
      descAr: 'اتباع التعليمات المركبة، توجيه الروبوتات في المهام، والتوجيه المكاني.',
      targetLevel: 'Maps to Algorithmic Thinking',
    },
    {
      id: 3,
      icon: MessageSquare,
      titleEn: '3. Communication Level (20%)',
      titleAr: '٣. الفهم والتواصل واللغة (20%)',
      descEn: 'Receptive and expressive technical comprehension, AAC/Sign language cues, picture match.',
      descAr: 'الفهم اللغوي للمصطلحات التقنية، دعم لغة الإشارة والرموز، ومطابقة الصور.',
      targetLevel: 'Maps to Accessible Syntax Comprehension',
    },
    {
      id: 4,
      icon: Activity,
      titleEn: '4. Behavioral & Learning Readiness (15%)',
      titleAr: '٤. الجاهزية السلوكية والتكيّف (15%)',
      descEn: 'Task persistence, adaptation to rule changes, and focused attention intervals.',
      descAr: 'المثابرة أثناء حل المهام، التكيف مع تغير القواعد البرمجية، والتركيز المستمر.',
      targetLevel: 'Maps to Independent Work Persistence',
    },
    {
      id: 5,
      icon: MousePointerClick,
      titleEn: '5. Fine Motor & Technology Skills (20%)',
      titleAr: '٥. المهارات الحركية والتفاعل التقني (20%)',
      descEn: 'Mouse control, touch targets, drag-and-drop mechanics, and assistive input mastery.',
      descAr: 'التحكم بالفأرة، شاشات اللمس، السحب والإفلات، واستخدام التقنيات المساعدة.',
      targetLevel: 'Maps to Digital Execution Readiness',
    },
  ];

  return (
    <div
      className="w-full max-w-5xl mx-auto rounded-3xl p-6 sm:p-10 border shadow-xl transition-colors space-y-8"
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
    >
      {/* Header & View Switcher */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between pb-4 border-b gap-4" style={{ borderColor: 'var(--color-border)' }}>
        <div>
          <div className="flex items-center gap-2">
            <span
              className="text-xs font-bold uppercase tracking-wider px-3 py-1 rounded-full border"
              style={{
                backgroundColor: 'var(--color-primary-blue-light)',
                color: 'var(--color-primary-blue)',
                borderColor: 'var(--color-primary-blue)',
              }}
            >
              <Sparkles className="w-3.5 h-3.5 inline me-1" />
              {lang === 'ar' ? 'منظومة التعلّم والتقييم خماسية المراحل' : '5-Stage Learning & Assessment Architecture'}
            </span>
          </div>
          <h2 className="text-2xl sm:text-3xl font-bold tracking-tight mt-2" style={{ color: 'var(--color-text)' }}>
            {activeTab === 'tracks'
              ? (lang === 'ar' ? 'هرم المسارات التعليمية التكيّفي (Stages 1 – 5)' : '5-Stage Career Tracks Pyramid')
              : (lang === 'ar' ? 'المحاور الخمسة للتقييم التشخيصي' : '5 Diagnostic Assessment Domains')}
          </h2>
          <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>
            {lang === 'ar'
              ? 'تدرج تعليمي قائم على الأدلة يربط المهارات المعرفية بالتسكين في المستويات L1 إلى L4'
              : 'Evidence-based progression framework connecting diagnostic domains to levels L1 through L4.'}
          </p>
        </div>

        <div className="flex items-center gap-2">
          {/* Tab Selector */}
          <div className="p-1 rounded-2xl border flex items-center gap-1" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
            <button
              type="button"
              onClick={() => setActiveTab('tracks')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'tracks'
                  ? 'bg-blue-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {lang === 'ar' ? 'هرم المسارات' : 'Career Tracks'}
            </button>
            <button
              type="button"
              onClick={() => setActiveTab('domains')}
              className={`px-3 py-1.5 rounded-xl text-xs font-bold transition-all cursor-pointer ${
                activeTab === 'domains'
                  ? 'bg-emerald-600 text-white shadow-xs'
                  : 'text-slate-600 dark:text-slate-400 hover:text-slate-900'
              }`}
            >
              {lang === 'ar' ? 'نطاقات التقييم' : 'Assessment Domains'}
            </button>
          </div>

          {showBackBtn && onBack && (
            <button
              type="button"
              onClick={onBack}
              className="px-3 py-1.5 text-xs font-semibold rounded-xl border hover:bg-slate-100 dark:hover:bg-slate-800"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              {lang === 'ar' ? '← رجوع' : '← Back'}
            </button>
          )}
        </div>
      </div>

      {/* Tab 1: Stepped Interactive Visual Pyramid (Stages 5 to 1) */}
      {activeTab === 'tracks' ? (
        <div className="w-full flex flex-col items-center gap-3.5 py-4">
          <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mb-1">
            ▲ {lang === 'ar' ? 'قمة الهرم: الجاهزية المهنية ومشروع التخرج' : 'Apex: Applied AI & Career Readiness'}
          </div>

          {tracks.map((track) => (
            <div
              key={track.stage}
              className={`w-full ${track.width} min-h-[72px] p-4 rounded-2xl border shadow-sm flex items-center justify-between gap-4 transition-all duration-300 hover:scale-[1.02] cursor-pointer ${track.color}`}
              onClick={() =>
                setSelectedDetail({
                  title: lang === 'ar' ? track.titleAr : track.titleEn,
                  level: track.level,
                  description: lang === 'ar' ? track.descAr : track.descEn,
                  outcomes: track.outcomes,
                })
              }
            >
              <div className="flex items-center gap-3 min-w-0">
                <span className={`w-8 h-8 rounded-xl ${track.badgeColor} text-white font-black text-xs flex items-center justify-center shrink-0 shadow-sm`}>
                  {track.stage}
                </span>
                <div className="min-w-0">
                  <div className="flex items-center gap-2">
                    <h4 className="text-xs sm:text-sm font-bold truncate">
                      {lang === 'ar' ? track.titleAr : track.titleEn}
                    </h4>
                  </div>
                  <p className="text-[11px] opacity-80 truncate">
                    {lang === 'ar' ? track.descAr : track.descEn}
                  </p>
                </div>
              </div>

              <div className="flex items-center gap-2 shrink-0">
                <span className="hidden md:inline text-[10px] font-mono font-bold px-2 py-0.5 rounded-md bg-white/70 dark:bg-black/40">
                  {track.level.split(' ')[0]}
                </span>
                <button
                  type="button"
                  className="px-3 py-1.5 rounded-xl text-[11px] font-bold bg-white/90 dark:bg-slate-900 shadow-xs flex items-center gap-1 hover:opacity-90"
                >
                  <span>{lang === 'ar' ? 'التفاصيل' : 'Details'}</span>
                  <ChevronRight className="w-3 h-3 rtl:rotate-180" />
                </button>
              </div>
            </div>
          ))}

          <div className="text-[11px] font-bold uppercase tracking-widest text-slate-400 mt-2">
            ▼ {lang === 'ar' ? 'قاعدة الهرم: تأسيس المنطق والتفاعل اللمسي' : 'Base: Foundations & Sensory Exploration'}
          </div>
        </div>
      ) : (
        /* Tab 2: 5 Assessment Domains Breakdown */
        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-3 gap-4 py-2">
          {domains.map((dom) => {
            const Icon = dom.icon;
            return (
              <div
                key={dom.id}
                className="p-5 rounded-2xl border space-y-3 transition-all hover:shadow-md hover:border-emerald-500"
                style={{
                  backgroundColor: 'var(--color-bg)',
                  borderColor: 'var(--color-border)',
                }}
              >
                <div className="flex items-center justify-between">
                  <span className="p-2.5 rounded-xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                    <Icon className="w-5 h-5" />
                  </span>
                  <span className="text-[10px] font-mono font-bold px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-slate-700 dark:text-slate-300">
                    Domain {dom.id}
                  </span>
                </div>

                <div>
                  <h4 className="text-xs sm:text-sm font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                    {lang === 'ar' ? dom.titleAr : dom.titleEn}
                  </h4>
                  <p className="text-[11px] leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
                    {lang === 'ar' ? dom.descAr : dom.descEn}
                  </p>
                </div>

                <div className="pt-2 border-t text-[10px] font-bold text-emerald-600 dark:text-emerald-400 flex items-center gap-1" style={{ borderColor: 'var(--color-border)' }}>
                  <CheckCircle2 className="w-3 h-3" />
                  <span>{dom.targetLevel}</span>
                </div>
              </div>
            );
          })}
        </div>
      )}

      {/* Details Modal */}
      {selectedDetail && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-lg rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-5"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <div>
                <h3 className="text-base font-bold" style={{ color: 'var(--color-text)' }}>
                  {selectedDetail.title}
                </h3>
                <span className="text-xs font-mono font-bold text-blue-600">
                  {selectedDetail.level}
                </span>
              </div>
              <button
                type="button"
                onClick={() => setSelectedDetail(null)}
                className="p-1.5 rounded-lg hover:bg-slate-100 dark:hover:bg-slate-800"
              >
                <X className="w-4 h-4" />
              </button>
            </div>

            <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              {selectedDetail.description}
            </p>

            <div className="space-y-2">
              <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text)' }}>
                {lang === 'ar' ? 'مخرجات التعلم المستهدفة:' : 'Target Learning Outcomes:'}
              </span>
              <div className="space-y-1.5">
                {selectedDetail.outcomes.map((out, idx) => (
                  <div key={idx} className="flex items-start gap-2 text-xs" style={{ color: 'var(--color-text)' }}>
                    <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                    <span>{out}</span>
                  </div>
                ))}
              </div>
            </div>

            <div className="pt-2">
              <button
                type="button"
                onClick={() => setSelectedDetail(null)}
                className="w-full py-2.5 rounded-xl text-white font-bold text-xs shadow-md"
                style={{ backgroundColor: 'var(--color-primary-blue)' }}
              >
                {lang === 'ar' ? 'إغلاق' : 'Close'}
              </button>
            </div>
          </div>
        </div>
      )}
    </div>
  );
};
