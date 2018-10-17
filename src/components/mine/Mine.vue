<template>
  <div>
    <!-- <div class="header-top">
      <div class="header-wrapper">
        <div class="img-wrapper" @click="goback"><img src="../../assets/img/back.png" alt="" /></div>
        <div>个人中心</div>
      </div>
      <div class="space"></div>
    </div> -->
    <div v-show="this.token">
      <div class="header" v-if="unComplete" >
        <div class="left">
          <img src="../../assets/img/user.png" alt="" class="userImg" />
          <div class="userRank">
             <p class="name">
               <span  v-text="mobile"></span>
               <span class="identity">（游客）</span>
             </p>
           <router-link :to="{path :'/personInformation',query: {userid: userId}}">
            <p class="addInfo">完善个人信息</p>
             </router-link>
          </div>
        </div>
      </div>
      <div class="header" v-if="!unComplete" >
        <div class="left">
          <img src="../../assets/img/user.png" class="userImg" />
          <div class="userRank">
            <p class="name" v-text="wxNickName"></p>
            <p class="rank">等级：<span v-if="level">{{level}}</span></p>
          </div>
        </div>
        
        <div class="right">
          <router-link to="recommend">
            <p class="info">成功推荐<span class="high-light">{{recommendPeople}}</span>人</p>
          </router-link>
          <p class="invite-btn" @click="invitePeople">邀请好友</p>
        </div>
        
      </div>
      <div class="space"></div>
      <div v-if="!unComplete"  >
        <ul class="navBar">
          <li class="item border-right" @click="tabs(index)" v-for="(item,index) of navs" :key="index" :class="{active:active==index}">
            <span class="num" v-text="item.num">
              <span class="unit">个</span>
            </span>
            <p class="name">{{item.name}}</p>
          </li>
        </ul>
        <div class="space space_"></div>
      </div>

      <div class="tabCon" ref="wrapper" v-if="!unComplete" >
        <div>

          <div class="tabConWrapper border-bottom" v-for='(itemCon,index) in tabContents' :key="index">
            <div class="contLeft">
              <p class="type">{{itemCon.rewardResource}}收入</p>
              <p class="date">{{itemCon.createTime}}</p>
            </div>
            <div class="contRight"><span v-if="itemCon.rewardNum">+</span>{{itemCon.rewardNum}}</div>
          </div>
        </div>

      </div>
    </div>
    <router-link to="Login">
      <div v-show="this.token === null" class="login-text">
        请先登录
      </div>
    </router-link>
    <tabs ></tabs>
  </div>
</template>

