import {
  Badge,
  List,
  Stack,
  Text,
  ThemeIcon,
  Timeline,
  Title,
  useMantineTheme,
} from "@mantine/core";
import {
  IconArrowRight,
  IconBookmark,
  IconChecklist,
  IconDice,
  IconHash,
  IconMessageCircle2,
  IconStar,
  IconUserCircle,
  IconUsers,
  IconVersions,
} from "@tabler/icons";
import { NextSeo } from "next-seo";
import CreatorStudioIcon from "../../components/global/creator-studio-icon";
import AppWrapper from "../../components/global/wrapper";

const RoadMap = () => {
  const theme = useMantineTheme();
  return (
    <AppWrapper size="md" activeHeaderKey="">
      <NextSeo
        title="Our Roadmap"
        description="The Roadmap & Goals of Afridi.dev"
        canonical="https://afridi.dev/about/roadmap"
        openGraph={{
          url: "https://afridi.dev/about/roadmap",
          title: "Our Roadmap",
          description: "The Roadmap & Goals of Afridi.dev",
          site_name: "Afridi.dev",
          images: [
            {
              url: "https://ik.imagekit.io/afrididotdev/tr:w-800/afridi-dev-light.png",
              width: 800,
              height: 800,
              alt: "Afridi.DEV Cover Image - Light",
              type: "image/jpeg",
            },
            {
              url: "https://ik.imagekit.io/afrididotdev/tr:w-800/afridi-dev-dark.png",
              width: 800,
              height: 800,
              alt: "Afridi.DEV Cover Image - Dark",
              type: "image/jpeg",
            },
          ],
        }}
        twitter={{
          handle: "@afridi.dev",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
      <Stack pb="xl" className="w-full" mt="xl">
        <ThemeIcon
          className="rounded-full mx-auto"
          size={100}
          radius="xl"
          variant="light"
          color="blue"
        >
          <IconVersions size={35} />
        </ThemeIcon>
        <Title order={2} mb="xl" className="mx-auto">
          The Roadmap
        </Title>

        <Timeline color="blue" active={0} bulletSize={60} lineWidth={2}>
          <Timeline.Item
            lineActive
            bullet={<Text weight={700}>v1.0</Text>}
            title={<Text ml={20}>Version 1.0</Text>}
          >
            <Badge color="red" ml={20} size="xs">
              Alpha
            </Badge>
            <Text ml={20} size="xs" mt={4}>
              This Fall, 2022
            </Text>
            <Text mb={3} size="xs" color="gray" mt={4} ml={20}>
              Features
            </Text>
            <List
              spacing="xs"
              icon={
                <IconStar
                  color={theme.colors.yellow[4]}
                  fill={theme.colors.yellow[4]}
                  className="align-middle"
                  size={14}
                />
              }
              ml={30}
              sx={(theme) => ({
                color: theme.colors.gray[6],
              })}
              size="xs"
            >
              <List.Item
                icon={
                  <ThemeIcon radius="xl" variant="light" color="cyan" size="sm">
                    <IconHash size={11} />
                  </ThemeIcon>
                }
              >
                Tags System
              </List.Item>
              <List.Item
                icon={
                  <ThemeIcon
                    radius="xl"
                    variant="light"
                    color="yellow"
                    size="sm"
                  >
                    <Text size="xs">👏</Text>
                  </ThemeIcon>
                }
              >
                Article Appreciations System (Reactions)
              </List.Item>
              <List.Item
                icon={
                  <ThemeIcon radius="xl" variant="light" color="cyan" size="sm">
                    <IconHash size={11} />
                  </ThemeIcon>
                }
              >
                Custom User Feed (like on FB based on followed tags, etc)
              </List.Item>
              <List.Item
                icon={
                  <ThemeIcon radius="xl" variant="light" color="gray" size="sm">
                    <IconBookmark fill={theme.colors.gray[4]} size={12} />
                  </ThemeIcon>
                }
              >
                Bookmarks System
              </List.Item>
              <List.Item
                icon={
                  <ThemeIcon radius="xl" variant="light" color="blue" size="sm">
                    <IconMessageCircle2
                      color={theme.colors.blue[4]}
                      size={12}
                      strokeWidth={2.6}
                    />
                  </ThemeIcon>
                }
              >
                Comments System
              </List.Item>
              <List.Item
                icon={
                  <ThemeIcon radius="xl" variant="light" color="blue" size="sm">
                    <IconUserCircle size={13} />
                  </ThemeIcon>
                }
              >
                User Profiles
              </List.Item>
              <List.Item
                ml="xl"
                icon={
                  <IconArrowRight
                    color={theme.colors.indigo[4]}
                    fill={theme.colors.indigo[4]}
                    className="align-middle"
                    size={14}
                  />
                }
              >
                Status Feed
              </List.Item>
              <List.Item
                icon={
                  <ThemeIcon
                    radius="xl"
                    variant="light"
                    color="indigo"
                    size="sm"
                  >
                    <IconDice size={12} />
                  </ThemeIcon>
                }
              >
                Randomize Article
              </List.Item>
              <List.Item
                icon={
                  <ThemeIcon radius="xl" variant="light" color="blue" size="sm">
                    <IconUsers size={12} />
                  </ThemeIcon>
                }
              >
                Co-Authors Support for Articles
              </List.Item>
              <List.Item icon={<CreatorStudioIcon size="sm" textSize={8} />}>
                Creator Studio
              </List.Item>
              <List.Item
                ml="xl"
                icon={
                  <IconArrowRight
                    color={theme.colors.indigo[4]}
                    fill={theme.colors.indigo[4]}
                    className="align-middle"
                    size={14}
                  />
                }
              >
                Create Articles
              </List.Item>
              <List.Item
                ml="xl"
                icon={
                  <IconArrowRight
                    color={theme.colors.indigo[4]}
                    fill={theme.colors.indigo[4]}
                    className="align-middle"
                    size={14}
                  />
                }
              >
                Article Analytics
              </List.Item>
            </List>
          </Timeline.Item>

          <Timeline.Item
            lineActive
            bullet={<Text weight={700}>v2.0</Text>}
            title={<Text ml={20}>Version 2.0</Text>}
          >
            <Badge color="cyan" ml={20} size="xs">
              Proposed
            </Badge>
            <Text ml={20} size="xs" mt={4}>
              Spring, 2023
            </Text>
            <Text mb={3} size="xs" color="gray" mt={4} ml={20}>
              Features
            </Text>
            <List
              spacing="xs"
              ml={30}
              sx={(theme) => ({
                color: theme.colors.gray[6],
              })}
              size="xs"
            >
              <List.Item>Channels/Brand Pages</List.Item>
              <List.Item ml="xl">
                Endorse/Sponsor Other Authors/Brands
              </List.Item>
              <List.Item ml="xl">Your Custom Branded Content</List.Item>
              <List.Item>Subscription system</List.Item>
              <List.Item ml="xl">
                Premium Articles & Tutorials like on Medium
              </List.Item>
              <List.Item ml="xl">Pay per view/read like on Medium</List.Item>
              <List.Item ml="xl">
                Exclusive Content Memberships like OF
              </List.Item>
              <List.Item ml="xl">Sponsorships like on Github</List.Item>

              <List.Item>Courses System</List.Item>
              <List.Item>Friends/Connections system like LinkedIn</List.Item>
              <List.Item>Chat System</List.Item>
              <List.Item ml="xl">1 to 1</List.Item>
              <List.Item ml="xl">Group (Under Consideration)</List.Item>
            </List>
          </Timeline.Item>
        </Timeline>
      </Stack>
    </AppWrapper>
  );
};

export default RoadMap;
