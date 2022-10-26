import { ActionIcon, Tooltip } from "@mantine/core";
import { IconUnderline } from "@tabler/icons";
import { AfridiDevEditorMenuProps } from "./image-upload";

const AfridiDevEditorUnderline = ({
  colorScheme,
  editor,
  theme,
}: AfridiDevEditorMenuProps) => {
  return (
    <Tooltip label="Underline">
      <ActionIcon
        variant={editor.isActive("underline") ? "filled" : "subtle"}
        color={editor.isActive("underline") ? "blue" : "gray"}
        className="rounded-full px-1.5 py-0"
        onClick={() => editor.chain().focus().toggleUnderline().run()}
        radius="xl"
        size="lg"
      >
        <IconUnderline
          color={
            editor.isActive("underline")
              ? theme.white
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

export default AfridiDevEditorUnderline;
