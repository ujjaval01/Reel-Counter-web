import { useState } from 'react';

export const CHARACTER_DRAWABLE_MAP: Record<string, string> = {
  ch_1: '👧',
  ch_2: '👩',
  ch_3: '🧔',
  ch_4: '👦',
  ch_5: '🧑‍🦱',
  ch_6: '🧒',
  ch_7: '🧑‍🦰',
  ch_8: '🥷',
};

export interface AvatarUser {
  avatarUrl?: string | null;
  googlePhotoUrl?: string | null;
  avatarEmoji?: string | null;
  avatarType?: string | null;
  avatarId?: string | null;
  displayName?: string | null;
  username?: string | null;
}

export function resolveUserAvatar(user?: AvatarUser | null): {
  type: 'image' | 'emoji' | 'initials';
  value: string;
} {
  if (!user) {
    return { type: 'initials', value: 'RC' };
  }

  const isHttpUrl = (val: any): boolean =>
    typeof val === 'string' && /^https?:\/\//i.test(val.trim());

  // 1. Google photo URL
  if (user.avatarType === 'GOOGLE_PHOTO') {
    if (isHttpUrl(user.avatarUrl)) return { type: 'image', value: user.avatarUrl!.trim() };
    if (isHttpUrl(user.googlePhotoUrl)) return { type: 'image', value: user.googlePhotoUrl!.trim() };
  }

  // 2. Any direct valid HTTP URL in avatarUrl
  if (isHttpUrl(user.avatarUrl)) {
    return { type: 'image', value: user.avatarUrl!.trim() };
  }

  // 3. User configured explicit emoji
  if (user.avatarEmoji && typeof user.avatarEmoji === 'string' && user.avatarEmoji.trim()) {
    return { type: 'emoji', value: user.avatarEmoji.trim() };
  }

  // 4. avatarUrl itself is an emoji (e.g. "🐼", "🔥")
  if (user.avatarUrl && typeof user.avatarUrl === 'string' && !isHttpUrl(user.avatarUrl) && !user.avatarUrl.startsWith('ch_')) {
    return { type: 'emoji', value: user.avatarUrl.trim() };
  }

  // 5. In-app character drawable (ch_1 ... ch_8)
  const charKey = (user.avatarId || user.avatarUrl || '').trim().toLowerCase();
  if (CHARACTER_DRAWABLE_MAP[charKey]) {
    return { type: 'emoji', value: CHARACTER_DRAWABLE_MAP[charKey] };
  }

  // 6. Fallback to Google photo if available
  if (isHttpUrl(user.googlePhotoUrl)) {
    return { type: 'image', value: user.googlePhotoUrl!.trim() };
  }

  // 7. Fallback to Initials
  const name = (user.displayName || user.username || 'RC').trim();
  const initials = name
    .split(/\s+/)
    .filter(Boolean)
    .slice(0, 2)
    .map((w) => w[0].toUpperCase())
    .join('') || 'RC';

  return { type: 'initials', value: initials };
}

interface UserAvatarProps {
  user?: AvatarUser | null;
  className?: string;
  textClassName?: string;
  defaultInitials?: string;
}

export function UserAvatar({
  user,
  className = 'w-10 h-10 rounded-full',
  textClassName = 'text-xs font-bold',
  defaultInitials = 'RC',
}: UserAvatarProps) {
  const [imgFailed, setImgFailed] = useState(false);
  const avatar = resolveUserAvatar(user);

  if (avatar.type === 'image' && !imgFailed) {
    return (
      <div className={`overflow-hidden flex items-center justify-center shrink-0 ${className}`}>
        <img
          src={avatar.value}
          alt={user?.displayName || 'Avatar'}
          className="w-full h-full object-cover"
          onError={() => setImgFailed(true)}
          loading="lazy"
        />
      </div>
    );
  }

  const isEmoji = avatar.type === 'emoji';
  const displayVal = isEmoji ? avatar.value : (avatar.value || defaultInitials);

  return (
    <div className={`flex items-center justify-center select-none shrink-0 ${className}`}>
      <span className={`${textClassName} ${isEmoji ? 'text-lg leading-none' : ''}`}>
        {displayVal}
      </span>
    </div>
  );
}
