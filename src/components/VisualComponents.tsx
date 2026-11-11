import type { ReactNode } from 'react';

/*
 * Reusable Visual System Components for ReelCounter
 * Claymorphism / Pastel 3D Design System
 * Fonts: Fredoka (headings), Nunito (body)
 */

// ============================================
// CLAY BUTTON - Primary & Secondary Variants
// ============================================
interface ClayButtonProps {
  children: ReactNode;
  variant?: 'primary' | 'secondary' | 'outline';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  fullWidth?: boolean;
  onClick?: () => void;
  disabled?: boolean;
  className?: string;
  type?: 'button' | 'submit' | 'reset';
  as?: 'button' | 'a';
  href?: string;
}

export function ClayButton({
  children,
  variant = 'primary',
  size = 'md',
  fullWidth = false,
  onClick,
  disabled = false,
  className = '',
  type = 'button',
  as: Component = 'button',
  href,
}: ClayButtonProps) {
  const baseStyles = `
    inline-flex items-center justify-center gap-2
    font-heading font-extrabold
    rounded-full
    transition-all duration-150 ease-out
    focus:outline-none focus:ring-2 focus:ring-[#8B35F5] focus:ring-offset-2
    disabled:opacity-50 disabled:cursor-not-allowed disabled:hover:transform-none
    active:scale-[0.97]
  `;

  const sizeStyles = {
    sm: 'px-4 py-2 text-xs',
    md: 'px-6 py-3 text-sm',
    lg: 'px-8 py-4 text-base',
    xl: 'px-10 py-5 text-lg',
  };

  const variantStyles = {
    primary: `
      text-white
      bg-gradient-to-r from-[#8B35F5] via-[#B344F5] to-[#F04BAA]
      shadow-[0_10px_24px_-4px_rgba(139,53,245,0.45),0_4px_10px_rgba(240,75,170,0.25),inset_0_2px_3px_rgba(255,255,255,0.5),inset_0_-3px_4px_rgba(0,0,0,0.18)]
      hover:-translate-y-0.5
      hover:shadow-[0_14px_28px_-4px_rgba(139,53,245,0.5),0_6px_14px_rgba(240,75,170,0.3),inset_0_2px_3px_rgba(255,255,255,0.6),inset_0_-3px_4px_rgba(0,0,0,0.2)]
    `,
    secondary: `
      text-[#29164D]
      bg-white
      border border-[#E6D9FA]
      shadow-[0_8px_20px_rgba(100,65,160,0.08),inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(139,53,245,0.05)]
      hover:-translate-y-0.5
      hover:shadow-[0_12px_24px_rgba(100,65,160,0.12),inset_0_2px_4px_rgba(255,255,255,0.95)]
    `,
    outline: `
      text-[#8B35F5]
      bg-transparent
      border-2 border-[#8B35F5]
      hover:bg-[#8B35F5]/10
      hover:-translate-y-0.5
    `,
  };

  const widthStyles = fullWidth ? 'w-full' : '';

  const props = Component === 'a'
    ? { href, className: `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyles} ${className}` }
    : { type, onClick, disabled, className: `${baseStyles} ${sizeStyles[size]} ${variantStyles[variant]} ${widthStyles} ${className}` };

  return <Component {...props}>{children}</Component>;
}

// ============================================
// CLAY CARD - Soft 3D Elevated Surface
// ============================================
interface ClayCardProps {
  children: ReactNode;
  variant?: 'default' | 'elevated' | 'flat' | 'interactive';
  padding?: 'none' | 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  onClick?: () => void;
  hoverable?: boolean;
}

