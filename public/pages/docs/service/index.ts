import { Component, HasRender, SetState, OnDestory } from 'indiv';
// import { Component, HasRender, SetState, OnDestory } from '../../../../../InDiv/src';
import { serviceInfo } from '../../../constants/service';

interface Info {
    h1?: string;
    p?: string[];
    info?: {
      title?: string;
      p?: string[];
      pchild?: string[];
      code?: string;
      exampleTitle?: string;
      example?: {
        p?: string;
        code?: string;
      }[];
    }[];
}

interface State {
  info: Info[];
}
@Component<State>({
  selector: 'docs-service-container',
  template: (`
    <div class="page-wrapper">
      <div class="info-content" nv-repeat="let info in state.info">
        <h1>{{info.h1}}</h1>
        <p nv-repeat="let rp in info.p">{{rp}}</p>
        <div class="child-info" nv-repeat="let code in info.info">
          <h2>{{code.title}}</h2>
          <p nv-repeat="let pli in code.p">{{pli}}</p>
          <div class="pchild" nv-if="code.pchild">
            <p nv-repeat="let child in code.pchild">{{child}}</p>
          </div>
          <code-shower codes="{code.code}"></code-shower>
        </div>
      </div>
    </div>
  `),
})
export default class DocsServiceContainer implements HasRender, OnDestory {
  public state: State;
  public func: string;
  public setState: SetState;

  constructor() {
    this.state = {
      info: serviceInfo(),
    };
  }

  public nvOnDestory() {
    console.log(9999, 'DocsServiceContainer destory');
  }

  public nvHasRender() {
    console.log('DocsServiceContainer nvHasRender', this.state);
  }
}
