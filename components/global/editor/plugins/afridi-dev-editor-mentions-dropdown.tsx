/* eslint-disable react/display-name */
/* eslint-disable react/jsx-key */
import { Card, Divider, Stack, Text } from "@mantine/core";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { forwardRef, Fragment } from "react";

export default forwardRef((props: any, ref) => {
  const { supabaseClient, session } = useSessionContext();
  return (
    <Card py={8} withBorder>
      <Stack className="bg-transparent">
        {props.items.map((mapped) => {
          return (
            <Stack
              spacing={1}
              onClick={async () => {
                props.command({
                  id: mapped.id,
                  label: mapped.full_name,
                  avatar: mapped.dp,
                  username: mapped.username,
                });
              }}
            >
              <Text className="cursor-pointer" size="xs">
                {mapped.full_name}
              </Text>
              <Text className="cursor-pointer" color="dimmed" size="xs">
                @{mapped.username}
              </Text>
            </Stack>
          );
        })}
      </Stack>
    </Card>
  );
});
