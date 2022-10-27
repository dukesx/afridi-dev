/* eslint-disable react-hooks/exhaustive-deps */
/* eslint-disable react/display-name */

import {
  useEditor,
  EditorContent,
  BubbleMenu,
  Editor,
  ReactRenderer,
} from "@tiptap/react";
import StarterKit from "@tiptap/starter-kit";

import {
  ActionIcon,
  Affix,
  Button,
  Card,
  Divider,
  Group,
  Loader,
  LoadingOverlay,
  Paper,
  ScrollArea,
  Stack,
  Text,
  Transition,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import React, { Fragment, useEffect, useState } from "react";
import {
  IconArrowDown,
  IconBold,
  IconH1,
  IconH2,
  IconItalic,
  IconMarkdown,
} from "@tabler/icons";
import CharacterCount from "@tiptap/extension-character-count";
import Underline from "@tiptap/extension-underline";
import FontFamily from "@tiptap/extension-font-family";
import TextStyle from "@tiptap/extension-text-style";
import AfridiDevEditorDivider from "./plugins/afridi-dev-editor-divider";
import AfridiDevEditorLoader from "./plugins/afridi-dev-editor-loader";
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
import AfridiDevEditorInsertCodeBlock from "./menu/code-block";
import AfridiDevEditorCode from "./menu/code";
import afridiDevEditorCodeBlock from "./plugins/afridi-dev-editor-code-block";
import AfridiDevEditorInsertRowBelow from "./menu/paragraph";
import Highlight from "@tiptap/extension-highlight";
import AfridiDevEditorHighlight from "./menu/highlight";
import AfridiDevEditorUnderline from "./menu/underline";
import AfridiDevEditorQuote from "./plugins/afridi-dev-editor-quote";
import AfridiDevEditorBlockquoteMenu from "./menu/blockquote";
import AfridiDevEditorEmbeds from "./plugins/afridi-dev-editor-embeds";
import Link from "@tiptap/extension-link";
import AfridiDevEditorInsertEmbeds from "./menu/embeds";
import Script from "next/script";
import { AfridiDevEditorOutput } from "../../../pages/creator-studio/publish/article";
import Mention from "@tiptap/extension-mention";
import tippy from "tippy.js";
import AfridiDevEditorMentionsDropdown from "./plugins/afridi-dev-editor-mentions-dropdown";
import AfridiDevEditorGiphySelector from "./menu/giphy";
import AfridiDevEditorGiphy from "./plugins/afridi-dev-editor-giphy";
import Placeholder from "@tiptap/extension-placeholder";
import Image from "@tiptap/extension-image";

/**
 *  @property {String}   value
 *  @property {Function} setValue
 *  @property {String}   height - in integer
 *  @property {Boolean}  html
 *  @property {Boolean}  noToolbar
 *  @property {Booelan}  basic
 */
export interface AfridiDevEditorProps {
  setValue: Function;
  value?: AfridiDevEditorOutput;
  placeholder?: string;
  basic?: boolean;
  isScrollable?: boolean | false;
  height?: number;
  html?: boolean;
  noToolbar?: boolean | false;
}

export const TextEditor = ({
  setValue,
  value,
  basic,
  isScrollable,
  height,
  placeholder,
  noToolbar = false,
  html,
}: AfridiDevEditorProps) => {
  var editorRef: any = React.createRef();
  const { colorScheme } = useMantineColorScheme();
  const [loadingSpinner, setLoadingSpinner] = useState(false);
  const theme = useMantineTheme();
  const { session, supabaseClient } = useSessionContext();

  const CustomMentions = Mention.extend({
    addAttributes: () => {
      return {
        id: {
          default: null,
          parseHTML: (element) => element.getAttribute("data-id"),
          renderHTML: (attributes) => {
            if (!attributes.id) {
              return {};
            }

            return {
              "data-id": attributes.id,
            };
          },
        },

        label: {
          default: null,
          parseHTML: (element) => element.getAttribute("data-label"),
          renderHTML: (attributes) => {
            if (!attributes.label) {
              return {};
            }

            return {
              "data-label": attributes.label,
            };
          },
        },

        bio: {
          default: null,
          parseHTML: (element) => element.getAttribute("data-label"),
          renderHTML: (attributes) => {
            if (!attributes.bio) {
              return {};
            }

            return {
              "data-label": attributes.bio,
            };
          },
        },

        avatar: {
          default: null,
          parseHTML: (element) => element.getAttribute("data-id"),
          renderHTML: (attributes) => {
            if (!attributes.avatar) {
              return {};
            }

            return {
              "data-avatar": attributes.avatar,
            };
          },
        },

        username: {
          default: null,
          parseHTML: (element) => element.getAttribute("data-id"),
          renderHTML: (attributes) => {
            if (!attributes.username) {
              return {};
            }

            return {
              "data-username": attributes.username,
            };
          },
        },
      };
    },
  });

  useEffect(() => {
    if (!value && editor) {
      editor.commands.clearContent();
    }
  }, [value]);

  const editor = useEditor({
    extensions: [
      StarterKit.configure({ codeBlock: false }),
      CharacterCount,
      Underline,
      FontFamily,
      TextStyle,
      Image.configure({
        inline: true,
        HTMLAttributes: {
          class: "default-image",
        },
      }),
      AfridiDevEditorDivider,
      AfridiDevEditorLoader,
      AfridiDevEditorImage,
      afridiDevEditorCodeBlock,
      Highlight.configure({ multicolor: true }),
      AfridiDevEditorQuote,
      AfridiDevEditorEmbeds,
      Link.configure({
        autolink: true,
        openOnClick: true,
        linkOnPaste: true,
        HTMLAttributes: {
          className: "cursor-pointer",
          style: "cursor:pointer",
        },
      }),
      CustomMentions.configure({
        HTMLAttributes: {
          class: "mention",
        },

        renderLabel({ options, node }) {
          return `${options.suggestion.char}${
            node.attrs.label ?? node.attrs.id
          }`;
        },

        suggestion: {
          items: async ({ editor, query }) => {
            const { data, error } = await supabaseClient
              .from("authors")
              .select(
                `
              id, 
              username,
              full_name,
              email,
              dp,
              bio
              `
              )
              .ilike("full_name", `%${query}%`);
            return data;
          },
          render: () => {
            let component;
            let popup;

            return {
              onStart: (props) => {
                component = new ReactRenderer(AfridiDevEditorMentionsDropdown, {
                  props,
                  editor: props.editor,
                });

                if (!props.clientRect) {
                  return;
                }

                popup = tippy("body", {
                  getReferenceClientRect: props.clientRect,
                  appendTo: () => document.body,
                  content: component.element,
                  showOnCreate: true,
                  interactive: true,
                  trigger: "manual",
                  placement: "bottom-start",
                });
              },

              onUpdate(props) {
                component.updateProps(props);

                if (!props.clientRect) {
                  return;
                }

                popup[0].setProps({
                  getReferenceClientRect: props.clientRect,
                });
              },

              onKeyDown(props) {
                if (props.event.key === "Escape") {
                  popup[0].hide();

                  return true;
                }

                return component.ref?.onKeyDown(props);
              },

              onExit() {
                popup[0].destroy();
                component.destroy();
              },
            };
          },
        },
      }),
      AfridiDevEditorGiphy,
      Placeholder.configure({
        placeholder: placeholder ?? "Let's write something awsum!",
      }),
    ],
    content: value ? value.data : "",
    autofocus: false,
    enablePasteRules: true,
    onUpdate: ({ editor }) => {
      if (html) {
        const html = editor.getHTML();
        setValue({
          data: html,
          words: editor.storage.characterCount.words(),
        });
      } else {
        const json = editor.getJSON();
        setValue({
          data: json,
          words: editor.storage.characterCount.words(),
        });
      }
    },
  });

  return (
    <Stack spacing={0} className={"z-[1000] relative"}>
      <Script
        src="https://cdn.iframe.ly/embed.js?api_key=4a589c2e0d46bd4afc5d8c"
        strategy="afterInteractive"
      />
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
      {editor && noToolbar == false ? (
        <Group
          py={5}
          style={{
            background:
              colorScheme == "dark" ? theme.colors.dark[6] : theme.white,
          }}
          className="sticky w-full top-[70px] z-[9000]"
          spacing="xs"
          mt="xl"
        >
          {!basic && (
            <AfridiDevEditorUndo
              theme={theme}
              colorScheme={colorScheme}
              editor={editor}
            />
          )}

          {!basic && (
            <AfridiDevEditorFontFamily
              theme={theme}
              colorScheme={colorScheme}
              editor={editor}
            />
          )}

          {!basic && (
            <AfridiDevEditorHeadersSize
              theme={theme}
              colorScheme={colorScheme}
              editor={editor}
            />
          )}

          {!basic && (
            <Fragment>
              <AfridiDevEditorInsertRowBelow
                theme={theme}
                colorScheme={colorScheme}
                editor={editor}
              />

              <AfridiDevEditorBlockquoteMenu
                theme={theme}
                colorScheme={colorScheme}
                editor={editor}
              />
              <AfridiDevEditorBulletList
                editor={editor}
                theme={theme}
                colorScheme={colorScheme}
              />
              <AfridiDevEditorOrderedList
                editor={editor}
                theme={theme}
                colorScheme={colorScheme}
              />
              <AfridiDevEditorHighlight
                theme={theme}
                colorScheme={colorScheme}
                editor={editor}
              />
            </Fragment>
          )}
          <AfridiDevEditorCode
            editor={editor}
            theme={theme}
            colorScheme={colorScheme}
          />

          <AfridiDevEditorInsertCodeBlock
            editor={editor}
            theme={theme}
            colorScheme={colorScheme}
          />

          {!basic && (
            <Fragment>
              <Divider
                orientation="vertical"
                className="h-[18px] align-middle mt-2"
              />

              <AfridiDevEditorHorizontalLine
                theme={theme}
                colorScheme={colorScheme}
                editor={editor}
              />
            </Fragment>
          )}
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
          {!basic && (
            <Fragment>
              <AfridiDevEditorInsertEmbeds
                theme={theme}
                editor={editor}
                colorScheme={colorScheme}
              />
            </Fragment>
          )}

          <AfridiDevEditorGiphySelector
            theme={theme}
            editor={editor}
            colorScheme={colorScheme}
          />
        </Group>
      ) : null}
      {editor && (
        <BubbleMenu
          editor={editor}
          className="ml-14"
          tippyOptions={{
            arrow: true,
            duration: 100,
            hideOnClick: true,
          }}
        >
          <Card ml={70} className="shadow-xl" p={0} py={1} px={4} radius="xl">
            <Group noWrap spacing="xs" className="cursor-grab">
              <ActionIcon
                variant={
                  editor.isActive("heading", { level: 1 }) ? "filled" : "subtle"
                }
                color={
                  editor.isActive("heading", { level: 1 }) ? "blue" : "gray"
                }
                className="rounded-full px-1.5 py-0"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 1 }).run()
                }
                radius="xl"
                size="lg"
              >
                <IconH1
                  color={
                    editor.isActive("heading", { level: 1 })
                      ? theme.white
                      : colorScheme == "dark"
                      ? theme.colors.gray[4]
                      : theme.colors.gray[8]
                  }
                  size={18}
                />
              </ActionIcon>
              <ActionIcon
                variant={
                  editor.isActive("heading", { level: 2 }) ? "filled" : "subtle"
                }
                color={
                  editor.isActive("heading", { level: 2 }) ? "blue" : "gray"
                }
                className="rounded-full px-1.5 py-0"
                onClick={() =>
                  editor.chain().focus().toggleHeading({ level: 2 }).run()
                }
                radius="xl"
                size="lg"
              >
                <IconH2
                  color={
                    editor.isActive("heading", { level: 2 })
                      ? theme.white
                      : colorScheme == "dark"
                      ? theme.colors.gray[4]
                      : theme.colors.gray[8]
                  }
                  size={18}
                />
              </ActionIcon>

              <ActionIcon
                variant={editor.isActive("bold") ? "filled" : "subtle"}
                color={editor.isActive("bold") ? "blue" : "gray"}
                className="rounded-full px-1.5 py-0"
                onClick={() => editor.chain().focus().toggleBold().run()}
                radius="xl"
                size="lg"
              >
                <IconBold
                  color={
                    editor.isActive("bold")
                      ? theme.white
                      : colorScheme == "dark"
                      ? theme.colors.gray[4]
                      : theme.colors.gray[8]
                  }
                  size={18}
                />
              </ActionIcon>
              <ActionIcon
                variant={editor.isActive("italic") ? "filled" : "subtle"}
                color={editor.isActive("italic") ? "blue" : "gray"}
                className="rounded-full px-1.5 py-0"
                onClick={() => editor.chain().focus().toggleItalic().run()}
                radius="xl"
                size="lg"
              >
                <IconItalic
                  color={
                    editor.isActive("italic")
                      ? theme.white
                      : colorScheme == "dark"
                      ? theme.colors.gray[4]
                      : theme.colors.gray[8]
                  }
                  size={18}
                />
              </ActionIcon>

              <AfridiDevEditorUnderline
                theme={theme}
                editor={editor}
                colorScheme={colorScheme}
              />
            </Group>
          </Card>
        </BubbleMenu>
      )}
      <Paper
        component={isScrollable ? ScrollArea : "div"}
        className="bg-transparent"
        style={{
          height: height ?? "100%",
        }}
      >
        <EditorContent editor={editor} />
      </Paper>

      <Group mt="xl" className="ml-auto">
        <Group spacing={5} className="hover:underline hover:cursor-pointer">
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
};

export default TextEditor;
