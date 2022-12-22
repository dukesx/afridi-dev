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
} from "@mantine/core";
import { forwardRef, Fragment, useState } from "react";
import type { AppWrapperProps } from "../../types/general";
import {
  CaretDown,
  Hexagon,
  House,
  ListDashes,
  MagnifyingGlass,
  MoonStars,
  PencilSimpleLine,
  Question,
  RocketLaunch,
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

  const AutoCompleteItem = forwardRef<HTMLDivElement, SearchItemProps>(
    ({ title, description, cover, ...others }: SearchItemProps, ref) => (
      <div className="w-[200px] h-[200px]" ref={ref} {...others}>
        <Loader />

        <Group noWrap>
          <Avatar>
            <AfridiImage path="" />
          </Avatar>

          <div>
            <Text>{title}</Text>
            <Text size="xs" color="dimmed">
              {description}
            </Text>
          </div>
        </Group>
      </div>
    )
  );

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
          },
        }}
      >
        <TextInput
          placeholder="Enter a term to start searching"
          styles={{
            input: {
              padding: "22px",
              "::placeholder": {
                fontSize: theme.fontSizes.xs,
              },
            },
          }}
        />
        <Paper radius="lg" mt="sm">
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
          />
          <Fade>
            <Divider color={colorScheme == "dark" ? "gray.9" : "gray.2"} />
          </Fade>
          <AfridiSearchArticleListItem
            title="How to do things in 3 in 1 ways"
            description=" This is a punishement for a world that didnt pay for Winrar"
            cover="https://plus.unsplash.com/premium_photo-1663054729129-b6bddf57c952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          />
          {/* <AfridiEmptyPlaceholder />
          <AfridiLoading title="Fetching articles" /> */}
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
        }}
        navbarOffsetBreakpoint="sm"
        asideOffsetBreakpoint="sm"
        navbar={
          <Navbar
            px={0}
            hiddenBreakpoint="md"
            hidden={!opened}
            width={{ md: 200, lg: 250 }}
          >
            <Navbar.Section grow>
              <AfridiNavLink
                href="/link"
                active={activeKey === "home"}
                LeftIcon={House}
                label="Home"
              />

              <AfridiNavLink href="/link" LeftIcon={Hexagon} label="My Feed" />
              <AfridiNavLink
                href="/link"
                LeftIcon={PencilSimpleLine}
                label="Compose"
              />
            </Navbar.Section>
            <Navbar.Section mb="md" p="xl">
              <Stack spacing="xs">
                <Button
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
                <MediaQuery largerThan="sm" styles={{ display: "none" }}>
                  <ActionIcon
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
      >
        {children}
      </AppShell>
    </Fragment>
  );
};

export default AppWrapper;
