/* eslint-disable react-hooks/exhaustive-deps */
import {
  Aside,
  Badge,
  Box,
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
  ThemeIcon,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconArrowRight, IconBell, IconHash, IconNews } from "@tabler/icons";
import { useEffect, useState } from "react";
import AfridiImage from "../../components/global/afridi-image";
import MarkDownRenderer from "../../components/global/markdown-renderer";
import AppWrapper from "../../components/global/wrapper";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { supabase } from "../../utils/supabaseClient";
import ArticleRightSidebar from "../../components/article/components/sidebar";
import NumberedArticlesWidget from "../../components/article/widgets/numbered-articles";
import { NextLink } from "@mantine/next";

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
  const { supabaseClient } = useSessionContext();

  useEffect(() => {
    setData(article);
  }, [article]);

  const addViewCount = async () => {
    //
    const { data: returnedData, error } = await supabaseClient
      .from("article_views")
      .insert({
        article_id: article.id,
      });
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
      var art = mapped.articles.map((mapped2) => {
        if (mapped2.id !== data.id) {
          relatedArticles.push(mapped2);
        }
      });
    });

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
        width={{ xs: 250, sm: 300, md: 300, lg: 300 }}
      >
        <Aside.Section>
          <ArticleRightSidebar id={data && data.id} data={data} theme={theme} />
        </Aside.Section>
      </Aside>

      <Box mt={50} className={classes.mainContent}>
        <MarkDownRenderer>{article && article.body}</MarkDownRenderer>
      </Box>
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
    .limit(5, {
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
