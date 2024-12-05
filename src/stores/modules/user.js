import { defineStore } from 'pinia'
import { ref } from 'vue'
import { userGetInfoService } from '@/api/user.js'

// 用户模块 token setToken removeToken
export const useUserStore = defineStore(
  'big_user',
  () => {
    const token = ref('')

    // 设置token
    const setToken = (newValue) => {
      token.value = newValue
    }

    // 移除token
    const removeToken = () => {
      token.value = ''
    }

    // 获取个人信息
    const user = ref({})
    const getUser = async () => {
      const res = await userGetInfoService()
      user.value = res.data.data
    }

    // 退出登录
    const setUser = (obj) => {
      user.value = obj
    }

    // 导出方法
    return {
      token,
      setToken,
      removeToken,
      user,
      getUser,
      setUser,
    }
  },
  {
    persist: true, // 持久化
  },
)
