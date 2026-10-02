import React from 'react';
import { useMockData, UserRole } from '../../context/MockDataContext';
import { AVATAR_PRESETS } from './UserProfileModal';
import { User, Sparkles } from 'lucide-react';

interface ProfileAvatarButtonProps {
  showLabel?: boolean;
  size?: 'sm' | 'md' | 'lg';
  className?: string;
  roleOverride?: UserRole;
}

export const ProfileAvatarButton: React.FC<ProfileAvatarButtonProps> = ({
  showLabel = true,
  size = 'md',
  className = '',
  roleOverride,
}) => {
  const { openProfileModal, getActiveUserContext, profileCustomization } = useMockData();
  const activeUser = getActiveUserContext(roleOverride);

  // Avatar presets match
  const activePreset = AVATAR_PRESETS.find((p) => p.id === profileCustomization.avatarPreset);
  const accentColor = profileCustomization.accentColor || '#00A86B';

  const sizeClasses = {
    sm: 'w-7 h-7 text-xs',
    md: 'w-9 h-9 text-sm',
    lg: 'w-11 h-11 text-base',
  }[size];

  const initial = activeUser.name?.charAt(0)?.toUpperCase() || 'U';

  return (
    <button
      type="button"
      onClick={() => openProfileModal(roleOverride)}
      className={`group relative flex items-center gap-2 p-1 rounded-2xl border transition-all duration-200 hover:scale-102 hover:shadow-md cursor-pointer select-none ${className}`}
      style={{
        backgroundColor: 'var(--color-surface)',
        borderColor: 'var(--color-border)',
      }}
      title={`My Profile & Settings (${activeUser.name})`}
      aria-label={`Open Profile and Settings for ${activeUser.name}`}
    >
      {/* Avatar Circle Container */}
      <div
        className={`relative ${sizeClasses} rounded-xl overflow-hidden flex items-center justify-center font-black text-white shadow-xs shrink-0 transition-transform group-hover:scale-105`}
        style={{
          backgroundColor: accentColor,
        }}
      >
        {profileCustomization.avatarUrl ? (
          <img
            src={profileCustomization.avatarUrl}
            alt={activeUser.name}
            className="w-full h-full object-cover"
          />
        ) : activePreset ? (
          <div className="w-full h-full p-1">{activePreset.svg}</div>
        ) : (
          <span>{initial}</span>
        )}

        {/* Online Status Ring Pulse */}
        <span
          className="absolute -bottom-0.5 -end-0.5 w-2.5 h-2.5 rounded-full bg-emerald-500 ring-2 ring-white dark:ring-slate-900 animate-pulse"
          aria-hidden="true"
        />
      </div>

      {/* Optional Name & Role Badge */}
      {showLabel && (
        <div className="flex flex-col text-start pe-2 max-w-[130px] sm:max-w-[170px] overflow-hidden">
          <span
            className="text-xs font-black truncate leading-tight transition-colors group-hover:text-emerald-600 dark:group-hover:text-emerald-400"
            style={{ color: 'var(--color-text)' }}
          >
            {activeUser.name}
          </span>
          <span
            className="text-[10px] font-bold uppercase tracking-wider opacity-75 truncate"
            style={{ color: 'var(--color-text-muted)' }}
          >
            {activeUser.roleLabel}
          </span>
        </div>
      )}
    </button>
  );
};
