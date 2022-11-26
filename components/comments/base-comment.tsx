import { ThemeContext } from "@emotion/react";
import {
  ActionIcon,
  Avatar,
  Badge,
  Button,
  Card,
  createStyles,
  Divider,
  Group,
  Menu,
  Modal,
  Stack,
  Text,
  Textarea,
  TextInput,
  ThemeIcon,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals, openConfirmModal, openModal } from "@mantine/modals";
import { NextLink } from "@mantine/next";
import { useSessionContext } from "@supabase/auth-helpers-react";
import {
  IconAlertTriangle,
  IconCheck,
  IconDots,
  IconMessageCircle2,
  IconMessageReport,
  IconTrashX,
} from "@tabler/icons";
import { format, formatDistanceToNow } from "date-fns";
import { Children, Fragment, useState } from "react";
import { ShowUnauthorizedModal } from "../../utils/helpers";
import { supabase } from "../../utils/supabaseClient";
import { AfridiDevAuthor } from "../author/widgets/square-horizontal-author";
import AfridiImage from "../global/afridi-image";
import AfridiDevEditorRenderer from "../global/editor/renderer/editor-data-renderer";
import RepliedComment from "./replied-comment";
import CommentReportModal from "./reportModal";

var body = `PostHog is an open-source product analytics platform. We enable software teams to understand user behavior by auto-capturing events, performing product analytics, enabling video replays, conducting experiments and rolling out new features behind feature flags. Our open source approach enables companies to self-host, removing the need to send data externally.

Founded in January 2020 by James Hawkins and Tim Glaser, PostHog was a member of Y Combinator’s Winter 2020 batch, and has subsequently raised $27m in funding from GV, Y Combinator, and notable angel investors including Jason Warner (CTO, GitHub), Solomon Hykes (Founder, Docker), and David Cramer (Founder, Sentry).

You can read more about PostHog's story and our transparent, work-in-the-open philosophy in our company handbook.

PostHog is an open-source product analytics platform. We provide product-led teams with everything they need to understand user behavior, including funnels, session recording, user paths, multivariate testing, feature flags, heat maps, and more. `;

export interface AfridiDevComment {
  id: string;
  created_at: any;
  authors: AfridiDevAuthor;
  body: string;
  replies?: Array<any>;
}

