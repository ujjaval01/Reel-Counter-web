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
    typeof val === 'string' && (/^https?:\/\//i.test(val.trim()) || val.trim().startsWith('/avatars/'));

  const avatarType = String(user.avatarType || '').toUpperCase().trim();
  const avatarUrl = String(user.avatarUrl || '').trim();
  const googlePhotoUrl = String(user.googlePhotoUrl || '').trim();
  const avatarEmoji = String(user.avatarEmoji || '').trim();
  const avatarId = String(user.avatarId || '').trim().toLowerCase();

  // 1. Explicit EMOJI avatar
  if (avatarType === 'EMOJI') {
    if (avatarEmoji) return { type: 'emoji', value: avatarEmoji };
    if (avatarUrl && !isHttpUrl(avatarUrl) && !avatarUrl.startsWith('ch_')) {
      return { type: 'emoji', value: avatarUrl };
    }
  }

  // 2. Explicit GOOGLE_PHOTO avatar
  if (avatarType === 'GOOGLE_PHOTO') {
    if (isHttpUrl(avatarUrl) && !avatarUrl.includes('/avatars/ch_')) {
      return { type: 'image', value: avatarUrl };
    }
    if (isHttpUrl(googlePhotoUrl)) {
      return { type: 'image', value: googlePhotoUrl };
    }
  }

  // 3. Explicit CHARACTER_DRAWABLE, REMOTE_AVATAR, or DEFAULT
  if (avatarType === 'CHARACTER_DRAWABLE' || avatarType === 'REMOTE_AVATAR' || avatarType === 'DEFAULT') {
    if (avatarUrl.includes('/avatars/ch_') || /^\/avatars\/ch_\d+\.png$/i.test(avatarUrl)) {
      return { type: 'image', value: avatarUrl };
    }
    const key = (avatarUrl.startsWith('ch_') ? avatarUrl : avatarId).toLowerCase();
    const match = key.match(/^ch_([1-9]|1[0-9]|2[0-4])$/);
    if (match) {
      return { type: 'image', value: `/avatars/ch_${match[1]}.png` };
    }
  }

  // 4. Any direct avatar URL that points to /avatars/
  if (avatarUrl.includes('/avatars/ch_')) {
    return { type: 'image', value: avatarUrl };
  }

  // 5. If avatarUrl or avatarId is ch_1 to ch_24 and not GOOGLE_PHOTO
  if (avatarType !== 'GOOGLE_PHOTO') {
    const rawChar = (avatarUrl.startsWith('ch_') ? avatarUrl : avatarId).toLowerCase();
    const match = rawChar.match(/^ch_([1-9]|1[0-9]|2[0-4])$/);
    if (match) {
      return { type: 'image', value: `/avatars/ch_${match[1]}.png` };
    }
  }

  // 6. Direct HTTP image (Google photo or custom image link)
  if (isHttpUrl(avatarUrl) && !avatarUrl.startsWith('ch_')) {
    return { type: 'image', value: avatarUrl };
  }
  if (isHttpUrl(googlePhotoUrl)) {
    return { type: 'image', value: googlePhotoUrl };
  }

  // 7. Explicit Emoji Fallback
  if (avatarEmoji) {
    return { type: 'emoji', value: avatarEmoji };
  }
  if (avatarUrl && !isHttpUrl(avatarUrl) && !avatarUrl.startsWith('ch_')) {
    return { type: 'emoji', value: avatarUrl };
  }

  // 8. Initials Fallback
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

  const charKey = (user?.avatarId || user?.avatarUrl || '').trim().toLowerCase();
  const fallbackEmoji = user?.avatarEmoji || CHARACTER_DRAWABLE_MAP[charKey] || null;
  const isEmoji = avatar.type === 'emoji' || Boolean(fallbackEmoji);
  const displayVal = fallbackEmoji || (avatar.type === 'emoji' ? avatar.value : (avatar.value || defaultInitials));

  return (
    <div className={`flex items-center justify-center select-none shrink-0 ${className}`}>
      <span className={`${textClassName} ${isEmoji ? 'text-lg leading-none' : ''}`}>
        {displayVal}
      </span>
    </div>
  );
}
