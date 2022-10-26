import { ActionIcon, Tooltip } from "@mantine/core";
import { IconCode, IconCodeCircle2, IconList } from "@tabler/icons";
import { AfridiDevEditorMenuProps } from "./image-upload";

const AfridiDevEditorInsertCodeBlock = ({
  editor,
  colorScheme,
  theme,
}: AfridiDevEditorMenuProps) => {
  return (
    <Tooltip label="Code Block">
      <ActionIcon
        variant="subtle"
        color="gray"
        className="rounded-full px-1.5 py-0"
        onClick={() => {
          editor
            .chain()
            .insertContent({
              type: "afridi-dev-editor-code-block",
              attrs: {
                language: "typescript",
              },
            })
            .run();

          editor.commands.enter();
        }}
        radius="xl"
        size={"lg"}
      >
        <IconCodeCircle2
          color={
            colorScheme == "dark" ? theme.colors.gray[4] : theme.colors.gray[8]
          }
          size={18}
        />
      </ActionIcon>
    </Tooltip>
  );
};

export default AfridiDevEditorInsertCodeBlock;
