import { createStore, action, type Action } from "easy-peasy";
import { AfridiDevArticle } from "../../components/global/grid-cards/largeGridCard";

/**
 *  General Store
 *  @property {boolean} dark - Dark Mode
 *  @property {Action} toggleDark - Toggle Dark Mode
 */

export interface GeneralStore {
  dark: boolean;
  toggleDark: Action<GeneralStore, boolean>;
  appLoading: boolean;
  toggleAppLoading: Action<GeneralStore, boolean>;
  feedData: Array<AfridiDevArticle>;
  setFeedData: Action<GeneralStore, Array<any>>;
  trendingData: Array<AfridiDevArticle>;
  setTrendingData: Action<GeneralStore, Array<any>>;
  popularData: Array<AfridiDevArticle>;
  setPopularData: Action<GeneralStore, Array<any>>;
  articleCount: number;
  setArticleCount: Action<GeneralStore, number>;
  feedLoading: boolean;
  setFeedLoading: Action<GeneralStore, boolean>;
}
// Declare General Store
export const generalStore = createStore<GeneralStore>({
  dark: false,
  toggleDark: action((state, payload) => {
    state.dark = payload;
  }),
  appLoading: false,
  toggleAppLoading: action((state, payload) => {
    state.appLoading = payload;
  }),
  feedData: [],
  setFeedData: action((state, payload) => {
    state.feedData = payload;
  }),
  trendingData: [],
  setTrendingData: action((state, payload) => {
    state.trendingData = payload;
  }),
  popularData: [],
  setPopularData: action((state, payload) => {
    state.popularData = payload;
  }),
  articleCount: 0,
  setArticleCount: action((state, payload) => {
    state.articleCount = payload;
  }),
  feedLoading: false,
  setFeedLoading: action((state, payload) => {
    state.feedLoading = payload;
  }),
});
