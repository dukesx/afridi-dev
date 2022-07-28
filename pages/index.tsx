import {
  Card,
  Divider,
  Grid,
  MediaQuery,
  Space,
  Stack,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Fragment } from "react";
import GlobalHeader from "../components/global/header";
import AppWrapper from "../components/global/wrapper";
import LargeGridCard from "../components/global/grid-cards/largeGridCard";
import HorizontalGridCard, {
  CardStyle,
} from "../components/global/grid-cards/horizontalGridCard";
import { useMediaQuery } from "@mantine/hooks";
import { StickyContainer, Sticky } from "react-sticky";
import LandingFeed from "../components/landing/feed";
import SquareHorizontalWidget from "../components/landing/widgets/square-horizontal";
import { IconStar, IconStars } from "@tabler/icons";
const LandingPage = () => {
  const theme = useMantineTheme();
  const dontShowGrid = useMediaQuery(`(max-width: 700px)`, false);
  const dontShowSidebar = useMediaQuery(`(max-width: 700px)`, false);

  return (
    <Fragment>
      <AppWrapper activeHeaderKey="home" size="xl">
        {/**
         *  Grid Starts
         *
         */}
        <Card withBorder className="border-1 border-orange-400 hidden sm:block">
          <Grid className="mt-5" align="stretch" justify="center" gutter="xl">
            <Grid.Col xs={6} sm={6} md={4}>
              <LargeGridCard theme={theme} />
            </Grid.Col>
            <Grid.Col xs={6} sm={6} md={4}>
              <Stack spacing={25}>
                <Stack spacing={9}>
                  <Title className="text-center" order={2}>
                    <IconStar
                      className="mr-3 align-[-2px]"
                      fill={theme.colors.orange[4]}
                      color={theme.colors.orange[4]}
                    />
                    Freshly Published
                  </Title>
                  <Divider color="orange" />
                </Stack>

                <HorizontalGridCard style={CardStyle.DEFAULT} theme={theme} />
                {
                  //
                }
                <HorizontalGridCard style={CardStyle.DEFAULT} theme={theme} />

                {
                  //
                }
                <HorizontalGridCard style={CardStyle.DEFAULT} theme={theme} />

                {
                  //
                }
                <HorizontalGridCard style={CardStyle.DEFAULT} theme={theme} />
              </Stack>
            </Grid.Col>
            <MediaQuery
              smallerThan="md"
              styles={{
                display: "none",
              }}
            >
              <Grid.Col sm={4} md={4}>
                <LargeGridCard
                  className="max-w-[608px] mx-auto"
                  theme={theme}
                />
              </Grid.Col>
            </MediaQuery>
          </Grid>
        </Card>

        {/**
         *
         * Grid Ends
         */}

        {/**
         *  Feed + Sidebar
         *
         */}
        <StickyContainer>
          <Grid
            id="main-content"
            mt="xl"
            className="min-h-full xs:min-h-[1200px]"
          >
            <Grid.Col span={12} sm={7} xs={12} md={7}>
              <LandingFeed theme={theme} />
            </Grid.Col>

            <Grid.Col
              className="hidden sm:flex flex-col"
              span={5}
              xs={12}
              sm={5}
              md={5}
            >
              <Sticky bottomOffset={100}>
                {({
                  style,

                  // the following are also available but unused in this example
                  isSticky,
                  wasSticky,
                  distanceFromTop,
                  distanceFromBottom,
                  calculatedHeight,
                }) => (
                  <div
                    className="gap-y-10 flex flex-col items-center"
                    style={style}
                  >
                    <SquareHorizontalWidget
                      title="Must Reads"
                      icon="👀"
                      theme={theme}
                      color="cyan"
                    />
                    <SquareHorizontalWidget
                      icon="👏"
                      theme={theme}
                      color="blue"
                      title="This Month's Top"
                    />
                  </div>
                )}
              </Sticky>
            </Grid.Col>
          </Grid>
        </StickyContainer>

        {/**
         *
         * Feed + Sidebar Ends
         */}
      </AppWrapper>
    </Fragment>
  );
};

export default LandingPage;
