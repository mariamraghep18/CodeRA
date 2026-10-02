import React, { useState, useMemo } from 'react';
import { useRouter } from '../../router/Router';
import { useMockData, OrgProfile, OrgMentor, OrgStudent } from '../../context/MockDataContext';
import { UniversalBackButton } from '../../components/UniversalBackButton';
import { ProfileAvatarButton } from '../../components/profile/ProfileAvatarButton';
import {
  Building2,
  CheckCircle2,
  Clock,
  AlertCircle,
  AlertTriangle,
  FileText,
  UploadCloud,
  CreditCard,
  Users,
  UserCheck,
  ShieldCheck,
  Plus,
  ArrowRight,
  ArrowLeft,
  Lock,
  TrendingUp,
  Award,
  ChevronRight,
  Trash2,
  Mail,
  GraduationCap,
  Phone,
  MapPin,
  Globe,
  Search,
  Filter,
  Download,
  ExternalLink,
  RefreshCw,
  BarChart3,
  PieChart,
  Sliders,
  Bell,
  Sparkles,
  X,
  Check,
  Eye,
  HelpCircle,
  Settings,
  Shield,
  Sun,
  Moon,
  Volume2,
} from 'lucide-react';

/* ========================================================================= */
/* VIEW 1: ORGANIZATION REGISTRATION (Screenshot 50)                         */
/* ========================================================================= */
export const OrgRegistrationStep1Page: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, registerOrgStep1, organizations, activeOrgId, setActiveOrgId } = useMockData();
  const currentOrg = organizations.find((o) => o.id === activeOrgId) || organizations[0];

  const [name, setName] = useState(currentOrg?.name || 'Hope Academy');
  const [orgType, setOrgType] = useState<'school' | 'center' | 'ngo'>(currentOrg?.orgType || 'school');
  const [contactPerson, setContactPerson] = useState(currentOrg?.contactPerson || 'Dr. Sarah Al-Mansoor');
  const [email, setEmail] = useState(currentOrg?.email || 'contact@hopeacademy.edu');
  const [phone, setPhone] = useState(currentOrg?.phone || '+966 11 456 7890');
  const [country, setCountry] = useState(currentOrg?.country || 'Saudi Arabia');
  const [city, setCity] = useState(currentOrg?.city || 'Riyadh');
  const [description, setDescription] = useState(
    currentOrg?.description ||
      'Premier inclusive K-12 learning institution dedicated to empowering neurodiverse cohorts through adaptive STEM and computer science curriculum.'
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    const newOrg = registerOrgStep1({
      name,
      orgType,
      contactPerson,
      email,
      phone,
      country,
      city,
      description,
    });
    setActiveOrgId(newOrg.id);
    navigate('/org-pending-step1');
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] py-8 px-4 sm:px-6 lg:px-8 transition-colors" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto space-y-6">
        <UniversalBackButton to="/" label="← Back to Home" />

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Main Form (8 Columns) */}
          <div
            className="lg:col-span-8 rounded-3xl p-6 sm:p-10 border shadow-xl space-y-6"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <div className="space-y-2 border-b pb-6" style={{ borderColor: 'var(--color-border)' }}>
              <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
                <Building2 className="w-3.5 h-3.5" />
                <span>Basic Information</span>
              </div>
              <h1 className="text-3xl sm:text-4xl font-black font-serif tracking-tight" style={{ color: 'var(--color-text)' }}>
                Organization Registration
              </h1>
              <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>
                Tell us about your organization to begin setting up your learning hub.
              </p>
            </div>

            <form onSubmit={handleSubmit} className="space-y-5">
              {/* Organization Name */}
              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                  Organization Name *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={name}
                    onChange={(e) => setName(e.target.value)}
                    placeholder="e.g. Hope Academy"
                    className="w-full px-4 py-3 rounded-2xl border text-sm outline-none transition-all focus:ring-2 focus:ring-blue-500"
                    style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  />
                  <Building2 className="w-4 h-4 absolute end-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Organization Type & Contact Person */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                    Organization Type *
                  </label>
                  <select
                    value={orgType}
                    onChange={(e) => setOrgType(e.target.value as 'school' | 'center' | 'ngo')}
                    className="w-full px-4 py-3 rounded-2xl border text-sm outline-none cursor-pointer"
                    style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  >
                    <option value="school">Inclusive K-12 School</option>
                    <option value="center">Special Needs Education Center</option>
                    <option value="ngo">Non-Profit Foundation / Community Hub</option>
                  </select>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                    Contact Person Full Name *
                  </label>
                  <input
                    type="text"
                    required
                    value={contactPerson}
                    onChange={(e) => setContactPerson(e.target.value)}
                    placeholder="Dr. Sarah Al-Mansoor"
                    className="w-full px-4 py-3 rounded-2xl border text-sm outline-none"
                    style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  />
                </div>
              </div>

              {/* Email Address & Phone Number */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                    Email Address *
                  </label>
                  <div className="relative">
                    <input
                      type="email"
                      required
                      value={email}
                      onChange={(e) => setEmail(e.target.value)}
                      placeholder="contact@hopeacademy.edu"
                      className="w-full px-4 py-3 rounded-2xl border text-sm outline-none"
                      style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                    />
                    <Mail className="w-4 h-4 absolute end-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                    Phone Number *
                  </label>
                  <div className="relative">
                    <input
                      type="tel"
                      required
                      value={phone}
                      onChange={(e) => setPhone(e.target.value)}
                      placeholder="+966 11 456 7890"
                      className="w-full px-4 py-3 rounded-2xl border text-sm outline-none"
                      style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                    />
                    <Phone className="w-4 h-4 absolute end-4 top-1/2 -translate-y-1/2 text-slate-400" />
                  </div>
                </div>
              </div>

              {/* Country & City */}
              <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                    Country *
                  </label>
                  <input
                    type="text"
                    required
                    value={country}
                    onChange={(e) => setCountry(e.target.value)}
                    placeholder="Saudi Arabia"
                    className="w-full px-4 py-3 rounded-2xl border text-sm outline-none"
                    style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                    City *
                  </label>
                  <input
                    type="text"
                    required
                    value={city}
                    onChange={(e) => setCity(e.target.value)}
                    placeholder="Riyadh"
                    className="w-full px-4 py-3 rounded-2xl border text-sm outline-none"
                    style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  />
                </div>
              </div>

              {/* Brief Description */}
              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                  Brief Description of Your Organization *
                </label>
                <textarea
                  rows={3}
                  required
                  value={description}
                  onChange={(e) => setDescription(e.target.value)}
                  placeholder="Describe your student cohort, educational mission, and technology goals..."
                  className="w-full px-4 py-3 rounded-2xl border text-sm outline-none resize-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                />
              </div>

              {/* Submit Button */}
              <div className="pt-2">
                <button
                  type="submit"
                  className="w-full py-4 rounded-2xl text-white font-bold text-sm shadow-lg transition-all hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                  style={{ backgroundColor: 'var(--color-primary-green)' }}
                >
                  <span>Submit for Review</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            </form>
          </div>

          {/* Right Sidebar Card (4 Columns) */}
          <div className="lg:col-span-4 space-y-6">
            <div
              className="rounded-3xl p-6 sm:p-8 border shadow-xl space-y-5"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <div className="flex items-center gap-3">
                <span className="p-2.5 rounded-2xl bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300">
                  <Sparkles className="w-5 h-5" />
                </span>
                <h3 className="text-xl font-bold font-serif" style={{ color: 'var(--color-text)' }}>
                  Why Partner with CodeRa?
                </h3>
              </div>

              <div className="space-y-4 text-xs sm:text-sm">
                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 dark:text-white font-bold">Adaptive Curriculum</strong>
                    <span className="text-slate-700 dark:text-slate-300">
                      Standard-aligned CS curriculum modified for motor, cognitive, and sensory accessibility.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 dark:text-white font-bold">Capacity-Based Packages</strong>
                    <span className="text-slate-700 dark:text-slate-300">
                      Flexible seat allocations for verified instructors and growing student cohorts.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 dark:text-white font-bold">Mentor & Student Management</strong>
                    <span className="text-slate-700 dark:text-slate-300">
                      Real-time dashboards to track individual cognitive progress and lesson accommodations.
                    </span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3 rounded-2xl bg-slate-50 dark:bg-slate-900/60 border border-slate-200 dark:border-slate-800">
                  <CheckCircle2 className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                  <div>
                    <strong className="block text-slate-900 dark:text-white font-bold">Inclusive Accessibility Tools</strong>
                    <span className="text-slate-700 dark:text-slate-300">
                      Embedded screen readers, sign language synthesis, and tactile loop support.
                    </span>
                  </div>
                </div>
              </div>

              <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-xs text-blue-900 dark:text-blue-300">
                <span className="font-bold block mb-1">Institutional Support Line:</span>
                <span>Need help with customized enterprise tenders? Reach out to partners@codera.org</span>
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* VIEW 2: APPLICATION UNDER REVIEW (Screenshot 51)                          */
/* ========================================================================= */
export const OrgPendingStep1Page: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, organizations, activeOrgId } = useMockData();
  const org = organizations.find((o) => o.id === activeOrgId) || organizations[0];

  return (
    <div className="min-h-[calc(100vh-4.5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-10 transition-colors" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div
        className="w-full max-w-xl rounded-3xl p-8 sm:p-10 border shadow-2xl space-y-6 animate-in zoom-in-95 text-center"
        style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        <div className="flex justify-start">
          <UniversalBackButton to="/org-registration-step1" label="← Back to Registration Details" />
        </div>

        {/* Status Badge & Icon */}
        <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-full text-xs font-bold bg-amber-100 text-amber-900 dark:bg-amber-950 dark:text-amber-300 border border-amber-300 dark:border-amber-800">
          <Clock className="w-3.5 h-3.5 animate-spin" />
          <span>Pending Step 1 Approval</span>
        </div>

        <div className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-amber-600 bg-amber-50 dark:bg-amber-950/50 border border-amber-200 dark:border-amber-800 shadow-inner">
          <Clock className="w-10 h-10 animate-pulse" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black font-serif tracking-tight" style={{ color: 'var(--color-text)' }}>
            Application Under Review
          </h1>
          <p className="text-xs sm:text-sm max-w-md mx-auto leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            Your Step 1 registration for <strong>{org?.name || 'Hope Academy'}</strong> has been submitted and is being reviewed by our team. We may contact you for clarification.
          </p>
        </div>

        {/* Registration Progress Checklist */}
        <div className="p-5 rounded-2xl border text-start space-y-3" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
          <span className="text-[11px] font-bold uppercase tracking-wider text-slate-600 dark:text-slate-300 block">
            Registration Progress
          </span>
          <div className="space-y-2 text-xs">
            <div className="flex items-center gap-2.5 text-emerald-600 dark:text-emerald-400 font-bold">
              <CheckCircle2 className="w-4 h-4" />
              <span>Step 1: Submitted & Verified</span>
            </div>
            <div className="flex items-center gap-2.5 text-amber-600 dark:text-amber-400 font-bold">
              <Clock className="w-4 h-4" />
              <span>Administrative Review (Current)</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
              <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[9px]">3</div>
              <span>Step 2: Business Documentation</span>
            </div>
            <div className="flex items-center gap-2.5 text-slate-600 dark:text-slate-300">
              <div className="w-4 h-4 rounded-full border border-slate-300 dark:border-slate-700 flex items-center justify-center text-[9px]">4</div>
              <span>Package Activation</span>
            </div>
          </div>
        </div>

        {/* Informational Box: What happens next? */}
        <div className="p-4 rounded-2xl bg-blue-50 dark:bg-blue-950/40 border border-blue-200 dark:border-blue-900 text-start space-y-1.5 text-xs text-blue-900 dark:text-blue-200">
          <div className="flex items-center gap-2 font-bold">
            <HelpCircle className="w-4 h-4 text-blue-600 dark:text-blue-400" />
            <span>What happens next?</span>
          </div>
          <p className="text-[11px] leading-relaxed text-blue-800 dark:text-blue-300">
            Our educational compliance officers will examine your organization details within <strong>24–48 hours</strong>. You will receive an official notification to upload your business documents.
          </p>
        </div>

        {/* Navigation / Simulation Buttons */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={() => navigate('/org-registration-step2')}
            className="w-full py-4 rounded-2xl text-white font-bold text-sm shadow-md transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            style={{ backgroundColor: 'var(--color-primary-blue)' }}
          >
            <span>Proceed to Step 2: Business Documentation</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>

          <button
            type="button"
            onClick={() => navigate('/org-changes-required')}
            className="w-full py-2.5 rounded-xl border text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}
          >
            Preview "Changes Required / Resubmission" View (Demo)
          </button>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* VIEW 3: BUSINESS & LEGAL VERIFICATION (Screenshot 41)                     */
/* ========================================================================= */
export const OrgRegistrationStep2Page: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, organizations, activeOrgId, submitOrgStep2Docs } = useMockData();
  const org = organizations.find((o) => o.id === activeOrgId) || organizations[0];

  const [taxNumber, setTaxNumber] = useState(org?.taxNumber || 'TRN-984210543');
  const [businessNumber, setBusinessNumber] = useState(org?.businessNumber || 'CR-1010884920');
  const [address, setAddress] = useState(org?.address || 'Building 42, King Fahd Road, Al-Olaya District, Riyadh');
  const [website, setWebsite] = useState(org?.website || 'https://www.hopeacademy.edu');
  const [expectedMentors, setExpectedMentors] = useState<number>(org?.expectedMentors || 25);
  const [expectedStudents, setExpectedStudents] = useState<number>(org?.expectedStudents || 150);

  const [taxCardFile, setTaxCardFile] = useState<string>('Tax_Card_Scan_Verified.pdf');
  const [crFile, setCrFile] = useState<string>('Commercial_Registration_2026.pdf');

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (org) {
      submitOrgStep2Docs(org.id, [taxCardFile, crFile], {
        taxNumber,
        businessNumber,
        address,
        website,
        expectedMentors,
        expectedStudents,
      });
    }
    navigate('/org-package-selection');
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] py-8 px-4 sm:px-6 lg:px-8 transition-colors" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-4xl mx-auto space-y-6">
        <UniversalBackButton to="/org-registration-step1" label="← Back to Basic Information" />

        {/* Notification Banner: Step 1 Approved! */}
        <div className="p-4 sm:p-5 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-300 dark:border-emerald-800 flex items-start sm:center gap-3 shadow-sm">
          <div className="w-8 h-8 rounded-xl bg-emerald-500 text-white flex items-center justify-center shrink-0">
            <CheckCircle2 className="w-5 h-5" />
          </div>
          <div className="flex-1">
            <strong className="text-emerald-900 dark:text-emerald-200 font-bold block text-sm">
              Step 1 Approved!
            </strong>
            <p className="text-xs text-emerald-800 dark:text-emerald-300">
              Your organizational details for <strong>{org?.name || 'Hope Academy'}</strong> are verified. Please complete your business documentation below.
            </p>
          </div>
        </div>

        <div
          className="rounded-3xl p-6 sm:p-10 border shadow-xl space-y-6"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <div className="space-y-2 border-b pb-6" style={{ borderColor: 'var(--color-border)' }}>
            <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-blue-100 text-blue-800 dark:bg-blue-950 dark:text-blue-300">
              <FileText className="w-3.5 h-3.5" />
              <span>Business Documentation</span>
            </div>
            <h1 className="text-3xl font-black font-serif tracking-tight" style={{ color: 'var(--color-text)' }}>
              Business & Legal Verification
            </h1>
            <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>
              Upload your official legal registration and tell us your initial capacity expectations.
            </p>
          </div>

          <form onSubmit={handleSubmit} className="space-y-6">
            {/* Tax & Business Registration Numbers */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                  Tax Registration Number (TRN) *
                </label>
                <input
                  type="text"
                  required
                  value={taxNumber}
                  onChange={(e) => setTaxNumber(e.target.value)}
                  placeholder="TRN-984210543"
                  className="w-full px-4 py-3 rounded-2xl border text-sm outline-none font-mono"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                  Business Registration Number (CR) *
                </label>
                <input
                  type="text"
                  required
                  value={businessNumber}
                  onChange={(e) => setBusinessNumber(e.target.value)}
                  placeholder="CR-1010884920"
                  className="w-full px-4 py-3 rounded-2xl border text-sm outline-none font-mono"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                />
              </div>
            </div>

            {/* Document Upload Areas */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* Tax Card Scan */}
              <div className="p-5 rounded-2xl border-2 border-dashed space-y-3 text-center" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
                <UploadCloud className="w-8 h-8 mx-auto text-blue-600" />
                <div>
                  <span className="text-xs font-bold block" style={{ color: 'var(--color-text)' }}>Tax Card Scan *</span>
                  <span className="text-[11px] opacity-75" style={{ color: 'var(--color-text-muted)' }}>Drag & drop or click to replace (PDF, PNG, JPG)</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-blue-50 dark:bg-blue-950/60 border border-blue-200 dark:border-blue-900 text-xs font-mono font-bold text-blue-700 dark:text-blue-300">
                  <FileText className="w-4 h-4 text-blue-600" />
                  <span>{taxCardFile}</span>
                </div>
              </div>

              {/* Commercial Registration Document */}
              <div className="p-5 rounded-2xl border-2 border-dashed space-y-3 text-center" style={{ borderColor: 'var(--color-border)', backgroundColor: 'var(--color-bg)' }}>
                <UploadCloud className="w-8 h-8 mx-auto text-emerald-600" />
                <div>
                  <span className="text-xs font-bold block" style={{ color: 'var(--color-text)' }}>Business Registration Document *</span>
                  <span className="text-[11px] opacity-75" style={{ color: 'var(--color-text-muted)' }}>Drag & drop or click to replace (PDF up to 10MB)</span>
                </div>
                <div className="inline-flex items-center gap-2 px-3 py-1.5 rounded-xl bg-emerald-50 dark:bg-emerald-950/60 border border-emerald-200 dark:border-emerald-900 text-xs font-mono font-bold text-emerald-700 dark:text-emerald-300">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span>{crFile}</span>
                </div>
              </div>
            </div>

            {/* Official Address & Website */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                  Official Organization Address *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={address}
                    onChange={(e) => setAddress(e.target.value)}
                    placeholder="Building 42, King Fahd Road, Riyadh"
                    className="w-full px-4 py-3 rounded-2xl border text-sm outline-none"
                    style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  />
                  <MapPin className="w-4 h-4 absolute end-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                  Organization Website (Optional)
                </label>
                <div className="relative">
                  <input
                    type="url"
                    value={website}
                    onChange={(e) => setWebsite(e.target.value)}
                    placeholder="https://www.hopeacademy.edu"
                    className="w-full px-4 py-3 rounded-2xl border text-sm outline-none"
                    style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  />
                  <Globe className="w-4 h-4 absolute end-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>
            </div>

            {/* Number of Expected Mentors & Students */}
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                  Number of Expected Mentors *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={1}
                    max={500}
                    required
                    value={expectedMentors}
                    onChange={(e) => setExpectedMentors(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-2xl border text-sm outline-none font-bold"
                    style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  />
                  <UserCheck className="w-4 h-4 absolute end-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                <span className="text-[10px] text-slate-600 dark:text-slate-300 mt-1 block">Instructors or SEN specialists</span>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                  Number of Expected Students *
                </label>
                <div className="relative">
                  <input
                    type="number"
                    min={5}
                    max={2000}
                    required
                    value={expectedStudents}
                    onChange={(e) => setExpectedStudents(Number(e.target.value))}
                    className="w-full px-4 py-3 rounded-2xl border text-sm outline-none font-bold"
                    style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  />
                  <GraduationCap className="w-4 h-4 absolute end-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
                <span className="text-[10px] text-slate-600 dark:text-slate-300 mt-1 block">Learners in your active cohort</span>
              </div>
            </div>

            {/* Submit Button */}
            <div className="pt-4 flex flex-col sm:flex-row gap-3">
              <button
                type="button"
                onClick={() => navigate('/org-changes-required')}
                className="py-3.5 px-5 rounded-2xl border text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              >
                Simulate Review Issues
              </button>
              <button
                type="submit"
                className="flex-1 py-4 rounded-2xl text-white font-bold text-sm shadow-md transition-all hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                style={{ backgroundColor: 'var(--color-primary-green)' }}
              >
                <span>Submit Documents for Review</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* VIEW 4: UPDATE DOCUMENTATION (RESUBMISSION) (Screenshot 42)                */
/* ========================================================================= */
export const OrgChangesRequiredPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, organizations, activeOrgId, submitOrgStep2Docs } = useMockData();
  const org = organizations.find((o) => o.id === activeOrgId) || organizations[0];

  const [taxNumber, setTaxNumber] = useState(org?.taxNumber || 'TRN-984210543');
  const [businessNumber, setBusinessNumber] = useState(org?.businessNumber || 'CR-1010884920');
  const [taxCardScan, setTaxCardScan] = useState('Tax_Card_Scan_HighRes_300DPI.pdf');
  const [crDoc, setCrDoc] = useState('Commercial_Registration_Renewal_2026.pdf');

  const handleResubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (org) {
      submitOrgStep2Docs(org.id, [taxCardScan, crDoc], {
        taxNumber,
        businessNumber,
      });
    }
    navigate('/org-package-selection');
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] py-8 px-4 sm:px-6 lg:px-8 transition-colors" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-3xl mx-auto space-y-6">
        <UniversalBackButton to="/org-registration-step2" label="← Back to Business Documentation" />

        {/* Warning Banner: Changes Required */}
        <div className="p-5 rounded-2xl bg-amber-50 dark:bg-amber-950/40 border-2 border-amber-400 dark:border-amber-700 flex items-start gap-3.5 shadow-md">
          <div className="w-9 h-9 rounded-xl bg-amber-500 text-white flex items-center justify-center shrink-0">
            <AlertTriangle className="w-5 h-5" />
          </div>
          <div>
            <strong className="text-amber-950 dark:text-amber-200 font-black text-base block">
              Changes Required – Please review the notes below and resubmit.
            </strong>
            <p className="text-xs text-amber-900 dark:text-amber-300 mt-1">
              Your application for <strong>{org?.name || 'Hope Academy'}</strong> was reviewed, but some files require an updated version before we can issue institutional clearance.
            </p>
          </div>
        </div>

        {/* Admin Review Notes Box */}
        <div className="p-6 rounded-3xl bg-rose-50/70 dark:bg-rose-950/30 border border-rose-200 dark:border-rose-900 space-y-2">
          <div className="flex items-center gap-2 text-rose-700 dark:text-rose-300 font-bold text-xs uppercase tracking-wider">
            <ShieldCheck className="w-4 h-4" />
            <span>Admin Reviewer Audit Notes</span>
          </div>
          <p className="text-xs sm:text-sm text-slate-800 dark:text-slate-200 font-mono leading-relaxed bg-white/70 dark:bg-slate-900/50 p-4 rounded-2xl border border-rose-100 dark:border-rose-900/50">
            "Commercial registration certificate submitted on file shows expiration in 2025. Please upload the renewed 2026 official copy with the chamber stamp. In addition, please ensure the tax card scan resolution is clearly legible."
          </p>
        </div>

        {/* Editable Form with highlighted updates */}
        <div
          className="rounded-3xl p-6 sm:p-8 border shadow-xl space-y-6"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <h2 className="text-xl font-bold font-serif" style={{ color: 'var(--color-text)' }}>
            Update & Resubmit Business Documentation
          </h2>

          <form onSubmit={handleResubmit} className="space-y-5">
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                  Tax Registration Number (TRN)
                </label>
                <input
                  type="text"
                  required
                  value={taxNumber}
                  onChange={(e) => setTaxNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border text-sm outline-none font-mono"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                />
              </div>

              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                  Commercial Registration Number (CR)
                </label>
                <input
                  type="text"
                  required
                  value={businessNumber}
                  onChange={(e) => setBusinessNumber(e.target.value)}
                  className="w-full px-4 py-3 rounded-2xl border text-sm outline-none font-mono"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                />
              </div>
            </div>

            {/* Document Replacement Zone */}
            <div className="space-y-3">
              <label className="block text-xs font-bold" style={{ color: 'var(--color-text)' }}>
                Replaced Documents (Ready for Resubmission):
              </label>

              <div className="p-4 rounded-2xl border bg-slate-50 dark:bg-slate-900 flex items-center justify-between gap-3 text-xs" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{taxCardScan}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  Updated (300 DPI)
                </span>
              </div>

              <div className="p-4 rounded-2xl border bg-slate-50 dark:bg-slate-900 flex items-center justify-between gap-3 text-xs" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex items-center gap-2.5">
                  <FileText className="w-4 h-4 text-emerald-600" />
                  <span className="font-mono font-bold text-slate-800 dark:text-slate-200">{crDoc}</span>
                </div>
                <span className="px-2.5 py-1 rounded-full text-[10px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                  2026 Renewal Validated
                </span>
              </div>
            </div>

            <div className="pt-2">
              <button
                type="submit"
                className="w-full py-4 rounded-2xl text-white font-bold text-sm shadow-md transition-all hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
                style={{ backgroundColor: 'var(--color-primary-green)' }}
              >
                <span>Resubmit Documents</span>
                <ArrowRight className="w-4 h-4 rtl:rotate-180" />
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* VIEW 5: CHOOSE YOUR PACKAGE (Screenshot 43)                               */
/* ========================================================================= */
export const OrgPackageSelectionPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, organizations, activeOrgId } = useMockData();
  const org = organizations.find((o) => o.id === activeOrgId) || organizations[0];

  const [selectedTier, setSelectedTier] = useState<'Starter' | 'Growth' | 'Enterprise'>('Growth');

  const tiers = [
    {
      id: 'Starter' as const,
      name: 'Starter',
      price: '$2,400',
      priceNum: 2400,
      period: '/ year',
      mentors: 'Up to 10 Mentors',
      students: 'Up to 50 Students',
      popular: false,
      features: [
        'Accessible IDE platform access',
        'Standard 4-level coding curriculum',
        'Email & ticketing support',
        'Basic learner assessment analytics',
        'Standard certificate issuance',
      ],
    },
    {
      id: 'Growth' as const,
      name: 'Growth',
      price: '$5,400',
      priceNum: 5400,
      period: '/ year',
      mentors: 'Up to 25 Mentors',
      students: 'Up to 150 Students',
      popular: true,
      features: [
        'Everything in Starter',
        'Full sensory & tactile learning tracks',
        'Priority mentor onboarding & training',
        'Advanced cognitive pacing metrics',
        'Dedicated institution success coordinator',
        'Custom class schedule integrations',
      ],
    },
    {
      id: 'Enterprise' as const,
      name: 'Enterprise',
      price: '$12,000',
      priceNum: 12000,
      period: '/ year',
      mentors: 'Up to Unlimited Mentors',
      students: 'Up to 500 Students',
      popular: false,
      features: [
        'Custom curriculum tracks & tailoring',
        'Unlimited mentor accounts',
        'Full institutional API & LMS integration',
        '24/7 dedicated support & SLA',
        'Custom assistive hardware calibration',
        'Multi-campus administrative hierarchy',
      ],
    },
  ];

  const handleSelect = (tierId: 'Starter' | 'Growth' | 'Enterprise') => {
    const chosen = tiers.find((t) => t.id === tierId) || tiers[1];
    sessionStorage.setItem(
      'codera_selected_org_pkg',
      JSON.stringify({
        tier: `${chosen.name} Package Plan`,
        tierId: chosen.id,
        price: chosen.priceNum,
        priceFormatted: chosen.price,
        mentors: chosen.mentors,
        students: chosen.students,
      })
    );
    navigate('/org-payment');
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] py-8 px-4 sm:px-6 lg:px-8 transition-colors space-y-6" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-6xl mx-auto space-y-6">
        <UniversalBackButton to="/org-registration-step2" label="← Back to Business Documentation" />

        {/* Title & Subtitle */}
        <div className="text-center max-w-2xl mx-auto space-y-3">
          <div className="flex justify-center">
            <span className="inline-flex items-center px-4 py-1.5 rounded-full text-xs font-bold uppercase tracking-wider bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 border border-blue-200 dark:border-blue-800">
              CAPACITY PLANS
            </span>
          </div>
          <h1 className="text-3xl sm:text-5xl font-black font-serif tracking-tight" style={{ color: 'var(--color-text)' }}>
            Choose Your Package
          </h1>
          <p className="text-xs sm:text-base leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            Select a capacity plan that fits your organization. You can upgrade later.
          </p>
        </div>

        {/* 3 Pricing Tier Cards */}
        <div className="grid grid-cols-1 md:grid-cols-3 gap-6 lg:gap-8 items-stretch pt-4">
          {tiers.map((tier) => {
            return (
              <div
                key={tier.id}
                className={`rounded-3xl border p-6 sm:p-8 shadow-xl flex flex-col justify-between space-y-6 relative transition-all duration-300 ${
                  tier.popular
                    ? 'ring-2 ring-emerald-500 scale-[1.02] shadow-2xl'
                    : 'hover:shadow-2xl hover:-translate-y-1'
                }`}
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                {/* Popular Badge */}
                {tier.popular && (
                  <div className="absolute -top-3.5 left-1/2 -translate-x-1/2 px-4 py-1 rounded-full text-xs font-black uppercase tracking-wider bg-[#00A86B] text-white shadow-md">
                    Most Popular
                  </div>
                )}

                <div className="space-y-5">
                  <div>
                    <h3 className="text-2xl font-black font-serif" style={{ color: 'var(--color-text)' }}>
                      {tier.name}
                    </h3>
                    <div className="mt-3 flex items-baseline gap-1">
                      <span className="text-3xl sm:text-4xl font-black" style={{ color: 'var(--color-text)' }}>
                        {tier.price}
                      </span>
                      <span className="text-xs font-semibold text-slate-500">{tier.period}</span>
                    </div>
                  </div>

                  {/* Mentors & Students Highlight */}
                  <div className="p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border space-y-1.5 text-xs font-bold" style={{ borderColor: 'var(--color-border)' }}>
                    <div className="flex items-center gap-2 text-blue-600 dark:text-blue-400">
                      <UserCheck className="w-4 h-4" />
                      <span>{tier.mentors}</span>
                    </div>
                    <div className="flex items-center gap-2 text-emerald-600 dark:text-emerald-400">
                      <GraduationCap className="w-4 h-4" />
                      <span>{tier.students}</span>
                    </div>
                  </div>

                  {/* Features List */}
                  <div className="space-y-2.5 pt-2 border-t text-xs leading-relaxed" style={{ borderColor: 'var(--color-border)' }}>
                    {tier.features.map((feat, fIdx) => (
                      <div key={fIdx} className="flex items-start gap-2">
                        <Check className="w-4 h-4 text-emerald-600 shrink-0 mt-0.5" />
                        <span style={{ color: 'var(--color-text)' }}>{feat}</span>
                      </div>
                    ))}
                  </div>
                </div>

                {/* Button */}
                <button
                  type="button"
                  onClick={() => handleSelect(tier.id)}
                  className={`w-full py-4 rounded-2xl font-bold text-sm shadow-md transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-2 cursor-pointer ${
                    tier.popular
                      ? 'bg-[#00A86B] hover:bg-[#0f766e] text-white shadow-emerald-500/20'
                      : 'bg-[#2563eb] hover:bg-[#1d4ed8] text-white shadow-blue-500/20'
                  }`}
                >
                  <span>Select Package</span>
                  <ArrowRight className="w-4 h-4 rtl:rotate-180" />
                </button>
              </div>
            );
          })}
        </div>

        {/* Support Link */}
        <div className="text-center pt-4">
          <p className="text-xs text-slate-500 dark:text-slate-400">
            Need a custom multi-district arrangement?{' '}
            <a href="mailto:partners@codera.org" className="text-blue-600 font-bold hover:underline">
              Contact our institutional partnerships team
            </a>
          </p>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* VIEW 6: COMPLETE YOUR REGISTRATION (SECURE PAYMENT) (Screenshot 44)       */
/* ========================================================================= */
export const OrgPaymentPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, purchaseOrgPackage, organizations, activeOrgId } = useMockData();
  const org = organizations.find((o) => o.id === activeOrgId) || organizations[0];

  const [storedPkg] = useState(() => {
    try {
      const saved = sessionStorage.getItem('codera_selected_org_pkg');
      if (saved) return JSON.parse(saved);
    } catch (e) {}
    return {
      tier: 'Growth Package Plan',
      tierId: 'Growth',
      price: 5400,
      priceFormatted: '$5,400',
      mentors: 'Up to 25 Mentors',
      students: 'Up to 150 Students',
    };
  });

  const [cardholderName, setCardholderName] = useState(org?.name || 'Hope Academy');
  const [cardNumber, setCardNumber] = useState('4532 •••• •••• 8892');
  const [expiry, setExpiry] = useState('08/28');
  const [cvc, setCvc] = useState('842');
  const [isProcessing, setIsProcessing] = useState(false);

  const handlePay = (e: React.FormEvent) => {
    e.preventDefault();
    setIsProcessing(true);
    setTimeout(() => {
      if (org) {
        const validTier: 'Starter' | 'Growth' | 'Enterprise' =
          storedPkg.tierId === 'Starter' || storedPkg.tierId === 'Enterprise'
            ? storedPkg.tierId
            : 'Growth';
        purchaseOrgPackage(org.id, validTier);
      }
      setIsProcessing(false);
      navigate('/org-success');
    }, 1200);
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] py-8 px-4 sm:px-6 lg:px-8 transition-colors" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div className="max-w-5xl mx-auto space-y-6">
        <UniversalBackButton to="/org-package-selection" label="← Back to Package Selection" />

        <div className="text-center max-w-xl mx-auto space-y-2">
          <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
            <Lock className="w-3.5 h-3.5" />
            <span>256-Bit SSL Encrypted Checkout</span>
          </div>
          <h1 className="text-3xl sm:text-4xl font-black font-serif tracking-tight" style={{ color: 'var(--color-text)' }}>
            Complete Your Registration
          </h1>
          <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>
            Verify your order details and input payment details below to activate your organizational hub.
          </p>
        </div>

        <div className="grid grid-cols-1 lg:grid-cols-12 gap-8 items-start">
          {/* Left Column: Order Summary (5 Columns) */}
          <div
            className="lg:col-span-5 rounded-3xl p-6 sm:p-8 border shadow-xl space-y-6"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--color-border)' }}>
              <h2 className="text-lg font-bold font-serif" style={{ color: 'var(--color-text)' }}>Order Summary</h2>
              <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-lg">Annual Billing</span>
            </div>

            <div className="space-y-3 text-xs">
              <div className="flex justify-between py-1 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Plan:</span>
                <span className="font-bold text-sm" style={{ color: 'var(--color-text)' }}>{storedPkg.tier}</span>
              </div>
              <div className="flex justify-between py-1 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Capacity Limits:</span>
                <span className="font-bold text-end" style={{ color: 'var(--color-text)' }}>
                  {storedPkg.mentors}<br />{storedPkg.students}
                </span>
              </div>
              <div className="flex justify-between py-1 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <span style={{ color: 'var(--color-text-muted)' }}>Billing Cycle:</span>
                <span className="font-bold" style={{ color: 'var(--color-text)' }}>12 Months (Renews Annually)</span>
              </div>
            </div>

            <div className="p-4 rounded-2xl bg-emerald-50 dark:bg-emerald-950/40 border border-emerald-200 dark:border-emerald-800 space-y-1">
              <div className="flex justify-between items-baseline">
                <span className="text-xs font-bold text-emerald-900 dark:text-emerald-200">Total Due Today:</span>
                <span className="text-2xl font-black text-emerald-600 dark:text-emerald-400">
                  ${storedPkg.price.toLocaleString()}.00
                </span>
              </div>
              <span className="text-[10px] text-emerald-700 dark:text-emerald-300 block">Includes all taxes and institutional licensing</span>
            </div>

            <div className="space-y-2 text-[11px] text-slate-500 dark:text-slate-400 pt-2">
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Instant workspace activation upon confirmation</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>30-day institutional money-back guarantee</span>
              </div>
              <div className="flex items-center gap-2">
                <CheckCircle2 className="w-3.5 h-3.5 text-emerald-600" />
                <span>Official PDF receipt for accounting</span>
              </div>
            </div>
          </div>

          {/* Right Column: Payment Information (7 Columns) */}
          <div
            className="lg:col-span-7 rounded-3xl p-6 sm:p-8 border shadow-xl space-y-6"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <div className="border-b pb-4" style={{ borderColor: 'var(--color-border)' }}>
              <h2 className="text-lg font-bold font-serif" style={{ color: 'var(--color-text)' }}>Payment Information</h2>
              <p className="text-xs" style={{ color: 'var(--color-text-muted)' }}>Card details for institutional subscription</p>
            </div>

            <form onSubmit={handlePay} className="space-y-5">
              {/* Cardholder Name */}
              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                  Cardholder Name (Organization) *
                </label>
                <input
                  type="text"
                  required
                  value={cardholderName}
                  onChange={(e) => setCardholderName(e.target.value)}
                  placeholder="Hope Academy"
                  className="w-full px-4 py-3 rounded-2xl border text-sm outline-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                />
              </div>

              {/* Card Number */}
              <div>
                <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                  Card Number *
                </label>
                <div className="relative">
                  <input
                    type="text"
                    required
                    value={cardNumber}
                    onChange={(e) => setCardNumber(e.target.value)}
                    className="w-full px-4 py-3 rounded-2xl border text-sm font-mono outline-none"
                    style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  />
                  <CreditCard className="w-4 h-4 absolute end-4 top-1/2 -translate-y-1/2 text-slate-400" />
                </div>
              </div>

              {/* Expiration Date & CVC */}
              <div className="grid grid-cols-2 gap-4">
                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                    Expiration Date *
                  </label>
                  <input
                    type="text"
                    required
                    value={expiry}
                    onChange={(e) => setExpiry(e.target.value)}
                    placeholder="MM/YY"
                    className="w-full px-4 py-3 rounded-2xl border text-sm font-mono outline-none"
                    style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  />
                </div>

                <div>
                  <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>
                    CVC / CVV *
                  </label>
                  <input
                    type="text"
                    required
                    maxLength={4}
                    value={cvc}
                    onChange={(e) => setCvc(e.target.value)}
                    placeholder="123"
                    className="w-full px-4 py-3 rounded-2xl border text-sm font-mono outline-none"
                    style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                  />
                </div>
              </div>

              {/* Secure Pay Button */}
              <div className="pt-3">
                <button
                  type="submit"
                  disabled={isProcessing}
                  className="w-full py-4 rounded-2xl text-white font-bold text-sm sm:text-base shadow-lg transition-all hover:scale-[1.01] active:scale-98 flex items-center justify-center gap-2 cursor-pointer disabled:opacity-75"
                  style={{ backgroundColor: 'var(--color-primary-green)' }}
                >
                  {isProcessing ? (
                    <>
                      <Clock className="w-4 h-4 animate-spin" />
                      <span>Activating Institutional License...</span>
                    </>
                  ) : (
                    <>
                      <Lock className="w-4 h-4" />
                      <span>Pay ${storedPkg.price.toLocaleString()}.00 / year</span>
                    </>
                  )}
                </button>
              </div>
            </form>
          </div>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* VIEW 7: PAYMENT SUCCESSFUL! (Screenshot 45)                               */
