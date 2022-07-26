import Image from "next/image";
import Light500Image from "../public/500.png";
import Dark500Image from "../public/500-dark.png";
import { Button, Stack, useMantineColorScheme } from "@mantine/core";
import { useRouter } from "next/router";
import { IconArrowLeft } from "@tabler/icons";
import AppWrapper from "../components/global/wrapper";
import { NextSeo } from "next-seo";

const Custom500 = () => {
  const { colorScheme } = useMantineColorScheme();
  const router = useRouter();
  return (
    <AppWrapper activeHeaderKey="">
      <NextSeo nofollow noindex />

      <Stack align="center">
        <Image
          src={colorScheme == "dark" ? Dark500Image : Light500Image}
          alt=""
          height={400}
          width={600}
        />
        <Button
          color="blue.4"
          className="max-w-[250px] w-full  text-center"
          leftIcon={<IconArrowLeft size={18} />}
          onClick={() => router.back()}
          radius="xl"
        >
          Go Back
        </Button>
      </Stack>
    </AppWrapper>
  );
};

export default Custom500;
