import React from 'react';
import { AuthModal } from '../../components/auth/AuthModal';

/* ========================================================================= */
/* 1. LOGIN PAGE (/login)                                                    */
/* ========================================================================= */
export const LoginPage: React.FC = () => {
  return <AuthModal isFullPage initialStep="login" />;
};

/* ========================================================================= */
/* 2. FORGOT PASSWORD PAGE (/forgot-password)                                */
/* ========================================================================= */
export const ForgotPasswordPage: React.FC = () => {
  return <AuthModal isFullPage initialStep="forgot-password" />;
};

/* ========================================================================= */
/* 3. VERIFICATION CODE PAGE (/verification-code)                            */
/* ========================================================================= */
export const VerificationCodePage: React.FC = () => {
  return <AuthModal isFullPage initialStep="check-email" />;
};

/* ========================================================================= */
/* 4. RESET PASSWORD PAGE (/reset-password)                                  */
/* ========================================================================= */
export const ResetPasswordPage: React.FC = () => {
  return <AuthModal isFullPage initialStep="create-password" />;
};
