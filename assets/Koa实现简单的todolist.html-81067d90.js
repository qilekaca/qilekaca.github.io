import{_ as o,W as p,X as c,Y as i,Z as s,$ as n,a0 as e,a1 as a,C as l}from"./framework-a4c02b8f.js";const u={},r=s("h2",{id:"简介",tabindex:"-1"},[s("a",{class:"header-anchor",href:"#简介","aria-hidden":"true"},"#"),n(" 简介")],-1),d=s("p",null,"已经使用 Vue 和云开发完成了好多内容，但是对于真实的前后端并没有实际的了解，所以希望通过一个简单的前后端分离的项目来理解。毫无疑问对于前端开发人员门槛最低的后端肯定是 Node。所以此项目前端使用 Vue 后端使用 Koa 来完成。要实现的功能也很简单，用户登录之后，可以进行 todo 的增删查改。后端数据库使用 MySQL。项目的结构基本就是在 Vue-cli 初始化的项目的根目录下创建一个 server 文件夹和 app.js 的项目入口文件。",-1),k=a(`<div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// server文件夹的内容</span>
config<span class="token punctuation">;</span> <span class="token comment">// 存放数据库的配置连接</span>
controller<span class="token punctuation">;</span> <span class="token comment">// controller控制器</span>
models<span class="token punctuation">;</span> <span class="token comment">// model模型</span>
routes<span class="token punctuation">;</span> <span class="token comment">// route路由</span>
schema<span class="token punctuation">;</span> <span class="token comment">// 数据库表结构</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><blockquote><p>此处的 server 文件夹的内容就可以很好的展示出 MVC 的 model 模型层和 controller 控制层</p></blockquote>`,2),v={href:"https://element.eleme.cn/#/zh-CN",target:"_blank",rel:"noopener noreferrer"},m=a(`<h2 id="开发步骤" tabindex="-1"><a class="header-anchor" href="#开发步骤" aria-hidden="true">#</a> 开发步骤</h2><h3 id="后端开发" tabindex="-1"><a class="header-anchor" href="#后端开发" aria-hidden="true">#</a> 后端开发</h3><p>先确定后端需要为前端提供的数据接口。后端需要提供的功能用户的登陆、todo 的增加、删除、查询、修改。以上功能需要在 controller 中定义。controller 通过 model 操作数据库。model 主要用来存放操作数据库相关的内容。routes 存放路由相关的内容(沟通前后端的关键)，config 存放数据库的配置文件。schema 数据库的库表结构。<strong>此处插入图片</strong> routes 路由设计</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// server/routes/api.js</span>
<span class="token keyword">import</span> api <span class="token keyword">from</span> <span class="token string">&quot;../controllers/todolist.js&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> koaRouter <span class="token keyword">from</span> <span class="token string">&quot;koa-router&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token function">koaRouter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

router<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;/todolist/:id&quot;</span><span class="token punctuation">,</span> api<span class="token punctuation">.</span>getTodolist<span class="token punctuation">)</span><span class="token punctuation">;</span>
router<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">&quot;/todolist&quot;</span><span class="token punctuation">,</span> api<span class="token punctuation">.</span>createTodolist<span class="token punctuation">)</span><span class="token punctuation">;</span>
router<span class="token punctuation">.</span><span class="token function">delete</span><span class="token punctuation">(</span><span class="token string">&quot;/todolist/:userId/:id&quot;</span><span class="token punctuation">,</span> api<span class="token punctuation">.</span>removeTodolist<span class="token punctuation">)</span><span class="token punctuation">;</span>
router<span class="token punctuation">.</span><span class="token function">put</span><span class="token punctuation">(</span><span class="token string">&quot;/todolist/:userId/:id/:status&quot;</span><span class="token punctuation">,</span> api<span class="token punctuation">.</span>updateTodolist<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> router<span class="token punctuation">;</span>

<span class="token comment">// server/routes/auth.js</span>
<span class="token keyword">import</span> auth <span class="token keyword">from</span> <span class="token string">&quot;../controllers/user.js&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">import</span> koaRouter <span class="token keyword">from</span> <span class="token string">&quot;koa-router&quot;</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> router <span class="token operator">=</span> <span class="token function">koaRouter</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

router<span class="token punctuation">.</span><span class="token function">get</span><span class="token punctuation">(</span><span class="token string">&quot;/user/:id&quot;</span><span class="token punctuation">,</span> auth<span class="token punctuation">.</span>getUserInfo<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 定义url的参数是id</span>
router<span class="token punctuation">.</span><span class="token function">post</span><span class="token punctuation">(</span><span class="token string">&quot;/user&quot;</span><span class="token punctuation">,</span> auth<span class="token punctuation">.</span>postUserAuth<span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">export</span> <span class="token keyword">default</span> router<span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="前端开发" tabindex="-1"><a class="header-anchor" href="#前端开发" aria-hidden="true">#</a> 前端开发</h3><p>前端开发与平时正常的 vue 开发无异，本项目使用 axios 进行数据请求，但是前端运行在 8080 端口，后端运行在 9000 端口，由于浏览器的同源策略会产生跨域问题。开发阶段使用 vue.config.js 配置 vue 进行代理。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// 前端调用 this.$http.get(&#39;/api/todolist/&#39; + this.id)</span>
<span class="token comment">// 开发时可以使用 vue.config.js 做代理</span>
<span class="token comment">// vue.config.js</span>
<span class="token comment">// 配置完成后我们能够将外部的请求通过webpack转发给本地，也就能够将跨域请求变成同域请求了</span>
module<span class="token punctuation">.</span>exports <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">productionSourceMap</span><span class="token operator">:</span> <span class="token boolean">false</span><span class="token punctuation">,</span>
  <span class="token literal-property property">devServer</span><span class="token operator">:</span> <span class="token punctuation">{</span>
    <span class="token literal-property property">proxy</span><span class="token operator">:</span> <span class="token punctuation">{</span>
      <span class="token string-property property">&quot;/auth&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">&quot;http://localhost:9999&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">changeOrigin</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token string-property property">&quot;/api&quot;</span><span class="token operator">:</span> <span class="token punctuation">{</span>
        <span class="token literal-property property">target</span><span class="token operator">:</span> <span class="token string">&quot;http://localhost:9999&quot;</span><span class="token punctuation">,</span>
        <span class="token literal-property property">changeOrigin</span><span class="token operator">:</span> <span class="token boolean">true</span><span class="token punctuation">,</span>
      <span class="token punctuation">}</span><span class="token punctuation">,</span>
    <span class="token punctuation">}</span><span class="token punctuation">,</span>
  <span class="token punctuation">}</span><span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="登陆功能" tabindex="-1"><a class="header-anchor" href="#登陆功能" aria-hidden="true">#</a> 登陆功能</h3>`,8),b={href:"https://jwt.io/",target:"_blank",rel:"noopener noreferrer"},h=a(`<blockquote><p>JSON-WEB-TOKEN 分三部分，头部信息+主体信息+密钥信息，其中主体传递的信息（是我们存放我们需要的信息的部分）是用 BASE64 编码的，所以很容易被解码，一定不能存放明文密码这种关键信息！替代地可以存放一些不是特别关键的信息，比如用户名这样能够做区分的信息。</p></blockquote><h4 id="jwt-登陆的过程" tabindex="-1"><a class="header-anchor" href="#jwt-登陆的过程" aria-hidden="true">#</a> jwt 登陆的过程</h4><ol><li>用户输入用户名和密码，通过 https 加密发送请求给后端</li><li>后端验证用户信息是否正确，正确返回 TOKEN 给客户端，不正确返回验证错误的信息</li><li>登陆成功用户将 TOKEN 保存下来（localStorage、sessionStorage），之后在请求资源的时候，在请求头（Header）中带上 TOKEN 进行请求</li><li>后端接收请求信息，验证 TOKEN 是否正确，正确则返回资源，否则返回错误信息。</li></ol><blockquote><p>密码要使用 bcrypt，加密保存到数据库中。</p></blockquote><p>签发 token</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> userToken <span class="token operator">=</span> <span class="token punctuation">{</span>
  <span class="token literal-property property">name</span><span class="token operator">:</span> userInfo<span class="token punctuation">.</span>user_name<span class="token punctuation">,</span>
  <span class="token literal-property property">id</span><span class="token operator">:</span> userInfo<span class="token punctuation">.</span>id<span class="token punctuation">,</span>
<span class="token punctuation">}</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> secret <span class="token operator">=</span> <span class="token string">&quot;vue-koa-demo&quot;</span><span class="token punctuation">;</span> <span class="token comment">// 指定密钥，这是之后用来判断token合法性的标志</span>
<span class="token keyword">const</span> token <span class="token operator">=</span> jwt<span class="token punctuation">.</span><span class="token function">sign</span><span class="token punctuation">(</span>userToken<span class="token punctuation">,</span> secret<span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 签发token</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>完成后所有/api 的请求都需要进行 jwt 的验证，secret 密钥必须跟我们当初签发的 secret 一致</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code>koa<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token string">&quot;/api&quot;</span><span class="token punctuation">,</span> <span class="token function">jwt</span><span class="token punctuation">(</span><span class="token punctuation">{</span> <span class="token literal-property property">secret</span><span class="token operator">:</span> <span class="token string">&quot;vue-koa-demo&quot;</span> <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">,</span> api<span class="token punctuation">.</span><span class="token function">routes</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><h4 id="跳转拦截" tabindex="-1"><a class="header-anchor" href="#跳转拦截" aria-hidden="true">#</a> 跳转拦截</h4><p>当用户直接在地址栏输入<code>/todolist</code>还是会跳转到 todolist 界面，所以还需要跳转拦截，借助 token 就可以实现。当用户没有 toekn 的时候不进行跳转，只有当用户有 token 的时候才进行正确的跳转。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// /src/router/index.js</span>
router<span class="token punctuation">.</span><span class="token function">beforeEach</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">to<span class="token punctuation">,</span> from<span class="token punctuation">,</span> next</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  <span class="token keyword">const</span> token <span class="token operator">=</span> sessionStorage<span class="token punctuation">.</span><span class="token function">getItem</span><span class="token punctuation">(</span><span class="token string">&quot;demo-token&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token keyword">if</span> <span class="token punctuation">(</span>to<span class="token punctuation">.</span>path <span class="token operator">==</span> <span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
    <span class="token comment">// 如果是跳转到登录页的</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>token <span class="token operator">!=</span> <span class="token string">&quot;null&quot;</span> <span class="token operator">&amp;&amp;</span> token <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">next</span><span class="token punctuation">(</span><span class="token string">&quot;/todolist&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 如果有token就转向todolist不返回登录页</span>
    <span class="token punctuation">}</span>
    <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 否则跳转回登录页</span>
  <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
    <span class="token keyword">if</span> <span class="token punctuation">(</span>token <span class="token operator">!=</span> <span class="token string">&quot;null&quot;</span> <span class="token operator">&amp;&amp;</span> token <span class="token operator">!=</span> <span class="token keyword">null</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
      <span class="token function">next</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 如果有token就正常转向</span>
    <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
      <span class="token function">next</span><span class="token punctuation">(</span><span class="token string">&quot;/&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span> <span class="token comment">// 否则跳转回登录页</span>
    <span class="token punctuation">}</span>
  <span class="token punctuation">}</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="部署" tabindex="-1"><a class="header-anchor" href="#部署" aria-hidden="true">#</a> 部署</h2><p>开发发的时候由于使用 webpack 进行请求代理的转发，所以看起来像是同域请求，但是 koa 和 vue 并没有真正的结合起来。我们可以将 vue 的静态文件交给 koa 托管，所有访问前端的请求走 koa 端，包括静态资源文件的请求也走 koa 端，将 koa 作为一个静态资源的服务器。（开发模式是 webpack 开启了一个服务器托管了 Vue 的资源和请求，现在生产模式下改成 Koa 托管 Vue 的资源和请求）。加入 koa-static。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// main.js</span>
<span class="token keyword">const</span> path <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;path&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> serve <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;koa-static&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">serve</span><span class="token punctuation">(</span>path<span class="token punctuation">.</span><span class="token function">resolve</span><span class="token punctuation">(</span><span class="token string">&quot;dist&quot;</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// yarn build 之后生成 dist 文件夹</span>
<span class="token comment">// 重新运行后端 yarn dev</span>
<span class="token comment">// 之后打开 localhost:9000端口就可以直接访问网站了</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>到此基本完成了，但是当我们进入 todolist 页面之后刷新就会出现 404。这是因为我们使用了前端路由的 History 模式，刷新页面浏览器会去服务器访问这个页面的地址，但是服务器并没有配置这个地址的路由。可以借助 koa-history-api-fallback 这个中间键解决这个问题。</p><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token comment">// main.js</span>
<span class="token keyword">const</span> historyApiFallback <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;koa-history-api-fallback&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token comment">// 一定要加在静态文件serve之前，放在api规则之后</span>
app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token function">historyApiFallback</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h3 id="nginx" tabindex="-1"><a class="header-anchor" href="#nginx" aria-hidden="true">#</a> Nginx</h3><p>配置 Nginx 监听 80 端口，把访问我们指定域名的请求引导转发给 Koa 服务端。</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>// todolist.conf
upstream pm.server {
  server 127.0.0.1:8080
}
server {
  listen 80;
  server_name 188131.188.209;

  location / {
    proxy_pass http://pm.server;
    proxy_redirect off;
  }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>部署完成之后直接访问 <code>http://xxx.com/todo</code> 就可以访问项目了。</p>`,20);function g(f,q){const t=l("ExternalLinkIcon");return p(),c("div",null,[r,d,i(" more "),k,s("p",null,[n("前端 ui 主要使用"),s("a",v,[n("element-ui"),e(t)]),n("。后端需要用到的依赖 koa、koa-router、koa-jwt、koa2-cors、koa-static、mysql、sequelize。。。等。其中 sequelize 是用来操作数据库。开发后端的内容基本上类似于之前开发微信小程序的后台管理项目。koa 负责提供数据接口前端使用 ajax 发送请求。最后使用 docker 来部署项目。")]),m,s("p",null,[n("登陆使用"),s("a",b,[n("JSON-WEB-TOKEN"),e(t)]),n("实现。")]),h])}const x=o(u,[["render",g],["__file","Koa实现简单的todolist.html.vue"]]);export{x as default};
