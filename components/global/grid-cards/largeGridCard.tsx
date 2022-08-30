import {
  Card,
  Stack,
  Title,
  Text,
  type MantineTheme,
  createStyles,
  Skeleton,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { NextLink } from "@mantine/next";
import { IKImage } from "imagekitio-react";
import { AfridiDevAuthor } from "../../article/sidebar";
import AfridiImage, { AfridiImageLoadingEnum } from "../afridi-image";
import LargeGridCardSkeleton from "../skeletons/grid-cards/largeGridCardSkeleton";

export type AfridiDevArticle = {
  id: string;
  title: string;
  description: string;
  cover: string;
  created_at?: string;
  authors: AfridiDevAuthor;
  co_authors_articles: [
    {
      authors: AfridiDevAuthor;
    }
  ];
};
interface LargeGridCardProps {
  theme: MantineTheme;
  className?: string;
  data: AfridiDevArticle;
}

const LargeGridCard: React.FC<LargeGridCardProps> = ({
  theme,
  className,
  data,
}) => {
  return data ? (
    <Card radius="md" className={className ?? ""}>
      <Card.Section className="backdrop-blur-sm bg-black rounded-lg">
        <AfridiImage
          fillImage={false}
          height={400}
          width={"100%"}
          path={data.cover ?? ""}
          loading={AfridiImageLoadingEnum.LAZY}
        />
      </Card.Section>
      <Stack mt="sm" spacing="xs">
        <Text
          weight={700}
          size="xl"
          component={NextLink}
          href={`/article/${data.id}`}
        >
          {data.title}
        </Text>
        <Text lineClamp={2} color="dimmed" size="sm">
          {data.description}
        </Text>
      </Stack>
    </Card>
  ) : (
    <LargeGridCardSkeleton />
  );
};

export default LargeGridCard;
