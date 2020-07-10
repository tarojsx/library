<div align="center">
    <h1>Taro3 Library</h1>
</div>
<div align="center">
    <strong>Taro3 里可以跑起来的第三方优秀类库</strong>
</div>

<br />

<div align="center">
    <a href="https://github.com/tarojsx/library/blob/master/LICENSE">
        <img src="https://badgen.net/github/license/tarojsx/library" alt="License" />
    </a>
    <a href="https://www.npmjs.com/package/@tarojsx/library">
        <img src="https://badgen.net/npm/v/@tarojsx/library" alt="npm version" />
    </a>
    <a href="https://www.npmjs.com/org/tarojsx">
        <img src="https://badgen.net/npm/dt/@tarojsx/library" alt="npm downloads" />
    </a>
    <a href="https://github.com/tarojsx/library/blob/master/package.json">
        <img src="https://badgen.net/github/dependents-pkg/tarojsx/library" alt="dependents" />
    </a>
    <a href="http://makeapullrequest.com">
        <img src="https://badgen.net/badge/PRs/welcome/green" alt="PRs welcome" />
    </a>
</div>

<div align="center">
    Built with :purple_heart: by
    <a href="https://github.com/cncolder">@Colder</a> and
    <a href="https://github.com/tarojsx/library/graphs/contributors">
        Contributors
    </a>
    <div align="center">
        :star2: :eyes: :zap: :boom:
    </div>
</div>

<br />

_当前代码提交频繁, 一些特性时有变化._

待续不断搜索可以运行在 Taro3 环境下的[优秀第三方类库](https://github.com/search?o=desc&q=react&s=stars&type=Repositories).

## 特性

- :gift: 使用原始 npm 包, 保持原汁原味, 不做侵入性的修改.

- :wrench: 简化配置, 搭配 [`@tarojsx/polyfill`](https://github.com/tarojsx/polyfill) 使用.

- :mag_right: 完善的 Typescript 类型提示.

- :telescope: 持续探索中...

## 需求

* **taro 3+**

## 安装

`npm i @tarojsx/library @tarojsx/polyfill`

## 使用

部分组件需要用到 polyfill.

更新 config/index.js 配置如下

```js
const { TaroProvidePlugin } = require('@tarojsx/polyfill/dist/plugins')

const config = {
    mini: {
        webpackChain(chain, webpack) {
            chain
                .plugin('taroProviderPlugin')
                .use(TaroProvidePlugin)
        }
    }
}
```

## 模块

### 图表

* [x] [AntV F2](docs/antv-f2.mdx) - 让数据栩栩如生

### 虚拟滚动

* [x] [react-window](docs/react-window.mdx) - 虚拟滚动
  * [x] `FixedSizeList`
  * [x] `VariableSizeList`
* [x] [react-vtree](docs/react-vtree.mdx) - 虚拟滚动树
  * [x] `FixedSizeTree`

### 交互动画

* [x] [react-spring](docs/react-spring.mdx) - 弹性物理动画
* [x] [react-use-gesture](docs/react-use-gesture.mdx) - 触摸手势

## 支持

欢迎各种形式的支持. 至少可以给颗星 :star:

### 测试步骤

1. 打开微信开发者工具 CLI/HTTP 调用功能，设置 - 安全设置 - 服务端口
2. 导入项目，目录指向当前项目文件夹。
3. 运行 `npm run test`
4. 如果提示 `Failed to launch wechat web devTools`，请先退出微信开发者工具。

## License

[MIT](LICENSE)
