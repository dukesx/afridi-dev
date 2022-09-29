/* eslint-disable react-hooks/exhaustive-deps */
import {
  Button,
  Group,
  type MantineTheme,
  MultiSelect,
  Stack,
  Text,
  Loader,
  Chip,
  useMantineTheme,
  Input,
} from "@mantine/core";
import { getFloatingPosition } from "@mantine/core/lib/Floating";
import { useForm } from "@mantine/form";
import { type User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { type Session } from "@supabase/supabase-js";
import { IconArrowLeft } from "@tabler/icons";
import { useEffect, useState } from "react";
import { forbidden_tags } from "../../../../data/static/forbidden_tags";

export interface WelcomeWizardStepProps {
  setStep: (arg: number) => void;
  step: number;
  user?: User;
  theme?: MantineTheme;
  client?: any;
  session?: Session;
}

const TagPickingStep = ({
  setStep,
  step,
  client,
  session,
}: WelcomeWizardStepProps) => {
  const [step3Loading, setStep3Loading] = useState(false);
  const [tagsLoading, setTagsLoading] = useState(false);
  const form2 = useForm({
    initialValues: {
      tags: [],
    },
    validate: {
      tags: (arra) =>
        arra.length < 5 ? "You must select atleast 5 tags" : null,
    },
  });

  const [tags, setTags] = useState([]);
  const [newTags, setNewTags] = useState([]);
  const theme = useMantineTheme();
  const getTags = async () => {
    setTagsLoading(true);
    const { error, data } = await client
      .from("tags")
      .select(
        `
      id,
      title,
      color
      `
      )
      .limit(40)
      .order("content_count", {
        ascending: false,
      })
      .gt("content_count", 0);
    var tagsArray = [];
    //
    //
    data.map((mapped) =>
      tagsArray.push({
        label: mapped.title,
        value: mapped.id,
        color: mapped.color,
      })
    );

    setTags(tagsArray);
    form2.setFieldValue("tags", ["article", "programming"]);
    setTagsLoading(false);
  };

  useEffect(() => {
    getTags();
  }, []);

  return (
    <Stack spacing={0}>
      <Text className="text-center" weight={500} size={40}>
        Better Feeds w/ Tags ⚡
      </Text>
      <Text className="mx-auto" mb={30} size="sm" color="dimmed">
        Follow some tags to get better recommended articles in your feed.
      </Text>
      <form
        onSubmit={form2.onSubmit(async (val) => {
          setStep3Loading(true);
          val.tags.map(async (mapped) => {
            const { error, data } = await client
              .from("author_followed_tags")
              .insert({
                author_id: session.user.id,
                tag_id: mapped,
              });
          });

          setStep3Loading(false);
          setStep(3);
        })}
      >
        <Input.Wrapper
          styles={{
            error: {
              marginTop: theme.spacing.sm,
              fontWeight: 500,
            },
          }}
          required
          error={form2.errors.tags}
        >
          {tags && !tagsLoading && (
            <Chip.Group
              className=""
              color="blue"
              value={newTags}
              onChange={(val) => {
                setNewTags(val);
                form2.setFieldValue("tags", val);
              }}
              spacing="sm"
              multiple
              style={{
                border: form2.errors.tags
                  ? `2px solid ${theme.fn.themeColor("red")}`
                  : null,
                padding: form2.errors.tags ? theme.spacing.sm : null,
              }}
            >
              {tags.map((mapped) => {
                return (
                  <Chip
                    variant="filled"
                    className="capitalize font-medium"
                    color={mapped.color ?? "gray"}
                    value={mapped.value}
                    key={mapped.value}
                    // styles={{
                    //   label: {
                    //     color: theme.white,
                    //     backgroundColor: mapped.color
                    //       ? `${theme.fn.themeColor(
                    //           mapped.color ?? theme.colors.gray
                    //         )} !important`
                    //       : `${theme.fn.themeColor("gray")} !important`,
                    //   },
                    //   checkIcon: {
                    //     fill: theme.white,
                    //     color: theme.white,
                    //   },
                    // }}
                  >
                    {mapped.label}
                  </Chip>
                );
              })}
            </Chip.Group>
          )}
        </Input.Wrapper>
        {/* <MultiSelect
          rightSection={tagsLoading ? <Loader size="xs" /> : null}
          mt="md"
          mb="md"
          searchable
          data={tags.length <= 0 ? [] : tags}
          onSearchChange={async (query) => {
            if (
              !tags.includes(query) &&
              !forbidden_tags.includes(query.toLowerCase())
            ) {
              setTagsLoading(true);
              const { error, data, count } = await client
                .from("tags")
                .select("title", { count: "exact" })
                .match({ title: query });

              if (data) {
                setTagsLoading(false);
                if (count <= 0) {
                } else {
                  var taga = [...tags];
                  taga.push(data[0].title);
                  setTags(taga);
                }
              }
            }
          }}
          maxDropdownHeight={160}
          onChange={(value) => form2.setFieldValue("tags", value)}
          error={form2.errors.tags}
        /> */}

        <Group className="w-full" position="center" mt={50}>
          <Button
            leftIcon={<IconArrowLeft />}
            onClick={() => setStep(step - 1)}
            variant="subtle"
          >
            Back
          </Button>

          <Button loading={step3Loading} type="submit" variant="light">
            Next Step
          </Button>
        </Group>
      </form>
    </Stack>
  );
};

export default TagPickingStep;
