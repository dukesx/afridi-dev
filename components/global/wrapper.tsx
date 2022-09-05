/* eslint-disable react-hooks/exhaustive-deps */
import {
  Container,
  useMantineTheme,
  type MantineNumberSize,
} from "@mantine/core";
import { openModal } from "@mantine/modals";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { useUser } from "@supabase/auth-helpers-react";
import { useEffect } from "react";
import { GeneralStore, useGeneralStore } from "../../data/static/store";
import GlobalHeader from "./header";
import AppLoader from "./loaders/appLoader";
import WebsiteTourWizardBase from "./wizards/website-tour/wizardBase";
interface AppWrapperProps {
  children: any;
  size?: MantineNumberSize | number;
  activeHeaderKey: string;
  noPadding?: boolean;
}

const AppWrapper: React.FC<AppWrapperProps> = ({
  children,
  size,
  activeHeaderKey,
  noPadding,
}) => {
  const theme = useMantineTheme();
  const { user } = useUser();
  const appLoading = useGeneralStore((state: GeneralStore) => state.appLoading);

  const getUserProps = async () => {
    const { data } = await supabaseClient
      .from("authors")
      .select(
        `
      website_tour
      `
      )
      .eq("id", user.id);

    if (data[0].website_tour) {
      openModal({
        overlayBlur: 10,
        size: "lg",
        title: "",
        withCloseButton: false,
        closeOnClickOutside: false,
        closeOnEscape: false,
        children: <WebsiteTourWizardBase theme={theme} />,
        transitionTimingFunction: "easeInOut",
        transition: "pop",
        transitionDuration: 1000,
      });
    }
  };
  useEffect(() => {
    if (user) {
      getUserProps();
    }
  }, [user]);
  return (
    <div className="relative">
      <AppLoader theme={theme} loading={appLoading} />
      <GlobalHeader theme={theme} activeHeaderKey={activeHeaderKey} />
      <Container
        className={(noPadding ? "px-0" : "px-0 xs:px-5 ") + ""}
        size={size ?? "xl"}
      >
        {children}
      </Container>
    </div>
  );
};

export default AppWrapper;
