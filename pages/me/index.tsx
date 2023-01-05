import {
  Anchor,
  Avatar,
  Box,
  Center,
  Group,
  Navbar,
  Paper,
  Stack,
  Tabs,
  Text,
  Title,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core";
import { format } from "date-fns";
import {
  BookmarkSimple,
  BookmarksSimple,
  PencilSimpleLine,
  PenNib,
  User,
} from "phosphor-react";
import { Fragment } from "react";
import AfridiPlaceholder from "../../components/global/afridi-placeholder";
import AfridiImage from "../../components/global/afridi-image";
import AppWrapper from "../../components/global/app_wrapper";
import HorizontalProfileFeedArticleListItem from "../../components/global/articles/list-item/horizontal-profile-feed";

const Me = () => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <AppWrapper
      footer={false}
      //   sidebar={false}
      aside={
        <Fragment>
          <Navbar.Section>
            <Box
              sx={{
                height: 100,
              }}
            ></Box>
            {/* <Button
              mt="xl"
              ml="xl"
              sx={{
                maxWidth: 350,
              }}
              radius="xl"
              fullWidth
              variant="gradient"
              gradient={{
                from: "teal",
                to: "cyan",
              }}
            >
              Get Pro Plan w/ Unlimited Access
            </Button> */}
          </Navbar.Section>

          <Navbar.Section>
            <Stack
              sx={{
                height: 300,
              }}
              spacing={0}
              ml="xl"
            >
              <Avatar
                mt={70}
                sx={{
                  borderRadius: "100%",
                }}
                size={100}
              >
                <AfridiImage
                  width={100}
                  height={100}
                  path="https://images.unsplash.com/photo-1514543250559-83867827ecce?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1425&q=80"
                />
              </Avatar>
              <Text mt="lg" weight={700}>
                Muhammad Afzaal Afridi
              </Text>
              <Text mt={5} color="dimmed" size="sm" weight={400}>
                Member
              </Text>
              <Anchor mt={7} href="" size="xs">
                Edit Profile
              </Anchor>
            </Stack>
          </Navbar.Section>

          <Navbar.Section mt="xl" ml="xl">
            <Group
              sx={{
                position: "absolute",
                bottom: 20,
                height: 50,
              }}
            >
              <Anchor href="" color="dimmed" size="xs">
                About
              </Anchor>

              <Anchor href="" color="dimmed" size="xs">
                Blog
              </Anchor>

              <Anchor href="" color="dimmed" size="xs">
                Press
              </Anchor>

              <Anchor href="" color="dimmed" size="xs">
                Careers
              </Anchor>
              <Anchor href="" color="dimmed" size="xs">
                Terms
              </Anchor>
              <Anchor href="" color="dimmed" size="xs">
                Privacy Policy
              </Anchor>
            </Group>
          </Navbar.Section>
        </Fragment>
      }
      activeKey=""
    >
      <Paper
        sx={(theme) => ({
          //   height: "100vh",
          [theme.fn.smallerThan("md")]: {
            maxWidth: "100%",
          },
        })}
        ml="auto"
      >
        <Paper
          sx={(theme) => ({
            position: "relative",
            height: 400,
          })}
        >
          <AfridiImage
            style={{
              filter: "brightness(52%)",
            }}
            fillImage
            path="https://images.unsplash.com/photo-1661956600684-97d3a4320e45?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          />

          <Stack
            align="center"
            sx={(theme) => ({
              position: "absolute",
              backdropFilter: "blur(0px)",
              height: "100%",
              transform: "translate(-50%, -50%)",
              top: "50%",
              left: "50%",
              width: "100%",
              [theme.fn.smallerThan(400)]: {
                padding: 0,
              },
            })}
          >
            <Center
              sx={{
                height: "100%",
              }}
            >
              <Stack>
                <Title
                  px="xl"
                  align="center"
                  transform="capitalize"
                  color="white"
                  size={60}
                  lineClamp={2}
                  weight={600}
                  sx={(theme) => ({
                    [theme.fn.smallerThan("xs")]: {
                      fontSize: theme.fontSizes.xl * 3,
                    },
                  })}
                >
                  Muhammad Afzaal Afridi
                </Title>
                <Stack w="100%" p="md" align="center" spacing={8}>
                  <Text
                    lineClamp={2}
                    align="center"
                    weight={600}
                    size="sm"
                    color="white"
                  >
                    Member since {format(Date.now(), "MMMM qo, yyyy")}
                  </Text>
                </Stack>
              </Stack>
            </Center>
          </Stack>
        </Paper>

        <Tabs pt={0} defaultValue="feed">
          <Tabs.List grow>
            <Tooltip label="My Compositions">
              <Tabs.Tab
                pt="lg"
                icon={<PenNib size={22} />}
                value="feed"
              ></Tabs.Tab>
            </Tooltip>
            <Tooltip label="Saved">
              <Tabs.Tab
                pt="lg"
                icon={<BookmarksSimple size={22} />}
                value="bookmarks"
              ></Tabs.Tab>
            </Tooltip>
            <Tooltip label="About">
              <Tabs.Tab
                pt="lg"
                icon={<User size={22} />}
                value="about"
              ></Tabs.Tab>
            </Tooltip>
          </Tabs.List>

          <Tabs.Panel value="feed">
            <Paper
              sx={(theme) => ({
                [theme.fn.smallerThan("xs")]: {
                  padding: 15,
                },
              })}
              p="xl"
            >
              <AfridiPlaceholder
                mode="under-construnction"
                title="Under Construction"
                description="This feature will be available soon"
                width={300}
                height={120}
              />
              {/* <Stack mt="md">
                <HorizontalProfileFeedArticleListItem
                  permalink="/"
                  title="Revolutionize DNA Analysis with DNAnalyzer: Join Our Open-Source Project Today!"
                  description="2022 had a ton of big releases that push web development forward. We saw the 1.0 releases of both Astro and Sveltekit. SolidStart, and Qwik entered Beta."
                  bookmarked={false}
                /> */}

              {/* <HorizontalProfileFeedArticleListItem
                  permalink="/"
                  title="Revolutionize DNA Analysis with DNAnalyzer: Join Our Open-Source Project Today!"
                  description="Byte Size article delivered to your inbox 😎. No Promotion just pure Developer 💖"
                  bookmarked={false}
                />

                <HorizontalProfileFeedArticleListItem
                  permalink="/"
                  title="Revolutionize DNA Analysis with DNAnalyzer: Join Our Open-Source Project Today!"
                  description="Byte Size article delivered to your inbox 😎. No Promotion just pure Developer 💖"
                  bookmarked={false}
                />

                <HorizontalProfileFeedArticleListItem
                  permalink="/"
                  title="Revolutionize DNA Analysis with DNAnalyzer: Join Our Open-Source Project Today!"
                  description="Byte Size article delivered to your inbox 😎. No Promotion just pure Developer 💖"
                  bookmarked={false}
                />

                <HorizontalProfileFeedArticleListItem
                  permalink="/"
                  title="Revolutionize DNA Analysis with DNAnalyzer: Join Our Open-Source Project Today!"
                  description="Byte Size article delivered to your inbox 😎. No Promotion just pure Developer 💖"
                  bookmarked={false}
                /> */}
              {/* </Stack> */}
            </Paper>
          </Tabs.Panel>
          <Tabs.Panel value="bookmarks">
            <Paper
              sx={(theme) => ({
                [theme.fn.smallerThan("xs")]: {
                  padding: 15,
                },
              })}
              p="xl"
            >
              <Stack mt="md">
                <HorizontalProfileFeedArticleListItem
                  permalink="/"
                  title="Revolutionize DNA Analysis with DNAnalyzer: Join Our Open-Source Project Today!"
                  description="2022 had a ton of big releases that push web development forward. We saw the 1.0 releases of both Astro and Sveltekit. SolidStart, and Qwik entered Beta."
                  bookmarked={false}
                />
              </Stack>
            </Paper>
          </Tabs.Panel>
          <Tabs.Panel value="about">
            <Paper
              sx={(theme) => ({
                [theme.fn.smallerThan("xs")]: {
                  padding: 15,
                  height: 200,
                },
              })}
              p="xl"
            >
              <AfridiPlaceholder
                height={120}
                title="Hmmmm.... Missing Bio"
                description="Goto settings > demographics > bio"
                mode="empty"
              />
            </Paper>
          </Tabs.Panel>
        </Tabs>
      </Paper>
    </AppWrapper>
  );
};

export default Me;
