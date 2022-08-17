import { Loader, Stack, Text } from "@mantine/core";
import { EditorProps } from "@toast-ui/react-editor";
import dynamic from "next/dynamic";
import { MarkDownEditorProps } from "./editor";

/**
 * @see {@link MarkDownEditorProps}
 */
export const MarkDownEditor = ({
  value,
  height,
  saveData,
  autoFocus,
  previewStyle,
  toolbarItems,
}: MarkDownEditorProps) => {
  const MarkDownEditor = dynamic(() => import("./editor"), {
    ssr: false,
    // suspense: true,
    loading: () => (
      <Stack align="center">
        <Text>Loading Editor</Text>
        <Loader size="sm" variant="bars" />
      </Stack>
    ),
  });
  return (
    <MarkDownEditor
      toolbarItems
      autoFocus={autoFocus}
      previewStyle={previewStyle}
      saveData={saveData}
      height={height}
      value={value}
    />
  );
};
