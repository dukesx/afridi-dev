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
            <div className="mx-5">
              <Suspense
                fallback={
                  <Stack className="w-full h-full">
                    <HorizontalGridCardSkeleton />
                    <HorizontalGridCardSkeleton />
                    <HorizontalGridCardSkeleton />
                  </Stack>
                }
              >
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

  return {
    props: {
      mustReads: mustReadsData,
      top: topData,
    },
  };
};
