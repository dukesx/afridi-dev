import { createStore, action, type Action } from "easy-peasy";

/**
 *  General Store
 *  @property {boolean} dark - Dark Mode
 *  @property {Action} toggleDark - Toggle Dark Mode
 */

interface GeneralStore {
  dark: boolean;
  toggleDark: Action<GeneralStore, boolean>;
}
// Declare General Store
export const generalStore = createStore<GeneralStore>({
  dark: false,
  toggleDark: action((state, payload) => {
    state.dark = payload;
  }),
});
