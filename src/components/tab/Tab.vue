<template>
  <div>
    <footer class="footer border-top">
      <router-link to="/list" tag="div" class="tab-item" @click.native="flushCom">
          <span class="iconfont ">&#xe76a;</span>
          <p class="name">任务列表</p>
      </router-link>
      <router-link to="/Task" tag="div" class="tab-item" @click.native="flushCom">
          <span class="iconfont">&#xe63f;</span>
          <p class="name">我的任务</p>
      </router-link>
      <router-link to="/Mine" tag="div" class="tab-item" @click.native="flushCom">
          <span class="iconfont">&#xe614;</span>
          <p class="name">个人中心</p>
      </router-link>
    </footer>
  </div>

</template>

<script>
  export default {
    name: 'Tabs',
    data(){
      return{
        
      }
    },
    methods:{
　　　　flushCom(){
					this.$emit('clickTab')
			}

　　},
watch: {
      $route(to, from) {
        console.log(to);
        console.log(from);
      }
    }

  }
</script>

<style lang="less" scoped>
  .footer {
    position: fixed;
    bottom: 0;
    left: 0;
    right: 0;
    height: 60px;
    z-index: 99;
    background: #fff;
    .tab-item{
      float: left;
      width: 33.3333%;
      text-align: center;
      padding-top: 10px;
      .name {
        color: #A3A5A8;
        font-size: 12px;
      }
      .iconfont {
        color: #A3A5A8;
        font-size: 22px;
      }
      &.active{
        .name,
        .iconfont {
          color: #02ABEE;
        }
      }
    }
  }
</style>