export const moduleInfo = () => [
  {
    h1: 'InDiv 模块',
    p: [
      'JavaScript 和 InDiv 都使用模块来组织代码，虽然它们的组织形式不同，但 InDiv 的应用会同时依赖两者。',
      '此处不过多讲 JavaScript 模块，而着重叙述 InDiv 模块。',
    ],
    info: [
      {
        title: '装饰器 NvModule',
        p: [
          'NvModule 是一些带有 @NvModule 装饰器的类。',
          '@NvModule 装饰器的 会告诉 InDiv 哪些其它的东西是当前模块所需的。',
          '@NvModule 接收5个参数。',
        ],
        pchild: [
          '声明某些组件（component）、服务（service）属于这个模块',
          '公开其中的部分组件，以便其它模块中的组件模板中可以使用它们',
          '导入其它带有组件、服务的模块（NvModule），这些模块中的元件都是本模块所需的',
          '提供一些供应用中的其它组件使用的服务',
        ],
        code: `
  // in TypeScript
  @NvModule({
    imports: [
      M2,
    ],
    components: [
      Container,
      PComponent,
      TestComponent,
      R1,
    ],
    providers: [
      HeroSearchService,
      HeroSearchService1,
    ],
  })
  export default class M1 {}

  // in JavaScript
  export default class M1 {}
  NvModule({
    imports: [
      M2,
    ],
    components: [
      Container,
      PComponent,
      TestComponent,
      R1,
    ],
    providers: [
      HeroSearchService,
      HeroSearchService1,
    ],
  })(M1);
 `,
      },
      {
        title: '1. imports 导入模块',
        p: [
          'imports?: Function[];',
        ],
        pchild: [
          'imports 数组 会告诉 InDiv 哪些其它的 模块 是当前 模块 所需的',
          'imports 数组中的这些模块（NvModule）与 JavaScript 模块不同，它们都是 NvModule 而不是常规的 JavaScript 模块。',
          '而是因为它带有 @NvModule 装饰器及其元数据。',
          '被 imports 的 模块 一定要有 exports，否则将无效。',
        ],
        code: `
  // NvModule M2
  @NvModule({
    components: [
      R2,
      RouteChild,
      PCChild,
    ],
    providers: [
      HeroSearchService2,
    ],
    exports: [
      R2,
      RouteChild,
    ],
  })
  class M2 {}

  // NvModule M1
  @NvModule({
    imports: [
      M2,
    ],
    components: [
      Container,
    ],
  })
  export default class M1 {}
 `,
      },
      {
        title: '2. components 声明组件',
        p: [
          'components: Function[];',
        ],
        pchild: [
          'components 用来声明 组件 。',
          '在 NvModule 中被声明的 组件 里，可以直接使用该 NvModule 中声明过的 组件 和被 imports 进来的 模块 导出过的 组件。',
        ],
        code: `
  // NvModule M2
  @Component({
    selector: 'pp-childs',
    template: (\`
      <div>
        <p>子组件</p>
      </div>
    \`),
  })
  class PCChild {}

  @NvModule({
    components: [
      PCChild,
    ],
    exports: [
      PCChild,
    ],
  })
  class M2 {}


  // NvModule M1
  @Component({
    selector: 'cc-ontainer',
    template: (\`
      <div>
        <pp-childs></pp-childs>
      </div>
    \`),
  })
  class Container {}

  @NvModule({
    imports: [
      M2,
    ],
    components: [
      Container,
    ],
  })
  export default class M1 {}

 `,
      },
      {
        title: '3. providers 提供服务',
        p: [
          'providers?: Function[];;',
        ],
        pchild: [
          'providers 用来声明 服务 。',
          '服务可以被声明在 模块 的 providers 中，被声明后，所有该模块的 组件 和被该模块导出的 组件 都可以直接 依赖注入 该 服务。',
        ],
        code: `
  // NvModule M2
  @Injectable
  @Component({
    selector: 'pp-childs',
    template: (\`
      <div>
        <p>子组件</p>
      </div>
    \`),
  })
  class PCChild {
    constructor (
      private heroS: HeroSearchService2,
    ) {
      this.service = heroS;
    }
  }

  @NvModule({
    components: [
      PCChild,
    ],
    providers: [
      HeroSearchService2,
    ],
    exports: [
      PCChild,
    ],
  })
  class M2 {}


  // NvModule M1
  @Component({
    selector: 'cc-ontainer',
    template: (\`
      <div>
        <pp-childs></pp-childs>
      </div>
    \`),
  })
  class Container {}

  @NvModule({
    imports: [
      M2,
    ],
    components: [
      Container,
    ],
  })
  export default class M1 {}

 `,
      },
      {
        title: '4. exports 模块导出的组件',
        p: [
          'exports?: Function[];',
        ],
        pchild: [
          'exports 用来声明模块被导出的组件（component）。',
          '模块只能导出可声明的类。它不会声明或导出任何其它类型的类。',
          '被模块导出的组件，可以随意在 导入该模块的模块（NvModule） 中的 组件（component） 使用。',
        ],
        code: `
  // NvModule M2
  @Injectable
  @Component({
    selector: 'pp-childs',
    template: (\`
      <div>
        <p>子组件</p>
      </div>
    \`),
  })
  class PCChild {
    constructor (
      private heroS: HeroSearchService2,
    ) {
      this.service = heroS;
    }
  }

  @NvModule({
    components: [
      PCChild,
    ],
    providers: [
      HeroSearchService2,
    ],
    exports: [
      PCChild,
    ],
  })
  class M2 {}


  // NvModule M1
  @Component({
    selector: 'cc-ontainer',
    template: (\`
      <div>
        <pp-childs></pp-childs>
      </div>
    \`),
  })
  class Container {}

  @NvModule({
    imports: [
      M2,
    ],
    components: [
      Container,
    ],
  })
  export default class M1 {}

 `,
      },
      {
        title: '5. bootstrap 引导启动',
        p: [
          'bootstrap?: Function;',
        ],
        pchild: [
          '从分类上说，入口组件是 InDiv 命令式加载的任意组件。',
          '如果你没有使用路由，则需要在 根模块 中将一个 组件 声明给该项，被声明的 组件 将作为 入口组件 被 InDiv 渲染到页面。',
          '如果你使用路由，则无需对此项赋值，因为路由会自动根据配置去找到需要渲染的页面。',
        ],
        code: `
  @Component({
    selector: 'cc-ontainer',
    template: (\`
      <div>
        <pp-childs></pp-childs>
      </div>
    \`),
  })
  class Container {}

  @NvModule({
    components: [
      Container,
    ],
    bootstrap: Container,
  })
  export default class M1 {}

 `,
      },
    ],
  },
];
