/* eslint-disable @next/next/no-img-element */
/* eslint-disable jsx-a11y/alt-text */
import {
  Avatar,
  Button,
  Card,
  Center,
  Divider,
  Group,
  Loader,
  Stack,
  Text,
  TextInput,
  useMantineTheme,
} from "@mantine/core";
import {
  IconMaximize,
  IconMinimize,
  IconRectangle,
  IconSquare,
} from "@tabler/icons";
import {
  mergeAttributes,
  Node,
  NodeViewContent,
  NodeViewWrapper,
  ReactNodeViewRenderer,
} from "@tiptap/react";
import { useState } from "react";

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
      size: {
        default: "square",
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

const AfridiDevImage = (props) => {
  const theme = useMantineTheme();
  return (
    <NodeViewWrapper>
      <Stack className="relative">
        <div className="top-0 absolute right-0">
          <Button.Group color="blue">
            <Button
              onClick={() =>
                props.updateAttributes({
                  size: "landscape",
                })
              }
              leftIcon={<IconRectangle size={18} />}
              color={props.node.attrs.size == "landscape" ? "blue" : "cyan"}
            >
              Landscape
            </Button>
            <Button
              onClick={() => {
                props.updateAttributes({
                  size: "square",
                });
              }}
              color={props.node.attrs.size == "square" ? "blue" : "cyan"}
              leftIcon={<IconSquare size={18} />}
            >
              Square
            </Button>
          </Button.Group>
        </div>
        <img
          alt="image"
          src={props.node.attrs.src}
          className="object-cover h-[300px]"
          style={{
            maxWidth: props.node.attrs.size == "landscape" ? "100%" : 320,
          }}
        />

        <NodeViewContent className="content">
          <TextInput
            color="gray"
            defaultValue={props.node.attrs.alt ?? ""}
            radius="xl"
            placeholder="Image Alt text"
            onChange={(event) => {
              props.updateAttributes({
                alt: event.target.value,
              });
            }}
            variant="unstyled"
            style={{
              maxWidth: props.node.attrs.size == "landscape" ? "500px" : 320,
              margin: props.node.attrs.size == "landscape" ? "auto" : "unset",
              fontStyle: "italic",
            }}
            styles={{
              input: {
                fontStyle: "italic",
              },
            }}
          />
          <Divider
            pb="xl"
            style={{
              maxWidth: props.node.attrs.size == "landscape" ? "500px" : 320,
              margin: props.node.attrs.size == "landscape" ? "auto" : "unset",
            }}
            label="Image Alt text"
            labelPosition="center"
          />
        </NodeViewContent>
      </Stack>
      {/* </Avatar> */}
    </NodeViewWrapper>
  );
};
