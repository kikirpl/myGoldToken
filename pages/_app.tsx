// pages/_app.tsx
import "../styles/globals.css";
import type { AppProps } from "next/app";
import { EthereumWalletProvider } from "../components/EthereumWalletProvider";

export default function App({ Component, pageProps }: AppProps) {
  return (
    <EthereumWalletProvider>
      <Component {...pageProps} />
    </EthereumWalletProvider>
  );
}
