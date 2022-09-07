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
  ActionIcon,
  Tooltip,
  Indicator,
  useMantineColorScheme,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { type User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { IconEye, TablerIcon, IconHash, IconBellRinging } from "@tabler/icons";
import Image from "next/image";
import Link from "next/link";

interface TagComponentProps {
  title: string;
  id: string;
  user: User;
  color: DefaultMantineColor;
  IconName?: TablerIcon;
  count: number;
  icon: string;
  authorFollowed: Array<any>;
}

const TagComponent = ({
  title,
  count,
  color,
  icon,
  IconName,
  authorFollowed,
}: TagComponentProps) => {
  const { colorScheme } = useMantineColorScheme();
  console.log(authorFollowed);
  return (
    <Indicator
      disabled={authorFollowed.filter((mapped) => mapped == title).length == 0}
      size={35}
      withBorder
      color={colorScheme == "dark" ? "dark.6" : "gray.1"}
      label={
        <ThemeIcon size="md" radius="xl" color="blue" variant="filled">
          <IconBellRinging size={16} />
        </ThemeIcon>
      }
    >
      <Card
        component={NextLink}
        href={`/tags/${title}`}
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
                <IconName
                  strokeWidth={1.3}
                  size={35}
                  className="align-middle"
                />
              ) : (
                <IconHash />
              )}
            </Avatar>

            <Text className="text-center">{title}</Text>
            <Text size="xs" className="" weight={400}>
              <b>{count}</b> {count > 1 ? "Articles" : "Article"}
            </Text>
          </Stack>
        </Center>
      </Card>
    </Indicator>
  );
};

export default TagComponent;
