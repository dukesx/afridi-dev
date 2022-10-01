/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  Avatar,
  Button,
  Center,
  Group,
  Loader,
  Menu,
  Stack,
  Text,
  ThemeIcon,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import {
  IconArrowLeft,
  IconBell,
  IconBellOff,
  IconBellPlus,
  IconBellRinging,
  IconBrandGoogleAnalytics,
  IconBrandNotion,
  IconBrandWhatsapp,
  IconChevronDown,
  IconCode,
  IconHash,
  IconNews,
  IconThumbUp,
} from "@tabler/icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import HorizontalGridCard, {
  CardStyle,
} from "../../components/article/grid-cards/horizontal-article-card";
import AppWrapper from "../../components/global/wrapper";
import InfiniteScroll from "react-infinite-scroller";
import { useRouter } from "next/router";
import Custom404 from "../404";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { supabase } from "../../utils/supabaseClient";
import { ShowUnauthorizedModal } from "../../utils/helpers";
import EmptyPlaceholder from "../../components/global/placeholders/empty";
import GenericAfridiImage from "../../components/generic-afridi-image";
import { NextSeo } from "next-seo";

const ArticleTagPage = ({ taga, articles }) => {
  const theme = useMantineTheme();
  const [data, setData] = useState(articles);
  const router = useRouter();
  const { isLoading, session, error, supabaseClient } = useSessionContext();
  const [authorFollowed, setAuthorFollowed] = useState([]);
  const { colorScheme } = useMantineColorScheme();

  useEffect(() => {
    getTags();
  }, [session]);

  const getTags = async () => {
    if (session && session.user) {
      const { error: error2, data: data2 } = await supabaseClient
        .from("authors")
        .select(
          `
      tags (
        title
      )
      `
        )
        .eq("id", session.user.id);
      var followedTags = [];
      //@ts-ignore
      if (data2[0].tags && data2[0].tags.length > 0) {
        //@ts-ignore
        data2[0].tags.map((mapped) => followedTags.push(mapped.title));
        setAuthorFollowed(followedTags);
      }
    }
  };

  const getMoreArticles = async () => {
    const {
      error,
      data: arrivedData,
      count,
    } = await supabaseClient
      .from("articles")
      .select(
        `
        id,
        title,
        description,
        cover,
      tags!inner(  
      title,
      id,
      image,
      color,
      icon
      )
      `,
        {
          count: "exact",
        }
      )
      .eq("tags.title", router.query.title)
      .limit(10)
      .range(data.length, data.length + 9);

    var articlesArr = [...data];
    arrivedData.map((mapped) => articlesArr.push(mapped));

    setData(articlesArr);
  };

  return taga == null ? (
    <AppWrapper size="sm" activeHeaderKey="">
      <Stack>
        <EmptyPlaceholder
          title="Sorry! no articles for this tag yet"
          description="Check back later, maybe?"
        />
        <Button
          mt="sm"
          className="max-w-[300px] mx-auto"
          onClick={() => router.back()}
          color="blue"
          variant="subtle"
          leftIcon={<IconArrowLeft size={16} />}
          radius="xl"
        >
          Go back
        </Button>
      </Stack>
    </AppWrapper>
  ) : (
    <AppWrapper size="lg" activeHeaderKey="tags">
      <NextSeo
        title={`[TAG]: ${taga.title}`}
        description={`Follow to read more on ${taga.title} based articles `}
        canonical={`https://afridi.dev/tags/${taga.title}`}
        openGraph={{
          url: `https://afridi.dev/tags/${taga.title}`,
          title: `[TAG]: ${taga.title}`,
          description: `Follow to read more on ${taga.title} based articles `,
          site_name: "Afridi.dev",
          images: [
            {
              url: "https://ik.imagekit.io/afrididotdev/tr:w-800/afridi-dev-og-tags.png",
              width: 1200,
              height: 630,
              alt: "Afridi.DEV Cover Image - Light",
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
      <Stack mt={50} align="center">
        <Avatar
          className="rounded-full block relative"
          variant="light"
          color={taga.color ? `${taga.color}.4` : "gray"}
          radius="xl"
          size={130}
        >
          {taga.icon ? (
            <Image
              className="object-cover rounded-lg"
              height={70}
              width={70}
              alt=""
              src={taga.icon}
              loader={({ src, width, quality }) => {
                return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${src}/${src}-original.svg`;
              }}
            />
          ) : taga.IconName ? (
            <taga.IconName
              strokeWidth={1.3}
              size={35}
              className="align-middle"
            />
          ) : taga.title == "programming" ? (
            <IconCode size={40} />
          ) : taga.title == "editors-pick" ? (
            <IconThumbUp size={40} />
          ) : taga.title == "notion" ? (
            <IconBrandNotion size={40} />
          ) : taga.title == "whatsapp" ? (
            <IconBrandWhatsapp size={40} />
          ) : taga.title == "google analytics" ? (
            <IconBrandGoogleAnalytics size={40} />
          ) : taga.image ? (
            <GenericAfridiImage width={70} height={70} path={taga.image} />
          ) : (
            <IconHash />
          )}
        </Avatar>

        <Text weight={700} size="xl" className="text-center uppercase">
          {taga.title}
        </Text>
        <Group mt="xs">
          <Button
            onClick={() => router.back()}
            color="gray"
            variant="subtle"
            leftIcon={<IconArrowLeft size={16} />}
            radius="xl"
          >
            Go back
          </Button>
          <Menu
            styles={{
              dropdown: {
                width: 220,
              },
            }}
            position="bottom"
          >
            <Menu.Target>
              {authorFollowed.includes(taga.title) ? (
                <Button
                  leftIcon={<IconBellRinging size={18} />}
                  variant="light"
                  radius="xl"
                  color="teal"
                  rightIcon={<IconChevronDown size={14} />}
                >
                  Following
                </Button>
              ) : (
                <Tooltip label="follow tag">
                  <Button
                    onClick={async () => {
                      if (session && session.user) {
                        const { data } = await supabaseClient
                          .from("author_followed_tags")
                          .insert({
                            tag_id: taga.id,
                            author_id: session.user.id,
                          }).select(`
                          tags (
                            followers
                          )
                          `);

                        if (data) {
                          const { error: addFollowerError } =
                            await supabaseClient
                              .from("tags")
                              .update({
                                //@ts-ignore
                                followers: data[0].tags.followers + 1,
                              })
                              .eq("id", taga.id);

                          if (!addFollowerError) {
                            var newArr = [...authorFollowed];
                            newArr.push(taga.title);

                            setAuthorFollowed(newArr);
                          }
                        }
                      } else {
                        ShowUnauthorizedModal();
                      }
                    }}
                    color="blue"
                    variant="light"
                    radius="xl"
                    leftIcon={<IconBell size={18} />}
                  >
                    Follow
                  </Button>
                </Tooltip>
              )}
            </Menu.Target>
            {authorFollowed.includes(taga.title) ? (
              <Menu.Dropdown>
                <Menu.Item
                  sx={(theme) => ({
                    background:
                      colorScheme == "dark"
                        ? theme.colors.dark[6]
                        : theme.colors.gray[1],
                    fontWeight: colorScheme == "dark" ? 600 : 400,
                    "&:hover": {
                      background: theme.colors.red[6],
                      color: theme.white,
                      fontWeight: 400,
                    },
                  })}
                  icon={
                    <ThemeIcon size="sm" variant="light" color="red">
                      <IconBellOff size={16} />
                    </ThemeIcon>
                  }
                  color="red"
                  onClick={async () => {
                    const { data, error } = await supabaseClient
                      .from("author_followed_tags")
                      .delete()
                      .eq("tag_id", taga.id).select(`
                      tags (
                        followers
                      )
                      `);

                    if (!error) {
                      const { error: decreaseFollowerError } =
                        await supabaseClient
                          .from("tags")
                          .update({
                            //@ts-ignore
                            followers: data[0].tags.followers - 1,
                          })
                          .eq("id", taga.id);

                      if (!decreaseFollowerError) {
                        const index = authorFollowed.indexOf(taga.title);

                        const newArr = [...authorFollowed];
                        newArr.splice(index, 1);
                        setAuthorFollowed(newArr);
                      }
                    }
                  }}
                >
                  Unfollow
                </Menu.Item>
              </Menu.Dropdown>
            ) : null}
          </Menu>
        </Group>

        <InfiniteScroll
          threshold={50}
          pageStart={0}
          loadMore={getMoreArticles}
          hasMore={data.length < taga.articleCount ? true : false}
          loader={
            <Center key="something-list-loader">
              <Stack align="center">
                <Loader variant="bars" color="blue" />
                <Text className="text-center">Loading More Articles</Text>
              </Stack>
            </Center>
          }
        >
          <Stack pb="xl" mt={50} spacing="xl">
            {data.map((mapped, index) => (
              <HorizontalGridCard
                coverClassName="rounded-lg"
                theme={theme}
                data={mapped}
                style={CardStyle.FEED}
                key={"alobs" + index}
              />
            ))}
          </Stack>
        </InfiniteScroll>
      </Stack>
    </AppWrapper>
  );
};

export default ArticleTagPage;

export const getStaticProps = async (ctx) => {
  const title = ctx.params.title;
  const { error, data, count } = await supabase
    .from("articles")
    .select(
      `
        id,
        title,
        description,
        cover,
      tags!inner(  
      title,
      id,
      color,
      image,
      icon
      )
      `,
      {
        count: "exact",
      }
    )
    .eq("tags.title", title)
    .limit(10);

  if (data && data.length > 0) {
    const tag = {
      id: data[0].tags[0].id,
      title: data[0].tags[0].title,
      icon: data[0].tags[0].icon,
      color: data[0].tags[0].color,
      image: data[0].tags[0].image,
      articleCount: count,
    };

    return {
      props: {
        taga: tag,
        articles: data,
        count: count,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};

export const getStaticPaths = async () => {
  const { data, error } = await supabase.from("tags").select("title").limit(10);

  var ids = [];

  data &&
    data.map((mapped) =>
      ids.push({
        params: {
          title: mapped.title,
        },
      })
    );

  return {
    paths: ids,
    fallback: "blocking",
  };
};
