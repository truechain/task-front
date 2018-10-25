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
  import {
    loginApi
  } from '@/api/GaoAPI.js'
  export default {
    data () {
      return {
        uname: '',
        upassword: ''
      }
    },
    methods: {
      login () {
        if (!this.uname || !this.upassword) {
          alert('填写完整')
          return
        }
        var formdata = new FormData()
        formdata.append('userName', this.uname)
        formdata.append('password', this.upassword)
        let url = loginApi
        this.$http.post(url, formdata, {

        }).then(res => {
          console.log(res)
          if (res.data.message === '成功') {
            let token = JSON.stringify(res.data.result)
            localStorage.setItem('token', token)
            // 跳转到首页
            this.$router.push({
              path: '/home'
            })
          } else {
            alert(res.data.message)
          }
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
