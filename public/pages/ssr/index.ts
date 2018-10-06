import './style.less';

// import { Component } from 'indiv';
import { Component } from '../../../../InDiv/src';

import { ssrInfo } from '../../constants/ssr';

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
    selector: 'ssr-container',
    template: (`
        <div class="page-container">
            <div class="info-content" nv-repeat="let info in state.info">
                <h1>{{info.h1}}</h1>
                <p nv-repeat="let rp in info.p">{{rp}}</p>
                <div class="child-info" nv-repeat="let code in info.info">
                    <h2>{{code.title}}</h2>
                    <p nv-repeat="let pli in code.p">{{pli}}</p>
                    <div class="pchild" nv-if="code.pchild">
                    <p nv-repeat="let child in code.pchild">{{child}}</p>
                    </div>
                    <code-shower nv-if="code.code" codes="{code.code}"></code-shower>
                </div>
            </div>
        </div>
    `),
})
export default class SSRContainer {
    public state: State;
    constructor() {
        this.state = {
            info: ssrInfo(),
        };
    }
}
