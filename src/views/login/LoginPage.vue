<script setup>
import { User, Lock, Avatar } from '@element-plus/icons-vue'
import { ref, watch } from 'vue'
import { userRegisterService, userLoginService } from '@/api/user'
import { ElMessage } from 'element-plus'
import { useUserStore } from '@/stores'
import { useRouter } from 'vue-router'

const isRegister = ref(false) // 切换登录/注册页面
const form = ref() // 用于获取表单的实例对象

// 用于提交整个form表单的数据对象
const formModel = ref({
  username: '123123xiao',
  password: '123123',
  repassword: '',
})

// 用于校验整个form表单的规则对象
// 1.非空校验 required:true message消息提示，trigger触发校验的时机blur change
// 2.长度校验 min:xx，max:xx
// 3.正则校验pattern:正则规则  \S表示非空
// 4.自定义校验 =>自己写逻辑校验(校验函数)
// validator:(rule,value,callback)
//    (1)rule 当前校验规则相关的信息
//    (2)value 所校验的表单元素目前的表单值
//    (3)callback无论成功还是失败，都需要 callback 回调
//      -callback()校验成功
//      -callback(new Error(错误信息))校验失败
const rules = {
  username: [
    // change 实时校验，当输入内容为空时，则提示
    { required: true, message: '请输入用户名', trigger: 'blur' },
    { min: 5, max: 10, message: '用户名长度必须在 5-10位 字符', trigger: 'blur' },
  ],
  password: [
    // blur失去焦点
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^\S{6,12}$/, message: '密码长度必须在 6-12位 字符', trigger: 'blur' },
  ],
  repassword: [
    // blur失去焦点
    { required: true, message: '请输入密码', trigger: 'blur' },
    { pattern: /^\S{6,12}$/, message: '密码长度必须在 6-12位 字符', trigger: 'blur' },
    {
      validator: (rule, value, callback) => {
        if (value !== formModel.value.password) {
          callback(new Error('两次密码输入不一致'))
        } else {
          callback() // 就算校验成功，也需要callback
        }
      },
    },
  ],
}

// 注册成功之前，先进行校验，校验成功→请求，校验失败→自动提示
const register = async () => {
  await form.value.validate()
  await userRegisterService(formModel.value)
  ElMessage.success('注册成功')
  isRegister.value = false
}

const userStore = useUserStore()
const router = useRouter()
const login = async () => {
  await form.value.validate()
  const res = await userLoginService(formModel.value)
  userStore.setToken(res.data.token)
  ElMessage.success('登录成功!')
  // console.log(res.data.message)
  router.push('/')
}

// 切换的时候，重置表单内容
watch(isRegister, () => {
  formModel.value = {
    username: '',
    password: '',
    repassword: '',
  }
})
</script>

<template>
  <el-row class="login-page">
    <!--
      el-row表示一行，一行分成24份
      el-col表示列
        (1):span="12"代表在一行中，占12份(50%)
        (2):span="6"表示在一行中，占6份(25%)
        (3):offset="3”代表在一行中，左侧margin份数

        el-form 整个表单组件
        el-form-item 表单的一行 (一个表单域)
        el-input 表单元素(输入框)

       2.校验相关
        (1) el-form =>:model="ruleForm"     绑定的整个form的数据对象{xxx，xxX，Xxx}
        (2) el-form =>:rules="rules"        绑定的整个rules的规则对象{xxx，xxx，xxx}
        (3) 表单元素 =>v-model="ruleForm.xxx”给表单元素，绑定form的子属性
        (4) el-form-item =>prop配置生效的是哪个校验规则(和rules中的字段要对应)
     -->
    <el-col :span="12" class="bg"></el-col>
    <el-col :span="6" :offset="3" class="form">
      <!-- 注册相关表单 -->
      <el-form
        :model="formModel"
        :rules="rules"
        ref="form"
        size="large"
        autocomplete="off"
        v-if="isRegister"
      >
        <el-form-item>
          <h1>注册</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="Avatar"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            :prefix-icon="Lock"
            placeholder="请输入密码"
            type="password"
          >
          </el-input>
        </el-form-item>
        <el-form-item prop="repassword">
          <el-input
            v-model="formModel.repassword"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入再次密码"
          ></el-input>
        </el-form-item>
        <el-form-item>
          <el-button @click="register" class="button" type="primary" auto-insert-space>
            注册
          </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = false"> ← 返回</el-link>
        </el-form-item>
      </el-form>

      <!-- 登录相关表单 -->
      <el-form :model="formModel" :rules="rules" ref="form" size="large" autocomplete="off" v-else>
        <el-form-item>
          <h1>登录</h1>
        </el-form-item>
        <el-form-item prop="username">
          <el-input
            v-model="formModel.username"
            :prefix-icon="User"
            placeholder="请输入用户名"
          ></el-input>
        </el-form-item>
        <el-form-item prop="password">
          <el-input
            v-model="formModel.password"
            name="password"
            :prefix-icon="Lock"
            type="password"
            placeholder="请输入密码"
          ></el-input>
        </el-form-item>
        <el-form-item class="flex">
          <div class="flex">
            <el-checkbox>记住我</el-checkbox>
            <el-link type="primary" :underline="false">忘记密码?</el-link>
          </div>
        </el-form-item>
        <el-form-item>
          <el-button @click="login" class="button" type="primary" auto-insert-space> 登录 </el-button>
        </el-form-item>
        <el-form-item class="flex">
          <el-link type="info" :underline="false" @click="isRegister = true"> 注册 →</el-link>
        </el-form-item>
      </el-form>
    </el-col>
  </el-row>
</template>

<style lang="scss" scoped>
.login-page {
  height: 100vh;
  background-color: #fff;

  .bg {
    background:
      url('@/assets/logo2.png') no-repeat 60% center / 240px auto,
      url('@/assets/login_bg.jpg') no-repeat center / cover;
    border-radius: 0 20px 20px 0;
  }

  .form {
    display: flex;
    flex-direction: column;
    justify-content: center;
    user-select: none;

    .title {
      margin: 0 auto;
    }

    .button {
      width: 100%;
    }

    .flex {
      width: 100%;
      display: flex;
      justify-content: space-between;
    }
  }
}
</style>
