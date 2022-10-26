import { ActionIcon, Tooltip } from "@mantine/core";
import { IconList } from "@tabler/icons";
import { AfridiDevEditorMenuProps } from "./image-upload";

const AfridiDevEditorBulletList = ({
  editor,
  colorScheme,
  theme,
}: AfridiDevEditorMenuProps) => {
  return (
    <Tooltip label="Bullet list">
      <ActionIcon
        variant={editor.isActive("bulletList") ? "filled" : "subtle"}
        color={editor.isActive("bulletList") ? "blue" : "gray"}
        className="rounded-full px-1.5 py-0"
        onClick={() => editor.chain().focus("end").toggleBulletList().run()}
        radius="xl"
        size={"lg"}
      >
        <IconList
          color={
            editor.isActive("bulletList")
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

export default AfridiDevEditorBulletList;
