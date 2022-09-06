import { AfridiDevArticle } from "../../components/global/grid-cards/largeGridCard";
import create from "zustand";
/**
 *  General Store
 *  @property {boolean} dark - Dark Mode
 *  @property {Action} toggleDark - Toggle Dark Mode
 */

export interface GeneralStore {
  dark: boolean;
  toggleDark: any;
  appLoading: boolean;
  toggleAppLoading: any;
  feedData: Array<AfridiDevArticle>;
  setFeedData: any;
  trendingData: Array<AfridiDevArticle>;
  setTrendingData: any;
  popularData: Array<AfridiDevArticle>;
  setPopularData: any;
  articleCount: number;
  setArticleCount: any;
  feedLoading: boolean;
  setFeedLoading: any;
}

// Declare General Store
export const useGeneralStore = create<GeneralStore>((set) => ({
  dark: false,
  toggleDark: (value: boolean) =>
    set({
      dark: value,
    }),
  appLoading: false,
  toggleAppLoading: (value: boolean) =>
    set({
      appLoading: value,
    }),
  feedData: [],
  setFeedData: (value: Array<any>) =>
    set({
      feedData: value,
    }),
  trendingData: [],
  setTrendingData: (value: Array<any>) =>
    set({
      trendingData: value,
    }),
  popularData: [],
  setPopularData: (value: Array<any>) =>
    set({
      popularData: value,
    }),
  articleCount: 0,
  setArticleCount: (value: number) =>
    set({
      articleCount: value,
    }),
  feedLoading: false,
  setFeedLoading: (value: boolean) =>
    set({
      appLoading: value,
    }),
}));
