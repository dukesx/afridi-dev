/* eslint-disable react/display-name */

import {
  useEditor,
  EditorContent,
  FloatingMenu,
  BubbleMenu,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

// import "@toast-ui/editor/dist/toastui-editor.css";
// import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
// import { Editor } from "@toast-ui/react-editor";
// import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import {
  ActionIcon,
  Button,
  Card,
  Divider,
  Group,
  Loader,
  LoadingOverlay,
  Menu,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import EmojiPicker, {
  EmojiStyle,
  SkinTones,
  SuggestionMode,
  Theme,
} from "emoji-picker-react";
import React, { useState } from "react";
import {
  IconArrowBack,
  IconArrowForward,
  IconArrowLeft,
  IconBold,
  IconFountain,
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconH6,
  IconHeading,
  IconItalic,
  IconLetterP,
  IconLetterT,
  IconList,
  IconListNumbers,
  IconMarkdown,
  IconMoodSmile,
  IconPhoto,
  IconPhotoUp,
  IconSeparatorHorizontal,
  IconStrikethrough,
  IconUnderline,
  IconUpload,
  IconX,
} from "@tabler/icons";
import CharacterCount from "@tiptap/extension-character-count";
import Underline from "@tiptap/extension-underline";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import AfridiDevEditorDivider from "./plugins/afridi-dev-editor-divider";
import AfridiDevEditorLoader from "./plugins/afridi-dev-editor-loader";
import { Dropzone } from "@mantine/dropzone";
import { useSessionContext } from "@supabase/auth-helpers-react";
import AfridiDevEditorImage from "./plugins/afridi-dev-editor-image";
import AfridiDevEditorUndo from "./menu/undo";
import AfridiDevEditorImageUpload from "./menu/image-upload";
import AfridiDevEditorEmojiSelector from "./menu/emoji-selector";
import AfridiDevEditorHorizontalLine from "./menu/horizontal-line";
import AfridiDevEditorOrderedList from "./menu/ordered-list";
import AfridiDevEditorBulletList from "./menu/bullet-list";
import AfridiDevEditorHeadersSize from "./menu/headers-size";
import AfridiDevEditorFontFamily from "./menu/font-family";

/**
 * @property {String} value
 * @property {Function} saveData
 * @example
 * //returns Editor Ref to Parent createRef()
 * // To Call ref.current.getInstance().getMarkdown()
 * const save = (data) => {
 *  ref = data;
 * };
  @property {String} height - in px
  @property {Boolean} autoFocus
  @property {EditorPreviewStyle} previewStyle in Enum
 */
export interface MarkDownEditorProps {
  value: string;
  height?: string;
  saveData: Function;
  autoFocus: boolean;
  previewStyle: "tab" | "vertical";
  toolbarItems: "full" | "basic" | false;
  placeholder?: string;
  plugins: boolean;
  className?: string;
}

export const TextEditor = React.memo(() => {
  var editorRef: any = React.createRef();
  const { colorScheme } = useMantineColorScheme();
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const theme = useMantineTheme();
  const { session } = useSessionContext();

  const editor = useEditor({
    extensions: [
      StarterKit,
      CharacterCount,
      Underline,
      FontFamily,
      TextStyle,
      AfridiDevEditorDivider,
      AfridiDevEditorLoader,
      AfridiDevEditorImage,
    ],
    content: "<p>Hello World! 🌎️</p>",
    autofocus: true,
    enablePasteRules: true,
    onFocus: ({ editor }) => {
      return editor.commands.focus("end");
    },
  });

  const getContent = () => {
    console.log(editor.getJSON());
  };
  return (
    <Stack spacing={0} className={"h-[400px]"}>
      <LoadingOverlay
        loader={
          <Stack className="h-[400px]" align="center">
            <Loader variant="bars" color="blue" />
            <Text weight={600}>Uploading Image</Text>
          </Stack>
        }
        visible={loadingSpinner}
        overlayBlur={2}
      />
      <Group
        py={5}
        style={{
          background:
            colorScheme == "dark" ? theme.colors.dark[6] : theme.white,
        }}
        className="sticky w-full top-0 z-[1000]"
        spacing="xs"
        mt="xl"
        px="md"
      >
        <AfridiDevEditorUndo
          theme={theme}
          colorScheme={colorScheme}
          editor={editor}
        />

        <AfridiDevEditorFontFamily
          theme={theme}
          colorScheme={colorScheme}
          editor={editor}
        />

        <AfridiDevEditorHeadersSize
          theme={theme}
          colorScheme={colorScheme}
          editor={editor}
        />

        <AfridiDevEditorBulletList
          theme={theme}
          colorScheme={colorScheme}
          editor={editor}
        />

        <AfridiDevEditorOrderedList
          theme={theme}
          colorScheme={colorScheme}
          editor={editor}
        />

        <Divider
          orientation="vertical"
          className="h-[18px] align-middle mt-2"
        />

        <AfridiDevEditorHorizontalLine
          theme={theme}
          colorScheme={colorScheme}
          editor={editor}
        />

        {/**
         *
         *
         *  Emoji Selector
         *
         */}
        <AfridiDevEditorEmojiSelector
          editor={editor}
          theme={theme}
          colorScheme={colorScheme}
        />
        <AfridiDevEditorImageUpload
          theme={theme}
          editor={editor}
          colorScheme={colorScheme}
        />
      </Group>
      {editor && (
        <BubbleMenu
          editor={editor}
          className="ml-14"
          tippyOptions={{
            arrow: true,
            interactive: true,
            duration: 100,
            // showOnCreate: true,
          }}
        >
          <Card className="shadow-xl" p={0} py={1} px={4} radius="xl">
            <Group spacing="xs">
              <ActionIcon
                variant="subtle"
                color="gray"
                className="rounded-full px-1.5 py-0"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                radius="xl"
                size="lg"
              >
                <IconH1
                  color={
                    colorScheme == "dark"
                      ? theme.colors.gray[4]
                      : theme.colors.gray[8]
                  }
                  size={18}
                />
              </ActionIcon>
              <ActionIcon
                variant="subtle"
                color="gray"
                className="rounded-full px-1.5 py-0"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                radius="xl"
                size="lg"
              >
                <IconH2
                  color={
                    colorScheme == "dark"
                      ? theme.colors.gray[4]
                      : theme.colors.gray[8]
                  }
                  size={18}
                />
              </ActionIcon>

              <ActionIcon
                variant="subtle"
                color="gray"
                className="rounded-full px-1.5 py-0"
                onClick={() => editor.chain().focus().toggleBold().run()}
                radius="xl"
                size="lg"
              >
                <IconBold
                  color={
                    colorScheme == "dark"
                      ? theme.colors.gray[4]
                      : theme.colors.gray[8]
                  }
                  size={18}
                />
              </ActionIcon>
              <ActionIcon
                variant="subtle"
                color="gray"
                className="rounded-full px-1.5 py-0"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                radius="xl"
                size="lg"
              >
                <IconItalic
                  color={
                    colorScheme == "dark"
                      ? theme.colors.gray[4]
                      : theme.colors.gray[8]
                  }
                  size={18}
                />
              </ActionIcon>
              <ActionIcon
                variant="subtle"
                color="gray"
                className="rounded-full px-1.5 py-0"
                onClick={() => editor.chain().focus().setUnderline().run()}
                radius="xl"
                size="lg"
              >
                <IconUnderline
                  color={
                    colorScheme == "dark"
                      ? theme.colors.gray[4]
                      : theme.colors.gray[8]
                  }
                  size={18}
                />
              </ActionIcon>
            </Group>
          </Card>
        </BubbleMenu>
      )}
      <EditorContent height={500} editor={editor} />
      <Group className="ml-auto">
        <Group spacing={5}>
          <Text color="dimmed" size="sm" className="character-count">
            Supports
          </Text>
          <IconMarkdown color={theme.colors.gray[5]} strokeWidth={1.5} />
        </Group>

        <Divider className="w-[20px]" />
        <Text color="dimmed" size="sm" className="character-count">
          {editor && editor.storage.characterCount.characters()} characters
        </Text>
        <Divider className="w-[20px]" />
        <Text color="dimmed" size="sm" className="character-count">
          {editor && editor.storage.characterCount.words()} words
        </Text>
      </Group>
    </Stack>
  );
});

export default TextEditor;
