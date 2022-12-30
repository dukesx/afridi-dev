import { Anchor, useMantineColorScheme } from "@mantine/core";
import Image from "next/image";
import UnsplashBlackLogo from "../../public/unsplash2.svg";
import UnsplashWhiteLogo from "../../public/unsplash-2-white.svg";
import { FC } from "react";
import { UnsplashLogoProps } from "../../types/general";

const UnsplashLogo: FC<UnsplashLogoProps> = ({ height, width, style }) => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Anchor
      aria-label="Unsplash.com Homepage link"
      href="https://unsplash.com"
      target="_blank"
    >
      {colorScheme == "dark" ? (
        <Image
          priority
          alt="Unsplash Logo"
          style={{
            objectFit: "contain",
            ...style,
          }}
          height={height ?? 50}
          width={width ?? 70}
          src={UnsplashWhiteLogo}
        />
      ) : (
        <Image
          alt="Unsplash Logo"
          style={{
            objectFit: "contain",
            ...style,
          }}
          priority
          height={height ?? 50}
          width={width ?? 70}
          src={UnsplashBlackLogo}
        />
      )}
    </Anchor>
  );
};

export default UnsplashLogo;
