/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  Center,
  Grid,
  Input,
  Loader,
  LoadingOverlay,
  Stack,
  Text,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { NextSeo } from "next-seo";
import React, { useEffect, useState } from "react";
import { AfridiDevEditor } from "../../../components/global/editor/editorCaller";
import AppWrapper from "../../../components/global/wrapper";
import ArticleComposeSidebar from "../../../components/studio/publish/article/compose/article-compose-sidebar";
const ArticleComposer = () => {
  //
  var ref: any = React.createRef();
  const media = useMediaQuery("(min-width: 700px)", false);
  const [loading, setLoading] = useState(false);
  const { isLoading, session, error, supabaseClient } = useSessionContext();
  const { colorScheme } = useMantineColorScheme();
  const [drawer, setDrawer] = useState(false);

  //

  //
  const save = (editorRef) => {
    ref = editorRef;
  };

  const getMarkdown = () => {
    return ref.current.getInstance().getMarkdown() as string;
  };
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
              <AfridiDevEditor
                value=""
                saveData={save}
                autoFocus={false}
                className="mt-5 h-full min-h-[400px]"
                plugins
                previewStyle={"tab"}
                height="500px"
                toolbarItems="full"
              />
            </Input.Wrapper>
          </Grid.Col>

          <Grid.Col span={12} md={4} xs={12}>
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
