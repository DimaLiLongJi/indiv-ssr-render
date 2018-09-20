import './style.less';

import { Component, OnInit, RouteChange, SetState, SetLocation, GetLocation, Injectable } from 'indiv';
// import { Component, OnInit, RouteChange, SetState, SetLocation, GetLocation, Injectable } from '../../../../InDiv/src';

import { navs } from '../../constants/nav';

import TestService from '../../service/test.service';

type nav = {
    name: string;
    to: string;
    active?: string;
    child?: nav[];
};
interface State {
    navs: nav[];
}

@Injectable
@Component<State>({
    selector: 'side-bar',
    template: (`
        <div class="side-bar-container">
            <div class="nav-wrap" nv-class="nav.active" nv-repeat="let nav in state.navs">
                <a class="nav" nv-on:click="@setLocation(nav.to)">{{nav.name}}</a>
                <div class="child-wrap" nv-if="nav.child">
                    <a class="nav nav-child" nv-class="child.active" nv-repeat="let child in nav.child" nv-on:click="@setLocation(child.to)">{{child.name}}</a>
                </div>
            </div>
        </div>
    `),
})
export default class SideBar implements OnInit, RouteChange {
    public state: State;
    public props: any;
    public getLocation: GetLocation;
    public setLocation: SetLocation;
    public setState: SetState;

    constructor(
        private testS: TestService,
    ) {
        console.log('service data', this.testS.getData());
    }

    public nvOnInit() {
        this.state = {
            navs: navs(),
        };
        this.showColor();
        console.log('SideBar onInit');
    }

    public nvRouteChange(lastRoute?: string, newRoute?: string): void {
        console.log(111111, newRoute);
        this.showColor();
    }

    public showColor() {
        const location = this.getLocation();
        this.state.navs.forEach(nav => {
            nav.active = null;
            if (nav.to === location.path) return nav.active = 'active';
            if (nav.child) {
                nav.child.forEach(n => {
                    n.active = null;
                    if (n.to === location.path) {
                        nav.active = 'active';
                        n.active = 'active';
                    }
                });
            }
        });
        console.log('service data', this.testS.getData());
    }
}
