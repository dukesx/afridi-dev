/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  Stack,
  Text,
  ThemeIcon,
  Title,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { Fragment, useEffect, useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import StudioWrapper from "../../components/studio/studio-wrapper";
import { IconTrendingUp } from "@tabler/icons";
import {
  Chart as ChartJS,
  CategoryScale,
  LinearScale,
  BarElement,
  Title as ChartTitle,
  Tooltip,
  Legend,
} from "chart.js";
import { Bar } from "react-chartjs-2";
import { format } from "date-fns";
import { NextSeo } from "next-seo";
import { textEllipsis } from "../../utils/helpers";

const CreatorsStudio = ({ authored }) => {
  const { session, isLoading, supabaseClient } = useSessionContext();
  const [articles, setArticles] = useState(null);
  const [loading, setLoading] = useState(false);
  const theme = useMantineTheme();
  const { colorScheme } = useMantineColorScheme();

  ChartJS.register(
    CategoryScale,
    LinearScale,
    BarElement,
    ChartTitle,
    Tooltip,
    Legend
  );

  const options = {
    parsing: {
      xAxisKey: "views",
      yAxisKey: "title",
    },
    indexAxis: "y",
    elements: {
      bar: {
        borderWidth: 2,
      },
    },
    responsive: true,
    plugins: {
      legend: {
        display: false,
      },
      title: {
        color: colorScheme == "dark" ? theme.white : theme.black,
        padding: 25,
        display: true,
        font: {
          size: 14,
        },
        text: `Top 10 Performing Articles,  ${format(
          new Date().setMonth(new Date().getMonth() - 1),
          "MMMM dd"
        )} - ${format(new Date(), "MMMM dd yyyy")}`,
      },
    },
    scales: {
      x: {
        // beginAtZero: false,
        ticks: {
          color: colorScheme == "dark" ? theme.white : theme.black,
          callback: (val, _, __) => {
            return parseInt(val);
          },
        },
        title: {
          display: true,
          text: "Views Count",
          padding: 20,

          font: {
            weight: 700,
            size: 14,
          },
        },
      },
      y: {
        ticks: {
          color: colorScheme == "dark" ? theme.white : theme.black,
        },
        title: {
          display: true,
          text: "Article Title",
          padding: 20,
          color:
            colorScheme == "dark" ? theme.colors.gray[8] : theme.colors.gray[2],

          font: {
            weight: 700,
            size: 40,
          },
        },
      },
    },
  };

  const getAuthorArticleViews = async () => {
    var date = new Date();
    var date2 = new Date();
    //
    //
    date.setMonth(date.getMonth());
    date2.setMonth(date2.getMonth() - 1);
    //
    //

    setLoading(true);
    const { error, data } = await supabaseClient
      .from("articles")
      .select(
        `
        title,
        article_views!inner (
          id
        )
       `
      )
      .eq("author_id", session && session.user.id)
      .lte("article_views.created_at", date.toUTCString())
      .gte("article_views.created_at", date2.toUTCString())
      .order("id", {
        ascending: false,
      })
      .limit(10);

    //@ts-ignore
    var newArticlesArr = [];
    //@ts-ignore
    data.map((mapped) =>
      newArticlesArr.push({
        //@ts-ignore
        views: mapped.article_views.length,
        title: textEllipsis(mapped.title, 50),
      })
    );

    newArticlesArr.sort((a, b) => {
      return b.views - a.views;
    });

    const chartData = {
      datasets: [
        {
          label: `  Views This Month`,
          data: newArticlesArr,
          borderColor: theme.colors.yellow[6],
          borderWidth: 4,
          backgroundColor: theme.colors.orange[3],
        },
      ],
    };

    setArticles(chartData);
    setLoading(false);
  };
  useEffect(() => {
    if (isLoading == false && session) {
      getAuthorArticleViews();
    }
  }, [isLoading]);
  return (
    <StudioWrapper
      authored={authored}
      path="home"
      subPath="analytics"
      loading={loading}
    >
      <NextSeo nofollow noindex />

      <Fragment>
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

        <Card mb="xl" mt="xl" withBorder className="w-full">
          {articles && !loading ? (
            //@ts-ignore
            <Bar
              className="w-full max-w-[1000px]"
              //@ts-ignore
              options={options}
              data={articles}
            />
          ) : null}
        </Card>
      </Fragment>
    </StudioWrapper>
  );
};

export default CreatorsStudio;

export const getServerSideProps = withPageAuth({
  redirectTo: "/get-started",
  getServerSideProps: async ({ req, res }, supabase) => {
    const {
      data: { session },
      error: sessionError,
    } = await supabase.auth.getSession();
    if (!session) {
      return { props: {} };
    }
    const { data, error } = await supabase
      .from("articles")
      .select("id")
      .eq("author_id", session.user.id);

    if (data && data.length > 0) {
      return {
        props: {
          authored: true,
        },
      };
    } else {
      return {
        props: {
          authored: false,
        },
      };
    }
  },
});
