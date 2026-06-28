// 全部模块数据：从 PDF《保持交流就没人爆炸 拆弹手册 zh-CN v1》誊清。
// body 为规则 HTML；widget 标记交互/特殊渲染模块。

export type Chapter = 'ch1' | 'ch2' | 'appendix';
export type Widget = 'morse' | 'password' | 'keypad' | 'maze' | 'complicated' | 'sequences' | null;

export interface Module {
  slug: string;
  name: string; // 中文名
  nameEn: string;
  chapter: Chapter;
  page: number;
  flavor?: string; // 手册风味引文
  body: string; // 规则 HTML（在 flavor 之后渲染）
  widget?: Widget; // 交互/特殊组件
}

// 颜色块小工具（生成 HTML 字符串内联使用）
const c = (cls: string, label: string) => `<span class="chip ${cls}">${label}</span>`;
const RED = c('red', '红');
const BLUE = c('blue', '蓝');
const YEL = c('yellow', '黄');
const WHITE = c('white', '白');
const BLACK = c('black', '黑');
const GREEN = c('green', '绿');

export const MODULES: Module[] = [
  // ---------------- 章节 1：普通模块 ----------------
  {
    slug: 'wires',
    name: '线路',
    nameEn: 'Wires',
    chapter: 'ch1',
    page: 5,
    flavor: '如果电流是机器的血液，线路就是它的动脉。',
    body: `
<p>一个线路模块中会有 <b>3~6</b> 根线。拆除这种模块要剪断<b>唯一一根</b>正确的线路。线路顺序为<b>从上到下</b>。</p>
<h3>3 根线</h3>
<ol>
  <li>如果没有${RED}线，剪断<b>第二根</b>线。</li>
  <li>否则，当最后一根线为${WHITE}线时，剪断<b>最后一根</b>线。</li>
  <li>否则，当有不止一根${BLUE}线时，剪断<b>最后一根${BLUE}线</b>。</li>
  <li>否则，剪断<b>最后一根</b>线。</li>
</ol>
<h3>4 根线</h3>
<ol>
  <li>如果有不止一根${RED}线，且序列号末位为<b>奇数</b>，剪断<b>最后一根${RED}线</b>。</li>
  <li>否则，当没有${RED}线且最后一根线是${YEL}线时，剪断<b>第一根</b>线。</li>
  <li>否则，当有且仅有一根${BLUE}线时，剪断<b>第一根</b>线。</li>
  <li>否则，当有不止一根${YEL}线时，剪断<b>最后一根</b>线。</li>
  <li>否则，剪断<b>第二根</b>线。</li>
</ol>
<h3>5 根线</h3>
<ol>
  <li>如果最后一根线是${BLACK}线，且序列号末位为<b>奇数</b>，剪断<b>第四根</b>线。</li>
  <li>否则，当有且仅有一根${RED}线、且${YEL}线不止一根时，剪断<b>第一根</b>线。</li>
  <li>否则，当没有${BLACK}线时，剪断<b>第二根</b>线。</li>
  <li>否则，剪断<b>第一根</b>线。</li>
</ol>
<h3>6 根线</h3>
<ol>
  <li>如果没有${YEL}线，且序列号末位为<b>奇数</b>，剪断<b>第三根</b>线。</li>
  <li>否则，当有且仅有一根${YEL}线、且${WHITE}线不止一根时，剪断<b>第四根</b>线。</li>
  <li>否则，当没有${RED}线时，剪断<b>最后一根</b>线。</li>
  <li>否则，剪断<b>第四根</b>线。</li>
</ol>`,
  },
  {
    slug: 'button',
    name: '按钮',
    nameEn: 'The Button',
    chapter: 'ch1',
    page: 6,
    flavor: '你可能看到写有"按下"字样的按钮就想直接照做了。但大多数这样想的人都炸了。',
    body: `
<p class="note">指示灯请查 <a href="/modules/indicators">附录 A</a>；电池请查 <a href="/modules/batteries">附录 B</a>。</p>
<p>按以下规则<b>从上到下</b>依次判断，命中即执行：</p>
<ol>
  <li>写有"中止"的${BLUE}色按钮 → <b>按住</b>，再看下方"松开按住的按钮"。</li>
  <li>炸弹上有<b>不止 1 个</b>电池，且按钮写着"引爆" → <b>按下并立即松开</b>。</li>
  <li>${WHITE}色按钮，且有 <b>CAR</b> 指示灯亮 → <b>按住</b>，再看"松开按住的按钮"。</li>
  <li>炸弹上有<b>不止 2 个</b>电池，且有 <b>FRK</b> 指示灯亮 → <b>按下并立即松开</b>。</li>
  <li>${YEL}色按钮 → <b>按住</b>，再看"松开按住的按钮"。</li>
  <li>写有"按住"的${RED}色按钮 → <b>按下并立即松开</b>。</li>
  <li>以上都不满足 → <b>按住</b>，再看"松开按住的按钮"。</li>
</ol>
<h3>松开按住的按钮</h3>
<p>按住后模块右侧会亮起彩色光条。根据颜色，在计时器<b>任意数位</b>显示对应数字时松开：</p>
<table>
  <thead><tr><th>光条颜色</th><th>任意数位显示</th></tr></thead>
  <tbody>
    <tr><td>${BLUE} 蓝色</td><td><b>4</b></td></tr>
    <tr><td>${WHITE} 白色</td><td><b>1</b></td></tr>
    <tr><td>${YEL} 黄色</td><td><b>5</b></td></tr>
    <tr><td>其他颜色</td><td><b>1</b></td></tr>
  </tbody>
</table>`,
  },
  {
    slug: 'keypad',
    name: '键盘',
    nameEn: 'Keypads',
    chapter: 'ch1',
    page: 7,
    flavor: '我不确定这些符号是什么，但我怀疑它们内有玄机。',
    body: `
<p>下面 6 列中，<b>只有一列</b>同时包含键盘上所示的四个符号。以这四个符号在该列中<b>从上到下</b>的位置顺序，依次按下。</p>`,
    widget: 'keypad',
  },
  {
    slug: 'simon',
    name: '四色方块',
    nameEn: 'Simon Says',
    chapter: 'ch1',
    page: 8,
    flavor: '这个廉价儿童玩具一样的模块需要你按照它亮起的颜色进行对应操作。',
    body: `
<ol>
  <li>四个彩色按钮中会有一个闪烁。</li>
  <li>对照下表，按下对应的正确颜色。</li>
  <li>序列会逐次加长：先重复第一个闪光，再第一+第二，依此类推，每轮都从头按。</li>
  <li>每正确按下后序列多一次闪烁，直到模块解除。</li>
</ol>
<p>对照表取决于<b>序列号是否含元音字母（A E I O U）</b>，以及当前<b>失误次数</b>。</p>
<h3>序列号<b>含</b>元音</h3>
<table>
  <thead><tr><th>闪光颜色 →</th><th>${RED}</th><th>${BLUE}</th><th>${GREEN}</th><th>${YEL}</th></tr></thead>
  <tbody>
    <tr><td>无失误</td><td>${BLUE}</td><td>${RED}</td><td>${YEL}</td><td>${GREEN}</td></tr>
    <tr><td>1 次失误</td><td>${YEL}</td><td>${GREEN}</td><td>${BLUE}</td><td>${RED}</td></tr>
    <tr><td>2 次失误</td><td>${GREEN}</td><td>${RED}</td><td>${YEL}</td><td>${BLUE}</td></tr>
  </tbody>
</table>
<h3>序列号<b>不含</b>元音</h3>
<table>
  <thead><tr><th>闪光颜色 →</th><th>${RED}</th><th>${BLUE}</th><th>${GREEN}</th><th>${YEL}</th></tr></thead>
  <tbody>
    <tr><td>无失误</td><td>${BLUE}</td><td>${YEL}</td><td>${GREEN}</td><td>${RED}</td></tr>
    <tr><td>1 次失误</td><td>${RED}</td><td>${BLUE}</td><td>${YEL}</td><td>${GREEN}</td></tr>
    <tr><td>2 次失误</td><td>${YEL}</td><td>${GREEN}</td><td>${BLUE}</td><td>${RED}</td></tr>
  </tbody>
</table>`,
  },
  {
    slug: 'whos-on-first',
    name: '他叫什么？',
    nameEn: "Who's on First",
    chapter: 'ch1',
    page: 9,
    flavor: '这个装置灵感来源于喜剧桥段，如果不是连在炸弹上的话应该还是很有意思的。',
    body: `
<ol>
  <li>读显示屏内容，用<b>第 1 步</b>确定要<b>读出</b>哪个按钮的标签。</li>
  <li>按这一标签，用<b>第 2 步</b>确定该<b>按下</b>哪个按钮。</li>
  <li>重复直到模块解除。</li>
</ol>
<h3>第 1 步：显示内容 → 读取哪个位置的标签</h3>
<p>按钮排成 3 行 2 列，位置记为 左上 / 右上 / 左中 / 右中 / 左下 / 右下。</p>
<table class="wof">
  <thead><tr><th>显示</th><th>读取位置</th><th>显示</th><th>读取位置</th></tr></thead>
  <tbody>
    <tr><td>是</td><td>左上</td><td>您</td><td>左上</td></tr>
    <tr><td>一</td><td>右上</td><td>你的</td><td>右上</td></tr>
    <tr><td>显示</td><td>左中</td><td>您的</td><td>左中</td></tr>
    <tr><td>好</td><td>右中</td><td>他们</td><td>右中</td></tr>
    <tr><td>说</td><td>左下</td><td>它们的</td><td>左下</td></tr>
    <tr><td>没有</td><td>右下</td><td>她们的</td><td>右下</td></tr>
    <tr><td>（空白）</td><td>左上</td><td>他们的</td><td>左上</td></tr>
    <tr><td>空</td><td>右上</td><td>戏</td><td>右上</td></tr>
    <tr><td>没</td><td>左中</td><td>西</td><td>左中</td></tr>
    <tr><td>灯</td><td>右中</td><td>喜</td><td>右中</td></tr>
    <tr><td>等</td><td>左下</td><td></td><td></td></tr>
    <tr><td>瞪</td><td>右下</td><td></td><td></td></tr>
    <tr><td>动</td><td>左上</td><td></td><td></td></tr>
    <tr><td>东</td><td>右上</td><td></td><td></td></tr>
    <tr><td>当</td><td>左中</td><td></td><td></td></tr>
    <tr><td>稍等</td><td>右中</td><td></td><td></td></tr>
    <tr><td>你</td><td>左下</td><td></td><td></td></tr>
    <tr><td>泥</td><td>右下</td><td></td><td></td></tr>
  </tbody>
</table>
<h3>第 2 步：按标签查下表，按下该行<b>最先出现</b>的词所在的按钮</h3>
<p>用第 1 步读出的标签找到对应行，从左到右取该行中<b>第一个</b>出现在按钮上的词，按下它。</p>
<table class="wof-step2">
  <tbody>
    <tr><th>准备</th><td>是, 好, 什么, 中间, 左, 按, 预备, 空, 准备, 没, 一, 就是, 没有, 等下</td></tr>
    <tr><th>一</th><td>左, 好, 是, 中间, 没, 预备, 没有, 就是, 等下, 准备, 空, 什么, 按, 一</td></tr>
    <tr><th>没</th><td>空, 就是, 等下, 一, 什么, 准备, 预备, 是, 没有, 左, 按, 好, 没, 中间</td></tr>
    <tr><th>空</th><td>等下, 预备, 好, 中间, 空, 按, 准备, 没有, 没, 什么, 左, 就是, 是, 一</td></tr>
    <tr><th>没有</th><td>就是, 预备, 好, 中间, 是, 空, 没, 按, 左, 什么, 等下, 一, 没有, 准备</td></tr>
    <tr><th>是</th><td>好, 预备, 就是, 中间, 一, 什么, 按, 准备, 没有, 是, 左, 空, 没, 等下</td></tr>
    <tr><th>什么</th><td>就是, 什么, 左, 没有, 准备, 空, 中间, 没, 好, 一, 等下, 是, 按, 预备</td></tr>
    <tr><th>就是</th><td>准备, 没有, 左, 什么, 好, 是, 预备, 没, 按, 空, 就是, 中间, 等下, 一</td></tr>
    <tr><th>左</th><td>预备, 左, 一, 没, 中间, 是, 空, 什么, 就是, 等下, 按, 准备, 好, 没有</td></tr>
    <tr><th>预备</th><td>是, 没有, 准备, 按, 没, 等下, 什么, 预备, 中间, 左, 就是, 空, 好, 一</td></tr>
    <tr><th>中间</th><td>空, 准备, 好, 什么, 没有, 按, 没, 等下, 左, 中间, 预备, 一, 就是, 是</td></tr>
    <tr><th>好</th><td>中间, 没, 一, 是, 就是, 没有, 等下, 好, 左, 准备, 空, 按, 什么, 预备</td></tr>
    <tr><th>等下</th><td>就是, 没, 空, 好, 是, 左, 一, 按, 什么, 等下, 没有, 准备, 预备, 中间</td></tr>
    <tr><th>按</th><td>预备, 中间, 是, 准备, 按, 好, 没有, 就是, 空, 左, 一, 什么, 没, 等下</td></tr>
    <tr><th>你</th><td>没问题, 泥, 您, 你的, 下一个, 行, 您的, 稍等下, 什么？, 你, 不太对, 好像, 好了, Ni</td></tr>
    <tr><th>泥</th><td>您, 下一个, 好像, 行, 什么？, 好了, 不太对, 稍等下, 你, Ni, 你的, 没问题, 您的, 泥</td></tr>
    <tr><th>您</th><td>不太对, 泥, 行, 您, 下一个, 您的, 没问题, Ni, 你的, 你, 什么？, 稍等下, 好像, 好了</td></tr>
    <tr><th>你的</th><td>你, 你的, 您的, 下一个, 不太对, 泥, Ni, 您, 什么？, 行, 没问题, 好了, 好像, 稍等下</td></tr>
    <tr><th>您的</th><td>好了, Ni, 您的, 行, 什么？, 没问题, 您, 稍等下, 你的, 好像, 下一个, 不太对, 泥, 你</td></tr>
    <tr><th>Ni</th><td>行, 没问题, 下一个, 什么？, 你的, 您的, 不太对, 好了, Ni, 你, 好像, 稍等下, 泥, 您</td></tr>
    <tr><th>行</th><td>行, 您, 泥, 你, 好了, 稍等下, 不太对, 下一个, 没问题, 好像, 你的, 您的, Ni, 什么？</td></tr>
    <tr><th>不太对</th><td>您的, Ni, 泥, 你的, 下一个, 不太对, 好了, 你, 行, 好像, 您, 没问题, 稍等下, 什么？</td></tr>
    <tr><th>什么？</th><td>你, 稍等下, 你的, 您, Ni, 好了, 不太对, 好像, 泥, 行, 您的, 下一个, 什么？, 没问题</td></tr>
    <tr><th>好了</th><td>没问题, 行, 下一个, 什么？, 您, 您的, 你的, 稍等下, 好像, 你, Ni, 泥, 不太对, 好了</td></tr>
    <tr><th>下一个</th><td>什么？, 行, 不太对, 您, 稍等下, 没问题, 下一个, 好像, 好了, 泥, 您的, 你的, Ni, 你</td></tr>
    <tr><th>稍等下</th><td>泥, Ni, 好了, 不太对, 你, 您的, 没问题, 什么？, 你的, 下一个, 稍等下, 行, 您, 好像</td></tr>
    <tr><th>没问题</th><td>泥, 好了, 好像, 你的, 你, 稍等下, 行, 您的, 没问题, Ni, 什么？, 下一个, 您, 不太对</td></tr>
    <tr><th>好像</th><td>你的, 下一个, Ni, 您的, 稍等下, 好了, 不太对, 什么？, 行, 你, 好像, 没问题, 泥, 您</td></tr>
  </tbody>
</table>`,
  },
  {
    slug: 'memory',
    name: '记忆',
    nameEn: 'Memory',
    chapter: 'ch1',
    page: 11,
    flavor: '记忆是脆弱的，然而炸弹爆炸后的一切也是。所以小心一些吧！',
    body: `
<p>按下正确按钮进入下一阶段，完成所有阶段即解除。<b>按错任意一次都会重置到阶段 1。</b>按钮位置顺序为<b>从左到右</b>。</p>
<h3>阶段 1</h3>
<ul>
  <li>显示 <b>1</b> → 按<b>第二个位置</b>的按钮</li>
  <li>显示 <b>2</b> → 按<b>第二个位置</b>的按钮</li>
  <li>显示 <b>3</b> → 按<b>第三个位置</b>的按钮</li>
  <li>显示 <b>4</b> → 按<b>第四个位置</b>的按钮</li>
</ul>
<h3>阶段 2</h3>
<ul>
  <li>显示 <b>1</b> → 按数字为 <b>"4"</b> 的按钮</li>
  <li>显示 <b>2</b> → 按与<b>阶段 1 位置相同</b>的按钮</li>
  <li>显示 <b>3</b> → 按<b>第一个位置</b>的按钮</li>
  <li>显示 <b>4</b> → 按与<b>阶段 1 位置相同</b>的按钮</li>
</ul>
<h3>阶段 3</h3>
<ul>
  <li>显示 <b>1</b> → 按与<b>阶段 2 数字相同</b>的按钮</li>
  <li>显示 <b>2</b> → 按与<b>阶段 1 数字相同</b>的按钮</li>
  <li>显示 <b>3</b> → 按<b>第三个位置</b>的按钮</li>
  <li>显示 <b>4</b> → 按数字为 <b>"4"</b> 的按钮</li>
</ul>
<h3>阶段 4</h3>
<ul>
  <li>显示 <b>1</b> → 按与<b>阶段 1 位置相同</b>的按钮</li>
  <li>显示 <b>2</b> → 按<b>第一个位置</b>的按钮</li>
  <li>显示 <b>3</b> → 按与<b>阶段 2 位置相同</b>的按钮</li>
  <li>显示 <b>4</b> → 按与<b>阶段 2 位置相同</b>的按钮</li>
</ul>
<h3>阶段 5</h3>
<ul>
  <li>显示 <b>1</b> → 按与<b>阶段 1 数字相同</b>的按钮</li>
  <li>显示 <b>2</b> → 按与<b>阶段 2 数字相同</b>的按钮</li>
  <li>显示 <b>3</b> → 按与<b>阶段 4 数字相同</b>的按钮</li>
  <li>显示 <b>4</b> → 按与<b>阶段 3 数字相同</b>的按钮</li>
</ul>`,
  },
  {
    slug: 'morse',
    name: '摩斯电码',
    nameEn: 'Morse Code',
    chapter: 'ch1',
    page: 12,
    flavor: '一个过时的海军交流形式？至少这是真正的摩斯电码，所以集中精神！',
    body: `
<p>根据闪烁的亮光，借助摩斯码表拼出一个单词，再调到对应频率按下提交按钮。</p>
<ul>
  <li>短亮 = <b>点 ·</b>；长亮 = <b>划 −</b>。</li>
  <li>字母之间有较长间隔；单词重复之前有<b>非常长</b>的间隔。信号循环播放。</li>
</ul>`,
    widget: 'morse',
  },
  {
    slug: 'complicated-wires',
    name: '复杂线路',
    nameEn: 'Complicated Wires',
    chapter: 'ch1',
    page: 13,
    flavor: '尽管这些带条纹的线路看上去很特殊，但我们有与之对应完全准确的方法。可能过于准确了些……',
    body: `
<p class="note">电池请查 <a href="/modules/batteries">附录 B</a>；端口请查 <a href="/modules/ports">附录 C</a>。</p>
<p>每条线上方有一个 LED，下方可能有一个 <b>★</b> 标记，线本身可能带<b>红/蓝</b>条纹（也可能多色）。按下表四个条件查出指令字母：</p>
<table>
  <thead>
    <tr><th>有${RED}色</th><th>有${BLUE}色</th><th>★ 标记</th><th>LED 点亮</th><th>指令</th></tr>
  </thead>
  <tbody>
    <tr><td>否</td><td>否</td><td>否</td><td>否</td><td><b>C</b></td></tr>
    <tr><td>否</td><td>否</td><td>否</td><td>是</td><td><b>D</b></td></tr>
    <tr><td>否</td><td>否</td><td>是</td><td>否</td><td><b>C</b></td></tr>
    <tr><td>否</td><td>否</td><td>是</td><td>是</td><td><b>B</b></td></tr>
    <tr><td>否</td><td>是</td><td>否</td><td>否</td><td><b>S</b></td></tr>
    <tr><td>否</td><td>是</td><td>否</td><td>是</td><td><b>P</b></td></tr>
    <tr><td>否</td><td>是</td><td>是</td><td>否</td><td><b>D</b></td></tr>
    <tr><td>否</td><td>是</td><td>是</td><td>是</td><td><b>P</b></td></tr>
    <tr><td>是</td><td>否</td><td>否</td><td>否</td><td><b>S</b></td></tr>
    <tr><td>是</td><td>否</td><td>否</td><td>是</td><td><b>B</b></td></tr>
    <tr><td>是</td><td>否</td><td>是</td><td>否</td><td><b>C</b></td></tr>
    <tr><td>是</td><td>否</td><td>是</td><td>是</td><td><b>B</b></td></tr>
    <tr><td>是</td><td>是</td><td>否</td><td>否</td><td><b>S</b></td></tr>
    <tr><td>是</td><td>是</td><td>否</td><td>是</td><td><b>P</b></td></tr>
    <tr><td>是</td><td>是</td><td>是</td><td>否</td><td><b>D</b></td></tr>
    <tr><td>是</td><td>是</td><td>是</td><td>是</td><td><b>B</b></td></tr>
  </tbody>
</table>
<h3>指令字母</h3>
<ul>
  <li><b>C</b> — 剪断线路</li>
  <li><b>D</b> — 不要剪断</li>
  <li><b>S</b> — 序列号末位为<b>偶数</b>则剪断</li>
  <li><b>P</b> — 炸弹有 <b>Parallel</b> 端口则剪断</li>
  <li><b>B</b> — 炸弹有<b>两个或更多</b>电池则剪断</li>
</ul>`,
    widget: 'complicated',
  },
  {
    slug: 'wire-sequences',
    name: '顺序线路',
    nameEn: 'Wire Sequences',
    chapter: 'ch1',
    page: 14,
    flavor: '很难说这个设备到底是怎么运作的……但一定有更简单的方法来管理这九根线。',
    body: `
<p>模块有多个含线路的面板，每次只显示一个。按<b>下键</b>切到下一面板，<b>上键</b>回到上一面板。当前面板的线路<b>未全部正确处理前，不要切换</b>。</p>
<p>同一模块中不同面板的同色线路<b>出现次数顺序累加</b>。每根线连接到 A/B/C 三个接点之一，按下表决定是否剪断（满足"与……相接"才剪）。</p>
<div class="three-col">
<table>
  <thead><tr><th>${RED}线出现次数</th><th>剪断条件</th></tr></thead>
  <tbody>
    <tr><td>第 1 根</td><td>C</td></tr><tr><td>第 2 根</td><td>B</td></tr><tr><td>第 3 根</td><td>A</td></tr>
    <tr><td>第 4 根</td><td>A 或 C</td></tr><tr><td>第 5 根</td><td>B</td></tr><tr><td>第 6 根</td><td>A 或 C</td></tr>
    <tr><td>第 7 根</td><td>A、B 或 C</td></tr><tr><td>第 8 根</td><td>A 或 B</td></tr><tr><td>第 9 根</td><td>B</td></tr>
  </tbody>
</table>
<table>
  <thead><tr><th>${BLUE}线出现次数</th><th>剪断条件</th></tr></thead>
  <tbody>
    <tr><td>第 1 根</td><td>B</td></tr><tr><td>第 2 根</td><td>A 或 C</td></tr><tr><td>第 3 根</td><td>B</td></tr>
    <tr><td>第 4 根</td><td>A</td></tr><tr><td>第 5 根</td><td>B</td></tr><tr><td>第 6 根</td><td>B 或 C</td></tr>
    <tr><td>第 7 根</td><td>C</td></tr><tr><td>第 8 根</td><td>A 或 C</td></tr><tr><td>第 9 根</td><td>A</td></tr>
  </tbody>
</table>
<table>
  <thead><tr><th>${BLACK}线出现次数</th><th>剪断条件</th></tr></thead>
  <tbody>
    <tr><td>第 1 根</td><td>A、B 或 C</td></tr><tr><td>第 2 根</td><td>A 或 C</td></tr><tr><td>第 3 根</td><td>B</td></tr>
    <tr><td>第 4 根</td><td>A 或 C</td></tr><tr><td>第 5 根</td><td>B</td></tr><tr><td>第 6 根</td><td>B 或 C</td></tr>
    <tr><td>第 7 根</td><td>A 或 B</td></tr><tr><td>第 8 根</td><td>C</td></tr><tr><td>第 9 根</td><td>C</td></tr>
  </tbody>
</table>
</div>`,
    widget: 'sequences',
  },
  {
    slug: 'maze',
    name: '迷宫',
    nameEn: 'Maze',
    chapter: 'ch1',
    page: 15,
    flavor: '这看上去就像某种迷宫，很可能就是从某个餐厅的餐具垫上偷下来的。',
    body: `
<ul>
  <li>根据模块上两个<b>圆圈</b>的位置，在下面九张图中找出唯一匹配的迷宫。</li>
  <li>用模块四周的<b>方向键</b>引导白色光点抵达<b>红色三角形</b>。</li>
  <li><b>警告：</b>不要横跨迷宫上的线条——这些线在炸弹上是看不见的。</li>
</ul>`,
    widget: 'maze',
  },
  {
    slug: 'password',
    name: '密码',
    nameEn: 'Passwords',
    chapter: 'ch1',
    page: 16,
    flavor: '22 个字符、大小写混合、随机插入数字……幸好不是这个模块的密码要求。',
    body: `
<p>每个字母上下方的两个按钮用于切换该位字符。可用的字母里只有<b>一种组合</b>能对应下表中的某个单词，拼出后按提交按钮。</p>`,
    widget: 'password',
  },

  // ---------------- 章节 2：特需模块 ----------------
  {
    slug: 'venting-gas',
    name: '排气',
    nameEn: 'Venting Gas',
    chapter: 'ch2',
    page: 18,
    flavor: '入侵电脑是个复杂工作……而这个模块只需要你反复按同一个键。',
    body: `
<p>屏幕提问时：</p>
<ul>
  <li>按 <b>Y</b> 回复"是"。</li>
  <li>按 <b>N</b> 回复"否"。</li>
</ul>
<p class="note">特需模块无法被拆除，会反复触发。超时未处理将记 1 次失误。</p>`,
  },
  {
    slug: 'capacitor',
    name: '电容放电',
    nameEn: 'Capacitor Discharge',
    chapter: 'ch2',
    page: 19,
    flavor: '我猜这只是为了占用注意力而设计的，因为这其实是一项最低级的数控工作。',
    body: `
<p>在电容<b>过载之前</b>，拉下拉杆使其放电。</p>
<p class="note">需要时常照看，否则计时器归零会记 1 次失误。</p>`,
  },
  {
    slug: 'knobs',
    name: '旋钮',
    nameEn: 'Knobs',
    chapter: 'ch2',
    page: 20,
    flavor: '复杂并且没法彻底拆除。发明这些的人就不能做点有用的东西吗？',
    body: `
<p>旋钮可拧向 4 个方向。计时器到 0 时，旋钮必须指向<b>正确方向</b>。正确方向由 12 个 LED 的开关配置决定（<b>X = 亮</b>）。所有方向均相对"上"标记，注意旋钮可能已被旋转。</p>
<div class="knobs-grid">
  <figure><figcaption>向上</figcaption><pre>X · X X
X X X X · X
X · X · X
X X · X X</pre></figure>
  <figure><figcaption>向下</figcaption><pre>X X · X
X X X X · X
X · X · X
· X · X</pre></figure>
  <figure><figcaption>向左</figcaption><pre>· X ·
X · X X X
· X ·
X X ·</pre></figure>
  <figure><figcaption>向右</figcaption><pre>X · X X X X
X X X · X
X · X X
X X X · X</pre></figure>
</div>
<p class="note">LED 配置为示意排布，请以模块实际亮灯图样比对。</p>`,
  },

  // ---------------- 附录 ----------------
  {
    slug: 'indicators',
    name: '附录 A：指示灯',
    nameEn: 'Appendix A — Indicators',
    chapter: 'appendix',
    page: 21,
    body: `
<p>带标签的指示灯可在炸弹侧面找到。常见标记：</p>
<p class="codes">SND · CLR · CAR · IND · FRQ · SIG · NSA · MSA · TRN · BOB · FRK</p>`,
  },
  {
    slug: 'batteries',
    name: '附录 B：电池',
    nameEn: 'Appendix B — Batteries',
    chapter: 'appendix',
    page: 22,
    body: `
<p>一般类型的电池可在炸弹侧面的电池槽位找到。类型：</p>
<p class="codes">AA · D</p>`,
  },
  {
    slug: 'ports',
    name: '附录 C：端口',
    nameEn: 'Appendix C — Ports',
    chapter: 'appendix',
    page: 23,
    body: `
<p>数字端口和模拟信号端口一般在炸弹侧面外壳上。类型：</p>
<p class="codes">DVI-D · Parallel · PS/2 · RJ-45 · Serial · Stereo RCA</p>`,
  },
];

export const moduleBySlug = (slug: string) => MODULES.find((m) => m.slug === slug);

export const CHAPTER_LABELS: Record<Chapter, string> = {
  ch1: '章节 1 · 普通模块',
  ch2: '章节 2 · 特需模块',
  appendix: '附录',
};
