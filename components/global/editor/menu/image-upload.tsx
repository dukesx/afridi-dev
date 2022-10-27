import {
  ActionIcon,
  Box,
  Button,
  Card,
  ColorScheme,
  Divider,
  Group,
  MantineTheme,
  Menu,
  Stack,
  Text,
  Textarea,
  TextInput,
  ThemeIcon,
  Tooltip,
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
  const [url, setUrl] = useState(null);

  return (
    <Menu
      withArrow
      opened={imageUploadMenuOpened}
      onClose={() => setImageUploadMenuOpened(false)}
      closeOnClickOutside
      closeOnEscape
      closeOnItemClick
      position="bottom"
    >
      <Menu.Target>
        <Tooltip label="Insert Image">
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
        </Tooltip>
      </Menu.Target>
      <Menu.Dropdown>
        <Group noWrap>
          <Card className="h-[250px] border-2">
            <Textarea
              onChange={(e) => {
                setUrl(e.target.value);
              }}
              required
              minRows={4}
              label="URL"
              description="Insert image from Url"
            />
            <Button
              onClick={() => {
                editor.commands.setImage({
                  src: url,
                  alt: "Sample image",
                  title: "sample",
                });
                setImageUploadMenuOpened(false);
              }}
              color="blue"
              fullWidth
              mt="xl"
            >
              Insert Image
            </Button>
          </Card>

          {/* <Divider orientation="vertical" className="" /> */}
          <Text weight={700}>OR</Text>
          <Dropzone
            className="w-[240px] border-0"
            onDrop={async (files) => {
              setImageUploadMenuOpened(false);
              const reader = new FileReader();
              var fileer = reader.readAsDataURL(files[0]);
              reader.addEventListener(
                "load",
                () => {
                  editor
                    .chain()
                    .insertContent({
                      type: "afridi-dev-editor-loader",
                      attrs: {
                        title: "Uploading Image....",
                        image: reader.result,
                      },
                    })
                    .run();
                  editor.commands.blur();
                },
                false
              );

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
                          "https://ik.imagekit.io/afrididotdev/tr:w-900" +
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
        </Group>
      </Menu.Dropdown>
    </Menu>
  );
};

export default AfridiDevEditorImageUpload;
