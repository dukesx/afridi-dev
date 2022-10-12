import { ActionIcon, Menu } from "@mantine/core";
import { IconMoodSmile } from "@tabler/icons";
import EmojiPicker, {
  EmojiStyle,
  SkinTones,
  SuggestionMode,
  Theme,
} from "emoji-picker-react";
import { useState } from "react";
import { AfridiDevEditorMenuProps } from "./image-upload";

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
      </Menu.Target>
      <Menu.Dropdown>
        <EmojiPicker
          previewConfig={{
            showPreview: false,
          }}
          width={300}
          emojiStyle={EmojiStyle.NATIVE}
          autoFocusSearch={false}
          suggestedEmojisMode={SuggestionMode.RECENT}
          lazyLoadEmojis={false}
          theme={colorScheme == "dark" ? Theme.DARK : Theme.LIGHT}
          height={300}
          defaultSkinTone={SkinTones.LIGHT}
          skinTonesDisabled
          onEmojiClick={(emoji) => {
            editor.chain().insertContent(emoji.emoji).run();
            setEmojiMenuOpened(false);
          }}
        />
      </Menu.Dropdown>
    </Menu>
  );
};

export default AfridiDevEditorEmojiSelector;
