import {
  ActionIcon,
  Code,
  CopyButton,
  Group,
  GroupPosition,
  MantineNumberSize,
  Text,
  Tooltip,
} from "@mantine/core";
import { IconCheck, IconCopy, IconExternalLink } from "@tabler/icons";

interface FollowRepoComponentProps {
  className?: string;
  align?: GroupPosition;
  textSize?: MantineNumberSize;
}
const FollowRepoComponent = ({
  className,
  textSize,
  align,
}: FollowRepoComponentProps) => {
  return (
    <Group className={className + " w-full"} position={align ?? "center"}>
      <Text size={textSize ?? "sm"} className="text-center">
        Follow the repo for progress 👉{" "}
      </Text>
      <Code>
        <Text size="sm">https://github.com/dukesx/afridi-dev</Text>
      </Code>
      <CopyButton value="https://github.com/dukesx/afridi-dev">
        {({ copied, copy }) => (
          <Tooltip label={copied ? "Copied url!" : "Copy url"}>
            <ActionIcon
              size="sm"
              color={copied ? "teal" : "blue"}
              onClick={copy}
            >
              {copied ? <IconCheck /> : <IconCopy />}
            </ActionIcon>
          </Tooltip>
        )}
      </CopyButton>
      <Tooltip label="Open link in a new tab">
        <ActionIcon
          onClick={() =>
            window.open("https://github.com/dukesx/afridi-dev", "_blank")
          }
          variant="light"
          size="sm"
          color="cyan"
        >
          <IconExternalLink />
        </ActionIcon>
      </Tooltip>
    </Group>
  );
};

export default FollowRepoComponent;
