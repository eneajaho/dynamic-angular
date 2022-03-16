import { Component, Inject } from '@angular/core';
import { Route, Router } from '@angular/router';

import * as RoutesConfig from '@dynamica/config';
import { ROUTES_CONFIG } from '@dynamica/config';

import { ComponentLoader } from './component-loader';

@Component({
  selector: 'dyn-root',
  template: `
    <router-outlet></router-outlet>
  `
})
export class AppComponent {
  constructor(
    @Inject(ROUTES_CONFIG)
    public routesConfig: RoutesConfig.RoutesConfig,
    private router: Router
  ) {
    this.createRoutes(routesConfig);
  }

  private createRoutes(routesConfig: RoutesConfig.RoutesConfig) {
    const dynamicRoutes = this.createRouterRoutes(routesConfig.routes);
    this.router.resetConfig(dynamicRoutes);
    this.router.navigateByUrl('videos');
  }

  private createRouterRoutes(routes: RoutesConfig.Route[]): Route[] {
    return routes.map((route) => ({
      path: route.path.slice(1),
      component: ComponentLoader,
      data: route.data
    }));
  }
}
