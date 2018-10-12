import { NvModule } from 'indiv';
// import { NvModule } from '../../../InDiv/src';

import DocsContainer from '../pages/docs';
import DocsComponentContainer from '../pages/docs/component';
import DocsTemplateContainer from '../pages/docs/template';
import DocsModuleContainer from '../pages/docs/module';
import DocsServiceContainer from '../pages/docs/service';
import DocsRouteContainer from '../pages/docs/route';
import DocsInDivContainer from '../pages/docs/indiv';
import DocsLibsContainer from '../pages/docs/libs';
import DocsHttpContainer from '../pages/docs/http';

import TestService from '../service/test.service';

@NvModule({
    components: [
        DocsContainer,
        DocsComponentContainer,
        DocsTemplateContainer,
        DocsModuleContainer,
        DocsServiceContainer,
        DocsRouteContainer,
        DocsInDivContainer,
        DocsLibsContainer,
        DocsHttpContainer,
    ],
    providers: [
        {
            provide: TestService,
            useClass: TestService,
        },
    ],
    exports: [
        DocsContainer,
        DocsComponentContainer,
        DocsTemplateContainer,
        DocsModuleContainer,
        DocsServiceContainer,
        DocsRouteContainer,
        DocsInDivContainer,
        DocsLibsContainer,
        DocsHttpContainer,
    ],
})
export default class DocsModule { }
