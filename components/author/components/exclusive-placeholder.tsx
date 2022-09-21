import {
  ActionIcon,
  Code,
  CopyButton,
  Group,
  Stack,
  Text,
  Title,
  Tooltip,
} from "@mantine/core";
import { IconCheck, IconCopy, IconExternalLink } from "@tabler/icons";
import { Fragment } from "react";
import FollowRepoComponent from "../../global/misc/follow-repo";
import GetInvolvedInRFCComponent from "../../global/misc/get-involved-rfc";

const ExclusivePlaceholder = () => {
  return (
    <Fragment>
      <Stack className="text-center mx-auto max-w-[600px]" mt="xl">
        <Title order={3}>What&apos;s this?</Title>
        <Text size="sm" className="px-4">
          If everything goes according to plan, you can upload here your
          <b className="italic underline decoration-cyan-400 ml-1 mr-0.5 decoration-2">
            EXCLUSIVE
          </b>{" "}
          stuff like Paid App/Website/Theme Codes (Wordpress/Seperate PHP etc),
          Premium/Paid Articles, Paid/Premium Courses (Short/Long) etc that you
          will sell eventually for membership or retail price
          <b className="mx-1">(PERKS)</b>. Think of this feature like an
          ONLYFANS or{" "}
          <a target="blank" href="https://codecanyon.net">
            CodeCanyon
          </a>{" "}
          but for DEVS.
        </Text>
      </Stack>

      <Text className="text-center" mt="xl">
        Coming soon in <b>Version 2</b>. Stay Tuned 😇
      </Text>

      <FollowRepoComponent className="mt-5" />
      <GetInvolvedInRFCComponent className="mt-5" />
    </Fragment>
  );
};

export default ExclusivePlaceholder;
