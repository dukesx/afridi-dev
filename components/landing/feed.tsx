/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Title,
  Text,
  Group,
  Stack,
  type MantineTheme,
  LoadingOverlay,
  Center,
  Button,
  Tooltip,
  Tabs,
  ThemeIcon,
  Badge,
  Indicator,
  useMantineTheme,
  useMantineColorScheme,
  Loader,
} from "@mantine/core";
import {
  IconAdjustments,
  IconArrowRight,
  IconBolt,
  IconComet,
  IconHandRock,
  IconHash,
  IconHeart,
  IconStar,
  IconTag,
} from "@tabler/icons";
import { useEffect, useState } from "react";
import { Fragment } from "react";
import HorizontalGridCard, {
  CardStyle,
} from "../global/grid-cards/horizontalGridCard";
import { Fade } from "react-awesome-reveal";
import { useUser } from "@supabase/auth-helpers-react";
import HorizontalGridCardSkeleton from "../global/skeletons/grid-cards/horizontalGridCardSkeleton";
import InfiniteScroll from "react-infinite-scroller";
import {
  getFeedArticles,
  getPopularArticles,
  getTrendingArticles,
} from "../global/feed/functions";
import EmptyPlaceholder from "../global/placeholders/empty";
import { useStoreActions, useStoreState } from "easy-peasy";
import { GeneralStore } from "../../data/static/store";
interface LandingFeedProps {
  theme: MantineTheme;
  feedaData: Array<any>;
}

const LandingFeed: React.FC<LandingFeedProps> = ({ theme, feedaData }) => {
  /**
   *
   *
   *
   *
   */
  const { user, isLoading } = useUser();
  const [key, setKey] = useState("feed");
  //
  //
  //
  //
  const feedLoading = useStoreState((state: GeneralStore) => state.feedLoading);
  const setFeedLoading = useStoreActions(
    (actions: any) => actions.setFeedLoading
  );
  const feedData = useStoreState((state: GeneralStore) => state.feedData);
  const setFeedData = useStoreActions((action: any) => action.setFeedData);
  const articleCount = useStoreState(
    (state: GeneralStore) => state.articleCount
  );
  const setArticleCount = useStoreActions(
    (action: any) => action.setArticleCount
  );
  const trendingData = useStoreState(
    (state: GeneralStore) => state.trendingData
  );
  const setTrendingData = useStoreActions(
    (actions: any) => actions.setTrendingData
  );
  const popularData = useStoreState((state: GeneralStore) => state.popularData);
  const setPopularData = useStoreActions(
    (actions: any) => actions.setPopularData
  );
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

  const getFeed = async () => {
    //
    //
    switch (key) {
      case "feed":
        if (feedData.length == 0) {
          setFeedLoading(true);
        }
        await getFeedArticles({
          user: user,
          data: feedData,
          articleCount: articleCount,
          setData: setFeedData,
          setArticleCount: setArticleCount,
        });
        break;

      case "trending":
        if (trendingData.length == 0) {
          setFeedLoading(true);
        }
        await getTrendingArticles({
          user: user,
          data: trendingData,
          setData: setTrendingData,
        });
        break;

      case "popular":
        if (popularData.length == 0) {
          setFeedLoading(true);
        }
        await getPopularArticles({
          user: user,
          data: popularData,
          setData: setPopularData,
        });
        break;
    }

    setFeedLoading(false);
  };

  useEffect(() => {
    getFeed();
  }, [key]);

  getFeed();

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
              user ? (
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
                        <IconHash
                          strokeWidth={2}
                          // fill={theme.colors.cyan[6]}
                          // color={theme.colors.cyan[6]}
                          size={16}
                        />
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
            {!feedLoading ? (
              feedData.length > 0 ? (
                <InfiniteScroll
                  threshold={50}
                  pageStart={0}
                  loadMore={getFeed}
                  hasMore={feedData.length < articleCount ? true : false}
                  loader={
                    <Center>
                      <Stack align="center">
                        <Loader variant="bars" color="blue" />
                        <Text className="text-center">
                          Loading More Articles
                        </Text>
                      </Stack>
                    </Center>
                  }
                >
                  <Stack spacing="xl" mb="xl" align="center">
                    {feedData.map((mapped, index) => (
                      <HorizontalGridCard
                        key={"aloba" + index}
                        data={mapped}
                        style={CardStyle.FEED}
                        theme={theme}
                      />
                    ))}
                  </Stack>
                </InfiniteScroll>
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

        <Tabs.Panel value="trending">
          <Stack pt="xs" mt="xl">
            {!feedLoading ? (
              trendingData.length > 0 ? (
                <Stack spacing="xl" mb="xl" align="center">
                  {trendingData.map((mapped, index) => (
                    <HorizontalGridCard
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
