# @indiv/ssr-renderer

SSR for InDiv

[中文](https://dimalilongji.github.io/indiv-doc/ssr)
[npm](https://www.npmjs.com/package/@indiv/ssr-renderer)

This package only support for indiv v1.2.0 - v1.2.1.

In indiv2+ please use [@indiv/platform-server](https://www.npmjs.com/package/@indiv/platform-server)

## Demo
  - `npm start`
  - open `http://localhost:3234/indiv-doc`

## Environment

  - Node.js v6 or newer
  - Indiv  v1.2.0 v1.2.1

## Basic Usage

1. Create renderer

  - Import a renderer function.

  ```typescript
  const renderToString = require('./src');
  ```

  - Import your InDiv app, only use `routes: TRouter[]` and `InDiv` instance

  ```typescript
  // in your InDiv APP
  import { InDiv } from 'indiv';

  import { router, routes } from './routes';

  import RootModule from './modules';

  const inDiv = new InDiv();
  inDiv.bootstrapModule(RootModule);
  inDiv.use(router);
  inDiv.init();

  export default {
    routes,
    inDiv,
  };
  ```

2. Render InDiv app to string with node app
  
  - Define your route, render template ( I use ejs template in express), and use it in function `renderToString`

  ```typescript
  app.use('/indiv-doc', (req, res, next) => {
    const ssrData = require('./dist/main.js');
    res.render('index.ejs', {
      // use in ejs template
      ssrContent: renderToString(req.url, ssrData.routes, ssrData.default.inDiv),
    });
  });
  ```

  - In index.ejs

  ```html
  <html lang="en">
    <head>
      <meta charset="utf-8">
      <title>InDiv ssr renderer</title>
      <link rel="stylesheet" href="/main.css">
    </head>
    <body>
      <div id="root">
        <%- ssrContent %>
      </div>
    </body>
  </html>
  ```

3. Life cycle hooks in SSR component

  - only `constructor()` and `nvOnInit(): void;` is executable in SSR
