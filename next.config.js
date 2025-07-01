const isGithubPages = process.env.NODE_ENV === "production";
<<<<<<< HEAD
const repo = "myGoldToken"; // Ganti dengan nama repo kamu
=======
const repo = "myGoldToken";
>>>>>>> gh-pages

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: isGithubPages ? `/${repo}` : "",
  assetPrefix: isGithubPages ? `/${repo}/` : "",
  images: {
    unoptimized: true,
  },
  reactStrictMode: true,
<<<<<<< HEAD
=======
  trailingSlash: true, // Tambahkan ini untuk GitHub Pages
>>>>>>> gh-pages
};

module.exports = nextConfig;
