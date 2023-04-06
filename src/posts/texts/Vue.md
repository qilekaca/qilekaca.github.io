---
title: Vue常见面试题
date: 2020-04-01
sidebar: "auto"
categories:
  - 前端
tags:
  - Vue面试题
---

## 深度解析 Vue

### diff 算法

虚拟 DOM

```js
const vnode = {
  tag: "h1",
  attrs: {
    class: "title",
  },
  children: ["Hello, world!"],
};
```

Vue 的虚拟 DOM 是一个轻量级的 JavaScript 对象，它可以描述真实的 DOM 树结构。Vue 在更新视图时，通过比较新旧虚拟 DOM 树的差异，然后只更新发生变化的部分，从而提高了渲染效率。这个过程就是 Vue 的 diff 算法。

Vue 的 diff 算法主要包括以下三个步骤：

- 创建新节点

在比较新旧虚拟 DOM 树时，如果发现一个节点在新树中存在但是在旧树中不存在，那么就需要创建这个新节点。

- 删除旧节点

在比较新旧虚拟 DOM 树时，如果发现一个节点在旧树中存在但是在新树中不存在，那么就需要删除这个旧节点。

- 更新节点

在比较新旧虚拟 DOM 树时，如果发现一个节点在新旧树中都存在，那么就需要比较这个节点的属性和子节点，然后决定是否更新这个节点。

在 Vue 的 diff 算法中，为了提高比较效率，使用了一些优化策略，如：

- 只比较同级元素

如果一个节点在旧树和新树中都存在，并且它们的位置没有发生变化，那么就可以直接比较它们的属性和子节点，不用继续遍历它们的子树。

- 使用唯一标识符

如果一个节点在旧树和新树中都存在，但是它们的位置发生了变化，那么就需要遍历整个旧树来查找这个节点。为了提高查找效率，可以给每个节点设置一个唯一标识符，然后通过这个标识符来查找节点。

- 按需更新

如果一个节点在旧树和新树中都存在，并且它们的属性和子节点都没有发生变化，那么就可以跳过这个节点的比较，从而减少比较的次数。

综上所述，Vue 的 diff 算法通过比较新旧虚拟 DOM 树的差异，然后只更新发生变化的部分，从而提高了渲染效率。在比较过程中，Vue 使用了一些优化策略来减少比较的次数和提高比较的效率。

### 双端 diff 算法

双端 diff 算法是对普通的 diff 算法的优化，它在比较新旧虚拟 DOM 树时，从两端同时开始遍历，不断缩小遍历的范围，从而进一步提高了渲染效率。

双端 diff 算法的具体流程如下：

1. 定义两个指针，一个指向旧树的开始位置，另一个指向新树的开始位置。

2. 定义两个指针，一个指向旧树的结束位置，另一个指向新树的结束位置。

3. 从两端同时开始遍历，比较开始位置的节点。如果它们相同，就将两个指针向前移动一位，然后比较下一个节点。

4. 如果开始位置的节点不同，那么就从开始位置的节点开始向后比较，直到找到一个相同的节点或者遍历到结束位置。

5. 如果开始位置的节点向后遍历找到了一个相同的节点，那么就将中间的节点都标记为需要更新，并将两个指针向后移动到相同的位置，然后继续比较下一个节点。

6. 如果开始位置的节点向后遍历到了结束位置，那么就需要从结束位置开始向前遍历，找到一个相同的节点或者遍历到开始位置。

7. 如果结束位置的节点向前遍历找到了一个相同的节点，那么就将中间的节点都标记为需要更新，并将两个指针向前移动到相同的位置，然后继续比较下一个节点。

8. 如果结束位置的节点向前遍历到了开始位置，那么就说明没有找到相同的节点，那么就将开始位置的节点标记为需要删除，将结束位置的节点标记为需要添加，然后将两个指针分别向前和向后移动一位，然后继续比较下一个节点。

9. 当两个指针相遇时，遍历结束。

通过双端 diff 算法，我们可以从两端同时开始遍历，从而缩小遍历的范围，进一步提高渲染效率。双端 diff 算法的实现相对复杂一些，需要细心处理各种边界情况，但是对于大型应用程序和复杂组件来说，它可以提高很大的性能。

### 双端 diff 算法简单实现

