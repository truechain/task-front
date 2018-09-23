<template>
  <div>
     <div class="header-top">
      <div class="header-wrapper">
        <div class="img-wrapper"  @click="goback"><img src="../../assets/img/back.png" alt="" /></div>
       <div>推荐记录</div>
      </div>
      <div class="space"></div>
    </div>
    <div class="recommendCon"  ref="wrapper">
        <div>
             <div class="tabConWrapper border-bottom" v-for='(itemCon,index) in recommendCons'>
            <div class="contLeft">
              <p class="type">{{itemCon.personName}}</p>
              <p class="date">{{itemCon.createTime}}</p>
            </div>
            <div class="contRight"><span v-if="itemCon.rewardNum">+</span>{{itemCon.rewardNum}}</div>
           </div>
        </div>
        <div class="loading-container" v-show="hasCode">
          <loading></loading>
        </div>
    </div>
  </div>
</template>

<script>
import Bscroll from 'better-scroll'
import Loading from '../../base/loading/Loading'
  export default {
    name: 'Recommend',
    components: {
      Loading
    },
    data() {
      return {
        recommendCons:[],
        hasCode:true
      }
    },
    methods:{
      goback(){
         this.$router.go(-1)
      },
      getRecommendInfo(){
        var url='http://www.phptrain.cn/api/user/getRecommendUserList'
        this.$http.get(url).then((res)=>{
           if(res.data.code&&res.data){
             if(res.data.code){
              this.hasCode=false
            }
             console.log(res)
              this.recommendCons=res.data.result
           }
        })
      }
    },
     mounted() {
       setTimeout(()=>{
           this.getRecommendInfo()
      },1000)
       
       this.scroll = new Bscroll(this.$refs.wrapper)
      
      }
  }
</script>

<style lang="less" scoped>
.space {
    background: #eee;
    height: 10px;
  }
 .header-top{
   height: 50px;
   line-height: 50px;
   position: fixed;
   top: 0;
   left: 0;
   right: 0;
   .header-wrapper{
     text-align: center;
     .img-wrapper{
       position: absolute;
       width: 30px;
       left: 0;
       right: 0;
       img{
         width: 24px;
       }
     }
   }
 }
  .recommendCon {
    overflow: hidden;
    position: absolute;
    left: 0;
    right: 0;
    bottom: 0;
    top: 60px;
    .tabConWrapper {
      display: flex;
      padding: 0 15px;
      height: 60px;
      align-items: center;
      .contLeft {
        flex: 1;
        .type {
          font-size: 15px;
          color: #2E353B;
        }
        .date {
          color: #A1ACB4;
          font-size: 12px;
          padding-top: 8px;
        }
      }
      .contRight {
        color: #2E353B;
        font-size: 14px;
      }
    }
  }
   .loading-container{
    position: absolute;
    width: 100%;
    top: 50%;
    transform: translateY(-50%);
  }
</style>