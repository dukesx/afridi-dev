import { renderToString } from "react-dom/server";
import createEmotionServer from "@emotion/server/create-instance";
import { MantineProvider } from "@mantine/core";
import chromium from "chrome-aws-lambda";
import { supabase } from "../../../../utils/supabaseClient";
import DynamicTagTitleCover from "../../../../components/global/dynamic-covers/tag-title";
import { appCache } from "../../../../utils/cache";

export default async function generateTagCover(req, res) {
  const { tagId } = req.query;

  const { error, data } = await supabase
    .from("tags")
    .select()
    .eq("title", tagId);

  //Chrome
  await chromium.font(
    "https://fonts.googleapis.com/css2?family=Inter:wght@400;500;600;700;800&family=Source+Code+Pro&display=swap"
  );
  const browser = await chromium.puppeteer.launch({
    args: [...chromium.args, "--hide-scrollbars", "--disable-web-security"],
    defaultViewport: chromium.defaultViewport,
    executablePath: await chromium.executablePath,
    headless: true,
    ignoreHTTPSErrors: true,
  });

  const page = await browser.newPage();
  page.setViewport({ width: 1200, height: 600, deviceScaleFactor: 2 });

  let element = (
    <MantineProvider
      withGlobalStyles
      withNormalizeCSS
      theme={{
        fontFamily: "Inter, sans-serif",
        fontFamilyMonospace: "Monaco, Courier, monospace",
        headings: { fontFamily: "Inter, sans-serif" },
        primaryColor: "cyan",
        // colorScheme: "dark",
      }}
      emotionCache={appCache}
    >
      <DynamicTagTitleCover
        // colorScheme="dark"
        title={data && data.length > 0 ? data[0].title : "Random"}
        color={data && data.length > 0 ? data[0].color : "gray"}
      />
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
}
