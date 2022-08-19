import "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight.css";
import "@toast-ui/editor/dist/toastui-editor.css";
import "@toast-ui/editor/dist/theme/toastui-editor-dark.css";
// import "prismjs/themes/prism.css";
//
import { Editor } from "@toast-ui/react-editor";
import codeSyntaxHighlight from "@toast-ui/editor-plugin-code-syntax-highlight/dist/toastui-editor-plugin-code-syntax-highlight-all.js";
import { Button, useMantineColorScheme } from "@mantine/core";
import React from "react";

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

export const TextEditor: React.FC<MarkDownEditorProps> = ({
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
  return (
    <div className={className + " container"}>
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
        height={height ? height : "600px"}
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
          }
        }}
        autofocus={autoFocus ?? true}
        hooks={{
          addImageBlobHook: (blob, callback) => {
            var form = new FormData();
            form.append("file", blob);
            fetch(
              `http://${process.env.NEXT_PUBLIC_FUNCTIONS_URL}/upload/image/form`,
              {
                method: "POST",
                body: form,
              }
            ).then((res) => res.json().then((res) => callback(res.file.url)));
          },
        }}
      />
    </div>
  );
};

export default TextEditor;
