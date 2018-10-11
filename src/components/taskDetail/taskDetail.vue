<template>
  <div>
    <div class="header-top">
      <div class="header-wrapper">
        <div class="img-wrapper" @click="goback"><img src="../../assets/img/back.png" alt="" /></div>
        <div v-if="type ==='robTask'">抢任务</div>
        <div v-if="type==='myTask' && buttonText =='详情'">任务详情</div>
        <div v-if="type==='myTask' && buttonText =='提交'">提交任务</div>
      </div>
      <div class="space"></div>
    </div>
    <div class="taskCont">
      <div class='title'>
        <img :src="data.task.iconPath" alt="" class="tackImg left" />
        <div class="left titleCont">
          <h2>{{data.task.name}}</h2>
          <p class="orange">{{data.task.rewardNum}}
            <span v-if="data.task.rewardType=='1'">true</span>
            <span v-if="data.task.rewardType=='2'">ttr</span>
            <span v-if="data.task.rewardType=='3'">rmp</span>
          </p>
          <p>难度:<i class="orange"> {{data.task.level}}级</i> </p>
        </div>
      </div>
      <div class="content">
        <div class="cont-title">任务周期</div>
        <p>{{data.task.startDateTime}}至{{data.task.endDateTime}}</p>
        <div class="cont-title">人数限制</div>
        <p>{{data.task.peopleNum}}人</p>
        <div class="cont-title">任务描述</div>
        <div class="cont-detail">{{decodeURIComponent(decodeURIComponent(data.task.description))}}</div>
        <div class="cont-title">提交地址</div>
        <p>{{data.task.pushAddress}}</p>
      </div>
    </div>
    <div class='space'></div>

    <!-- 抢任务-任务列表过来 -->
    <div class="robTask" v-if=" type ==='robTask' || type== undefined ">
      <div class="cont-title">报名情况</div>
      <!-- 任务个人 -->
      <div v-for='item of data.taskDetailList' v-if="data.task.category=='0'">
        <div class="taskPer">需要{{item.peopleNum}}人，已报<span class="red">{{item.hasPeople}}</span>人</div>

      </div>
      <!-- 任务-团队 -->
      <div class="robTask-flex" v-for='item of data.taskDetailList' v-if="data.task.category=='1'">
        <div class="one">{{item.station}}</div>
        <div class="two">（需要{{item.peopleNum}}人，已报<span class="red">{{item.hasPeople}}</span>人）</div>
        <div class="three">{{item.rewardNum}}
          <span v-if="data.task.rewardType=='1'">true</span>
          <span v-if="data.task.rewardType=='2'">ttr</span>
          <span v-if="data.task.rewardType=='3'">rmp</span>
        </div>
        <div class="five" v-if="item.isFull!='1'" @click="holdTask(item)">抢任务</div>
        <div class="four" v-if="item.isFull=='1'">已满</div>
        <!-- <div class="four" v-if="!localStorage.token" to="/Login">注册</div>  -->
      </div>
      <div class="bottom">
        <div class='button one' @click="holdTask" v-if="data.task.category=='0' && data.isFull!='1' ">抢任务</div>
        <div class='button four' v-if="data.isFull=='1'">已满</div>
        <div class='button two' @click="recommend">推荐转发</div>
      </div>
    </div>
    <!-- 已经完成 -->
    <div class="bottom" v-if="type==='myTask' && buttonText =='详情'">
      <div class="cont-title">完成情况</div>
      <p><i>提交地址：</i>{{data.taskCompleteInfo.pushAddress}} </p>
      <p><i>说&nbsp;&nbsp;&nbsp;&nbsp;&nbsp;&nbsp; 明：</i>{{data.taskCompleteInfo.remark}} </p>
      <p><i>审核结果：</i>{{data.taskCompleteInfo.auditResult}} </p>
      <p><i>奖励收入：</i>{{data.taskCompleteInfo.rewardNum}}
        <span v-if="this.rewardType=='1'">true</span>
        <span v-if="this.rewardType=='2'">ttr</span>
        <span v-if="this.rewardType=='3'">rmp</span>
      </p>
    </div>
    <!-- 未完成待提交 -->
    <div class="bottom" v-if="type==='myTask' && buttonText =='提交' ">
      <input class="input-top inp" placeholder="提交地址" v-model="commitAddress" />
      <input class="input-bottom inp" placeholder="说明" v-model="remark" />
      <div class='button two' @click="commit">提交审核</div>
    </div>
    <div class='space'></div>
    <div class="tips" v-show="showss">{{tips}}</div>
  </div>
