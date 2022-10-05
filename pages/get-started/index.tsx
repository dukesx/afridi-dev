import {
  Button,
  Card,
  Center,
  Group,
  List,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";

import Image from "next/image";
import AppWrapper from "../../components/global/wrapper";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { Auth, ThemeSupa } from "@supabase/auth-ui-react";
import { IconCheck } from "@tabler/icons";
import TeamWork from "../../public/team-work.svg";
import { useMediaQuery } from "@mantine/hooks";
const GetStarted = () => {
  const { isLoading, session, error, supabaseClient } = useSessionContext();
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();
  const mobile = useMediaQuery("(min-width: 550px", false);
  return (
    <AppWrapper size="md" activeHeaderKey="">
      <Card mt="xl" className="w-full">
        <Group className="w-full" p="sm" grow noWrap>
          {mobile ? (
            <Stack className="max-w-[450px] relative hidden xs:flex">
              <Image priority alt="" width={300} height={300} src={TeamWork} />

              <List
                spacing="md"
                icon={
                  <IconCheck
                    color={theme.colors.teal[5]}
                    className="align-middle"
                    size={18}
                  />
                }
              >
                <List.Item>Bookmarks & Read Later</List.Item>
                <List.Item>Customised Feed</List.Item>
                <List.Item>Comments</List.Item>
                <List.Item>
                  Synced Data Across Mobile, Tablets & Website
                </List.Item>
              </List>
            </Stack>
          ) : null}
          <div className="w-full">
            <Auth
              supabaseClient={supabaseClient}
              theme={colorScheme}
              appearance={{
                theme: ThemeSupa,
                style: {
                  message: {
                    textAlign: "center",
                  },
                },
                variables: {
                  default: {
                    radii: {
                      borderRadiusButton: `${theme.radius.xl}px`,
                      buttonBorderRadius: `${theme.radius.xl}px`,
                      inputBorderRadius: `${theme.radius.xl}px`,
                    },
                    fonts: {
                      bodyFontFamily: "Inter, sans-serif",
                      buttonFontFamily: "Inter, sans-serif",
                      inputFontFamily: "Inter, sans-serif",
                      labelFontFamily: "Inter, sans-serif",
                    },
                    colors: {
                      brand: theme.colors.cyan[6],
                      brandAccent: theme.colors.cyan[8],
                    },
                  },
                },
              }}
              providers={["github", "gitlab", "google", "slack", "discord"]}
              socialLayout="horizontal"
              // onlyThirdPartyProviders
              dark={colorScheme == "dark" ? true : false}
            />
          </div>
        </Group>
      </Card>
      {/* <Card
          className="max-w-[800px] h-[450px] w-full border-cyan-400"
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
                  priority
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
              onClick={async () => {
                const { data, error } =
                  await supabaseClient.auth.signInWithOAuth({
                    provider: "gitlab",
                  });
              }}
              leftIcon={
                <Image
                  priority
                  src={GitlabLogo}
                  height={29}
                  width={29}
                  alt="Login with Github"
                />
              }
            >
              Sign in with Gitlab
            </Button>
            <Button
              className="shadow-md w-[200px] text-center mx-auto"
              radius="xl"
              variant="white"
              leftIcon={
                <Image
                  priority
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
                  priority
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
                  priority
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
        </Card> */}
    </AppWrapper>
  );
};

export default GetStarted;
