import { Container, Grid, Text } from "@mantine/core";
import { Fragment } from "react";
import GlobalHeader from "../components/global/header";

const LandingPage = () => {
  return (
    <Fragment>
      <GlobalHeader />
      <Container size="xl">
        <Grid>
          <Grid.Col xl={10} sm={1} xs={1}>
            <Text>Great !</Text>
          </Grid.Col>
        </Grid>
      </Container>
    </Fragment>
  );
};

export default LandingPage;
