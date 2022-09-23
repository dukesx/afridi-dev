import {
  Card,
  Divider,
  Group,
  MantineColor,
  MantineSize,
  MantineTheme,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { ReactNode } from "react";
import EmptyPlaceholder from "../../global/placeholders/empty";
import HorizontalArticleGridCard, {
  CardStyle,
} from "../grid-cards/horizontal-article-card";
import { AfridiDevArticle } from "../grid-cards/large-article-card";

interface NumberedArticlesWidgetProps {
  articles: Array<AfridiDevArticle>;
  theme: MantineTheme;
  placeholderHeight?: number;
  placeholderTitle?: string;
  placeholderDescription?: string;
  color: MantineColor;
  title: string;
  icon: string | ReactNode;
  titleOrder?: 1 | 2 | 3 | 4 | 5 | 6;
  withBorder?: boolean;
}

const NumberedArticlesWidget = ({
  articles,
  theme,
  placeholderDescription,
  placeholderHeight,
  placeholderTitle,
  color,
  title,
  titleOrder,
  withBorder,
  icon,
}: NumberedArticlesWidgetProps) => {
  return (
    <Card
      px="xs"
      radius="lg"
      withBorder={withBorder}
      sx={(theme) => ({
        borderColor: theme.fn.themeColor(color),
      })}
    >
      <Group px="sm" position="apart">
        <Title order={titleOrder ?? 3}>{title}</Title>
        <ThemeIcon size={50} variant="light" radius="xl" color={color}>
          {icon}
        </ThemeIcon>
      </Group>
      <Divider mt="sm" pb="md" color={color} />
      {articles && articles.length > 0 ? (
        <Stack>
          {articles.map((mapped, index) => (
            <Group key={"abox" + index} mx="sm" noWrap>
              <Text size="xl" weight={800} color="gray.4">
                {index + 1}
              </Text>
              <Divider className="min-w-[20px]" />
              <HorizontalArticleGridCard
                data={mapped}
                titleClamp={2}
                theme={theme}
                style={CardStyle.WIDGET}
              />
            </Group>
          ))}
        </Stack>
      ) : (
        <EmptyPlaceholder
          title={placeholderTitle ?? null}
          description={placeholderDescription ?? null}
          height={placeholderHeight ?? null}
        />
      )}
    </Card>
  );
};

export default NumberedArticlesWidget;
