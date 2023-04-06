---
title: VueRouter
date: 2020-04-01
sidebar: "auto"
categories:
  - 前端
tags:
  - Vue面试题
  - VueRouter
---

## vue-router 前端权限控制

实现权限控制的一般思路是在路由导航时判断用户是否有访问该页面的权限，如果没有，则跳转到指定页面。

在 Vue Router 中，我们可以使用路由的导航守卫来实现权限控制。具体来说，我们可以通过 beforeEach 方法来注册全局前置守卫，该守卫会在每次路由跳转前被调用，我们可以在该守卫中进行权限控制。

下面是一个示例，假设我们有两个页面，一个需要管理员权限才能访问，一个需要登录才能访问：

```js
const routes = [
  {
    path: "/admin",
    component: AdminPage,
    meta: {
      requiresAdmin: true,
    },
  },
  {
    path: "/user",
    component: UserPage,
    meta: {
      requiresAuth: true,
    },
  },
];

const router = new VueRouter({
  routes,
});

router.beforeEach((to, from, next) => {
  const isLoggedIn = checkLoginStatus(); // 检查用户是否已登录
  const isAdmin = checkAdminStatus(); // 检查用户是否是管理员

  if (to.meta.requiresAuth && !isLoggedIn) {
    // 需要登录但未登录，跳转到登录页面
    next("/login");
  } else if (to.meta.requiresAdmin && !isAdmin) {
    // 需要管理员权限但非管理员，跳转到错误页面
    next("/error");
  } else {
    // 其他情况直接放行
    next();
  }
});
```

在上述示例中，我们使用了 meta 字段来定义了每个路由的权限要求。在 beforeEach 方法中，我们首先通过 checkLoginStatus 和 checkAdminStatus 方法检查用户的登录状态和管理员权限，然后根据路由的 meta 字段进行判断。如果需要登录但用户未登录，则跳转到登录页面；如果需要管理员权限但用户非管理员，则跳转到错误页面；否则直接放行。

## 动态路由

Vue Router 的动态路由是指使用参数来动态生成路由的一种技术。它允许我们定义一个模板路由，并通过参数来动态地生成具体的路由。

在 Vue Router 中，动态路由通常使用冒号（:）来定义参数。例如，我们可以定义一个动态路由，用于接受一个 id 参数：

```js
const router = new VueRouter({
  routes: [
    {
      path: "/user/:id",
      component: User,
    },
  ],
});
```

上述代码中，我们使用 /user/:id 定义了一个动态路由，其中 :id 表示参数。在访问 /user/123 时，123 将被作为参数传递到 User 组件中，我们可以通过 $route.params.id 来获取这个参数。

动态路由可以让我们在不同场景下生成不同的路由，比如用于展示不同的用户信息、商品详情等等。在开发过程中，我们可以利用动态路由来简化代码，避免手动添加每个路由，提高代码复用性和开发效率。

需要注意的是，当定义了多个动态路由时，它们的顺序很重要。如果将 /user/:id 放在 /user/profile 之前，那么 /user/profile 将会被解释为一个 id 参数为 profile 的路由。为了避免这种情况，我们可以将具体路由放在动态路由之前，或者使用正则表达式来限制参数的格式。

## Vue Router 中有哪些路由钩子？

路由钩子是指在路由导航过程中的一些生命周期函数，可以用于实现一些特定的逻辑。Vue Router 中有多种路由钩子，包括全局前置守卫 beforeEach、全局后置钩子 afterEach、组件内的守卫 beforeRouteEnter、beforeRouteUpdate 和 beforeRouteLeave 等。

## 什么是路由懒加载？如何在 Vue Router 中使用路由懒加载？

路由懒加载是指在需要时才加载路由组件的技术，可以提高页面加载速度和性能。在 Vue Router 中，我们可以使用 import 函数和 webpack 的动态导入语法来实现路由懒加载。示例代码如下：

```js
const router = new VueRouter({
  routes: [
    {
      path: "/user",
      component: () => import("./components/User.vue"),
    },
  ],
});
```

## 两种模式 Hash 和 History

Hash：监听浏览器的 hashchange

History：监听浏览器的 popstate，利用 pushState 和 replaceState 操作地址栏

Hash 模式

Hash 模式是 Vue Router 默认的路由模式。在 hash 模式中，URL 中的 hash 值（#后面的内容）会被用来表示当前路由，例如：`http://example.com/#/foo。`

优点：

兼容性好：hash 模式的实现不依赖于浏览器对 HTML5 History API 的支持，可以兼容各种浏览器。  
简单易用：hash 模式的实现简单易懂，开发人员可以很容易地理解和使用。  
防止服务器请求：由于 hash 值不会被发送到服务器，所以服务器不会根据 URL 的变化发送新的请求。

缺点：

URL 不美观：hash 值看起来不太美观，不太符合现代网站设计的要求。  
限制性较大：由于 hash 值的限制，无法在服务器端根据 URL 的变化返回相应的页面，这会对 SEO 产生一定的影响。  
安全性较差：hash 值可以被篡改，因此在一定程度上存在安全风险。

History 模式

History 模式是 Vue Router 的另一种路由模式。在 History 模式中，URL 中不再带有#符号，而是直接使用常规的 URL 格式，例如：`http://example.com/foo。`

优点：

URL 美观：history 模式下，URL 更加美观，符合现代网站设计的要求。  
对 SEO 友好：history 模式下，可以在服务器端根据 URL 的变化返回相应的页面，对 SEO 比较友好。  
安全性好：history 模式下，URL 不易被篡改，因此安全性较高。

缺点：

兼容性差：history 模式的实现依赖于浏览器对 HTML5 History API 的支持，因此在一些老旧的浏览器上可能存在兼容性问题。  
需要服务器配合：在 history 模式下，服务器需要进行相应的配置，以确保在用户刷新页面或者直接访问某个 URL 时能够正确地返回相应的页面。

> 刷新的时候地址栏发送的请求不是真是存在的请求，会出现 404 因此服务端需要返回 index.html 再 index.html 走路由配置获取对应的页面

## history 刷新 404 解决方案

当我们进入到子路由时刷新页面，`web` 容器没有相对应的页面此时会出现 404

所以我们只需要配置将任意页面都重定向到 `index.html`，把路由交由前端处理

对 `nginx` 配置文件`.conf` 修改，添加 `try_files $uri $uri/ /index.html`;

```s
server {
  listen  80;
  server_name  www.xxx.com;

  location / {
    index  /data/dist/index.html;
    try_files $uri $uri/ /index.html;
  }
}
```

配置之后更新 `nginx` 配置`nginx -s reload`
这么做以后，你的服务器就不再返回 404 错误页面，因为对于所有路径都会返回 `index.html` 文件

为了避免这种情况，你应该在 Vue 应用里面覆盖所有的路由情况，然后在给出一个 404 页面

```js
const router = new VueRouter({
  mode: "history",
  routes: [{ path: "*", component: NotFoundComponent }],
});
```
