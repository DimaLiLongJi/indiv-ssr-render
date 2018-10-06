export const content = () => [
    {
        h1: '什么是InDiv',
        p: [
            'InDiv 是一个mvvm库。它能帮你构建 Web 应用。InDiv 字符串模板、依赖注入和一些实践于一身。',
        ], 
        info: [
            'InDiv 是单词 individual 的缩写，我在设计时借鉴了很多 angular 和 react 的模式与概念。',
            '本网页是世界上第一个用 InDiv 构建的网页。',
            '在此致敬 angular 和 react的开发者们。感谢他们为前端做出的巨大贡献。',
        ],
    },
    {
        h1: '基本假设',
        p: [
            '本文档假设你已经熟悉了 JavaScript，TypeScript，和来自最新标准的一些知识，比如 class 和 esmodule。',
            '下列代码范例都是用最新版本的 TypeScript 写的，利用 类型 实现依赖注入，并使用装饰器来提供元数据。',
        ],
    },
    {
        h1: '基本理念',
        p: [
            'InDiv 基于 mvvm, 本身使用 TypeScript编写。',
            '它将核心功能和可选功能作为一组 TypeScript 库进行实现，你可以把它们导入你的应用中。',
        ],
        info: [
            'InDiv 基本构造块是 NvModule，它为组件提供了编译的上下文环境和作用域',
            '整个app的最小单位为 Component，页面上的一切皆为组件',
        ],
    },
    {
        h1: '反馈',
        p: [
            '你可以和我一起做贡献！你可以到 Github 上的仓库中提出文档方面的问题，并创建Pull Requests。',
            '或者在 github 上联系我：DimaLiLongJi',
        ],
    },
];