</template>

<script>
  import Bscroll from "better-scroll";
  import Tabs from "../tab/Tab";
  import axios from "axios";
  import wx from "weixin-js-sdk";
  export default {
    name: "TaskDetail",
    components: {
      Tabs
    },
    data() {
      return {
        userUid: '',
        data: {
          task: {
            // iconPath:'http://img1.qunarzz.com/piao/fusion/1710/a6/83f636bd75ae6302.png'
          }
        },
        type: "", // myTask--我的任务页面跳转    robTask-任务列表跳转
        roleList: [{}],
        buttonText: "", // 详情  提交
        showss: false,
        tips: "",
        commitAddress: "",
        remark: "",
        rewardType: "", //钱的种类
        unComplete: "" // 0-未提交，信息不完整，1-审核完成，-1 - 提交了未审核
      };
    },
    methods: {
      getLoginUser() {
        let url = "http://www.phptrain.cn/api/user/getLoginUser";
        this.$http.get(url).then(res => {
          if (res.data.message === "成功") {
            if (res.data.result) {
              this.unComplete = res.data.result.auditStatus;
            }
          }
        });
      },
      goback() {
        this.$router.go(-1);
      },
      getDetail() {
        let id = this.$router.history.current.params.id;
        let url =
          "http://www.phptrain.cn/api/unauth/task/getTaskInfo?taskId=" + id;
        var param = {
          taskId: id
        };
        this.$http
          .post(url, param, {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(res => {
            if (res.data.message === "成功") {
              if (res.data.result) {
                this.data = res.data.result;
              }
            } else {
              this.tips = res.data.message;
              this.showTips();
            }
          });
      },
      getUserTaskInfo() {
        let taskDetailId = this.$router.history.current.params.taskDetailId;
        let url =
          "http://www.phptrain.cn/api/task/getUserTaskInfo?taskDetailId=" +
          taskDetailId;
        var param = {
          taskDetailId: taskDetailId
        };
        this.$http
          .post(url, param, {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(res => {
            // debugger
            if (res.data.message === "成功") {
              if (res.data.result) {
                this.data = res.data.result;
              }
            } else {
              this.tips = res.data.message;
              this.showTips();
            }
          });
      },
      showTips(callback) {
        this.showss = true;
        var _this = this;
        setTimeout(function () {
          _this.showss = false;
          if (callback) {
            callback();
          }
        }, 1000);
      },
      holdTask(item) {
        if (!localStorage.token) {
          this.tips = "您尚未登录，请先登录";
          this.showTips();
          var _this = this;
          setTimeout(function () {
            _this.$router.push({
              path: "/login"
            });
          }, 1500);
          return;
        }
        if (this.unComplete == "0") {
          this.tips = "请先完善个人信息";
          this.showTips();
          var _this = this;
          setTimeout(function () {
            _this.$router.push({
              name: "PersonInformation",
              params: {
                userUid: _this.userUid,

              }
            });
          }, 2000);
          return;
        } else if (this.unComplete == "-1") {
          this.tips = "用户信息审核中暂不可抢任务";
          this.showTips();
          return;
        }

        let id = this.data.taskDetailList[0].id;
        if (item.id) {
          id = item.id;
        }
        let url = "http://www.phptrain.cn/api/task/holdTask?taskDetailId=" + id;
        var param = {
          taskDetailId: id
        };
        this.$http
          .post(url, param, {
            headers: {
              Token: "",
              Agent: "",
              "Content-Type": "application/json"
            }
          })
          .then(res => {
            if (res.data.message === "成功") {
              this.tips = "恭喜你！抢到任务 ";
              this.showTips();
              var _this = this;
              setTimeout(function () {
                _this.$router.push({
                  path: "/task"
                });
              }, 1500);
              return;
            } else {
              this.tips = res.data.message;
              this.showTips();
            }
          });
      },
      commit() {
        let taskDetailId = this.$router.history.current.params.taskDetailId;
        if (!this.commitAddress) {
          this.tips = "请输入提交地址 ";
          this.showTips();
          return;
        }
        let url = "http://www.phptrain.cn/api/task/commitUserTask";
        var param = {
          taskDetailId: taskDetailId,
          commitAddress: this.commitAddress,
          remark: this.remark
        };
        this.$http
          .post(url, param, {
            headers: {
              "Content-Type": "application/json"
            }
          })
          .then(res => {
            if (res.data.message === "成功") {
              this.tips = "提交成功";
              this.showTips();
              var _this = this;
              setTimeout(function () {
                _this.$router.push({
                  path: "/task"
                });
              }, 1500);
            } else {
              this.tips = res.data.message;
              this.showTips();
            }
          });
      },
      recommend() {
        this.tips = "请右上角点击分享";
        this.showTips();
        let us = location.href.split("#")[0];
        let url = "http://www.phptrain.cn/api/unauth/weixin/getWxSign";
        var param = new FormData();
        var that = this;
        param.append("url", us);
        this.$http.post(url, param, {}).then(res => {
          if (res.data.code === 200) {
            wx.config({
              debug: false, // 开启调试模式,调用的所有api的返回值会在客户端alert出来，若要查看传入的参数，可以在pc端打开，参数信息会通过log打出，仅在pc端时才会打印。
              appId: res.data.result.appId, // 必填，公众号的唯一标识
              timestamp: res.data.result.timestamp, // 必填，生成签名的时间戳
              nonceStr: res.data.result.nonceStr, // 必填，生成签名的随机串
              signature: res.data.result.signature, // 必填，签名
              jsApiList: ["onMenuShareAppMessage", "onMenuShareQQ"] // 必填，需要使用的JS接口列表
            });
            wx.ready(function () {
              wx.onMenuShareAppMessage({
                title: that.data.task.name, // 分享标题
                desc: decodeURIComponent(that.data.task.description),
                link: us, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: that.data.task.iconPath, // 分享图标
                success: function () {
                  // 用户点击了分享后执行的回调函数
                  alert("分享微信好友成功");
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                  alert("取消分享");
                }
              });
              wx.onMenuShareQQ({
                title: that.data.task.name, // 分享标题
                desc: decodeURIComponent(that.data.task.description),
                link: us, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: that.data.task.iconPath, // 分享图标
                success: function () {
                  // 用户确认分享后执行的回调函数
                  alert("分享QQ好友成功");
                },
                cancel: function () {
                  // 用户取消分享后执行的回调函数
                  alert("取消分享");
                }
              });
            });
          }
        });
      }
    },
    mounted() {
      this.userUid = this.$router.history.current.params.userUid
      this.getLoginUser();
      this.rewardType = this.$router.history.current.params.rewardType;
      this.type = this.$router.history.current.params.type;
      this.buttonText = this.$router.history.current.params.buttonText;
      if (this.type == "robTask") {
        this.getDetail();
      } else if (this.type == "myTask") {
        this.getUserTaskInfo();
      } else {
        this.getDetail();
      }
    }
  };

</script>

<style scoped lang="less">
.tips {
  position: absolute;
  background-color: #00aaee;
  color: white;
  text-align: center;
  width: 200px;
  padding: 20px 20px;
  word-break: break-all;
  left: 50%;
  top: 70%;
  margin-left: -100px;
  // margin-top: 20px;
  border-radius: 5px;
}

.space {
  background: #eee;
  height: 10px;
}

.left {
  float: left;
}

.right {
  float: right;
}

.cont-title {
  width: 60px;
  height: 14px;
  line-height: 14px;
  padding-left: 5px;
  margin-top: 20px;
  font-size: 14px;
  color: #00aaee;
  border-left: #00aaee solid 2px;
}

.orange {
  font-size: 15px;
  color: #ffae0f;
}

.red {
  color: #ef5a50;
}

.header-top {
  height: 50px;
  line-height: 50px;
  top: 0;
  left: 0;
  right: 0;

  .header-wrapper {
    text-align: center;

    .img-wrapper {
      position: absolute;
      width: 30px;
      left: 0;
      right: 0;

      img {
        width: 24px;
      }
    }
  }
}

.taskCont {
  padding: 15px;
  padding-bottom: 25px;
  font-size: 14px;
  font-family: MicrosoftYaHei;

  .title {
    padding-bottom: 15px;
    border-bottom: #e0e4e5 solid 1px;

    .tackImg {
      width: 100px;
      height: 100px;
      vertical-align: top;
    }

    .titleCont {
      margin-left: 20px;
      padding-top: 10px;
    }

    p {
      color: #a1acb4;
      font-size: 15px;
      margin-top: 10px;
    }

    .orange {
      font-size: 15px;
      color: #ffae0f;
    }

    overflow: hidden;
  }

  .content {
    p {
      margin: 15px 0 25px 0;
    }

    .cont-detail {
      font-size: 14px;
      margin-top: 15px;
    }
  }
}

.bottom {
  font-size: 14px;
  color: #2e353b;
  padding: 15px;

  p {
    margin-top: 20px;

    i {
      color: #a1acb4;
    }

    .orange {
      font-size: 15px;
      color: #ffae0f;
    }
  }

  .button {
    width: 100%;
    height: 40px;
    line-height: 40px;
    text-align: center;
    font-size: 18px;
    border-radius: 4px;
    margin-top: 15px;
  }

  .one {
    background-color: #ffae0f;
    color: #fff;
  }

  .two {
    background-color: #00aaee;
    color: #fff;
  }

  .three {
    border: #00aaee 1px solid;
    color: #00aaee;
  }

  .four {
    background-color: #e6e0e0;
  }

  input {
    width: 100%;
    // display: block;
  }

  .input-top {
    height: 40px;
  }

  .input-bottom {
    height: 125px;
  }

  .inp {
    font-size: 15px;
    background-color: #fafafa;
    border: 1px solid #e7e7e7;
    border-radius: 5px;
    margin-top: 20px;
    padding-left: 10px;
    box-sizing: border-box;
  }
}

.robTask {
  padding: 13px;

  .taskPer {
    font-size: 13px;
    margin-top: 10px;
    display: flex;
    height: 40px;
    border-bottom: 1px solid #e0e4e5;
  }

  .robTask-flex {
    font-size: 13px;
    margin-top: 23px;
    display: flex;
    height: 40px;
    border-bottom: 1px solid #e0e4e5;

    .one {
      flex: 3;
      padding-top: 5px;
    }

    .two {
      // flex: ;
      padding-top: 5px;
      color: #a1acb4;
    }

    .three {
      flex: 2;
      margin-left: 20px;
      text-align: center;
      padding-top: 5px;
      color: #ffae0f;
      font-size: 14px;
    }

    .four {
      flex: 2;
      margin-left: 20px;
      text-align: center;
      height: 30px;
      line-height: 30px;
      background-color: #e6e0e0;
      color: #a1acb4;
      border-radius: 5px;
    }

    .five {
      flex: 2;
      margin-left: 20px;
      text-align: center;
      height: 30px;
      line-height: 30px;
      background-color: #ffae0f;
      color: #fff;
      border-radius: 5px;
    }
  }
}
</style>
