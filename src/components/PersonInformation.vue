<template>
	<div class="regist">
			<!-- <div class="top">
				 <span class="return" @click="goback"> &lt; </span>
				 <span class="zhuce">注册</span>
			</div> -->
			<div class="form-part">
					<form class="form">
						  <input class="inp" type="text" placeholder="姓名" v-model="uname">
						  <input class="inp" type="text" placeholder="微信昵称" v-model="wechatName">

								<!-- <input class="inp" type="text" placeholder="微信号" v-model="wechatId"> -->
								<!-- <input class="inpx-r" type="button" value="获取" @click="getWeChatId"> -->

							<input class="inp" type="text" placeholder="钱包地址" v-model="address">
							<input class="inp" type="text" placeholder="推荐人手机号" v-model="referrerPhone">
							<!-- <input class="inp" type="number" placeholder="联系电话" v-model="phone">
						  <div class="inpx">
								<input class="inpx-l" type="text" placeholder="验证码" v-model="code">
								<input class="inpx-r" type="button" value="获取验证码" @click="clock" ref="clock" :style="clockStyle">
							</div> -->
							<div class="inp-file">
								 <div class="file-uplaod" v-if="!file">
									   <div class="add">
											  <img src="../assets/img/upload_file.png" alt="">
										 </div>
										 <span>上传个人简历(需小于500M)</span>
								 </div>
								 <div class="file-uplaod" v-else>
									   <div class="add">
											  <img src="../assets/img/file.png" alt="">
										 </div>
										 <span>{{fileName}}---{{fileSize}}</span>
								 </div>
								<input type="file" class="file" @change="fileSelected" id="fileToUpload"/>
							</div>
							<div class="tip">
								 	 <input type="checkbox"  class="checkbox" v-model="checked"/>
									 <span>我已阅读</span><span style="color:#00AAEE" @click="optiondetail">《使用说明》</span>
							</div>
							<input type="button" value="提交" class="submit" @click="regist">
					</form>

			</div>
			<div class="tips" v-show="showss">{{tips}}</div>
	</div>
</template>

<script>
	export default{
		name: 'Regist',
		data () {
			return {
				 clockStyle:{
						backgroundColor:"#FFAE0F",
						border:"1px solid #FFAE0F",
						color:"white",
				 },
				 showss:false,
				 clocks:60,
				 uname:"",
				 wechatName:"",
				 wechatId:"",
				 address:"",
				 fileName:"",
				 fileSize:"",
				 fileType:"",
				 file:"",
				 tips:"审核成功进行...",
				 userId :"",
         checked:true,
         referrerPhone: ""
			}
		},
		methods:{
			optiondetail(){
				this.$router.push({path:"optiondetail"})
			},
			goback(){
				this.$router.go(-1)
			},
			clock(){
				if(!this.phone){
					this.tips ="请填写手机号"
					this.showTips()
					return
				}
				this.clockStyle.backgroundColor="gray";
				this.clockStyle.border="1px solid gray";
				var sum=this.clocks;
				var _this = this
				var dom =  _this.$refs.clock
				let url = 'http://www.phptrain.cn/api/unauth/account/verifyCode/'+this.phone
				this.$http.get(url).then((res)=>{
						console.log(res)
						this.callbackcode = res.data.result
				}).catch((err)=>{
					console.log(err)
				})
				// 禁用按钮
				var  dom = this.$refs.clock
				dom.setAttribute("disabled","true")

				var times = setInterval(function(){
					 dom.value=sum +"s"
					 if (sum === 0){
							 dom.value="获取验证码"
							 	_this.clockStyle.backgroundColor="#FFAE0F";
								_this.clockStyle.border="1px solid #FFAE0F";
								clearInterval(times);
								dom.removeAttribute("disabled")
					 }
					 sum--;
				},1000)
			},
			regist(){
				 // 检测是否都填写完成
				if (!this.checked){
						this.tips ="请确定已阅读使用说明"
						this.showTips()
						return
				}
				 var that = this
				 let regPhone = /^(13[0-9]|14[0-9]|15[0-9]|166|17[0-9]|18[0-9]|19[8|9])\d{8}$/;
				let regAddress = /^0X\d{40}$/
				if(this.uname && this.wechatName  && this.address && this.file){
					    // if(this.code!==this.callbackcode){
							// 	 // 验证码错误
							// 	 	that.tips = "验证码错误"
							// 		that.showTips()
							// 	 return
              // }
              // debugger;
						if(this.address.length !== 42){
							this.tips = "请填写合法钱包地址"
							this.showTips()
							return false
            }
            if(this.referrerPhone.trim()) {
              if(!regPhone.test(this.referrerPhone)){
                  this.tips = "请填写合法手机号"
                  this.showTips()
                  return false
              }
            }


								console.log(that.userId)
								var param = new FormData()
								param.append("file",that.file)
								param.append("name",that.uname)
								param.append("wxNickName",that.wechatName)
								param.append("referrerPhone",that.referrerPhone)
								// param.append("wxNum",that.uname)
								param.append("trueChainAddress",that.address)
								// param.append("userId",that.userId)
								param.append("userId", JSON.parse(window.localStorage.getItem('token')).userUid)
								// 将内容发送到接口
								let urls = "http://www.phptrain.cn/api/user/updateUserInfo"
								that.$http.post(urls,param,{
										headers: {
											'Content-Type': 'multipart/form-data'
										}
								}).then((res)=>{
									console.log(res)
									if(res.data.message ==="成功"){
											// 最后提示成功提交
											that.tips = "提交成功，审核中..."
											that.showTips(()=>{
												 that.$router.push({path:"/mine"})
											})

									}else{
											that.tips = res.data.message
											that.showTips()
									}
								}
								).catch((err)=>{
									console.log("err",err)
								})
				 }else{
						this.tips = "请将内容填写完整"
						this.showTips()
				 }
			},
			fileSelected(){
        this.file = document.getElementById('fileToUpload').files[0];
        const MB10 = 1024 * 1024 * 10;
        const postfix = this.file.name.match(/\w+$/g)[0];
        const legalPostfix = ['pdf', 'word', 'doct', 'doc', 'txt'];
        if(!legalPostfix.includes(postfix)) {
          this.tips = '文件不合法';
          this.file = null;
          this.showTips()
          return false;
        }
				if(this.file.size > MB10) {
          this.tips = "上传文件不能大于10MB"
          this.showTips()
          return false;
        }
				if(this.file === undefined){
						this.fileName = '';
						this.fileSize = '';
						this.fileType = '';
				}else{
						this.fileName = this.file.name;
						//kb
						if(this.file.size/1024<1000){
								this.fileSize = (this.file.size/1024).toFixed(2) +"kb";
								console.log(this.fileSize)
						}
						else if(this.file.size/1024>1000){
								this.fileSize = ((this.file.size/1024)/1024).toFixed(2) +"MB";
						}
						this.fileType = this.file.type;

				}
			},
			showTips(callback){
				this.showss= true;
				 var _this = this;
				 console.log(111)
				 setTimeout(function(){
					 _this.showss = false
					 if(callback){
						 callback()
					 }
				 },1000)
			},
			getWeChatId(){
				 // 获取微信ID
			}
		},
		mounted(){

			 if(this.$route.query.userid){
			 	this.userId = this.$route.query.userid
			 }
			 if(this.$route.params.userUid){
				 this.userId = this.$route.params.userUid
			 }
			console.log(this.userId)

		}
	}
