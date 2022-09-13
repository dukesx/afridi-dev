/* eslint-disable @next/next/no-html-link-for-pages */
import { useState } from "react";
import {
  createStyles,
  Navbar,
  UnstyledButton,
  Tooltip,
  Title,
  Text,
  Group,
  Button,
} from "@mantine/core";
import {
  IconHome2,
  IconGauge,
  IconDeviceDesktopAnalytics,
  IconFingerprint,
  IconCalendarStats,
  IconUser,
  IconSettings,
  IconDashboard,
  IconBrandGoogleAnalytics,
} from "@tabler/icons";
import SidebarItem from "./sidebar-item";
import SidebarSubItem from "./sidebar-sub-item";

const useStyles = createStyles((theme) => ({
  wrapper: {
    display: "flex",
  },

  aside: {
    flex: "0 0 60px",
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    display: "flex",
    flexDirection: "column",
    alignItems: "center",
    borderRight: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  main: {
    flex: 1,
    backgroundColor:
      theme.colorScheme === "dark"
        ? theme.colors.dark[6]
        : theme.colors.gray[0],
  },

  title: {
    boxSizing: "border-box",
    fontFamily: `Greycliff CF, ${theme.fontFamily}`,
    marginBottom: theme.spacing.xl,
    backgroundColor:
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.white,
    padding: theme.spacing.md,
    paddingTop: 18,
    height: 60,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
  },

  logo: {
    boxSizing: "border-box",
    width: "100%",
    display: "flex",
    justifyContent: "center",
    height: 60,
    paddingTop: theme.spacing.md,
    borderBottom: `1px solid ${
      theme.colorScheme === "dark" ? theme.colors.dark[7] : theme.colors.gray[3]
    }`,
    marginBottom: theme.spacing.xl,
  },
}));

interface StudioSidebarProps {
  path: string;
  subPath: string;
}

const StudioSidebar = ({ path, subPath }: StudioSidebarProps) => {
  const { classes, cx } = useStyles();

  const [mainSidebarActiveLink, setMainSidebarActiveLink] = useState(path);
  const [subSidebarActiveLink, setSubSidebarActiveLink] = useState(subPath);

  return (
    <Navbar height={750} width={{ sm: 350 }} hiddenBreakpoint="sm" hidden>
      <Navbar.Section grow className={classes.wrapper}>
        <div className={classes.aside + " pt-5 px-3"}>
          <SidebarItem
            path={path}
            subPath={subPath}
            setActiveKey={setMainSidebarActiveLink}
            activeKey={mainSidebarActiveLink}
            label="home"
            ItemIcon={IconHome2}
          />
        </div>
        <div className={classes.main}>
          <Title order={5} className={classes.title + " capitalize"}>
            {subSidebarActiveLink}
          </Title>

          <SidebarSubItem
            path={path}
            subPath={subPath}
            setActiveKey={setSubSidebarActiveLink}
            activeKey={subSidebarActiveLink}
            label="Analytics"
          />

          <SidebarSubItem
            setActiveKey={setSubSidebarActiveLink}
            activeKey={subSidebarActiveLink}
            label="My Articles"
            path={path}
            subPath={subPath}
          />
        </div>
      </Navbar.Section>
    </Navbar>
  );
};

export default StudioSidebar;
