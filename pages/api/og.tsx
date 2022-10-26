/* eslint-disable @next/next/no-img-element */
/* eslint-disable react/no-unknown-property */
/* eslint-disable import/no-anonymous-default-export */
//@ts-nocheck
import { MantineProvider, Text } from "@mantine/core";
import { IconDashboard, IconEye, IconNews } from "@tabler/icons";
import { ImageResponse } from "@vercel/og";
import { supabase } from "../../utils/supabaseClient";

export const config = {
  runtime: "experimental-edge",
};

const font800 = fetch(
  new URL("../../public/fonts/inter/Inter-ExtraBold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const font700 = fetch(
  new URL("../../public/fonts/inter/Inter-Bold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const font600 = fetch(
  new URL("../../public/fonts/inter/Inter-SemiBold.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const font500 = fetch(
  new URL("../../public/fonts/inter/Inter-Medium.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

const font400 = fetch(
  new URL("../../public/fonts/inter/Inter-Regular.ttf", import.meta.url)
).then((res) => res.arrayBuffer());

export default async function (req, res) {
  // const { articleId } = req.query;
  const data400 = await font400;
  const data500 = await font500;
  const data600 = await font600;
  const data700 = await font700;
  const data800 = await font800;

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
    .eq("id", "44b4c9bb-e9f8-4513-8a98-2ebf7f43b87b");

  return new ImageResponse(
    (
      <div tw="flex flex-col w-full">
        <div tw="rounded-full w-[400px] h-[400px] flex w-full align-center items-center justify-between px-16 py-16">
          <div tw="flex flex-col max-w-[650px]">
            <h1
              style={{
                fontFamily: "Inter Bold",
                // lineHeight: 1.5,
              }}
              tw="font-bold text-5xl mt-36 subpixel-antialiased leading-snug"
            >
              {data[0].title}
            </h1>

            <p
              style={{
                fontFamily: "Inter Regular",
              }}
              tw="text-lg mr-18 mt-10 text-gray-400 antialiased leading-snug"
            >
              {data[0].description}
            </p>
          </div>

          <img
            tw="object-cover rounded-full w-[400px] h-[400px] mt-36"
            src={`https://ik.imagekit.io/afrididotdev/${data[0].cover}`}
            alt=""
            style={{
              objectFit: "cover",
            }}
          />
        </div>
        <div tw="flex mt-24 items-center gap-x-4">
          <IconEye
            tw="ml-16 mt-6 align-middle stroke-blue-300 fill-gray-300"
            size={30}
            strokeWidth={1.5}
            color="#339AF0"
          />
          <p
            style={{
              fontFamily: "Inter Regular",
            }}
            tw="text-base ml-3 mt-10 align-middle text-gray-500 antialiased leading-snug"
          >
            {data[0].views} Views
          </p>
        </div>
      </div>
    ),
    {
      width: 1200,
      height: 600,
      fonts: [
        {
          name: "Inter Regular",
          data: data400,
          weight: 400,
        },
        {
          name: "Inter Medium",
          data: data500,
          weight: 500,
        },
        {
          name: "Inter Semi Bold",
          data: data600,
          weight: 600,
        },
        {
          name: "Inter Bold",
          data: data700,
          weight: 700,
        },
        {
          name: "Inter Extra Bold",
          data: data800,
          weight: 800,
        },
      ],
    }
  );
}
