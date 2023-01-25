import request from '..'
import type { IArticleResult, IData } from '~/article'

export const publishArticle = async (data: IData): Promise<IArticleResult> => {
  const res = await request.post({
    url: '/essay/publish',
    data
  })
  return res.data
}
