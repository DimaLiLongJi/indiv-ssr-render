import { Subscription } from 'rxjs';
// import { Component, HasRender, SetState, Injected, WatchState, OnInit } from 'indiv';
import { Component, HasRender, SetState, Injected, WatchState, OnInit, OnDestory, RouteChange } from '../../../../../InDiv/src';
import { componentInfo } from '../../../constants/component';

import TestService from '../../../service/test.service';

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

@Injected
@Component<State>({
  selector: 'docs-component-container',
  template: (`
    <div class="page-wrapper">
      <div class="info-content" nv-repeat="let info in state.info">
        <h1>{{info.h1}}</h1>
        <p nv-repeat="let rp in info.p">{{rp}}</p>
        <div class="child-info" nv-repeat="let code in info.info">
          <h2 class="fucker" nv-on:click="@click(code, $index)">{{@showText(code.title)}}</h2>
          <p nv-repeat="let pli in code.p">{{pli}}</p>
          <div class="pchild" nv-if="code.pchild">
            <p nv-repeat="let child in code.pchild">{{child}}</p>
          </div>
          <code-shower codes="{code.code}" nv-if="code.code"></code-shower>
        </div>
      </div>
    </div>
  `),
  // providers: [
  //   {
  //     provide: TestService,
  //     useClass: TestService,
  //   },
  // ],
})
export default class DocsComponentContainer implements OnInit, HasRender, WatchState, OnDestory, RouteChange {
  public state: State;
  public func: string;
  public setState: SetState;
  public subscribeToken: Subscription;
  public reRender: () => void;
  public stateWatcher: () => void;

  constructor(
    private testS: TestService,
  ) {
    this.state = {
      info: componentInfo(),
    };
    this.subscribeToken = this.testS.subscribe(this.subscribe);
  }

  public nvOnInit() {
    console.log('DocsComponentContainer has oninit');
  }
  
  public nvWatchState(oldState: State) {
    console.log('oldState is: ', oldState);
  }

  public subscribe(value: any) {
    console.log('RXJS value from DocsComponentContainer', value);
  }

  public click(code: any, index: number) {
    code.title = '3232';
    this.testS.update(3);
  }
  
  public showText(text: any) {
    return text;
  }

  public nvHasRender() {
    console.log('nvHasRender', this.state);
  }

  public nvOnDestory() {
    console.log('DocsComponentContainer nvOnDestory');
    this.subscribeToken.unsubscribe();
  }

  public nvRouteChange(lastRoute?: string, newRoute?: string) {
    console.log('DocsComponentContainer nvRouteChange', lastRoute, newRoute);
  }
}