export function ClayCard({
  children,
  variant = 'default',
  padding = 'md',
  className = '',
  onClick,
  hoverable = false,
}: ClayCardProps) {
  const baseStyles = `
    rounded-[28px]
    transition-all duration-250 ease-out
  `;

  const variantStyles = {
    default: `
      bg-white
      border border-[#E6D9FA]
      shadow-[0_16px_36px_rgba(100,65,160,0.08),0_4px_12px_rgba(139,53,245,0.04),inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-3px_6px_rgba(139,53,245,0.04)]
    `,
    elevated: `
      bg-white
      border border-[#E6D9FA]
      shadow-[0_24px_48px_rgba(100,65,160,0.12),0_8px_16px_rgba(139,53,245,0.06),inset_0_3px_6px_rgba(255,255,255,0.95),inset_0_-4px_8px_rgba(139,53,245,0.05)]
    `,
    flat: `
      bg-white
      border border-[#E6D9FA]
      shadow-[inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-2px_4px_rgba(139,53,245,0.04)]
    `,
    interactive: `
      bg-white
      border border-[#E6D9FA]
      shadow-[0_16px_36px_rgba(100,65,160,0.08),0_4px_12px_rgba(139,53,245,0.04),inset_0_2px_4px_rgba(255,255,255,0.95),inset_0_-3px_6px_rgba(139,53,245,0.04)]
      hover:-translate-y-1
      hover:shadow-[0_22px_42px_rgba(100,65,160,0.14),0_6px_16px_rgba(139,53,245,0.08),inset_0_2px_4px_rgba(255,255,255,0.95)]
      cursor-pointer
    `,
  };

  const paddingStyles = {
    none: '',
    sm: 'p-4',
    md: 'p-6 sm:p-8',
    lg: 'p-8 sm:p-10',
    xl: 'p-10 sm:p-12',
  };

  const clickable = onClick || hoverable;
  const cursorStyle = clickable ? 'cursor-pointer' : '';

  return (
    <div
      className={`${baseStyles} ${variantStyles[variant]} ${paddingStyles[padding]} ${cursorStyle} ${className}`}
      onClick={onClick}
      role={onClick ? 'button' : undefined}
      tabIndex={onClick ? 0 : undefined}
      onKeyDown={onClick ? (e) => { if (e.key === 'Enter' || e.key === ' ') { e.preventDefault(); onClick(); }} : undefined}
    >
      {children}
    </div>
  );
}

// ============================================
// 3D ICON WRAPPER - Consistent 3D Icon Display
// ============================================
interface ThreeDIconProps {
  children: ReactNode;
  size?: 'xs' | 'sm' | 'md' | 'lg' | 'xl' | '2xl';
  background?: 'purple' | 'pink' | 'blue' | 'amber' | 'mint' | 'lavender' | 'gradient';
  className?: string;
  animate?: 'float' | 'pulse' | 'spin' | 'none';
}

export function ThreeDIcon({
  children,
  size = 'md',
  background = 'purple',
  className = '',
  animate = 'none',
}: ThreeDIconProps) {
  const sizeStyles = {
    xs: 'w-8 h-8',
    sm: 'w-10 h-10',
    md: 'w-12 h-12',
    lg: 'w-16 h-16',
    xl: 'w-20 h-20',
    '2xl': 'w-24 h-24',
  };

  const bgStyles = {
    purple: 'bg-purple-500/10',
    pink: 'bg-pink-500/10',
    blue: 'bg-blue-500/10',
    amber: 'bg-amber-500/10',
    mint: 'bg-emerald-500/10',
    lavender: 'bg-purple-200/50',
    gradient: 'bg-gradient-to-br from-purple-500/20 to-pink-500/20',
  };

  const animateStyles = {
    float: 'animate-float',
    pulse: 'animate-pulse-soft',
    spin: 'animate-spin',
    none: '',
  };

  return (
    <div
      className={`
        flex items-center justify-center
        rounded-2xl
        ${sizeStyles[size]}
        ${bgStyles[background]}
        ${animateStyles[animate]}
        ${className}
      `}
      aria-hidden="true"
    >
      {children}
    </div>
  );
}

// ============================================
// SOCIAL PLATFORM ICON - Official Brand Icons
// ============================================
interface SocialPlatformIconProps {
  platform: 'instagram' | 'youtube' | 'facebook' | 'tiktok' | 'snapchat' | 'twitter' | 'linkedin';
  size?: 'sm' | 'md' | 'lg' | 'xl';
  className?: string;
  outlined?: boolean;
}

