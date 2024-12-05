import {defineStore} from 'pinia'
import {ref} from 'vue'

// 数字计数器
export const useConstStore = defineStore('big_count', () => {
  const count = ref(100)

  const addCount = (num) => {
    count.value += num
  }
  // 导出方法
  return {
    count,
    addCount
  }
})
