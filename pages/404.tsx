import Image from "next/image";
import Light404Image from "../public/404.png";
import Dark404Image from "../public/404-dark.png";
import { Button, Stack, useMantineColorScheme } from "@mantine/core";
import { IconArrowLeft } from "@tabler/icons";
import { useRouter } from "next/router";

const Custom404 = () => {
  const { colorScheme } = useMantineColorScheme();
  const router = useRouter();
  return (
    <Stack align="center">
      <Image
        className="object-fit"
        src={colorScheme == "dark" ? Dark404Image : Light404Image}
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
  );
};

export default Custom404;
