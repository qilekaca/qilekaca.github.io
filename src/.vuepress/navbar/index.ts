import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  { text: "项目", icon: "back-stage", link: "/posts/projects/" },
  { text: "笔记", icon: "blog", link: "/posts/texts/" },
  { text: "关于我", icon: "people", link: "/intro" },
  { text: "项目客户端", icon: "discover", link: "https://github.com" },
  { text: "项目管理端", icon: "discover", link: "https://github.com/qilekaca" },
]);
