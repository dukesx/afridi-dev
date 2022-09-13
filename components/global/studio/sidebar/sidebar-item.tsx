import { createStyles, Tooltip, UnstyledButton } from "@mantine/core";
import { NextLink } from "@mantine/next";
import { TablerIcon } from "@tabler/icons";
import { sub } from "date-fns";
import { ReactNode, useState } from "react";

export interface SidebarItemProps {
  label: string;
  ItemIcon?: TablerIcon;
  activeKey: string;
  setActiveKey: Function;
  path?: string;
  subPath?: string;
}
const SidebarItem = ({
  label,
  ItemIcon,
  activeKey,
  setActiveKey,
  path,
  subPath,
}: SidebarItemProps) => {
  const useStyles = createStyles((theme) => ({
    mainLink: {
      width: 44,
      height: 44,
      borderRadius: theme.radius.md,
      display: "flex",
      alignItems: "center",
      justifyContent: "center",
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[0]
          : theme.colors.gray[7],

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.colors.gray[0],
      },
    },

    mainLinkActive: {
      "&, &:hover": {
        backgroundColor: theme.fn.variant({
          variant: "light",
          color: "blue",
        }).background,
        color: theme.fn.variant({ variant: "light", color: "blue" }).color,
      },
    },
  }));
  const { classes, cx } = useStyles();

  return (
    <Tooltip
      label={label}
      position="right"
      withArrow
      transitionDuration={0}
      key={label}
    >
      <UnstyledButton
        component={NextLink}
        href={`/creator-studio/${label === "home" ? "/" : label}`}
        className={cx(classes.mainLink, {
          [classes.mainLinkActive]:
            activeKey.toLowerCase() === label.toLowerCase(),
        })}
      >
        <ItemIcon stroke={1.5} />
      </UnstyledButton>
    </Tooltip>
  );
};

export default SidebarItem;
