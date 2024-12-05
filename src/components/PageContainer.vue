<script setup>
defineProps({
  title: {
    required: true,
    type: String,
  },
})
</script>

<template>
  <el-card class="page-container">
    <template #header>
      <div class="header">
        <!-- 父传子 -->
        <span>{{ title }}</span>
        <div class="extra">
          <!-- 控制按钮 -->
          <slot name="extra"></slot>
        </div>
      </div>
    </template>
    <!-- 控制内容 -->
    <slot></slot>
  </el-card>
</template>

<style lang="scss" scoped>
.page-container {
  min-height: 100%;
  box-sizing: border-box;

  .header {
    display: flex;
    align-items: center;
    justify-content: space-between;
  }
}
</style>
