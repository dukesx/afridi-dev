import {
  Button,
  Group,
  Modal,
  Stack,
  Text,
  Textarea,
  ThemeIcon,
} from "@mantine/core";
import { useForm } from "@mantine/form";
import { openModal } from "@mantine/modals";
import { type Session, type SupabaseClient } from "@supabase/supabase-js";
import { IconCheck } from "@tabler/icons";
import { useState } from "react";
import { AfridiDevComment } from "./base-comment";

interface CommentReportModalProps {
  supabaseClient: SupabaseClient;
  comment: AfridiDevComment;
  session: Session;
  reportModal: boolean;
  setReportModal: Function;
  reply?: boolean;
}

const CommentReportModal = ({
  comment,
  supabaseClient,
  session,
  reportModal,
  setReportModal,
  reply,
}: CommentReportModalProps) => {
  const [sendingReport, setSendingReport] = useState(false);
  const reportCommentForm = useForm({
    initialValues: {
      reason: "",
    },
    validate: {
      reason: (val) => (val.length < 2 ? "Reason cannot be empty" : null),
    },
  });
  return (
    <Modal
      size="md"
      style={{
        marginTop: 100,
      }}
      title={
        <Text className="capitalize" size="sm">
          Report{" "}
          <b className="font-semibold underline decoration-red-500 decoration-2">
            {comment.authors.firstName + " " + comment.authors.lastName}
            &apos;s
          </b>{" "}
          Comment
        </Text>
      }
      opened={reportModal}
      onClose={() => setReportModal(false)}
    >
      <form
        onSubmit={reportCommentForm.onSubmit(async (val) => {
          if (val) {
            setSendingReport(true);
            const { error } = await supabaseClient.from("spam_reports").insert({
              comment_id: !reply ? comment.id : null,
              reason: val.reason,
              reporter_id: session.user.id,
              reply_id: reply ? comment.id : null,
            });
            if (!error) {
              setReportModal(false);
              openModal({
                style: {
                  marginTop: 100,
                },
                padding: "xl",
                title: "Feedback Delivered ✅",
                children: (
                  <Stack mt="xl" align="center">
                    <ThemeIcon
                      size={90}
                      className="rounded-full"
                      variant="light"
                      color="teal"
                    >
                      <IconCheck size={30} />
                    </ThemeIcon>

                    <Text mt="xs" size="sm" weight={500} className="capitalize">
                      Thanks for the feedback!
                    </Text>
                  </Stack>
                ),
              });
            }
            setSendingReport(false);
          }
        })}
      >
        <Textarea
          onChange={(val) =>
            reportCommentForm.setFieldValue("reason", val.target.value)
          }
          required
          error={reportCommentForm.errors.reason}
          styles={{
            input: {
              marginTop: 10,
              marginBottom: 30,
            },
          }}
          label="Reason for Report"
        />
        <Group position="right">
          <Button
            onClick={() => setReportModal(false)}
            radius="xl"
            color="gray"
            variant="subtle"
          >
            Cancel
          </Button>
          <Button loading={sendingReport} radius="xl" type="submit" color="red">
            Submit Report
          </Button>
        </Group>
      </form>
    </Modal>
  );
};

export default CommentReportModal;
