import request from '..'
import type { IArticle, IArticleResult, IData } from '~/article'

// 发布文章
export const publishArticle = async (data: IData): Promise<IArticleResult> => {
  const res = await request.post({
    url: '/essay/publish',
    data,
    successMsg: '发布文章成功',
    errorMsg: '发布文章失败'
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
// 删除文章
export const deleteArticle = async (id: string) => {
  return await request.delete({
    url: `/essay/delete/${id}`,
    successMsg: '删除文章成功',
    errorMsg: '删除文章失败'
  })
}
