## 事件捕获和冒泡

```js
// 是否添加捕获事件
xxx.addEventListener("click", function() {}, true); // true是捕获
xxx.addEventListener("click", function() {}, false); // false是冒泡

// abc -> bca
b.addEventListener("click", function() {}, true); // 给b添加捕获就可以了
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
![](https://note-1256536434.cos.ap-beijing.myqcloud.com/img/截屏2020-09-25下午4.57.25.png)
tcp 三次握手
![](https://note-1256536434.cos.ap-beijing.myqcloud.com/img/截屏2020-09-25下午4.57.17.png)

## 实现自己的 bind call apply

```js
// call
Function.prototype.myCall = function(context, ...arg) {
  // Function.prototype.myCall = function(context, arg) {
  context = context || window;
  const fn = Symbol("myCall");
  context[fn] = this;
  context[fn](...arg);
  delete context[fn];
};
// apply
Function.prototype.myBind = function(context, ...args) {
  let self = this;
  return function() {
    return self.apply(context, [...args]);
  };
};
```

## 防抖和截流

```js
// 防抖
const debounce = (fn, time) => {
  let timeout = null;
  return function() {
    clearTimeout(timeout);
    timeout = setTimeout(() => {
      fn.apply(this, arguments);
    }, time);
  };
};

// 截流
const jieliu = (fn, time) => {
  let flag = true;
  return function() {
    if (!flag) return;
    flag = false;
    setTimeout(() => {
      fn.apply(this, arguments);
      flag = true;
    }, time);
  };
};
```
