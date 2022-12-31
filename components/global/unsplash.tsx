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
      href="https://unsplash.com/?utm_source=afridi.dev&utm_medium=referral"
      target="_blank"
      size="xs"
      color={colorScheme == "dark" ? "white" : "dark"}
      weight={600}
    >
      Unsplash
    </Anchor>
  );
};

export default UnsplashLogo;
