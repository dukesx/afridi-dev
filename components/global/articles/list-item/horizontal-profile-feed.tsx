import {
  ActionIcon,
  Divider,
  Group,
  Menu,
  Stack,
  Text,
  Anchor,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { format } from "date-fns";
import Link from "next/link";
import {
  BookmarkSimple,
  ChatCircle,
  DotsThreeOutline,
  ShareNetwork,
} from "phosphor-react";
import { FC } from "react";
import { HorizontalProfileFeedArticleListItemProps } from "../../../../types/articles/list-item/all";

const HorizontalProfileFeedArticleListItem: FC<
  HorizontalProfileFeedArticleListItemProps
> = ({ title, description, bookmarked, permalink }) => {
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();
  return (
    <Stack spacing={8}>
      <Group position="apart" noWrap>
        <Stack
          sx={(theme) => ({
            [theme.fn.smallerThan(400)]: {
              paddingRight: "0px",
            },
          })}
          pr="lg"
          spacing={0}
        >
          <Anchor
            component={Link}
            href={permalink}
            color={colorScheme == "dark" ? "gray.3" : "dark"}
            variant="link"
            sx={(theme) => ({
              [theme.fn.smallerThan("xs")]: {
                fontSize: theme.fontSizes.sm,
              },
            })}
            weight={700}
            lineClamp={2}
            size="lg"
          >
            {title}
          </Anchor>

          <Text
            sx={(theme) => ({
              [theme.fn.smallerThan("xs")]: {
                display: "none",
              },
            })}
            lineClamp={2}
            size="sm"
            color="dimmed"
            my="sm"
          >
            {description}
          </Text>
        </Stack>

        <Group noWrap spacing={8}>
          <Tooltip label="Share article" withArrow>
            <ActionIcon size="lg" color={"teal"} radius="xl" variant="light">
              <ShareNetwork weight="duotone" size={19} />
            </ActionIcon>
          </Tooltip>

          <Menu withArrow position="top" width={270}>
            <Menu.Target>
              <Tooltip label="More" withArrow>
                <ActionIcon size="md" radius="xl" variant="subtle">
                  <DotsThreeOutline
                    strokeWidth={4}
                    weight="fill"
                    color={
                      colorScheme == "dark"
                        ? theme.colors.gray[5]
                        : theme.colors.dark[3]
                    }
                    size={20}
                  />
                </ActionIcon>
              </Tooltip>
            </Menu.Target>

            <Menu.Dropdown className="shadow-md">
              <Menu.Item>
                <Text>Edit composition</Text>
              </Menu.Item>
              <Menu.Item color="red">Delete composition</Menu.Item>
            </Menu.Dropdown>
          </Menu>
        </Group>
      </Group>
      <Group mt={-5} position="apart">
        <Group spacing={8}>
          <Tooltip label="Comment" withArrow>
            <ActionIcon size="md" radius="xl" variant="subtle">
              <ChatCircle weight="regular" size={20} />
            </ActionIcon>
          </Tooltip>
          <Divider
            sx={{
              width: 15,
            }}
          />
          <Tooltip label="Read later" withArrow>
            <ActionIcon
              size="md"
              radius="xl"
              variant={bookmarked ? "transparent" : "subtle"}
            >
              <BookmarkSimple
                weight={bookmarked ? "fill" : "regular"}
                size={20}
              />
            </ActionIcon>
          </Tooltip>

          <Divider
            sx={{
              width: 15,
            }}
          />

          <Text
            sx={(theme) => ({
              [theme.fn.smallerThan("xs")]: {
                fontSize: theme.fontSizes.xs,
              },
            })}
            size="sm"
            color="dimmed"
          >
            {format(Date.now(), "MMMM qo, yyyy")}
          </Text>
        </Group>
      </Group>
    </Stack>
  );
};

export default HorizontalProfileFeedArticleListItem;
