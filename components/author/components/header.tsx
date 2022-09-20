import {
  Button,
  Card,
  ColorScheme,
  Group,
  MantineTheme,
  Skeleton,
} from "@mantine/core";
import { Session, User } from "@supabase/supabase-js";
import { IconPhoto } from "@tabler/icons";
import AfridiImage from "../../global/afridi-image";
import AfridiImageUploader, {
  ImageUploaderType,
} from "../../global/image_uploader";

interface AuthorProfileHeaderProps {
  session: Session;
  data: any;
  setCover: Function;
  cover: string;
  dp: string;
  setDp: Function;
  theme: MantineTheme;
  id: string;
  user: any;
  colorScheme: ColorScheme;
  openRef2: any;
}

const AuthorProfileHeader = ({
  session,
  data,
  setCover,
  cover,
  dp,
  setDp,
  theme,
  id,
  user,
  colorScheme,
  openRef2,
}: AuthorProfileHeaderProps) => {
  return (
    <Card.Section className="mx-0 relative h-[400px]">
      {!data ? (
        <Skeleton height={450} />
      ) : (
        <Group className="overflow-hidden">
          {session && session.user.id == id ? (
            <AfridiImageUploader
              className="border-0"
              type={ImageUploaderType.COVER}
              theme={theme}
              user={session.user}
              py={0.01}
              px={1}
              setImage={setCover}
              openRef={openRef2}
              placeholder={
                <AfridiImage
                  priority
                  isResponsive
                  fillImage={false}
                  path={
                    cover
                      ? `/${cover}`
                      : user.cover
                      ? `/${user.cover}`
                      : colorScheme == "dark"
                      ? "/image-horizontal-placeholder-dark.png"
                      : "/image-horizontal-placeholder.png"
                  }
                  style={{
                    objectFit: "cover",
                  }}
                />
              }
            />
          ) : (
            <AfridiImage
              priority
              fillImage={true}
              path={
                cover
                  ? `/${cover}`
                  : user.cover
                  ? `/${user.cover}`
                  : colorScheme == "dark"
                  ? "/image-horizontal-placeholder-dark.png"
                  : "/image-horizontal-placeholder.png"
              }
              style={{
                objectFit: "cover",
              }}
            />
          )}

          {session && session.user.id == id ? (
            <Button
              className="absolute rounded-full top-[20px] right-5"
              color="blue"
              variant="filled"
              leftIcon={<IconPhoto size={15} />}
              onClick={() => openRef2.current()}
            >
              Change Cover
            </Button>
          ) : null}
        </Group>
      )}
    </Card.Section>
  );
};

export default AuthorProfileHeader;
