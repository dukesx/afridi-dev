import {
  ActionIcon,
  Button,
  Group,
  Menu,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
  Tooltip,
  useMantineColorScheme,
} from "@mantine/core";
import {
  IconArrowDown,
  IconBrandFacebook,
  IconBrandGithub,
  IconBrandInstagram,
  IconBrandMeta,
  IconBrandPinterest,
  IconBrandReddit,
  IconBrandSpotify,
  IconBrandTiktok,
  IconBrandTwitch,
  IconBrandTwitter,
  IconBrandYoutube,
  IconSourceCode,
} from "@tabler/icons";
import { Fragment, useState } from "react";
import { AfridiDevEditorMenuProps } from "./image-upload";

const AfridiDevEditorInsertEmbeds = ({
  theme,
  colorScheme,
  editor,
}: AfridiDevEditorMenuProps) => {
  const [visible, setVisible] = useState(false);
  const [url, setUrl] = useState("");
  return (
    <Fragment>
      <Modal
        zIndex={10000}
        size="xl"
        opened={visible}
        onClose={() => setVisible(false)}
      >
        <Stack className="w-full" align="center">
          <Title align="center" order={3}>
            Embeds On The
            <Text
              underline
              className="decoration-blue-500 decoration-4"
              component="span"
              mx={5}
            >
              Go!
            </Text>
          </Title>
          <Group mt="xl" align="center" position="center">
            <IconBrandMeta size={30} color={theme.colors.blue[6]} />
            <IconBrandTwitter
              size={25}
              color={theme.colors.blue[4]}
              fill={theme.colors.blue[4]}
            />
            <IconBrandYoutube
              size={35}
              color={theme.white}
              fill={theme.colors.red[6]}
            />
            <IconBrandInstagram
              size={30}
              color={theme.colors.grape[4]}
              fill={theme.colors.yellow[1]}
            />
            <IconBrandPinterest color={theme.colors.red[6]} size={30} />
            <IconBrandReddit
              size={30}
              color={theme.colors.orange[5]}
              fill={theme.white}
            />
            <IconBrandSpotify
              size={30}
              color={theme.colors.teal[5]}
              fill={theme.white}
            />

            <IconBrandTiktok
              color={
                colorScheme == "light" ? theme.colors.dark[4] : theme.white
              }
              size={30}
            />
            <IconBrandGithub
              color={
                colorScheme == "light" ? theme.colors.dark[4] : theme.white
              }
              size={28}
            />
            <IconBrandTwitch color={theme.colors.grape[6]} size={28} />
          </Group>

          <TextInput
            onChange={(e) => setUrl(e.target.value)}
            pb="xl"
            placeholder="https://youtu.be/....."
            mt="xl"
            className="max-w-[600px] mx-auto w-full"
            label="Embed URL"
            description="Paste your url here"
            size="sm"
          />

          <Button
            mb="xl"
            onClick={() => {
              editor.commands.focus("end");
              editor
                .chain()
                .focus()
                .insertContent({
                  type: "afridi-dev-editor-embed",
                  attrs: {
                    src: url,
                  },
                })
                .run();

              editor.commands.enter();
              editor.commands.enter();

              setVisible(false);
            }}
            leftIcon={<IconArrowDown />}
            color="blue"
            variant="light"
            className="mx-auto"
            mx="auto"
          >
            Insert Embed
          </Button>
        </Stack>
      </Modal>
      <Tooltip label="Embed Facebook,Twitter,etc">
        <ActionIcon
          variant={"subtle"}
          color={"gray"}
          className="rounded-full px-1.5 py-0"
          onClick={() => setVisible(true)}
          radius="xl"
          size={"lg"}
        >
          <IconSourceCode
            color={
              colorScheme == "dark"
                ? theme.colors.gray[4]
                : theme.colors.gray[8]
            }
            size={18}
          />
        </ActionIcon>
      </Tooltip>
    </Fragment>
  );
};

export default AfridiDevEditorInsertEmbeds;
