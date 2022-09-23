/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  Button,
  CheckIcon,
  Code,
  ColorSwatch,
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
import React, { createRef, Fragment, useEffect } from "react";
import { useState } from "react";
import { forbidden_tags } from "../../../../../data/static/forbidden_tags";
import AfridiImage from "../../../../global/afridi-image";
import AfridiImageUploader, {
  ImageUploaderType,
} from "../../../../global/image_uploader";
//

interface ArticleComposerSidebarProps {
  getMarkdown: () => string;
  setLoading: Function;
}

//
const ArticleComposeSidebar = ({
  getMarkdown,
  setLoading,
}: ArticleComposerSidebarProps) => {
  //
  const { isLoading, session, error, supabaseClient } = useSessionContext();
  const theme = useMantineTheme();
  const [cover, setCover] = useState(null);
  var openRef: any = createRef();
  const [tagsLoading, setTagsLoading] = useState(false);
  const router = useRouter();
  const [editorVal, setEditorVal] = useState("");

  console.log(editorVal);

  const form = useForm({
    initialValues: {
      tags: [],
      content: "",
      title: "",
      description: "",
      cover: "",
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
      .limit(5);
    var tagsa = [];
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
            .insert({
              title: val.title,
              description: val.description,
              cover: val.cover,
              author_id: session.user.id,
              body: markdown,
            })
            .select(
              `
              id,
              author_id,
              authors!articles_author_id_fkey
              (
                  id,
                  content_count
               )
              `
            );

          if (error) {
            setLoading(false);
            showNotification({
              title: "Error publishing article",
              color: "red",
              icon: <IconX />,
              message: error.message,
            });
          } else {
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
                content_count,
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
                    tag_id: tagData[0].id,
                    article_id: articleData[0].id,
                  })
                  .select();

                const { error: increaseCountError } = await supabaseClient
                  .from("tags")
                  .update({
                    content_count: tagData[0].content_count + 1,
                  })
                  .eq("id", tagData[0].id);
              } else {
                const { data: insertedTagData } = await supabaseClient
                  .from("tags")
                  .insert({
                    title: mapped,
                    content_count: 1,
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

            const { error } = await supabaseClient
              .from("authors")
              .update({
                //@ts-ignore
                content_count: articleData[0].authors.content_count + 1,
              })
              .eq("id", session.user.id);

            const fetcher = await fetch("/api/revalidate", {
              method: "POST",
              headers: {
                "content-type": "application/json",
                accept: "application/json",
              },
              body: JSON.stringify({
                paths: [
                  `/article/ + ${articleData[0].id}`,
                  `/author/${articleData[0].author_id}`,
                  `/`,
                ],
              }),
            });

            const returned = await fetcher.json();

            if (returned && returned.revalidated) {
              setLoading(false);
              form.reset();
              setCover(null);
              router.push("/article/" + articleData[0].id);
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
        label="Tags (type to create your own)"
        description="For Website search, Tags Subscription and SEO"
        required
      >
        <MultiSelect
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
          onChange={(value) => form.setFieldValue("tags", value)}
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
        Publish Article
      </Button>
    </form>
  );
};

export default ArticleComposeSidebar;
