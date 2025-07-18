const isProd = process.env.NODE_ENV === "production";

/** @type {import('next').NextConfig} */
const nextConfig = {
  output: "export",
  basePath: isProd ? "/qunova-task" : "",
  trailingSlash: true,
};

export default nextConfig;
