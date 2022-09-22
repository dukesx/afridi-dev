import { Divider, Group, MantineTheme, Text } from "@mantine/core";
import HorizontalArticleGridCard, {
  CardStyle,
} from "../grid-cards/horizontal-article-card";
import { AfridiDevArticle } from "../grid-cards/large-article-card";

interface NumberedArticlesWidgetProps {
  article: AfridiDevArticle;
  index: number;
  theme: MantineTheme;
}

const NumberedArticlesWidget = ({
  article,
  index,
  theme,
}: NumberedArticlesWidgetProps) => {
  return (
    <Group key={"abox" + index} mx="sm" noWrap>
      <Text size="xl" weight={800} color="gray.4">
        {index + 1}
      </Text>
      <Divider className="min-w-[20px]" />
      <HorizontalArticleGridCard
        notLocal
        data={article}
        titleClamp={2}
        theme={theme}
        style={CardStyle.WIDGET}
      />
    </Group>
  );
};

export default NumberedArticlesWidget;
