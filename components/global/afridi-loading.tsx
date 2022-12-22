import { Loader, Stack, Text } from "@mantine/core";
import { FC } from "react";
import { Fade } from "react-awesome-reveal";
import { playfair } from "../../pages/_app";
import { AfridiLoadingProps } from "../../types/general";

const AfridiLoading: FC<AfridiLoadingProps> = ({ title, description }) => {
  return (
    <Fade>
      <Stack p="xl" align="center">
        <Loader variant="dots" size="md" color="teal" />
        <Text
          style={{
            fontFamily: playfair.style.fontFamily,
          }}
          size="sm"
          // color="dimmed"
          weight={600}
        >
          {title ?? "Fetching"}
        </Text>
      </Stack>
    </Fade>
  );
};

export default AfridiLoading;
