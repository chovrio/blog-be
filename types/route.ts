import type { RouteObject } from 'react-router-dom'
export type myRoute = RouteObject & {
  auth?: boolean
  purview: number
  children?: myRoute[]
}
