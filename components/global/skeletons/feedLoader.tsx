import { Stack } from "@mantine/core";
import HorizontalGridCardSkeleton from "./grid-cards/horizontalGridCardSkeleton";

const FeedLoader = () => {
  return (
    <Stack className="w-full h-full">
      <HorizontalGridCardSkeleton />
      <HorizontalGridCardSkeleton />
      <HorizontalGridCardSkeleton />
    </Stack>
  );
};

export default FeedLoader;
