import { Container, Grid, Group, Header, Stack, Text } from "@mantine/core";
import { Fragment } from "react";

const LandingPage = () => {
  return (
    <Fragment>
      <Header height={50}>
        <Stack className="h-full" justify="center">
          <Group align="flex-start">
            <Text className="ml-10">hello</Text>
          </Group>
        </Stack>
      </Header>
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
