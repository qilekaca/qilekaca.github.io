---
title: Vue+Koa实现简单的todolist
date: 2020-06-27
sidebar: "auto"
categories:
  - 前端
  - 全栈
tags:
  - Vue
  - Node
  - MongoDB
  - Docker
---

## 简介

已经使用 Vue 和云开发完成了好多内容，但是对于真实的前后端并没有实际的了解，所以希望通过一个简单的前后端分离的项目来理解。毫无疑问对于前端开发人员门槛最低的后端肯定是 Node。所以此项目前端使用 Vue 后端使用 Koa 来完成。要实现的功能也很简单，用户登录之后，可以进行 todo 的增删查改。后端数据库使用 MySQL。项目的结构基本就是在 Vue-cli 初始化的项目的根目录下创建一个 server 文件夹和 app.js 的项目入口文件。

```js
// server文件夹的内容
config; // 存放数据库的配置连接
controller; // controller控制器
models; // model模型
routes; // route路由
schema; // 数据库表结构
```

前端 ui 主要使用[element-ui](https://element.eleme.cn/#/zh-CN)。后端需要用到的依赖 koa、koa-router、koa-jwt、koa2-cors、koa-static、mysql、sequelize。。。等。其中 sequelize 是用来操作数据库。开发后端的内容基本上类似于之前开发微信小程序的后台管理项目。
