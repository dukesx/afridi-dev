/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  Affix,
  Card,
  Grid,
  Input,
  Loader,
  LoadingOverlay,
  MultiSelect,
  Stack,
  Text,
  Textarea,
  TextInput,
  Tooltip,
  Transition,
  useMantineColorScheme,
} from "@mantine/core";
import { useMediaQuery, useWindowScroll } from "@mantine/hooks";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
import AfridiDevEditor from "../../../components/global/editor/editor";
import AppWrapper from "../../../components/global/wrapper";
import ArticleEditSidebar from "../../../components/studio/publish/article/edit/article-edit-sidebar";
import { NextSeo } from "next-seo";
import { useForm } from "@mantine/form";
import { showNotification } from "@mantine/notifications";
import slugify from "slugify";
import { useRouter } from "next/router";
import { IconArrowDown, IconX } from "@tabler/icons";
import { forbidden_tags } from "../../../data/static/forbidden_tags";
import { AfridiDevEditorOutput } from "../../creator-studio/publish/article";
import { secondsToHms } from "../../../utils/helpers";

const EditArticle = ({ user, data }) => {
  const { isLoading, session, error, supabaseClient } = useSessionContext();

  //
  var ref: any = React.createRef();
  const [loading, setLoading] = useState(false);
  const { colorScheme } = useMantineColorScheme();
  const [editorVal, setEditorVal] = useState<AfridiDevEditorOutput>({
    data: JSON.parse(data.body),
    words: 0,
  });
  const [cover, setCover] = useState(data.cover);
  const router = useRouter();
  const [tags, setTags] = useState([]);
  const [tagsVal, setTagsVal] = useState(data.tags);
  const [tagsLoading, setTagsLoading] = useState(false);
  const [scroll, scrollTo] = useWindowScroll();
  const [scrollHeight, setScrollHeight] = useState(0);
  const [drafted, setDrafted] = useState(data.published == true ? false : true);

  var coAuthors =
    data &&
    data.co_authors_articles.map((mapped) => {
      return {
        ...mapped.authors,
        value: mapped.authors.id,
      };
    });

  const form = useForm({
    initialValues: {
      title: data.title,
      cover: data.cover,
      tags: data.tags.map((mapped) => mapped.title),
      coAuthors: coAuthors,
      content: "",
      description: data.description,
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

  const setCoverImage = (image) => {
    setCover(image);
    form.setFieldValue("cover", image);
  };
  //

  const getTags = async () => {
    setTagsLoading(true);
    const { error, data: tagsData } = await supabaseClient
      .from("tags")
      .select("title")
      .limit(10);
    //@ts-ignore
    var tagsa = [];
    data.tags.map((mapped) => tagsa.push(mapped.title));
    if (tagsData && tagsData.length > 0) {
      tagsData.map((mapped) => tagsa.push(mapped.title));
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

  useEffect(() => {
    setScrollHeight(document.documentElement.scrollHeight);
  }, []);
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
      .update({
        title: form.values.title,
        cover: form.values.cover,
        author_id: session.user.id,
        body: editorVal.data,
        description: form.values.description,
        published: draft ? false : true,
        read_time:
          editorVal.words == 0
            ? data.read_time
            : secondsToHms((editorVal.words / 265) * 60),
      })
      .eq("id", data.id)
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
        .eq("article_id", data.id);

      await Promise.all(
        form.values.tags.map(async (mapped) => {
          if (mapped) {
            const { error, data, count } = await supabaseClient
              .from("tags")
              .select("*", {
                count: "exact",
              })
              .eq("title", mapped);

            if (data && count > 0 && data[0].content_count > 0) {
              const { error: error2 } = await supabaseClient
                .from("tags")
                .update({ content_count: data[0].content_count - 1 })
                .eq("title", mapped);
            }
          }
        })
      );

      const { error: deleteCoAuthorsError } = await supabaseClient
        .from("co_authors_articles")
        .delete()
        .eq("article_id", data.id);

      if (!deleteTagError && !deleteCoAuthorsError) {
        await Promise.all(
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
                id,
                content_count
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
                });

              const { error: errored } = await supabaseClient
                .from("tags")
                .update({
                  content_count: draft
                    ? tagData[0].content_count
                    : tagData[0].content_count + 1,
                })
                .eq("title", mapped);
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
          })
        );
        if (form.values.coAuthors.length > 0) {
          await Promise.all(
            form.values.coAuthors.map(async (mapped) => {
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

        if (draft == false) {
          //
          //
          // Ping Authors
          //
          //
          //

          var pinged = [];

          await Promise.all(
            editorVal.data.content.map(async (mapped) => {
              if (mapped.type == "paragraph") {
                mapped.content &&
                  mapped.content.map(async (mapped2) => {
                    if (mapped2.type == "mention") {
                      if (mapped2.attrs.id !== session.user.id) {
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
                    }
                  });
              }
            })
          );

          /**
           *
           *
           *
           *
           */

          /**
           *
           *
           *  Revalidate Cache
           *
           */

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
              ],
            }),
          });

          const returned = await fetcher.json();

          if (returned && returned.revalidated) {
            setCover(null);
            router.push("/article/" + articleData[0].id);
          }
        }
        setLoading(false);
      }
    }
  };
  //

  return (
    <AppWrapper noPadding activeHeaderKey="" size={1400}>
      <NextSeo nofollow noindex />

      <div className="relative ml-0 sm:ml-5">
        <LoadingOverlay
          zIndex={1100}
          loader={
            <Stack className="absolute top-64 left-0 right-0" align="center">
              <Loader variant="bars" color="blue" />
              <Text weight={600}>
                {drafted ? "Saving" : "Updating"} Article
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
                variant="unstyled"
                {...form.getInputProps("title")}
                pt="md"
                placeholder="Example: Why Markdown is the future of editing experience"
                styles={{
                  input: {
                    textTransform: "capitalize",
                    fontWeight: 700,
                    fontSize: 20,
                  },
                }}
              />
              <MultiSelect
                variant="unstyled"
                value={form.values.tags}
                placeholder="Select atleast 3 tags"
                rightSection={tagsLoading ? <Loader size="xs" /> : null}
                mt="md"
                mb="xl"
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
                zIndex={5000}
                maxDropdownHeight={160}
                onChange={(value) => {
                  form.setFieldValue("tags", value);
                }}
                error={form.errors.tags}
                styles={{
                  input: {
                    fontWeight: 600,
                    fontSize: 16,
                  },
                  dropdown: {
                    zIndex: 5000,
                  },
                  searchInput: {
                    fontWeight: 600,
                    fontSize: 15,
                  },
                }}
              />
              <Input.Wrapper
                label="Content"
                description="Write your content here"
                required
              >
                <AfridiDevEditor value={editorVal} setValue={setEditorVal} />
              </Input.Wrapper>
            </Grid.Col>

            <Grid.Col className="h-screen sticky top-20" span={12} md={4}>
              <Card
                sx={(theme) => ({
                  height: "100%",
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

                <ArticleEditSidebar
                  callSubmit={callSubmit}
                  draft={drafted}
                  receivedCoAuthors={coAuthors}
                  setLoading={setLoading}
                  cover={cover}
                  setCover={setCover}
                  form={form}
                  setCoverImage={setCoverImage}
                />
              </Card>
            </Grid.Col>
          </Grid>
        </form>
      </div>
    </AppWrapper>
  );
};

export default EditArticle;

export const getServerSideProps = withPageAuth({
  redirectTo: "/get-started",
  async getServerSideProps(ctx, supabase) {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    const id = ctx.params.id;
    const { data, error } = await supabase
      .from("articles")
      .select(
        `
        id,
        title,
        description,
        cover,
        author_id,
        read_time,
        published,
        body,
        tags (
          title
        ),
        co_authors_articles (
          authors (
            id,
            full_name,
            dp
          )
        )
        `
      )
      .eq("id", id);

    if (data && data.length > 0) {
      if (
        data[0].author_id == session.user.id ||
        //@ts-ignore
        data[0].co_authors_articles.filter(
          (mapped) => mapped.authors.id == session.user.id
        ).length > 0
      ) {
        return {
          props: {
            data: data[0],
          },
        };
      } else {
        return {
          redirect: {
            destination: "/unauthorized",
            permanent: false,
          },
        };
      }
    } else {
      return {
        props: {},
      };
    }
  },
});
