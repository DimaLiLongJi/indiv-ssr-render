import { TRouter, InDiv } from 'indiv';

declare function renderToString(url: string, routes: TRouter[], indiv: InDiv): string;
export default renderToString;