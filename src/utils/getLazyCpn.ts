import { lazy } from 'react'

export const getLazyCpn = (path: string) => lazy(() => import(path))
