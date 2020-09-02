module.exports = {
  theme: "reco",
  title: "Hello Vuepress",
  description: "Just playing around",
  head: [
    [
      "meta",
      {
        name: "viewport",
        content: "width=device-width,initial-scale=1,user-scalable=no",
      },
    ],
  ],
  themeConfig: {
    type: "blog",
    // 评论插件设置
    valineConfig: {
      appId: "cVeDcyaNPaN8F2PtXT7VCYdm-gzGzoHsz", // your appId
      appKey: "kGahFP1HynmMPbsrLKwo55ng", // your appKey
    },
    // 默认语言设置
    locales: {
      "/": {
        lang: "zh-CN",
      },
    },
    // 博客配置
    blogConfig: {
      category: {
        location: 2, // 在导航栏菜单中所占的位置，默认2
        text: "分类", // 默认文案 “分类”
      },
      tag: {
        location: 3, // 在导航栏菜单中所占的位置，默认3
        text: "标签", // 默认文案 “标签”
      },
    },
    // 添加时间轴
    nav: [
      { text: "首页", link: "/", icon: "reco-home" },
      // { text: "分类", link: "/categories/" },
      // { text: "标签", link: "/tag/" },
      { text: "时间轴", link: "/timeline/", icon: "reco-date" },
      {
        text: "联系",
        // ariaLabel: "Language Menu",
        items: [
          {
            text: "GitHub",
            link: "https://github.com/qilekaca",
            icon: "reco-github",
          },
          { text: "微信", link: "/docs/contact/", icon: "reco-wechat" },
        ],
      },
    ],
    // author
    author: "zhang wei",
  },
};
