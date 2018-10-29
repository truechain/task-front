<template>
  <div class="login">
    <div class="form">
      <div>
        <el-input placeholder="请输入内容" v-model="uname">
          <template slot="prepend">用户名:</template>
        </el-input>
        <el-input placeholder="请输入内容" v-model="upassword" type="password">
          <template slot="prepend">密&nbsp;&nbsp;&nbsp;码:</template>
        </el-input>
        <div class="btn">
          <el-button type="warning">重置</el-button>
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { loginApi } from '@/api'
  import { setStore } from '@/util'
  export default {
    data () {
      return {
        uname: '',
        upassword: ''
      }
    },
    methods: {
      async login () {
        if (!this.uname.trim() || !this.upassword.trim()) {
          return alert('填写完整')
        }

        let formdata = new FormData()
        formdata.append('userName', this.uname)
        formdata.append('password', this.upassword)

        const { token, userUid, agent } = await loginApi(formdata)

        setStore('token', token)
        setStore('userUid', userUid)
        setStore('agent', agent)

        this.$router.push({
          path: '/home'
        })
      }
    }
  }
</script>
<style lang="less" scoped>
  .login {
    width: 100%;
    height: 100%;
    background-color: #409EFF;
    display: flex;
    justify-content: center;
    align-items: center;

    .form {
      width: 400px;
      height: 250px;
      background-color: aliceblue;
      border-radius: 5px;
      padding: 20px;
      box-sizing: border-box;

      .el-input {
        margin-top: 20px;
      }

      .btn {
        margin-top: 50px;
        display: flex;
        justify-content: space-around;

        .el-button {
          width: 150px;
        }
      }
    }
  }

</style>
