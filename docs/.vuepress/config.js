module.exports = {
  theme: "reco",
  title: "x_x",
  description: "Life is what? Get busy living or get busy dying.",
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
    authorAvatar:
      "https://note-1256536434.cos.ap-beijing.myqcloud.com/img/IMG_2180.jpg",
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
        text: "项目",
        items: [
          { text: "校园闲置交易程序", link: "http://188.131.188.209/college" },
          {
            text: "校园闲置交易后台程序",
            link: "http://188.131.188.209/admin",
          },
        ],
        icon: "reco-api",
      },
      {
        text: "联系",
        items: [
          {
            text: "GitHub",
            link: "https://github.com/qilekaca",
            icon: "reco-github",
          },
          { text: "微信", link: "/docs/contact/", icon: "reco-wechat" },
        ],
        icon: "reco-mail",
      },
    ],
    // author
    author: "张伟",
  },
};
