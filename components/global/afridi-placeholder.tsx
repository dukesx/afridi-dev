import { Stack, Text, Title, useMantineColorScheme } from "@mantine/core";
import Image from "next/image";
import Empty from "../../public/empty.svg";
import EmptyDark from "../../public/empty-dark.svg";
import UnderConstruction from "../../public/where.svg";
import Question from "../../public/question.svg";
import Hi from "../../public/hi.svg";
import Error from "../../public/error.svg";
import { FC } from "react";
import { AfridiPlaceholderProps } from "../../types/general";
import { Fade } from "react-awesome-reveal";

const AfridiPlaceholder: FC<AfridiPlaceholderProps> = ({
  width,
  height,
  title,
  description,
  mode = "default",
}) => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Fade>
      <Stack spacing={0} p="xl" align="center">
        <Image
          width={width ?? 100}
          height={height ?? 100}
          src={
            mode == "empty"
              ? colorScheme == "dark"
                ? EmptyDark
                : Empty
              : mode == "under-construnction"
              ? UnderConstruction
              : mode == "error"
              ? Error
              : mode == "question"
              ? Question
              : Hi
          }
          alt="No Data"
        />
        <Title weight={700} order={5} mt="xs" mb={3}>
          {title ?? "No Results"}
        </Title>
        <Text size="xs" color="dimmed">
          {description ?? "Couldn't find it. Try again ?"}
        </Text>
      </Stack>
    </Fade>
  );
};

export default AfridiPlaceholder;
