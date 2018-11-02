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
        <div class="captcha-box">
          <div style="width: 100%;">
            <el-input placeholder="图形验证码" v-model="captcha" style="width: 85%" type="text" />
          </div>
          <div class="captcha-img" @click="getCaptcha">
            <img :src="imgUrl" alt="">
          </div>
        </div>
        <div class="btn">
          <el-button type="primary" @click="login">登录</el-button>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import { loginApi } from '@/api'
  import { setStore } from '@/util'
  import { apiUrl } from '@/config/index.js'
  export default {
    data () {
      return {
        uname: '',
        upassword: '',
        captcha: null,
        verifyToken: null,
        imgUrl: null
      }
    },
    mounted () {
      this.getCaptcha()
    },
    methods: {
      async getCaptcha () {
        this.verifyToken = Math.random().toString(36).substr(2)
        this.imgUrl = `${apiUrl}/unauth/account/verifyCodeImage?verifyToken=${this.verifyToken}`
      },
      async login () {
        if (!this.uname.trim() || !this.upassword.trim()) {
          return alert('填写完整')
        }

        let formdata = new FormData()
        formdata.append('userName', this.uname)
        formdata.append('password', this.upassword)
        formdata.append('verifyCodeImage', this.captcha)
        formdata.append('verifyToken', this.verifyToken)

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
    .captcha-box {
      display: flex;
      align-content: center;
      align-items: center;
      .captcha-img {
        margin-top: 20px;
        margin-right: 25px;
        img {
          transform: scale(1.2)
        }
      }
    }
    width: 100%;
    height: 100%;
    background-color: #409EFF;
    display: flex;
    justify-content: center;
    align-items: center;

    .form {
      width: 400px;
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
