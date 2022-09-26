import {
  Button,
  Drawer,
  Loader,
  LoadingOverlay,
  Stack,
  Text,
} from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import { Session, SupabaseClient } from "@supabase/supabase-js";
import { useState } from "react";
import { AfridiDevEditor } from "../../../global/editor/editorCaller";

interface ArticleCommentEditorDrawerProps {
  editorDrawer: boolean;
  setEditorDrawer: Function;
  setCommentId: Function;
  commentId: any;
  article_id: string;
  setCommentEditorRef: Function;
  article_title: string;
  getMarkdown: Function;
  supabaseClient: SupabaseClient;
  session: Session;
  getComments: Function;
  scrollToComment: any;
}

const ArticleCommentEditorDrawer = ({
  editorDrawer,
  setEditorDrawer,
  setCommentId,
  commentId,
  article_id,
  setCommentEditorRef,
  article_title,
  getMarkdown,
  supabaseClient,
  session,
  scrollToComment,
  getComments,
}: ArticleCommentEditorDrawerProps) => {
  const [sendingReply, setSendingReply] = useState(false);
  return (
    <Drawer
      position="bottom"
      opened={editorDrawer}
      onClose={() => {
        setEditorDrawer(false);
        setCommentId(null);
      }}
      padding="xl"
      title={
        commentId && commentId.type !== "comment" ? (
          <Text size="sm">
            Replying to{" "}
            <b className="">
              {commentId.author.firstName + " " + commentId.author.lastName}
            </b>
          </Text>
        ) : (
          <Text size="sm">
            Replying to <b>{article_title}</b>
          </Text>
        )
      }
      styles={{
        drawer: {
          maxWidth: 800,
          marginLeft: "auto",
          marginRight: "auto",
          borderRadius: "12px 12px 0px 0px",
          height: 380,
        },
      }}
    >
      <LoadingOverlay
        visible={sendingReply}
        loader={
          <Stack align="center">
            <Loader color="blue" variant="bars" />
            <Text>Adding Reply</Text>
          </Stack>
        }
      />
      <AfridiDevEditor
        className="mt-5"
        saveData={setCommentEditorRef}
        value=""
        height="220px"
        autoFocus
        previewStyle="tab"
        toolbarItems="basic"
        plugins={false}
      />

      <Button
        fullWidth
        mt="xl"
        onClick={async () => {
          setSendingReply(true);
          var mark = getMarkdown();
          if (commentId && commentId.type == "reply") {
            const { error: AddReplyError, data } = await supabaseClient
              .from("replies")
              .insert({
                comment_id: commentId.id,
                author_id: session.user.id,
                body: mark,
              });
          } else {
            const { error: AddCommentError, data } = await supabaseClient
              .from("comments")
              .insert({
                article_id: article_id,
                author_id: session.user.id,
                body: mark,
              });
          }
          setSendingReply(false);
          setEditorDrawer(false);
          getComments();
          if (commentId.type !== "reply") {
            scrollToComment();
          }
        }}
        variant="light"
        color="blue"
        className="max-w-[500px] mx-auto"
      >
        Add Reply
      </Button>
    </Drawer>
  );
};

export default ArticleCommentEditorDrawer;
