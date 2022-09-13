/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  Grid,
  Input,
  Loader,
  LoadingOverlay,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { openModal } from "@mantine/modals";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import React, { useEffect, useState } from "react";
import { MarkDownEditor } from "../../../components/global/editor/editorCaller";
import EditorTourModal from "../../../components/global/editor/tour-modal";
import AppWrapper from "../../../components/global/wrapper";
import ArticleComposeSidebar from "../../../components/user/article/compose/sidebar";

const ArticleComposer = () => {
  //
  var ref: any = React.createRef();
  const media = useMediaQuery("(min-width: 900px)", false);
  const [loading, setLoading] = useState(false);
  const [articleEditorTour, setArticleEditorTour] = useState(false);
  const { isLoading, session, error, supabaseClient } = useSessionContext();
  const { colorScheme } = useMantineColorScheme();
  const [loadingSetTour, setLoadingSetTour] = useState(false);
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
      .eq("id", session.user.id);

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
    if (session.user) {
      getTourModalValue();
    }
  }, [session]);

  //

  return (
    <AppWrapper noPadding activeHeaderKey="" size={1400}>
      <div className="relative ml-0 sm:ml-5">
        <LoadingOverlay
          loader={
            <Stack mb={50} align="center">
              <Loader variant="bars" color="blue" />
              <Text weight={600}>Publishing Article</Text>
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
              <MarkDownEditor
                value=""
                saveData={save}
                autoFocus={false}
                className="mt-5 h-full min-h-[700px]"
                plugins
                previewStyle={"tab"}
                height="800px"
                toolbarItems
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

              <ArticleComposeSidebar
                setLoading={setLoading}
                getMarkdown={getMarkdown}
              />
            </Card>
          </Grid.Col>
        </Grid>
      </div>
    </AppWrapper>
  );
};

export default ArticleComposer;

export const getServerSideProps = withPageAuth({ redirectTo: "/get-started" });
