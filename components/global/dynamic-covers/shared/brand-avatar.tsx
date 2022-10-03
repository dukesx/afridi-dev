import { Avatar, type ColorScheme, Stack, Text } from "@mantine/core";
import { sharedStyles } from "./shared-styles";

interface BrandAvatarProps {
  size?: "xl" | "sm" | "xs";
  brand: "small" | "default";
  theme: ColorScheme;
  bottom?: number;
}

const BrandAvatar: React.FC<BrandAvatarProps> = ({
  size,
  bottom,
  brand,
  theme,
}) => {
  var { classes } = sharedStyles();

  return (
    <Avatar
      styles={{
        root:
          brand == "small"
            ? {
                position: "absolute",
                right: 25,
                bottom: bottom ?? 20,
              }
            : null,
      }}
      color="blue"
      className={classes.avatar}
      size={size == "xl" ? 630 : size == "xs" ? 100 : 150}
    >
      <Stack align="center" spacing={0}>
        <Text
          mt="xs"
          className={classes.text}
          weight={500}
          color={theme == "dark" ? "white" : "dark"}
          size={size == "xl" ? 100 : size == "xs" ? 16 : 27}
        >
          AFRIDI
        </Text>
        <Text
          className={classes.text}
          color="blue.6"
          size={size == "xl" ? 200 : size == "xs" ? 23 : 30}
          weight={800}
        >
          .DEV
        </Text>
        <Text
          mt={8}
          className={classes.text}
          weight={600}
          color="dimmed"
          size={size == "xl" ? 35 : size == "xs" ? 8 : 10}
        >
          THE DEV&apos;s Blog
        </Text>
      </Stack>
    </Avatar>
  );
};

export default BrandAvatar;
