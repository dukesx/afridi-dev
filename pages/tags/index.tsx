/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  Badge,
  Button,
  Card,
  Center,
  Divider,
  Grid,
  Group,
  Menu,
  Skeleton,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
  Tooltip,
} from "@mantine/core";
import { useDebouncedState } from "@mantine/hooks";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import {
  IconBrandAndroid,
  IconBrandAngular,
  IconBrandJavascript,
  IconBrandKotlin,
  IconBrandReact,
  IconCode,
  IconHash,
  IconPencil,
  IconTrendingUp,
} from "@tabler/icons";
import { Fragment, Suspense, useEffect, useState } from "react";
import EmptyPlaceholder from "../../components/global/placeholders/empty";
import TagComponent from "../../components/global/tags/tagComponent";
import AppWrapper from "../../components/global/wrapper";

const TagsPage = ({ tagsArr }) => {
  const [tags, setTags] = useState(tagsArr);
  const { user } = useUser();
  const [authorFollowed, setAuthorFollowed] = useState([]);
  const [inputVal, setInputVal] = useDebouncedState(null, 200);
  const [loading, setLoading] = useState(false);

  /**
   *
   *
   *
   *
   *
   */

  const searchTags = async (deferred) => {
    setTags([]);

    const { error, data } = await supabaseClient
      .from("tags")
      .select(
        `
      title,
      articles!inner(id),
      icon,
      color,
      id`,
        {
          count: "exact",
        }
      )
      .ilike("title", `%${deferred}%`);
    console.log();
    var tagsArr = [];
    data.map((mapped) =>
      tagsArr.push({
        id: mapped.id,
        title: mapped.title,
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

  // const getTags = async () => {
  //   setLoading(true);
  //   const { error, data } = await supabaseClient
  //     .from("tags")
  //     .select(
  //       `
  //     title,
  //     id
  //     `
  //     )
  //     .range(tags.length, tags.length + 20)
  //     .limit(20);
  //   if (user) {
  //     const { error: error2, data: data2 } = await supabaseClient
  //       .from("authors")
  //       .select(
  //         `
  //     tags (
  //       title
  //     )
  //     `
  //       )
  //       .eq("id", user.id);
  //     var followedTags = [];
  //     if (data2[0].tags && data2[0].tags.length > 0) {
  //       data2[0].tags.map((mapped) => followedTags.push(mapped.title));
  //       setAuthorFollowed(followedTags);
  //     }
  //   }
  //   var tagsArr = [...tags];
  //   data.map((mapped) => tagsArr.push(mapped));
  //   setTags(tagsArr);
  //   setLoading(false);
  // };

  // useEffect(() => {
  //   setLoading(true);
  //   getTags();
  // }, [user]);

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
          <Suspense
            fallback={
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
            }
          >
            {!loading ? (
              tags.map((mapped, index) => (
                <Grid.Col key={"alock" + index} span={12} xs={6} sm={4} lg={3}>
                  <TagComponent
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
                    setAuthorFollowed={setAuthorFollowed}
                    id={mapped.id}
                    authorTags={authorFollowed}
                    title={mapped.title}
                    user={user}
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
          </Suspense>
        </Grid>
      </Card>
    </AppWrapper>
  );
};

export default TagsPage;

export const getStaticProps = async () => {
  const { error, data, count } = await supabaseClient
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
    .range(0, 99)
    .limit(100);
  var tagsArr = [];
  data.map((mapped) =>
    tagsArr.push({
      id: mapped.id,
      title: mapped.title,
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
