import {
  Avatar,
  Divider,
  Group,
  Stack,
  Text,
  type MantineTheme,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { Fragment } from "react";
import AfridiImage from "../../global/afridi-image";
import EmptyPlaceholder from "../../global/placeholders/empty";
import { AfridiDevAuthor } from "../../landing/widgets/authors/square-horizontal-author";

interface HorizontalAuthorGridCardProps {
  author: AfridiDevAuthor;
  theme: MantineTheme;
}

const HorizontalAuthorGridCard = ({
  author,
}: HorizontalAuthorGridCardProps) => {
  return author ? (
    <Group noWrap className="w-full" position="left">
      <Avatar size={45} color="blue" className="rounded-full">
        {author.dp ? (
          <AfridiImage
            imageClassName="rounded-full"
            path={author.dp}
            width={50}
            height={50}
          />
        ) : null}
      </Avatar>
      <Group noWrap className="w-full">
        <Group className="w-full" noWrap position="apart">
          <Stack spacing={5}>
            <Text
              component={NextLink}
              href={`/author/${author.id}`}
              className="max-w-[290px]"
              lineClamp={1}
              size="sm"
              weight={700}
            >
              {author.firstName + " " + author.lastName}
            </Text>
            <Group>
              <Text className="capitalize" size="xs" color="dimmed">
                {author.location && author.location.split("-")[0]}
              </Text>
              {author.content_count ? (
                <Fragment>
                  <Divider className="min-w-[10px] align-middle mt-1 px-0 mx-0" />
                  <Group spacing={8} noWrap>
                    <Text size="xs" weight={700}>
                      {author.content_count}
                    </Text>
                    <Text size="xs">
                      {author.content_count > 1 ? "Articles" : "Article"}
                    </Text>
                  </Group>
                </Fragment>
              ) : null}
            </Group>
          </Stack>
        </Group>
      </Group>
    </Group>
  ) : (
    <EmptyPlaceholder />
  );
};

export default HorizontalAuthorGridCard;
