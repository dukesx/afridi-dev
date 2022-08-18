/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  Avatar,
  Badge,
  Blockquote,
  Button,
  Card,
  Code,
  CopyButton,
  createStyles,
  Divider,
  Grid,
  Group,
  Header,
  Input,
  List,
  Loader,
  Skeleton,
  Stack,
  Table,
  Tabs,
  Text,
  Title,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useRouter } from "next/router";
import AppWrapper from "../../../components/global/wrapper";
import AfridiImage, {
  AfridiImageLoadingEnum,
} from "../../../components/global/afridi-image";
import {
  IconArrowRight,
  IconBrandGithub,
  IconCheck,
  IconCode,
  IconCopy,
  IconExternalLink,
  IconListDetails,
  IconPencilPlus,
  IconPhoto,
  IconStar,
  IconTrash,
  IconUpload,
  IconUserCircle,
  IconX,
} from "@tabler/icons";
import React, { Fragment, useEffect, useRef, useState } from "react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import NoDataPlaceholder from "../../../public/nodata.svg";
import HorizontalGridCard, {
  CardStyle,
} from "../../../components/global/grid-cards/horizontalGridCard";
import SquareHorizontalWidget from "../../../components/landing/widgets/square-horizontal";
import "country-flag-icons/3x2/flags.css";
import dynamic from "next/dynamic";

import { useUser } from "@supabase/auth-helpers-react";
import { showNotification } from "@mantine/notifications";
import ImageUploader, {
  ImageUploaderType,
} from "../../../components/global/image_uploader";
import { MarkDownEditor } from "../../../components/global/editorCaller";
import "@toast-ui/editor/dist/toastui-editor.css";
import MarkDownRenderer from "../../../components/global/markdown-renderer";
import { openConfirmModal } from "@mantine/modals";
import { formatDistanceToNow } from "date-fns";

