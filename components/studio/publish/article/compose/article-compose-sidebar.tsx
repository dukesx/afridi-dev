/* eslint-disable react/display-name */
/* eslint-disable react-hooks/exhaustive-deps */
import {
  ActionIcon,
  Avatar,
  Button,
  Card,
  CheckIcon,
  Chip,
  Code,
  ColorSwatch,
  CopyButton,
  Group,
  Input,
  Loader,
  Modal,
  MultiSelect,
  Stack,
  Text,
  Textarea,
  TextInput,
  Tooltip,
  useMantineColorScheme,
  useMantineTheme,
} from "@mantine/core";
import { useForm, UseFormReturnType } from "@mantine/form";
import { closeAllModals, openContextModal, openModal } from "@mantine/modals";
import { showNotification } from "@mantine/notifications";
import { useSessionContext, useUser } from "@supabase/auth-helpers-react";
import {
  IconCheck,
  IconCloudUpload,
  IconCopy,
  IconExternalLink,
  IconX,
} from "@tabler/icons";
import { useRouter } from "next/router";
import React, { createRef, forwardRef, Fragment, useEffect } from "react";
import { useState } from "react";
import { forbidden_tags } from "../../../../../data/static/forbidden_tags";
import AfridiImage from "../../../../global/afridi-image";
import AfridiImageUploader, {
  ImageUploaderType,
} from "../../../../global/image_uploader";
import slugify from "slugify";
import { secondsToHms } from "../../../../../utils/helpers";
//

interface ArticleComposerSidebarProps {
  setLoading: Function;
  cover: string;
  setCover: Function;
  form: UseFormReturnType<{
    tags: any[];
    content: string;
    coAuthors: any[];
    title: string;
    cover: string;
    description: string;
  }>;
  setCoverImage: Function;
}

//
const ArticleComposeSidebar = ({
  cover,
  setCover,
  setLoading,
  form,
  setCoverImage,
}: ArticleComposerSidebarProps) => {
  //
  const { isLoading, session, error, supabaseClient } = useSessionContext();
  const theme = useMantineTheme();
  var openRef: any = createRef();
  const router = useRouter();
  const [editorVal, setEditorVal] = useState("");
  const [coAuthorsLoading, setCoAuthorsLoading] = useState(false);
  const [coAuthors, setCoAuthors] = useState([]);

  //

  interface CoAuthorsItemProps extends React.ComponentPropsWithoutRef<"div"> {
    dp: string;
    full_name: string;
  }

  const CoAuthorCustomSelectComponent = forwardRef<
    HTMLDivElement,
    CoAuthorsItemProps
  >(({ dp, full_name, ...others }: CoAuthorsItemProps, ref) => (
    <div ref={ref} {...others}>
      <Group spacing="xs" className="w-full mr-4" noWrap>
        <Avatar radius="xl" className="rounded-full">
          {dp && <AfridiImage height={30} width={30} path={dp ?? null} />}
        </Avatar>

        <Stack>
          <Text>{full_name} </Text>
        </Stack>
      </Group>
    </div>
  ));

  return (
    <Fragment>
      {/* <Input.Wrapper
        styles={{
          label: {
            fontSize: 12.5,
          },
        }}
        label="Co-Authors"
        description="Add More Collaborators"
      >
        <MultiSelect
          placeholder="Search and Collaborate with Others"
          rightSection={coAuthorsLoading ? <Loader size="xs" /> : null}
          mt="md"
          mb="md"
          searchable
          valueComponent={CoAuthorCustomSelectComponent}
          itemComponent={CoAuthorCustomSelectComponent}
          filter={(value, selected, item) =>
            !selected &&
            item.full_name.toLowerCase().includes(value.toLowerCase().trim())
          }
          data={coAuthors ?? []}
          onSearchChange={async (query) => {
            setCoAuthorsLoading(true);
            const { error, data, count } = await supabaseClient
              .from("authors")
              .select(
                `
              full_name,
              id,
              dp
              `,
                { count: "exact" }
              )
              .ilike("full_name", `%${query}%`);

            if (data && data.length > 0) {
              if (count <= 0) {
              } else {
                setCoAuthorsLoading(false);
                var newMap = data.map((mapped) => {
                  var filtered = coAuthors.filter(
                    (filter) => filter.id == mapped.id
                  );

                  if (filtered.length == 0) {
                    return mapped;
                  }
                });
                var coauthors = [...coAuthors];
                newMap.map((mapped) => {
                  if (mapped !== undefined) {
                    coauthors.push({
                      ...mapped,
                      value: mapped.id,
                      id: mapped.id,
                    });
                  }
                });
                setCoAuthors(coauthors);
              }
            }
          }}
          maxDropdownHeight={160}
          onChange={(value) => form.setFieldValue("coAuthors", value)}
        />
      </Input.Wrapper> */}

      <Textarea
        mb="md"
        label="Description"
        {...form.getInputProps("description")}
        required
        placeholder="This is awesome because..."
        minRows={2}
      />

      <Input.Wrapper pb="xl" label="Cover" required error={form.errors.cover}>
        <AfridiImageUploader
          px={1}
          py={1}
          placeholder={
            cover ? (
              <AfridiImage
                fillImage
                className="max-w-[912px] w-full mx-auto h-full"
                height={200}
                width={300}
                path={cover}
              />
            ) : null
          }
          className={
            form.errors.cover
              ? "border border-dashed border-2 border-red-400"
              : ""
          }
          height={230}
          type={ImageUploaderType.NONE}
          theme={theme}
          user={session.user}
          setImage={setCoverImage}
          openRef={openRef}
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
        mt={0}
        fullWidth
      >
        Publish Article
      </Button>
    </Fragment>
  );
};

export default ArticleComposeSidebar;
