import { Card, Center, Group, Loader, Stack, Text } from "@mantine/core";
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
    <Card className="w-[300px] h-[300px]" withBorder>
      <Center className="h-full">
        <Stack>
          <Loader ml={40} size="md" color="blue" variant="bars" />
          <Text>{props.node.attrs.title}</Text>
        </Stack>
      </Center>
    </Card>
  </NodeViewWrapper>
);
