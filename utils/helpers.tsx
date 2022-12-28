import { Button, Stack, Text, ThemeIcon } from "@mantine/core";
import { closeAllModals, openModal } from "@mantine/modals";
import { NextLink } from "@mantine/next";
import { IconBug } from "@tabler/icons";
import Image from "next/image";
import Unauthorized from "../public/401.svg";

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
