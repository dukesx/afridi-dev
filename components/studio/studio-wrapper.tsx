import {
  Button,
  Center,
  Group,
  Loader,
  LoadingOverlay,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconEdit, IconListDetails } from "@tabler/icons";
import Image from "next/image";
import { Fragment } from "react";
import AppWrapper from "../global/wrapper";
import OopsPlaceholder from "../../public/oops.svg";
import { NextLink } from "@mantine/next";

interface StudioWrapperProps {
  loading: boolean | false;
  children: any;
  path: string;
  subPath: string;
  authored: boolean;
}

const StudioWrapper = ({
  children,
  loading,
  path,
  authored,
  subPath,
}: StudioWrapperProps) => {
  const theme = useMantineTheme();
  const isMobile = useMediaQuery("(max-width: 500px)", true, {
    getInitialValueInEffect: false,
  });
  return (
    <AppWrapper
      studioPath={path}
      studioSubPath={subPath}
      studio
      size="xl"
      noPadding
      activeHeaderKey=""
    >
      {isMobile ? (
        <Stack spacing="xs" align="center" mt="xl">
          <Title weight={800} order={3}>
            Something went wrong
          </Title>
          <Text className="text-center" color="dimmed" size="sm">
            Creator Studio is not available for mobile yet. Please try on a
            Laptop/Desktop Computer
          </Text>
        </Stack>
      ) : authored ? (
        <Fragment>
          <LoadingOverlay
            loader={
              <Stack className="h-[400px]" align="center">
                <ThemeIcon
                  variant="gradient"
                  gradient={{
                    from: "blue.4",
                    to: "cyan.4",
                  }}
                  radius="xl"
                  className="rounded-full"
                  size={150}
                  color="blue"
                >
                  <IconListDetails size={50} />
                </ThemeIcon>
                <Group spacing={0} position="center">
                  <Text className="font-normal text-9xl" weight={700} size="xl">
                    {"{"}
                  </Text>
                  <Text
                    className="align-middle mt-4 mr-2 text-3xl"
                    weight={700}
                    size="xl"
                  >
                    Creator
                  </Text>
                  <Text
                    variant="gradient"
                    gradient={{
                      from: "cyan",
                      to: "blue",
                    }}
                    className="align-middle mt-4 text-3xl"
                    weight={700}
                    size="xl"
                  >
                    Studio
                  </Text>
                  <Text
                    className="font-normal text-9xl "
                    weight={700}
                    size="xl"
                  >
                    {"}"}
                  </Text>
                </Group>
                <Loader variant="bars" color="blue" />
              </Stack>
            }
            overlayOpacity={1}
            visible={loading}
          />
          {children}
        </Fragment>
      ) : (
        <Center className="mt-[5%]">
          <Stack spacing={0}>
            <Title>Hmmmm.... Seems Empty</Title>
            <Text mt={10} size="sm" color="dimmed">
              It seems you haven&apos;t authored any articles at the moment.
            </Text>
            <Image alt="" src={OopsPlaceholder} height={350} width={350} />

            <Button
              component={NextLink}
              href="/creator-studio/publish"
              className="max-w-[300px] mx-auto"
              variant="outline"
              radius="xl"
              color="blue"
              leftIcon={<IconEdit size={20} />}
            >
              Let&apos;s Create
            </Button>
          </Stack>
        </Center>
      )}
    </AppWrapper>
  );
};

export default StudioWrapper;