```js
// 定义一个双端 diff 算法的函数
function diff(oldTree, newTree) {
  const patches = [];

  let oldStartIndex = 0;
  let newStartIndex = 0;
  let oldEndIndex = oldTree.length - 1;
  let newEndIndex = newTree.length - 1;

  while (oldStartIndex <= oldEndIndex && newStartIndex <= newEndIndex) {
    const oldNode = oldTree[oldStartIndex];
    const newNode = newTree[newStartIndex];

    if (oldNode === newNode) {
      oldStartIndex++;
      newStartIndex++;
      continue;
    }

    const oldNode2 = oldTree[oldEndIndex];
    const newNode2 = newTree[newEndIndex];

    if (oldNode2 === newNode2) {
      oldEndIndex--;
      newEndIndex--;
      continue;
    }

    if (oldNode === newNode2) {
      patches.push({ type: "MOVE", from: oldStartIndex, to: oldEndIndex + 1 });
      oldStartIndex++;
      newEndIndex--;
      continue;
    }

    if (oldNode2 === newNode) {
      patches.push({ type: "MOVE", from: oldEndIndex, to: oldStartIndex });
      oldEndIndex--;
      newStartIndex++;
      continue;
    }

    const index = oldTree.findIndex((node) => node === newNode);

    if (index !== -1) {
      patches.push({ type: "MOVE", from: index, to: oldStartIndex });
      oldTree.splice(index, 1);
      oldStartIndex++;
      newStartIndex++;
      continue;
    }

    patches.push({ type: "INSERT", index: oldStartIndex, node: newNode });
    oldStartIndex++;
    newStartIndex++;
  }

  while (newStartIndex <= newEndIndex) {
    const newNode = newTree[newStartIndex++];

    patches.push({ type: "INSERT", index: oldEndIndex + 1, node: newNode });
  }

  while (oldStartIndex <= oldEndIndex) {
    patches.push({ type: "REMOVE", index: oldStartIndex++ });
  }

  return patches;
}

// 定义一个更新节点的函数
function updateNode(node, patch) {
  switch (patch.type) {
    case "NONE":
      break;
    case "INSERT":
      node.splice(patch.index, 0, patch.node);
      break;
    case "REMOVE":
      node.splice(patch.index, 1);
      break;
    case "MOVE":
      const { from, to } = patch;
      const nodeToMove = node.splice(from, 1)[0];
      node.splice(to, 0, nodeToMove);
      break;
  }
}

// 定义一个遍历节点树并更新节点的函数
function walk(oldNode, newNode, patches, index = 0) {
  const currentPatch = patches[index];

  updateNode(oldNode, currentPatch);

  for (let i = 0; i < oldNode.length; i++) {
    walk(oldNode[i], newNode[i], patches, ++index);
  }
}

// 测试双端 diff 算法
const oldTree = ["A", "B", "C", "D", "E", "F"];
const newTree = ["A", "C", "B", "E", "G"];

const patches = diff(oldTree, newTree);

console.log(patches);

walk(oldTree, newTree, patches);

console.log(oldTree); // ['A', 'C', 'B', 'E', 'G', 'F']
```

在该示例代码中，我们模拟了一个旧节点树和一个新节点树的场景。首先，我们通过双端 diff 算法比较这两个节点树，并生成了一组 patches，表示需要对旧节点树进行哪些更新操作。然后，我们使用 `walk` 函数遍历旧节点树，并根据 patches 更新节点树。

具体来说，双端 diff 算法的实现过程中，我们通过维护四个指针（`oldStartIndex`、`newStartIndex`、`oldEndIndex`、`newEndIndex`）来表示两个节点树的开始和结束位置，然后根据当前指针指向的节点进行比较，并根据比较结果生成相应的 patches。最后，使用 `walk` 函数遍历旧节点树并更新节点。

## Vue

### Vue 的特点

Vue 是一种用于构建用户界面的 JavaScript 框架，它的实现原理可以分为三个方面：数据绑定、虚拟 DOM 和响应式系统。

**数据绑定**  
Vue 的数据绑定使用了一种称为“双向绑定”的技术，即数据的变化会自动反映到视图上，而视图上的变化也会自动同步到数据中。Vue 通过将数据与 DOM 元素建立起映射关系，实现了数据绑定的功能。

Vue 使用了一个称为“指令”的概念，用于在 DOM 元素上绑定数据。指令由一个以“v-”开头的属性名称和一个表达式组成，表达式用于获取或设置数据。例如，下面的代码使用了“v-bind”指令将一个数据绑定到了一个 DOM 元素上：`<div v-bind:class="className"></div>`
上面的代码将一个叫做“className”的数据绑定到了一个 DIV 元素上，它的 class 属性将根据数据的值进行更新。

