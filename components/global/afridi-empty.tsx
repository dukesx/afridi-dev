import { Stack, Text, Title, useMantineColorScheme } from "@mantine/core";
import Image from "next/image";
import Empty from "../../public/empty.svg";
import EmptyDark from "../../public/empty-dark.svg";
import { FC } from "react";
import { AfridiEmptyPlaceholderProps } from "../../types/general";
import { Fade } from "react-awesome-reveal";

const AfridiEmptyPlaceholder: FC<AfridiEmptyPlaceholderProps> = ({
  width,
  height,
  title,
  description,
}) => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Fade>
      <Stack spacing={0} p="xl" align="center">
        <Image
          width={width ?? 100}
          height={height ?? 100}
          src={colorScheme == "dark" ? EmptyDark : Empty}
          alt="No Data"
        />
        <Title weight={600} order={5} mt="xs" mb={3}>
          {title ?? "No Results"}
        </Title>
        <Text size="xs" color="dimmed">
          {description ?? "Couldn't find it. Try again ?"}
        </Text>
      </Stack>
    </Fade>
  );
};

export default AfridiEmptyPlaceholder;
