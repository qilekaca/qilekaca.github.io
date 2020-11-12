<!-- ---
title: Web版小程序后台管理
date: 2020-07-13
sidebar: "auto"
categories:
  - 前端
  - 云开发
tags:
  - Vue
  - 云开发
  - 后台
publish: false
--- -->

## 项目描述

> [项目地址](http://188.131.188.209/admin)

此项目为 web 版小程序的配套后台管理项目，主要使用 `vue + vue-admin-template` 和 [腾讯云云开发](https://cloudbase.net) 完成。这个完全使用云开发完成不需要借助 koa 等 node.js 程序。前端使用的库是 @cloudbase/js-sdk 云函数后端使用的是`@cloudbase/manager-node` 通过这两个库的搭配可以实现小程序的后台管理功能，不需要在借助 koa 来实现后端。

<!-- more -->

## 项目功能

获取用户列表，学校列表，发布内容列表，用户列表获取注册用户数，显示各学校注册人数，删除用户，增加学校，根据城市查找学校，删除学校，修改学校信息。删除用户发布的内容，根据发布内容的热度给内容排序。
