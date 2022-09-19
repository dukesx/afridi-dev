import { MantineSize, Text, ThemeIcon } from "@mantine/core";

interface CreatorStudioIconProps {
  size?: MantineSize;
  textSize?: MantineSize;
}
const CreatorStudioIcon = ({ size, textSize }: CreatorStudioIconProps) => {
  return (
    <ThemeIcon
      className="rounded-full"
      size={size ?? "xl"}
      radius="xl"
      variant="gradient"
      gradient={{
        from: "blue.5",
        to: "cyan.5",
      }}
    >
      <Text size={textSize ?? "md"} weight={700}>
        <b className="font-normal">{"{"}</b>
        {"CS"}
        <b className="font-normal">{"}"}</b>
      </Text>
    </ThemeIcon>
  );
};

export default CreatorStudioIcon;
