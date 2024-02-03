/**
 * reuse-strategy.ts
 * by corbfon 1/6/17
 */

import { Injectable } from '@angular/core';
import {
  ActivatedRouteSnapshot,
  RouteReuseStrategy,
  DetachedRouteHandle,
} from '@angular/router';

/** Interface for object which can store both:
 * An ActivatedRouteSnapshot, which is useful for determining whether or not you should attach a route (see this.shouldAttach)
 * A DetachedRouteHandle, which is offered up by this.retrieve, in the case that you do want to attach the stored route
 */
interface RouteStorageObject {
  snapshot: ActivatedRouteSnapshot;
  handle: DetachedRouteHandle;
}
@Injectable({
  providedIn: 'root',
})
export class CustomRouteReuseStrategy implements RouteReuseStrategy {
  private storedRoutes: { [key: string]: RouteStorageObject } = {};

  private acceptedRoute: string = 'home/search/:item';

  shouldDetach(route: ActivatedRouteSnapshot): boolean {
    // Check if the route is the accepted route
    return route.routeConfig?.path === this.acceptedRoute || false;
  }

  store(route: ActivatedRouteSnapshot, handle: DetachedRouteHandle): void {
    // Store the accepted route by its path
    this.storedRoutes[route.routeConfig!.path!] = {
      snapshot: route,
      handle: handle,
    };
  }

  shouldAttach(route: ActivatedRouteSnapshot): boolean {
    // Check if the route is the accepted route and if it has been stored
    return !!route.routeConfig && !!this.storedRoutes[route.routeConfig.path!];
  }

  retrieve(route: ActivatedRouteSnapshot): DetachedRouteHandle | null {
    // Retrieve the stored accepted route by its path
    return this.storedRoutes[route.routeConfig!.path!]?.handle || null;
  }

  shouldReuseRoute(
    future: ActivatedRouteSnapshot,
    current: ActivatedRouteSnapshot
  ): boolean {
    // Check if the future and current routes have the same path
    return future.routeConfig === current.routeConfig;
  }
}
