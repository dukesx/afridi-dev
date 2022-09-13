import {
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
import { IconListDetails } from "@tabler/icons";
import { Fragment } from "react";
import AppWrapper from "../wrapper";

interface StudioWrapperProps {
  loading: boolean | false;
  children: any;
  path: string;
  subPath: string;
}

const StudioWrapper = ({
  children,
  loading,
  path,
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
      ) : (
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
      )}
    </AppWrapper>
  );
};

export default StudioWrapper;