export function SocialPlatformIcon({
  platform,
  size = 'md',
  className = '',
  outlined = false
}: SocialPlatformIconProps) {
  const sizeStyles = {
    sm: 'w-8 h-8',
    md: 'w-10 h-10',
    lg: 'w-12 h-12',
    xl: 'w-16 h-16',
  };

  const wrapperStyles = outlined
    ? 'p-2 rounded-2xl bg-white/90 border shadow-[0_8px_20px_rgba(100,65,160,0.15)] backdrop-blur-md'
    : '';

  const icons = {
    instagram: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={sizeStyles[size]}>
        <defs>
          <radialGradient id="igGrad" cx="30%" cy="100%" r="120%">
            <stop offset="0%" stopColor="#FFDC80" />
            <stop offset="25%" stopColor="#F77737" />
            <stop offset="50%" stopColor="#FD1D1D" />
            <stop offset="75%" stopColor="#C13584" />
            <stop offset="100%" stopColor="#833AB4" />
          </radialGradient>
        </defs>
        <rect width="80" height="80" rx="24" fill="url(#igGrad)" />
        <rect x="4" y="4" width="72" height="72" rx="20" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.4" />
        <rect x="18" y="18" width="44" height="44" rx="14" stroke="#FFFFFF" strokeWidth="5.5" />
        <circle cx="40" cy="40" r="11" stroke="#FFFFFF" strokeWidth="5.5" />
        <circle cx="51" cy="29" r="3.5" fill="#FFFFFF" />
        <ellipse cx="40" cy="14" rx="20" ry="4" fill="#FFFFFF" fillOpacity="0.5" />
      </svg>
    ),
    youtube: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={sizeStyles[size]}>
        <defs>
          <radialGradient id="ytGrad" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#FF6B6B" />
            <stop offset="60%" stopColor="#FF0000" />
            <stop offset="100%" stopColor="#B30000" />
          </radialGradient>
        </defs>
        <rect width="80" height="80" rx="24" fill="url(#ytGrad)" />
        <rect x="4" y="4" width="72" height="72" rx="20" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.4" />
        <polygon points="34,26 56,40 34,54" fill="#FFFFFF" />
        <ellipse cx="40" cy="14" rx="20" ry="4" fill="#FFFFFF" fillOpacity="0.5" />
      </svg>
    ),
    facebook: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={sizeStyles[size]}>
        <defs>
          <radialGradient id="fbGrad" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#4A90E2" />
            <stop offset="60%" stopColor="#1877F2" />
            <stop offset="100%" stopColor="#0B4CAD" />
          </radialGradient>
        </defs>
        <rect width="80" height="80" rx="24" fill="url(#fbGrad)" />
        <rect x="4" y="4" width="72" height="72" rx="20" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.4" />
        <path d="M47 43H41V64H32V43H27V35H32V30C32 24.5 35.5 20 42 20H48V28H43.5C41.8 28 41 28.8 41 30.5V35H48L47 43Z" fill="#FFFFFF" />
        <ellipse cx="40" cy="14" rx="20" ry="4" fill="#FFFFFF" fillOpacity="0.5" />
      </svg>
    ),
    tiktok: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={sizeStyles[size]}>
        <defs>
          <radialGradient id="ttGrad" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#00F2EA" />
            <stop offset="50%" stopColor="#FF0050" />
            <stop offset="100%" stopColor="#69C9D0" />
          </radialGradient>
        </defs>
        <rect width="80" height="80" rx="24" fill="url(#ttGrad)" />
        <rect x="4" y="4" width="72" height="72" rx="20" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.4" />
        <path d="M32 28v24M48 28v24M40 52H28" stroke="#FFFFFF" strokeWidth="5" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx="40" cy="14" rx="20" ry="4" fill="#FFFFFF" fillOpacity="0.5" />
      </svg>
    ),
    snapchat: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={sizeStyles[size]}>
        <defs>
          <radialGradient id="scGrad" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#FFFC00" />
            <stop offset="60%" stopColor="#FFD400" />
            <stop offset="100%" stopColor="#D4B400" />
          </radialGradient>
        </defs>
        <rect width="80" height="80" rx="24" fill="url(#scGrad)" />
        <rect x="4" y="4" width="72" height="72" rx="20" stroke="#000000" strokeWidth="2" strokeOpacity="0.3" />
        <path d="M24 40C24 27.2 34.2 17 47 17C59.8 17 70 27.2 70 40C70 52.8 59.8 63 47 63C34.2 63 24 52.8 24 40Z" fill="none" stroke="#000000" strokeWidth="4.5" />
        <path d="M24 40C24 27.2 34.2 17 47 17" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" />
        <ellipse cx="40" cy="14" rx="20" ry="4" fill="#FFFFFF" fillOpacity="0.5" />
      </svg>
    ),
    twitter: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={sizeStyles[size]}>
        <defs>
          <radialGradient id="twGrad" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#4FC3F7" />
            <stop offset="60%" stopColor="#1DA1F2" />
            <stop offset="100%" stopColor="#0D8BD9" />
          </radialGradient>
        </defs>
        <rect width="80" height="80" rx="24" fill="url(#twGrad)" />
        <rect x="4" y="4" width="72" height="72" rx="20" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.4" />
        <path d="M56 24C53.5 25.5 50.5 26.5 47.5 27C50 26 52 24.5 53.5 22.5C51 24 48 25 45 25.5C42.5 23.5 39 22 35.5 22C27.5 22 21 28.5 21 36.5C21 38.5 21.1 40.5 21.3 42.4C16.5 41.5 12.5 37.5 11 32C10 34 9.5 36.5 9.5 39C9.5 46 13.5 52 19 54.5C16.5 53.5 14.5 51.5 13.5 49C13.5 49 13.5 49.5 13.5 50C19.5 56 27 59.5 35 59.5C30.5 62 25.5 63.5 20 63.5C22.5 63.5 25 63 27.5 62.5C32 61 36 58.5 39 55C40 56.5 40.5 58 40.5 59.5C40.5 63 36.5 65 32.5 65.5C38.5 66.5 44.5 66 50.5 64C53 65.5 55.5 66.5 58 66.5C63.5 66.5 68.5 63.5 72.5 58.5C70.5 60 68.5 61 67 62C68.5 60.5 69.5 58.5 70.5 56C67.5 57 64.5 57.5 61.5 57.5V57.5Z" fill="#FFFFFF" />
        <ellipse cx="40" cy="14" rx="20" ry="4" fill="#FFFFFF" fillOpacity="0.5" />
      </svg>
    ),
    linkedin: (
      <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={sizeStyles[size]}>
        <defs>
          <radialGradient id="inGrad" cx="35%" cy="30%" r="75%">
            <stop offset="0%" stopColor="#3AB0E2" />
            <stop offset="60%" stopColor="#0A66C2" />
            <stop offset="100%" stopColor="#004182" />
          </radialGradient>
        </defs>
        <rect width="80" height="80" rx="24" fill="url(#inGrad)" />
        <rect x="4" y="4" width="72" height="72" rx="20" stroke="#FFFFFF" strokeWidth="2" strokeOpacity="0.4" />
        <path d="M24 38v22M30 38v22M30 38h-6M30 44h6M44 38v22M50 38v22M50 38h-6M50 44h6M38 44v-6h6v6" stroke="#FFFFFF" strokeWidth="4" strokeLinecap="round" strokeLinejoin="round" />
        <ellipse cx="40" cy="14" rx="20" ry="4" fill="#FFFFFF" fillOpacity="0.5" />
      </svg>
    ),
  };

  return (
    <div className={`${wrapperStyles} ${className}`} aria-hidden="true">
      {icons[platform]}
    </div>
  );
}

