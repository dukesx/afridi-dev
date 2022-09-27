/* eslint-disable react-hooks/exhaustive-deps */
import {
  Aside,
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
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconNews } from "@tabler/icons";
import { useEffect, useRef, useState } from "react";
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

//
//
//
const styles = createStyles((theme, _params, getRef) => ({
  mainContent: {
    width: "100%",
    marginLeft: theme.spacing.sm,
    paddingRight: theme.spacing.xs,
    [`@media (min-width: ${theme.breakpoints.md}px)`]: {
      // width: "calc(100% - 300px)",
    },
  },
}));

const Article = ({ article, tags }) => {
  const { classes } = styles();
  const [data, setData] = useState(article);
  const theme = useMantineTheme();
  const { supabaseClient, session } = useSessionContext();
  const [comments, setComments] = useState(null);
  const [editorDrawer, setEditorDrawer] = useState(false);
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
        firstName,
        lastName,
        dp
       ),

       replies (
        id,
        body,
        created_at,
        authors (
        id,
        firstName,
        lastName,
        dp
        )
       )
      `
      )
      .eq("article_id", article.id);

    setComments(data);
  };

  useEffect(() => {
    getComments();
  }, []);

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
    <AppWrapper activeHeaderKey="" size="xl">
      <Container className="px-0 sm:px-5" size="lg">
        <Stack spacing="xs" className={classes.mainContent}>
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

          <Center className="xl:h-full xs:items-baseline xs:justify-start">
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

              <Group mt="sm">
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
            </Stack>
          </Center>
        </Stack>
      </Container>
      <Stack>
        <Aside
          hiddenBreakpoint="xs"
          hidden
          height={600}
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
              id={data && data.id}
              data={data}
              theme={theme}
            />
          </Aside.Section>
        </Aside>
        <Box mt={50} className={classes.mainContent}>
          <MarkDownRenderer>{article && article.body}</MarkDownRenderer>
        </Box>
        <Divider />
        <Stack mt="xs" className="pb-10 pl-5">
          <Group position="apart" spacing="xs" mb="sm">
            <Title id="comments" order={2}>
              Comments
            </Title>

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
            height={600}
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
        cover,
        body,
        editors_pick,
        author_id,
        views,
        authors!articles_author_id_fkey (
            id,
            firstName,
            lastName,
            dp
        ),
        co_authors_articles (
        authors (
            id,
            firstName,
            lastName,
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
  const { data, error } = await supabase.from("articles").select("id");

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
