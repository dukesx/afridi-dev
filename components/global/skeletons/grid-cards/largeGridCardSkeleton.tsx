import { Skeleton, Stack } from "@mantine/core";

const LargeGridCardSkeleton = () => {
  return (
    <Stack>
      <Skeleton height={400} width={400} className="w-full" />
      <Stack>
        <Skeleton height={20} width={100} className="w-[90%]" />
      </Stack>

      <Stack spacing="xs" className="flex-1">
        <Skeleton height={15} width={100} className="w-[90%]" />
        <Skeleton height={10} width={100} className="w-[60%]" />
      </Stack>
    </Stack>
  );
};

export default LargeGridCardSkeleton;
