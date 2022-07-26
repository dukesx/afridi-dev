import {
  Button,
  Group,
  Header,
  type MantineTheme,
  MediaQuery,
  Menu,
  Stack,
  Text,
  useMantineColorScheme,
  Divider,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import {
  IconArrowDown,
  IconBulb,
  IconChecklist,
  IconDice,
  IconExternalLink,
  IconEyeOff,
  IconHash,
  IconMoon,
  IconScale,
  IconSmartHome,
  IconSun,
  IconUserCircle,
  IconUsers,
} from "@tabler/icons";
import Link from "next/link";

interface GlobalHeaderProps {
  activeHeaderKey: string;
  theme: MantineTheme;
}
const GlobalHeader: React.FC<GlobalHeaderProps> = ({
  activeHeaderKey,
  theme,
}) => {
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  return (
    <Header className="w-full" height={70}>
      <Stack className="h-full w-full" justify="center" spacing={0}>
        <Group
          className="w-full align-middle h-full"
          position="center"
          spacing={0}
        >
          {/* <Stack className="h-full" align="center" justify="center" spacing={0}> */}
          <Text
            className="ml-5 xs:ml-5 sm:ml-5 md:ml-5 lg:ml-5 xl:ml-5 font-mono text-sm xs:text-xl hidden xs:block"
            size="xl"
            weight={400}
            // variant="gradient"
            // gradient={{
            //   from: "blue",
            //   to: "indigo",
            // }}
            color={theme.colorScheme == "dark" ? theme.white : "blue"}
          >
            AFRIDI.{"</"}
          </Text>
          <Group
            className="ml-2 font-mono"
            noWrap
            spacing={3}
            position="center"
            align="center"
          >
            <Text
              className="text-lg xs:text-sm"
              // variant="gradient"
              // gradient={{
              //   from: "blue",
              //   to: "cyan",
              // }}
              color={theme.colorScheme == "dark" ? theme.white : "cyan"}
              size="xs"
              weight={500}
            >
              The
            </Text>
            <Text
              className="text-lg xs:text-sm mx-1 xs:mx-0"
              // variant="gradient"
              // gradient={{
              //   from: "blue",
              //   to: "cyan",
              // }}
              size="xs"
              weight={800}
              color={theme.colorScheme == "dark" ? theme.white : "blue"}
            >
              DEV&apos;s
            </Text>
            <Text
              className="text-lg xs:text-sm"
              // variant="gradient"
              // gradient={{
              //   from: "blue",
              //   to: "cyan",
              // }}
              size="xs"
              weight={500}
              color={theme.colorScheme == "dark" ? theme.white : "cyan"}
            >
              Blog
            </Text>
            <Text
              className="font-mono ml-1 text-2xl xs:text-xl"
              // variant="gradient"
              // gradient={{
              //   from: "blue",
              //   to: "cyan",
              // }}
              size="xl"
              weight={400}
              color={theme.colorScheme == "dark" ? theme.white : "blue"}
            >
              {" >"}
            </Text>
          </Group>
          {/* </Stack> */}
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
              <Link href="/" passHref>
                <Button
                  leftIcon={<IconSmartHome size={18} />}
                  variant={activeHeaderKey == "home" ? "gradient" : "subtle"}
                  gradient={
                    activeHeaderKey == "home"
                      ? {
                          from: "cyan",
                          to: "teal",
                        }
                      : null
                  }
                  color="blue"
                  component="a"
                >
                  Home
                </Button>
              </Link>

              <Link href="/topics" passHref>
                <Button
                  leftIcon={<IconHash size={18} />}
                  variant={activeHeaderKey == "topics" ? "gradient" : "subtle"}
                  gradient={
                    activeHeaderKey == "topics"
                      ? {
                          from: "cyan",
                          to: "teal",
                        }
                      : null
                  }
                  color="blue"
                  component="a"
                >
                  Topics
                </Button>
              </Link>

              <Menu width={200}>
                <Menu.Target>
                  <Button
                    variant="subtle"
                    rightIcon={<IconArrowDown size={18} />}
                  >
                    More
                  </Button>
                </Menu.Target>

                <Menu.Dropdown>
                  <Menu.Item
                    href="/authors"
                    component={NextLink}
                    icon={<IconUsers size={20} />}
                  >
                    <Text>Author&apos;s Listing</Text>
                  </Menu.Item>
                  <Menu.Item
                    component={NextLink}
                    href="/dazzle-me"
                    icon={
                      <IconDice
                        // fill={theme.colors.blue[6]}
                        color={theme.colors.blue[6]}
                        size={23}
                      />
                    }
                  >
                    Random Article
                  </Menu.Item>
                  <Menu.Label>
                    <Text weight={600}>Legal</Text>
                  </Menu.Label>

                  <Menu.Item
                    component={NextLink}
                    href="/legal/privacy-policy"
                    icon={<IconEyeOff size={20} />}
                  >
                    Privacy Policy
                  </Menu.Item>
                  <Menu.Item
                    component={NextLink}
                    href="/legal/terms"
                    icon={<IconScale size={20} />}
                  >
                    Terms
                  </Menu.Item>

                  <Menu.Label>
                    <Text weight={600}>About</Text>
                  </Menu.Label>
                  <Menu.Item
                    component={NextLink}
                    href="/about/dev"
                    icon={
                      <IconUserCircle color={theme.colors.cyan[6]} size={20} />
                    }
                  >
                    <Group spacing={5}>
                      <Text>The</Text>
                      <Stack spacing={0}>
                        <Text color="cyan" weight={700} className="">
                          DEV
                        </Text>
                        <Divider color="cyan" size="xs" />
                      </Stack>
                    </Group>
                  </Menu.Item>
                  <Menu.Item
                    component={NextLink}
                    href="/about/vision"
                    icon={
                      <IconBulb
                        color={theme.colors.yellow[6]}
                        // fill={theme.colors.yellow[6]}
                        size={20}
                      />
                    }
                  >
                    The Vision
                  </Menu.Item>
                  <Menu.Item
                    component={NextLink}
                    href="/about/roadmap"
                    icon={
                      <IconChecklist color={theme.colors.blue[6]} size={20} />
                    }
                  >
                    The Roadmap
                  </Menu.Item>
                </Menu.Dropdown>
              </Menu>
            </Group>
          </MediaQuery>
          {colorScheme == "dark" ? (
            <Button
              onClick={() => toggleColorScheme()}
              radius="xl"
              className="ml-auto bg-gradient-to-r from-amber-300 to-orange-400 mr-4 xs:mr-4"
              px={8}
              variant="gradient"
            >
              <IconSun size={21} />
            </Button>
          ) : (
            <Button
              onClick={() => toggleColorScheme()}
              radius="xl"
              className="ml-auto mr-4 xs:mr-4"
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
          <Link href="/get-started" passHref>
            <Button
              component="a"
              radius="xl"
              rightIcon={<IconExternalLink size={20} />}
              className="mr-5 xs:mr-5 sm:mr-5 md:mr-5 lg:mr-5 xl:mr-5 text-xs"
              variant="gradient"
              gradient={{
                from: "cyan",
                to: "blue",
              }}
            >
              Get Started
            </Button>
          </Link>
        </Group>
      </Stack>
    </Header>
  );
};

export default GlobalHeader;
