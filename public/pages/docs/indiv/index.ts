import { Component, SetState } from 'indiv';
// import { Component, SetState } from '../../../../../InDiv/src';
import { inDivInfo } from '../../../constants/indiv';

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
  selector: 'docs-indiv-container',
  template: (`
    <div class="page-wrapper">
      <div class="info-content" nv-repeat="let info in $.info">
        <h1>{{info.h1}}</h1>
        <p nv-repeat="let rp in info.p">{{rp}}</p>
        <div class="child-info" nv-repeat="let code in info.info">
          <h2>{{code.title}}</h2>
          <p nv-repeat="let pli in code.p">{{pli}}</p>
          <div class="pchild" nv-if="code.pchild">
            <p nv-repeat="let child in code.pchild">{{child}}</p>
          </div>
          <code-shower codes="{code.code}" nv-if="code.code"></code-shower>
        </div>
      </div>
    </div>
  `),
})
export default class DocsInDivContainer {
  public state: State;
  public func: string;
  public setState: SetState;

  constructor() {
    this.state = {
      info: inDivInfo(),
    };
  }
}
