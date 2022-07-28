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
import { supabaseClient } from "@supabase/auth-helpers-nextjs";

const GetStarted = () => {
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
              className="shadow-md max-w-[300px] text-center mx-auto"
              radius="xl"
              variant="white"
              leftIcon={
                <Image
                  src={GoogleLogo}
                  height={23}
                  width={23}
                  alt="slack icon"
                />
              }
              onClick={async () => {
                const { user, session, error } =
                  await supabaseClient.auth.signIn({
                    provider: "google",
                  });
              }}
            >
              Sign in with Google
            </Button>

            <Button
              className="shadow-md max-w-[300px] text-center mx-auto"
              radius="xl"
              variant="white"
              onClick={async () => {
                const { user, session, error } =
                  await supabaseClient.auth.signIn({
                    provider: "discord",
                  });
              }}
              leftIcon={
                <Image
                  src={DiscordLogo}
                  height={25}
                  width={25}
                  alt="slack icon"
                />
              }
            >
              Sign in with Discord
            </Button>

            <Button
              onClick={async () => {
                const { user, session, error } =
                  await supabaseClient.auth.signIn({
                    provider: "slack",
                  });
              }}
              className="shadow-md max-w-[300px] text-center mx-auto"
              radius="xl"
              variant="white"
              leftIcon={
                <Image
                  src={SlackLogo}
                  height={20}
                  width={20}
                  alt="slack icon"
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
