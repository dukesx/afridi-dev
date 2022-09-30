/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "https://afridi.dev",
  generateRobotsTxt: true, // (optional)
  sitemapSize: 7000,
  exclude: [
    // "/server-sitemap.xml",
    "/get-started",
    "/creator-studio",
    "/creator-studio/publish",
    "/creator-studio/publish/article",
    "/creator-studio/my-articles",
  ],
  // robotsTxtOptions: {
  //   additionalSitemaps: [
  //     "https://afridi.dev/server-sitemap.xml", // <==== Add here
  //   ],
  // },
};
