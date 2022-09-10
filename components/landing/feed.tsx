/* eslint-disable react-hooks/exhaustive-deps */
import {
  Text,
  Stack,
  type MantineTheme,
  Center,
  Button,
  Tooltip,
  Tabs,
  ThemeIcon,
  Indicator,
  useMantineColorScheme,
  Loader,
} from "@mantine/core";
import {
  IconArrowRight,
  IconBolt,
  IconHandRock,
  IconHash,
  IconHeart,
} from "@tabler/icons";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import HorizontalGridCard, {
  CardStyle,
} from "../global/grid-cards/horizontalGridCard";
import { useSessionContext } from "@supabase/auth-helpers-react";
import HorizontalGridCardSkeleton from "../global/skeletons/grid-cards/horizontalGridCardSkeleton";
import InfiniteScroll from "react-infinite-scroller";
import {
  getFeedArticles,
  getPopularArticles,
  getTrendingArticles,
} from "../global/feed/functions";
import EmptyPlaceholder from "../global/placeholders/empty";
import { GeneralStore } from "../../data/static/store";
import { AfridiDevArticle } from "../global/grid-cards/largeGridCard";
interface LandingFeedProps {
  theme: MantineTheme;
  prefetchedFeedData: Array<AfridiDevArticle>;
  feedDataCount: number;
}

