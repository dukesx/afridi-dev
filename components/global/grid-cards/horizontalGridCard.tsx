import { Group, type MantineTheme, Stack, Text } from "@mantine/core";
import { IKImage } from "imagekitio-react";

interface HorizontalGridCardProps {
  theme: MantineTheme;
}
const HorizontalGridCard: React.FC<HorizontalGridCardProps> = ({ theme }) => {
  return (
    <Group noWrap direction="row" className="w-full">
      <IKImage
        path="/7011585.jpeg"
        transformation={[
          {
            height: "100px",
            width: "100px",
          },
        ]}
        lqip={{ active: true, quality: 30, blur: 20 }}
        height={90}
        style={{
          borderRadius: theme.radius.lg,
        }}
      />
      <Stack spacing="xs" className="max-w-[290px]">
        <Text lineClamp={3} size="xs">
          The Truth About the Wage Gap from Someone Who Saw Everyone’s Salary
        </Text>
        <Text lineClamp={2} color="dimmed" size="xs">
          Being a data educator at the intersection of analytical and creative
          thinking
        </Text>
      </Stack>
    </Group>
  );
};

export default HorizontalGridCard;
