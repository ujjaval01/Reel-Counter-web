import { useRef } from 'react';
import { navigate } from '../router';

/**
 * Secret interaction trigger:
 * Clicking the target element 5 times within 3 seconds navigates directly to /admin.
 */
export function useHiddenAdminTrigger(targetClicks = 5, windowMs = 3000) {
  const clickCountRef = useRef(0);
  const lastClickTimeRef = useRef(0);

  const handleTriggerClick = (e: React.MouseEvent) => {
    const now = Date.now();
    if (now - lastClickTimeRef.current > windowMs) {
      clickCountRef.current = 1;
    } else {
      clickCountRef.current += 1;
    }
    lastClickTimeRef.current = now;

    if (clickCountRef.current >= targetClicks) {
      e.preventDefault();
      e.stopPropagation();
      clickCountRef.current = 0;
      navigate('/admin');
    }
  };

  return handleTriggerClick;
}

