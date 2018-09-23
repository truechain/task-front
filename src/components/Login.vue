<template>
  <div class="login">
		  <!-- <div class="top">
				 <span class="denglu">登录</span>
			</div> -->
		  <div class="login-inp">
				<div ><input type="text" class="inp" v-model="phone" placeholder="电话号码" maxlength="11"/></div>
				<div class="inpx">
						<input class="inpx-l" type="text" placeholder="验证码" v-model="code">
						<input class="inpx-r" type="button" value="获取验证码" @click="clock" ref="clock" :style="clockStyle">
				</div>
				<div class="tip">
						<input type="checkbox"  class="checkbox" v-model="checked"/>
						<span>我已阅读</span><span style="color:#00AAEE" @click="optiondetail">《使用说明》</span>
				</div>
			</div>
			<div class="login-submit">
				 <input type="button" value="登录" class="submit" @click="login">
				 <input type="button" value="注册" class="submit" style="background-color:#FFAE0F;border:1px solid #FFAE0F" @click="regist">
			</div>
			<div class="tips" v-show="showss">{{tips}}</div>
  </div>
</template>

<script>
export default {
  name: 'Login',
  data () {
    return {
			 phone:"",
			 code:"",
			 clocks:60,
			 clockStyle:{
					backgroundColor:"#FFAE0F",
					border:"1px solid #FFAE0F",
					color:"white",	
				},
				 tips:"",
				 showss:false,
				 checkCode:"",
				 checked:true
    }
	},
  methods:{
		regist(){
			 this.$router.push({path:"/regist"})
		},
		login(){
			 if (!this.checked){
				   this.tips ="请确定已阅读使用说明"
					 this.showTips()
					 return
			 }
			 if(!this.phone || !this.code){
				   this.tips ="请填写登录信息"
					 this.showTips()
					 return
			 }
			if(!(/^1[3|4|5|6|7|8|9][0-9]\d{4,8}$/.test(this.phone))){ 
				this.tips ="手机号格式错误"
				this.showTips()
				return false; 
			} 
			if(this.checkCode!=this.code){
				this.tips ="输入验证码有误"
				this.showTips()
				return false; 
			}
			 let url = "http://www.phptrain.cn/api/unauth/account/login"
				var param = new FormData()
				param.append("mobile",this.phone)
				param.append("verifyCode",this.code)
			 this.$http.post(url,param,{
					headers: {
							'Content-Type': 'multipart/form-data'
					}
			 }).then((res)=>{
					console.log(res)
					if(res.data.message==="成功"){
						 // 登录成功
						 this.tips ="登录成功.即将跳转"
						 this.showTips()
						 let token = JSON.stringify(res.data.result)
						 let userUid = res.data.result.userUid
						 localStorage.setItem("token",token)
						 this.$http.post("http://www.phptrain.cn/api/task/getUserTaskList").then(res=>{
							 
						 })
						 this.$router.push({name:"List",params:{userUid:userUid}})
						
					}else{
						if(res.data.message==="该用户不存在"){
							this.tips ="该账号尚未注册"
					    this.showTips()
						}else{
							this.tips ="登录失败请重新登录"
					    this.showTips()
						}
					
					}
			 })			 
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
				var _this = this;
				var dom =  _this.$refs.clock;
				// 开始发送验证码：
				let url = 'http://www.phptrain.cn/api/unauth/account/verifyCode/'+this.phone
				this.$http.get(url).then((res)=>{
						console.log(res)
						this.checkCode = res.data.result
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
		optiondetail(){
			this.$router.push({path:"optiondetail"})
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
		}
	}
}
</script>

<!-- Add "scoped" attribute to limit CSS to this component only -->
<style scoped lang="less">
.login{
	display: flex;
	text-align: center;
	align-items: center;
	justify-content: center;
	flex-direction: column;
	.top{
			position: relative;
			height: 45px;
			text-align: center;
			line-height: 45px;
		 .denglu{
			 font-size: 20px;
		 }
	}
	.login-inp{
		 width:80%;
		 margin-top: 50px;
		 .inp{
				width: 100%;
				height: 40px;
				font-size:15px;
				background-color: #FAFAFA;
				border:1px solid #E7E7E7;
				border-radius: 5px;
				margin-top:20px;
				padding-left: 10px;
				box-sizing: border-box;
			}
		  .inpx{
				margin-top:20px;	
				height: 40px;
				font-size:15px;
				box-sizing: border-box;
				display:flex;
				.inpx-l{
						width:70%;
						background-color: #FAFAFA;
						border:1px solid #E7E7E7;
						border-top-left-radius: 5px;
						border-bottom-left-radius: 5px;
						height: 100%;
						box-sizing: border-box;
						padding-left: 10px;
						font-size:15px;
						
				}
				.inpx-r{
					 	width:30%;
						background-color: #FFAE0F;
						border:1px solid #FFAE0F;
						height: 100%;
						font-size:15px;
						border-top-right-radius: 5px;
						border-bottom-right-radius: 5px;
						color:white;
						box-sizing: border-box;
				}
			}	 
			.tip{
				width:90%;
				text-align: left;
				font-size:15px;
				margin-top:20px;
				color:#A1ACB4;
				.checkbox{
					width: 15px;
					height: 15px;
					-webkit-appearance:checkbox;
				}
		  }
	}
	.login-submit{
		
		width:80%;
		margin-top:20px;
	  .submit{
				 width:100%;
				 background-color: #00AAEE;
				 font-size: 15px;
				 color:white;
				 border-radius: 5px;
				 height: 40px;
				 margin-top:20px;
				 border:1px solid #00AAEE;
			}
	}
	.tips{
		 position: absolute;
		  background-color: #00AAEE;
		 color:white;
		 text-align: center;
		 width:200px;
		 height: 50px;
		 line-height: 50px;
		 left:50%;
		 top:50%;
		 margin-left: -100px;
		 margin-top: -120px;
		 border-radius: 5px;
	}
}

</style>
