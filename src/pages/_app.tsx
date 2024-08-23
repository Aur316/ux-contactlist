import "@/styles/globals.css";
import type { AppProps } from "next/app";
import { Store } from "./context/store";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <Store>
      <Component {...pageProps} />
    </Store>
  );
}
