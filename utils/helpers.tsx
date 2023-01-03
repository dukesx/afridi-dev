import {
  Button,
  CloseButton,
  Group,
  Modal,
  Paper,
  Stack,
  Text,
  TextInput,
  ThemeIcon,
  Title,
} from "@mantine/core";
import { closeAllModals, openModal } from "@mantine/modals";
import { NextLink } from "@mantine/next";
import { IconBug } from "@tabler/icons";
import Image from "next/image";
import { DiscordLogo, GithubLogo } from "phosphor-react";
import AfridiEmptyPlaceholder from "../components/global/afridi-placeholder";
import AfridiLoading from "../components/global/afridi-loading";
import { playfair } from "../pages/_app";
import GoogleIcon from "../public/google.png";

interface UnauthorizedModalProps {
  title?: string;
  description?: string;
}

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

interface ShowErrorModalProps {
  title?: string;
  message?: string;
}
export const ShowErrorModal = (
  title?: string,
  message?: string,
  subDescription?: string
) => {
  return openModal({
    zIndex: 1000,
    size: "md",
    title: title ?? "Ooops! An error has occured",
    children: (
      <Stack spacing={0} className="pb-10" align="center">
        <ThemeIcon
          mt="xl"
          color="red"
          variant="light"
          className="rounded-full"
          size={100}
        >
          <IconBug />
        </ThemeIcon>

        <Text mt="lg" size="md" weight={700}>
          {message ?? "Sorry! an error occured"}
        </Text>
        <Text mt="xs" size="sm" color="dimmed">
          {subDescription ?? "We are working on it"}
        </Text>
      </Stack>
    ),
  });
};

export function textEllipsis(
  str: string,
  maxLength: number,
  { side = "end", ellipsis = "..." } = {}
) {
  if (str.length > maxLength) {
    switch (side) {
      case "start":
        return ellipsis + str.slice(-(maxLength - ellipsis.length));
      case "end":
      default:
        return str.slice(0, maxLength - ellipsis.length) + ellipsis;
    }
  }
  return str;
}

export function secondsToHms(d) {
  d = Number(d);
  var h = Math.floor(d / 3600);
  var m = Math.floor((d % 3600) / 60);
  var s = Math.floor((d % 3600) % 60);

  var hDisplay = h > 0 ? h + (h == 1 ? " hr " : " hr ") : "";
  var mDisplay = m > 0 ? m + (m == 1 ? " min " : " min ") : "";
  var sDisplay = s > 0 ? s + (s == 1 ? " second" : " seconds") : "";
  return s <= 59 && m <= 0 ? sDisplay : mDisplay;
}

export const UnAuthorizedModal = ({ opened, toggle, colorScheme, theme }) => (
  <Modal
    transitionDuration={1500}
    radius="md"
    zIndex={2000}
    opened={opened}
    onClose={() => toggle(false)}
    size="lg"
    padding={0}
    title={false}
    withCloseButton={false}
    transition="pop"
  >
    <Paper
      sx={{
        height: 600,
      }}
      radius="md"
      p="xs"
    >
      <Group pt={2} pr={4} position="right">
        <CloseButton
          onClick={() => toggle(false)}
          size={"lg"}
          iconSize={20}
          radius="md"
        />
      </Group>
      <Stack mb="auto" spacing={0} align="center" mt={80}>
        <Title weight={500} order={2}>
          Let&apos;s Get You Started
        </Title>

        <Text mt={8} size="sm" color="dimmed">
          Because it&apos;s easy, free & beneficial.
        </Text>

        <Stack mb="auto" spacing="lg" mt={50}>
          <Button
            color="gray"
            leftIcon={
              <Image priority width={20} height={20} src={GoogleIcon} alt="" />
            }
            variant="light"
            styles={{
              label: {
                fontWeight: 500,
                fontSize: 12,
              },
            }}
          >
            Start with a Google Account
          </Button>

          <Button
            color={"gray"}
            leftIcon={
              <GithubLogo
                color={
                  colorScheme == "dark" ? theme.white : theme.colors.dark[9]
                }
                strokeWidth={2}
                weight="duotone"
                size={18}
              />
            }
            variant="light"
            styles={{
              label: {
                fontWeight: 500,
                fontSize: 12,
              },
            }}
          >
            Start with a Github Account
          </Button>

          <Button
            color={"gray"}
            leftIcon={
              <DiscordLogo
                color={theme.colors.indigo[6]}
                strokeWidth={2}
                weight="duotone"
                size={18}
              />
            }
            variant="light"
            styles={{
              label: {
                fontWeight: 500,
                fontSize: 12,
              },
            }}
          >
            Start with a Discord Account
          </Button>
        </Stack>
      </Stack>
      <Group position="center">
        <Text
          color={colorScheme == "dark" ? "dimmed" : "dark"}
          variant="link"
          component="a"
          align="center"
          href="#"
          size="xs"
          mt={90}
        >
          Explore the benefits of a joining{" "}
          <Text
            component="span"
            style={{
              fontSize: 14,
              fontFamily: playfair.style.fontFamily,
              fontWeight: 600,
            }}
          >
            Afridi.dev
          </Text>
        </Text>
      </Group>
    </Paper>
  </Modal>
);

export const SearchModal = ({ colorScheme, toggle, opened, theme }) => (
  <Modal
    radius="md"
    centered
    zIndex={2000}
    withCloseButton={false}
    onClose={() => toggle(false)}
    opened={opened}
    size="md"
    styles={{
      modal: {
        background: "transparent",
        boxShadow: "none",
      },
    }}
    transition="pop"
    transitionDuration={200}
    overlayColor={
      colorScheme == "dark" ? theme.colors.gray[8] : theme.colors.gray[5]
    }
    overlayBlur={10}
  >
    <TextInput
      radius="xl"
      placeholder="Enter a term to start searching"
      styles={{
        input: {
          ":focus-within": {
            border:
              colorScheme == "light"
                ? "none"
                : `1px solid ${theme.colors.teal[7]}`,
          },
          ":focus": {
            border:
              colorScheme == "light"
                ? "none"
                : `1px solid ${theme.colors.teal[7]}`,
          },
          padding: "22px",
          "::placeholder": {
            fontSize: theme.fontSizes.xs,
          },
        },
      }}
    />
    <Paper radius="lg" mt="sm">
      {/* <AfridiSearchArticleListItem
            title="How to do things in 3 in 1 ways"
            description=" This is a punishement for a world that didnt pay for Winrar"
            cover="https://plus.unsplash.com/premium_photo-1663054729129-b6bddf57c952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          />
          <Fade>
            <Divider color={colorScheme == "dark" ? "gray.9" : "gray.2"} />
          </Fade>
          <AfridiSearchArticleListItem
            title="How to do things in 3 in 1 ways"
            description=" This is a punishement for a world that didnt pay for Winrar"
            cover="https://plus.unsplash.com/premium_photo-1663054729129-b6bddf57c952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          />
          <Fade>
            <Divider color={colorScheme == "dark" ? "gray.9" : "gray.2"} />
          </Fade>
          <AfridiSearchArticleListItem
            title="How to do things in 3 in 1 ways"
            description=" This is a punishement for a world that didnt pay for Winrar"
            cover="https://plus.unsplash.com/premium_photo-1663054729129-b6bddf57c952?ixlib=rb-4.0.3&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=1770&q=80"
          /> */}

      <AfridiEmptyPlaceholder
        mode="empty"
        title="Hmmm.... Empty"
        description="Enter a term to see results"
      />
      <AfridiLoading title="Fetching articles" />
    </Paper>
  </Modal>
);