// ============================================
// MASCOT ILLUSTRATION - Consistent Character
// ============================================
interface MascotIllustrationProps {
  pose?: 'default' | 'holding-phone' | 'celebrating' | 'thinking' | 'sleeping' | 'waving';
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
  showBeanbag?: boolean;
  showShadow?: boolean;
}

export function MascotIllustration({
  pose = 'default',
  size = 'md',
  className = '',
  showBeanbag = true,
  showShadow = true,
}: MascotIllustrationProps) {
  const sizeStyles = {
    sm: 'w-40 h-40',
    md: 'w-64 h-64',
    lg: 'w-80 h-80',
    xl: 'w-96 h-96',
    full: 'w-full h-auto max-w-[380px]',
  };

  // Simplified mascot that can be swapped for the full HeroCharacter3D
  // For now, we'll use the existing HeroCharacter3D as the full mascot
  return (
    <div className={`${sizeStyles[size]} ${className}`} aria-hidden="true">
      <MascotSVG pose={pose} showBeanbag={showBeanbag} showShadow={showShadow} />
    </div>
  );
}

// Internal Mascot SVG Component
function MascotSVG({
  pose = 'default',
  showBeanbag = true,
  showShadow = true
}: {
  pose: 'default' | 'holding-phone' | 'celebrating' | 'thinking' | 'sleeping' | 'waving';
  showBeanbag: boolean;
  showShadow: boolean;
}) {
  // Use the full HeroCharacter3D for full size, simplified versions for smaller
  return (
    <svg viewBox="0 0 380 380" fill="none" xmlns="http://www.w3.org/2000/svg" className="w-full h-full">
      <defs>
        {/* Beanbag Gradients */}
        <radialGradient id="beanbagGrad" cx="45%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#E9D5FF" />
          <stop offset="50%" stopColor="#C084FC" />
          <stop offset="90%" stopColor="#8B35F5" />
          <stop offset="100%" stopColor="#581C87" />
        </radialGradient>

        {/* Hoodie / Clothes Gradient */}
        <radialGradient id="hoodieGrad" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#A855F7" />
          <stop offset="60%" stopColor="#7E22CE" />
          <stop offset="100%" stopColor="#4C1D95" />
        </radialGradient>

        {/* Headphones Gradient */}
        <radialGradient id="headphoneGrad" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#F472B6" />
          <stop offset="70%" stopColor="#DB2777" />
          <stop offset="100%" stopColor="#831843" />
        </radialGradient>

        {/* Skin Gradient */}
        <radialGradient id="skinGrad" cx="45%" cy="35%" r="65%">
          <stop offset="0%" stopColor="#FED7AA" />
          <stop offset="75%" stopColor="#FDBA74" />
          <stop offset="100%" stopColor="#FB923C" />
        </radialGradient>

        {/* Ambient Ground Shadow */}
        <radialGradient id="groundShadow" cx="50%" cy="50%" r="50%">
          <stop offset="0%" stopColor="#29164D" stopOpacity="0.25" />
          <stop offset="100%" stopColor="#29164D" stopOpacity="0" />
        </radialGradient>
      </defs>

      {/* Ground Shadow */}
      {showShadow && (
        <ellipse cx="190" cy="340" rx="140" ry="24" fill="url(#groundShadow)" />
      )}

      {/* Soft Squishy Clay Beanbag */}
      {showBeanbag && (
        <>
          <path
            d="M90 280C75 220 110 160 170 155C240 150 300 190 305 260C310 320 250 345 190 345C130 345 100 320 90 280Z"
            fill="url(#beanbagGrad)"
          />
          {/* Beanbag Highlight */}
          <ellipse cx="180" cy="180" rx="65" ry="22" fill="#FFFFFF" fillOpacity="0.4" />
          <path d="M120 280C130 300 170 320 230 310" stroke="#581C87" strokeWidth="4" strokeLinecap="round" strokeOpacity="0.4" />
        </>
      )}

      {/* Character Torso & Hoodie */}
      <ellipse cx="190" cy="225" rx="42" ry="48" fill="url(#hoodieGrad)" />
      {/* Hoodie Pocket */}
      <path d="M165 240C175 255 205 255 215 240H165Z" fill="#6B21A8" />
      {/* Drawstrings */}
      <path d="M182 205V225" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />
      <path d="M198 205V228" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" />

      {/* Crossed / Folded Legs */}
      <ellipse cx="145" cy="265" rx="32" ry="22" fill="#6B21A8" />
      <ellipse cx="235" cy="265" rx="32" ry="22" fill="#6B21A8" />
      {/* Shoes (Soft White Clay Sneakers with Pink Trim) */}
      <ellipse cx="130" cy="275" rx="18" ry="10" fill="#FFFFFF" />
      <ellipse cx="130" cy="275" rx="16" ry="7" fill="#F472B6" />
      <ellipse cx="250" cy="275" rx="18" ry="10" fill="#FFFFFF" />
      <ellipse cx="250" cy="275" rx="16" ry="7" fill="#F472B6" />

      {/* Arms & Hands Holding Phone */}
      {/* Left Arm */}
      <path d="M152 210C140 225 155 245 175 240" stroke="#7E22CE" strokeWidth="16" strokeLinecap="round" />
      {/* Right Arm */}
      <path d="M228 210C240 225 225 245 205 240" stroke="#7E22CE" strokeWidth="16" strokeLinecap="round" />
      {/* Hands */}
      <circle cx="178" cy="238" r="8" fill="url(#skinGrad)" />
      <circle cx="202" cy="238" r="8" fill="url(#skinGrad)" />

      {/* Mini Smartphone in Hands */}
      {pose === 'holding-phone' && (
        <g>
          <rect x="180" y="215" width="20" height="34" rx="4" fill="#0A0D18" transform="rotate(-5 190 232)" />
          <rect x="182" y="217" width="16" height="28" rx="2" fill="#D8B4FE" transform="rotate(-5 190 232)" />
          <ellipse cx="190" cy="226" rx="6" ry="4" fill="#FFFFFF" fillOpacity="0.8" transform="rotate(-5 190 232)" />
        </g>
      )}

      {/* Head / Face */}
      <circle cx="190" cy="150" r="32" fill="url(#skinGrad)" />
      {/* Cute Blush Cheeks */}
      <ellipse cx="174" cy="158" rx="6" ry="3.5" fill="#FB7185" fillOpacity="0.6" />
      <ellipse cx="206" cy="158" rx="6" ry="3.5" fill="#FB7185" fillOpacity="0.6" />

      {/* Eyes based on pose */}
      {pose === 'sleeping' ? (
        <>
          {/* Closed sleeping eyes */}
          <path d="M172 148C174 144 179 144 181 148" stroke="#431407" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M199 148C201 144 206 144 208 148" stroke="#431407" strokeWidth="2.5" strokeLinecap="round" />
          {/* Zzz */}
          <text x="240" y="100" fontSize="24" fill="#8B35F5" fontWeight="bold">💤</text>
        </>
      ) : pose === 'celebrating' ? (
        <>
          {/* Happy open eyes */}
          <circle cx="176" cy="148" r="5" fill="#431407" />
          <circle cx="204" cy="148" r="5" fill="#431407" />
          <circle cx="175" cy="147" r="2" fill="#FFFFFF" />
          <circle cx="203" cy="147" r="2" fill="#FFFFFF" />
          {/* Big smile */}
          <path d="M178 162C182 168 198 168 202 162" stroke="#431407" strokeWidth="3.5" strokeLinecap="round" fill="none" />
          {/* Tongue */}
          <ellipse cx="190" cy="165" rx="4" ry="3" fill="#FB7185" />
        </>
      ) : pose === 'thinking' ? (
        <>
          {/* Thinking eyes - one up, one normal */}
          <path d="M170 144C173 140 180 140 183 144" stroke="#431407" strokeWidth="2.5" strokeLinecap="round" />
          <circle cx="204" cy="148" r="5" fill="#431407" />
          <circle cx="203" cy="147" r="2" fill="#FFFFFF" />
          {/* Small mouth */}
          <path d="M186 160C188 162 192 162 194 160" stroke="#431407" strokeWidth="2.5" strokeLinecap="round" />
          {/* Thought bubble */}
          <ellipse cx="250" cy="90" rx="20" ry="15" fill="#FFFFFF" fillOpacity="0.9" stroke="#DCC8FF" strokeWidth="2" />
          <circle cx="265" cy="90" r="4" fill="#8B35F5" />
          <circle cx="245" cy="90" r="3" fill="#8B35F5" />
          <circle cx="255" cy="100" r="2.5" fill="#8B35F5" />
        </>
      ) : pose === 'waving' ? (
        <>
          {/* Happy waving eyes */}
          <circle cx="176" cy="148" r="5" fill="#431407" />
          <circle cx="204" cy="148" r="5" fill="#431407" />
          <circle cx="175" cy="147" r="2" fill="#FFFFFF" />
          <circle cx="203" cy="147" r="2" fill="#FFFFFF" />
          {/* Wave smile */}
          <path d="M182 160C186 165 194 165 198 160" stroke="#431407" strokeWidth="3" strokeLinecap="round" fill="none" />
        </>
      ) : (
        <>
          {/* Default - Happy Closed Smiling Eyes */}
          <path d="M172 148C174 144 179 144 181 148" stroke="#431407" strokeWidth="2.5" strokeLinecap="round" />
          <path d="M199 148C201 144 206 144 208 148" stroke="#431407" strokeWidth="2.5" strokeLinecap="round" />
          {/* Sweet Smile */}
          <path d="M186 160C188 163 192 163 194 160" stroke="#431407" strokeWidth="2.5" strokeLinecap="round" />
        </>
      )}

      {/* Hair (Fluffy Soft Clay Dark Purple Curls) */}
      <path d="M165 145C158 130 170 115 190 115C212 115 225 128 220 145C215 125 185 122 165 145Z" fill="#3B0764" />
      <circle cx="168" cy="132" r="10" fill="#3B0764" />
      <circle cx="188" cy="122" r="11" fill="#3B0764" />
      <circle cx="210" cy="130" r="10" fill="#3B0764" />

      {/* Over-Ear Headphones */}
      {/* Headband */}
      <path d="M154 150C152 118 228 118 226 150" stroke="url(#headphoneGrad)" strokeWidth="7" strokeLinecap="round" fill="none" />
      {/* Ear Cups */}
      <rect x="148" y="140" width="10" height="22" rx="5" fill="url(#headphoneGrad)" />
      <ellipse cx="153" cy="151" rx="3" ry="8" fill="#FBCFE8" />
      <rect x="222" y="140" width="10" height="22" rx="5" fill="url(#headphoneGrad)" />
      <ellipse cx="227" cy="151" rx="3" ry="8" fill="#FBCFE8" />

      {/* Floating Sparkles & Music Note */}
      <g className="animate-float">
        <path d="M236 100L238 104L242 105L238 106L236 110L234 106L230 105L234 104L236 100Z" fill="#FFE169" />
        <path d="M142 90L144 94L148 95L144 96L142 100L140 96L136 95L140 94L142 90Z" fill="#FF77C6" />
        <circle cx="250" cy="120" r="3" fill="#A855F7" />
      </g>
    </svg>
  );
}

