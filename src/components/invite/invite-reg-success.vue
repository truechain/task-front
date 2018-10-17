<template>
  <div class="invite-reg-success">
    <div class="con">
      <div class="con-box">
        <div class="sign-img">
          <img src="../../assets/img/user.png" >
        </div>
        <div class="descr">
          <p>恭喜您注册成功！</p>
          <p class="line2">快扫下面的公众号二维码抢开发任务吧！</p>
        </div>
        <div class="qr-con">
          <img src="../../assets/img/user.png" class="qr">
          <p class="text1">
            关注公众号， 点击初链开发者平台，
          </p>
          <p class="text1">
            完善个人信息就可以抢任务啦！
          </p>
        </div>
      </div>
    </div>
  </div>
</template>
<script>
  import Bscroll from 'better-scroll'
  export default {
    name: 'InviteRegSuccess',
    inject: ['reload'],
    components: {},
    created() {
      console.log(this.$router)
    },
    mounted() {
      setTimeout(() => {
      }, 1000)
      this.userUid=this.$router.history.current.params.userUid
    },
    data() {
      return {
        userId:'',
        taskType: '',
        taskList: [], //原始列表
        tempTaskList: [], //临时列表
        pageIndex: 1,
        pageSize: 20,
        hasData: false,
        hasCode: true,
        pulldown: true,
        pullup: true,
        totalPages: 1,
        Islast: '',
        ListSort: '',
        isTeam: false,
        taskReward: '',
        taskCategory: 2,
        taskSort: '',
        clientHeight: document.documentElement.clientHeight - 60,
      }
    },

    methods: {
      goback() {
        this.$router.go(-1)
      },
    }
  }
</script>

<style lang="less" scoped>
.invite-reg-success {
  background-color: #02abee;
  min-height: 100%;
  display: flex;
  flex-direction: column;
  align-items: center;
  justify-content: center;
  min-height: 100%;
}

.con {
  width: 100%;
  padding: 0px 30px;
  box-sizing: border-box;
  .con-box {
    background-color: white;
    border-radius: 10px;
    padding: 10px 15px;
    .sign-img {
      text-align: center;
      padding: 10px 0px 20px;
      margin-top: -50px;
    }
    .descr{
      text-align: center;
      color: #2e353b;
      font-size: 13px;
      line-height: 20px;
      padding: 0px 0px 20px;
      border-bottom: 1px solid #ddd;
    }
    .qr-con {
      padding: 15px 20px 10px;
      text-align: center;
    }
  }
}
.qr{
  margin: 10px 10px 20px;
}
.text1{
  font-size: 13px;
  color: #2e353b;
  line-height: 20px;
}
.no-data {
  text-align: center;
  margin: 10px 0;
  font-size: 14px;
  line-height: 22px;
}
</style>