**虚拟 DOM**  
Vue 使用虚拟 DOM 来实现高效的 DOM 更新。虚拟 DOM 是一个 JavaScript 对象，它的结构类似于真实的 DOM 结构，包含了节点类型、属性、子节点等信息。当 Vue 需要更新 DOM 时，它会先对虚拟 DOM 进行修改，然后再将修改后的虚拟 DOM 与旧的虚拟 DOM 进行对比，最终只更新需要更新的部分，从而提高性能。

Vue 使用一种称为“diff 算法”的算法来进行对比，以尽可能少地修改 DOM，从而提高性能。该算法会比较新旧两个虚拟 DOM 树，找出需要更新的部分，并生成一组操作指令来更新 DOM。

**响应式系统**  
Vue 使用了一种称为“响应式系统”的技术，用于实现数据的自动响应。当数据发生变化时，Vue 会自动更新相关的视图，而无需手动操作 DOM。

Vue 通过对数据进行劫持和监听，实现了响应式系统的功能。当 Vue 初始化时，会遍历所有的数据对象，将其中的每个属性转换为“getter”和“setter”。当数据发生变化时，Vue 会自动调用相应的“setter”方法，从而触发视图的更新。

总的来说，Vue 通过数据绑定、虚拟 DOM 和响应式系统这三个方面的技术，实现了高效、易用的用户界面构建框架。

### nextTick

在 Vue 中，nextTick 是一个异步方法，它的作用是将回调函数推迟到下一个 DOM 更新周期之后执行，以确保在更新之后执行回调函数。nextTick 在处理 Vue 的异步更新队列时非常有用。

当数据发生改变时，Vue 会异步地将 DOM 更新队列放入队列中，并在下一个事件循环周期中处理队列。这是为了避免不必要的 DOM 操作，提高性能。nextTick 的作用就是在这个事件循环周期中执行一个回调函数。

具体来说，当你调用 nextTick 时，Vue 会将你提供的回调函数推入一个回调队列中。然后，Vue 会在当前执行栈执行完毕后，检查队列中是否有回调函数需要执行，如果有，就会调用这些回调函数，然后刷新 DOM。

由于 nextTick 的执行是异步的，因此它可以保证在下一个 DOM 更新周期之后执行，即使在当前执行栈中已经有其他任务了。这使得你可以在 Vue 更新后执行一些操作，比如获取更新后的 DOM 元素的尺寸或位置。

### v-if 和 v-show 的区别

v-show 的执行是不管条件是真是假，第一次渲染的时候都会被编译出来，也就是标签会被添加到 dom 中，之后切换的时候是通过 display：none 来显示隐藏元素。几乎不会影响什么性能。  
v-if 在首次渲染的时候如果条件为假什么也不操作，页面当作没有这些元素，当条件为真的时候开始局部编译，动态向 dom 添加元素，当条件变为假的时候开始局部编译卸载这些元素  
所以直观的理解就是当我们需要频繁切换元素的显示与隐藏我们可以使用 v-show，如果在运行时条件很少改变，则使用 v-if 较好。

对于管理系统的权限列表的展示，这里可以使用 v-if 来渲染，如果使用到 v-show，对于用户没有的权限，在网页的源码中，仍然能够显示出该权限，如果用 v-if，网页的源码中就不会显示出该权限。

### key 的作用

给每一个 vnode 一个唯一的 id，依靠这个 id 我们的 diff 操作可以更快速和准确。
如果我们不使用 key，Vue 会使用一种最大限度减少动态元素并且尽可能的尝试就地复用或修改相同类型元素的算法
而当我们使用 key 的时候 Vue 会基于 key 的变化重新排列并移除不存在的元素

### computed 的和 watch 的区别和 function 的区别

computed 计算属性依赖其他的值，并且 computed 的值有缓存，只有它依赖的属性值发生改变，下一次获取 computed 的值时才会重新计算 computed 的值。  
watch 更多是观察的作用，没有缓存，类似于某些数据的监听回调，每当数据发生变化的时候会执行回调进行后续的操作。所以如果我们需要在数据发生变化的时候执行某些事情我们可以使用 watch。  
function 的区别，computed 有缓存值，只有当 computed 的依赖属性发生变化并且下次获取 computed 值时才会重新计算 computed 的值

使用场景

computed 当我们需要进行数值计算的时候，并且依赖其他数据的时候应该使用 computed，因为可以利用 computed 的缓存特性，避免每次获取值时都需要重新计算
watch 当我们需要在数据变化的时候执行异步或者开销较大的操作时，应该使用 watch 使用 watch 允许我们执行异步操作，（注意防抖）

### 解释 mvvm