</script>
<style scoped lang="less">
.regist {
  .top {
    text-align: center;
    position: relative;
    height: 45px;
    display: flex;
    align-items: center;
    justify-content: center;
    border-bottom: 1px solid #e0e4e5;
    .return {
      font-family: 'Courier New', Courier, monospace;
      font-size: 20px;
      color: #00aaee;
      position: absolute;
      left: 20px;
      top: 10px;
    }
    .zhuce {
      font-size: 20px;
    }
  }
  .form-part {
    .form {
      display: flex;
      flex-direction: column;
      align-items: center;
      .inp {
        width: 90%;
        height: 40px;
        font-size: 15px;
        background-color: #fafafa;
        border: 1px solid #e7e7e7;
        border-radius: 5px;
        margin-top: 20px;
        padding-left: 10px;
        box-sizing: border-box;
      }
      .inpx {
        margin-top: 20px;
        width: 90%;
        height: 40px;
        font-size: 15px;
        display: flex;
        .inpx-l {
          width: 70%;
          background-color: #fafafa;
          border: 1px solid #e7e7e7;
          border-top-left-radius: 5px;
          border-bottom-left-radius: 5px;
          height: 100%;
          box-sizing: border-box;
          padding-left: 10px;
          font-size: 15px;
        }
        .inpx-r {
          width: 30%;
          background-color: #ffae0f;
          border: 1px solid #ffae0f;
          height: 100%;
          font-size: 15px;
          border-top-right-radius: 5px;
          border-bottom-right-radius: 5px;
          color: white;
        }
      }
      .inp-file {
        height: 100px;
        width: 90%;
        background-color: #fafafa;
        margin-top: 20px;
        border-radius: 5px;
        position: relative;
        border: 1px solid #e7e7e7;
        .file {
          position: absolute;
          width: 100%;
          height: 100%;
          opacity: 0;
          top: 0;
          left: 0;
        }
        .file-uplaod {
          width: 100%;
          height: 100%;
          display: flex;
          color: #a1acb4;
          font-size: 13px;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          .add {
            width: 20px;
            height: 20px;
            margin-bottom: 10px;
            img {
              width: 100%;
              height: 100%;
            }
          }
        }
      }
      .tip {
        width: 90%;
        text-align: left;
        font-size: 15px;
        margin-top: 20px;
        color: #a1acb4;
        .checkbox {
          width: 15px;
          height: 15px;
          -webkit-appearance: checkbox;
        }
      }
      .submit {
        width: 90%;
        background-color: #00aaee;
        font-size: 15px;
        color: white;
        border-radius: 5px;
        height: 40px;
        margin-top: 20px;
        border: 1px solid #00aaee;
      }
    }
  }
  .tips {
    position: absolute;
    background-color: #00aaee;
    color: white;
    text-align: center;
    width: 200px;
    height: 50px;
    line-height: 50px;
    left: 50%;
    top: 50%;
    margin-left: -100px;
    margin-top: -60px;
    border-radius: 5px;
  }
}
</style>
