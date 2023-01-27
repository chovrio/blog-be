import request from '..'
import type { IArticle, IArticleResult, IData } from '~/article'

// 发布文章
export const publishArticle = async (data: IData): Promise<IArticleResult> => {
  const res = await request.post({
    url: '/essay/publish',
    data
  })
  return res.data
}
// 获得所有文章
export const getAllArticle = async (): Promise<IArticle> => {
  const res = await request.get({
    url: '/essay/acquire'
  })
  return res.data
}
