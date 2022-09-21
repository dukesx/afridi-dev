import {
  ActionIcon,
  Avatar,
  Tooltip,
  Button,
  Card,
  Group,
  Skeleton,
  Stack,
  Text,
  ThemeIcon,
  Title,
  ColorScheme,
} from "@mantine/core";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { Session, SupabaseClient } from "@supabase/supabase-js";
import { IconCheck, IconExternalLink, IconTrash } from "@tabler/icons";
import { formatDistanceToNow } from "date-fns";
import AfridiImage from "../../global/afridi-image";
import MarkDownRenderer from "../../global/markdown-renderer";
import { getData } from "../functions";

interface AuthorFeedRendererProps {
  data: any;
  dp: string;
  colorScheme: ColorScheme;
  mapped: any;
  session: Session;
  supabaseClient: SupabaseClient;
  setFeed: Function;
  id: string | string[];
}

const AuthorFeedRenderer = ({
  data,
  dp,
  colorScheme,
  mapped,
  session,
  supabaseClient,
  setFeed,
  id,
}: AuthorFeedRendererProps) => {
  return (
    <Card pb="md" withBorder>
      <Group position="apart" mb={20}>
        <Group>
          <Avatar className="rounded-full h-[50px] w-[50px] ml-0 rounded-full">
            {!data ? (
              <Skeleton height={40} />
            ) : dp ? (
              <AfridiImage
                className=""
                height={50}
                width={50}
                path={
                  dp
                    ? `/${dp}`
                    : colorScheme == "dark"
                    ? "/image-avatar-placeholder-dark.png"
                    : `/image-avatar-placeholder.png`
                }
              />
            ) : null}
          </Avatar>
          <Stack spacing={0}>
            <Text size={13} weight={600}>
              {data ? (
                data.firstName + " " + data.lastName
              ) : (
                <Skeleton height={10} width={100} />
              )}
            </Text>
            <Text className="capitalize" color="dimmed" size={10}>
              {" "}
              {formatDistanceToNow(new Date(mapped.data.created_at)) + " ago"}
            </Text>
          </Stack>
        </Group>
        {session &&
        session.user.id == mapped.data.author_id &&
        mapped.type == "status" ? (
          <Button
            size="xs"
            radius="xl"
            color="red"
            variant="subtle"
            className="rounded-full py-1 px-1.5"
            onClick={() => {
              openConfirmModal({
                title: (
                  <Text size="md" weight={700}>
                    Delete Status
                  </Text>
                ),
                centered: true,
                children: (
                  <Text mb="lg" size="sm" color="dimmed">
                    You are about to delete a status. Are you sure you want to
                    delete it ? This action cannot be
                    <b className="ml-1 underline font-medium text-red-600 decoration-red-600 decoration-2">
                      UNDONE
                    </b>
                  </Text>
                ),
                confirmProps: { color: "red" },
                labels: {
                  confirm: "Yes, delete it",
                  cancel: "No, don't delete it",
                },
                onConfirm: async () => {
                  const { error, data } = await supabaseClient
                    .from("status_feed")
                    .delete()
                    .match({
                      id: mapped.data.id,
                    })
                    .select();

                  if (!error) {
                    const fetcher = await fetch("/api/revalidate", {
                      method: "POST",
                      headers: {
                        "content-type": "application/json",
                        accept: "application/json",
                      },
                      body: JSON.stringify({
                        path: `/author/${data[0].author_id}`,
                      }),
                    });

                    const returned = await fetcher.json();

                    if (returned && returned.revalidated) {
                      showNotification({
                        title: "Success",
                        message: "Status deleted successfully",
                        color: "teal",
                        icon: <IconCheck />,
                      });
                      setFeed(null);
                      getData(supabaseClient, id);
                    }
                  }
                },
                onCancel: () => {},
              });
            }}
          >
            <IconTrash size={18} />
          </Button>
        ) : null}
        {mapped.type == "article" ? (
          <Tooltip position="top" label="An article on Afridi.dev">
            <ThemeIcon
              className="cursor-help"
              size={45}
              variant="light"
              radius="xl"
            >
              <Text weight={600} size="xs">
                .Dev
              </Text>
            </ThemeIcon>
          </Tooltip>
        ) : null}
      </Group>
      {mapped.type == "status" ? (
        <MarkDownRenderer className="mb-5">{mapped.data.body}</MarkDownRenderer>
      ) : (
        <Stack>
          <Text size="sm">{mapped.data.description}</Text>
          <Card
            component="a"
            href="#"
            onClick={() => {
              if (mapped.type == "article") {
                window.open(`/article/${mapped.data.id}`, "_blank");
              }
            }}
            withBorder
          >
            <Card.Section className="h-[400px] relative">
              <AfridiImage
                cover_base_64={mapped.data.cover_base_64}
                path={mapped.data.cover}
                height={400}
                width={400}
                fillImage
              />
            </Card.Section>
            <Group className="w-full" position="apart">
              <Stack className="w-full" spacing={3}>
                <Title mt="xl" order={5}>
                  {mapped.data.title}
                </Title>
              </Stack>
              <Text
                className="max-w-[90%]"
                lineClamp={2}
                size="xs"
                color="dimmed"
              >
                {mapped.data.description}
              </Text>
              <Tooltip label="Open link in new tab">
                <ActionIcon
                  color="blue"
                  variant="subtle"
                  component="div"
                  onClick={() => {
                    window.open(`/article/${mapped.data.id}`, "_blank");
                  }}
                >
                  <IconExternalLink size={20} />
                </ActionIcon>
              </Tooltip>
            </Group>
          </Card>
        </Stack>
      )}
    </Card>
  );
};

export default AuthorFeedRenderer;
