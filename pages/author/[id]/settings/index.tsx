/* eslint-disable react-hooks/exhaustive-deps */
import {
  Avatar,
  Button,
  Card,
  Center,
  Group,
  Input,
  Select,
  Skeleton,
  Stack,
  Tabs,
  Text,
  TextInput,
  Title,
  useMantineTheme,
} from "@mantine/core";
import { useMediaQuery } from "@mantine/hooks";
import { IconCheck, IconSettings, IconUserCircle, IconX } from "@tabler/icons";
import AppWrapper from "../../../../components/global/wrapper";
import { useForm } from "@mantine/form";
import { forwardRef, Fragment, useState } from "react";
import { countries } from "../../../../data/static/countries";
import "country-flag-icons/3x2/flags.css";
import { useEffect } from "react";
import { withPageAuth } from "@supabase/auth-helpers-nextjs";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import { showNotification } from "@mantine/notifications";
import React from "react";
import { MarkDownEditor } from "../../../../components/global/editor/editorCaller";

const UserSettingsPage = () => {
  const theme = useMantineTheme();
  const mobile = useMediaQuery("(max-width: 500px)", false);
  const form1 = useForm({
    initialValues: {
      firstName: "",
      lastName: "",
      location: "pakistan",
    },

    validate: {
      firstName: (value) =>
        value.length < 2 ? "Name cannot be less than 3 characters" : null,
      lastName: (value) =>
        value.length < 2 ? "Name cannot be less than 3 characters" : null,
      location: (value) =>
        value.length <= 0 ? "Location cannot be empty" : null,
    },
  });

  const form2 = useForm({
    initialValues: {
      about: "",
      githubProfile: "",
    },

    validate: {
      about: (value) =>
        ref.current.getInstance().getMarkdown().split(" ").length < 50
          ? "Bio cannot be less than 100 words"
          : ref.current.getInstance().getMarkdown().length <= 0
          ? "Bio cannot be empty"
          : null,

      githubProfile: (value) =>
        /^(https):\/\/(github.com)[^abc$]*$/gm.test(value)
          ? null
          : "This is not a valid github url",
    },
  });
  const [activeTab, setActiveTab] = useState<string | null>("general");

  const [generalLoading, setGeneralLoading] = useState(true);
  const [aboutLoading, setAboutLoading] = useState(true);
  const { isLoading, session, error, supabaseClient } = useSessionContext();
  interface ItemProps extends React.ComponentPropsWithoutRef<"div"> {
    image: string;
    label: string;
    code: string;
  }

  const newCountrues = [];

  countries.map((mapped) =>
    newCountrues.push({
      label: mapped.name,
      code: mapped.code,
      value: mapped.name.toLocaleLowerCase() + "-" + mapped.code,
    })
  );

  // eslint-disable-next-line react/display-name
  const SelectItem = forwardRef<HTMLDivElement, ItemProps>(
    ({ label, code, ...others }: ItemProps, ref) => (
      <div ref={ref} {...others}>
        <Group>
          <span className={`flag:${code}`} />
          <Text size="sm">{label}</Text>
        </Group>
      </div>
    )
  );
  var ref: any = React.createRef();

  const getGeneralData = async () => {
    const { data, error } = await supabaseClient
      .from("authors")
      .select(
        `
          firstName,
          lastName,
          location
          `
      )
      .eq("id", session.user.id);
    if (!error) {
      setGeneralLoading(false);
      form1.setFieldValue("firstName", data[0].firstName ?? "");
      form1.setFieldValue("lastName", data[0].lastName ?? "");
      form1.setFieldValue("location", data[0].location ?? "pakistan");
    }
  };

  const getAboutData = async () => {
    const { data, error } = await supabaseClient
      .from("authors")
      .select(
        `
      bio,
      github
      `
      )
      .eq("id", session.user.id);
    if (!error) {
      setAboutLoading(false);
      form2.setFieldValue("about", data[0].bio ?? "");
      form2.setFieldValue("githubProfile", data[0].github ?? "");
    }
  };

  const save = (data) => {
    ref = data;
  };

  useEffect(() => {
    if (session.user) {
      switch (activeTab) {
        case "general":
          getGeneralData();
          break;

        case "about":
          getAboutData();
          break;

        default:
          break;
      }
    }
  }, [session, activeTab]);

  return (
    <AppWrapper activeHeaderKey="" size="lg">
      <Center>
        <Card className="px-2 xs:p-5 w-full mt-5 sm:mt-[50px] border border-solid border-gray-200/80 dark:border-0">
          <Tabs
            value={activeTab}
            onTabChange={setActiveTab}
            orientation={mobile ? "horizontal" : "vertical"}
            color="blue"
            defaultValue="general"
            styles={{
              tabsList: {
                width: mobile ? "100%" : 300,
              },
            }}
          >
            <Tabs.List>
              <Tabs.Tab
                icon={<IconSettings color={theme.colors.blue[6]} />}
                value="general"
              >
                <Text>General</Text>
              </Tabs.Tab>

              <Tabs.Tab
                icon={<IconUserCircle color={theme.colors.cyan[6]} />}
                value="about"
              >
                <Text>About</Text>
              </Tabs.Tab>
            </Tabs.List>
            <Tabs.Panel
              value="general"
              pl={mobile ? 0 : "xl"}
              pt={mobile ? "xl" : "xs"}
            >
              <Title order={4} mb={40} mt="xs">
                General Settings
              </Title>
              {generalLoading ? (
                <Fragment>
                  <Stack spacing={30}>
                    <Stack spacing="xs">
                      <Skeleton height={18} width={100} />
                      <Skeleton height={40} />
                    </Stack>
                    <Stack spacing="xs">
                      <Skeleton height={18} width={100} />
                      <Skeleton height={40} />
                    </Stack>
                    <Stack spacing="xs">
                      <Skeleton height={18} width={100} />
                      <Skeleton height={40} />
                    </Stack>

                    <Skeleton
                      className="w-full"
                      height={40}
                      radius="sm"
                      width={100}
                    />
                  </Stack>
                </Fragment>
              ) : (
                <form
                  onSubmit={form1.onSubmit(async (val) => {
                    const { error, data } = await supabaseClient
                      .from("authors")
                      .update({
                        firstName: val.firstName,
                        lastName: val.lastName,
                        location: val.location,
                      })
                      .eq("id", session.user.id).select(`
                      firstName,
                      lastName,
                      location
                      `);

                    if (data) {
                      showNotification({
                        message: "Your changes have been saved successfully",
                        title: "Saved Successfully",
                        color: "teal",
                        icon: <IconCheck size={18} />,
                      });
                    } else {
                      if (error) {
                        showNotification({
                          message: error.message,
                          title: "Your changes could not be saved",
                          color: "red",
                          icon: <IconX size={18} />,
                        });
                      }
                    }
                  })}
                >
                  <TextInput
                    required
                    label="First Name"
                    placeholder="Marc"
                    {...form1.getInputProps("firstName")}
                  />
                  <TextInput
                    mt="xl"
                    required
                    label="Last Name"
                    placeholder="Webb"
                    {...form1.getInputProps("lastName")}
                    mb="xl"
                  />

                  <Select
                    required
                    label="Country of Origin"
                    placeholder="My country is..."
                    itemComponent={SelectItem}
                    data={newCountrues}
                    searchable
                    maxDropdownHeight={400}
                    nothingFound="Country not found"
                    filter={(value, item) =>
                      item.label
                        .toLowerCase()
                        .includes(value.toLowerCase().trim())
                    }
                    mb={50}
                    {...form1.getInputProps("location")}
                  />

                  <Button type="submit" fullWidth mt="xl">
                    Save Changes
                  </Button>
                </form>
              )}
            </Tabs.Panel>

            <Tabs.Panel value="about" pl="xl" pt={mobile ? "xl" : "xs"}>
              <Title order={4} mb={20} mt="xs">
                Personal Settings
              </Title>
              {aboutLoading ? (
                <Stack spacing="xl">
                  <Stack>
                    <Skeleton height={25} width={180} />
                    <Skeleton height={150} className="w-full" />
                  </Stack>
                  <Stack spacing="xs">
                    <Skeleton height={18} width={100} />
                    <Skeleton height={40} />
                  </Stack>
                  <Skeleton mt={10} height={40} className="w-full" />
                </Stack>
              ) : (
                <Fragment>
                  <form
                    onSubmit={form2.onSubmit(async (val) => {
                      var markdown = ref.current.getInstance().getMarkdown();
                      form2.setFieldValue("about", markdown);
                      const { error, status } = await supabaseClient
                        .from("authors")
                        .update({
                          bio: markdown,
                          github: val.githubProfile,
                        })
                        .eq("id", session.user.id);
                      if (status == 200) {
                        showNotification({
                          message: "Your changes have been saved successfully",
                          title: "Saved Successfully",
                          color: "teal",
                          icon: <IconCheck size={18} />,
                        });
                      } else {
                        showNotification({
                          message: "A server error has occurred",
                          title: "Your changes could not be saved",
                          color: "red",
                          icon: <IconX size={18} />,
                        });
                      }
                    })}
                  >
                    <Input.Wrapper
                      label="About me (GFM is supported)"
                      required
                      error={form2.errors.about}
                    >
                      <MarkDownEditor
                        toolbarItems
                        autoFocus={false}
                        value={form2.values.about}
                        height="290px"
                        saveData={save}
                        previewStyle="tab"
                        plugins
                      />
                    </Input.Wrapper>

                    <TextInput
                      required
                      mt="xl"
                      label="Github profile"
                      placeholder="https://github.com/your-profile"
                      {...form2.getInputProps("githubProfile")}
                      mb={30}
                    />

                    <Button type="submit" mt="xl" fullWidth>
                      Save Changes
                    </Button>
                  </form>
                </Fragment>
              )}
            </Tabs.Panel>
          </Tabs>
        </Card>
      </Center>
    </AppWrapper>
  );
};

export default UserSettingsPage;

export const getServerSideProps = withPageAuth({ redirectTo: "/get-started" });