const UserProfilePage = () => {
  const router = useRouter();
  const { id } = router.query;
  const theme = useMantineTheme();
  const [data, setData] = useState(null);
  const { colorScheme } = useMantineColorScheme();
  const [dp, setDp] = useState(null);
  const [cover, setCover] = useState(null);
  const { user } = useUser();
  const openRef = useRef<() => void>(null);
  const openRef2 = useRef<() => void>(null);
  const [submittingStatus, setSubmittingStatus] = useState(false);
  const [feed, setFeed] = useState(null);
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
        id
      ),
      feed (
        body,
        created_at,
        id,
        author_id
      )
      `
      )
      .eq("id", id)
      .order("created_at", {
        foreignTable: "feed",
        ascending: false,
      })
      .order("created_at", {
        foreignTable: "articles",
        ascending: false,
      });

    if (!userDataError) {
      setData(userData[0]);
      setDp(userData[0].dp);
      setCover(userData[0].cover);
      var feed = [];

      if (userData[0]["feed"].length > 0) {
        userData[0]["feed"].map((mapped) => feed.push(mapped));
      }

      if (userData[0]["articles"].length > 0) {
        userData[0]["articles"].map((mapped) => feed.push(mapped));
      }

      setFeed(feed);
    }
  };

  useEffect(() => {
    getData();
  }, []);

  const save = (data) => {
    ref = data;
  };

  return (
    <AppWrapper activeHeaderKey="" size="lg">
      <Card px={0} className="w-full">
        <Card.Section className="">
          {!data ? (
            <Skeleton height={450} />
          ) : (
            <Group>
              {user ? (
                <ImageUploader
                  className="border-0"
                  type={ImageUploaderType.COVER}
                  theme={theme}
                  user={user}
                  py={0.01}
                  setImage={setCover}
                  openRef={openRef2}
                  placeholder={
                    <AfridiImage
                      height={450}
                      width={1320}
                      path={
                        cover
                          ? `/${cover}`
                          : colorScheme == "dark"
                          ? "/image-horizontal-placeholder-dark.png"
                          : "/image-horizontal-placeholder.png"
                      }
                      loading={AfridiImageLoadingEnum.LAZY}
                      style={{
                        objectFit: "cover",
                      }}
                    />
                  }
                />
              ) : (
                <AfridiImage
                  height={450}
                  width={1320}
                  path={
                    cover
                      ? `/${cover}`
                      : colorScheme == "dark"
                      ? "/image-horizontal-placeholder-dark.png"
                      : "/image-horizontal-placeholder.png"
                  }
                  loading={AfridiImageLoadingEnum.LAZY}
                  style={{
                    objectFit: "cover",
                  }}
                />
              )}

              {user ? (
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

        <Stack className="max-w-[1000px]">
          <Group position="apart">
            <Group pt="xl" py="sm">
              <Avatar className="rounded-full h-[90px] w-[90px] sm:h-[120px] ml-0 sm:ml-6 sm:w-[120px] shadow-lg">
                {!data ? (
                  <Skeleton height={120} />
                ) : dp ? (
                  <Group>
                    {user ? (
                      <Button
                        className="absolute z-[100] rounded-full p-1 bottom-1 left-8 sm:bottom-[6px] right-0 sm:left-12 h-[30px] w-[30px]"
                        size="xs"
                        color="blue"
                        variant="filled"
                        onClick={() => openRef.current()}
                      >
                        <IconUpload size={15} />
                      </Button>
                    ) : null}
                    {user ? (
                      <ImageUploader
                        type={ImageUploaderType.DP}
                        theme={theme}
                        user={user}
                        setImage={setDp}
                        openRef={openRef}
                        placeholder={
                          <AfridiImage
                            className=""
                            height={140}
                            width={140}
                            path={
                              dp
                                ? `/${dp}`
                                : colorScheme == "dark"
                                ? "/image-avatar-placeholder-dark.png"
                                : `/image-avatar-placeholder.png`
                            }
                            loading={AfridiImageLoadingEnum.LAZY}
                          />
                        }
                      />
                    ) : (
                      <AfridiImage
                        className=""
                        height={140}
                        width={140}
                        path={
                          dp
                            ? `/${dp}`
                            : colorScheme == "dark"
                            ? "/image-avatar-placeholder-dark.png"
                            : `/image-avatar-placeholder.png`
                        }
                        loading={AfridiImageLoadingEnum.LAZY}
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

          <Tabs
            className="pb-16 min-h-[400px]"
            color="blue"
            defaultValue="feed"
          >
            <Tabs.List grow position="center">
              <Tabs.Tab
                value="feed"
                icon={
                  <IconListDetails size={20} color={theme.colors.cyan[6]} />
                }
              >
                Status Feed
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
                Exclusive Content
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
                  <Stack className="py-5 px-0 sm:p-5" spacing="xl">
                    {user && user.id == id ? (
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
                                .from("feed")
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
                                showNotification({
                                  title: "Success",
                                  message: "Status submitted",
                                  color: "teal",
                                  icon: <IconCheck />,
                                });
                                setFeed(null);
                                getData();
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

                    {data ? (
                      feed ? (
                        feed.length > 0 ? (
                          feed.map((mapped, index) => (
                            <Card pb="md" key={"alo" + index} withBorder>
                              <Group position="apart" mb={30}>
                                <Group>
                                  <Avatar className="rounded-full h-[40px] w-[40px] ml-0 rounded-full">
                                    {!data ? (
                                      <Skeleton height={40} />
                                    ) : dp ? (
                                      <AfridiImage
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
                                        loading={AfridiImageLoadingEnum.LAZY}
                                      />
                                    ) : null}
                                  </Avatar>
                                  <Stack spacing={0}>
                                    <Text size={13} weight={600}>
                                      Afzaal Afridi
                                    </Text>
                                    <Text color="dimmed" size={10}>
                                      {" "}
                                      {formatDistanceToNow(
                                        new Date(mapped.created_at)
                                      ) + " ago"}
                                    </Text>
                                  </Stack>
                                </Group>
                                {user && user.id == mapped.author_id ? (
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
                                            Are you sure you want to delete it ?
                                            This action cannot be
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
                                          const { error } = await supabaseClient
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
                              </Group>

                              <MarkDownRenderer
                                className="mb-5"
                                key={index + "alo"}
                              >
                                {mapped.body}
                              </MarkDownRenderer>
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
                    {/* <HorizontalGridCard
                          style={CardStyle.FEED}
                          theme={theme}
                        />
                        <HorizontalGridCard
                          style={CardStyle.FEED}
                          theme={theme}
                        />
                        <HorizontalGridCard
                          style={CardStyle.FEED}
                          theme={theme}
                        /> */}
                  </Stack>
                </Grid.Col>

                <Grid.Col className={classes.col} span={0} sm={5}>
                  <Stack spacing="xl" mt="xl">
                    <SquareHorizontalWidget
                      title="Must Reads"
                      icon="👀"
                      theme={theme}
                      color="cyan"
                    />
                    <SquareHorizontalWidget
                      title="Must Reads"
                      icon="👀"
                      theme={theme}
                      color="cyan"
                    />
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
