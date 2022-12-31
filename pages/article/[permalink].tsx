import {
  Anchor,
  Avatar,
  Box,
  Breadcrumbs,
  Divider,
  Grid,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core";
import AfridiImage from "../../components/global/afridi-image";
import AppWrapper from "../../components/global/app_wrapper";
import { inter } from "../_app";
import { format } from "date-fns";

import Image from "next/image";
import UnsplashLogo from "../../components/global/unsplash-logo";

const AfridiArticle = () => {
  const { colorScheme } = useMantineColorScheme();
  const items = [
    { title: "Home", href: "#" },
    { title: "Mantine hooks", href: "#" },
    {
      title: "20 Entertaining Uses of ChatGPT You Never Knew Were Possible",
      href: "#",
    },
  ].map((item, index) => (
    <Anchor
      sx={(theme) => ({
        lineHeight: 2,
      })}
      color={colorScheme == "dark" ? "gray.4" : "dark"}
      size="sm"
      weight={600}
      href={item.href}
      key={index}
      lineClamp={2}
    >
      {item.title}
    </Anchor>
  ));
  return (
    <AppWrapper themedPage={true} activeKey="">
      <Paper
        pt="xl"
        pr="xl"
        sx={(theme) => ({
          backgroundColor:
            colorScheme == "dark" ? theme.colors.dark[7] : theme.colors.teal[0],
          [theme.fn.smallerThan(860)]: {
            paddingRight: 15,
          },
        })}
      >
        <Stack align="center">
          <Stack spacing={0} align="left">
            <Group ml="xs" mt={6} mb={10} spacing={10}>
              <Tooltip mt="xs" label={format(Date.now(), "PPPPp")}>
                <Text
                  sx={(theme) => ({
                    [theme.fn.smallerThan(400)]: {
                      fontSize: theme.fontSizes.sm,
                    },
                    cursor: "help",
                  })}
                  weight={600}
                  ml={5}
                  align="left"
                  size="sm"
                >
                  20th October, 2022
                </Text>
              </Tooltip>
              <Divider
                color={colorScheme == "dark" ? "dimmed" : "dark"}
                size={2}
                orientation="vertical"
              />
              <Text
                sx={(theme) => ({
                  [theme.fn.smallerThan(400)]: {
                    fontSize: theme.fontSizes.sm,
                  },
                })}
                weight={600}
                size="sm"
              >
                10 min read
              </Text>
            </Group>

            <Title
              sx={(theme) => ({
                fontFamily: inter.style.fontFamily,
                maxWidth: 800,
                width: "100%",
                [theme.fn.smallerThan(400)]: {
                  fontSize: theme.fontSizes.xl * 1.2,
                },
              })}
              weight={800}
              lineClamp={3}
              mt={4}
              ml="xs"
              align="left"
            >
              20 Entertaining Uses of ChatGPT You Never Knew Were Possible
            </Title>

            <Breadcrumbs
              ml="xs"
              sx={{
                flexWrap: "wrap",
                maxWidth: "90vw",
              }}
              separator="->"
              mt="md"
              mb="xl"
            >
              {items}
            </Breadcrumbs>
          </Stack>

          <div
            style={{
              position: "relative",
              width: "100%",
              height: 600,
              marginRight: "20%",
            }}
          >
            <AfridiImage
              style={{
                borderRadius: "0px 20px 20px 0px",
              }}
              fillImage
              path="https://images.unsplash.com/photo-1535551951406-a19828b0a76b?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1466&q=80"
            />
          </div>
          <Group mt={-5} spacing={6}>
            <Text
              color={colorScheme == "dark" ? "white" : "dark"}
              weight={400}
              size="xs"
            >
              Photo by
            </Text>

            <Group spacing={6}>
              <Anchor color={colorScheme == "dark" ? "white" : "dark"}>
                <Text weight={600} size="xs">
                  @Sharon Stone
                </Text>
              </Anchor>

              <Text
                color={colorScheme == "dark" ? "white" : "dark"}
                weight={400}
                size="xs"
              >
                on
              </Text>

              <UnsplashLogo
                style={{
                  marginTop: -1,
                }}
              />
            </Group>
          </Group>

          <Grid
            p="xl"
            sx={(theme) => ({
              flexDirection: "row-reverse",
              [theme.fn.smallerThan(400)]: {
                padding: theme.spacing.xs / 1.0,
              },
            })}
          >
            <Grid.Col span={12} md={4}>
              <Stack
                align="center"
                sx={{
                  // height: "100%",
                  position: "sticky",
                  top: 80,
                }}
              >
                <Avatar.Group
                  sx={(theme) => ({
                    [theme.fn.smallerThan(800)]: {
                      marginLeft: 10,
                    },
                  })}
                  // ml={-50}
                  mt="sm"
                  mb="md"
                  spacing="sm"
                >
                  <Avatar
                    sx={(theme) => ({
                      [theme.fn.smallerThan(1000)]: {
                        height: 60,
                        width: 60,
                        minWidth: 60,
                      },
                    })}
                    src="https://images.unsplash.com/photo-1494790108377-be9c29b29330?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                    radius="xl"
                    size={50}
                  />
                  <Avatar
                    sx={(theme) => ({
                      [theme.fn.smallerThan(1000)]: {
                        height: 60,
                        width: 60,
                        minWidth: 60,
                      },
                    })}
                    src="https://images.unsplash.com/photo-1599566150163-29194dcaad36?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=774&q=80"
                    radius="xl"
                    size={50}
                  />
                </Avatar.Group>
                <Group position="center" mt={-6} spacing={4}>
                  <Anchor color={colorScheme == "dark" ? "dimmed" : "dark"}>
                    <Text
                      sx={(theme) => ({
                        [`@media (max-width: 400px)`]: {
                          fontSize: theme.fontSizes.md,
                        },
                        [`@media (min-width: 400px) and (max-width: 1000px)`]: {
                          fontSize: theme.fontSizes.lg,
                        },

                        [`@media (min-width: 1000px)`]: {
                          fontSize: theme.fontSizes.sm,
                        },
                        // [theme.fn.largerThan(1000)]: {
                        //   fontSize: theme.fontSizes.sm,
                        // },
                      })}
                      weight={800}
                      size="sm"
                    >
                      Liz Herman
                    </Text>
                  </Anchor>
                  <Text weight={600} size="sm">
                    and
                  </Text>
                  <Anchor
                    sx={(theme) => ({
                      [`@media (max-width: 400px)`]: {
                        fontSize: theme.fontSizes.md,
                      },
                      [`@media (min-width: 400px) and (max-width: 1000px)`]: {
                        fontSize: theme.fontSizes.lg,
                      },

                      [`@media (min-width: 1000px)`]: {
                        fontSize: theme.fontSizes.sm,
                      },
                    })}
                    color={colorScheme == "dark" ? "dimmed" : "dark"}
                  >
                    <Text
                      sx={(theme) => ({
                        [`@media (max-width: 400px)`]: {
                          fontSize: theme.fontSizes.md,
                        },
                        [`@media (min-width: 400px) and (max-width: 1000px)`]: {
                          fontSize: theme.fontSizes.lg,
                        },

                        [`@media (min-width: 1000px)`]: {
                          fontSize: theme.fontSizes.sm,
                        },
                      })}
                      weight={800}
                      size="sm"
                    >
                      Scott Adkins
                    </Text>
                  </Anchor>
                  <Text
                    sx={(theme) => ({
                      [`@media (max-width: 400px)`]: {
                        fontSize: theme.fontSizes.md,
                      },
                      [`@media (min-width: 400px) and (max-width: 1000px)`]: {
                        fontSize: theme.fontSizes.lg,
                      },

                      [`@media (min-width: 1000px)`]: {
                        fontSize: theme.fontSizes.sm,
                      },
                    })}
                    weight={600}
                    size="sm"
                  >
                    on October 20th, 2022
                  </Text>
                </Group>
              </Stack>
            </Grid.Col>
            <Grid.Col span={12} md={8}>
              <Box
                ml="xs"
                py="xl"
                sx={{
                  maxWidth: 700,
                }}
              >
                <Title
                  mb="xl"
                  mt="xl"
                  sx={(theme) => ({
                    fontFamily: inter.style.fontFamily,
                    fontSize: theme.fontSizes.lg,
                  })}
                  weight={800}
                  order={4}
                  align="left"
                >
                  Why Cookie is preferable compared to localStorage when it
                  comes to authentication
                </Title>

                <Text align="left" my="xl">
                  Lorem ipsum dolor sit amet, consectetur adipiscing elit.
                  Pellentesque sem ligula, porttitor ac leo ornare, posuere
                  lobortis eros. Sed dolor nibh, gravida malesuada nibh eget,
                  aliquam dictum tortor. Cras libero nibh, vestibulum nec tempor
                  et, auctor ut purus. Integer sed pharetra metus. Suspendisse
                  nisi enim, bibendum scelerisque mattis vitae, mollis pulvinar
                  quam. Duis sed orci sapien. Mauris in eros purus. Mauris diam
                  sem, egestas tincidunt arcu id, tristique rutrum risus.
                </Text>

                <Text align="left" my="xl">
                  Maecenas interdum pharetra sapien, ac rutrum magna vehicula
                  eget. Quisque rhoncus, justo vitae molestie ultricies, lorem
                  nunc convallis ex, ut bibendum magna ligula ultricies eros.
                  Proin ex nisi, tempus ac venenatis at, facilisis sit amet
                  odio. Nam et ante ultrices, rutrum massa a, placerat orci. In
                  ultrices mauris a rhoncus ultrices. Etiam vestibulum dui a ex
                  mollis laoreet. In ullamcorper ante ut lectus sodales, nec
                  tincidunt justo lacinia. Etiam orci ligula, aliquet a
                  malesuada non, ultricies sit amet nunc. Morbi convallis
                  molestie egestas. Fusce condimentum arcu nec mollis semper.
                  Interdum et malesuada fames ac ante ipsum primis in faucibus.
                </Text>
              </Box>
            </Grid.Col>
          </Grid>
        </Stack>
      </Paper>
    </AppWrapper>
  );
};

export default AfridiArticle;
