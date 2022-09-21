import {
  ActionIcon,
  Code,
  CopyButton,
  Group,
  Tooltip,
  List,
  Stack,
  Text,
  ThemeIcon,
  Title,
  Divider,
} from "@mantine/core";
import {
  IconBulb,
  IconCheck,
  IconCopy,
  IconExternalLink,
  IconUserCircle,
} from "@tabler/icons";
import GetInvolvedInRFCComponent from "../../components/global/misc/get-involved-rfc";
import AppWrapper from "../../components/global/wrapper";

const Vision = () => {
  return (
    <AppWrapper size="md" activeHeaderKey="">
      <Stack pb="xl" className="w-full" mt="xl">
        <ThemeIcon
          className="rounded-full mx-auto"
          size={100}
          radius="xl"
          variant="light"
          color="yellow"
        >
          <IconBulb size={35} />
        </ThemeIcon>
        <Title mb="xl" className="mx-auto">
          The Vision
        </Title>

        <Text>
          The vision behind creating Afridi.dev is very simple, to teach and to
          learn. I may be a Doctor but i am a passionate programmer. I love to
          take deeper but smarter dives into technology. So in order to share my
          experience and combine it with others knowledge, i emabarked on this
          journey to create a CMS, just like dev.to, Hashnode but a little
          differently opinionated. There is alot on the roadmap to come. Version
          2.0 is yet, as of 21st September 2022, far but has alot of features
          incoming such as:
          <List spacing="xs" mt="xl" mb="xl">
            <List.Item>Channels/Brand Pages</List.Item>
            <List.Item ml="xl">Endorse/Sponsor Other Authors/Brands</List.Item>
            <List.Item ml="xl">Your Custom Branded Content</List.Item>
            <List.Item>Subscription system</List.Item>
            <List.Item ml="xl">
              Premium Articles & Tutorials like on Medium
            </List.Item>
            <List.Item ml="xl">Pay per view/read like on Medium</List.Item>
            <List.Item ml="xl">Exclusive Content Memberships like OF</List.Item>
            <List.Item ml="xl">Sponsorships like on Github</List.Item>

            <List.Item>Courses System</List.Item>
            <List.Item>Friends/Connections system like LinkedIn</List.Item>
            <List.Item>Chat System</List.Item>
            <List.Item ml="xl">1 to 1</List.Item>
            <List.Item ml="xl">Group (Under Consideration)</List.Item>
          </List>
          <Divider
            // color="blue"
            label="👇 We'd Love to hear your Feedback 👇"
            labelPosition="left"
            labelProps={{
              size: "md",
              weight: 700,
            }}
            className=""
            mt={3}
          />
          <GetInvolvedInRFCComponent
            className="mt-5"
            align="left"
            textSize="md"
          />
        </Text>
      </Stack>
    </AppWrapper>
  );
};

export default Vision;
