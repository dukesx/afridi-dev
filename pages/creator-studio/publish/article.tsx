/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  Center,
  Grid,
  Input,
  Loader,
  LoadingOverlay,
  MultiSelect,
  Stack,
  Text,
  Textarea,
  TextInput,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { useMediaQuery } from "@mantine/hooks";
import { closeAllModals, openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { IconX } from "@tabler/icons";
import { Editor } from "@tiptap/react";
import { NextSeo } from "next-seo";
import dynamic from "next/dynamic";
import { useRouter } from "next/router";
import React, { Fragment, Suspense, useEffect, useState } from "react";
import slugify from "slugify";
import TextEditor from "../../../components/global/editor/editor";
import AppWrapper from "../../../components/global/wrapper";
import ArticleComposeSidebar from "../../../components/studio/publish/article/compose/article-compose-sidebar";
import { forbidden_tags } from "../../../data/static/forbidden_tags";
import { secondsToHms } from "../../../utils/helpers";

export interface AfridiDevEditorOutput {
  data: any;
  words: number;
}
const ArticleComposer = () => {
  //
  var ref: any = React.createRef();
  const media = useMediaQuery("(min-width: 700px)", true, {
    getInitialValueInEffect: false,
  });
  const [loading, setLoading] = useState(false);
  const { session, error, supabaseClient } = useSessionContext();
  const { colorScheme } = useMantineColorScheme();
  const [editorVal, setEditorVal] = useState<AfridiDevEditorOutput>(null);
  const router = useRouter();
  const [tagsLoading, setTagsLoading] = useState(false);
  const [drafted, setDrafted] = useState(false);

  const form = useForm({
    initialValues: {
      tags: [],
      content: "",
      coAuthors: [],
      title: "",
      cover: "",
      description: "",
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

  const [cover, setCover] = useState(null);

  const setCoverImage = (image) => {
    setCover(image);
    form.setFieldValue("cover", image);
  };

  //

  //
  const save = (editorRef) => {
    ref = editorRef;
  };

  const [tags, setTags] = useState([]);

  //

  const getTags = async () => {
    setTagsLoading(true);
    const { error, data } = await supabaseClient
      .from("tags")
      .select("title")
      .limit(10)
      .order("content_count", {
        ascending: false,
      });
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
  //
  //
  //

  const callSubmit = async ({ draft }) => {
    if (draft) {
      setDrafted(true);
    } else {
      setDrafted(false);
    }
    setLoading(true);
    const { error, data: articleData } = await supabaseClient
      .from("articles")
      .insert({
        title: form.values.title,
        cover: form.values.cover,
        author_id: session.user.id,
        body: editorVal.data,
        read_time: secondsToHms((editorVal.words / 265) * 60),
        description: form.values.description,
        published: draft == true ? false : true,
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
      form.values.tags.map(async (mapped) => {
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
              content_count: draft
                ? tagData[0].content_count
                : tagData[0].content_count + 1,
            })
            .eq("id", tagData[0].id);
        } else {
          const { data: insertedTagData } = await supabaseClient
            .from("tags")
            .insert({
              title: slugify(mapped),
              content_count: draft ? 0 : 1,
            })
            .select();
          const { error: tag2Error, data: tag2Data } = await supabaseClient
            .from("articles_tags")
            .insert({
              tag_id: insertedTagData[0].id,
              article_id: articleData[0].id,
            });
        }
        const fetcher = await fetch("/api/revalidate", {
          method: "POST",
          headers: {
            "content-type": "application/json",
            accept: "application/json",
          },
          body: JSON.stringify({
            path: `/tags/${mapped}`,
          }),
        });
        const returned = await fetcher.json();
      });
      const { error } = await supabaseClient
        .from("authors")
        .update({
          //@ts-ignore
          content_count: articleData[0].authors.content_count + 1,
        })
        .eq("id", session.user.id);
      //
      //
      //
      //
      //
      // Add CoAuthors
      //
      //
      if (form.values.coAuthors.length > 0) {
        await Promise.all(
          form.values.coAuthors.map(async (mapped) => {
            if (mapped !== articleData[0].author_id) {
              const { error: AddCoAuthorsError } = await supabaseClient
                .from("co_authors_articles")
                .insert({
                  article_id: articleData[0].id,
                  author_id: mapped,
                });
            }
          })
        );
      }
      //
      //

      if (draft == false) {
        //Ping Mentioned Users
        var pinged = [];

        await Promise.all(
          editorVal.data.content.map(async (mapped) => {
            if (mapped.type == "paragraph") {
              mapped.content &&
                mapped.content.map(async (mapped2) => {
                  if (mapped2.type == "mention") {
                    if (!pinged.includes(mapped2.attrs.id)) {
                      pinged.push(mapped2.attrs.id);

                      const { data: currentUserData } = await supabaseClient
                        .from("authors")
                        .select("full_name")
                        .eq("id", session.user.id);
                      const { error } = await supabaseClient
                        .from("user_notifications")
                        .insert({
                          author_id: mapped2.attrs.id,
                          message: `You were mentioned in the article "${form.values.title}" by ${currentUserData[0].full_name}`,
                          link: `/article/${articleData[0].id}`,
                        });
                    }
                  }
                });
            }
          })
        );
        //
        //
        //

        //
        // Revalidate
        //
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
              "/",
              "/tags",
            ],
          }),
        });
        const returned = await fetcher.json();
        setCover(null);
        router.push("/article/" + articleData[0].id);
      }
      router.push("/article/edit/" + articleData[0].id);
      setLoading(false);
    }
  };

  //
  //
  //
  //

  //
  return media == false ? (
    <AppWrapper noPadding activeHeaderKey="" size={1400}>
      <NextSeo nofollow noindex />

      <Center className="h-[600px]">
        <Stack align="center">
          <Title order={1} weight={700}>
            Ooops
          </Title>
          <Text size="sm" color="dimmed" weight={400}>
            Composer is not available for small devices yet
          </Text>
        </Stack>
      </Center>
    </AppWrapper>
  ) : (
    <AppWrapper noPadding activeHeaderKey="" size={1400}>
      <div className="ml-0 sm:ml-5 relative">
        <LoadingOverlay
          zIndex={1100}
          loader={
            <Stack className="absolute top-64 left-0 right-0" align="center">
              <Loader variant="bars" color="blue" />
              <Text weight={600}>
                {drafted ? "Saving" : "Publishing"} Article
              </Text>
            </Stack>
          }
          visible={loading}
          overlayBlur={2}
        />

        <form
          onSubmit={form.onSubmit(async (val) => {
            callSubmit({ draft: false });
          })}
        >
          <Grid px={0} py="xl">
            <Grid.Col span={12} md={8}>
              <Textarea
                minRows={1}
                autosize
                pb="md"
                required
                variant="unstyled"
                {...form.getInputProps("title")}
                pt="md"
                placeholder="Example: Why Typescript is the next-gen stack"
                styles={{
                  input: {
                    textTransform: "capitalize",
                    fontSize: 20,
                    fontWeight: 700,
                  },
                }}
              />

              <MultiSelect
                required
                placeholder="Select atleast 3 tags"
                variant="unstyled"
                rightSection={tagsLoading ? <Loader size="xs" /> : null}
                mb="xl"
                zIndex={2000}
                searchable
                data={tags.length <= 0 ? [] : tags}
                creatable
                styles={{
                  input: {
                    fontWeight: 700,
                  },
                  searchInput: {
                    fontWeight: 600,
                    textTransform: "capitalize",
                  },
                }}
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

              <Input.Wrapper
                label="Content"
                description="Write your content here"
                required
              >
                <Suspense
                  fallback={
                    <Stack
                      style={{
                        height: 500,
                      }}
                      align="center"
                    >
                      <Text>Loading Editor</Text>
                      <Loader size="sm" variant="bars" />
                    </Stack>
                  }
                >
                  <TextEditor value={editorVal} setValue={setEditorVal} />
                </Suspense>
              </Input.Wrapper>
            </Grid.Col>

            <Grid.Col
              className="h-screen sticky top-20"
              span={12}
              md={4}
              xs={12}
            >
              <Card
                sx={(theme) => ({
                  backgroundColor:
                    colorScheme == "dark"
                      ? theme.colors.dark[6]
                      : theme.colors.gray[0],
                })}
              >
                <Text
                  className="uppercase"
                  pb="xl"
                  pt="sm"
                  weight={700}
                  size="sm"
                >
                  Article Settings
                </Text>
                {session && (
                  <ArticleComposeSidebar
                    callSubmit={callSubmit}
                    setLoading={setLoading}
                    cover={cover}
                    form={form}
                    setCover={setCover}
                    setCoverImage={setCoverImage}
                  />
                )}
              </Card>
            </Grid.Col>
          </Grid>
        </form>
      </div>
    </AppWrapper>
  );
};

export default ArticleComposer;

export const getServerSideProps = withPageAuth({ redirectTo: "/get-started" });
