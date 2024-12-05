<script setup>
/*
  在 Vue3 CompositionAPI 中
    1.获取路由对象 router useRouter
      const router =useRouter
    2.获取路由参数 routeuseRoute
      const route =useRoute()
*/

import zhCn from 'element-plus/es/locale/lang/zh-cn'

</script>

<template>
  <div>
    <!-- 国际化处理 配置中文 -->
    <el-config-provider :locale="zhCn">
      <!-- App.vue只需要留一个路由出口 router-view即可 -->
      <router-view></router-view>
    </el-config-provider>
  </div>
</template>

<style scoped>

</style>
