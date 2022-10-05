/* eslint-disable react-hooks/exhaustive-deps */
import {
  Aside,
  Avatar,
  Badge,
  Box,
  Button,
  Center,
  Container,
  createStyles,
  Divider,
  Group,
  MediaQuery,
  Navbar,
  ScrollArea,
  Skeleton,
  Stack,
  Tooltip,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
  ActionIcon,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconBookmark,
  IconClock,
  IconLink,
  IconNews,
  IconShare,
} from "@tabler/icons";
import { Fragment, useEffect, useRef, useState } from "react";
import AfridiImage from "../../components/global/afridi-image";
import MarkDownRenderer from "../../components/global/markdown-renderer";
import AppWrapper from "../../components/global/wrapper";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { supabase } from "../../utils/supabaseClient";
import ArticleRightSidebar from "../../components/article/components/sidebar";
import NumberedArticlesWidget from "../../components/article/widgets/numbered-articles";
import { NextLink } from "@mantine/next";
import ArticleComments from "../../components/article/components/comments/comments";
import ArticleCommentEditorDrawer from "../../components/article/components/comments/editor-drawer";
import { useScrollIntoView } from "@mantine/hooks";
import LazyLoad from "react-lazy-load";
import { ArticleJsonLd, BreadcrumbJsonLd, NextSeo } from "next-seo";
import { format } from "date-fns";
import { ShowUnauthorizedModal } from "../../utils/helpers";

//
//
//
const styles = createStyles((theme, _params, getRef) => ({
  mainContent: {
    width: "100%",
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      // width: "calc(100% - 300px)",
    },
  },
}));

