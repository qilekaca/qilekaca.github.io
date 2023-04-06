const n=JSON.parse('{"key":"v-1aad042e","path":"/posts/texts/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95.html","title":"十大排序算法","lang":"zh-CN","frontmatter":{"title":"十大排序算法","date":"2020-04-01T00:00:00.000Z","category":["算法"],"tag":["排序算法"],"description":"冒泡排序 // 从前往后两两比较大的挪到后面去 // 第一次循环之后找到最大的元素放到最后一位 function bubbleSort(arr) { var len = arr.length; for (let i = 0; i &lt; arr.length - 1; i++) { for (let j = 0; j &lt; arr.length - 1 - i; j++) { if (arr[j] &gt; arr[j + 1]) { [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; } } } return arr; } console.log(bubbleSort(arr));","head":[["meta",{"property":"og:url","content":"https://qilekaca.github.io/posts/texts/%E6%8E%92%E5%BA%8F%E7%AE%97%E6%B3%95.html"}],["meta",{"property":"og:site_name","content":"o_o"}],["meta",{"property":"og:title","content":"十大排序算法"}],["meta",{"property":"og:description","content":"冒泡排序 // 从前往后两两比较大的挪到后面去 // 第一次循环之后找到最大的元素放到最后一位 function bubbleSort(arr) { var len = arr.length; for (let i = 0; i &lt; arr.length - 1; i++) { for (let j = 0; j &lt; arr.length - 1 - i; j++) { if (arr[j] &gt; arr[j + 1]) { [arr[j], arr[j + 1]] = [arr[j + 1], arr[j]]; } } } return arr; } console.log(bubbleSort(arr));"}],["meta",{"property":"og:type","content":"article"}],["meta",{"property":"og:locale","content":"zh-CN"}],["meta",{"property":"og:updated_time","content":"2023-04-06T06:40:17.000Z"}],["meta",{"property":"article:author","content":"ZhangWei"}],["meta",{"property":"article:tag","content":"排序算法"}],["meta",{"property":"article:published_time","content":"2020-04-01T00:00:00.000Z"}],["meta",{"property":"article:modified_time","content":"2023-04-06T06:40:17.000Z"}],["script",{"type":"application/ld+json"},"{\\"@context\\":\\"https://schema.org\\",\\"@type\\":\\"Article\\",\\"headline\\":\\"十大排序算法\\",\\"image\\":[\\"\\"],\\"datePublished\\":\\"2020-04-01T00:00:00.000Z\\",\\"dateModified\\":\\"2023-04-06T06:40:17.000Z\\",\\"author\\":[{\\"@type\\":\\"Person\\",\\"name\\":\\"ZhangWei\\",\\"url\\":\\"https://github.com/qilekaca\\"}]}"]]},"headers":[{"level":2,"title":"冒泡排序","slug":"冒泡排序","link":"#冒泡排序","children":[]},{"level":2,"title":"选择排序","slug":"选择排序","link":"#选择排序","children":[]},{"level":2,"title":"插入排序","slug":"插入排序","link":"#插入排序","children":[]},{"level":2,"title":"希尔排序","slug":"希尔排序","link":"#希尔排序","children":[]},{"level":2,"title":"归并排序","slug":"归并排序","link":"#归并排序","children":[]},{"level":2,"title":"快速排序","slug":"快速排序","link":"#快速排序","children":[]},{"level":2,"title":"堆排序","slug":"堆排序","link":"#堆排序","children":[]},{"level":2,"title":"计数排序","slug":"计数排序","link":"#计数排序","children":[]},{"level":2,"title":"桶排序","slug":"桶排序","link":"#桶排序","children":[]},{"level":2,"title":"基数排序","slug":"基数排序","link":"#基数排序","children":[]}],"git":{"createdTime":1680763217000,"updatedTime":1680763217000,"contributors":[{"name":"张伟","email":"37145794+qilekaca@users.noreply.github.com","commits":1}]},"readingTime":{"minutes":2.86,"words":857},"filePathRelative":"posts/texts/排序算法.md","localizedDate":"2020年4月1日","excerpt":"<h2> 冒泡排序</h2>\\n<div class=\\"language-javascript line-numbers-mode\\" data-ext=\\"js\\"><pre class=\\"language-javascript\\"><code><span class=\\"token comment\\">// 从前往后两两比较大的挪到后面去</span>\\n<span class=\\"token comment\\">// 第一次循环之后找到最大的元素放到最后一位</span>\\n<span class=\\"token keyword\\">function</span> <span class=\\"token function\\">bubbleSort</span><span class=\\"token punctuation\\">(</span><span class=\\"token parameter\\">arr</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n  <span class=\\"token keyword\\">var</span> len <span class=\\"token operator\\">=</span> arr<span class=\\"token punctuation\\">.</span>length<span class=\\"token punctuation\\">;</span>\\n  <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">let</span> i <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> i <span class=\\"token operator\\">&lt;</span> arr<span class=\\"token punctuation\\">.</span>length <span class=\\"token operator\\">-</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">;</span> i<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n    <span class=\\"token keyword\\">for</span> <span class=\\"token punctuation\\">(</span><span class=\\"token keyword\\">let</span> j <span class=\\"token operator\\">=</span> <span class=\\"token number\\">0</span><span class=\\"token punctuation\\">;</span> j <span class=\\"token operator\\">&lt;</span> arr<span class=\\"token punctuation\\">.</span>length <span class=\\"token operator\\">-</span> <span class=\\"token number\\">1</span> <span class=\\"token operator\\">-</span> i<span class=\\"token punctuation\\">;</span> j<span class=\\"token operator\\">++</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n      <span class=\\"token keyword\\">if</span> <span class=\\"token punctuation\\">(</span>arr<span class=\\"token punctuation\\">[</span>j<span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">&gt;</span> arr<span class=\\"token punctuation\\">[</span>j <span class=\\"token operator\\">+</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">)</span> <span class=\\"token punctuation\\">{</span>\\n        <span class=\\"token punctuation\\">[</span>arr<span class=\\"token punctuation\\">[</span>j<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">,</span> arr<span class=\\"token punctuation\\">[</span>j <span class=\\"token operator\\">+</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">]</span> <span class=\\"token operator\\">=</span> <span class=\\"token punctuation\\">[</span>arr<span class=\\"token punctuation\\">[</span>j <span class=\\"token operator\\">+</span> <span class=\\"token number\\">1</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">,</span> arr<span class=\\"token punctuation\\">[</span>j<span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">]</span><span class=\\"token punctuation\\">;</span>\\n      <span class=\\"token punctuation\\">}</span>\\n    <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token punctuation\\">}</span>\\n  <span class=\\"token keyword\\">return</span> arr<span class=\\"token punctuation\\">;</span>\\n<span class=\\"token punctuation\\">}</span>\\nconsole<span class=\\"token punctuation\\">.</span><span class=\\"token function\\">log</span><span class=\\"token punctuation\\">(</span><span class=\\"token function\\">bubbleSort</span><span class=\\"token punctuation\\">(</span>arr<span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">)</span><span class=\\"token punctuation\\">;</span>\\n</code></pre><div class=\\"line-numbers\\" aria-hidden=\\"true\\"><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div><div class=\\"line-number\\"></div></div></div>","autoDesc":true}');export{n as data};
