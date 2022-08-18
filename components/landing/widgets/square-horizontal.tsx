import {
  Card,
  Group,
  Avatar,
  Title,
  Stack,
  Divider,
  type MantineTheme,
  MantineColor,
} from "@mantine/core";
import HorizontalGridCard, {
  CardStyle,
} from "../../global/grid-cards/horizontalGridCard";

interface SquareHorizontalWidgetProps {
  theme: MantineTheme;
  color: MantineColor;
  icon: string;
  title: string;
  cardClassName?: string;
}

const SquareHorizontalWidget: React.FC<SquareHorizontalWidgetProps> = ({
  theme,
  color,
  icon,
  title,
  cardClassName,
}) => {
  return (
    <Card
      className={`border border-solid max-w-[450px] ` + cardClassName}
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

      <Stack mt="xs">
        <HorizontalGridCard style={CardStyle.WIDGET} theme={theme} />
        <HorizontalGridCard style={CardStyle.WIDGET} theme={theme} />
        <HorizontalGridCard style={CardStyle.WIDGET} theme={theme} />
      </Stack>
    </Card>
  );
};

export default SquareHorizontalWidget;
