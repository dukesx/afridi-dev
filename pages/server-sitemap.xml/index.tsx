// pages/server-sitemap.xml/index.tsx

import { getServerSideSitemap } from "next-sitemap";
import { GetServerSideProps } from "next";
import { supabase } from "../../utils/supabaseClient";

export const getServerSideProps: GetServerSideProps = async (ctx) => {
  const { error, data } = await supabase.from("articles").select(`
 id,
 created_at
 `);

  var newData = [];
  data.map((mapped) => {
    newData.push({
      loc: `http://localhost:3000/article/${mapped.id}`, // Absolute url
      lastmod: mapped.created_at,
      changefreq: "monthly",
      priority: 0.7,
    });
  });

  return getServerSideSitemap(ctx, newData);
};

// Default export to prevent next.js errors
export default function Sitemap() {}
