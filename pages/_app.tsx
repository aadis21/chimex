import { useEffect } from "react";
import GlobalStyle from "@styles/GlobalStyle.styled";
import type { AppProps } from "next/app";
import type { NextPageWithLayout } from "@types";
import Script from "next/script";
import { Loader } from "@components/composition";

type AppPropsWithLayout = AppProps & {
  Component: NextPageWithLayout;
};

function MyApp({ Component, pageProps }: AppPropsWithLayout) {
  const getLayout = Component.getLayout || ((page) => page);

  useEffect(() => {
    function openTidioChat() {
      if (
        typeof window !== "undefined" &&
        (window as any).tidioChatApi &&
        typeof (window as any).tidioChatApi.open === "function"
      ) {
        (window as any).tidioChatApi.open();
      }
    }

    if (typeof window !== "undefined" && (window as any).tidioChatApi) {
      // If already loaded
      openTidioChat();
    } else {
      // Listen for tidio ready event
      window.addEventListener("tidioChat-ready", openTidioChat);
    }

    return () => {
      window.removeEventListener("tidioChat-ready", openTidioChat);
    };
  }, []);

  return getLayout(
    <>
      <Script
        src="https://code.tidio.co/vnwob2f98yg1hx5s3iki3nasqccqowqp.js"
        strategy="afterInteractive"
        id="tidio-script"
      />

      <style jsx global>{`
        /* Force Tidio widget container to top-right fixed */
        .tidio-chat {
          position: fixed !important;
          top: 20px !important;
          right: 20px !important;
          bottom: auto !important;
          left: auto !important;
          z-index: 999999 !important;
        }

        /* Also style iframe container */
        iframe[src*="tidio"] {
          position: fixed !important;
          top: 20px !important;
          right: 20px !important;
          bottom: auto !important;
          left: auto !important;
          z-index: 999999 !important;
        }
      `}</style>

      <GlobalStyle />
      <Loader />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
