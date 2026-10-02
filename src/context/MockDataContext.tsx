import React, { createContext, useContext, useState, useEffect, ReactNode } from 'react';
import { safeJsonParse, sanitizeInput, sanitizeFileName } from '../utils/security';

export type Language = 'en' | 'ar';
export type Theme = 'light' | 'dark';
export type FontSize = 'normal' | 'large' | 'xlarge';
export type UserRole =
  | 'guest'
  | 'student'
  | 'parent'
  | 'individual'
  | 'org'
  | 'admin';

export interface AssessmentData {
  completed: boolean;
  score: number;
  level: 'L1' | 'L2' | 'L3' | 'L4';
  levelName: string;
  domainScores: {
    logic: number;
    pattern: number;
    math: number;
    comprehension: number;
    coding: number;
  };
  timestamp?: string;
}

export interface VideoVerificationData {
  status: 'none' | 'pending' | 'accepted' | 'retake_required';
  videoUrl?: string;
  transcript?: string;
  adminNotes?: string;
  submittedAt?: string;
}

export interface LearnerPaymentData {
  status: 'unpaid' | 'paid';
  paidAt?: string;
  transactionId?: string;
  amount?: number;
}

export interface LearnerProfile {
  id: string;
  parentId: string;
  name: string;
  age: number;
  grade?: string;
  accessLink: string;
  accessPin: string;
  accommodations: string[];
  diagnosis?: string;
  assessment: AssessmentData;
  verification: VideoVerificationData;
  payment: LearnerPaymentData;
  courseUnlocked: boolean;
}

export interface ParentProfile {
  id: string;
  fullName: string;
  email: string;
  phone: string;
  relation: string;
  createdAt: string;
}

export interface IndividualProfile {
  id: string;
  fullName: string;
  email: string;
  phone?: string;
  dateOfBirth?: string;
  track: 'programming' | 'sign_language';
  paymentStatus: 'unpaid' | 'paid';
  progress: number;
  completedAt?: string;
  certificateId?: string;
  paidAmount?: number;
  transactionId?: string;
}


export interface OrgMentor {
  id: string;
  name: string;
  email: string;
  role?: string;
  studentsCount?: number;
  status?: string;
  assignedDate: string;
}

export interface OrgStudent {
  id: string;
  name: string;
  email?: string;
  grade: string;
  mentor?: string;
  level?: string;
  progress?: number;
  status?: 'Active' | 'Pending' | 'Completed';
  assignedDate: string;
}

export interface OrgPackage {
  id: string;
  tierName: 'Starter' | 'Growth' | 'Enterprise';
  studentCapacity: number;
  mentorCapacity: number;
  price: number;
  activatedAt: string;
}

export interface OrgProfile {
  id: string;
  name: string;
  email: string;
  phone: string;
  orgType: 'school' | 'center' | 'ngo';
  contactPerson: string;
  country?: string;
  city?: string;
  description?: string;
  taxNumber?: string;
  businessNumber?: string;
  address?: string;
  website?: string;
  expectedMentors?: number;
  expectedStudents?: number;
  step1Status: 'pending' | 'approved' | 'rejected';
  step2Status: 'not_started' | 'pending' | 'approved' | 'changes_requested';
  documents: { name: string; size: string; uploadDate: string }[];
  adminNotes?: string;
  activePackage: OrgPackage | null;
  paidAmount?: number;
  transactionId?: string;
  mentors: OrgMentor[];
  students: OrgStudent[];
}

export interface AuditLogEntry {
  id: string;
  timestamp: string;
  adminUser: string;
  action: string;
  targetType: 'Learner' | 'Parent' | 'Organization' | 'Individual' | 'Payment';
  targetId: string;
  targetName: string;
  details: string;
}

export interface UserProfileCustomization {
  avatarUrl?: string;
  avatarPreset?: string;
  accentColor: string;
  dashboardBg: string;
  bio?: string;
  customDisplayName?: string;
  customEmail?: string;
  customPhone?: string;
}

export interface ActiveUserContextData {
  role: UserRole;
  name: string;
  email: string;
  phone: string;
  avatarUrl?: string;
  avatarPreset?: string;
  accentColor: string;
  dashboardBg: string;
  roleLabel: string;
  statusBadge: string;
  extraDetails?: Record<string, string>;
}

export interface MockDataContextType {
  // Locale & Appearance
  lang: Language;
  setLang: (lang: Language) => void;
  theme: Theme;
  toggleTheme: () => void;
  setTheme: (theme: Theme) => void;

  // Accessibility
  highContrast: boolean;
  toggleHighContrast: () => void;
  fontSize: FontSize;
  setFontSize: (size: FontSize) => void;
  screenReaderHints: boolean;
  toggleScreenReaderHints: () => void;
  signLanguageAssistance: boolean;
  toggleSignLanguageAssistance: () => void;

  // Role & Session
  currentRole: UserRole;
  setCurrentRole: (role: UserRole) => void;
  activeParentId: string | null;
  setActiveParentId: (id: string | null) => void;
  activeLearnerId: string | null;
  setActiveLearnerId: (id: string | null) => void;
  activeOrgId: string | null;
  setActiveOrgId: (id: string | null) => void;
  activeIndividualId: string | null;
  setActiveIndividualId: (id: string | null) => void;

  // User Profile & Customization System
  profileCustomization: UserProfileCustomization;
  updateProfileCustomization: (updates: Partial<UserProfileCustomization>) => void;
  isProfileModalOpen: boolean;
  setIsProfileModalOpen: (open: boolean) => void;
  openProfileModal: (roleOverride?: UserRole) => void;
  closeProfileModal: () => void;
  updateActiveUserProfile: (updates: {
    fullName?: string;
    email?: string;
    phone?: string;
    bio?: string;
    grade?: string;
    contactPerson?: string;
  }) => void;
  getActiveUserContext: (roleOverride?: UserRole) => ActiveUserContextData;

  // Entities
  parents: ParentProfile[];
  learners: LearnerProfile[];
  individuals: IndividualProfile[];
  organizations: OrgProfile[];
  auditLogs: AuditLogEntry[];

  // Student & Parent Business Logic Actions
  registerParentWithLearner: (
    parent: { fullName: string; email: string; phone: string; relation: string },
    learner: { name: string; age: number; grade?: string; accommodations: string[]; diagnosis?: string }
  ) => { parent: ParentProfile; learner: LearnerProfile };
  addLearnerToParent: (
    parentId: string,
    learner: { name: string; age: number; grade?: string; accommodations: string[]; diagnosis?: string }
  ) => LearnerProfile;
  saveAssessmentResult: (learnerId: string, result: AssessmentData) => void;
  submitVideoVerification: (learnerId: string, transcript: string, videoUrl?: string) => void;
  payLearnerCourse: (learnerId: string, amount: number) => void;

  // Individual Actions
  registerIndividual: (profile: { fullName: string; email: string; phone?: string; dateOfBirth?: string; track: 'programming' | 'sign_language' }) => IndividualProfile;
  payIndividualTrack: (individualId: string, amount?: number) => void;
  completeIndividualLevel?: (individualId: string) => void;

  // Organization Actions
  registerOrgStep1: (orgData: {
    name: string;
    email: string;
    phone: string;
    orgType: 'school' | 'center' | 'ngo';
    contactPerson: string;
    country?: string;
    city?: string;
    description?: string;
  }) => OrgProfile;
  submitOrgStep2Docs: (orgId: string, docNames: string[], extra?: Partial<OrgProfile>) => void;
  purchaseOrgPackage: (orgId: string, tier: 'Starter' | 'Growth' | 'Enterprise') => void;
  addOrgMentor: (orgId: string, mentor: { name: string; email: string; role?: string; studentsCount?: number }) => boolean;
  removeOrgMentor?: (orgId: string, mentorId: string) => void;
  addOrgStudent: (orgId: string, student: { name: string; email?: string; grade: string; mentor?: string; level?: string }) => boolean;
  removeOrgStudent?: (orgId: string, studentId: string) => void;
  upgradeOrgPackage: (orgId: string, newTier: 'Starter' | 'Growth' | 'Enterprise') => void;
  updateOrgSettings?: (orgId: string, settings: Partial<OrgProfile>) => void;

  // Admin Actions
  adminReviewVideo: (learnerId: string, decision: 'accepted' | 'retake_required', notes?: string) => void;
  adminReviewOrgStep1: (orgId: string, decision: 'approved' | 'rejected', notes?: string) => void;
  adminReviewOrgStep2: (orgId: string, decision: 'approved' | 'changes_requested', notes?: string) => void;

  // Reset / Seeding
  resetToSampleData: () => void;
}

