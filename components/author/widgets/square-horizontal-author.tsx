import {
  Avatar,
  Card,
  Divider,
  Group,
  MantineColor,
  MantineTheme,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { ReactNode } from "react";
import EmptyPlaceholder from "../../global/placeholders/empty";
import HorizontalGridCardSkeleton from "../../global/skeletons/grid-cards/horizontalGridCardSkeleton";
import HorizontalAuthorGridCard from "../grid-cards/horizontal-author-card";

interface SquareHorizontalWidgetProps {
  theme: MantineTheme;
  color: MantineColor;
  icon: string | ReactNode;
  title: string;
  cardClassName?: string;
  data: Array<AfridiDevAuthor>;
}

export interface AfridiDevAuthor {
  firstName: string;
  id: string;
  lastName: string;
  dp: string;
  cover?: string;
  location: string;
  content_count?: number;
}

const SquareHorizontalAuthorWidget: React.FC<SquareHorizontalWidgetProps> = ({
  theme,
  color,
  icon,
  title,
  cardClassName,
  data,
}) => {
  const { colorScheme } = useMantineColorScheme();
  return (
    <Card
      className={`border border-solid max-w-[450px] my-1 ` + cardClassName}
      mt={0}
      radius="lg"
      style={{
        borderColor: theme.colors[color][4],
      }}
    >
      <Group position="apart">
        <ThemeIcon variant="light" size={50} radius="xl" color={color}>
          {typeof icon == "string" ? <Text size="xl">{icon}</Text> : icon}
        </ThemeIcon>
        <Title mr="xl" order={3} py="md">
          {title}
        </Title>
      </Group>

      <Divider mt="sm" pb="md" color={color} />

      <Stack
        spacing={data ? (data.length > 0 ? "xl" : 0) : "md"}
        align="center"
        mt="xs"
      >
        {data ? (
          data.length > 0 ? (
            data.map((mapped, index) => (
              <Group
                noWrap
                position="apart"
                className="w-full"
                key={"alox" + index}
              >
                <Text
                  ml="sm"
                  size={32}
                  color={
                    colorScheme == "dark"
                      ? theme.colors.gray[7]
                      : theme.colors.gray[4]
                  }
                  weight={800}
                >
                  {index + 1}
                </Text>
                <Divider className="min-w-[20px]" />
                <HorizontalAuthorGridCard author={mapped} theme={theme} />
              </Group>
            ))
          ) : (
            <EmptyPlaceholder height={250} />
          )
        ) : (
          <Stack className="w-full">
            <HorizontalGridCardSkeleton />
            <HorizontalGridCardSkeleton />
            <HorizontalGridCardSkeleton />
          </Stack>
        )}
      </Stack>
    </Card>
  );
};

export default SquareHorizontalAuthorWidget;
