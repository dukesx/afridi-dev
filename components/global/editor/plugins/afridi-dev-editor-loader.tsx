/* eslint-disable @next/next/no-img-element */
import {
  Avatar,
  Card,
  Center,
  Group,
  Loader,
  Stack,
  Text,
} from "@mantine/core";
import {
  mergeAttributes,
  Node,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";

export default Node.create({
  name: "afridi-dev-editor-loader",
  group: "block",
  addNodeView() {
    return ReactNodeViewRenderer(MantineLoader);
  },

  parseHTML() {
    return [
      {
        tag: "afridi-dev-editor-loader",
      },
    ];
  },

  addAttributes() {
    return {
      title: {
        default: null,
      },
      image: {
        default: null,
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "afridi-dev-editor-loader",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },
});

const MantineLoader = (props) => (
  <NodeViewWrapper>
    <Card className="w-full h-[300px]" withBorder>
      <Center className="h-full">
        <Stack align="center">
          <Avatar color="blue" className="rounded-full" size={150}>
            <img
              src={props.node.attrs.image}
              alt=""
              className="object-cover w-[150px] h-[150px] rounded-full"
            />
          </Avatar>
          <Group spacing={"xs"}>
            <Text size="sm" weight={500} color="dimmed">
              {props.node.attrs.title}
            </Text>
            <Loader size="xs" color="gray" variant="oval"></Loader>
          </Group>
        </Stack>
      </Center>
    </Card>
  </NodeViewWrapper>
);
