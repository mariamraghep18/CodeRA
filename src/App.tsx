import React from 'react';
import { RouterProvider, useRouter } from './router/Router';
import { MockDataProvider, useMockData } from './context/MockDataContext';
import { Navbar } from './components/Navbar';
import { AccessibilitySidebarDrawer } from './components/AccessibilitySidebarDrawer';
import { UserProfileModal } from './components/profile/UserProfileModal';
import { ErrorBoundary } from './components/ErrorBoundary';
import { RouteGuard } from './router/RouteGuard';

// Flow 1 Pages
import { LandingPage } from './pages/LandingPage';
import {
  LoginPage,
  ForgotPasswordPage,
  VerificationCodePage,
  ResetPasswordPage,
} from './pages/auth/AuthPages';

// Flow 2 Pages (Parent Journey)
import {
  RegisterParentPage,
  AddFirstLearnerPage,
  ParentDashboardScreen,
  ParentPaymentFlowPage,
  ParentPaymentSuccessPage,
  LearnerDetailPage,
  LearnerProgressPage,
  LearnerCertificatesPage,
  ParentNotificationsPage,
} from './pages/parent/ParentFlowPages';

// Flow 3 Pages (Individual Journey)
import {
  RegisterIndividualPage,
  TrackSelectionPage,
  TrackPreviewProgrammingPage,
  IndividualPaymentPage,
  IndividualDashboardPage,
  IndividualLearningPage,
  IndividualCourseCompletePage,
  IndividualCertificatePage,
} from './pages/individual/IndividualFlowPages';

// Flow 4 Pages (Organization Journey)
import {
  OrgRegistrationStep1Page,
  OrgPendingStep1Page,
  OrgRegistrationStep2Page,
  OrgChangesRequiredPage,
  OrgPackageSelectionPage,
  OrgPaymentPage,
  OrgSuccessPage,
  OrgDashboardPage,
  OrgManageMentorsPage,
  OrgManageStudentsPage,
} from './pages/organization/OrgFlowPages';

// Flow 5 Pages (Student Journey)
import {
  StudentWelcomePage,
  AssessmentIntroPage,
  AssessmentInProgressPage,
  AssessmentCompletePage,
  VideoVerificationPromptPage,
  PendingReviewPage,
  PaymentRequiredPage,
  StudentDashboardPage,
  LearningContentPage,
  LevelCompletePage,
  StudentCertificatePage,
} from './pages/student/StudentFlowPages';

// Admin Page
import { AdminControlCenterPage } from './pages/admin/AdminControlCenterPage';

