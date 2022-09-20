import { SupabaseClient } from "@supabase/supabase-js";
import { compareDesc, parseISO } from "date-fns";
import { AfridiDevArticle } from "../article/grid-cards/large-article-card";

export interface AuthorStatusFeed {
  created_at: string;
  type: "article" | "status";
  data: AfridiDevArticle | any;
}

export const getData = async (
  supabaseClient: SupabaseClient,
  id: string | string[],
  setFeed?: Function
) => {
  const { data: userData, error: userDataError } = await supabaseClient
    .from("authors")
    .select(
      `
      id,
:      firstName,
      lastName,
      location,
      github,
      dp,
      bio,
      cover,
      articles (
        created_at,
        author_id,
        id,
        title,
        description,
        cover,
        co_authors_articles (
          authors (
            dp,
            firstName,
            lastName
          )
        )
      ),
      status_feed (
        body,
        created_at,
        id,
        author_id
      )
      `
    )
    .limit(100)
    .eq("id", id)
    .order("created_at", {
      foreignTable: "status_feed",
      ascending: false,
    })
    .order("created_at", {
      foreignTable: "articles",
      ascending: false,
    });

  if (!userDataError) {
    var feed: Array<AuthorStatusFeed> = [];
    //@ts-ignore
    if (userData[0]["status_feed"].length > 0) {
      //@ts-ignore
      userData[0].status_feed.map((mapped) =>
        feed.push({
          type: "status",
          data: mapped,
          created_at: mapped.created_at,
        })
      );
    }
    //@ts-ignore

    if (userData[0]["articles"].length > 0) {
      //@ts-ignore

      await Promise.all(
        //@ts-ignore
        userData[0]["articles"].map(async (mapped: AfridiDevArticle) => {
          var res = await fetch("/api/generate-placeholder", {
            headers: {
              "content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              cover: mapped.cover,
            }),
          });

          var data = await res.json();
          var mappa = { ...mapped, cover_base_64: data.placeholder };
          feed.push({
            data: mappa,
            type: "article",
            created_at: mapped.created_at,
          });
        })
      );
    }

    feed.sort((a, b) => {
      return compareDesc(parseISO(a.created_at), parseISO(b.created_at));
    });

    setFeed(feed);
  }
};

export const getThumbsUpArticles = async (setThumbsUp, supabaseClient) => {
  var date = new Date();
  var date2 = new Date();
  //
  //
  date.setMonth(date.getMonth());
  date2.setMonth(date2.getMonth() - 1);
  //
  //
  const { error, data } = await supabaseClient
    .from("articles")
    .select(
      `
        id,
        title,
        description,
        cover,
        body,
        authors (
            id,
            firstName,
            lastName,
            dp
        ),
        co_authors_articles (
        authors (
            id,
            firstName,
            lastName,
            dp
        )
        ),
        tags!inner(
          title
        )
        `
    )
    .lte("created_at", date.toUTCString())
    .gte("created_at", date2.toUTCString())
    .eq("tags.title", "thumbs-up")
    .order("created_at", {
      ascending: false,
    })
    .limit(3);

  setThumbsUp(data);
};

export const getHotArticles = async (setHot, supabaseClient) => {
  const { error, data } = await supabaseClient
    .from("articles")
    .select(
      `
        id,
        title,
        description,
        cover,
        body,
        authors (
            id,
            firstName,
            lastName,
            dp
        ),
        co_authors_articles (
        authors (
            id,
            firstName,
            lastName,
            dp
        )
        ),
          tags!inner (
            title
        )
        `
    )
    .eq("tags.title", "hot")
    .order("created_at", {
      ascending: false,
    })
    .limit(3);
  setHot(data);
};

export const getSimilarAuthors = async (
  setSimilarAuthors: Function,
  supabaseClient: SupabaseClient,
  id: string | string[]
) => {
  const { error, data } = await supabaseClient
    .from("articles")
    .select(
      `
      tags (
        authors (
          content_count,
          id,
          firstName,
          lastName,
          location,
          dp
        )
      )
    `
    )
    .eq("author_id", id)
    .gt("tags.authors.content_count", 0);

  var authorsArray = [];

  data.map((mapped) => {
    //@ts-ignore
    mapped.tags.map((mapped2) => {
      mapped2.authors.map((mapped3) => {
        var newArr = authorsArray.filter((mapped4) => mapped4.id == mapped3.id);
        if (newArr.length > 0) {
        } else {
          authorsArray.push(mapped3);
        }
      });
    });
  });

  setSimilarAuthors(authorsArray);
};
