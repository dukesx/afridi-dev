/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  Center,
  Divider,
  Group,
  Loader,
  LoadingOverlay,
  ScrollArea,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { IconAlertCircle, IconBug, IconError404 } from "@tabler/icons";
import {
  mergeAttributes,
  Node,
  nodeInputRule,
  NodeViewWrapper,
  ReactNodeViewRenderer,
  textInputRule,
} from "@tiptap/react";
import Image from "next/image";
import { useEffect, useState } from "react";
import { TwitterTweetEmbed } from "react-twitter-embed";

export default Node.create({
  name: "afridi-dev-editor-embed",
  group: "block",
  addNodeView() {
    return ReactNodeViewRenderer(MantineEmbeds);
  },

  parseHTML() {
    return [
      {
        tag: "afridi-dev-editor-embed",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "afridi-dev-editor-embed",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addAttributes: () => {
    return {
      src: {
        default: null,
      },
    };
  },
});

const MantineEmbeds = (props) => {
  const [loading, setLoading] = useState(false);
  const [embed, setEmbed] = useState<any>();
  const { colorScheme } = useMantineColorScheme();
  const getEmbeds = async () => {
    setLoading(true);

    const fetcher = await fetch(
      // `https://embeds.fitlive.health/iframely?url=${props.node.attrs.src}
      `https://iframe.ly/api/iframely?url=${props.node.attrs.src}&api_key=4a589c2e0d46bd4afc5d8c&theme=${colorScheme}`
    );

    const res = await fetcher.json();

    setEmbed(res);

    setLoading(false);
  };
  useEffect(() => {
    getEmbeds();
  }, [props.node.attrs.src]);

  return (
    <NodeViewWrapper>
      <div className="relative w-full my-3 py-3">
        {loading ? (
          <Card
            className="max-w-[350px] h-[350px] border-dashed border-2"
            withBorder
          >
            <Center className="h-full">
              <Stack align="center">
                <Loader variant="bars" color="blue" />
                <Text>Loading OEmbed</Text>
              </Stack>
            </Center>
          </Card>
        ) : //@ts-ignore
        embed && embed.html ? (
          //@ts-ignore
          <ScrollArea
            className="relative"
            style={{
              minHeight: 200,
              maxHeight: 800,
            }}
          >
            {/* <div className="top-0 bg-yellow-400 p-2 sticky z-[1000]">
              <Group spacing="xs">
                <IconAlertCircle color={"black"} />
                <Text color="dark">
                  This iframe will be sized to full when you publish
                </Text>
              </Group>
            </div> */}
            <div
              className="max-w-[450px] relative block"
              dangerouslySetInnerHTML={{ __html: embed.html }}
            />
          </ScrollArea>
        ) : embed && embed.meta ? (
          <Card radius="md" className="max-w-[450px] mb-10 relative" withBorder>
            {embed && embed.links.thumbnail ? (
              <Card.Section className="relative h-[400px]">
                <Image
                  alt=""
                  layout="fill"
                  objectFit="cover"
                  src={embed && embed.links.thumbnail[0].href}
                  loader={({ src }) => src}
                  style={{
                    objectFit: "cover",
                  }}
                />
              </Card.Section>
            ) : null}
            <Stack mt="md">
              <Title order={5}>{embed && embed.meta.title}</Title>
              <Text lineClamp={2} size="sm" color="dimmed">
                {embed && embed.meta.description}
              </Text>
              <Group position="apart" mt="sm">
                <Image
                  alt=""
                  width={20}
                  height={20}
                  objectFit="cover"
                  src={embed && embed.links.icon[0].href}
                  loader={({ src }) => src}
                  style={{
                    objectFit: "cover",
                  }}
                />
                <Text ml="auto" size="xs" color="dimmed">
                  {embed && embed.meta.site}
                </Text>
              </Group>
            </Stack>
          </Card>
        ) : (
          <Card
            className="max-w-[350px] h-[350px] border-dashed border-2"
            withBorder
          >
            <Center className="h-full">
              <Stack align="center">
                <ThemeIcon
                  radius="xl"
                  className="rounded-full"
                  size={100}
                  color="red"
                  variant="light"
                >
                  <IconBug size={40} />
                </ThemeIcon>
                <Text
                  className="capitalize"
                  size="sm"
                  weight={600}
                  align="center"
                >
                  {embed && embed.error}
                </Text>
              </Stack>
            </Center>
          </Card>
        )}
      </div>
    </NodeViewWrapper>
  );
};
