/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import { useMantineTheme } from "@mantine/core";
import Image from "next/image";
import type { CSSProperties } from "react";

export interface AfridiImageProps {
  width?: number | string;
  height?: number;
  path: string;
  loading?: "lazy" | "normal";
  style?: CSSProperties;
  className?: string;
  onClick?: Function;
  fillImage?: boolean | false;
  imageClassName?: string;
  cover_base_64?: string;
  priority?: boolean | false;
  unoptimised?: boolean | false;
}
const AfridiImage: React.FC<AfridiImageProps> = ({
  width,
  height,
  path,
  unoptimised,
  style,
  fillImage,
  imageClassName,
  cover_base_64,
  onClick,
  priority,
}) => {
  const theme = useMantineTheme();

  return (
    <div
      style={{
        width: width,
        height: height,
      }}
    >
      <Image
        loading={priority == true ? undefined : "lazy"}
        priority={priority == true ? true : false}
        className={
          (imageClassName ? imageClassName : "") + " w-full rounded-sm"
        }
        fill={fillImage}
        alt="article's cover image"
        src={path && !path.includes("http") ? path.replaceAll("/", "") : path}
        width={width}
        height={height}
        quality={75}
        unoptimized={unoptimised ?? false}
        loader={({ src, width, quality }) =>
          path.includes("unsplash")
            ? path.split("&")[0] +
              `&auto=format&fit=crop&w=${width}&q=${quality}`
            : path.includes("imagekit")
            ? `https://ik.imagekit.io/afrididotdev/tr:w-${width},q-${quality}/${path}`
            : path
        }
        placeholder={cover_base_64 ? "blur" : "empty"}
        blurDataURL={cover_base_64 ?? null}
        onClick={onClick ?? null}
        style={{
          objectFit: "cover",
          ...style,
        }}
      />
    </div>
  );
};

export default AfridiImage;
