import {
  Card,
  Group,
  Avatar,
  Title,
  Stack,
  Divider,
  type MantineTheme,
  MantineColor,
  Text,
} from "@mantine/core";
import { Fragment, ReactNode } from "react";
import HorizontalGridCard, {
  CardStyle,
} from "../../global/grid-cards/horizontalGridCard";
import { AfridiDevArticle } from "../../global/grid-cards/largeGridCard";
import HorizontalGridCardSkeleton from "../../global/skeletons/grid-cards/horizontalGridCardSkeleton";
import EmptyImagePlaceholder from "../../../public/empty.svg";
import Image from "next/image";
import EmptyPlaceholder from "../../global/placeholders/empty";

interface SquareHorizontalWidgetProps {
  theme: MantineTheme;
  color: MantineColor;
  icon: string | ReactNode;
  title: string;
  cardClassName?: string;
  data: Array<AfridiDevArticle>;
}

const SquareHorizontalWidget: React.FC<SquareHorizontalWidgetProps> = ({
  theme,
  color,
  icon,
  title,
  cardClassName,
  data,
}) => {
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
        <Avatar size={50} radius="xl" color={color}>
          {icon}
        </Avatar>
        <Title mr="xl" order={3} py="md">
          {title}
        </Title>
      </Group>

      <Divider mt="sm" pb="md" color={color} />

      <Stack
        spacing={data ? (data.length > 0 ? "md" : 0) : "md"}
        align="center"
        mt="xs"
      >
        {data ? (
          data.length > 0 ? (
            data.map((mapped, index) => (
              <HorizontalGridCard
                key={"alobb" + index}
                data={mapped}
                style={CardStyle.WIDGET}
                theme={theme}
              />
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

export default SquareHorizontalWidget;
