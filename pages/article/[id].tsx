/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  Avatar,
  Button,
  Center,
  Container,
  Grid,
  Group,
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
  IconHeart,
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
import {
  useSessionContext,
  useSupabaseClient,
  useUser,
} from "@supabase/auth-helpers-react";
import { SupabaseClient } from "@supabase/supabase-js";
import { supabase } from "../../utils/supabaseClient";

const Article = ({ article, tags }) => {
  const [data, setData] = useState(article);
  const router = useRouter();
  const theme = useMantineTheme();
  const [flipSidebarOrientation, setFlipSidebarOrientation] = useLocalStorage({
    key: "article-sidebar-orientation",
    defaultValue: false,
  });
  const { isLoading, session, error, supabaseClient } = useSessionContext();

  const addViewCount = async () => {
    const { data, error } = await supabaseClient
      .from("articles")
      .update({
        views: article.views + 1,
      })
      .eq("id", article.id)
      .select();
  };

  useEffect(() => {
    setTimeout(() => {
      addViewCount();
    }, 10000);
  }, []);

  return (
    <AppWrapper activeHeaderKey="" size="xl">
      <Container className="px-0 sm:px-5" size="lg">
        <Grid mt="xl" className="mt-0 sm:mt-10">
          <Grid.Col
            className="mx-auto pt-0 pr-0"
            span={12}
            lg={6}
            md={6}
            sm={6}
            xs={6}
            xl={6}
          >
            <Skeleton
              className="w-full rounded-none sm:rounded-lg mx-auto h-full sm:h-full lg:h-[550px] xl:max-h-[600px] sm:max-h-[600px]"
              visible={!data}
              height={600}
              width={600}
            >
              {data ? (
                <AfridiImage
                  fillImage={true}
                  path={data ? data.cover : null}
                  height={500}
                  width={500}
                  className="h-full md:w-full"
                />
              ) : null}
            </Skeleton>
          </Grid.Col>

          <Grid.Col
            className="mx-auto"
            span={12}
            xl={6}
            lg={5}
            md={6}
            sm={6}
            xs={6}
          >
            <Center className="xl:h-full xs:items-baseline xs:justify-start">
              <Stack className="mx-5  sm:ml-10 md:ml-14 lg:ml-5 xl:ml-14 my-auto w-full">
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
                  <Group>
                    {session && session.user ? (
                      article.author_id == session.user.id ||
                      (article.co_authors_articles.length > 0 &&
                        article.co_authors_articles.filter(
                          (mapped) => mapped.authors.id == session.user.id
                        ).length > 0) ? (
                        <Tooltip label="Edit article">
                          <ActionIcon
                            radius="xl"
                            onClick={() =>
                              router.push(`/article/edit/${article.id}`)
                            }
                            mt="xl"
                            size="xl"
                            variant="light"
                            color="indigo"
                            className="align-middle"
                          >
                            <IconEdit size={20} />
                          </ActionIcon>
                        </Tooltip>
                      ) : null
                    ) : null}

                    {data && data.editors_pick ? (
                      <Tooltip
                        label="Editor's Choice 🤓"
                        position="bottom"
                        mb="xl"
                        ml="xl"
                      >
                        <ThemeIcon
                          className="cursor-help"
                          mt="xl"
                          size="xl"
                          variant="light"
                          color="yellow"
                          radius="xl"
                        >
                          <Text size="xl">👍‍</Text>
                        </ThemeIcon>
                      </Tooltip>
                    ) : null}
                  </Group>
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

                <Group mt="lg">
                  <Text size="sm" color="dimmed" weight={600}>
                    Lead Author:
                  </Text>

                  <Tooltip
                    label={
                      data
                        ? data.authors.firstName + " " + data.authors.lastName
                        : "loading author"
                    }
                  >
                    <Avatar
                      className="rounded-full"
                      component={NextLink}
                      href={data ? `/author/${data.authors.id}` : ""}
                      radius="xl"
                      color="blue"
                      size={40}
                    >
                      {data ? (
                        <AfridiImage
                          fillImage
                          height={43}
                          width={43}
                          path={data.authors.dp}
                        />
                      ) : (
                        <Skeleton height={50} width={50} />
                      )}
                    </Avatar>
                  </Tooltip>
                </Group>
                {data && data.co_authors_articles.length > 0 ? (
                  <Group>
                    <Text size="sm" color="dimmed" weight={600}>
                      In Collaboration With:
                    </Text>
                    <Avatar.Group className="align-middle">
                      {data
                        ? data.co_authors_articles.length > 0
                          ? data.co_authors_articles.map((mapped, index) => (
                              <Tooltip
                                key={index + "alma"}
                                label={
                                  data
                                    ? mapped.authors.firstName +
                                      " " +
                                      mapped.authors.lastName
                                    : "loading author"
                                }
                              >
                                <Avatar
                                  size={40}
                                  component={NextLink}
                                  href={
                                    mapped ? `/author/${mapped.authors.id}` : ""
                                  }
                                  radius="xl"
                                  color="blue"
                                >
                                  {data ? (
                                    <AfridiImage
                                      fillImage
                                      height={43}
                                      width={43}
                                      path={mapped.authors.dp}
                                    />
                                  ) : (
                                    <Skeleton height={50} width={50} />
                                  )}
                                </Avatar>
                              </Tooltip>
                            ))
                          : null
                        : null}
                    </Avatar.Group>
                  </Group>
                ) : null}
              </Stack>
            </Center>
          </Grid.Col>
        </Grid>
      </Container>
      <Grid className="gap-y-0 md:gap-y-20 " mt="xl" pt="xl">
        <Grid.Col
          id="main-content"
          className={
            (flipSidebarOrientation ? "-order-1" : "order-1") +
            " hidden md:flex"
          }
          span={12}
          lg={4}
          xs={5}
          sm={0}
        >
          <div
            className={
              (flipSidebarOrientation
                ? "md:!left-10 lg:!left-10 xl:!left-10 mr-5 xs:mr-0 "
                : "md:!right-5 lg:!right-10 xl:!right-0 ml-5  ") +
              "gap-y-5 flex flex-col items-center sticky h-screen top-1 min-h-[1200px] w-full"
            }
          >
            <ArticleSidebar
              id={data && data.id}
              data={data}
              flipSidebarOrientation={flipSidebarOrientation}
              setFlipSidebarOrientation={setFlipSidebarOrientation}
              theme={theme}
            />
          </div>
        </Grid.Col>
        <Grid.Col xs={12} className="px-0 md:px-5 -order-1" span={12} lg={8}>
          <MarkDownRenderer className="ml-5 xs:max-w-[700px] md:max-w-full xs:mx-auto">
            {article && article.body}
          </MarkDownRenderer>
        </Grid.Col>
      </Grid>
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
        views,
        editors_pick,
        author_id,
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
          title
        )
    `
    )
    .eq("id", id);

  if (data) {
    return {
      props: {
        article: data[0],
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
