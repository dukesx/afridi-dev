/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  Avatar,
  Button,
  Code,
  CopyButton,
  Group,
  Input,
  Loader,
  Modal,
  MultiSelect,
  Stack,
  Text,
  Textarea,
  TextInput,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals, openContextModal, openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import {
  IconCheck,
  IconCloudUpload,
  IconCopy,
  IconExternalLink,
  IconX,
} from "@tabler/icons";
import { useRouter } from "next/router";
import React, { createRef, forwardRef, Fragment, useEffect } from "react";
import { useState } from "react";
import { forbidden_tags } from "../../../../../data/static/forbidden_tags";
import AfridiImage from "../../../../global/afridi-image";
import AfridiImageUploader, {
  ImageUploaderType,
} from "../../../../global/image_uploader";

//

interface ArticleEditSidebarProps {
  getMarkdown: () => string;
  setLoading: Function;
  props: {
    title: string;
    description: string;
    tags: Array<any>;
    cover: string;
    id: string;
    coAuthors: Array<any>;
  };
}

//
const ArticleEditSidebar = ({
  getMarkdown,
  setLoading,
  props,
}: ArticleEditSidebarProps) => {
  //
  const { isLoading, session, error, supabaseClient } = useSessionContext();
  const theme = useMantineTheme();
  const [cover, setCover] = useState(props.cover);
  var openRef: any = createRef();
  const [tagsLoading, setTagsLoading] = useState(false);
  const router = useRouter();
  const [coAuthorsLoading, setCoAuthorsLoading] = useState(false);
  const [coAuthors, setCoAuthors] = useState([]);

  const form = useForm({
    initialValues: {
      tags: props.tags,
      content: "",
      title: props.title,
      description: props.description,
      cover: props.cover,
      coAuthors: props.coAuthors,
    },

    validate: {
      tags: (value) =>
        value.length <= 0
          ? "Tags cannot be empty"
          : value.length > 0 && value.length < 3
          ? "Please select atleast 3 tags"
          : null,
      title: (val) =>
        !val || val.length <= 0 ? "Title cannot be empty" : null,
      description: (val) =>
        !val || val.length <= 0 ? "Description cannot be empty" : null,
      cover: (val) => (val.length <= 0 ? "Cover image cannot be empty" : null),
    },
  });
  //

  const [tags, setTags] = useState([]);
  const [tagsVal, setTagsVal] = useState(props.tags);

  const setCoverImage = (image) => {
    setCover(image);
    form.setFieldValue("cover", image);
  };
  //

  const getTags = async () => {
    setTagsLoading(true);
    const { error, data } = await supabaseClient
      .from("tags")
      .select("title")
      .limit(10);
    var tagsa = [...props.tags];
    if (data && data.length > 0) {
      data.map((mapped) => tagsa.push(mapped.title));
      setTags(tagsa);
      setTagsLoading(false);
    }
  };

  useEffect(() => {
    if (session.user) {
      getTags();
    }
  }, [session]);

  interface CoAuthorsItemProps extends React.ComponentPropsWithoutRef<"div"> {
    dp: string;
    full_name: string;
  }

  const CoAuthorCustomSelectComponent = forwardRef<
    HTMLDivElement,
    CoAuthorsItemProps
  >(({ dp, full_name, ...others }: CoAuthorsItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group spacing="xs" className="w-full mr-4" noWrap>
        <Avatar radius="xl" className="rounded-full">
          {dp && <AfridiImage height={30} width={30} path={dp ?? null} />}
        </Avatar>

        <Stack>
          <Text>{full_name} </Text>
        </Stack>
      </Group>
    </div>
  ));

  return (
    <form
      onSubmit={form.onSubmit(async (val) => {
        setLoading(true);
        var markdown = getMarkdown();

        if (!markdown || markdown.length <= 0) {
          setLoading(false);
          openModal({
            title: (
              <Text weight={700} color="red">
                Could Not Submit Article{" "}
                <span className="text-md ml-1">😓 ❌ 👇</span>
              </Text>
            ),

            children: (
              <Fragment>
                <Text mb="xl" size="sm" color="dimmed" weight={400}>
                  <b className="mr-[0.3px]">Reason:</b> You cannot submit an
                  empty article. Please ensure that article has enough content
                  before submitting
                </Text>
                <Button color="red" fullWidth onClick={closeAllModals} mt="md">
                  OK
                </Button>
              </Fragment>
            ),
          });
        } else {
          const { error, data: articleData } = await supabaseClient
            .from("articles")
            .update({
              title: val.title,
              description: val.description,
              cover: val.cover,
              author_id: session.user.id,
              body: markdown,
            })
            .eq("id", props.id)
            .select();

          if (error) {
            setLoading(false);
            showNotification({
              title: "Error publishing article",
              color: "red",
              icon: <IconX />,
              message: error.message,
            });
          } else {
            const { error: deleteTagError } = await supabaseClient
              .from("articles_tags")
              .delete()
              .eq("article_id", props.id);

            const { error: deleteCoAuthorsError } = await supabaseClient
              .from("co_authors_articles")
              .delete()
              .eq("article_id", props.id);

            if (!deleteTagError && !deleteCoAuthorsError) {
              val.tags.map(async (mapped) => {
                const {
                  error,
                  data: tagData,
                  count,
                } = await supabaseClient
                  .from("tags")
                  .select(
                    `
                title,
                id
                `,
                    {
                      count: "exact",
                    }
                  )
                  .match({
                    title: mapped,
                  });

                if (count > 0) {
                  const { data: finalData } = await supabaseClient
                    .from("articles_tags")
                    .insert({
                      title: mapped.title,
                      tag_id: tagData[0].id,
                      article_id: articleData[0].id,
                    });
                } else {
                  const { data: insertedTagData } = await supabaseClient
                    .from("tags")
                    .insert({
                      title: mapped,
                    })
                    .select();
                  const { error: tag2Error, data: tag2Data } =
                    await supabaseClient.from("articles_tags").insert({
                      title: mapped.title,
                      tag_id: insertedTagData[0].id,
                      article_id: articleData[0].id,
                    });
                }
              });
              console.log(val.coAuthors);
              if (val.coAuthors.length > 0) {
                await Promise.all(
                  val.coAuthors.map(async (mapped) => {
                    if (mapped !== articleData[0].author_id) {
                      const { error: AddCoAuthorsError } = await supabaseClient
                        .from("co_authors_articles")
                        .insert({
                          article_id: articleData[0].id,
                          author_id: mapped.id ? mapped.id : mapped,
                        });
                    }
                  })
                );
              }

              const fetcher = await fetch("/api/revalidate", {
                method: "POST",
                headers: {
                  "content-type": "application/json",
                  accept: "application/json",
                },
                body: JSON.stringify({
                  paths: [
                    `/article/${articleData[0].id}`,
                    `/author/${articleData[0].author_id}`,
                    `/`,
                  ],
                }),
              });

              const returned = await fetcher.json();

              if (returned && returned.revalidated) {
                setCover(null);
                router.push("/article/" + articleData[0].id);
              }
            }
          }
        }
      })}
    >
      <Input.Wrapper
        pb="xl"
        label="Title"
        description="Pick something unique 🤗"
        required
      >
        <TextInput
          {...form.getInputProps("title")}
          pt="md"
          placeholder="Example: Why Markdown is the future of editing experience"
          styles={{
            input: {
              textTransform: "capitalize",
            },
          }}
        />
      </Input.Wrapper>

      <Input.Wrapper
        pb="xl"
        label="Description"
        description="The overall summary"
        required
      >
        <Textarea
          {...form.getInputProps("description")}
          pt="md"
          minRows={4}
          placeholder="TL;DR, Markdown is the future because it is parsable in a very distinct but consistent language standard called AST"
        />
      </Input.Wrapper>

      <Input.Wrapper
        styles={{
          label: {
            fontSize: 12.5,
          },
        }}
        label="Co-Authors"
        description="Update Collaborators"
      >
        <MultiSelect
          placeholder="Search and Collaborate with Others"
          defaultValue={props.coAuthors.map((mapped) => {
            return mapped.value;
          })}
          rightSection={coAuthorsLoading ? <Loader size="xs" /> : null}
          mt="md"
          mb="md"
          searchable
          valueComponent={CoAuthorCustomSelectComponent}
          itemComponent={CoAuthorCustomSelectComponent}
          filter={(value, selected, item) =>
            !selected &&
            item.full_name.toLowerCase().includes(value.toLowerCase().trim())
          }
          data={coAuthors.length > 0 ? coAuthors : props.coAuthors}
          onSearchChange={async (query) => {
            setCoAuthorsLoading(true);
            const { error, data, count } = await supabaseClient
              .from("authors")
              .select(
                `
              full_name,
              id,
              dp
              `,
                { count: "exact" }
              )
              .ilike("full_name", `%${query}%`);

            if (data && data.length > 0) {
              if (count <= 0) {
              } else {
                setCoAuthorsLoading(false);
                var newMap = data.map((mapped) => {
                  var filtered = coAuthors.filter(
                    (filter) => filter.id == mapped.id
                  );

                  if (filtered.length == 0) {
                    return mapped;
                  }
                });
                var coauthors = [...coAuthors];
                newMap.map((mapped) => {
                  if (mapped !== undefined) {
                    coauthors.push({
                      ...mapped,
                      value: mapped.id,
                      id: mapped.id,
                    });
                  }
                });
                setCoAuthors(coauthors);
              }
            }
          }}
          maxDropdownHeight={160}
          onChange={(value) => form.setFieldValue("coAuthors", value)}
          error={form.errors.coAuthors}
        />
      </Input.Wrapper>

      <Input.Wrapper
        styles={{
          label: {
            fontSize: 12.5,
          },
        }}
        label="Tags (type to create your own)"
        description="For Website search, Tags Subscription and SEO"
        required
      >
        <MultiSelect
          value={form.values.tags}
          rightSection={tagsLoading ? <Loader size="xs" /> : null}
          mt="md"
          mb="md"
          searchable
          data={tags.length <= 0 ? [] : tags}
          creatable
          getCreateLabel={(query) =>
            !forbidden_tags.includes(query.toLowerCase())
              ? `+ Create #${query}`
              : `This tag is not allowed`
          }
          onCreate={(query) => {
            if (
              !tags.includes(query) &&
              !forbidden_tags.includes(query.toLowerCase())
            ) {
              var taga = tags;
              taga.push(query);
              setTags(taga);
              return query;
            }
          }}
          onSearchChange={async (query) => {
            if (
              !tags.includes(query) &&
              !forbidden_tags.includes(query.toLowerCase())
            ) {
              setTagsLoading(true);
              const { error, data, count } = await supabaseClient
                .from("tags")
                .select("title", { count: "exact" })
                .match({ title: query });

              if (data) {
                setTagsLoading(false);
                if (count <= 0) {
                } else {
                  var taga = [...tags];
                  taga.push(data[0].title);
                  setTags(taga);
                }
              }
            }
          }}
          maxDropdownHeight={160}
          onChange={(value) => {
            form.setFieldValue("tags", value);
          }}
          error={form.errors.tags}
        />
      </Input.Wrapper>

      <Input.Wrapper pb="xl" label="Cover" required error={form.errors.cover}>
        <AfridiImageUploader
          px={1}
          py={1}
          placeholder={
            cover ? (
              <AfridiImage
                fillImage
                className="max-w-[912px] w-full mx-auto h-full"
                height={200}
                width={300}
                path={cover}
              />
            ) : null
          }
          className={
            form.errors.cover
              ? "border border-dashed border-2 border-red-400"
              : ""
          }
          height={230}
          type={ImageUploaderType.NONE}
          theme={theme}
          user={session.user}
          setImage={setCoverImage}
          openRef={openRef}
        />
      </Input.Wrapper>

      <Button
        styles={{
          label: {
            fontSize: 13,
          },
        }}
        type="submit"
        leftIcon={<IconCloudUpload size={20} />}
        color="blue"
        mt={0}
        fullWidth
      >
        Update Article
      </Button>
    </form>
  );
};

export default ArticleEditSidebar;
