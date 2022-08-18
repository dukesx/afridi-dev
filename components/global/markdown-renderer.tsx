import ReactMarkdown from "react-markdown";
import remarkGfm from "remark-gfm";
import remarkGithub from "remark-github";
import { Prism as SyntaxHighlighter } from "react-syntax-highlighter";
import {
  Blockquote,
  Checkbox,
  Code,
  List,
  Stack,
  Table,
  Text,
  Title,
} from "@mantine/core";

interface MarkDownRendererProps {
  children: any;
  className?: string;
}

var checked = null;
var checked2 = null;

const MarkDownRenderer = ({ children, className }: MarkDownRendererProps) => {
  return (
    <ReactMarkdown
      className=""
      components={{
        code: ({ node, inline, className, children, ...props }) => {
          const match = /language-(\w+)/.exec(className || "");
          return !inline && match ? (
            <Code>
              <SyntaxHighlighter language={match[1]} PreTag="div" {...props}>
                {String(children).replace(/\n$/, "")}
              </SyntaxHighlighter>
            </Code>
          ) : (
            <Code className={className} {...props}>
              {children}
            </Code>
          );
        },
        input: ({ node, className, children, ...props }) => {
          if (props.type == "checkbox") {
            return <Checkbox />;
          }
        },
        h1: ({ children }) => <Title>{children}</Title>,
        h2: ({ children }) => <Title order={2}>{children}</Title>,
        h3: ({ children }) => <Title order={3}>{children}</Title>,
        h4: ({ children }) => <Title order={4}>{children}</Title>,
        h5: ({ children }) => <Title order={5}>{children}</Title>,
        h6: ({ children }) => <Title order={6}>{children}</Title>,
        a: ({ children, ...props }) => (
          <Text variant="link" component="a" {...props}>
            {children}
          </Text>
        ),
        table: ({ children, ...props }) => <Table {...props}>{children}</Table>,
        ul: ({ children, node }) => {
          if (
            node &&
            node.properties &&
            node.properties.className &&
            node.properties.className[0]
              .toString()
              .includes("contains-task-list")
          ) {
            return (
              <Stack my="md">
                {node.children.map((mapped: any, index1: number) => {
                  if (mapped.children) {
                    return mapped.children.map(
                      (mapped2: any, index2: number) => {
                        if (mapped2.properties) {
                          checked = mapped2.properties.checked;
                        }
                        if (mapped2.type == "text") {
                          if (mapped2.value.length > 1) {
                            return (
                              <Checkbox
                                key={index2 + "alo"}
                                label={mapped2.value}
                                checked={checked}
                              />
                            );
                          }
                        }
                      }
                    );
                  } else {
                    if (mapped.properties) {
                      checked2 = mapped.properties.checked;
                    }
                    if (mapped.value.length > 1) {
                      return (
                        <Checkbox
                          key={index1 + "alob"}
                          checked={checked2}
                          label={mapped.value}
                        />
                      );
                    }
                  }
                })}
              </Stack>
            );
          } else {
            return <List type="unordered">{children}</List>;
          }
        },
        ol: ({ children, node }) => <List type="ordered">{children}</List>,
        p: ({ children }) => <Text>{children}</Text>,
        q: ({ children, ...props }) => <Blockquote>{children}</Blockquote>,
        blockquote: ({ children, ...props }) => {
          return (
            <Blockquote>
              <Text color="dimmed" size="md">
                {children}
              </Text>
            </Blockquote>
          );
        },
      }}
      remarkPlugins={[
        remarkGfm,
        [
          remarkGithub,
          {
            repository: "https://github.com/dukesx/afridi-dev",
          },
        ],
      ]}
    >
      {children}
    </ReactMarkdown>
  );
};

export default MarkDownRenderer;
