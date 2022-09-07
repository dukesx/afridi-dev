import ToastUIEditorLogo from "../../../public/tui-editor.png";
import ToastUIEditorScreenshot from "../../../public/tui-screenshot.png";
import ToastUIEditorDarkScreenshot from "../../../public/tui-dark.png";
import DeveloperZenMode from "../../../public/developer-zen.svg";
import CraftBeautifulArticles from "../../../public/craft-beautiful-articles.svg";
import EditOnTheGo from "../../../public/edit-on-the-go.svg";
import { Carousel } from "@mantine/carousel";
import { closeAllModals, openModal } from "@mantine/modals";
import {
  Card,
  Text,
  Title,
  Stack,
  Button,
  useMantineColorScheme,
} from "@mantine/core";
import Image from "next/image";
import { useState } from "react";
import { useSessionContext } from "@supabase/auth-helpers-react";

const EditorTourModal = () => {
  const { colorScheme } = useMantineColorScheme();
  const [loadingSetTour, setLoadingSetTour] = useState(false);
  const { isLoading, session, error, supabaseClient } = useSessionContext();

  return (
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
                    .eq("id", session.user.id);

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
};

export default EditorTourModal;
