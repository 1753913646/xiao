import axios from 'axios'
import { useUserStore } from '@/stores'
import { ElMessage } from 'element-plus'
import router from '@/router/index.js'
const baseURL = 'http://big-event-vue-api-t.itheima.net'

const instance = axios.create({
  // TODO 1. 基础地址，超时时间
  baseURL,
  timeout: 10000,
})

// 请求拦截器
instance.interceptors.request.use(
  (config) => {
    // TODO 2. 携带token
    const useStore = useUserStore()
    if (useStore.token) {
      // 携带请求头 Header 参数，此处自定义为：Authorization
      config.headers.Authorization = useStore.token
    }
    return config
  },
  (err) => Promise.reject(err),
)

// 响应拦截器
instance.interceptors.response.use(
  (res) => {
    // TODO 4. 摘取核心响应数据  根据接口来的：res.data.code
    if (res.data.code === 0){
      return res
    }

    // TODO 3. 处理业务失败 给出错误提示，抛出错误
    ElMessage.error(res.data.message || '服务异常') // 提示
    return Promise.reject(res.data) // 抛出错误
  },
  (err) => {
    // TODO 5. 处理401错误
    // 错误的特殊情况  401 => 权限不足  或 token 过期 => 拦截登录
    if (err.response?.status === 401) { // ?表示可选
      router.push('/login') // 跳转到登录页面
    }

    // 错误的默认情况 => 只要给提示
    ElMessage.error(err.response.data.message || '服务异常') // 提示
    return Promise.reject(err)
  },
)

export default instance

export { baseURL }
