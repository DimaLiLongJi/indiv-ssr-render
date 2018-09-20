import { NvModule } from 'indiv';
// import { NvModule } from '../../../InDiv/src';

import ArchitectureContainer from '../pages/architecture';

@NvModule({
    imports: [
    ],
    components: [
        ArchitectureContainer,
    ],
    providers: [
    ],
    exports: [
        ArchitectureContainer,
    ],
})
export default class ArchitectureModule { }
