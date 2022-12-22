import { ThemeContext } from "@emotion/react";
import { Carousel } from "@mantine/carousel";
import {
  Anchor,
  BackgroundImage,
  Box,
  Button,
  Card,
  Center,
  Code,
  Grid,
  Group,
  Overlay,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { ArrowRight } from "phosphor-react";
import AppWrapper from "../components/global/app_wrapper";
import AfridiVerticalArticleCardWithBg from "../components/global/articles/cards/vertical-with-bg";
import AfridiHorizontalArticleListItem from "../components/global/articles/list-item/horizontal-simple";
import { useGeneralStore } from "../data/static/store";

export default function HomePage() {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const set = useGeneralStore((state) => state.toggleOverlay);
  const set2 = useGeneralStore((state) => state.toggleSearch);

  return (
    <AppWrapper activeKey="home">
      <Paper
        sx={(theme) => ({
          backgroundColor:
            colorScheme == "dark" ? theme.colors.teal[4] : theme.colors.teal[1],
        })}
        radius="xs"
        pr={0}
        className="w-full"
      >
        <Grid
          style={{
            minHeight: "370px",
          }}
          align="center"
          m={0}
        >
          <Grid.Col span={12} xs={12} sm={4}>
            <Stack
              pl="xl"
              align="center"
              justify="center"
              spacing={"md"}
              mx="auto"
            >
              <Title
                color="dark"
                order={1}
                align="center"
                className="uppercase"
                weight={600}
                sx={(theme) => ({
                  [theme.fn.smallerThan(600)]: {
                    marginTop: theme.spacing.xl,
                  },
                })}
              >
                Newly Published
              </Title>
              <Text
                align="center"
                mx="auto"
                style={{
                  maxWidth: 350,
                }}
                size="sm"
                color="dark"
              >
                The <Text component="span">Latest</Text> section. Articles
                published recently appear in this section.
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={12} xs={12} sm={8}>
            <SimpleGrid
              sx={(theme) => ({
                [theme.fn.largerThan(600)]: {
                  marginTop: theme.spacing.xl,
                },
              })}
              pt="xl"
              pb="xl"
              px="xl"
              spacing={"xl"}
              breakpoints={[
                { maxWidth: 500, cols: 1, spacing: 0 },
                { maxWidth: 1000, cols: 2, spacing: 0 },
              ]}
              cols={3}
            >
              <AfridiHorizontalArticleListItem
                index={0}
                title="How to build faster animation transitions in React"
                description=" This is a punishement for a world that didnt pay for Winrar"
                cover="https://plus.unsplash.com/premium_photo-1663054729129-b6bddf57c952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              />

              <AfridiHorizontalArticleListItem
                index={1}
                title="Syndergaard is laser focused on recapturing the best version of himself"
                description=" This is a punishement for a world that didnt pay for Winrar"
                cover="https://plus.unsplash.com/premium_photo-1663054729129-b6bddf57c952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              />

              <AfridiHorizontalArticleListItem
                index={2}
                title="Ramanujan’s Magnificent Formula for Pi: 9801/(1103√8)=π"
                description=" This is a punishement for a world that didnt pay for Winrar"
                cover="https://plus.unsplash.com/premium_photo-1663054729129-b6bddf57c952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              />
              <AfridiHorizontalArticleListItem
                index={3}
                title="One hour a day keeps your regrets away"
                description=" This is a punishement for a world that didnt pay for Winrar"
                cover="https://plus.unsplash.com/premium_photo-1663054729129-b6bddf57c952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              />
              <AfridiHorizontalArticleListItem
                index={4}
                title="Should You Worry About Lead In Your Dark Chocolate?"
                description=" This is a punishement for a world that didnt pay for Winrar"
                cover="https://plus.unsplash.com/premium_photo-1663054729129-b6bddf57c952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              />
              <AfridiHorizontalArticleListItem
                index={5}
                title="How to build faster animation transitions in React"
                description=" This is a punishement for a world that didnt pay for Winrar"
                cover="https://plus.unsplash.com/premium_photo-1663054729129-b6bddf57c952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
              />
            </SimpleGrid>
            <Group
              spacing={0}
              pt="xl"
              position="right"
              pr="xl"
              sx={{
                marginLeft: "auto",
                width: "auto",
              }}
              color="dark"
            >
              <Anchor
                sx={(theme) => ({
                  marginBottom: theme.spacing.xl * 1.5,

                  [theme.fn.smallerThan(1000)]: {
                    marginTop: theme.spacing.xl,
                    marginBottom: theme.spacing.xl * 1.5,
                  },
                })}
                color="dark"
                size="sm"
              >
                See More
                <ArrowRight
                  style={{
                    verticalAlign: -2,
                    marginLeft: 6,
                  }}
                />
              </Anchor>
            </Group>
          </Grid.Col>
        </Grid>
      </Paper>
      <Paper radius="xs" pl="xs" pr={0} pt="xl" className="w-full">
        <Grid m={0}>
          <Grid.Col span={12} xs={5}>
            <Stack
              align="center"
              sx={{
                height: 400,
                maxWidth: 380,
                [theme.fn.smallerThan(400)]: {
                  height: 200,
                },
              }}
              pr="xl"
              justify="center"
              spacing={"md"}
              pb="md"
              mx="auto"
            >
              <Title
                order={1}
                align="center"
                className="uppercase"
                weight={600}
              >
                Trending Articles
              </Title>
              <Text
                mx="auto"
                align="center"
                style={{
                  maxWidth: 350,
                }}
                size="sm"
                color="dimmed"
              >
                The <Text component="span">Must Read</Text> section. Articles
                catching over 100 views in less than 24 hours are classified as
                trending.
              </Text>
            </Stack>
          </Grid.Col>
          <Grid.Col span={12} xs={7}>
            <Carousel
              my="xl"
              align="start"
              withKeyboardEvents
              height={480}
              withControls={false}
              withIndicators
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
                  maxWidth: "xs",
                  slideGap: "lg",
                  slideSize: "60%",
                },
                {
                  slideGap: "xs",
                  slideSize: "50%",
                  minWidth: "xs",
                },
              ]}
            >
              <Carousel.Slide>
                <AfridiVerticalArticleCardWithBg
                  tag={{
                    title: "Fashion",
                    id: "",
                  }}
                  title="Top 7 React Animation Libraries in 2022"
                  cover="https://www.syncfusion.com/blogs/wp-content/uploads/2022/08/Top-7-React-Animation-Libraries-in-2022.png"
                />
              </Carousel.Slide>

              <Carousel.Slide>
                <AfridiVerticalArticleCardWithBg
                  tag={{
                    title: "Programming Fundamentals",
                    id: "",
                  }}
                  title="Make videos programmatically."
                  cover="https://plus.unsplash.com/premium_photo-1663054729129-b6bddf57c952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
                />
              </Carousel.Slide>

              <Carousel.Slide>
                <AfridiVerticalArticleCardWithBg
                  tag={{
                    title: "React",
                    id: "",
                  }}
                  title="How to build faster animation transitions in React"
                  cover="https://blog.logrocket.com/wp-content/uploads/2022/04/build-faster-animations-react-nocdn.png"
                />
              </Carousel.Slide>
            </Carousel>
          </Grid.Col>
        </Grid>
      </Paper>
    </AppWrapper>
  );
}
