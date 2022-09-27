/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "http://localhost:3000",
  generateRobotsTxt: true, // (optional)
  sitemapSize: 7000,
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://afridi.dev/server-sitemap.xml", // <==== Add here
    ],
  },
};
