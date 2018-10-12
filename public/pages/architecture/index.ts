import './style.less';

import { Component } from 'indiv';
// import { Component } from '../../../../InDiv/src';

import { content } from '../../constants/start';

type content = {
  [x: string]: any;
  h1: string;
  p: string[];
  info?: string[];
}

interface State {
  info: content[];
}
@Component<State>({
  selector: 'architecture-container',
  template: (`
    <div class="page-container">
      <div class="info-content" nv-repeat="let info in $.info">
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
export default class ArchitectureContainer {
  public state: State;
  constructor() {
    this.state = {
      info: content(),
    };
  }
}
