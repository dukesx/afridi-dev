/* eslint-disable react-hooks/exhaustive-deps */
import { AppProps } from "next/app";
import Head from "next/head";
import {
  ColorScheme,
  ColorSchemeProvider,
  MantineProvider,
  useMantineColorScheme,
} from "@mantine/core";
import { generalStore } from "../data/static/store";
import { StoreProvider } from "easy-peasy";
import { useColorScheme, useHotkeys, useLocalStorage } from "@mantine/hooks";
import { useEffect, useState } from "react";
import "../styles/app.css";
import { IKContext } from "imagekitio-react";

export default function App(props: AppProps) {
  const { Component, pageProps } = props;
  const [iteration, setIteration] = useState(0);
  const preferredColorScheme = useColorScheme();
  const [colorScheme, setColorScheme] = useLocalStorage<ColorScheme>({
    key: "afridi-dev-color-scheme",
    defaultValue: null,
    getInitialValueInEffect: true,
  });

  const toggleColorScheme = (value?: ColorScheme) =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  useHotkeys([["mod+J", () => toggleColorScheme()]]);

  useEffect(() => {
    setIteration(iteration + 1);
    if (iteration == 1) {
      if (!colorScheme) {
        console.log(preferredColorScheme);
        setColorScheme(preferredColorScheme);
      }
    }
  }, [preferredColorScheme]);

  return (
    <>
      <Head>
        <title>Page title</title>
      </Head>
      <ColorSchemeProvider
        colorScheme={colorScheme}
        toggleColorScheme={toggleColorScheme}
      >
        <MantineProvider
          withGlobalStyles
          withNormalizeCSS
          theme={{
            colorScheme: colorScheme,
            fontFamily: "Inter, sans-serif",
            fontFamilyMonospace: "Monaco, Courier, monospace",
            headings: { fontFamily: "Inter, sans-serif" },
          }}
        >
          {/** @ts-ignore */}
          <StoreProvider store={generalStore}>
            <IKContext urlEndpoint="https://ik.imagekit.io/afrididotdev">
              <Component {...pageProps} />
            </IKContext>
          </StoreProvider>
        </MantineProvider>
      </ColorSchemeProvider>
    </>
  );
}
