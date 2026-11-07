import type { SVGProps } from 'react';

// Reusable Minimal 3D Trophy (Warm Gold & Coral Accent)
export function ClayTrophy3D({ className = 'w-12 h-12', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <radialGradient id="trophyGold" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFF1B8" />
          <stop offset="45%" stopColor="#FFB36B" />
          <stop offset="90%" stopColor="#FA8C3D" />
          <stop offset="100%" stopColor="#D9631E" />
        </radialGradient>
        <radialGradient id="trophyBase" cx="40%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#25334A" />
          <stop offset="100%" stopColor="#192334" />
        </radialGradient>
      </defs>
      
      {/* Base Podium */}
      <rect x="26" y="74" width="44" height="14" rx="7" fill="url(#trophyBase)" />
      <rect x="32" y="70" width="32" height="6" rx="3" fill="#FF765E" />

      {/* Stem */}
      <path d="M42 56H54V70C54 71.1 53.1 72 52 72H44C42.9 72 42 71.1 42 70V56Z" fill="#D9631E" />
      <rect x="44" y="58" width="8" height="12" rx="4" fill="#FFB36B" />

      {/* Handles */}
      <path d="M22 28C14 28 14 44 26 46M74 28C82 28 82 44 70 46" stroke="url(#trophyGold)" strokeWidth="5.5" strokeLinecap="round" />

      {/* Main Cup */}
      <path d="M24 22C24 38 34 56 48 56C62 56 72 38 72 22H24Z" fill="url(#trophyGold)" />
      
      {/* Cup Rim */}
      <ellipse cx="48" cy="22" rx="24" ry="7" fill="#FFE2D5" />
      <ellipse cx="48" cy="22" rx="21" ry="5.5" fill="#FA8C3D" />
      
      {/* Highlights */}
      <ellipse cx="48" cy="20" rx="16" ry="2.5" fill="#FFFFFF" fillOpacity="0.75" />
      <path d="M30 28C30 38 36 48 44 51" stroke="#FFFFFF" strokeWidth="2.5" strokeLinecap="round" strokeOpacity="0.6" />

      {/* Sparkle Star */}
      <path d="M48 30L50 36L56 38L50 40L48 46L46 40L40 38L46 36L48 30Z" fill="#FFFFFF" />
    </svg>
  );
}

// Minimal 3D Compass / Smart Tracker (Teal & Coral Accent)
export function ClayCompass3D({ className = 'w-12 h-12', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <radialGradient id="compassBg" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#5CD6BF" />
          <stop offset="60%" stopColor="#45BFA8" />
          <stop offset="100%" stopColor="#2D8A78" />
        </radialGradient>
        <radialGradient id="compassInner" cx="40%" cy="35%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="100%" stopColor="#E4F5EE" />
        </radialGradient>
      </defs>
      {/* Outer Shell */}
      <circle cx="48" cy="48" r="40" fill="url(#compassBg)" />
      {/* Inner Rim */}
      <circle cx="48" cy="48" r="33" fill="url(#compassInner)" />
      <circle cx="48" cy="48" r="31" stroke="#45BFA8" strokeWidth="1.5" strokeDasharray="3 3" strokeOpacity="0.5" />
      
      {/* Needle (Coral & Navy) */}
      <polygon points="48,22 54,48 48,44" fill="#FF765E" />
      <polygon points="48,22 42,48 48,44" fill="#FF9A85" />
      <polygon points="48,74 54,48 48,52" fill="#25334A" />
      <polygon points="48,74 42,48 48,52" fill="#3D4D66" />

      {/* Center Pivot Pin */}
      <circle cx="48" cy="48" r="4.5" fill="#FFB36B" />
      <circle cx="47" cy="47" r="1.5" fill="#FFFFFF" />
    </svg>
  );
}