const Article = ({ article, tags }) => {
  const { classes } = styles();
  const [data, setData] = useState(article);
  const theme = useMantineTheme();
  const { supabaseClient, session, isLoading } = useSessionContext();
  const [comments, setComments] = useState(null);
  const [editorDrawer, setEditorDrawer] = useState(false);
  const [bookmarks, setBookmarks] = useState([]);
  const { colorScheme } = useMantineColorScheme();
  const [starred, setStarred] = useState(false);

  var ref = useRef<any>();
  const [commentId, setCommentId] = useState(null);

  const { scrollIntoView: scrollToComment, targetRef: targetComment } =
    useScrollIntoView<HTMLDivElement>({
      offset: 30,
      easing: (t) =>
        t < 0.5 ? 16 * t * t * t * t * t : 1 - Math.pow(-2 * t + 2, 5) / 2,
    });

  useEffect(() => {
    setData(article);
  }, [article]);

  const setCommentEditorRef = (refer: any) => {
    ref = refer;
  };

  const getComments = async () => {
    const { error, data } = await supabaseClient
      .from("comments")
      .select(
        `
       id,
       created_at,
       body,
       authors (
        id,
        full_name,
        dp
       ),

       replies (
        id,
        body,
        created_at,
        authors (
        id,
        full_name,
        dp
        )
       )
      `
      )
      .eq("article_id", article.id)
      .order("created_at", {
        ascending: false,
      })
      .order("created_at", {
        ascending: false,
        foreignTable: "replies",
      });

    setComments(data);
  };

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
      .eq("reacted_article", article.id)
      .eq("reacted_author", session.user.id);

    if (count == 1) {
      setStarred(true);
    }
  };

  useEffect(() => {
    getComments();
    if (session) {
      getUserBookmarks();
      getUserStars();
    }
  }, [isLoading]);

  const addViewCount = async () => {
    //
    const { data: returnedData, error } = await supabaseClient
      .from("article_views")
      .insert({
        article_id: article.id,
      });
    const update = await fetch("/api/updateViews", {
      method: "POST",
      headers: {
        "content-type": "application/json",
      },
      body: JSON.stringify({
        views: article.views,
        id: article.id,
      }),
    });

    const data = await update.json();

    //
  };

  useEffect(() => {
    setTimeout(() => {
      addViewCount();
    }, 10000);
  }, []);

  var relatedArticles = [];

  article &&
    article.tags.map((mapped) => {
      mapped.articles.map((mapped2) => {
        if (mapped2.id !== data.id) {
          var filtered = relatedArticles.filter(
            (filtera) => filtera.id == mapped2.id
          );
          if (filtered.length == 0) {
            relatedArticles.push(mapped2);
          }
        }
      });
    });

  const getMarkdown = () => {
    return ref.current.getInstance().getMarkdown() as string;
  };

  return (
    <AppWrapper noPadding activeHeaderKey="" size="xl">
      {article ? (
        <Fragment>
          <NextSeo
            openGraph={{
              title: article.title ?? "",
              description: article.description ?? "",
              url: `https://afridi.dev/article/${article.id ?? ""}`,
              type: "article",
              article: {
                publishedTime: article.created_at ?? "",
                modifiedTime: article.updated_at ?? "",
                authors: [
                  `https://afridi.dev/author/${article.authors.id ?? ""}`,
                  ...article.co_authors_articles.map(
                    (mapped) =>
                      `https://afridi.dev/author/${mapped.authors.id ?? ""}`
                  ),
                ],
                tags: [...article.tags.map((mapped) => mapped.title)],
              },
              images: [
                {
                  url: `https://afridi.dev/api/generate-cover/article/${article.id}`,
                  width: 400,
                  height: 400,
                  alt: "Cover of article",
                },
              ],
            }}
          />
          <BreadcrumbJsonLd
            itemListElements={[
              {
                position: 1,
                name: "Home",
                item: "https://afridi.dev",
              },
              {
                position: 2,
                name: article.title ?? "",
                item: `https://afridi.dev/article/${article.id ?? ""}`,
              },
            ]}
          />
          <ArticleJsonLd
            url={`https://afridi.dev/article/${article.id ?? ""}`}
            title={article.title ?? ""}
            description={article.description ?? ""}
            images={[
              `https://ik.imagekit.io/afrididev/tr:w-400/${
                article.cover ?? ""
              }`,
            ]}
            datePublished={article.created_at ?? ""}
            dateModified={article.updated_at ?? ""}
            authorName={[
              {
                name: article.authors.full_name,
                url: `https://afridi.dev/author/${article.authors.id ?? ""}`,
              },
              ...article.co_authors_articles.map((mapped) => {
                return {
                  name: mapped.authors.full_name,
                  url: `https://afridi.dev/author/${mapped.authors.id ?? ""}`,
                };
              }),
            ]}
            publisherName="Afridi.dev"
            publisherLogo="https://www.example.com/photos/logo.jpg"
          />
        </Fragment>
      ) : null}
      <Container className="px-0 sm:px-[12px]" size="lg">
        <Stack spacing="xs" className={classes.mainContent}>
          {article && (
            <Group pr="xs" className="xs:hidden" position="apart" noWrap>
              <Group pl="xs" pb="xl" pt="xs" className="w-full" noWrap>
                <Tooltip mt="xl" label={article.authors.full_name}>
                  <Avatar
                    size={60}
                    className="rounded-full"
                    component={NextLink}
                    href={article ? `/author/${article.authors.id}` : ""}
                    radius="xl"
                    color="blue"
                  >
                    {article.authors.dp ? (
                      <AfridiImage
                        loading="lazy"
                        height={70}
                        width={70}
                        path={article.authors.dp}
                      />
                    ) : (
                      <Skeleton height={50} width={50} />
                    )}
                  </Avatar>
                </Tooltip>
                <Stack className="md:mr-auto sm:mr-0" spacing={2}>
                  <Text
                    component={NextLink}
                    href={`/author/${article.authors.id}`}
                    lineClamp={1}
                    weight={700}
                    size="sm"
                  >
                    {article.authors.full_name}
                  </Text>
                  <Group spacing={0}>
                    <Text size="xs" color="dimmed">
                      {format(new Date(article.created_at), "MMM dd")}
                    </Text>
                    <Divider className="w-[10px]" mx="xs" />
                    <Text size="xs" color="dimmed">
                      {article.read_time} read
                    </Text>
                  </Group>
                </Stack>
              </Group>

              <Group spacing="sm" noWrap>
                <Tooltip label="Share article">
                  <ActionIcon
                    onClick={async () => {
                      const shareData = {
                        title: `${article.title} | Afridi.dev`,
                        text: article.description,
                        url: `https://afridi.dev/article/${article.id}`,
                      };
                      await navigator.share(shareData);
                    }}
                    radius="xl"
                    size="lg"
                  >
                    <IconShare size={22} />
                  </ActionIcon>
                </Tooltip>
                {session && bookmarks && bookmarks.includes(article.id) ? (
                  <Tooltip label="bookmarked">
                    <ActionIcon
                      onClick={async () => {
                        const { error } = await supabaseClient
                          .from("bookmarks")
                          .delete()
                          .match({
                            author_id: session.user.id,
                            article_id: article.id,
                          });

                        if (!error) {
                          var bookmarksArr = [...bookmarks];
                          var newBookmarks = bookmarksArr.filter(
                            (mapped) => mapped !== article.id
                          );
                          setBookmarks(newBookmarks);
                        }
                      }}
                      color="gray"
                      size="lg"
                      variant="light"
                      radius="xl"
                    >
                      <IconBookmark
                        fill={
                          colorScheme == "dark"
                            ? theme.colors.gray[6]
                            : theme.colors.gray[4]
                        }
                        size={24}
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
                              article_id: article.id,
                              author_id: session.user.id,
                            });

                          if (!error) {
                            var bookmarksArr = [...bookmarks];
                            bookmarksArr.push(article.id);
                            setBookmarks(bookmarksArr);
                          }
                        } else {
                          ShowUnauthorizedModal();
                        }
                      }}
                      color="gray"
                      size="lg"
                      radius="xl"
                    >
                      <IconBookmark fill={"transparent"} size={24} />
                    </ActionIcon>
                  </Tooltip>
                )}
              </Group>
            </Group>
          )}

          <Skeleton
            className="w-full rounded-none sm:rounded-lg mx-auto h-full sm:h-full lg:h-[550px] xl:max-h-[600px] sm:max-h-[600px]"
            visible={!data}
            height={300}
            width={300}
          >
            {data ? (
              <AfridiImage
                // isResponsive
                cover_base_64={data.cover_base_64}
                fillImage={true}
                path={data ? data.cover : null}
                height={400}
                width={300}
                priority
                className="h-full md:w-full"
              />
            ) : null}
          </Skeleton>

          <Center className="xl:h-full xs:items-baseline xs:justify-start px-[16px] sm:px-0">
            <Stack className="my-auto w-full">
              <Title
                mt="xl"
                order={1}
                className="text-2xl xs:text-xl md:text-[34px] sm:text-[30px] !leading-normal"
              >
                {data ? (
                  data.title
                ) : (
                  <Stack mt="xl">
                    <Skeleton height={40} className="w-full max-w-[800px]" />
                    <Skeleton height={40} className="w-full max-w-[400px]" />
                  </Stack>
                )}
              </Title>

              <Text mt="sm" lineClamp={4} color="dimmed">
                {data ? (
                  data.description
                ) : (
                  <Stack mb="xl">
                    <Skeleton height={20} className="w-full max-w-[800px]" />
                    <Skeleton height={20} className="w-full max-w-[400px]" />
                    <Skeleton height={20} className="w-full max-w-[400px]" />
                  </Stack>
                )}
              </Text>

              <Group mr="xs" position="apart" mt="sm">
                <Group>
                  {article &&
                    article.tags.map((mapped) => (
                      <Badge
                        variant="dot"
                        component={NextLink}
                        href={`/tags/${mapped.title}`}
                        className="capitalize font-semibold cursor-pointer"
                        color={mapped.color ?? "gray"}
                        key={mapped.color + mapped.title}
                      >
                        {mapped.title}
                      </Badge>
                    ))}
                </Group>
              </Group>
            </Stack>
          </Center>
        </Stack>
      </Container>
      {article && (
        <Stack>
          <Aside
            hiddenBreakpoint="xs"
            hidden
            height={"auto"}
            p="md"
            zIndex={50}
            styles={{
              root: {
                zIndex: 50,
              },
            }}
            width={{ xs: 220, sm: 300, md: 300, lg: 300 }}
          >
            <Aside.Section>
              <ArticleRightSidebar
                title={article.title}
                description={article.description}
                id={data && data.id}
                starred={starred}
                setStarred={setStarred}
                bookmarks={bookmarks}
                setBookmarks={setBookmarks}
                data={data}
                theme={theme}
              />
            </Aside.Section>
          </Aside>
          <Box mt={50} className={classes.mainContent + " px-[12px]"}>
            <MarkDownRenderer>{article && article.body}</MarkDownRenderer>
          </Box>
          <Divider />
          <Stack mt="xs" className="pb-10 pl-5">
            <Group position="apart" spacing="xs" mb="sm">
              <Title id="comments" order={2}>
                Comments
              </Title>
              {session && session.user ? (
                <Button
                  onClick={() => {
                    setCommentId({
                      type: "comment",
                    });
                    setEditorDrawer(true);
                  }}
                  variant="light"
                  size="xs"
                  radius="xl"
                  color="blue"
                >
                  Write a comment
                </Button>
              ) : null}
            </Group>
            <LazyLoad>
              <ArticleComments
                getComments={getComments}
                coAuthors={article && article.co_authors_articles}
                author_id={article && article.author_id}
                openCommentEditor={setEditorDrawer}
                comments={comments ?? []}
                setCommentId={setCommentId}
              />
            </LazyLoad>
            <div ref={targetComment} />
          </Stack>

          <ArticleCommentEditorDrawer
            article_id={article && article.id}
            article_title={article && article.title}
            commentId={commentId}
            editorDrawer={editorDrawer}
            setEditorDrawer={setEditorDrawer}
            getComments={getComments}
            getMarkdown={getMarkdown}
            session={session}
            setCommentEditorRef={setCommentEditorRef}
            setCommentId={setCommentId}
            supabaseClient={supabaseClient}
            scrollToComment={scrollToComment}
          />

          <MediaQuery smallerThan="md" styles={{ display: "none" }}>
            <Navbar
              hiddenBreakpoint="md"
              hidden={true}
              height={"auto"}
              p="xs"
              width={{ sm: 0, md: 250, lg: 350 }}
            >
              <Navbar.Section
                mt="xl"
                grow
                className="h-[400px]"
                component={ScrollArea}
              >
                <NumberedArticlesWidget
                  titleOrder={4}
                  title="Similar Articles"
                  placeholderHeight={140}
                  icon={<IconNews />}
                  color="blue"
                  placeholderTitle="Hmmm!"
                  placeholderDescription="No similar articles yet 🤔"
                  theme={theme}
                  articles={relatedArticles ?? []}
                />
              </Navbar.Section>
            </Navbar>
          </MediaQuery>
        </Stack>
      )}
    </AppWrapper>
  );
};

