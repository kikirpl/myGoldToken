const isGithubPages = process.env.NODE_ENV === "production";
const repo = "myGoldToken"; // Pastikan nama repo kamu di GitHub

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Untuk export statis
  basePath: isGithubPages ? `/${repo}` : "", // Base path untuk GitHub Pages
  assetPrefix: isGithubPages ? `/${repo}/` : "", // Asset prefix untuk GitHub Pages
  images: {
    unoptimized: true, // Nonaktifkan optimasi gambar (untuk GitHub Pages)
  },
  reactStrictMode: true, // Menjaga aplikasi tetap ketat
};

module.exports = nextConfig;
