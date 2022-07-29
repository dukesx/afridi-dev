import {
  Avatar,
  Badge,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Tabs,
  Text,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useRouter } from "next/router";
import AppWrapper from "../../components/global/wrapper";
import { IKImage } from "imagekitio-react";
import AfridiImage, {
  AfridiImageLoadingEnum,
} from "../../components/global/afridi-image";
import {
  IconCheck,
  IconCrown,
  IconListDetails,
  IconPhoto,
  IconShield,
  IconShieldLock,
  IconStar,
  IconUser,
  IconUserCircle,
  IconUserPlus,
} from "@tabler/icons";

const UserProfilePage = () => {
  const router = useRouter();
  const { user } = router.query;
  const theme = useMantineTheme();
  return (
    <AppWrapper activeHeaderKey="" size="xl">
      <Card className="w-full">
        <Card.Section className="">
          <AfridiImage
            height={350}
            width={1320}
            path="/7011585.jpeg"
            loading={AfridiImageLoadingEnum.LAZY}
            style={{
              objectFit: "cover",
            }}
          />
        </Card.Section>

        <Group position="apart">
          <Group py="xl">
            <Avatar
              className="rounded-full h-[90px] w-[90px] sm:h-[120px] sm:w-[120px] shadow-lg"

              // radius="xl"
              // color="cyan"
            >
              <AfridiImage
                className=""
                height={120}
                width={120}
                path="/stock.jpeg"
                loading={AfridiImageLoadingEnum.LAZY}
                style={{
                  objectFit: "cover",
                }}
              />
            </Avatar>
            <Stack spacing={2}>
              <Title className="text-sm sm:text-xl" order={4}>
                Muhammad Afzaal Afridi
              </Title>
              <Text color="dimmed" weight={400} size="md">
                Administrator
              </Text>
            </Stack>
          </Group>
          <Group p="xl">
            {/* <Button leftIcon={<IconUserPlus size={21} />} radius="xl">
              Add Friend
            </Button> */}

            <Badge
              size="lg"
              className="align-middle"
              leftSection={
                <IconShieldLock className="align-middle mr-1" size={22} />
              }
              color="blue"
            >
              Moderator
            </Badge>
          </Group>
        </Group>

        <Tabs color="blue" defaultValue="feed">
          <Tabs.List grow position="center">
            <Tabs.Tab
              value="feed"
              icon={<IconListDetails size={20} color={theme.colors.cyan[6]} />}
            >
              Status Feed
            </Tabs.Tab>
            <Tabs.Tab
              value="exclusive"
              icon={
                <IconStar
                  size={20}
                  color={theme.colors.yellow[6]}
                  fill={theme.colors.yellow[6]}
                />
              }
            >
              Exclusive Content
            </Tabs.Tab>
            <Tabs.Tab
              value="about"
              icon={<IconUserCircle color={theme.colors.blue[6]} size={20} />}
            >
              About
            </Tabs.Tab>
          </Tabs.List>

          <Tabs.Panel value="feed" pt="xs">
            Feed here
          </Tabs.Panel>

          <Tabs.Panel value="exclusive" pt="xs">
            Exclusive Content
          </Tabs.Panel>

          <Tabs.Panel value="about" pt="xs">
            About Me
          </Tabs.Panel>
        </Tabs>
      </Card>
    </AppWrapper>
  );
};

export default UserProfilePage;
