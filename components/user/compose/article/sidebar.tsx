import { Button, Input, Modal, MultiSelect, Text } from "@mantine/core";
import { useForm } from "@mantine/form";
import { closeAllModals, openContextModal, openModal } from "@mantine/modals";
import { IconCloudUpload } from "@tabler/icons";
import React, { Fragment } from "react";
import { useState } from "react";
//

interface ArticleComposerSidebarProps {
  getMarkdown: () => string;
}

//
const ArticleComposeSidebar = ({
  getMarkdown,
}: ArticleComposerSidebarProps) => {
  //
  const form = useForm({
    initialValues: {
      tags: ["article", "programming"],
      content: "",
    },

    validate: {
      tags: (value) => (value.length <= 0 ? "Tags cannot be empty" : null),
    },
  });
  //

  const [tags, setTags] = useState([
    "angular",
    "javascript",
    "react",
    "programming",
    "svelte",
    "ssr",
    "ssg",
    "gatsby",
    "article",
    "framework",
  ]);
  //

  return (
    <form
      onSubmit={form.onSubmit((val) => {
        var markdown = getMarkdown();

        if (!markdown || markdown.length <= 0) {
          openModal({
            title: (
              <Text weight={700} color="red">
                Could Not Submit Article{" "}
                <span className="text-md ml-1">😓 ❌ 👇</span>
              </Text>
            ),

            children: (
              <Fragment>
                <Text mb="xl" size="sm" color="dimmed" weight={400}>
                  <b className="mr-[0.3px]">Reason:</b> You cannot submit an
                  empty article. Please ensure that article has enough content
                  before submitting
                </Text>
                <Button color="red" fullWidth onClick={closeAllModals} mt="md">
                  OK
                </Button>
              </Fragment>
            ),
          });
        }
      })}
    >
      <Input.Wrapper
        styles={{
          label: {
            fontSize: 12.5,
          },
        }}
        label="Tags (type to create your own)"
        description="For easy website search and SEO"
        required
      >
        <MultiSelect
          mt="md"
          mb={50}
          defaultValue={form.values.tags}
          searchable
          data={tags}
          creatable
          getCreateLabel={(query) => `+ Create #${query}`}
          onCreate={(query) => {
            var taga = tags;
            taga.push(query);
            setTags(taga);
            return query;
          }}
          onChange={(value) => form.setFieldValue("tags", value)}
          error={form.errors.tags}
        />
      </Input.Wrapper>

      <Button
        styles={{
          label: {
            fontSize: 13,
          },
        }}
        type="submit"
        leftIcon={<IconCloudUpload size={20} />}
        color="blue"
        mt="xl"
        fullWidth
      >
        Submit Content
      </Button>
    </form>
  );
};

export default ArticleComposeSidebar;
