import './style.less';

import { Component } from 'indiv';
// import { Component } from '../../../../InDiv/src';

import { content } from '../../constants/introduction';

type info = {
    [x: string]: any;
    h1: string;
    p: string[];
    info?: string[];
}

interface State {
    info: info[];
}
@Component<State>({
    selector: 'introduction-container',
    template: (`
        <div class="page-container">
            <div class="info-content" nv-repeat="let info in state.info">
                <h1>{{info.h1}}</h1>
                <p nv-repeat="let pp in info.p">{{pp}}</p>
                <div class="child-info" nv-if="info.info">
                    <div class="pchild">
                        <p nv-repeat="let child in info.info">{{child}}</p>
                    </div>
                </div>
            </div>
        </div>
    `),
})
export default class IntroductionContainer {
    public state: State;
    constructor() {
        this.state = {
            info: content(),
        };
    }
}
