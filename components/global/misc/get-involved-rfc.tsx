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

interface GetInvolvedInRFCComponentProps {
  className?: string;
  align?: GroupPosition;
  textSize?: MantineNumberSize;
}
const GetInvolvedInRFCComponent = ({
  className,
  align,
  textSize,
}: GetInvolvedInRFCComponentProps) => {
  return (
    <Group className={className + " w-full"} position={align ?? "center"}>
      <Text size={textSize ?? "sm"}>
        Interested 💪 ? Get Involved in the{" "}
        <b className="decoration-2 decoration-blue-400 decoration-double underline">
          RFC
        </b>{" "}
        👉
      </Text>
      <Code className="max-w-[290px] px-5 sm:px-0 sm:max-w-[400px]">
        <Text size="sm" className="truncate">
          https://github.com/dukesx/afridi-dev/issues/18
        </Text>
      </Code>
      <CopyButton value="https://github.com/dukesx/afridi-dev/issues/18">
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
            window.open(
              "https://github.com/dukesx/afridi-dev/issues/18",
              "_blank"
            )
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

export default GetInvolvedInRFCComponent;
