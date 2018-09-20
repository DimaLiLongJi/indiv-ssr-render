export const templateInfo = () => [
  {
    h1: '模板语法',
    p: [
      '从使用模型-视图-控制器 (MVC) 或模型-视图-视图模型 (MVVM) 的经验中，很多开发人员都熟悉了组件和模板这两个概念。',
      '在 InDiv 中，组件扮演着控制器或视图模型的角色，模板则扮演视图的角色。',
      '模板很像字符串的HTML，但是它还包含 InDiv 的模板语法，这些模板语法可以根据你的应用逻辑、应用状态和 DOM 数据来修改这些 HTML。',
      '你的模板可以使用数据绑定来协调应用和 DOM 中的数据，把程序逻辑应用到要显示的内容上。',
      'InDiv 模板指令使用 nv- 开头，下面介绍一下 InDiv 的模板语法。',
    ],
    info: [
      {
        title: '1. 事件指令',
        p: [
          '以 nv-on:event 开头, event 为未加on的事件名， 并且 被绑定的事件必须为 class 的方法，且以 @ 开头并且在方法内可以使用 this ，this 指向 class的实例。',
          '方法可使用参数：',
        ],
        pchild: [
          `- event => $event`,
          `- string => '1','2','3'`,
          ` - number => 1,2,3`,
          ` - index > @index`,
          `- 变量: 仅能传递state上的值， 通过state.xxx标示`,
          `- repeat item: 传递nv-if的值，如： nv-on:click="@show(nav)" nv-repeat="let nav in state.navList" nv-key="nav.id"`,
        ],
        code: `
  <a class="nav" nv-on:click="@goTo($event, $index, 1, 'state', state.nav.to,)">{{state.nav.name}}</a>

  public goTo(event: Event, index: number, aa: number, s: string, to: string) {
    this.$setLocation(to);
  }
 `,
      },
      {
        title: '2. text 指令',
        p: [
          '该指令可直接渲染为标签内的文字，或 <input> 的 value。',
        ],
        pchild: [
          '可以使用 nv-text="state.XXX" 也可以使用模板语法 {{}}。',
        ],
        code: `
  <p nv-text="state.b"></p>
  <p>{{state.b}}</p>
 `,
      },
      {
        title: '3. html 指令',
        p: [
          '该指令可直接渲染为标签内的 HTML，内部实现相当于 innerHTML。',
        ],
        pchild: [
          '可以使用 nv-html="state.XXX"。',
        ],
        code: `
  <p nv-html="state.b"></p>
 `,
      },
      {
        title: '4. model 指令',
        p: [
          '此指令等同于 nv-text 和 nv-on:input 同时使用',
        ],
        pchild: [
          '仅仅可以对 <input> 使用 nv-model="state.XXX", model会主动更新被绑定的值并更新视图。',
        ],
        code: `
  <input nv-model="state.c"/>
 `,
      },
      {
        title: '5. class 指令',
        p: [
          '指令会主动把被绑定的值作为 className 增加到元素的class中。',
        ],
        pchild: [
          '使用 nv-class="state.XXX"。',
        ],
        code: `
  <input nv-class="state.d"/>
 `,
      },
      {
        title: '6. if 指令',
        p: [
          '如果被绑定的值被 javascript 判定为 true/false，将分别在DOM树中显示或移除。',
        ],
        pchild: [
          '使用 nv-if="state.XXX"。',
        ],
        code: `
  <input nv-if="state.e"/>
 `,
      },
      {
        title: '7. repeat 指令',
        p: [
          'repeat 是一个重复器指令 —— 自定义数据显示的一种方式。',
          '你的目标是展示一个由多个条目组成的列表。首先定义了一个 HTML 块，它规定了单个条目应该如何显示。 再告诉 InDiv 把这个块当做模板，渲染列表中的每个条目。',
        ],
        pchild: [
          '使用 nv-repeat="let key in state.XXX", 被绑定的值只能为数组，则可以通过 let key in Array 的方式循环，在元素本身或子元素可以直接使用 key 作为值。',
          '此指令十分耗费性能，不建议多用。',
        ],
        code: `
  <div nv-class="li.class" nv-repeat="let li in state.arrayList" nv-key="li.id">
    <input nv-model="l.value" nv-repeat="let l in li" nv-key="l.id"/>
    <demo-component value="{l}"></demo-component>
  </div>
 `,
      },
    ],
  },
];
