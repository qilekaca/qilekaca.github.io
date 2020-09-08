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
  - MySQL
  - Docker
sticky: 1
---

## 简介

已经使用 Vue 和云开发完成了好多内容，但是对于真实的前后端并没有实际的了解，所以希望通过一个简单的前后端分离的项目来理解。毫无疑问对于前端开发人员门槛最低的后端肯定是 Node。所以此项目前端使用 Vue 后端使用 Koa 来完成。要实现的功能也很简单，用户登录之后，可以进行 todo 的增删查改。后端数据库使用 MySQL。项目的结构基本就是在 Vue-cli 初始化的项目的根目录下创建一个 server 文件夹和 app.js 的项目入口文件。

<!-- more -->

```js
// server文件夹的内容
config; // 存放数据库的配置连接
controller; // controller控制器
models; // model模型
routes; // route路由
schema; // 数据库表结构
```

> 此处的 server 文件夹的内容就可以很好的展示出 MVC 的 model 模型层和 controller 控制层

前端 ui 主要使用[element-ui](https://element.eleme.cn/#/zh-CN)。后端需要用到的依赖 koa、koa-router、koa-jwt、koa2-cors、koa-static、mysql、sequelize。。。等。其中 sequelize 是用来操作数据库。开发后端的内容基本上类似于之前开发微信小程序的后台管理项目。koa 负责提供数据接口前端使用 ajax 发送请求。最后使用 docker 来部署项目。

## 开发步骤

### 后端开发

先确定后端需要为前端提供的数据接口。后端需要提供的功能用户的登陆、todo 的增加、删除、查询、修改。以上功能需要在 controller 中定义。controller 通过 model 操作数据库。model 主要用来存放操作数据库相关的内容。routes 存放路由相关的内容(沟通前后端的关键)，config 存放数据库的配置文件。schema 数据库的库表结构。**此处插入图片**
routes 路由设计

```js
// server/routes/api.js
import api from "../controllers/todolist.js";
import koaRouter from "koa-router";
const router = koaRouter();

router.get("/todolist/:id", api.getTodolist);
router.post("/todolist", api.createTodolist);
router.delete("/todolist/:userId/:id", api.removeTodolist);
router.put("/todolist/:userId/:id/:status", api.updateTodolist);

export default router;

// server/routes/auth.js
import auth from "../controllers/user.js";
import koaRouter from "koa-router";
const router = koaRouter();

router.get("/user/:id", auth.getUserInfo); // 定义url的参数是id
router.post("/user", auth.postUserAuth);

export default router;
```

### 前端开发

前端开发与平时正常的 vue 开发无异，本项目使用 axios 进行数据请求，但是前端运行在 8080 端口，后端运行在 9000 端口，由于浏览器的同源策略会产生跨域问题。开发阶段使用 vue.config.js 配置 vue 进行代理。

```js
// 前端调用 this.$http.get('/api/todolist/' + this.id)
// 开发时可以使用 vue.config.js 做代理
// vue.config.js
// 配置完成后我们能够将外部的请求通过webpack转发给本地，也就能够将跨域请求变成同域请求了
module.exports = {
  productionSourceMap: false,
  devServer: {
    proxy: {
      "/auth": {
        target: "http://localhost:9999",
        changeOrigin: true,
      },
      "/api": {
        target: "http://localhost:9999",
        changeOrigin: true,
      },
    },
  },
};
```

### 登陆功能

登陆使用[JSON-WEB-TOKEN](https://jwt.io/)实现。

> JSON-WEB-TOKEN 分三部分，头部信息+主体信息+密钥信息，其中主体传递的信息（是我们存放我们需要的信息的部分）是用 BASE64 编码的，所以很容易被解码，一定不能存放明文密码这种关键信息！替代地可以存放一些不是特别关键的信息，比如用户名这样能够做区分的信息。

#### jwt 登陆的过程

1. 用户输入用户名和密码，通过 https 加密发送请求给后端
2. 后端验证用户信息是否正确，正确返回 TOKEN 给客户端，不正确返回验证错误的信息
3. 登陆成功用户将 TOKEN 保存下来（localStorage、sessionStorage），之后在请求资源的时候，在请求头（Header）中带上 TOKEN 进行请求
4. 后端接收请求信息，验证 TOKEN 是否正确，正确则返回资源，否则返回错误信息。

> 密码要使用 bcrypt，加密保存到数据库中。

签发 token

```js
const userToken = {
  name: userInfo.user_name,
  id: userInfo.id,
};
const secret = "vue-koa-demo"; // 指定密钥，这是之后用来判断token合法性的标志
const token = jwt.sign(userToken, secret); // 签发token
```

完成后所有/api 的请求都需要进行 jwt 的验证，secret 密钥必须跟我们当初签发的 secret 一致

```js
koa.use("/api", jwt({ secret: "vue-koa-demo" }), api.routes());
```

#### 跳转拦截

当用户直接在地址栏输入`/todolist`还是会跳转到 todolist 界面，所以还需要跳转拦截，借助 token 就可以实现。当用户没有 toekn 的时候不进行跳转，只有当用户有 token 的时候才进行正确的跳转。

```js
// /src/router/index.js
router.beforeEach((to, from, next) => {
  const token = sessionStorage.getItem("demo-token");
  if (to.path == "/") {
    // 如果是跳转到登录页的
    if (token != "null" && token != null) {
      next("/todolist"); // 如果有token就转向todolist不返回登录页
    }
    next(); // 否则跳转回登录页
  } else {
    if (token != "null" && token != null) {
      next(); // 如果有token就正常转向
    } else {
      next("/"); // 否则跳转回登录页
    }
  }
});
```

## 部署

开发发的时候由于使用 webpack 进行请求代理的转发，所以看起来像是同域请求，但是 koa 和 vue 并没有真正的结合起来。我们可以将 vue 的静态文件交给 koa 托管，所有访问前端的请求走 koa 端，包括静态资源文件的请求也走 koa 端，将 koa 作为一个静态资源的服务器。（开发模式是 webpack 开启了一个服务器托管了 Vue 的资源和请求，现在生产模式下改成 Koa 托管 Vue 的资源和请求）。加入 koa-static。

```js
// main.js
const path = require("path");
const serve = require("koa-static");

app.use(serve(path.resolve("dist")));
// yarn build 之后生成 dist 文件夹
// 重新运行后端 yarn dev
// 之后打开 localhost:9000端口就可以直接访问网站了
```

到此基本完成了，但是当我们进入 todolist 页面之后刷新就会出现 404。这是因为我们使用了前端路由的 History 模式，刷新页面浏览器会去服务器访问这个页面的地址，但是服务器并没有配置这个地址的路由。可以借助 koa-history-api-fallback 这个中间键解决这个问题。

```js
// main.js
const historyApiFallback = require("koa-history-api-fallback");
// 一定要加在静态文件serve之前，放在api规则之后
app.use(historyApiFallback());
```

### Nginx

配置 Nginx 监听 80 端口，把访问我们指定域名的请求引导转发给 Koa 服务端。

```conf
// todolist.conf
upstream pm.server {
  server 127.0.0.1:8080
}
server {
  listen 80;
  server_name 188131.188.209;

  location / {
    proxy_pass http://pm.server;
    proxy_redirect off;
  }
}

```

部署完成之后直接访问 `http://xxx.com/todo` 就可以访问项目了。