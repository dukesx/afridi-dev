/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Code,
  CopyButton,
  createStyles,
  Divider,
  Grid,
  Group,
  Input,
  Skeleton,
  Stack,
  Tabs,
  Text,
  ThemeIcon,
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
  IconCopy,
  IconExternalLink,
  IconListDetails,
  IconPhoto,
  IconStar,
  IconTrash,
  IconUpload,
  IconUserCircle,
  IconX,
} from "@tabler/icons";
import React, { Fragment, Suspense, useEffect, useRef, useState } from "react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import SquareHorizontalWidget from "../../../components/landing/widgets/square-horizontal";
import "country-flag-icons/3x2/flags.css";

import { useUser } from "@supabase/auth-helpers-react";
import { showNotification } from "@mantine/notifications";
import ImageUploader, {
  ImageUploaderType,
} from "../../../components/global/image_uploader";
import { MarkDownEditor } from "../../../components/global/editorCaller";
import MarkDownRenderer from "../../../components/global/markdown-renderer";
import { openConfirmModal } from "@mantine/modals";
import { formatDistanceToNow, parseISO } from "date-fns";
import { compareDesc } from "date-fns";
import AfridiImage from "../../../components/global/afridi-image";

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
  const [feed, setFeed] = useState(feedData);
  const [hot, setHot] = useState(null);
  const [thumbsUp, setThumbsUp] = useState(null);
  const { user: usera } = useUser();
  var ref: any = React.createRef();

  const specialStyles = createStyles((theme) => ({
    col: {
      display: "flex",
      flexDirection: "column",

      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
        display: "none",
      },
    },
  }));

  const { classes } = specialStyles();

  const getData = async () => {
    const { data: userData, error: userDataError } = await supabaseClient
      .from("authors")
      .select(
        `
      id,
      firstName,
      lastName,
      location,
      github,
      dp,
      bio,
      cover,
      articles (
        created_at,
        author_id,
        id,
        title,
        description,
        cover,
        co_authors_articles (
          authors (
            dp,
            firstName,
            lastName
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

    if (!userDataError) {
      var feed = [];

      if (userData[0]["status_feed"].length > 0) {
        userData[0]["status_feed"].map((mapped) =>
          feed.push({
            type: "status",
            data: mapped,
            created_at: mapped.created_at,
          })
        );
      }

      if (userData[0]["articles"].length > 0) {
        userData[0]["articles"].map((mapped) =>
          feed.push({
            data: mapped,
            type: "article",
            created_at: mapped.created_at,
          })
        );
      }
      feed.sort((a, b) => {
        return compareDesc(parseISO(a.created_at), parseISO(b.created_at));
      });

      setFeed(feed);
    }
  };

  const getThumbsUpArticles = async () => {
    var date = new Date();
    var date2 = new Date();
    //
    //
    date.setMonth(date.getMonth());
    date2.setMonth(date2.getMonth() - 1);
    //
    //
    const { error, data } = await supabaseClient
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
        ),
        tags!inner(
          title
        )
        `
      )
      .lte("created_at", date.toUTCString())
      .gte("created_at", date2.toUTCString())
      .eq("tags.title", "thumbs-up")
      .order("created_at", {
        ascending: false,
      })
      .limit(3);

    setThumbsUp(data);
  };

  const getHotArticles = async () => {
    const { error, data } = await supabaseClient
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
        ),
          tags!inner (
            title
        )
        `
      )
      .eq("tags.title", "hot")
      .order("created_at", {
        ascending: false,
      })
      .limit(3);
    setHot(data);
  };

  useEffect(() => {
    getThumbsUpArticles();
    getHotArticles();
  }, []);

  const save = (data) => {
    ref = data;
  };

  return (
    <AppWrapper activeHeaderKey="" size="lg">
      <Card
        px={0}
        style={{
          overflow: "unset",
        }}
      >
        <Card.Section className="mx-0">
          {!data ? (
            <Skeleton height={450} />
          ) : (
            <Group className="overflow-hidden">
              {usera ? (
                <ImageUploader
                  className="border-0"
                  type={ImageUploaderType.COVER}
                  theme={theme}
                  user={usera}
                  py={0.01}
                  px={1}
                  setImage={setCover}
                  openRef={openRef2}
                  placeholder={
                    <AfridiImage
                      fillImage={false}
                      height={450}
                      width={1320}
                      path={
                        cover
                          ? `/${cover}`
                          : user.cover
                          ? `/${user.cover}`
                          : colorScheme == "dark"
                          ? "/image-horizontal-placeholder-dark.png"
                          : "/image-horizontal-placeholder.png"
                      }
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  }
                />
              ) : (
                <AfridiImage
                  fillImage={false}
                  height={450}
                  width={1320}
                  path={
                    cover
                      ? `/${cover}`
                      : user.cover
                      ? `/${user.cover}`
                      : colorScheme == "dark"
                      ? "/image-horizontal-placeholder-dark.png"
                      : "/image-horizontal-placeholder.png"
                  }
                  style={{
                    objectFit: "cover",
                  }}
                />
              )}

              {usera ? (
                <Button
                  className="absolute rounded-full top-[20px] right-5"
                  color="blue"
                  variant="filled"
                  leftIcon={<IconPhoto size={15} />}
                  onClick={() => openRef2.current()}
                >
                  Change Cover
                </Button>
              ) : null}
            </Group>
          )}
        </Card.Section>

        <Stack className="max-w-[1000px] mx-auto">
          <Group position="apart">
            <Group className="ml-5 xs:ml-0" pt="xl" py="sm">
              <Avatar className="rounded-full h-[90px] w-[90px] sm:h-[120px] ml-0 sm:ml-6 sm:w-[120px] shadow-lg">
                {!data ? (
                  <Skeleton height={120} />
                ) : dp ? (
                  <Group>
                    {usera ? (
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
                    {usera ? (
                      <ImageUploader
                        type={ImageUploaderType.DP}
                        theme={theme}
                        user={usera}
                        setImage={setDp}
                        openRef={openRef}
                        placeholder={
                          <AfridiImage
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
                ) : null}
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
                      {data["firstName"] + " " + data["lastName"]}
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
                <Grid.Col span={12} sm={7}>
                  <Stack className="py-5 px-0 sm:pt-10 sm:pr-10" spacing="xl">
                    {usera && user.id == id ? (
                      <Fragment>
                        <Input.Wrapper className="w-full" label="">
                          <MarkDownEditor
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
                                  getData();
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
                              <Card pb="md" key={"alo" + index} withBorder>
                                <Group position="apart" mb={20}>
                                  <Group>
                                    <Avatar className="rounded-full h-[50px] w-[50px] ml-0 rounded-full">
                                      {!data ? (
                                        <Skeleton height={40} />
                                      ) : dp ? (
                                        <AfridiImage
                                          fillImage={false}
                                          className=""
                                          height={50}
                                          width={50}
                                          path={
                                            dp
                                              ? `/${dp}`
                                              : colorScheme == "dark"
                                              ? "/image-avatar-placeholder-dark.png"
                                              : `/image-avatar-placeholder.png`
                                          }
                                        />
                                      ) : null}
                                    </Avatar>
                                    <Stack spacing={0}>
                                      <Text size={13} weight={600}>
                                        {data ? (
                                          data.firstName + " " + data.lastName
                                        ) : (
                                          <Skeleton height={10} width={100} />
                                        )}
                                      </Text>
                                      <Text
                                        className="capitalize"
                                        color="dimmed"
                                        size={10}
                                      >
                                        {" "}
                                        {formatDistanceToNow(
                                          new Date(mapped.data.created_at)
                                        ) + " ago"}
                                      </Text>
                                    </Stack>
                                  </Group>
                                  {usera &&
                                  usera.id == mapped.data.author_id &&
                                  mapped.type == "status" ? (
                                    <Button
                                      size="xs"
                                      radius="xl"
                                      color="red"
                                      variant="subtle"
                                      className="rounded-full py-1 px-1.5"
                                      onClick={() => {
                                        openConfirmModal({
                                          title: (
                                            <Text size="md" weight={700}>
                                              Delete Status
                                            </Text>
                                          ),
                                          centered: true,
                                          children: (
                                            <Text
                                              mb="lg"
                                              size="sm"
                                              color="dimmed"
                                            >
                                              You are about to delete a status.
                                              Are you sure you want to delete it
                                              ? This action cannot be
                                              <b className="ml-1 underline font-medium text-red-600 decoration-red-600 decoration-2">
                                                UNDONE
                                              </b>
                                            </Text>
                                          ),
                                          confirmProps: { color: "red" },
                                          labels: {
                                            confirm: "Yes, delete it",
                                            cancel: "No, don't delete it",
                                          },
                                          onConfirm: async () => {
                                            const { error } =
                                              await supabaseClient
                                                .from("feed")
                                                .delete()
                                                .match({
                                                  id: mapped.id,
                                                });

                                            if (!error) {
                                              showNotification({
                                                title: "Success",
                                                message:
                                                  "Status deleted successfully",
                                                color: "teal",
                                                icon: <IconCheck />,
                                              });
                                              setFeed(null);
                                              getData();
                                            }
                                          },
                                          onCancel: () => {},
                                        });
                                      }}
                                    >
                                      <IconTrash size={18} />
                                    </Button>
                                  ) : null}
                                  {mapped.type == "article" ? (
                                    <Tooltip
                                      position="top"
                                      label="An article on Afridi.dev"
                                    >
                                      <ThemeIcon
                                        className="cursor-help"
                                        size={40}
                                        variant="light"
                                        radius="xl"
                                      >
                                        <Text>✏️</Text>
                                      </ThemeIcon>
                                    </Tooltip>
                                  ) : null}
                                </Group>
                                {mapped.type == "status" ? (
                                  <MarkDownRenderer
                                    className="mb-5"
                                    key={index + "alo"}
                                  >
                                    {mapped.data.body}
                                  </MarkDownRenderer>
                                ) : (
                                  <Stack>
                                    <Text size="sm">
                                      {mapped.data.description}
                                    </Text>
                                    <Card
                                      component="a"
                                      href="#"
                                      onClick={() => {
                                        if (mapped.type == "article") {
                                          window.open(
                                            `/article/${mapped.data.id}`,
                                            "_blank"
                                          );
                                        }
                                      }}
                                      withBorder
                                    >
                                      <Card.Section>
                                        <AfridiImage
                                          fillImage={true}
                                          path={mapped.data.cover}
                                          height={300}
                                          width={300}
                                        />
                                      </Card.Section>
                                      <Group
                                        className="w-full"
                                        position="apart"
                                      >
                                        <Stack className="w-full" spacing={3}>
                                          <Title mt="xl" order={5}>
                                            {mapped.data.title}
                                          </Title>
                                        </Stack>
                                        <Text
                                          className="max-w-[90%]"
                                          lineClamp={2}
                                          size="xs"
                                          color="dimmed"
                                        >
                                          {mapped.data.description}
                                        </Text>
                                        <Tooltip label="Open link in new tab">
                                          <ActionIcon
                                            color="blue"
                                            variant="subtle"
                                            component="div"
                                            onClick={() => {
                                              window.open(
                                                `/article/${mapped.data.id}`,
                                                "_blank"
                                              );
                                            }}
                                          >
                                            <IconExternalLink size={20} />
                                          </ActionIcon>
                                        </Tooltip>
                                      </Group>
                                    </Card>
                                  </Stack>
                                )}
                              </Card>
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

                <Grid.Col span={0} sm={5}>
                  <Stack spacing="xl" className="sticky top-8 mt-8 pb-10 ml-10">
                    <Suspense>
                      <SquareHorizontalWidget
                        title="ON FIRE"
                        icon="🔥"
                        theme={theme}
                        color="orange"
                        data={hot ? hot : []}
                      />
                    </Suspense>

                    <Suspense>
                      <SquareHorizontalWidget
                        title="Thumbs up"
                        icon="👍‍"
                        theme={theme}
                        color="yellow"
                        data={thumbsUp ? thumbsUp : []}
                      />
                    </Suspense>
                  </Stack>
                </Grid.Col>
              </Grid>
            </Tabs.Panel>

            <Tabs.Panel value="exclusive" pt="xs">
              <Stack className="text-center mx-auto max-w-[600px]" mt="xl">
                <Title order={3}>What&apos;s this?</Title>
                <Text size="sm" className="px-4">
                  If everything goes according to plan, you can upload here your
                  <b className="italic underline decoration-cyan-400 ml-1 mr-0.5 decoration-2">
                    EXCLUSIVE
                  </b>{" "}
                  stuff like Paid App/Website/Theme Codes (Wordpress/Seperate
                  PHP etc), Premium/Paid Articles, Paid/Premium Courses
                  (Short/Long) etc that you will sell eventually for membership
                  or retail price
                  <b className="mx-1">(PERKS)</b>. Think of this feature like an
                  ONLYFANS or{" "}
                  <a target="blank" href="https://codecanyon.net">
                    CodeCanyon
                  </a>{" "}
                  but for DEVS.
                </Text>
              </Stack>

              <Text className="text-center" mt="xl">
                Coming soon in <b>Version 2</b>. Stay Tuned 😇
              </Text>

              <Group className="w-full" position="center" mt="xl">
                <Text size="sm" className="text-center">
                  Follow the repo for progress 👉{" "}
                </Text>
                <Code>
                  <Text size="sm">https://github.com/dukesx/afridi-dev</Text>
                </Code>
                <CopyButton value="https://github.com/dukesx/afridi-dev">
                  {({ copied, copy }) => (
                    <Tooltip label={copied ? "Copied url!" : "Copy url"}>
                      <ActionIcon
                        size="sm"
                        color={copied ? "teal" : "blue"}
                        onClick={copy}
                      >
                        {copied ? <IconCheck /> : <IconCopy />}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
                <Tooltip label="Open link in a new tab">
                  <ActionIcon
                    onClick={() =>
                      window.open(
                        "https://github.com/dukesx/afridi-dev",
                        "_blank"
                      )
                    }
                    variant="light"
                    size="sm"
                    color="cyan"
                  >
                    <IconExternalLink />
                  </ActionIcon>
                </Tooltip>
              </Group>

              <Group px="xs" className="w-full" position="center" mt="xl">
                <Text size="sm">
                  Interested 💪 ? Get Involved in the{" "}
                  <b className="decoration-2 decoration-blue-400 decoration-double underline">
                    RFC
                  </b>{" "}
                  👉
                </Text>
                <Code className="max-w-[290px] px-5 sm:px-0 sm:max-w-[400px]">
                  <Text size="sm" className="truncate">
                    https://github.com/dukesx/afridi-dev/issues/18
                  </Text>
                </Code>
                <CopyButton value="https://github.com/dukesx/afridi-dev/issues/18">
                  {({ copied, copy }) => (
                    <Tooltip label={copied ? "Copied url!" : "Copy url"}>
                      <ActionIcon
                        size="sm"
                        color={copied ? "teal" : "blue"}
                        onClick={copy}
                      >
                        {copied ? <IconCheck /> : <IconCopy />}
                      </ActionIcon>
                    </Tooltip>
                  )}
                </CopyButton>
                <Tooltip label="Open link in a new tab">
                  <ActionIcon
                    onClick={() =>
                      window.open(
                        "https://github.com/dukesx/afridi-dev/issues/18",
                        "_blank"
                      )
                    }
                    variant="light"
                    size="sm"
                    color="cyan"
                  >
                    <IconExternalLink />
                  </ActionIcon>
                </Tooltip>
              </Group>
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
                    <Stack>
                      <Title mt="xl" mb="sm" order={3}>
                        OOoops 😮🤷‍♂️
                      </Title>
                      <Text color="dimmed">This has not been added yet</Text>
                    </Stack>
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
                          <IconBrandGithub
                            strokeWidth={1.5}
                            // stroke={
                            //   colorScheme == "dark" ? theme.white : theme.black
                            // }
                          />
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

export const getStaticProps = async (ctx) => {
  var id = ctx.params.id;
  const { data: userData, error: userDataError } = await supabaseClient
    .from("authors")
    .select(
      `
      id,
      firstName,
      lastName,
      location,
      github,
      dp,
      bio,
      cover,
      articles (
        created_at,
        author_id,
        id,
        title,
        description,
        cover,
        co_authors_articles (
          authors (
            dp,
            firstName,
            lastName
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

  if (userData[0]["status_feed"].length > 0) {
    userData[0]["status_feed"].map((mapped) =>
      feed.push({
        type: "status",
        data: mapped,
        created_at: mapped.created_at,
      })
    );
  }

  if (userData[0]["articles"].length > 0) {
    userData[0]["articles"].map((mapped) =>
      feed.push({
        data: mapped,
        type: "article",
        created_at: mapped.created_at,
      })
    );
  }
  feed.sort((a, b) => {
    return compareDesc(parseISO(a.created_at), parseISO(b.created_at));
  });

  var user = {
    id: userData[0].id,
    firstName: userData[0].firstName,
    lastName: userData[0].lastName,
    github: userData[0].github,
    location: userData[0].location,
    bio: userData[0].bio,
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
  const { data, error } = await supabaseClient.from("authors").select("id");

  var ids = [];

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
