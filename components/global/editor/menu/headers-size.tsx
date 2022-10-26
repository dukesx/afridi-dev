import { ActionIcon, Group, Menu, Tooltip } from "@mantine/core";
import {
  IconH1,
  IconH2,
  IconH3,
  IconH4,
  IconH5,
  IconH6,
  IconHeading,
  IconLetterP,
} from "@tabler/icons";
import { AfridiDevEditorMenuProps } from "./image-upload";

const AfridiDevEditorHeadersSize = ({
  editor,
  theme,
  colorScheme,
}: AfridiDevEditorMenuProps) => {
  return (
    <Menu>
      <Menu.Target>
        <Tooltip label="Header Size">
          <ActionIcon
            variant={editor.isActive("heading") ? "filled" : "subtle"}
            color={editor.isActive("heading") ? "blue" : "gray"}
            className="rounded-full px-1.5 py-0"
            radius="xl"
            size="lg"
          >
            <IconHeading
              color={
                editor.isActive("heading")
                  ? theme.white
                  : colorScheme == "dark"
                  ? theme.colors.gray[4]
                  : theme.colors.gray[8]
              }
              size={18}
            />
          </ActionIcon>
        </Tooltip>
      </Menu.Target>
      <Menu.Dropdown className="ml-10">
        <Group spacing={6} className="w-full" noWrap>
          <Menu.Item
            onClick={() => editor.chain().toggleHeading({ level: 1 }).run()}
          >
            <IconH1
              color={
                colorScheme == "dark"
                  ? theme.colors.gray[4]
                  : theme.colors.gray[8]
              }
              size={20}
            />{" "}
          </Menu.Item>

          <Menu.Item
            onClick={() => editor.chain().toggleHeading({ level: 2 }).run()}
          >
            <IconH2
              color={
                colorScheme == "dark"
                  ? theme.colors.gray[4]
                  : theme.colors.gray[8]
              }
              size={20}
            />
          </Menu.Item>

          <Menu.Item
            onClick={() => editor.chain().toggleHeading({ level: 3 }).run()}
          >
            <IconH3
              color={
                colorScheme == "dark"
                  ? theme.colors.gray[4]
                  : theme.colors.gray[8]
              }
              size={20}
            />{" "}
          </Menu.Item>

          <Menu.Item
            onClick={() => editor.chain().toggleHeading({ level: 4 }).run()}
          >
            <IconH4
              color={
                colorScheme == "dark"
                  ? theme.colors.gray[4]
                  : theme.colors.gray[8]
              }
              size={20}
            />{" "}
          </Menu.Item>

          <Menu.Item
            onClick={() => editor.chain().toggleHeading({ level: 5 }).run()}
          >
            <IconH5
              color={
                colorScheme == "dark"
                  ? theme.colors.gray[4]
                  : theme.colors.gray[8]
              }
              size={20}
            />{" "}
          </Menu.Item>

          <Menu.Item
            onClick={() => editor.chain().toggleHeading({ level: 6 }).run()}
          >
            <IconH6
              color={
                colorScheme == "dark"
                  ? theme.colors.gray[4]
                  : theme.colors.gray[8]
              }
              size={20}
            />{" "}
          </Menu.Item>
        </Group>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AfridiDevEditorHeadersSize;
