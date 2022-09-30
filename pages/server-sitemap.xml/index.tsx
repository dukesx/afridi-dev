// pages/server-sitemap.xml/index.tsx

import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";
import { supabase } from "../../utils/supabaseClient";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  var infinity = 18446744073709551615;
  const { error, data: articlesData } = await supabase
    .from("articles")
    .select(
      `
 id,
 created_at,
 updated_at
 `
    )
    .range(9, infinity);

  const { error: tagsError, data: tagsData } = await supabase
    .from("tags")
    .select(
      `
 title,
 created_at,
 updated_at
 `
    )
    .range(9, infinity);

  const { error: authorsError, data: authorsData } = await supabase
    .from("authors")
    .select(
      `
 id,
 created_at,
 updated_at
 `
    )
    .range(9, infinity);

  var newData = [];

  authorsData.map((mapped) => {
    newData.push({
      loc: `https://afridi.dev/author/${mapped.id}`, // Absolute url
      lastmod: mapped.updated_at,
      changefreq: "daily",
      priority: 0.7,
    });
  });

  articlesData.map((mapped) => {
    newData.push({
      loc: `https://afridi.dev/article/${mapped.id}`, // Absolute url
      lastmod: mapped.updated_at,
      changefreq: "weekly",
      priority: 0.7,
    });
  });

  tagsData.map((mapped) => {
    newData.push({
      loc: `https://afridi.dev/tags/${mapped.title}`, // Absolute url
      lastmod: mapped.updated_at,
      changefreq: "daily",
      priority: 0.7,
    });
  });

  return getServerSideSitemap(ctx, newData);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
