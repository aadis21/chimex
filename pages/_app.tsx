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

  return getLayout(
    <>
      {/* Load Tidio Chat */}
      <Script
        src="https://code.tidio.co/vnwob2f98yg1hx5s3iki3nasqccqowqp.js"
        //strategy="afterInteractive"
        id="tidio-script"
      />

      {/* Style for fixed position chat */}
      <style jsx global>{`
        #tidio-chat {
          position: fixed !important;
          bottom: 20px !important; 
          right: 20px !important;  
          z-index: 9999;           
        }
      `}</style>

      <GlobalStyle />
      <Loader />
      <Component {...pageProps} />
    </>
  );
}

export default MyApp;
