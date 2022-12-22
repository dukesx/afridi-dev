/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import {
  createStyles,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import Image from "next/image";
import type { CSSProperties } from "react";

// import ProgressiveImage from "react-progressive-graceful-image";

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
  isResponsive?: boolean | false;
}
const AfridiImage: React.FC<AfridiImageProps> = ({
  width,
  height,
  path,
  style,
  fillImage,
  isResponsive,
  imageClassName,
  cover_base_64,
  onClick,
  priority,
}) => {
  const theme = useMantineTheme();
  const AfridiImageClasses = createStyles((theme) => ({
    wrapper: {
      height: height,
      width: width,
    },
  }));

  return (
    <div
      className="block"
      style={{
        width: width,
        height: height,
      }}
    >
      <Image
        priority={priority ? true : false}
        className={
          (imageClassName ? imageClassName : "") + " w-full rounded-sm"
        }
        fill={fillImage}
        alt="article's cover image"
        src={path && !path.includes("http") ? path.replaceAll("/", "") : path}
        width={width}
        height={height}
        quality={75}
        loader={({ src, width, quality }) =>
          src.includes("http")
            ? src
            : `https://ik.imagekit.io/afrididotdev/tr:w-${width},q-${quality}/${src}`
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
