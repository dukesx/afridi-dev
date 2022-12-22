import {
  Card,
  Center,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import Link from "next/link";
import { FC } from "react";
import { AfridiVerticalArticleCardWithBgProps } from "../../../../types/articles/cards/all";
import AfridiImage from "../../afridi-image";

const AfridiVerticalArticleCardWithBg: FC<
  AfridiVerticalArticleCardWithBgProps
> = ({ title, cover, tag }) => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Card
      component={Link}
      href="/"
      radius="lg"
      p={"sm"}
      className={colorScheme == "dark" ? "" : "shadow-neutral-400 shadow-xl"}
      style={{
        height: 400,
        width: 300,
      }}
    >
      <AfridiImage
        style={{
          filter: "brightness(65%)",
        }}
        fillImage
        path={cover}
      />

      <Center
        style={{
          zIndex: 2,
          position: "relative",
        }}
        p="md"
      >
        <Stack>
          <Text
            sx={{
              textTransform: "capitalize",
            }}
            color="gray.3"
          >
            {tag.title}
          </Text>
          <Title
            sx={{
              textTransform: "capitalize",
            }}
            order={2}
            color="white"
          >
            {title}
          </Title>
        </Stack>
      </Center>
    </Card>
  );
};

export default AfridiVerticalArticleCardWithBg;
