---
title: show_me_code
date: 2022-03-14
categories:
  - 面试
tags:
  - 算法
---

## 查找数组中重复出现的数

```js
function getSameNum(arr) {
  let result = [];
  let arr = arr.sort((a, b) => a - b);
  for (let i = 0; i < arr.length - 1; i++) {
    if (arr[i] == arr[i + 1]) {
      result.push(arr[i]);
    }
  }
  return Array.form(new Set(result));
}
```

## 扁平化数组

```js
// one
let arr = [1, 2, [3, 4, [5, 6]]];
let flatArr = arr.flat(Infinity);
console.log(flatArr); // [1, 2, 3, 4, 5, 6]

// two
function flat(arr) {
  let result = [];
  for (let i = 0; i < arr.length; i++) {
    if (Array.isArray(arr[i])) {
      result = result.concat(flatten(arr[i]));
    } else {
      result.push(arr[i]);
    }
  }
  return result;
}
```

## 实现一个睡眠函数

```js
function sleep(time) {
  return new Promise((resolve) => setTimeout(resolve, time));
}

async function run() {
  console.log("start");
  await sleep(5000);
  console.log("end");
}
```
