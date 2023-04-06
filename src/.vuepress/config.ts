import { defineUserConfig } from "vuepress";
import theme from "./theme.js";

export default defineUserConfig({
  base: "/",

  locales: {
    // "/": {
    //   lang: "en-US",
    //   title: "Blog Demo",
    //   description: "A blog demo for vuepress-theme-hope",
    // },
    "/": {
      lang: "zh-CN",
      title: "o_o",
      description: "bolg",
    },
  },

  theme,

  // Enable it with pwa
  // shouldPrefetch: false,
});
