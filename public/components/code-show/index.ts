import './style.less';

import { Component, OnInit } from 'indiv';

interface State {
    codes: string;
}

@Component<State>({
    selector: 'code-shower',
    template: (`
        <div nv-on:click="@show()" class="code-show-container">
            <blockquote>
                <pre>
                    <code>{{$.codes}}</code>
                </pre>
            </blockquote>
        </div>
    `),
})
export default class CodeShower implements OnInit {
    public state: State;
    public props: any;

    public nvOnInit() {
        this.state = {
            codes: this.props.codes,
        };
    }

    public show() {
        console.log(this.state.codes)
    }
}
