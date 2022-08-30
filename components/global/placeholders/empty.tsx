import { Stack, Text } from "@mantine/core";
import Image from "next/image";
import { Fragment } from "react";
import EmptyImagePlaceholder from "../../../public/empty.svg";

interface EmptyPlaceholderProps {
  title?: string;
  description?: string;
  height?: number;
}

const EmptyPlaceholder = ({
  title,
  description,
  height,
}: EmptyPlaceholderProps) => (
  <Stack align="center" spacing={0} className="w-full">
    <Image
      src={EmptyImagePlaceholder}
      alt="no data"
      height={height ? height : 300}
      width={400}
    />
    <Text size="md" weight={700}>
      {title ? title : "Oops... No Data Found"}
    </Text>
    <Text mt="xs" size="sm" color="dimmed">
      {description ? description : "Will be available soon 🤗😇"}
    </Text>
  </Stack>
);

export default EmptyPlaceholder;
