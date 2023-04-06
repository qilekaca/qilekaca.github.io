---
title: 上传图片到Node服务器
date: 2020-04-01
categories:
  - 后端
tags:
  - Node
---

## 常见方法

在使用 Node 作为服务端处理用户上传的图片时，通常采用以下几种方案：

**将图片保存到服务器本地文件系统**  
这是最简单的方式，可以将用户上传的图片保存到服务器的本地文件系统中，然后在需要显示图片的地方，将图片的 URL 返回给客户端，客户端再根据 URL 进行显示。这种方式不需要额外的存储设备和存储空间，但是需要考虑服务器的磁盘空间和备份等问题。

**将图片保存到云存储服务**  
云存储服务可以提供大规模的存储空间和可靠的备份服务，常见的云存储服务包括 AWS S3、阿里云 OSS、腾讯云 COS 等。在使用这种方式时，需要在服务器端调用云存储服务提供的 API 上传图片，并在需要显示图片的地方，将图片的 URL 返回给客户端，客户端再根据 URL 进行显示。这种方式需要考虑云存储服务的费用和调用 API 的安全性等问题。

**将图片保存到数据库**  
可以将图片保存到数据库中，常见的数据库包括 MongoDB、MySQL 等。在使用这种方式时，需要考虑数据库的性能和存储空间等问题，同时也需要考虑数据备份和恢复的问题。需要注意的是，如果图片比较大，可以使用 MongoDB 的 GridFS 来存储。

无论哪种方式，都需要对用户上传的图片进行验证和处理，例如检查文件类型、大小和命名规则等，并对图片进行压缩、加密等处理，以保证数据的安全性和可用性。

## 将图片保存到服务器本地文件系统

在前端上传图片到 Node 服务器的过程中，我们可以使用前端的 FormData 对象和 XMLHttpRequest 对象来实现。

以下是一个简单的示例代码：

```html
<!-- index.html -->
<input type="file" id="fileInput" />
<button onclick="uploadFile()">上传图片</button>

<script>
  function uploadFile() {
    const fileInput = document.getElementById("fileInput");
    const file = fileInput.files[0];

    const formData = new FormData();
    formData.append("file", file);

    const xhr = new XMLHttpRequest();
    xhr.open("POST", "/upload");
    xhr.onload = function () {
      if (xhr.status === 200) {
        console.log("上传成功");
      } else {
        console.log("上传失败");
      }
    };
    xhr.send(formData);
  }
</script>
```

在上面的代码中，我们首先通过 document.getElementById 方法获取了一个 input 标签，并监听了一个点击事件。当点击上传按钮时，我们通过 FormData 对象构建了一个表单数据，并将文件对象添加到了其中。然后，我们创建了一个 XMLHttpRequest 对象，指定了请求方法和请求地址，并设置了请求成功和请求失败时的回调函数。最后，我们通过 xhr.send 方法将表单数据发送给服务器。

在服务器端，我们可以使用 multer 中间件来处理文件上传。以下是一个简单的示例代码：

```js
// server.js
const express = require("express");
const multer = require("multer");

const app = express();
const upload = multer({ dest: "uploads/" });

app.post("/upload", upload.single("file"), function (req, res) {
  console.log(req.file);
  res.send("上传成功");
});

app.listen(3000, function () {
  console.log("服务器启动成功");
});
```

在上面的代码中，我们首先使用 multer 中间件来处理文件上传。其中，dest 参数指定了上传文件的存储目录。然后，我们使用 app.post 方法来处理客户端的上传请求。在请求处理函数中，我们可以通过 req.file 来获取上传的文件信息，并返回一个成功的响应。

## 将图片保存到数据库

要将上传的图片文件保存到 MongoDB 数据库，可以使用 Node.js 中的 GridFS，这是一个 MongoDB 提供的协议，可以存储大文件。具体来说，我们可以使用以下步骤将上传的图片文件保存到 MongoDB 数据库中：

1. 在 Node.js 中引入 GridFS 和 mongodb 模块，并连接 MongoDB 数据库：

```js
const { MongoClient } = require("mongodb");
const { GridFSBucket } = require("mongodb");
const fs = require("fs");
const { Readable } = require("stream");

const uri = "mongodb://localhost:27017";
const dbName = "myDB";

MongoClient.connect(uri, function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  const db = client.db(dbName);
  const bucket = new GridFSBucket(db);
  // 进行文件上传操作
});
```

2. 通过 fs 模块读取上传的文件，并将其转换为可读流 Readable：

```js
const readableStream = new Readable();
readableStream.push(fs.readFileSync(filePath));
readableStream.push(null);
```

3. 调用 GridFS 的 openUploadStream 方法创建可写流，并将可读流中的数据写入到可写流中：

```js
const writeStream = bucket.openUploadStream(filename);
readableStream.pipe(writeStream);
```

4. 在可写流的 finish 事件中关闭可写流，并在回调函数中存储上传的文件信息到 MongoDB 的集合中：

```js
writeStream.on("finish", function () {
  const collection = db.collection("files");
  const { _id } = writeStream;
  const { filename, metadata } = file;
  collection.insertOne({ _id, filename, metadata }, function (err, result) {
    if (err) {
      console.log(err);
      process.exit(1);
    }
    console.log("文件已保存到数据库");
    client.close();
  });
});
```

完整的上传并保存到 MongoDB 的示例代码如下：

```js
const { MongoClient } = require("mongodb");
const { GridFSBucket } = require("mongodb");
const fs = require("fs");
const { Readable } = require("stream");

const uri = "mongodb://localhost:27017";
const dbName = "myDB";

MongoClient.connect(uri, function (err, client) {
  if (err) {
    console.log(err);
    process.exit(1);
  }
  const db = client.db(dbName);
  const bucket = new GridFSBucket(db);

  const filePath = "/path/to/uploaded/file.jpg";
  const filename = "file.jpg";
  const metadata = { description: "图片描述" };

  const readableStream = new Readable();
  readableStream.push(fs.readFileSync(filePath));
  readableStream.push(null);

  const writeStream = bucket.openUploadStream(filename);
  readableStream.pipe(writeStream);

  writeStream.on("finish", function () {
    const collection = db.collection("files");
    const { _id } = writeStream;
    const { filename, metadata } = file;
    collection.insertOne({ _id, filename, metadata }, function (err, result) {
      if (err) {
        console.log(err);
        process.exit(1);
      }
      console.log("文件已保存到数据库");
      client.close();
    });
  });
});
```

在这个示例中，我们将上传的文件保存到 MongoDB 的集合中，并存储了文件的\_id、文件名和文件的元数据，这样就可以方便地查询、更新或删除上传的文件了。需要注意的是，GridFS 将大文件拆分成多个小文件存储在 MongoDB 数据库中，因此上传的文件的大小应该控制在合理范围内，以免占用过多的数据库空间。

另外，为了保证 MongoDB 数据库的安全性和稳定性，还需要对上传的文件进行一些验证和过滤，例如检查文件格式、大小、命名规则等，以及对上传的文件进行压缩、加密等处理。这些操作需要根据实际需求进行适当调整。