MVVM 最早由微软提出来，它借鉴了桌面应用程序的 MVC 思想，在前端页面中，把 Model 用纯 JavaScript 对象表示，View 负责显示，两者做到了最大限度的分离，把 Model 和 View 关联起来的就是 ViewModel。
ViewModel 负责把 Model 的数据同步到 View 显示出来，还负责把 View 的修改同步回 Model
View 和 Model 之间的同步工作完全是自动的，无需人为干涉（由 viewModel 完成，在这里指 VUE）
因此开发者只需关注业务逻辑，不需要手动操作 DOM, 不需要关注数据状态的同步问题，复杂的数据状态维护完全由 MVVM 来统一管理
MVVM 的设计思想：关注 Model 的变化，让 MVVM 框架去自动更新 DOM 的状态，从而把开发者从操作 DOM 的繁琐步骤中解脱出来！
MVC 和 MVP 的关系
MVP 是从经典的模式 MVC 演变而来，它们的基本思想有相通的地方：Controller/Presenter 负责逻辑的处理，Model 提供数 据，View 负责显示。作为一种新的模式，MVP 与 MVC 有着一个重大的区别：在 MVP 中 View 并不直接使用 Model，它们之间的通信是通过 Presenter (MVC 中的 Controller)来进行的，所有的交互都发生在 Presenter 内部，而在 MVC 中 View 会直接从 Model 中读取数据而不是通过 Controller。
MVVM 和 MVP 的关系
而 MVVM 模式将 Presenter 改名为 ViewModel，基本上与 MVP 模式完全一致。 唯一的区别是，它采用双向绑定（data-binding）：View 的变动，自动反映在 ViewModel，反之亦然。这样开发者就不用处理接收事件和 View 更新的工作，框架已经帮你做好了。

### vue 的双向数据绑定的实现，响应式原理

双向数据绑定是通过数据劫持结合发布订阅者模式实现的，数据劫持是通过 Object.defineProperty 为属性添加 getter 和 setter 对数据进行劫持，在数据变动时发布消息给订阅者，触发响应的监听回调。

### Vue 组件的 data 为什么必须是函数

因为组件是可以复用的,JS 里对象是引用关系,如果组件 data 是一个对象,那么子组件中的 data 属性值会互相污染,产生副作用。

所以一个组件的 data 选项必须是一个函数,因此每个实例可以维护一份被返回对象的独立的拷贝。new Vue 的实例是不会被复用的,因此不存在以上问题。

### 编译器和渲染器

**compiler** 和 **render**

运行时

编译时

Svelte 是纯编译时框架

运行 ➕ 编译时

编译器将 html 字符串编译成数据对象，编译成虚拟节点。

```js
const obj = {
  tag: "div",
  children: [{ tag: "span", children: "hello world" }],
};
```

渲染函数将虚拟节点渲染成真实 dom

```js

compiler: html数据对象 -> 虚拟节点
render: 虚拟节点 -> dom

```

### MVVM

首先，MVVM 模式将应用程序分为三个核心组件：

- 模型 (Model)

模型表示应用程序中的数据和业务逻辑。它通常是一个包含数据和相关方法的类或对象，用于管理应用程序中的数据和数据处理。模型通常不直接与视图进行交互，而是由视图模型来代理和处理。

- 视图 (View)

视图表示用户界面，通常由 HTML、CSS 和 JavaScript 组成。视图负责呈现数据和用户交互。在 MVVM 模式中，视图通常是被动的，即不会主动修改数据，而是通过视图模型来修改数据。

- 视图模型 (ViewModel)

视图模型是视图和模型之间的桥梁。它维护视图中的数据状态，并将数据状态映射到模型中的数据。它还负责在视图和模型之间处理用户输入和数据更新的通信。视图模型通常包含一些属性和方法，用于维护视图中的数据状态和响应用户的行为。视图模型还可以使用数据绑定机制，将视图中的数据状态与模型中的数据状态保持同步。

在 MVVM 模式中，视图通过数据绑定绑定到视图模型，视图模型再与模型进行交互。这种双向数据绑定的方式使得数据变化可以自动更新视图，从而实现了一种响应式的用户界面。例如，当用户在视图中输入一个新的值时，视图模型会将这个值更新到模型中的相应数据上，并且视图会自动更新显示这个新的值。

MVVM 模式的优点包括：

- 双向数据绑定机制可以减少代码量，提高开发效率。

- 模块化的架构可以提高代码的可维护性和可重用性。

- 分离关注点可以提高代码的可测试性和可靠性。

- 响应式的用户界面可以提高用户体验。

总的来说，MVVM 模式可以使前端应用程序更易于维护和测试，同时也可以使开发过程更加高效。

### 虚拟 DOM 是什么，原理，优缺点

