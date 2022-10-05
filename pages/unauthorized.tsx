import { Stack, Text } from "@mantine/core";
import Image from "next/image";
import AppWrapper from "../components/global/wrapper";
import Unauthorized from "../public/401.svg";

const UnAuthorized = () => {
  return (
    <AppWrapper size="md" activeHeaderKey="">
      <Stack align="center" spacing={0}>
        <Image width={500} height={500} alt="" src={Unauthorized} />
        <Text color="" weight={700} size="xl">
          Unauthorized Access !
        </Text>
        <Text color="dimmed" weight={400} size="sm">
          You donot have sufficient permissions.
        </Text>
      </Stack>
    </AppWrapper>
  );
};

export default UnAuthorized;
