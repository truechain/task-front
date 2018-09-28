<template>
  <div class="task-new-wrapper">
    	<div class="position">我的位置：任务管理>新建任务</div>
    	 <div class="fr">
       <el-button type="primary" @click="save">保存</el-button>
       <el-button @click="goback">取消</el-button>


    </div>
      <div class="details-content">
			  <div class="title">任务详情</div>
        <div class="form-wrap">
			<el-form ref="form" label-width="90px" :label-position="labelPosition" >
			  <el-form-item label="任务logo：">
			  	<div class="file-wrapper">
			  		<div v-if="!file">
			  			<img src="../../../static/images/add-logo.png"/>
			  		</div>
			  		<div v-else>
			  			<img :src="imgUrl"/>
			  		</div>
          	<input type="file" class="file" @change="uploadChange"/>
			  	</div>

      </el-form-item><br />
        <el-form-item label="任务名称：">
					<span class="red">*</span><el-input v-model="form.name"></el-input>
				</el-form-item>
        	<el-form-item label="任务等级：">
				<span class="red">*</span>	<el-select v-model="form.level" placeholder="全部">
						<el-option label="A" value="A"></el-option>
						<el-option label="B" value="B"></el-option>
						<el-option label="C" value="C"></el-option>
					</el-select>
				</el-form-item>
        <el-form-item label="状态：">
					<el-select v-model="form.taskStatus" placeholder="全部">
					  <el-option label="禁用" value="0"></el-option>
            <el-option label="启用" value="1"></el-option>
            <el-option label="关闭" value="2"></el-option>
        </el-select>
				</el-form-item>
        	<el-form-item label="任务类别：">
					<el-select v-model="form.category" placeholder="全部">
						<el-option label="个人" value="0"></el-option>
						<el-option label="团体" value="1"></el-option>
					</el-select>
				</el-form-item>
				<el-form-item label="时间范围：">
					<el-col :span="11">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.startDateTime" style="width: 100%;" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
					</el-col>
					<el-col class="line" :span="2">-</el-col>
					<el-col :span="11">
						<el-date-picker type="date" placeholder="选择日期" v-model="form.endDateTime" style="width: 100%;" value-format="yyyy-MM-dd" format="yyyy-MM-dd"></el-date-picker>
					</el-col>
				</el-form-item>

				<el-form-item label="奖励类型：">
					<span class="red">*</span><el-select v-model="form.rewardType" placeholder="全部">
						<el-option label="True" value="1"></el-option>
						<el-option label="TTR" value="2"></el-option>
						<el-option label="RMB" value="3"></el-option>
					</el-select>
				</el-form-item>
        <el-form-item label="奖励数量：">
					<span class="red">*</span><el-input v-model="form.rewardNum"></el-input>
				</el-form-item>
        <el-form-item label="提交地址：" style="display:block;">
					<el-input v-model="form.pushAddress" style="width:200px"></el-input>
				</el-form-item>
        <el-form-item label="任务描述：" style="display:block">
					<el-input type="textarea" v-model="form.description"></el-input>
				</el-form-item>

			</el-form>
		</div>
      </div>
      <div class="details-content">
      <div class="title">岗位详情</div>
      <div class="table-wrapper">
        <table class="table">
        	<tr>
        	  <th>岗位</th>
        	  <th>需要人数</th>
        	  <th>奖励/人</th>
        	</tr>
        	<tr class="el-table__row">
        	  <td><span class="red">*</span><input type="text" class="el-input__inner" v-model="station"/></td>
        	  <td><span class="red">*</span><input type="text" class="el-input__inner" v-model="peopleNum"/></td>
        	  <td><span class="red">*</span><input type="text" class="el-input__inner" v-model="rewardNum"/></td>
        	</tr>
        </table>
      </div>

    </div>
  </div>
</template>

