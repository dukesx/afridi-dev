import {
  Avatar,
  Badge,
  Button,
  Card,
  createStyles,
  Divider,
  Grid,
  Group,
  Skeleton,
  Stack,
  Tabs,
  Text,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useRouter } from "next/router";
import AppWrapper from "../../components/global/wrapper";
import { IKImage } from "imagekitio-react";
import AfridiImage, {
  AfridiImageLoadingEnum,
} from "../../components/global/afridi-image";
import {
  IconListDetails,
  IconPencil,
  IconPencilPlus,
  IconShieldLock,
  IconStar,
  IconUserCircle,
} from "@tabler/icons";
import { useEffect, useState } from "react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import Image from "next/image";
import NoDataPlaceholder from "../../public/nodata.svg";
import HorizontalGridCard, {
  CardStyle,
} from "../../components/global/grid-cards/horizontalGridCard";
import SquareHorizontalWidget from "../../components/landing/widgets/square-horizontal";

const UserProfilePage = () => {
  const router = useRouter();
  const { user } = router.query;
  const theme = useMantineTheme();
  const [data, setData] = useState(null);
  const { colorScheme } = useMantineColorScheme();

  const specialStyles = createStyles((theme) => ({
    col: {
      display: "flex",
      flexDirection: "column",

      [`@media (max-width: ${theme.breakpoints.sm}px)`]: {
        display: "none",
      },
    },
  }));

  const { classes } = specialStyles();

  useEffect(() => {
    const getData = async () => {
      const { data: userData, error: userDataError } = await supabaseClient
        .from("authors")
        .select(
          `
      id,
      dp,
      cover,
      articles (
        id
      )
      `
        )
        .eq("id", user);

      if (!userDataError) {
        setData(userData[0]);
        console.log(userData);
      }
    };

    getData();
  }, []);

  return (
    <AppWrapper activeHeaderKey="" size="lg">
      <Card px={0} className="w-full">
        <Card.Section className="">
          {!data ? (
            <Skeleton height={350} />
          ) : (
            <AfridiImage
              height={350}
              width={1320}
              path={
                data.dp
                  ? `/${data.dp}`
                  : colorScheme == "dark"
                  ? "/image-horizontal-placeholder-dark.png"
                  : "/image-horizontal-placeholder.png"
              }
              loading={AfridiImageLoadingEnum.LAZY}
              style={{
                objectFit: "cover",
              }}
            />
          )}
        </Card.Section>

        <Stack className="max-w-[1000px]">
          <Group position="apart">
            <Group pt="xl" py="sm">
              <Avatar className="rounded-full h-[90px] w-[90px] sm:h-[120px] sm:w-[120px] shadow-lg">
                {!data ? (
                  <Skeleton height={120} />
                ) : (
                  <AfridiImage
                    className=""
                    height={120}
                    width={120}
                    path={
                      data.cover
                        ? `/${data.cover}`
                        : colorScheme == "dark"
                        ? "/image-avatar-placeholder-dark.png"
                        : `/image-avatar-placeholder.png`
                    }
                    loading={AfridiImageLoadingEnum.LAZY}
                    style={
                      {
                        // objectFit: "cover",
                      }
                    }
                  />
                )}
              </Avatar>
              <Stack spacing={2}>
                {!data ? (
                  <Skeleton
                    className="w-[200px] sm:w-[400px]"
                    radius="lg"
                    height={22}
                  />
                ) : (
                  <Title className="text-sm sm:text-xl" order={4}>
                    Muhammad Afzaal Afridi
                  </Title>
                )}

                {!data ? (
                  <Skeleton
                    mt="sm"
                    height={20}
                    className="w-[100px] sm:w-[200px]"
                    radius="lg"
                  />
                ) : (
                  <Text color="dimmed" weight={400} size="md">
                    Administrator
                  </Text>
                )}
              </Stack>
            </Group>
          </Group>

          <Tabs
            className="pb-16 min-h-[400px]"
            color="blue"
            defaultValue="feed"
          >
            <Tabs.List grow position="center">
              <Tabs.Tab
                value="feed"
                icon={
                  <IconListDetails size={20} color={theme.colors.cyan[6]} />
                }
              >
                Status Feed
              </Tabs.Tab>
              <Tabs.Tab
                value="exclusive"
                icon={
                  <IconStar
                    size={20}
                    color={theme.colors.yellow[6]}
                    fill={theme.colors.yellow[6]}
                  />
                }
              >
                Exclusive Content
              </Tabs.Tab>
              <Tabs.Tab
                value="about"
                icon={<IconUserCircle color={theme.colors.blue[6]} size={20} />}
              >
                About
              </Tabs.Tab>
            </Tabs.List>

            <Tabs.Panel value="feed" pt="xs">
              {data ? (
                data.articles && data.articles.length <= 0 ? (
                  <Grid>
                    <Grid.Col span={12} sm={7}>
                      <Stack className="py-5 px-0 sm:p-5" spacing="xl">
                        <HorizontalGridCard
                          style={CardStyle.FEED}
                          theme={theme}
                        />
                        <HorizontalGridCard
                          style={CardStyle.FEED}
                          theme={theme}
                        />
                        <HorizontalGridCard
                          style={CardStyle.FEED}
                          theme={theme}
                        />
                      </Stack>
                    </Grid.Col>

                    <Grid.Col className={classes.col} span={0} sm={5}>
                      <Stack spacing="xl" mt="xl">
                        <SquareHorizontalWidget
                          title="Must Reads"
                          icon="👀"
                          theme={theme}
                          color="cyan"
                        />
                        <SquareHorizontalWidget
                          title="Must Reads"
                          icon="👀"
                          theme={theme}
                          color="cyan"
                        />
                      </Stack>
                    </Grid.Col>
                  </Grid>
                ) : (
                  <Stack align="center" spacing={0} mt="xl">
                    <Image
                      width={300}
                      height={300}
                      src={NoDataPlaceholder}
                      alt="No Data"
                    />
                    <Button
                      leftIcon={<IconPencilPlus />}
                      className="max-w-[300px] text-center"
                      fullWidth={false}
                    >
                      Let&apos;s Create a Post
                    </Button>
                  </Stack>
                )
              ) : (
                <Stack mt={30}>
                  <Group>
                    <Skeleton radius="lg" height={90} width={90} />

                    <Stack>
                      <Skeleton
                        radius="xl"
                        height={20}
                        className="w-[200px] sm:w-[400px]"
                      />
                      <Skeleton
                        radius="xl"
                        height={15}
                        className="w-[100px] sm:w-[200px]"
                      />
                    </Stack>
                  </Group>
                  <Group>
                    <Skeleton radius="lg" height={90} width={90} />

                    <Stack>
                      <Skeleton
                        radius="xl"
                        height={20}
                        className="w-[200px] sm:w-[400px]"
                      />
                      <Skeleton
                        radius="xl"
                        height={15}
                        className="w-[100px] sm:w-[200px]"
                      />
                    </Stack>
                  </Group>
                  <Group>
                    <Skeleton radius="lg" height={90} width={90} />
                    <Stack>
                      <Skeleton
                        radius="xl"
                        height={20}
                        className="w-[200px] sm:w-[400px]"
                      />
                      <Skeleton
                        radius="xl"
                        height={15}
                        className="w-[100px] sm:w-[200px]"
                      />
                    </Stack>
                  </Group>
                </Stack>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="exclusive" pt="xs">
              Exclusive Content
            </Tabs.Panel>

            <Tabs.Panel value="about" pt="xs">
              About Me
            </Tabs.Panel>
          </Tabs>
        </Stack>
      </Card>
    </AppWrapper>
  );
};

export default UserProfilePage;
