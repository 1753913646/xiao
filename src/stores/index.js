
import { createPinia } from 'pinia'
// 引入插件
import persist from 'pinia-plugin-persistedstate'

const pinia = createPinia()
pinia.use(persist)

export default pinia

// 按需导出
export * from './modules/user.js'
