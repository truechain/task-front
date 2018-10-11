<template>
	<div class="task-details-wrapper">
		<div class="position">我的位置：任务管理>查看详情</div>
		<div class="fr">
			 <el-button  @click="goback">返回</el-button>

			   <el-button type="primary" @click="TaskEntryForm">报名表</el-button>


		</div>


		<div class="details-content">
			<div class="title">任务详情</div>
			<ul>
			  <li style="width: 100%;">任务logo：<span><div class="logo-img"><img :src="task.iconPath" /></div></span></li>
				<li>任务名称：<span>{{task.name}}</span></li>
				<li>任务等级：<span>{{task.level}}</span></li>
				<li>状态：<span>{{status[task.taskStatus]}}</span></li>
				<li>任务类别：<span>{{task.category == 0 ? '个人' : '团队' }}</span></li>
				<li>发布者：<span>{{task.createUser}}</span></li>
				<li>发布时间：<span>{{task.createTime}}</span></li>
				<li>时间范围：<span>{{task.startDateTime.split('T')[0]}}至{{task.endDateTime.split('T')[0]}}</span></li>
				<li>奖励：<span>{{task.rewardNum}}</span></li>
				<li style="width: 100%;">提交地址：<span>{{task.pushAddress}}</span></li>
				<li style="width: 100%;">任务描述：<span>{{task.description}}</span></li>
			</ul>
		</div>
		<div class="details-content">
			<div class="title">岗位详情</div>
			<div class="table-wrapper">
				<el-table :data="tableData" stripe >
					<el-table-column prop="station" label="岗位" >
						</el-table-column>
						<el-table-column prop="peopleNum" label="需要人数" >
						</el-table-column>
						<el-table-column prop="rewardNum" label="奖励/人">
					</el-table-column>
				</el-table>
			</div>
		</div>
	</div>
</template>

<script>
	export default {
		name:'TaskDetails',
		data() {

			return {
        task: {},
				tableData: [],
				name:'',
				level:'',
				taskStatus:'',
				category:'',
				createUser:'',
				createTime:'',
				startDateTime:'',
				endDateTime:'',
				rewardNum:'',
				pushAddress:'',
				description:'',
        iconPath:'',
        status: {
          '0': '禁用',
          '1': '启用',
          '2': '关闭'
        }
			}
		},
		methods:{
		  goback(){
		    this.$router.go(-1)
		  },
		  //报名表
		  TaskEntryForm(){

			  let taskId =  this.$route.query.taskId
			  console.log(taskId,'woshitaskid')
			 	this.$router.push({
					path: "/TaskEntryForm",
					 query: {
						taskId: taskId,
					}
				})

		  },
		  getTaskDetails(){
		  	let id =  this.$route.query.taskId
		  	let url="http://www.phptrain.cn/admin/task/getTaskInfo?taskId="+id
		  	this.$http.post(url, {
		  		headers: {
            		"Content-Type": "application/json"
          		}
		  	}).then((res)=>{
		  		if(res.data.message=='成功'){
		  			if (res.data.result) {
		  				const result= res.data.result
		  				this.tableData=result.taskDetailList
		  				this.task=result.task
		  			}
		  		}
		  	})
		  }
		},
		mounted(){
			this.getTaskDetails()
		}
	}
</script>

<style scoped>
.fr {
  float: right;
  margin-bottom: 20px;
}
.logo-img {
  display: inline-block;
  width: 50px;
  height: 50px;
  border: 1px solid #777;
}
.logo-img img {
  width: 100%;
  vertical-align: middle;
  height: 50px;
}
.details-content {
  border: 1px solid #dfe6ec;
  margin-bottom: 20px;
  font-size: 15px;
  clear: both;
}
.table-wrapper {
  padding: 2%;
}
.title {
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
