/* eslint-disable @next/next/no-img-element */
// @ts-nocheck
import {
  createStyles,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";

import ProgressiveImage from "react-progressive-graceful-image";

interface AfridiImageProps {
  width: number | string;
  height: number;
  path: string;
  loading?: "lazy" | "normal";
  style?: object;
  className?: string;
  onClick?: Function;
  fillImage: boolean;
}
const AfridiImage: React.FC<AfridiImageProps> = ({
  width,
  height,
  loading,
  path,
  style,
  fillImage,
  className,
  onClick,
}) => {
  const theme = useMantineTheme();
  const AfridiImageClasses = createStyles((theme) => ({
    wrapper: {
      height: height,
      width: width,
    },
  }));

  const { classes } = AfridiImageClasses();
  const { colorScheme } = useMantineColorScheme();
  return (
    <div
      className={
        classes.wrapper +
        " " +
        (className ?? "") +
        (fillImage ? " max-w-full w-full" : "")
      }
      style={style}
    >
      <ProgressiveImage
        src={
          `https://ik.imagekit.io/afrididotdev/tr:w-${width},h-${height}` + path
        }
        placeholder={
          `https://ik.imagekit.io/afrididotdev/tr:q-100,bl-30,w-${width},h-${height}` +
          path
        }
        className={fillImage ? "mx-auto flex !w-full !h-full" : ""}
        onClick={onClick}
      >
        {(src, loading) => (
          <img
            src={src}
            alt=""
            height={height}
            width={width}
            className={
              (fillImage ? "mx-auto flex !w-full !h-full" : "") +
              " object-cover"
            }
          />
        )}
      </ProgressiveImage>
    </div>
  );
};

export default AfridiImage;