利用 js 对象模拟真实 DOM，通过比较新旧两个虚拟 DOM 的差异，最小化的操作真实 DOM，提高性能和用户体验。

虚拟 DOM 的原理是通过 diff 算法比较新旧虚拟 DOM 找出差异，最小化操作真实 DOM。

优点可以提高渲染性能，减少不必要的 DOM 操作，从而提高用户体验。缺点实现复杂，增加额外开销

### Vue 和 React 在虚拟 DOM 的 diff 上，做了哪些改进速度更快

对于同级元素，采用 key 属性来标记唯一性，可以避免不必要操作。

采用双端比较算法，在 diff 过程中同时从新旧虚拟 DOM 的双端开始比较，提高 diff 效率

对于列表操作，使用合并和移动策略，减少操作次数

### Vue 和 React 里的 key 作用是什么，为什么不能用 index，用了会怎样，如果不加 key 会怎样

key 是用来标识节点的唯一属性，在 diff 算法中，如果没有 key 属性，会默认使用节点的 index 属性作为唯一标识符，这样可能导致不必要的 DOM 操作和性能问题

使用 key 可以让 diff 算法更准确的找到新增，删除，移动操作，从而提高性能。如果使用 index 操作会导致 diff 算法无法区分新增、删除、移动等操作，从而导致不必要的 DOM 操作和性能问题

### vue 的双向数据绑定是如何实现的

是通过 Object.defineProperty 实现的。当数据发生变化时。会自动更新视图。当视图发生变化时，会自动更新数据。

具体来说，Vue 会在组件渲染时，通过遍历数据对象并使用 Object.defineProperty 把属性转化为 setter 和 getter，来实现数据的响应式更新，当数据发生变化时，setter 会通知依赖这个数据的视图进行更新

同时 Vue 还通过 v-model 指令实现了表单元素与数据之间的双向绑定。当用户修改表单数据时，v-model 会更新数据，从而触发响应式更新，更新视图

### keep-alive 作用是什么，怎么实现的，如何刷新

缓存组件实例，避免重复渲染和销毁，提高组件性能。在组件被激活时可以直接从缓存中获取组件并从新渲染，从而提高响应速度。

实现方式是通过在组件上添加一个名为 keep-alive 的特殊属性。当组件被包裹在 keep-alive 组件中时，组件的生命周期钩子函数会发生变化。被包裹的组件不在被销毁，而是被缓存下来

如何刷新缓存的组件取决于使用的刷新方式。可以通过 include 和 exclude 属性来控制缓存与不缓存哪些组件。可以调用$forceUpdate 方法强制刷新组件

### Vue 是怎么解析 template 的，template 会变成什么

Vue 会将 template 模版转换为渲染函数，实现渲染逻辑。渲染函数是由 vue 编译器将 template 模版编译为 js 代码，最终生成一个 render 函数

具体来说，vue 编译器会将 template 模版解析成抽象语法树（AST），然后通过便利抽象语法树，生成渲染函数

渲染函数返回值是 virtual dom，它描述组件的结构、属性和子元素。在组件渲染时，vue 会根据 virtual dom 生成真实的 dom。并将其插入到页面中

### vue 如何解析模版指令，模版变量，HTML 标签

指令、模版变量和 html 标签都是在 template 模版中使用的，vue 会将他们转换为对应的 js 代码，最终生成一个 render 函数

指令可以用 v-开头，例如 v-if、v-for、v-bind 等。vue 会将指令转换为对应的 js 代码，并在渲染函数中执行

模版变量可以用{{}}包裹，表示在这个位置插入 message 变量的值。vue 会将模版变量转换为对应的 js 代码，生成一个包含变量值的文本节点，并在渲染函数中插入对应的位置

HTML 标签在 template 中直接使用，例如 div、span 等。vue 会将标签转换为对应的 js 代码，并在渲染函数中生成对应的 DOM 元素。

### render 函数，render 和 template 有什么关系

render 函数是一种基于模版的渲染方式，可以直接生成 virtual dom 从而提高渲染效率。和 template 相比 render 函数更加灵活，可以实现更复杂的逻辑和动态渲染。

render 函数的主要作用是生成 virtual dom，它可以手写，也可以通过 vue 编译器将 template 模版编译成 render 函数，使用 render 函数时，不需要将 template 模版写在 vue 实例中，而是将 render 函数作为 vue 实例的一个属性。

```js
new Vue({
  el: "#app",
  render: function (createElement) {
    return createElement("div", "Hello, world!");
  },
});
// 使用render函数生成一个包含文本内容的div元素。createElement是一个用来创建VNode的函数，它接受一个字符串或组件选项对象作为参数，返回一个VNode对象。
```

