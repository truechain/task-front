<template>
  <div>
    <div class="header border-bottom">
      <div class="item-wrapper" v-show="show" ref="headerTitle">
        <span class="name  border-right" @click="selectItem(0)">类别</span>
        <span class="name  border-right" @click="selectItem(1)">等级</span>
        <span class="name  border-right" @click="selectItem(2)">奖励</span>
        <span class="search iconfont" @click="searchItem">&#xe741;</span>
      </div>
      <div class="search-wrapper" v-show="!show">
        <span class="search iconfont">&#xe741;</span>
        <input type="text" class="search-input" v-model.trim="keyword" placeholder="请输入任务名称" />
        <span @click="cancelSearch" class="cancel">取消</span>
      </div>
      <div class="space"></div>
    </div>
    <scroll class="search-content" ref="wrapper" :data="tempTaskList" :totalSize="totalPages" :pageIndex="pageIndex" :last="Islast" :pulldown="pulldown" :pullup="pullup" @pulldown="getTaskInfo" @scrollToEnd="loadMore" v-show="keyword">
      <div class="list">
        <div class="item  border-bottom" v-for="item of tempTaskList">
          <div class="left">
            <img :src="item.iconPath" alt="" class="tackImg" />
            <div class="task-rank">
              <p class="name">{{item.name}}</p>
              <p class="rank">难度：<span>{{item.level}}级</span></p>
            </div>
          </div>
          <div class="center">{{item.rewardNum}}True</div>
          <div class="right" @click="buttonClick(item.id)">抢任务</div>
        </div>

      </div>
      <div class="no-data" v-show="hasnoData">没有找到符合条件的任务</div>
      <div style="height: 50px;"></div>
    </scroll>
    <ul class="select-wrapper" v-show="isShow">
      <li class="border-bottom select-item" :class="{ active: active==index }" v-for="(item,index) of itemList" :key="item.id" @click="handleClick(index,item.name)">{{item.name}}</li>
    </ul>
    <div class="mask" v-show="showMask">
    </div>

  </div>

</template>

<script>
  import Bscroll from 'better-scroll'
  import Scroll from '../scroll/Scroll'
  export default {
    name: "ListHeader",
    components: {
      Scroll
    },
    data() {
      return {
        isShow: true, //下拉是否显示
        show: true, //搜索框是否显示
        itemList: [], //下拉列表选项集合
        lastItemIndex: -1, //是否第一次点击下拉
        keyword: "", //搜索框关键字
        timer: null,
        active: 0,
        showMask: false,
        pageIndex: 1,
        pageSize: 20,
        tempTaskList: [], //列表数组
        pulldown: true, //是否下拉
        pullup: true, //是否上拉
        totalPages: 1, //列表总页数
        Islast: '' //列表是不是最后一页
      };
    },
    props: {
      taskList: Array
    },
    computed: {
      //如果列表没有数据显示没有数据
      hasnoData() {
        return !this.tempTaskList.length;
      }
    },

    watch: {
      //根据搜索框文字变化请求数据
      keyword() {
        if(this.timer) {
          clearTimeout(this.timer);
        }
        if(!this.keyword) {
          this.tempTaskList = [];
        }
        this.timer = setTimeout(() => {
          this.getTaskInfo()
        }, 100);
      }
    },
    methods: {
      //点击抢任务按钮，跳转
      buttonClick(id) {
        this.$router.push({
          name: "TaskDetail",
          params: {
            id: id,
            type: 'robTask'
          }
        })
      },
      //默认渲染列表数据
      getTaskInfo() {
        let url = "http://www.phptrain.cn/api/unauth/task/getTaskPage"
        var param = new FormData()
        this.pageIndex = 1
        param.append("pageIndex", this.pageIndex)
        param.append("pageSize", 20)
        param.append("taskName", this.keyword)
        this.$http.post(url, param).then((res) => {
          if(res.data.code && res.data) {
            if(res.data.code) {
              this.hasCode = false
            }
            const data = res.data.result
            this.tempTaskList = data.content
            this.totalPages = data.totalPages
            this.last = data.last
            if(data.last) {
              this.pullup = false
              this.pulldown = false
            }
          }
        })
      },
      //上拉加载更多
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
        param.append("taskName", this.keyword)
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
      //点击放大镜图片显示搜索框
      searchItem() {
        this.show = !this.show;
        this.isShow = false;
        this.showMask = false
        this.$emit('fetch')
      },
      //点击取消，隐藏搜索框
      cancelSearch(e) {
        this.show = !this.show;
        this.isShow = false;
        this.keyword = ''
      },
      //点击下拉选项发送所点击的文字到父级
      handleClick(index, name) {
        this.active = index
        this.isShow = false;
        this.showMask = false;
        this.isActive = true
        this.lastItemIndex = 4;
        this.$emit("change", name);
      },
      //根据类别，等级，奖励显示相应下拉列表
      selectItem(res) {
        if(
          this.lastItemIndex == -1 ||
          this.lastItemIndex != res ||
          this.lastItemIndex == 4
        ) {
          this.lastItemIndex = res;
          this.isShow = true;
          this.showMask = true
        } else if(this.lastItemIndex == res) {
          this.isShow = false;
          this.showMask = false
          this.lastItemIndex = -1;
        }
        if(res == 0) {
          this.itemList = [{
              id: "01",
              name: "不限",
            },
            {
              id: "02",
              name: "个人",
            },
            {
              id: "03",
              name: "团队",
            }
          ];
        }
        if(res == 1) {
          this.itemList = [{
              id: "001",
              name: "不限"
            },
            {
              id: "002",
              name: "A级"
            },
            {
              id: "003",
              name: "B级"
            },
            {
              id: "004",
              name: "C级"
            }
          ];
        }
        if(res == 2) {
          this.itemList = [{
              id: "1",
              name: "不限"
            },
            {
              id: "2",
              name: "奖励升序"
            },
            {
              id: "3",
              name: "奖励降序"
            }
          ];
        }
      }
    }
  };
