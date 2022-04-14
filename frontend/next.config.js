const {
  PHASE_DEVELOPMENT_SERVER,
  PHASE_PRODUCTION_BUILD,
} = require("next/constants");

// This uses phases as outlined here: https://nextjs.org/docs/#custom-configuration
// *https://github.com/colormono/clone-fintech-web/blob/main/next.config.js
module.exports = (phase, { defaultConfig }) => {
  /** @type {import('next').NextConfig} */

  // when started in development mode `next dev` or `npm run dev` regardless of the value of STAGING environmental variable
  const isDev = phase === PHASE_DEVELOPMENT_SERVER;
  // when `next build` or `npm run build` is used
  const isProd =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING !== "1";
  // when `next build` or `npm run build` is used
  const isStaging =
    phase === PHASE_PRODUCTION_BUILD && process.env.STAGING === "1";

  //TODO Staging이 언제 쓰이는 것인지 알아보기 => 테스트 할때 혹은 도커같은거 쓸때 쓰이는듯
  console.log(`isDev:${isDev}  isProd:${isProd}   isStaging:${isStaging}`);

  const env = {
    RESTURL_BACKEND: (() => {
      if (isDev) return "http://localhost:9000/";
      if (isProd) return "http://13.209.33.37:9000/";
      if (isStaging) return "http://localhost:11639/";
      return "RESTURL_BACKEND:not (isDev,isProd && !isStaging,isProd && isStaging)";
    })(),
  };

  // next.config.js object
  return {
    reactStrictMode: true,
    env,
  };
};

module.exports = {
  webpack(config) {
    config.module.rules.push({
      test: /\.svg$/,
      use: ["@svgr/webpack"],
    });

    return config;
  },
};
