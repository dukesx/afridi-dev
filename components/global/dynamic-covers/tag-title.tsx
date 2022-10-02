import {
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
import { IconBrandGravatar, IconHash } from "@tabler/icons";
import { appCache } from "../../../utils/cache";
import BrandAvatar from "./shared/brand-avatar";
import { sharedStyles } from "./shared/shared-styles";

interface DynamicTagTitleCoverProps {
  title: string;
  color: MantineColor;
  colorScheme: ColorScheme;
}

const DynamicTagTitleCover = ({
  title,
  color,
  colorScheme,
}: DynamicTagTitleCoverProps) => {
  const theme = useMantineTheme();
  const { classes } = sharedStyles();
  return (
    <Paper p="xl">
      <Card pb={200} pt={50}>
        <Stack
          style={{
            width: "100%",
          }}
          align="center"
        >
          <ThemeIcon
            radius="xl"
            className={classes.avatar}
            color={color}
            size={150}
            variant="light"
          >
            <IconHash size={60} />
          </ThemeIcon>
          <Group mt="xl" align="center">
            <Text className={classes.text} ml="auto" weight={400} size={80}>
              [TAG]:
            </Text>
            <Text
              style={{
                textTransform: "capitalize",
              }}
              color={color}
              className={classes.text}
              ml="auto"
              weight={800}
              size={80}
            >
              {title}
            </Text>
            <BrandAvatar theme={colorScheme} brand="small" size="sm" />
          </Group>
          <Text mt={7} className="capitalize" color="dimmed">
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
          </Text>
        </Stack>
      </Card>
    </Paper>
  );
};

export default DynamicTagTitleCover;
