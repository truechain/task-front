<template>
  <div class="invite-reg-page">
    <div class="top">
        <p class="title">初链开发者平台</p>
        <p class="descr">文字介绍文字介绍文字介绍文字介绍文字介绍文字绍文字介绍文字介绍文字介绍文字介绍文字介绍文字介绍</p>
    </div>
    <div class="con">
      <div class="con-box">
        <div class="user-img">
          <img src="../../assets/img/user.png" >
        </div>
        <div class="user-descr">
          用户介绍用户介绍用户介用户介绍用户介绍用户介用户介绍用户介绍用户介绍
        </div>
        <div class="form-con">
          <div class="input-box">
            <input type="text" placeholder="输入您的手机号">
          </div>
          <div class="verify-human"></div>
          <div class="reg-btn-box">
            <div class="reg-btn">注册</div>
          </div>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  export default {
    name: 'InviteReg',
    inject: ['reload'],
    components: {},
    created() {},
    data() {
      return {
        userId:'',
      }
    },
    mounted() {
      setTimeout(() => {
        // this.getTaskInfo()
      }, 1000)
      console.log(this.$router)
    },
    methods: {
      
    },    
  }
</script>

<style lang="less" scoped>
.invite-reg-page {
  background-color: #02abee;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: flex-start;
  min-height: 100%;
}
.top {
  text-align: center;
  width: 100%;
  color:white;
  padding: 0px 30px;
  box-sizing: border-box;
  .title {
    font-size: 18px;
    line-height: 22px;
    font-weight: 600;
    margin: 22px 10px 15px;
  }
  .descr {
    font-size: 14px;
    line-height: 20px;
    text-align: left;
    margin: 0px 5px 15px;
  }
}
.con {
  width: 100%;
  padding: 0px 30px;
  box-sizing: border-box;
  .con-box {
    background-color: white;
    border-radius: 10px;
    padding: 10px 15px;
    .user-img {
      text-align: center;
      padding: 10px 0px 15px;
    }
    .user-descr{
      text-align: center;
      color: #2e353b;
      font-size: 13px;
      line-height: 20px;
      padding: 0px 0px 15px;
      border-bottom: 1px solid #ddd;
    }
    .form-con {
      padding: 15px 5px 10px;
    }
  }
}

.input-box {
  input {
    width: 100%;
    outline: none;
    box-shadow: none;
    box-sizing: border-box;
    border:1px solid #ddd;
    border-radius: 3px;
    padding: 10px 15px;
    font-size: 14px;
    line-height: 16px;
  }
}
.reg-btn-box {
  .reg-btn {
    text-align: center;
    width: 100%;
    background-color: #02abee;
    color: white;
    font-size: 14px;
    line-height: 16px;
    box-shadow: none;
    box-sizing: border-box;
    border-radius: 5px;
    padding: 10px 15px;
    margin: 15px auto 0px;
  }
}

.no-data {
  text-align: center;
  margin: 10px 0;
  font-size: 14px;
}

</style>
