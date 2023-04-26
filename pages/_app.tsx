import { Provider } from "react-redux";
import { AppProps } from "next/app";
import store from "@/store";
import Layout from "@/components/Layout/Layout";
import "react-circular-progressbar/dist/styles.css";
import "styles/globals.scss";

function MyApp({ Component, pageProps }: AppProps) {
  return (
    <Provider store={store}>
      <Layout>
        <Component {...pageProps} />
      </Layout>
    </Provider>
  );
}

export default MyApp;

