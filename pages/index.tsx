/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  Center,
  createStyles,
  Divider,
  Grid,
  Group,
  Loader,
  MantineProvider,
  Navbar,
  ScrollArea,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { forwardRef, Fragment, Suspense, useEffect, useState } from "react";
import AppWrapper from "../components/global/wrapper";
import LandingFeed from "../components/landing/feed";
import { supabase } from "../utils/supabaseClient";
import FeedLoader from "../components/global/skeletons/feedLoader";
import { useSessionContext } from "@supabase/auth-helpers-react";
import {
  IconHash,
  IconMenu,
  IconNews,
  IconScale,
  IconStar,
  IconUsers,
} from "@tabler/icons";
import LandingSidebarItem from "../components/landing/sidebar/landing-sidebar-item";
import CreatorStudioIcon from "../components/global/creator-studio-icon";
import SquareHorizontalAuthorWidget from "../components/author/widgets/square-horizontal-author";
import { NextSeo } from "next-seo";

const LandingPage = ({ feedData, feedDataCount }) => {
  const theme = useMantineTheme();
  const [authors, setAuthors] = useState(null);
  const { supabaseClient, session, isLoading } = useSessionContext();
  const [mostFollowedTags, setMostFollowedTags] = useState(null);

  const fetchAuthors = async () => {
    const { error: getAuthorError, data: getAuthorData } = await supabaseClient
      .from("authors")
      .select(
        `
      id,
      dp,
      full_name,
      content_count,
      location
    `
      )
      .order("content_count", {
        ascending: false,
      })
      .limit(10)
      .gt("content_count", 0);

    setAuthors(getAuthorData);
  };

  const fetchMostFollowedTags = async () => {
    const { error: mostFollowedTagsError, data: mostFollowedTagsData } =
      await supabase
        .from("tags")
        .select(
          `
        title,
        followers
        `
        )
        .order("followers", {
          ascending: false,
        })
        .limit(10);

    if (!mostFollowedTagsError) {
      setMostFollowedTags(mostFollowedTagsData);
    }
  };

  useEffect(() => {
    fetchAuthors();
    fetchMostFollowedTags();
  }, []);

  const largeCardClass = createStyles((theme, _params, getRef) => ({
    wrapper: {
      borderColor: theme.colors.yellow[6],
      display: "none",
      [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
        // Type safe child reference in nested selectors via ref
        display: "block",
      },
    },
    leftSidebar: {
      display: "none",

      [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
        // Type safe child reference in nested selectors via ref
        display: "flex",
        flexDirection: "column",
      },
    },

    rightSidebar: {
      display: "none",

      [`@media (min-width: ${theme.breakpoints.lg}px)`]: {
        // Type safe child reference in nested selectors via ref
        display: "flex",
        flexDirection: "column",
      },
    },
  }));

  var CustomButton = forwardRef<HTMLButtonElement>((props, ref) => (
    <LandingSidebarItem
      leftIcon={<IconScale size={25} />}
      color="blue"
      refer={ref}
      // path="#"
      text="legal"
      noLink
    />
  ));

  /**
   *
   *
   *
   *
   *
   *
   */

  const { classes } = largeCardClass();
  return (
    <Fragment>
      <NextSeo
        title="Welcome to Afridi.dev!"
        description="The DEV's blog"
        canonical="https://afridi.dev"
        openGraph={{
          url: "https://afridi.dev",
          title: "Welcome to Afridi.dev!",
          description: "The DEV's blog",
          site_name: "Afridi.dev",
          images: [
            {
              url: "https://ik.imagekit.io/afrididotdev/tr:w-1200/afridi-dev-og-image.png",
              width: 1200,
              height: 630,
              alt: "Afridi.DEV Cover Image - Light",
              type: "image/jpeg",
            },
            {
              url: "https://ik.imagekit.io/afrididotdev/tr:w-800/afridi-dev-light.png",
              width: 800,
              height: 800,
              alt: "Afridi.DEV Cover Image - Dark",
              type: "image/jpeg",
            },
            {
              url: "https://ik.imagekit.io/afrididotdev/tr:w-800/afridi-dev-dark.png",
              width: 800,
              height: 800,
              alt: "Afridi.DEV Cover Image - Dark",
              type: "image/jpeg",
            },
          ],
        }}
        twitter={{
          handle: "@afridi.dev",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <AppWrapper activeHeaderKey="home" size={1600}>
        {/**
         *  Feed + Sidebar
         *
         */}
        <Grid
          gutter="xl"
          id="main-content"
          mt="xs"
          className="pl-3 pr-1 md:pr-10"
        >
          <Navbar
            hiddenBreakpoint="xs"
            hidden
            height={"auto"}
            p="xs"
            width={{ xs: 200, sm: 300, md: 300, lg: 300 }}
          >
            <Navbar.Section mt={0}>
              <Group className="w-full" mt="xs" position="apart">
                <Text weight={500} size="sm" color="dimmed">
                  Navigation Menu
                </Text>

                <ThemeIcon variant="light" radius="xl" color="gray" size="md">
                  <IconMenu size={14} className="align-center" />
                </ThemeIcon>
              </Group>
              <Divider mt="xs" className="w-full" />
              <LandingSidebarItem
                leftIcon={<CreatorStudioIcon size="xl" textSize="sm" />}
                color="gray"
                path="/creator-studio"
                text="Creator Studio"
                // maxWidth={255}
              />

              <LandingSidebarItem
                leftIcon={<IconNews size={25} />}
                color="gray"
                path="/creator-studio/my-articles"
                text="My Articles"
                // maxWidth={255}
              />
            </Navbar.Section>
            {/**
             *
             *
             *
             */}
            <Group className="w-full" mt="xl" position="apart">
              <Text weight={500} size="sm" color="dimmed">
                Most Followed Tags
              </Text>
              <ThemeIcon variant="light" radius="xl" color="gray" size="md">
                <IconHash size={14} className="align-center" />
              </ThemeIcon>
            </Group>
            <Divider mt="xs" className="w-full" />
            {/**
             *
             *
             *
             */}
            <Navbar.Section grow component={ScrollArea} className="w-full">
              {mostFollowedTags ? (
                mostFollowedTags.map((mapped, index) => (
                  <LandingSidebarItem
                    buttonSize="md"
                    key={"mostfollowedtags" + index}
                    leftIcon={
                      <ThemeIcon radius="xl" color="blue" variant="light">
                        <IconHash size={15} />
                      </ThemeIcon>
                    }
                    color="gray"
                    path={`/tags/${mapped.title}`}
                    text={mapped.title}
                    description={
                      mapped.followers > 0
                        ? `Followed by ${Intl.NumberFormat("en", {
                            notation: "compact",
                          }).format(mapped.followers)} ${
                            mapped.followers == 1 ? "Dev" : "Devs"
                          }`
                        : null
                    }
                    maxWidth={255}
                  />
                ))
              ) : (
                <Center className="h-[350px] w-full items-center flex flex-col justify-center">
                  <Stack align="center">
                    <Loader color="blue" variant="bars" />
                    <Text size="sm">Loading Data</Text>
                  </Stack>
                </Center>
              )}
            </Navbar.Section>
          </Navbar>

          <Grid.Col
            className="px-0 sm:px-[12px]"
            span={12}
            sm={12}
            xs={12}
            md={12}
            lg={7}
          >
            <div className="mx-0">
              <Suspense fallback={<FeedLoader />}>
                <LandingFeed
                  prefetchedFeedData={feedData}
                  feedDataCount={feedDataCount}
                  theme={theme}
                />
              </Suspense>
            </div>
          </Grid.Col>

          <Grid.Col
            className={classes.rightSidebar}
            span={5}
            xs={12}
            sm={3}
            md={0}
            lg={5}
          >
            <Stack
              spacing="xl"
              className="sticky min-h-[500px] w-full top-24 pb-10 ml-10"
            >
              <Suspense>
                <SquareHorizontalAuthorWidget
                  titleOrder={4}
                  cardClassName=""
                  title="Top 10 Contributors"
                  placeholderHeight={140}
                  icon={<IconUsers />}
                  theme={theme}
                  color="cyan"
                  data={authors}
                />
              </Suspense>
            </Stack>
          </Grid.Col>
        </Grid>

        {/**
         *
         * Feed + Sidebar Ends
         *
         **/}
      </AppWrapper>
    </Fragment>
  );
};

export default LandingPage;

export const getStaticProps = async (ctx) => {
  const {
    error,
    data: feedData,
    count: count,
  } = await supabase
    .from("articles")
    .select(
      `
                  id,
                  title,
                  read_time,
                  description,
                  cover,
                  editors_pick,
                  authors!articles_author_id_fkey (
                    dp,
                    full_name
                  ),
                  co_authors_articles (
                    authors (
                      dp,
                      full_name
                    )
                  ),
                appreciations (
                id
                  ),

            article_views (
            id
          )
                `,
      {
        count: "exact",
      }
    )
    .order("created_at", {
      ascending: false,
    })
    .limit(10)
    .order("created_at", {
      ascending: false,
    });

  var newFeedData = await Promise.all(
    feedData &&
      feedData.map(async (mapped) => {
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

        return { ...mapped, cover_base_64: data.placeholder };
      })
  );

  return {
    props: {
      feedDataCount: count,
      feedData: newFeedData,
    },
  };
};
