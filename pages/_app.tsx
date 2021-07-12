import "tailwindcss/tailwind.css";
import Head from "next/head";
import { Provider } from "next-auth/client";
import "../override.css";
import { createTheme } from "@material-ui/core/styles";
import blue from "@material-ui/core/colors/blue";
import { ThemeProvider } from "@material-ui/styles";
import LinearProgress from "@material-ui/core/LinearProgress";
import Router from "next/router";
import { useState } from "react";

export const theme = createTheme({
  palette: {
    primary: { main: blue[600] },
  },
});

function MyApp({ Component, pageProps }) {
  const [loading, setLoading] = useState<boolean>(false);

  Router.events.on("routeChangeStart", () => {
    setLoading(true);
  });

  Router.events.on("routeChangeComplete", () => {
    setLoading(false);
  });

  Router.events.on("routeChangeError", () => {
    setLoading(false);
  });

  return (
    <>
      <Head>
        {/* Material Icons Link */}
        <link
          href="https://fonts.googleapis.com/icon?family=Material+Icons"
          rel="stylesheet"
        />
      </Head>

      <Provider session={pageProps.session}>
        <ThemeProvider theme={theme}>
          {loading && (
            <LinearProgress
              style={{
                height: 3,
                position: "absolute",
                top: 0,
                left: 0,
                width: "100%",
                zIndex: 100,
                background: "transparent",
              }}
            />
          )}
          <Component {...pageProps} />
        </ThemeProvider>
      </Provider>
    </>
  );
}

export default MyApp;
