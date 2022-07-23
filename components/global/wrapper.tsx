import { Container, type MantineNumberSize } from "@mantine/core";

interface AppWrapperProps {
  children: any;
  size?: MantineNumberSize;
}

const AppWrapper: React.FC<AppWrapperProps> = ({ children, size }) => {
  return <Container size={size ?? "xl"}>{children}</Container>;
};

export default AppWrapper;