const AppContent: React.FC = () => {
  const { path } = useRouter();
  const { openProfileModal } = useMockData();

  // Global Alt+P Keyboard Shortcut & event listener for Profile Modal
  React.useEffect(() => {
    const handleKeyDown = (e: KeyboardEvent) => {
      if (e.altKey && (e.key === 'p' || e.key === 'P' || e.key === 'ح')) {
        e.preventDefault();
        openProfileModal();
      }
    };
    const handleCustomEvent = () => openProfileModal();
    window.addEventListener('keydown', handleKeyDown);
    window.addEventListener('open-profile-modal', handleCustomEvent);
    return () => {
      window.removeEventListener('keydown', handleKeyDown);
      window.removeEventListener('open-profile-modal', handleCustomEvent);
    };
  }, [openProfileModal]);

  // Dynamic route dispatcher for all 5 flows and complete screen inventory
  const renderCurrentPage = () => {
    switch (path) {
      // Flow 1: Public Entry & Authentication
      case '/':
      case '':
        return <LandingPage />;
      case '/login':
        return <LoginPage />;
      case '/forgot-password':
        return <ForgotPasswordPage />;
      case '/verification-code':
        return <VerificationCodePage />;
      case '/reset-password':
        return <ResetPasswordPage />;

      // Flow 2: Parent Journey & Multi-Learner Management
      case '/register-parent':
      case '/parent/register':
        return <RegisterParentPage />;
      case '/add-first-learner':
        return (
          <RouteGuard requiredRole="parent">
            <AddFirstLearnerPage />
          </RouteGuard>
        );
      case '/parent-dashboard':
      case '/parent/dashboard':
      case '/parent':
        return (
          <RouteGuard requiredRole="parent">
            <ParentDashboardScreen />
          </RouteGuard>
        );
      case '/parent/payment-flow':
        return (
          <RouteGuard requiredRole="parent">
            <ParentPaymentFlowPage />
          </RouteGuard>
        );
      case '/parent/payment-success':
        return (
          <RouteGuard requiredRole="parent">
            <ParentPaymentSuccessPage />
          </RouteGuard>
        );
      case '/parent/learner-detail':
        return (
          <RouteGuard requiredRole="parent">
            <LearnerDetailPage />
          </RouteGuard>
        );
      case '/parent/learner-progress':
        return (
          <RouteGuard requiredRole="parent">
            <LearnerProgressPage />
          </RouteGuard>
        );
      case '/parent/learner-certificates':
        return (
          <RouteGuard requiredRole="parent">
            <LearnerCertificatesPage />
          </RouteGuard>
        );
      case '/parent-notifications':
      case '/notifications':
        return (
          <RouteGuard requiredRole="parent">
            <ParentNotificationsPage />
          </RouteGuard>
        );

      // Flow 3: Individual Journey
      case '/register-individual':
        return <RegisterIndividualPage />;
      case '/track-selection':
        return <TrackSelectionPage />;
      case '/track-preview-programming':
        return <TrackPreviewProgrammingPage />;
      case '/individual-payment':
        return (
          <RouteGuard requiredRole="individual">
            <IndividualPaymentPage />
          </RouteGuard>
        );
      case '/individual-dashboard':
      case '/individual':
        return (
          <RouteGuard requiredRole="individual">
            <IndividualDashboardPage />
          </RouteGuard>
        );
      case '/individual-learning':
        return (
          <RouteGuard requiredRole="individual">
            <IndividualLearningPage />
          </RouteGuard>
        );
      case '/individual-course-complete':
        return (
          <RouteGuard requiredRole="individual">
            <IndividualCourseCompletePage />
          </RouteGuard>
        );
      case '/individual-certificate':
        return (
          <RouteGuard requiredRole="individual">
            <IndividualCertificatePage />
          </RouteGuard>
        );

      // Flow 4: Organization Journey
      case '/org-registration-step1':
      case '/organization':
      case '/org':
        return <OrgRegistrationStep1Page />;
      case '/org-pending-step1':
        return <OrgPendingStep1Page />;
      case '/org-registration-step2':
        return <OrgRegistrationStep2Page />;
      case '/org-changes-required':
        return <OrgChangesRequiredPage />;
      case '/org-package-selection':
        return <OrgPackageSelectionPage />;
      case '/org-payment':
        return (
          <RouteGuard requiredRole="org">
            <OrgPaymentPage />
          </RouteGuard>
        );
      case '/org-success':
        return (
          <RouteGuard requiredRole="org">
            <OrgSuccessPage />
          </RouteGuard>
        );
      case '/org-dashboard':
        return (
          <RouteGuard requiredRole="org">
            <OrgDashboardPage />
          </RouteGuard>
        );
      case '/org-manage-mentors':
        return (
          <RouteGuard requiredRole="org">
            <OrgManageMentorsPage />
          </RouteGuard>
        );
      case '/org-manage-students':
        return (
          <RouteGuard requiredRole="org">
            <OrgManageStudentsPage />
          </RouteGuard>
        );

      // Flow 5: Student Journey & Assessment Suite
      case '/student-welcome':
        return <StudentWelcomePage />;
      case '/assessment-intro':
      case '/assessment':
        return <AssessmentIntroPage />;
      case '/assessment-in-progress':
        return <AssessmentInProgressPage />;
      case '/assessment-complete':
        return <AssessmentCompletePage />;
      case '/video-verification':
      case '/video-verify':
        return <VideoVerificationPromptPage />;
      case '/pending-review':
        return <PendingReviewPage />;
      case '/payment-required':
        return <PaymentRequiredPage />;
      case '/student-dashboard':
        return <StudentDashboardPage />;
      case '/learning-content':
        return <LearningContentPage />;
      case '/level-complete':
        return <LevelCompletePage />;
      case '/certificate':
        return <StudentCertificatePage />;

      // Admin & Governance (Protected)
      case '/admin':
        return (
          <RouteGuard requiredRole="admin">
            <AdminControlCenterPage />
          </RouteGuard>
        );

      default:
        return <LandingPage />;
    }
  };

  return (
    <div className="min-h-screen flex flex-col font-sans transition-colors duration-200">
      {/* Platform-wide Shared Navbar */}
      <Navbar />

      {/* Main Content Viewport */}
      <main className="flex-1 w-full">
        {renderCurrentPage()}
      </main>

      {/* Platform-wide Persistent Accessibility Sidebar Drawer */}
      <AccessibilitySidebarDrawer />

      {/* Platform-wide Universal User Profile & Customization Modal */}
      <UserProfileModal />
    </div>
  );
};

export const App: React.FC = () => {
  return (
    <ErrorBoundary>
      <MockDataProvider>
        <RouterProvider>
          <AppContent />
        </RouterProvider>
      </MockDataProvider>
    </ErrorBoundary>
  );
};

export default App;
