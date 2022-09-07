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
  IconChevronDown,
  IconHash,
  IconNews,
} from "@tabler/icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import HorizontalGridCard, {
  CardStyle,
} from "../../components/global/grid-cards/horizontalGridCard";
import AppWrapper from "../../components/global/wrapper";
import InfiniteScroll from "react-infinite-scroller";
import { useRouter } from "next/router";
import Custom404 from "../404";
import Custom500 from "../500";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { supabase } from "../../utils/supabaseClient";
import Unauthorized from "../../public/401.svg";
import { closeAllModals, openModal } from "@mantine/modals";
import { NextLink } from "@mantine/next";

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
      <Custom404 />
    </AppWrapper>
  ) : (
    <AppWrapper size="lg" activeHeaderKey="">
      <Stack mt={50} align="center">
        <Avatar
          className="rounded-full"
          variant="light"
          color={taga.color ? `${taga.color}.4` : "cyan"}
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
          ) : (
            <IconHash />
          )}
        </Avatar>

        <Text weight={700} size="xl" className="text-center uppercase">
          {taga.title}
        </Text>
        <Group>
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
                      if (session.user) {
                        const { data } = await supabaseClient
                          .from("author_followed_tags")
                          .insert({
                            tag_id: taga.id,
                            author_id: session.user.id,
                          })
                          .select();

                        if (data) {
                          var newArr = [...authorFollowed];
                          newArr.push(taga.title);

                          setAuthorFollowed(newArr);
                        }
                      } else {
                        openModal({
                          title: "Unauthorised",
                          children: (
                            <Stack spacing={4} align="center">
                              <Image
                                src={Unauthorized}
                                height={200}
                                width={200}
                                alt=""
                              />
                              <Text weight={600}>Ooops - Can&apos;t do it</Text>
                              <Text size="sm" color="dimmed">
                                You need to be signed in to follow tags
                              </Text>
                              <Button
                                mt="xs"
                                color="blue"
                                fullWidth
                                component={NextLink}
                                onClick={() => {
                                  closeAllModals();
                                }}
                                href="/get-started"
                              >
                                Sign in
                              </Button>
                            </Stack>
                          ),
                        });
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
                      .eq("tag_id", taga.id);

                    if (!error) {
                      const index = authorFollowed.indexOf(taga.title);

                      const newArr = [...authorFollowed];
                      newArr.splice(index, 1);
                      setAuthorFollowed(newArr);
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
  const { data, error } = await supabase.from("tags").select("title");

  var ids = [];

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
