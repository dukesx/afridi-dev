/** @type {import('next-sitemap').IConfig} */
module.exports = {
  siteUrl: "http://localhost:3000",
  generateRobotsTxt: true, // (optional)
  sitemapSize: 7000,
  robotsTxtOptions: {
    additionalSitemaps: [
      "https://example.com/server-sitemap.xml", // <==== Add here
    ],
  },
};
