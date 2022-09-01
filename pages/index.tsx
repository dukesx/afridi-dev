import {
  Card,
  createStyles,
  Divider,
  Grid,
  Group,
  MediaQuery,
  Skeleton,
  Space,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Fragment, useEffect } from "react";
import AppWrapper from "../components/global/wrapper";
import LargeGridCard from "../components/global/grid-cards/largeGridCard";
import HorizontalGridCard, {
  CardStyle,
} from "../components/global/grid-cards/horizontalGridCard";
import { StickyContainer, Sticky } from "react-sticky";
import LandingFeed from "../components/landing/feed";
import SquareHorizontalWidget from "../components/landing/widgets/square-horizontal";
import { IconStar, IconStars } from "@tabler/icons";
import { useState } from "react";
import {
  getUser,
  supabaseClient,
  User,
  withPageAuth,
} from "@supabase/auth-helpers-nextjs";
import HorizontalGridCardSkeleton from "../components/global/skeletons/grid-cards/horizontalGridCardSkeleton";
import { parse } from "date-fns";

const LandingPage = ({ feedData, top, mustReads, feedDataCount }) => {
  const theme = useMantineTheme();
  // const [data, setData] = useState(null);
  // const [mustReads, setMustReads] = useState(null);
  // const [monthsTop, setMonthsTop] = useState(null);

  const largeCardClass = createStyles((theme, _params, getRef) => ({
    wrapper: {
      borderColor: theme.colors.yellow[6],
      display: "none",
      [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
        // Type safe child reference in nested selectors via ref
        display: "block",
      },
    },
    sidebar: {
      display: "none",

      [`@media (min-width: ${theme.breakpoints.sm}px)`]: {
        // Type safe child reference in nested selectors via ref
        display: "flex",
        flexDirection: "column",
      },
    },
  }));

  // const getArticle = async () => {
  //   const { error, data } = await supabaseClient
  //     .from("articles")
  //     .select(
  //       `
  //       id,
  //       title,
  //       description,
  //       cover,
  //       body,
  //       authors (
  //           id,
  //           firstName,
  //           lastName,
  //           dp
  //       ),
  //       co_authors_articles (
  //       authors (
  //           id,
  //           firstName,
  //           lastName,
  //           dp
  //       )
  //       )
  //       `
  //     )
  //     .order("created_at", {
  //       ascending: false,
  //     })
  //     .limit(6);
  //   setData(data);
  // };

  // const getMonthsTop = async () => {
  //   var date = new Date();
  //   var date2 = new Date();
  //   //
  //   //
  //   date.setMonth(date.getMonth());
  //   date2.setMonth(date2.getMonth() - 1);
  //   //
  //   //
  //   const { error, data } = await supabaseClient
  //     .from("articles")
  //     .select(
  //       `
  //       id,
  //       title,
  //       description,
  //       cover,
  //       body,
  //       authors (
  //           id,
  //           firstName,
  //           lastName,
  //           dp
  //       ),
  //       co_authors_articles (
  //       authors (
  //           id,
  //           firstName,
  //           lastName,
  //           dp
  //       )
  //       )

  //       `
  //     )
  //     .lte("created_at", date.toUTCString())
  //     .gte("created_at", date2.toUTCString())
  //     .contains("article_tags", ["top"])
  //     .order("created_at", {
  //       ascending: false,
  //     })
  //     .limit(3);

  //   setMonthsTop(data);
  // };

  // const getMustReads = async () => {
  //   const { error, data } = await supabaseClient
  //     .from("articles")
  //     .select(
  //       `
  //       id,
  //       title,
  //       description,
  //       cover,
  //       body,
  //       authors (
  //           id,
  //           firstName,
  //           lastName,
  //           dp
  //       ),
  //       co_authors_articles (
  //       authors (
  //           id,
  //           firstName,
  //           lastName,
  //           dp
  //       )
  //       )

  //       `
  //     )
  //     .contains("article_tags", ["must-reads"])
  //     .order("created_at", {
  //       ascending: false,
  //     })
  //     .limit(3);
  //   setMustReads(data);
  // };

  // useEffect(() => {
  //   getArticle();
  //   getMustReads();
  //   getMonthsTop();
  // }, []);

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
      <AppWrapper activeHeaderKey="home" size={1600}>
        {/**
         *  Grid Starts
         *
         */}
        {/* <Card withBorder className={classes.wrapper}>
          <Grid className="mt-2" align="stretch" justify="center" gutter="xl">
            <Grid.Col xs={6} sm={6} md={4}>
              <LargeGridCard data={data ? data[0] : null} theme={theme} />
            </Grid.Col>
            <Grid.Col xs={6} sm={6} md={4}>
              <Stack spacing={25}>
                <Stack spacing={9}>
                  <Title className="text-center" order={2}>
                    <IconStar
                      className="mr-3 align-[-2px]"
                      fill={theme.colors.orange[4]}
                      color={theme.colors.orange[4]}
                    />
                    Freshly Published
                  </Title>
                  <Divider color="orange" />
                </Stack>

                {data ? (
                  data.map((mapped, index) => {
                    if (index !== 0 && index !== data.length - 1 && index < 5) {
                      return (
                        <HorizontalGridCard
                          key={"horizon" + index}
                          style={CardStyle.DEFAULT}
                          theme={theme}
                          data={mapped}
                        />
                      );
                    }
                  })
                ) : (
                  <Stack>
                    <HorizontalGridCardSkeleton />
                    <HorizontalGridCardSkeleton />
                    <HorizontalGridCardSkeleton />
                    <HorizontalGridCardSkeleton />
                  </Stack>
                )}
              </Stack>
            </Grid.Col>
            <MediaQuery
              smallerThan="md"
              styles={{
                display: "none",
              }}
            >
              <Grid.Col sm={4} md={4}>
                <LargeGridCard
                  className="max-w-[608px] mx-auto"
                  theme={theme}
                  data={data ? data[data.length - 1] : null}
                />
              </Grid.Col>
            </MediaQuery>
          </Grid>
        </Card> */}

        {/**
         *
         * Grid Ends
         */}

        {/**
         *  Feed + Sidebar
         *
         */}
        <Grid
          gutter="xl"
          id="main-content"
          mt="xl"
          className="pl-3 pr-1 md:pr-10"
        >
          <Grid.Col
            className={classes.sidebar}
            span={5}
            xs={12}
            sm={3}
            md={3.4}
          >
            <Stack
              spacing="xl"
              className="sticky min-h-[1000px] h-screen w-full top-8 pb-10 mr-10"
            >
              <SquareHorizontalWidget
                icon="👏"
                theme={theme}
                color="blue"
                title="This Month's Top"
                data={top}
              />
              <SquareHorizontalWidget
                cardClassName=""
                title="Must Reads"
                icon="👀"
                theme={theme}
                color="cyan"
                data={mustReads}
              />
            </Stack>
          </Grid.Col>
          <Grid.Col span={12} sm={5} xs={12} md={5}>
            <div className="mx-5">
              <LandingFeed
                prefetchedFeedData={feedData}
                feedDataCount={feedDataCount}
                theme={theme}
              />
            </div>
          </Grid.Col>

          <Grid.Col
            className={classes.sidebar}
            span={5}
            xs={12}
            sm={3}
            md={3.6}
          >
            <Stack
              spacing="xl"
              className="sticky min-h-[1000px] h-screen w-full top-8 pb-10 ml-10"
            >
              <SquareHorizontalWidget
                icon="👏"
                theme={theme}
                color="blue"
                title="This Month's Top"
                data={top}
              />
              <SquareHorizontalWidget
                cardClassName=""
                title="Must Reads"
                icon="👀"
                theme={theme}
                color="cyan"
                data={mustReads}
              />
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
    count: feedDataCount,
  } = await supabaseClient
    .from("articles")
    .select(
      `
                  id,
                  title,
                  description,
                  cover,
                  authors (
                    dp,
                    firstName,
                    lastName
                  ),
                  co_authors_articles (
                    authors (
                      dp,
                      firstName,
                      lastName
                    )
                  )
                `,
      {
        count: "exact",
      }
    )
    .range(0, 10)
    .limit(10)
    .order("created_at", {
      ascending: false,
    });

  const { error: mustReadsError, data: mustReadsData } = await supabaseClient
    .from("articles")
    .select(
      `
        id,
        title,
        description,
        cover,
        body,
        authors (
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
        )
       
        `
    )
    .contains("article_tags", ["must-reads"])
    .order("created_at", {
      ascending: false,
    })
    .limit(3);

  var date = new Date();
  var date2 = new Date();
  //
  //
  date.setMonth(date.getMonth());
  date2.setMonth(date2.getMonth() - 1);
  //
  //
  const { error: topDataError, data: topData } = await supabaseClient
    .from("articles")
    .select(
      `
        id,
        title,
        description,
        cover,
        body,
        authors (
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
        )
      
        `
    )
    .lte("created_at", date.toUTCString())
    .gte("created_at", date2.toUTCString())
    .contains("article_tags", ["top"])
    .order("created_at", {
      ascending: false,
    })
    .limit(3);

  return {
    props: {
      feedData: feedData,
      mustReads: mustReadsData,
      top: topData,
      feedDataCount: feedDataCount,
    },
  };
};
