import { ActionIcon, Menu, Tooltip } from "@mantine/core";
import { IconMoodSmile } from "@tabler/icons";
import { useState } from "react";
import { AfridiDevEditorMenuProps } from "./image-upload";
import Picker from "@emoji-mart/react";

const AfridiDevEditorEmojiSelector = ({
  editor,
  colorScheme,
  theme,
}: AfridiDevEditorMenuProps) => {
  const [emojiMenuOpened, setEmojiMenuOpened] = useState(false);
  return (
    <Menu
      onClose={() => {
        setEmojiMenuOpened(false);
      }}
      opened={emojiMenuOpened}
    >
      <Menu.Target>
        <Tooltip label="Emoji">
          <ActionIcon
            variant="subtle"
            color="gray"
            className="rounded-full px-1.5 py-0"
            radius="xl"
            size="lg"
            onClick={() => setEmojiMenuOpened(!emojiMenuOpened)}
          >
            <IconMoodSmile
              color={
                colorScheme == "dark"
                  ? theme.colors.gray[4]
                  : theme.colors.gray[8]
              }
              size={24}
            />
          </ActionIcon>
        </Tooltip>
      </Menu.Target>
      <Menu.Dropdown>
        <Picker
          theme={colorScheme}
          height="100px"
          perLine={8}
          searchPosition="none"
          maxFrequentRows={0}
          previewPosition="none"
          data={async () => {
            const response = await fetch(
              "https://cdn.jsdelivr.net/npm/@emoji-mart/data"
            );

            return response.json();
          }}
          onEmojiSelect={(data) => {
            editor.chain().insertContent(data.native).run();
          }}
        />
      </Menu.Dropdown>
    </Menu>
  );
};

export default AfridiDevEditorEmojiSelector;
