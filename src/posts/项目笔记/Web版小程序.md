---
title: Web版小程序
date: 2020-06-15
sidebar: "auto"
categories:
  - 前端
  - 云开发
tags:
  - Vue
  - 云开发
---

## 起因

> [项目地址](http://188.131.188.209/college)

因为没能发布小程序，所以打算写一个网页版的供大家使用。前端使用`vue + vant-ui`后端使用[腾讯云云开发](https://cloudbase.net)，程序的主要功能为用户将自己闲置的物品发布到程序上，用户可以选择将物品出租或出售，并且发布的信息只会显示给同校的用户。并且还添加了校园失物、广场页面上的信息所有用户都可以看到。用户可以对商品进行评论、分享等功能。

<!-- more -->

## 创建项目

```shell
$ vue create webapp # 本项目需要使用 vuex 和 vue-router 所以要选择这两项
$ cd webapp
$ yarn add vant
$ yarn add babel-plugin-import -D # 这是一款babel插件，会自动按需引入插件

```

设置按需引入插件

```js
// 在babel.config.js中配置
module.exports = {
  plugins: [
    [
      "import",
      {
        libraryName: "vant",
        libraryDirectory: "es",
        style: true,
      },
      "vant",
    ],
  ],
};
```

```vue
// 设置完成按需引入之后就可以在项目组件中按需引入插件了 // button.vue
<template>
  <div>
    <van-button>按钮</van-button>
  </div>
</template>
<script>
import {Button} from 'vant'
export deafult{
  components: [
    [Button.name]: Button
  ]
}
</script>
```

解决移动端的点击延迟引入 fastclick 库，`yarn add fastclick`

```js
// 在main.js中添加
import fastClick from "fastclick";
fastClick.attch(document.body);
```

添加云开发的配置文件，在项目的根目录下创建 cloudbaserc.json 文件和 functions 文件夹。functions 文件夹用来存放项目需要用到的云函数。

```json
{
  "envId": "xxx" // 填入自己的云开发环境的id
}
```

使用云开发还需要`@cloudbase/js-sdk` `yarn add @cloudbase/js-sdk`安装完成后在 main.js 中引入

```js
import Cloudbase from "@cloudbase/js-sdk";
import config from "./cloudbaserc.json";

const app = Cloudbase.init({ env: config.envId });

Vue.prototype.$app = app;
Vue.prototype.$auth = app.auth({ persistence: "local" }); // 用户的登录信息保存在localStorage当中
```

由于 web 端云开发的限制，当用户没有登录的时候是无法访问云资源的，所以还需要为云函数添加 http 接入。所以项目还需要使用 axios 进行云接入以 http 请求的形式去调用云函数。`yarn add axios`

```js
import axios from "axios";
Vue.prototype.$axios = axios;
```

## 项目分析

当用户未登录的时候可以查看广场页面的内容，可以查看内容的详细信息，但是不能够对内容进行点赞收藏评论等功能，未选择学校时不能够查看出租、转卖、失物等页面的内容，用户注册目前只能够通过邮箱进行注册。通过 vue-router 的路由拦截实现上述功能，使用 vuex 实现用户信息的保存，用户学校信息的保存、用户联系方式的保存。当用户完成登陆后先去云数据库获取用户的信息。获取完成信息后使用 vuex + loaclStorage 将用户数据保存到本地。

## 项目难点

1. 对比小程序的云开发 web 版本的云开发的登录注册验证过程变的繁琐，小程序无需用户进行注册直接使用微信即可登录访问云资源，web 版本需要用户自行注册完成后方可访问云资源。

2. 使用 mpvue 开发小程序不支持使用 vue-router，导致 vue-router 不熟练。开发过程中使用 history 模式的 vue-router 开发时一直没有问题，但是当项目部署到服务器后，进入页面后在刷新页面会导致页面 404。后改为 hash 模式。vue-router 的跳转拦截非常好用，当用户未登陆时只开放给用户 根目录 登录页面 和 详情页面，当用户在 url 框输入其他路径会直接跳转到登录界面。

3. 使用 axios 进行云接入调用云函数，由于官方文档对使用方法未进行详细介绍，导致好多莫名奇妙的问题。最后试了好多次终于找到正确调用方法。

4. 初期随着项目逐渐变大，发现项目的耦合度过高，出现一点问题要进行修改就会影响其他内容导致修改起来十分费力，无奈只能重新写一遍程序，导致开发时间变长。

5. 由于未进行详细的测试项目可能出现问题，且项目打包后体积过大，导致首次访问加载时间过长。（目前考虑使用 nginx 开启 gzip 压缩）
