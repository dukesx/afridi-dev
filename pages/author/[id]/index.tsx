/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Center,
  Divider,
  Grid,
  Group,
  Input,
  Skeleton,
  Stack,
  Tabs,
  Text,
  Title,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useRouter } from "next/router";
import AppWrapper from "../../../components/global/wrapper";

import {
  IconArrowRight,
  IconBrandGithub,
  IconCheck,
  IconListDetails,
  IconStar,
  IconUpload,
  IconUserCircle,
  IconX,
} from "@tabler/icons";
import React, { Fragment, Suspense, useEffect, useRef, useState } from "react";
import "country-flag-icons/3x2/flags.css";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { showNotification } from "@mantine/notifications";
import ImageUploader, {
  ImageUploaderType,
} from "../../../components/global/image_uploader";
import MarkDownRenderer from "../../../components/global/markdown-renderer";
import { parseISO } from "date-fns";
import { compareDesc } from "date-fns";
import AfridiImage from "../../../components/global/afridi-image";
import { supabase } from "../../../utils/supabaseClient";
import { type GetStaticPropsContext } from "next";
import { NextSeo } from "next-seo";
import {
  AuthorStatusFeed,
  getData,
  getSimilarAuthors,
} from "../../../components/author/functions";
import AuthorProfileHeader from "../../../components/author/components/header";
import { AfridiDevEditor } from "../../../components/global/editor/editorCaller";
import AuthorFeedRenderer from "../../../components/author/components/author-feed-renderer";
import SquareHorizontalAuthorWidget from "../../../components/author/widgets/square-horizontal-author";
import HorizontalGridCardSkeleton from "../../../components/global/skeletons/grid-cards/horizontalGridCardSkeleton";
import ExclusivePlaceholder from "../../../components/author/components/exclusive-placeholder";

