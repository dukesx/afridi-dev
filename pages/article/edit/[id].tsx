/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Card,
  Grid,
  Input,
  Loader,
  LoadingOverlay,
  Modal,
  Stack,
  Text,
  TextInput,
  Title,
  useMantineColorScheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { supabaseClient, withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import Image from "next/image";
import React, { useEffect, useRef, useState } from "react";
import { MarkDownEditor } from "../../../components/global/editorCaller";
import AppWrapper from "../../../components/global/wrapper";
import ToastUIEditorLogo from "../../../public/tui-editor.png";
import ToastUIEditorScreenshot from "../../../public/tui-screenshot.png";
import ToastUIEditorDarkScreenshot from "../../../public/tui-dark.png";
import DeveloperZenMode from "../../../public/developer-zen.svg";
import CraftBeautifulArticles from "../../../public/craft-beautiful-articles.svg";
import EditOnTheGo from "../../../public/edit-on-the-go.svg";
import { Carousel } from "@mantine/carousel";
import { closeAllModals, openModal } from "@mantine/modals";
import ArticleEditSidebar from "../../../components/user/article/edit/sidebar";

const EditArticle = () => {
  //
  var ref: any = React.createRef();
  const media = useMediaQuery("(min-width: 900px)", false);
  const [loading, setLoading] = useState(false);
  const [articleEditorTour, setArticleEditorTour] = useState(false);
  const { user } = useUser();
  const { colorScheme } = useMantineColorScheme();
  const [loadingSetTour, setLoadingSetTour] = useState(false);
  //

  //
  const save = (editorRef) => {
    ref = editorRef;
  };

  const getMarkdown = () => {
    return ref.current.getInstance().getMarkdown() as string;
  };
  //

  const TourModalContent = (
    <Card className="bg-transparent">
      <Title order={3}>Welcome to The Afridi.Dev Editor 🎉</Title>
      <Text mt={3} color="dimmed" size="sm">
        The New & Modern Editing Experience
      </Text>
      <div className="mt-10">
        <Carousel
          // sx={{ maxWidth: 700 }}
          mx="auto"
          breakpoints={[
            { maxWidth: "md", slideSize: "50%" },
            { maxWidth: "sm", slideSize: "100%", slideGap: 0 },
          ]}
          withIndicators
          withControls
          draggable
        >
          <Carousel.Slide>
            <Stack spacing="xs">
              <Image
                height={450}
                width={450}
                src={EditOnTheGo}
                alt="Write on the go with Afridi.dev Editor"
              />
              <Stack className="w-[1000px] mx-auto">
                <Title ml="xl" mt="xs" order={4}>
                  An Editing Experience that keeps getting better 😍
                </Title>
                <Stack ml="xl" className="">
                  <Text className="mx-auto" ml="xl" size="sm">
                    Edit on the go with Markdown syntax with complete support
                    for <b className="mr-1">Github Flavoured Markdown (GFM)</b>{" "}
                    and more. Designed inspired from{" "}
                    <b>Github&apos;s own in-house editor</b>, bringing a whole
                    new level of confidence & comfort
                  </Text>
                </Stack>
              </Stack>
            </Stack>
          </Carousel.Slide>
          <Carousel.Slide>
            <Stack spacing="xs">
              <Image
                height={450}
                width={450}
                src={CraftBeautifulArticles}
                alt="Write on the go with Afridi.dev Editor"
              />
              <Stack className="w-[1000px] mx-auto">
                <Title ml="xl" mt="xs" order={4}>
                  Articles that speak for themselves 💪
                </Title>
                <Text ml="xl" size="sm">
                  Markdown is rendered with custom components specially crafted
                  to enhance the look & feel of the article. From images to
                  Titles, we have covered em all.
                </Text>
              </Stack>
            </Stack>
          </Carousel.Slide>
          <Carousel.Slide>
            <Stack spacing="xs">
              <Image
                height={450}
                width={450}
                src={DeveloperZenMode}
                alt="Write on the go with Afridi.dev Editor"
              />
              <Stack className="w-[1000px] mx-auto">
                <Title ml="xl" mt="xs" order={4}>
                  Turn on the ZEN with Markdown Preview 🧘‍♂️ 🤟
                </Title>
                <Text ml="xl" size="sm">
                  We have provided with a Preview tab within the editor to allow
                  developers to see how GFM is rendered. This helps keeping
                  things in perspective.
                </Text>
              </Stack>
            </Stack>
          </Carousel.Slide>
          <Carousel.Slide>
            <Stack spacing="xs">
              <Image
                className="!max-w-[100px] !min-w-[800px]"
                height={430}
                width={700}
                src={
                  colorScheme == "dark"
                    ? ToastUIEditorDarkScreenshot
                    : ToastUIEditorScreenshot
                }
                alt="Toast Ui Editor Screenshot"
              />
              <Title className="mx-auto" ml="xl" mt="xs" order={4}>
                Start The New Experience ✨
              </Title>
              <Button
                loading={loadingSetTour}
                onClick={async () => {
                  const { error, data } = await supabaseClient
                    .from("authors")
                    .update({
                      article_editor_tour: false,
                    })
                    .eq("id", user.id);

                  if (data) {
                    closeAllModals();
                  }

                  setLoadingSetTour(false);
                }}
                component="div"
                variant="gradient"
                gradient={{
                  from: "blue.6",
                  to: "indigo.6",
                  deg: 60,
                }}
                className="w-[360px] mx-auto"
              >
                Let&apos;s Go !
              </Button>
            </Stack>
          </Carousel.Slide>
        </Carousel>
      </div>

      <Stack mt="xl" pb="sm" spacing={8} align="center">
        <Text size="xs" color="dimmed">
          ⚡ Powered by <b>Toast UI Editor</b>
        </Text>
        <Image
          height={10}
          width={90}
          src={ToastUIEditorLogo}
          alt="toast-ui-editor logo"
        />
      </Stack>
    </Card>
  );

  const getTourModalValue = async () => {
    const { error, data } = await supabaseClient
      .from("authors")
      .select("article_editor_tour")
      .eq("id", user.id);

    // setArticleEditorTour(data[0].article_editor_tour);
    if (data[0].article_editor_tour) {
      openModal({
        title: "",
        size: "xl",
        withCloseButton: false,
        fullScreen: true,
        children: TourModalContent,
        transitionTimingFunction: "easeInOut",
        transition: "pop",
        transitionDuration: 1000,
        closeOnClickOutside: false,
        closeOnEscape: false,
      });
    }
  };

  useEffect(() => {
    if (user) {
      getTourModalValue();
    }
  }, [user]);

  //

  return (
    <AppWrapper noPadding activeHeaderKey="" size={1400}>
      <div className="relative ml-0 sm:ml-5">
        <LoadingOverlay
          loader={
            <Stack mb={50} align="center">
              <Loader variant="bars" color="blue" />
              <Text weight={600}>Publishing Article</Text>
            </Stack>
          }
          visible={loading}
          overlayBlur={2}
        />

        <Grid px={0} py="xl">
          <Grid.Col span={12} md={8}>
            <Input.Wrapper
              label="Content"
              description="Write your content here"
              required
            >
              <MarkDownEditor
                value=""
                saveData={save}
                autoFocus={false}
                className="mt-5 h-full min-h-[700px]"
                plugins
                previewStyle={"tab"}
                height="800px"
                toolbarItems
              />
            </Input.Wrapper>
          </Grid.Col>

          <Grid.Col span={12} md={4}>
            <Card
              sx={(theme) => ({
                height: "100%",
                backgroundColor:
                  colorScheme == "dark"
                    ? theme.colors.dark[6]
                    : theme.colors.gray[0],
              })}
            >
              <Text
                className="uppercase"
                pb="xl"
                pt="sm"
                weight={700}
                size="sm"
              >
                Article Settings
              </Text>

              <ArticleEditSidebar
                setLoading={setLoading}
                getMarkdown={getMarkdown}
              />
            </Card>
          </Grid.Col>
        </Grid>
      </div>
    </AppWrapper>
  );
};

export default EditArticle;

export const getServerSideProps = withPageAuth({ redirectTo: "/get-started" });
