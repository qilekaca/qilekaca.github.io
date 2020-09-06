---
title: Vue 仿去哪网开发笔记
date: 2020-03-03
sidebar: "auto"
categories:
  - 前端
tags:
  - Vue
---

[项目地址](https://github.com/qilekaca/Travel)

## 前期准备

统一样式 reset.css 和添加 1px 边框 border.css，需要引入两个文件，此文件放置在 assets 文件夹下。移动端都有一个点击延迟，此时还需要使用一个 fastclick 库。在 main.js 中添加`fastClick.attach(document.body)`。因为移动端的项目所以还需要限制用户的缩放行为。在 index.html 文件下添加`<meta name="viewport" content=" width=device-width, initial-scale=1.0, minimum-scale=1.0, maximum-scale=1.0, user-scalable=no" />`

## 目录结构

```js
.
├── App.vue // Vue 项目的入口文件
├── assets  // 静态资源
├── common  // 公共组件
├── main.js // main.js
├── mock    // mock 数据
├── router  // vue-router 的配置文件
├── store   // vuex 的配置文件
└── views   // 项目页面

6 directories, 2 files

```

## 前端页面

此项目只有三个页面，city、detail、home 根据页面名创建这三个文件夹。

1. city 页面，包括四个组件 city-header city-search city-list city-alphabet。
2. detail 页面，包括三个组件 detail-banner detail-header detail-list。
3. home 页面，包括五个组件 home-header home-swiper home-icons home-recommend home-weekend

页面自己单独使用的组件放置在页面文件夹下的 components 文件夹下。

在页面的主文件中获取数据通过 :prop="prop" 传递给自组件。

页面获取数据放置在 mounted 声明周期钩子函数中。也可以放置在 created 函数中

**vue 的生命周期函数包括 beforeCreate、created、beforemount、mounted、beforeUpdate、updated、beforeDestroy、Destoryed**

**当使用 keep-alive 时 mounted 和 actived 钩子函数会失去作用，此时就需要 activated 和 deactivated 钩子函数**

city 页面父组件和 city-alphabet 组件通过\$emit 进行传值`this.$emit('change', this.letters[index])` 父组件通过`@change="handleLetterClick"` 接收子组件传递过来的值。

用户选择在 city 页面选择的城市通过 vuex 进行统一的状态管理。

## 公用组件

此项目只使用到了两个公用的组件。fade 和 gallary 组件。fade 组件为页面添加淡出动画，gallary 为全屏预览图片组件。

Fade 组件添加 slot 插槽

```vue
<template>
  <transition>
    <slot></slot>
  </transition>
</template>

<script>
export default {
  name: "CommonFade",
};
</script>

<style lang="stylus" scoped>
.v-enter, .v-leave-to
    opacity: 0
.v-enter-active, .v-leave-active
  transition: opacity .5s
</style>
```

Gallary 组件

这个组件包含 swiper ，当用户点击图片以外的区域的时候会传递给父组件一个 close 信号，父组件使用`@close="Function"` 接收子组件传递过来的信号。

```vue
<template>
  <div class="container" @click="handleGallaryClick">
    <div class="wrapper">
      <swiper :options="swiperOptions">
        <swiper-slide v-for="(item, index) in imgs" :key="index">
          <img class="gallary-img" :src="item" />
        </swiper-slide>
        <div class="swiper-pagination" slot="pagination"></div>
      </swiper>
    </div>
  </div>
</template>

<script>
export default {
  name: "CommonGallary",
  props: {
    imgs: {
      type: Array,
      default() {
        return [];
      },
    },
  },
  data() {
    return {
      swiperOptions: {
        pagination: ".swiper-pagination",
        paginationType: "fraction",
        observeParents: true,
        observer: true,
      },
    };
  },
  methods: {
    handleGallaryClick() {
      this.$emit("close");
    },
  },
};
</script>
```

使用组件

```vue
<template>
  <common-fade>
    <common-gallary
      :imgs="gallaryImgs"
      v-show="showGallary"
      @close="handleGallaryClose"
    ></common-gallary>
  </common-fade>
</template>
<script>
import CommonFade from "@/common/fade/Fade";
export default {
  components: {
    CommonFade,
  },
};
</script>
```

## vue-router 和 vuex

### Vue-router

vue-router 的使用 `yarn add vue-router` 在 src 目录下创建 router 文件夹在此文件夹下添加 index.js

```js
import Vue from "vue";
import VueRouter from "vue-router";
import Home from "@/views/home/Home"; // 此处的@是简写相当于/src/,会自动补全后缀
Vue.use(VueRouter);
const routes = [
  {
    path: "/",
    name: "Home",
    component: Home, // 两种引入组件的方法，一种是在文件的开头直接引入
    // 也可以懒加载引入
    // component: () => import(/* webpackChunkName: "about" */ '@/views/home/Home')
  },
];
const router = new VueRouter({
  mode: "history",
  base: process.env.BASE_URL,
  routes,
});

export default router;
```

在 main.js 中引入 vue-router

```js
import router from "./router";
new Vue({
  router,
});
```

### vuex

此项目为简单项目可以使用 EventBus 完成兄弟组件之间的传值，本着学习的态度所以使用了 vuex。

#### EventBus 版本 **调用完成后一定要记得销毁**

在 utils 工具函数文件夹下创建一个 bus.js 文件

```js
// bus.js
import Vue from "vue";
export const Bus = new Vue();
```

组件调用 bus 。

```vue
// 一个组件使用 $emit 传出数据
<script>
import Bus from "@/utils/bus";
export default {
  methods: {
    sendMsg() {
      Bus.$emit("share", this.msg);
    },
  },
};
</script>

// 另一组件使用 $on 接收数据
<script>
import Bus from "@/utils/bus";
export default {
  created() {
    this.getMsg();
  },
  methods: {
    getMsg() {
      Bus.$on("share", (data) => {
        this.msg = data;
      });
    },
  },
  destroyed() {
    // 调用完成后销毁
    Bus.$off("share");
  },
};
</script>
```

#### vuex 版本

`yarn add vuex` 在 src 目录下创建 store 文件夹，添加 index.js、mutations.js、state.js

```js
// index.js
import Vue from "vue";
import Vuex from "vuex";
import mutations from "./mutations";
import state from "./state";

Vue.use(Vuex);

export default new Vuex.Store({
  state,
  mutations,
  // getters: {
  //   doubleCity(state) {
  //     return state.city + ' ' + state.city
  //   }
  // }
});

// mutations.js
export default {
  changeCity(state, city) {
    state.city = city;
    try {
      localStorage.city = city;
    } catch (e) {
      // console.log(e)
    }
  },
};

// state.js
let defaultCity = "北京";
try {
  if (localStorage.city) {
    defaultCity = localStorage.city;
  }
} catch (e) {
  // console.log(e)
}

export default {
  city: defaultCity,
};

// src/main.js
import store from "./store";
new Vue({
  store,
});
```

直接使用 vuex 当用户刷新页面的时候，vuex 保存的状态会消失所以当用户更改 vuex 状态的时候需要将修改后的值保存到 localStorage 中，当用户获取 vuex 的值时先去 localStorage 中获取，如果不存在获取默认的值。

vuex 中 state 的值只能够通过 mutation 进行改变，mutation 只能够进行同步操作，要进行异步操作时需要使用 action， action 不会直接修改 state 中的值而是需要通过 mutaion 去提交修改。

## 组件传值

### 需求

city 页面共有四个组件 city-header city-search city-list city-alphabet。页面中需要当滑动 city-alphabet 或点击 city-alphabet 上的字母时 city-list 自动滚动到以这个字母为首字母的城市列表。要实现此功能就需要进行兄弟组件间的传值。city-alphabet 组件需要将自己所处在的字母传递给 city-list。

![截屏2020-09-04 下午3.23.43](/Users/mac/Documents/Typora/image/截屏 2020-09-04 下午 3.23.43-9205051.png)

### 实现

#### 分析

兄弟组件之间传值复杂情况可以使用 bus 进行传值，简单情况使用 `子 -> 父 -> 子` 可以利用父组件进行传值。city-alphabet 使用 `$emit` 将值传递给父组件，emit 传出的类型是 change 事件，在父组件中监听 change 事件。父组件进行监听 city-alphabet 传出的事件，然后在父组件的 methods 里定义一个 handleLetterClick 函数，父组件的参数 letter 就接受到了 city-alphabet 传递过来的参数。随后父组件在将 letter 传递给 city-list 即可。父组件通过`:letter="letter"`将 letter 传递给 city-list，在 city-list 中使用 props 接收传递过来的参数。在 city-list 中设置一个监听器 watch 用来监听 letter 的变化。当 letter 变化时滚动页面到以这个 letter 为首字母的列表上。

```vue
<template>
  <div>
    <city-header></city-header>
    <city-search :cities="cities"></city-search>
    <city-list
      :hotCities="hotCities"
      :cities="cities"
      :letter="letter"
    ></city-list>
    <city-alphabet :cities="cities" @change="handleLetterClick"></city-alphabet>
  </div>
</template>
```

```vue
<script>
  watch: {
    letter() {
      if (this.letter) {
        // this.$refs就可以取得此元素遍历的结点
        // 课程 8-6 10:00
        // this.$refs[this.letter]返回的是一个数组
        // 但是传递给this.scroll.scrollToElement()的必须是dom结点
        // 所以要在this.$refs[this.letter]后加上一个[0]
        const element = this.$refs[this.letter][0];
        this.scroll.scrollToElement(element);
      }
      console.log(this.letter);
    },
  }
}
</script>
```

#### 完善程序

> 保存城市信息的结构
>
> ```json
> cities = {
>   A: [{ id: 56, spell: 'aba', name: '阿坝' }, .... ],
>   B: [],
>   C: [],
>   ....
> }
> ```

当滚动右侧 ABCD 的时候左侧页面也可以进行相应的滚动。继续在子组件中绑定滚动事件的监听。`touchstart` `touchmove` `touchend` 要确定这三个事件的执行顺序，还需要定义一个标示位。`touchStatus` 默认这个值为 `false` 当开始滑动的时候变为 `true` 滑动结束的时候为 `false`，只有当 `touchStatus` 的值为 `true` 的时候才开始执行 `handleTouchMove` 函数。

但是如何获取右边滚动到那个字母呢  
首先获取字母 A 距离页面顶部的高，然后获取当前手指距离页面顶部的高，两个高相减除以每一个字母的高度即可获取到当前手指在第几个字母的位置了。知道当前字母在那个位置还需要有一个数组，用来保存这 26 个字母。可以使用计算属性获取这 26 个字母的数组。

```vue
<template>
  <ul class="list">
    <li
      class="item"
      v-for="item of letters"
      :key="item"
      :ref="item"
      @touchstart.prevent="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @click="handleLetterClick"
    >
      {{ item }}
    </li>
  </ul>
</template>
```

给每一个 li 标签添加一个 ref，`const startY = this.$refs['A'][0].offsetTop` 这样就可以获取到这个元素距离 search 组件底部的高度了。而且会根据设备不同返回不同的结果 `const touchY = e.touches[0].clientY - 79` touchY 就是获取的当前手指获取的距离手机顶部的距离所以还需要减去一个 79（header+search 组件的高度，79 是写死的不会根据手机改变）`const index = Math.floor((touchY - startY) / 20)` index 就是手指所在的第几个字母 `this.$emit('change', this.letters[index])` 将 index 传递给 city-list 组件，还要判断一下 index 在传递`(index >= 0 && index < this.letters.length)`。

```vue
<script>
export default {
  name: "CityAlphabet",
  props: {
    cities: Object,
  },
  computed: {
    letters() {
      const letters = [];
      for (let i in this.cities) {
        letters.push(i);
      }
      return letters;
      // 返回的结果['A','B','C',]
    },
  },
  data() {
    return {
      touchStatus: false,
      startY: 0,
      timer: null,
    };
  },
  updated() {
    this.startY = this.$refs["A"][0].offsetTop;
  },
  methods: {
    handleLetterClick(e) {
      this.$emit("change", e.target.innerText);
    },
    handleTouchStart() {
      this.touchStatus = true;
    },
    handleTouchMove(e) {
      if (this.touchStatus) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          const touchY = e.touches[0].clientY - 79;
          const index = Math.floor((touchY - this.startY) / 20);
          if (index >= 0 && index < this.letters.length) {
            this.$emit("change", this.letters[index]);
          }
        }, 16);
      }
    },
    handleTouchEnd() {
      this.touchStatus = false;
    },
  },
};
</script>
```

#### 完整代码

> City-alphabet

```vue
<template>
  <ul class="list">
    <li
      class="item"
      v-for="item of letters"
      :key="item"
      :ref="item"
      @touchstart.prevent="handleTouchStart"
      @touchmove="handleTouchMove"
      @touchend="handleTouchEnd"
      @click="handleLetterClick"
    >
      {{ item }}
    </li>
  </ul>
</template>

<script>
export default {
  name: "CityAlphabet",
  props: {
    cities: Object,
  },
  computed: {
    letters() {
      const letters = [];
      for (let i in this.cities) {
        letters.push(i);
      }
      return letters;
      // 返回的结果['A','B','C',]
    },
  },
  data() {
    return {
      touchStatus: false,
      startY: 0,
      timer: null,
    };
  },
  updated() {
    this.startY = this.$refs["A"][0].offsetTop;
  },
  methods: {
    handleLetterClick(e) {
      this.$emit("change", e.target.innerText);
    },
    handleTouchStart() {
      this.touchStatus = true;
    },
    handleTouchMove(e) {
      if (this.touchStatus) {
        if (this.timer) {
          clearTimeout(this.timer);
        }
        this.timer = setTimeout(() => {
          const touchY = e.touches[0].clientY - 79;
          const index = Math.floor((touchY - this.startY) / 20);
          if (index >= 0 && index < this.letters.length) {
            this.$emit("change", this.letters[index]);
          }
        }, 16);
      }
    },
    handleTouchEnd() {
      this.touchStatus = false;
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.list
  display: flex
  flex-direction: column
  justify-content: center
  position: absolute
  top: 1.58rem
  right: 0
  bottom: 0
  width: .4rem
  .item
    line-height: .4rem
    text-align: center
    color: $bgColor
</style>
```

> City-list

```vue
<template>
  <div class="list" ref="wrapper">
    <div>
      <div class="area">
        <div class="title border-topbottom">当前城市</div>
        <div class="button-list">
          <div class="button-wrapper">
            <div class="button">{{ this.currentCity }}</div>
          </div>
        </div>
      </div>
      <div class="area">
        <div class="title border-topbottom">热门城市</div>
        <div class="button-list">
          <div
            class="button-wrapper"
            v-for="item of hotCities"
            :key="item.id"
            @click="handleCityClick(item.name)"
          >
            <div class="button">
              {{ item.name }}
            </div>
          </div>
        </div>
      </div>
      <div class="area" v-for="(item, key) of cities" :key="key" :ref="key">
        <div class="title border-topbottom">{{ key }}</div>
        <div
          class="item-list"
          v-for="innerItem of item"
          :key="innerItem.id"
          @click="handleCityClick(innerItem.name)"
        >
          <div class="item border-bottom">{{ innerItem.name }}</div>
        </div>
      </div>
    </div>
  </div>
</template>

<script>
import Bscroll from "better-scroll";
import { mapState, mapMutations } from "vuex";
export default {
  name: "CityList",
  props: {
    hotCities: Array,
    cities: Object,
    letter: String,
  },
  computed: {
    ...mapState({
      currentCity: "city",
    }),
  },
  methods: {
    handleCityClick(city) {
      this.changeCity(city);
      this.$router.push("/");
    },
    ...mapMutations(["changeCity"]),
  },
  mounted() {
    this.scroll = new Bscroll(this.$refs.wrapper);
  },
  watch: {
    letter() {
      if (this.letter) {
        const element = this.$refs[this.letter][0];
        this.scroll.scrollToElement(element);
      }
    },
  },
};
</script>

<style lang="stylus" scoped>
@import '~styles/varibles.styl'
.border-topbottom
  &:before
    border-color: #ccc
  &:after
    border-color: #ccc
.border-bottom
  &:before
    border-color: #ccc
.list
  overflow: hidden
  position: absolute
  top: 1.58rem
  left: 0
  right: 0
  bottom: 0
  .title
    line-height: .54rem
    background: #eee
    padding-left: .2rem
    color: #666
    font-size: .26rem
  .button-list
    overflow: hidden
    padding: .1rem .6rem .1rem .1rem
    .button-wrapper
      float: left
      width: 33.33%
      .button
        margin: .1rem
        padding: .1rem 0
        text-align: center
        border: .02rem solid #ccc
        border-radius: .06rem
  .item-list
    .item
      line-height: .76rem
      padding-left: .2rem
</style>
```

## 性能优化

### 函数节流

> 给 handleTouchMove 添加函数节流，因为当每次发生手指滑动的时候都去触发 handleTouchMove 函数会造成资源的不必要浪费，所以可以给 handleTouchMove 函数添加一个节流，使它每隔 16ms 执行一次。

```javascript
// 原始版本
handleTouchMove(e) {
      if (this.touchStatus) {
        // 可以发现每次执行这个函数都会重新计算一下这个`startY`
        // 所以此处可以优化，可以将startY放入updated钩子函数中
        const startY = this.$refs['A'][0].offsetTop
        const touchY = e.touches[0].clientY - 79
        const index = Math.floor((touchY - startY) / 20)
        if (index >= 0 && index < this.letters.length) {
          this.$emit('change', this.letters[index])
        }
      }
    }
// 节流版本
handleTouchMove(e) {
      if (this.touchStatus) {
        if (this.timer) {
          clearTimeout(this.timer)
        }
        this.timer = setTimeout(() => {
          const touchY = e.touches[0].clientY - 79
          const index = Math.floor((touchY - this.startY) / 20)
          if (index >= 0 && index < this.letters.length) {
            this.$emit('change', this.letters[index])
          }
        }, 16)
      }
    }
```

### 使用 keep-alive

当用户在首页滑动进入 detail 页面查看详情之后重新回到 home 页面，此时会重新获取首页的数据，这种用户体验并不好，当用户重新回到 home 页面时，home 页面应该还在用户之前所在的位置。keep-alive 正是为此设计的。只需要在需要缓存的组件外面包裹上 keep-alive 标签就行了。

```vue
<template>
  <div id="app">
    <keep-alive exclude="Detail">
      <router-view />
    </keep-alive>
  </div>
</template>
```

> 将不需要被缓存的组件添加到 exclude 中就行了。

### 函数防抖

提到函数节流就不得提到函数防抖。
函数防抖主要使用在

- 给按钮加函数防抖防止表单多次提交
- 对于输入框连续输入进行 ajax 验证时，用函数防抖能有效减少请求次数
- 判断 scroll 是否滑倒底部，滚动事件+函数防抖

函数节流主要使用在

- 游戏中刷新率
- dom 元素拖拽
- canvas 画笔功能

```js
// 函数防抖的实现
function debounce(fn, wait) {
  var timer = null;

  return function() {
    var context = this,
      args = arguments;

    // 如果此时存在定时器的话，则取消之前的定时器重新记时
    if (timer) {
      clearTimeout(timer);
      timer = null;
    }

    // 设置定时器，使事件间隔指定事件后执行
    timer = setTimeout(() => {
      fn.apply(context, args);
    }, wait);
  };
}

// 函数节流的实现;
function throttle(fn, delay) {
  var preTime = Date.now();

  return function() {
    var context = this,
      args = arguments,
      nowTime = Date.now();

    // 如果两次时间间隔超过了指定时间，则执行函数。
    if (nowTime - preTime >= delay) {
      preTime = Date.now();
      return fn.apply(context, args);
    }
  };
}
```
