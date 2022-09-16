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
import { Fragment, Suspense, useEffect } from "react";
import AppWrapper from "../components/global/wrapper";
import LargeGridCard from "../components/global/grid-cards/largeGridCard";
import LandingFeed from "../components/landing/feed";
import SquareHorizontalWidget from "../components/landing/widgets/square-horizontal";
import HorizontalGridCardSkeleton from "../components/global/skeletons/grid-cards/horizontalGridCardSkeleton";
import { supabase } from "../utils/supabaseClient";
import FeedLoader from "../components/global/skeletons/feedLoader";

const LandingPage = ({ feedData, top, mustReads, feedDataCount }) => {
  const theme = useMantineTheme();

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
              <Suspense>
                <SquareHorizontalWidget
                  icon="👏"
                  theme={theme}
                  color="blue"
                  title="This Month's Top"
                  data={top}
                />
              </Suspense>

              <Suspense>
                <SquareHorizontalWidget
                  cardClassName=""
                  title="Must Reads"
                  icon="👀"
                  theme={theme}
                  color="cyan"
                  data={mustReads}
                />
              </Suspense>
            </Stack>
          </Grid.Col>
          <Grid.Col span={12} sm={5} xs={12} md={5}>
            <div className="mx-0 sm:mx-5">
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
              <Suspense>
                <SquareHorizontalWidget
                  icon="👏"
                  theme={theme}
                  color="blue"
                  title="This Month's Top"
                  data={top}
                />
              </Suspense>

              <Suspense>
                <SquareHorizontalWidget
                  cardClassName=""
                  title="Must Reads"
                  icon="👀"
                  theme={theme}
                  color="cyan"
                  data={mustReads}
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
  const { error: mustReadsError, data: mustReadsData } = await supabase
    .from("articles")
    .select(
      `
        id,
        title,
        description,
        cover,
        body,
        authors!articles_author_id_fkey  (
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
        tags!inner(*)
        `
    )
    .eq("tags.title", "must-reads")
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
  const { error: topDataError, data: topData } = await supabase
    .from("articles")
    .select(
      `
        id,
        title,
        description,
        cover,
        body,
        authors!articles_author_id_fkey (
            id,
            firstName,
            lastName,
            dp
        ),
        tags!inner(title)
        `
    )
    .lte("created_at", date.toUTCString())
    .gte("created_at", date2.toUTCString())
    .eq("tags.title", "top")
    .order("created_at", {
      ascending: false,
    })
    .limit(3);

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
                  views,
                  description,
                  cover,
                  editors_pick,
                  authors!articles_author_id_fkey (
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
    .limit(5)
    .order("created_at", {
      ascending: false,
    })
    .range(0, 9);

  var newFeedData = await Promise.all(
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
      mustReads: mustReadsData,
      feedDataCount: count,
      top: topData,
      feedData: newFeedData,
    },
  };
};
