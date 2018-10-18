<template>
 <div class="datastatis">

	 		<div class="form-wrap">
			<el-form ref="form"  :inline="true"  class="demo-form-inline">
				<el-form-item label="姓名：" >
					<el-input v-model="form.name"></el-input>
				</el-form-item>
				<el-form-item label="微信名称：">
					<el-input v-model="form.wxNickName"></el-input>
				</el-form-item>
				<el-form-item label="等级：">
          <el-select v-model="form.level" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option label="A" value="A"></el-option>
            <el-option label="B" value="B"></el-option>
            <el-option label="C" value="C"></el-option>
            <el-option label="D" value="D"></el-option>
          </el-select>
       </el-form-item>
				<el-form-item class="btn-wrap">
					<el-button type="primary"  @click="getProfile">查询</el-button>
					<el-button @click="reset">重置</el-button>
				</el-form-item>
				<el-form-item class="btn-wrap fr" style="margin-right: 0;">
						<el-button @click="exportTable()">导出</el-button>
						<el-button @click="goback">返回</el-button>
				</el-form-item>
			</el-form>
		</div>
	 <div class="data-table">
			<el-table
				:data="tableData"
				stripe
				style="width: 100%">
				<el-table-column  prop="sysUser.personName"	label="姓名"  width="78"></el-table-column>
				<el-table-column prop="sysUser.wxNickName"	label="微信昵称"></el-table-column>
				<!--<el-table-column	prop="sysUser.userName"	label="微信号"></el-table-column>-->
				<el-table-column	prop="taskCount"	label="抢任务数" ></el-table-column>
				<el-table-column	prop="taskDoneCount"	label="完成任务数"  width="110" ></el-table-column>
				<el-table-column	prop="taskDoingCount"	label="进行中任务数" width="120" ></el-table-column>
				<el-table-column	prop="trueValue"	label="true数量" ></el-table-column>
				<el-table-column	prop="ttrValue"	label="ttr数量"  ></el-table-column>
				<el-table-column	prop="rmbValue"	label="rmb数量" ></el-table-column>
				<el-table-column	prop="recommendCount"	label="用户推荐数"  width="120"></el-table-column>
				<el-table-column	label="操作"   >
							<template slot-scope="scope">
								<el-button size="mini"
									@click="handleTaskList(scope.row)">任务列表</el-button>
								<el-button size="mini"
									@click="handleRecommend(scope.row)">推荐列表</el-button>
								<el-button size="mini"
									@click="handleReword(scope.row)">奖励列表</el-button>
							</template>
				</el-table-column>
			</el-table>
			<div class="page">
			<el-pagination v-show="total || total>0"	@current-change="handleCurrentChange" :current-page.sync="pageIndex"
       		 :page-size="pageSize" :total="total"  background layout="total,prev, pager, next" >	</el-pagination>
		</div>
  	</div>
 </div>
</template>
<script>
 export default {
	  data(){
			return {
					pageIndex:1,
					pageSize:20,
					total:1,
					auditStatus:'',
					endDate:'',
					startDate:'',

					form: {
							wxNickName:'',
          		name:'',
          		level:'',
				},
				tableData:[],

			}
		},
		methods:{
			//任务列表
			handleTaskList(scope){
				this.$router.push({
					path: "/DataDetailsTaskList",
					query:{
						userId:scope.id
					}
				})
			},
			//推荐列表
			handleRecommend(scope){
				this.$router.push({
					path: "/DataDetailsRecommendList",
					query:{
						id:scope.id
					}
				})
			},
			//奖励列表
			handleReword(scope){
			this.$router.push({
					path: "/DataDetailsRewardList",
					query:{
						id:scope.id
					}
				})
			},
			goback() {
        this.$router.go(-1)
      },
			//导出
			exportTable(){

				let url='http://www.phptrain.cn/admin/report/export'
				this.$http.get(url,{params:{
					auditStatus:this.auditStatus,
							endDate:this.endDate,
							name:this.form.name,
       		level:this.form.level,
							pageIndex:this.pageIndex,
							pageSize:this.pageSize,
       		startDate:this.startDate,
       		wxNickName:this.form.wxNickName
				}},{
		      headers:{"Content-Type": "application/json"}
		    }).then((res)=>{
	    	console.log(res)
		      if(res.data.message=='成功'){
		      	if (res.data.result) {

		      	}
		      }
		    })
			},
			getProfile(){
					let param={
							pageIndex:this.pageIndex,
							pageSize:this.pageSize,
          		name:this.form.name,
          		level:this.form.level,
          		wxNickName:this.form.wxNickName,
          		startDate:this.$route.query.startDate,
          		endDate: this.$route.query.endDate
					}
					 let url ="http://www.phptrain.cn/admin/report/getUserProfilePage";
		    this.$http.post(url,param,{
		      headers:{"Content-Type": "application/json"}
		    }).then((res)=>{
//		    	console.log(res)
		      if(res.data.message=='成功'){
		      	if (res.data.result) {
		      		const result=res.data.result
		      		console.log( result.content,'000000')
		      		this.tableData = result.content
		      		this.total=result.totalElements
		      	}
		      }
		    })
			},
			reset(){
					this.form={
							wxNickName:'',
          		name:'',
          		level:'',
				}
			},
			handleCurrentChange(value){
			this.pageIndex = value
			this.getProfile()
		},
		},
		mounted(){
			this.getProfile()
		}
 }
</script>
<style scoped lang="less">
.datastatis{
  .top{
		  display: flex;
			height: 36px;
			align-content: center;
			justify-content: space-between;
	}
	.data-table{
		 margin-top: 20px;
		.page{
				display: flex;
				justify-content: center;
				margin-top: 20px;
		}
	}
}
</style>