## 组件通信

- Props
- provide 和 inject
- Event Bus
- Vuex
- Pinia

### Vuex

state getter moutation action module

- 可以处理共享状态管理，当多个视图依赖同一状态时
- 来自不同视图的行为需要变更同一状态

**State**：Vuex 使用单一状态树，用一个对象就包含了全部的应用层级状态。每个应用将仅仅包含一个 store 实例。

**Getter**：有时候我们需要从 store 中的 state 中派生出一些状态，例如对列表进行过滤并计数。Vuex 允许我们在 store 中定义 getter（可以认为是 store 的计算属性）。

**Mutation**：更改 Vuex 的 store 中的状态的唯一方法是提交 mutation。Vuex 中的 mutation 非常类似于事件，每个 mutation 都有一个字符串的事件类型和一个回调函数。

**Action**：Action 类似于 mutation，不同在于 Action 提交的是 mutation，而不是直接变更状态。Action 可以包含任意异步操作。

**Module**：由于使用单一状态树，应用的所有状态会集中到一个比较大的对象。当应用变得非常复杂时，store 对象就有可能变得相当臃肿。为了解决这个问题，Vuex 允许我们将 store 分割成模块（module）。

### Event Bus

在 Vue 中，可以使用 Event Bus 来实现跨组件通信。Event Bus 本质上是一个 Vue 实例，它用来触发和监听自定义事件。

下面是一个简单的 Event Bus 实现示例：

```js
// 创建一个Event Bus实例
const EventBus = new Vue();

// 在组件A中触发自定义事件
EventBus.$emit("my-event", "Hello from Component A!");

// 在组件B中监听自定义事件
EventBus.$on("my-event", (message) => {
  console.log(message); // 输出: Hello from Component A!
});
```

在上面的示例中，我们首先创建了一个 Event Bus 实例。然后，在组件 A 中使用`$emit`方法触发了一个名为 my-event 的自定义事件，并传递了一条消息作为参数。最后，在组件 B 中使用`$on`方法监听了 my-event 事件，并在事件触发时输出了传递过来的消息。

需要注意的是，使用 Event Bus 时应当遵循一些最佳实践，例如在组件销毁时取消事件监听，以避免内存泄漏等问题。

### provide 和 inject

- Event Bus
- Props 和事件：这是 Vue 中最基本的组件间通信方式。父组件通过 props 向子组件传递数据，子组件通过触发事件向父组件传递数据。
- Provide 和 inject：这种方式允许祖先组件向其所有子孙组件注入数据，而无需通过 props 一层层传递。

provide 和 inject 是 Vue.js 中的依赖注入 API。provide 和 inject 的作用是在父组件中使用 provide 来提供变量，然后在子组件中使用 inject 来注入变量。这样可以避免了 props 层层传递的问题，同时也可以让我们更好地管理组件之间的依赖关系。下面是一个例子：

```js
// 父组件
export default {
  provide() {
    return {
      message: 'Hello World!'
    }
  }
}

// 子组件
export default {
  inject: ['message'],
  mounted() {
    console.log(this.message) // Hello World!
  }
}
```

在上面的例子中，父组件通过 provide 提供了一个名为 message 的变量，然后在子组件中通过 inject 注入了这个变量。这样就可以在子组件中直接使用这个变量了。

- Vuex：Vuex 是一个专为 Vue.js 应用程序开发的状态管理模式。它采用集中式存储管理应用的所有组件的状态，并以相应的规则保证状态以一种可预测的方式发生变化。

## 组件

### Vue 中父子组件生命周期钩子函数的执行顺序

在 Vue 中，父组件先创建，然后子组件创建；子组件先挂载，然后父组件挂载，即“父 beforeCreate-> 父 create -> 子 beforeCreate-> 子 created -> 子 mounted -> 父 mounted”。希望这能帮到你。还有什么其他问题吗？

Vue.js 的生命周期钩子函数是在 Vue 实例化时自动调用的一些函数，它们允许您在特定的生命周期阶段添加自定义代码。Vue.js 有 11 个生命周期钩子函数，分别是 beforeCreate、created、beforeMount、mounted、beforeUpdate、updated、activated、deactivated、beforeDestroy、destroyed 和 errorCaptured。这些钩子函数可以帮助您在组件的不同阶段添加自定义代码，以便在组件的不同阶段执行操作。希望这能帮到你。还有什么其他问题吗？