// ============================================
// FLOATING BADGE - Pill-shaped Status Indicators
// ============================================
interface FloatingBadgeProps {
  children: ReactNode;
  variant?: 'default' | 'success' | 'warning' | 'info' | 'danger' | 'purple' | 'pink';
  size?: 'sm' | 'md' | 'lg';
  icon?: ReactNode;
  className?: string;
  animate?: boolean;
}

export function FloatingBadge({
  children,
  variant = 'default',
  size = 'md',
  icon,
  className = '',
  animate = false,
}: FloatingBadgeProps) {
  const sizeStyles = {
    sm: 'px-2.5 py-1 text-[10px]',
    md: 'px-3.5 py-1.5 text-xs',
    lg: 'px-4 py-2 text-sm',
  };

  const variantStyles = {
    default: 'bg-white/85 border border-[#E6D9FA] text-[#29164D] shadow-[0_4px_14px_rgba(100,65,160,0.06),inset_0_1.5px_2px_rgba(255,255,255,0.9)]',
    success: 'bg-emerald-500/15 border border-emerald-200/50 text-emerald-700 shadow-[0_4px_14px_rgba(16,185,129,0.15),inset_0_1.5px_2px_rgba(255,255,255,0.5)]',
    warning: 'bg-amber-500/15 border border-amber-200/50 text-amber-700 shadow-[0_4px_14px_rgba(245,158,11,0.15),inset_0_1.5px_2px_rgba(255,255,255,0.5)]',
    info: 'bg-blue-500/15 border border-blue-200/50 text-blue-700 shadow-[0_4px_14px_rgba(59,130,246,0.15),inset_0_1.5px_2px_rgba(255,255,255,0.5)]',
    danger: 'bg-rose-500/15 border border-rose-200/50 text-rose-700 shadow-[0_4px_14px_rgba(244,63,94,0.15),inset_0_1.5px_2px_rgba(255,255,255,0.5)]',
    purple: 'bg-purple-500/15 border border-purple-200/50 text-purple-700 shadow-[0_4px_14px_rgba(139,53,245,0.15),inset_0_1.5px_2px_rgba(255,255,255,0.5)]',
    pink: 'bg-pink-500/15 border border-pink-200/50 text-pink-700 shadow-[0_4px_14px_rgba(240,75,170,0.15),inset_0_1.5px_2px_rgba(255,255,255,0.5)]',
  };

  return (
    <div
      className={`
        inline-flex items-center gap-1.5
        font-heading font-black uppercase tracking-wider
        rounded-full border
        ${sizeStyles[size]}
        ${variantStyles[variant]}
        ${animate ? 'animate-float' : ''}
        ${className}
      `}
    >
      {icon}
      {children}
    </div>
  );
}

