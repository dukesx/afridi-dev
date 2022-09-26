/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  Grid,
  Input,
  Loader,
  LoadingOverlay,
  Stack,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import React, { useEffect, useState } from "react";
import { AfridiDevEditor } from "../../../components/global/editor/editorCaller";
import AppWrapper from "../../../components/global/wrapper";
import { openModal } from "@mantine/modals";
import ArticleEditSidebar from "../../../components/studio/publish/article/edit/article-edit-sidebar";
import EditorTourModal from "../../../components/global/editor/tour-modal";

const EditArticle = ({ user, data }) => {
  const { isLoading, session, error, supabaseClient } = useSessionContext();

  //
  var ref: any = React.createRef();
  const media = useMediaQuery("(min-width: 900px)", false);
  const [loading, setLoading] = useState(false);
  const { colorScheme } = useMantineColorScheme();
  //

  //
  const save = (editorRef) => {
    ref = editorRef;
  };

  const getMarkdown = () => {
    return ref.current.getInstance().getMarkdown() as string;
  };
  //

  const getTourModalValue = async () => {
    const { error, data } = await supabaseClient
      .from("authors")
      .select("article_editor_tour")
      .eq("id", user.id);

    // setArticleEditorTour(data[0].article_editor_tour);
    if (data[0].article_editor_tour) {
      openModal({
        title: "",
        size: "xl",
        withCloseButton: false,
        fullScreen: true,
        children: <EditorTourModal />,
        transitionTimingFunction: "easeInOut",
        transition: "pop",
        transitionDuration: 1000,
        closeOnClickOutside: false,
        closeOnEscape: false,
      });
    }
  };

  useEffect(() => {
    if (user) {
      getTourModalValue();
    }
  }, [user]);

  //

  var coAuthors =
    data &&
    data.co_authors_articles.map((mapped) => {
      return {
        ...mapped.authors,
        value: mapped.authors.id,
      };
    });

  return (
    <AppWrapper noPadding activeHeaderKey="" size={1400}>
      <div className="relative ml-0 sm:ml-5">
        <LoadingOverlay
          loader={
            <Stack mb={50} align="center">
              <Loader variant="bars" color="blue" />
              <Text weight={600}>Updating Article</Text>
            </Stack>
          }
          visible={loading}
          overlayBlur={2}
        />

        <Grid px={0} py="xl">
          <Grid.Col span={12} md={8}>
            <Input.Wrapper
              label="Content"
              description="Write your content here"
              required
            >
              <AfridiDevEditor
                value={data.body}
                saveData={save}
                autoFocus={false}
                className="mt-5 h-full min-h-[700px]"
                plugins
                previewStyle={"tab"}
                height="800px"
                toolbarItems="full"
              />
            </Input.Wrapper>
          </Grid.Col>

          <Grid.Col span={12} md={4}>
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
                setLoading={setLoading}
                getMarkdown={getMarkdown}
                props={{
                  title: data.title,
                  description: data.description,
                  cover: data.cover,
                  tags: data.tags.map((mapped) => mapped.title),
                  id: data.id,
                  coAuthors: coAuthors,
                }}
              />
            </Card>
          </Grid.Col>
        </Grid>
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
        body,
        tags (
          title
        ),
        co_authors_articles (
          authors (
            id,
            firstName,
            lastName,
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
