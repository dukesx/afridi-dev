/* eslint-disable react-hooks/exhaustive-deps */
import HCaptcha from "@hcaptcha/react-hcaptcha";
import {
  Button,
  Drawer,
  Loader,
  LoadingOverlay,
  Stack,
  Text,
  useMantineColorScheme,
} from "@mantine/core";
import { useScrollIntoView } from "@mantine/hooks";
import { Session, SupabaseClient } from "@supabase/supabase-js";
import { useEffect, useRef, useState } from "react";
import { AfridiDevEditorOutput } from "../../../../pages/creator-studio/publish/article";
import AfridiDevEditor from "../../../global/editor/editor";

interface ArticleCommentEditorDrawerProps {
  editorDrawer: boolean;
  setEditorDrawer: Function;
  setCommentId: Function;
  commentId: any;
  article_id: string;
  setCommentEditorRef: Function;
  article_title: string;
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
  article_title,
  supabaseClient,
  session,
  scrollToComment,
  getComments,
}: ArticleCommentEditorDrawerProps) => {
  const [sendingReply, setSendingReply] = useState(false);
  const { colorScheme } = useMantineColorScheme();
  const [captchaToken, setCaptchaToken] = useState(null);
  const commentCaptchaRef = useRef(null);
  const [comment, setComment] = useState(null);
  const [editorVal, setEditorVal] = useState<AfridiDevEditorOutput>(null);

  useEffect(() => {
    if (captchaToken) {
      validResult();
    }
  }, [captchaToken]);

  const validResult = async () => {
    if (commentId && commentId.type == "reply") {
      //
      //
      //

      //
      //
      //
      const { error: AddReplyError, data } = await supabaseClient
        .from("replies")
        .insert({
          comment_id: commentId.id,
          author_id: session.user.id,
          body: editorVal.data,
        });

      var pinged = [];

      await Promise.all(
        editorVal.data.content.map(async (mapped) => {
          if (mapped.type == "paragraph") {
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
                      message: `You were mentioned in a reply by ${currentUserData[0].full_name}`,
                      link: `/article/${article_id}`,
                    });
                }
              }
            });
          }
        })
      );
    } else {
      const { error: AddCommentError, data } = await supabaseClient
        .from("comments")
        .insert({
          article_id: article_id,
          author_id: session.user.id,
          body: editorVal.data,
        });

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
                        message: `You were mentioned in a comment by ${currentUserData[0].full_name}`,
                        link: `/article/${article_id}`,
                      });
                  }
                }
              });
          }
        })
      );
    }
    setSendingReply(false);
    setEditorVal(null);
    setEditorDrawer(false);
    getComments();
    if (commentId.type !== "reply") {
      scrollToComment();
    }
  };

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
            Replying to <b className="">{commentId.author.full_name}</b>
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
          height: 500,
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
        isScrollable
        height={240}
        basic
        value={editorVal}
        setValue={setEditorVal}
      />

      <HCaptcha
        size="invisible"
        ref={commentCaptchaRef}
        theme={colorScheme == "dark" ? "dark" : "light"}
        sitekey="b2d3efbe-b36a-43f7-bcfd-785299a19a06"
        onVerify={(token, ekey) => setCaptchaToken(token)}
      />

      <Button
        fullWidth
        mt="xl"
        onClick={async () => {
          commentCaptchaRef.current?.execute();
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
