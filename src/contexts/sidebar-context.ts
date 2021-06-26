import React from 'react';

export interface SidebarState {
  close: boolean;
}

export interface SidebarContextValue {
  sidebarState: SidebarState;
  dispatch: React.Dispatch<boolean>;
}

export const initialSidebarState: SidebarState = {
  close: true,
};

export const SidebarContext = React.createContext<SidebarContextValue>({
  sidebarState: initialSidebarState,
  dispatch: () => true,
});

export const sidebarReducer = (state: SidebarState, close: boolean): SidebarState => {
  return {
    ...state,
    close,
  };
};
