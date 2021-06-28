import React, { useEffect, useState } from 'react';

interface SidebarCloseHookType {
  ref: React.RefObject<HTMLElement>;
  isClosed: boolean;
  setClose: React.Dispatch<React.SetStateAction<boolean>>;
}

export function useSidebarCloseHook(): SidebarCloseHookType {
  const ref = React.createRef<HTMLElement>();
  const [isClosed, setClose] = useState(true);

  const handleOuterClick = (ev: MouseEvent) => {
    if (isClosed || ref.current?.contains(ev.target as Node)) return;
    setClose(true);
  };

  const handleGlobalKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Escape') setClose(true);
  };

  useEffect(() => {
    document.documentElement.addEventListener('keydown', handleGlobalKeyDown);
    document.documentElement.addEventListener('click', handleOuterClick);
    return () => {
      document.documentElement.removeEventListener('keydown', handleGlobalKeyDown);
      document.documentElement.removeEventListener('click', handleOuterClick);
    };
  }, [ref]);

  return { ref, isClosed, setClose };
}
