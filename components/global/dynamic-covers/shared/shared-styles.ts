import { createStyles } from "@mantine/core";

export const sharedStyles = createStyles((theme) => ({
  root: {
    // paddingBottom: theme.spacing.xl,
  },
  group: {
    width: "100%",
  },
  stack: {
    width: "100%",
  },
  center: {
    height: "100%",
    justifyContent: "left !important",
  },
  avatar: {
    borderRadius: "50%",
  },
  text: {
    lineHeight: "1 !important",
    margin: "auto",
    //   maxWidth: 80,
    //   textAlign: "center",
  },
}));
