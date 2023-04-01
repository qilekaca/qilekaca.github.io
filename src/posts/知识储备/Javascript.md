---
title: JS常见面试题
date: 2020-04-01
sidebar: "auto"
categories:
  - 前端
tags:
  - JS面试题
---

# JS 常见面试题

## 事件捕获和冒泡

```js
// 是否添加捕获事件
xxx.addEventListener("click", function () {}, true); // true是捕获
xxx.addEventListener("click", function () {}, false); // false是冒泡

// abc -> bca
b.addEventListener("click", function () {}, true); // 给b添加捕获就可以了
```

## this 的指向

this 是执行上下文中的一个属性，它指向最后一次调用这个方法的对象。在实际开发中，this 的指向可以通过四种调用模式来判断。

1. 函数调用模式，当一个函数不是一个对象属性的时候，直接作为函数来调用时，this 指向全局对象
2. 方法调用模式，如果一个函数作为一个对象的方法来调用时，this 指向这个对象
3. 构造器调用模式，如果一个函数用 new 调用时，函数执行前会创建一个对象，this 指向新创建的对象
4. apply、call、bind 可以改变 this 的指向。这三个方法都可以显示的指定调用函数的 this 的指向，其中 apply 方法接收两个参数：一个是 this 绑定的对象，一个是参数数组，call 方法接收参数，第一个参数是 this 绑定的对象，后面其余的参数是传入函数执行的参数。也就是说，在使用 call 方法时传递给函数的参数必须逐个列举出来。bind 方法通过传入一个对象返回一个 this 绑定了传入对象的新函数，这个函数的 this 指向除了使用 new 时会改变其他情况下都不会改变
5. 箭头函数没有自己的 this。默认绑定外层的 this

> 这四种方式，使用构造器调用模式的优先级最高，然后是 apply call 和 bind 调用模式，然后是方法调用模式，然后是函数调用模式

tcp 四次挥手

<!-- ![](https://note-1256536434.cos.ap-beijing.myqcloud.com/img/截屏2020-09-25下午4.57.25.png)
tcp 三次握手
![](https://note-1256536434.cos.ap-beijing.myqcloud.com/img/截屏2020-09-25下午4.57.17.png) -->

## 实现自己的 bind call apply

```js
// call
Function.prototype.myCall = function (context, ...arg) {
  // Function.prototype.myCall = function(context, arg) {
  context = context || window;
  const fn = Symbol("myCall");
  context[fn] = this;
  context[fn](...arg);
  delete context[fn];
};
// apply
Function.prototype.myBind = function (context, ...args) {
  let self = this;
  return function () {
    return self.apply(context, [...args]);
  };
};
```

## 防抖和截流

```js
// 防抖
const debounce = (fn, time) => {
  let timeout = null;
  return function () {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, time);
  };
};

// 截流
const jieliu = (fn, time) => {
  let flag = true;
  return function () {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      flag = true;
    }, time);
  };
};
```

## 深浅拷贝

```js
// 数组的深浅拷贝 slice contact
const a = [1,2,3]
const b = a.slice()
const c = a.contact()
// 对象的浅拷贝
const a = {name: 'zhang', age: 12}
const b = {...a}
// 简单的浅拷贝
const shallClone = target => {
  if (typeof target === 'object' && target !== null) {
    const clone = Array.isArray(target) ? [] : {}
    for (let prop in target) {
      if(target.hasOwnProperty(prop)) {
        clone[prop] = target[prop]
      }
    }
    return clone
  } else {
    return target
  }
}
//
function deepClone(target)  {
  if (target === null) return null;
  if (typeof target !== 'object') return target;

  const cloneTarget = Array.isArray(target) ? [] : {};
  for (let prop in target) {
    if (target.hasOwnProperty(prop)) {
      cloneTarget[prop] = deepClone(target[prop]);
    }
  }
  return cloneTarget;
}
// 简单的深拷贝
const b = JSON.parse(JSON.stringify(a))
// 复杂深拷贝
function cloneDeep(target,map = new WeakMap()) {
  if(typeOf taret ==='object'){
     let cloneTarget = Array.isArray(target) ? [] : {};

     if(map.get(target)) {
        return target;
    }
     map.set(target, cloneTarget);
     for(const key in target){
        cloneTarget[key] = cloneDeep(target[key], map);
     }
     return cloneTarget
  }else{
       return target
  }

}
// 添加正则和时间
function deepClone(obj, map = new WeakMap()) {
    if (obj instanceof RegExp) return new RegExp(obj);
    if (obj instanceof Date) return new Date(obj);

    if (obj == null || typeof obj != 'object') return obj;
    if (map.has(obj)) {
        return map.get(obj);
    }
    let t = new obj.constructor();
    map.set(obj, t);
    for (let key in obj) {
        if (obj.hasOwnProperty(key)) {
            t[key] = deepClone(obj[key], map);
        }
    }
    return t;
}
//测试用例
let obj = {
    a: 1,
    b: {
        c: 2,
        d: 3
    },
    d: new RegExp(/^\s+|\s$/g)
}

let clone_obj = deepClone(obj)
obj.d = /^\s|[0-9]+$/g
console.log(clone_obj)
console.log(obj)

```

## 创建 ajax

```js

```

## Promise 的使用

- .then
- .catch
- .finally
- Promise.resolve()
- Promise.reject()
- Promise.race()
- Promise.all()

## new 一个对象的时候发生了什么

1. 创建一个空对象 `let obj = {}`
2. 让构造函数中的 this 指向新的对象，并执行构造函数的函数体`let result = Person.call(obj);`
3. 设置新对象的**proto**属性指向构造函数的原型对象`obj.__proto__ = Person.prototype;`
4. 判断构造函数的返回值类型，如果是值类型，则返回新对象。如果是引用类型，就返回这个引用类型的对象

## 数组去重

## 继承

## 防抖和节流

防抖可以用在输入框，防止用户多次提交表单，简单的理解就是在时间触发后 n 秒在执行回调，如果在这 n 秒中事件又被触发，则重新计时。
节流可用在监听滚动事件的时候。原来每秒执行 10 次回调变为每秒执行 2 次回调。

```js
// 函数防抖的实现
function debounce(fn, wait) {
  var timer = null;

  return function () {
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

  return function () {
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
