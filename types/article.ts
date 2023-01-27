import { IRes } from '.'

export interface IData {
  title: string
  content: string
}
interface IResult {
  author: string
  title: string
}
interface Article {
  _id: string
  author: string
  createTime: number
  updateTime: number
  name: string
  _v: number
  tags: string[]
}
export type IArticleResult = IRes<IResult>
export type IArticle = IRes<Article[]>
