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
        variant={editor.isActive("highlight") ? "filled" : "subtle"}
        color={editor.isActive("highlight") ? "yellow.4" : "gray"}
        className="rounded-full px-1.5 py-0"
        onClick={() => {
          editor.chain().focus().toggleHighlight({ color: "#FFD43B" }).run();
        }}
        radius="xl"
        size="lg"
      >
        <IconHighlight
          color={
            editor.isActive("highlight")
              ? theme.colors.gray[8]
              : colorScheme == "dark"
              ? theme.colors.gray[4]
              : theme.colors.gray[8]
          }
          size={18}
        />
      </ActionIcon>
    </Tooltip>
  );
};

export default AfridiDevEditorHighlight;
