---
title: webapck配置
date: 2020-08-03
sidebar: "auto"
categories:
  - webpack
tags:
  - webapck
---

## Hello Webpack

1.  初始化项目`npm init -y`
2.  安装 webpack`yarn add webpack webpack-cli -D`
3.  创建 src 目录并在此目录下创建 main.js，加入`console.log('Hello Webpcak')`
4.  配置 package.json 在 scripts 下添加`"build": "webpack src/main.js"`
5.  执行`npm run build`，如果没有问题的话会在项目的根目录下生成 dist 文件夹，并且内部含有 main.js

<!-- more -->

## Awesome Webpack

webpack 精妙之处便是其丰富的自定义配置，在根目录新建 build 文件夹并在此添加`webpack.config.js`

```js
// /build/webpack.config.js
const path = require("path");
module.exports = {
  mode: "development", // 开发模式
  entry: path.resolve(__dirname, "../src/main.js"), // 入口文件
  output: {
    filename: "output.js", // 打包后的文件名称
    path: path.resolve(__dirname, "../dist"), // 打包后的目录
  },
};
```

修改 package.json 中的 build`"build": "webpack --config build/webpack.config.js"`
执行`npm run build`，此时 dist 文件夹下便会多出 output.js 文件。但是之前生成的 main.js 还存在，我们可以借助 `clean-webpack-plugin` 来清除之前残留的文件。`yarn add clean-webpack-plugin -D`

```js
const { CleanWebpackPlugin } = require("clean-webpack-plugin");
module.exports = {
  // ...省略其他配置
  plugins: [new CleanWebpackPlugin()],
};
```

### 处理 JS

进过上面的简单配置，webpack 每次都会将打包好的文件命名为`output.js`，实际开发中我们还需要在打包好的文件名中添加一段 hash 值。修改`output`下的 filename 为

```js
output: {
  filename: "[name].[hash:8].js", // 打包后的文件名称
  path: path.resolve(__dirname, "../dist") // 打包后的目录
}
```

为了使程序可以兼容更多的浏览器我们还需要使用 babel 将 es6 语法转换为 es5 语法。这时我们就需要使用`yarn add babel-loader @babel/preset-env @babel/core`

```js
// webpack.config.js
module.exports = {
  // 省略其它配置 ...
  module: {
    rules: [
      {
        test: /\.js$/,
        use: {
          loader: "babel-loader",
          options: {
            presets: ["@babel/preset-env"],
          },
        },
        exclude: /node_modules/,
      },
    ],
  },
};
```

babel-loader 不会对新的 api 进行转换例如（promise generator set map proxy 等），此时还需要借助 babel-polyfill 来进行转换。`yarn add @babel/polyfill`

```js
// webpack.config.js
const path = require("path");
module.exports = {
  entry: ["@babel/polyfill, path.resolve(__dirname,'../src/index.js')"], // 入口文件
};
```

### 处理 HTML

#### 单入口文件

进过上面的处理每次打包生成的 js 文件名都不项目，但是我们不能每次都重新引入打包好的 js 文件，所以我们需要`html-webpack-plugin`来帮助我们引入新的文件。`yarn add html-webpack-plugin -D` 项目根目录新建 public 文件夹，在里面新建 index.html。修改配置文件。

```js
// webpack.config.js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development", // 开发模式
  entry: path.resolve(__dirname, "../src/main.js"), // 入口文件
  output: {
    filename: "[name].[hash:8].js", // 打包后的文件名称
    path: path.resolve(__dirname, "../dist"), // 打包后的目录
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
    }),
  ],
};
```

#### 多入口文件

> 生成多个 `html-webpack-plugin` 实例即可

```js
const path = require("path");
const HtmlWebpackPlugin = require("html-webpack-plugin");
module.exports = {
  mode: "development", // 开发模式
  entry: {
    main: path.resolve(__dirname, "../src/main.js"),
    header: path.resolve(__dirname, "../src/header.js"),
  },
  output: {
    filename: "[name].[hash:8].js", // 打包后的文件名称
    path: path.resolve(__dirname, "../dist"), // 打包后的目录
  },
  plugins: [
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/index.html"),
      filename: "index.html",
      chunks: ["main"], // 与入口文件对应的模块名
    }),
    new HtmlWebpackPlugin({
      template: path.resolve(__dirname, "../public/header.html"),
      filename: "header.html",
      chunks: ["header"], // 与入口文件对应的模块名
    }),
  ],
};
```

### 处理 CSS

当我们在入口文件中引入 css 之后，我们还需要借助`style-loader css-loader`来帮助我们解析 css 文件，当我们使用 css 预处理器的时候例如 less 还需要`less less-loader`，安装 loader`yarn add style-loader css-loader less less-loader -D`

