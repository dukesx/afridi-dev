/* eslint-disable react/display-name */
import {
  ActionIcon,
  AppShell,
  Aside,
  Burger,
  Button,
  Divider,
  Group,
  Header,
  MediaQuery,
  Navbar,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
  useMantineTheme,
  Anchor,
  ThemeIcon,
  Box,
  Avatar,
  Menu,
  Overlay,
} from "@mantine/core";
import { Fragment, ReactNode, useState } from "react";
import type { AppWrapperProps } from "../../types/general";
import {
  CaretDown,
  Cookie,
  Hash,
  Hexagon,
  House,
  MagnifyingGlass,
  MoonStars,
  RocketLaunch,
  Scales,
  Star,
  Sun,
  UserFocus,
} from "phosphor-react";
import AfridiNavLink from "./afridi-nav-link";
import { playfair } from "../../pages/_app";
import { FooterLinks } from "./footer";
import { useGeneralStore } from "../../data/static/store";
import { nanoid } from "nanoid";
import { SearchModal, UnAuthorizedModal } from "../../utils/helpers";
import AfridiImage from "./afridi-image";
import Link from "next/link";

const AppWrapper: React.FC<AppWrapperProps> = ({
  children,
  aside,
  activeKey,
  sidebar = true,
  themedPage,
}) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const [opened, setOpened] = useState(false);
  const overlay = useGeneralStore((store) => store.overlay);
  const search = useGeneralStore((store) => store.search);
  const setSearch = useGeneralStore((store) => store.toggleSearch);
  const unauthenticatedModal = useGeneralStore(
    (store) => store.unauthenticatedModal
  );
  const toggleUnauthenticatedModal = useGeneralStore(
    (store) => store.toggleUnauthenticatedModal
  );

  const navLinks: Array<{
    label: string | ReactNode;
    key: string;
    icon: any;
    href: string;
  }> = [
    {
      key: "home",
      icon: House,
      label: "Home",
      href: "/",
    },

    {
      key: "feed",
      icon: Hexagon,
      label: "My Feed",
      href: "/feed",
    },

    {
      key: "tags",
      icon: Hash,
      label: "Topics",
      href: "/topics",
    },

    {
      label: (
        <Group spacing={5}>
          <Text>About</Text>
          <Text
            weight={600}
            sx={{
              fontFamily: playfair.style.fontFamily,
            }}
          >
            Afridi.dev
          </Text>
        </Group>
      ),
      key: "about",
      icon: UserFocus,
      href: "/about-us",
    },
    {
      key: "privacy",
      icon: Cookie,
      label: "Privacy Policy",
      href: "/privacy-policy",
    },
    {
      key: "terms",
      icon: Scales,
      label: "Terms of Service",
      href: "/terms",
    },
  ];
  return (
    <Fragment>
      {overlay && <Overlay opacity={0.6} color={theme.black} zIndex={2100} />}

      <SearchModal
        colorScheme={colorScheme}
        toggle={setSearch}
        opened={search}
        theme={theme}
      />

      <UnAuthorizedModal
        colorScheme={colorScheme}
        toggle={toggleUnauthenticatedModal}
        opened={unauthenticatedModal}
        theme={theme}
      />
      <AppShell
        padding={0}
        styles={{
          main: {
            background:
              theme.colorScheme === "dark"
                ? theme.colors.dark[8]
                : theme.colors.gray[0],
          },
          body: {
            height: "100%",
            overflow: "clip",
          },
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        header={
          <Fragment>
            <Header
              withBorder={themedPage ? false : true}
              sx={(theme) => ({
                backgroundColor: themedPage
                  ? colorScheme == "light"
                    ? theme.colors.teal[0]
                    : theme.colors.dark[7]
                  : colorScheme == "light"
                  ? theme.white
                  : theme.colors.dark[7],
              })}
              zIndex={2000}
              height={{ base: 60, md: 70 }}
              px={10}
              py="xs"
            >
              <Group
                spacing={0}
                style={{
                  display: "flex",
                  alignItems: "center",
                  height: "100%",
                }}
              >
                <MediaQuery largerThan="md" styles={{ display: "none" }}>
                  <ActionIcon
                    radius="xl"
                    component="span"
                    mt={3}
                    size={31}
                    mr="sm"
                    color="teal"
                    variant={colorScheme == "dark" ? "light" : "filled"}
                  >
                    <Burger
                      color={
                        colorScheme == "dark"
                          ? theme.colors.teal[4]
                          : theme.white
                      }
                      opened={opened}
                      onClick={() => setOpened((o) => !o)}
                      size="xs"
                    />
                  </ActionIcon>
                </MediaQuery>
                <Anchor
                  mr="auto"
                  // color="dark"
                  shallow={true}
                  sx={{
                    color: "inherit",
                    marginRight: "auto",
                    ":hover": {
                      textDecoration: "unset",
                      border: "none",
                      outline: "none",
                    },
                  }}
                  component={Link}
                  href="/"
                >
                  <Group
                    mr="auto"
                    position="center"
                    align="center"
                    spacing={"xs"}
                  >
                    <Title
                      color={colorScheme == "dark" ? theme.white : "dark"}
                      order={4}
                    >
                      Afridi.dev
                    </Title>
                    <MediaQuery smallerThan={420} styles={{ display: "none" }}>
                      <Group spacing={10}>
                        <Divider orientation="vertical" />
                        <Text color="dimmed" mt={4} size="xs">
                          The Coder&apos;s Handbook
                        </Text>
                      </Group>
                    </MediaQuery>
                  </Group>
                </Anchor>

                <ActionIcon
                  mt={3}
                  variant="filled"
                  color="teal"
                  mr="md"
                  radius="xl"
                  size={32}
                  onClick={() => setSearch(true)}
                >
                  <MagnifyingGlass size={17} />
                </ActionIcon>
                {
                  //
                  //
                  //
                }
                <Box mr="xs">
                  <Menu
                    transition="pop"
                    withArrow
                    position="bottom"
                    zIndex={2000}
                    radius="md"
                    width={280}
                  >
                    <Menu.Target>
                      <Group className="cursor-pointer" spacing={4}>
                        <Avatar radius="xl" color="gray">
                          <AfridiImage
                            width={80}
                            height={80}
                            priority
                            path="https://images.unsplash.com/photo-1639755507638-e34150b56db2?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=687&q=80"
                          />
                        </Avatar>
                        <CaretDown size={12} color={theme.colors.gray[6]} />
                      </Group>
                    </Menu.Target>
                    <Menu.Dropdown pb="xs" color="teal" p={0}>
                      <Stack px="xl" pt="xl" align="center">
                        <Title mt="sm" mb="sm" align="center" order={5}>
                          Get started with Afridi.dev
                        </Title>
                        <Button
                          radius="sm"
                          color="teal.7"
                          className="h-[32px] font-medium"
                          fullWidth
                        >
                          Sign up
                        </Button>
                        <Button
                          radius="sm"
                          className="h-[32px] font-medium"
                          fullWidth
                          color="gray"
                          variant="outline"
                        >
                          Sign in
                        </Button>
                      </Stack>
                      <Divider mt="lg" mb="sm" size={0.5} />
                      <Stack spacing={0}>
                        <Menu.Item
                          className="hover:font-semibold font-medium rounded-none"
                          color="teal"
                          rightSection={
                            <ThemeIcon
                              radius="xl"
                              variant="light"
                              color="teal"
                              size="lg"
                            >
                              <Star weight="duotone" size={17} />
                            </ThemeIcon>
                          }
                        >
                          Membership Benefits
                        </Menu.Item>

                        <Menu.Item
                          className="hover:font-medium rounded-none"
                          color={colorScheme == "dark" ? "pink.5" : "pink.6"}
                          rightSection={
                            <ThemeIcon
                              variant="light"
                              radius="xl"
                              color="pink"
                              size="lg"
                            >
                              <RocketLaunch weight="duotone" size={18} />
                            </ThemeIcon>
                          }
                        >
                          Go{" "}
                          <Text component="span" weight={700}>
                            PRO!
                          </Text>
                        </Menu.Item>

                        <Menu.Item
                          onClick={() => toggleColorScheme()}
                          sx={(theme) => ({
                            [":hover"]: {
                              backgroundColor:
                                colorScheme == "dark"
                                  ? theme.colors.yellow[6]
                                  : theme.colors.dark[8],
                              color: theme.white,
                            },
                          })}
                          className="hover:font-medium rounded-none"
                          color={colorScheme == "dark" ? "yellow" : "dark"}
                          rightSection={
                            <ThemeIcon
                              variant="gradient"
                              color={colorScheme == "dark" ? "yellow" : "gray"}
                              size="lg"
                              gradient={{
                                from: colorScheme == "dark" ? "yellow" : "dark",
                                to:
                                  colorScheme == "dark" ? "yellow.4" : "dark.1",
                              }}
                              radius="xl"
                            >
                              {colorScheme == "dark" ? (
                                <Sun weight="duotone" size={17} />
                              ) : (
                                <MoonStars weight="duotone" size={18} />
                              )}
                            </ThemeIcon>
                          }
                        >
                          <Text component="span" weight={700}>
                            {colorScheme == "dark" ? "Light" : "Dark"}
                          </Text>{" "}
                          Mode{" "}
                        </Menu.Item>
                      </Stack>
                    </Menu.Dropdown>
                  </Menu>
                </Box>
              </Group>
            </Header>
          </Fragment>
        }
        navbar={
          !sidebar ? null : (
            <Navbar
              sx={{
                backgroundColor: themedPage
                  ? colorScheme == "light"
                    ? theme.colors.teal[0]
                    : theme.colors.dark[7]
                  : colorScheme == "light"
                  ? theme.white
                  : theme.colors.dark[7],
              }}
              px={0}
              hiddenBreakpoint={themedPage ? 8000 : "md"}
              hidden={!opened}
              width={{ md: themedPage ? 0 : 200, lg: themedPage ? 0 : 250 }}
            >
              <Navbar.Section grow>
                {navLinks.map((mapped) => (
                  <AfridiNavLink
                    href={mapped.href}
                    key={nanoid()}
                    LeftIcon={mapped.icon}
                    label={mapped.label}
                    active={activeKey == mapped.key}
                  />
                ))}
              </Navbar.Section>
            </Navbar>
          )
        }
        aside={
          aside ? (
            <MediaQuery smallerThan="sm" styles={{ display: "none" }}>
              <Aside p="md" hiddenBreakpoint="sm" width={{ sm: 200, lg: 300 }}>
                <Text>Application sidebar</Text>
              </Aside>
            </MediaQuery>
          ) : null
        }
        footer={
          <FooterLinks
            data={[
              {
                title: "About",
                links: [
                  {
                    label: "Features",
                    link: "#",
                  },
                  {
                    label: "Pricing",
                    link: "#",
                  },
                  {
                    label: "Support",
                    link: "#",
                  },
                  {
                    label: "Forums",
                    link: "#",
                  },
                ],
              },
              {
                title: "Project",
                links: [
                  {
                    label: "Contribute",
                    link: "#",
                  },
                  {
                    label: "Media assets",
                    link: "#",
                  },
                  {
                    label: "Changelog",
                    link: "#",
                  },
                  {
                    label: "Releases",
                    link: "#",
                  },
                ],
              },
              {
                title: "Community",
                links: [
                  {
                    label: "Join Discord",
                    link: "#",
                  },
                  {
                    label: "Follow on Twitter",
                    link: "#",
                  },
                  {
                    label: "Email newsletter",
                    link: "#",
                  },
                  {
                    label: "GitHub discussions",
                    link: "#",
                  },
                ],
              },
            ]}
          />
        }
      >
        {children}
      </AppShell>
    </Fragment>
  );
};

export default AppWrapper;