<script>
  import Tabs from '../tab/Tab'
  import axios from 'axios'
  import Bscroll from 'better-scroll'
  import wx from "weixin-js-sdk"

  export default {
    name: "Mine",
    inject:['reload'],
    components: {
      Tabs,
    },
    data() {
      return {
        taskType: '',
        tabContents: [],
        tempContents: [],
        active: 0,
        rewardType: 1,
        recommendPeople: 0,
        wxNickName: '',
        level: '',
        rewardResource: '',
        token: null,
        userId:'',
        mobile:'',
        unComplete:'',
        navs: [{
            id: '1',
            num: '',
            name: 'true奖励总数',
            type: 'true奖励'
          },
          {
            id: '2',
            num: '',
            name: 'ttr奖励总数',
            type: 'ttr奖励'
          },
          {
            id: '3',
            num: '',
            name: '红包奖励总数',
            type: '红包奖励'
          }
        ],
        tabContents: []
      }

    },
    methods: {
      clickTab(){
        this.reload()
      },
      goback() {
        this.$router.go(-1)
      },
      addInfo( id ){
         this.$router.push({name:"personinformation",params:{id:id}})
      },
      invitePeople(){
        let log = console.log;
        let shareImg = "";
        let shareTitle = "分享标题";
        let shareDescr = "分享描述分享描述分享描述分享描述分享描述分享描述";
        let shareUrl = location.href.split("#")[0]+'#/list';
        log(shareUrl)
        let wxSignUrl = "http://www.phptrain.cn/api/unauth/weixin/getWxSign";
        var formd = new FormData();
        formd.append("url", shareUrl);
        var that = this;        
        this.$http.post(wxSignUrl, formd, {}).then(res => {
          if (res.data.code === 200) { log(res);
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
                title: shareTitle, // 分享标题
                desc: decodeURIComponent(shareDescr),
                link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareImg, // 分享图标
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
                title: shareTitle, // 分享标题
                desc: decodeURIComponent(shareDescr),
                link: shareUrl, // 分享链接，该链接域名或路径必须与当前页面对应的公众号JS安全域名一致
                imgUrl: shareImg, // 分享图标
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
      },
      tabs(index) {
        this.tabIndex = index
        this.active = index
        var url = "http://www.phptrain.cn/api/user/getUserInfo?rewardType=1"
        var token = JSON.parse(localStorage.getItem("token"))

        if(index === 1) {
          url = "http://www.phptrain.cn/api/user/getUserInfo?rewardType=2"
        } else if(index === 2) {
          url = "http://www.phptrain.cn/api/user/getUserInfo?rewardType=3"
        } else {
          this.getIncomeInfo()
        }
        this.$http.get(url).then((res) => {
          console.log(res)
          if(res.data.code && res.data) {
            const result = res.data.result
            var dataList = result.userAccount.accountDetails
            if(dataList){
               dataList.forEach(function(list) {
              if(list.rewardResource === 1) {
                list.rewardResource = '推荐'
              }
              if(list.rewardResource === 2) {
                list.rewardResource = '任务'
              }
            })
            }

            this.tabContents = dataList
          }

        })
      },
      getIncomeInfo() {

        let token = localStorage.getItem("token");
        this.token = token
        console.log(this.token)
        let url = 'http://www.phptrain.cn/api/user/getUserInfo?rewardType=1'
        if(this.token) {
          this.$http.get(url).then((res) => {
            console.log(res.data,'00000')
            const result = res.data.result
            this.level = result.user.level
            this.mobile=result.user.mobile
            this.userId=result.user.id
            if(result.user.auditStatus==0){
              this.unComplete=true
            }

            this.recommendPeople = result.recommendPeople
            this.wxNickName = result.user.wxNickName
            this.navs[1].num = result.userAccount.ttrReward
            this.navs[2].num = result.userAccount.gitReward
            this.navs[0].num = result.userAccount.trueReward
            if(res.data.code && res.data) {
              var dataList = result.userAccount.accountDetails
              if(result.userAccount.accountDetails) {
                dataList.forEach(function(list) {
                  if(list.rewardResource === 1) {
                    list.rewardResource = '推荐'
                  }
                  if(list.rewardResource === 2) {
                    list.rewardResource = '任务'
                  }
                })
              }

              this.tabContents = dataList
            }
          }).catch((err) => {
            console.log(err)
          })
        }

      },
      handleChange(incomeType) {
        this.taskType = incomeType
        let result = []
        for(let i = 0; i < this.tabContents.length; i++) {
          if(this.tabContents[i].type == this.taskType) {
            result.push(this.tempContents[i])
          }
        }
        this.tempContents = result
      }
    },

    mounted() {
      this.getIncomeInfo()
      this.scroll = new Bscroll(this.$refs.wrapper)
    }

  }
</script>

<style scoped lang="less">
.space {
  background: #eee;
  height: 10px;
}
.login-text {
  text-decoration: underline;
  color: #02abee;
  display: flex;
  align-items: center;
  justify-content: center;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 60px;
  right: 0;
  font-size: 16px;
}
.space_ {
  position: fixed;
  top: 174px;
  left: 0;
  right: 0;
}
.identity {
  font-size: 14px;
}
.header-top {
  height: 50px;
  line-height: 50px;
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

.tabCon {
  overflow: hidden;
  position: absolute;
  left: 0;
  right: 0;
  bottom: 60px;
  top: 200px;
  .tabConWrapper {
    display: flex;
    padding: 0 15px;
    height: 60px;
    align-items: center;
    .contLeft {
      flex: 1;
      .type {
        font-size: 15px;
        color: #2e353b;
      }
      .date {
        color: #a1acb4;
        font-size: 12px;
        padding-top: 8px;
      }
    }
    .contRight {
      color: #2e353b;
      font-size: 14px;
    }
  }
}

.space {
  background: #eee;
  height: 10px;
}

.header {
  display: flex;
  padding: 12px 18px 12px 14px;
  align-items: center;
  .left {
    flex: 1;
    .userImg {
      width: 64px;
      height: 64px;
      border-radius: 50%;
      vertical-align: bottom;
    }
    .userRank {
      margin-left: 11px;
      display: inline-block;
      .name {
        color: #2e353b;
        font-size: 18px;
        margin-top: -55px;
      }
      .addInfo {
        color: #a1acb4;
        font-size: 14px;
      }
      .rank {
        color: #a1acb4;
        font-size: 14px;
        margin-top: 4px;
        span {
          color: #fc8936;
          border: 2px solid #fc8936;
          padding: 2px;
          border-radius: 50%;
          width: 12px;
          height: 12px;
          display: inline-block;
          text-align: center;
          line-height: 12px;
        }
      }
    }
  }
  .right {
    text-align: center;
    .high-light {
      color: #02abee;
      font-size: 14px;
      margin:0px 4px;
    }
    .info {
      color: #a1acb4;
      font-size: 12px;
    }
    .invite-btn{
      background-color: #02abee;
      color: white;
      text-align: center;
      border-radius: 5px;
      padding: 6px 15px;
      margin: 5px;
      font-size: 13px;
      line-height: 20px; 
    }
  }
}

.navBar {
  height: 76px;
  display: flex;
  text-align: center;
  background: #fff;
  .item {
    flex: 1;
    .num {
      color: #2e353b;
      font-size: 18px;
      padding-top: 20px;
      display: inline-block;
      .unit {
        font-size: 12px;
      }
    }
    &.active {
      .num {
        color: #02abee;
      }
    }
    &.active:after {
      content: '';
      border-bottom: 2px solid #02abee;
      width: 100%;
      height: 2px;
      position: absolute;
      bottom: 0;
      left: 0;
    }
    .name {
      color: #a1acb4;
      font-size: 12px;
      margin-top: 2px;
    }
  }
}
</style>
