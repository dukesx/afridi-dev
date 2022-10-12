import {
  ActionIcon,
  ColorScheme,
  MantineTheme,
  Menu,
  Stack,
  Text,
  ThemeIcon,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { Dropzone } from "@mantine/dropzone";
import { IconPhoto, IconPhotoUp, IconUpload, IconX } from "@tabler/icons";
import { Editor } from "@tiptap/react";
import { useState } from "react";

export interface AfridiDevEditorMenuProps {
  editor: Editor;
  theme: MantineTheme;
  colorScheme: ColorScheme;
}

const AfridiDevEditorImageUpload = ({
  editor,
  colorScheme,
  theme,
}: AfridiDevEditorMenuProps) => {
  const [imageUploadMenuOpened, setImageUploadMenuOpened] = useState(false);

  return (
    <Menu
      opened={imageUploadMenuOpened}
      onClose={() => setImageUploadMenuOpened(false)}
      closeOnClickOutside
      closeOnEscape
      closeOnItemClick
    >
      <Menu.Target>
        <ActionIcon
          onClick={() => setImageUploadMenuOpened(true)}
          variant="subtle"
          color="gray"
          className="rounded-full px-1.5 py-0"
          radius="xl"
          size="lg"
        >
          <IconPhotoUp
            color={
              colorScheme == "dark"
                ? theme.colors.gray[4]
                : theme.colors.gray[8]
            }
            size={24}
          />
        </ActionIcon>
      </Menu.Target>
      <Menu.Dropdown>
        <Dropzone
          className="w-[300px]"
          onDrop={async (files) => {
            setImageUploadMenuOpened(false);

            editor
              .chain()
              .insertContent({
                type: "afridi-dev-editor-loader",
                attrs: {
                  title: "Uploading Image....",
                },
              })
              .run();
            editor.commands.blur();

            const form = new FormData();
            form.append("file", files[0]);
            const res = await fetch(
              `${process.env.NEXT_PUBLIC_FUNCTIONS_URL}/upload/image/form`,
              {
                method: "POST",
                body: form,
              }
            );

            const result = await res.json();

            if (result) {
              setTimeout(() => {
                editor
                  .chain()
                  .focus()
                  .insertContent({
                    type: "afridi-dev-editor-image",
                    attrs: {
                      src:
                        "https://ik.imagekit.io/afrididotdev/tr:w-900/" +
                        result.file.url.split("tr:n-400x")[1],
                    },
                  })
                  .run();

                editor.commands.enter();
                editor.commands.focus("end");
              }, 3000);
            } else {
              editor.commands.insertContent(" ");
            }
          }}
          onReject={(files) => console.log("rejected files", files)}
        >
          <Stack
            // position="center"
            align="center"
            spacing="xl"
            style={{ minHeight: 220, pointerEvents: "none" }}
          >
            <Dropzone.Accept>
              <ThemeIcon variant="light" className="rounded-full" size={100}>
                <IconUpload
                  size={100}
                  stroke={1.5}
                  color={
                    theme.colors[theme.primaryColor][
                      theme.colorScheme === "dark" ? 4 : 6
                    ]
                  }
                />
              </ThemeIcon>
            </Dropzone.Accept>
            <Dropzone.Reject>
              <IconX
                size={50}
                stroke={1.5}
                color={theme.colors.red[theme.colorScheme === "dark" ? 4 : 6]}
              />
            </Dropzone.Reject>
            <Dropzone.Idle>
              <ThemeIcon
                variant="light"
                color="gray"
                className="rounded-full"
                size={100}
              >
                <IconPhoto size={50} stroke={1.5} />
              </ThemeIcon>
            </Dropzone.Idle>

            <div>
              <Text
                className="leading-snug"
                lineClamp={2}
                size="sm"
                weight={700}
                inline
              >
                Drag images here or click to select files
              </Text>
              <Text
                size="xs"
                color="dimmed"
                inline
                mt={15}
                className="leading-snug"
              >
                Attach as many files as you like, each file should not exceed
                5mb
              </Text>
            </div>
          </Stack>
        </Dropzone>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AfridiDevEditorImageUpload;
