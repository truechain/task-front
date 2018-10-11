<template>
	<div class="task-details-wrapper">
		<div class="position">我的位置：注册用户管理 > 查看详情</div>
		<div class="fr">
			 <el-button  @click="goback">返回</el-button>
		</div>


		<div class="details-content">
			<div class="title">基本信息</div>
			<ul>
				<li>姓名：<span> {{tableData.sysUser.personName}}</span></li>
				<li>微信昵称：<span> {{tableData.sysUser.wxNickName}}</span></li>
				<!-- <li>微信号：<span> {{tableData.sysUser.wxNum}}</span></li> -->
				<li>审核状态：<span> {{tableData.sysUser.auditStatusName}}</span></li>
				<li>联系方式：<span> {{tableData.sysUser.mobile}}</span></li>
				<li>等级：<span> {{tableData.sysUser.level}}</span></li>
				<li>提交时间：<span> {{tableData.sysUser.updateTime}}</span></li>
        <li style="width: 500px;">钱包地址：<span> {{tableData.sysUser.trueChainAddress}}</span></li>
        <li>推荐人微信昵称：<span>{{tableData.refererWXName}}</span></li>
				<li>推荐人手机号：<span>{{tableData.refererPhone}}</span></li>
				<li style="width: 500px;">推荐人钱包地址：<span>{{tableData.refererAddress}}</span></li>
			</ul>
		</div>
		<div class="details-content" style="height:120px">
			<div class="title">附件信息</div>
			<div>
                <img src="./../../../static/images/jianli.png" alt="" class="pic-left">
                <div class="cont-right">
                    <p>{{tableData.userName}}简历</p>
                    <!-- <el-button @click="resume" >预览</el-button> -->
                    <el-button @click='downLoad' >下载</el-button>
                </div>
            </div>
		</div>
		<div>
			<pdf v-if="dialogVis" :src="resumeFilePath"></pdf>
			<!-- <canvas v-for="page in pages" :id="'the-canvas'+page" :key="page"></canvas> -->
		</div>


	</div>
</template>

<script>
	import PDFJS from 'pdfjs-dist'
	let Base64 = require('js-base64').Base64
	import pdf from 'vue-pdf'
	export default {
		name:'TaskDetails',
		components: {
			pdf
		},
		data() {

			return {
				tableData: [],
                isAudit:'',
                dialogVis:false,
				form:{},
				resumeFilePath:'',
				pdfDoc: null,
				loadding: false,
				pages: 0
			}
		},
		mounted () {
			this.getUserInfo()
		},
		methods:{
			getUserInfo(){
				let id = this.$router.history.current.query.id
				let url = "http://www.phptrain.cn/admin/user/getUserInfo?userId=" + id;
				var param = {
					userId: id
				};
				this.$http
					.post(url, param, {headers: {"Content-Type": "application/json"}})
					.then(res => {
					if (res.data.message === "成功") {
						if (res.data.result) {
						this.tableData = res.data.result;
						this.resumeFilePath= res.data.result.resumeFilePath
						if(this.tableData.auditStatus==0 ||this.tableData.auditStatus==-1 ){
								this.tableData.auditStatusName='未审核'
							}
							if(this.tableData.auditStatus==1){
								this.tableData.auditStatusName='已审核'
							}

						}

					} else {
						this.tips = res.data.message;
						this.showTips();
					}
					});
			},
			goback(){
				this.$router.go(-1)
			},
			resume(){
				let url = this.resumeFilePath
				this.dialogVis =true
				// window.open(url)
				// this.loadFile(url)
			},
			downLoad(){
				let id = this.$router.history.current.query.id
				let url = "http://www.phptrain.cn/admin/user/downLoadResume?userId=" + id;
				window.open(url)
			},
			renderPage (num) {
				let _this = this
				this.pdfDoc.getPage(num).then(function (page) {
					let canvas = document.getElementById('the-canvas' + num)
					let ctx = canvas.getContext('2d')
					let dpr = window.devicePixelRatio || 1
					let bsr = ctx.webkitBackingStorePixelRatio ||
							ctx.mozBackingStorePixelRatio ||
							ctx.msBackingStorePixelRatio ||
							ctx.oBackingStorePixelRatio ||
							ctx.backingStorePixelRatio || 1
					let ratio = dpr / bsr
					var viewport = page.getViewport(screen.availWidth / page.getViewport(1).width)
					canvas.width = viewport.width * ratio
					canvas.height = viewport.height * ratio
					canvas.style.width = viewport.width + 'px'
					canvas.style.height = viewport.height + 'px'
					ctx.setTransform(ratio, 0, 0, ratio, 0, 0)
					var renderContext = {
					canvasContext: ctx,
					viewport: viewport
					}
					page.render(renderContext)
					if (_this.pages > num) {
					_this.renderPage(num + 1)
					}
				})
			},
			loadFile (url) {
				let _this = this
				PDFJS.getDocument(url).then(function (pdf) {
					_this.pdfDoc = pdf
					_this.pages = _this.pdfDoc.numPages
					// _this.$nextTick(() => {
					// _this.renderPage(1)
					// })
				})
			}
		}
	}
</script>

<style >
.fr {
  float: right;
  margin-bottom: 20px;
}
.pic-left {
  width: 60px;
  float: left;
  margin-left: 10px;
}
.cont-right {
  float: left;
  margin-left: 20px;
}
.cont-right p {
  margin-bottom: 10px;
}
.details-content {
  border: 1px solid #dfe6ec;
  padding-bottom: 30px;
  margin-bottom: 20px;
  font-size: 15px;
  clear: both;
}
.table-wrapper {
  padding: 2%;
}
.title {
  margin: 15px 0 20px 0;
  font-size: 16px;
  padding-left: 5px;
  border-left: 4px solid rgba(255, 69, 0, 0.68);
}
.details-content ul {
  overflow: hidden;
  padding: 10px 20px 20px;
}
.details-content li {
  width: 24.7%;
  float: left;
  font-size: 14px;
  line-height: 30px;
}
</style>
