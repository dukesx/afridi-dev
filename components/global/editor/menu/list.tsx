import { ActionIcon, Group, Menu, Stack, Text } from "@mantine/core";
import { IconList, IconListDetails } from "@tabler/icons";
import AfridiDevEditorBulletList from "./bullet-list";
import { AfridiDevEditorMenuProps } from "./image-upload";
import AfridiDevEditorOrderedList from "./ordered-list";

const AfridiDevEditorList = ({
  theme,
  colorScheme,
  editor,
}: AfridiDevEditorMenuProps) => {
  return (
    <Menu withArrow width={220}>
      <Menu.Target>
        <ActionIcon
          variant="subtle"
          color="gray"
          className="rounded-full px-1.5 py-0"
          radius="xl"
          size="lg"
        >
          <IconListDetails
            color={
              colorScheme == "dark"
                ? theme.colors.gray[4]
                : theme.colors.gray[8]
            }
            size={18}
          />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Group position="center" noWrap>
          <Menu.Item>
            <Stack className="w-[70px]" align="center">
              <AfridiDevEditorBulletList
                colorScheme={colorScheme}
                editor={editor}
                theme={theme}
              />

              <Text size="xs">Bullet</Text>
            </Stack>
          </Menu.Item>
          <Menu.Item>
            <Stack className="w-[70px]" align="center">
              <AfridiDevEditorOrderedList
                colorScheme={colorScheme}
                editor={editor}
                theme={theme}
              />
              <Text size="xs">Numbered</Text>
            </Stack>
          </Menu.Item>
        </Group>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AfridiDevEditorList;
