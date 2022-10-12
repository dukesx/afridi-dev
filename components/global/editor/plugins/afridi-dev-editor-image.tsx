/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import {
  Avatar,
  Card,
  Center,
  Group,
  Loader,
  Stack,
  Text,
  TextInput,
} from "@mantine/core";
import {
  mergeAttributes,
  Node,
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";

export default Node.create({
  name: "afridi-dev-editor-image",
  group: "block",
  atom: true,
  addNodeView() {
    return ReactNodeViewRenderer(AfridiDevImage);
  },

  parseHTML() {
    return [
      {
        tag: "afridi-dev-editor-image",
      },
    ];
  },

  addAttributes() {
    return {
      src: {
        default: null,
      },
      alt: {
        default: null,
      },
    };
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "afridi-dev-editor-image",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },
});

const AfridiDevImage = (props) => (
  <NodeViewWrapper>
    <Stack className="w-full">
      <img
        alt="image"
        src={props.node.attrs.src}
        className="object-cover w-full h-400px]"
      />

      <NodeViewContent className="content">
        <TextInput
          radius="xl"
          placeholder="Image Alt text"
          onChange={(event) => {
            props.updateAttributes({
              alt: event.target.value,
            });
          }}
        />
      </NodeViewContent>
    </Stack>
    {/* </Avatar> */}
  </NodeViewWrapper>
);
