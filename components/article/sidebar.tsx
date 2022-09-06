import {
  Avatar,
  Button,
  Divider,
  Grid,
  Stack,
  Group,
  Text,
  Input,
  Tooltip,
  Card,
  Skeleton,
  Switch,
  type MantineTheme,
} from "@mantine/core";
import { NextLink } from "@mantine/next";
import { IconBellRinging, IconInfoCircle } from "@tabler/icons";
import { Fragment, Suspense } from "react";
import AfridiImage from "../global/afridi-image";
import SquareHorizontalWidget from "../landing/widgets/square-horizontal";

export type AfridiDevAuthor = {
  firstName: string;
  lastName: string;
  dp: string;
  cover?: string;
  id: string;
};

interface ArticleSidebarProps {
  data: {
    authors: AfridiDevAuthor;
    co_authors_articles: [{ authors: AfridiDevAuthor }];
  };
  theme: MantineTheme;
  flipSidebarOrientation: boolean;
  setFlipSidebarOrientation: (data: boolean) => void;
}

const ArticleSidebar = ({
  data,
  theme,
  flipSidebarOrientation,
  setFlipSidebarOrientation,
}: ArticleSidebarProps) => {
  return (
    <Fragment>
      <Card mt="xl" className="w-full pb-10" withBorder>
        <Group className="w-full items-center xs:justify-center md:justify-start">
          <Tooltip
            mt="xl"
            label={
              data
                ? data.authors.firstName + " " + data.authors.lastName
                : "loading author"
            }
          >
            <Avatar
              size={60}
              className="rounded-full"
              component={NextLink}
              href={data ? `/author/${data.authors.id}` : ""}
              radius="xl"
              color="blue"
            >
              {data ? (
                <AfridiImage
                  fillImage
                  height={63}
                  width={63}
                  path={data ? data.authors.dp : null}
                />
              ) : (
                <Skeleton height={50} width={50} />
              )}
            </Avatar>
          </Tooltip>
          <Stack className="md:mr-auto sm:mr-0" spacing={0}>
            <Text
              lineClamp={1}
              className="max-w-[130px]"
              mt={5}
              weight={700}
              size="xs"
            >
              {data
                ? data.authors.firstName + " " + data.authors.lastName
                : null}
            </Text>
            <Text size="xs" color="dimmed">
              Main Lead Author
            </Text>
          </Stack>

          <Button
            rightIcon={<IconBellRinging size={18} />}
            size="xs"
            radius="xl"
          >
            Subscribe
          </Button>
        </Group>
        <div className="hidden sm:block">
          {data &&
          data.co_authors_articles &&
          data.co_authors_articles.length > 0 ? (
            <Divider
              py="xl"
              label="Co-Authors Section"
              labelPosition="center"
              color="gray"
            ></Divider>
          ) : null}
          <Grid>
            {data
              ? data.co_authors_articles.map((mapped, index) => (
                  <Grid.Col my="sm" span={12} xs={6} key={"almac" + index}>
                    <Stack className="text-center" ml="xs" spacing={10}>
                      <Tooltip
                        mt="xl"
                        label={
                          mapped.authors.firstName + " " + data.authors.lastName
                        }
                      >
                        <Avatar
                          size={50}
                          className="rounded-full mx-auto"
                          component={NextLink}
                          href={data ? `/author/${mapped.authors.id}` : ""}
                          radius="xl"
                          color="blue"
                        >
                          {data ? (
                            <AfridiImage
                              fillImage
                              height={53}
                              width={53}
                              path={mapped.authors.dp}
                            />
                          ) : (
                            <Skeleton height={50} width={50} />
                          )}
                        </Avatar>
                      </Tooltip>

                      <Text weight={700} size="xs">
                        {mapped.authors.firstName +
                          " " +
                          mapped.authors.lastName}
                      </Text>

                      <Button
                        className="px-0 w-[120px] mx-auto"
                        rightIcon={<IconBellRinging size={18} />}
                        size="xs"
                        radius="xl"
                      >
                        Subscribe
                      </Button>
                    </Stack>
                  </Grid.Col>
                ))
              : null}
          </Grid>
        </div>
      </Card>
      <Card className="w-full h-[70px]" withBorder>
        <Group position="apart">
          <Input.Wrapper
            label={
              <Text size="sm">
                Switch sidebar side
                <Tooltip label="Click to learn more">
                  <Text component="a" href="#">
                    <IconInfoCircle
                      size={18}
                      className="align-sub ml-1"
                      color="gray"
                    />
                  </Text>
                </Tooltip>
              </Text>
            }
            description="to ease eye travel 👀"
          >
            {}
          </Input.Wrapper>
          <Switch
            size="xl"
            onLabel="Left"
            offLabel="Right"
            checked={flipSidebarOrientation}
            styles={{
              label: {},
              input: {
                width: !flipSidebarOrientation ? 74 : 65,
              },
            }}
            onChange={() => setFlipSidebarOrientation(!flipSidebarOrientation)}
          />
        </Group>
      </Card>
      <Suspense>
        <SquareHorizontalWidget
          theme={theme}
          icon={"✅"}
          title="Similar Articles"
          color="indigo"
          data={[]}
        />
      </Suspense>
    </Fragment>
  );
};

export default ArticleSidebar;
