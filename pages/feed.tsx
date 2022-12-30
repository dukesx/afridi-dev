import { Carousel } from "@mantine/carousel";
import {
  Grid,
  Group,
  Paper,
  Select,
  Stack,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import AppWrapper from "../components/global/app_wrapper";
import AfridiVerticalArticleCardWithBg from "../components/global/articles/cards/vertical-with-bg";
import AfridiHorizontalFeedArticleListItem from "../components/global/articles/list-item/horizontal-feed";
import AfridiArticleFeedSquareWidget from "../components/global/articles/widgets/square/feed-square-widget";
//
//
//
//
const Feed = () => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
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
              slideSize: "24%",
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
              tag={{
                title: "Fashion",
                id: "",
              }}
              title=" solution for inconsistencies in indexing operations in pandas"
              cover="https://miro.medium.com/max/1280/1*c2867ICA_q6okdAz-EfhmA.webp"
            />
          </Carousel.Slide>

          <Carousel.Slide>
            <AfridiVerticalArticleCardWithBg
              tag={{
                title: "Fashion",
                id: "",
              }}
              title="Using ChatGPT to Set Up an Android App"
              cover="https://miro.medium.com/max/1400/0*iwttmYprRiobgMAH"
            />
          </Carousel.Slide>
          <Carousel.Slide>
            <AfridiVerticalArticleCardWithBg
              tag={{
                title: "Fashion",
                id: "",
              }}
              title="VS Code Shortcuts To Code Like You’re Playing a Piano"
              cover="https://miro.medium.com/max/1400/1*ShinbGf8NZEuHJ41dVnkqA.webp"
            />
          </Carousel.Slide>

          <Carousel.Slide>
            <AfridiVerticalArticleCardWithBg
              tag={{
                title: "GraalVM",
                id: "",
              }}
              title="GraalVM, Galahad, and a New Release Schedule"
              cover="https://miro.medium.com/max/1400/0*Q7g4pcf4KBZroL_h"
            />
          </Carousel.Slide>

          <Carousel.Slide>
            <AfridiVerticalArticleCardWithBg
              tag={{
                title: "React",
                id: "",
              }}
              title="Handling errors like a pro in TypeScript"
              cover="https://miro.medium.com/max/1400/1*6AtIsUWN6W7f-bru9LmH4w.webp"
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
                title="Do you need Objectives and Key Results (OKR), or is it just a current fancy?"
                description="Leaving 2022 behind and having the next two weeks to reflect on the new beginning. It could be the ideal time to apply a new way of progress tracking and goal planning."
                cover="https://res.cloudinary.com/practicaldev/image/fetch/s--YTZMhHCS--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/i2my79kbfycghlbnlexa.png"
                bookmarked={true}
                read_time="10 Min read"
              />

              <AfridiHorizontalFeedArticleListItem
                title="Backgrounds for every react,svelte,anguler and nodejs developer out there Backgrounds for every react,svelte,anguler and nodejs developer out there"
                description="Master Notifications With ChatGPT, React and NodeJS"
                cover="https://res.cloudinary.com/practicaldev/image/fetch/s--yziQTiQd--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3e4piohjvmncf766h7k0.jpeg"
                bookmarked={false}
                read_time="4 Min Read"
              />

              <AfridiHorizontalFeedArticleListItem
                title="Master Notifications With ChatGPT, React and NodeJS"
                description="Master Notifications With ChatGPT, React and NodeJS"
                cover="https://res.cloudinary.com/practicaldev/image/fetch/s--yziQTiQd--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3e4piohjvmncf766h7k0.jpeg"
                bookmarked={false}
                read_time="4 Min Read"
              />

              <AfridiHorizontalFeedArticleListItem
                title="Master Notifications With ChatGPT, React and NodeJS"
                description="Master Notifications With ChatGPT, React and NodeJS"
                cover="https://res.cloudinary.com/practicaldev/image/fetch/s--yziQTiQd--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3e4piohjvmncf766h7k0.jpeg"
                bookmarked={false}
                read_time="4 Min Read"
              />

              <AfridiHorizontalFeedArticleListItem
                title="Master Notifications With ChatGPT, React and NodeJS"
                description="Master Notifications With ChatGPT, React and NodeJS"
                cover="https://res.cloudinary.com/practicaldev/image/fetch/s--yziQTiQd--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3e4piohjvmncf766h7k0.jpeg"
                bookmarked={false}
                read_time="4 Min Read"
              />

              <AfridiHorizontalFeedArticleListItem
                title="Master Notifications With ChatGPT, React and NodeJS"
                description="Master Notifications With ChatGPT, React and NodeJS"
                cover="https://res.cloudinary.com/practicaldev/image/fetch/s--yziQTiQd--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3e4piohjvmncf766h7k0.jpeg"
                bookmarked={false}
                read_time="4 Min Read"
              />

              <AfridiHorizontalFeedArticleListItem
                title="Master Notifications With ChatGPT, React and NodeJS"
                description="Master Notifications With ChatGPT, React and NodeJS"
                cover="https://res.cloudinary.com/practicaldev/image/fetch/s--yziQTiQd--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3e4piohjvmncf766h7k0.jpeg"
                bookmarked={false}
                read_time="4 Min Read"
              />

              <AfridiHorizontalFeedArticleListItem
                title="Master Notifications With ChatGPT, React and NodeJS"
                description="Master Notifications With ChatGPT, React and NodeJS"
                cover="https://res.cloudinary.com/practicaldev/image/fetch/s--yziQTiQd--/c_imagga_scale,f_auto,fl_progressive,h_420,q_auto,w_1000/https://dev-to-uploads.s3.amazonaws.com/uploads/articles/3e4piohjvmncf766h7k0.jpeg"
                bookmarked={false}
                read_time="4 Min Read"
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
