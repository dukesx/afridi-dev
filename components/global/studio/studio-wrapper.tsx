import {
  Center,
  Group,
  Loader,
  LoadingOverlay,
  Stack,
  Text,
  ThemeIcon,
  useMantineTheme,
} from "@mantine/core";
import { IconListDetails } from "@tabler/icons";
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
  return (
    <AppWrapper
      studioPath={path}
      studioSubPath={subPath}
      studio
      size="xl"
      noPadding
      activeHeaderKey=""
    >
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
              <Text className="font-normal text-9xl " weight={700} size="xl">
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
    </AppWrapper>
  );
};

export default StudioWrapper;
