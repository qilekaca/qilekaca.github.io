import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/": [
    "",
    {
      text: "项目笔记",
      icon: "edit",
      prefix: "posts/项目笔记/",
      collapsible: true,
      children: "structure",
    },
    {
      text: "知识储备",
      icon: "edit",
      prefix: "posts/知识储备/",
      collapsible: true,
      children: "structure",
    },
    "intro",
    "slides",
  ],
});
