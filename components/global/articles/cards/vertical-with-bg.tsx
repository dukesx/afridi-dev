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
      p={0}
      className={colorScheme == "dark" ? "" : "shadow-neutral-400 shadow-xl"}
      style={{
        height: 400,
        width: 300,
        position: "relative",
      }}
    >
      <AfridiImage
        style={{
          filter: "brightness(57%)",
        }}
        width={350}
        height={400}
        path={cover}
      />

      <Center
        style={{
          position: "absolute",
          top: "12px",
          left: "16px",
        }}
        p="md"
      >
        <Stack>
          <Text
            weight={500}
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
            weight={700}
            color="gray.1"
          >
            {title}
          </Title>
        </Stack>
      </Center>
    </Card>
  );
};

export default AfridiVerticalArticleCardWithBg;
