import { Button, Stack, Text } from "@mantine/core";
import { closeAllModals, openModal } from "@mantine/modals";
import { NextLink } from "@mantine/next";
import Image from "next/image";
import Unauthorized from "../public/401.svg";

interface UnauthorizedModalProps {
  title?: string;
  description?: string;
}

export function getRandomNumber(min, max) {
  return Math.floor(Math.random() * (max - min + 1)) + min;
}

export const ShowUnauthorizedModal = (title?: any, description?: any) => {
  openModal({
    title: "Unauthorised",
    children: (
      <Stack spacing={4} align="center">
        <Image src={Unauthorized} height={200} width={200} alt="" />
        <Text weight={600}>
          {title ? title : "Ooops - You Can't perform this action"}
        </Text>
        <Text size="sm" color="dimmed">
          {description
            ? description
            : "You need to be signed in to follow tags"}
        </Text>
        <Button
          mt="xs"
          color="blue"
          fullWidth
          component={NextLink}
          onClick={() => {
            closeAllModals();
          }}
          href="/get-started"
        >
          Sign in
        </Button>
      </Stack>
    ),
  });
};
