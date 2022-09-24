import { createStyles, Stack } from "@mantine/core";
import HorizontalGridCardSkeleton from "./grid-cards/horizontalGridCardSkeleton";

const useStyles = createStyles((theme) => ({
  stackStyles: {
    width: "100%",
    height: "100%",
  },
}));

const FeedLoader = () => {
  const { classes } = useStyles();
  return (
    <Stack className={classes.stackStyles}>
      <HorizontalGridCardSkeleton />
      <HorizontalGridCardSkeleton />
      <HorizontalGridCardSkeleton />
    </Stack>
  );
};

export default FeedLoader;
