import {
  ActionIcon,
  Anchor,
  Avatar,
  Box,
  Button,
  Divider,
  Group,
  Menu,
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
  ChatCircle,
  DotsThreeOutline,
  Link,
  ShareNetwork,
} from "phosphor-react";
import { Fragment } from "react";
import AfridiImage from "../../components/global/afridi-image";
import AppWrapper from "../../components/global/app_wrapper";
import HorizontalProfileFeedArticleListItem from "../../components/global/articles/list-item/horizontal-profile-feed";

const Me = () => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <AppWrapper
      footer={false}
      sidebar={false}
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
          maxWidth: "740px",
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
              filter: "brightness(50%)",
            }}
            width={740}
            height={400}
            path="https://images.unsplash.com/photo-1661956602868-6ae368943878?ixlib=rb-4.0.3&ixid=MnwxMjA3fDF8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
          />

          <Stack
            align="center"
            sx={(theme) => ({
              position: "absolute",
              transform: "translate(-50%, -50%)",
              top: "50%",
              left: "49%",
              width: "100%",
              [theme.fn.smallerThan(400)]: {
                padding: 0,
              },
            })}
          >
            <Title
              align="center"
              transform="capitalize"
              color="white"
              size={60}
              lineClamp={2}
              sx={(theme) => ({
                [theme.fn.smallerThan("xs")]: {
                  fontSize: theme.fontSizes.xl * 3,
                },
              })}
            >
              John Rambo
            </Title>
            <Group w="100%" p="md" noWrap spacing={8} position="center">
              <Text mt="xl" align="center" weight={600} size="sm" color="white">
                @dukesthegarbage
              </Text>

              <Divider
                mt="xl"
                sx={{
                  maxWidth: 40,
                  width: "100%",
                }}
                color="gray.4"
              />

              <Text
                lineClamp={2}
                mt="xl"
                align="center"
                weight={600}
                size="sm"
                color="white"
              >
                Member since {format(Date.now(), "MMMM qo, yyyy")}
              </Text>
            </Group>
          </Stack>
        </Paper>

        <Tabs py="xl" defaultValue="feed">
          <Tabs.List grow>
            <Tabs.Tab value="feed">Feed</Tabs.Tab>
            <Tabs.Tab value="bookmarks">Saved</Tabs.Tab>
            <Tabs.Tab value="about">About</Tabs.Tab>
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
              <Stack mt="md">
                <HorizontalProfileFeedArticleListItem
                  permalink="/"
                  title="Revolutionize DNA Analysis with DNAnalyzer: Join Our Open-Source Project Today!"
                  description="Byte Size article delivered to your inbox 😎. No Promotion just pure Developer 💖"
                  bookmarked={false}
                />

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
              </Stack>
            </Paper>
          </Tabs.Panel>
          <Tabs.Panel value="bookmarks">This is bookmarks</Tabs.Panel>
          <Tabs.Panel value="about">This is About</Tabs.Panel>
        </Tabs>
      </Paper>
    </AppWrapper>
  );
};

export default Me;