// Minimal 3D Bullseye / Target Icon (Coral & Soft Cream)
export function ClayTarget3D({ className = 'w-12 h-12', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <radialGradient id="coralOuter" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FF9A85" />
          <stop offset="60%" stopColor="#FF765E" />
          <stop offset="100%" stopColor="#D94B35" />
        </radialGradient>
        <radialGradient id="targetYellow" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFE4A3" />
          <stop offset="70%" stopColor="#FFB36B" />
          <stop offset="100%" stopColor="#D9631E" />
        </radialGradient>
      </defs>
      {/* Outer Ring */}
      <circle cx="48" cy="48" r="40" fill="url(#coralOuter)" />
      {/* White Ring */}
      <circle cx="48" cy="48" r="30" fill="#FFFFFF" />
      <circle cx="48" cy="48" r="28" fill="#FFF8EF" />
      {/* Second Ring */}
      <circle cx="48" cy="48" r="20" fill="url(#coralOuter)" />
      {/* Center Bullseye */}
      <circle cx="48" cy="48" r="11" fill="url(#targetYellow)" />
      <circle cx="46" cy="45" r="3" fill="#FFFFFF" fillOpacity="0.8" />
      
      {/* Dart / Arrow in Bullseye */}
      <path d="M48 48L68 28" stroke="#25334A" strokeWidth="3.5" strokeLinecap="round" />
      <polygon points="68,28 76,26 74,34" fill="#45BFA8" />
      <polygon points="68,28 66,20 74,22" fill="#FF765E" />
    </svg>
  );
}

// Minimal 3D Alert Bell Icon (Warm Orange / Coral)
export function ClayBell3D({ className = 'w-12 h-12', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <radialGradient id="bellCoral" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFB36B" />
          <stop offset="60%" stopColor="#FF765E" />
          <stop offset="100%" stopColor="#D94B35" />
        </radialGradient>
        <radialGradient id="clapperTeal" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#5CD6BF" />
          <stop offset="100%" stopColor="#2D8A78" />
        </radialGradient>
      </defs>
      
      {/* Crown */}
      <rect x="43" y="16" width="10" height="12" rx="5" fill="#25334A" />

      {/* Clapper */}
      <circle cx="48" cy="74" r="8" fill="url(#clapperTeal)" />

      {/* Main Bell Body */}
      <path d="M48 24C32 24 28 44 24 64C22 70 26 72 32 72H64C70 72 74 70 72 64C68 44 64 24 48 24Z" fill="url(#bellCoral)" />
      {/* Bottom Lip */}
      <ellipse cx="48" cy="69" rx="26" ry="6" fill="#D94B35" />
      <ellipse cx="48" cy="67" rx="24" ry="4.5" fill="#FF9A85" />

      {/* Subtle Highlight */}
      <path d="M34 38C34 32 40 28 48 28" stroke="#FFFFFF" strokeWidth="3" strokeLinecap="round" strokeOpacity="0.7" />
    </svg>
  );
}

// Minimal 3D Swords Icon (Battle Mode)
export function ClaySwords3D({ className = 'w-12 h-12', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <radialGradient id="swordBlade1" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#FFE2D5" />
          <stop offset="100%" stopColor="#FF765E" />
        </radialGradient>
        <radialGradient id="swordBlade2" cx="30%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#FFFFFF" />
          <stop offset="60%" stopColor="#E4F5EE" />
          <stop offset="100%" stopColor="#45BFA8" />
        </radialGradient>
      </defs>
      
      {/* Sword 1 (Coral - Top Left to Bottom Right) */}
      <g transform="rotate(-45 48 48)">
        <polygon points="48,12 53,44 48,70 43,44" fill="url(#swordBlade1)" />
        <rect x="36" y="52" width="24" height="5" rx="2.5" fill="#25334A" />
        <rect x="45" y="57" width="6" height="18" rx="3" fill="#D94B35" />
        <circle cx="48" cy="77" r="4.5" fill="#FFB36B" />
      </g>

      {/* Sword 2 (Teal - Top Right to Bottom Left) */}
      <g transform="rotate(45 48 48)">
        <polygon points="48,12 53,44 48,70 43,44" fill="url(#swordBlade2)" />
        <rect x="36" y="52" width="24" height="5" rx="2.5" fill="#25334A" />
        <rect x="45" y="57" width="6" height="18" rx="3" fill="#2D8A78" />
        <circle cx="48" cy="77" r="4.5" fill="#FFB36B" />
      </g>

      {/* Central Clash Spark */}
      <circle cx="48" cy="48" r="6" fill="#FFB36B" />
      <polygon points="48,36 51,45 60,48 51,51 48,60 45,51 36,48 45,45" fill="#FFFFFF" />
    </svg>
  );
}

