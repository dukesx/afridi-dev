import { ActionIcon, Tooltip } from "@mantine/core";
import { IconSeparator, IconSeparatorHorizontal } from "@tabler/icons";
import { AfridiDevEditorMenuProps } from "./image-upload";

const AfridiDevEditorHorizontalLine = ({
  editor,
  colorScheme,
  theme,
}: AfridiDevEditorMenuProps) => {
  return (
    <Tooltip label="Insert Horizontal Line">
      <ActionIcon
        variant="subtle"
        color="gray"
        className="rounded-full px-1.5 py-0"
        onClick={() => {
          editor
            .chain()
            .focus()
            .insertContent({ type: "afridi-dev-editor-divider" })
            .run();

          editor.commands.enter();
        }}
        radius="xl"
        size="lg"
      >
        <IconSeparator
          color={
            colorScheme == "dark" ? theme.colors.gray[4] : theme.colors.gray[8]
          }
          size={18}
        />
      </ActionIcon>
    </Tooltip>
  );
};

export default AfridiDevEditorHorizontalLine;
