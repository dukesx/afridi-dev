import {
  Avatar,
  Card,
  Center,
  Divider,
  Group,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { IconCalendarStats, IconNews } from "@tabler/icons";
import AfridiImage from "../afridi-image";
import { format } from "date-fns";
import BrandAvatar from "./shared/brand-avatar";
import { useEffect } from "react";
import Image from "next/image";

interface DynamicAuthorCoverProps {
  full_name: string;
  dp: string;
  content_count: number;
  location: string;
  created_at: string;
  username: string;
}

const DynamicAuthorCover = ({
  full_name,
  dp,
  location,
  content_count,
  created_at,
  username,
}: DynamicAuthorCoverProps) => {
  const theme = useMantineTheme();

  return (
    <Paper>
      <Card px={50}>
        <Center className="h-full">
          <Stack
            style={{
              width: "100%",
            }}
          >
            <Group
              position="apart"
              style={{
                width: "100%",
              }}
              noWrap
            >
              <Stack
                style={{
                  width: "100%",
                }}
                spacing={3}
              >
                <Title
                  className="capitalize"
                  order={1}
                  style={{
                    fontSize: 40,
                  }}
                >
                  {full_name}
                </Title>

                <Group mt="xs">
                  <Text color="gray" weight={400} size="lg" mb="sm" mt="sm">
                    @{username}
                  </Text>
                  <Divider
                    style={{
                      width: 20,
                    }}
                  />
                  <Text
                    style={{
                      textTransform: "capitalize",
                    }}
                    color="dimmed"
                    size="lg"
                  >
                    Afridi.DEV Member
                  </Text>

                  <Divider
                    style={{
                      width: 20,
                    }}
                  />

                  <Group spacing={10}>
                    <ThemeIcon variant="light" radius="xl" size="xl">
                      <Image
                        src={location.split("-")[1]}
                        loader={({ src }) =>
                          `https://purecatamphetamine.github.io/country-flag-icons/3x2/${src}.svg`
                        }
                        priority
                        width={20}
                        height={20}
                        alt=""
                      />
                    </ThemeIcon>

                    <Text
                      style={{
                        textTransform: "capitalize",
                      }}
                      color="dimmed"
                      size="lg"
                    >
                      {location.split("-")[0]}
                    </Text>
                  </Group>
                </Group>
              </Stack>

              <Avatar
                mt="xl"
                style={{
                  borderRadius: "50%",
                }}
                size={400}
              >
                <AfridiImage
                  priority
                  path={dp}
                  width={400}
                  height={400}
                  style={{
                    borderRadius: "50%",
                  }}
                />
              </Avatar>
            </Group>
            <Group
              mt={50}
              spacing={100}
              style={{
                width: "100%",
              }}
            >
              <Group>
                <ThemeIcon
                  size={70}
                  variant="light"
                  color="blue"
                  radius="xl"
                  style={{
                    borderRadius: "50%",
                  }}
                >
                  <IconNews size={30} />
                </ThemeIcon>
                <Text color="dimmed">{content_count} Articles</Text>
              </Group>

              <Group>
                <ThemeIcon
                  color="blue"
                  size={65}
                  variant="light"
                  radius="xl"
                  style={{
                    borderRadius: "50%",
                  }}
                >
                  <IconCalendarStats size={30} />
                </ThemeIcon>

                <Text color="dimmed">
                  Member Since {format(new Date(created_at), "MMMM dd, yyyy")}
                </Text>
              </Group>
              <BrandAvatar brand="small" size="xs" />
            </Group>
          </Stack>
        </Center>
      </Card>
    </Paper>
  );
};

export default DynamicAuthorCover;
