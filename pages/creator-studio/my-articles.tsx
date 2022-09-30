/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Group, LoadingOverlay, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { AfridiDevArticle } from "../../components/article/grid-cards/large-article-card";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { format } from "date-fns";
import StudioWrapper from "../../components/studio/studio-wrapper";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";
import { NextSeo } from "next-seo";

const CreatorsStudio = ({ authored }) => {
  const { session, isLoading, supabaseClient } = useSessionContext();
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  const [tableLoading, setTableLoading] = useState(false);
  const [page, setPage] = useState(1);
  const [totalRecords, setTotalRecords] = useState(null);
  const PAGE_SIZE = 10;
  const getAuthorArticles = async () => {
    setLoading(true);
    const { error, data, count } = await supabaseClient
      .from("articles")
      .select(
        `
      id,
      title,
      description,
      cover,
      created_at,
     tags (
        title,
        content_count,
        id
      )
    `,
        {
          count: "exact",
        }
      )
      .eq("author_id", session && session.user.id)
      .limit(PAGE_SIZE);
    //@ts-ignore
    setArticles(data);
    setTotalRecords(count);
    setLoading(false);
    setTableLoading(false);
  };

  const loadMore = async (page) => {
    setTableLoading(true);
    const currentIndex = (page - 1) * PAGE_SIZE;
    const { data, error } = await supabaseClient
      .from("articles")
      .select(
        `
      id,
      title,
      description,
      cover,
      created_at,
      tags (
        title,
        content_count,
        id
      )
    `
      )
      .range(currentIndex, currentIndex + PAGE_SIZE)
      .limit(PAGE_SIZE)
      .eq("author_id", session && session.user.id);
    setArticles(data);
    setTableLoading(false);
  };

  useEffect(() => {
    loadMore(page);
  }, [page]);
  useEffect(() => {
    if (isLoading == false && session) {
      getAuthorArticles();
    }
  }, [isLoading]);
  return (
    <StudioWrapper
      authored={authored}
      path="home"
      subPath="My Articles"
      loading={loading}
    >
      <NextSeo nofollow noindex />

      <DataTable
        className="w-full"
        minHeight={400}
        withBorder={false}
        borderRadius="md"
        loaderVariant="bars"
        loaderBackgroundBlur={5}
        withColumnBorders
        horizontalSpacing="lg"
        striped={false}
        highlightOnHover
        // provide data
        records={articles ?? []}
        recordsPerPage={PAGE_SIZE}
        page={page}
        totalRecords={totalRecords}
        onPageChange={(p) => setPage(p)}
        // define columns
        columns={[
          {
            accessor: "title",
            title: "Title",
            render: ({ title }: AfridiDevArticle) => (
              <Text className="max-w-[400px]" lineClamp={2}>
                {title}
              </Text>
            ),
            width: 350,
          },
          {
            accessor: "description",
            title: "Description",
            width: 350,
            render: ({ description }: AfridiDevArticle) => (
              <Text className="max-w-[400px]" lineClamp={2}>
                {description}
              </Text>
            ),
          },
          {
            accessor: "created_at",
            title: "Created",
            width: 200,
            render: ({ created_at }: AfridiDevArticle) => {
              return (
                <Text>
                  {format(new Date(created_at), "dd-MMMM-yyyy").toString()}
                </Text>
              );
            },
          },
          {
            accessor: "id",
            title: "Actions",
            width: 250,
            render: ({ id, tags }: AfridiDevArticle) => {
              return (
                <Group>
                  <Button
                    component="a"
                    href={`/article/edit/${id}`}
                    color="blue"
                    radius="md"
                    variant="light"
                  >
                    Edit
                  </Button>

                  <Button
                    onClick={() => {
                      openConfirmModal({
                        title: "Confirm Deletion",
                        children: (
                          <Text size="sm">
                            Are you sure you want to delete this article ? this
                            action <b className="underline">cannot</b> be
                            reversed.
                          </Text>
                        ),
                        confirmProps: {
                          color: "red",
                        },
                        labels: { confirm: "Confirm", cancel: "Cancel" },
                        onCancel: () => {},
                        onConfirm: async () => {
                          setTableLoading(true);

                          const { error: deleteTagsError } =
                            await supabaseClient
                              .from("articles_tags")
                              .delete()
                              .match({
                                article_id: id,
                              });

                          await Promise.all(
                            tags.map(async (mapped) => {
                              const { error } = await supabaseClient
                                .from("tags")
                                .update({
                                  content_count: mapped.content_count - 1,
                                })
                                .eq("id", mapped.id);
                            })
                          );

                          const { error: deleteBookmarksError } =
                            await supabaseClient
                              .from("bookmarks")
                              .delete()
                              .match({
                                article_id: id,
                              });

                          const { error: deleteViewsError } =
                            await supabaseClient
                              .from("article_views")
                              .delete()
                              .match({
                                article_id: id,
                              });

                          const { error: coAuthorsError } = await supabaseClient
                            .from("co_authors_articles")
                            .delete()
                            .eq("article_id", id);

                          const { error: appreciationsError } =
                            await supabaseClient
                              .from("appreciations")
                              .delete()
                              .eq("reacted_article", id);

                          if (
                            !deleteTagsError &&
                            !deleteBookmarksError &&
                            !deleteViewsError &&
                            !coAuthorsError &&
                            !appreciationsError
                          ) {
                            const { error, data } = await supabaseClient
                              .from("articles")
                              .delete()
                              .match({
                                id: id,
                              }).select(`
                            id,
                            author_id,
                            authors!articles_author_id_fkey
                             (
                              id,
                              content_count
                            )
                            `);

                            if (!error) {
                              const { error: decreaseAuthorCount } =
                                await supabaseClient
                                  .from("authors")
                                  .update({
                                    content_count:
                                      //@ts-ignore
                                      data[0].authors.content_count - 1,
                                  })
                                  .eq(
                                    "id",
                                    //@ts-ignore
                                    data[0].authors.id
                                  );

                              if (!decreaseAuthorCount) {
                                const fetcher = await fetch("/api/revalidate", {
                                  method: "POST",
                                  headers: {
                                    "content-type": "application/json",
                                    accept: "application/json",
                                  },
                                  body: JSON.stringify({
                                    paths: [
                                      `/article/ + ${data[0].id}`,
                                      `/author/${data[0].author_id}`,
                                      `/`,
                                    ],
                                  }),
                                });

                                const returned = await fetcher.json();

                                if (returned && returned.revalidated) {
                                  getAuthorArticles();
                                }
                              } else {
                                showNotification({
                                  title: "Error",
                                  message: error.message,
                                  color: "red",
                                  icon: <IconX size={18} />,
                                });
                              }
                            }
                          }
                        },
                      });
                    }}
                    color="red"
                    radius="md"
                    variant="subtle"
                  >
                    Delete
                  </Button>
                </Group>
              );
            },
          },
        ]}
        fetching={tableLoading}
      />
    </StudioWrapper>
  );
};

export default CreatorsStudio;

export const getServerSideProps = withPageAuth({
  redirectTo: "/get-started",
  getServerSideProps: async ({ req, res }, supabase) => {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (!session) {
      return { props: {} };
    }
    const { data, error } = await supabase
      .from("articles")
      .select("id")
      .eq("author_id", session.user.id);

    if (data && data.length > 0) {
      return {
        props: {
          authored: true,
        },
      };
    } else {
      return {
        props: {
          authored: false,
        },
      };
    }
  },
});
