import {
  Avatar,
  Button,
  Center,
  Loader,
  Stack,
  Text,
  useMantineTheme,
} from "@mantine/core";
import { IconBell, IconHash, IconNews } from "@tabler/icons";
import Image from "next/image";
import { useEffect, useState } from "react";
import HorizontalGridCard, {
  CardStyle,
} from "../../components/global/grid-cards/horizontalGridCard";
import AppWrapper from "../../components/global/wrapper";
import InfiniteScroll from "react-infinite-scroller";
import { useRouter } from "next/router";
import Custom404 from "../404";
import Custom500 from "../500";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { supabase } from "../../utils/supabaseClient";

const ArticleTagPage = ({ taga, articles }) => {
  const theme = useMantineTheme();
  const [data, setData] = useState(articles);
  const router = useRouter();
  const { isLoading, session, error, supabaseClient } = useSessionContext();

  const getMoreArticles = async () => {
    const {
      error,
      data: arrivedData,
      count,
    } = await supabaseClient
      .from("articles")
      .select(
        `
        id,
        title,
        description,
        cover,
      tags!inner(  
      title,
      id,
      color,
      icon
      )
      `,
        {
          count: "exact",
        }
      )
      .eq("tags.title", router.query.title)
      .limit(10)
      .range(data.length, data.length + 9);

    var articlesArr = [...data];
    arrivedData.map((mapped) => articlesArr.push(mapped));

    setData(articlesArr);
  };

  return taga == null ? (
    <AppWrapper size="sm" activeHeaderKey="">
      <Custom404 />
    </AppWrapper>
  ) : (
    <AppWrapper size="lg" activeHeaderKey="">
      <Stack mt={50} align="center">
        <Avatar
          className="rounded-full"
          variant="light"
          color={taga.color ? `${taga.color}.4` : "cyan"}
          radius="xl"
          size={130}
        >
          {taga.icon ? (
            <Image
              className="object-cover rounded-lg"
              height={70}
              width={70}
              alt=""
              src={taga.icon}
              loader={({ src, width, quality }) => {
                return `https://cdn.jsdelivr.net/gh/devicons/devicon/icons/${src}/${src}-original.svg`;
              }}
            />
          ) : taga.IconName ? (
            <taga.IconName
              strokeWidth={1.3}
              size={35}
              className="align-middle"
            />
          ) : (
            <IconHash />
          )}
        </Avatar>

        <Text weight={700} size="xl" className="text-center uppercase">
          {taga.title}
        </Text>

        {/* 
        
        // Deprecated till supabase V2 upgrade

        <Button
          leftIcon={<IconBell size={20} />}
          color={`${tag.color}`}
          variant="light"
          radius="xl"
        >
          Follow
        </Button> */}
        <InfiniteScroll
          threshold={50}
          pageStart={0}
          loadMore={getMoreArticles}
          hasMore={data.length < taga.articleCount ? true : false}
          loader={
            <Center key="something-list-loader">
              <Stack align="center">
                <Loader variant="bars" color="blue" />
                <Text className="text-center">Loading More Articles</Text>
              </Stack>
            </Center>
          }
        >
          <Stack pb="xl" mt={50} spacing="xl">
            {data.map((mapped, index) => (
              <HorizontalGridCard
                coverClassName="rounded-lg"
                theme={theme}
                data={mapped}
                style={CardStyle.FEED}
                key={"alobs" + index}
              />
            ))}
          </Stack>
        </InfiniteScroll>
      </Stack>
    </AppWrapper>
  );
};

export default ArticleTagPage;

export const getStaticProps = async (ctx) => {
  const title = ctx.params.title;
  const { error, data, count } = await supabase
    .from("articles")
    .select(
      `
        id,
        title,
        description,
        cover,
      tags!inner(  
      title,
      id,
      color,
      icon
      )
      `,
      {
        count: "exact",
      }
    )
    .eq("tags.title", title)
    .limit(10);

  if (data && data.length > 0) {
    const tag = {
      id: data[0].tags[0].id,
      title: data[0].tags[0].title,
      icon: data[0].tags[0].icon,
      color: data[0].tags[0].color,
    };

    return {
      props: {
        taga: tag,
        articles: data,
        count: count,
      },
    };
  } else {
    return {
      props: {},
    };
  }
};

export const getStaticPaths = async () => {
  const { data, error } = await supabase.from("tags").select("title");

  var ids = [];

  data.map((mapped) =>
    ids.push({
      params: {
        title: mapped.title,
      },
    })
  );

  return {
    paths: ids,
    fallback: "blocking",
  };
};
