import { createStyles, Group, Skeleton, Stack } from "@mantine/core";

const useStyles = createStyles((theme) => ({
  groupStyles: {
    width: "100%",
  },
  stackStyles: {
    flexGrow: 1,
  },
  descriptionskeleton1: {
    width: "90%",
  },
  descriptionskeleton2: {
    width: "70%",
  },
}));
const HorizontalGridCardSkeleton = () => {
  const { classes } = useStyles();
  return (
    <Group className={classes.groupStyles}>
      <Skeleton height={100} width={100} />
      <Stack className={classes.stackStyles}>
        <Skeleton
          height={15}
          width={100}
          className={classes.descriptionskeleton1}
        />
        <Skeleton
          height={10}
          width={100}
          className={classes.descriptionskeleton2}
        />
      </Stack>
    </Group>
  );
};

export default HorizontalGridCardSkeleton;
