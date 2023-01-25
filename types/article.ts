import { IRes } from '.'

export interface IData {
  title: string
  content: string
}
interface IResult {
  author: string
  title: string
}
export type IArticleResult = IRes<IResult>
