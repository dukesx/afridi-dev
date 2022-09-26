/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */
import {
  Button,
  Group,
  Header,
  type MantineTheme,
  MediaQuery,
  Menu,
  Stack,
  Text,
  useMantineColorScheme,
  Divider,
  Avatar,
  ThemeIcon,
  ActionIcon,
  Card,
  Skeleton,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import {
  IconArrowDown,
  IconBookmarks,
  IconBulb,
  IconChecklist,
  IconChevronDown,
  IconChevronRight,
  IconDice,
  IconExternalLink,
  IconEyeOff,
  IconHash,
  IconHeartHandshake,
  IconLogout,
  IconMoon,
  IconNews,
  IconPencil,
  IconScale,
  IconSettings,
  IconSmartHome,
  IconSun,
  IconUserCircle,
  IconVersions,
} from "@tabler/icons";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";
import React, { Fragment, useEffect, useState } from "react";
import { GeneralStore } from "../../data/static/store";
import PublishArticle from "../../public/publish-article.svg";
import AfridiImage from "./afridi-image";
import CreatorStudioIcon from "./creator-studio-icon";

interface GlobalHeaderProps {
  activeHeaderKey: string;
  theme: MantineTheme;
}
const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  activeHeaderKey,
  theme,
}) => {
  const { isLoading, session, error, supabaseClient } = useSessionContext();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const [userData, setUserData] = useState(null);
  //
  //
  //
  //
  const router = useRouter();

  //
  //

  const getUserDetails = async () => {
    const { data, error } = await supabaseClient
      .from("authors")
      .select(
        `
      firstName,
      lastName,
      role,
      dp
      `
      )
      .eq("id", session.user.id);

    setUserData(data[0]);
  };
  //
  //

  useEffect(() => {
    if (session) {
      getUserDetails();
    }
  }, [isLoading]);

  return (
    <Header
      className="w-full"
      zIndex={1000}
      styles={{
        root: {
          zIndex: 200,
        },
      }}
      height={70}
    >
      <Stack className="h-full w-full" justify="center" spacing={0}>
        <Group
          className="w-full align-middle h-full"
          position="center"
          spacing={0}
        >
          {/* <Stack className="h-full" align="center" justify="center" spacing={0}> */}
          <Link href="/" passHref>
            <Group className="cursor-pointer" spacing={0}>
              <Text
                className="ml-5 xs:ml-5 sm:ml-5 md:ml-5 lg:ml-5 xl:ml-5 font-mono text-sm xs:text-xl hidden xs:block"
                size="xl"
                weight={400}
                color={theme.colorScheme == "dark" ? theme.white : "blue"}
              >
                AFRIDI.{"</"}
              </Text>
              <Group
                className="ml-2 font-mono"
                noWrap
                spacing={3}
                position="center"
                align="center"
              >
                <Text
                  className="text-lg xs:text-sm"
                  color={theme.colorScheme == "dark" ? theme.white : "cyan"}
                  size="xs"
                  weight={500}
                >
                  The
                </Text>
                <Text
                  className="text-lg xs:text-sm mx-1 xs:mx-0"
                  size="xs"
                  weight={800}
                  color={theme.colorScheme == "dark" ? theme.white : "blue"}
                >
                  DEV&apos;s
                </Text>
                <Text
                  className="text-lg xs:text-sm"
                  size="xs"
                  weight={500}
                  color={theme.colorScheme == "dark" ? theme.white : "cyan"}
                >
                  Blog
                </Text>
                <Text
                  className="font-mono ml-1 text-2xl xs:text-xl"
                  size="xl"
                  weight={400}
                  color={theme.colorScheme == "dark" ? theme.white : "blue"}
                >
                  {" >"}
                </Text>
              </Group>
            </Group>
          </Link>

          {/* </Stack> */}
          <MediaQuery
            smallerThan={1000}
            styles={{
              display: "none",
            }}
          >
            <Group
              ml="auto"
              position="apart"
              align="center"
              className="mr-5 align-middle h-full"
            >
              <Link href="/" passHref>
                <Button
                  leftIcon={<IconSmartHome size={18} />}
                  variant={activeHeaderKey == "home" ? "light" : "subtle"}
                  color="blue"
                  component="a"
                >
                  Home
                </Button>
              </Link>

              <Link href="/tags" passHref>
                <Button
                  leftIcon={<IconHash size={18} />}
                  variant={activeHeaderKey == "tags" ? "gradient" : "subtle"}
                  gradient={
                    activeHeaderKey == "tags"
                      ? {
                          from: "blue",
                          to: "cyan",
                        }
                      : null
                  }
                  color="blue"
                  component="a"
                >
                  Tags
                </Button>
              </Link>

              <Link href="/dazzle-me" passHref>
                <Button
                  leftIcon={<IconDice size={18} />}
                  variant={
                    activeHeaderKey == "dazzle-me" ? "gradient" : "subtle"
                  }
                  gradient={
                    activeHeaderKey == "dazzle-me"
                      ? {
                          from: "indigo",
                          to: "blue",
                        }
                      : null
                  }
                  color="indigo"
                  component="a"
                >
                  Random Article
                </Button>
              </Link>

              <Menu width={200}>
                <Menu.Target>
                  <Button
                    variant="subtle"
                    rightIcon={<IconArrowDown size={18} />}
                  >
                    More
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Label>
                    <Text weight={600}>Legal</Text>
                  </Menu.Label>

                  <Menu.Item
                    component={NextLink}
                    href="/legal/privacy-policy"
                    icon={<Text size="lg">👀</Text>}
                  >
                    Privacy Policy
                  </Menu.Item>
                  <Menu.Item
                    component={NextLink}
                    href="/legal/terms"
                    icon={<Text size="lg">⚖️</Text>}
                  >
                    Terms
                  </Menu.Item>

                  <Menu.Label>
                    <Text weight={600}>About</Text>
                  </Menu.Label>
                  <Menu.Item
                    component={NextLink}
                    href="/about/dev"
                    icon={
                      <IconUserCircle color={theme.colors.cyan[6]} size={20} />
                    }
                  >
                    <Group spacing={5}>
                      <Text>The</Text>
                      <Stack spacing={0}>
                        <Text color="cyan" weight={700} className="">
                          DEV
                        </Text>
                        <Divider color="cyan" size="xs" />
                      </Stack>
                    </Group>
                  </Menu.Item>
                  <Menu.Item
                    component={NextLink}
                    href="/about/vision"
                    icon={
                      <IconBulb
                        color={theme.colors.yellow[6]}
                        // fill={theme.colors.yellow[6]}
                        size={20}
                      />
                    }
                  >
                    The Vision
                  </Menu.Item>
                  <Menu.Item
                    component={NextLink}
                    href="/about/roadmap"
                    icon={
                      <IconVersions color={theme.colors.blue[6]} size={20} />
                    }
                  >
                    The Roadmap
                  </Menu.Item>

                  <Menu.Item
                    component={NextLink}
                    href="/about/acknowledgements"
                    icon={<Text size="lg">🤝</Text>}
                  >
                    Acknowledgements
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </MediaQuery>

          <Group className="max-w-[200px] xs:max-w-[250px] ml-auto" spacing={0}>
            {isLoading ? (
              <Skeleton radius="xl" height={35} width={150} mr="sm" />
            ) : session ? (
              <Fragment>
                <Menu
                  zIndex={1000}
                  styles={{
                    dropdown: {
                      zIndex: 1000,
                    },
                    item: {
                      zIndex: 1000,
                    },
                  }}
                  width={300}
                  position="bottom-end"
                >
                  <Menu.Target>
                    <Button
                      leftIcon={<IconPencil size={18} />}
                      color="blue"
                      variant="subtle"
                      radius="xl"
                      rightIcon={
                        <IconChevronDown
                          size={18}
                          className="align-super mt-0.5"
                        />
                      }
                      className="mr-1 xs:mr-4 text-xs xs:text-sm"
                    >
                      Compose
                    </Button>
                  </Menu.Target>
                  <Menu.Dropdown>
                    <Menu.Item
                      component={NextLink}
                      passHref
                      href="/creator-studio/publish/article"
                    >
                      <Stack align="center" spacing={0}>
                        <Image
                          alt=""
                          src={PublishArticle}
                          height={200}
                          width={200}
                        />
                        <Text mt="xl" weight={700}>
                          ARTICLE
                        </Text>
                        <Text
                          className="text-center capitalize"
                          size="xs"
                          color="dimmed"
                        >
                          Craft beautiful articles like <b>Dev.to</b>,{" "}
                          <b>Hashnode</b>, <b>Medium</b> & More
                        </Text>
                      </Stack>
                    </Menu.Item>
                  </Menu.Dropdown>
                </Menu>

                <Group>
                  <Menu position="bottom-end">
                    <Menu.Target>
                      <Button
                        px={5}
                        className="mr-2 xs:mr-5 max-w-[90px] h-[50px] xs:h-[45px]"
                        radius="xl"
                        variant="subtle"
                      >
                        <Group className="items-center h-full">
                          <Avatar
                            color="cyan"
                            className="h-[40px]"
                            radius="xl"
                          />
                        </Group>
                      </Button>
                    </Menu.Target>
                    <Menu.Dropdown className="w-[250px] xs:w-[300px]">
                      <Card>
                        <Group noWrap>
                          <Avatar size={50} radius="xl">
                            <AfridiImage
                              priority
                              width={60}
                              height={60}
                              path={userData && userData.dp}
                            />
                          </Avatar>
                          <Stack spacing={0}>
                            {userData ? (
                              <Text
                                className="max-w-[200px]"
                                lineClamp={1}
                                weight={700}
                                size="sm"
                              >
                                {userData.firstName + " " + userData.lastName}
                              </Text>
                            ) : null}

                            <Text
                              color="dimmed"
                              className="capitalize"
                              size="xs"
                            >
                              {userData && userData.role}
                            </Text>
                          </Stack>
                        </Group>
                      </Card>

                      <Menu.Item
                        component={NextLink}
                        href={`/author/${session.user.id}`}
                        rightSection={
                          <IconChevronRight
                            className="align-middle"
                            color={theme.colors.dark[1]}
                            size={22}
                          />
                        }
                        icon={<IconUserCircle color={theme.colors.cyan[4]} />}
                      >
                        Profile
                      </Menu.Item>

                      <Menu.Item
                        component={NextLink}
                        href={`/author/${session.user.id}/bookmarks`}
                        rightSection={
                          <IconChevronRight
                            className="align-middle"
                            color={theme.colors.dark[1]}
                            size={22}
                          />
                        }
                        icon={<IconBookmarks color={theme.colors.gray[6]} />}
                      >
                        Bookmarks
                      </Menu.Item>
                      <Menu.Item
                        component={NextLink}
                        href={`/author/${session.user.id}/settings`}
                        rightSection={
                          <IconChevronRight
                            className="align-middle"
                            color={theme.colors.dark[1]}
                            size={22}
                          />
                        }
                        icon={<IconSettings color={theme.colors.blue[4]} />}
                      >
                        Settings
                      </Menu.Item>

                      <Menu.Label>Creator Studio</Menu.Label>

                      <Menu.Item
                        component={NextLink}
                        href={`/creator-studio`}
                        rightSection={
                          <IconChevronRight
                            className="align-middle"
                            color={theme.colors.dark[1]}
                            size={22}
                          />
                        }
                        icon={<CreatorStudioIcon />}
                      >
                        Visit Studio
                      </Menu.Item>

                      <Menu.Item
                        component={NextLink}
                        href={`/creator-studio/my-articles`}
                        rightSection={
                          <IconChevronRight
                            className="align-middle"
                            color={theme.colors.dark[1]}
                            size={22}
                          />
                        }
                        icon={
                          <ActionIcon
                            className="rounded-full"
                            size="lg"
                            radius="xl"
                            color="blue"
                            variant="subtle"
                          >
                            <IconNews size={24} />
                          </ActionIcon>
                        }
                      >
                        My Articles
                      </Menu.Item>
                      <Menu.Label>Actions</Menu.Label>
                      <Menu.Item
                        onClick={() => toggleColorScheme()}
                        icon={
                          <Avatar
                            size={35}
                            radius="xl"
                            styles={{
                              placeholder: {
                                backgroundColor:
                                  colorScheme == "dark"
                                    ? theme.colors.yellow[6]
                                    : theme.black,
                              },
                            }}
                          >
                            {colorScheme == "dark" ? (
                              <IconSun color={theme.white} size={20} />
                            ) : (
                              <IconMoon color={theme.white} size={20} />
                            )}
                          </Avatar>
                        }
                      >
                        {colorScheme == "dark"
                          ? "Toggle Light Mode"
                          : "Toggle Dark Mode"}
                      </Menu.Item>
                      <Menu.Item
                        mb="sm"
                        icon={
                          <IconLogout
                            color={theme.colors.yellow[6]}
                            size={22}
                          />
                        }
                        onClick={async () => {
                          await supabaseClient.auth.signOut();
                        }}
                      >
                        Sign out
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
              </Fragment>
            ) : (
              <Link href="/get-started" passHref>
                <Button
                  component="a"
                  radius="xl"
                  rightIcon={
                    <IconExternalLink className="align-middle" size={20} />
                  }
                  className="mr-5 xs:mr-5 xs:ml-2 sm:mr-5 md:mr-5 lg:mr-5 xl:mr-5 text-sm w-[150px] xs:w-full"
                  variant="gradient"
                  gradient={{
                    from: "cyan",
                    to: "blue",
                  }}
                >
                  Get Started
                </Button>
              </Link>
            )}
            {/* {isLoading == false ? (
              session && session.user && userData ? (
                <Fragment>
                  <Menu width={300} position="bottom-end">
                    <Menu.Target>
                      <Button
                        leftIcon={<IconPencil size={18} />}
                        color="blue"
                        variant="subtle"
                        radius="xl"
                        rightIcon={
                          <IconChevronDown
                            size={18}
                            className="align-super mt-0.5"
                          />
                        }
                        className="mr-1 xs:mr-4 text-xs xs:text-sm"
                      >
                        Compose
                      </Button>
                    </Menu.Target>
                    <Menu.Dropdown>
                      <Menu.Item
                        component={NextLink}
                        passHref
                        href="/creator-studio/publish/article"
                      >
                        <Stack align="center" spacing={0}>
                          <Image
                            alt=""
                            src={PublishArticle}
                            height={200}
                            width={200}
                          />
                          <Text mt="xl" weight={700}>
                            ARTICLE
                          </Text>
                          <Text
                            className="text-center capitalize"
                            size="xs"
                            color="dimmed"
                          >
                            Craft beautiful articles like <b>Dev.to</b>,{" "}
                            <b>Hashnode</b>, <b>Medium</b> & More
                          </Text>
                        </Stack>
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>

                  <Group>
                    <Menu position="bottom-end">
                      <Menu.Target>
                        <Button
                          px={5}
                          className="mr-2 xs:mr-5 max-w-[90px] h-[50px] xs:h-[45px]"
                          radius="xl"
                          variant="subtle"
                        >
                          <Group className="items-center h-full">
                            <Avatar
                              color="cyan"
                              className="h-[40px]"
                              radius="xl"
                            />
                          </Group>
                        </Button>
                      </Menu.Target>
                      <Menu.Dropdown className="w-[250px] xs:w-[300px]">
                        <Card>
                          <Group noWrap>
                            <Avatar size={50} radius="xl">
                              <AfridiImage
                                priority
                                width={60}
                                height={60}
                                path={userData.dp}
                              />
                            </Avatar>
                            <Stack spacing={0}>
                              <Text
                                className="max-w-[200px]"
                                lineClamp={1}
                                weight={700}
                                size="sm"
                              >
                                {userData.firstName + " " + userData.lastName}
                              </Text>
                              <Text
                                color="dimmed"
                                className="capitalize"
                                size="xs"
                              >
                                {userData.role}
                              </Text>
                            </Stack>
                          </Group>
                        </Card>

                        <Menu.Item
                          component={NextLink}
                          href={`/author/${session.user.id}`}
                          rightSection={
                            <IconChevronRight
                              className="align-middle"
                              color={theme.colors.dark[1]}
                              size={22}
                            />
                          }
                          icon={<IconUserCircle color={theme.colors.cyan[4]} />}
                        >
                          Profile
                        </Menu.Item>

                        <Menu.Item
                          component={NextLink}
                          href={`/author/${session.user.id}/bookmarks`}
                          rightSection={
                            <IconChevronRight
                              className="align-middle"
                              color={theme.colors.dark[1]}
                              size={22}
                            />
                          }
                          icon={<IconBookmarks color={theme.colors.gray[6]} />}
                        >
                          Bookmarks
                        </Menu.Item>
                        <Menu.Item
                          component={NextLink}
                          href={`/author/${session.user.id}/settings`}
                          rightSection={
                            <IconChevronRight
                              className="align-middle"
                              color={theme.colors.dark[1]}
                              size={22}
                            />
                          }
                          icon={<IconSettings color={theme.colors.blue[4]} />}
                        >
                          Settings
                        </Menu.Item>

                        <Menu.Label>Creator Studio</Menu.Label>

                        <Menu.Item
                          component={NextLink}
                          href={`/creator-studio`}
                          rightSection={
                            <IconChevronRight
                              className="align-middle"
                              color={theme.colors.dark[1]}
                              size={22}
                            />
                          }
                          icon={<CreatorStudioIcon />}
                        >
                          Visit Studio
                        </Menu.Item>

                        <Menu.Item
                          component={NextLink}
                          href={`/creator-studio/my-articles`}
                          rightSection={
                            <IconChevronRight
                              className="align-middle"
                              color={theme.colors.dark[1]}
                              size={22}
                            />
                          }
                          icon={
                            <ActionIcon
                              className="rounded-full"
                              size="lg"
                              radius="xl"
                              color="blue"
                              variant="subtle"
                            >
                              <IconNews size={24} />
                            </ActionIcon>
                          }
                        >
                          My Articles
                        </Menu.Item>
                        <Menu.Label>Actions</Menu.Label>
                        <Menu.Item
                          onClick={() => toggleColorScheme()}
                          icon={
                            <Avatar
                              size={35}
                              radius="xl"
                              styles={{
                                placeholder: {
                                  backgroundColor:
                                    colorScheme == "dark"
                                      ? theme.colors.yellow[6]
                                      : theme.black,
                                },
                              }}
                            >
                              {colorScheme == "dark" ? (
                                <IconSun color={theme.white} size={20} />
                              ) : (
                                <IconMoon color={theme.white} size={20} />
                              )}
                            </Avatar>
                          }
                        >
                          {colorScheme == "dark"
                            ? "Toggle Light Mode"
                            : "Toggle Dark Mode"}
                        </Menu.Item>
                        <Menu.Item
                          mb="sm"
                          icon={
                            <IconLogout
                              color={theme.colors.yellow[6]}
                              size={22}
                            />
                          }
                          onClick={async () => {
                            await supabaseClient.auth.signOut();
                          }}
                        >
                          Sign out
                        </Menu.Item>
                      </Menu.Dropdown>
                    </Menu>
                  </Group>
                </Fragment>
              ) : (
                <Link href="/get-started" passHref>
                  <Button
                    component="a"
                    radius="xl"
                    rightIcon={
                      <IconExternalLink className="align-middle" size={20} />
                    }
                    className="mr-5 xs:mr-5 xs:ml-2 sm:mr-5 md:mr-5 lg:mr-5 xl:mr-5 text-sm w-[150px] xs:w-full"
                    variant="gradient"
                    gradient={{
                      from: "cyan",
                      to: "blue",
                    }}
                  >
                    Get Started
                  </Button>
                </Link>
              )
            ) : (
              <Skeleton height={45} width={230} pr="md" />
            )} */}
          </Group>
        </Group>
      </Stack>
    </Header>
  );
};
export default GlobalHeader;
