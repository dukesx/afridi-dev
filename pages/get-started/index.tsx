import {
  Button,
  Card,
  Center,
  Stack,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";

import Image from "next/image";
import AppWrapper from "../../components/global/wrapper";
import SlackLogo from "../../public/slack.png";
import DiscordLogo from "../../public/discord.png";
import GoogleLogo from "../../public/google.png";
import GithubLogo from "../../public/github.svg";
import { useSessionContext } from "@supabase/auth-helpers-react";

const GetStarted = () => {
  const { isLoading, session, error, supabaseClient } = useSessionContext();
  const theme = useMantineTheme();
  return (
    <AppWrapper size="sm" activeHeaderKey="">
      <Center className="mx-auto h-[500px]">
        <Card
          className="max-w-[800px] h-[400px] w-full border-cyan-400"
          withBorder
        >
          <Title className="text-center" mt="xl" order={2}>
            Welcome to Afridi.DEV
          </Title>
          <Text className="text-center" mt="sm" size="sm" color="dimmed">
            Lets start with your favorite service
          </Text>

          <Stack mt={50}>
            <Button
              className="shadow-md w-[200px] text-center mx-auto"
              radius="xl"
              variant="white"
              onClick={async () => {
                const { data, error } =
                  await supabaseClient.auth.signInWithOAuth({
                    provider: "github",
                  });
              }}
              leftIcon={
                <Image
                  src={GithubLogo}
                  height={22}
                  width={22}
                  alt="Login with Github"
                />
              }
            >
              Sign in with Github
            </Button>
            <Button
              className="shadow-md w-[200px] text-center mx-auto"
              radius="xl"
              variant="white"
              leftIcon={
                <Image
                  src={GoogleLogo}
                  height={23}
                  width={23}
                  alt="Login with Google"
                />
              }
              onClick={async () => {
                const { data, error } =
                  await supabaseClient.auth.signInWithOAuth({
                    provider: "google",
                  });
              }}
            >
              Sign in with Google
            </Button>

            <Button
              className="shadow-md w-[200px] text-center mx-auto"
              radius="xl"
              variant="white"
              onClick={async () => {
                const { data, error } =
                  await supabaseClient.auth.signInWithOAuth({
                    provider: "discord",
                  });
              }}
              leftIcon={
                <Image
                  src={DiscordLogo}
                  height={25}
                  width={25}
                  alt="Login with Discord"
                />
              }
            >
              Sign in with Discord
            </Button>

            <Button
              onClick={async () => {
                const { data, error } =
                  await supabaseClient.auth.signInWithOAuth({
                    provider: "slack",
                  });
              }}
              className="shadow-md w-[200px] text-center mx-auto"
              radius="xl"
              variant="white"
              leftIcon={
                <Image
                  src={SlackLogo}
                  height={20}
                  width={20}
                  alt="Login with Slack"
                />
              }
            >
              Sign in with Slack
            </Button>
          </Stack>
        </Card>
      </Center>
    </AppWrapper>
  );
};

export default GetStarted;
