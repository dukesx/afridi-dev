import { Group, type MantineTheme, Stack, Text, Card } from "@mantine/core";
import { IKImage } from "imagekitio-react";

export enum CardStyle {
  DEFAULT,
  FEED,
  WIDGET,
}

interface HorizontalGridCardProps {
  theme: MantineTheme;
  style: CardStyle;
}
const HorizontalGridCard: React.FC<HorizontalGridCardProps> = ({
  theme,
  style,
}) => {
  return (
    <Group noWrap className="w-full">
      <div className="h-[100px] w-[100px]">
        <IKImage
          className=""
          path="/7011585.jpeg"
          width={100}
          // height={100}
          transformation={[
            {
              height: "100px",
              width: "100px",
            },
          ]}
          lqip={{ active: true, quality: 30, blur: 20 }}
          height={style == CardStyle.WIDGET ? 80 : CardStyle.FEED ? 110 : 90}
          style={{
            borderRadius: theme.radius.lg,
            height: "100px",
            width: "100px",
          }}
        />
      </div>
      <Stack
        spacing="xs"
        className={
          style == CardStyle.FEED
            ? "max-w-[550px]"
            : style == CardStyle.WIDGET
            ? "max-w-[290px]"
            : "max-w-[390px]"
        }
      >
        <Text
          lineClamp={2}
          className={
            style == CardStyle.DEFAULT
              ? "text-xs xs:text-xs"
              : style == CardStyle.FEED
              ? "text-xs xs:text-sm"
              : "text-xs xs:text-xs"
          }
          size={style == CardStyle.FEED ? "sm" : "xs"}
          style={{
            lineHeight: 1.5,
          }}
        >
          The Truth About the Wage Gap from Someone Who Saw Everyone’s Salary
        </Text>
        <Text
          lineClamp={2}
          className="text-xs xs:text-xs"
          color="dimmed"
          size={style == CardStyle.FEED ? "sm" : "xs"}
        >
          Being a data educator at the intersection of analytical and creative
          thinking
        </Text>
      </Stack>
    </Group>
  );
};

export default HorizontalGridCard;