const STORAGE_KEYS = {
  LANG: 'codera_lang',
  THEME: 'codera_theme',
  PARENTS: 'codera_parents_list',
  LEARNERS: 'codera_learners_list',
  INDIVIDUALS: 'codera_individuals_list',
  ORGS: 'codera_orgs_list',
  AUDIT_LOGS: 'codera_audit_logs',
  ACCESSIBILITY: 'codera_accessibility_prefs',
  ACTIVE_PARENT: 'codera_active_parent_id',
  ACTIVE_LEARNER: 'codera_active_learner_id',
  ACTIVE_ORG: 'codera_active_org_id',
  ACTIVE_INDIVIDUAL: 'codera_active_individual_id',
  ROLE: 'codera_current_role',
  PROFILE_CUSTOMIZATION: 'codera_profile_customization',
};

// Seed initial realistic data for immediate demo readiness
const initialSeedParents: ParentProfile[] = [
  {
    id: 'parent_1',
    fullName: 'Mariam Al-Mansoor',
    email: 'mariam.mansoor@example.com',
    phone: '+971 50 123 4567',
    relation: 'Mother',
    createdAt: new Date(Date.now() - 7 * 86400000).toISOString(),
  },
];

const initialSeedLearners: LearnerProfile[] = [
  {
    id: 'learner_1',
    parentId: 'parent_1',
    name: 'Ahmed Hassan',
    age: 12,
    grade: 'Grade 6',
    accessLink: 'https://codera.app/#/assessment?student=learner_1&code=CR-7102',
    accessPin: '7102',
    accommodations: ['Visual Cues', 'Color Contrast', 'Extra Response Time'],
    diagnosis: 'Mild ADHD & Dyslexia',
    assessment: {
      completed: true,
      score: 88,
      level: 'L2',
      levelName: 'Programmer',
      domainScores: { logic: 19, pattern: 18, math: 17, comprehension: 17, coding: 17 },
      timestamp: new Date(Date.now() - 3 * 86400000).toISOString(),
    },
    verification: {
      status: 'accepted',
      videoUrl: 'blob:simulated_recording_ahmed.webm',
      transcript:
        'Hello! My name is Ahmed Hassan. I just completed the assessment with my mom. I love robotics and coding interactive web games.',
      submittedAt: new Date(Date.now() - 2 * 86400000).toISOString(),
    },
    payment: {
      status: 'paid',
      amount: 180,
      paidAt: new Date(Date.now() - 2 * 86400000).toISOString(),
      transactionId: 'TXN-CR-881029',
    },
    courseUnlocked: true,
  },
  {
    id: 'learner_2',
    parentId: 'parent_1',
    name: 'Sara Al-Mansoor',
    age: 9,
    grade: 'Grade 3',
    accessLink: 'https://codera.app/#/assessment?student=learner_2&code=CR-3849',
    accessPin: '3849',
    accommodations: ['Audio Cues', 'Simplified Text', 'Large Buttons'],
    diagnosis: 'Sensory Processing, prefers tactile and visual feedback',
    assessment: {
      completed: true,
      score: 92,
      level: 'L1',
      levelName: 'Junior Coder',
      domainScores: { logic: 19, pattern: 18, math: 18, comprehension: 19, coding: 18 },
      timestamp: new Date(Date.now() - 5 * 86400000).toISOString(),
    },
    verification: {
      status: 'accepted',
      submittedAt: new Date(Date.now() - 4 * 86400000).toISOString(),
    },
    payment: {
      status: 'paid',
      amount: 180,
      paidAt: new Date(Date.now() - 4 * 86400000).toISOString(),
      transactionId: 'TXN-CR-772910',
    },
    courseUnlocked: true,
  },
  {
    id: 'learner_3',
    parentId: 'parent_1',
    name: 'Omar Al-Mansoor',
    age: 11,
    grade: 'Grade 5',
    accessLink: 'https://codera.app/#/assessment?student=learner_3&code=CR-9182',
    accessPin: '9182',
    accommodations: ['Keyboard Navigation', 'Text-to-Speech', 'Adjustable Text Size'],
    diagnosis: 'Visual & Sensory accommodation preferences',
    assessment: {
      completed: true,
      score: 84,
      level: 'L1',
      levelName: 'Block-Based Coding',
      domainScores: { logic: 17, pattern: 16, math: 17, comprehension: 17, coding: 17 },
      timestamp: new Date(Date.now() - 1 * 86400000).toISOString(),
    },
    verification: {
      status: 'pending',
    },
    payment: {
      status: 'unpaid',
      amount: 180,
    },
    courseUnlocked: false,
  },
];

const initialSeedIndividuals: IndividualProfile[] = [
  {
    id: 'ind_1',
    fullName: 'Nadia Al-Mutairi',
    email: 'nadia.mutairi@example.com',
    phone: '+966 50 123 4567',
    dateOfBirth: '1998-05-14',
    track: 'programming',
    paymentStatus: 'paid',
    progress: 80,
    paidAmount: 180,
    transactionId: 'TXN-CR-882041',
  },
  {
    id: 'ind_2',
    fullName: 'Youssef Gamal',
    email: 'youssef.gamal@example.com',
    phone: '+20 100 456 7890',
    dateOfBirth: '2001-08-20',
    track: 'programming',
    paymentStatus: 'paid',
    progress: 45,
    paidAmount: 180,
    transactionId: 'TXN-CR-554109',
  },
  {
    id: 'ind_3',
    fullName: 'Nour Al-Sabah',
    email: 'nour.sabah@example.com',
    phone: '+966 55 987 6543',
    dateOfBirth: '2000-02-11',
    track: 'sign_language',
    paymentStatus: 'unpaid',
    progress: 0,
  },
];