// ============================================
// FEATURE CARD - Consistent Feature Display
// ============================================
interface FeatureCardProps {
  icon: ReactNode;
  title: string;
  description: string;
  iconBackground?: 'purple' | 'pink' | 'blue' | 'amber' | 'mint' | 'lavender' | 'gradient';
  iconSize?: 'sm' | 'md' | 'lg';
  tag?: string;
  tagColor?: 'purple' | 'pink' | 'blue' | 'amber' | 'mint' | 'emerald';
  hoverable?: boolean;
  className?: string;
  onClick?: () => void;
}

export function FeatureCard({
  icon,
  title,
  description,
  iconBackground = 'purple',
  iconSize = 'md',
  tag,
  tagColor = 'purple',
  hoverable = true,
  className = '',
  onClick,
}: FeatureCardProps) {
  const tagStyles = {
    purple: 'bg-purple-500/10 text-purple-600',
    pink: 'bg-pink-500/10 text-pink-600',
    blue: 'bg-blue-500/10 text-blue-600',
    amber: 'bg-amber-500/10 text-amber-600',
    mint: 'bg-emerald-500/10 text-emerald-600',
    emerald: 'bg-emerald-500/10 text-emerald-600',
    lavender: 'bg-purple-200/50 text-purple-700',
  };

  return (
    <ClayCard
      variant={hoverable ? 'interactive' : 'default'}
      padding="lg"
      className={className}
      onClick={onClick}
    >
      <div className="w-16 h-16 rounded-2xl flex items-center justify-center mb-6">
        <ThreeDIcon size={iconSize} background={iconBackground}>
          {icon}
        </ThreeDIcon>
      </div>
      {tag && (
        <div className={`inline-block px-3 py-1 rounded-full font-black text-[10px] uppercase tracking-wider mb-3 ${tagStyles[tagColor]}`}>
          {tag}
        </div>
      )}
      <h3 className="font-heading font-black text-xl mb-3">{title}</h3>
      <p className="font-sans text-sm leading-relaxed font-medium text-[#75678E]">
        {description}
      </p>
    </ClayCard>
  );
}

