const { factoryCreator } = require('indiv');

function buildPath(url) {
  const renderRouteList = url === '/' ? ['/'] : url.split('/');
  renderRouteList[0] = '/';
  return renderRouteList;
}

function instantiateComponent(FindComponent, rootModule) {
  const component = factoryCreator(FindComponent, rootModule);
  component.$vm = this;
  component.$components = rootModule.$components;
  if (component.nvOnInit) component.nvOnInit();
  if (component.watchData) component.watchData();
  return component;
}

function findRoutes(pathList, routes, rootModule) {
  const routesList = [];

  for (let index = 0; index < pathList.length; index++) {
    const path = pathList[index];
    if (index === 0) {
      const rootRoute = routes.find(route => route.path === `${path}` || /^\/\:.+/.test(route.path));
      if (!rootRoute) {
        console.error('route error: wrong route instantiation in generalDistributeRoutes:', this.currentUrl);
        return;
      }

      let FindComponent = null;
      if (rootModule.$components.find((component) => component.$selector === rootRoute.component)) {
        FindComponent = rootModule.$components.find((component) => component.$selector === rootRoute.component);
      } else {
        console.error(`route error: path ${rootRoute.path} is undefined`);
        return;
      }

      routesList.push(rootRoute);

      const component = instantiateComponent(FindComponent, rootModule);
      // 因为没有 所有要push进去
      // if (component) this.hasRenderComponentList.push(component);

      // if (index === pathList.length - 1) this.routerChangeEvent(index);

      if (rootRoute.redirectTo && /^\/.*/.test(rootRoute.redirectTo) && (index + 1) === pathList.length) {
        // this.needRedirectPath = rootRoute.redirectTo;
        // pathList.push(rootRoute.redirectTo);
        const redirectToPathList = buildPath(route.redirectTo);
        routesList = findComponent(redirectToPathList, routes, rootModule);
        return;
      }
    } else {
      const lastRoute = routesList[index - 1].children;
      if (!lastRoute || !(lastRoute instanceof Array)) {
        console.error('route error: routes not exit or routes must be an array!');
      }
      const route = lastRoute.find(r => r.path === `/${path}` || /^\/\:.+/.test(r.path));
      if (!route) {
        console.error('route error: wrong route instantiation:', this.currentUrl);
        return;
      }

      let FindComponent = null;
      if (rootModule.$components.find((component) => component.$selector === route.component)) {
        FindComponent = rootModule.$components.find((component) => component.$selector === route.component);
      }

      if (!route.component && !route.redirectTo) {
        console.error(`route error: path ${route.path} need a component which has children path or need a  redirectTo which has't children path`);
        return;
      }

      routesList.push(route);

      if (FindComponent) {
        const component = instantiateComponent(FindComponent, rootModule);
        // if (component) this.hasRenderComponentList.push(component);
      }

      if (route.redirectTo && /^\/.*/.test(route.redirectTo) && (index + 1) === pathList.length) {
        // this.needRedirectPath = route.redirectTo;
        const redirectToPathList = buildPath(route.redirectTo);
        routesList = findComponent(redirectToPathList, routes, rootModule);
        return;
      }
    }
  }
  return routesList;
}

function findComponent(routes, rootModule) {
  return routes.map(route => {
    if(route.component && rootModule.$components.find(component => component.$selector === route.component)) {
      return rootModule.$components.find(component => component.$selector === route.component);
    }
  })
}

module.exports = {
  buildPath,
  instantiateComponent,
  findRoutes,
  findComponent,
};