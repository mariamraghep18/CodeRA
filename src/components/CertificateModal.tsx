import React from 'react';
import { useMockData } from '../context/MockDataContext';
import { Award, Printer, Download, X, CheckCircle, ShieldCheck, Sparkles } from 'lucide-react';

interface CertificateModalProps {
  learnerName: string;
  level: string;
  levelName: string;
  score: number;
  issueDate?: string;
  onClose: () => void;
}

export const CertificateModal: React.FC<CertificateModalProps> = ({
  learnerName,
  level,
  levelName,
  score,
  issueDate = new Date().toLocaleDateString('en-US', { year: 'numeric', month: 'long', day: 'numeric' }),
  onClose,
}) => {
  const { lang } = useMockData();
  const certId = `CR-CERT-${Math.random().toString(36).substring(2, 8).toUpperCase()}-2026`;

  const handlePrint = () => {
    window.print();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/70 backdrop-blur-sm animate-in fade-in overflow-y-auto">
      <div className="w-full max-w-3xl my-8 rounded-3xl border shadow-2xl overflow-hidden flex flex-col relative animate-in zoom-in-95 bg-white text-slate-900">
        {/* Top Control Bar */}
        <div className="p-4 border-b flex items-center justify-between bg-slate-50 print:hidden">
          <div className="flex items-center gap-2">
            <span className="p-1.5 rounded-lg bg-blue-100 text-blue-700">
              <Award className="w-5 h-5" />
            </span>
            <span className="text-xs font-bold text-slate-700">
              {lang === 'ar' ? 'معاينة الشهادة المعتمدة' : 'Official Verified Certificate Preview'}
            </span>
          </div>

          <div className="flex items-center gap-2">
            <button
              type="button"
              onClick={handlePrint}
              className="flex items-center gap-1.5 px-3 py-1.5 rounded-xl border border-slate-300 text-xs font-bold hover:bg-slate-100 transition-colors cursor-pointer"
            >
              <Printer className="w-3.5 h-3.5" />
              <span>{lang === 'ar' ? 'طباعة / تصدير PDF' : 'Print / Export PDF'}</span>
            </button>
            <button
              type="button"
              onClick={onClose}
              className="p-1.5 rounded-xl hover:bg-slate-200 text-slate-500 hover:text-slate-800 transition-colors cursor-pointer"
            >
              <X className="w-5 h-5" />
            </button>
          </div>
        </div>

        {/* The Printable Certificate Frame */}
        <div className="p-8 sm:p-12 relative overflow-hidden bg-gradient-to-br from-[#FAF9F5] via-white to-[#F0F4FF] border-8 border-double border-[#D4AF37]/40 m-4 rounded-2xl shadow-inner">
          {/* Watermark / Corner Embellishments */}
          <div className="absolute top-2 start-2 w-16 h-16 border-t-2 border-s-2 border-[#D4AF37]/60 pointer-events-none" />
          <div className="absolute top-2 end-2 w-16 h-16 border-t-2 border-e-2 border-[#D4AF37]/60 pointer-events-none" />
          <div className="absolute bottom-2 start-2 w-16 h-16 border-b-2 border-s-2 border-[#D4AF37]/60 pointer-events-none" />
          <div className="absolute bottom-2 end-2 w-16 h-16 border-b-2 border-e-2 border-[#D4AF37]/60 pointer-events-none" />

          {/* Header */}
          <div className="text-center space-y-2 mb-8">
            <div className="inline-flex items-center gap-2 px-4 py-1 rounded-full bg-blue-50 border border-blue-200 text-blue-700 text-xs font-bold uppercase tracking-widest">
              <span>CodeRa Technologies</span>
              <span>•</span>
              <span>Inclusive Tech Ecosystem</span>
            </div>
            <h1 className="text-3xl sm:text-4xl font-serif font-black tracking-wide text-slate-900 pt-2">
              {lang === 'ar' ? 'شهادة إتقان واعتماد برمجية' : 'Certificate of Achievement'}
            </h1>
            <p className="text-xs uppercase tracking-widest text-[#B8860B] font-bold">
              {lang === 'ar' ? 'تسكين وإتقان المسار التكنولوجي' : 'Adaptive Placement & Technical Competency'}
            </p>
          </div>

          {/* Recipient */}
          <div className="text-center space-y-3 mb-8">
            <p className="text-xs text-slate-500 uppercase tracking-wider">
              {lang === 'ar' ? 'تُمنح هذه الشهادة بكل فخر إلى الطالب / ـة:' : 'This is proudly presented to:'}
            </p>
            <h2 className="text-3xl sm:text-4xl font-black text-blue-900 border-b-2 border-blue-200 pb-2 inline-block px-8 font-serif">
              {learnerName}
            </h2>
            <p className="text-xs sm:text-sm text-slate-600 max-w-lg mx-auto leading-relaxed pt-2">
              {lang === 'ar'
                ? `تقديراً لاجتياز التقييم التشخيصي خماسي المحاور واعتماد مستوى (${level}: ${levelName}) بنجاح وبدرجة كفاءة ${score}% في التفكير الخوارزمي والتكنولوجيا.`
                : `For successfully completing the 5-domain diagnostic placement assessment and achieving level (${level}: ${levelName}) with an evaluated mastery score of ${score}%.`}
            </p>
          </div>

          {/* Verification Badges Grid */}
          <div className="grid grid-cols-1 sm:grid-cols-3 gap-4 py-6 border-y border-slate-200/80 my-6 text-center text-xs">
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-bold">Issue Date</span>
              <span className="font-semibold text-slate-800">{issueDate}</span>
            </div>
            <div className="flex flex-col items-center">
              <span className="p-2 rounded-full bg-[#D4AF37]/15 text-[#B8860B] mb-1">
                <ShieldCheck className="w-6 h-6" />
              </span>
              <span className="font-mono text-[10px] text-slate-500">{certId}</span>
            </div>
            <div>
              <span className="block text-[10px] text-slate-400 uppercase font-bold">Placement Level</span>
              <span className="font-bold text-blue-700">{level} — {levelName}</span>
            </div>
          </div>

          {/* Signatures */}
          <div className="flex items-center justify-between pt-6 text-xs text-slate-600 px-6">
            <div className="text-center">
              <div className="w-36 border-b border-slate-400 mb-1 font-serif italic text-blue-900">
                Dr. E. Mostafa
              </div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Academic Lead</span>
            </div>

            {/* Seal */}
            <div className="w-16 h-16 rounded-full border-2 border-dashed border-[#D4AF37] flex items-center justify-center text-[10px] font-bold text-[#B8860B] uppercase tracking-tighter text-center p-1 rotate-12">
              CodeRa Verified
            </div>

            <div className="text-center">
              <div className="w-36 border-b border-slate-400 mb-1 font-serif italic text-emerald-900">
                K. Al-Ghamdi
              </div>
              <span className="text-[10px] text-slate-400 uppercase font-bold">Executive Director</span>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};