// ============================================
// GRADIENT HEADING - Consistent Gradient Text
// ============================================
interface GradientHeadingProps {
  children: ReactNode;
  level?: 'h1' | 'h2' | 'h3' | 'h4' | 'h5' | 'h6';
  gradient?: 'primary' | 'purple-pink' | 'pink-amber' | 'purple-blue' | 'mint-amber' | 'full';
  size?: 'sm' | 'md' | 'lg' | 'xl' | '2xl' | '3xl' | '4xl' | '5xl' | '6xl' | '7xl';
  className?: string;
  textAlign?: 'left' | 'center' | 'right';
}

export function GradientHeading({
  children,
  level = 'h2',
  gradient = 'primary',
  size = '3xl',
  className = '',
  textAlign = 'left',
}: GradientHeadingProps) {
  const sizeStyles = {
    sm: 'text-lg',
    md: 'text-xl',
    lg: 'text-2xl',
    xl: 'text-3xl',
    '2xl': 'text-4xl',
    '3xl': 'text-5xl',
    '4xl': 'text-6xl',
    '5xl': 'text-7xl',
    '6xl': 'text-8xl',
    '7xl': 'text-9xl',
  };

  const gradientStyles = {
    primary: 'bg-gradient-to-r from-[#8B35F5] via-[#B344F5] to-[#F04BAA] bg-clip-text text-transparent',
    'purple-pink': 'bg-gradient-to-r from-[#8B35F5] to-[#F04BAA] bg-clip-text text-transparent',
    'pink-amber': 'bg-gradient-to-r from-[#F04BAA] to-[#FFB800] bg-clip-text text-transparent',
    'purple-blue': 'bg-gradient-to-r from-[#8B35F5] to-[#3B82F6] bg-clip-text text-transparent',
    'mint-amber': 'bg-gradient-to-r from-[#10B981] to-[#FFB800] bg-clip-text text-transparent',
    full: 'bg-gradient-to-r from-[#8B35F5] via-[#B344F5] to-[#F04BAA] bg-clip-text text-transparent',
  };

  const alignStyles = {
    left: 'text-left',
    center: 'text-center',
    right: 'text-right',
  };

  const Tag = level;

  return (
    <Tag
      className={`
        font-heading font-black tracking-tight leading-[1.08]
        ${sizeStyles[size]}
        ${gradientStyles[gradient]}
        ${alignStyles[textAlign]}
        ${className}
      `}
    >
      {children}
    </Tag>
  );
}

