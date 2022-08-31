import { supabaseClient, type User } from "@supabase/auth-helpers-nextjs";
import React from "react";

type FeedFunctionProps = {
  user: User;
  data: Array<any>;
  articleCount?: number;
  setData: (array: Array<any>) => void;
  setArticleCount?: (number) => void;
};

export const getFeedArticles = async ({
  user,
  data,
  setArticleCount,
  setData,
}: FeedFunctionProps) => {
  if (user) {
    const {
      error,
      data: feedData,
      count,
    } = await supabaseClient
      .from("articles")
      .select(
        `
              id,
                  title,
                  description,
                  cover,
                  authors (
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
          )
         `,
        { count: "exact" }
      )
      .eq("tags.authors.id", user.id)
      .limit(10)
      .order("created_at", {
        ascending: false,
      })
      .range(data.length, data.length + 9);
    if (feedData && feedData.length > 0) {
      var articles = [...data];
      feedData.map((mapped) => articles.push(mapped));
      setArticleCount(count);
      setData(articles);
    }
  } else {
    const {
      error,
      data: feedData,
      count: count,
    } = await supabaseClient
      .from("articles")
      .select(
        `
                  id,
                  title,
                  description,
                  cover,
                  authors (
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
      .range(data.length, data.length + 9);

    //
    //
    if (feedData && feedData.length > 0) {
      var articles = [...data];
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
  } = await supabaseClient
    .from("articles")
    .select(
      `
              id,
                  title,
                  description,
                  cover,
                  authors (
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
  } = await supabaseClient
    .from("articles")
    .select(
      `
              id,
                  title,
                  description,
                  cover,
                  authors (
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
