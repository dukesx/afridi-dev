// pages/server-sitemap.xml/index.tsx

import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";
import { supabase } from "../../utils/supabaseClient";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { error, data: articlesData } = await supabase.from("articles").select(`
 id,
 created_at,
 updated_at
 `);

  const { error: tagsError, data: tagsData } = await supabase.from("tags")
    .select(`
 title,
 created_at,
 updated_at
 `);

  var newData = [];
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

  newData = [
    ...newData,
    {
      loc: `https:afridi.dev`, // Absolute url
      changefreq: "daily",
      priority: 1.0,
    },
    {
      loc: `https:afridi.dev/legal/terms`, // Absolute url
      changefreq: "yearly",
      priority: 0.3,
    },
    {
      loc: `https:afridi.dev/legal/privacy-policy`, // Absolute url
      changefreq: "yearly",
      priority: 0.3,
    },
    {
      loc: `https:afridi.dev/about/acknowledgements`, // Absolute url
      changefreq: "monthly",
      priority: 0.5,
    },
    {
      loc: `https:afridi.dev/about/dev`, // Absolute url
      changefreq: "yearly",
      priority: 0.3,
    },
    {
      loc: `https:afridi.dev/about/roadmap`, // Absolute url
      changefreq: "monthly",
      priority: 0.5,
    },
    {
      loc: `https:afridi.dev/about/vision`, // Absolute url
      changefreq: "yearly",
      priority: 0.3,
    },
    {
      loc: `https:afridi.dev/tags`, // Absolute url
      changefreq: "daily",
      priority: 0.8,
    },
  ];

  return getServerSideSitemap(ctx, newData);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
