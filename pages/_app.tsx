import { AppShell, ColorScheme, ColorSchemeProvider, MantineProvider } from "@mantine/core";
import { useLocalStorageValue } from "@mantine/hooks";
import { NotificationsProvider } from "@mantine/notifications";
import { AppProps } from "next/app";
import Head from "next/head";
import { SessionProvider } from "next-auth/react";
import { appWithTranslation } from "next-i18next";
import { Provider } from "react-redux";

import { Footer } from "../components/footer";
import { Header } from "../components/header";
import { store } from "../store";

function App(props: AppProps): JSX.Element {
  const { Component, pageProps } = props;

  const [colorScheme, setColorScheme] = useLocalStorageValue<ColorScheme>({
    key: "mantine-color-scheme",
    defaultValue: "light",
  });

  const toggleColorScheme = (value?: ColorScheme): void =>
    setColorScheme(value || (colorScheme === "dark" ? "light" : "dark"));

  return (
    <>
      <Head>
        <meta name="viewport" content="minimum-scale=1, initial-scale=1, width=device-width" />
      </Head>

      <Provider store={store}>
        <SessionProvider session={pageProps.session}>
          <ColorSchemeProvider colorScheme={colorScheme} toggleColorScheme={toggleColorScheme}>
            <MantineProvider
              theme={{
                colorScheme,
                loader: "dots",
                primaryColor: "violet",
              }}
              withGlobalStyles
              withNormalizeCSS
            >
              <NotificationsProvider>
                <AppShell
                  sx={(theme) => ({
                    backgroundColor:
                      theme.colorScheme === "light"
                        ? theme.fn.darken(theme.colors.gray[0], 0.025)
                        : theme.fn.darken(theme.colors.gray[9], 0.4),
                  })}
                  fixed
                  header={<Header />}
                >
                  <Component {...pageProps} />
                </AppShell>
                <Footer />
              </NotificationsProvider>
            </MantineProvider>
          </ColorSchemeProvider>
        </SessionProvider>
      </Provider>
    </>
  );
}

export default appWithTranslation(App);
