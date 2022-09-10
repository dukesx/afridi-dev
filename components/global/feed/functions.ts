import { type User } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { supabase } from "../../../utils/supabaseClient";

type FeedFunctionProps = {
  user: User;
  data: Array<any>;
  articleCount?: number;
  setData: (array: any) => void;
  setArticleCount?: (number) => void;
};

export const getFeedArticles = async ({
  user,
  data,
  setArticleCount,
  setData,
  articleCount,
}: FeedFunctionProps) => {
  /**
   *
   *  removed till supabase-js v2 upgrade
   */
  //
  if (user) {
    const {
      error,
      data: feedData,
      count,
    } = await supabase
      .from("articles")
      .select(
        `
              id,
                  title,
                  description,
                  views,
                  cover,
                  editors_pick,
                  authors!articles_author_id_fkey (
                    dp,
                    firstName,
                    lastName
                  ),
                  co_authors_articles (
                    authors (
                      dp,
                      firstName,
                      lastName
                    )
                  ),
         tags!inner (
          title,
          authors!inner (
            id,
            firstName
          )
          ),
          appreciations (
            id
          )
         `,
        { count: "exact" }
      )
      .eq("tags.authors.id", user.id)
      .limit(10)
      .order("created_at", {
        ascending: false,
      })
      .range(data ? data.length : 0, data ? data.length + 9 : 9);

    if (feedData && feedData.length > 0) {
      var articles = [];
      if (data) {
        articles = [...data];
      }
      feedData.map((mapped) => articles.push(mapped));
      setArticleCount(count);
      setData(articles);
    }
  } else {
    const {
      error,
      data: feedData,
      count: count,
    } = await supabase
      .from("articles")
      .select(
        `
                  id,
                  title,
                  description,
                  cover,
                  editors_pick,
                  views,
                  authors!articles_author_id_fkey (
                    dp,
                    firstName,
                    lastName
                  ),
                  co_authors_articles (
                    authors (
                      dp,
                      firstName,
                      lastName
                    )
                  ),
                appreciations (
                id
                  )
                `,
        {
          count: "exact",
        }
      )
      .order("created_at", {
        ascending: false,
      })
      .limit(10)
      .order("created_at", {
        ascending: false,
      })
      .range(data ? data.length : 0, data ? data.length + 9 : 9);

    //
    //
    if (feedData && feedData.length > 0) {
      var articles = [];
      if (data) {
        articles = [...data];
      }
      feedData.map((mapped) => articles.push(mapped));
      setArticleCount(count);
      setData(articles);
    }
  }
};

export const getTrendingArticles = async ({ setData }: FeedFunctionProps) => {
  const {
    error,
    data: trendingData,
    count,
  } = await supabase
    .from("articles")
    .select(
      `
              id,
                  title,
                  description,
                  cover,
                  authors!articles_author_id_fkey (
                    dp,
                    firstName,
                    lastName
                  ),
                  co_authors_articles (
                    authors (
                      dp,
                      firstName,
                      lastName
                    )
                  ),

          tags!inner (
          title
          )

              `,
      {
        count: "exact",
      }
    )
    .eq("tags.title", "trending")
    .order("created_at", {
      ascending: false,
    });
  setData(trendingData);
};

export const getPopularArticles = async ({
  user,
  data,
  articleCount,
  setArticleCount,
  setData,
}: FeedFunctionProps) => {
  const {
    error,
    data: popularArticles,
    count: count,
  } = await supabase
    .from("articles")
    .select(
      `
              id,
                  title,
                  description,
                  cover,
                  authors!articles_author_id_fkey (
                    dp,
                    firstName,
                    lastName
                  ),
                  co_authors_articles (
                    authors (
                      dp,
                      firstName,
                      lastName
                    )
                  ),
                  tags!inner (
                title
                )

              `,
      {
        count: "exact",
      }
    )
    .eq("tags.title", "popular")
    .order("created_at", {
      ascending: false,
    });
  setData(popularArticles);
};
