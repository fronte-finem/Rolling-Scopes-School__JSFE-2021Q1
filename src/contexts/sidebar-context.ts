import React from 'react';

export interface SidebarState {
  isClosed: boolean;
}

export interface SidebarContextValue {
  sidebarState: SidebarState;
  closeSidebar: React.Dispatch<boolean>;
}

export const initialSidebarState: SidebarState = {
  isClosed: true,
};

export const SidebarContext = React.createContext<SidebarContextValue>({
  sidebarState: initialSidebarState,
  closeSidebar: () => true,
});

export const sidebarReducer = (state: SidebarState, isClosed: boolean): SidebarState => {
  return {
    ...state,
    isClosed,
  };
};
