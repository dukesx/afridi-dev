/* eslint-disable react-hooks/exhaustive-deps */
import {
  AppShell,
  Container,
  createStyles,
  useMantineTheme,
  type MantineNumberSize,
} from "@mantine/core";
import { openModal } from "@mantine/modals";
import { useSessionContext } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { type GeneralStore, useGeneralStore } from "../../data/static/store";
import GlobalHeader from "./header";
import AppLoader from "./loaders/appLoader";
import StudioSidebar from "../studio/sidebar/sidebar";
import WebsiteTourWizardBase from "./wizards/website-tour/wizardBase";
interface AppWrapperProps {
  children: any;
  size?: MantineNumberSize | number;
  activeHeaderKey: string;
  noPadding?: boolean;
  studio?: boolean;
  studioPath?: string;
  studioSubPath?: string;
}

const AppWrapper: React.FC<AppWrapperProps> = ({
  children,
  size,
  activeHeaderKey,
  noPadding,
  studio,
  studioPath,
  studioSubPath,
}) => {
  const theme = useMantineTheme();
  const { isLoading, session, error, supabaseClient } = useSessionContext();
  const appLoading = useGeneralStore((state: GeneralStore) => state.appLoading);

  const getUserProps = async () => {
    const { data } = await supabaseClient
      .from("authors")
      .select(
        `
      website_tour
      `
      )
      .eq("id", session.user.id);

    if (data[0].website_tour) {
      openModal({
        overlayBlur: 10,
        size: "lg",
        title: "",
        withCloseButton: false,
        closeOnClickOutside: false,
        closeOnEscape: false,
        children: (
          <WebsiteTourWizardBase
            client={supabaseClient}
            session={session}
            theme={theme}
          />
        ),
        transitionTimingFunction: "easeInOut",
        transition: "pop",
        transitionDuration: 1000,
      });
    }
  };
  useEffect(() => {
    if (session && session.user) {
      getUserProps();
    }
  }, [session]);

  const useStyles = createStyles((theme) => ({
    container: {
      paddingLeft: noPadding ? 0 : theme.spacing.xs,
      paddingRight: noPadding ? 0 : theme.spacing.xs,
    },
  }));

  const { classes } = useStyles();
  return (
    <AppShell
      navbar={
        studio ? (
          <StudioSidebar path={studioPath} subPath={studioSubPath} />
        ) : null
      }
      header={<GlobalHeader theme={theme} activeHeaderKey={activeHeaderKey} />}
      className="relative"
      styles={{
        body: {
          paddingLeft: 0,
          paddingRight: 0,
        },
        main: {
          "@media (max-width: 576px)": {
            paddingLeft: 0,
            paddingRight: 0,
          },
        },
      }}
    >
      <AppLoader theme={theme} loading={appLoading} />
      <Container className={classes.container} size={size ?? "xl"}>
        {children}
      </Container>
    </AppShell>
  );
};

export default AppWrapper;
