export const httpInfo = () => [
  {
    h1: 'HTTP',
    p: [
      'nvHttp 对象是 InDiv 通过 HTTP 与远程服务器通讯的机制。',
    ],
    info: [
      {
        title: 'nvHttp',
        p: [
          '通过封装 axios 库，InDiv 可以通过 nvHttp 发送网络请求。',
          'nvHttp 共封装了5中方法，可以直接引入 nvHttp 直接使用对应方法，无需注入。',
          '如果需要更多方法，欢迎通过使用 axios 来获得更多体验。',
        ],
        pchild: [
          '1. get: <P = any, R = any>(url: string, params?: P): Promise<R>;',
          '2. delete: <P = any, R = any>(url: string, params?: P): Promise<R>;',
          '3. post?<P = any, R = any>(url: string, params?: P): Promise<R>;',
          '4. put?<P = any, R = any>(url: string, params?: P): Promise<R>;',
          '5. patch?<P = any, R = any>(url: string, params?: P): Promise<R>;',
        ],
        code: `
  import { nvHttp } from 'InDiv';

  nvHttp.get(url, params);
  nvHttp.delete(url, params);
  nvHttp.post(url, params);
  nvHttp.put(url, params);
  nvHttp.patch(url, params);
 `,
      },
      {
        title: 'nvHttp',
        p: [
          '通过封装 axios 库，InDiv 可以通过 nvHttp 发送网络请求。',
          'nvHttp 共封装了5中方法，可以直接引入 nvHttp 直接使用对应方法，无需注入。',
        ],
        pchild: [
          '1. get: <P = any, R = any>(url: string, params?: P): Promise<R>;',
          '2. delete: <P = any, R = any>(url: string, params?: P): Promise<R>;',
          '3. post?<P = any, R = any>(url: string, params?: P): Promise<R>;',
          '4. put?<P = any, R = any>(url: string, params?: P): Promise<R>;',
          '5. patch?<P = any, R = any>(url: string, params?: P): Promise<R>;',
        ],
        code: `
  import { nvHttp } from 'InDiv';

  nvHttp.get(url, params);
  nvHttp.delete(url, params);
  nvHttp.post(url, params);
  nvHttp.put(url, params);
  nvHttp.patch(url, params);
 `,
      },
    ],
  },
];
