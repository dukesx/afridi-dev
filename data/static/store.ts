import create from "zustand";
/**
 *  General Store
 *  @property {boolean} dark - Dark Mode
 *  @property {Action} toggleDark - Toggle Dark Mode
 */

export interface GeneralStore {
  search: boolean;
  toggleSearch: any;
  overlay: boolean;
  toggleOverlay: any;
}

// Declare General Store
export const useGeneralStore = create<GeneralStore>((set) => ({
  search: false,
  toggleSearch: (value: boolean) =>
    set({
      search: value,
    }),
  overlay: false,
  toggleOverlay: (value: boolean) =>
    set({
      overlay: value,
    }),
}));
