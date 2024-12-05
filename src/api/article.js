import request from '@/utils/request'

// 获取文章分类
export const artGetChannelsService = () => {
  return request.get('/my/cate/list')
}

// 添加文章分类
export const artAddChannelsService = (data) => {
  return request.post('/my/cate/add', data)
}

// 编辑文章分类
export const artEditChannelsService = (data) => {
  return request.put('/my/cate/info', data)
}
// 删除文章分类
export const artDelChannelService = (id) => {
  return request.delete('/my/cate/del', {
    params: { id },
  })
}

// 2.文章管理
// 获取文章列表
export const artGetListService = (params) => {
  return request.get('/my/article/list', { params })
}

// 添加文章
// 注意: data需要一个formDate格式的对象
export const artPublishService = (data) => {
  return request.post('/my/article/add', data)
}

// 获取文章详情接口
export const artGetDetailService = (id) => {
  return request.get('/my/article/info', {
    params: { id },
  })
}

// 编辑文章接口
export const artEditService = (data) => {
  return request.put('/my/article/info', data)
}
