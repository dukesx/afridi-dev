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
import {
  IconBrandGoogleAnalytics,
  IconBrandNotion,
  IconBrandWhatsapp,
  IconCode,
  IconHash,
  IconPencil,
  IconThumbUp,
} from "@tabler/icons";
import { NextSeo } from "next-seo";
import Image from "next/image";
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
    <AppWrapper size="lg" activeHeaderKey="tags">
      <NextSeo
        title="Tags"
        description="Follow tags to see your favorite articles"
        canonical="https://afridi.dev/tags"
        openGraph={{
          url: "https://afridi.dev/tags",
          title: "Tags",
          description: "Follow tags to see your favorite articles",
          site_name: "Afridi.dev",
          images: [
            {
              url: "https://ik.imagekit.io/afrididotdev/tr:w-800/afridi-dev-og-tags.png",
              width: 1200,
              height: 630,
              alt: "Afridi.DEV Cover Image - Light",
              type: "image/jpeg",
            },
          ],
        }}
        twitter={{
          handle: "@afridi.dev",
          site: "@site",
          cardType: "summary_large_image",
        }}
      />
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
                      ? IconThumbUp
                      : mapped.title == "notion"
                      ? IconBrandNotion
                      : mapped.title == "whatsapp"
                      ? IconBrandWhatsapp
                      : mapped.title == "google analytics"
                      ? IconBrandGoogleAnalytics
                      : null
                  }
                  image={mapped.image}
                  color={mapped.color ? mapped.color : "gray"}
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
      image,
      icon,
      content_count
      `,
      {
        count: "exact",
      }
    )
    .order("content_count", {
      ascending: false,
    })
    .limit(100);

  var tagsArr = [];
  data &&
    data.map((mapped) =>
      tagsArr.push({
        id: mapped.id,
        title: mapped.title,
        //@ts-ignore
        articleCount: mapped.content_count,
        icon: mapped.icon,
        color: mapped.color,
        image: mapped.image,
      })
    );

  return {
    props: {
      tagsArr: tagsArr,
    },
  };
};
