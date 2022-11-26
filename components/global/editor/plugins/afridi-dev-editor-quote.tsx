import {
  Blockquote,
  Divider,
  Group,
  Stack,
  Textarea,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import { IconBlockquote, IconQuote } from "@tabler/icons";
import {
  mergeAttributes,
  Node,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";

export default Node.create({
  name: "afridi-dev-editor-blockquote",
  group: "block",
  addNodeView() {
    return ReactNodeViewRenderer(MantineQuote);
  },

  parseHTML() {
    return [
      {
        tag: "afridi-dev-editor-quote",
      },
    ];
  },

  renderHTML({ HTMLAttributes }) {
    return [
      "afridi-dev-editor-quote",
      mergeAttributes(this.options.HTMLAttributes, HTMLAttributes),
    ];
  },

  addAttributes() {
    return {
      quote: {
        default: null,
      },
      cite: {
        default: null,
      },
    };
  },
});

const MantineQuote = (props) => {
  const theme = useMantineTheme();
  return (
    <NodeViewWrapper>
      <Stack mt="xl">
        <Textarea
          autosize
          minRows={1}
          onChange={(e) => props.updateAttributes({ quote: e.target.value })}
          placeholder="Quote"
          className="max-w-[600px]"
          styles={{
            input: {
              marginLeft: "50px",
              paddingLeft: 0,
            },
            withIcon: {
              paddingLeft: 15,
            },
          }}
          icon={
            <IconQuote
              className="mb-10"
              style={{
                transform: "scale(-1,-1) rotate(2deg)",
              }}
              size={30}
            />
          }
        >
          {props.node.attrs.quote}
        </Textarea>
        <Group>
          <Divider className="w-[35px]" />
          <TextInput
            defaultValue={props.node.attrs.cite ?? ""}
            styles={{
              input: {
                fontStyle: "italic",
                color: theme.colors.gray[6],
              },
            }}
            onChange={(e) => props.updateAttributes({ cite: e.target.value })}
            placeholder="Cite"
            className="max-w-[600px] w-full italic"
          />
        </Group>
      </Stack>
    </NodeViewWrapper>
  );
};
