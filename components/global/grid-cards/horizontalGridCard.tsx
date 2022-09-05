import {
  Group,
  type MantineTheme,
  Stack,
  Text,
  Card,
  Skeleton,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import AfridiImage from "../afridi-image";
import { AfridiDevArticle } from "./largeGridCard";

export enum CardStyle {
  DEFAULT,
  FEED,
  WIDGET,
}

interface HorizontalGridCardProps {
  theme: MantineTheme;
  style: CardStyle;
  data: AfridiDevArticle;
}
const HorizontalGridCard: React.FC<HorizontalGridCardProps> = ({
  theme,
  style,
  data,
}) => {
  return data ? (
    <Group noWrap className="w-full">
      <AfridiImage
        fillImage={false}
        path={data.cover}
        width={style == CardStyle.FEED ? 100 : 100}
        height={
          style == CardStyle.WIDGET ? 100 : style == CardStyle.FEED ? 100 : 100
        }
        style={{
          borderRadius: theme.radius.lg,
        }}
      />
      <Stack
        spacing="xs"
        className={
          style == CardStyle.FEED
            ? "max-w-[550px]"
            : style == CardStyle.WIDGET
            ? "max-w-[290px]"
            : "max-w-[390px]"
        }
      >
        <Text
          component={NextLink}
          href={`/article/${data.id}`}
          lineClamp={2}
          className={
            style == CardStyle.DEFAULT
              ? "text-xs xs:text-xs max-w-[270px]"
              : style == CardStyle.FEED
              ? "text-xs xs:text-sm"
              : "text-xs xs:text-xs"
          }
          size={style == CardStyle.FEED ? "sm" : "xs"}
          style={{
            lineHeight: 1.5,
          }}
        >
          {data.title}
        </Text>
        <Text
          lineClamp={2}
          className="text-xs xs:text-xs"
          color="dimmed"
          size={style == CardStyle.FEED ? "sm" : "xs"}
        >
          {data.description}
        </Text>
      </Stack>
    </Group>
  ) : null;
};

export default HorizontalGridCard;
