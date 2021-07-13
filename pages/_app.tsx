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
        <link
          rel="icon"
          href="https://ssl.gstatic.com/docs/documents/images/kix-favicon7.ico"
          type="image/x-icon"
        />
        <meta
          name="description"
          content="A cool google docs clone created by Nishanth.M.Dipali"
        />
        <meta
          name="og:description"
          content="A cool google docs clone created by Nishanth.M.Dipali"
        />
        <meta property="og:title" content="Docsu: A Google docs clone" />
        <meta property="og:url" content="https://docsu.vercel.app/" />
        <meta property="og:ttl" content="604800" />
        <meta
          name="og:image"
          content="https://www.gstatic.com/images/branding/product/2x/docs_2020q4_48dp.png"
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
