import { ActionIcon, Tooltip } from "@mantine/core";
import { IconHighlight } from "@tabler/icons";
import { AfridiDevEditorMenuProps } from "./image-upload";

const AfridiDevEditorHighlight = ({
  colorScheme,
  editor,
  theme,
}: AfridiDevEditorMenuProps) => {
  return (
    <Tooltip label="Highlight text">
      <ActionIcon
        variant="subtle"
        color="gray"
        className="rounded-full px-1.5 py-0"
        onClick={() => {
          editor.chain().focus().toggleHighlight({ color: "#FFD43B" }).run();
        }}
        radius="xl"
        size="lg"
      >
        <IconHighlight
          color={
            colorScheme == "dark" ? theme.colors.gray[4] : theme.colors.gray[8]
          }
          size={18}
        />
      </ActionIcon>
    </Tooltip>
  );
};

export default AfridiDevEditorHighlight;
