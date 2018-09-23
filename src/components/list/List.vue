<template>
  <div>
    <!-- <div class="header-top">
      <div class="header-wrapper">
        <div class="img-wrapper"  @click="goback"><img src="../../assets/img/back.png" alt="" /></div>
       <div>任务列表</div>
      </div>
      <div class="space"></div>
    </div> -->
    <list-header @change="hanleSelectTack" @fetch="handleFetch"></list-header>

    <scroll class="wrapper" ref="wrapper" :data="tempTaskList" :totalSize="totalPages" :pageIndex="pageIndex" :last="Islast" :pulldown="pulldown" :pullup="pullup" @pulldown="getTaskInfo" @scrollToEnd="loadMore">
      <div class="list" ref="list">
        <div class="item  border-bottom" v-for="item of tempTaskList">
          <div class="top" :class="{teamMark:item.isTeam}">
            <img :src="item.iconPath" alt="" class="tackImg" />
            <div class="task-rank">
              <div class="name-wrapper">
                <p class="name">{{item.name}}</p>
              </div>

              <p class="rank">难度：<span>{{item.level}}级</span></p>
            </div>
          </div>
          <div class="bottom">
            <div class="center">{{item.rewardNum}}True</div>
            <div class="right" @click="buttonClick(item)">抢任务</div>
          </div>
        </div>

      </div>
      <div class="no-data" v-show="hasData">没有找到符合条件的任务</div>
      <div style="height: 50px;"></div>

    </scroll>

    <div class="loading-container" v-show="hasCode">
      <loading></loading>
    </div>
    <tabs @clickTab="clickTab"></tabs>
  </div>
