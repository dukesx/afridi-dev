import {
  Button,
  Group,
  Header,
  MediaQuery,
  Stack,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { IconExternalLink, IconMoon, IconSun } from "@tabler/icons";

const GlobalHeader = () => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();

  return (
    <Header className="w-full" height={70}>
      <Stack className="h-full w-full" justify="center" spacing={0}>
        <Group className="w-full align-middle h-full" position="center">
          <Stack className="h-full" align="center" justify="center" spacing={0}>
            <Text
              className="ml-5 xs:ml-5 sm:ml-5 md:ml-5 lg:ml-5 xl:ml-5"
              size="lg"
              weight={800}
            >
              AFRIDI.DEV
            </Text>
            <Group
              className="ml-0 xs:ml-2 sm:ml-2 md:ml-2 lg:ml-2 xl:ml-2"
              spacing={3}
              position="center"
              align="center"
            >
              <Text size="xs" weight={500}>
                The
              </Text>
              <Text size="xs" weight={800}>
                DEV&apos;s
              </Text>
              <Text size="xs" weight={500}>
                Blog
              </Text>
            </Group>
          </Stack>
          <MediaQuery
            smallerThan={950}
            styles={{
              display: "none",
            }}
          >
            <Group
              ml="auto"
              position="apart"
              align="center"
              className="mr-5 align-middle h-full"
            >
              <Button
                variant="gradient"
                gradient={{
                  from: "blue",
                  to: "indigo",
                }}
                color="blue"
                component="a"
                href="/"
              >
                Home
              </Button>
              <Button
                component="a"
                href="/legal/privacy-policy"
                variant="subtle"
              >
                Privacy
              </Button>
              <Button
                component="a"
                href="/legal/terms-of-service"
                variant="subtle"
              >
                Terms
              </Button>
              <Button component="a" href="/about" variant="subtle" color="blue">
                About
              </Button>
            </Group>
          </MediaQuery>
          {colorScheme == "dark" ? (
            <Button
              onClick={() => toggleColorScheme()}
              radius="xl"
              className="ml-auto bg-gradient-to-r from-amber-300 to-orange-400"
              px={8}
              variant="gradient"
            >
              <IconSun size={21} />
            </Button>
          ) : (
            <Button
              onClick={() => toggleColorScheme()}
              radius="xl"
              className="ml-auto"
              px={8}
              variant="gradient"
              gradient={{
                from: "dark",
                to: "grey",
              }}
            >
              <IconMoon size={21} />
            </Button>
          )}

          <Button
            component="a"
            href="/get-started"
            radius="xl"
            rightIcon={<IconExternalLink size={20} />}
            className="mr-5 xs:mr-5 sm:mr-5 md:mr-5 lg:mr-5 xl:mr-5 text-xs"
            variant="gradient"
            gradient={{
              from: "indigo",
              to: "teal",
            }}
          >
            Get Started
          </Button>
        </Group>
      </Stack>
    </Header>
  );
};

export default GlobalHeader;
