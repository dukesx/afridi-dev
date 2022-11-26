import { Card, Menu, Text } from "@mantine/core";
import { useState } from "react";
import { AfridiDevEditorMenuProps } from "./image-upload";

const AfridiDevEditorFontFamily = ({
  editor,
  colorScheme,
  theme,
}: AfridiDevEditorMenuProps) => {
  const [fontFamily, setFontFamily] = useState("Font Family");
  return (
    <Menu withArrow>
      <Menu.Target>
        <Card py={4} px="lg" className="shadow-sm">
          <Text size="sm" className="cursor-pointer">
            {fontFamily}
          </Text>
        </Card>
      </Menu.Target>
      <Menu.Dropdown className="ml-0">
        <Menu.Item
          onClick={() => {
            setFontFamily("Inter");
            editor.chain().focus().setFontFamily("Inter").run();
          }}
        >
          Inter
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setFontFamily("Sans-Serif");
            editor.chain().focus().setFontFamily("sans-serif").run();
          }}
          className="font-sans"
        >
          Sans Serif
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setFontFamily("Source Code Pro");
            editor.chain().focus().setFontFamily("Source Code Pro").run();
          }}
          className="font-mono"
        >
          Source Code Pro
        </Menu.Item>
        <Menu.Item
          onClick={() => {
            setFontFamily("Serif");
            editor.chain().focus().setFontFamily("serif").run();
          }}
          className="font-serif"
        >
          Serif
        </Menu.Item>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AfridiDevEditorFontFamily;
