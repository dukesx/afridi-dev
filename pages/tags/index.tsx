/* eslint-disable react-hooks/exhaustive-deps */
import {
  Card,
  Grid,
  Group,
  Menu,
  Skeleton,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { IconCode, IconHash, IconPencil } from "@tabler/icons";
import { Fragment, Suspense, useEffect, useState } from "react";
import EmptyPlaceholder from "../../components/global/placeholders/empty";
import TagComponent from "../../components/global/tags/tagComponent";
import AppWrapper from "../../components/global/wrapper";
import { supabase } from "../../utils/supabaseClient";

const TagsPage = ({ tagsArr }) => {
  const [tags, setTags] = useState(tagsArr);
  const { isLoading, session, error, supabaseClient } = useSessionContext();
  const [inputVal, setInputVal] = useDebouncedState(null, 200);
  const [loading, setLoading] = useState(false);
  const [authorFollowed, setAuthorFollowed] = useState([]);

  /**
   *
   *
   *
   *
   *
   */

  useEffect(() => {
    getTags();
  }, [session]);

  const getTags = async () => {
    if (session && session.user) {
      const { error: error2, data: data2 } = await supabaseClient
        .from("authors")
        .select(
          `
      tags (
        title
      )
      `
        )
        .eq("id", session.user.id);
      var followedTags = [];
      //@ts-ignore
      if (data2[0].tags && data2[0].tags.length > 0) {
        //@ts-ignore
        data2[0].tags.map((mapped) => followedTags.push(mapped.title));
        setAuthorFollowed(followedTags);
      }
    }
  };

  const searchTags = async (deferred) => {
    setTags([]);

    const { error, data } = await supabaseClient
      .from("tags")
      .select(
        `
      title,
      articles (
        id
        ),
      icon,
      color,
      id`,
        {
          count: "exact",
        }
      )
      .ilike("title", `%${deferred.toLowerCase()}%`);

    var tagsArr = [];
    data.map((mapped) =>
      tagsArr.push({
        id: mapped.id,
        title: mapped.title,
        //@ts-ignore
        articleCount: mapped.articles.length,
        icon: mapped.icon,
        color: mapped.color,
      })
    );
    setTags(tagsArr);
    setLoading(false);
  };

  useEffect(() => {
    if (inputVal !== null) {
      setLoading(true);
      searchTags(inputVal);
    }
  }, [inputVal]);

  /**
   *
   *  until Supabase v2 release
   *
   */

  /**
   *
   *
   *
   *
   */
  return (
    <AppWrapper size="lg" activeHeaderKey="">
      <Card p="xl">
        <Group spacing="sm" position="center">
          <ThemeIcon
            className="rounded-full"
            variant="gradient"
            gradient={{
              from: "cyan",
              to: "blue",
            }}
            mt={10}
            mb="sm"
            radius="xl"
            size={90}
          >
            <IconHash size={35} className="align-middle" />
          </ThemeIcon>
        </Group>
        <Title order={5} mb="xl" mt="sm" className="text-center capitalize">
          Looking for a particular category ? Search it!
        </Title>

        <TextInput
          radius="xl"
          mb={50}
          mt={20}
          onChange={(e) => setInputVal(e.currentTarget.value)}
          className="max-w-[600px] mx-auto"
          placeholder="e.g react-js"
        />
        <Grid gutter="xl">
          {!loading ? (
            tags.map((mapped, index) => (
              <Grid.Col key={"alock" + index} span={12} xs={6} sm={4} lg={3}>
                <TagComponent
                  authorFollowed={authorFollowed}
                  icon={mapped.icon}
                  IconName={
                    mapped.title == "programming"
                      ? IconCode
                      : mapped.title == "editors-pick"
                      ? IconPencil
                      : null
                  }
                  color={mapped.color ? mapped.color : "cyan"}
                  count={mapped.articleCount}
                  id={mapped.id}
                  title={mapped.title}
                  user={session && session.user}
                />
              </Grid.Col>
            ))
          ) : (
            <Fragment>
              <Grid.Col span={12} xs={6} sm={4} lg={3}>
                <Skeleton className="aspect-square" />
              </Grid.Col>
              <Grid.Col span={12} xs={6} sm={4} lg={3}>
                <Skeleton className="aspect-square" />
              </Grid.Col>
              <Grid.Col span={12} xs={6} sm={4} lg={3}>
                <Skeleton className="aspect-square" />
              </Grid.Col>
              <Grid.Col span={12} xs={6} sm={4} lg={3}>
                <Skeleton className="aspect-square" />
              </Grid.Col>
              <Grid.Col span={12} xs={6} sm={4} lg={3}>
                <Skeleton className="aspect-square" />
              </Grid.Col>
              <Grid.Col span={12} xs={6} sm={4} lg={3}>
                <Skeleton className="aspect-square" />
              </Grid.Col>
              <Grid.Col span={12} xs={6} sm={4} lg={3}>
                <Skeleton className="aspect-square" />
              </Grid.Col>
              <Grid.Col span={12} xs={6} sm={4} lg={3}>
                <Skeleton className="aspect-square" />
              </Grid.Col>
            </Fragment>
          )}
        </Grid>
      </Card>
    </AppWrapper>
  );
};

export default TagsPage;

export const getStaticProps = async () => {
  const { error, data, count } = await supabase
    .from("tags")
    .select(
      `
      title,
      id,
      color,
      icon,
      articles!inner(id)
      `,
      {
        count: "exact",
      }
    )
    .order("created_at", {
      ascending: true,
    })
    .limit(100);

  var tagsArr = [];
  data.map((mapped) =>
    tagsArr.push({
      id: mapped.id,
      title: mapped.title,
      //@ts-ignore
      articleCount: mapped.articles.length,
      icon: mapped.icon,
      color: mapped.color,
    })
  );

  return {
    props: {
      tagsArr: tagsArr,
    },
  };
};
