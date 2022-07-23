import {
  Card,
  Container,
  Grid,
  Group,
  MediaQuery,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { Fragment } from "react";
import GlobalHeader from "../components/global/header";
import AppWrapper from "../components/global/wrapper";
import LargeGridCard from "../components/global/grid-cards/largeGridCard";
import HorizontalGridCard from "../components/global/grid-cards/horizontalGridCard";
import { useMediaQuery } from "@mantine/hooks";

const LandingPage = () => {
  const theme = useMantineTheme();
  const matches = useMediaQuery(`(max-width: 700px)`);
  console.log(matches);
  return (
    <Fragment>
      <GlobalHeader selectedKey={0} />
      <AppWrapper size="xl">
        {matches ? (
          <Text>Hello</Text>
        ) : (
          <Grid className="mt-5" align="stretch" justify="center" gutter="xl">
            <Grid.Col xs={10} sm={6} md={4}>
              <LargeGridCard theme={theme} />
            </Grid.Col>
            <Grid.Col xs={10} sm={6} md={4}>
              <Stack justify="center" spacing={25}>
                <HorizontalGridCard theme={theme} />
                {
                  //
                }
                <HorizontalGridCard theme={theme} />

                {
                  //
                }
                <HorizontalGridCard theme={theme} />

                {
                  //
                }
                <HorizontalGridCard theme={theme} />
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
        )}
      </AppWrapper>
    </Fragment>
  );
};

export default LandingPage;
