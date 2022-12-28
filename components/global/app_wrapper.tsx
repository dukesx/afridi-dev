/* eslint-disable react/display-name */
import {
  ActionIcon,
  AppShell,
  Aside,
  Burger,
  Button,
  Divider,
  Footer,
  Group,
  Header,
  MediaQuery,
  Navbar,
  NavLink,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
  useMantineTheme,
  Anchor,
  ThemeIcon,
  Box,
  Affix,
  Transition,
  Avatar,
  Menu,
  Paper,
  Overlay,
  Autocomplete,
  Modal,
  Loader,
  TextInput,
  CloseButton,
} from "@mantine/core";
import { forwardRef, Fragment, useState } from "react";
import type { AppWrapperProps } from "../../types/general";
import {
  CaretDown,
  Cookie,
  DiscordLogo,
  GithubLogo,
  GoogleLogo,
  Hash,
  Hexagon,
  House,
  ListDashes,
  MagnifyingGlass,
  MoonStars,
  PencilSimpleLine,
  Question,
  RocketLaunch,
  Scales,
  SquaresFour,
  Star,
  Sun,
  User,
} from "phosphor-react";
import AfridiNavLink from "./afridi-nav-link";
import { playfair } from "../../pages/_app";
import { FooterLinks } from "./footer";
import { useGeneralStore } from "../../data/static/store";
import { SearchItemProps } from "../../types/general";
import AfridiImage from "./afridi-image";
import { Fade } from "react-awesome-reveal";
import AfridiSearchArticleListItem from "./search/afridi-search-article-list";
import FeedIcon from "../../public/feed.svg";
import GoogleIcon from "../../public/google.png";
import GithubIcon from "../../public/github.svg";

import Image from "next/image";
import { nanoid } from "nanoid";
import AfridiEmptyPlaceholder from "./afridi-empty";
import AfridiLoading from "./afridi-loading";

