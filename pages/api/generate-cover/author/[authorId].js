import { renderToString } from "react-dom/server";
import createEmotionServer from "@emotion/server/create-instance";
import { MantineProvider, ColorSchemeProvider } from "@mantine/core";
import { supabase } from "../../../../utils/supabaseClient";
import DynamicAuthorCover from "../../../../components/global/dynamic-covers/author";
import { appCache } from "../../../../utils/cache";

export default async function generateAuthorCover(req, res) {
  const { authorId } = req.query;

  const { error, data } = await supabase
    .from("authors")
    .select(
      `
        full_name,
        dp,
        content_count,
        location,
        username,
        created_at
        )
        `
    )
    .eq("id", authorId);

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
        <DynamicAuthorCover
          content_count={data[0].content_count}
          created_at={data[0].created_at}
          dp={data[0].dp}
          full_name={data[0].full_name}
          location={data[0].location}
          username={data[0].username}
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