<script>
export default{
  data(){
    return{
    	file:'',
    	imgUrl:'',
    	imgData: {
            accept: 'image/gif, image/jpeg, image/png, image/jpg',
       },
       station:'',
					peopleNum:'',
					rewardNum:'',
       labelPosition: 'right',
      	form: {
				category:'',
					description:'',
					endDateTime:'',
					level:'',
					name:'',
					peopleNum:'',
					pushAddress:'',
					rewardNum:'',
					rewardType:'',
					startDateTime:'',
					taskStatus:''
				},
    }
  },
  methods:{
  	goback() {
        this.$router.go(-1)
      },
  		save(){
  			var url="http://www.phptrain.cn/admin/task/addTask"
        var param=	{
          task: {
            category: this.form.category,
            description: this.form.description,
            endDateTime:this.form.endDateTime,
            iconPath:this.imgUrl,
            level: this.form.level,
            name:this.form.name,
            peopleNum: this.form.peopleNum,
            pushAddress: this.form.pushAddress,
            rewardNum: this.form.rewardNum,
            rewardType: this.form.rewardType,
            startDateTime: this.form.startDateTime,
            taskStatus: this.form.taskStatus,
          },
          taskDetailList: [
            {
              peopleNum: this.peopleNum,
              rewardNum: this.rewardNum,
              station:this.station
            }
          ]
        }
  			this.$http.post(url,param,{
		      headers:{"Content-Type": "application/json"}
		    }).then((res)=>{
		    	console.log(res.data)
		      if(res.data.message=='成功'){
		      			this.$router.push({
								path: "/TaskManage",
							})
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
      goback(){
        this.$router.go(-1)
      },
      uploadChange(event){
            let reader =new FileReader();
            let img1=event.target.files[0];
            this.file=img1

            let type=img1.type;//文件的类型，判断是否是图片
            let size=img1.size;//文件的大小，判断图片的大小
            if(this.imgData.accept.indexOf(type) == -1){
                this.$message({
					          message: '请选择正确的图片格式！',
					          type: 'warning'
		        		});
                return false;
            }
            if(size>3145728){
                 this.$message({
					          message: '请选择3M以内的图片！',
					          type: 'warning'
		        		});
                return false;
            }

            let form = new FormData();

            form.append('file',img1);
            this.$http.post('http://www.phptrain.cn/admin/task/uploadTaskIcon',form,{
                headers:{'Content-Type':'multipart/form-data'}
            }).then(res => {
 console.log(res.data,'88888888')
//              this.imgUrl = res.data.result
                reader.readAsDataURL(img1);
                var that=this;
                reader.onloadend=function(){
                    console.log(this.result)
                    that.imgUrl = res.data.result.showPath
                }

            }).catch(error => {
                alert('上传图片出错！');
            })
},


    }
}
</script>

<style scoped>
.red {
  position: absolute;
  left: -88px;
  color: red;
}
.file-wrapper {
  position: relative;
  width: 130px;
  height: 130px;
  cursor: pointer;
}
.file-wrapper .file {
  width: 100%;
  position: absolute;
  left: 0;
  top: 0;
  bottom: 0;
  opacity: 0;
}
.file-wrapper img {
  width: 100%;
  height: 130px;
}
.table {
  width: 100%;
  border-collapse: collapse;
  table-layout: fixed;
  border: 1px solid #dfe6ec;
  border-spacing: 0;
}
.table th {
  text-align: left;
}
.table td,
.table th {
  border-right: 1px solid #dfe6ec;
  padding: 0 18px;
}
.table td,
.table th {
  border-width: 0 0 1px;
  height: 40px;
  min-width: 0;
  text-overflow: ellipsis;
  vertical-align: middle;
  border-style: solid;
  border-color: #e6e6e6;
}
.el-table__row {
  background-color: #fff;
}
.table td {
  padding: 5px 10px;
  position: relative;
}
.table td .red {
  left: 0;
  top: 18px;
}
.table tr input {
  width: 240px;
}
</style>
