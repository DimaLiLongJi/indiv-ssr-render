export const componentInfo = () => [
  {
    h1: '组件与模板',
    p: [
      '在 InDiv 中最典型的数据显示方式，就是把 HTML 模板中的控件绑定到 InDiv 组件的属性。',
    ],
    info: [
      {
        title: '装饰器 Component',
        p: [
          '@Component 装饰器会指出紧随其后的那个类是个组件类，并为其指定元数据。 在下面的范例代码中，你可以看到 ContainerComponent 只是一个普通类，完全没有 InDiv 特有的标记或语法。 直到给它加上了 @Component 装饰器，它才变成了组件。',
          '@Component 接收2个参数:',
        ],
        pchild: [
          '1. selector: string; 作为组件（component）被渲染成 DOM 的标签，类似于 <div>',
          '2. template: string; 视图模板，用来声明被渲染的视图',
          '在 JavaScript 中，只能把 装饰器Component 当做一个函数使用，最后应该导出被声明的 类。',
        ],
        code: `
  // in TypeScript
  @Component({
    selector: 'container-component'
    template: ('
      <div>ContainerComponent {{state.a}}</div>
    '),
  })
  export default class ContainerComponent {
    public state: {
      a: number;
    };

    constructor() {
      this.state = {
        a: 1
      };
    }
  }

  // in JavaScript
  export default class ContainerComponent {
    public state: {
      a: number;
    };

    constructor() {
      this.state = {
        a: 1
      };
    }
  }
  Component({
    selector: 'container-component'
    template: ('
      <div>ContainerComponent {{state.a}}</div>
    '),
  })(ContainerComponent)
 `,
      },
      {
        title: '模板数据绑定',
        p: [
          '如果没有框架，你就要自己负责把数据渲染到 HTML 控件中，并把来自用户的响应转换成动作和对值的更新。 手动写这种数据推拉逻辑会很枯燥、容易出错，难以阅读 —— 用过 jQuery 的程序员一定深有体会。',
          'InDiv 支持双向数据绑定，这是一种对模板中的各个部件与组件中的各个部件进行协调的机制。',
        ],
        pchild: [
          '往模板HTML字符串中添加绑定 nv- 开头的标记可以告诉 InDiv 该如何渲染它们。',
          '因为 InDiv 使用单向数据流，所以仅仅支持使用 this.state 内的值作为绑定数据， class 实例的方法作为事件方法。如果要在组件内使用 props ，请在 nvReceiveProps 或 nvOnInit 生命周期内用 props 对 state 赋值。',
        ],
        code: `
  @Component({
    selector: 'container-component',
    template: ('
      <div nv-on:click="@show(state.a)"> ContainerComponent {{state.a}}}/div>
      '),
  })
  class ContainerComponent {
    constructor() {
      this.state = {
        a: null,
      };
    }

    public show(a: any) {
      console.log(a);
    }

    public nvReceiveProps(nextProps: any): void {
      this.state.a = nextProps.a;
    }
  }
 `,
      },
      {
        title: '组件通信: props 与 state',
        p: [
          'InDiv 的组件之间可以 props 来通信。',
          '组件间通信应该是单向的，通过传递值到子组件，并通过传递一个回调方法在子组件调用来更改对应父组件的值来完成通信。',
        ],
        pchild: [
          '可以直接在 template 上使用在 NvModule 注册过的组件标签，并通过 propValue="{state.value}" propValue="{repeatValue}" propFunction="{@fn}" 的引号包裹花括号的写法传递值与方法。',
          '例如在下面例子，在 hero-component 内可以用循环 state.a (nv-repeat)的value persion 并且可以直接在实例方法中触发 handelClick 回调。',
          '但是渲染的时候，不可以在模板上直接使用 props 的值，仅仅可以使用 class 实例的方法和 this.state 的值。',
          '在生命周期 constructor 和 nvOnInit 之后，会开启对 this.state 的监听，此监听会监听每个挂载到 this.state 上的属性及属性的属性，因此如果不对 this.state 添加新的属性或对属性的属性添加新的属性的话，可以直接对某个属性赋值。',
          '相反，如果要对 this.state 上的属性 增加属性或删除，则需要使用  setState<S>(newState: {[key: string]: S}) 方法对 this.state 重新添加监听',
          '可以直接引用 InDiv 的 SetState 来为 setState方法声明类型。',
        ],
        code: `
  import { Component, SetState, OnInit, ReceiveProps } from 'InDiv';
  @Component({
    selector: 'hero-component',
    template: ('
      <div>
        <p>来自父组件的stateValue: {{state.stateValue}}</p>
        <p>idValue: {{state.idValue}}</p>
      </div>
    '),
  })
  class HeroComponent implements OnInit, ReceiveProps {
    public setState: SetState;
    public state: any;
    public props: any;

    public nvOnInit() {
      state: {
        idValue: this.props.idValue,
        stateValue: this.props.stateValue,
      },
    }

    public show(a: any) {
      this.props.handelClick(a);
    }

    public nvReceiveProps(nextProps: any): void {
      this.state.idValue = nextProps.idValue;
      this.setState({
        stateValue: nextProps.stateValue,
      });
    }
  }

 @Component({
    selector: 'container-component',
    template: ('
      <div>
        <div nv-repeat="let person in state.b" >
          <hero-component handelClick="@show" stateValue="state.a" idValue="person.id" ></hero-component>
        </div>
      </div>
    '),
  })
  class ContainerComponent {
    constructor() {
      this.state = {
        a: {
          id: 3,
          name: '码农3',
        },
        b: [
          {id: 1, name: '码农1'},
          {id: 2, name: '码农2'},
        ],
      }
    }

    public show(a: any) {
      console.log(a);
    }
  }
 `,
      },
      {
        title: '生命周期钩子',
        p: [
          '每个组件都有一个被 InDiv 管理的生命周期。',
          '生命周期钩子其实就是定义在实例中的一些方法，在 InDiv 中，通过不同的时刻调用不同的生命周期钩子，',
          '赋予你在它们发生时采取行动的能力。',
          '在 TypeScript 中，引用 InDiv 提供的 interface，通过 implements 的方式让类去实现被预先定义好的生命周期，而在 JavaScript 中，你只能自己手动去定义应该实现的生命周期方法。',
        ],
        pchild: [
          '1. constructor 在类被实例化的时候回触发，你可以在这里预先定义你的 state',
          '2. nvOnInit(): void; constructor 之后，在这个生命周期中，可以通过 this.props 获取 props，并定义 state，此生命周期会在开启监听前被触发，并且之后再也不会触发',
          '3. nvBeforeMount(): void; 在 nvOnInit 之后，template 挂载页面之前被触发，每次触发渲染页面都会被触发',
          '4. nvAfterMount(): void; 在 nvBeforeMount 之后，template 挂载页面之后被触发，每次触发渲染页面（render）都会被触发',
          '5. nvHasRender(): void; 在 nvAfterMount 之后，渲染完成后被触发，每次触发渲染页面（render）都会被触发',
          '6. nvRouteChange(lastRoute?: string, newRoute?: string): void; 监听路由变化，当更换路由后被触发',
          '7. nvOnDestory(): void; 仅仅在路由决定销毁此组件时被触发',
          '8. nvWatchState(oldData?: any, newData?: any): void; 监听 state 变化，当 state 被更改时被触发',
          '9. nvReceiveProps(nextProps: any): void; 监听 props 变化，当 props 被更改时被触发',
        ],
        code: `
 import { Component, OnInit, BeforeMount, AfterMount, HasRender, OnDestory, WatchState, ReceiveProps } from 'InDiv';

 @Component({
    selector: 'hero-component',
    template: ('
      <div>
        <p>来自父组件的stateValue: {{state.stateValue}}</p>
        <p>idValue: {{state.idValue}}</p>
      </div>
    '),
  })
  class HeroComponent implements
    OnInit,
    BeforeMount,
    AfterMount,
    HasRender,
    WatchState,
    ReceiveProps,
  {
    public setState: SetState;
    public state: any;
    public props: any;

    public nvOnInit() {
      state: {
        idValue: this.props.idValue,
        stateValue: this.props.stateValue,
      },
    }

    public nvBeforeMount() {
      console.log('component in BeforeMount');
    }

    public nvAfterMount() {
      console.log('component in AfterMount');
    }

    public nvHasRender() {
      console.log('component in HasRender');
    }

    public nvWatchState(oldData?: any, newData?: any) {
      console.log('component in WatchState');
    }

    public nvReceiveProps(nextProps: any): void {
      this.state.idValue = nextProps.idValue;
      this.setState({
        stateValue: nextProps.stateValue,
      });
    }

    public show(a: any) {
      this.props.handelClick(a);
    }
  }
 `,
      },
    ],
  },
];
