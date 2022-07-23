import { Container, Grid, Text } from "@mantine/core";
import { Fragment } from "react";
import GlobalHeader from "../components/global/header";
import AppWrapper from "../components/global/wrapper";

const LandingPage = () => {
  return (
    <Fragment>
      <GlobalHeader selectedKey={0} />
      <AppWrapper size="xl">
        <Grid>
          <Grid.Col xl={10} sm={1} xs={1}>
            <Text>Great !</Text>
          </Grid.Col>
        </Grid>
      </AppWrapper>
    </Fragment>
  );
};

export default LandingPage;
