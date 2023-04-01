import { navbar } from "vuepress-theme-hope";

export const zhNavbar = navbar([
  "/",
  { text: "项目笔记", icon: "edit", link: "/posts/项目笔记/" },
  { text: "知识储备", icon: "edit", link: "/posts/知识储备/" },
  { text: "项目客户端", icon: "discover", link: "/demo/" },
  { text: "项目管理端", icon: "discover", link: "/demo/" },
  //   { TODO: 添加项目的链接地址
  //     text: "V2 文档",
  //     icon: "note",
  //     link: "https://theme-hope.vuejs.press/",
  //   },
]);