</script>
<style lang="less" scoped>
  .space {
    background: #eee;
    height: 10px;
  }
  
  .header {
    position: fixed;
    // top: 60px;
    left: 0;
    right: 0;
    height: 50px;
    line-height: 50px;
    z-index: 99;
    background: #fff;
    .item-wrapper {
      overflow: hidden;
      .name {
        width: 29%;
        float: left;
        font-size: 14px;
        text-align: center;
      }
      .search {
        float: left;
        text-align: center;
        width: 13%;
      }
    }
    .search-wrapper {
      display: flex;
      border-radius: 20px;
      margin: 4px 10px 4px;
      height: 40px;
      line-height: 40px;
      .search {
        text-align: center;
        width: 40px;
        border-top-left-radius: 20px;
        border-bottom-left-radius: 20px;
        background: #eee;
      }
      .search-input {
        flex: 1;
        background: #eee;
        border-radius: 0;
        border-top-right-radius: 20px;
        border-bottom-right-radius: 20px;
        border: none;
      }
      .cancel {
        font-size: 13px;
        padding-left: 7px;
        cursor: pointer;
      }
    }
  }
  
  .select-wrapper {
    background: #fff;
    z-index: 80;
    top: 60px;
    position: absolute;
    left: 0;
    right: 0;
    .select-item {
      height: 43px;
      line-height: 43px;
      padding: 0 0 0 22px;
      font-size: 15px;
      &.active:after {
        content: '';
        display: inline-block;
        border: 2px solid #00AAEE;
        border-top-width: 0;
        border-right-width: 0;
        width: 12px;
        height: 7px;
        -webkit-transform: rotate(-50deg);
        position: absolute;
        top: 15px;
        right: 19px;
      }
    }
  }
  
  .search-content {
    position: absolute;
    background: #fff;
    left: 0;
    right: 0;
    bottom: 60px;
    top: 60px;
    z-index: 1;
    overflow: hidden;
    .space {
      background: #eee;
      height: 10px;
    }
    .search-item {
      font-size: 14px;
      padding: 10px 20px;
    }
    .item {
      display: flex;
      justify-content: left;
      align-items: center;
      padding: 10px 15px;
      .left {
        .task-rank {
          display: inline-block;
          margin-left: 10px;
          max-width: 140px;
          .name {
            font-size: 17px;
            color: #2E353B;
            margin-top: 6px;
          }
          .rank {
            font-size: 13px;
            color: #A1ACB4;
          }
        }
        .tackImg {
          width: 50px;
          height: 50px;
          vertical-align: top;
        }
      }
      .center {
        flex: 1;
        color: #FC8936;
        font-size: 13px;
        margin-left: 10px;
      }
      .right {
        padding: 9px 12px;
        background: #FFAE0F;
        color: #fff;
        font-size: 13px;
        border-radius: 5px;
      }
    }
  }
  
  .mask {
    position: absolute;
    left: 0;
    top: 60px;
    right: 0;
    bottom: 0;
    background: #000;
    opacity: 0.5;
    z-index: 70;
  }
</style>