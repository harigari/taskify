/** @type {import('next').NextConfig} */

module.exports = {
  reactStrictMode: false,
  images: {
    remotePatterns: [
      {
        protocol: "https",
        hostname: "sprint-fe-project.s3.ap-northeast-2.amazonaws.com",
        port: "",
        pathname: "/taskify/**",
      },
    ],
  },
};
