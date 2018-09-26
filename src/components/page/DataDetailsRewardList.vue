<template>
	<div class="">
		<div class="position">我的位置：数据统计>奖励列表</div>
		<el-form ref="form"  :inline="true"  class="demo-form-inline">
				<el-form-item label="时间段：">
					<el-col :span="11">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.startDate" style="width: 100%;"></el-date-picker>
					</el-col>
					<el-col class="line" :span="2">-</el-col>
					<el-col :span="11">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.endDate" style="width: 100%;"></el-date-picker>
					</el-col>
				</el-form-item>
				<el-form-item label="奖励获得途径：">
          <el-select v-model="form.channel" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option label="推荐" value="1"></el-option>
            <el-option label="完成任务" value="2"></el-option>
            <el-option label="评级" value="3"></el-option>
          </el-select>
       </el-form-item>
       <el-form-item label="奖励类型：">
          <el-select v-model="form.rewordType" placeholder="全部">
            <el-option label="全部" value=""></el-option>
            <el-option label="true" value="1"></el-option>
            <el-option label="ttr" value="2"></el-option>
            <el-option label="rmb" value="3"></el-option>
          </el-select>
       </el-form-item>
       	<el-form-item class="btn-wrap">
					<el-button type="primary"  @click="getStaticsInfo">查询</el-button>
					<el-button @click="reset">重置</el-button>
				
				</el-form-item>
			</el-form>
			<div >
					<el-button type="primary" style="float:right"  @click="goback">返回</el-button>
			</div>
			<div class="name">姓名：<span></span></div>
		</br>
			<div  class="data-table">
				<el-table
				:data="tableData"
				stripe
				style="width: 100%">
				<el-table-column  prop="eventName"	label="获得奖励途径"></el-table-column>
				<el-table-column prop="rewardNum"	label="获得奖励数"></el-table-column>
				<el-table-column	prop="rewardType"	label="奖励类型"></el-table-column>
				<el-table-column	prop="gotTime"	label="获得时间" ></el-table-column>
			</el-table>
			</div>
	</div>
</template>

<script>
	export default {
	  data(){
			return {
				tableData:[],
				pageIndex:1,
				pageSize:20,
				id:'',
				form:{
					endDate:'',
					startDate:'',
					channel:'',
					rewordType:'',
					
				}
			}
		},
		methods:{
				goback() {
        this.$router.go(-1)
      },
			getStaticsInfo(){
		  	let url="http://www.phptrain.cn/admin/report/getRewardStats"
		  	var param={
		  		userId:this.$route.query.id,
		  		endDate:this.form.endDate,
		  		startDate:this.form.startDate,
		  		channel:this.form.channel,
		  		rewordType:this.form.rewordType,
		  		pageIndex:this.pageIndex,
		  		pageSize:this.pageSize,
		  	}
		  	this.$http.post(url, param,
		  		{
		  		headers: {
            		"Content-Type": "application/json"
          		}
		  	}).then((res)=>{
		  		console.log(res,'999999')
		  		if(res.data.message=='成功'){
		  			if (res.data.result) {
		  				var result=res.data.result

		  			
		  			this.tableData=res.data.result
		  				
		  			}
		  		}
		  	})
			},
			reset(){
				this.form={
					endDate:'',
					startDate:'',
					channel:'',
					rewordType:''
				}
			}
		},
		mounted(){
			this.getStaticsInfo()
		}
	}
	
</script>

<style scoped="scoped">
	.name{font-size: 14px;}
</style>