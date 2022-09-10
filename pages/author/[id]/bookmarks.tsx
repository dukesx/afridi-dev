/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { IconBookmarks, IconX } from "@tabler/icons";
import { useEffect, useState } from "react";
import HorizontalGridCard, {
  CardStyle,
} from "../../../components/global/grid-cards/horizontalGridCard";
import EmptyPlaceholder from "../../../components/global/placeholders/empty";
import FeedLoader from "../../../components/global/skeletons/feedLoader";
import AppWrapper from "../../../components/global/wrapper";

const Bookmarks = ({ user }) => {
  const theme = useMantineTheme();
  const [bookmarkedArticles, setBookmarkedArticles] = useState<any>();
  const { session, supabaseClient, isLoading } = useSessionContext();

  const getBookmarkedArticles = async () => {
    const { error, data } = await supabaseClient
      .from("authors")
      .select(
        `
    bookmarks (
      articles (
        title,
        cover,
        description,
        id
      )
    )
    `
      )
      .eq("id", session.user.id);
    if (data && data.length > 0) {
      var arr = [];
      //@ts-ignore
      data[0].bookmarks.map((mapped) => arr.push(mapped.articles));

      setBookmarkedArticles(arr);
    }
  };

  useEffect(() => {
    if (session) {
      getBookmarkedArticles();
    }
  }, [session]);

  return (
    <AppWrapper size="md" activeHeaderKey="">
      <Card mt="xl" className="mx-auto">
        <Stack>
          <ThemeIcon
            className="mx-auto rounded-full"
            size={100}
            radius="xl"
            variant="gradient"
            gradient={{
              from: "gray",
              to: "cyan",
            }}
          >
            <IconBookmarks size={40} />
          </ThemeIcon>
          <Title className="text-center" order={2}>
            My Bookmarks
          </Title>

          <Card className="px-5 px-10" pb={100} mt="lg">
            <Stack align="center" spacing={50}>
              {bookmarkedArticles ? (
                bookmarkedArticles.length > 0 ? (
                  bookmarkedArticles.map((mapped, index) => (
                    <Group
                      position="apart"
                      noWrap
                      className="w-full"
                      key={"abola" + index}
                    >
                      <HorizontalGridCard
                        coverClassName="rounded-md"
                        theme={theme}
                        data={mapped}
                        style={CardStyle.FEED}
                      />
                      <Tooltip label="Remove from bookmarks">
                        <ActionIcon
                          className="align-middle"
                          onClick={async () => {
                            const { error } = await supabaseClient
                              .from("bookmarks")
                              .delete()
                              .match({
                                author_id: session.user.id,
                                article_id: mapped.id,
                              });

                            if (!error) {
                              setBookmarkedArticles([]);
                              getBookmarkedArticles();
                            }
                          }}
                          size="xl"
                          color="red"
                          variant="subtle"
                          radius="xl"
                        >
                          <IconX className="align-middle" size={16} />
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                  ))
                ) : (
                  <EmptyPlaceholder
                    height={250}
                    description="Bookmark some articles to see them here"
                  />
                )
              ) : (
                <FeedLoader />
              )}
            </Stack>
          </Card>
        </Stack>
      </Card>
    </AppWrapper>
  );
};

export default Bookmarks;

export const getServerSideProps = withPageAuth({ redirectTo: "/get-started" });
