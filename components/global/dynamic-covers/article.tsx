/* eslint-disable @next/next/no-img-element */
import {
  Avatar,
  Card,
  Center,
  ColorScheme,
  Group,
  MantineColor,
  MantineProvider,
  Paper,
  Stack,
  Text,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconBrandGravatar, IconEye, IconHash } from "@tabler/icons";
import { appCache } from "../../../utils/cache";
import AfridiImage from "../afridi-image";
import BrandAvatar from "./shared/brand-avatar";
import { sharedStyles } from "./shared/shared-styles";

interface DynamicArticleCoverProps {
  title: string;
  colorScheme: ColorScheme;
  description: string;
  tags: Array<any>;
  author: {
    full_name: string;
    cover: string;
    username: string;
  };
  views: number;
  cover: string;
}

const DynamicArticleCover = ({
  title,
  description,
  colorScheme,
  tags,
  author,
  cover,
  views,
}: DynamicArticleCoverProps) => {
  const theme = useMantineTheme();
  const { classes } = sharedStyles();
  return (
    <Paper radius={0} px={0}>
      <Card
        px={0}
        radius={0}
        style={{
          height: 600,
          width: 1200,
          background: "transparent",
          backdropFilter: "blur(20px)",
        }}
      >
        <Group mt={30} position="apart" mx={10} noWrap>
          <Stack
            style={{
              maxWidth: 850,
            }}
            my="auto"
            align="center"
          >
            <Text
              style={{
                textTransform: "capitalize",
                lineHeight: 1.3,
                maxWidth: 620,
              }}
              color="blue"
              ml={50}
              weight={800}
              size={40}
              lineClamp={3}
            >
              {title}
            </Text>
            <BrandAvatar theme={colorScheme} brand="small" size="xs" />

            <Text
              style={{
                maxWidth: 620,
              }}
              color="dimmed"
              mr="auto"
              ml={50}
              mt={20}
              lineClamp={2}
            >
              {description}
            </Text>
          </Stack>
          <ThemeIcon
            className={classes.avatar}
            size={400}
            mr={50}
            variant="light"
            style={{
              position: "relative",
            }}
          >
            <AfridiImage
              fillImage
              priority
              path={cover}
              style={{
                borderRadius: "50%",
              }}
            />
          </ThemeIcon>
        </Group>

        <Group mt={-60} ml={60}>
          <Text color="dimmed" size="md">
            By
          </Text>
          <Avatar
            size={50}
            style={{
              borderRadius: "50%",
            }}
          >
            <AfridiImage fillImage priority path={author.cover} />
          </Avatar>
          <Stack spacing={3}>
            <Text
              style={{
                textTransform: "capitalize",
              }}
              color="dimmed"
              size="sm"
            >
              {author.full_name}
            </Text>
            <Text color="dimmed" size="xs">
              @{author.username}
            </Text>
          </Stack>
        </Group>
        <Group
          position="apart"
          style={{
            position: "absolute",
            bottom: 50,
            left: 20,
          }}
        >
          <Group ml={40}>
            {tags.map((mapped) => (
              <Text
                style={{
                  textTransform: "capitalize",
                }}
                key={mapped.title}
                weight={500}
                size="sm"
                color={mapped.color}
              >
                #{mapped.title}
              </Text>
            ))}
          </Group>
          <Group ml={50}>
            <ThemeIcon size="lg" color="cyan" variant="light" radius="xl">
              <IconEye size={19} />
            </ThemeIcon>

            <Text size="sm" color="dimmed">
              <b>
                {Intl.NumberFormat("en", {
                  notation: "compact",
                }).format(views)}
              </b>{" "}
              Views
            </Text>
          </Group>
        </Group>

        {/* <Text mt={7} className="capitalize" color="dimmed">
            Interested ? Follow{" "}
            <b
              style={{
                textTransform: "capitalize",
                textDecoration: "underline",
                textDecorationStyle: "solid",
                textDecorationColor: theme.fn.themeColor(color, 4),
                textDecorationThickness: 3,
              }}
            >
              {title}
            </b>{" "}
            to receive more updates in your feed!
          </Text> */}
      </Card>
    </Paper>
  );
};

export default DynamicArticleCover;
