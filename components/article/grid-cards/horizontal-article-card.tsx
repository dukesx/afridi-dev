import {
  Group,
  type MantineTheme,
  Stack,
  Text,
  Card,
  Skeleton,
  ThemeIcon,
  ActionIcon,
  useMantineColorScheme,
  Tooltip,
  Indicator,
  Divider,
  Badge,
  Avatar,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useSessionContext } from "@supabase/auth-helpers-react";
import {
  IconAward,
  IconBolt,
  IconBookmark,
  IconBookmarks,
  IconCheck,
  IconEye,
  IconHeart,
  IconPencil,
  IconTrophy,
} from "@tabler/icons";
import { Fragment } from "react";
import { supabase } from "../../../utils/supabaseClient";
import AfridiImage from "../../global/afridi-image";
import { AfridiDevArticle } from "./large-article-card";

export enum CardStyle {
  DEFAULT,
  FEED,
  WIDGET,
}

interface HorizontalGridCardProps {
  theme: MantineTheme;
  style: CardStyle;
  data: AfridiDevArticle;
  coverClassName?: string;
  bookmarks?: Array<any>;
  setBookmarks?: Function;
  appreciations?: Array<any>;
}

const HorizontalGridCard: React.FC<HorizontalGridCardProps> = ({
  theme,
  style,
  data,
  coverClassName,
  setBookmarks,
  bookmarks,
  appreciations,
}) => {
  const awards = [
    {
      title: "trending",
    },
    {
      title: "loved",
    },
    {
      title: "editors-pick",
    },
    {
      title: "community-choice",
    },
  ];
  const { colorScheme } = useMantineColorScheme();
  const { session } = useSessionContext();
  return data ? (
    <Group noWrap className="w-full">
      <AfridiImage
        imageClassName={coverClassName}
        cover_base_64={data.cover_base_64 ? data.cover_base_64 : null}
        className="rounded-full"
        path={data.cover}
        width={style == CardStyle.FEED ? 90 : 100}
        height={
          style == CardStyle.WIDGET ? 100 : style == CardStyle.FEED ? 90 : 100
        }
        style={{
          borderRadius: theme.radius.sm,
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
            lineHeight: 1.8,
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
        <Group spacing="xs">
          {session && bookmarks && bookmarks.includes(data.id) ? (
            <Tooltip label="bookmarked">
              <ActionIcon
                onClick={async () => {
                  const { error } = await supabase
                    .from("bookmarks")
                    .delete()
                    .match({
                      author_id: session.user.id,
                      article_id: data.id,
                    });

                  if (!error) {
                    var bookmarksArr = [...bookmarks];
                    var newBookmarks = bookmarksArr.filter(
                      (mapped) => mapped !== data.id
                    );
                    setBookmarks(newBookmarks);
                  }
                }}
                color="gray"
                size="md"
                variant="light"
                radius="xl"
              >
                <IconBookmark
                  fill={
                    colorScheme == "dark"
                      ? theme.colors.gray[6]
                      : theme.colors.gray[4]
                  }
                  size={18}
                />
              </ActionIcon>
            </Tooltip>
          ) : session && bookmarks ? (
            <Tooltip label="bookmark this">
              <ActionIcon
                onClick={async () => {
                  const { error } = await supabase.from("bookmarks").insert({
                    article_id: data.id,
                    author_id: session.user.id,
                  });

                  if (!error) {
                    var bookmarksArr = [...bookmarks];
                    bookmarksArr.push(data.id);
                    setBookmarks(bookmarksArr);
                  }
                }}
                color="gray"
                size="md"
                variant="light"
                radius="xl"
              >
                <IconBookmark fill={"transparent"} size={18} />
              </ActionIcon>
            </Tooltip>
          ) : null}

          {appreciations && appreciations.length > 0 ? (
            <Fragment>
              <Divider
                className="h-[14px] align-middle my-auto"
                orientation="vertical"
                size={1}
              />
              <Tooltip
                label={`${appreciations.length} ${
                  appreciations.length > 1 ? "people" : "person"
                } appreciated it`}
              >
                <Group spacing="xs">
                  <ThemeIcon
                    radius="xl"
                    color="yellow"
                    size="sm"
                    variant="light"
                  >
                    <Text size="sm">👏</Text>
                  </ThemeIcon>

                  <Text color="dimmed" weight={700} size="xs">
                    {Intl.NumberFormat("en", {
                      notation: "compact",
                    }).format(appreciations.length)}
                  </Text>
                </Group>
              </Tooltip>
            </Fragment>
          ) : null}

          {data.article_views ? (
            <Fragment>
              <Divider
                className="h-[14px] align-middle my-auto"
                orientation="vertical"
                size={1}
              />

              <Group spacing="xs">
                <ThemeIcon variant="light" size="md" color="gray" radius="xl">
                  <IconEye size={16} />
                </ThemeIcon>
                <Text size="xs">
                  {Intl.NumberFormat("en", { notation: "compact" }).format(
                    data.article_views.length
                  )}
                </Text>
              </Group>
            </Fragment>
          ) : null}

          {data.editors_pick ? (
            <Fragment>
              <Divider
                className="h-[14px] align-middle my-auto"
                orientation="vertical"
                size={1}
              />
              <Tooltip
                label="Editor's Choice 🤓"
                position="bottom"
                mb="xl"
                ml="xl"
              >
                <ThemeIcon variant="light" color="yellow" radius="xl">
                  <Text size="sm">👍‍</Text>
                </ThemeIcon>
              </Tooltip>
            </Fragment>
          ) : null}
          <Fragment>
            {data.tags &&
            data.tags.filter((mapped) => mapped.title == "trending").length >
              0 ? (
              <Tooltip label="Trending">
                <Avatar
                  size="sm"
                  color="blue"
                  className="rounded-full"
                  radius="xl"
                >
                  <IconBolt size={18} />
                </Avatar>
              </Tooltip>
            ) : null}
          </Fragment>
        </Group>
      </Stack>
    </Group>
  ) : null;
};

export default HorizontalGridCard;