- beforeCreate：在实例初始化之后，数据观测和事件配置之前被调用。在这个阶段，实例的属性和方法是不可用的。
- created：在实例创建完成后立即被调用。在这个阶段，实例已经完成了数据观测、属性和方法的运算，同时也完成了 watch/event 事件回调。但是，挂载阶段还没有开始，$el 属性目前不可见。
- beforeMount：在挂载开始之前被调用。在这个阶段，模板已经编译完成，但是还没有挂载到页面中。
- mounted：在挂载到页面后调用，此时$el 属性已经可见。mounted 阶段一般用于初始化页面交互逻辑、异步请求等操作。
- beforeUpdate：数据更新时调用，发生在虚拟 DOM 重新渲染和打补丁之前。可以在该钩子函数中进一步地更改数据，并且不会触发附加的重渲染过程。
- updated：由于数据更改导致虚拟 DOM 重新渲染和打补丁之后调用。当该钩子函数被调用时，组件 DOM 已经更新，所以您现在可以执行依赖于 DOM 的操作。
- activated：被 keep-alive 缓存的组件激活时调用。
- deactivated：被 keep-alive 缓存的组件停用时调用。
- beforeDestroy：实例销毁之前调用。在这个阶段，实例仍然完全可用。
- destroyed：实例销毁后调用。在这个阶段，所有指令都已解绑定，所有事件监听器都已移除。
- errorCaptured：当捕获一个来自子孙组件的错误时被调用。

### Vue 中逻辑复用

在 Vue 中，mixins 是一种分发 Vue 组件中可复用功能的非常灵活的方式。mixins 是一个 js 对象，它可以包含我们组件中 script 项中的任意功能选项，如 data、components、methods、created、computed 等等。我们只要将共用的功能以对象的方式传入 mixins 选项中，当组件使用 mixins 对象时所有 mixins 对象的选项都将被混入该组件本身的选项中来，这样就可以提高代码的重用性，使你的代码保持干净和易于维护。

当我们需要在多个组件中使用相同的逻辑时，我们可以将这些逻辑提取到一个混入对象中。例如，我们可以创建一个名为`exampleMixin`的混入对象，其中包含一个名为`created`的生命周期钩子和一个名为`data`的属性。然后，我们可以在多个组件中使用这个混入对象，以便它们都具有相同的逻辑。

下面是一个例子：

```js
// 定义一个混入对象
var exampleMixin = {
  created: function () {
    this.hello();
  },
  methods: {
    hello: function () {
      console.log("hello from mixin!");
    },
  },
};

// 定义一个使用混入对象的组件
var Component = Vue.extend({
  mixins: [exampleMixin],
  created: function () {
    console.log("component created");
  },
});

var component = new Component(); // => "hello from mixin!" "component created"
```

下面是一些使用混入的场景：

1. 当我们需要在多个组件中使用相同的逻辑时，我们可以将这些逻辑提取到一个混入对象中，以便它们都具有相同的逻辑。例如，我们可以创建一个名为`exampleMixin`的混入对象，其中包含一个名为`created`的生命周期钩子和一个名为`data`的属性。然后，我们可以在多个组件中使用这个混入对象。

2. 当我们需要在多个组件中使用相同的方法时，我们可以将这些方法提取到一个混入对象中。例如，我们可以创建一个名为`exampleMixin`的混入对象，其中包含一个名为`methods`的属性，该属性包含多个方法。然后，我们可以在多个组件中使用这个混入对象。

3. 当我们需要在多个组件中使用相同的计算属性时，我们可以将这些计算属性提取到一个混入对象中。例如，我们可以创建一个名为`exampleMixin`的混入对象，其中包含一个名为`computed`的属性，该属性包含多个计算属性。然后，我们可以在多个组件中使用这个混入对象。

在 Vue 中，如果一个组件和一个混入对象都定义了同名的选项，那么组件的选项会覆盖混入对象的选项。对于生命周期函数，混入对象中的代码会先执行，然后是组件中的代码。对于 data 中定义的字段，组件中定义同名数据，会覆盖掉混入对象中同名数据。

## Vue2 & Vue3

### Vue3 对比 Vue2

Vue3 相比 Vue2 有很多改进，包括但不限于以下几点：

- 更快的渲染速度和更小的包大小
- 更好的 TypeScript 支持
- 更好的响应式 API
- 更好的组件 API
- 更好的自定义指令 API
- 更好的插槽 API
- 更好的虚拟 DOM 性能
- 更好的 Tree-Shaking 支持

### Object.defineProperty 与 proxy 区别及缺点

Object.defineProperty 的缺陷:

