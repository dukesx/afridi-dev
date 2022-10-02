import { renderToString } from "react-dom/server";
import createEmotionServer from "@emotion/server/create-instance";
import { MantineProvider } from "@mantine/core";
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
        colorScheme="light"
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
      "Content-Type": "image/png",
      "Content-Length": Buffer.byteLength(screenShotBuffer),
    });

    res.end(screenShotBuffer);
  } else {
    res.send("An error Occurred");
  }
}
