import React from 'react';
import { useRouter } from '../router/Router';
import { ArrowLeft } from 'lucide-react';

interface UniversalBackButtonProps {
  to?: string;
  onClick?: () => void;
  label?: string;
  className?: string;
}

export const UniversalBackButton: React.FC<UniversalBackButtonProps> = ({
  to,
  onClick,
  label = 'Back',
  className = '',
}) => {
  const { navigate } = useRouter();

  const handleClick = () => {
    if (onClick) {
      onClick();
    } else if (to) {
      navigate(to);
    } else {
      window.history.back();
    }
  };

  return (
    <button
      type="button"
      onClick={handleClick}
      className={`inline-flex items-center gap-2 py-2 px-3.5 rounded-xl border text-xs sm:text-sm font-bold shadow-sm transition-all hover:scale-102 hover:shadow active:scale-95 cursor-pointer ${className}`}
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
        color: 'var(--color-text)',
      }}
      aria-label={label}
    >
      <ArrowLeft className="w-4 h-4 rtl:rotate-180 text-blue-600 dark:text-blue-400 shrink-0" />
      <span>{label}</span>
    </button>
  );
};
