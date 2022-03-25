---
title: New New
date: 2022-3-25
sidebar: 'auto'
categories:
  - 前端
tags:
  - Vue
sticky: 1
---

# composition api

## 对比 vue2

要讨论 composition api 的好处，就不得不先说说 vue2 中 option api 的不好。  
当我们开发 vue 项目时，经常可以看到大几百行代码的 vue 文件，当我们想要增加一些新的功能时就需要在在文件中反复的的上下移动。  
先 data 中添加变量，在 methods 中添加函数，在钩子函数中添加内容，又需要在 computed 中添加计算属性，在 watch 中设置监听等等。  
处理同一功能的代码分散在多个部分。这种碎片化使的理解和维护复杂的组件变得困难。

<!-- more -->