1. 无法检测到对象属性的新增或删除
   由于 js 的动态性，可以为对象追加新的属性或者删除其中某个属性，
   这点对经过 Object.defineProperty 方法建立的响应式对象来说，
   只能追踪对象已有数据是否被修改，无法追踪新增属性和删除属性，
   这就需要另外处理。
2. 不能监听数组的变化（对数组基于下标的修改、对于 .length 修改的监测）
   vue 在实现数组的响应式时，它使用了一些 hack，
   把无法监听数组的情况通过重写数组的部分方法来实现响应式，
   这也只限制在数组的 push/pop/shift/unshift/splice/sort/reverse 七个方法，
   其他数组方法及数组的使用则无法检测到，

解决方法主要是使用 proxy 属性,这个 proxy 属性是 ES6 中新增的一个属性,
proxy 属性也是一个构造函数,他也可以通过 new 的方式创建这个函数,
表示修改某些操作的默认行为,等同于在语言层面做出修改,所以属于一种元编程
proxy 可以理解为在目标对象之前架设一层拦截,外界对该对象的访问,都必须经过这层拦截,
因此提出了一种机制,可以对外界的网文进行过滤和改写,proxy 这个词是代理,
用来表示由他代理某些操作,可以译为代理器

Proxy，字面意思是代理，是 ES6 提供的一个新的 API，用于修改某些操作的默认行为，
可以理解为在目标对象之前做一层拦截，外部所有的访问都必须通过这层拦截，
通过这层拦截可以做很多事情，比如对数据进行过滤、修改或者收集信息之类。
借用 proxy 的巧用的一幅图，它很形象的表达了 Proxy 的作用。

proxy 代理的特点:
proxy 直接代理的是整个对象而非对象属性,
proxy 的代理针对的是整个对象而不是像 object.defineProperty 针对某个属性,
只需要做一层代理就可以监听同级结构下的所有属性变化,
包括新增的属性和删除的属性
proxy 代理身上定义的方法共有 13 种,其中我们最常用的就是 set 和 get,但是他本身还有其他的 13 种方法

proxy 的劣势:
兼容性问题,虽然 proxy 相对越 object.defineProperty 有很有优势,但是并不是说 proxy,就是完全的没有劣势,主要表现在以下的两个方面:

1. proxy 有兼容性问题,无完全的 polyfill:
   proxy 为 ES6 新出的 API,浏览器对其的支持情况可在 w3c 规范中查到,通过查找我们可以知道,
   虽然大部分浏览器支持 proxy 特性,但是一些浏览器或者低版本不支持 proxy,
   因此 proxy 有兼容性问题,那能否像 ES6 其他特性有 polyfill 解决方案呢?,
   这时我们通过查询 babel 文档,发现在使用 babel 对代码进行降级处理的时候,并没有合适的 polyfill
2. 第二个问题就是性能问题,proxy 的性能其实比 promise 还差,
   这就需要在性能和简单实用上进行权衡,例如 vue3 使用 proxy 后,
   其对对象及数组的拦截很容易实现数据的响应式,尤其是数组、虽然 proxy 有性能和兼容性处理,但是 proxy 作为新标准将受到浏览器厂商重点持续的性能优化,、性能这块会逐步得到改善

### vue3 中 ref 和 reactive 之间的区别

在 Vue3 中，ref 和 reactive 是两种不同的响应式数据类型。它们都可以用来响应式地更新视图，但是它们之间有一些区别。

ref 是一个函数，可以接受一个初始值作为参数，返回一个带有 value 属性的响应式对象，value 属性可以通过 ref 对象直接访问和修改。

reactive 是一个函数，可以接受一个普通对象作为参数，返回一个包含了该对象所有属性和方法的响应式对象。这个响应式对象可以直接访问和修改原始对象中的属性和方法，而且修改会被自动地检测到并触发重新渲染视图。**仅对对象类型有效（对象、数组和 Map、Set 这样的集合类型），而对 string、number 和 boolean 这样的 原始类型 无效。**

在使用 ref 时，你需要通过.value 来访问和修改值，而在使用 reactive 时，你可以直接访问和修改对象的属性和方法。

下面是一些使用 ref 和 reactive 的示例：

```js
import { ref, reactive } from "vue";

// 使用ref
const count = ref(0);
console.log(count.value); // 输出0
count.value = 1;

// 使用reactive
const state = reactive({
  count: 0,
  message: "Hello World",
});
console.log(state.count); // 输出0
state.count = 1;
```

总的来说，ref 适用于简单数据类型的响应式更新，如数字、布尔值和字符串等，而 reactive 适用于复杂对象类型的响应式更新，如数组、对象和函数等。
