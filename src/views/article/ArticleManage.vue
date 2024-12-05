<script setup>
import { ref } from 'vue'
import PageContainer from '@/components/PageContainer.vue'
import { Delete, Edit } from '@element-plus/icons-vue'
import { formatTime } from '@/utils/format.js'
import { artGetListService } from '@/api/article.js'
import ChannelSelect from '@/views/article/components/ChannelSelect.vue'
import ArticleEdit from '@/views/article/components/ArticleEdit.vue'

const articleList = ref([])

// 删除文章功能
const onDeleteArticle = (row) => {
  console.log(row)
}

// 分页功能参数
const params = ref({
  // 接口文档规定的参数，不能修改
  pagenum: 1, // 当前页码
  pagesize: 2, // 每页显示条数
  cate_id: '',
  state: '',
})

// 搜索逻辑功能 按照最新的条件，重新检索，从第一页开始展示
const onSearch = () => {
  params.value.pagenum = 1 // 重置为第一页
  getArticleList()
}
// 重置逻辑功能 将筛选条件清空，重新检索，从第一页开始展示
const onReset = () => {
  params.value.pagenum = 1 // 重置为第一页
  params.value.cate_id = '' // 重置分类id
  params.value.state = '' // 重置状态
  getArticleList()
}

// 分页逻辑处理
const onSizeChange = (size) => {
  // console.log('当前每页条数',size)
  params.value.pagenum = 1 // 重置为第一页
  params.value.pagesize = size
  // 基于最新的当前页 和 每一条数，渲染数据
  getArticleList()
}
const onCurrentChange = (page) => {
  // console.log(page)
  params.value.pagenum = page // 更新当前页码
  // 基于最新的当前页，渲染数据
  getArticleList()
}

// 基于params获取文章列表
const total = ref(0)
// loading 加载
const loading = ref(false)
const getArticleList = async () => {
  loading.value = true
  const res = await artGetListService(params.value)
  articleList.value = res.data.data
  total.value = res.data.total
  loading.value = false
}
getArticleList()

// 文章管理功能
const articleEditRef = ref()
// 添加逻辑
const onAddArticle = () => {
  articleEditRef.value.open({})
}
// 编辑逻辑
const onEditArticle = (row) => {
  articleEditRef.value.open(row)
}

// 添加或者编辑 成功的回调
const onSuccess = (type) => {
  if (type === 'add') {
    // 如果是添加，最好渲染最后一页
    const lastPage = Math.ceil((total.value + 1) / params.value.pagesize)
    // 更新成最大页码数，再渲染
    params.value.pagenum = lastPage
  }
  getArticleList() // 重新渲染
}
</script>

<template>
  <page-container title="文章管理">
    <template #extra>
      <el-button type="primary" @click="onAddArticle">添加文章</el-button>
    </template>

    <!--表单区域-->
    <el-form inline>
      <el-form-item label="文章分类:">
        <!--
          Vue2 =>v-model:value和 @input 的简写
          Vue3 =>v-model :modelValue 和@update:modelValue 的简写
        -->
        <channel-select v-model="params.cate_id"></channel-select>
      </el-form-item>
      <el-form-item label="发布状态:">
        <el-select v-model="params.state" placeholder="请选择文章状态" style="width: 200px">
          <el-option label="已发布" value="已发布"></el-option>
          <el-option label="草稿" value="草稿"></el-option>
        </el-select>
      </el-form-item>
      <el-form-item>
        <el-button @click="onSearch" type="primary">搜索</el-button>
        <el-button @click="onReset" type="info">重置</el-button>
      </el-form-item>
    </el-form>

    <!--表格区域  :loading="loading" 加载-->
    <el-table :loading="loading" :data="articleList">
      <el-table-column label="文章标题" prop="title">
        <template #default="{ row }">
          <!--:underline: 下划线-->
          <el-link type="primary" :underline="false">{{ row.title }}</el-link>
        </template>
      </el-table-column>
      <el-table-column label="分类" prop="cate_name"></el-table-column>
      <el-table-column label="发表时间" prop="pub_date">
        <template #default="{ row }">{{ formatTime(row.pub_date) }}</template>
      </el-table-column>
      <el-table-column label="状态" prop="state"></el-table-column>
      <!--利用作用域插槽row 可以获取当前衘的数据  => v-for 遍历 item-->
      <el-table-column label="操作">
        <template #default="{ row }">
          <el-button
            circle
            plain
            type="primary"
            :icon="Edit"
            @click="onEditArticle(row)"
          ></el-button>
          <el-button
            circle
            plain
            type="danger"
            :icon="Delete"
            @click="onDeleteArticle(row)"
          ></el-button>
        </template>
      </el-table-column>
    </el-table>

    <!--分页区域-->
    <el-pagination
      v-model:current-page="params.pagenum"
      v-model:page-size="params.pagesize"
      :page-sizes="[2, 3, 5, 10]"
      :background="true"
      layout="jumper, total, sizes, prev, pager, next"
      :total="total"
      @size-change="onSizeChange"
      @current-change="onCurrentChange"
      style="margin-top: 20px; justify-content: flex-end"
    >
    </el-pagination>

    <!--抽屉-->
    <article-edit ref="articleEditRef" @success="onSuccess"></article-edit>
  </page-container>
</template>

<style lang="scss" scoped></style>
