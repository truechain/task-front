<template>
  <div ref="wrapper" class="better-scroll-root">  <!--该节点需要定位，内容以此节点的盒模型为基础滚动。另外，该节点的背景色配合上拉加载、下拉刷新的UI，正常情况下不可作它用。-->
    <div class="content-bg better-scroll-container">  <!--如果需要调滚动内容的背景色，则改该节点的背景色-->
       <!--<div> 
            <div v-if="data.length>19" class="pulldown-tip">
                <i class="pull-icon indexicon icon-pull-down" :class="[pulldownTip.rotate]"></i>
                <span class="tip-content">{{pulldownTip.text}}</span>
            </div>
            <div v-if="data.length>19" class="pullup-tip">
                <i class="pull-icon indexicon icon-pull-up" :class="[pullupTip.rotate]"></i>
                <span class="tip-content">{{pullupTip.text}}</span>
            </div>
        </div>-->
        <div> 
            <div v-if="data.length>7"  class="pulldown-tip" >
                <i class="pull-icon indexicon icon-pull-down" :class="[pulldownTip.rotate]"></i>
                <span class="tip-content">{{pulldownTip.text}}</span>
            </div>
            <div  class="pullup-tip" v-if="data.length>7">
                <i class="pull-icon indexicon icon-pull-up" :class="[pullupTip.rotate]"></i>
                <span class="tip-content">{{pullupTip.text}}</span>
            </div>
        </div>
        <slot></slot>
    </div>
</div>
</template>
<script>
import BScroll from 'better-scroll'

