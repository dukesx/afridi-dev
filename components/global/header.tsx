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
  Card,
  Avatar,
  Skeleton,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import {
  IconArrowDown,
  IconBulb,
  IconCaretDown,
  IconCaretRight,
  IconChecklist,
  IconChevronDown,
  IconChevronLeft,
  IconChevronRight,
  IconDice,
  IconExternalLink,
  IconEyeOff,
  IconHash,
  IconLogout,
  IconMoon,
  IconPencilPlus,
  IconScale,
  IconSettings,
  IconSmartHome,
  IconSun,
  IconTrash,
  IconUserCircle,
  IconUsers,
  IconWriting,
} from "@tabler/icons";
import Link from "next/link";
import { useRouter } from "next/router";
import { useEffect } from "react";

interface GlobalHeaderProps {
  activeHeaderKey: string;
  theme: MantineTheme;
}
const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  activeHeaderKey,
  theme,
}) => {
  const { user, isLoading, error, checkSession } = useUser();
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const router = useRouter();

  return (
    <Header className="w-full" height={70}>
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
            smallerThan={950}
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
                  variant={activeHeaderKey == "home" ? "gradient" : "subtle"}
                  gradient={
                    activeHeaderKey == "home"
                      ? {
                          from: "cyan",
                          to: "teal",
                        }
                      : null
                  }
                  color="blue"
                  component="a"
                >
                  Home
                </Button>
              </Link>

              <Link href="/topics" passHref>
                <Button
                  leftIcon={<IconHash size={18} />}
                  variant={activeHeaderKey == "topics" ? "gradient" : "subtle"}
                  gradient={
                    activeHeaderKey == "topics"
                      ? {
                          from: "cyan",
                          to: "teal",
                        }
                      : null
                  }
                  color="blue"
                  component="a"
                >
                  Topics
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
                  <Menu.Item
                    href="/authors"
                    component={NextLink}
                    icon={<IconUsers size={20} />}
                  >
                    <Text>Author&apos;s Listing</Text>
                  </Menu.Item>
                  <Menu.Item
                    component={NextLink}
                    href="/dazzle-me"
                    icon={
                      <IconDice
                        // fill={theme.colors.blue[6]}
                        color={theme.colors.blue[6]}
                        size={23}
                      />
                    }
                  >
                    Random Article
                  </Menu.Item>
                  <Menu.Label>
                    <Text weight={600}>Legal</Text>
                  </Menu.Label>

                  <Menu.Item
                    component={NextLink}
                    href="/legal/privacy-policy"
                    icon={<IconEyeOff size={20} />}
                  >
                    Privacy Policy
                  </Menu.Item>
                  <Menu.Item
                    component={NextLink}
                    href="/legal/terms"
                    icon={<IconScale size={20} />}
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
                      <IconChecklist color={theme.colors.blue[6]} size={20} />
                    }
                  >
                    The Roadmap
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </MediaQuery>

          <Group className="max-w-[200px] xs:max-w-[250px] ml-auto" spacing={0}>
            {user ? (
              <Button
                variant="gradient"
                radius="xl"
                gradient={{
                  from: "blue",
                  to: "teal",
                }}
                rightIcon={
                  <IconPencilPlus className="h-[22px] w-[22px] align-middle" />
                }
                className="mr-1 xs:mr-4 text-xs xs:text-sm"
              >
                Create Post
              </Button>
            ) : null}

            {
              // isLoading ? (
              //   <Skeleton
              //     mr="xl"
              //     className="w-full max-w-[41px] h-[41px] xs:h-[40px] rounded-full w-[40px]"
              //   />
              // ) : user ? (
              user ? (
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
                      <Menu.Label className="">Control Center</Menu.Label>
                      <Menu.Item
                        component={NextLink}
                        href={`/user/${user.id}`}
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
                        icon={
                          <IconLogout
                            color={theme.colors.yellow[6]}
                            size={22}
                          />
                        }
                        onClick={async () => {
                          const { error } = await supabaseClient.auth.signOut();
                          router.push("/");
                        }}
                      >
                        Sign out
                      </Menu.Item>
                    </Menu.Dropdown>
                  </Menu>
                </Group>
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
            }
          </Group>
        </Group>
      </Stack>
    </Header>
  );
};

export default GlobalHeader;
