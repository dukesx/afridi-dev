import {
  Loader,
  LoadingOverlay,
  type MantineTheme,
  Stack,
  Text,
} from "@mantine/core";

interface AppLoaderProps {
  loading: boolean;
  theme: MantineTheme;
}

const AppLoader = ({ theme, loading }: AppLoaderProps) => {
  return (
    <LoadingOverlay
      className="h-full"
      overlayColor={theme.colors.gray[9]}
      overlayBlur={10}
      loader={
        <Stack
          className="top-[15%] left-[37%] sm:left-[42%] absolute"
          align="center"
        >
          <Loader variant="bars" color="blue" className="" />
          <Text color="white" className="text-center ml-5" weight={700}>
            Redirecting to Initial Setup
          </Text>
        </Stack>
      }
      visible={loading}
    />
  );
};

export default AppLoader;
