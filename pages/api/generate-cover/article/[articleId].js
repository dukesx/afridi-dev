import { renderToString } from "react-dom/server";
import createEmotionServer from "@emotion/server/create-instance";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { supabase } from "../../../../utils/supabaseClient";
import DynamicArticleCover from "../../../../components/global/dynamic-covers/article";
import { appCache } from "../../../../utils/cache";

export default async function generateTagCover(req, res) {
  const { articleId } = req.query;

  const { error, data } = await supabase
    .from("articles")
    .select(
      `
        title,
        views,
        description,
        cover,
         authors!articles_author_id_fkey (
            full_name,
            dp,
            username
        ),
        tags (
        title,
        color
        )
        `
    )
    .eq("id", articleId);

  //Chrome

  if (data && data.length > 0) {
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
        <DynamicArticleCover
          colorScheme="light"
          title={data && data.length > 0 ? data[0].title : "Random"}
          author={{
            full_name: data[0].authors.full_name,
            cover: data[0].authors.dp,
            username: data[0].authors.username,
          }}
          description={
            data && data.length > 0 ? data[0].description : "No Description"
          }
          tags={data[0].tags}
          views={data[0].views}
          cover={data[0].cover}
        />
      </MantineProvider>
    );
    const { extractCriticalToChunks, constructStyleTagsFromChunks } =
      createEmotionServer(appCache);

    var html = renderToString(element);

    const chunks = extractCriticalToChunks(html);
    const styles = constructStyleTagsFromChunks(chunks);

    const fetcher = await fetch(
      `${process.env.NEXT_PUBLIC_FUNCTIONS_URL}/upload/image/generate-screenshot`,
      {
        method: "POST",
        headers: {
          "content-type": "application/json",
          accept: "application/json",
        },
        body: JSON.stringify({
          html: html,
          styles: styles,
        }),
      }
    );

    const result = await fetcher.json();

    if (result.buffer) {
      var screenShotBuffer = Buffer.from(result.buffer.data);
      res.writeHead(200, {
        "Content-Type": "image/webp",
        "Cache-Control": "s-maxage=3600, stale-while-revalidate",
        "Content-Length": Buffer.byteLength(screenShotBuffer),
      });

      res.end(screenShotBuffer);
    } else {
      res.send("An error Occurred");
    }
  } else {
    res.send("An error occured");
  }
}
