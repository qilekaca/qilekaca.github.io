---
title: Vue常见面试题
date: 2020-04-01
sidebar: "auto"
categories:
  - 前端
tags:
  - Vue面试题
---

# Vue 常见面试题

## v-if 和 v-show 的区别

v-show 的执行是不管条件是真是假，第一次渲染的时候都会被编译出来，也就是标签会被添加到 dom 中，之后切换的时候是通过 display：none 来显示隐藏元素。几乎不会影响什么性能。
v-if 在首次渲染的时候如果条件为假什么也不操作，页面当作没有这些元素，当条件为真的时候开始局部编译，动态向 dom 添加元素，当条件变为假的时候开始局部编译卸载这些元素
所以直观的理解就是当我们需要频繁切换元素的显示与隐藏我们可以使用 v-show，如果在运行时条件很少改变，则使用 v-if 较好。

对于管理系统的权限列表的展示，这里可以使用 v-if 来渲染，如果使用到 v-show，对于用户没有的权限，在网页的源码中，仍然能够显示出该权限，如果用 v-if，网页的源码中就不会显示出该权限。

## key 的作用

给每一个 vnode 一个唯一的 id，依靠这个 id 我们的 diff 操作可以更快速和准确。
如果我们不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地复用或修改相同类型元素的算法
而当我们使用 key 的时候 Vue 会基于 key 的变化重新排列并移除不存在的元素

## computed 的和 watch 的区别和 function 的区别

computed 计算属性依赖其他的值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值。
watch 更多是观察的作用，没有缓存，类似于某些数据的监听回调，每当数据发生变化的时候会执行回调进行后续的操作。所以如果我们需要在数据发生变化的时候执行某些事情我们可以使用 watch

与 function 的区别，computed 有缓存值，只有当 computed 的依赖属性发生变化并且下次获取 computed 值时才会重新计算 computed 的值

使用场景
computed 当我们需要进行数值计算的时候，并且依赖其他数据的时候应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时都需要重新计算
watch 当我们需要在数据变化的时候执行异步或者开销较大的操作时，应该使用 watch 使用 watch 允许我们执行异步操作，（注意防抖）

## 解释 mvvm

MVVM 最早由微软提出来，它借鉴了桌面应用程序的 MVC 思想，在前端页面中，把 Model 用纯 JavaScript 对象表示，View 负责显示，两者做到了最大限度的分离，把 Model 和 View 关联起来的就是 ViewModel。
ViewModel 负责把 Model 的数据同步到 View 显示出来，还负责把 View 的修改同步回 Model
View 和 Model 之间的同步工作完全是自动的，无需人为干涉（由 viewModel 完成，在这里指 VUE）
因此开发者只需关注业务逻辑，不需要手动操作 DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理
MVVM 的设计思想：关注 Model 的变化，让 MVVM 框架去自动更新 DOM 的状态，从而把开发者从操作 DOM 的繁琐步骤中解脱出来！
MVC 和 MVP 的关系
MVP 是从经典的模式 MVC 演变而来，它们的基本思想有相通的地方：Controller/Presenter 负责逻辑的处理，Model 提供数 据，View 负责显示。作为一种新的模式，MVP 与 MVC 有着一个重大的区别：在 MVP 中 View 并不直接使用 Model，它们之间的通信是通过 Presenter (MVC 中的 Controller)来进行的，所有的交互都发生在 Presenter 内部，而在 MVC 中 View 会直接从 Model 中读取数据而不是通过 Controller。
MVVM 和 MVP 的关系
而 MVVM 模式将 Presenter 改名为 ViewModel，基本上与 MVP 模式完全一致。 唯一的区别是，它采用双向绑定（data-binding）：View 的变动，自动反映在 ViewModel，反之亦然。这样开发者就不用处理接收事件和 View 更新的工作，框架已经帮你做好了。

## vue 的双向数据绑定的实现，响应式原理

双向数据绑定是通过数据劫持结合发布订阅者模式实现的，数据劫持是通过 Object.defineProperty 为属性添加 getter 和 setter 对数据进行劫持，在数据变动时发布消息给订阅者，触发响应的监听回调。

## Vue 组件的 data 为什么必须是函数

因为组件是可以复用的,JS 里对象是引用关系,如果组件 data 是一个对象,那么子组件中的 data 属性值会互相污染,产生副作用。

所以一个组件的 data 选项必须是一个函数,因此每个实例可以维护一份被返回对象的独立的拷贝。new Vue 的实例是不会被复用的,因此不存在以上问题。
