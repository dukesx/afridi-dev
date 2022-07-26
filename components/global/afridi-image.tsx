/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import {
  createStyles,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import Image from "next/image";

// import ProgressiveImage from "react-progressive-graceful-image";

export interface AfridiImageProps {
  width?: number | string;
  height?: number;
  path: string;
  loading?: "lazy" | "normal";
  style?: object;
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
    // <div
    //   className={
    //     classes.wrapper +
    //     " " +
    //     (className ?? "") +
    //     (fillImage ? " max-w-full w-full" : "")
    //   }
    //   style={style}
    // >
    // <div
    //   style={{
    //     width: width,
    //     height: height,
    //   }}
    // >

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
        alt="article's cover image"
        src={path && path.replaceAll("/", "")}
        layout={fillImage ? "fill" : isResponsive ? "responsive" : "fixed"}
        width={fillImage ? false : width}
        height={fillImage ? false : height}
        quality={75}
        loader={({ src, width, quality }) =>
          `https://ik.imagekit.io/afrididotdev/tr:w-${width},q-${quality}/${src}`
        }
        placeholder={cover_base_64 ? "blur" : "empty"}
        blurDataURL={cover_base_64 ?? null}
        onClick={onClick ?? null}
        objectFit="cover"
        style={{
          ...style,
        }}
      />
    </div>
    // </div>
    //  <ProgressiveImage
    //   src={
    //     `https://ik.imagekit.io/afrididotdev/tr:w-${width},h-${height}` + path
    //   }
    //   placeholder={
    //     `https://ik.imagekit.io/afrididotdev/tr:q-100,bl-30,w-${width},h-${height}` +
    //     path
    //   }
    //   className={fillImage ? "mx-auto flex !w-full !h-full" : ""}
    //   onClick={onClick}
    // >
    //   {(src, loading) => (
    //     <img
    //       src={src}
    //       alt=""
    //       height={height}
    //       width={width}
    //       className={
    //         (fillImage ? "mx-auto flex !w-full !h-full" : "") +
    //         " object-cover " +
    //         (imageClassName ? imageClassName : "")
    //       }
    //     />
    //   )}
    // </ProgressiveImage>
    // </div>
  );
};

export default AfridiImage;