export default Article;

export const getStaticProps = async (ctx) => {
  var id = ctx.params.id;
  const { data, error } = await supabase
    .from("articles")
    .select(
      `
        id,
        title,
        description,
        read_time,
        cover,
        updated_at,
        created_at,
        body,
        editors_pick,
        author_id,
        views,
        authors!articles_author_id_fkey (
            id,
            full_name,
            dp
        ),
        co_authors_articles (
        authors (
            id,
            full_name,
            dp
        )
        ),
        tags (
        title,
        color,
        articles (
        id,
        title,
        description,
        cover,
        body,
        author_id,
        views
          )
        )
    `
    )
    .eq("id", id)
    .limit(4, {
      foreignTable: "tags.articles",
    });

  if (data) {
    var newData = await Promise.all(
      data.map(async (mapped) => {
        var res = await fetch(
          `${process.env.NEXT_PUBLIC_FUNCTIONS_URL}/upload/image/generate-placeholder`,
          {
            headers: {
              "content-type": "application/json",
            },
            method: "POST",
            body: JSON.stringify({
              cover: mapped.cover,
            }),
          }
        );

        var data = await res.json();
        return {
          ...mapped,
          cover_base_64: data.placeholder,
        };
      })
    );

    return {
      props: {
        article: newData[0],
        tags: data[0].tags,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};

export const getStaticPaths = async () => {
  const { data, error } = await supabase
    .from("articles")
    .select("id")
    .limit(10);

  var ids = [];

  data.map((mapped) =>
    ids.push({
      params: {
        id: mapped.id,
      },
    })
  );

  return {
    paths: ids,
    fallback: true,
  };
};
