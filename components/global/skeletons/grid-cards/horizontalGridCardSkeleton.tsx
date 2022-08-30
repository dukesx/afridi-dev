import { Group, Skeleton, Stack } from "@mantine/core";

const HorizontalGridCardSkeleton = () => (
  <Group className="w-full">
    <Skeleton height={100} width={100} />
    <Stack className="flex-1">
      <Skeleton height={15} width={100} className="w-[90%]" />
      <Skeleton height={10} width={100} className="w-[70%]" />
    </Stack>
  </Group>
);

export default HorizontalGridCardSkeleton;