// ============================================
// PAGE SECTION WRAPPER - Consistent Section Layout
// ============================================
interface PageSectionProps {
  id?: string;
  children: ReactNode;
  className?: string;
  variant?: 'default' | 'alt' | 'dark' | 'gradient';
  padding?: 'sm' | 'md' | 'lg' | 'xl';
}

export function PageSection({
  id,
  children,
  className = '',
  variant = 'default',
  padding = 'lg',
}: PageSectionProps) {
  const variantStyles = {
    default: 'bg-[#FFF4FA]/50 border-t border-[#E6D9FA]',
    alt: 'bg-[#F6EEFF] border-t border-[#E6D9FA]',
    dark: 'bg-[#FFF8EF] border-t border-[#F0E5DA]',
    gradient: 'bg-gradient-to-b from-purple-500/10 via-pink-500/10 to-transparent border-t border-[#E6D9FA]',
  };

  const paddingStyles = {
    sm: 'py-12',
    md: 'py-16',
    lg: 'py-24',
    xl: 'py-32',
  };

  return (
    <section
      id={id}
      className={`${variantStyles[variant]} ${paddingStyles[padding]} transition-colors duration-300 ${className}`}
    >
      <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
        {children}
      </div>
    </section>
  );
}

// ============================================
// CONTAINER - Consistent Max Width Wrapper
// ============================================
interface ContainerProps {
  children: ReactNode;
  size?: 'sm' | 'md' | 'lg' | 'xl' | 'full';
  className?: string;
}

export function Container({
  children,
  size = 'lg',
  className = '',
}: ContainerProps) {
  const sizeStyles = {
    sm: 'max-w-3xl',
    md: 'max-w-5xl',
    lg: 'max-w-7xl',
    xl: 'max-w-[90rem]',
    full: 'max-w-full',
  };

  return (
    <div className={`mx-auto px-4 sm:px-6 lg:px-8 ${sizeStyles[size]} ${className}`}>
      {children}
    </div>
  );
}

export default {
  ClayButton,
  ClayCard,
  ThreeDIcon,
  SocialPlatformIcon,
  MascotIllustration,
  FloatingBadge,
  FeatureCard,
  GradientHeading,
  PageSection,
  Container,
};