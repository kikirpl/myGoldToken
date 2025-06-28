import { useState, useEffect } from "react";
import Head from "next/head";
import EthereumWallet from "../components/EthereumWallet";
import EthereumWalletInfo from "../components/EthereumWalletInfo";
import TokenTrader from "../components/TokenTrader";

export default function Home() {
  const [connected, setConnected] = useState(false);
  const [showWalletInfo, setShowWalletInfo] = useState(false);
  const [showTokenTrader, setShowTokenTrader] = useState(false);

  useEffect(() => {
    // Check if MetaMask is connected on component mount
    const checkConnection = async () => {
      if (window.ethereum) {
        try {
          const accounts = await window.ethereum.request({
            method: "eth_accounts",
          });
          setConnected(accounts.length > 0);
        } catch (error) {
          console.error("Error checking connection:", error);
        }
      }
    };

    checkConnection();

    // Listen for account changes
    if (window.ethereum) {
      window.ethereum.on("accountsChanged", (accounts: string[]) => {
        setConnected(accounts.length > 0);
      });
    }
  }, []);

  return (
    <>
      <html className="scroll-smooth" lang="en">
        <Head>
          <meta charSet="utf-8" />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
          <title>MyGold - The Gold-Backed Cryptocurrency</title>
          <link
            href="https://cdnjs.cloudflare.com/ajax/libs/font-awesome/5.15.3/css/all.min.css"
            rel="stylesheet"
          />
          <link
            href="https://fonts.googleapis.com/css2?family=Poppins:wght@400;600;700&display=swap"
            rel="stylesheet"
          />
          <style>{`
          body {
            font-family: "Poppins", sans-serif;
          }
        `}</style>
        </Head>

        <main className="bg-black text-white min-h-screen">
          {/* Header */}
          <header className="flex items-center bg-black justify-between px-6 sticky top-0 z-50 py-4 max-w-7xl mx-auto">
            <div className="flex items-center space-x-3">
              <img
                alt="Gold coin with letter G in gold color"
                className="w-28 h-12 ml-15"
                src="/assets/logo_header.jpg.png"
              />
            </div>

            <nav className="hidden md:flex space-x-8 text-white text-lg font-normal">
              <a className="hover:underline" href="#home">
                Home
              </a>
              <a className="hover:underline" href="#about">
                About
              </a>
              <a className="hover:underline" href="#roadmap">
                Roadmap
              </a>
              <a className="hover:underline" href="#tokenomic">
                Tokenomic
              </a>
            </nav>

            <div className="flex items-center space-x-2">
              <div className="!bg-yellow-400 !text-black !font-bold !rounded-md !px-5 !py-2 mr-10 !text-sm">
                <EthereumWallet />
              </div>
              {connected && (
                <>
                  <button
                    onClick={() => setShowWalletInfo(!showWalletInfo)}
                    className="bg-blue-500 text-white font-bold rounded-md px-3 py-2 text-sm"
                    type="button"
                  >
                    Info
                  </button>
                  <button
                    onClick={() => setShowTokenTrader(!showTokenTrader)}
                    className="bg-green-500 text-white font-bold rounded-md px-3 py-2 text-sm"
                    type="button"
                  >
                    Trade
                  </button>
                </>
              )}
            </div>
          </header>

          {/* Wallet Components Modal */}
          {connected && showWalletInfo && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-yellow-400 text-lg font-bold">
                    Wallet Information
                  </h3>
                  <button
                    onClick={() => setShowWalletInfo(false)}
                    className="text-white hover:text-red-400"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <EthereumWalletInfo />
              </div>
            </div>
          )}

          {connected && showTokenTrader && (
            <div className="fixed inset-0 bg-black bg-opacity-50 flex items-center justify-center z-50 p-4">
              <div className="bg-gray-900 rounded-lg p-6 max-w-md w-full max-h-[80vh] overflow-y-auto">
                <div className="flex justify-between items-center mb-4">
                  <h3 className="text-yellow-400 text-lg font-bold">
                    Token Trader
                  </h3>
                  <button
                    onClick={() => setShowTokenTrader(false)}
                    className="text-white hover:text-red-400"
                  >
                    <i className="fas fa-times"></i>
                  </button>
                </div>
                <TokenTrader />
              </div>
            </div>
          )}

          {/* Hero Section */}
          <section
            id="home"
            className="flex flex-col-reverse md:flex-row items-center justify-between gap-8 md:gap-16 mt-10 max-w-7xl mx-auto px-6"
          >
            <div className="max-w-md md:max-w-lg ml-30">
              <h1 className="text-white text-3xl md:text-4xl font-semibold leading-tight mb-2">
                The Gold-Backed
                <br />
                Cryptocurrency
              </h1>
              <p className="text-gray-300 text-sm md:text-base mb-6">
                Tokenized real gold on the blockchain
              </p>
              <div className="flex space-x-4">
                <button
                  className="bg-yellow-400 text-black font-bold rounded-md px-4 py-2 text-xs md:text-sm select-none"
                  type="button"
                  onClick={() => (connected ? setShowTokenTrader(true) : null)}
                >
                  {connected ? "BUY NOW" : "CONNECT WALLET TO BUY"}
                </button>
                <button
                  className="bg-yellow-400 text-black font-bold rounded-md px-4 py-2 text-xs md:text-sm select-none"
                  type="button"
                >
                  WHITEPAPER
                </button>
              </div>
            </div>
            <div className="flex-shrink-0">
              <img
                alt="3D render of a gold coin with letter G and two gold bars stacked"
                className="w-56 md:w-72 mr-46"
                height="200"
                src=" /assets/gold_hero.png"
                width="280"
              />
            </div>
          </section>

          {/* Statistics Section */}
          <section className="grid grid-cols-2 md:grid-cols-4 gap-4 mt-12 max-w-4xl mx-auto text-xs md:text-sm font-bold text-white px-6">
            <div className="bg-gray-800 py-4 text-center select-none">
              TOTAL SUPPLY
            </div>
            <div className="bg-gray-800 py-4 text-center select-none">
              GOLD RESERVES
            </div>
            <div className="bg-gray-800 py-4 text-center select-none">
              HOLDERS
            </div>
            <div className="bg-gray-800 py-4 text-center select-none">
              MARKET CAP
            </div>
          </section>

          {/* About Section */}
          <section id="about" className="mt-14 max-w-4xl mx-auto px-6">
            <p className="text-yellow-400 text-xs font-semibold text-center mb-1 select-none">
              ABOUT MYGOLD
            </p>
            <h2 className="text-center text-white text-xl md:text-2xl font-semibold mb-8 leading-tight">
              Digitalisasi Emas. Revolusi Aset.
              <br />
              Kedaulatan Finansial.
            </h2>

            {/* Features Grid */}
            <div className="grid grid-cols-2 md:grid-cols-4 gap-6 text-yellow-400 text-center mb-12 select-none">
              <div>
                <img
                  src="/assets/icon 1.png"
                  className="w-25 h-19 mx-auto"
                  alt=""
                />
                <p className="font-bold text-xs md:text-sm mt-4">
                  Founder Token Lock & Vesting
                </p>
                <p className="text-gray-300 text-[9px] md:text-xs mt-2">
                  Token for the founder with 3 years of Vesting
                </p>
              </div>
              <div>
                <img
                  src="/assets/icon 2.png"
                  className="w-25 h-19 mx-auto"
                  alt=""
                />
                <p className="font-bold text-xs md:text-sm mt-4">
                  Open Source Smart Contract
                </p>
                <p className="text-gray-300 text-[9px] md:text-xs mt-2">
                  Smart Contract Published and Verified
                </p>
              </div>
              <div>
                <img
                  src="/assets/icon 3.png"
                  className="w-25 h-19 mx-auto"
                  alt=""
                />
                <p className="font-bold text-xs md:text-sm mt-4">
                  Transparency Dashboard
                </p>
                <p className="text-gray-300 text-[9px] md:text-xs mt-7">
                  Information, purchasing funds, etc. displayed
                </p>
              </div>
              <div>
                <img
                  src="/assets/icon 4.png"
                  className="w-25 h-19 mx-auto"
                  alt=""
                />
                <p className="font-bold text-xs md:text-sm mt-4">
                  Liquidity is locked
                </p>
                <p className="text-gray-300 text-[9px] md:text-xs mt-7">
                  Liquidity in Dex is locked at the time of launch
                </p>
              </div>
            </div>

            {/* Description */}
            <h3 className="text-yellow-400 text-2xl font-semibold mb-4 select-none">
              What is MyGold?
            </h3>
            <p className="text-gray-300 text-sm md:text-base mb-4 leading-relaxed">
              MYGOLD adalah proyek tokenisasi emas yang menyatukan tambang emas
              fisik legal dan teknologi blockchain. Dengan vault di Jakarta,
              Dubai, dan Nairobi, setiap token MYGOLD didukung oleh cadangan
              emas nyata.
            </p>
            <p className="text-gray-300 text-sm md:text-base mb-8 leading-relaxed">
              Proyek ini menciptakan jembatan antara dunia riil dan digital
              secara aman, transparan, dan terdesentralisasi.
            </p>

            {/* Vision & Mission */}
            <div className="grid grid-cols-1 md:grid-cols-2 gap-8">
              <div>
                <h4 className="text-yellow-400 font-semibold mb-2 select-none">
                  Vision
                </h4>
                <p className="text-gray-300 text-sm leading-relaxed">
                  Become a global standard in safe and decentralized ownership
                  and trade in digital gold.
                </p>
              </div>
              <div>
                <h4 className="text-yellow-400 font-semibold mb-2 select-none">
                  Mission
                </h4>
                <ul className="text-gray-300 text-sm list-disc list-inside leading-relaxed space-y-1">
                  <li>Fair and global gold access</li>
                  <li>Connect local mines to the world market</li>
                  <li>Vault Physical & Real-Time Public Audit</li>
                  <li>Inclusive and Sustainable Gold Web3 Ecosystem</li>
                </ul>
              </div>
            </div>
          </section>

          {/* Why Different Section */}
          <section className="mt-14 bg-yellow-400 text-black py-8 px-6 max-w-7xl mx-auto rounded-md flex flex-col md:flex-row items-center gap-6">
            <div className="flex-shrink-0">
              <img
                alt="Hand holding a gold coin with letter G and glowing effect behind"
                className="w-full h-[1000px] md:w-[300px] md:h-[200px]"
                src="/assets/hand_img.png"
                width="600"
              />
            </div>
            <div>
              <h3 className="text-white text-[35px] font-bold mb-4 select-none ml-10 ">
                Why is MYGOLD different?
              </h3>
              <ul className="list-disc list-inside space-y-1 text-m md:text-base text-white ml-10">
                <li>Vault Mine & Vault (real gold)</li>
                <li>Global Infrastructure (Indonesia, Dubai, Africa)</li>
                <li>Transparent Smart Contract & Audit</li>
                <li>DEX & CEX Gradual Listing Strategy</li>
                <li>Anti-rugpull & vesting system</li>
              </ul>
            </div>
          </section>
          {/* Roadmap Section */}
          <section id="roadmap" className="mt-14 max-w-7xl mx-auto px-6">
            <h3 className="text-white text-4xl ml-[500px] font-semibold mb-6 select-none">
              Roadmap
            </h3>
            <p className="text-yellow-300 ml-[350px] text-[20px] mb-8 ">
              Realizing a vision through a planned execution.
            </p>

            {/* Roadmap Timeline */}
            <div className="relative">
              {/* Timeline */}
              <div className="absolute inset-0 flex items-center justify-between">
                {/* Timeline Label for Q3 2025 */}
                <div className="text-center text-yellow-400 font-semibold bg-black px-4 py-2 rounded-md absolute top-0 left-[10%] ">
                  Q3 2025
                </div>
                {/* Timeline Label for Q4 2025 */}
                <div className="text-center text-yellow-400 font-semibold bg-black px-4 py-2 rounded-md absolute top-0 left-[35%]">
                  Q4 2025
                </div>
                {/* Timeline Label for Q1 2026 */}
                <div className="text-center text-yellow-400 font-semibold bg-black px-4 py-2 rounded-md absolute top-0 left-[60%]">
                  Q1 2026
                </div>
                {/* Timeline Label for Q2 2026 */}
                <div className="text-center text-yellow-400 font-semibold bg-black px-4 py-2 rounded-md absolute top-0 left-[85%]">
                  Q2 2026
                </div>
              </div>

              {/* Roadmap content boxes */}
              <div className="grid grid-cols-1 md:grid-cols-4 gap-8 items-center mt-8">
                {/* Box for Q3 2025 */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h4 className="text-yellow-400 text-xl font-semibold mt-4 mb-6">
                    Q3 2025 - Fase Awal
                  </h4>
                  <ul className="text-gray-300 text-sm md:text-base list-disc list-inside leading-relaxed">
                    <li>
                      Finalize legal entities and integration (Dubai, Indonesia,
                      Africa)
                    </li>
                    <li>
                      Launch campaign community (Twitter, Telegram, Discord)
                    </li>
                    <li>Private Sale Token & Whitelist Pre-sale</li>
                  </ul>
                </div>

                {/* Box for Q4 2025 */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h4 className="text-yellow-400 text-xl font-semibold mb-1 mt-3">
                    Q4 2025 - Fase Ekspansi
                  </h4>
                  <ul className="text-gray-300 text-sm md:text-base list-disc list-inside leading-relaxed">
                    <li>Listing on DEX (Ethereum chain)</li>
                    <li>Launch Vault and listing in Indonesia & Dubai</li>
                    <li>Develop global partnerships with key suppliers</li>
                  </ul>
                </div>

                {/* Box for Q1 2026 */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h4 className="text-yellow-400 text-xl font-semibold mb-4">
                    Q1 2026 - Fase Scaling
                  </h4>
                  <ul className="text-gray-300 text-sm md:text-base list-disc list-inside leading-relaxed">
                    <li>Listing on CEX Tier 1 (Gate.io / KuCoin)</li>
                    <li>Launch staking rewards program (optional)</li>
                    <li>Expand vault & logistics (Africa and Middle East)</li>
                  </ul>
                </div>

                {/* Box for Q2 2026 */}
                <div className="bg-gray-800 p-6 rounded-lg">
                  <h4 className="text-yellow-400 text-xl font-semibold mb-4">
                    Q2 2026 - Fase Globalisasi
                  </h4>
                  <ul className="text-gray-300 text-sm md:text-base list-disc list-inside leading-relaxed">
                    <li>Listing on CEX Tier 2: MEXC or Bitmart</li>
                    <li>Develop tracking and asset management applications</li>
                  </ul>
                </div>
              </div>
            </div>
          </section>

          {/* Token Distribution Section */}
          <section className="mt-14 max-w-7xl mx-auto px-6">
            <h3
              id="tokenomic"
              className="text-white text-4xl font-semibold mb-10 ml-110 select-none"
            >
              Token Distribution
            </h3>
            <div className="flex justify-center mb-8">
              <img
                alt="Token distribution pie chart"
                className="w-[700px] h-[300px] "
                src="/assets/token.png"
              />
            </div>
          </section>

          {/* Footer Section */}
          <footer className="bg-black text-white pt-16 pb-8 mt-20 border-bottom border-gray-700">
            <div className="max-w-7xl mx-auto px-6">
              {/* Newsletter Section */}
              <div className="text-center mb-16">
                <h3 className="text-white text-3xl font-bold mb-6">
                  Subscribe to Our Newsletter
                </h3>
                <div className="flex flex-col md:flex-row justify-center items-center gap-4">
                  <input
                    type="email"
                    placeholder="Your Email"
                    className="px-6 py-3 rounded-md w-[300px] border-amber-50 text-black bg-white"
                  />
                  <button className="bg-yellow-400 text-black font-bold px-6 py-3 rounded-md text-sm">
                    Subscribe
                  </button>
                </div>
              </div>
              {/* Separator */}
              <div className="border-t border-gray-700 border-opacity-50 mb-8"></div>
              {/* Footer Content */}
              <div className="grid grid-cols-1 md:grid-cols-3 ml-17 gap-8 text-sm text-gray-300">
                {/* Left - Logo and Office Info */}
                <div>
                  <a href="" className="text-yellow-400 text-3xl font-bold">
                    MyGold
                  </a>
                  <p>OFFICE :</p>
                </div>

                {/* Center - Social Media Icons */}
                <div className="">
                  <p className="text-white mb-4 text-xl ml-20">Follow Us</p>
                  <div className="flex  space-x-8 text-xl ">
                    <a href="#" className="">
                      <img src="/assets/facebook_logo.png" alt="" />
                    </a>
                    <a href="#">
                      <img src="/assets/instagram_logo.png" alt="" />
                    </a>
                    <a href="#">
                      <img src="/assets/twitter_logo.png" alt="" />
                    </a>
                    <a href="#">
                      <img src="/assets/telegram_logo.png" alt="" />
                    </a>
                  </div>
                </div>

                {/* Right - Footer Links */}
                <div className="text-left ml-30 space-y-2 text-lg">
                  <a href="#" className="hover:text-yellow-400 block">
                    Contact
                  </a>
                  <a href="#" className="hover:text-yellow-400 block">
                    FAQ
                  </a>
                  <a href="#" className="hover:text-yellow-400 block">
                    Blog
                  </a>
                  <a href="#" className="hover:text-yellow-400 block">
                    Term & Conditions
                  </a>
                  <a href="#" className="hover:text-yellow-400 block">
                    Privasi Police
                  </a>
                </div>
              </div>

              {/* Copyright */}
              <div className="mt-12 text-center text-sm text-gray-500">
                <p>
                  &copy; 2025{" "}
                  <a
                    href="https://www.mygoldtoken.com"
                    className="hover:underline"
                  >
                    www.mygoldtoken.com
                  </a>{" "}
                  | All rights reserved
                </p>
              </div>
            </div>
          </footer>
        </main>
      </html>
    </>
  );
}
