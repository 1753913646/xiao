<script setup>
import PageContainer from '@/components/PageContainer.vue'
import { ref } from 'vue'
import { artDelChannelService, artGetChannelsService } from '@/api/article'
import { Delete, Edit } from '@element-plus/icons-vue'
import ChannelEdit from '@/views/article/components/ChannelEdit.vue'
import { ElMessage, ElMessageBox } from 'element-plus'

// 弹窗显示
const dialog = ref()

// 获取频道列表
const channelList = ref([])
const loading = ref(false) // 缓存加载效果
const getChannelList = async () => {
  loading.value = true
  const res = await artGetChannelsService()
  channelList.value = res.data.data
  loading.value = false
  console.log(channelList.value)
}
getChannelList()

// 编辑功能
const onEditChannel = (row) => {
  dialog.value.open(row)
}

// 删除功能
const onDelChannel = async (row) => {
  await ElMessageBox.confirm('你确认删除该分类信息吗？', '温馨提示', {
    type: 'warning',
    confirmButtonText: '确认',
    cancelButtonText: '取消'
  })
  await artDelChannelService(row.id)
  ElMessage({ type: 'success', message: '删除成功' })
  getChannelList()  // 刷新列表
}

// 添加分类
const onAddChannel = () => {
  dialog.value.open({ })
}

// 添加成功 反馈 ===> ChannelEdit 组件
const onSuccess = () => {
  getChannelList()
}
</script>

<template>
  <page-container title="文章分类">
    <template #extra>
      <el-button type="primary" @click="onAddChannel">添加分类</el-button>
    </template>

    <el-table v-loading="loading" :data="channelList" style="width: 100%">
      <!-- type="index"列表序号  prop=>获取数据 -->
      <el-table-column type="index" label="序号" width="100"></el-table-column>
      <el-table-column prop="cate_name" label="分类名称"></el-table-column>
      <el-table-column prop="cate_alias" label="分类别名"></el-table-column>
      <el-table-column label="操作" width="100">
        <!-- row 就是 channelList 的一项， $index 下标-->
        <template #default="{ row, $index }">
          <!-- circle:圆形 plain: 镂空  -->
          <el-button
            @click="onEditChannel(row, $index)"
            type="primary"
            :icon="Edit"
            circle
            plain
          ></el-button>
          <el-button
            @click="onDelChannel(row, $index)"
            type="danger"
            :icon="Delete"
            circle
            plain
          ></el-button>
        </template>
      </el-table-column>
      <!-- 如果没有数据，就显示空状态 -->
      <template #empty>
        <el-empty description="没有数据,空空如也~"></el-empty>
      </template>
    </el-table>

    <!-- 添加分类/编辑 =>弹窗 -->
    <channel-edit ref="dialog" @success="onSuccess"></channel-edit>
  </page-container>
</template>
