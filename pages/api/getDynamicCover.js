//@ts-nocheck
// import { NextApiRequest, NextApiResponse } from "next";
// import puppeteer from "puppeteer";
import { renderToString } from "react-dom/server";
import createEmotionServer from "@emotion/server/create-instance";
import DynamicTagTitleCover from "../../components/global/dynamic-covers/tag-title";
import { MantineProvider } from "@mantine/core";
import { appCache } from "../../utils/cache";
import chromium from "chrome-aws-lambda";

export default async function GenerateCustomCoverRoute(req, res) {
  const { Node } = req.body;

  //Chrome
  const browser = await chromium.puppeteer.launch({
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  page.setViewport({ width: 1200, height: 630 });

  let element = (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: "Inter, sans-serif",
        fontFamilyMonospace: "Monaco, Courier, monospace",
        headings: { fontFamily: "Inter, sans-serif" },
        primaryColor: "cyan",
      }}
      emotionCache={appCache}
    >
      <DynamicTagTitleCover />
    </MantineProvider>
  );
  const { extractCriticalToChunks, constructStyleTagsFromChunks } =
    createEmotionServer(appCache);

  var html = renderToString(element);

  const chunks = extractCriticalToChunks(html);
  const styles = constructStyleTagsFromChunks(chunks);
  page.setContent(
    `<!DOCTYPE html>
  <html lang="en">
  <head>
      <meta charset="UTF-8">
      <meta name="viewport" content="width=device-width, initial-scale=1.0">
      <meta http-equiv="X-UA-Compatible" content="ie=edge">
      <title>My site</title>
      ${styles}
  </head>
  <body>
      <div id="root">${html}</div>

      <script src="./bundle.js"></script>
  </body>
  </html>
    `
  );
  const screenShotBuffer = await page.screenshot();

  res.writeHead(200, {
    "Content-Type": "image/png",
    "Content-Length": Buffer.byteLength(screenShotBuffer),
  });

  res.end(screenShotBuffer);

  //   res.status(200).setHeader("Content-Type", "text/html").send(`<!DOCTYPE html>
  // <html lang="en">
  // <head>
  //     <meta charset="UTF-8">
  //     <meta name="viewport" content="width=device-width, initial-scale=1.0">
  //     <meta http-equiv="X-UA-Compatible" content="ie=edge">
  //     <title>My site</title>
  //     ${styles}
  // </head>
  // <body>
  //     <div id="root">${html}</div>

  //     <script src="./bundle.js"></script>
  // </body>
  // </html>`);
}
