import { createSlice, PayloadAction } from "@reduxjs/toolkit";

export type PageOptions = 
  | 'DASHBOARD' 
  | 'INTEGRATIONS' 
  | 'SETTINGS' 
  | 'CALENDAR' 
  | 'TIMEOFF' 
  | 'PROJECTS' 
  | 'TEAMS' 
  | 'BENEFITS' 
  | 'DOCUMENTS' 
  | 'SUPPORT';

interface NavState {
  activePage: PageOptions;
  isSidebarOpen: boolean;
}

const initialState: NavState = {
  activePage: 'DASHBOARD',
  isSidebarOpen: false,
};

export const navSlice = createSlice({
  name: "nav",
  initialState,
  reducers: {
    setActivePage: (state, action: PayloadAction<PageOptions>) => {
      state.activePage = action.payload;
    },
    toggleSidebar: (state) => {
      state.isSidebarOpen = !state.isSidebarOpen;
    },
    setIsSidebarOpen: (state, action: PayloadAction<boolean>) => {
      state.isSidebarOpen = action.payload;
    },
    
    resetNavState: (state) => {
      state.activePage = 'DASHBOARD';
      state.isSidebarOpen = false;
    },
    
    setSidebarForScreen: (state, action: PayloadAction<{ isMobile: boolean }>) => {
      state.isSidebarOpen = !action.payload.isMobile;
    },
  },
});

export const { 
  setActivePage, 
  toggleSidebar, 
  setIsSidebarOpen,
  resetNavState,
  setSidebarForScreen 
} = navSlice.actions;

export default navSlice.reducer;