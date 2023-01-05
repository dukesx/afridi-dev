import { Arrow, Fade } from "@egjs/flicking-plugins";
import Flicking, { ViewportSlot } from "@egjs/react-flicking";
import { Carousel } from "@mantine/carousel";
import {
  ActionIcon,
  Box,
  Button,
  Divider,
  Grid,
  Group,
  Paper,
  Select,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import AfridiFlickCarousel from "../components/global/afridi-flicking-carousel";
import AfridiFlick from "../components/global/afridi-flicking-carousel/carousel";
import AppWrapper from "../components/global/app_wrapper";
import AfridiVerticalArticleCardWithBg from "../components/global/articles/cards/vertical-with-bg";
import AfridiHorizontalFeedArticleListItem from "../components/global/articles/list-item/horizontal-feed";
import AfridiArticleFeedSquareWidget from "../components/global/articles/widgets/square/feed-square-widget";
import "@egjs/react-flicking/dist/flicking.min.css";
import "@egjs/flicking-plugins/dist/arrow.css";
import { CaretLeft, CaretRight, Plus } from "phosphor-react";
import { useState } from "react";
//
//
//
const Feed = () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  const [index, setIndex] = useState(0);
  var fade = new Fade();
  fade.scale = 0.9;
  return (
    <AppWrapper activeKey="feed">
      <Paper radius="xs">
        <Carousel
          pt="xl"
          px="xl"
          align="start"
          withKeyboardEvents
          height={450}
          withControls={false}
          slideGap={0}
          loop
          slideSize="30%"
          styles={{
            indicator: {
              backgroundColor: theme.colors.gray[3],
              "&[data-active]": {
                width: 40,
              },
            },
          }}
          breakpoints={[
            {
              maxWidth: 400,
              slideSize: "70%",
              slideGap: "xl",
            },
            {
              maxWidth: 1000,
              slideSize: "42%",
              slideGap: "xl",
            },

            {
              maxWidth: 1500,
              slideSize: "25%",
              slideGap: "xl",
            },

            {
              maxWidth: 2000,
              slideSize: "20%",
              slideGap: "xl",
            },
          ]}
        >
          <Carousel.Slide>
            <AfridiVerticalArticleCardWithBg
              permalink="/"
              priorityImage
              tag={{
                title: "Fashion",
                id: "",
              }}
              title=" solution for inconsistencies in indexing operations in pandas"
              cover="https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            />
          </Carousel.Slide>

          <Carousel.Slide>
            <AfridiVerticalArticleCardWithBg
              permalink="/"
              priorityImage
              tag={{
                title: "Fashion",
                id: "",
              }}
              title="Using ChatGPT to Set Up an Android App"
              cover="https://images.unsplash.com/photo-1607798748738-b15c40d33d57?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <AfridiVerticalArticleCardWithBg
              permalink="/"
              priorityImage
              tag={{
                title: "Fashion",
                id: "",
              }}
              title="VS Code Shortcuts To Code Like You’re Playing a Piano"
              cover="https://images.unsplash.com/photo-1581287053822-fd7bf4f4bfec?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1501&q=80"
            />
          </Carousel.Slide>

          <Carousel.Slide>
            <AfridiVerticalArticleCardWithBg
              permalink="/"
              priorityImage
              tag={{
                title: "GraalVM",
                id: "",
              }}
              title="GraalVM, Galahad, and a New Release Schedule"
              cover="https://images.unsplash.com/photo-1603354350317-6f7aaa5911c5?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
            />
          </Carousel.Slide>

          <Carousel.Slide>
            <AfridiVerticalArticleCardWithBg
              permalink="/"
              priorityImage
              tag={{
                title: "React",
                id: "",
              }}
              title="Handling errors like a pro in TypeScript"
              cover="https://images.unsplash.com/photo-1533906966484-a9c978a3f090?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80"
            />
          </Carousel.Slide>
        </Carousel>

        <Grid>
          <Grid.Col span={12} xs={12} md={12} lg={7}>
            <Group
              sx={{
                padding: `${theme.spacing.md}px`,
                [theme.fn.largerThan(400)]: {
                  padding: `${theme.spacing.md}px`,
                },
                [theme.fn.largerThan(1000)]: {
                  padding: `${theme.spacing.xl}px`,
                },
              }}
              noWrap
              position="apart"
              align="center"
            >
              <Title
                sx={(theme) => ({
                  [theme.fn.smallerThan(400)]: {
                    marginTop: -9,
                  },
                })}
                mt={-5}
                weight={500}
              >
                Browse
              </Title>
              <Select
                styles={{
                  dropdown: {
                    borderRadius: theme.radius.xs,
                  },
                  itemsWrapper: {
                    borderRadius: theme.radius.xs,
                  },
                  item: {},
                }}
                radius="sm"
                defaultValue="Newest"
                data={["Newest", "Trending"]}
              />
            </Group>

            <Stack
              sx={{
                padding: `${0}px`,
                [theme.fn.largerThan(400)]: {
                  padding: `${theme.spacing.xs / 2.5}px`,
                },
                [theme.fn.largerThan(1000)]: {
                  padding: `${theme.spacing.sm}px`,
                },
              }}
              spacing={"xs"}
            >
              <AfridiHorizontalFeedArticleListItem
                permalink="/"
                title="Do you need Objectives and Key Results (OKR), or is it just a current fancy?"
                description="Leaving 2022 behind and having the next two weeks to reflect on the new beginning. It could be the ideal time to apply a new way of progress tracking and goal planning."
                cover="https://images.unsplash.com/photo-1498050108023-c5249f4df085?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1472&q=80"
                bookmarked={true}
                read_time="10 Min read"
              />
              <AfridiHorizontalFeedArticleListItem
                permalink="/"
                title="Do you need Objectives and Key Results (OKR), or is it just a current fancy?"
                description="Leaving 2022 behind and having the next two weeks to reflect on the new beginning. It could be the ideal time to apply a new way of progress tracking and goal planning."
                cover="https://images.unsplash.com/photo-1616004655123-818cbd4b3143?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                bookmarked={false}
                read_time="10 Min read"
              />
              <AfridiHorizontalFeedArticleListItem
                permalink="/"
                title="Do you need Objectives and Key Results (OKR), or is it just a current fancy?"
                description="Leaving 2022 behind and having the next two weeks to reflect on the new beginning. It could be the ideal time to apply a new way of progress tracking and goal planning."
                cover="https://images.unsplash.com/photo-1526925539332-aa3b66e35444?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80"
                bookmarked={true}
                read_time="10 Min read"
              />
              <AfridiHorizontalFeedArticleListItem
                permalink="/"
                title="Do you need Objectives and Key Results (OKR), or is it just a current fancy?"
                description="Leaving 2022 behind and having the next two weeks to reflect on the new beginning. It could be the ideal time to apply a new way of progress tracking and goal planning."
                cover="https://images.unsplash.com/photo-1493723843671-1d655e66ac1c?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                bookmarked={false}
                read_time="10 Min read"
              />
              <AfridiHorizontalFeedArticleListItem
                permalink="/"
                title="Do you need Objectives and Key Results (OKR), or is it just a current fancy?"
                description="Leaving 2022 behind and having the next two weeks to reflect on the new beginning. It could be the ideal time to apply a new way of progress tracking and goal planning."
                cover="https://images.unsplash.com/photo-1585229259255-9f0816d671a3?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=677&q=80"
                bookmarked={true}
                read_time="10 Min read"
              />
            </Stack>
          </Grid.Col>
          <Grid.Col
            sx={(theme) => ({
              [theme.fn.smallerThan(1200)]: {
                display: "none",
              },
              padding: "40px",
            })}
            span={12}
            xs={12}
            md={12}
            lg={5}
          >
            <Stack
              spacing={45}
              style={{
                position: "sticky",
                top: 100,
              }}
            >
              <AfridiArticleFeedSquareWidget
                color={"teal"}
                title="Must reads 🤓"
                textColor="dark"
                data={[
                  {
                    title:
                      "Code warriors, coding all day and night - A short poem",
                    views: 100,
                  },
                  {
                    title:
                      "A Simple Introduction to Typescript for JavaScript Dev",
                    views: 10,
                  },
                  {
                    title:
                      "Looking for Freelance projects in .NET Technologies but also open to Data Analytics/Data Science areas as well.",
                    views: 400000,
                  },
                ]}
              />
            </Stack>
          </Grid.Col>
        </Grid>
      </Paper>
    </AppWrapper>
  );
};

export default Feed;
