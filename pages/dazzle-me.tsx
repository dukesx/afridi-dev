/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  Button,
  Card,
  Center,
  Group,
  Loader,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Tooltip,
  useMantineTheme,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { IconArrowRight, IconArrowsShuffle, IconDice } from "@tabler/icons";
import { useEffect, useState } from "react";
import HorizontalGridCard, {
  CardStyle,
} from "../components/article/grid-cards/horizontal-article-card";
import { AfridiDevArticle } from "../components/article/grid-cards/large-article-card";
import EmptyPlaceholder from "../components/global/placeholders/empty";
import AppWrapper from "../components/global/wrapper";
import { getRandomNumber } from "../utils/helpers";

const DazzleMe = () => {
  const { supabaseClient } = useSessionContext();
  const [loading, setLoading] = useState(false);
  const [article, setArticle] = useState(null);
  const theme = useMantineTheme();
  //
  //
  //
  //
  //
  const getRandomArticle = async () => {
    setLoading(true);
    const { count } = await supabaseClient
      .from("articles")
      .select("id", { count: "exact" });

    if (count) {
      const rand = getRandomNumber(1, count);
      const { data } = await supabaseClient
        .from("articles")
        .select(
          `
          id,
          title,
          description,
          cover,
          appreciations (
            id
          ),
          article_views (
            id
          )
          `
        )
        .limit(1)
        .range(rand, rand)
        .single();


      setArticle(data);
      setLoading(false);
    }
  };
  //
  //
  //
  useEffect(() => {
    getRandomArticle();
  }, []);
  //
  //
  //
  //
  return (
    <AppWrapper activeHeaderKey="dazzle-me">
      <Card className="h-screen" withBorder>
        <Center className="h-full w-full items-center justify-center flex flex-col">
          <Stack className="mb-[3%]" align="center" spacing={0}>
            <ThemeIcon
              className="rounded-full"
              size={150}
              mb="xl"
              variant="light"
              radius="xl"
              color="indigo"
            >
              <IconDice size={80} />
            </ThemeIcon>
            <Title mb="xs">Random Article Generator</Title>
            <Text size="sm" mb="xl" color="dimmed">
              Generate random articles, for the busy Devs ☕
            </Text>
            <Button
              color="indigo"
              onClick={getRandomArticle}
              mb={50}
              variant="light"
              leftIcon={<IconArrowsShuffle size={18} />}
            >
              Randomize
            </Button>
            <div className="h-[200px] w-full">
              {loading ? (
                <Stack className="w-full" align="center">
                  <Loader variant="bars" color="indigo" />
                  <Text>Finding you a random article</Text>
                </Stack>
              ) : article ? (
                <Group position="apart" noWrap className="mx-auto w-full">
                  <HorizontalGridCard
                    appreciations={article.appreciations}
                    coverClassName="rounded-md"
                    data={article}
                    theme={theme}
                    style={CardStyle.FEED}
                  />
                  <Tooltip label="Visit article">
                    <ActionIcon
                      component={NextLink}
                      href={`/article/${article && article.id}`}
                      color="indigo"
                      radius="xl"
                      variant="light"
                      size="xl"
                      className="ml-20 mb-5"
                    >
                      <IconArrowRight />
                    </ActionIcon>
                  </Tooltip>
                </Group>
              ) : (
                <EmptyPlaceholder
                  height={100}
                  description={`Try Clicking "Randomize" Again`}
                />
              )}
            </div>
          </Stack>
        </Center>
      </Card>
    </AppWrapper>
  );
};

export default DazzleMe;
