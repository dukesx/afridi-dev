import {
  Anchor,
  Avatar,
  Badge,
  Button,
  Code,
  Group,
  HoverCard,
  Mark,
  Stack,
  Text,
  Title,
  TypographyStylesProvider,
  useMantineColorScheme,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { IconAt } from "@tabler/icons";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import { useEffect } from "react";
import AfridiImage from "../../../afridi-image";

const EditorRendererParagraph = ({ data }) => {
  const { colorScheme } = useMantineColorScheme();
  const router = useRouter();

  return data.type == "paragraph"
    ? data.content &&
        data.content.map((mapped, index) => {
          if (mapped.type == "mention") {
            return (
              <HoverCard
                key={nanoid()}
                width={320}
                shadow="md"
                withArrow
                position="top"
                openDelay={200}
                closeDelay={400}
              >
                <HoverCard.Target>
                  <Badge
                    variant="dot"
                    color="blue"
                    size="md"
                    radius="xl"
                    key={nanoid()}
                  >
                    <Text
                      variant="link"
                      weight={600}
                      color={colorScheme == "dark" ? "gray.4" : "dark"}
                      component={NextLink}
                      href={`/author/${mapped.attrs.id}`}
                      key={nanoid()}
                    >
                      {mapped.attrs.label}
                    </Text>
                  </Badge>
                </HoverCard.Target>
                <HoverCard.Dropdown>
                  <Group>
                    <Avatar className="relative" radius="xl">
                      {mapped.attrs.avatar && (
                        <AfridiImage
                          fillImage
                          path={mapped.attrs.avatar ?? ""}
                        />
                      )}
                    </Avatar>
                    <Stack spacing={5}>
                      <Text size="sm" weight={700} sx={{ lineHeight: 1 }}>
                        {mapped.attrs.label}
                      </Text>
                      <Anchor
                        href={`/author/${mapped.attrs.id}`}
                        color="dimmed"
                        size="xs"
                        sx={{ lineHeight: 1 }}
                      >
                        @{mapped.attrs.username}
                      </Anchor>
                    </Stack>
                  </Group>
                  {mapped.attrs.bio ? (
                    <Text className="leading-normal" size="xs" lineClamp={3}>
                      <TypographyStylesProvider mt="sm">
                        <div
                          className="!text-xs leading-normal"
                          dangerouslySetInnerHTML={{
                            __html: mapped.attrs.bio,
                          }}
                        />
                      </TypographyStylesProvider>
                    </Text>
                  ) : (
                    <Text color="dimmed" size="sm" mt="md">
                      Interested in my work ? Check out my profile for more
                      articles
                    </Text>
                  )}

                  <Button
                    onClick={() => router.push(`/author/${mapped.attrs.id}`)}
                    mt="md"
                    className="mx-auto"
                    fullWidth
                    size="xs"
                    variant="light"
                  >
                    Visit Profile
                  </Button>
                </HoverCard.Dropdown>
              </HoverCard>
            );
          }

          if (mapped.type == "text") {
            return (
              <Text
                className="leading-normal"
                style={{
                  fontFamily:
                    mapped.marks &&
                    mapped.marks.filter((mark) => mark.type == "textStyle")
                      .length > 0 &&
                    mapped.marks.filter((mark) => mark.type == "textStyle")[0]
                      .attrs.fontFamily,
                }}
                mx={1}
                italic={
                  mapped.marks &&
                  mapped.marks.filter((mark) => mark.type == "italic").length >
                    0 &&
                  true
                }
                underline={
                  mapped.marks &&
                  mapped.marks.filter((mark) => mark.type == "underline")
                    .length > 0 &&
                  true
                }
                href={
                  mapped.marks &&
                  mapped.marks.filter((mark) => mark.type == "link").length > 0
                    ? mapped.marks.filter((mark) => mark.type == "link")[0]
                        .attrs.href
                    : null
                }
                variant={
                  mapped.marks &&
                  mapped.marks.filter((mark) => mark.type == "link").length > 0
                    ? "link"
                    : "text"
                }
                color={
                  mapped.marks &&
                  mapped.marks.filter((mark) => mark.type == "link").length > 0
                    ? "blue"
                    : "auto"
                }
                weight={
                  mapped.marks &&
                  mapped.marks.filter((mark) => mark.type == "bold").length > 0
                    ? 700
                    : 400
                }
                component={
                  mapped.marks &&
                  mapped.marks.filter((mark) => mark.type == "link").length > 0
                    ? "a"
                    : "p"
                }
                key={nanoid()}
              >
                {mapped.marks &&
                mapped.marks.filter((mark) => mark.type == "highlight").length >
                  0 ? (
                  <Mark>{mapped.text}</Mark>
                ) : mapped.marks &&
                  mapped.marks.filter((mark) => mark.type == "code").length >
                    0 ? (
                  <Code className="text-sm">{mapped.text}</Code>
                ) : (
                  mapped.text
                )}
              </Text>
            );
          }

          if (mapped.type == "hardBreak") {
            return <p key={nanoid()} />;
          }
        })
    : null;
};

export default EditorRendererParagraph;
