import { NvModule } from 'indiv';
// import { NvModule } from '../../../InDiv/src';

import IntroductionModule from './introduction.module';
import ArchitectureModule from './architecture.module';
import DocsModule from './docs.module';

import RootComponent from '../components/root-component';
import SideBar from '../components/side-bars';
import CodeShower from '../components/code-show';

import TestService from '../service/test.service';

@NvModule({
  imports: [
    IntroductionModule,
    ArchitectureModule,
    DocsModule,
  ],
  components: [
    SideBar,
    RootComponent,
    CodeShower,
  ],
  providers: [
    TestService,
  ],
})
export default class RootModule { }
