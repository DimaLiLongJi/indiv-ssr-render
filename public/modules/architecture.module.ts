import { NvModule } from 'indiv';
// import { NvModule } from '../../../InDiv/src';

import ArchitectureContainer from '../pages/architecture';

@NvModule({
    components: [
        ArchitectureContainer,
    ],
    exports: [
        ArchitectureContainer,
    ],
})
export default class ArchitectureModule { }
