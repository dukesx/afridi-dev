import { Button, createStyles, UnstyledButton } from "@mantine/core";
import { NextLink } from "@mantine/next";
import Link from "next/link";
import { SidebarItemProps } from "./sidebar-item";

const SidebarSubItem = ({
  ItemIcon,
  activeKey,
  label,
  setActiveKey,
  subPath,
  path,
}: SidebarItemProps) => {
  const useStyles = createStyles((theme) => ({
    link: {
      boxSizing: "border-box",
      display: "block",
      textDecoration: "none",
      borderTopRightRadius: theme.radius.md,
      borderBottomRightRadius: theme.radius.md,
      color:
        theme.colorScheme === "dark"
          ? theme.colors.dark[0]
          : theme.colors.gray[7],
      padding: `0 ${theme.spacing.md}px`,
      fontSize: theme.fontSizes.sm,
      marginRight: theme.spacing.md,
      fontWeight: 500,
      height: 44,
      lineHeight: "44px",

      "&:hover": {
        backgroundColor:
          theme.colorScheme === "dark"
            ? theme.colors.dark[5]
            : theme.colors.gray[1],
        color: theme.colorScheme === "dark" ? theme.white : theme.black,
      },
    },

    linkActive: {
      "&, &:hover": {
        borderLeftColor: theme.fn.variant({
          variant: "filled",
          color: "blue",
        }).background,
        backgroundColor: theme.fn.variant({
          variant: "filled",
          color: "blue",
        }).background,
        color: theme.white,
      },
    },
  }));

  const { classes, cx } = useStyles();
  console.log(activeKey);
  // console.log(label);
  return (
    <UnstyledButton
      component={NextLink}
      href={`/creator-studio${path == "home" ? "" : path}/${
        label.includes(" ")
          ? (label.split(" ")[0] + "-" + label.split(" ")[1]).toLowerCase()
          : label.toLowerCase() == "analytics"
          ? ""
          : label.toLowerCase()
      }`}
      className={cx(classes.link + " w-full max-w-[90%]", {
        [classes.linkActive]: activeKey.toLowerCase() === label.toLowerCase(),
      })}
    >
      {label}
    </UnstyledButton>
  );
};

export default SidebarSubItem;
