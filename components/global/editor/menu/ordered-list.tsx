import { ActionIcon } from "@mantine/core";
import { IconListNumbers } from "@tabler/icons";
import { AfridiDevEditorMenuProps } from "./image-upload";

const AfridiDevEditorOrderedList = ({
  editor,
  colorScheme,
  theme,
}: AfridiDevEditorMenuProps) => {
  return (
    <ActionIcon
      variant="subtle"
      color="gray"
      className="rounded-full px-1.5 py-0"
      onClick={() => editor.chain().focus().toggleOrderedList().run()}
      radius="xl"
      size="lg"
    >
      <IconListNumbers
        color={
          colorScheme == "dark" ? theme.colors.gray[4] : theme.colors.gray[8]
        }
        size={17}
      />
    </ActionIcon>
  );
};

export default AfridiDevEditorOrderedList;
