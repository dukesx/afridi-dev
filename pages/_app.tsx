/* eslint-disable react-hooks/exhaustive-deps */
import { AppProps } from "next/app";
import Head from "next/head";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
} from "@mantine/core";
import { useColorScheme, useHotkeys, useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";
import "../styles/app.scss";
import { RouterTransition } from "../components/global/router-transition";
import { GetServerSidePropsContext } from "next";
import { setCookie, getCookie } from "cookies-next";
import { appCache } from "../utils/cache";
import { createBrowserSupabaseClient } from "@supabase/auth-helpers-nextjs";
import { SessionContextProvider } from "@supabase/auth-helpers-react";
import { NotificationsProvider } from "@mantine/notifications";
import { ModalsProvider } from "@mantine/modals";
import { DefaultSeo, SocialProfileJsonLd } from "next-seo";

export default function App(props: AppProps & { colorScheme: ColorScheme }) {
  const { Component, pageProps } = props;

  //States
  const [iteration, setIteration] = useState(0);
  const preferredColorScheme = useColorScheme();
  const [supabaseClient] = useState(() => createBrowserSupabaseClient());
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

  return (
    <>
      <Head>
        <title>Page title</title>
      </Head>
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

          <NotificationsProvider position="top-right">
            <ModalsProvider>
              <SessionContextProvider
                supabaseClient={supabaseClient}
                //@ts-ignore
                initialSession={pageProps && pageProps.initialSession}
              >
                <DefaultSeo
                  title="Welcome to Afridi.dev!"
                  description="The DEV's blog"
                  canonical="https://afridi.dev"
                  openGraph={{
                    url: "https://afridi.dev",
                    title: "Welcome to Afridi.dev!",
                    description: "The DEV's blog",
                    site_name: "Afridi.dev",
                    images: [
                      {
                        url: "https://ik.imagekit.io/afrididotdev/tr:w-800/afridi-dev-facebook-cover.png",
                        width: 800,
                        height: 800,
                        alt: "Afridi.DEV Cover Image - Light",
                        type: "image/jpeg",
                      },
                      {
                        url: "https://ik.imagekit.io/afrididotdev/tr:w-800/afridi-dev-light.png",
                        width: 800,
                        height: 800,
                        alt: "Afridi.DEV Cover Image - Dark",
                        type: "image/jpeg",
                      },
                      {
                        url: "https://ik.imagekit.io/afrididotdev/tr:w-800/afridi-dev-dark.png",
                        width: 800,
                        height: 800,
                        alt: "Afridi.DEV Cover Image - Dark",
                        type: "image/jpeg",
                      },
                    ],
                  }}
                  facebook={{
                    appId: "1047539702585462",
                  }}
                  twitter={{
                    handle: "@afrididotdev",
                    site: "https://afridi.dev",
                    cardType: "summary_large_image",
                  }}
                />
                <SocialProfileJsonLd
                  type="Organization"
                  name="Afridi.dev"
                  url="https://afridi.dev"
                  sameAs={[
                    "https://www.facebook.com/afridi-dev",
                    "http://www.twitter.com/afridi-dev",
                  ]}
                />
                <Component {...pageProps} />
              </SessionContextProvider>
            </ModalsProvider>
          </NotificationsProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}

App.getInitialProps = ({ ctx }: { ctx: GetServerSidePropsContext }) => ({
  colorScheme: getCookie("afridi-dev-color-scheme", ctx) || "light",
});
