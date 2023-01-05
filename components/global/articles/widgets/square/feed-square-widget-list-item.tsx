import {
  Anchor,
  Divider,
  Group,
  Stack,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { FC } from "react";
import { AfridiArticleFeedSquareWidgetListItemProps } from "../../../../../types/articles/widgets/all";

const AfridiArticleFeedSquareWidgetListItem: FC<
  AfridiArticleFeedSquareWidgetListItemProps
> = ({ title, views, textColor }) => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Group noWrap>
      <Group
        sx={{
          minWidth: 300,
          maxWidth: 300,
        }}
        noWrap
      >
        <Anchor color={textColor} size="md">
          <Text size="md" color={textColor} weight={500} lineClamp={2}>
            {title}
          </Text>
        </Anchor>
        <Divider color="dark" size={2} orientation="vertical" />
      </Group>
      <Group position="center" my={4}>
        {views && (
          <Text align="center" weight={400} color={textColor} size="sm">
            <Text size="lg" weight={800}>
              {Intl.NumberFormat("en-US", {
                notation: "compact",
              }).format(views)}
            </Text>
            Views
          </Text>
        )}
      </Group>
    </Group>
  );
};

export default AfridiArticleFeedSquareWidgetListItem;
