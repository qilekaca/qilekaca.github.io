---
title: JS常见面试题
date: 2020-04-01
sidebar: "auto"
categories:
  - 前端
tags:
  - JS面试题
---

## 事件捕获和冒泡

在 JavaScript 中，事件捕获和事件冒泡是处理事件的两种不同方式。它们是 DOM 事件模型的组成部分，用于描述事件从 DOM 树的哪个节点开始传播，以及事件的传播顺序。

事件捕获是指事件从最外层的元素开始向内部元素传播的过程，直到达到最具体的目标元素。这个过程可以用 addEventListener() 方法来实现，通过设置第三个参数为 true 来启用事件捕获。在事件捕获阶段中，事件会首先被最外层的元素捕获，然后向下传播到目标元素。

事件冒泡则是指事件从目标元素开始向外传播到最外层的元素的过程。在事件冒泡阶段中，事件会首先在目标元素上触发，然后从内向外依次传播到包含元素，直到最外层的元素。这是事件传播的默认行为，如果不设置事件捕获，那么事件会按照事件冒泡的方式进行传播。

总结一下，事件捕获和事件冒泡是两种不同的事件传播方式，可以通过 addEventListener() 方法的第三个参数来控制事件的传播方式。在事件捕获阶段中，事件会从最外层的元素向内部传播，而在事件冒泡阶段中，事件会从目标元素向外部传播。

```js
// 是否添加捕获事件
xxx.addEventListener("click", function () {}, true); // true是捕获
xxx.addEventListener("click", function () {}, false); // false是冒泡
```

事件捕获和事件冒泡在 JavaScript 中广泛应用于处理用户交互和响应用户操作的场景，比如：

事件委托：通过利用事件冒泡的特性，在父元素上绑定事件处理程序，以处理子元素上的事件。这种方法可以提高性能和代码可维护性，特别是在动态生成元素或需要对大量元素进行事件绑定时更加实用。

表单验证：通过在表单元素上绑定事件处理程序，检查表单元素的值，实现表单验证功能。这种方法可以让用户在提交表单前及时发现输入错误，提高用户体验。

模态框：通过在页面中添加一个遮罩层，捕获所有事件，实现模态框的弹出和隐藏。这种方法可以防止用户在模态框弹出时操作页面其他部分，提高模态框的交互性和可用性。

滚动加载：通过在滚动容器上绑定滚动事件处理程序，检测容器滚动位置，实现滚动加载功能。这种方法可以提高页面加载性能，特别是在加载大量数据时更加实用。

总之，事件捕获和事件冒泡是 JavaScript 中非常重要的概念，可以帮助开发者更加高效地处理用户交互和响应用户操作的需求。

以下是一个简单的代码示例，演示如何使用事件捕获和事件冒泡来处理单击事件：

HTML 代码：

```html
<div id="outer">
  <div id="inner">
    <button id="button">Click me!</button>
  </div>
</div>
```

JavaScript 代码：

```js
const outer = document.querySelector("#outer");
const inner = document.querySelector("#inner");
const button = document.querySelector("#button");

// 事件捕获
outer.addEventListener(
  "click",
  () => {
    console.log("Outer element clicked!");
  },
  true
);

// 事件冒泡
inner.addEventListener("click", () => {
  console.log("Inner element clicked!");
});

button.addEventListener("click", () => {
  console.log("Button clicked!");
});
```

在上面给出的代码中，当用户单击按钮时，事件会按照以下顺序触发三个元素的单击事件处理程序，并输出相应的日志信息：

事件捕获阶段：从最外层元素开始向内传播，先触发外层元素的单击事件处理程序，输出 "Outer element clicked!"。

事件目标阶段：事件到达目标元素，即按钮元素，触发按钮元素的单击事件处理程序，输出 "Button clicked!"。

事件冒泡阶段：从目标元素开始向外传播，触发内层元素的单击事件处理程序，输出 "Inner element clicked!"，最后到达最外层元素，事件传播结束。

因此，日志输出的顺序为 "Outer element clicked!"、"Button clicked!" 和 "Inner element clicked!"。

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

在 JavaScript 中，call、apply 和 bind 是 Function 对象自带的三个方法，这三个方法的主要作用是改变函数调用过程中的 this 指向。其中，call 和 apply 的作用是一样的，都是改变函数的 this 指向，只是传参方式不同。call 方法传递的参数是一个一个传递的，而 apply 方法传递的参数是一个数组。bind 方法则是返回一个新函数，新函数中的 this 指向被绑定到了 bind 方法的第一个参数上。

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

## 闭包

函数内部返回一个函数，是指一个函数可以访问并操作其所在函数作用域中的变量，即该函数已经返回。常用于创建私有变量和函数

## 事件循环

事件循环是 js 异步编程的一种解决方案。当代码中遇到异步事件时，事件循环会将事件加入到一个事件队列中，并等待执行。当所有同步任务执行完毕之后，事件循环会从事件队列中取出一个事件并执行，直到队列为空。

- 同步任务
- 微任务队列 Promise
- 宏任务队列 setTimeout、setIntervel

## 执行上下文

this

## 深拷贝

- JSON.parse()和 JSON.stringify()
- 递归

```js
function deepClone(obj) {
  if (typeof obj !== "object" || obj === null) {
    return obj;
  }
  let clone = {};
  for (let key in obj) {
    clone[key] = deepClone(obj[key]);
  }
  return clone;
}

const obj = { name: "Tom", age: 18 };
const newObj = deepClone(obj);
```

以上两种方法都能够实现对象的深拷贝，但是也存在一些缺点：

1. JSON.parse() 和 JSON.stringify() 方法不能处理包含函数、RegExp、Date 等特殊对象的拷贝，也不能处理对象中存在循环引用的情况。

2. 递归复制的方式虽然能够处理循环引用的情况，但是如果对象中存在太多的嵌套属性或者属性值过大，递归的效率会很低。

## 实现一个批量请求函数，能够限制并发量

批量请求函数可以将多个请求合并为一个请求，从而减少网络请求数量，提高性能。可以使用 Promise.all()来实现多个请求的并发，但如果并发量过大，可能会对服务器造成压力。因此，需要对并发量进行限制。

可以使用一个计数器来记录当前正在执行的请求数量，同时使用一个队列来保存等待处理的请求。每当一个请求处理完毕后，从队列中取出下一个请求进行处理，直到所有请求都处理完毕为止。

```js
function batchRequest(urls, limit) {
  let count = 0;
  let queue = [];
  let results = [];

  return new Promise((resolve) => {
    function next() {
      if (count < limit && queue.length > 0) {
        let url = queue.shift();
        count++;
        fetch(url)
          .then((response) => response.json())
          .then((data) => {
            results.push(data);
            count--;
            next();
          });
      } else if (count === 0 && queue.length === 0) {
        resolve(results);
      }
    }

    urls.forEach((url) => {
      queue.push(url);
    });

    next();
  });
}
```

上面代码中，使用一个计数器 count 来记录当前正在处理的请求数量，一个队列 queue 来保存等待处理请求，一个数组 result 来保存请求的结果。使用 Promise 包装请求结果，并在所有请求处理完毕后返回结果。

```js
batchRequest(
  [
    "https://jsonplaceholder.typicode.com/posts/1",
    "https://jsonplaceholder.typicode.com/posts/2",
    "https://jsonplaceholder.typicode.com/posts/3",
    "https://jsonplaceholder.typicode.com/posts/4",
    "https://jsonplaceholder.typicode.com/posts/5",
  ],
  2
).then((results) => console.log(results));
```
