/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Divider,
  Grid,
  Stack,
  Group,
  Text,
  Tooltip,
  Card,
  Skeleton,
  type MantineTheme,
  ActionIcon,
  useMantineColorScheme,
  Aside,
  ThemeIcon,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { IconBookmark, IconMessageCircle2 } from "@tabler/icons";
import { useEffect, useState } from "react";
import { ShowUnauthorizedModal } from "../../../utils/helpers";
import { AfridiDevAuthor } from "../../author/widgets/square-horizontal-author";
import AfridiImage from "../../global/afridi-image";

interface ArticleSidebarProps {
  data: {
    authors: AfridiDevAuthor;
    co_authors_articles: [{ authors: AfridiDevAuthor }];
  };
  theme: MantineTheme;
  id: string;
}

const ArticleRightSidebar = ({ data, theme, id }: ArticleSidebarProps) => {
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
    <Aside.Section>
      <Card className="w-full overflow-hidden px-0 bg-transparent">
        <Stack spacing={0} align="start">
          <Text pb="sm" color="dimmed" weight={400} size="xs">
            Your Feedback
          </Text>
          <Divider mb="md" className="w-full" />
          <Group spacing="lg">
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
            ) : (
              <Tooltip label="bookmark this">
                <ActionIcon
                  onClick={async () => {
                    if (session && session.user) {
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
                    } else {
                      ShowUnauthorizedModal();
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
            )}

            <Tooltip
              label={
                starred ? "Remove Appreciation" : "Appreciate the article!"
              }
            >
              <ActionIcon
                onClick={async () => {
                  if (session && session.user) {
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
                  } else {
                    ShowUnauthorizedModal();
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

            <Tooltip label="Comment">
              <ActionIcon
                component="a"
                href="#comments"
                size="xl"
                radius="xl"
                variant="subtle"
                color="blue"
              >
                <IconMessageCircle2 />
              </ActionIcon>
            </Tooltip>
          </Group>
        </Stack>
      </Card>

      <Text size="xs" mt="xl" weight={400} color="dimmed" mb="sm">
        Author&apos;s Section
      </Text>
      <Divider />
      <Card className="w-full pb-6 px-0 bg-transparent">
        <Group className="w-full" noWrap>
          <Tooltip
            mt="xl"
            label={data ? data.authors.full_name : "loading author"}
          >
            <Avatar
              size={60}
              className="rounded-full"
              component={NextLink}
              href={data ? `/author/${data.authors.id}` : ""}
              radius="xl"
              color="blue"
            >
              {data && data.authors.dp ? (
                <AfridiImage
                  loading="lazy"
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
              component={NextLink}
              href={`/author/${data && data.authors.id}`}
              lineClamp={1}
              mt={5}
              weight={700}
              size="xs"
            >
              {data ? data.authors.full_name : null}
            </Text>
            <Text size="xs" color="dimmed">
              Main Lead Author
            </Text>
          </Stack>
        </Group>
        <div className="">
          {data &&
          data.co_authors_articles &&
          data.co_authors_articles.length > 0 ? (
            <Divider
              py="xl"
              label="Co-Authors Section"
              labelPosition="center"
              color="gray"
              labelProps={{
                size: "xs",
              }}
            ></Divider>
          ) : null}
          <Grid>
            {data
              ? data.co_authors_articles.map((mapped, index) => (
                  <Grid.Col
                    my="sm"
                    span={12}
                    xs={6}
                    md={4}
                    key={"almac" + index}
                  >
                    <Stack align="initial" ml="xs" spacing={10}>
                      <Tooltip mt="xl" label={mapped.authors.full_name}>
                        <Avatar
                          size={50}
                          className="rounded-full"
                          component={NextLink}
                          href={data ? `/author/${mapped.authors.id}` : ""}
                          radius="xl"
                          color="blue"
                        >
                          {mapped && mapped.authors.dp ? (
                            <AfridiImage
                              loading="lazy"
                              height={63}
                              width={63}
                              path={mapped.authors.dp}
                            />
                          ) : (
                            <Skeleton height={50} width={50} />
                          )}
                        </Avatar>
                      </Tooltip>

                      <Text
                        className="text-left truncate"
                        component={NextLink}
                        href={mapped && `/author/${mapped.authors.id}`}
                        weight={700}
                        size="xs"
                      >
                        {mapped.authors.full_name}
                      </Text>
                    </Stack>
                  </Grid.Col>
                ))
              : null}
          </Grid>
        </div>
      </Card>
    </Aside.Section>
  );
};

export default ArticleRightSidebar;
