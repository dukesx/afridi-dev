import {
  Card,
  Stack,
  Title,
  Text,
  type MantineTheme,
  createStyles,
} from "@mantine/core";
import { IKImage } from "imagekitio-react";

interface LargeGridCardProps {
  theme: MantineTheme;
  className?: string;
}

const LargeGridCard: React.FC<LargeGridCardProps> = ({ theme, className }) => {
  return (
    <Card radius="lg" className={className ?? ""}>
      <Card.Section className="backdrop-blur-sm bg-black">
        <IKImage
          height={500}
          width={500}
          path="/7011585.jpeg"
          loading={"lazy"}
          transformation={[
            {
              height: "500px",
              width: "500px",
            },
          ]}
          lqip={{ active: true, quality: 30, blur: 20 }}
          style={{
            borderRadius: `${theme.radius.lg + "px"} ${
              theme.radius.lg + "px"
            } ${theme.colorScheme == "dark" ? "0px" : theme.radius.lg + "px"} ${
              theme.colorScheme == "dark" ? "0px" : theme.radius.lg + "px"
            }`,
            width: "400px",
            height: "400px",
          }}
        />
      </Card.Section>
      <Stack mt="sm" spacing="xs">
        <Title order={4}>
          The Truth About the Wage Gap from Someone Who Saw Everyone’s Salary
        </Title>
        <Text lineClamp={2} color="dimmed" size="sm">
          Being a data educator at the intersection of analytical and creative
          thinking
        </Text>
      </Stack>
    </Card>
  );
};

export default LargeGridCard;