const UserProfilePage = ({ user, feedData, covera, dpo }) => {
  const router = useRouter();
  const { id } = router.query;
  const theme = useMantineTheme();
  const [data, setData] = useState(user);
  const { colorScheme } = useMantineColorScheme();
  const [dp, setDp] = useState(dpo);
  const [cover, setCover] = useState(covera);
  const openRef = useRef<() => void>(null);
  const openRef2 = useRef<() => void>(null);
  const [submittingStatus, setSubmittingStatus] = useState(false);
  const [feed, setFeed] = useState<Array<AuthorStatusFeed>>(feedData);
  const [hot, setHot] = useState(null);
  const [thumbsUp, setThumbsUp] = useState(null);
  const { session, supabaseClient } = useSessionContext();
  const [similarAuthors, setSimilarAuthors] = useState(null);

  var ref: any = React.createRef();

  useEffect(() => {
    getSimilarAuthors(setSimilarAuthors, supabaseClient, id);
  }, []);

  useEffect(() => {
    setFeed(feedData);
    setDp(dpo);
    setData(user);
    setCover(covera);
  }, [feedData]);

  const save = (data) => {
    ref = data;
  };

  return (
    <AppWrapper activeHeaderKey="" size="lg">
      {user && feedData ? (
        <Fragment>
          <NextSeo
            title={`${user.full_name ?? "Random User"}'s Profile`}
            description={`Welcome to ${
              user.full_name ?? "Random User"
            }'s Profile on Afridi.dev`}
            canonical={`https://afridi.dev/author/${user.id}`}
            openGraph={{
              url: `https://afridi.dev/author/${user.id}`,
              title: `${user.full_name}'s Profile`,
              description: `Welcome to ${
                user.full_name ?? "Random User"
              }'s Profile on Afridi.dev`,
              images: [
                {
                  url: `https://afridi.dev/api/generate-cover/author/${user.id}`,
                  width: 400,
                  height: 400,
                  alt: `${user.full_name ?? "Random User"}'s Dynamic Picture`,
                  type: "image/jpeg",
                },
                {
                  url: `https://ik.imagekit.io/afrididotdev/tr:w-400${dpo}`,
                  width: 400,
                  height: 400,
                  alt: `${user.full_name ?? "Random User"}'s Display Picture`,
                  type: "image/jpeg",
                },
                {
                  url: `https://ik.imagekit.io/afrididotdev/tr:w-400${covera}`,
                  width: 900,
                  height: 800,
                  alt: `${user.full_name ?? "Random User"}'s Cover Photo`,
                  type: "image/jpeg",
                },
              ],
              site_name: "Afridi.dev",
              type: "profile",
              profile: {
                firstName:
                  user && user.full_name
                    ? user.full_name.split(" ")[0]
                    : "Random",
                lastName:
                  user && user.full_name
                    ? user.full_name.split(" ").length > 2
                      ? user.full_name.split(" ")[
                          user.full_name.split(" ").length - 2
                        ] +
                        " " +
                        user.full_name.split(" ")[
                          user.full_name.split(" ").length - 1
                        ]
                      : user.full_name.split(" ")[
                          user.full_name.split(" ").length - 1
                        ]
                    : "User",
                username: user.username ?? user.id,
                gender: user.gender,
              },
            }}
            twitter={{
              handle: "@afrididotdev",
              site: "@afrididotdev",
              cardType: "summary_large_image",
            }}
          />
        </Fragment>
      ) : null}
      <Card
        px={0}
        style={{
          overflow: "unset",
        }}
      >
        <AuthorProfileHeader
          colorScheme={colorScheme}
          cover={cover}
          dp={dp}
          setCover={setCover}
          setDp={setDp}
          data={data}
          //@ts-ignore
          id={id}
          openRef2={openRef2}
          session={session}
          theme={theme}
          user={user}
        />

        <Stack className="max-w-[1000px] mx-auto">
          <Group position="apart">
            <Group className="ml-5 xs:ml-0" pt="xl" py="sm">
              <Avatar className="rounded-full h-[90px] w-[90px] sm:h-[120px] ml-0 sm:ml-6 sm:w-[120px] shadow-lg">
                {!data ? (
                  <Skeleton height={120} />
                ) : (
                  <Group>
                    {session && session.user.id == id ? (
                      <Button
                        className="absolute z-[100] rounded-full p-1 bottom-1 left-8 sm:bottom-[6px] right-0 sm:left-12 h-[30px] w-[30px]"
                        size="xs"
                        color="blue"
                        variant="default"
                        onClick={() => openRef.current()}
                      >
                        <IconUpload size={15} />
                      </Button>
                    ) : null}
                    {session && session.user.id == id ? (
                      <ImageUploader
                        type={ImageUploaderType.DP}
                        theme={theme}
                        user={session.user}
                        setImage={setDp}
                        openRef={openRef}
                        placeholder={
                          <AfridiImage
                            priority
                            fillImage={false}
                            className=""
                            height={140}
                            width={140}
                            path={
                              dp
                                ? `/${dp}`
                                : user.dp
                                ? `/${user.dp}`
                                : colorScheme == "dark"
                                ? "/image-avatar-placeholder-dark.png"
                                : `/image-avatar-placeholder.png`
                            }
                          />
                        }
                      />
                    ) : (
                      <AfridiImage
                        priority
                        className=""
                        fillImage={false}
                        height={140}
                        width={140}
                        path={
                          dp
                            ? `/${dp}`
                            : user.dp
                            ? `/${user.dp}`
                            : colorScheme == "dark"
                            ? "/image-avatar-placeholder-dark.png"
                            : `/image-avatar-placeholder.png`
                        }
                      />
                    )}
                  </Group>
                )}
              </Avatar>

              <Stack spacing={2}>
                {!data ? (
                  <Skeleton
                    className="w-[200px] sm:w-[400px]"
                    radius="lg"
                    height={22}
                  />
                ) : (
                  <Group>
                    <Title className="text-sm sm:text-xl" order={4}>
                      {data["full_name"]}
                    </Title>

                    <Tooltip
                      className="capitalize"
                      label={
                        <Text className="capitalize" size="xs">
                          Hailing proudly from{" "}
                          {" " + data["location"].split("-")[0]}
                        </Text>
                      }
                    >
                      <Avatar
                        color="blue"
                        radius="xl"
                        size={45}
                        className="w-[35px] h-[35px] min-w-[35px] sm:w-[45px] sm:h-[45px] sm:min-w-[45px]"
                      >
                        <span
                          id="important"
                          className={`flag:${data["location"].split("-")[1]}`}
                        />
                      </Avatar>
                    </Tooltip>
                  </Group>
                )}

                {!data ? (
                  <Skeleton
                    mt="sm"
                    height={20}
                    className="w-[100px] sm:w-[200px]"
                    radius="lg"
                  />
                ) : (
                  <Text
                    color="dimmed"
                    className="text-xs sm:text-base"
                    weight={400}
                    size="md"
                  >
                    Administrator
                  </Text>
                )}
              </Stack>
            </Group>
          </Group>

          <Tabs className="w-full" color="blue" defaultValue="feed">
            <Tabs.List grow position="center">
              <Tabs.Tab
                value="feed"
                icon={
                  <IconListDetails size={20} color={theme.colors.cyan[6]} />
                }
              >
                Feed
              </Tabs.Tab>
              <Tabs.Tab
                value="exclusive"
                icon={
                  <IconStar
                    size={20}
                    color={theme.colors.yellow[6]}
                    fill={theme.colors.yellow[6]}
                  />
                }
              >
                Exclusive
              </Tabs.Tab>
              <Tabs.Tab
                value="about"
                icon={<IconUserCircle color={theme.colors.blue[6]} size={20} />}
              >
                About
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="feed" pt="xs" className="px-3">
              <Grid>
                <Grid.Col span={12} sm={12} md={7}>
                  <Stack className="py-5 px-0 sm:pt-10 sm:pr-10" spacing="xl">
                    {session && session.user.id == id ? (
                      <Fragment>
                        <Input.Wrapper className="w-full" label="">
                          <AfridiDevEditor
                            toolbarItems={false}
                            autoFocus={false}
                            value={""}
                            placeholder="Write your status text here 👍‍ (GFM Supported)"
                            height="150px"
                            plugins={false}
                            saveData={save}
                            previewStyle="tab"
                          />
                          <Button
                            variant="light"
                            className="float-right"
                            mt="sm"
                            fullWidth
                            loading={submittingStatus}
                            onClick={async () => {
                              var markdown = ref.current
                                .getInstance()
                                .getMarkdown();
                              setSubmittingStatus(true);

                              const { error } = await supabaseClient
                                .from("status_feed")
                                .insert({
                                  body: markdown,
                                  author_id: user.id,
                                });

                              if (error) {
                                showNotification({
                                  title: "Error !",
                                  message: "An error occurred",
                                  color: "red",
                                  icon: <IconX />,
                                });
                              } else {
                                const fetcher = await fetch("/api/revalidate", {
                                  method: "POST",
                                  headers: {
                                    accept: "application/json",
                                    "content-type": "application/json",
                                  },
                                  body: JSON.stringify({
                                    path: "/author/" + user.id,
                                  }),
                                });

                                const result = await fetcher.json();
                                if (result && result.revalidate) {
                                  showNotification({
                                    title: "Success",
                                    message: "Status submitted",
                                    color: "teal",
                                    icon: <IconCheck />,
                                  });
                                  setFeed(null);
                                  getData(supabaseClient, id);
                                }
                              }

                              setSubmittingStatus(false);
                            }}
                          >
                            Post Status
                          </Button>
                        </Input.Wrapper>

                        <Divider
                          label={
                            <Text color="dimmed">Posts start here 👇</Text>
                          }
                          labelPosition="center"
                        />
                      </Fragment>
                    ) : null}
                    <Suspense
                      fallback={
                        <Stack mt={30}>
                          <Group>
                            <Skeleton radius="lg" height={90} width={90} />

                            <Stack>
                              <Skeleton
                                radius="xl"
                                height={20}
                                className="w-[200px] sm:w-[400px]"
                              />
                              <Skeleton
                                radius="xl"
                                height={15}
                                className="w-[100px] sm:w-[200px]"
                              />
                            </Stack>
                          </Group>
                          <Group>
                            <Skeleton radius="lg" height={90} width={90} />

                            <Stack>
                              <Skeleton
                                radius="xl"
                                height={20}
                                className="w-[200px] sm:w-[400px]"
                              />
                              <Skeleton
                                radius="xl"
                                height={15}
                                className="w-[100px] sm:w-[200px]"
                              />
                            </Stack>
                          </Group>
                          <Group>
                            <Skeleton radius="lg" height={90} width={90} />
                            <Stack>
                              <Skeleton
                                radius="xl"
                                height={20}
                                className="w-[200px] sm:w-[400px]"
                              />
                              <Skeleton
                                radius="xl"
                                height={15}
                                className="w-[100px] sm:w-[200px]"
                              />
                            </Stack>
                          </Group>
                        </Stack>
                      }
                    >
                      {data ? (
                        feed ? (
                          feed.length > 0 ? (
                            feed.map((mapped, index) => (
                              <AuthorFeedRenderer
                                key={"alohb" + index}
                                supabaseClient={supabaseClient}
                                mapped={mapped}
                                data={data}
                                colorScheme={colorScheme}
                                dp={dp}
                                id={id}
                                session={session}
                                setFeed={setFeed}
                              />
                            ))
                          ) : (
                            <Stack spacing="xs" align="center" mt="xl">
                              <Text size="xl" weight={700}>
                                Nothing Found
                              </Text>

                              <Text size="sm" color="dimmed">
                                Post something to see it here 🙃
                              </Text>
                            </Stack>
                          )
                        ) : (
                          <Stack mt={30}>
                            <Group>
                              <Skeleton radius="lg" height={90} width={90} />

                              <Stack>
                                <Skeleton
                                  radius="xl"
                                  height={20}
                                  className="w-[200px] sm:w-[400px]"
                                />
                                <Skeleton
                                  radius="xl"
                                  height={15}
                                  className="w-[100px] sm:w-[200px]"
                                />
                              </Stack>
                            </Group>
                            <Group>
                              <Skeleton radius="lg" height={90} width={90} />

                              <Stack>
                                <Skeleton
                                  radius="xl"
                                  height={20}
                                  className="w-[200px] sm:w-[400px]"
                                />
                                <Skeleton
                                  radius="xl"
                                  height={15}
                                  className="w-[100px] sm:w-[200px]"
                                />
                              </Stack>
                            </Group>
                            <Group>
                              <Skeleton radius="lg" height={90} width={90} />
                              <Stack>
                                <Skeleton
                                  radius="xl"
                                  height={20}
                                  className="w-[200px] sm:w-[400px]"
                                />
                                <Skeleton
                                  radius="xl"
                                  height={15}
                                  className="w-[100px] sm:w-[200px]"
                                />
                              </Stack>
                            </Group>
                          </Stack>
                        )
                      ) : (
                        <Stack mt={30}>
                          <Group>
                            <Skeleton radius="lg" height={90} width={90} />

                            <Stack>
                              <Skeleton
                                radius="xl"
                                height={20}
                                className="w-[200px] sm:w-[400px]"
                              />
                              <Skeleton
                                radius="xl"
                                height={15}
                                className="w-[100px] sm:w-[200px]"
                              />
                            </Stack>
                          </Group>
                          <Group>
                            <Skeleton radius="lg" height={90} width={90} />

                            <Stack>
                              <Skeleton
                                radius="xl"
                                height={20}
                                className="w-[200px] sm:w-[400px]"
                              />
                              <Skeleton
                                radius="xl"
                                height={15}
                                className="w-[100px] sm:w-[200px]"
                              />
                            </Stack>
                          </Group>
                          <Group>
                            <Skeleton radius="lg" height={90} width={90} />
                            <Stack>
                              <Skeleton
                                radius="xl"
                                height={20}
                                className="w-[200px] sm:w-[400px]"
                              />
                              <Skeleton
                                radius="xl"
                                height={15}
                                className="w-[100px] sm:w-[200px]"
                              />
                            </Stack>
                          </Group>
                        </Stack>
                      )}
                    </Suspense>
                  </Stack>
                </Grid.Col>

                <Grid.Col span={0} sm={0} md={5}>
                  <Stack spacing="xl" className="sticky top-28 mt-8 pb-10 pr-5">
                    <Suspense fallback={<HorizontalGridCardSkeleton />}>
                      <SquareHorizontalAuthorWidget
                        theme={theme}
                        data={similarAuthors}
                        titleOrder={4}
                        color="gray"
                        placeholderHeight={140}
                        placeholderTitle="Hmmm!"
                        placeholderDescription="No similar articles yet 🤔"
                        icon={<Text>✍</Text>}
                        title="Similar Authors"
                      />
                    </Suspense>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Tabs.Panel>

            <Tabs.Panel value="exclusive" pt="xs">
              <ExclusivePlaceholder />
            </Tabs.Panel>

            <Tabs.Panel value="about" pt="xs">
              {data ? (
                <Stack className="px-3 sm:px-10">
                  {data.bio ? (
                    <Stack>
                      <Title mt="xl" mb={0} order={3}>
                        About me
                      </Title>
                      <MarkDownRenderer>{data.bio}</MarkDownRenderer>
                    </Stack>
                  ) : (
                    <Center className="h-[300px]">
                      <Stack
                        className="items-center my-auto"
                        spacing={0}
                        align="center"
                      >
                        <Title mt="xl" mb="sm" order={3}>
                          Sorry! 😮🤷‍♂️
                        </Title>
                        <Text size="sm" color="dimmed">
                          This has not been added yet
                        </Text>
                      </Stack>
                    </Center>
                  )}

                  {data.github ? (
                    <Group spacing={0}>
                      <Text size="sm" weight={500}>
                        See my projects at github
                      </Text>
                      <IconArrowRight className="mx-2" strokeWidth={1.2} />
                      <Tooltip label="Open my profile in a new tab">
                        <ActionIcon
                          color="dark"
                          variant="filled"
                          size={40}
                          radius="xl"
                          onClick={() => window.open(data.github, "_blank")}
                        >
                          <IconBrandGithub strokeWidth={1.5} />
                        </ActionIcon>
                      </Tooltip>
                    </Group>
                  ) : null}
                </Stack>
              ) : (
                <Skeleton />
              )}
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Card>
    </AppWrapper>
  );
};

