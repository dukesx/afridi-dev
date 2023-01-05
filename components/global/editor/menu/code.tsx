import { ActionIcon, Tooltip } from "@mantine/core";
import { IconCode, IconList } from "@tabler/icons";
import { AfridiDevEditorMenuProps } from "./image-upload";

const AfridiDevEditorCode = ({
  editor,
  colorScheme,
  theme,
}: AfridiDevEditorMenuProps) => {
  return (
    <Tooltip label="Convert to Code">
      <ActionIcon
        variant={editor.isActive("code") ? "filled" : "subtle"}
        color={editor.isActive("code") ? "blue" : "gray"}
        className="rounded-full px-1.5 py-0"
        onClick={() => editor.chain().focus().toggleCode().run()}
        radius="xl"
        size={"lg"}
      >
        <IconCode
          color={
            editor.isActive("code")
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

export default AfridiDevEditorCode;
