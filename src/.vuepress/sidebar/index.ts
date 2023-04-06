import { sidebar } from "vuepress-theme-hope";

export const zhSidebar = sidebar({
  "/posts/projects/": [
    {
      text: "项目",
      icon: "back-stage",
      children: "structure",
    },
  ],
  "/posts/texts/": [
    {
      text: "笔记",
      icon: "blog",
      children: "structure",
    },
  ],
});
