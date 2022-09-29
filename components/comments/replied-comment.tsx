import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  Divider,
  Group,
  Stack,
  Text,
  useMantineColorScheme,
  Tooltip,
  Badge,
  Menu,
} from "@mantine/core";
import { closeAllModals, openConfirmModal } from "@mantine/modals";
import { NextLink } from "@mantine/next";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { IconDots, IconMessageReport, IconTrashX } from "@tabler/icons";
import { format, formatDistanceToNow } from "date-fns";
import { useState } from "react";
import { ShowUnauthorizedModal } from "../../utils/helpers";
import AfridiImage from "../global/afridi-image";
import MarkDownRenderer from "../global/markdown-renderer";
import { AfridiDevComment, CommentProps } from "./base-comment";
import CommentReportModal from "./reportModal";

var body = `PostHog is an open-source product analytics platform. We enable software teams to understand user behavior by auto-capturing events, performing product analytics, enabling video replays, conducting experiments and rolling out new features behind feature flags. Our open source approach enables companies to self-host, removing the need to send data externally.

Founded in January 2020 by James Hawkins and Tim Glaser, PostHog was a member of Y Combinator’s Winter 2020 batch, and has subsequently raised $27m in funding from GV, Y Combinator, and notable angel investors including Jason Warner (CTO, GitHub), Solomon Hykes (Founder, Docker), and David Cramer (Founder, Sentry).

You can read more about PostHog's story and our transparent, work-in-the-open philosophy in our company handbook.

PostHog is an open-source product analytics platform. We provide product-led teams with everything they need to understand user behavior, including funnels, session recording, user paths, multivariate testing, feature flags, heat maps, and more. `;

const RepliedComment = ({
  comment,
  articleCoAuthors,
  article_author_id,
  getComments,
}: CommentProps) => {
  const { colorScheme } = useMantineColorScheme();
  const { supabaseClient, session } = useSessionContext();
  const [reportModal, setReportModal] = useState(false);
  return (
    <Card p={0} radius="md" className="w-full bg-transparent">
      <Stack className="" py="xl">
        <Group noWrap position="apart">
          <Divider className="w-[50px]" />
          <Group className="w-full">
            <Avatar
              className="hidden md:block"
              size={45}
              radius="xl"
              color="blue"
            >
              <AfridiImage path={comment.authors.dp} fillImage />
            </Avatar>
            <Stack spacing={0}>
              <CommentReportModal
                reply
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
                  color="dimmed"
                  size="xs"
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
                  setReportModal(true);
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
                              reply_id: comment.id,
                            });

                          const { error } = await supabaseClient
                            .from("replies")
                            .delete()
                            .match({
                              id: comment.id,
                            });

                          if (!error) {
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
        <MarkDownRenderer className="ml-3" commentMode>
          {comment.body ?? body}
        </MarkDownRenderer>
      </Stack>
      <Divider
        label="finito"
        labelPosition="center"
        labelProps={{
          color: "dimmed",
          size: "sm",
          italic: true,
        }}
        className="mr-[20%]"
      />
    </Card>
  );
};

export default RepliedComment;