const LandingFeed: React.FC<LandingFeedProps> = ({
  theme,
  prefetchedFeedData,
  feedDataCount,
}) => {
  /**
   *
   *
   *
   *
   */
  const [key, setKey] = useState("feed");
  const { isLoading, session, error, supabaseClient } = useSessionContext();
  //
  //
  //
  //

  const [popularData, setPopularData] = useState([]);
  const [trendingData, setTrendingData] = useState([]);
  const [feedData, setFeedData] = useState<any>();
  const [articleCount, setArticleCount] = useState(feedDataCount);
  const [feedLoading, setFeedLoading] = useState(false);
  const [userBookmarks, setUserBookmarks] = useState([]);
  //
  //
  //
  const { colorScheme } = useMantineColorScheme();

  /**
   *
   *
   *
   *  Initial Article Load & Tab Change
   *
   *
   */

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
    setUserBookmarks(bookmarksArray);
  };

  const getFeed = async () => {
    switch (key) {
      case "feed":
        await getFeedArticles({
          user: session && session.user,
          data: feedData,
          articleCount: articleCount,
          setData: setFeedData,
          setArticleCount: setArticleCount,
        });
        break;

      case "trending":
        await getTrendingArticles({
          user: session && session.user,
          data: trendingData,
          setData: setTrendingData,
        });
        break;

      case "popular":
        await getPopularArticles({
          user: session && session.user,
          data: popularData,
          setData: setPopularData,
        });
        break;
    }
    setFeedLoading(false);
  };

  useEffect(() => {
    if (isLoading == false) {
      setFeedLoading(true);
      getFeed();
      if (session) {
        getUserBookmarks();
      }
    }
  }, [key, isLoading]);

  /**
   *
   *
   *
   *
   *
   *
   */

  return (
    <Fragment>
      <Tabs value={key} onTabChange={setKey} color="blue" variant="default">
        <Tabs.List grow position="center">
          <Tabs.Tab
            icon={
              session && session.user ? (
                <Indicator
                  // offset={40}
                  position="top-end"
                  size={21}
                  radius="xl"
                  styles={{
                    indicator: {
                      padding: 0,
                      border: 0,
                      backgroundColor: "transparent",
                    },
                    root: {
                      border: 0,
                    },
                  }}
                  className="rounded-full"
                  label={
                    <Tooltip label="Filtered by tags you follow">
                      <ThemeIcon
                        variant="light"
                        color="teal"
                        radius="xl"
                        size={30}
                      >
                        <IconHash strokeWidth={2} size={16} />
                      </ThemeIcon>
                    </Tooltip>
                  }
                >
                  <ThemeIcon variant="light" color="blue" radius="xl" size="xl">
                    <IconHandRock
                      fill={
                        colorScheme == "dark"
                          ? theme.colors.blue[5]
                          : theme.colors.blue[2]
                      }
                      strokeWidth={1.5}
                    />
                  </ThemeIcon>
                </Indicator>
              ) : (
                <ThemeIcon variant="light" color="blue" radius="xl" size="xl">
                  <IconHandRock
                    fill={
                      colorScheme == "dark"
                        ? theme.colors.blue[5]
                        : theme.colors.blue[2]
                    }
                    strokeWidth={1.5}
                  />
                </ThemeIcon>
              )
            }
            value="feed"
          >
            <Text ml="xs" size="sm" weight={500}>
              Feed
            </Text>
          </Tabs.Tab>

          <Tabs.Tab
            icon={
              <ThemeIcon variant="light" radius="xl" color="yellow" size="xl">
                <IconBolt size={22} fill={theme.colors.yellow[4]} />
              </ThemeIcon>
            }
            value="trending"
          >
            <Text ml="xs" size="sm" weight={500}>
              Trending
            </Text>
          </Tabs.Tab>
          <Tabs.Tab
            icon={
              <ThemeIcon variant="light" color="red" radius="xl" size="xl">
                <IconHeart size={22} fill={theme.colors.red[6]} />
              </ThemeIcon>
            }
            value="popular"
          >
            <Text ml="xs" size="sm" weight={500}>
              Popular
            </Text>
          </Tabs.Tab>
        </Tabs.List>

        <Tabs.Panel value="feed">
          <Stack className="relative" pt="xs" mt="xl">
            {feedLoading == false ? (
              feedData && feedData.length > 0 ? (
                <InfiniteScroll
                  threshold={50}
                  pageStart={0}
                  loadMore={getFeed}
                  hasMore={
                    feedData && feedData.length < articleCount ? true : false
                  }
                  loader={
                    <Center key="something-list-loader">
                      <Stack align="center">
                        <Loader variant="bars" color="blue" />
                        <Text className="text-center">
                          Loading More Articles
                        </Text>
                      </Stack>
                    </Center>
                  }
                >
                  <Stack
                    key="something-list"
                    spacing="xl"
                    mb="xl"
                    align="center"
                  >
                    {feedData.map((mapped, index) => (
                      <HorizontalGridCard
                        appreciations={mapped.appreciations}
                        setBookmarks={setUserBookmarks}
                        bookmarks={userBookmarks}
                        key={"aloba" + index}
                        data={mapped}
                        style={CardStyle.FEED}
                        theme={theme}
                      />
                    ))}
                  </Stack>
                </InfiniteScroll>
              ) : feedData && feedData.length == 0 ? (
                <Center mt={50}>
                  <Stack>
                    <Text
                      className="text-center text-3xl"
                      weight={800}
                      color="dimmed"
                      size="xl"
                    >
                      Hmmmm...Empty
                    </Text>
                    <Text size="md" color="dimmed">
                      Susbscribe to some topics in order to see articles here
                    </Text>
                    <Button
                      color="cyan"
                      rightIcon={<IconArrowRight size={theme.fontSizes.xl} />}
                    >
                      Go to Topics and Subscribe
                    </Button>
                  </Stack>
                </Center>
              ) : null
            ) : (
              <Stack className="w-full h-full">
                <HorizontalGridCardSkeleton />
                <HorizontalGridCardSkeleton />
                <HorizontalGridCardSkeleton />
              </Stack>
            )}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="trending">
          <Stack pt="xs" mt="xl">
            {!feedLoading ? (
              trendingData.length > 0 ? (
                <Stack spacing="xl" mb="xl" align="center">
                  {trendingData.map((mapped, index) => (
                    <HorizontalGridCard
                      setBookmarks={setUserBookmarks}
                      bookmarks={userBookmarks}
                      key={"aloban" + index}
                      data={mapped}
                      style={CardStyle.FEED}
                      theme={theme}
                    />
                  ))}
                </Stack>
              ) : (
                <Center mt={50}>
                  <Stack>
                    <Text
                      className="text-center text-3xl"
                      weight={800}
                      color="dimmed"
                      size="xl"
                    >
                      Hmmmm...Empty
                    </Text>
                    <Text size="md" color="dimmed">
                      Susbscribe to some topics in order to see articles here
                    </Text>
                    <Button
                      color="cyan"
                      rightIcon={<IconArrowRight size={theme.fontSizes.xl} />}
                    >
                      Go to Topics and Subscribe
                    </Button>
                  </Stack>
                </Center>
              )
            ) : (
              <Stack className="w-full h-full">
                <HorizontalGridCardSkeleton />
                <HorizontalGridCardSkeleton />
                <HorizontalGridCardSkeleton />
              </Stack>
            )}
          </Stack>
        </Tabs.Panel>

        <Tabs.Panel value="popular">
          <Stack pt="xs" mt="xl">
            {!feedLoading ? (
              popularData.length > 0 ? (
                <Stack spacing="xl" mb="xl" align="center">
                  {popularData.map((mapped, index) => (
                    <HorizontalGridCard
                      setBookmarks={setUserBookmarks}
                      bookmarks={userBookmarks}
                      key={"alobis" + index}
                      data={mapped}
                      style={CardStyle.FEED}
                      theme={theme}
                    />
                  ))}
                </Stack>
              ) : (
                <EmptyPlaceholder />
              )
            ) : (
              <Stack className="w-full h-full">
                <HorizontalGridCardSkeleton />
                <HorizontalGridCardSkeleton />
                <HorizontalGridCardSkeleton />
              </Stack>
            )}
          </Stack>
        </Tabs.Panel>
      </Tabs>
    </Fragment>
  );
};

export default LandingFeed;
