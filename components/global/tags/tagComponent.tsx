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
} from "@mantine/core";
import { supabaseClient, type User } from "@supabase/auth-helpers-nextjs";
import {
  IconChevronDown,
  IconEye,
  IconEyeCheck,
  IconEyeOff,
  IconBrandReact,
  IconBrandAngular,
  IconBrandSvelte,
  IconRadar,
  TablerIcon,
  IconHash,
  IconTag,
} from "@tabler/icons";
import { set } from "date-fns/esm";
import Head from "next/head";
import { Fragment, ReactNode, useState } from "react";

interface TagComponentProps {
  authorTags: Array<any>;
  title: string;
  id: string;
  user: User;
  setAuthorFollowed: Function;
  color: DefaultMantineColor;
  IconName?: TablerIcon;
}

const TagComponent = ({
  title,
  authorTags,
  id,
  user,
  setAuthorFollowed,
  color,
  IconName,
}: TagComponentProps) => {
  return (
    <Card
      withBorder
      my="sm"
      radius="lg"
      className={"block aspect-square border-2"}
      sx={(theme) => ({
        borderColor: theme.fn.themeColor(color),
      })}
    >
      <Center className="h-full">
        <Stack align="center">
          <ThemeIcon
            variant={
              title == "kotlin"
                ? "gradient"
                : title == "programming"
                ? "gradient"
                : title == "typescript"
                ? "gradient"
                : title == "ts"
                ? "gradient"
                : "light"
            }
            color={`${color}.4`}
            gradient={
              title == "kotlin"
                ? {
                    from: "grape.5",
                    to: "violet.6",
                  }
                : title == "proramming"
                ? {
                    from: "blue.4",
                    to: "indigo.6",
                  }
                : title == "typescript"
                ? {
                    from: "blue.5",
                    to: "blue.6",
                  }
                : {
                    from: "blue.5",
                    to: "blue.6",
                  }
            }
            radius="xl"
            size={60}
          >
            {IconName ? (
              <IconName strokeWidth={1.3} size={35} className="align-middle" />
            ) : (
              <IconHash />
            )}
          </ThemeIcon>

          <Text className="text-center capitalize" weight={500}>
            {title}
          </Text>

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
                  variant="subtle"
                  leftIcon={<IconEyeCheck size={18} />}
                  rightIcon={<IconChevronDown size={18} />}
                >
                  Following
                </Button>
              ) : (
                <Button
                  onClick={async () => {
                    const { data } = await supabaseClient
                      .from("author_followed_tags")
                      .insert({
                        tag_id: id,
                        author_id: user.id,
                      });

                    if (data) {
                      console.log(authorTags);
                      var newArr = [...authorTags];
                      newArr.push(title);

                      setAuthorFollowed(newArr);
                    }
                  }}
                  radius="xl"
                  variant="subtle"
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