</template>
<script>
  import Bscroll from 'better-scroll'
  import ListHeader from './Header'
  import Tabs from '../tab/Tab'
  import Scroll from '../scroll/Scroll'
  import Loading from '../../base/loading/Loading'
  export default {
    name: 'List',
    inject: ['reload'],
    components: {
      ListHeader,
      Tabs,
      Loading,
      Scroll
    },
    created() {
      console.log(2345)
      console.log(this.$router)
      this.listenScroll = true
    },
    data() {
      return {
        userUid:'',
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
      clickTab() {
        this.reload()
      },
      //重新筛选完回到顶部
      scrollTo() {
        this.$refs.wrapper.scrollTo(0, 0, 10, 'bounce')
      },
      goback() {
        this.$router.go(-1)
      },
      getTaskInfo() {
        let url = "http://www.phptrain.cn/api/unauth/task/getTaskPage"
        var param = new FormData()
        this.pageIndex = 1
        this.totalPages = 1
        this.pullup = true
        if(this.taskCategory !== 2) {
          param.append("category", this.taskCategory)
        }
        if(this.taskType !== '') {

          param.append("level", this.taskType)
        }
        if(this.taskSort !== '') {
          param.append("reward", this.ListSort)
        }

        param.append("pageIndex", this.pageIndex)
        param.append("pageSize", this.pageSize)

        this.$http.post(url, param).then((res) => {
          if(res.data.code && res.data) {
            if(res.data.code) {
              this.hasCode = false
            }
            const data = res.data.result
            data.content.forEach(function(list) {
              if(list.category == 1) {
                list.isTeam = true
              }

            })
            this.taskList = data.content

            this.tempTaskList = data.content
            this.totalPages = data.totalPages
            if(this.pageIndex == this.totalPages && data.last) {
              this.pullup = false
              this.$nextTick(() => {
                this.hasCode = false;
              })
            }

          }
        })
      },
      loadMore() {
        let url = "http://www.phptrain.cn/api/unauth/task/getTaskPage"
        if(this.pageIndex < this.totalPages) {
          this.pageIndex++
        } else {
          this.pageIndex = this.totalPages
        }
        var param = new FormData()
        param.append("pageIndex", this.pageIndex)
        param.append("pageSize", this.pageSize)

        if(this.ListSort !== '') {
          param.append("reward", this.ListSort)
        }

        if(this.pullup) {
          this.$http.post(url, param, {
            headers: {
              'Content-Type': 'application/json'
            }
          }).then((res) => {
            const data = res.data.result
            var result = data.content
            this.tempTaskList = this.tempTaskList.concat(result)
            if(this.pageIndex == this.totalPages && data.last) {
              this.pullup = false
              this.$nextTick(() => {
                this.hasCode = false;
              })
            }
          })
        }

      },

      handleFetch() {
        this.hasData = false
        this.getTaskInfo()
      },
      buttonClick(item) {
        
        let id = item.id
        let rewardType = item.rewardType
        
        this.$router.push({
          name: "TaskDetail",
          params: {
            id: id,
            type: 'robTask',
            rewardType: rewardType,
            userUid:this.userUid
          }
        })
      },
      hanleSelectTack(type) {
        let grade = '';
        var category = 2; //默认不限
        var reward = 2 //奖励默认不限
        if(type === "A级") {
          grade = "A"
          this.taskType = "A"
          this.taskCategory = 2
        } else if(type === "B级") {

          grade = "B"
          this.taskType = "B"
          this.taskCategory = 2

        } else if(type === "C级") {

          grade = "C"
          this.taskType = "C"
          this.taskCategory = 2

        } else if(type === "个人") {
          category = 0
          this.taskCategory = 0
          this.taskType = ''
        } else if(type === "团队") {
          category = 1
          this.taskCategory = 1
          this.taskType = ''

        } else if(type === "奖励升序") {
          reward = 1
          this.ListSort = 1
          this.taskSort = 1
        } else if(type === "奖励降序") {
          reward = 0
          this.ListSort = 0
          this.taskSort = 0
        } else {
          grade = '';
          category = 2;
          reward = 2
          this.ListSort = 2
          this.taskCategory = 2
          this.taskType = ''
          this.taskSort = ''
        }

        // 发送请求
        this.scrollTo()
        this.pullup = true
        let url = "http://www.phptrain.cn/api/unauth/task/getTaskPage"
        var param = new FormData()
        this.pageIndex = 1
        this.totalPages = 1
        param.append("pageIndex", this.pageIndex)
        param.append("pageSize", this.pageSize)
        if(category !== 2) {
          param.append("category", category)
        }
        if(grade !== "") {
          param.append("level", grade)
        }
        if(reward !== 2) {
          param.append("reward", reward)
        }
        this.$http.post(url, param, {
          headers: {
            'Content-Type': 'application/json'
          }
        }).then((res) => {
          const data = res.data.result
          if(res.data.code && res.data) {
            this.hasData = false
            data.content.forEach(function(list) {
              if(list.category == 1) {
                list.isTeam = true
              }

            })
            this.taskList = data.content

            this.totalPages = data.totalPages
            this.tempTaskList = data.content

            if(this.tempTaskList.length && data.last) {
              this.pullup = false
              this.$nextTick(() => {
                this.hasCode = false;
              })
            }
          }
          if(data.content == '') {
            this.hasData = true
          }
        })

      }
    },
    mounted() {
      setTimeout(() => {
        this.getTaskInfo()
      }, 1000)
      this.userUid=this.$router.history.current.params.userUid
    },
    created() {

    }
  }
</script>

<style lang="less" scoped>
  .list {
    background: #fff;
  }
  
  .header-top {
    height: 50px;
    line-height: 50px;
    position: fixed;
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
  
  .space {
    background: #eee;
    height: 10px;
  }
  
  .no-data {
    text-align: center;
    margin: 10px 0;
    font-size: 14px;
  }
  
  .wrapper {
    position: absolute;
    top: 60px;
    left: 0;
    right: 0;
    bottom: 60px;
    overflow: hidden;
    .item {
      padding: 10px 15px;
      /*flex-direction: row;
      flex-wrap: nowrap;*/
      .teamMark:after {
        content: '\56E2\961F';
        position: absolute;
        left: 46px;
        top: 2px;
        color: #fff;
        background: #EF5A50;
        border-radius: 15px;
        font-size: 12px;
        padding: 2px 5px;
      }
      .top {
        display: flex;
        justify-content: flex-start;
        align-items: stretch;
        flex-grow: 1;
        .task-rank {
          display: flex;
          flex-direction: column;
          justify-content: space-between;
          min-width: 0;
          margin-left: 10px;
          overflow: hidden;
          .name-wrapper {
            display: flex;
            font-size: 16px;
            color: #2E353B;
            .name {
              margin-top: 6px;
              overflow: hidden;
              white-space: nowrap;
              text-overflow: ellipsis;
            }
          }
          .rank {
            display: flex;
            font-size: 13px;
            color: #A1ACB4;
          }
        }
        .tackImg {
          width: 50px;
          height: 50px;
          vertical-align: top;
          border: 1px solid #eee;
        }
      }
      .bottom {
        padding-left: 60px;
        display: flex;
        align-items: center;
      }
      .center {
        color: #FC8936;
        font-size: 13px;
        flex: 1;
      }
      .right {
        padding: 7px 12px;
        background: #FFAE0F;
        color: #fff;
        font-size: 12px;
        border-radius: 5px;
      }
    }
  }
  
  .loading-container {
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
</style>