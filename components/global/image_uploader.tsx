import {
  Loader,
  LoadingOverlay,
  MantineSize,
  Stack,
  Text,
  type MantineTheme,
} from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";
import { type User } from "@supabase/auth-helpers-nextjs";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { IconCheck, IconUpload, IconX } from "@tabler/icons";
import React, { useState, type MutableRefObject, type ReactNode } from "react";

interface ImageUploaderProps {
  placeholder?: string | ReactNode;
  setImage: Function;
  user: User;
  theme: MantineTheme;
  openRef?: MutableRefObject<() => void>;
  className?: string;
  type: ImageUploaderType;
  px?: MantineSize | number;
  py?: MantineSize | number;
  height?: string | number;
  client?: any;
}

export enum ImageUploaderType {
  DP,
  COVER,
  NONE,
}

const AfridiImageUploader = ({
  placeholder,
  user,
  setImage,
  theme,
  openRef,
  className,
  height,
  px,
  py,
  client,
  type,
}: ImageUploaderProps) => {
  const { isLoading, session, error, supabaseClient } = useSessionContext();
  const [reject, setReject] = useState(false);
  const [loading, setLoading] = useState(false);
  return (
    <div className={" relative"}>
      <LoadingOverlay
        loader={
          <Stack className="h-full w-full" align="center">
            <Loader variant="bars" color="blue" />
            <Text weight={600}>Uploading Image</Text>
          </Stack>
        }
        visible={loading}
        overlayBlur={2}
      />
      <Dropzone
        styles={{
          root: {
            padding: `${py ? py : theme.spacing.xs} ${
              px ? px : theme.spacing.xs
            }`,
          },
          inner: {
            height: "100%",
          },
        }}
        px={0}
        py={py ? py : "sm"}
        className={className}
        openRef={openRef}
        style={{
          height: height,
        }}
        onDrop={async (files) => {
          setReject(false);
          const form = new FormData();

          form.append("file", files[0]);
          setLoading(true);
          const res = await fetch(
            `${process.env.NEXT_PUBLIC_FUNCTIONS_URL}/upload/image/form`,
            {
              method: "POST",
              body: form,
            }
          );

          const result = await res.json();

          if (result) {
            if (type == ImageUploaderType.COVER) {
              const { error } = await (client ? client : supabaseClient)
                .from("authors")
                .update({
                  cover: result.file.url.split("tr:n-400x")[1],
                })
                .eq("id", user.id);

              if (!error) {
                showNotification({
                  title: "Success!",
                  message: "Cover Photo has been updated successfully",
                  color: "teal",
                  icon: <IconCheck />,
                });
              }
            }
            if (type == ImageUploaderType.DP) {
              const { error } = await (client ? client : supabaseClient)
                .from("authors")
                .update({
                  dp: result.file.url.split("tr:n-400x")[1],
                })
                .eq("id", user.id);
              if (!error) {
                showNotification({
                  title: "Success!",
                  message: "Profile Picture has been updated successfully",
                  color: "teal",
                  icon: <IconCheck />,
                });
              }
            } else {
              setLoading(false);
            }
            setImage(result.file.url.split("tr:n-400x")[1]);
            setLoading(false);
          } else {
            setLoading(false);
          }
        }}
        onReject={(files) => setReject(true)}
        maxSize={1000000}
        accept={["image/png", "image/jpeg", "image/gif", "image/webp"]}
      >
        <Dropzone.Accept>
          <IconCheck color={theme.colors.teal[6]} />
        </Dropzone.Accept>

        <Dropzone.Reject>
          <IconX color={theme.colors.red[6]} />
        </Dropzone.Reject>

        <Dropzone.Idle>
          {placeholder ? (
            placeholder
          ) : reject ? (
            <Stack
              className="h-full flex flex-col items-center justify-center"
              align="center"
            >
              <IconUpload />
              <Text
                size="xs"
                className="px-6 text-center"
                lineClamp={2}
                color="red"
                weight={600}
              >
                Failed to upload. Max allowed file size is 1MB. Only JPEG,GIF &
                PNG are supported.
              </Text>
            </Stack>
          ) : (
            <Stack
              className="h-full flex flex-col items-center justify-center"
              align="center"
            >
              <IconUpload />
              <Text size="sm">Upload an Image 🙃</Text>
            </Stack>
          )}
        </Dropzone.Idle>
      </Dropzone>
    </div>
  );
};

export default AfridiImageUploader;
