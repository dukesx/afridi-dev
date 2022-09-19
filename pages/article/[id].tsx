/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  Aside,
  Avatar,
  Box,
  Button,
  Center,
  Container,
  createStyles,
  Divider,
  Grid,
  Group,
  MediaQuery,
  Navbar,
  ScrollArea,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import {
  IconAward,
  IconBolt,
  IconEdit,
  IconHash,
  IconHeart,
  IconInfinity,
  IconNews,
  IconPencil,
  IconPencilPlus,
  IconTrophy,
} from "@tabler/icons";
import { useRouter } from "next/router";
import { useEffect, useState } from "react";
import AfridiImage from "../../components/global/afridi-image";
import MarkDownRenderer from "../../components/global/markdown-renderer";
import AppWrapper from "../../components/global/wrapper";
import { useLocalStorage } from "@mantine/hooks";
import ArticleSidebar from "../../components/article/sidebar";
import { getPlaiceholder } from "plaiceholder";

import {
  useSessionContext,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "../../utils/supabaseClient";
import ArticleRightSidebar from "../../components/article/sidebar";
import HorizontalGridCard, {
  CardStyle,
} from "../../components/article/grid-cards/horizontal-article-card";
import HorizontalArticleGridCard from "../../components/article/grid-cards/horizontal-article-card";
import SquareHorizontalArticleWidget from "../../components/landing/widgets/articles/square-horizontal-article";

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
  const router = useRouter();
  const theme = useMantineTheme();
  const [flipSidebarOrientation, setFlipSidebarOrientation] = useLocalStorage({
    key: "article-sidebar-orientation",
    defaultValue: false,
  });
  const { isLoading, session, error, supabaseClient } = useSessionContext();

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

              <Text lineClamp={4} mt="xl" color="dimmed">
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
          <ArticleRightSidebar
            id={data && data.id}
            data={data}
            flipSidebarOrientation={flipSidebarOrientation}
            setFlipSidebarOrientation={setFlipSidebarOrientation}
            theme={theme}
          />
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
          <Group position="apart" mt="xs" mx="sm">
            <Text color="cyan.5" weight={500} size="sm">
              Similar Articles
            </Text>
            <ThemeIcon
              className="rounded-full"
              radius="xl"
              size="lg"
              color="cyan"
              variant="light"
            >
              <IconHash size={16} />
            </ThemeIcon>
          </Group>
          <Divider mt="xs" color="cyan.4" />

          <Navbar.Section
            mt="xl"
            grow
            className="h-[400px]"
            component={ScrollArea}
          >
            <Stack>
              {data.tags.map((mapped1, index) => {
                return mapped1.articles.map((mapped2, index2) => {
                  if (mapped2.id !== data.id) {
                    return (
                      <Group key={"abox" + index2} mx="sm" noWrap>
                        <Text size="xl" weight={800} color="gray.4">
                          {index + 1}
                        </Text>
                        <Divider className="min-w-[20px]" />
                        <HorizontalArticleGridCard
                          data={mapped2}
                          titleClamp={2}
                          theme={theme}
                          style={CardStyle.WIDGET}
                        />
                      </Group>
                    );
                  }
                });
              })}
            </Stack>
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
        articles (
        id,
        title,
        description,
        cover,
        body,
        editors_pick,
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

    console.log(newData[0].tags);

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
