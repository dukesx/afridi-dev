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
  useMantineTheme,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { IconAt } from "@tabler/icons";
import { nanoid } from "nanoid";
import { useRouter } from "next/router";
import slugify from "slugify";
import AfridiImage from "../../../afridi-image";

const EditorRendererHeading = ({ data, level }) => {
  const { colorScheme } = useMantineColorScheme();
  const router = useRouter();
  const theme = useMantineTheme();

  return data.map((mapped, index) => {
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
              mt="md"
              size="md"
              className="border-0"
              variant="dot"
              leftSection={
                <IconAt
                  size={16}
                  color={theme.colors.blue[6]}
                  className="mt-1.5 mr-0"
                />
              }
              color="blue"
              radius="xl"
              key={nanoid()}
            >
              <Text
                mt="sm"
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
                  <AfridiImage fillImage path={mapped.attrs.avatar ?? ""} />
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
                Interested in my work ? Check out my profile for more articles
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
        <Anchor
          className="afridi-dev-heading"
          id={`${slugify(mapped.text.toLowerCase())}`}
          variant="text"
          key={nanoid()}
          href={
            mapped.marks &&
            mapped.marks.filter((mark) => mark.type == "link").length > 0
              ? mapped.marks.filter((mark) => mark.type == "link")[0].attrs.href
              : null
          }
          style={{
            cursor:
              mapped.marks &&
              mapped.marks.filter((mark) => mark.type == "link").length > 0
                ? "pointer"
                : "auto",
          }}
        >
          <Title
            italic={
              mapped.marks &&
              mapped.marks.filter((mark) => mark.type == "italic").length > 0 &&
              true
            }
            underline={
              mapped.marks &&
              mapped.marks.filter((mark) => mark.type == "underline").length >
                0 &&
              true
            }
            mt="sm"
            order={level}
            className="leading-normal"
            style={{
              fontFamily:
                mapped.marks &&
                mapped.marks.filter((mark) => mark.type == "textStyle").length >
                  0 &&
                mapped.marks.filter((mark) => mark.type == "textStyle")[0].attrs
                  .fontFamily,
            }}
            mx={1}
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
            key={nanoid()}
          >
            {mapped.marks &&
            mapped.marks.filter((mark) => mark.type == "highlight").length >
              0 ? (
              <Mark>{mapped.text}</Mark>
            ) : mapped.marks &&
              mapped.marks.filter((mark) => mark.type == "code").length > 0 ? (
              <Code className="text-sm">{mapped.text}</Code>
            ) : (
              mapped.text
            )}
          </Title>
        </Anchor>
      );
    }

    if (mapped.type == "hardBreak") {
      return <p key={nanoid()} />;
    }
  });
};

export default EditorRendererHeading;
