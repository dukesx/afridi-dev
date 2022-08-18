import { Loader, Stack, Text } from "@mantine/core";
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
  toolbarItems,
  previewStyle,
  placeholder,
}: MarkDownEditorProps) => {
  const MarkDownEditor = dynamic(() => import("./editor"), {
    ssr: false,
    loading: () => (
      <Stack align="center">
        <Text>Loading Editor</Text>
        <Loader size="sm" variant="bars" />
      </Stack>
    ),
  });
  return (
    <MarkDownEditor
      toolbarItems={toolbarItems}
      placeholder={placeholder}
      autoFocus={autoFocus}
      previewStyle={previewStyle}
      saveData={saveData}
      height={height}
      value={value}
    />
  );
};
