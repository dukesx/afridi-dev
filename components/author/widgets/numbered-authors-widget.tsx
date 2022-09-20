import { Card, Divider, Group, MantineTheme, Text } from "@mantine/core";
import { CardStyle } from "../../article/grid-cards/horizontal-article-card";
import EmptyPlaceholder from "../../global/placeholders/empty";
import { AfridiDevAuthor } from "../../landing/widgets/authors/square-horizontal-author";
import HorizontalAuthorGridCard from "../grid-cards/horizontal-author-card";

interface NumberedAuthorsWidgetProps {
  author: AfridiDevAuthor;
  index: number;
  theme: MantineTheme;
  withBorder?: boolean;
  title?: string;
}

const NumberedAuthorsWidget = ({
  author,
  index,
  withBorder,
  title,
  theme,
}: NumberedAuthorsWidgetProps) => {
  return author ? (
    <Group key={"abox" + index} mx="sm" noWrap>
      <Text size="xl" weight={800} color="gray.4">
        {index + 1}
      </Text>
      <Divider className="min-w-[20px]" />
      <HorizontalAuthorGridCard author={author} theme={theme} />
    </Group>
  ) : (
    <EmptyPlaceholder />
  );
};

export default NumberedAuthorsWidget;
