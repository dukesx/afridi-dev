import {
  Anchor,
  Avatar,
  Group,
  Paper,
  Stack,
  Text,
  Title,
} from "@mantine/core";
import { FC } from "react";
import { AfridiHorizontalArticleListItemProps } from "../../../../types/articles/list-item/all";

const AfridiHorizontalArticleListItem: FC<
  AfridiHorizontalArticleListItemProps
> = ({ cover, description, title, tag, index }) => {
  return (
    <Group noWrap>
      <Text mb={50} color="dark" size={30} weight={700}>
        {index + 1}
      </Text>
      <Stack spacing={3}>
        <Anchor color="dark">
          <Title lineClamp={3} weight={700} color="dark" order={5}>
            {title}
          </Title>
        </Anchor>
        <Text mt={5} lineClamp={2} color="dark" size="xs">
          {description}
        </Text>
      </Stack>
    </Group>
  );
};

export default AfridiHorizontalArticleListItem;
