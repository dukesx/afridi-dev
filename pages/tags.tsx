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
  IconBell,
  IconBellOff,
  IconBellRinging,
  IconBrandAdobe,
  IconBrandAndroid,
  IconBrandAngular,
  IconBrandJavascript,
  IconBrandKotlin,
  IconBrandReact,
  IconChevronDown,
  IconCode,
  IconEye,
  IconEyeCheck,
  IconEyeOff,
  IconHash,
  IconHeart,
  IconMinus,
  IconPlus,
  IconTrendingUp,
} from "@tabler/icons";
import {
  Fragment,
  useCallback,
  useDeferredValue,
  useEffect,
  useState,
} from "react";
import EmptyPlaceholder from "../components/global/placeholders/empty";
import TagComponent from "../components/global/tags/tagComponent";
import AppWrapper from "../components/global/wrapper";

const TagsPage = () => {
  const [tags, setTags] = useState([]);
  const { user } = useUser();
  const [authorFollowed, setAuthorFollowed] = useState([]);
  const [text, setText] = useState("");
  const [inputVal, setInputVal] = useDebouncedState("", 200);
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
      id`
      )
      .ilike("title", `%${deferred}%`);

    var tagsArr = [];
    data.map((mapped) => tagsArr.push(mapped));
    setTags(tagsArr);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    searchTags(inputVal);
  }, [inputVal]);

  const getTags = async () => {
    const { error, data } = await supabaseClient
      .from("tags")
      .select(
        `
      title,
      id
      `
      )
      .range(tags.length, tags.length + 20)
      .limit(20);
    if (user) {
      const { error: error2, data: data2 } = await supabaseClient
        .from("authors")
        .select(
          `
      tags (
        title
      )
      `
        )
        .eq("id", user.id);
      var followedTags = [];
      if (data2[0].tags && data2[0].tags.length > 0) {
        data2[0].tags.map((mapped) => followedTags.push(mapped.title));
        setAuthorFollowed(followedTags);
      }
    }
    var tagsArr = [...tags];
    data.map((mapped) => tagsArr.push(mapped));
    console.log(tagsArr);
    setTags(tagsArr);
    setLoading(false);
  };

  useEffect(() => {
    setLoading(true);
    getTags();
  }, [user]);

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
        <Title order={4} mb="xl" mt="sm" className="text-center">
          Seach & Follow your Favorite Tags
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
          {tags.length > 0 && !loading ? (
            tags.map((mapped, index) => (
              <Grid.Col key={"alock" + index} span={12} xs={6} sm={4} lg={3}>
                <TagComponent
                  IconName={
                    mapped.title == "react"
                      ? IconBrandReact
                      : mapped.title == "angular"
                      ? IconBrandAngular
                      : mapped.title == "javascript"
                      ? IconBrandJavascript
                      : mapped.title == "kotlin"
                      ? IconBrandKotlin
                      : mapped.title == "programming"
                      ? IconCode
                      : mapped.title == "typescript"
                      ? IconCode
                      : mapped.title == "ts"
                      ? IconCode
                      : mapped.title == "trending"
                      ? IconTrendingUp
                      : mapped.title == "android"
                      ? IconBrandAndroid
                      : null
                  }
                  color={
                    mapped.title == "react"
                      ? "blue.4"
                      : mapped.title == "angular"
                      ? "red.4"
                      : mapped.title == "javascript"
                      ? "yellow.6"
                      : mapped.title == "kotlin"
                      ? "grape"
                      : mapped.title == "programming"
                      ? "blue"
                      : mapped.title == "typescript"
                      ? "blue"
                      : mapped.title == "ts"
                      ? "blue"
                      : mapped.title == "android"
                      ? "teal"
                      : "cyan.4"
                  }
                  setAuthorFollowed={setAuthorFollowed}
                  id={mapped.id}
                  authorTags={authorFollowed}
                  title={mapped.title}
                  user={user}
                />
              </Grid.Col>
            ))
          ) : loading ? (
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
          ) : (
            <EmptyPlaceholder height={260} />
          )}
        </Grid>
      </Card>
    </AppWrapper>
  );
};

export default TagsPage;