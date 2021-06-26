import React, { useContext, useEffect } from 'react';

import { SidebarContext, SidebarState } from 'contexts/sidebar-context';

interface SidebarHookResult {
  ref: React.RefObject<HTMLElement>;
  sidebarState: SidebarState;
  closeSidebar: React.Dispatch<boolean>;
}

export function useSidebarHook(): SidebarHookResult {
  const ref = React.createRef<HTMLElement>();

  const { sidebarState, closeSidebar } = useContext(SidebarContext);

  const handleOuterClick = (ev: MouseEvent) => {
    if (sidebarState.isClosed || ref.current?.contains(ev.target as Node)) return;
    closeSidebar(true);
  };

  const handleGlobalKeyDown = (event: KeyboardEvent) => {
    if (event.code === 'Escape') closeSidebar(true);
  };

  useEffect(() => {
    document.documentElement.addEventListener('keydown', handleGlobalKeyDown);
    document.documentElement.addEventListener('click', handleOuterClick);
    return () => {
      document.documentElement.removeEventListener('keydown', handleGlobalKeyDown);
      document.documentElement.removeEventListener('click', handleOuterClick);
    };
  }, [ref]);

  return { ref, sidebarState, closeSidebar };
}
