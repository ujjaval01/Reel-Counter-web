import React from 'react';
import { navigate } from '../router';

interface LinkProps extends React.AnchorHTMLAttributes<HTMLAnchorElement> {
  to?: string;
  href?: string;
}

export default function Link({ to, href, onClick, children, ...props }: LinkProps) {
  const targetHref = to || href || '#';

  const handleClick = (e: React.MouseEvent<HTMLAnchorElement>) => {
    if (onClick) onClick(e);

    // Skip special clicks or external links
    if (
      e.defaultPrevented ||
      props.target === '_blank' ||
      e.ctrlKey ||
      e.metaKey ||
      e.shiftKey ||
      e.altKey ||
      !targetHref.startsWith('/')
    ) {
      return;
    }

    // Handle cross-page with hash (e.g. /#features from /privacy-policy)
    const [targetPath, targetHash] = targetHref.split('#');
    const currentPath = window.location.pathname;

    e.preventDefault();
    navigate(targetHref);

    if (targetHash) {
      if (currentPath === (targetPath || '/')) {
        const el = document.getElementById(targetHash);
        if (el) el.scrollIntoView({ behavior: 'smooth' });
      } else {
        setTimeout(() => {
          const el = document.getElementById(targetHash);
          if (el) el.scrollIntoView({ behavior: 'smooth' });
        }, 100);
      }
    } else {
      window.scrollTo({ top: 0, behavior: 'smooth' });
    }
  };

  return (
    <a href={targetHref} onClick={handleClick} {...props}>
      {children}
    </a>
  );
}

