import {
  Avatar,
  Title,
  Text,
  Group,
  Stack,
  type MantineTheme,
  LoadingOverlay,
  Loader,
  Center,
  Button,
  Tooltip,
} from "@mantine/core";
import {
  IconArrowRight,
  IconBolt,
  IconBrandReactNative,
  IconCode,
  IconHeart,
} from "@tabler/icons";
import { useState } from "react";
import { Fragment } from "react";
import HorizontalGridCard, {
  CardStyle,
} from "../global/grid-cards/horizontalGridCard";
import { Fade } from "react-awesome-reveal";

interface LandingFeedProps {
  theme: MantineTheme;
}

const LandingFeed: React.FC<LandingFeedProps> = ({ theme }) => {
  const [key, setKey] = useState("trending");
  const [loading, setLoading] = useState(false);
  return (
    <Fragment>
      <Group position="apart">
        {/**  @ts-ignore */}
        <Fade>
          {key == null ? (
            <Title
              key="your-feed"
              className="text-[18px] xs:text-3xl p-0 xs:mt-0 xs:p-5 transition-all ease-in-out"
            >
              My Feed
            </Title>
          ) : key == "trending" ? (
            <Title
              key="trending"
              className="text-[18px] xs:text-3xl p-0 xs:mt-0 xs:p-5 transition-all ease-in-out"
            >
              Trending
            </Title>
          ) : key == "popular" ? (
            <Title
              key="loved"
              className="text-[18px] xs:text-3xl p-0 xs:mt-0 xs:p-5 transition-all ease-in-out"
            >
              Popular
            </Title>
          ) : null}
        </Fade>

        <Group className="mr-1 xs:mr-10">
          <Stack className="cursor-pointer" spacing="xs">
            <Tooltip label="My Feed">
              <Avatar
                className={
                  (key == null ? "shadow-xl shadow-yellow-600" : "") +
                  " cursor-pointer"
                }
                radius="xl"
                size="md"
                color="yellow"
                onClick={() => setKey(null)}
              >
                <Text size="xl">🤔</Text>
              </Avatar>
            </Tooltip>
            {/* {key == null ? <Divider size="sm" color="yellow" /> : null} */}
          </Stack>
          <Stack
            spacing="xs"
            onClick={() => {
              setKey("trending");
              setLoading(true);
            }}
          >
            <Tooltip label="Trending">
              <Avatar
                className={
                  (key == "trending" ? "shadow-xl shadow-sky-600" : "") +
                  " cursor-pointer"
                }
                radius="xl"
                size="md"
                color="blue"
              >
                <IconBolt
                  className={key !== "trending" ? "fill-transparent" : ""}
                  fill={key == "trending" ? theme.colors.blue[6] : null}
                />
              </Avatar>
            </Tooltip>
            {/* {key == "trending" ? (
                      <Divider size="sm" color="blue" />
                    ) : null} */}
          </Stack>

          <Stack
            spacing="xs"
            onClick={() => {
              setKey("popular");
              setLoading(true);
            }}
          >
            <Tooltip label="Popular">
              <Avatar
                className={
                  (key == "popular" ? "shadow-xl shadow-red-600" : "") +
                  " cursor-pointer"
                }
                radius="xl"
                size="md"
                color="red"
              >
                <IconHeart
                  className={key !== "popular" ? "fill-transparent" : ""}
                  fill={key == "popular" ? theme.colors.red[6] : null}
                />
              </Avatar>
            </Tooltip>

            {/* {key == "loved" ? <Divider size="sm" color="red" /> : null} */}
          </Stack>
        </Group>
      </Group>

      <Stack spacing="xl" mt="xl" className="relative">
        <LoadingOverlay
          className="h-screen"
          visible={loading}
          loader={
            <Stack align="center">
              <Avatar
                className="absolute top-[100px]"
                size="lg"
                color={
                  key == "trending"
                    ? "blue"
                    : key == "popular"
                    ? "red"
                    : "yellow"
                }
                radius="xl"
              >
                {loading ? (
                  key == "trending" ? (
                    <IconBolt
                      className="animate-bounce"
                      fill={theme.colors.blue[6]}
                    />
                  ) : key == "popular" ? (
                    <IconHeart
                      className="animate-bounce"
                      fill={theme.colors.red[6]}
                    />
                  ) : (
                    <Text size="xl" className="animate-bounce text-2xl">
                      🤔
                    </Text>
                  )
                ) : null}
              </Avatar>
              <Text
                className="absolute top-[170px] capitalize"
                color={
                  key == "trending"
                    ? "blue"
                    : key == "popular"
                    ? "red"
                    : "yellow"
                }
                weight={700}
              >
                Fetching {key ?? "Your Feed"} {"Articles"}
              </Text>
            </Stack>
          }
        />
        <Center mt={50}>
          <Stack>
            <Text
              className="text-center text-3xl"
              weight={800}
              color="dimmed"
              size="xl"
            >
              Hmmmm...Empty
            </Text>
            <Text size="md" color="dimmed">
              Susbscribe to some topics in order to see articles here
            </Text>
            <Button
              color="cyan"
              rightIcon={<IconArrowRight size={theme.fontSizes.xl} />}
            >
              Go to Topics and Subscribe
            </Button>
          </Stack>
        </Center>
        <HorizontalGridCard style={CardStyle.FEED} theme={theme} />
        <HorizontalGridCard style={CardStyle.FEED} theme={theme} />
        <HorizontalGridCard style={CardStyle.FEED} theme={theme} />
        <HorizontalGridCard style={CardStyle.FEED} theme={theme} />
        <HorizontalGridCard style={CardStyle.FEED} theme={theme} />
        <HorizontalGridCard style={CardStyle.FEED} theme={theme} />
        <HorizontalGridCard style={CardStyle.FEED} theme={theme} />
        <HorizontalGridCard style={CardStyle.FEED} theme={theme} />
        <HorizontalGridCard style={CardStyle.FEED} theme={theme} />
        <HorizontalGridCard style={CardStyle.FEED} theme={theme} />
      </Stack>
    </Fragment>
  );
};

export default LandingFeed;
