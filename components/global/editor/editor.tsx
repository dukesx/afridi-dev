/* eslint-disable react/display-name */
// @ts-nocheck

import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
import { Editor } from "@toast-ui/react-editor";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import {
  Button,
  Loader,
  LoadingOverlay,
  Overlay,
  Stack,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import React, { useState } from "react";
// import Editor from "rich-markdown-editor";

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
  toolbarItems: boolean;
  placeholder?: string;
  plugins: boolean;
  className?: string;
}

export const TextEditor: React.FC<MarkDownEditorProps> = React.memo(
  ({
    value,
    height,
    saveData,
    autoFocus,
    previewStyle,
    toolbarItems,
    placeholder,
    plugins,
    className,
  }) => {
    var editorRef: any = React.createRef();
    const { colorScheme } = useMantineColorScheme();
    const [visible, setVisible] = useState(false);
    return (
      <div className={className + " relative"}>
        <LoadingOverlay
          loader={
            <Stack className="h-[400px]" align="center">
              <Loader variant="bars" color="blue" />
              <Text weight={600}>Uploading Image</Text>
            </Stack>
          }
          visible={visible}
          overlayBlur={2}
        />
        <Editor
          initialValue={value}
          theme={colorScheme == "dark" ? "dark" : "default"}
          hideModeSwitch
          toolbarItems={
            toolbarItems == true
              ? [
                  ["heading", "bold", "italic", "strike"],
                  ["hr", "quote"],
                  ["ul", "ol", "task", "indent", "outdent"],
                  ["table", "image", "link"],
                  ["code", "codeblock"],
                ]
              : null
          }
          // minheight={height ? height : "100px"}
          minHeight={height ?? "400px"}
          height={height ?? "400px"}
          placeholder={
            placeholder ?? "Write something awesome with GFM Supported Markdown"
          }
          plugins={plugins ? [codeSyntaxHighlight] : []}
          ref={editorRef}
          previewStyle={previewStyle}
          onLoad={async (editor) => {
            saveData(editorRef);
            if (plugins) {
              //@ts-ignore
              await import("prismjs/themes/prism.css");
              await import(
                "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css"
              );
            }
          }}
          autofocus={autoFocus ?? true}
          hooks={{
            addImageBlobHook: (blob, callback) => {
              setVisible(true);
              var form = new FormData();
              form.append("file", blob);
              fetch(
                `${process.env.NEXT_PUBLIC_FUNCTIONS_URL}/upload/image/form`,
                {
                  method: "POST",
                  body: form,
                }
              ).then((res) =>
                res.json().then((res) => {
                  setVisible(false);
                  callback(res.file.url.replace("tr:n-400x", "tr:w-400,h-400"));
                })
              );
            },
          }}
        />
      </div>
    );
  }
);

export default TextEditor;
