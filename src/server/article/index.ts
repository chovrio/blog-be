import request from '..'
import type { IArticle, IArticleResult, IData } from '~/article'

// 发布文章
export const publishArticle = async (data: IData) => {
  const res = await request.post<IArticleResult>({
    url: '/essay/publish',
    data,
    successMsg: '发布文章成功',
    errorMsg: '发布文章失败'
  })
  return res
}
// 获得所有文章
export const getAllArticle = async () => {
  const res = await request.get<IArticle>({
    url: '/essay/acquire'
  })
  return res
}
// 删除文章
export const deleteArticle = async (id: string) => {
  return await request.delete({
    url: `/essay/delete/${id}`,
    successMsg: '删除文章成功',
    errorMsg: '删除文章失败'
  })
}
// 获得指定文章
export const getArticleContent = async (id: string) => {
  return await request.get({
    url: `/essay/content/${id}`
  })
}