const AppWrapper: React.FC<AppWrapperProps> = ({
  children,
  aside,
  activeKey,
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

  const navLinks = [
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
      key: "terms",
      icon: Scales,
      label: "Terms of Service",
      href: "/terms",
    },
    {
      key: "privacy",
      icon: Cookie,
      label: "Privacy Policy",
      href: "/privacy-policy",
    },
  ];

  return (
    <Fragment>
      {overlay && <Overlay opacity={0.6} color={theme.black} zIndex={2100} />}

      <Modal
        radius="md"
        centered
        zIndex={2000}
        withCloseButton={false}
        onClose={() => setSearch(false)}
        opened={search}
        size="md"
        styles={{
          modal: {
            background: "transparent",
            boxShadow: "none",
          },
        }}
        transition="pop"
        transitionDuration={200}
        overlayColor={
          colorScheme == "dark" ? theme.colors.gray[8] : theme.colors.gray[5]
        }
        overlayBlur={10}
      >
        <TextInput
          radius="xl"
          placeholder="Enter a term to start searching"
          styles={{
            input: {
              ":focus-within": {
                border:
                  colorScheme == "light"
                    ? "none"
                    : `1px solid ${theme.colors.teal[7]}`,
              },
              ":focus": {
                border:
                  colorScheme == "light"
                    ? "none"
                    : `1px solid ${theme.colors.teal[7]}`,
              },
              padding: "22px",
              "::placeholder": {
                fontSize: theme.fontSizes.xs,
              },
            },
          }}
        />
        <Paper radius="lg" mt="sm">
          {/* <AfridiSearchArticleListItem
            title="How to do things in 3 in 1 ways"
            description=" This is a punishement for a world that didnt pay for Winrar"
            cover="https://plus.unsplash.com/premium_photo-1663054729129-b6bddf57c952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          />
          <Fade>
            <Divider color={colorScheme == "dark" ? "gray.9" : "gray.2"} />
          </Fade>
          <AfridiSearchArticleListItem
            title="How to do things in 3 in 1 ways"
            description=" This is a punishement for a world that didnt pay for Winrar"
            cover="https://plus.unsplash.com/premium_photo-1663054729129-b6bddf57c952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          />
          <Fade>
            <Divider color={colorScheme == "dark" ? "gray.9" : "gray.2"} />
          </Fade>
          <AfridiSearchArticleListItem
            title="How to do things in 3 in 1 ways"
            description=" This is a punishement for a world that didnt pay for Winrar"
            cover="https://plus.unsplash.com/premium_photo-1663054729129-b6bddf57c952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          /> */}

          <AfridiEmptyPlaceholder
            title="Hmmm.... Empty"
            description="Enter a term to see results"
          />
          <AfridiLoading title="Fetching articles" />
        </Paper>
      </Modal>

      <Modal
        transitionDuration={1500}
        radius="md"
        zIndex={2000}
        onClose={() => toggleUnauthenticatedModal(false)}
        opened={unauthenticatedModal}
        size="lg"
        padding={0}
        title={false}
        withCloseButton={false}
        transition="pop"
      >
        <Paper
          sx={{
            height: 600,
          }}
          radius="md"
          p="xs"
        >
          <Group pt={2} pr={4} position="right">
            <CloseButton
              onClick={() => toggleUnauthenticatedModal(false)}
              size={"lg"}
              iconSize={20}
              radius="md"
            />
          </Group>
          <Stack mb="auto" spacing={0} align="center" mt={80}>
            <Title weight={500} order={2}>
              Let&apos;s Get You Started
            </Title>

            <Text mt={8} size="sm" color="dimmed">
              Because it&apos;s easy, free & beneficial.
            </Text>

            <Stack mb="auto" spacing="lg" mt={50}>
              <Button
                color="gray"
                leftIcon={
                  <Image
                    priority
                    width={20}
                    height={20}
                    src={GoogleIcon}
                    alt=""
                  />
                }
                variant="light"
                styles={{
                  label: {
                    fontWeight: 500,
                    fontSize: 12,
                  },
                }}
              >
                Start with a Google Account
              </Button>

              <Button
                color={"gray"}
                leftIcon={
                  <GithubLogo
                    color={
                      colorScheme == "dark" ? theme.white : theme.colors.dark[9]
                    }
                    strokeWidth={2}
                    weight="duotone"
                    size={18}
                  />
                }
                variant="light"
                styles={{
                  label: {
                    fontWeight: 500,
                    fontSize: 12,
                  },
                }}
              >
                Start with a Github Account
              </Button>

              <Button
                color={"gray"}
                leftIcon={
                  <DiscordLogo
                    color={theme.colors.indigo[6]}
                    strokeWidth={2}
                    weight="duotone"
                    size={18}
                  />
                }
                variant="light"
                styles={{
                  label: {
                    fontWeight: 500,
                    fontSize: 12,
                  },
                }}
              >
                Start with a Discord Account
              </Button>
            </Stack>
          </Stack>
          <Group position="center">
            <Text
              color={colorScheme == "dark" ? "dimmed" : "dark"}
              variant="link"
              component="a"
              align="center"
              href="#"
              size="xs"
              mt={90}
            >
              Explore the benefits of a joining{" "}
              <Text
                component="span"
                style={{
                  fontSize: 14,
                  fontFamily: playfair.style.fontFamily,
                  fontWeight: 600,
                }}
              >
                Afridi.dev
              </Text>
            </Text>
          </Group>
        </Paper>
      </Modal>
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
            <Header zIndex={2000} height={{ base: 60, md: 70 }} px={10} py="xs">
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
                <Group
                  className="mr-auto"
                  position="center"
                  align="center"
                  spacing={"xs"}
                >
                  <Title order={4}>Afridi.dev</Title>
                  <MediaQuery smallerThan={420} styles={{ display: "none" }}>
                    <Group spacing={10}>
                      <Divider orientation="vertical" />
                      <Text color="dimmed" mt={4} size="xs">
                        The Coder&apos;s Handbook
                      </Text>
                    </Group>
                  </MediaQuery>
                </Group>

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
                <Box mr="md">
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
                          <User size={18} />
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
                          color="teal.7"
                          className="h-[32px] font-medium"
                          fullWidth
                        >
                          Sign up
                        </Button>
                        <Button
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
                          className="hover:font-medium rounded-none"
                          color="teal"
                          rightSection={
                            <ThemeIcon variant="light" color="teal" size="lg">
                              <Star weight="duotone" size={18} />
                            </ThemeIcon>
                          }
                        >
                          Membership Benefits
                        </Menu.Item>

                        <Menu.Item
                          className="hover:font-medium rounded-none"
                          color="yellow"
                          rightSection={
                            <ThemeIcon variant="light" color="yellow" size="lg">
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
                          className="rounded-none"
                          rightSection={
                            <ThemeIcon color="blue" variant="filled" size="md">
                              <Question size={18} />
                            </ThemeIcon>
                          }
                        >
                          About{" "}
                          <Text
                            weight={700}
                            component="span"
                            style={{
                              fontFamily: playfair.style.fontFamily,
                            }}
                          >
                            Afridi.dev
                          </Text>
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
          <Navbar
            px={0}
            hiddenBreakpoint="md"
            hidden={!opened}
            width={{ md: 200, lg: 250 }}
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
            <Navbar.Section mb="md" p="xl">
              <Stack spacing="xs">
                <Button
                  radius="xl"
                  fullWidth
                  onClick={() => toggleColorScheme()}
                  leftIcon={
                    colorScheme == "dark" ? (
                      <Sun weight="duotone" size={20} />
                    ) : (
                      <MoonStars weight="duotone" size={18} />
                    )
                  }
                  color={colorScheme == "dark" ? "yellow.7" : "dark"}
                >
                  {colorScheme == "dark" ? "Light" : "Dark"} Mode
                </Button>
              </Stack>
            </Navbar.Section>
          </Navbar>
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
