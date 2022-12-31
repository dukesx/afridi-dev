import {
  ActionIcon,
  Anchor,
  Avatar,
  Divider,
  Group,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { BookmarkSimple } from "phosphor-react";
import { FC } from "react";
import { AfridiHorizontalFeedArticleListItemProps } from "../../../../types/articles/list-item/all";
import AfridiImage from "../../afridi-image";

const AfridiHorizontalFeedArticleListItem: FC<
  AfridiHorizontalFeedArticleListItemProps
> = ({ title, description, bookmarked, read_time, cover }) => {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  return (
    <Group position="apart" noWrap p="sm">
      <Stack mr="xs" spacing={4}>
        <Anchor color={colorScheme == "dark" ? "dark.0" : "dark"} href="#">
          <Title
            sx={(theme) => ({
              maxWidth: 500,
              [theme.fn.smallerThan(600)]: {
                fontSize: theme.fontSizes.md,
                fontWeight: 600,
              },
              lineHeight: 1.7,
            })}
            lineClamp={2}
            weight={700}
            order={5}
          >
            {title}
          </Title>
        </Anchor>

        <Text
          sx={(theme) => ({
            maxWidth: 500,
            [theme.fn.smallerThan(540)]: {
              display: "none",
            },
          })}
          my={6}
          lineClamp={2}
          color="dimmed"
          size="sm"
        >
          {description}
        </Text>

        <Group mt={4} spacing="xs">
          <ActionIcon variant="transparent" size="sm">
            {
              <BookmarkSimple
                weight={bookmarked ? "fill" : "regular"}
                fill={bookmarked ? theme.colors.gray[6] : null}
                color={theme.colors.gray[6]}
              />
            }
          </ActionIcon>
          <Divider
            mx={0}
            px={0}
            sx={{
              height: 18,
              marginTop: 3,
            }}
            orientation="vertical"
          />
          <Text ml={4} mt={1} color="dimmed" weight={400} size="xs">
            {read_time}
          </Text>
        </Group>
      </Stack>
      <Avatar
        radius="sm"
        sx={(theme) => ({
          [theme.fn.smallerThan(540)]: {
            height: 70,
            width: 70,
            minWidth: 70,
          },

          height: 90,
          width: 90,
          minWidth: 90,
        })}
      >
        <AfridiImage
          style={{
            borderRadius: "6px",
          }}
          path={cover}
          width={90}
          height={90}
        />
      </Avatar>
    </Group>
  );
};

export default AfridiHorizontalFeedArticleListItem;
