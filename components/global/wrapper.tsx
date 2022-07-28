import {
  Container,
  useMantineTheme,
  type MantineNumberSize,
} from "@mantine/core";
import { Fragment } from "react";
import GlobalHeader from "./header";
interface AppWrapperProps {
  children: any;
  size?: MantineNumberSize;
  activeHeaderKey: string;
}

const AppWrapper: React.FC<AppWrapperProps> = ({
  children,
  size,
  activeHeaderKey,
}) => {
  const theme = useMantineTheme();
  return (
    <Fragment>
      <GlobalHeader theme={theme} activeHeaderKey={activeHeaderKey} />
      <Container size={size ?? "xl"}>{children}</Container>
    </Fragment>
  );
};

export default AppWrapper;
