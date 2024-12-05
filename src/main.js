import { createApp } from 'vue'
import App from './App.vue'
import router from './router'
import '@/assets/main.scss'
// import pinia from '@/stores/index'
import pinia from '@/stores' // 配置了将index.js作为唯一出口导出
import 'element-plus/theme-chalk/index.css' // 引入element-plus的样式 否则样式可能不生效

const app = createApp(App)

// 插件初始化
app.use(pinia)
app.use(router)
app.mount('#app')
