import {
  Button,
  MantineColor,
  MantineSize,
  Stack,
  Text,
  ThemeIcon,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { IconArrowRight } from "@tabler/icons";
import { type ReactNode } from "react";

interface LandingSidebarItemProps {
  text: string;
  leftIcon?: string | ReactNode;
  rightIcon?: string | ReactNode;
  path: string | "/";
  color: MantineColor;
  buttonSize?: MantineSize;
  maxWidth?: number;
  description?: string;
}
const LandingSidebarItem = ({
  text,
  path,
  leftIcon,
  color,
  rightIcon,
  description,
  buttonSize,
  maxWidth,
}: LandingSidebarItemProps) => {
  return (
    <Button
      style={{
        maxWidth: maxWidth ?? "100%",
      }}
      pl={0}
      pr={0}
      className="hover:pl-4 hover:pr-4 transition-all ease-in-out"
      mt="xs"
      size={buttonSize ?? "lg"}
      fullWidth
      component={NextLink}
      href={path}
      leftIcon={leftIcon ?? null}
      variant="subtle"
      color={color ?? "cyan"}
      rightIcon={rightIcon ?? <IconArrowRight size={18} />}
    >
      <Stack spacing={1}>
        <Text size="xs" className="w-[200px] ml-2 text-[13px] capitalize">
          {text}
        </Text>
        <Text weight={400} ml="xs" size="xs" color="dimmed">
          {description}
        </Text>
      </Stack>
    </Button>
  );
};

export default LandingSidebarItem;
