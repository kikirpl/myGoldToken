const isGithubPages = process.env.NODE_ENV === "production";
const repo = "myGoldToken";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: isGithubPages ? `/${repo}` : "",
  assetPrefix: isGithubPages ? `/${repo}/` : "",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
  trailingSlash: true, // Tambahkan ini untuk GitHub Pages
};

module.exports = nextConfig;
