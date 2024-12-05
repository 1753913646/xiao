<script setup>
import { artGetChannelsService } from '@/api/article.js'
import { ref } from 'vue'

const channelList = ref([])
const getChannelList = async () => {
  const res = await artGetChannelsService()
  channelList.value = res.data.data
}
getChannelList()

defineProps({
  modelValue: {
    type: [String, Number],
  },
  width: {
    type: String,
  },
})
const emit = defineEmits(['update:modelValue'])
</script>

<template>
  <!--style="width: 200px"-->
  <!--label 展示给用户看的，value 收集起来提交给后台的-->
  <el-select
    :modelValue="modelValue"
    @update:modelValue="emit('update:modelValue', $event)"
    :style="{ width }"
    style="width: 200px"
  >
    <el-option
      v-for="channel in channelList"
      :key="channel.id"
      :label="channel.cate_name"
      :value="channel.id"
    >
    </el-option>
  </el-select>
</template>

<style scoped>

</style>
