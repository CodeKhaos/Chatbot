/* prettier-ignore-start */

/* eslint-disable */

// @ts-nocheck

// noinspection JSUnusedGlobalSymbols

// This file is auto-generated by TanStack Router

// Import Routes

import { Route as rootRoute } from '../server/routes/__root'
import { Route as RewardsImport } from '../server/routes/rewards'
import { Route as RedemptionsImport } from '../server/routes/rewardRedemptions'
import { Route as AblyImport } from '../server/routes/ably'

// Create/Update Routes

const RewardsRoute = RewardsImport.update({
  path: '/rewards',
  getParentRoute: () => rootRoute,
} as any)

const RedemptionsRoute = RedemptionsImport.update({
  path: '/rewardRedemptions',
  getParentRoute: () => rootRoute,
} as any)

const AblyRoute = AblyImport.update({
  path: '/ably',
  getParentRoute: () => rootRoute,
} as any)

// Populate the FileRoutesByPath interface

declare module '@tanstack/react-router' {
  interface FileRoutesByPath {
    '/ably': {
      preLoaderRoute: typeof AblyImport
      parentRoute: typeof rootRoute
    }
    '/redemptions': {
      preLoaderRoute: typeof RedemptionsImport
      parentRoute: typeof rootRoute
    }
    '/rewards': {
      preLoaderRoute: typeof RewardsImport
      parentRoute: typeof rootRoute
    }
  }
}

// Create and export the route tree

export const routeTree = rootRoute.addChildren([
  AblyRoute,
  RedemptionsRoute,
  RewardsRoute,
])

/* prettier-ignore-end */
