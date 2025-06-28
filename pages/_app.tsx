// pages/_app.tsx
import "../styles/globals.css";
import { EthereumWalletProvider } from "../components/EthereumWalletProvider"; // import the provider

export default function App({ Component, pageProps }) {
  return (
    <EthereumWalletProvider>
      <Component {...pageProps} />
    </EthereumWalletProvider>
  );
}