```js
// webpack.config.js
module.exports = {
  // ...省略其他配置
  module: {
    rules: [
      {
        test: /\.css$/,
        use: ["style-loader", "css-loader"], // 从右向左解析原则
      },
      {
        test: /\.less$/,
        use: ["style-loader", "css-loader", "less-loader"], // 从右向左解析原则
      },
    ],
  },
};
```

> 一定要注意解析的顺序

为浏览器添加前缀 `postcss-loader autoprefixer` `yarn add postcss-loader autoprefixer -D`

```js
// webpack.config.js
module.exports = {
    module:{
        rules:[
            test/\.less$/,
            use:['style-loader','css-loader','postcss-loader','less-loader'] // 从右向左解析原则
        ]
    }
}
```

还需要引入`autoprefixer`使其生效。两种配置，在根目录创建`postcss.config.js`

```js
module.exports = {
  plugins: [require("autoprefixer")], // 引用该插件即可了
};
```

第二种在`webpack.config.js`中配置

```js
// webpack.config.js
module.exports = {
  //...省略其他配置
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [
          "style-loader",
          "css-loader",
          {
            loader: "postcss-loader",
            options: {
              plugins: [require("autoprefixer")],
            },
          },
          "less-loader",
        ], // 从右向左解析原则
      },
    ],
  },
};
```

经过以上步骤处理，使用浏览器打开 dist 文件夹下的 index.html 可以看到 css 都通过 style 标签的方式添加到了 html 文件中了。如果样式文件过多，都加入 html 中难免混乱，我们可以通过`mini-css-extract-plugin`拆分出来用外链的形式引入。`yarn add mini-css-extract-plugin -D`

```js
const MiniCssExtractPlugin = require("mini-css-extract-plugin");
module.exports = {
  //...省略其他配置
  module: {
    rules: [
      {
        test: /\.less$/,
        use: [MiniCssExtractPlugin.loader, "css-loader", "less-loader"], // 注意此处不再需要使用 style-loader
      },
    ],
  },
  plugins: [
    new MiniCssExtractPlugin({
      filename: "[name].[hash].css",
      chunkFilename: "[id].css",
    }),
  ],
};
```

经过`mini-css-extract-plugin`转化之后会将所有的 css 文件打包成一个 css 文件。如过需要拆分成多个文件。需要使用`extract-text-webpack-plugin`。

```js
// yarn add extract-text-webpack-plugin@next -D
// webpack.config.js

const path = require("path");
const ExtractTextWebpackPlugin = require("extract-text-webpack-plugin");
let indexLess = new ExtractTextWebpackPlugin("index.less");
let indexCss = new ExtractTextWebpackPlugin("index.css");
module.exports = {
  module: {
    rules: [
      {
        test: /\.css$/,
        use: indexCss.extract({
          use: ["css-loader"],
        }),
      },
      {
        test: /\.less$/,
        use: indexLess.extract({
          use: ["css-loader", "less-loader"],
        }),
      },
    ],
  },
  plugins: [indexLess, indexCss],
};
```

### 处理图片、字体、媒体、等文件

`file-loader`就是将文件在进行一些处理后（主要是处理文件名和路径、解析文件 url），并将文件移动到输出的目录中

`url-loader`一般与`file-loader`搭配使用，功能与 `file-loader` 类似，如果文件小于限制的大小。则会返回 base64 编码，否则使用 `file-loader` 将文件移动到输出的目录中

```js
// webpack.config.js
module.exports = {
  // 省略其它配置 ...
  module: {
    rules: [
      // ...
      {
        test: /\.(jpe?g|png|gif)$/i, //图片文件
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "img/[name].[hash:8].[ext]",
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(mp4|webm|ogg|mp3|wav|flac|aac)(\?.*)?$/, //媒体文件
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "media/[name].[hash:8].[ext]",
                },
              },
            },
          },
        ],
      },
      {
        test: /\.(woff2?|eot|ttf|otf)(\?.*)?$/i, // 字体
        use: [
          {
            loader: "url-loader",
            options: {
              limit: 10240,
              fallback: {
                loader: "file-loader",
                options: {
                  name: "fonts/[name].[hash:8].[ext]",
                },
              },
            },
          },
        ],
      },
    ],
  },
};
```

## Your Webpack

经过以上内容的学习，我们可以通过 webpack 处理 css、js、html、等文件了。我们可以自己搭建 vue 的开发环境了。如同处理 css 文件一样我们同样需要 loader 来处理 vue 文件`vue-loader vue-template-compiler vue-style-loader`这些 loader 就是来处理 vue 文件的。`vue-loader`解析 vue 文件。`vue-template-compiler`用于编译模板。
