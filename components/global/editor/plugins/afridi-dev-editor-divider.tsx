import { Divider } from "@mantine/core";
import {
  mergeAttributes,
  Node,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";

export default Node.create({
  name: "afridi-dev-editor-divider",
  group: "block",
  addNodeView() {
    return ReactNodeViewRenderer(MantineDivider);
  },

  parseHTML() {
    return [
      {
        tag: "afridi-dev-editor-divider",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "afridi-dev-divider",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },
});

const MantineDivider = () => (
  <NodeViewWrapper>
    <Divider my="xl" />
  </NodeViewWrapper>
);
