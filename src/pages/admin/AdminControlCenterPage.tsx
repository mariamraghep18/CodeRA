import React, { useState } from 'react';
import { useMockData, LearnerProfile, OrgProfile } from '../../context/MockDataContext';
import { translations } from '../../context/translations';
import {
  ShieldCheck,
  Video,
  Building2,
  Users,
  Award,
  TrendingUp,
  FileText,
  CheckCircle,
  XCircle,
  AlertTriangle,
  Search,
  Check,
  Filter,
  Eye,
  Clock,
  ExternalLink,
  DollarSign,
} from 'lucide-react';

import { UniversalBackButton } from '../../components/UniversalBackButton';
import { ProfileAvatarButton } from '../../components/profile/ProfileAvatarButton';

export const AdminControlCenterPage: React.FC = () => {
  const {
    lang,
    learners,
    parents,
    individuals,
    organizations,
    auditLogs,
    adminReviewVideo,
    adminReviewOrgStep1,
    adminReviewOrgStep2,
  } = useMockData();
  const t = translations[lang];

  type TabKey = 'queues' | 'learners' | 'parents' | 'individuals' | 'orgs' | 'analytics' | 'audit';
  const [activeTab, setActiveTab] = useState<TabKey>('queues');

  // Queues data
  const pendingVideos = learners.filter((l) => l.verification.status === 'pending');
  const pendingOrgStep1 = organizations.filter((o) => o.step1Status === 'pending');
  const pendingOrgStep2 = organizations.filter((o) => o.step2Status === 'pending');

  // Search filter
  const [searchQuery, setSearchQuery] = useState('');

  // Retake / Note Modal State
  const [retakeModalLearner, setRetakeModalLearner] = useState<LearnerProfile | null>(null);
  const [retakeReason, setRetakeReason] = useState('');

  const [orgChangesModalOrg, setOrgChangesModalOrg] = useState<OrgProfile | null>(null);
  const [orgChangesNotes, setOrgChangesNotes] = useState('');

  const handleConfirmRetake = () => {
    if (!retakeModalLearner) return;
    adminReviewVideo(retakeModalLearner.id, 'retake_required', retakeReason || 'Please record in a quieter space and speak clearly.');
    setRetakeModalLearner(null);
    setRetakeReason('');
  };

  const handleConfirmOrgChanges = () => {
    if (!orgChangesModalOrg) return;
    adminReviewOrgStep2(orgChangesModalOrg.id, 'changes_requested', orgChangesNotes || 'Please upload higher-resolution PDF scans.');
    setOrgChangesModalOrg(null);
    setOrgChangesNotes('');
  };

  // Analytics Computations
  const l1Count = learners.filter((l) => l.assessment.level === 'L1').length;
  const l2Count = learners.filter((l) => l.assessment.level === 'L2').length;
  const l3Count = learners.filter((l) => l.assessment.level === 'L3').length;
  const l4Count = learners.filter((l) => l.assessment.level === 'L4').length;

  const totalRevenue =
    learners.filter((l) => l.payment.status === 'paid').length * 149 +
    individuals.filter((i) => i.paymentStatus === 'paid').length * 199 +
    organizations.reduce((acc, o) => acc + (o.activePackage?.price || 0), 0);

  return (
    <div
      className="min-h-screen py-10 px-4 sm:px-6 lg:px-8 transition-colors"
      style={{ backgroundColor: 'var(--color-bg)' }}
    >
      <div className="max-w-7xl mx-auto space-y-6">
        <div className="flex items-center justify-start">
          <UniversalBackButton to="/" label="Back to Home" />
        </div>

        {/* Header */}
        <div
          className="rounded-3xl p-6 sm:p-8 border shadow-sm flex flex-col md:flex-row items-start md:items-center justify-between gap-6"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
          }}
        >
          <div className="space-y-2">
            <div className="flex items-center gap-2">
              <span className="p-2 rounded-2xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                <ShieldCheck className="w-5 h-5" />
              </span>
              <span className="text-xs font-bold" style={{ color: 'var(--color-primary-blue)' }}>
                CodeRa Operations & Governance
              </span>
            </div>
            <h1 className="text-2xl sm:text-3xl font-bold" style={{ color: 'var(--color-text)' }}>
              {t.adminTitle}
            </h1>
            <p className="text-xs sm:text-sm" style={{ color: 'var(--color-text-muted)' }}>
              {t.adminSubtitle}
            </p>
          </div>

          {/* Header Actions & Profile Trigger */}
          <div className="flex flex-wrap items-center gap-3">
            <ProfileAvatarButton roleOverride="admin" size="md" showLabel={true} />

            {/* Quick Counter Badges */}
            <div className="flex flex-wrap gap-2">
              <div className="px-3 py-1.5 rounded-xl border bg-amber-50 dark:bg-amber-950/40 border-amber-300 text-amber-800 dark:text-amber-300 text-xs font-bold flex items-center gap-1.5">
                <Video className="w-3.5 h-3.5" />
                <span>{pendingVideos.length} Video Reviews</span>
              </div>
              <div className="px-3 py-1.5 rounded-xl border bg-blue-50 dark:bg-blue-950/40 border-blue-300 text-blue-800 dark:text-blue-300 text-xs font-bold flex items-center gap-1.5">
                <Building2 className="w-3.5 h-3.5" />
                <span>{pendingOrgStep1.length + pendingOrgStep2.length} Org Queues</span>
              </div>
            </div>
          </div>
        </div>

        {/* Navigation Tabs Bar */}
        <div className="flex items-center gap-2 overflow-x-auto pb-2 scrollbar-none">
          {[
            { id: 'queues', label: lang === 'ar' ? 'طوابير المراجعة الفورية' : 'Pending Queues', count: pendingVideos.length + pendingOrgStep1.length + pendingOrgStep2.length },
            { id: 'learners', label: t.allLearners, count: learners.length },
            { id: 'parents', label: t.allParents, count: parents.length },
            { id: 'individuals', label: t.allIndividuals, count: individuals.length },
            { id: 'orgs', label: t.allOrgs, count: organizations.length },
            { id: 'analytics', label: t.analytics },
            { id: 'audit', label: t.auditLogs, count: auditLogs.length },
          ].map((tab) => {
            const isActive = activeTab === tab.id;
            return (
              <button
                key={tab.id}
                type="button"
                onClick={() => setActiveTab(tab.id as TabKey)}
                className={`flex items-center gap-2 px-4 py-2.5 rounded-2xl text-xs font-bold whitespace-nowrap transition-all cursor-pointer ${
                  isActive
                    ? 'shadow-xs border-blue-600 bg-blue-50 text-blue-800 dark:bg-blue-950 dark:text-blue-200 ring-2 ring-blue-500'
                    : 'border-slate-200 dark:border-slate-800 hover:bg-slate-100 dark:hover:bg-slate-800'
                }`}
                style={{
                  backgroundColor: isActive ? undefined : 'var(--color-surface)',
                  borderColor: isActive ? undefined : 'var(--color-border)',
                  color: isActive ? undefined : 'var(--color-text-muted)',
                }}
              >
                <span>{tab.label}</span>
                {tab.count !== undefined && (
                  <span
                    className={`px-2 py-0.5 rounded-full text-[10px] font-mono ${
                      isActive ? 'bg-blue-600 text-white' : 'bg-slate-200 dark:bg-slate-700 text-slate-700 dark:text-slate-300'
                    }`}
                  >
                    {tab.count}
                  </span>
                )}
              </button>
            );
          })}
        </div>

        {/* Tab 1: Actionable Queues */}
        {activeTab === 'queues' && (
          <div className="space-y-8 animate-in fade-in">
            {/* Queue 1: Student Video Verifications */}
            <div
              className="rounded-3xl p-6 sm:p-8 border shadow-sm space-y-6"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-purple-100 text-purple-700 dark:bg-purple-950 dark:text-purple-300">
                    <Video className="w-5 h-5" />
                  </span>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                    {t.queueVideo}
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-amber-600">
                  {pendingVideos.length} Pending Actions
                </span>
              </div>

              {pendingVideos.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  ✓ All student video verifications reviewed.
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingVideos.map((lrn) => (
                    <div
                      key={lrn.id}
                      className="p-5 rounded-2xl border space-y-4"
                      style={{
                        backgroundColor: 'var(--color-bg)',
                        borderColor: 'var(--color-border)',
                      }}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div>
                          <div className="flex items-center gap-2">
                            <span className="text-sm font-bold" style={{ color: 'var(--color-text)' }}>
                              {lrn.name}
                            </span>
                            <span className="text-xs font-bold px-2 py-0.5 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                              Level {lrn.assessment.level} ({lrn.assessment.score} pts)
                            </span>
                          </div>
                          <span className="text-[11px] text-slate-500">
                            Age: {lrn.age} • Submitted: {lrn.verification.submittedAt?.slice(0, 10) || 'Today'}
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => adminReviewVideo(lrn.id, 'accepted', 'Identity verified successfully')}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl text-white font-bold text-xs shadow-sm bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                          >
                            <CheckCircle className="w-3.5 h-3.5" />
                            <span>{t.acceptVideo}</span>
                          </button>
                          <button
                            type="button"
                            onClick={() => setRetakeModalLearner(lrn)}
                            className="flex items-center gap-1.5 px-4 py-2 rounded-xl border text-xs font-bold text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-950 cursor-pointer"
                          >
                            <AlertTriangle className="w-3.5 h-3.5" />
                            <span>{t.requestRetake}</span>
                          </button>
                        </div>
                      </div>

                      {/* Video Player & Transcript Mock */}
                      <div className="grid grid-cols-1 md:grid-cols-3 gap-4 pt-2">
                        {/* Video Thumbnail / Mock Viewport */}
                        <div className="rounded-xl overflow-hidden bg-slate-900 aspect-video flex items-center justify-center text-white relative">
                          <span className="text-xs text-slate-400">▶ Mock Video Recording (1080p)</span>
                          <span className="absolute bottom-2 start-2 text-[10px] bg-black/60 px-1.5 py-0.5 rounded">
                            0:24
                          </span>
                        </div>

                        {/* Transcript Preview */}
                        <div className="md:col-span-2 p-3.5 rounded-xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 space-y-1">
                          <span className="text-[10px] font-bold uppercase tracking-wider text-slate-400">
                            Speech-to-Text Generated Transcript (Simulated)
                          </span>
                          <p className="text-xs italic leading-relaxed text-slate-700 dark:text-slate-300">
                            "{lrn.verification.transcript}"
                          </p>
                        </div>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Queue 2: Organization Step 1 Profiles */}
            <div
              className="rounded-3xl p-6 sm:p-8 border shadow-sm space-y-6"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                    <Building2 className="w-5 h-5" />
                  </span>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                    {t.queueOrgStep1}
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-blue-600">
                  {pendingOrgStep1.length} Pending
                </span>
              </div>

              {pendingOrgStep1.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  ✓ No pending organization profiles awaiting Step 1 approval.
                </div>
              ) : (
                <div className="space-y-3">
                  {pendingOrgStep1.map((org) => (
                    <div
                      key={org.id}
                      className="p-5 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                      style={{
                        backgroundColor: 'var(--color-bg)',
                        borderColor: 'var(--color-border)',
                      }}
                    >
                      <div>
                        <span className="text-sm font-bold block" style={{ color: 'var(--color-text)' }}>
                          {org.name}
                        </span>
                        <span className="text-xs text-slate-500">
                          Type: {org.orgType.toUpperCase()} • Official: {org.contactPerson} ({org.email} | {org.phone})
                        </span>
                      </div>

                      <div className="flex items-center gap-2">
                        <button
                          type="button"
                          onClick={() => adminReviewOrgStep1(org.id, 'approved', 'Basic profile approved. Step 2 document upload unlocked.')}
                          className="px-4 py-2 rounded-xl text-white font-bold text-xs bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                        >
                          {t.approveStep1}
                        </button>
                        <button
                          type="button"
                          onClick={() => adminReviewOrgStep1(org.id, 'rejected', 'Institution criteria not met.')}
                          className="px-4 py-2 rounded-xl border text-xs font-bold text-red-600 border-red-300 hover:bg-red-50 dark:hover:bg-red-950 cursor-pointer"
                        >
                          {t.rejectStep1}
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>

            {/* Queue 3: Organization Step 2 Legal Documents */}
            <div
              className="rounded-3xl p-6 sm:p-8 border shadow-sm space-y-6"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <div className="flex items-center gap-2">
                  <span className="p-2 rounded-xl bg-amber-100 text-amber-700 dark:bg-amber-950 dark:text-amber-300">
                    <FileText className="w-5 h-5" />
                  </span>
                  <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                    {t.queueOrgStep2}
                  </h3>
                </div>
                <span className="text-xs font-mono font-bold text-amber-600">
                  {pendingOrgStep2.length} Pending
                </span>
              </div>

              {pendingOrgStep2.length === 0 ? (
                <div className="p-8 text-center text-xs text-slate-500">
                  ✓ No pending organization legal documents awaiting verification.
                </div>
              ) : (
                <div className="space-y-4">
                  {pendingOrgStep2.map((org) => (
                    <div
                      key={org.id}
                      className="p-5 rounded-2xl border space-y-4"
                      style={{
                        backgroundColor: 'var(--color-bg)',
                        borderColor: 'var(--color-border)',
                      }}
                    >
                      <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                        <div>
                          <span className="text-sm font-bold block" style={{ color: 'var(--color-text)' }}>
                            {org.name}
                          </span>
                          <span className="text-xs text-slate-500">
                            {org.contactPerson} • {org.documents.length} document(s) uploaded
                          </span>
                        </div>

                        <div className="flex items-center gap-2">
                          <button
                            type="button"
                            onClick={() => adminReviewOrgStep2(org.id, 'approved', 'Documents accredited. Capacity packages unlocked.')}
                            className="px-4 py-2 rounded-xl text-white font-bold text-xs bg-emerald-600 hover:bg-emerald-700 cursor-pointer"
                          >
                            {t.approveStep2}
                          </button>
                          <button
                            type="button"
                            onClick={() => setOrgChangesModalOrg(org)}
                            className="px-4 py-2 rounded-xl border text-xs font-bold text-amber-600 border-amber-300 hover:bg-amber-50 dark:hover:bg-amber-950 cursor-pointer"
                          >
                            {t.requestChanges}
                          </button>
                        </div>
                      </div>

                      {/* Documents list */}
                      <div className="flex flex-wrap gap-2 pt-1">
                        {org.documents.map((doc, idx) => (
                          <div
                            key={idx}
                            className="px-3 py-1.5 rounded-xl border bg-white dark:bg-slate-900 border-slate-200 dark:border-slate-800 text-xs flex items-center gap-2"
                          >
                            <FileText className="w-4 h-4 text-emerald-600" />
                            <span className="font-semibold">{doc.name}</span>
                            <span className="text-[10px] text-slate-400">({doc.size})</span>
                          </div>
                        ))}
                      </div>
                    </div>
                  ))}
                </div>
              )}
            </div>
          </div>
        )}

        {/* Tab 2: All Learners Directory */}
        {activeTab === 'learners' && (
          <div
            className="rounded-3xl p-6 sm:p-8 border shadow-sm space-y-6 animate-in fade-in"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                {t.allLearners}
              </h3>
              <span className="text-xs font-mono font-bold">{learners.length} Registered</span>
            </div>

            <div className="overflow-x-auto">
              <table className="w-full text-start text-xs">
                <thead>
                  <tr className="border-b text-slate-400 uppercase tracking-wider" style={{ borderColor: 'var(--color-border)' }}>
                    <th className="py-3 px-3 text-start">Learner Name</th>
                    <th className="py-3 px-3 text-start">Age / Grade</th>
                    <th className="py-3 px-3 text-start">Score & Level</th>
                    <th className="py-3 px-3 text-start">Video Verification</th>
                    <th className="py-3 px-3 text-start">Tuition Payment</th>
                    <th className="py-3 px-3 text-start">Course State</th>
                  </tr>
                </thead>
                <tbody className="divide-y" style={{ borderColor: 'var(--color-border)' }}>
                  {learners.map((lrn) => (
                    <tr key={lrn.id} className="hover:bg-slate-50 dark:hover:bg-slate-900/40">
                      <td className="py-3.5 px-3 font-bold" style={{ color: 'var(--color-text)' }}>
                        {lrn.name}
                      </td>
                      <td className="py-3.5 px-3 text-slate-500">
                        {lrn.age} yrs • {lrn.grade || 'N/A'}
                      </td>
                      <td className="py-3.5 px-3">
                        {lrn.assessment.completed ? (
                          <span className="font-mono font-bold text-blue-600">
                            {lrn.assessment.level} ({lrn.assessment.score} pts)
                          </span>
                        ) : (
                          <span className="text-slate-400">Pending</span>
                        )}
                      </td>
                      <td className="py-3.5 px-3">
                        <span className={`px-2 py-0.5 rounded-full text-[10px] font-bold ${
                          lrn.verification.status === 'accepted' ? 'bg-emerald-100 text-emerald-800' :
                          lrn.verification.status === 'pending' ? 'bg-amber-100 text-amber-800' :
                          lrn.verification.status === 'retake_required' ? 'bg-red-100 text-red-800' : 'bg-slate-100 text-slate-700'
                        }`}>
                          {lrn.verification.status}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-semibold">
                        <span className={lrn.payment.status === 'paid' ? 'text-emerald-600 font-bold' : 'text-slate-500'}>
                          {lrn.payment.status.toUpperCase()}
                        </span>
                      </td>
                      <td className="py-3.5 px-3 font-bold">
                        <span className={lrn.courseUnlocked ? 'text-emerald-600' : 'text-amber-600'}>
                          {lrn.courseUnlocked ? 'UNLOCKED' : 'LOCKED'}
                        </span>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        )}

        {/* Tab 3: Parents Directory */}
        {activeTab === 'parents' && (
          <div
            className="rounded-3xl p-6 sm:p-8 border shadow-sm space-y-6 animate-in fade-in"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                {t.allParents}
              </h3>
              <span className="text-xs font-mono font-bold">{parents.length} Registered</span>
            </div>

            <div className="space-y-3">
              {parents.map((parent) => {
                const myLearners = learners.filter((l) => l.parentId === parent.id);
                return (
                  <div
                    key={parent.id}
                    className="p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                    style={{
                      backgroundColor: 'var(--color-bg)',
                      borderColor: 'var(--color-border)',
                    }}
                  >
                    <div>
                      <span className="text-sm font-bold block" style={{ color: 'var(--color-text)' }}>
                        {parent.fullName} ({parent.relation})
                      </span>
                      <span className="text-xs text-slate-500">
                        {parent.email} • {parent.phone}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-3 py-1 rounded-full bg-blue-100 text-blue-700 dark:bg-blue-950 dark:text-blue-300">
                        {myLearners.length} Learner(s) Isolated
                      </span>
                    </div>
                  </div>
                );
              })}
            </div>
          </div>
        )}

        {/* Tab 4: Independent Learners Directory */}
        {activeTab === 'individuals' && (
          <div
            className="rounded-3xl p-6 sm:p-8 border shadow-sm space-y-6 animate-in fade-in"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                {t.allIndividuals}
              </h3>
              <span className="text-xs font-mono font-bold">{individuals.length} Registered</span>
            </div>

            <div className="space-y-3">
              {individuals.map((ind) => (
                <div
                  key={ind.id}
                  className="p-4 rounded-2xl border flex flex-col sm:flex-row items-start sm:items-center justify-between gap-4"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <div>
                    <span className="text-sm font-bold block" style={{ color: 'var(--color-text)' }}>
                      {ind.fullName}
                    </span>
                    <span className="text-xs text-slate-500">
                      {ind.email} • Track: <strong className="capitalize">{ind.track.replace('_', ' ')}</strong>
                    </span>
                  </div>

                  <div className="flex items-center gap-3">
                    <span className={`text-xs font-bold px-2.5 py-0.5 rounded-full ${
                      ind.paymentStatus === 'paid' ? 'bg-emerald-100 text-emerald-800' : 'bg-slate-100 text-slate-700'
                    }`}>
                      {ind.paymentStatus.toUpperCase()}
                    </span>
                    <span className="text-xs font-mono text-slate-500">
                      Progress: {ind.progress}%
                    </span>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 5: Organizations & Capacity Consumption */}
        {activeTab === 'orgs' && (
          <div
            className="rounded-3xl p-6 sm:p-8 border shadow-sm space-y-6 animate-in fade-in"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                {t.allOrgs}
              </h3>
              <span className="text-xs font-mono font-bold">{organizations.length} Institutions</span>
            </div>

            <div className="space-y-4">
              {organizations.map((org) => (
                <div
                  key={org.id}
                  className="p-5 rounded-2xl border space-y-3"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <div className="flex flex-col sm:flex-row items-start sm:items-center justify-between gap-2">
                    <div>
                      <span className="text-sm font-bold block" style={{ color: 'var(--color-text)' }}>
                        {org.name}
                      </span>
                      <span className="text-xs text-slate-500">
                        {org.contactPerson} • {org.email}
                      </span>
                    </div>

                    <div className="flex items-center gap-2">
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700">
                        Step 1: {org.step1Status}
                      </span>
                      <span className="text-xs font-bold px-2.5 py-0.5 rounded-full bg-slate-200 dark:bg-slate-700">
                        Step 2: {org.step2Status}
                      </span>
                    </div>
                  </div>

                  {org.activePackage && (
                    <div className="grid grid-cols-2 gap-4 pt-2 border-t border-slate-200 dark:border-slate-800 text-xs">
                      <div>
                        <span className="text-slate-500 block">Student Capacity Quota (BR-39)</span>
                        <span className="font-mono font-bold text-blue-600">
                          {org.students.length} / {org.activePackage.studentCapacity} used
                        </span>
                      </div>
                      <div>
                        <span className="text-slate-500 block">Mentor License Quota (BR-38)</span>
                        <span className="font-mono font-bold text-emerald-600">
                          {org.mentors.length} / {org.activePackage.mentorCapacity} used
                        </span>
                      </div>
                    </div>
                  )}
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Tab 6: Analytics Overview */}
        {activeTab === 'analytics' && (
          <div className="space-y-6 animate-in fade-in">
            {/* Top Stat Cards */}
            <div className="grid grid-cols-1 sm:grid-cols-3 gap-6">
              <div
                className="p-6 rounded-3xl border space-y-2"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Ecosystem Revenue</span>
                <div className="text-3xl font-black font-mono text-emerald-600">
                  ${totalRevenue.toLocaleString()}
                </div>
                <span className="text-[11px] text-slate-500">From tuition, tracks & org capacity</span>
              </div>

              <div
                className="p-6 rounded-3xl border space-y-2"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Total Enrolled Learners</span>
                <div className="text-3xl font-black font-mono text-blue-600">
                  {learners.length}
                </div>
                <span className="text-[11px] text-slate-500">Across {parents.length} parent families</span>
              </div>

              <div
                className="p-6 rounded-3xl border space-y-2"
                style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
              >
                <span className="text-xs font-bold uppercase tracking-wider text-slate-400">Institutional Cohorts</span>
                <div className="text-3xl font-black font-mono text-purple-600">
                  {organizations.filter((o) => o.activePackage).length} Active
                </div>
                <span className="text-[11px] text-slate-500">Managing mentor & student quotas</span>
              </div>
            </div>

            {/* Level Distribution Chart / Bars */}
            <div
              className="rounded-3xl p-6 sm:p-8 border shadow-sm space-y-6"
              style={{ backgroundColor: 'var(--color-surface)', borderColor: 'var(--color-border)' }}
            >
              <h3 className="text-sm font-bold uppercase tracking-wider" style={{ color: 'var(--color-text)' }}>
                Student Placement Level Distribution (L1–L4)
              </h3>

              <div className="space-y-4">
                {[
                  { level: 'L1: Coder (0 - 49 pts)', count: l1Count, color: 'bg-teal-500' },
                  { level: 'L2: Programmer (50 - 69 pts)', count: l2Count, color: 'bg-blue-500' },
                  { level: 'L3: Developer (70 - 84 pts)', count: l3Count, color: 'bg-purple-500' },
                  { level: 'L4: Career Ready (85 - 100 pts)', count: l4Count, color: 'bg-emerald-500' },
                ].map((item, idx) => (
                  <div key={idx} className="space-y-1.5">
                    <div className="flex justify-between text-xs font-semibold" style={{ color: 'var(--color-text)' }}>
                      <span>{item.level}</span>
                      <span className="font-mono font-bold">{item.count} Student(s)</span>
                    </div>
                    <div className="w-full h-3 rounded-full bg-slate-200 dark:bg-slate-800 overflow-hidden">
                      <div
                        className={`h-full rounded-full ${item.color}`}
                        style={{ width: `${Math.max(10, (item.count / (learners.length || 1)) * 100)}%` }}
                      />
                    </div>
                  </div>
                ))}
              </div>
            </div>
          </div>
        )}

        {/* Tab 7: Simulated Audit Log */}
        {activeTab === 'audit' && (
          <div
            className="rounded-3xl p-6 sm:p-8 border shadow-sm space-y-6 animate-in fade-in"
            style={{
              backgroundColor: 'var(--color-surface)',
              borderColor: 'var(--color-border)',
            }}
          >
            <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
              <div className="flex items-center gap-2">
                <Clock className="w-5 h-5 text-blue-600" />
                <h3 className="text-lg font-bold" style={{ color: 'var(--color-text)' }}>
                  {t.auditLogs}
                </h3>
              </div>
              <span className="text-xs font-mono font-bold text-slate-400">Immutable Trail</span>
            </div>

            <div className="space-y-3">
              {auditLogs.map((log) => (
                <div
                  key={log.id}
                  className="p-4 rounded-2xl border text-xs flex flex-col sm:flex-row items-start sm:items-center justify-between gap-3"
                  style={{
                    backgroundColor: 'var(--color-bg)',
                    borderColor: 'var(--color-border)',
                  }}
                >
                  <div className="space-y-1">
                    <div className="flex items-center gap-2">
                      <span className="font-mono font-bold text-blue-600">{log.action}</span>
                      <span className="px-2 py-0.5 rounded-full bg-slate-200 dark:bg-slate-800 text-[10px] font-semibold">
                        {log.targetType}: {log.targetName}
                      </span>
                    </div>
                    <p className="text-slate-600 dark:text-slate-400 text-[11px]">{log.details}</p>
                  </div>

                  <div className="text-[10px] text-slate-400 font-mono shrink-0">
                    <div>{log.adminUser}</div>
                    <div>{log.timestamp}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}

        {/* Modal: Request Retake (BR-15) */}
        {retakeModalLearner && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div
              className="w-full max-w-md rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-6"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <h3 className="font-bold text-sm text-red-600 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Request Video Retake (BR-15)</span>
                </h3>
                <button type="button" onClick={() => setRetakeModalLearner(null)} className="p-1">✕</button>
              </div>

              <p className="text-xs text-slate-500">
                Notice: Under BR-15, a video retake request is an identity verification retry, NOT an academic failure.
              </p>

              <div>
                <label className="block text-xs font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                  Reason & Guidance for Learner / Parent
                </label>
                <textarea
                  rows={3}
                  value={retakeReason}
                  onChange={(e) => setRetakeReason(e.target.value)}
                  placeholder="e.g. Background noise was high. Please speak clearly towards the microphone."
                  className="w-full px-3.5 py-2 rounded-xl border text-xs outline-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                />
              </div>

              <button
                type="button"
                onClick={handleConfirmRetake}
                className="w-full py-3 rounded-2xl text-white font-bold text-xs bg-red-600 shadow-md cursor-pointer"
              >
                Send Retake Request to Parent Profile
              </button>
            </div>
          </div>
        )}

        {/* Modal: Request Org Document Changes */}
        {orgChangesModalOrg && (
          <div className="fixed inset-0 z-50 flex items-center justify-center p-4 bg-black/60 backdrop-blur-sm animate-in fade-in">
            <div
              className="w-full max-w-md rounded-3xl p-6 sm:p-8 border shadow-2xl space-y-6"
              style={{
                backgroundColor: 'var(--color-surface)',
                borderColor: 'var(--color-border)',
              }}
            >
              <div className="flex items-center justify-between pb-3 border-b" style={{ borderColor: 'var(--color-border)' }}>
                <h3 className="font-bold text-sm text-amber-600 flex items-center gap-2">
                  <AlertTriangle className="w-4 h-4" />
                  <span>Request Legal Document Changes</span>
                </h3>
                <button type="button" onClick={() => setOrgChangesModalOrg(null)} className="p-1">✕</button>
              </div>

              <div>
                <label className="block text-xs font-bold mb-1" style={{ color: 'var(--color-text)' }}>
                  Notes for Organization
                </label>
                <textarea
                  rows={3}
                  value={orgChangesNotes}
                  onChange={(e) => setOrgChangesNotes(e.target.value)}
                  placeholder="e.g. Please provide an unexpired Commercial Registration with official stamps."
                  className="w-full px-3.5 py-2 rounded-xl border text-xs outline-none"
                  style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
                />
              </div>

              <button
                type="button"
                onClick={handleConfirmOrgChanges}
                className="w-full py-3 rounded-2xl text-white font-bold text-xs bg-amber-600 shadow-md cursor-pointer"
              >
                Submit Feedback to Organization
              </button>
            </div>
          </div>
        )}
      </div>
    </div>
  );
};