const initialSeedOrgs: OrgProfile[] = [
  {
    id: 'org_1',
    name: 'Hope Academy',
    email: 'contact@hopeacademy.edu',
    phone: '+966 11 456 7890',
    orgType: 'school',
    contactPerson: 'Dr. Sarah Al-Mansoor',
    country: 'Saudi Arabia',
    city: 'Riyadh',
    description: 'Premier inclusive K-12 learning institution dedicated to empowering neurodiverse cohorts through adaptive STEM and computer science curriculum.',
    taxNumber: 'TRN-984210543',
    businessNumber: 'CR-1010884920',
    address: 'Building 42, King Fahd Road, Al-Olaya District, Riyadh',
    website: 'https://www.hopeacademy.edu',
    expectedMentors: 25,
    expectedStudents: 150,
    step1Status: 'approved',
    step2Status: 'approved',
    documents: [
      { name: 'Commercial_Registration_Renewal_2026.pdf', size: '2.4 MB', uploadDate: '2026-09-15' },
      { name: 'Ministry_Accreditation_Certificate.pdf', size: '1.8 MB', uploadDate: '2026-09-15' },
    ],
    adminNotes: 'All official accreditations validated by admin.',
    paidAmount: 5400,
    transactionId: 'TXN-ORG-98412055',
    activePackage: {
      id: 'pkg_growth',
      tierName: 'Growth',
      studentCapacity: 150,
      mentorCapacity: 25,
      price: 5400,
      activatedAt: new Date(Date.now() - 10 * 86400000).toISOString(),
    },
    mentors: [
      { id: 'm_1', name: 'Dr. Tariq Al-Hashimi', email: 'tariq@hopeacademy.edu', role: 'Lead SEN Specialist', studentsCount: 8, status: 'Active', assignedDate: '2026-02-10' },
      { id: 'm_2', name: 'Layla Al-Bahrani', email: 'layla.b@hopeacademy.edu', role: 'Assistive Tech Instructor', studentsCount: 6, status: 'Active', assignedDate: '2026-03-01' },
      { id: 'm_3', name: 'Karim Mansour', email: 'karim.m@hopeacademy.edu', role: 'Python & Robotics Mentor', studentsCount: 7, status: 'Active', assignedDate: '2026-03-15' },
      { id: 'm_4', name: 'Nour El-Sherif', email: 'nour.s@hopeacademy.edu', role: 'Sign Language Specialist', studentsCount: 5, status: 'Active', assignedDate: '2026-03-20' },
      { id: 'm_5', name: 'Fahad Al-Qasim', email: 'fahad.q@hopeacademy.edu', role: 'Cognitive Pacing Coach', studentsCount: 6, status: 'Active', assignedDate: '2026-04-02' },
      { id: 'm_6', name: 'Rania Mostafa', email: 'rania.m@hopeacademy.edu', role: 'Junior Block Instructor', studentsCount: 4, status: 'Active', assignedDate: '2026-04-10' },
      { id: 'm_7', name: 'Zaid Al-Harbi', email: 'zaid.h@hopeacademy.edu', role: 'Motor Accessibility Tutor', studentsCount: 3, status: 'Active', assignedDate: '2026-04-15' },
      { id: 'm_8', name: 'Huda Al-Ghamdi', email: 'huda.g@hopeacademy.edu', role: 'Curriculum Coordinator', studentsCount: 3, status: 'Active', assignedDate: '2026-05-01' },
    ],
    students: [
      { id: 's_1', name: 'Zaid Al-Ali', email: 'zaid.ali@student.hopeacademy.edu', grade: 'Grade 5', mentor: 'Dr. Tariq Al-Hashimi', level: 'Level 1', progress: 75, status: 'Active', assignedDate: '2026-02-12' },
      { id: 's_2', name: 'Dana Al-Khatib', email: 'dana.k@student.hopeacademy.edu', grade: 'Grade 6', mentor: 'Layla Al-Bahrani', level: 'Level 2', progress: 92, status: 'Active', assignedDate: '2026-02-15' },
      { id: 's_3', name: 'Rayan Shaker', email: 'rayan.s@student.hopeacademy.edu', grade: 'Grade 5', mentor: 'Karim Mansour', level: 'Level 1', progress: 60, status: 'Active', assignedDate: '2026-02-20' },
      { id: 's_4', name: 'Fatima Al-Nuaimi', email: 'fatima.n@student.hopeacademy.edu', grade: 'Grade 7', mentor: 'Nour El-Sherif', level: 'Level 3', progress: 88, status: 'Active', assignedDate: '2026-03-02' },
      { id: 's_5', name: 'Omar Al-Hassan', email: 'omar.h@student.hopeacademy.edu', grade: 'Grade 4', mentor: 'Dr. Tariq Al-Hashimi', level: 'Level 1', progress: 45, status: 'Active', assignedDate: '2026-03-10' },
      { id: 's_6', name: 'Sara Al-Otaibi', email: 'sara.o@student.hopeacademy.edu', grade: 'Grade 6', mentor: 'Fahad Al-Qasim', level: 'Level 2', progress: 80, status: 'Active', assignedDate: '2026-03-15' },
      { id: 's_7', name: 'Youssef El-Sayed', email: 'youssef.s@student.hopeacademy.edu', grade: 'Grade 5', mentor: 'Karim Mansour', level: 'Level 1', progress: 65, status: 'Active', assignedDate: '2026-03-25' },
      { id: 's_8', name: 'Maya Al-Zahrani', email: 'maya.z@student.hopeacademy.edu', grade: 'Grade 7', mentor: 'Layla Al-Bahrani', level: 'Level 3', progress: 95, status: 'Completed', assignedDate: '2026-04-01' },
      { id: 's_9', name: 'Khaled Mansoor', email: 'khaled.m@student.hopeacademy.edu', grade: 'Grade 5', mentor: 'Rania Mostafa', level: 'Level 1', progress: 50, status: 'Active', assignedDate: '2026-04-05' },
      { id: 's_10', name: 'Reem Al-Dossari', email: 'reem.d@student.hopeacademy.edu', grade: 'Grade 6', mentor: 'Zaid Al-Harbi', level: 'Level 2', progress: 70, status: 'Active', assignedDate: '2026-04-10' },
      { id: 's_11', name: 'Ali Al-Ghamdi', email: 'ali.g@student.hopeacademy.edu', grade: 'Grade 4', mentor: 'Huda Al-Ghamdi', level: 'Level 1', progress: 55, status: 'Active', assignedDate: '2026-04-15' },
      { id: 's_12', name: 'Noura Al-Shehri', email: 'noura.s@student.hopeacademy.edu', grade: 'Grade 8', mentor: 'Dr. Tariq Al-Hashimi', level: 'Level 3', progress: 82, status: 'Active', assignedDate: '2026-04-20' },
      { id: 's_13', name: 'Sultan Al-Otaibi', email: 'sultan.o@student.hopeacademy.edu', grade: 'Grade 5', mentor: 'Layla Al-Bahrani', level: 'Level 1', progress: 68, status: 'Active', assignedDate: '2026-04-25' },
      { id: 's_14', name: 'Jana Al-Harthy', email: 'jana.h@student.hopeacademy.edu', grade: 'Grade 6', mentor: 'Karim Mansour', level: 'Level 2', progress: 85, status: 'Active', assignedDate: '2026-05-01' },
      { id: 's_15', name: 'Hamad Al-Subaie', email: 'hamad.s@student.hopeacademy.edu', grade: 'Grade 7', mentor: 'Nour El-Sherif', level: 'Level 2', progress: 62, status: 'Active', assignedDate: '2026-05-05' },
      { id: 's_16', name: 'Lina Al-Qarni', email: 'lina.q@student.hopeacademy.edu', grade: 'Grade 5', mentor: 'Fahad Al-Qasim', level: 'Level 1', progress: 78, status: 'Active', assignedDate: '2026-05-10' },
      { id: 's_17', name: 'Bader Al-Mutawa', email: 'bader.m@student.hopeacademy.edu', grade: 'Grade 4', mentor: 'Rania Mostafa', level: 'Level 1', progress: 40, status: 'Active', assignedDate: '2026-05-12' },
      { id: 's_18', name: 'Shahad Al-Salem', email: 'shahad.s@student.hopeacademy.edu', grade: 'Grade 6', mentor: 'Zaid Al-Harbi', level: 'Level 2', progress: 88, status: 'Active', assignedDate: '2026-05-15' },
      { id: 's_19', name: 'Faisal Al-Juhani', email: 'faisal.j@student.hopeacademy.edu', grade: 'Grade 7', mentor: 'Huda Al-Ghamdi', level: 'Level 3', progress: 90, status: 'Active', assignedDate: '2026-05-20' },
      { id: 's_20', name: 'Tala Al-Malki', email: 'tala.m@student.hopeacademy.edu', grade: 'Grade 5', mentor: 'Dr. Tariq Al-Hashimi', level: 'Level 1', progress: 72, status: 'Active', assignedDate: '2026-05-22' },
      { id: 's_21', name: 'Saud Al-Rasheed', email: 'saud.r@student.hopeacademy.edu', grade: 'Grade 6', mentor: 'Layla Al-Bahrani', level: 'Level 2', progress: 84, status: 'Active', assignedDate: '2026-05-25' },
      { id: 's_22', name: 'Manal Al-Barrak', email: 'manal.b@student.hopeacademy.edu', grade: 'Grade 8', mentor: 'Karim Mansour', level: 'Level 3', progress: 91, status: 'Active', assignedDate: '2026-05-28' },
      { id: 's_23', name: 'Nawaf Al-Ajmi', email: 'nawaf.a@student.hopeacademy.edu', grade: 'Grade 5', mentor: 'Nour El-Sherif', level: 'Level 1', progress: 58, status: 'Active', assignedDate: '2026-06-01' },
      { id: 's_24', name: 'Haya Al-Khater', email: 'haya.k@student.hopeacademy.edu', grade: 'Grade 4', mentor: 'Fahad Al-Qasim', level: 'Level 1', progress: 48, status: 'Active', assignedDate: '2026-06-05' },
      { id: 's_25', name: 'Turki Al-Humaid', email: 'turki.h@student.hopeacademy.edu', grade: 'Grade 6', mentor: 'Rania Mostafa', level: 'Level 2', progress: 76, status: 'Active', assignedDate: '2026-06-10' },
      { id: 's_26', name: 'Lulua Al-Sudairi', email: 'lulua.s@student.hopeacademy.edu', grade: 'Grade 7', mentor: 'Zaid Al-Harbi', level: 'Level 3', progress: 89, status: 'Active', assignedDate: '2026-06-15' },
      { id: 's_27', name: 'Waleed Al-Amri', email: 'waleed.a@student.hopeacademy.edu', grade: 'Grade 5', mentor: 'Huda Al-Ghamdi', level: 'Level 1', progress: 63, status: 'Active', assignedDate: '2026-06-20' },
      { id: 's_28', name: 'Deema Al-Faraj', email: 'deema.f@student.hopeacademy.edu', grade: 'Grade 6', mentor: 'Dr. Tariq Al-Hashimi', level: 'Level 2', progress: 81, status: 'Active', assignedDate: '2026-06-22' },
      { id: 's_29', name: 'Meshari Al-Zamil', email: 'meshari.z@student.hopeacademy.edu', grade: 'Grade 4', mentor: 'Layla Al-Bahrani', level: 'Level 1', progress: 52, status: 'Active', assignedDate: '2026-06-25' },
      { id: 's_30', name: 'Abeer Al-Hakami', email: 'abeer.h@student.hopeacademy.edu', grade: 'Grade 7', mentor: 'Karim Mansour', level: 'Level 3', progress: 94, status: 'Completed', assignedDate: '2026-06-28' },
      { id: 's_31', name: 'Abdulaziz Al-Bassam', email: 'abdulaziz.b@student.hopeacademy.edu', grade: 'Grade 5', mentor: 'Nour El-Sherif', level: 'Level 1', progress: 66, status: 'Active', assignedDate: '2026-07-02' },
      { id: 's_32', name: 'Ghada Al-Turki', email: 'ghada.t@student.hopeacademy.edu', grade: 'Grade 6', mentor: 'Fahad Al-Qasim', level: 'Level 2', progress: 79, status: 'Active', assignedDate: '2026-07-05' },
      { id: 's_33', name: 'Bandar Al-Kulaib', email: 'bandar.k@student.hopeacademy.edu', grade: 'Grade 4', mentor: 'Rania Mostafa', level: 'Level 1', progress: 42, status: 'Active', assignedDate: '2026-07-10' },
      { id: 's_34', name: 'Rehab Al-Shammari', email: 'rehab.s@student.hopeacademy.edu', grade: 'Grade 7', mentor: 'Zaid Al-Harbi', level: 'Level 3', progress: 87, status: 'Active', assignedDate: '2026-07-15' },
      { id: 's_35', name: 'Moath Al-Suwailem', email: 'moath.s@student.hopeacademy.edu', grade: 'Grade 5', mentor: 'Huda Al-Ghamdi', level: 'Level 1', progress: 71, status: 'Active', assignedDate: '2026-07-20' },
      { id: 's_36', name: 'Hala Al-Moammar', email: 'hala.m@student.hopeacademy.edu', grade: 'Grade 6', mentor: 'Dr. Tariq Al-Hashimi', level: 'Level 2', progress: 83, status: 'Active', assignedDate: '2026-07-22' },
      { id: 's_37', name: 'Ziyad Al-Khereiji', email: 'ziyad.k@student.hopeacademy.edu', grade: 'Grade 4', mentor: 'Layla Al-Bahrani', level: 'Level 1', progress: 54, status: 'Active', assignedDate: '2026-07-25' },
      { id: 's_38', name: 'Rawan Al-Qurashi', email: 'rawan.q@student.hopeacademy.edu', grade: 'Grade 8', mentor: 'Karim Mansour', level: 'Level 3', progress: 96, status: 'Completed', assignedDate: '2026-07-28' },
      { id: 's_39', name: 'Fahda Al-Dakhil', email: 'fahda.d@student.hopeacademy.edu', grade: 'Grade 5', mentor: 'Nour El-Sherif', level: 'Level 1', progress: 69, status: 'Active', assignedDate: '2026-08-01' },
      { id: 's_40', name: 'Majed Al-Ghammas', email: 'majed.g@student.hopeacademy.edu', grade: 'Grade 6', mentor: 'Fahad Al-Qasim', level: 'Level 2', progress: 77, status: 'Active', assignedDate: '2026-08-05' },
      { id: 's_41', name: 'Ruba Al-Sheddi', email: 'ruba.s@student.hopeacademy.edu', grade: 'Grade 5', mentor: 'Rania Mostafa', level: 'Level 1', progress: 59, status: 'Active', assignedDate: '2026-08-10' },
      { id: 's_42', name: 'Yazeed Al-Wabil', email: 'yazeed.w@student.hopeacademy.edu', grade: 'Grade 7', mentor: 'Zaid Al-Harbi', level: 'Level 2', progress: 86, status: 'Active', assignedDate: '2026-08-15' },
    ],
  },
  {
    id: 'org_2',
    name: 'Modern Future International Academy',
    email: 'contact@future-academy.edu',
    phone: '+20 2 2450 1200',
    orgType: 'school',
    contactPerson: 'Eng. Mona Ezzat',
    step1Status: 'pending',
    step2Status: 'not_started',
    documents: [],
    activePackage: null,
    mentors: [],
    students: [],
  },
  {
    id: 'org_3',
    name: 'Inclusive Tech Horizons Foundation',
    email: 'info@inclusivehorizons.org',
    phone: '+966 11 400 3000',
    orgType: 'ngo',
    contactPerson: 'Fahad Al-Otaibi',
    step1Status: 'approved',
    step2Status: 'pending',
    documents: [
      { name: 'NGO_Decree_Official_License.pdf', size: '3.1 MB', uploadDate: '2026-09-27' },
      { name: 'Board_Resolution_Authorization.pdf', size: '1.2 MB', uploadDate: '2026-09-27' },
    ],
    activePackage: null,
    mentors: [],
    students: [],
  },
];

