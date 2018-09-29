<template>
  <div class="task-entryForm-content">
    <div class="position">我的位置：任务管理>报名表</div>
    <div class="status">
      <span>任务名称：<span>{{taskName}}</span></span>
      <span>审核状态：<span>{{totalAuditStatus}}</span></span>
    </div>
    <el-table :data="tableData" stripe style="width: 100%">
      <el-table-column prop="station" label="岗位">
      </el-table-column>
      <el-table-column prop="wxNickName" label="微信昵称">
      </el-table-column>
      <el-table-column prop="auditStatus" label="奖励发放">
      </el-table-column>
      <el-table-column prop="rewardNum" label="奖励">
      </el-table-column>
      <el-table-column prop="personName" label="姓名">
      </el-table-column>
      <el-table-column prop="recommendUser" label="推荐人">
      </el-table-column>
      <el-table-column prop="pushAddress" label="提交地址">
      </el-table-column>
      <el-table-column prop="remark" label="提交说明">
      </el-table-column>
      <el-table-column label="操作">
        <template slot-scope="scope">
          <el-button size="mini" @click="shDialog(scope.row)" v-if="scope.row.auditStatus=='未审核'">审核</el-button>
        </template>
      </el-table-column>
    </el-table>
    <div class="btn-center">
      <el-button @click="goback">返回</el-button>
    </div>
    <el-dialog title="审核"   :visible.sync="dialogAuditing" >
      <el-form :model="form" class="dialog-wrapper" label-width="120px" >
        <el-form-item label="任务名：">
          {{this.taskName}}
        </el-form-item>
        <el-form-item label="默认奖励数：">
          {{this.rewardNum}}
        </el-form-item>
        <el-form-item label="用户姓名：">
          {{this.personName}}
        </el-form-item>
        <el-form-item label="用户钱包地址：">
          {{this.pushAddress}}
        </el-form-item>

        <el-form-item label="奖励数：">
          <el-input v-model.number="form.num" auto-complete="off" ></el-input>
        </el-form-item>
        <el-form-item label="推荐人奖励数：" >
          <el-input v-model.number="form.reNum" auto-complete="off" ></el-input>
        </el-form-item>

      </el-form>
      <div slot="footer" class="dialog-footer">
        <el-button @click="dialogAuditing = false">取 消</el-button>
        <el-button type="primary" @click="dialogAudit" :plain="true" >发放奖励</el-button>
      </div>
    </el-dialog>
  </div>
</template>

<script>
  export default {
    name: 'TaskEntryForm',
    data() {
      return {
      	taskName:'',
      	totalAuditStatus:'',
        dialogAuditing: false,
        centerDialogVisible: true,
        buttonText:'',
        taskUserId:'',
        isShow:false,
        form: {
          reNum:'',
          num:'',
        },
        taskName:'',//任务名
        rewardNum:'',//默认奖励数
        personName:'',//用户姓名
        pushAddress:'',//用户钱包地址
        tableData: []
      }
    },
    methods: {
    	/*审核报名表*/
    	shDialog(scope){
    		this.taskUserId=scope.taskUserId
    		let id =  scope.taskUserId
		  	let url="http://www.phptrain.cn/admin/task/auditEntryFormUser?taskUserId="+id
		  	this.$http.post(url, {
		  		headers: {
            		"Content-Type": "application/json"
          		}
		  	}).then((res)=>{
          console.log(res,'审核')
          if(res.data.code === 500) {
            this.$message({
              message: res.data.message,
              type: 'warning'
            });
            return false;
          }
          if(res.list){
              var list=res.result
          this.taskName=list.taskName
          this.rewardNum=list.rewardNum
          this.personName=list.personName
          this.pushAddress=list.pushAddress
          }

         this.dialogAuditing=true

		  	})
    	},
      goback() {
        this.$router.go(-1)
      },
      dialogAudit(){
        this.dialogAuditing=false
        let url="http://www.phptrain.cn/admin/task/rewardEntryFromUser?taskUserId="+this.taskUserId

        var param={
          userReward:this.form.reNum,
          recommendUserReward:this.form.num
        }
        this.$http.post(url,param,{
		  		headers: {
            		"Content-Type": "application/json"
          		}
		  	}).then((res)=>{
		  	if(res.data.code==200){
		  	this.getTaskEntryForm()
		  		  this.$message({
          message: '奖励已发送',
          type: 'success'
        });
		  	}
		  	else{
		  		var msg=res.data.message
		  		  this.$message({
          message: msg,
          type: 'warning'
        });
		  	}

		  	})

      },
      getTaskEntryForm(){
        let taskId =  this.$route.query.taskId

        let url="http://www.phptrain.cn/admin/task/getEntryFormInfo?taskId="+taskId

		  	this.$http.post(url, {
		  		headers: {
            		"Content-Type": "application/json"
          		}
		  	}).then((res)=>{
		  		console.log(res,'000000000报名表')
		  		if(res.data.message=='成功'){
		  			if (res.data.result) {
		  				var result=res.data.result
		  				this.tableData=result.taskEntryFromInfoList
		  				this.taskName=result.taskName
		  				if(result.totalAuditStatus==0){
		  				  result.totalAuditStatus='未审核'
		  				}
		  				if(result.totalAuditStatus==1){
		  				  result.totalAuditStatus='已审核'
		  				}

		  				this.totalAuditStatus=result.totalAuditStatus
		  			  result.taskEntryFromInfoList.forEach(function(list){
		  			    console.log(list.auditStatus)
		  			     if(list.auditStatus==0){
                    list.auditStatus='未审核'
                    list.isShow=true
                  }
                  if(list.auditStatus==1){
                    list.auditStatus='已审核'
                    list.isShow=true
                  }
                  if(list.auditStatus==2){
                    list.auditStatus='已奖励'
                    list.isShow=false
                  }

		  			  })

		  			}
		  		}
		  	})
      }
    },
    mounted(){
    	this.getTaskEntryForm()

    }
  }
</script>

<style type="text/css">
.el-message {
  top: 200px !important;
}
</style>
<style scoped>
.el-dialog--small.el-dialog {
  width: 30%;
}
.dialog-wrapper .el-form-item {
  display: block;
}
.btn-center {
  text-align: center;
  margin: 10px 0;
}

.status {
  font-size: 14px;
  margin-bottom: 15px;
}

.status span {
  margin-right: 20px;
}
</style>
