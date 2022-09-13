/* eslint-disable react-hooks/exhaustive-deps */
import { Button, Group, LoadingOverlay, Text } from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { AfridiDevArticle } from "../../components/global/grid-cards/largeGridCard";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { format } from "date-fns";
import StudioWrapper from "../../components/global/studio/studio-wrapper";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { IconX } from "@tabler/icons";

const CreatorsStudio = () => {
  const { session, isLoading, supabaseClient } = useSessionContext();
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAuthorArticles = async () => {
    setLoading(true);
    const { error, data } = await supabaseClient
      .from("articles")
      .select(
        `
      id,
      title,
      description,
      cover,
      created_at
    `
      )
      .eq("author_id", session && session.user.id);
    //@ts-ignore
    setArticles(data);
    setLoading(false);
  };
  useEffect(() => {
    if (isLoading == false && session) {
      getAuthorArticles();
    }
  }, [isLoading]);
  return (
    <StudioWrapper path="home" subPath="all articles" loading={loading}>
      <DataTable
        className="w-full"
        withBorder
        borderRadius="sm"
        withColumnBorders
        striped
        highlightOnHover
        // provide data
        records={articles ?? []}
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
            width: 150,
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
            width: 200,
            render: ({ id }: AfridiDevArticle) => {
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
                        onCancel: () => console.log("Cancel"),
                        onConfirm: async () => {
                          const { error, data } = await supabaseClient
                            .from("articles")
                            .delete()
                            .match({
                              id: id,
                            });

                          if (!error) {
                            getAuthorArticles();
                          } else {
                            showNotification({
                              title: "Error",
                              message: error.message,
                              color: "red",
                              icon: <IconX size={18} />,
                            });
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
        fetching={loading}
      />
    </StudioWrapper>
  );
};

export default CreatorsStudio;

export const getServerSideProps = withPageAuth({
  redirectTo: "/get-started",
});
