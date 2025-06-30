const isGithubPages = process.env.NODE_ENV === "production";
const repo = "myGoldToken"; // Ganti dengan nama repo kamu di GitHub

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export", // Export aplikasi menjadi statis
  basePath: isGithubPages ? `/${repo}` : "", // Menentukan basePath untuk GitHub Pages
  assetPrefix: isGithubPages ? `/${repo}/` : "", // Menyesuaikan asset prefix
  images: {
    unoptimized: true, // Nonaktifkan optimasi gambar (perlu jika kamu menggunakan gambar besar)
  },
  reactStrictMode: true, // Menjaga aplikasi tetap ketat
};

module.exports = nextConfig;
