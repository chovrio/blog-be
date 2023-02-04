import type { RouteObject } from 'react-router-dom'
export type myRoute = RouteObject & { auth?: boolean; children?: myRoute[] }