const initialSeedAuditLogs: AuditLogEntry[] = [
  {
    id: 'log_1',
    timestamp: new Date(Date.now() - 5 * 86400000).toLocaleString(),
    adminUser: 'Admin Superuser',
    action: 'APPROVED_ORG_STEP_1',
    targetType: 'Organization',
    targetId: 'org_1',
    targetName: 'Al-Amal Center for Special Education',
    details: 'Initial profile and legal entity details verified.',
  },
  {
    id: 'log_2',
    timestamp: new Date(Date.now() - 4 * 86400000).toLocaleString(),
    adminUser: 'Admin Superuser',
    action: 'APPROVED_ORG_STEP_2',
    targetType: 'Organization',
    targetId: 'org_1',
    targetName: 'Al-Amal Center for Special Education',
    details: 'Commercial registration and Ministry of Education accreditation validated.',
  },
];

const MockDataContext = createContext<MockDataContextType | null>(null);

export const MockDataProvider: React.FC<{ children: ReactNode }> = ({ children }) => {
  // Locale & Theme
  const [lang, setLangState] = useState<Language>(() => {
    return (localStorage.getItem(STORAGE_KEYS.LANG) as Language) || 'en';
  });

  const [theme, setThemeState] = useState<Theme>(() => {
    return (localStorage.getItem(STORAGE_KEYS.THEME) as Theme) || 'light';
  });

  // Accessibility
  const [highContrast, setHighContrast] = useState<boolean>(false);
  const [fontSize, setFontSizeState] = useState<FontSize>('normal');
  const [screenReaderHints, setScreenReaderHints] = useState<boolean>(false);
  const [signLanguageAssistance, setSignLanguageAssistance] = useState<boolean>(false);

  // User Role & Active IDs
  const [currentRole, setCurrentRoleState] = useState<UserRole>(() => {
    return (localStorage.getItem(STORAGE_KEYS.ROLE) as UserRole) || 'guest';
  });

  const [activeParentId, setActiveParentIdState] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_PARENT) || 'parent_1';
  });

  const [activeLearnerId, setActiveLearnerIdState] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_LEARNER) || 'learner_1';
  });

  const [activeOrgId, setActiveOrgIdState] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_ORG) || 'org_1';
  });

  const [activeIndividualId, setActiveIndividualIdState] = useState<string | null>(() => {
    return localStorage.getItem(STORAGE_KEYS.ACTIVE_INDIVIDUAL) || 'ind_1';
  });

  // Entities (Loaded safely with prototype-pollution defense)
  const [parents, setParents] = useState<ParentProfile[]>(() => {
    return safeJsonParse(localStorage.getItem(STORAGE_KEYS.PARENTS), initialSeedParents);
  });

  const [learners, setLearners] = useState<LearnerProfile[]>(() => {
    return safeJsonParse(localStorage.getItem(STORAGE_KEYS.LEARNERS), initialSeedLearners);
  });

  const [individuals, setIndividuals] = useState<IndividualProfile[]>(() => {
    return safeJsonParse(localStorage.getItem(STORAGE_KEYS.INDIVIDUALS), initialSeedIndividuals);
  });

  const [organizations, setOrganizations] = useState<OrgProfile[]>(() => {
    return safeJsonParse(localStorage.getItem(STORAGE_KEYS.ORGS), initialSeedOrgs);
  });

  const [auditLogs, setAuditLogs] = useState<AuditLogEntry[]>(() => {
    return safeJsonParse(localStorage.getItem(STORAGE_KEYS.AUDIT_LOGS), initialSeedAuditLogs);
  });

  // Profile Customization & Appearance System
  const defaultProfileCustomization: UserProfileCustomization = {
    accentColor: '#00A86B',
    dashboardBg: '#fcfbf7',
    avatarPreset: 'coder_bear',
  };

  const [profileCustomization, setProfileCustomizationState] = useState<UserProfileCustomization>(() => {
    return safeJsonParse(localStorage.getItem(STORAGE_KEYS.PROFILE_CUSTOMIZATION), defaultProfileCustomization);
  });

  const [isProfileModalOpen, setIsProfileModalOpen] = useState(false);
  const [modalRoleOverride, setModalRoleOverride] = useState<UserRole | undefined>(undefined);

  const openProfileModal = (roleOverride?: UserRole) => {
    if (roleOverride) setModalRoleOverride(roleOverride);
    setIsProfileModalOpen(true);
  };

  const closeProfileModal = () => {
    setIsProfileModalOpen(false);
    setModalRoleOverride(undefined);
  };

  const updateProfileCustomization = (updates: Partial<UserProfileCustomization>) => {
    setProfileCustomizationState((prev) => {
      const next = { ...prev, ...updates };
      localStorage.setItem(STORAGE_KEYS.PROFILE_CUSTOMIZATION, JSON.stringify(next));
      return next;
    });
  };

  // Sync Accent & Background CSS Variables dynamically across the whole application
  useEffect(() => {
    if (typeof document !== 'undefined') {
      const accent = profileCustomization.accentColor || '#00A86B';
      const bg = profileCustomization.dashboardBg || '#fcfbf7';
      document.documentElement.style.setProperty('--app-accent-color', accent);
      document.documentElement.style.setProperty('--color-primary-accent', accent);
      document.documentElement.style.setProperty('--app-dashboard-bg', bg);
      if (theme !== 'dark') {
        document.documentElement.style.setProperty('--color-bg', bg);
      }
    }
  }, [profileCustomization.accentColor, profileCustomization.dashboardBg, theme]);

  // Sync Language and Direction
  const setLang = (newLang: Language) => {
    setLangState(newLang);
    localStorage.setItem(STORAGE_KEYS.LANG, newLang);
    document.documentElement.setAttribute('lang', newLang);
    document.documentElement.setAttribute('dir', newLang === 'ar' ? 'rtl' : 'ltr');
  };

  useEffect(() => {
    document.documentElement.setAttribute('lang', lang);
    document.documentElement.setAttribute('dir', lang === 'ar' ? 'rtl' : 'ltr');
  }, [lang]);

  // Sync Theme
  const setTheme = (newTheme: Theme) => {
    setThemeState(newTheme);
    localStorage.setItem(STORAGE_KEYS.THEME, newTheme);
    if (newTheme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  };

  const toggleTheme = () => {
    setTheme(theme === 'light' ? 'dark' : 'light');
  };

  useEffect(() => {
    if (theme === 'dark') {
      document.documentElement.classList.add('dark');
    } else {
      document.documentElement.classList.remove('dark');
    }
  }, [theme]);

  // Sync Accessibility to HTML
  const toggleHighContrast = () => {
    const val = !highContrast;
    setHighContrast(val);
    document.documentElement.classList.toggle('high-contrast', val);
  };

  const setFontSize = (size: FontSize) => {
    setFontSizeState(size);
    document.documentElement.classList.remove('font-large', 'font-xlarge');
    if (size === 'large') document.documentElement.classList.add('font-large');
    if (size === 'xlarge') document.documentElement.classList.add('font-xlarge');
  };

  const toggleScreenReaderHints = () => setScreenReaderHints((p) => !p);
  const toggleSignLanguageAssistance = () => setSignLanguageAssistance((p) => !p);

  // Sync Role and Active IDs
  const setCurrentRole = (role: UserRole) => {
    setCurrentRoleState(role);
    localStorage.setItem(STORAGE_KEYS.ROLE, role);
  };

  const setActiveParentId = (id: string | null) => {
    setActiveParentIdState(id);
    if (id) localStorage.setItem(STORAGE_KEYS.ACTIVE_PARENT, id);
    else localStorage.removeItem(STORAGE_KEYS.ACTIVE_PARENT);
  };

  const setActiveLearnerId = (id: string | null) => {
    setActiveLearnerIdState(id);
    if (id) localStorage.setItem(STORAGE_KEYS.ACTIVE_LEARNER, id);
    else localStorage.removeItem(STORAGE_KEYS.ACTIVE_LEARNER);
  };

  const setActiveOrgId = (id: string | null) => {
    setActiveOrgIdState(id);
    if (id) localStorage.setItem(STORAGE_KEYS.ACTIVE_ORG, id);
    else localStorage.removeItem(STORAGE_KEYS.ACTIVE_ORG);
  };

  const setActiveIndividualId = (id: string | null) => {
    setActiveIndividualIdState(id);
    if (id) localStorage.setItem(STORAGE_KEYS.ACTIVE_INDIVIDUAL, id);
    else localStorage.removeItem(STORAGE_KEYS.ACTIVE_INDIVIDUAL);
  };

  // Save to LocalStorage whenever state changes
  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.PARENTS, JSON.stringify(parents));
  }, [parents]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.LEARNERS, JSON.stringify(learners));
  }, [learners]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.INDIVIDUALS, JSON.stringify(individuals));
  }, [individuals]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.ORGS, JSON.stringify(organizations));
  }, [organizations]);

  useEffect(() => {
    localStorage.setItem(STORAGE_KEYS.AUDIT_LOGS, JSON.stringify(auditLogs));
  }, [auditLogs]);

  // Log audit helper
  const addAuditLog = (
    action: string,
    targetType: AuditLogEntry['targetType'],
    targetId: string,
    targetName: string,
    details: string
  ) => {
    const entry: AuditLogEntry = {
      id: `log_${Date.now()}_${Math.floor(Math.random() * 1000)}`,
      timestamp: new Date().toLocaleString(),
      adminUser: 'Admin Superuser',
      action,
      targetType,
      targetId,
      targetName,
      details,
    };
    setAuditLogs((prev) => [entry, ...prev]);
  };

  // Business Action: Register Parent & Initial Learner
  const registerParentWithLearner = (
    parentData: { fullName: string; email: string; phone: string; relation: string },
    learnerData: { name: string; age: number; grade?: string; accommodations: string[]; diagnosis?: string }
  ) => {
    const newParentId = `parent_${Date.now()}`;
    const newLearnerId = `learner_${Date.now()}`;
    const pin = Math.floor(1000 + Math.random() * 9000).toString();

    const newParent: ParentProfile = {
      id: newParentId,
      fullName: sanitizeInput(parentData.fullName),
      email: sanitizeInput(parentData.email),
      phone: sanitizeInput(parentData.phone),
      relation: sanitizeInput(parentData.relation),
      createdAt: new Date().toISOString(),
    };

    const newLearner: LearnerProfile = {
      id: newLearnerId,
      parentId: newParentId,
      name: sanitizeInput(learnerData.name),
      age: Math.max(3, Math.min(25, Number(learnerData.age) || 10)),
      grade: sanitizeInput(learnerData.grade || 'Grade 5'),
      accessLink: `https://codera.app/#/assessment?student=${newLearnerId}&code=CR-${pin}`,
      accessPin: pin,
      accommodations: (learnerData.accommodations || []).map(sanitizeInput),
      diagnosis: sanitizeInput(learnerData.diagnosis || ''),
      assessment: {
        completed: false,
        score: 0,
        level: 'L1',
        levelName: 'Coder',
        domainScores: { logic: 0, pattern: 0, math: 0, comprehension: 0, coding: 0 },
      },
      verification: {
        status: 'none',
      },
      payment: {
        status: 'unpaid',
        amount: 149,
      },
      courseUnlocked: false,
    };

    setParents((prev) => [newParent, ...prev]);
    setLearners((prev) => [newLearner, ...prev]);
    setActiveParentId(newParentId);
    setActiveLearnerId(newLearnerId);
    setCurrentRole('parent');

    addAuditLog('REGISTER_PARENT_LEARNER', 'Parent', newParentId, newParent.fullName, `Created with learner ${newLearner.name}`);
    return { parent: newParent, learner: newLearner };
  };

  // Business Action: Add sibling learner (isolated profile)
  const addLearnerToParent = (
    parentId: string,
    learnerData: { name: string; age: number; grade?: string; accommodations: string[]; diagnosis?: string }
  ) => {
    const newLearnerId = `learner_${Date.now()}`;
    const pin = Math.floor(1000 + Math.random() * 9000).toString();

    const newLearner: LearnerProfile = {
      id: newLearnerId,
      parentId,
      name: sanitizeInput(learnerData.name),
      age: Math.max(3, Math.min(25, Number(learnerData.age) || 10)),
      grade: sanitizeInput(learnerData.grade || 'Grade 4'),
      accessLink: `https://codera.app/#/assessment?student=${newLearnerId}&code=CR-${pin}`,
      accessPin: pin,
      accommodations: (learnerData.accommodations || []).map(sanitizeInput),
      diagnosis: sanitizeInput(learnerData.diagnosis || ''),
      assessment: {
        completed: false,
        score: 0,
        level: 'L1',
        levelName: 'Coder',
        domainScores: { logic: 0, pattern: 0, math: 0, comprehension: 0, coding: 0 },
      },
      verification: {
        status: 'none',
      },
      payment: {
        status: 'unpaid',
        amount: 149,
      },
      courseUnlocked: false,
    };

    setLearners((prev) => [...prev, newLearner]);
    setActiveLearnerId(newLearnerId);
    addAuditLog('ADD_LEARNER_SIBLING', 'Learner', newLearnerId, newLearner.name, `Added sibling to parent ${parentId}`);
    return newLearner;
  };

  // Assessment results save
  const saveAssessmentResult = (learnerId: string, result: AssessmentData) => {
    setLearners((prev) =>
      prev.map((lrn) => {
        if (lrn.id === learnerId) {
          return {
            ...lrn,
            assessment: {
              ...result,
              timestamp: new Date().toISOString(),
            },
          };
        }
        return lrn;
      })
    );
    const target = learners.find((l) => l.id === learnerId);
    addAuditLog('ASSESSMENT_COMPLETED', 'Learner', learnerId, target?.name || learnerId, `Scored ${result.score} pts (${result.level} - ${result.levelName})`);
  };

  // Submit Video Verification
  const submitVideoVerification = (learnerId: string, transcript: string, videoUrl: string = 'blob:simulated_recording.webm') => {
    setLearners((prev) =>
      prev.map((lrn) => {
        if (lrn.id === learnerId) {
          return {
            ...lrn,
            verification: {
              status: 'pending',
              videoUrl,
              transcript,
              submittedAt: new Date().toISOString(),
            },
          };
        }
        return lrn;
      })
    );
    const target = learners.find((l) => l.id === learnerId);
    addAuditLog('VIDEO_VERIFICATION_SUBMITTED', 'Learner', learnerId, target?.name || learnerId, 'Video submitted to Admin Pending Queue');
  };

  // Pay Learner Course (Unlocks content immediately)
  const payLearnerCourse = (learnerId: string, amount: number = 180) => {
    const txId = `TXN-CR-${Math.floor(100000 + Math.random() * 900000)}`;
    setLearners((prev) =>
      prev.map((lrn) => {
        if (lrn.id === learnerId) {
          return {
            ...lrn,
            payment: {
              status: 'paid',
              amount,
              paidAt: new Date().toISOString(),
              transactionId: txId,
            },
            courseUnlocked: true,
          };
        }
        return lrn;
      })
    );
    const target = learners.find((l) => l.id === learnerId);
    addAuditLog('COURSE_PAYMENT_PROCESSED', 'Payment', learnerId, target?.name || learnerId, `Paid $${amount} (Tx: ${txId})`);
  };

  // Individual Actions
  const registerIndividual = (profile: { fullName: string; email: string; phone?: string; dateOfBirth?: string; track: 'programming' | 'sign_language' }) => {
    const newId = `ind_${Date.now()}`;
    const newInd: IndividualProfile = {
      id: newId,
      fullName: sanitizeInput(profile.fullName),
      email: sanitizeInput(profile.email),
      phone: sanitizeInput(profile.phone || ''),
      dateOfBirth: profile.dateOfBirth,
      track: profile.track,
      paymentStatus: 'unpaid',
      progress: 0,
    };
    setIndividuals((prev) => [newInd, ...prev]);
    setActiveIndividualId(newId);
    setCurrentRole('individual');
    addAuditLog('INDIVIDUAL_REGISTERED', 'Individual', newId, newInd.fullName, `Track selected: ${newInd.track}`);
    return newInd;
  };

  const payIndividualTrack = (individualId: string, amount: number = 180) => {
    const txId = `TXN-CR-${Math.floor(100000 + Math.random() * 900000)}`;
    setIndividuals((prev) =>
      prev.map((ind) => {
        if (ind.id === individualId) {
          return {
            ...ind,
            paymentStatus: 'paid',
            paidAmount: amount,
            transactionId: txId,
          };
        }
        return ind;
      })
    );
    const target = individuals.find((i) => i.id === individualId);
    addAuditLog('INDIVIDUAL_TRACK_PAID', 'Payment', individualId, target?.fullName || individualId, `Track unlocked after payment ($${amount}, Tx: ${txId})`);
  };

  const completeIndividualLevel = (individualId: string) => {
    setIndividuals((prev) =>
      prev.map((ind) => {
        if (ind.id === individualId) {
          return {
            ...ind,
            progress: 100,
            completedAt: new Date().toISOString(),
            certificateId: `CR-CERT-2026-${Math.floor(10000 + Math.random() * 90000)}`,
          };
        }
        return ind;
      })
    );
  };

  // Organization Actions
  const registerOrgStep1 = (orgData: {
    name: string;
    email: string;
    phone: string;
    orgType: 'school' | 'center' | 'ngo';
    contactPerson: string;
    country?: string;
    city?: string;
    description?: string;
  }) => {
    const newId = `org_${Date.now()}`;
    const newOrg: OrgProfile = {
      id: newId,
      name: sanitizeInput(orgData.name),
      email: sanitizeInput(orgData.email),
      phone: sanitizeInput(orgData.phone),
      orgType: orgData.orgType,
      contactPerson: sanitizeInput(orgData.contactPerson),
      country: sanitizeInput(orgData.country || ''),
      city: sanitizeInput(orgData.city || ''),
      description: sanitizeInput(orgData.description || ''),
      step1Status: 'pending',
      step2Status: 'not_started',
      documents: [],
      activePackage: null,
      mentors: [],
      students: [],
    };
    setOrganizations((prev) => [newOrg, ...prev]);
    setActiveOrgId(newId);
    setCurrentRole('org');
    addAuditLog('ORG_STEP1_SUBMITTED', 'Organization', newId, newOrg.name, 'Submitted Step 1 profile to Admin Queue');
    return newOrg;
  };

  const submitOrgStep2Docs = (orgId: string, docNames: string[], extraData?: Partial<OrgProfile>) => {
    const uploaded = docNames.map((name) => ({
      name: sanitizeFileName(name),
      size: `${(1.2 + Math.random() * 2).toFixed(1)} MB`,
      uploadDate: new Date().toISOString().split('T')[0],
    }));

    setOrganizations((prev) =>
      prev.map((org) => {
        if (org.id === orgId) {
          return {
            ...org,
            step2Status: 'pending',
            documents: [...org.documents, ...uploaded],
            taxNumber: extraData?.taxNumber ? sanitizeInput(extraData.taxNumber) : org.taxNumber,
            businessNumber: extraData?.businessNumber ? sanitizeInput(extraData.businessNumber) : org.businessNumber,
            address: extraData?.address ? sanitizeInput(extraData.address) : org.address,
            website: extraData?.website ? sanitizeInput(extraData.website) : org.website,
            expectedMentors: extraData?.expectedMentors ?? org.expectedMentors,
            expectedStudents: extraData?.expectedStudents ?? org.expectedStudents,
          };
        }
        return org;
      })
    );
    const target = organizations.find((o) => o.id === orgId);
    addAuditLog('ORG_STEP2_DOCS_SUBMITTED', 'Organization', orgId, target?.name || orgId, `Uploaded ${docNames.length} verification document(s)`);
  };

  const purchaseOrgPackage = (orgId: string, tier: 'Starter' | 'Growth' | 'Enterprise') => {
    const capacities = {
      Starter: { students: 50, mentors: 10, price: 2400 },
      Growth: { students: 150, mentors: 25, price: 5400 },
      Enterprise: { students: 500, mentors: 999, price: 12000 },
    };
    const cap = capacities[tier];
    const txId = `TXN-ORG-${Math.floor(10000000 + Math.random() * 90000000)}`;
    const pkg: OrgPackage = {
      id: `pkg_${Date.now()}`,
      tierName: tier,
      studentCapacity: cap.students,
      mentorCapacity: cap.mentors,
      price: cap.price,
      activatedAt: new Date().toISOString(),
    };

    setOrganizations((prev) =>
      prev.map((org) => {
        if (org.id === orgId) {
          return {
            ...org,
            activePackage: pkg,
            paidAmount: cap.price,
            transactionId: txId,
          };
        }
        return org;
      })
    );
    const target = organizations.find((o) => o.id === orgId);
    addAuditLog('ORG_PACKAGE_ACTIVATED', 'Organization', orgId, target?.name || orgId, `Activated ${tier} Package ($${cap.price}/year, Tx: ${txId})`);
  };

  const upgradeOrgPackage = (orgId: string, newTier: 'Starter' | 'Growth' | 'Enterprise') => {
    const capacities = {
      Starter: { students: 50, mentors: 10, price: 2400 },
      Growth: { students: 150, mentors: 25, price: 5400 },
      Enterprise: { students: 500, mentors: 999, price: 12000 },
    };
    const cap = capacities[newTier];

    setOrganizations((prev) =>
      prev.map((org) => {
        if (org.id === orgId && org.activePackage) {
          return {
            ...org,
            paidAmount: cap.price,
            activePackage: {
              ...org.activePackage,
              tierName: newTier,
              studentCapacity: cap.students,
              mentorCapacity: cap.mentors,
              price: cap.price,
            },
          };
        }
        return org;
      })
    );
    const target = organizations.find((o) => o.id === orgId);
    addAuditLog('ORG_PACKAGE_UPGRADED', 'Organization', orgId, target?.name || orgId, `Upgraded to ${newTier} plan ($${cap.price}/year)`);
  };

  const updateOrgSettings = (orgId: string, settings: Partial<OrgProfile>) => {
    setOrganizations((prev) =>
      prev.map((o) => {
        if (o.id === orgId) {
          return {
            ...o,
            ...settings,
            name: settings.name ? sanitizeInput(settings.name) : o.name,
            email: settings.email ? sanitizeInput(settings.email) : o.email,
            phone: settings.phone ? sanitizeInput(settings.phone) : o.phone,
          };
        }
        return o;
      })
    );
    const target = organizations.find((o) => o.id === orgId);
    addAuditLog('ORG_SETTINGS_UPDATED', 'Organization', orgId, target?.name || orgId, 'Updated workspace profile and parameters');
  };

  // Add mentor - deducts 1 capacity unit (BR-38/BR-39)
  const addOrgMentor = (
    orgId: string,
    mentor: { name: string; email: string; role?: string; studentsCount?: number }
  ) => {
    const org = organizations.find((o) => o.id === orgId);
    if (!org || !org.activePackage) return false;
    if (org.mentors.length >= org.activePackage.mentorCapacity) return false;

    const newMentor: OrgMentor = {
      id: `m_${Date.now()}`,
      name: sanitizeInput(mentor.name),
      email: sanitizeInput(mentor.email),
      role: mentor.role ? sanitizeInput(mentor.role) : 'SEN Coding Instructor',
      studentsCount: mentor.studentsCount ?? 0,
      status: 'Active',
      assignedDate: new Date().toISOString().split('T')[0],
    };

    setOrganizations((prev) =>
      prev.map((o) => {
        if (o.id === orgId) {
          return {
            ...o,
            mentors: [...o.mentors, newMentor],
          };
        }
        return o;
      })
    );
    addAuditLog('ORG_MENTOR_ADDED', 'Organization', orgId, org.name, `Added mentor ${mentor.name} (consumed 1 unit)`);
    return true;
  };

  const removeOrgMentor = (orgId: string, mentorId: string) => {
    setOrganizations((prev) =>
      prev.map((o) => {
        if (o.id === orgId) {
          return {
            ...o,
            mentors: o.mentors.filter((m) => m.id !== mentorId),
          };
        }
        return o;
      })
    );
    const org = organizations.find((o) => o.id === orgId);
    addAuditLog('ORG_MENTOR_REMOVED', 'Organization', orgId, org?.name || orgId, `Removed mentor ID ${mentorId}`);
  };

  // Add student - deducts 1 capacity unit (BR-38/BR-39)
  const addOrgStudent = (
    orgId: string,
    student: { name: string; email?: string; grade: string; mentor?: string; level?: string }
  ) => {
    const org = organizations.find((o) => o.id === orgId);
    if (!org || !org.activePackage) return false;
    if (org.students.length >= org.activePackage.studentCapacity) return false;

    const newStudent: OrgStudent = {
      id: `s_${Date.now()}`,
      name: sanitizeInput(student.name),
      email: student.email ? sanitizeInput(student.email) : `${student.name.toLowerCase().replace(/\s+/g, '.')}@student.codera.org`,
      grade: sanitizeInput(student.grade),
      mentor: student.mentor ? sanitizeInput(student.mentor) : (org.mentors[0]?.name || 'Unassigned'),
      level: student.level ? sanitizeInput(student.level) : 'Level 1',
      progress: 0,
      status: 'Active',
      assignedDate: new Date().toISOString().split('T')[0],
    };

    setOrganizations((prev) =>
      prev.map((o) => {
        if (o.id === orgId) {
          return {
            ...o,
            students: [...o.students, newStudent],
          };
        }
        return o;
      })
    );
    addAuditLog('ORG_STUDENT_ADDED', 'Organization', orgId, org.name, `Added student ${student.name} (consumed 1 unit)`);
    return true;
  };

  const removeOrgStudent = (orgId: string, studentId: string) => {
    setOrganizations((prev) =>
      prev.map((o) => {
        if (o.id === orgId) {
          return {
            ...o,
            students: o.students.filter((s) => s.id !== studentId),
          };
        }
        return o;
      })
    );
    const org = organizations.find((o) => o.id === orgId);
    addAuditLog('ORG_STUDENT_REMOVED', 'Organization', orgId, org?.name || orgId, `Removed student ID ${studentId}`);
  };

  // Admin Actions
  const adminReviewVideo = (learnerId: string, decision: 'accepted' | 'retake_required', notes?: string) => {
    setLearners((prev) =>
      prev.map((lrn) => {
        if (lrn.id === learnerId) {
          const courseUnlocked = decision === 'accepted' && lrn.payment.status === 'paid';
          return {
            ...lrn,
            verification: {
              ...lrn.verification,
              status: decision,
              adminNotes: notes,
            },
            courseUnlocked,
          };
        }
        return lrn;
      })
    );
    const target = learners.find((l) => l.id === learnerId);
    addAuditLog(
      decision === 'accepted' ? 'ADMIN_ACCEPTED_VIDEO' : 'ADMIN_REQUESTED_RETAKE',
      'Learner',
      learnerId,
      target?.name || learnerId,
      notes || (decision === 'accepted' ? 'Identity verified successfully' : 'Retake requested per BR-15')
    );
  };

  const adminReviewOrgStep1 = (orgId: string, decision: 'approved' | 'rejected', notes?: string) => {
    setOrganizations((prev) =>
      prev.map((org) => {
        if (org.id === orgId) {
          return {
            ...org,
            step1Status: decision,
            adminNotes: notes,
          };
        }
        return org;
      })
    );
    const target = organizations.find((o) => o.id === orgId);
    addAuditLog(
      decision === 'approved' ? 'ADMIN_APPROVED_ORG_STEP1' : 'ADMIN_REJECTED_ORG_STEP1',
      'Organization',
      orgId,
      target?.name || orgId,
      notes || `Step 1 status changed to ${decision}`
    );
  };

  const adminReviewOrgStep2 = (orgId: string, decision: 'approved' | 'changes_requested', notes?: string) => {
    setOrganizations((prev) =>
      prev.map((org) => {
        if (org.id === orgId) {
          return {
            ...org,
            step2Status: decision,
            adminNotes: notes,
          };
        }
        return org;
      })
    );
    const target = organizations.find((o) => o.id === orgId);
    addAuditLog(
      decision === 'approved' ? 'ADMIN_APPROVED_ORG_STEP2' : 'ADMIN_REQUESTED_ORG_DOC_CHANGES',
      'Organization',
      orgId,
      target?.name || orgId,
      notes || `Step 2 status changed to ${decision}`
    );
  };

  const getActiveUserContext = (roleOverride?: UserRole): ActiveUserContextData => {
    const effectiveRole = roleOverride || modalRoleOverride || currentRole;
    const currentPath = typeof window !== 'undefined' ? window.location.hash || window.location.pathname : '';

    let resolvedRole = effectiveRole;
    if (resolvedRole === 'guest') {
      if (currentPath.includes('student') || currentPath.includes('assessment') || currentPath.includes('learning')) {
        resolvedRole = 'student';
      } else if (currentPath.includes('parent')) {
        resolvedRole = 'parent';
      } else if (currentPath.includes('org')) {
        resolvedRole = 'org';
      } else if (currentPath.includes('individual')) {
        resolvedRole = 'individual';
      } else if (currentPath.includes('admin')) {
        resolvedRole = 'admin';
      }
    }

    if (resolvedRole === 'student') {
      const learner = learners.find((l) => l.id === activeLearnerId) || learners[0];
      const name = profileCustomization.customDisplayName || learner?.name || 'Ahmed Hassan';
      return {
        role: 'student',
        name,
        email: profileCustomization.customEmail || `student.${name.toLowerCase().replace(/[^a-z0-9]/g, '.')}@codera.org`,
        phone: profileCustomization.customPhone || '+971 50 123 4567 (Parent Guardian)',
        avatarUrl: profileCustomization.avatarUrl,
        avatarPreset: profileCustomization.avatarPreset || 'coder_bear',
        accentColor: profileCustomization.accentColor || '#00A86B',
        dashboardBg: profileCustomization.dashboardBg || '#fcfbf7',
        roleLabel: lang === 'ar' ? 'طالب متعلم' : 'Student Learner',
        statusBadge: learner?.courseUnlocked
          ? lang === 'ar'
            ? 'منهاج نشط ومفعل'
            : 'Active & Enrolled'
          : lang === 'ar'
          ? 'تقييم مكتمل'
          : 'Assessment Completed',
        extraDetails: {
          Grade: learner?.grade || 'Grade 6',
          Level: learner?.assessment?.levelName || 'Junior Coder',
          Accommodations: learner?.accommodations?.join(', ') || 'Visual & Audio Cues',
        },
      };
    }

    if (resolvedRole === 'parent') {
      const parent = parents.find((p) => p.id === activeParentId) || parents[0];
      const name = profileCustomization.customDisplayName || parent?.fullName || 'Mariam Al-Mansoor';
      return {
        role: 'parent',
        name,
        email: profileCustomization.customEmail || parent?.email || 'mariam.mansoor@example.com',
        phone: profileCustomization.customPhone || parent?.phone || '+971 50 123 4567',
        avatarUrl: profileCustomization.avatarUrl,
        avatarPreset: profileCustomization.avatarPreset || 'coder_bear',
        accentColor: profileCustomization.accentColor || '#00A86B',
        dashboardBg: profileCustomization.dashboardBg || '#fcfbf7',
        roleLabel: lang === 'ar' ? 'ولي أمر' : 'Parent & Guardian',
        statusBadge: lang === 'ar' ? 'حساب عائلي موثق' : 'Verified Family Account',
        extraDetails: {
          Relation: parent?.relation || 'Mother',
          'Enrolled Learners': `${learners.filter((l) => l.parentId === (parent?.id || 'parent_1')).length} Children`,
        },
      };
    }

    if (resolvedRole === 'org') {
      const org = organizations.find((o) => o.id === activeOrgId) || organizations[0];
      const name = profileCustomization.customDisplayName || org?.name || 'Hope Academy';
      return {
        role: 'org',
        name,
        email: profileCustomization.customEmail || org?.email || 'contact@hopeacademy.edu',
        phone: profileCustomization.customPhone || org?.phone || '+966 11 456 7890',
        avatarUrl: profileCustomization.avatarUrl,
        avatarPreset: profileCustomization.avatarPreset || 'ai_robot',
        accentColor: profileCustomization.accentColor || '#00A86B',
        dashboardBg: profileCustomization.dashboardBg || '#fcfbf7',
        roleLabel: lang === 'ar' ? 'مؤسسة تعليمية' : 'Organization Hub',
        statusBadge: org?.activePackage
          ? `${org.activePackage.tierName} Enterprise Plan`
          : lang === 'ar'
          ? 'قيد التدقيق الرسمي'
          : 'Pending Verification',
        extraDetails: {
          'Contact Person': org?.contactPerson || 'Dr. Sarah Al-Mansoor',
          City: org?.city || 'Riyadh',
          Mentors: `${org?.mentors?.length || 8} Mentors`,
          Students: `${org?.students?.length || 14} Students`,
        },
      };
    }

    if (resolvedRole === 'individual') {
      const ind = individuals.find((i) => i.id === activeIndividualId) || individuals[0];
      const name = profileCustomization.customDisplayName || ind?.fullName || 'Nadia Al-Mutairi';
      return {
        role: 'individual',
        name,
        email: profileCustomization.customEmail || ind?.email || 'nadia.mutairi@example.com',
        phone: profileCustomization.customPhone || ind?.phone || '+966 50 123 4567',
        avatarUrl: profileCustomization.avatarUrl,
        avatarPreset: profileCustomization.avatarPreset || 'girl_coder',
        accentColor: profileCustomization.accentColor || '#00A86B',
        dashboardBg: profileCustomization.dashboardBg || '#fcfbf7',
        roleLabel: lang === 'ar' ? 'متعلم فردي' : 'Individual Learner',
        statusBadge:
          ind?.paymentStatus === 'paid'
            ? lang === 'ar'
              ? 'مسار نشط ومكتمل 80%'
              : '80% Track Completed'
            : 'Enrolled',
        extraDetails: {
          Track: ind?.track === 'programming' ? 'Inclusive Python & Web' : 'Arabic Sign Language',
          Progress: `${ind?.progress || 80}%`,
        },
      };
    }

    if (resolvedRole === 'admin') {
      return {
        role: 'admin',
        name: profileCustomization.customDisplayName || 'Admin Superuser',
        email: profileCustomization.customEmail || 'admin@codera.org',
        phone: profileCustomization.customPhone || '+971 4 123 4567',
        avatarUrl: profileCustomization.avatarUrl,
        avatarPreset: profileCustomization.avatarPreset || 'hero_champion',
        accentColor: profileCustomization.accentColor || '#00A86B',
        dashboardBg: profileCustomization.dashboardBg || '#fcfbf7',
        roleLabel: lang === 'ar' ? 'مسؤول النظام' : 'System Administrator',
        statusBadge: lang === 'ar' ? 'صلاحيات حوكمة كاملة' : 'Full Root Governance',
        extraDetails: {
          Access: 'Global Read/Write/Approve',
          Audit: 'Full Logging Enabled',
        },
      };
    }

    // Default Guest fallback
    return {
      role: 'guest',
      name: profileCustomization.customDisplayName || 'CodeRa Learner',
      email: profileCustomization.customEmail || 'learner@codera.org',
      phone: profileCustomization.customPhone || '+966 50 000 0000',
      avatarUrl: profileCustomization.avatarUrl,
      avatarPreset: profileCustomization.avatarPreset || 'coder_bear',
      accentColor: profileCustomization.accentColor || '#00A86B',
      dashboardBg: profileCustomization.dashboardBg || '#fcfbf7',
      roleLabel: lang === 'ar' ? 'زائر / متعلم' : 'Guest Learner',
      statusBadge: lang === 'ar' ? 'وصول شامل متاح' : 'Inclusive Access Ready',
    };
  };

  const updateActiveUserProfile = (updates: {
    fullName?: string;
    email?: string;
    phone?: string;
    bio?: string;
    grade?: string;
    contactPerson?: string;
  }) => {
    const effectiveRole = modalRoleOverride || currentRole;

    if (effectiveRole === 'student' && activeLearnerId) {
      setLearners((prev) => {
        const next = prev.map((l) => {
          if (l.id === activeLearnerId) {
            return {
              ...l,
              name: updates.fullName || l.name,
              grade: updates.grade || l.grade,
            };
          }
          return l;
        });
        localStorage.setItem(STORAGE_KEYS.LEARNERS, JSON.stringify(next));
        return next;
      });
    } else if (effectiveRole === 'parent' && activeParentId) {
      setParents((prev) => {
        const next = prev.map((p) => {
          if (p.id === activeParentId) {
            return {
              ...p,
              fullName: updates.fullName || p.fullName,
              email: updates.email || p.email,
              phone: updates.phone || p.phone,
            };
          }
          return p;
        });
        localStorage.setItem(STORAGE_KEYS.PARENTS, JSON.stringify(next));
        return next;
      });
    } else if (effectiveRole === 'org' && activeOrgId) {
      setOrganizations((prev) => {
        const next = prev.map((o) => {
          if (o.id === activeOrgId) {
            return {
              ...o,
              name: updates.fullName || o.name,
              email: updates.email || o.email,
              phone: updates.phone || o.phone,
              contactPerson: updates.contactPerson || o.contactPerson,
            };
          }
          return o;
        });
        localStorage.setItem(STORAGE_KEYS.ORGS, JSON.stringify(next));
        return next;
      });
    } else if (effectiveRole === 'individual' && activeIndividualId) {
      setIndividuals((prev) => {
        const next = prev.map((i) => {
          if (i.id === activeIndividualId) {
            return {
              ...i,
              fullName: updates.fullName || i.fullName,
              email: updates.email || i.email,
              phone: updates.phone || i.phone,
            };
          }
          return i;
        });
        localStorage.setItem(STORAGE_KEYS.INDIVIDUALS, JSON.stringify(next));
        return next;
      });
    }

    // Always update profileCustomization
    updateProfileCustomization({
      customDisplayName: updates.fullName,
      customEmail: updates.email,
      customPhone: updates.phone,
      bio: updates.bio,
    });
  };

  const resetToSampleData = () => {
    setParents(initialSeedParents);
    setLearners(initialSeedLearners);
    setIndividuals(initialSeedIndividuals);
    setOrganizations(initialSeedOrgs);
    setAuditLogs(initialSeedAuditLogs);
    setActiveParentId('parent_1');
    setActiveLearnerId('learner_1');
    setActiveOrgId('org_1');
    setActiveIndividualId('ind_1');
    setCurrentRole('guest');
  };

  return (
    <MockDataContext.Provider
      value={{
        lang,
        setLang,
        theme,
        toggleTheme,
        setTheme,
        highContrast,
        toggleHighContrast,
        fontSize,
        setFontSize,
        screenReaderHints,
        toggleScreenReaderHints,
        signLanguageAssistance,
        toggleSignLanguageAssistance,
        currentRole,
        setCurrentRole,
        activeParentId,
        setActiveParentId,
        activeLearnerId,
        setActiveLearnerId,
        activeOrgId,
        setActiveOrgId,
        activeIndividualId,
        setActiveIndividualId,
        profileCustomization,
        updateProfileCustomization,
        isProfileModalOpen,
        setIsProfileModalOpen,
        openProfileModal,
        closeProfileModal,
        updateActiveUserProfile,
        getActiveUserContext,
        parents,
        learners,
        individuals,
        organizations,
        auditLogs,
        registerParentWithLearner,
        addLearnerToParent,
        saveAssessmentResult,
        submitVideoVerification,
        payLearnerCourse,
        registerIndividual,
        payIndividualTrack,
        completeIndividualLevel,
        registerOrgStep1,
        submitOrgStep2Docs,
        purchaseOrgPackage,
        addOrgMentor,
        removeOrgMentor,
        addOrgStudent,
        removeOrgStudent,
        upgradeOrgPackage,
        updateOrgSettings,
        adminReviewVideo,
        adminReviewOrgStep1,
        adminReviewOrgStep2,
        resetToSampleData,
      }}
    >
      {children}
    </MockDataContext.Provider>
  );
};

export const useMockData = () => {
  const context = useContext(MockDataContext);
  if (!context) {
    throw new Error('useMockData must be used within a MockDataProvider');
  }
  return context;
};