// Minimal 3D Analytics Chart Icon (Teal & Navy)
export function ClayChart3D({ className = 'w-12 h-12', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <radialGradient id="mintBg" cx="35%" cy="30%" r="70%">
          <stop offset="0%" stopColor="#E4F5EE" />
          <stop offset="70%" stopColor="#45BFA8" />
          <stop offset="100%" stopColor="#2D8A78" />
        </radialGradient>
      </defs>
      
      {/* Background Soft Disc */}
      <circle cx="48" cy="48" r="40" fill="url(#mintBg)" />

      {/* Minimal Bars */}
      <rect x="24" y="52" width="10" height="22" rx="4" fill="#FFFFFF" />
      <rect x="38" y="38" width="10" height="36" rx="4" fill="#FFFFFF" />
      <rect x="52" y="26" width="10" height="48" rx="4" fill="#FF765E" />
      <rect x="66" y="44" width="10" height="30" rx="4" fill="#FFFFFF" />

      {/* Growth Trend Arrow */}
      <path d="M26 48L42 34L56 22L72 32" stroke="#25334A" strokeWidth="3" strokeLinecap="round" strokeLinejoin="round" />
      <circle cx="56" cy="22" r="3.5" fill="#FFB36B" />
    </svg>
  );
}

// Minimal 3D Shield Icon (Teal & Clean Mint)
export function ClayShield3D({ className = 'w-12 h-12', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 96 96" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <radialGradient id="shieldGrad" cx="40%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#5CD6BF" />
          <stop offset="60%" stopColor="#45BFA8" />
          <stop offset="100%" stopColor="#2D8A78" />
        </radialGradient>
      </defs>
      
      {/* Shield Body */}
      <path d="M48 16L72 26V48C72 66 58 78 48 82C38 78 24 66 24 48V26L48 16Z" fill="url(#shieldGrad)" />
      
      {/* Inner Rim */}
      <path d="M48 22L66 30V48C66 62 55 72 48 75C41 72 30 62 30 48V30L48 22Z" fill="#1E5C50" fillOpacity="0.2" />

      {/* Checkmark in Center */}
      <path d="M38 48L45 55L60 40" stroke="#FFFFFF" strokeWidth="5.5" strokeLinecap="round" strokeLinejoin="round" />
    </svg>
  );
}

// Social Media Clean Badges
export function ClayInstagramBadge({ className = 'w-10 h-10', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <radialGradient id="igGrad" cx="30%" cy="100%" r="120%">
          <stop offset="0%" stopColor="#FFDC80" />
          <stop offset="25%" stopColor="#F77737" />
          <stop offset="50%" stopColor="#FD1D1D" />
          <stop offset="75%" stopColor="#C13584" />
          <stop offset="100%" stopColor="#833AB4" />
        </radialGradient>
      </defs>
      <rect width="80" height="80" rx="22" fill="url(#igGrad)" />
      <rect x="18" y="18" width="44" height="44" rx="14" stroke="#FFFFFF" strokeWidth="5" />
      <circle cx="40" cy="40" r="11" stroke="#FFFFFF" strokeWidth="5" />
      <circle cx="51" cy="29" r="3.5" fill="#FFFFFF" />
    </svg>
  );
}

export function ClayYoutubeBadge({ className = 'w-10 h-10', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <radialGradient id="ytGrad" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#FF5C5C" />
          <stop offset="70%" stopColor="#FF0000" />
          <stop offset="100%" stopColor="#CC0000" />
        </radialGradient>
      </defs>
      <rect width="80" height="80" rx="22" fill="url(#ytGrad)" />
      <polygon points="34,26 56,40 34,54" fill="#FFFFFF" />
    </svg>
  );
}

export function ClayFacebookBadge({ className = 'w-10 h-10', ...props }: SVGProps<SVGSVGElement>) {
  return (
    <svg viewBox="0 0 80 80" fill="none" xmlns="http://www.w3.org/2000/svg" className={className} {...props}>
      <defs>
        <radialGradient id="fbGrad" cx="35%" cy="30%" r="75%">
          <stop offset="0%" stopColor="#4A90E2" />
          <stop offset="60%" stopColor="#1877F2" />
          <stop offset="100%" stopColor="#0B4CAD" />
        </radialGradient>
      </defs>
      <rect width="80" height="80" rx="22" fill="url(#fbGrad)" />
      <path d="M47 43H41V64H32V43H27V35H32V30C32 24.5 35.5 20 42 20H48V28H43.5C41.8 28 41 28.8 41 30.5V35H48L47 43Z" fill="#FFFFFF" />
    </svg>
  );
}