/* ========================================================================= */
export const OrgSuccessPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, organizations, activeOrgId } = useMockData();
  const org = organizations.find((o) => o.id === activeOrgId) || organizations[0];
  const [downloadToast, setDownloadToast] = useState(false);

  const orgName = org?.name || 'Hope Academy';
  const tierName = org?.activePackage?.tierName ? `${org.activePackage.tierName} Package Plan` : 'Growth Package Plan';
  const pricePaid = org?.paidAmount ? `$${org.paidAmount.toLocaleString()}.00 / year` : '$5,400.00 / year';
  const txnId = org?.transactionId || 'TXN-ORG-98412055';

  const handleDownloadReceipt = () => {
    setDownloadToast(true);
    setTimeout(() => setDownloadToast(false), 3000);
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] flex items-center justify-center p-4 sm:p-6 lg:p-10 transition-colors" style={{ backgroundColor: 'var(--color-bg)' }}>
      <div
        className="w-full max-w-lg rounded-3xl p-8 sm:p-10 border shadow-2xl space-y-6 animate-in zoom-in-95 text-center"
        style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        <div className="flex justify-start">
          <UniversalBackButton to="/org-payment" label="← Back to Payment" />
        </div>

        {/* Success checkmark icon */}
        <div className="w-20 h-20 rounded-3xl mx-auto flex items-center justify-center text-white bg-emerald-600 shadow-xl shadow-emerald-500/30 animate-bounce">
          <CheckCircle2 className="w-10 h-10" />
        </div>

        <div className="space-y-2">
          <h1 className="text-3xl font-black font-serif tracking-tight" style={{ color: 'var(--color-text)' }}>
            Payment Successful!
          </h1>
          <p className="text-xs sm:text-sm leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
            Welcome to CodeRa! <strong>{orgName}</strong>'s institutional workspace and mentor capacity have been successfully provisioned.
          </p>
        </div>

        {/* Transaction Details Box */}
        <div className="p-5 rounded-2xl border text-start space-y-2.5 text-xs" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
          <div className="flex justify-between pb-1 border-b" style={{ borderColor: 'var(--color-border)' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>Organization:</span>
            <span className="font-bold" style={{ color: 'var(--color-text)' }}>{orgName}</span>
          </div>
          <div className="flex justify-between pb-1 border-b" style={{ borderColor: 'var(--color-border)' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>Unlocked Tier:</span>
            <span className="font-bold text-emerald-600 dark:text-emerald-400">{tierName}</span>
          </div>
          <div className="flex justify-between pb-1 border-b" style={{ borderColor: 'var(--color-border)' }}>
            <span style={{ color: 'var(--color-text-muted)' }}>Amount Paid:</span>
            <span className="font-bold font-mono" style={{ color: 'var(--color-text)' }}>{pricePaid}</span>
          </div>
          <div className="flex justify-between">
            <span style={{ color: 'var(--color-text-muted)' }}>Transaction ID:</span>
            <span className="font-bold font-mono text-[11px] text-blue-600 dark:text-blue-400">{txnId}</span>
          </div>
        </div>

        {downloadToast && (
          <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold animate-in fade-in flex items-center justify-center gap-2">
            <Check className="w-4 h-4" />
            <span>PDF receipt generated & downloaded successfully!</span>
          </div>
        )}

        {/* Action Buttons */}
        <div className="space-y-3 pt-2">
          <button
            type="button"
            onClick={handleDownloadReceipt}
            className="w-full py-3.5 rounded-2xl border font-bold text-xs sm:text-sm hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center justify-center gap-2 cursor-pointer"
            style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
          >
            <Download className="w-4 h-4" />
            <span>Download PDF Receipt</span>
          </button>

          <button
            type="button"
            onClick={() => navigate('/org-dashboard')}
            className="w-full py-4 rounded-2xl text-white font-bold text-sm shadow-md transition-all hover:scale-102 active:scale-98 flex items-center justify-center gap-2 cursor-pointer"
            style={{ backgroundColor: 'var(--color-primary-green)' }}
          >
            <span>Go to {orgName}'s Dashboard</span>
            <ArrowRight className="w-4 h-4 rtl:rotate-180" />
          </button>
        </div>
      </div>
    </div>
  );
};

/* ========================================================================= */
/* SHARED ORGANIZATION HEADER (for Views 8, 9, 10, 11)                       */
/* ========================================================================= */
interface OrgHeaderProps {
  activeTab: 'dashboard' | 'mentors' | 'students' | 'analytics' | 'settings';
  setActiveTab: (tab: 'dashboard' | 'mentors' | 'students' | 'analytics' | 'settings') => void;
  orgName: string;
}

const OrgWorkspaceHeader: React.FC<OrgHeaderProps> = ({ activeTab, setActiveTab, orgName }) => {
  const { lang, setLang, theme, toggleTheme } = useMockData();
  const { navigate } = useRouter();

  return (
    <header className="sticky top-0 z-30 border-b backdrop-blur-md transition-colors" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        <div className="flex items-center justify-between h-16 gap-4">
          {/* Brand & Tab Navigation */}
          <div className="flex items-center gap-6 overflow-x-auto py-2">
            <div
              onClick={() => {
                setActiveTab('dashboard');
                navigate('/org-dashboard');
              }}
              className="flex items-center gap-2 cursor-pointer shrink-0"
            >
              <div className="w-9 h-9 rounded-xl bg-blue-600 text-white flex items-center justify-center font-black shadow-md">
                <Building2 className="w-5 h-5" />
              </div>
              <span className="font-black font-serif text-lg tracking-tight hidden sm:inline" style={{ color: 'var(--color-text)' }}>
                CodeRa <span className="text-xs font-sans font-bold text-emerald-600 uppercase">Hub</span>
              </span>
            </div>

            <nav className="flex items-center gap-1 sm:gap-2">
              <button
                type="button"
                onClick={() => {
                  setActiveTab('dashboard');
                  navigate('/org-dashboard');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'dashboard'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Dashboard
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('mentors');
                  navigate('/org-manage-mentors');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'mentors'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Mentors
              </button>
              <button
                type="button"
                onClick={() => {
                  setActiveTab('students');
                  navigate('/org-manage-students');
                }}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'students'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Students
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('analytics')}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'analytics'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Analytics
              </button>
              <button
                type="button"
                onClick={() => setActiveTab('settings')}
                className={`px-3 py-1.5 rounded-xl text-xs sm:text-sm font-bold transition-all cursor-pointer ${
                  activeTab === 'settings'
                    ? 'bg-blue-600 text-white shadow-sm'
                    : 'text-slate-600 dark:text-slate-300 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
              >
                Settings
              </button>
            </nav>
          </div>

          {/* Right Controls: Org Badge, Lang, Theme, Notifications */}
          <div className="flex items-center gap-2 sm:gap-3 shrink-0">
            {/* Lang Switcher */}
            <button
              type="button"
              onClick={() => setLang(lang === 'ar' ? 'en' : 'ar')}
              className="px-2.5 py-1.5 rounded-xl border text-xs font-bold hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              {lang === 'ar' ? 'EN' : 'عربي'}
            </button>

            {/* Theme Toggle */}
            <button
              type="button"
              onClick={toggleTheme}
              className="p-2 rounded-xl border text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              title="Toggle theme"
            >
              {theme === 'dark' ? <Sun className="w-4 h-4 text-amber-400" /> : <Moon className="w-4 h-4 text-slate-600" />}
            </button>

            {/* Notifications */}
            <div className="relative">
              <button
                type="button"
                className="p-2 rounded-xl border text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer relative"
                style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
              >
                <Bell className="w-4 h-4" />
                <span className="absolute -top-1 -right-1 w-2.5 h-2.5 bg-rose-500 rounded-full ring-2 ring-white dark:ring-slate-900" />
              </button>
            </div>

            {/* Interactive Organization Profile Avatar & Customization Trigger */}
            <ProfileAvatarButton roleOverride="org" size="sm" showLabel={true} />
          </div>
        </div>
      </div>
    </header>
  );
};

/* ========================================================================= */
/* VIEW 8: ORGANIZATION DASHBOARD (Screenshot 46)                            */
/* ========================================================================= */
export const OrgDashboardPage: React.FC = () => {
  const { navigate } = useRouter();
  const { lang, organizations, activeOrgId, addOrgMentor, addOrgStudent } = useMockData();
  const org = organizations.find((o) => o.id === activeOrgId) || organizations[0];

  const [activeTab, setActiveTab] = useState<'dashboard' | 'mentors' | 'students' | 'analytics' | 'settings'>('dashboard');

  // Modals for quick actions
  const [showMentorModal, setShowMentorModal] = useState(false);
  const [showStudentModal, setShowStudentModal] = useState(false);
  const [newMentorName, setNewMentorName] = useState('');
  const [newMentorEmail, setNewMentorEmail] = useState('');
  const [newStudentName, setNewStudentName] = useState('');
  const [newStudentGrade, setNewStudentGrade] = useState('Grade 5');

  const orgName = org?.name || 'Hope Academy';
  const planName = org?.activePackage?.tierName ? `${org.activePackage.tierName} Package Plan` : 'Growth Package Plan';

  const mentorCapacity = org?.activePackage?.mentorCapacity || 25;
  const studentCapacity = org?.activePackage?.studentCapacity || 150;
  const mentorsCount = org?.mentors?.length || 8;
  const studentsCount = org?.students?.length || 42;

  const handleAddMentorQuick = (e: React.FormEvent) => {
    e.preventDefault();
    if (org && newMentorName && newMentorEmail) {
      addOrgMentor(org.id, { name: newMentorName, email: newMentorEmail });
      setNewMentorName('');
      setNewMentorEmail('');
      setShowMentorModal(false);
    }
  };

  const handleAddStudentQuick = (e: React.FormEvent) => {
    e.preventDefault();
    if (org && newStudentName) {
      addOrgStudent(org.id, { name: newStudentName, grade: newStudentGrade });
      setNewStudentName('');
      setShowStudentModal(false);
    }
  };

  return (
    <div className="min-h-[calc(100vh-4.5rem)] transition-colors" style={{ backgroundColor: 'var(--color-bg)' }}>
      <OrgWorkspaceHeader activeTab={activeTab} setActiveTab={setActiveTab} orgName={orgName} />

      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        {/* Universal Back Button */}
        <div className="flex justify-start">
          {activeTab === 'dashboard' ? (
            <UniversalBackButton to="/" label="← Back to Home" />
          ) : (
            <UniversalBackButton onClick={() => setActiveTab('dashboard')} label="← Back to Dashboard" />
          )}
        </div>

        {activeTab === 'dashboard' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Greeting Header */}
            <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
              <div>
                <div className="inline-flex items-center gap-2 px-3 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300 mb-2">
                  <Sparkles className="w-3.5 h-3.5" />
                  <span>{planName}</span>
                </div>
                <h1 className="text-3xl sm:text-4xl font-black font-serif tracking-tight" style={{ color: 'var(--color-text)' }}>
                  Welcome back, {orgName}!
                </h1>
                <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
                  Here is your real-time overview of learning cohorts, instructor allocations, and platform activity.
                </p>
              </div>

              {/* Quick Management Actions buttons */}
              <div className="flex flex-wrap gap-2.5">
                <button
                  type="button"
                  onClick={() => setShowMentorModal(true)}
                  className="px-4 py-2.5 rounded-2xl text-white font-bold text-xs shadow-md transition-all hover:scale-102 flex items-center gap-1.5 cursor-pointer"
                  style={{ backgroundColor: 'var(--color-primary-blue)' }}
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Mentor</span>
                </button>
                <button
                  type="button"
                  onClick={() => setShowStudentModal(true)}
                  className="px-4 py-2.5 rounded-2xl text-white font-bold text-xs shadow-md transition-all hover:scale-102 flex items-center gap-1.5 cursor-pointer"
                  style={{ backgroundColor: 'var(--color-primary-green)' }}
                >
                  <Plus className="w-4 h-4" />
                  <span>+ Add Student</span>
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('analytics')}
                  className="px-4 py-2.5 rounded-2xl border font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                >
                  View Reports
                </button>
                <button
                  type="button"
                  onClick={() => setActiveTab('settings')}
                  className="px-4 py-2.5 rounded-2xl border font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors cursor-pointer"
                  style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                >
                  Manage Settings
                </button>
              </div>
            </div>

            {/* Top Metric Cards (4 Cards) */}
            <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-5">
              {/* Metric 1: Active Mentors */}
              <div
                className="rounded-3xl p-6 border shadow-lg space-y-3"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Active Mentors</span>
                  <div className="w-10 h-10 rounded-2xl bg-blue-100 text-blue-600 dark:bg-blue-950 dark:text-blue-300 flex items-center justify-center">
                    <UserCheck className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black" style={{ color: 'var(--color-text)' }}>
                    {mentorsCount} <span className="text-sm font-semibold text-slate-500">/ {mentorCapacity}</span>
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(mentorsCount / mentorCapacity) * 100}%` }} />
                </div>
                <span className="text-[11px] text-blue-600 dark:text-blue-400 font-bold block">
                  {mentorCapacity - mentorsCount} Instructor seats available
                </span>
              </div>

              {/* Metric 2: Active Students */}
              <div
                className="rounded-3xl p-6 border shadow-lg space-y-3"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Active Students</span>
                  <div className="w-10 h-10 rounded-2xl bg-emerald-100 text-emerald-600 dark:bg-emerald-950 dark:text-emerald-300 flex items-center justify-center">
                    <GraduationCap className="w-5 h-5" />
                  </div>
                </div>
                <div className="flex items-baseline gap-2">
                  <span className="text-3xl font-black" style={{ color: 'var(--color-text)' }}>
                    {studentsCount} <span className="text-sm font-semibold text-slate-500">/ {studentCapacity}</span>
                  </span>
                </div>
                <div className="w-full h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(studentsCount / studentCapacity) * 100}%` }} />
                </div>
                <span className="text-[11px] text-emerald-600 dark:text-emerald-400 font-bold block">
                  {studentCapacity - studentsCount} Enrolled seats remaining
                </span>
              </div>

              {/* Metric 3: Courses Assigned */}
              <div
                className="rounded-3xl p-6 border shadow-lg space-y-3"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Courses Assigned</span>
                  <div className="w-10 h-10 rounded-2xl bg-purple-100 text-purple-600 dark:bg-purple-950 dark:text-purple-300 flex items-center justify-center">
                    <Award className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <span className="text-3xl font-black" style={{ color: 'var(--color-text)' }}>12 Tracks</span>
                </div>
                <p className="text-[11px] text-slate-500 dark:text-slate-400">
                  Across Python, Tactile Robotics, Web & Sign Language
                </p>
              </div>

              {/* Metric 4: Completion Rate */}
              <div
                className="rounded-3xl p-6 border shadow-lg space-y-3"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div className="flex items-center justify-between">
                  <span className="text-xs font-bold uppercase tracking-wider" style={{ color: 'var(--color-text-muted)' }}>Completion Rate</span>
                  <div className="w-10 h-10 rounded-2xl bg-amber-100 text-amber-600 dark:bg-amber-950 dark:text-amber-300 flex items-center justify-center">
                    <TrendingUp className="w-5 h-5" />
                  </div>
                </div>
                <div>
                  <span className="text-3xl font-black text-amber-600 dark:text-amber-400">73%</span>
                </div>
                <span className="text-[11px] text-emerald-600 font-bold flex items-center gap-1">
                  <span>+8.4% growth this month</span>
                </span>
              </div>
            </div>

            {/* Resource Capacity Progress Section */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-6">
              <div
                className="rounded-3xl p-6 sm:p-8 border shadow-xl space-y-4"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base" style={{ color: 'var(--color-text)' }}>Mentor Seat Allocation</h3>
                    <p className="text-xs text-slate-500">Supervisory quota for verified instructors</p>
                  </div>
                  <span className="text-xl font-black text-blue-600">
                    {Math.round((mentorsCount / mentorCapacity) * 100)}% Used
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-blue-600 rounded-full" style={{ width: `${(mentorsCount / mentorCapacity) * 100}%` }} />
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span style={{ color: 'var(--color-text-muted)' }}>{mentorsCount} Active of {mentorCapacity} limit</span>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('mentors');
                      navigate('/org-manage-mentors');
                    }}
                    className="text-blue-600 font-bold hover:underline cursor-pointer"
                  >
                    View Roster →
                  </button>
                </div>
              </div>

              <div
                className="rounded-3xl p-6 sm:p-8 border shadow-xl space-y-4"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <div className="flex items-center justify-between">
                  <div>
                    <h3 className="font-bold text-base" style={{ color: 'var(--color-text)' }}>Student Seat Allocation</h3>
                    <p className="text-xs text-slate-500">Cohort accounts provisioned under license</p>
                  </div>
                  <span className="text-xl font-black text-emerald-600">
                    {Math.round((studentsCount / studentCapacity) * 100)}% Used
                  </span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${(studentsCount / studentCapacity) * 100}%` }} />
                </div>
                <div className="flex justify-between items-center text-xs">
                  <span style={{ color: 'var(--color-text-muted)' }}>{studentsCount} Active of {studentCapacity} limit</span>
                  <button
                    type="button"
                    onClick={() => {
                      setActiveTab('students');
                      navigate('/org-manage-students');
                    }}
                    className="text-emerald-600 font-bold hover:underline cursor-pointer"
                  >
                    View Roster →
                  </button>
                </div>
              </div>
            </div>

            {/* Recent Workspace Activity Feed */}
            <div
              className="rounded-3xl p-6 sm:p-8 border shadow-xl space-y-5"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex items-center gap-2.5">
                  <Clock className="w-5 h-5 text-blue-600" />
                  <h3 className="font-bold text-base sm:text-lg" style={{ color: 'var(--color-text)' }}>Recent Workspace Activity</h3>
                </div>
                <span className="text-xs text-slate-500">Real-time synchronized</span>
              </div>

              <div className="space-y-3.5 text-xs sm:text-sm">
                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <p style={{ color: 'var(--color-text)' }}>
                      <strong>Dr. Tariq Al-Hashimi</strong> assigned 3 new students to <em>Python Tactile Loop Lab</em>.
                    </p>
                    <span className="text-[11px] text-slate-500">12 minutes ago</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="w-2.5 h-2.5 rounded-full bg-blue-500 mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <p style={{ color: 'var(--color-text)' }}>
                      Student <strong>Dana Al-Khatib</strong> completed <em>Unit 2: Adaptive Conditionals</em> with 92% score.
                    </p>
                    <span className="text-[11px] text-slate-500">1 hour ago</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="w-2.5 h-2.5 rounded-full bg-purple-500 mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <p style={{ color: 'var(--color-text)' }}>
                      New sensory calibration profile activated: <strong>High-Contrast & Tactile Haptic Mode</strong>.
                    </p>
                    <span className="text-[11px] text-slate-500">3 hours ago</span>
                  </div>
                </div>

                <div className="flex items-start gap-3 p-3.5 rounded-2xl bg-slate-50 dark:bg-slate-900 border" style={{ borderColor: 'var(--color-border)' }}>
                  <div className="w-2.5 h-2.5 rounded-full bg-emerald-500 mt-1.5 shrink-0" />
                  <div className="flex-1">
                    <p style={{ color: 'var(--color-text)' }}>
                      Institutional annual subscription verified: <strong>{planName}</strong> active.
                    </p>
                    <span className="text-[11px] text-slate-500">Yesterday at 14:20</span>
                  </div>
                </div>
              </div>
            </div>
          </div>
        )}

        {/* Tab 2: Mentors */}
        {activeTab === 'mentors' && <OrgMentorsView org={org} />}

        {/* Tab 3: Students */}
        {activeTab === 'students' && <OrgStudentsView org={org} />}

        {/* Tab 4: Analytics */}
        {activeTab === 'analytics' && <OrgAnalyticsView org={org} />}

        {/* Tab 5: Settings */}
        {activeTab === 'settings' && <OrgSettingsView org={org} />}
      </main>

      {/* Quick Add Mentor Modal */}
      {showMentorModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-md rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-4"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold font-serif" style={{ color: 'var(--color-text)' }}>Add New Mentor</h3>
              <button type="button" onClick={() => setShowMentorModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddMentorQuick} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1">Mentor Full Name *</label>
                <input
                  type="text"
                  required
                  value={newMentorName}
                  onChange={(e) => setNewMentorName(e.target.value)}
                  placeholder="e.g. Layla Al-Bahrani"
                  className="w-full px-4 py-2.5 rounded-xl border text-xs outline-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Mentor Email *</label>
                <input
                  type="email"
                  required
                  value={newMentorEmail}
                  onChange={(e) => setNewMentorEmail(e.target.value)}
                  placeholder="layla@hopeacademy.edu"
                  className="w-full px-4 py-2.5 rounded-xl border text-xs outline-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowMentorModal(false)}
                  className="flex-1 py-2.5 rounded-xl border font-bold text-xs"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-white font-bold text-xs shadow-md"
                  style={{ backgroundColor: 'var(--color-primary-blue)' }}
                >
                  Confirm Add
                </button>
              </div>
            </form>
          </div>
        </div>
      )}

      {/* Quick Add Student Modal */}
      {showStudentModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-md rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-4"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold font-serif" style={{ color: 'var(--color-text)' }}>Add New Student</h3>
              <button type="button" onClick={() => setShowStudentModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAddStudentQuick} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={newStudentName}
                  onChange={(e) => setNewStudentName(e.target.value)}
                  placeholder="e.g. Sami Al-Hassan"
                  className="w-full px-4 py-2.5 rounded-xl border text-xs outline-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Grade Level *</label>
                <select
                  value={newStudentGrade}
                  onChange={(e) => setNewStudentGrade(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-xs outline-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                >
                  <option value="Grade 4">Grade 4</option>
                  <option value="Grade 5">Grade 5</option>
                  <option value="Grade 6">Grade 6</option>
                  <option value="Grade 7">Grade 7</option>
                  <option value="Grade 8">Grade 8</option>
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowStudentModal(false)}
                  className="flex-1 py-2.5 rounded-xl border font-bold text-xs"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-white font-bold text-xs shadow-md"
                  style={{ backgroundColor: 'var(--color-primary-green)' }}
                >
                  Enroll Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ========================================================================= */
/* VIEW 9: MENTORS MANAGEMENT (Screenshot 47)                                */
/* ========================================================================= */
export const OrgManageMentorsPage: React.FC = () => {
  const { organizations, activeOrgId } = useMockData();
  const org = organizations.find((o) => o.id === activeOrgId) || organizations[0];
  const [activeTab, setActiveTab] = useState<'dashboard' | 'mentors' | 'students' | 'analytics' | 'settings'>('mentors');

  return (
    <div className="min-h-[calc(100vh-4.5rem)] transition-colors" style={{ backgroundColor: 'var(--color-bg)' }}>
      <OrgWorkspaceHeader activeTab={activeTab} setActiveTab={setActiveTab} orgName={org?.name || 'Hope Academy'} />
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <UniversalBackButton to="/org-dashboard" label="← Back to Dashboard" />
        <OrgMentorsView org={org} />
      </main>
    </div>
  );
};

const OrgMentorsView: React.FC<{ org: OrgProfile }> = ({ org }) => {
  const { addOrgMentor, removeOrgMentor } = useMockData();
  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState<'All' | 'Active'>('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const [mentorName, setMentorName] = useState('');
  const [mentorEmail, setMentorEmail] = useState('');
  const [mentorRole, setMentorRole] = useState('Lead SEN Specialist');
  const [studentsCount, setStudentsCount] = useState<number>(5);

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (org && mentorName && mentorEmail) {
      addOrgMentor(org.id, {
        name: mentorName,
        email: mentorEmail,
        role: mentorRole,
        studentsCount,
      });
      setMentorName('');
      setMentorEmail('');
      setShowAddModal(false);
    }
  };

  const mentorsList = org?.mentors || [];
  const filteredMentors = useMemo(() => {
    return mentorsList.filter((m) => {
      const matchSearch =
        m.name.toLowerCase().includes(search.toLowerCase()) ||
        m.email.toLowerCase().includes(search.toLowerCase()) ||
        (m.role && m.role.toLowerCase().includes(search.toLowerCase()));
      const matchStatus = statusFilter === 'All' || m.status === statusFilter;
      return matchSearch && matchStatus;
    });
  }, [mentorsList, search, statusFilter]);

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Title & Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black font-serif tracking-tight" style={{ color: 'var(--color-text)' }}>
            Mentors ({mentorsList.length} Total)
          </h1>
          <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            Manage Instructors, verify specialized educational credentials, and assign learning capacity parameters.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-2xl text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-102 flex items-center gap-2 cursor-pointer"
          style={{ backgroundColor: 'var(--color-primary-green)' }}
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Mentor</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div
        className="rounded-3xl p-4 sm:p-5 border shadow-md flex flex-col sm:flex-row items-center gap-4 justify-between"
        style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search mentors by name, role, email..."
            className="w-full px-4 py-2.5 pl-10 rounded-2xl border text-xs outline-none"
            style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
          />
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        <div className="flex items-center gap-3 w-full sm:w-auto">
          <span className="text-xs font-bold whitespace-nowrap" style={{ color: 'var(--color-text-muted)' }}>Status:</span>
          <select
            value={statusFilter}
            onChange={(e) => setStatusFilter(e.target.value as 'All' | 'Active')}
            className="px-3 py-2 rounded-xl border text-xs outline-none cursor-pointer"
            style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
          >
            <option value="All">All Statuses</option>
            <option value="Active">Active Only</option>
          </select>
        </div>
      </div>

      {/* Detailed Mentors Table */}
      <div
        className="rounded-3xl border shadow-xl overflow-hidden"
        style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs sm:text-sm">
            <thead>
              <tr className="border-b bg-slate-50 dark:bg-slate-900/50" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
                <th className="py-4 px-6 text-start font-bold">Mentor Name</th>
                <th className="py-4 px-6 text-start font-bold">Email</th>
                <th className="py-4 px-6 text-start font-bold">Role / Specialty</th>
                <th className="py-4 px-6 text-center font-bold">Students Assigned</th>
                <th className="py-4 px-6 text-center font-bold">Status</th>
                <th className="py-4 px-6 text-start font-bold">Date Added</th>
                <th className="py-4 px-6 text-center font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
              {filteredMentors.map((m) => (
                <tr key={m.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-6 font-bold flex items-center gap-3" style={{ color: 'var(--color-text)' }}>
                    <div className="w-8 h-8 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300 font-bold flex items-center justify-center text-xs">
                      {m.name.charAt(0)}
                    </div>
                    <span>{m.name}</span>
                  </td>
                  <td className="py-4 px-6 font-mono text-xs opacity-80" style={{ color: 'var(--color-text-muted)' }}>
                    {m.email}
                  </td>
                  <td className="py-4 px-6">
                    <span className="px-2.5 py-1 rounded-xl text-xs font-semibold bg-purple-50 text-purple-700 dark:bg-purple-950/60 dark:text-purple-300 border border-purple-200 dark:border-purple-800">
                      {m.role || 'SEN Specialist'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center font-bold" style={{ color: 'var(--color-text)' }}>
                    {m.studentsCount ?? 4} Students
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      Active
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-500">{m.assignedDate || '2026-03-01'}</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Remove mentor ${m.name}? This will free up 1 mentor seat capacity.`)) {
                          removeOrgMentor && removeOrgMentor(org.id, m.id);
                        }
                      }}
                      className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                      title="Remove mentor"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Mentor Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-md rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-4"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold font-serif" style={{ color: 'var(--color-text)' }}>Add Certified Mentor</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1">Mentor Name *</label>
                <input
                  type="text"
                  required
                  value={mentorName}
                  onChange={(e) => setMentorName(e.target.value)}
                  placeholder="e.g. Layla Al-Bahrani"
                  className="w-full px-4 py-2.5 rounded-xl border text-xs outline-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Official Email *</label>
                <input
                  type="email"
                  required
                  value={mentorEmail}
                  onChange={(e) => setMentorEmail(e.target.value)}
                  placeholder="layla@hopeacademy.edu"
                  className="w-full px-4 py-2.5 rounded-xl border text-xs outline-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Role / Specialty *</label>
                <select
                  value={mentorRole}
                  onChange={(e) => setMentorRole(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-xs outline-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                >
                  <option value="Lead SEN Specialist">Lead SEN Specialist</option>
                  <option value="Assistive Tech Instructor">Assistive Tech Instructor</option>
                  <option value="Python & Robotics Mentor">Python & Robotics Mentor</option>
                  <option value="Sign Language Specialist">Sign Language Specialist</option>
                  <option value="Cognitive Pacing Coach">Cognitive Pacing Coach</option>
                </select>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Initial Students Assigned</label>
                <input
                  type="number"
                  min={0}
                  max={20}
                  value={studentsCount}
                  onChange={(e) => setStudentsCount(Number(e.target.value))}
                  className="w-full px-4 py-2.5 rounded-xl border text-xs outline-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                />
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl border font-bold text-xs"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-white font-bold text-xs shadow-md"
                  style={{ backgroundColor: 'var(--color-primary-green)' }}
                >
                  Add Mentor
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ========================================================================= */
/* VIEW 10: STUDENTS MANAGEMENT (Screenshot 48)                              */
/* ========================================================================= */
export const OrgManageStudentsPage: React.FC = () => {
  const { organizations, activeOrgId } = useMockData();
  const org = organizations.find((o) => o.id === activeOrgId) || organizations[0];
  const [activeTab, setActiveTab] = useState<'dashboard' | 'mentors' | 'students' | 'analytics' | 'settings'>('students');

  return (
    <div className="min-h-[calc(100vh-4.5rem)] transition-colors" style={{ backgroundColor: 'var(--color-bg)' }}>
      <OrgWorkspaceHeader activeTab={activeTab} setActiveTab={setActiveTab} orgName={org?.name || 'Hope Academy'} />
      <main className="max-w-7xl mx-auto p-4 sm:p-6 lg:p-8 space-y-6">
        <UniversalBackButton to="/org-dashboard" label="← Back to Dashboard" />
        <OrgStudentsView org={org} />
      </main>
    </div>
  );
};

const OrgStudentsView: React.FC<{ org: OrgProfile }> = ({ org }) => {
  const { addOrgStudent, removeOrgStudent } = useMockData();
  const [search, setSearch] = useState('');
  const [levelFilter, setLevelFilter] = useState('All');
  const [mentorFilter, setMentorFilter] = useState('All');
  const [showAddModal, setShowAddModal] = useState(false);

  const [name, setName] = useState('');
  const [email, setEmail] = useState('');
  const [grade, setGrade] = useState('Grade 5');
  const [mentor, setMentor] = useState(org?.mentors?.[0]?.name || 'Dr. Tariq Al-Hashimi');
  const [level, setLevel] = useState('Level 1');

  const studentsList = org?.students || [];

  const handleAdd = (e: React.FormEvent) => {
    e.preventDefault();
    if (org && name) {
      addOrgStudent(org.id, {
        name,
        email: email || undefined,
        grade,
        mentor,
        level,
      });
      setName('');
      setEmail('');
      setShowAddModal(false);
    }
  };

  const filteredStudents = useMemo(() => {
    return studentsList.filter((s) => {
      const matchSearch =
        s.name.toLowerCase().includes(search.toLowerCase()) ||
        (s.email && s.email.toLowerCase().includes(search.toLowerCase())) ||
        (s.mentor && s.mentor.toLowerCase().includes(search.toLowerCase()));
      const matchLevel = levelFilter === 'All' || s.level === levelFilter;
      const matchMentor = mentorFilter === 'All' || s.mentor === mentorFilter;
      return matchSearch && matchLevel && matchMentor;
    });
  }, [studentsList, search, levelFilter, mentorFilter]);

  return (
    <div className="space-y-6 animate-in fade-in">
      {/* Title & Action Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black font-serif tracking-tight" style={{ color: 'var(--color-text)' }}>
            Students ({studentsList.length} Total)
          </h1>
          <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            Monitor workspace student roster, progress across cognitive profiles, and assign dedicated mentor specialists.
          </p>
        </div>

        <button
          type="button"
          onClick={() => setShowAddModal(true)}
          className="px-5 py-3 rounded-2xl text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-102 flex items-center gap-2 cursor-pointer"
          style={{ backgroundColor: 'var(--color-primary-green)' }}
        >
          <Plus className="w-4 h-4" />
          <span>+ Add Student</span>
        </button>
      </div>

      {/* Filter / Search Bar */}
      <div
        className="rounded-3xl p-4 sm:p-5 border shadow-md flex flex-col sm:flex-row items-center gap-4 justify-between"
        style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        <div className="relative w-full sm:w-80">
          <input
            type="text"
            value={search}
            onChange={(e) => setSearch(e.target.value)}
            placeholder="Search students by name, email, mentor..."
            className="w-full px-4 py-2.5 pl-10 rounded-2xl border text-xs outline-none"
            style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
          />
          <Search className="w-4 h-4 absolute left-3.5 top-1/2 -translate-y-1/2 text-slate-400" />
        </div>

        <div className="flex flex-wrap items-center gap-3 w-full sm:w-auto">
          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Level:</span>
            <select
              value={levelFilter}
              onChange={(e) => setLevelFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border text-xs outline-none cursor-pointer"
              style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              <option value="All">All Levels</option>
              <option value="Level 1">Level 1</option>
              <option value="Level 2">Level 2</option>
              <option value="Level 3">Level 3</option>
            </select>
          </div>

          <div className="flex items-center gap-2">
            <span className="text-xs font-bold text-slate-500">Mentor:</span>
            <select
              value={mentorFilter}
              onChange={(e) => setMentorFilter(e.target.value)}
              className="px-3 py-2 rounded-xl border text-xs outline-none cursor-pointer max-w-[160px]"
              style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              <option value="All">All Mentors</option>
              {org?.mentors?.map((m) => (
                <option key={m.id} value={m.name}>{m.name}</option>
              ))}
            </select>
          </div>
        </div>
      </div>

      {/* Detailed Students Table */}
      <div
        className="rounded-3xl border shadow-xl overflow-hidden"
        style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs sm:text-sm">
            <thead>
              <tr className="border-b bg-slate-50 dark:bg-slate-900/50" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
                <th className="py-4 px-6 text-start font-bold">Student Name</th>
                <th className="py-4 px-6 text-start font-bold">Email</th>
                <th className="py-4 px-6 text-start font-bold">Assigned Mentor</th>
                <th className="py-4 px-6 text-center font-bold">Current Level</th>
                <th className="py-4 px-6 text-center font-bold">Progress</th>
                <th className="py-4 px-6 text-center font-bold">Status</th>
                <th className="py-4 px-6 text-start font-bold">Date Added</th>
                <th className="py-4 px-6 text-center font-bold">Actions</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
              {filteredStudents.map((s) => (
                <tr key={s.id} className="hover:bg-slate-50 dark:hover:bg-slate-800/40 transition-colors">
                  <td className="py-4 px-6 font-bold flex items-center gap-3" style={{ color: 'var(--color-text)' }}>
                    <div className="w-8 h-8 rounded-full bg-emerald-100 text-emerald-700 dark:bg-emerald-950 dark:text-emerald-300 font-bold flex items-center justify-center text-xs">
                      {s.name.charAt(0)}
                    </div>
                    <div>
                      <span>{s.name}</span>
                      <span className="block text-[11px] text-slate-500 font-normal">{s.grade || 'Grade 5'}</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 font-mono text-xs opacity-80" style={{ color: 'var(--color-text-muted)' }}>
                    {s.email || `${s.name.toLowerCase().replace(/\s+/g, '.')}@student.codera.org`}
                  </td>
                  <td className="py-4 px-6 font-semibold" style={{ color: 'var(--color-text)' }}>
                    {s.mentor || 'Dr. Tariq Al-Hashimi'}
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="px-2.5 py-1 rounded-xl text-xs font-bold bg-blue-50 text-blue-700 dark:bg-blue-950/60 dark:text-blue-300 border border-blue-200 dark:border-blue-900">
                      {s.level || 'Level 1'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <div className="flex items-center justify-center gap-2">
                      <div className="w-20 h-2 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                        <div className="h-full bg-emerald-500 rounded-full" style={{ width: `${s.progress ?? 65}%` }} />
                      </div>
                      <span className="font-mono text-xs font-bold">{s.progress ?? 65}%</span>
                    </div>
                  </td>
                  <td className="py-4 px-6 text-center">
                    <span className="px-3 py-1 rounded-full text-[11px] font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {s.status || 'Active'}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-xs text-slate-500">{s.assignedDate || '2026-03-05'}</td>
                  <td className="py-4 px-6 text-center">
                    <button
                      type="button"
                      onClick={() => {
                        if (confirm(`Remove student ${s.name}? This will free up 1 student seat capacity.`)) {
                          removeOrgStudent && removeOrgStudent(org.id, s.id);
                        }
                      }}
                      className="p-2 rounded-xl text-rose-600 hover:bg-rose-50 dark:hover:bg-rose-950/40 transition-colors cursor-pointer"
                      title="Remove student"
                    >
                      <Trash2 className="w-4 h-4" />
                    </button>
                  </td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>

      {/* Add Student Modal */}
      {showAddModal && (
        <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
          <div
            className="w-full max-w-md rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-4"
            style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
          >
            <div className="flex justify-between items-center">
              <h3 className="text-xl font-bold font-serif" style={{ color: 'var(--color-text)' }}>Enroll New Student</h3>
              <button type="button" onClick={() => setShowAddModal(false)} className="p-1 rounded-lg text-slate-400 hover:text-slate-600">
                <X className="w-5 h-5" />
              </button>
            </div>
            <form onSubmit={handleAdd} className="space-y-4">
              <div>
                <label className="block text-xs font-bold mb-1">Student Full Name *</label>
                <input
                  type="text"
                  required
                  value={name}
                  onChange={(e) => setName(e.target.value)}
                  placeholder="e.g. Dana Al-Khatib"
                  className="w-full px-4 py-2.5 rounded-xl border text-xs outline-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                />
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Student Email (Optional)</label>
                <input
                  type="email"
                  value={email}
                  onChange={(e) => setEmail(e.target.value)}
                  placeholder="dana@student.codera.org"
                  className="w-full px-4 py-2.5 rounded-xl border text-xs outline-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                />
              </div>
              <div className="grid grid-cols-2 gap-3">
                <div>
                  <label className="block text-xs font-bold mb-1">Grade Level *</label>
                  <select
                    value={grade}
                    onChange={(e) => setGrade(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border text-xs outline-none"
                    style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                  >
                    <option value="Grade 4">Grade 4</option>
                    <option value="Grade 5">Grade 5</option>
                    <option value="Grade 6">Grade 6</option>
                    <option value="Grade 7">Grade 7</option>
                  </select>
                </div>
                <div>
                  <label className="block text-xs font-bold mb-1">Initial Track Level *</label>
                  <select
                    value={level}
                    onChange={(e) => setLevel(e.target.value)}
                    className="w-full px-4 py-2.5 rounded-xl border text-xs outline-none"
                    style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                  >
                    <option value="Level 1">Level 1</option>
                    <option value="Level 2">Level 2</option>
                    <option value="Level 3">Level 3</option>
                  </select>
                </div>
              </div>
              <div>
                <label className="block text-xs font-bold mb-1">Assigned Mentor</label>
                <select
                  value={mentor}
                  onChange={(e) => setMentor(e.target.value)}
                  className="w-full px-4 py-2.5 rounded-xl border text-xs outline-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}
                >
                  {org?.mentors?.map((m) => (
                    <option key={m.id} value={m.name}>{m.name}</option>
                  ))}
                </select>
              </div>
              <div className="flex gap-2 pt-2">
                <button
                  type="button"
                  onClick={() => setShowAddModal(false)}
                  className="flex-1 py-2.5 rounded-xl border font-bold text-xs"
                  style={{ borderColor: 'var(--color-border)' }}
                >
                  Cancel
                </button>
                <button
                  type="submit"
                  className="flex-1 py-2.5 rounded-xl text-white font-bold text-xs shadow-md"
                  style={{ backgroundColor: 'var(--color-primary-green)' }}
                >
                  Enroll Student
                </button>
              </div>
            </form>
          </div>
        </div>
      )}
    </div>
  );
};

/* ========================================================================= */
/* VIEW 11: ANALYTICS & SETTINGS (Custom UI/UX Implementation)               */
/* ========================================================================= */
const OrgAnalyticsView: React.FC<{ org: OrgProfile }> = ({ org }) => {
  const [downloadToast, setDownloadToast] = useState(false);

  const trackMetrics = [
    { track: 'Block Coding & Loops', completion: 88, activeStudents: 18, color: 'bg-emerald-500' },
    { track: 'Python Tactile Foundations', completion: 74, activeStudents: 14, color: 'bg-blue-600' },
    { track: 'Robotics & Hardware Sensors', completion: 65, activeStudents: 10, color: 'bg-purple-600' },
    { track: 'Sign Language Interactive Code', completion: 91, activeStudents: 12, color: 'bg-amber-500' },
  ];

  const sensoryMetrics = [
    { name: 'Tactile Loop Haptics', percentage: 68, count: '29 Learners' },
    { name: 'Speech / Voice Input Coding', percentage: 45, count: '19 Learners' },
    { name: 'High-Contrast & Dyslexic Typography', percentage: 52, count: '22 Learners' },
    { name: 'Screen Reader & Audio Prompts', percentage: 38, count: '16 Learners' },
  ];

  const mentorWorkload = [
    { name: 'Dr. Tariq Al-Hashimi', students: 8, completion: '84%', hours: '32h' },
    { name: 'Layla Al-Bahrani', students: 6, completion: '78%', hours: '26h' },
    { name: 'Karim Mansour', students: 7, completion: '88%', hours: '29h' },
    { name: 'Nour El-Sherif', students: 5, completion: '92%', hours: '22h' },
  ];

  return (
    <div className="space-y-8 animate-in fade-in">
      {/* Analytics Header */}
      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4">
        <div>
          <h1 className="text-3xl font-black font-serif tracking-tight" style={{ color: 'var(--color-text)' }}>
            Workspace Analytics & Cognitive Progress
          </h1>
          <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
            Track learning pacing, sensory accommodation utilization, and mentor efficiency across your organization.
          </p>
        </div>

        <button
          type="button"
          onClick={() => {
            setDownloadToast(true);
            setTimeout(() => setDownloadToast(false), 3000);
          }}
          className="px-4 py-2.5 rounded-2xl border font-bold text-xs hover:bg-slate-100 dark:hover:bg-slate-800 transition-colors flex items-center gap-2 cursor-pointer"
          style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
        >
          <Download className="w-4 h-4" />
          <span>Export Analytics PDF</span>
        </button>
      </div>

      {downloadToast && (
        <div className="p-3 rounded-xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold animate-in fade-in flex items-center justify-center gap-2">
          <Check className="w-4 h-4" />
          <span>Institutional Progress Report generated and downloaded!</span>
        </div>
      )}

      {/* Visual Charts Grid */}
      <div className="grid grid-cols-1 lg:grid-cols-2 gap-8">
        {/* Chart 1: Completion Rates Across Tracks */}
        <div
          className="rounded-3xl p-6 sm:p-8 border shadow-xl space-y-6"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--color-border)' }}>
            <div className="flex items-center gap-2.5">
              <BarChart3 className="w-5 h-5 text-blue-600" />
              <h3 className="font-bold text-base sm:text-lg" style={{ color: 'var(--color-text)' }}>Track Completion Rates</h3>
            </div>
            <span className="text-xs font-bold text-emerald-600 bg-emerald-50 dark:bg-emerald-950 px-2.5 py-1 rounded-lg">Average 79%</span>
          </div>

          <div className="space-y-4">
            {trackMetrics.map((t, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span style={{ color: 'var(--color-text)' }}>{t.track}</span>
                  <span style={{ color: 'var(--color-text-muted)' }}>{t.completion}% ({t.activeStudents} students)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className={`h-full ${t.color} rounded-full transition-all duration-700`} style={{ width: `${t.completion}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>

        {/* Chart 2: Sensory Adaptation Metrics */}
        <div
          className="rounded-3xl p-6 sm:p-8 border shadow-xl space-y-6"
          style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
        >
          <div className="flex items-center justify-between border-b pb-4" style={{ borderColor: 'var(--color-border)' }}>
            <div className="flex items-center gap-2.5">
              <Sparkles className="w-5 h-5 text-emerald-600" />
              <h3 className="font-bold text-base sm:text-lg" style={{ color: 'var(--color-text)' }}>Sensory Adaptations Active</h3>
            </div>
            <span className="text-xs font-bold text-blue-600 bg-blue-50 dark:bg-blue-950 px-2.5 py-1 rounded-lg">42 Enrolled</span>
          </div>

          <div className="space-y-4">
            {sensoryMetrics.map((s, idx) => (
              <div key={idx} className="space-y-1.5">
                <div className="flex justify-between text-xs font-bold">
                  <span style={{ color: 'var(--color-text)' }}>{s.name}</span>
                  <span className="text-blue-600 font-mono">{s.count} ({s.percentage}%)</span>
                </div>
                <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                  <div className="h-full bg-emerald-500 rounded-full transition-all duration-700" style={{ width: `${s.percentage}%` }} />
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* Mentor Workload Distribution Table */}
      <div
        className="rounded-3xl border shadow-xl overflow-hidden"
        style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
      >
        <div className="p-6 border-b flex items-center justify-between" style={{ borderColor: 'var(--color-border)' }}>
          <h3 className="font-bold text-base sm:text-lg" style={{ color: 'var(--color-text)' }}>
            Mentor Workload & Cohort Performance
          </h3>
          <span className="text-xs text-slate-500">Live supervision metrics</span>
        </div>
        <div className="overflow-x-auto">
          <table className="w-full text-start text-xs sm:text-sm">
            <thead>
              <tr className="border-b bg-slate-50 dark:bg-slate-900/50" style={{ borderColor: 'var(--color-border)', color: 'var(--color-text-muted)' }}>
                <th className="py-4 px-6 text-start font-bold">Mentor Name</th>
                <th className="py-4 px-6 text-center font-bold">Assigned Cohort Size</th>
                <th className="py-4 px-6 text-center font-bold">Cohort Completion Rate</th>
                <th className="py-4 px-6 text-center font-bold">Logged Teaching Hours</th>
              </tr>
            </thead>
            <tbody className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
              {mentorWorkload.map((m, idx) => (
                <tr key={idx} className="hover:bg-slate-50 dark:hover:bg-slate-800/40">
                  <td className="py-4 px-6 font-bold" style={{ color: 'var(--color-text)' }}>{m.name}</td>
                  <td className="py-4 px-6 text-center font-bold">{m.students} Students</td>
                  <td className="py-4 px-6 text-center">
                    <span className="px-2.5 py-1 rounded-full text-xs font-bold bg-emerald-100 text-emerald-800 dark:bg-emerald-950 dark:text-emerald-300">
                      {m.completion}
                    </span>
                  </td>
                  <td className="py-4 px-6 text-center font-mono opacity-80">{m.hours}</td>
                </tr>
              ))}
            </tbody>
          </table>
        </div>
      </div>
    </div>
  );
};

const OrgSettingsView: React.FC<{ org: OrgProfile }> = ({ org }) => {
  const { updateOrgSettings } = useMockData();
  const [name, setName] = useState(org?.name || 'Hope Academy');
  const [contactPerson, setContactPerson] = useState(org?.contactPerson || 'Dr. Sarah Al-Mansoor');
  const [email, setEmail] = useState(org?.email || 'contact@hopeacademy.edu');
  const [phone, setPhone] = useState(org?.phone || '+966 11 456 7890');
  const [city, setCity] = useState(org?.city || 'Riyadh');
  const [address, setAddress] = useState(org?.address || 'Building 42, King Fahd Road, Riyadh');
  const [website, setWebsite] = useState(org?.website || 'https://www.hopeacademy.edu');
  const [description, setDescription] = useState(org?.description || 'Premier inclusive learning institution.');

  // Notification Toggles
  const [notifMilestones, setNotifMilestones] = useState(true);
  const [notifMentors, setNotifMentors] = useState(true);
  const [notifCapacity, setNotifCapacity] = useState(true);
  const [twoFactorAuth, setTwoFactorAuth] = useState(true);

  const [savedSuccess, setSavedSuccess] = useState(false);

  const handleSave = (e: React.FormEvent) => {
    e.preventDefault();
    if (org && updateOrgSettings) {
      updateOrgSettings(org.id, {
        name,
        contactPerson,
        email,
        phone,
        city,
        address,
        website,
        description,
      });
      setSavedSuccess(true);
      setTimeout(() => setSavedSuccess(false), 3000);
    }
  };

  return (
    <div className="space-y-8 animate-in fade-in max-w-4xl mx-auto">
      <div className="border-b pb-4" style={{ borderColor: 'var(--color-border)' }}>
        <h1 className="text-3xl font-black font-serif tracking-tight" style={{ color: 'var(--color-text)' }}>
          Organization Settings & Governance
        </h1>
        <p className="text-xs sm:text-sm mt-1" style={{ color: 'var(--color-text-muted)' }}>
          Configure institutional profile, billing subscription, notification rules, and security policies.
        </p>
      </div>

      {savedSuccess && (
        <div className="p-4 rounded-2xl bg-emerald-100 dark:bg-emerald-950 text-emerald-800 dark:text-emerald-300 text-xs font-bold flex items-center gap-2">
          <CheckCircle2 className="w-5 h-5 text-emerald-600" />
          <span>Organization settings and profile information updated successfully!</span>
        </div>
      )}

      {/* Section 1: Profile Information */}
      <form onSubmit={handleSave} className="rounded-3xl p-6 sm:p-8 border shadow-xl space-y-6" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <h2 className="text-lg font-bold font-serif" style={{ color: 'var(--color-text)' }}>Profile Information</h2>

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
          <div>
            <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>Organization Name</label>
            <input
              type="text"
              required
              value={name}
              onChange={(e) => setName(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border text-xs outline-none"
              style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>Primary Contact Person</label>
            <input
              type="text"
              required
              value={contactPerson}
              onChange={(e) => setContactPerson(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border text-xs outline-none"
              style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>Official Email</label>
            <input
              type="email"
              required
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border text-xs outline-none"
              style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>Phone Number</label>
            <input
              type="tel"
              required
              value={phone}
              onChange={(e) => setPhone(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border text-xs outline-none"
              style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>City / Region</label>
            <input
              type="text"
              value={city}
              onChange={(e) => setCity(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border text-xs outline-none"
              style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            />
          </div>

          <div>
            <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>Website</label>
            <input
              type="url"
              value={website}
              onChange={(e) => setWebsite(e.target.value)}
              className="w-full px-4 py-2.5 rounded-2xl border text-xs outline-none"
              style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            />
          </div>
        </div>

        <div>
          <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>Official Campus Address</label>
          <input
            type="text"
            value={address}
            onChange={(e) => setAddress(e.target.value)}
            className="w-full px-4 py-2.5 rounded-2xl border text-xs outline-none"
            style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
          />
        </div>

        <div>
          <label className="block text-xs font-bold mb-1.5" style={{ color: 'var(--color-text)' }}>Organization Mission / Description</label>
          <textarea
            rows={2}
            value={description}
            onChange={(e) => setDescription(e.target.value)}
            className="w-full px-4 py-2.5 rounded-2xl border text-xs outline-none resize-none"
            style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
          />
        </div>

        <div className="pt-2 flex justify-end">
          <button
            type="submit"
            className="px-6 py-3 rounded-2xl text-white font-bold text-xs sm:text-sm shadow-md transition-all hover:scale-102 cursor-pointer"
            style={{ backgroundColor: 'var(--color-primary-green)' }}
          >
            Save Profile Changes
          </button>
        </div>
      </form>

      {/* Section 2: Billing & Subscription Package */}
      <div className="rounded-3xl p-6 sm:p-8 border shadow-xl space-y-5" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <h2 className="text-lg font-bold font-serif" style={{ color: 'var(--color-text)' }}>Billing & Capacity Package</h2>
        <div className="p-5 rounded-2xl bg-slate-50 dark:bg-slate-900 border space-y-3" style={{ borderColor: 'var(--color-border)' }}>
          <div className="flex flex-col sm:flex-row sm:items-center justify-between gap-3">
            <div>
              <span className="text-base font-black" style={{ color: 'var(--color-text)' }}>
                {org?.activePackage?.tierName || 'Growth'} Package Plan
              </span>
              <span className="text-xs text-slate-500 block">
                Up to {org?.activePackage?.mentorCapacity || 25} Mentors • Up to {org?.activePackage?.studentCapacity || 150} Students
              </span>
            </div>
            <div className="text-end">
              <span className="text-xl font-black text-emerald-600">
                ${org?.paidAmount ? org.paidAmount.toLocaleString() : '5,400'}.00
              </span>
              <span className="text-xs text-slate-500 block">/ Annual Subscription</span>
            </div>
          </div>
          <div className="flex items-center gap-2 text-xs font-mono text-blue-600">
            <span>Txn ID: {org?.transactionId || 'TXN-ORG-98412055'}</span>
          </div>
        </div>
      </div>

      {/* Section 3: Notification Rules */}
      <div className="rounded-3xl p-6 sm:p-8 border shadow-xl space-y-5" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <h2 className="text-lg font-bold font-serif" style={{ color: 'var(--color-text)' }}>Workspace Notification Preferences</h2>
        <div className="space-y-4 text-xs">
          <label className="flex items-center justify-between p-3 rounded-2xl border cursor-pointer" style={{ borderColor: 'var(--color-border)' }}>
            <div>
              <strong className="block font-bold" style={{ color: 'var(--color-text)' }}>Student Milestone & Assessment Alerts</strong>
              <span className="text-slate-500">Receive alerts when students complete tracks or unlock certifications.</span>
            </div>
            <input
              type="checkbox"
              checked={notifMilestones}
              onChange={(e) => setNotifMilestones(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-2xl border cursor-pointer" style={{ borderColor: 'var(--color-border)' }}>
            <div>
              <strong className="block font-bold" style={{ color: 'var(--color-text)' }}>Mentor Allocation Notifications</strong>
              <span className="text-slate-500">Notify leadership when mentors are added, removed, or cohorts reassigned.</span>
            </div>
            <input
              type="checkbox"
              checked={notifMentors}
              onChange={(e) => setNotifMentors(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 cursor-pointer"
            />
          </label>

          <label className="flex items-center justify-between p-3 rounded-2xl border cursor-pointer" style={{ borderColor: 'var(--color-border)' }}>
            <div>
              <strong className="block font-bold" style={{ color: 'var(--color-text)' }}>Seat Quota Warnings (85% Capacity)</strong>
              <span className="text-slate-500">Alert admin when student or mentor seats approach package limits.</span>
            </div>
            <input
              type="checkbox"
              checked={notifCapacity}
              onChange={(e) => setNotifCapacity(e.target.checked)}
              className="w-4 h-4 rounded text-blue-600 cursor-pointer"
            />
          </label>
        </div>
      </div>

      {/* Section 4: Security & Access Controls */}
      <div className="rounded-3xl p-6 sm:p-8 border shadow-xl space-y-5" style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}>
        <h2 className="text-lg font-bold font-serif" style={{ color: 'var(--color-text)' }}>Security & Access Controls</h2>
        <div className="p-4 rounded-2xl border flex items-center justify-between" style={{ borderColor: 'var(--color-border)' }}>
          <div className="space-y-0.5">
            <span className="font-bold text-xs block" style={{ color: 'var(--color-text)' }}>Enforce Two-Factor Authentication (2FA)</span>
            <span className="text-[11px] text-slate-500">Require all instructors and supervisors to verify login with 2FA.</span>
          </div>
          <button
            type="button"
            onClick={() => setTwoFactorAuth(!twoFactorAuth)}
            className={`px-3 py-1.5 rounded-xl font-bold text-xs transition-colors cursor-pointer ${
              twoFactorAuth ? 'bg-emerald-600 text-white' : 'bg-slate-200 dark:bg-slate-800 text-slate-600'
            }`}
          >
            {twoFactorAuth ? 'Enforced' : 'Disabled'}
          </button>
        </div>
      </div>
    </div>
  );
};
