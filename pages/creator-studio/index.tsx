/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  Center,
  Group,
  LoadingOverlay,
  Stack,
  Text,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { DataTable } from "mantine-datatable";
import { useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { AfridiDevArticle } from "../../components/global/grid-cards/largeGridCard";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { format } from "date-fns";
import StudioWrapper from "../../components/global/studio/studio-wrapper";
import { openConfirmModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { IconBrandGoogleAnalytics, IconTrendingUp, IconX } from "@tabler/icons";

const CreatorsStudio = () => {
  const { session, isLoading, supabaseClient } = useSessionContext();
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);

  const getAuthorArticleViews = async () => {
    setLoading(true);
    const { error, data } = await supabaseClient
      .from("articles")
      .select(
        `
        title,
        views
    `
      )
      .eq("author_id", session && session.user.id);
    //@ts-ignore
    setArticles(data);
    setLoading(false);
  };
  useEffect(() => {
    if (isLoading == false && session) {
      getAuthorArticleViews();
    }
  }, [isLoading]);
  return (
    <StudioWrapper path="home" subPath="analytics" loading={loading}>
      <Stack mb={50} align="center" spacing={0}>
        <ThemeIcon
          mt="xl"
          size={90}
          className="rounded-full"
          radius="xl"
          color="yellow"
          variant="gradient"
          gradient={{
            from: "orange.5",
            to: "yellow.4",
          }}
        >
          <IconTrendingUp fill="white" strokeWidth={1.3} size={40} />
        </ThemeIcon>
        <Title className="text-center " mt="md" order={2}>
          Performance at a Glance
        </Title>
        <Text size="sm" color="dimmed">
          How well your articles are performing
        </Text>
      </Stack>

      <Card mb="xl" mt="xl" withBorder className="w-full h-[400px]">
        <Center className="h-full">Comming Soon</Center>
      </Card>
    </StudioWrapper>
  );
};

export default CreatorsStudio;

export const getServerSideProps = withPageAuth({
  redirectTo: "/get-started",
});
