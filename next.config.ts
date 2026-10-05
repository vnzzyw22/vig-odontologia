import type { NextConfig } from "next";
import path from "node:path";

const nextConfig: NextConfig = {
  // há um package-lock.json solto na pasta do usuário; fixa a raiz do projeto
  turbopack: { root: path.resolve(__dirname) },
  images: {
    formats: ["image/avif", "image/webp"],
    qualities: [75, 85],
  },
};

export default nextConfig;
