import React, { ReactNode } from 'react';
import { useRouter } from './Router';
import { useMockData, UserRole } from '../context/MockDataContext';
import { ShieldAlert, LogIn, Lock, ArrowLeft } from 'lucide-react';

interface RouteGuardProps {
  children: ReactNode;
  requiredRole?: UserRole | UserRole[];
}

export const RouteGuard: React.FC<RouteGuardProps> = ({
  children,
  requiredRole,
}) => {
  const { path, navigate } = useRouter();
  const { currentRole, setCurrentRole } = useMockData();

  if (!requiredRole) {
    return <>{children}</>;
  }

  const allowedRoles = Array.isArray(requiredRole) ? requiredRole : [requiredRole];
  // Admin has global audit/supervisory access
  const isAuthorized = allowedRoles.includes(currentRole) || currentRole === 'admin';

  if (!isAuthorized) {
    return (
      <div
        className="min-h-[calc(100vh-4.5rem)] flex items-center justify-center p-4 sm:p-6 transition-colors"
        style={{ backgroundColor: 'var(--color-bg)' }}
      >
        <div
          className="max-w-md w-full rounded-3xl p-8 border shadow-2xl space-y-6 text-center animate-in fade-in"
          style={{
            backgroundColor: 'var(--color-surface)',
            borderColor: 'var(--color-border)',
            color: 'var(--color-text)',
          }}
        >
          <div
            className="w-14 h-14 rounded-2xl mx-auto flex items-center justify-center text-rose-500 bg-rose-500/10 border border-rose-500/20"
          >
            <ShieldAlert className="w-7 h-7" />
          </div>

          <div className="space-y-2">
            <span className="text-[10px] font-mono font-bold uppercase tracking-wider px-2.5 py-1 rounded bg-rose-100 text-rose-800 dark:bg-rose-950 dark:text-rose-300">
              Security Barrier 403
            </span>
            <h2 className="text-xl font-black font-serif tracking-tight" style={{ color: 'var(--color-text)' }}>
              Restricted CodeRa Portal
            </h2>
            <p className="text-xs leading-relaxed" style={{ color: 'var(--color-text-muted)' }}>
              The path <code className="px-1.5 py-0.5 rounded bg-slate-100 dark:bg-slate-800 font-mono text-[11px]">{path}</code> requires an authenticated{' '}
              <strong className="text-blue-600 dark:text-blue-400 capitalize">{allowedRoles.join(' or ')}</strong> role session.
            </p>
          </div>

          {/* Quick Demo Role Switcher for Security Audit Team Review */}
          <div className="p-4 rounded-2xl border text-start space-y-2.5" style={{ backgroundColor: 'var(--color-bg)', borderColor: 'var(--color-border)' }}>
            <div className="flex items-center gap-2 text-xs font-bold" style={{ color: 'var(--color-text)' }}>
              <Lock className="w-3.5 h-3.5 text-blue-500" />
              <span>Audit Reviewer Override:</span>
            </div>
            <p className="text-[11px]" style={{ color: 'var(--color-text-muted)' }}>
              Select an authorized session to simulate authenticated role access:
            </p>
            <div className="flex flex-wrap gap-2 pt-1">
              {allowedRoles.map((role) => (
                <button
                  key={role}
                  type="button"
                  onClick={() => setCurrentRole(role)}
                  className="px-3 py-1.5 rounded-xl bg-blue-600 hover:bg-blue-500 text-white font-bold text-xs shadow-sm transition-transform active:scale-95 cursor-pointer capitalize"
                >
                  Assume {role} Role
                </button>
              ))}
            </div>
          </div>

          <div className="flex items-center gap-3 pt-2">
            <button
              type="button"
              onClick={() => navigate('/login')}
              className="flex-1 py-3 px-4 rounded-xl border font-bold text-xs transition-colors flex items-center justify-center gap-2 cursor-pointer"
              style={{ borderColor: 'var(--color-border)', color: 'var(--color-text)' }}
            >
              <LogIn className="w-4 h-4" />
              <span>Go to Login</span>
            </button>
            <button
              type="button"
              onClick={() => navigate('/')}
              className="py-3 px-4 rounded-xl text-white font-bold text-xs transition-all shadow-md hover:scale-105 active:scale-95 flex items-center justify-center gap-1.5 cursor-pointer"
              style={{ backgroundColor: 'var(--color-primary-green)' }}
            >
              <ArrowLeft className="w-4 h-4 rtl:rotate-180" />
              <span>Return Home</span>
            </button>
          </div>
        </div>
      </div>
    );
  }

  return <>{children}</>;
};
