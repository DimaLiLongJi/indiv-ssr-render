// import { InDiv } from 'indiv';
import { InDiv } from '../../InDiv/src';

import { router, routes } from './routes';
import RootModule from './modules';
import { moduleInfo } from './constants/module';

const inDiv = new InDiv();

inDiv.bootstrapModule(RootModule);
inDiv.use(router);
inDiv.init();

export const ssrData = {
  routes,
  RootModule,
};
