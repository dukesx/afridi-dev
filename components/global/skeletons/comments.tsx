import { Avatar, Group, Skeleton, Stack } from "@mantine/core";

const CommentsSkeleton = () => {
  return (
    <Stack>
      <Group noWrap>
        <Avatar radius="xl" size={40}>
          <Skeleton radius="xl" />
        </Avatar>
        <Stack mt="xs">
          <Skeleton height={13} className="w-[300px]" />
          <Skeleton height={10} className="w-[150px]" />
        </Stack>
      </Group>

      <Skeleton mt="xl" height={10} className="w-full" />
      <Skeleton height={10} className="w-[90%]" />
      <Skeleton height={10} className="w-[70%]" />
    </Stack>
  );
};

export default CommentsSkeleton;
