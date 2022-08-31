/* eslint-disable react-hooks/exhaustive-deps */
import { AppProps } from "next/app";
import Head from "next/head";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { generalStore } from "../data/static/store";
import { StoreProvider } from "easy-peasy";
import { useColorScheme, useHotkeys, useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";
import "../styles/app.scss";
import { IKContext } from "imagekitio-react";
import { RouterTransition } from "../components/global/router-transition";
import { GetServerSidePropsContext } from "next";
import { getCookie, setCookie } from "cookies-next";
import { UserProvider } from "@supabase/auth-helpers-react";
import { supabaseClient } from "@supabase/auth-helpers-nextjs";
import { appCache } from "../utils/cache";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;

  //States
  const [iteration, setIteration] = useState(0);
  const preferredColorScheme = useColorScheme();
  const [newColorScheme, setNewColorScheme] = useLocalStorage<ColorScheme>({
    key: "afridi-dev-color-scheme",
    defaultValue: props.colorScheme ?? null,
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) => {
    const nextColorScheme =
      value || (newColorScheme === "dark" ? "light" : "dark");
    setNewColorScheme(nextColorScheme);

    if (nextColorScheme == "dark") {
      document.body.classList.remove("light");
      document.body.classList.add("dark");
    } else {
      document.body.classList.remove("dark");
      document.body.classList.add("light");
    }
    setCookie("afridi-dev-color-scheme", nextColorScheme, {
      maxAge: 60 * 60 * 24 * 30,
    });
  };

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  useEffect(() => {
    setIteration(iteration + 1);
    if (iteration == 1) {
      if (!newColorScheme) {
        setNewColorScheme(preferredColorScheme);
      }
    }
  }, [preferredColorScheme]);

  //Return @JSX

  return (
    <>
      <Head>
        <title>Page title</title>
      </Head>
      <UserProvider supabaseClient={supabaseClient}>
        <ColorSchemeProvider
          colorScheme={newColorScheme}
          toggleColorScheme={toggleColorScheme}
        >
          <MantineProvider
            withGlobalStyles
            withNormalizeCSS
            theme={{
              colorScheme: newColorScheme,
              fontFamily: "Inter, sans-serif",
              fontFamilyMonospace: "Monaco, Courier, monospace",
              headings: { fontFamily: "Inter, sans-serif" },
              primaryColor: "cyan",
            }}
            emotionCache={appCache}
          >
            <RouterTransition />

            {/** @ts-ignore */}
            <StoreProvider store={generalStore}>
              <IKContext urlEndpoint="https://ik.imagekit.io/afrididotdev">
                <NotificationsProvider position="top-right">
                  <ModalsProvider>
                    <Component {...pageProps} />
                  </ModalsProvider>
                </NotificationsProvider>
              </IKContext>
            </StoreProvider>
          </MantineProvider>
        </ColorSchemeProvider>
      </UserProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie("afridi-dev-color-scheme", ctx) || "light",
});
