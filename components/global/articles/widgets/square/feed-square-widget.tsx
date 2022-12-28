import {
  Anchor,
  Paper,
  Stack,
  Text,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { nanoid } from "nanoid";
import { FC } from "react";
import { AfridiArticleFeedSquareWidgetProps } from "../../../../../types/articles/widgets/all";
import AfridiArticleFeedSquareWidgetListItem from "./feed-square-widget-list-item";

const AfridiArticleFeedSquareWidget: FC<AfridiArticleFeedSquareWidgetProps> = ({
  data,
  title,
  color,
  textColor,
}) => {
  const { colorScheme } = useMantineColorScheme();
  const theme = useMantineTheme();

  return (
    <Paper
      radius="sm"
      sx={(theme) => ({
        backgroundColor:
          colorScheme == "dark"
            ? theme.fn.themeColor(color, 6)
            : theme.fn.themeColor(color, 0),
      })}
      p="xl"
    >
      <Text
        sx={{
          textTransform: "capitalize",
        }}
        size={30}
        mt={0}
        weight={800}
        color={textColor}
      >
        {title}
      </Text>
      <Stack mt="xl">
        {data.map((mapped) => (
          <AfridiArticleFeedSquareWidgetListItem
            key={nanoid()}
            title={mapped.title}
            views={mapped.views ?? null}
            textColor={textColor}
          />
        ))}
      </Stack>
    </Paper>
  );
};

export default AfridiArticleFeedSquareWidget;
