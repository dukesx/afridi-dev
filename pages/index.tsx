import { Carousel } from "@mantine/carousel";
import {
  Anchor,
  Blockquote,
  Button,
  Center,
  Grid,
  Group,
  Paper,
  SimpleGrid,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { GetServerSidePropsContext } from "next";
import { ArrowRight } from "phosphor-react";
import { Fade } from "react-awesome-reveal";
import AppWrapper from "../components/global/app_wrapper";
import AfridiVerticalArticleCardWithBg from "../components/global/articles/cards/vertical-with-bg";
import AfridiHorizontalArticleListItem from "../components/global/articles/list-item/horizontal-simple";
import { useGeneralStore } from "../data/static/store";

export default function HomePage({ quote }) {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const set = useGeneralStore((state) => state.toggleOverlay);
  const set2 = useGeneralStore((state) => state.toggleSearch);
  const toggleUnauthenticatedModal = useGeneralStore(
    (store) => store.toggleUnauthenticatedModal
  );

  return (
    <AppWrapper activeKey="home">
      <Fade duration={2000} triggerOnce>
        <Paper
          sx={(theme) => ({
            height: 400,
            backgroundColor:
              colorScheme == "dark"
                ? theme.colors.yellow[7]
                : theme.colors.yellow[6],
          })}
          radius="xs"
          pr={0}
          className="w-full"
        >
          <Center className="h-full">
            <Stack align="center" spacing={0}>
              <Blockquote
                // align="center"
                color="dark"
                sx={{
                  maxWidth: 700,
                }}
                cite={`- ${quote.author}`}
                styles={{
                  cite: {
                    color: theme.colors.dark[8],
                  },
                }}
              >
                <Title
                  lineClamp={2}
                  sx={(theme) => ({
                    [theme.fn.smallerThan(400)]: {
                      fontSize: theme.fontSizes.xl * 1.5,
                    },
                  })}
                  color="dark"
                >
                  {quote.content}
                </Title>
              </Blockquote>

              <Button
                onClick={() => toggleUnauthenticatedModal(true)}
                style={{
                  // fontFamily: playfair.style.fontFamily,
                  fontWeight: 600,
                }}
                color="dark"
                variant={colorScheme == "dark" ? "white" : "filled"}
                mt={50}
              >
                Browse My Feed
              </Button>
            </Stack>
          </Center>
        </Paper>
      </Fade>
      <Paper
        sx={(theme) => ({
          backgroundColor:
            colorScheme == "dark" ? theme.colors.teal[6] : theme.colors.teal[1],
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
                weight={600}
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
                [theme.fn.smallerThan(600)]: {
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
                  title=" solution for inconsistencies in indexing operations in pandas"
                  cover="https://images.unsplash.com/photo-1599507593499-a3f7d7d97667?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1470&q=80"
                />
              </Carousel.Slide>

              <Carousel.Slide>
                <AfridiVerticalArticleCardWithBg
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
                  tag={{
                    title: "React",
                    id: "",
                  }}
                  title="Handling errors like a pro in TypeScript"
                  cover="https://images.unsplash.com/photo-1533906966484-a9c978a3f090?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=765&q=80"
                />
              </Carousel.Slide>
            </Carousel>
          </Grid.Col>
        </Grid>
      </Paper>
    </AppWrapper>
  );
}

export const getServerSideProps = async ({}: GetServerSidePropsContext) => {
  const fetcher = await fetch(
    "https://api.quotable.io/random?tags=inspirational"
  );

  const data = await fetcher.json();

  if (data) {
    return {
      props: {
        quote: data,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};
