import { Loader, Stack, Text } from "@mantine/core";
import dynamic from "next/dynamic";
import { Suspense } from "react";
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
  plugins,
  className,
}: MarkDownEditorProps) => {
  const MarkDownEditor = dynamic(() => import("./editor"), {
    suspense: true,
  });
  return (
    <Suspense
      fallback={
        <Stack
          style={{
            height: height ?? 600,
          }}
          align="center"
        >
          <Text>Loading Editor</Text>
          <Loader size="sm" variant="bars" />
        </Stack>
      }
    >
      <MarkDownEditor
        className={className}
        toolbarItems={toolbarItems}
        plugins={plugins}
        placeholder={placeholder}
        autoFocus={autoFocus}
        previewStyle={previewStyle}
        saveData={saveData}
        height={height}
        value={value}
      />
    </Suspense>
  );
};
