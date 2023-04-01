import{_ as t,W as p,X as l,Y as i,Z as n,$ as s,a0 as o,a1 as a,C as c}from"./framework-a4c02b8f.js";const u={},d=n("h2",{id:"pm2-部署-node-项目到服务器",tabindex:"-1"},[n("a",{class:"header-anchor",href:"#pm2-部署-node-项目到服务器","aria-hidden":"true"},"#"),s(" PM2 部署 Node 项目到服务器")],-1),r=n("p",null,"使用 pm2 部署 node 项目需要服务器和本地电脑都可以使用 ssh 连接到 GitHub 或者是 gitee。并且服务器也要有 Node 环境和 PM2。",-1),k=a(`<h3 id="服务器设置" tabindex="-1"><a class="header-anchor" href="#服务器设置" aria-hidden="true">#</a> 服务器设置</h3><ol><li>服务器安装 pm2</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code><span class="token function">npm</span> <span class="token function">install</span> pm2 <span class="token parameter variable">-g</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><ol start="2"><li>设置 pm2 开机自启</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pm2 startup ubuntu <span class="token comment"># 可选 Ubuntu centos redhat gentoo systemd darwin amazon</span>
<span class="token comment"># 按照命令进行输入即可</span>
<span class="token comment"># 最后保存设置</span>
pm2 save
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>创建密钥对连接 gitee</li></ol><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>ssh-keygen <span class="token parameter variable">-t</span> rsa <span class="token parameter variable">-C</span> <span class="token string">&quot;your_email@example.com&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div></div></div><p>运行完上述命名后会在<code>~/.ssh</code>文件夹下创建一对文件<code>id_ras</code> <code>id_rsa.pub</code>，这一对文件就是密钥对其中<code>.pub</code>文件就是公钥，将公钥添加到 gitee 就可以使用私钥连接 gitee 了。</p><h3 id="本地设置" tabindex="-1"><a class="header-anchor" href="#本地设置" aria-hidden="true">#</a> 本地设置</h3><ol><li>在项目根目录下新建 deploy.yaml 的配置文件</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># deploy.yaml</span>
<span class="token key atrule">apps</span><span class="token punctuation">:</span>
  <span class="token punctuation">-</span> <span class="token key atrule">script</span><span class="token punctuation">:</span> ./start.js <span class="token comment"># 入口文件</span>
    <span class="token key atrule">name</span><span class="token punctuation">:</span> <span class="token string">&quot;app&quot;</span> <span class="token comment"># 程序名称</span>
    <span class="token key atrule">env</span><span class="token punctuation">:</span> <span class="token comment"># 环境变量</span>
      <span class="token key atrule">COMMON_VARIABLE</span><span class="token punctuation">:</span> <span class="token boolean important">true</span>
    <span class="token key atrule">env_production</span><span class="token punctuation">:</span>
      <span class="token key atrule">NODE_ENV</span><span class="token punctuation">:</span> production

<span class="token key atrule">deploy</span><span class="token punctuation">:</span> <span class="token comment"># 部署脚本</span>
  <span class="token key atrule">production</span><span class="token punctuation">:</span> <span class="token comment"># 生产环境</span>
    <span class="token key atrule">user</span><span class="token punctuation">:</span> xxx <span class="token comment"># 服务器的用户名</span>
    <span class="token key atrule">host</span><span class="token punctuation">:</span> 192.168.0.1 <span class="token comment"># 服务器的ip地址</span>
    <span class="token key atrule">port</span><span class="token punctuation">:</span> <span class="token number">22</span> <span class="token comment"># ssh端口</span>
    <span class="token key atrule">ref</span><span class="token punctuation">:</span> origin/master <span class="token comment"># 要拉取的git分支</span>
    <span class="token key atrule">ssh_options</span><span class="token punctuation">:</span> StrictHostKeyChecking=no <span class="token comment"># SSH 公钥检查</span>
    <span class="token key atrule">repo</span><span class="token punctuation">:</span> https<span class="token punctuation">:</span>//github.com/<span class="token important">**.git</span> <span class="token comment"># 远程仓库地址</span>
    <span class="token key atrule">path</span><span class="token punctuation">:</span> /home <span class="token comment"># 拉取到服务器某个目录下</span>
    <span class="token key atrule">pre-deploy</span><span class="token punctuation">:</span> git fetch <span class="token punctuation">-</span><span class="token punctuation">-</span>all <span class="token comment"># 部署前执行</span>
    <span class="token key atrule">post-deploy</span><span class="token punctuation">:</span> npm install <span class="token important">&amp;&amp;</span>  pm2 reload deploy.yaml <span class="token punctuation">-</span><span class="token punctuation">-</span>env production <span class="token comment"># 部署后执行</span>
    <span class="token key atrule">env</span><span class="token punctuation">:</span>
      <span class="token key atrule">NODE_ENV</span><span class="token punctuation">:</span> production
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>使用 pm2 部署项目 每次部署前先将本地的代码提交到远程仓库</li></ol><ul><li>首次部署</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pm2 deploy deploy.yaml production setup

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><ul><li>再次部署</li></ul><div class="language-bash line-numbers-mode" data-ext="sh"><pre class="language-bash"><code>pm2 deploy deploy.yaml production update

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="github-actions-部署到服务器" tabindex="-1"><a class="header-anchor" href="#github-actions-部署到服务器" aria-hidden="true">#</a> GitHub-Actions 部署到服务器</h2><ol><li>在项目的根目录创建.github 文件夹在此文件夹下在创建 workflows 文件夹</li><li>在 workflows 文件夹下添加 node.js.yml 文件</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> Node.js CI

<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>master<span class="token punctuation">]</span>
  <span class="token key atrule">pull_request</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>master<span class="token punctuation">]</span>

<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">build</span><span class="token punctuation">:</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest

    <span class="token key atrule">strategy</span><span class="token punctuation">:</span>
      <span class="token key atrule">matrix</span><span class="token punctuation">:</span>
        <span class="token key atrule">node-version</span><span class="token punctuation">:</span> <span class="token punctuation">[</span>12.x<span class="token punctuation">]</span>

    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Use Node.js $<span class="token punctuation">{</span><span class="token punctuation">{</span> matrix.node<span class="token punctuation">-</span>version <span class="token punctuation">}</span><span class="token punctuation">}</span>
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/setup<span class="token punctuation">-</span>node@v1
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">node-version</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> matrix.node<span class="token punctuation">-</span>version <span class="token punctuation">}</span><span class="token punctuation">}</span>
      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> npm install
      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> npm run build <span class="token punctuation">-</span><span class="token punctuation">-</span>if<span class="token punctuation">-</span>present
      <span class="token punctuation">-</span> <span class="token key atrule">run</span><span class="token punctuation">:</span> npm test
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> ssh deploy
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> easingthemes/ssh<span class="token punctuation">-</span>deploy@v2.1.4
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token comment"># Private Key</span>
          <span class="token key atrule">SSH_PRIVATE_KEY</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.ASUS <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token comment"># Remote host</span>
          <span class="token key atrule">REMOTE_HOST</span><span class="token punctuation">:</span> <span class="token string">&quot;188.131.188.209&quot;</span>
          <span class="token comment"># Remote user</span>
          <span class="token key atrule">REMOTE_USER</span><span class="token punctuation">:</span> root
          <span class="token comment"># Remote port</span>
          <span class="token comment"># REMOTE_PORT: # optional, default is 22</span>
          <span class="token key atrule">ARGS</span><span class="token punctuation">:</span> <span class="token string">&quot;-rltgoDzvO --delete&quot;</span>
          <span class="token comment"># Source directory</span>
          <span class="token key atrule">SOURCE</span><span class="token punctuation">:</span> <span class="token string">&quot;dist/&quot;</span>
          <span class="token comment"># Target directory</span>
          <span class="token key atrule">TARGET</span><span class="token punctuation">:</span> <span class="token string">&quot;/home/ubuntu/docker_nginx/www/college/&quot;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>将登录服务器的私钥上传到 GitHub 项目的 Settings -&gt; Secrets 下</li><li>以后每次修改 master 分支都会进行自动部署</li></ol><h2 id="github-actions-部署-github-page" tabindex="-1"><a class="header-anchor" href="#github-actions-部署-github-page" aria-hidden="true">#</a> GitHub-Actions 部署 GitHub-page</h2>`,21),v={href:"http://username.github.io",target:"_blank",rel:"noopener noreferrer"},m=n("li",null,"获取 GitHub 的 ACCESS_TOKEN 在用户的设置界面下的 Settings -> Devloper Settings -> Personal access tokens -> Generate new token 将生成的 token 的内容复制到项目的 Secrets 下（创建的 token 命名为 ACCESS_TOKEN，Secrets 下的也命名为 ACCESS_TOKEN）",-1),b=n("li",null,"在项目的根目录下创建.github 文件夹并在此文件夹下创建 workflows 文件夹，在此文件夹下创建 main.yml 文件",-1),y=a(`<div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy GitHub Pages

<span class="token comment"># 触发条件：在 push 到 master 分支后</span>
<span class="token key atrule">on</span><span class="token punctuation">:</span>
  <span class="token key atrule">push</span><span class="token punctuation">:</span>
    <span class="token key atrule">branches</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> master

<span class="token comment"># 任务</span>
<span class="token key atrule">jobs</span><span class="token punctuation">:</span>
  <span class="token key atrule">build-and-deploy</span><span class="token punctuation">:</span>
    <span class="token comment"># 服务器环境：最新版 Ubuntu</span>
    <span class="token key atrule">runs-on</span><span class="token punctuation">:</span> ubuntu<span class="token punctuation">-</span>latest
    <span class="token key atrule">steps</span><span class="token punctuation">:</span>
      <span class="token comment"># 拉取代码</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Checkout
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> actions/checkout@v2
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">persist-credentials</span><span class="token punctuation">:</span> <span class="token boolean important">false</span>

      <span class="token comment"># 生成静态文件</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Build
        <span class="token key atrule">run</span><span class="token punctuation">:</span> npm install <span class="token important">&amp;&amp;</span> npm run docs<span class="token punctuation">:</span>build

      <span class="token comment"># 部署到 GitHub Pages</span>
      <span class="token punctuation">-</span> <span class="token key atrule">name</span><span class="token punctuation">:</span> Deploy
        <span class="token key atrule">uses</span><span class="token punctuation">:</span> JamesIves/github<span class="token punctuation">-</span>pages<span class="token punctuation">-</span>deploy<span class="token punctuation">-</span>action@releases/v3
        <span class="token key atrule">with</span><span class="token punctuation">:</span>
          <span class="token key atrule">ACCESS_TOKEN</span><span class="token punctuation">:</span> $<span class="token punctuation">{</span><span class="token punctuation">{</span> secrets.ACCESS_TOKEN <span class="token punctuation">}</span><span class="token punctuation">}</span>
          <span class="token key atrule">BRANCH</span><span class="token punctuation">:</span> gh<span class="token punctuation">-</span>pages
          <span class="token key atrule">FOLDER</span><span class="token punctuation">:</span> docs/.vuepress/dist
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><h2 id="使用-docker-部署简单的-node-项目" tabindex="-1"><a class="header-anchor" href="#使用-docker-部署简单的-node-项目" aria-hidden="true">#</a> 使用 docker 部署简单的 node 项目</h2><ol><li>创建一个简单的 node 项目(koa+mongodb+nginx)，创建一个文件夹，在此文件夹下创建三个文件夹 mongo、nginx、node。在根目录下创建 docker-compose.yml 文件。</li></ol><div class="language-yaml line-numbers-mode" data-ext="yml"><pre class="language-yaml"><code><span class="token comment"># docker-compose.yml</span>
<span class="token key atrule">version</span><span class="token punctuation">:</span> <span class="token string">&quot;3&quot;</span>

<span class="token comment"># 默认就是这个模式</span>
<span class="token comment"># 共有四种模式</span>
<span class="token comment"># Host container none bridge</span>
<span class="token key atrule">networks</span><span class="token punctuation">:</span>
  <span class="token key atrule">my-network</span><span class="token punctuation">:</span>
    <span class="token key atrule">driver</span><span class="token punctuation">:</span> bridge

<span class="token key atrule">volumes</span><span class="token punctuation">:</span>
  <span class="token key atrule">node_modules</span><span class="token punctuation">:</span>
  <span class="token key atrule">mongo_data</span><span class="token punctuation">:</span>

<span class="token key atrule">services</span><span class="token punctuation">:</span>
  <span class="token comment">### nginx #################</span>
  <span class="token key atrule">nginx</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span>
      <span class="token key atrule">context</span><span class="token punctuation">:</span> ./nginx
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> <span class="token datetime number">80:80</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./nginx/conf.d<span class="token punctuation">:</span>/etc/nginx/conf.d
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> nodejs
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> my<span class="token punctuation">-</span>network

  <span class="token comment">### node ##############</span>
  <span class="token key atrule">nodejs</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span>
      <span class="token key atrule">context</span><span class="token punctuation">:</span> ./node
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 127.0.0.1<span class="token punctuation">:</span>3000<span class="token punctuation">:</span><span class="token number">3000</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> ./node<span class="token punctuation">:</span>/app/
      <span class="token punctuation">-</span> node_modules<span class="token punctuation">:</span>/app/node_modules
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">depends_on</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> mongo
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> my<span class="token punctuation">-</span>network

  <span class="token comment">### mongoDB ########################</span>
  <span class="token key atrule">mongo</span><span class="token punctuation">:</span>
    <span class="token key atrule">build</span><span class="token punctuation">:</span>
      <span class="token key atrule">context</span><span class="token punctuation">:</span> ./mongo
    <span class="token key atrule">ports</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> 127.0.0.1<span class="token punctuation">:</span>27017<span class="token punctuation">:</span><span class="token number">27017</span>
    <span class="token key atrule">volumes</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> mongo_data<span class="token punctuation">:</span>/data/db
    <span class="token key atrule">restart</span><span class="token punctuation">:</span> always
    <span class="token key atrule">networks</span><span class="token punctuation">:</span>
      <span class="token punctuation">-</span> my<span class="token punctuation">-</span>network
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="2"><li>创建 node 项目 进入 node 文件夹，<code>npm init -y</code> <code>npm install koa mongoose</code> 创建 app.js</li></ol><div class="language-javascript line-numbers-mode" data-ext="js"><pre class="language-javascript"><code><span class="token keyword">const</span> Koa <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;koa&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token keyword">const</span> mongoose <span class="token operator">=</span> <span class="token function">require</span><span class="token punctuation">(</span><span class="token string">&quot;mongoose&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">const</span> app <span class="token operator">=</span> <span class="token keyword">new</span> <span class="token class-name">Koa</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

<span class="token keyword">function</span> <span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span> <span class="token punctuation">{</span>
  <span class="token keyword">return</span> <span class="token keyword">new</span> <span class="token class-name">Promise</span><span class="token punctuation">(</span><span class="token punctuation">(</span><span class="token parameter">resovle<span class="token punctuation">,</span> reject</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
    mongoose<span class="token punctuation">.</span><span class="token function">connect</span><span class="token punctuation">(</span>
      <span class="token string">&quot;mongodb://mongo:27017/test&quot;</span><span class="token punctuation">,</span>
      <span class="token punctuation">{</span> <span class="token literal-property property">useNewUrlParser</span><span class="token operator">:</span> <span class="token boolean">true</span> <span class="token punctuation">}</span><span class="token punctuation">,</span>
      <span class="token punctuation">(</span><span class="token parameter">err</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
        <span class="token keyword">if</span> <span class="token punctuation">(</span>err<span class="token punctuation">)</span> <span class="token punctuation">{</span>
          <span class="token function">reject</span><span class="token punctuation">(</span><span class="token string">&quot;Failed to connect to database&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          console<span class="token punctuation">.</span><span class="token function">error</span><span class="token punctuation">(</span><span class="token string">&quot;Failed to connect to database&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span> <span class="token keyword">else</span> <span class="token punctuation">{</span>
          <span class="token function">resovle</span><span class="token punctuation">(</span><span class="token string">&quot;Connecting database successfully&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
          console<span class="token punctuation">.</span><span class="token function">log</span><span class="token punctuation">(</span><span class="token string">&quot;Connecting database successfully&quot;</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
        <span class="token punctuation">}</span>
      <span class="token punctuation">}</span>
    <span class="token punctuation">)</span><span class="token punctuation">;</span>
  <span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span>

app<span class="token punctuation">.</span><span class="token function">use</span><span class="token punctuation">(</span><span class="token keyword">async</span> <span class="token punctuation">(</span><span class="token parameter">ctx</span><span class="token punctuation">)</span> <span class="token operator">=&gt;</span> <span class="token punctuation">{</span>
  ctx<span class="token punctuation">.</span>body <span class="token operator">=</span> <span class="token keyword">await</span> <span class="token function">connect</span><span class="token punctuation">(</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
<span class="token punctuation">}</span><span class="token punctuation">)</span><span class="token punctuation">;</span>

app<span class="token punctuation">.</span><span class="token function">listen</span><span class="token punctuation">(</span><span class="token number">3000</span><span class="token punctuation">)</span><span class="token punctuation">;</span>
</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>编写 Dockerfile 文件</p><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>FROM node:10.16.3-alpine

## 拷贝项目文件进行构建
WORKDIR /app/
COPY ./package.json ./
RUN npm install --registry=https://registry.npm.taobao.org

COPY ./* /app/
CMD [&quot;npm&quot;,&quot;run&quot;,&quot;dev&quot;]


</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="3"><li>创建 mongo 的 dockerfile 文件</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>FROM mongo:latest

#COPY mongo.conf /usr/local/etc/mongo/mongo.conf

VOLUME /Users/mac/data/db /Users/mac/data/configdb

CMD [&quot;mongod&quot;]

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="4"><li>创建 nginx 的配置文件</li></ol><div class="language-text line-numbers-mode" data-ext="text"><pre class="language-text"><code>FROM nginx:alpine

EXPOSE 80

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><p>在 nginx 文件夹下创建 conf.d 的配置文件夹用来保存配置文件。</p><div class="language-conf line-numbers-mode" data-ext="conf"><pre class="language-conf"><code>server {
    listen  80;
    server_name     localhost;                           # 公网地址
    access_log      /var/log/nginx/nginx_access.log;
    error_log       /var/log/nginx/nginx_error.log;

    location / {
        proxy_pass         http://nodejs:3000;
        proxy_set_header Host $host;
        proxy_set_header X-Real-IP $remote_addr;
        proxy_set_header X-Forwarded-For $proxy_add_x_forwarded_for;
    }

    location /static {
        alias /opt/static;
        proxy_set_header Host $host;
        # proxy_cache mycache;
        # expires 30d;
    }
}

</code></pre><div class="line-numbers" aria-hidden="true"><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div><div class="line-number"></div></div></div><ol start="5"><li>启动 docker-compose <code>docker-compose up</code></li></ol>`,15);function g(h,_){const e=c("ExternalLinkIcon");return p(),l("div",null,[d,r,i(" more "),k,n("ol",null,[n("li",null,[s("在 GitHub 创建 "),n("a",v,[s("username.github.io"),o(e)]),s(" 的库")]),m,b]),y])}const f=t(u,[["render",g],["__file","自动化部署项目.html.vue"]]);export{f as default};
