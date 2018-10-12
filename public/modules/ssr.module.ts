import { NvModule } from 'indiv';
// import { NvModule } from '../../../InDiv/src';

import SSRContainer from '../pages/ssr';

@NvModule({
    components: [
        SSRContainer,
    ],
    exports: [
        SSRContainer,
    ],
})
export default class SSRModule { }