export default UserProfilePage;

export const getStaticProps = async ({ params }: GetStaticPropsContext) => {
  var id = params.id;
  const { data: userData, error: userDataError } = await supabase
    .from("authors")
    .select(
      `
      id,
      full_name,
      location,
      github,
      dp,
      username,
      gender,
      bio,
      cover,
      articles!articles_author_id_fkey (
        created_at,
        author_id,
        id,
        title,
        description,
        cover,
        co_authors_articles (
          authors (
            dp,
            full_name
          )
        )
      ),
      status_feed (
        body,
        created_at,
        id,
        author_id
      )
      `
    )
    .limit(100)
    .eq("id", id)
    .order("created_at", {
      foreignTable: "status_feed",
      ascending: false,
    })
    .order("created_at", {
      foreignTable: "articles",
      ascending: false,
    });

  var feed = [];
  //@ts-ignore
  if (userData && userData[0]["status_feed"].length > 0) {
    //@ts-ignore
    userData[0]["status_feed"].map((mapped) =>
      feed.push({
        type: "status",
        data: mapped,
        created_at: mapped.created_at,
      })
    );
  }

  //@ts-ignore
  if (userData && userData[0]["articles"].length > 0) {
    //@ts-ignore

    await Promise.all(
      //@ts-ignore
      userData[0]["articles"].map(async (mapped: AfridiDevArticle) => {
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
        var mappa = { ...mapped, cover_base_64: data.placeholder };
        feed.push({
          data: mappa,
          type: "article",
          created_at: mapped.created_at,
        });
      })
    );
  }
  feed.sort((a, b) => {
    return compareDesc(parseISO(a.created_at), parseISO(b.created_at));
  });

  var user = {
    id: userData[0].id,
    full_name: userData[0].full_name,
    github: userData[0].github,
    location: userData[0].location,
    bio: userData[0].bio,
    gender: userData[0].gender,
    username: userData[0].username,
  };

  return {
    props: {
      user: user,
      dpo: userData[0].dp,
      covera: userData[0].cover,
      feedData: feed,
    },
  };
};

export const getStaticPaths = async () => {
  const { data, error } = await supabase.from("authors").select("id").limit(10);

  var ids = [];

  data &&
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
