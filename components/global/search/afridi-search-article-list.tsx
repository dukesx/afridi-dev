import {
  Avatar,
  Group,
  Paper,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { Anchor } from "phosphor-react";
import { FC } from "react";
import { Fade } from "react-awesome-reveal";
import { AfridiSearchArticleListItemProps } from "../../../types/general";
import AfridiImage from "../afridi-image";

const AfridiSearchArticleListItem: FC<AfridiSearchArticleListItemProps> = ({
  title,
  description,
  cover,
}) => {
  const { colorScheme } = useMantineColorScheme();
  return (
    // <Fade duration={1000}>
    <Paper
      sx={(theme) => ({
        // borderRadius: `${theme.spacing.xs}px ${theme.spacing.xs}px 0px 0px`,
        borderRadius: `0px`,

        ":first-child": {
          borderRadius: `${theme.spacing.xs}px ${theme.spacing.xs}px 0px 0px`,
        },
        ":last-child": {
          borderRadius: `0px 0px ${theme.spacing.xs}px ${theme.spacing.xs}px`,
        },
        "&:hover": {
          cursor: "pointer",
          backgroundColor:
            colorScheme == "dark" ? theme.colors.gray[9] : theme.colors.gray[0],
        },
      })}
      component="a"
      href="/"
      // radius="xs"
      py="xl"
      px="xl"
    >
      <Fade>
        <Group noWrap>
          <Avatar radius="sm" size={60}>
            <AfridiImage height={100} width={100} path={cover} />
          </Avatar>
          <Stack spacing={3}>
            <Title lineClamp={2} weight={400} order={5}>
              {title}
            </Title>
            <Text lineClamp={2} color="dimmed" size="xs">
              {description}
            </Text>
          </Stack>
        </Group>
      </Fade>
    </Paper>
    // </Fade>
  );
};

export default AfridiSearchArticleListItem;
