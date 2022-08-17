import { MantineSize, Stack, type MantineTheme } from "@mantine/core";
import { Dropzone, IMAGE_MIME_TYPE } from "@mantine/dropzone";
import { showNotification } from "@mantine/notifications";
import { supabaseClient, type User } from "@supabase/auth-helpers-nextjs";
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
}

export enum ImageUploaderType {
  DP,
  COVER,
}

const ImageUploader = ({
  placeholder,
  user,
  setImage,
  theme,
  openRef,
  className,
  type,
  px,
  py,
}: ImageUploaderProps) => {
  const [loading, setLoading] = useState(false);
  return (
    <Dropzone
      loading={loading}
      px={px ? px : "sm"}
      py={py ? py : "sm"}
      className={className}
      openRef={openRef}
      onDrop={async (files) => {
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
            const { error } = await supabaseClient
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
          } else {
            const { error } = await supabaseClient
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
          }
          setImage(result.file.url.split("tr:n-400x")[1]);
          setLoading(false);
        }
      }}
      onReject={(files) => console.log("rejected files", files)}
      maxSize={3000000}
      accept={{
        "image/*": [],
      }}
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
        ) : (
          <Stack align="center">
            <IconUpload />
          </Stack>
        )}
      </Dropzone.Idle>
    </Dropzone>
  );
};

export default ImageUploader;
