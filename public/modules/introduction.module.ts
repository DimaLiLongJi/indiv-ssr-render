// import { NvModule } from 'indiv';
import { NvModule } from '../../../InDiv/src';

import IntroductionContainer from '../pages/introduction';

@NvModule({
    imports: [
    ],
    components: [
        IntroductionContainer,
    ],
    providers: [
    ],
    exports: [
        IntroductionContainer,
    ],
})
export default class IntroductionModule { }