export default {
    name:'Scroll',
    props: {
        /**
         * 1 滚动的时候会派发scroll事件，会截流。
         * 2 滚动的时候实时派发scroll事件，不会截流。
         * 3 除了实时派发scroll事件，在swipe的情况下仍然能实时派发scroll事件
         */
        probeType: {
            type: Number,
            default: 1
        },
        /**
         * 点击列表是否派发click事件
         */
        click: {
            type: Boolean,
            default: true
        },
        /**
         * 是否开启横向滚动
         */
        scrollX: {
            type: Boolean,
            default: false
        },
        /**
         * 是否派发滚动事件
         */
        listenScroll: {
            type: Boolean,
            default: false
        },
        /**
         * 列表的数据
         */
        data: {
            type: Array,
            default: null
        },
        /**
         * 是否派发滚动到底部的事件，用于上拉加载
         */
        pullup: {
            type: Boolean,
            default: false
        },
        /**
         * 是否派发顶部下拉的事件，用于下拉刷新
         */
        pulldown: {
            type: Boolean,
            default: false
        },
        /**
         * 是否派发列表滚动开始的事件
         */
        beforeScroll: {
            type: Boolean,
            default: false
        },
        /**
         * 当数据更新后，刷新scroll的延时。
         */
        refreshDelay: {
            type: Number,
            default: 20
        },
        /**
         * 如果启用loading交互，传递loading的状态
         * isShow: false
         * showIcon: false,    // 是否显示loading的icon
         * status: ''  // '正在加载...', '刷新成功', '刷新失败', ''
         */
        loadingStatus: {
            type: Object,
            default: function () {
                return {
                    showIcon: false,
                    status: ''
                };
            }
        },
        /**
         * 是否启用下拉刷新的交互
         */
        pulldownUI: {
            type: Boolean,
            default: false
        },
        /**
         * 是否启用上拉加载的交互
         */
        pullupUI: {
            type: Boolean,
            default: false
        },
         totalSize:{
            type: Number,
         },
         pageIndex:{
            type: Number,
             default: 1
         },
        last:{
            type: Boolean,
            default: false
        }
        
    },
    data() {
        return {
            loadingConnecting: false,
            pulldownTip: {
                text: '下拉刷新',     // 松开立即刷新
                rotate: ''    // icon-rotate
            },
            pullupTip:{
              text: '上拉加载',     // 上拉加载
              rotate: ''
            }
            
        };
    },
    mounted() {
        // 保证在DOM渲染完毕后初始化better-scroll
        setTimeout(() => {
            this._initScroll()
        }, 20)
    },
    methods: {
        _initScroll() {
            if (!this.$refs.wrapper) {
                return;
            }
            // better-scroll的初始化
            this.scroll = new BScroll(this.$refs.wrapper, {
                probeType: this.probeType,
                click: this.click,
                scrollX: this.scrollX
            });
            // 是否派发滚动事件
            if (this.listenScroll || this.pulldown || this.pullup) {
                let me = this;
                this.scroll.on('scroll', (pos) => {
                    if (this.listenScroll) {
                        me.$emit('scroll', pos);
                    }

                    if (this.pulldown) {
                        // 下拉动作
                        if (pos.y > 70) {
                            this.pulldownTip = {
                                text: '',//松开立即刷新
                                rotate: 'icon-rotate'
                            }
                        } else {
                            this.pulldownTip = {
                                text: '下拉刷新',     // 松开立即刷新
                                rotate: ''    // icon-rotate
                            }
                            
                        }
                         
                    }

                    if (this.pullup) {
                        //上拉加载
                      if (pos.y < -100) {
                          this.pullupTip = {
                                text: '',
                                rotate: 'icon-rotate'
                            }
                      }  
                      else{
                        this.pullupTip = {
                                text: '上拉加载',
                                rotate: ''
                            }
                      }
                      
                    }
                })
            }

            // 是否派发滚动到底部事件，用于上拉加载
           
            if (this.pullup) {
                this.scroll.on('scrollEnd', () => {
                    // 滚动到底部
                    this.pullupTip = {
                                text: '',     // 松开立即刷新
                                rotate: 'icon-rotate'    // icon-rotate
                            }
                    if (this.scroll.y <= (this.scroll.maxScrollY + 50)  &&  this.pageIndex<=this.totalSize) {
                        setTimeout(() => {
                            // 重置提示信息
//                          this.pullupTip = {
//                              text: '上拉加载',     // 松开立即刷新
//                              rotate: ''    // icon-rotate
//                          }
         
                            if(this.pageIndex<this.totalSize){
                            		this.pullupTip = {
                                text: '',
                                rotate: 'icon-rotate'
                            }
                            }
                            if(this.pageIndex==this.totalSize&& this.last){
                                 this.pullupTip = {
                                  text: '没有更多',     // 松开立即刷新
                                  rotate: ''    // icon-rotate
                              }
                            }
                          	this.$emit('scrollToEnd');
                        },2000);
                        
                    }
                });
            }

            // 是否派发顶部下拉事件，用于下拉刷新
            if (this.pulldown) {
                this.scroll.on('touchEnd', (pos) => {
                    // 下拉动作
                    if (pos.y > 70) {
                        setTimeout(() => {
                            // 重置提示信息
                            this.pulldownTip = {
                                text: '下拉刷新',     // 松开立即刷新
                                rotate: ''    // icon-rotate
                            }
                        },2600);
                        this.$emit('pulldown');
                    }
//                  this.scroll.refresh()

                });
            }

            // 是否派发列表滚动开始的事件
            if (this.beforeScroll) {
                this.scroll.on('beforeScrollStart', () => {
                    this.$emit('beforeScroll')
                });
            }
            

        },
        disable() {
            // 代理better-scroll的disable方法
            this.scroll && this.scroll.disable();
        },
        enable() {
            // 代理better-scroll的enable方法
            this.scroll && this.scroll.enable();
        },
        refresh() {
            // 代理better-scroll的refresh方法
            this.scroll && this.scroll.refresh();
        },
        scrollTo() {
            // 代理better-scroll的scrollTo方法
            this.scroll && this.scroll.scrollTo.apply(this.scroll, arguments);
        },
        scrollToElement() {
            // 代理better-scroll的scrollToElement方法
            this.scroll && this.scroll.scrollToElement.apply(this.scroll, arguments);
        }
    },
    watch: {
        // 监听数据的变化，延时refreshDelay时间后调用refresh方法重新计算，保证滚动效果正常
        data() {
            setTimeout(() => {
                this.refresh();
            }, this.refreshDelay);
        },
				pullup(){
//				console.log(this.pullup)	
				}
    }
}
</script>
<style lang="less" >
.better-scroll-root {
	.loading-pos{ top: 0;}
    .loading-pos, .pulldown-tip {
        position: absolute;
        left: 0;
       
        width: 100%;
        height: 35px;
        color: #A3A5A8;
        text-align: center;
        z-index: 2000;
    }
     .tip-content{
        	font-size: 14px;
        }

    .pullup-tip{
      position: absolute;
        left: 0;
        bottom: 0;
        width: 100%;
        height: 35px;
        color: #A3A5A8;
        text-align: center;
        z-index: 2000;
           }
    .loading-pos {
        background-color: rgba(7, 17, 27, 0.7);
    }
    .pulldown-tip {
        top: -40px;
        height: 30px;
        line-height: 30px;
        z-index: 1;
    }
    .pullup-tip{
      bottom: 0px;
    height: 50px;
    line-height: 50px;
    z-index: 1;
    position: absolute;
    }
     .icon-rotate:before,
        .pulldown-tip:before {
            content: '';
            display: inline-block;
            width: 160px;
            height: 70px;
            background-size: 24px !important;
            position: absolute;
            top: -20px;
               left: 50%;
    margin-left: -80px;
        }
    .icon-rotate:before {
            background: url(../../base/loading/loading.gif) no-repeat center;
        }
        .pullup-tip:before {
            background: url(../../base/loading/loading.gif) no-repeat center;
            
        }
    .pull-icon {
        position: absolute;
        top: 0;
       left: 51%;
        color: #a5a1a1;
        font-size: 1.5em;
        transition: all 0.15s ease-in-out;
    }
    /*.pull-icon.icon-rotate {
        transform:rotate(180deg);
    }*/
    
    .loading-container {
        position: absolute;
        height: 10px;
        width: 10px;
        left: 35%;
        top: 50%;
        transform: translate(-50%, -50%);
        perspective: 40px;
    }
    @keyframes rotate{
        0%{
            transform:rotateX(0deg) rotateY(0deg);
        }
        50%{
            transform:rotateX(360deg) rotateY(0deg);
        }
        100%{
            transform:rotateX(360deg) rotateY(360deg);
        }
    }
}
</style>
