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
          sx={{ maxWidth: 600 }}
          mx="auto"
          align="center"
          slideGap="md"
          withIndicators
          withControls
        >
          <Carousel.Slide>
            {/* <Image
              height={300}
              width={300}
              src={EditOnTheGo}
              alt="Write on the go with Afridi.dev Editor"
            /> */}
            <Title className="max-w-[90%]" ml="xl" my="xl" order={4}>
              An Editing Experience that keeps getting better 😍
            </Title>
            <Text className="max-w-[90%]" lineClamp={2} ml="xl" size="sm">
              Edit on the go with Markdown syntax with complete support for{" "}
              <b className="mr-1">Github Flavoured Markdown (GFM)</b> and more.
              Designed inspired from <b>Github&apos;s own in-house editor</b>,
              bringing a whole new level of confidence & comfort
            </Text>
          </Carousel.Slide>
          <Carousel.Slide>
            {/* <Image
              height={300}
              width={300}
              src={CraftBeautifulArticles}
              alt="Write on the go with Afridi.dev Editor"
            /> */}
            <Title ml="xl" mt="xs" order={4}>
              Articles that speak for themselves 💪
            </Title>
            <Text className="max-w-[90%]" lineClamp={2} ml="xl" size="sm">
              Markdown is rendered with custom components specially crafted to
              enhance the look & feel of the article. From images to Titles, we
              have covered em all.
            </Text>
          </Carousel.Slide>
          <Carousel.Slide>
            {/* <Image
              height={300}
              width={300}
              src={DeveloperZenMode}
              alt="Write on the go with Afridi.dev Editor"
            /> */}
            <Title ml="xl" my="xl" order={4}>
              Turn on the ZEN with Previews
            </Title>
            <Text className="max-w-[90%]" lineClamp={2} ml="xl" size="sm">
              We have provided with a Preview tab within the editor to allow
              developers to see how GFM is rendered. This helps keeping things
              in perspective.
            </Text>
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
