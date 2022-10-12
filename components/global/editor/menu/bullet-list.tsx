import { ActionIcon } from "@mantine/core";
import { IconList } from "@tabler/icons";
import { AfridiDevEditorMenuProps } from "./image-upload";

const AfridiDevEditorBulletList = ({
  editor,
  colorScheme,
  theme,
}: AfridiDevEditorMenuProps) => {
  return (
    <ActionIcon
      variant="subtle"
      color="gray"
      className="rounded-full px-1.5 py-0"
      onClick={() => editor.chain().focus().toggleBulletList().run()}
      radius="xl"
      size="lg"
    >
      <IconList
        color={
          colorScheme == "dark" ? theme.colors.gray[4] : theme.colors.gray[8]
        }
        size={18}
      />
    </ActionIcon>
  );
};

export default AfridiDevEditorBulletList;
