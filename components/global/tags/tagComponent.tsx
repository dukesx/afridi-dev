import {
  Card,
  Center,
  Group,
  ThemeIcon,
  Stack,
  Text,
  Menu,
  Button,
  DefaultMantineColor,
  useMantineTheme,
  Avatar,
} from "@mantine/core";
import { closeAllModals, openModal } from "@mantine/modals";
import { NextLink } from "@mantine/next";
import { type User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import {
  IconChevronDown,
  IconEye,
  IconEyeCheck,
  IconEyeOff,
  TablerIcon,
  IconHash,
} from "@tabler/icons";
import Image from "next/image";
import Unauthorized from "../../../public/401.svg";

interface TagComponentProps {
  authorTags: Array<any>;
  title: string;
  id: string;
  user: User;
  setAuthorFollowed: Function;
  color: DefaultMantineColor;
  IconName?: TablerIcon;
  count: number;
  icon: string;
}

const TagComponent = ({
  title,
  authorTags,
  id,
  user,
  setAuthorFollowed,
  count,
  color,
  icon,
  IconName,
}: TagComponentProps) => {
  const theme = useMantineTheme();
  const { isLoading, session, error, supabaseClient } = useSessionContext();

  return (
    <Card
      // component={NextLink}
      // href={`/tags/${title}`}
      withBorder
      my="sm"
      radius="lg"
      className={"block aspect-square border-2"}
      sx={(theme) => ({
        borderColor: theme.fn.themeColor(color),
        fontWeight: 500,
        textTransform: "capitalize",

        "&:hover": {
          background: theme.fn.themeColor(color),
          color: theme.white,
          fontWeight: 700,
          ".iconer": {
            color: `${theme.colors.gray[2]} !important`,
          },
        },
      })}
    >
      <Center className="h-full">
        <Stack align="center">
          <Avatar
            className="rounded-full"
            variant="light"
            color={`${color}.4`}
            radius="xl"
            size={70}
          >
            {icon ? (
              <Image
                className="object-cover rounded-lg"
                height={35}
                width={35}
                alt=""
                src={icon}
                loader={({ src, width, quality }) => {
                  return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${src}/${src}-original.svg`;
                }}
              />
            ) : IconName ? (
              <IconName strokeWidth={1.3} size={35} className="align-middle" />
            ) : (
              <IconHash />
            )}
          </Avatar>

          <Text className="text-center">{title}</Text>
          <Text size="xs" className="" weight={400}>
            <b>{count}</b> {count > 1 ? "Articles" : "Article"}
          </Text>
          {/**
           *
           *
           * Until Supabase V2 Upgrade
           *
           */}
          <Menu
            styles={{
              dropdown: {
                width: 220,
              },
            }}
            position="bottom"
          >
            <Menu.Target>
              {authorTags.includes(title) ? (
                <Button
                  radius="xl"
                  variant="white"
                  color="blue"
                  leftIcon={<IconEyeCheck size={18} />}
                  rightIcon={<IconChevronDown size={18} />}
                >
                  Following
                </Button>
              ) : (
                <Button
                  onClick={async () => {
                    if (user) {
                      const { data } = await supabaseClient
                        .from("author_followed_tags")
                        .insert({
                          tag_id: id,
                          author_id: user.id,
                        });

                      if (data) {
                        var newArr = [...authorTags];
                        newArr.push(title);

                        setAuthorFollowed(newArr);
                      }
                    } else {
                      openModal({
                        title: "Unauthorised",
                        children: (
                          <Stack spacing={4} align="center">
                            <Image
                              src={Unauthorized}
                              height={200}
                              width={200}
                              alt=""
                            />
                            <Text weight={600}>Ooops - Can&apos;t do it</Text>
                            <Text size="sm" color="dimmed">
                              You need to be signed in to follow tags
                            </Text>
                            <Button
                              mt="xs"
                              color="blue"
                              fullWidth
                              component={NextLink}
                              onClick={() => {
                                closeAllModals();
                              }}
                              href="/get-started"
                            >
                              Sign in
                            </Button>
                          </Stack>
                        ),
                      });
                    }
                  }}
                  radius="xl"
                  variant="white"
                  color="blue"
                  leftIcon={<IconEye size={18} />}
                >
                  Follow
                </Button>
              )}
            </Menu.Target>
            {authorTags.includes(title) ? (
              <Menu.Dropdown>
                <Menu.Item
                  icon={
                    <ThemeIcon size="sm" variant="light" color="red">
                      <IconEyeOff size={16} />
                    </ThemeIcon>
                  }
                  color="red"
                  onClick={async () => {
                    const { data, error } = await supabaseClient
                      .from("author_followed_tags")
                      .delete()
                      .eq("tag_id", id);

                    if (!error) {
                      const index = authorTags.indexOf(title);

                      const newArr = [...authorTags];
                      newArr.splice(index, 1);
                      setAuthorFollowed(newArr);
                    }
                  }}
                >
                  Unfollow tag
                </Menu.Item>
              </Menu.Dropdown>
            ) : null}
          </Menu>
        </Stack>
      </Center>
    </Card>
  );
};

export default TagComponent;
