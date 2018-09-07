function buildPath(url) {
  const renderRouteList = url === '/' ? ['/'] : url.split('/');
  renderRouteList[0] = '/';
  return renderRouteList;
}

function findRoutes(pathList, routes, rootModule) {
  let routesList = [];

  for (let index = 0; index < pathList.length; index++) {
    const paths = pathList[index];
    if (index === 0) {
      const rootRoute = routes.find(route => route.path === `${paths}` || /^\/\:.+/.test(route.path));
      if (!rootRoute) {
        console.error('route error: wrong route instantiation in generalDistributeRoutes:', paths);
        return;
      }

      routesList.push(rootRoute);

      if (rootRoute.redirectTo && /^\/.*/.test(rootRoute.redirectTo) && (index + 1) === pathList.length) {
        const redirectToPathList = buildPath(route.redirectTo);
        routesList = findRoutes(redirectToPathList, routes, rootModule);
        return routesList;;
      }
    } else {
      const lastRoute = routesList[index - 1].children;
      if (!lastRoute || !(lastRoute instanceof Array)) {
        console.error('route error: routes not exit or routes must be an array!');
      }
      const route = lastRoute.find(r => r.path === `/${paths}` || /^\/\:.+/.test(r.path));
      if (!route) {
        console.error('route error: wrong route instantiation:', lastRoute);
        return;
      }

      if (!route.component && !route.redirectTo) {
        console.error(`route error: path ${route.path} need a component which has children path or need a  redirectTo which has't children path`);
        return;
      }

      routesList.push(route);

      if (route.redirectTo && /^\/.*/.test(route.redirectTo) && (index + 1) === pathList.length) {
        const redirectToPathList = buildPath(route.redirectTo);
        routesList = findRoutes(redirectToPathList, routes, rootModule);
        return routesList;
      }
    }
  }

  return routesList;
}

function findComponent(routes, rootModule) {
  return routes.map(route => {
    const com = rootModule.$components.find(component => component.$selector === route.component);
    if (route.component && com) {
      com.$components = rootModule.$components;
      return com;
    }
  })
}

module.exports = {
  buildPath,
  findRoutes,
  findComponent,
}