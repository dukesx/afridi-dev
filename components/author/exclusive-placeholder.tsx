import {
  ActionIcon,
  Code,
  CopyButton,
  Group,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconCheck, IconCopy, IconExternalLink } from "@tabler/icons";
import { Fragment } from "react";

const ExclusivePlaceholder = () => {
  return (
    <Fragment>
      <Stack className="text-center mx-auto max-w-[600px]" mt="xl">
        <Title order={3}>What&apos;s this?</Title>
        <Text size="sm" className="px-4">
          If everything goes according to plan, you can upload here your
          <b className="italic underline decoration-cyan-400 ml-1 mr-0.5 decoration-2">
            EXCLUSIVE
          </b>{" "}
          stuff like Paid App/Website/Theme Codes (Wordpress/Seperate PHP etc),
          Premium/Paid Articles, Paid/Premium Courses (Short/Long) etc that you
          will sell eventually for membership or retail price
          <b className="mx-1">(PERKS)</b>. Think of this feature like an
          ONLYFANS or{" "}
          <a target="blank" href="https://codecanyon.net">
            CodeCanyon
          </a>{" "}
          but for DEVS.
        </Text>
      </Stack>

      <Text className="text-center" mt="xl">
        Coming soon in <b>Version 2</b>. Stay Tuned 😇
      </Text>

      <Group className="w-full" position="center" mt="xl">
        <Text size="sm" className="text-center">
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

      <Group px="xs" className="w-full" position="center" mt="xl">
        <Text size="sm">
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
    </Fragment>
  );
};

export default ExclusivePlaceholder;
