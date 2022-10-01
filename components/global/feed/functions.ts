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
                  cover,
                  editors_pick,
                  views,
                  authors!articles_author_id_fkey (
                    dp,
                    full_name
                  ),
                  co_authors_articles (
                    authors (
                      dp,
                      full_name
                    )
                  ),
         tags!inner (
          title,
          authors!inner (
            id,
            full_name
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
      .order("views", {
        ascending: false,
      })
      .range(data ? data.length : 0, data ? data.length + 9 : 9);

    if (feedData && feedData.length > 0) {
      var articles = [];
      if (data) {
        articles = [...data];
      }
      await Promise.all(
        feedData.map(async (mapped) => {
          var res = await fetch(
            `${process.env.NEXT_PUBLIC_FUNCTIONS_URL}/upload/image/generate-placeholder`,
            {
              headers: {
                "content-type": "application/json",
              },
              method: "POST",
              body: JSON.stringify({
                cover: mapped.cover,
              }),
            }
          );

          var data = await res.json();
          var mappa = { ...mapped, cover_base_64: data.placeholder };
          articles.push(mappa);
        })
      );
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
                  views,
                  description,
                  cover,
                  editors_pick,
                  authors!articles_author_id_fkey (
                    dp,
                    full_name
                  ),
                  co_authors_articles (
                    authors (
                      dp,
                      full_name
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
      .range(data ? data.length : 0, data ? data.length + 9 : 9);

    //
    //
    if (feedData && feedData.length > 0) {
      var articles = [];
      if (data) {
        articles = [...data];
      }
      await Promise.all(
        feedData.map(async (mapped) => {
          var res = await fetch(
            `${process.env.NEXT_PUBLIC_FUNCTIONS_URL}/upload/image/generate-placeholder`,
            {
              headers: {
                "content-type": "application/json",
              },
              method: "POST",
              body: JSON.stringify({
                cover: mapped.cover,
              }),
            }
          );

          var data = await res.json();
          var mappa = { ...mapped, cover_base_64: data.placeholder };
          articles.push(mappa);
        })
      );
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
                    full_name
                  ),
                  co_authors_articles (
                    authors (
                      dp,
                      full_name
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
  //
  //
  //
  var newTrending = await Promise.all(
    trendingData.map(async (mapped) => {
      var res = await fetch(
        `${process.env.NEXT_PUBLIC_FUNCTIONS_URL}/upload/image/generate-placeholder`,
        {
          headers: {
            "content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            cover: mapped.cover,
          }),
        }
      );

      var data = await res.json();
      return { ...mapped, cover_base_64: data.placeholder };
    })
  );
  setData(newTrending);
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
                    full_name
                  ),
                  co_authors_articles (
                    authors (
                      dp,
                      full_name
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
  //
  //
  //
  var newPopular = await Promise.all(
    popularArticles.map(async (mapped) => {
      var res = await fetch(
        `${process.env.NEXT_PUBLIC_FUNCTIONS_URL}/upload/image/generate-placeholder`,
        {
          headers: {
            "content-type": "application/json",
          },
          method: "POST",
          body: JSON.stringify({
            cover: mapped.cover,
          }),
        }
      );

      var data = await res.json();
      return { ...mapped, cover_base_64: data.placeholder };
    })
  );
  setData(newPopular);
};