export interface CommentProps {
  comment: AfridiDevComment;
  openCommentEditor?: Function;
  setCommentId: Function;
  articleCoAuthors: Array<any>;
  article_author_id: string;
  getComments: Function;
}
const BaseComment = ({
  comment,
  openCommentEditor,
  setCommentId,
  article_author_id,
  articleCoAuthors,
  getComments,
}: CommentProps) => {
  const [showReplies, setShowReplies] = useState(true);
  const theme = useMantineTheme();

  const { supabaseClient, session } = useSessionContext();
  const [reportModal, setReportModal] = useState(false);
  const { colorScheme } = useMantineColorScheme();

  return (
    <Stack spacing={0} mt="xs" mb={30}>
      <Card p={0} radius="md" className="bg-transparent min-h-[170px]">
        <Stack align="start">
          <Group spacing={0} className="w-full" position="apart">
            <Group spacing={10}>
              <Avatar
                className="hidden sm:block"
                size={50}
                radius="xl"
                color="blue"
              >
                <AfridiImage path={comment.authors.dp} fillImage />
              </Avatar>
              <Stack spacing={3}>
                <CommentReportModal
                  reportModal={reportModal}
                  setReportModal={setReportModal}
                  session={session}
                  supabaseClient={supabaseClient}
                  comment={comment}
                />
                <Group>
                  <Text
                    component={NextLink}
                    href={`/author/${comment.authors.id}`}
                    className="capitalize"
                    size="sm"
                    weight={500}
                  >
                    {comment.authors.full_name}
                  </Text>
                  <Badge size="xs">
                    {comment.authors.id == article_author_id
                      ? "Author"
                      : articleCoAuthors.filter(
                          (mapped) => mapped.authors.id == comment.authors.id
                        ).length > 0
                      ? "Co-Author"
                      : "Member"}
                  </Badge>
                </Group>

                <Tooltip
                  label={
                    "Commented on " +
                    format(new Date(comment.created_at), "dd MMMM yyyy") +
                    " at " +
                    format(new Date(comment.created_at), "hh:mm a")
                  }
                >
                  <Text
                    className="capitalize cursor-help w-fit"
                    size="xs"
                    color="dimmed"
                  >
                    {formatDistanceToNow(new Date(comment.created_at)) + " ago"}
                  </Text>
                </Tooltip>
              </Stack>
            </Group>

            <Menu width={185}>
              <Menu.Target>
                <ActionIcon radius="xl">
                  <IconDots size={18} />
                </ActionIcon>
              </Menu.Target>

              <Menu.Dropdown>
                <Menu.Item
                  onClick={() => {
                    if (session && session.user) {
                      setReportModal(true);
                    } else {
                      ShowUnauthorizedModal("Uh oh!", "You must be logged in");
                    }
                  }}
                  icon={<IconMessageReport strokeWidth={1.4} />}
                  color="red"
                >
                  Report Comment
                </Menu.Item>
                {session && session.user.id == comment.authors.id ? (
                  <Menu.Item
                    onClick={() => {
                      if (session) {
                        openConfirmModal({
                          closeOnConfirm: false,
                          title: "Deleting Comment",
                          children: (
                            <Text size="sm">
                              Are you sure you want to delete your comment ?
                            </Text>
                          ),
                          labels: {
                            confirm: "Confirm",
                            cancel: "Cancel",
                          },
                          color: "red",
                          confirmProps: {
                            color: "red",
                          },
                          cancelProps: {
                            color: "gray",
                            variant: "subtle",
                          },
                          onConfirm: async () => {
                            const { error: reportsError } = await supabaseClient
                              .from("spam_reports")
                              .delete()
                              .match({
                                comment_id: comment.id,
                              });

                            await Promise.all(
                              comment.replies.map(
                                async (mapped: AfridiDevComment) => {
                                  const { error: reportsError } =
                                    await supabaseClient
                                      .from("spam_reports")
                                      .delete()
                                      .match({
                                        reply_id: mapped.id,
                                      });
                                }
                              )
                            );
                            const { error } = await supabaseClient
                              .from("replies")
                              .delete()
                              .match({
                                comment_id: comment.id,
                              });

                            const { error: deleteCommentError } =
                              await supabaseClient
                                .from("comments")
                                .delete()
                                .match({
                                  id: comment.id,
                                });

                            if (!error && !deleteCommentError) {
                              getComments();
                              closeAllModals();
                            }
                          },
                        });
                      } else {
                        ShowUnauthorizedModal(
                          "Unauthorized",
                          "You must be logged in to continue"
                        );
                      }
                    }}
                    icon={<IconTrashX strokeWidth={1.4} />}
                    color="red"
                  >
                    Delete
                  </Menu.Item>
                ) : null}
              </Menu.Dropdown>
            </Menu>
          </Group>

          <AfridiDevEditorRenderer data={comment.body ? comment.body : {}} />

          <Group className="w-full" position="apart">
            {comment.replies && comment.replies.length > 0 && (
              <Button
                onClick={() => setShowReplies(!showReplies)}
                leftIcon={<IconMessageCircle2 color={theme.colors.gray[6]} />}
                radius="xl"
                variant="subtle"
                className="font-medium ml-1"
                color="gray"
              >
                <Text weight={500} color="dimmed">
                  {showReplies
                    ? `Hide ${
                        comment.replies.length > 0 ? comment.replies.length : ""
                      } ${comment.replies.length == 1 ? "Reply" : "Replies"}`
                    : `Show ${
                        comment.replies.length > 0 ? comment.replies.length : ""
                      } ${comment.replies.length == 1 ? "Reply" : "Replies"}`}
                </Text>
              </Button>
            )}

            <Button
              radius="xl"
              variant="subtle"
              className="font-medium"
              color="gray"
              onClick={() => {
                if (session && session.user) {
                  setCommentId({
                    id: comment.id,
                    author: comment.authors,
                    type: "reply",
                  });
                  openCommentEditor(true);
                } else {
                  ShowUnauthorizedModal("Uh oh!", "You must be logged in");
                }
              }}
            >
              Reply
            </Button>
          </Group>
        </Stack>
      </Card>

      {comment.replies && comment.replies.length > 0 && showReplies ? (
        <Stack spacing={4}>
          <Group noWrap>
            <Text size="md" mt="xl" weight={700} className="ml-5">
              Replies
            </Text>
            <Divider color="dark" className="w-full align-middle mt-6" />
          </Group>
          <Group className="w-full ml-auto" spacing={0} noWrap>
            <Divider
              orientation="vertical"
              className="xs:ml-20 ml-7 lg:ml-auto"
              size="xs"
              mb="10px"
              label="Divider"
              mt="46px"
              labelPosition="center"
              color={colorScheme == "dark" ? "gray.9" : "gray.2"}
            />
            <Stack
              className="w-full 2xl:max-w-[750px] max-w-[585px]"
              style={{
                display: showReplies ? "flex" : "none",
              }}
            >
              {comment.replies &&
                comment.replies.map((mapped2) => (
                  <RepliedComment
                    getComments={getComments}
                    article_author_id={article_author_id}
                    articleCoAuthors={articleCoAuthors}
                    setCommentId={setCommentId}
                    key={mapped2.id}
                    comment={mapped2}
                  />
                ))}
            </Stack>
          </Group>
        </Stack>
      ) : null}
    </Stack>
  );
};

export default BaseComment;
