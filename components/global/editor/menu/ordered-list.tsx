import { ActionIcon, Tooltip } from "@mantine/core";
import { IconListNumbers } from "@tabler/icons";
import { AfridiDevEditorMenuProps } from "./image-upload";

const AfridiDevEditorOrderedList = ({
  editor,
  colorScheme,
  theme,
}: AfridiDevEditorMenuProps) => {
  return (
    <Tooltip label="Ordered List">
      <ActionIcon
        variant={editor.isActive("orderedList") ? "filled" : "subtle"}
        color={editor.isActive("orderedList") ? "blue" : "gray"}
        className="rounded-full px-1.5 py-0"
        onClick={() => {
          editor.chain().focus().toggleOrderedList().run();
        }}
        radius="xl"
        size={"lg"}
      >
        <IconListNumbers
          color={
            editor.isActive("orderedList")
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

export default AfridiDevEditorOrderedList;
