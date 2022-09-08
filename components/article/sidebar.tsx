/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Button,
  Divider,
  Grid,
  Stack,
  Group,
  Text,
  Input,
  Tooltip,
  Card,
  Skeleton,
  Switch,
  type MantineTheme,
  ActionIcon,
  useMantineColorScheme,
  ThemeIcon,
  HoverCard,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useSessionContext } from "@supabase/auth-helpers-react";
import {
  IconBellRinging,
  IconBookmark,
  IconInfoCircle,
  IconMedal,
  IconMedal2,
  IconStar,
} from "@tabler/icons";
import { Fragment, Suspense, useEffect, useState } from "react";
import AfridiImage from "../global/afridi-image";
import SquareHorizontalWidget from "../landing/widgets/square-horizontal";

export type AfridiDevAuthor = {
  firstName: string;
  lastName: string;
  dp: string;
  cover?: string;
  id: string;
};

interface ArticleSidebarProps {
  data: {
    authors: AfridiDevAuthor;
    co_authors_articles: [{ authors: AfridiDevAuthor }];
  };
  theme: MantineTheme;
  flipSidebarOrientation: boolean;
  setFlipSidebarOrientation: (data: boolean) => void;
  id: string;
}

const ArticleSidebar = ({
  data,
  theme,
  id,
  flipSidebarOrientation,
  setFlipSidebarOrientation,
}: ArticleSidebarProps) => {
  const { session, isLoading, supabaseClient } = useSessionContext();
  const [bookmarks, setBookmarks] = useState([]);
  const { colorScheme } = useMantineColorScheme();
  const [starred, setStarred] = useState(false);

  const getUserBookmarks = async () => {
    const { data, error } = await supabaseClient
      .from("authors")
      .select(
        `
      bookmarks (
        article_id
      )
    `
      )
      .eq("id", session.user.id);
    console.log(data[0]);
    var bookmarksArray = [];
    //@ts-ignore
    data[0].bookmarks.map((mapped) => bookmarksArray.push(mapped.article_id));
    //@ts-ignore
    setBookmarks(bookmarksArray);
  };

  const getUserStars = async () => {
    const { error, data, count } = await supabaseClient
      .from("appreciations")
      .select("id", {
        count: "exact",
      })
      .eq("reacted_article", id)
      .eq("reacted_author", session.user.id);

    if (count == 1) {
      setStarred(true);
    }
  };

  useEffect(() => {
    if (session) {
      getUserBookmarks();
      getUserStars();
    }
  }, [isLoading]);
  return (
    <Fragment>
      <Card withBorder className="w-full">
        <Stack align="start">
          <Text weight={700} size="lg">
            Your Feedback <span className="ml-2">😊 👇</span>
          </Text>
          <Group spacing="lg" className="pt-3">
            {session && bookmarks && bookmarks.includes(id) ? (
              <Tooltip label="bookmarked">
                <ActionIcon
                  onClick={async () => {
                    const { error } = await supabaseClient
                      .from("bookmarks")
                      .delete()
                      .match({
                        author_id: session.user.id,
                        article_id: id,
                      });

                    if (!error) {
                      var bookmarksArr = [...bookmarks];
                      var newBookmarks = bookmarksArr.filter(
                        (mapped) => mapped !== id
                      );
                      setBookmarks(newBookmarks);
                    }
                  }}
                  color="gray"
                  size="xl"
                  variant="light"
                  radius="xl"
                >
                  <IconBookmark
                    fill={
                      colorScheme == "dark"
                        ? theme.colors.gray[6]
                        : theme.colors.gray[4]
                    }
                    size={22}
                  />
                </ActionIcon>
              </Tooltip>
            ) : session && bookmarks ? (
              <Tooltip label="bookmark this">
                <ActionIcon
                  onClick={async () => {
                    const { error } = await supabaseClient
                      .from("bookmarks")
                      .insert({
                        article_id: id,
                        author_id: session.user.id,
                      });

                    if (!error) {
                      var bookmarksArr = [...bookmarks];
                      bookmarksArr.push(id);
                      setBookmarks(bookmarksArr);
                    }
                  }}
                  color="gray"
                  size="xl"
                  variant="light"
                  radius="xl"
                >
                  <IconBookmark fill={"transparent"} size={22} />
                </ActionIcon>
              </Tooltip>
            ) : null}

            {session ? (
              <Tooltip
                label={
                  starred ? "Remove Appreciation" : "Appreciate the article!"
                }
              >
                <ActionIcon
                  onClick={async () => {
                    if (starred) {
                      const { error } = await supabaseClient
                        .from("appreciations")
                        .delete()
                        .match({
                          reacted_author: session.user.id,
                          reacted_article: id,
                        });
                      if (!error) {
                        setStarred(false);
                      }
                    } else {
                      const { error } = await supabaseClient
                        .from("appreciations")
                        .insert({
                          reacted_author: session.user.id,
                          reacted_article: id,
                        });

                      if (!error) {
                        setStarred(true);
                      }
                    }
                  }}
                  radius="xl"
                  className="cursor-pointer"
                  color="yellow"
                  variant={starred ? "light" : "subtle"}
                  size="xl"
                >
                  <Text size="xl">👏</Text>
                </ActionIcon>
              </Tooltip>
            ) : null}
          </Group>
        </Stack>
      </Card>
      <Card mt="xl" className="w-full pb-2" withBorder>
        <Group className="w-full items-center xs:justify-center md:justify-start">
          <Tooltip
            mt="xl"
            label={
              data
                ? data.authors.firstName + " " + data.authors.lastName
                : "loading author"
            }
          >
            <Avatar
              size={60}
              className="rounded-full"
              component={NextLink}
              href={data ? `/author/${data.authors.id}` : ""}
              radius="xl"
              color="blue"
            >
              {data ? (
                <AfridiImage
                  fillImage
                  height={63}
                  width={63}
                  path={data ? data.authors.dp : null}
                />
              ) : (
                <Skeleton height={50} width={50} />
              )}
            </Avatar>
          </Tooltip>
          <Stack className="md:mr-auto sm:mr-0" spacing={0}>
            <Text
              lineClamp={1}
              className="max-w-[130px]"
              mt={5}
              weight={700}
              size="xs"
            >
              {data
                ? data.authors.firstName + " " + data.authors.lastName
                : null}
            </Text>
            <Text size="xs" color="dimmed">
              Main Lead Author
            </Text>
          </Stack>
        </Group>
        <div className="hidden sm:block">
          {data &&
          data.co_authors_articles &&
          data.co_authors_articles.length > 0 ? (
            <Divider
              py="xl"
              label="Co-Authors Section"
              labelPosition="center"
              color="gray"
            ></Divider>
          ) : null}
          <Grid>
            {data
              ? data.co_authors_articles.map((mapped, index) => (
                  <Grid.Col my="sm" span={12} xs={6} key={"almac" + index}>
                    <Stack align="initial" ml="xs" spacing={10}>
                      <Tooltip
                        mt="xl"
                        label={
                          mapped.authors.firstName + " " + data.authors.lastName
                        }
                      >
                        <Avatar
                          size={50}
                          className="rounded-full"
                          component={NextLink}
                          href={data ? `/author/${mapped.authors.id}` : ""}
                          radius="xl"
                          color="blue"
                        >
                          {data ? (
                            <AfridiImage
                              fillImage
                              height={63}
                              width={63}
                              path={mapped.authors.dp}
                            />
                          ) : (
                            <Skeleton height={50} width={50} />
                          )}
                        </Avatar>
                      </Tooltip>

                      <Text weight={700} size="xs">
                        {mapped.authors.firstName +
                          " " +
                          mapped.authors.lastName}
                      </Text>

                      {/* <Button
                        className="px-0 w-[120px] mx-auto"
                        rightIcon={<IconBellRinging size={18} />}
                        size="xs"
                        radius="xl"
                      >
                        Subscribe
                      </Button> */}
                    </Stack>
                  </Grid.Col>
                ))
              : null}
          </Grid>
        </div>
      </Card>
      <Card className="w-full h-[70px]" withBorder>
        <Group position="apart">
          <Input.Wrapper
            label={
              <Text size="sm">
                Switch sidebar side
                <Tooltip label="Click to learn more">
                  <Text component="a" href="#">
                    <IconInfoCircle
                      size={18}
                      className="align-sub ml-1"
                      color="gray"
                    />
                  </Text>
                </Tooltip>
              </Text>
            }
            description="to ease eye travel 👀"
          >
            {}
          </Input.Wrapper>
          <Switch
            size="xl"
            onLabel="Left"
            offLabel="Right"
            checked={flipSidebarOrientation}
            styles={{
              label: {},
              input: {
                width: !flipSidebarOrientation ? 74 : 65,
              },
            }}
            onChange={() => setFlipSidebarOrientation(!flipSidebarOrientation)}
          />
        </Group>
      </Card>
      <Suspense>
        <SquareHorizontalWidget
          theme={theme}
          icon={"✅"}
          title="Similar Articles"
          color="indigo"
          data={[]}
        />
      </Suspense>
    </Fragment>
  );
};

export default ArticleSidebar;