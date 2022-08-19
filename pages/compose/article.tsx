import {
  Button,
  Card,
  Grid,
  Input,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import React from "react";
import { MarkDownEditor } from "../../components/global/editorCaller";
import AppWrapper from "../../components/global/wrapper";
import ArticleComposeSidebar from "../../components/user/compose/article/sidebar";

const ArticleComposer = () => {
  //
  var ref: any = React.createRef();
  const media = useMediaQuery("(min-width: 900px)", false);
  const { colorScheme, toggleColorScheme } = useMantineColorScheme();
  //

  //
  const save = (editorRef) => {
    ref = editorRef;
  };

  const getMarkdown = () => {
    return ref.current.getInstance().getMarkdown() as string;
  };
  //

  return (
    <AppWrapper activeHeaderKey="" size="xl">
      <Grid py="xl">
        <Grid.Col span={12} lg={9} xs={8}>
          <Input.Wrapper
            label="Content"
            description="Write your content here"
            required
          >
            <MarkDownEditor
              value=""
              saveData={save}
              autoFocus={false}
              className="mt-5"
              plugins
              previewStyle={media ? "vertical" : "tab"}
              toolbarItems
            />
          </Input.Wrapper>
        </Grid.Col>

        <Grid.Col lg={3} xs={4}>
          <Card
            sx={(theme) => ({
              height: "100%",
              backgroundColor:
                colorScheme == "dark"
                  ? theme.colors.dark[6]
                  : theme.colors.gray[0],
            })}
          >
            <Text className="uppercase" pb="xl" pt="sm" weight={700} size="sm">
              Article Settings
            </Text>

            <ArticleComposeSidebar getMarkdown={getMarkdown} />
          </Card>
        </Grid.Col>
      </Grid>
    </AppWrapper>
  );
};

export default ArticleComposer;

export const getServerSideProps = withPageAuth({ redirectTo: "/get-started" });
